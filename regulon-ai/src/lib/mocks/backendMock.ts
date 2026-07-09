import type {
  ChecklistItem,
  LegalTraceDetails,
  RegulationImpact,
} from '@/types/compliance';

interface BackendCanonicalExplanation {
  action: string;
  legal_basis: string;
  source: string;
  confidence: number;
  reasoning: string;
}

interface BackendChunkUsed {
  chunk_id: string;
  chunk_text: string;
  article: string;
  primary_domain: string;
  risk_level: 'critical' | 'high' | 'medium' | 'low';
  similarity_score: number;
}

interface BackendAgentTrace {
  agent: string;
  status: string;
  output: Record<string, unknown>;
}

interface FullExplanationResponse {
  canonical: BackendCanonicalExplanation;
  entity_type: string;
  entity_id: string;
  trace_id: string;
  chunks_used: BackendChunkUsed[];
  agent_trace: BackendAgentTrace[];
}

export const backendFullExplanationResponse: FullExplanationResponse = {
  canonical: {
    action: 'Implementar autenticação de dois fatores (2FA)',
    legal_basis: 'Resolução BCB 195/2024, Artigo 8º',
    source: 'InterpreterAgent',
    confidence: 0.89,
    reasoning: 'Obrigação explícita para todos os Provedores de Serviço de Pagamento (PSP)',
  },
  entity_type: 'compliance_action',
  entity_id: '550e8400-e29b-41d4-a716-446655440000',
  trace_id: '550e8400-e29b-41d4-a716-446655440001',
  chunks_used: [
    {
      chunk_id: '550e8400-e29b-41d4-a716-446655440010',
      chunk_text:
        'Art. 8º - Todo Provedor de Serviço de Pagamento deve implementar autenticação de dois fatores para transações acima de R$ 1.000',
      article: '8º',
      primary_domain: 'payments',
      risk_level: 'high',
      similarity_score: 0.98,
    },
  ],
  agent_trace: [
    {
      agent: 'ClassifierAgent',
      status: 'success',
      output: { confidence: 0.96 },
    },
    {
      agent: 'InterpreterAgent',
      status: 'success',
      output: { consensus_reached: true },
    },
  ],
};

const impactLevelByRisk = {
  critical: 'CRITICAL',
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW',
} as const satisfies Record<BackendChunkUsed['risk_level'], RegulationImpact['impactLevel']>;

const priorityByRisk = {
  critical: 'critical',
  high: 'high',
  medium: 'medium',
  low: 'low',
} as const satisfies Record<BackendChunkUsed['risk_level'], ChecklistItem['priority']>;

export function adaptFullExplanationResponse(response: FullExplanationResponse): {
  impact: RegulationImpact;
  checklist: ChecklistItem[];
  legalTrace: LegalTraceDetails;
} {
  const canonical = {
    action: response.canonical.action,
    legal_basis: response.canonical.legal_basis, // <-- Mantém o formato exigido pelo tipo CanonicalExplanation
    legalBasis: response.canonical.legal_basis,   // <-- Mantém para não quebrar as referências abaixo (impact/checklist)
    source: response.canonical.source,
    confidence: response.canonical.confidence,
    reasoning: response.canonical.reasoning,
  };

  const chunksUsed = response.chunks_used.map((chunk) => ({
    chunkId: chunk.chunk_id,
    chunkText: chunk.chunk_text,
    article: chunk.article,
    primaryDomain: chunk.primary_domain,
    riskLevel: chunk.risk_level,
    similarityScore: chunk.similarity_score,
  }));

  const agentTrace = response.agent_trace.map((trace) => ({
    agent: trace.agent,
    status: trace.status,
    output: trace.output,
  }));

  const legalTrace: LegalTraceDetails = {
    canonical,
    entityType: response.entity_type,
    entityId: response.entity_id,
    traceId: response.trace_id,
    chunksUsed,
    agentTrace,
  };

  const primaryChunk = chunksUsed[0];
  const riskLevel = primaryChunk?.riskLevel ?? 'medium';

  const impact: RegulationImpact = {
    id: response.entity_id,
    title: canonical.action,
    impactLevel: impactLevelByRisk[riskLevel],
    summary: primaryChunk?.chunkText ?? canonical.reasoning,
    relevance: canonical.legalBasis,
    metadata: {
      source: canonical.source,
      confidenceScore: Math.round(canonical.confidence * 100),
      similarity: primaryChunk ? Math.round(primaryChunk.similarityScore * 100) : undefined,
      jurisdiction: 'Brasil',
      documentId: response.entity_id,
    },
    source: {
      regulationName: canonical.legalBasis,
      jurisdiction: 'Brasil',
      effectiveDate: '2024-01-01',
    },
    legalTrace,
  };

  const checklist: ChecklistItem[] = [
    {
      id: response.entity_id,
      task: canonical.action,
      description: `${canonical.reasoning} ${primaryChunk?.chunkText ?? ''}`.trim(),
      completed: false,
      priority: priorityByRisk[riskLevel],
      linkedImpactId: impact.id,
      legalTrace,
    },
  ];

  return { impact, checklist, legalTrace };
}
