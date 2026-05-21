export type DataSourceType = 'sql' | 'vector_db' | 'hybrid' | string;

export interface DataSourceMetadata {
  source: DataSourceType;
  confidenceScore: number;
  similarity?: number;
  retrievedAt?: string;
  jurisdiction?: string;
  effectiveDate?: string;
  documentId?: string;
  lastUpdated?: string;
}

export interface CanonicalExplanation {
  action: string;
  legalBasis: string;
  source: string;
  confidence: number;
  reasoning: string;
}

export interface ChunkUsed {
  chunkId: string;
  chunkText: string;
  article: string;
  primaryDomain: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  similarityScore: number;
}

export interface AgentTraceEntry {
  agent: string;
  status: 'success' | 'error' | 'warning' | string;
  output: Record<string, unknown>;
}

export interface LegalTraceDetails {
  canonical: CanonicalExplanation;
  entityType: string;
  entityId: string;
  traceId: string;
  chunksUsed: ChunkUsed[];
  agentTrace: AgentTraceEntry[];
}

export interface RegulationSource {
  jurisdiction: string;
  regulationName: string;
  effectiveDate: string;
}

export interface RegulationImpact {
  id: string;
  title: string;
  impactLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  summary: string;
  relevance: string;
  metadata?: DataSourceMetadata;
  source?: RegulationSource;
  legalTrace?: LegalTraceDetails;
}

export interface ChecklistItem {
  id: string;
  task: string;
  description: string;
  completed: boolean;
  priority?: 'critical' | 'high' | 'medium' | 'low';
  linkedImpactId?: string;
  dueDate?: string;
  legalTrace?: LegalTraceDetails;
}

export interface ChatProcessingAgent {
  id: string;
  name: string;
  displayName: string;
}

export interface ChatMessageMetadata {
  confidenceScore?: number;
  agentsUsed?: ChatProcessingAgent[];
}

export interface ChatMessage {
  id?: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  metadata?: ChatMessageMetadata & Partial<DataSourceMetadata>;
  sources?: string[];
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
