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
