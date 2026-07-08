export type DataSourceType = 'postgresql' | 'vector_db' | 'hybrid';

export interface DataSourceMetadata {
  source: 'postgresql' | 'vector_db' | 'hybrid';
  confidence: number;
  vectorSimilarity?: number;
  sourceId?: string;
  jurisdiction?: string;
  effectiveDate?: string;
  documentId?: string;
  lastUpdated?: string;
}

export interface JuridicalSource {
  jurisdiction: 'BR' | 'UE' | 'US' | 'INTL';
  regulation: string;
  effectiveDate?: string;
}

export interface RegulationImpact {
  id: string;
  title: string;
  impactLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  summary: string;
  relevance: string;
  metadata: DataSourceMetadata;
  source: JuridicalSource;
}

export interface ChecklistItem {
  id: string;
  task: string;
  description: string;
  completed: boolean;
  priority?: 'critical' | 'high' | 'medium' | 'low';
  linkedImpactId?: string;
  dueDate?: string;
}

export interface ChatProcessingAgent {
  id: string;
  name: string;
  displayName: string;
}

export interface ChatMessage {
  id?: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  confidence?: number;
  agentsUsed?: AgentStatus[];
}

export interface ComplianceAction {
  id: number;
  text: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  deadline: string;
  done: boolean;
  category: string;
  financialImpact?: string;
  framework?: string;
}

export type AgentStatusType = 'pendente' | 'processando' | 'concluído' | 'falhou';

export interface AgentStatus {
  id: string;
  name: 'classificador' | 'matching' | 'interpretador' | 'executor';
  displayName: string;
  status: AgentStatusType;
  progress: number;
  message?: string;
  startTime?: number;
  endTime?: number;
}

export interface AnalysisState {
  agents: AgentStatus[];
  currentAgentIndex: number;
  status: 'pendente' | 'processando' | 'concluído' | 'falhou';
  impacts?: RegulationImpact[];
  checklist?: ChecklistItem[];
}

// ─── Explainability API Integration Types ──────────────────────────────────────

export interface CanonicalExplanation {
  action: string;
  legal_basis: string;
  source: string;
  confidence: number;  // 0.0 to 1.0
  reasoning: string;
}

export interface Chunk {
  chunk_id: string;
  chunk_text: string;
  article: string;
  primary_domain: string;
  risk_level: string;
  similarity_score: number;
}

export interface AgentStep {
  agent: string;
  status: 'success' | 'error' | 'skipped';
  output: Record<string, unknown>;
  execution_time_ms: number;
}

export interface FullExplanation {
  canonical: CanonicalExplanation;
  record_id?: string; // Option on frontend to support fallback errors
  entity_type: string;
  entity_id: string;
  trace_id: string;
  regulation_id: string;
  company_id: string;
  has_legal_basis: boolean;
  is_valid: boolean;
  validation_errors: string[];
  chunks_used: Chunk[];
  agent_trace: AgentStep[];
  decision_factors: Record<string, number | object>;
  generated_by: string;
  created_at: string;
}
