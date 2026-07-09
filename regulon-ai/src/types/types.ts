import type {
  AgentStatus,
  ChecklistItem,
  RegulationImpact,
} from './compliance';

export type {
  DataSourceType,
  DataSourceMetadata,
  CanonicalExplanation,
  ChunkUsed,
  AgentTraceEntry,
  LegalTraceDetails,
  RegulationSource,
  RegulationImpact,
  ChecklistItem,
  ChatProcessingAgent,
  ChatMessageMetadata,
  ChatMessage,
  ComplianceAction,
  AgentStatusType,
  AgentStatus,
} from './compliance';

export interface AnalysisState {
  agents: AgentStatus[];
  currentAgentIndex: number;
  status: 'pendente' | 'processando' | 'concluído' | 'falhou';
  impacts?: RegulationImpact[];
  checklist?: ChecklistItem[];
}

// ─── Explainability API Integration Types ──────────────────────────────────────

export interface ExplainabilityCanonicalExplanation {
  action: string;
  legal_basis: string;
  source: string;
  confidence: number; // 0.0 to 1.0
  reasoning: string;
}

export interface ExplainabilityChunk {
  chunk_id: string;
  chunk_text: string;
  article: string;
  primary_domain: string;
  risk_level: string;
  similarity_score: number;
}

export interface ExplainabilityAgentStep {
  agent: string;
  status: 'success' | 'error' | 'skipped';
  output: Record<string, unknown>;
  execution_time_ms: number;
}

export interface ExplainabilityFullExplanation {
  canonical: ExplainabilityCanonicalExplanation;
  record_id?: string; // Option on frontend to support fallback errors
  entity_type: string;
  entity_id: string;
  trace_id: string;
  regulation_id: string;
  company_id: string;
  has_legal_basis: boolean;
  is_valid: boolean;
  validation_errors: string[];
  chunks_used: ExplainabilityChunk[];
  agent_trace: ExplainabilityAgentStep[];
  decision_factors: Record<string, number | object>;
  generated_by: string;
  created_at: string;
}

export type FullExplanation = ExplainabilityFullExplanation;
