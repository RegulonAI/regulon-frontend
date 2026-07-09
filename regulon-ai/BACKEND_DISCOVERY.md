# Backend Discovery — Regulon AI (FastAPI)

**Fonte analisada:** `/home/usul/projects/regulon-backend`  
**Escopo:** rotas FastAPI, contratos (Pydantic/datatypes) e segurança observável no código

## 1. Tabela de Endpoints (De/Para)

**Observação crítica:** não há `FastAPI()` nem `include_router(...)` no código `src/`. As rotas abaixo existem no módulo `src/explainability/api.py`, mas o app FastAPI não foi localizado neste snapshot.

| FastAPI (método/rota) | Parâmetros | Response model (código) | Ação sugerida no Next.js |
| --- | --- | --- | --- |
| GET `/explain/action/{action_id}` | `action_id` (path, str/UUID) | `FullExplanationResponse` | Detalhar explicação de uma ação de compliance |
| GET `/explain/match/{regulation_id}/{company_id}` | `regulation_id` (path), `company_id` (path) | `FullExplanationResponse` | Explicar aplicabilidade de norma para empresa |
| GET `/explain/query/{query_id}` | `query_id` (path) | `FullExplanationResponse` | Exibir explicação/auditoria de resposta RAG |
| GET `/explain/trace/{trace_id}` | `trace_id` (path) | `DecisionTraceResponse` | Exibir trilha completa de execução (auditoria) |
| GET `/explain/company/{company_id}/regulation/{regulation_id}` | `company_id` (path), `regulation_id` (path) | `dict` (ver retorno em `api.py`) | Histórico empresa × norma |
| GET `/explain/metrics/quality` | — | `QualityMetricsResponse` | Monitoramento de qualidade |
| GET `/explain/invalid?limit=50` | `limit` (query, int, default 50, máximo 200) | `dict` (lista de records) | Monitoramento de outputs sem base legal |

**Endpoints não encontrados no código:** Ingestão de documentos, chat/conversa com IA, retorno de checklists.

## 2. Contratos de Dados (Pydantic/Dataclasses)

### 2.1 Explainability (Pydantic)

**`ExplainabilityRecord`** (`src/explainability/schemas.py`):
```
record_id: str
entity_type: "compliance_action" | "match_result" | "rag_response"
entity_id: str
action: str
legal_basis: str
source: str
confidence: float [0..1]
reasoning: str
trace_id?: str
regulation_id?: str
regulation_version?: int
company_id?: str
generated_by: str
has_legal_basis: bool
is_valid: bool
validation_errors: string[]
chunks_used: dict[]
agent_trace: dict[]
decision_factors: dict
created_at: datetime (ISO)
```

**`FullExplanationResponse`** (`src/explainability/api.py`):
```
canonical: {
  action: string
  legal_basis: string
  source: string
  confidence: number
  reasoning: string
}
record_id: string
entity_type: string
entity_id: string
trace_id?: string
regulation_id?: string
regulation_version?: number
company_id?: string
has_legal_basis: boolean
is_valid: boolean
validation_errors: string[]
chunks_used: object[]
agent_trace: object[]
decision_factors: object
generated_by: string
created_at: string
```

**`DecisionTraceResponse`** (`src/explainability/api.py`):
```
trace_id: string
root_entity_type: string
root_entity_id: string
nodes: object[]
total_nodes: number
created_at: string
```

**`QualityMetricsResponse`** (`src/explainability/api.py`):
```
valid_records: number
invalid_records: number
avg_confidence_valid: number
avg_confidence_invalid: number
validity_rate: number
```

### 2.2 Taxonomy (Pydantic)

**`ClassificationOutput`** (`src/taxonomy/schemas.py`) — usado como metadata de domínio:
```
classification_id: string
timestamp: datetime
domains: Domain[]
primary_domain: Domain
subdomains: Subdomain[]
intent: RegulatoryIntent
risk_level: RiskLevel
entities: ExtractedEntity[]
authorities: string[]
confidence: number [0..1]
classification_method: "rule_based" | "llm" | "hybrid"
rule_matches: string[]
llm_reasoning?: string
input_text_hash: string (SHA256)
```

### 2.3 RAG e Matching (Dataclasses)

**RAG** (`src/rag/schemas.py`):
- `RAGResponse`: `answer`, `citations[]`, `chunks_used[]`, `query_classification`, `confidence`, `has_legal_basis`, `retrieval_stats`, `query_id`.
- `Citation`: inclui `similarity_score` (metadado relevante para front).
- `ChunkUsed`: `semantic_score`, `keyword_score`, `final_score`, `regulation_version`.

**Matching** (`src/matching/schemas.py`):
- `MatchResult`: scores individuais (`sector_match`, `product_match`, `license_match`, `keyword_similarity`, `llm_relevance`), `total_score`, `is_applicable`, `confidence`, `threshold_used`, `justification`.

## 3. Conflitos de Contrato (GAPs) com o Frontend

**Frontend types (Next.js):** `DataSourceMetadata`, `RegulationImpact`, `ChatMessage` em `regulon-frontend/regulon-ai/src/types/compliance.ts`.

| Interface frontend | Expectativa | Disponível no backend | GAPs específicos |
| --- | --- | --- | --- |
| `DataSourceMetadata` | `source`, `confidenceScore`, `similarity`, `retrievedAt`, `jurisdiction`, `effectiveDate`, `documentId`, `lastUpdated` | `source`, `confidence` no `canonical` de `FullExplanationResponse`; `similarity_score` aparece em `Citation`; `final_score/semantic_score/keyword_score` em `ChunkUsed` | **Nomes divergentes:** `confidence` vs `confidenceScore`, `similarity_score` vs `similarity`. **Campos ausentes:** `jurisdiction`, `effectiveDate`, `documentId`, `retrievedAt`, `lastUpdated`. **Localização diferente:** `source` e `confidence` estão em `canonical`, não em `metadata`. |
| `RegulationImpact` | `id`, `title`, `impactLevel` (CRITICAL/HIGH/MEDIUM/LOW), `summary`, `relevance`, `metadata`, `source` | Não há endpoint que retorne este shape | **Ausente**. O backend expõe explicações (`FullExplanationResponse`), não impactos normalizados. `risk_level` existe em taxonomy/db, mas é `lowercase` e não retorna em nenhum endpoint. |
| `ChatMessage` | `role`, `content`, `timestamp`, `metadata` (inclui `confidenceScore`, `agentsUsed`), `sources` | Não há endpoint de chat/RAG público | **Ausente**. RAG tem dataclasses internas, mas não há rota FastAPI para chat/conversa. |

**Observação adicional:** o backend usa `snake_case` nos campos; o frontend usa `camelCase`.

## 4. Autenticação e Segurança (observado no código)

- **CORS:** não há middleware CORS configurado no código `src/`.
- **Auth (JWT/API Key):** nenhuma proteção de rota encontrada (sem `Depends`, `Security`, `Authorization` headers) para requests de entrada.
- **API Keys presentes:** apenas para chamadas **saída** (ex.: `VOYAGE_API_KEY` no módulo de embedding).

## 5. Instruções de Conexão (frontend)

1. **Base URL:** o README documenta `http://localhost:8000`.
2. **Headers:** `Accept: application/json`. Não há evidência de `Authorization` requerido para entrada.
3. **Mapeamento de campos:** converter `snake_case` → `camelCase` no frontend (ex.: `confidence` → `confidenceScore`), e ler `canonical.*` para metadados básicos.
4. **CORS:** como não há CORS no backend, prefira chamadas server-side (Route Handlers/Server Actions) ou proxy via API do Next.js para evitar bloqueio do browser.

