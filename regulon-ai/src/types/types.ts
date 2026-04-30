export interface RegulationImpact {
  id: string;
  title: string;
  impactLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  relevance: string;
  summary: string;
}

export interface ChecklistItem {
  id: string;
  task: string;
  description: string;
  completed: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Status de um agente no pipeline de análise regulatória
 * - 'pendente': Aguardando execução
 * - 'processando': Agente em execução
 * - 'concluído': Agente finalizou com sucesso
 * - 'falhou': Agente falhou (erro na processamento)
 */
export type AgentStatusType = 'pendente' | 'processando' | 'concluído' | 'falhou';

/**
 * Interface que representa o status de um agente individual
 */
export interface AgentStatus {
  id: string;
  name: 'classificador' | 'matching' | 'interpretador' | 'executor';
  displayName: string; // Classificador, Matching, Interpretador, Executor
  status: AgentStatusType;
  progress: number; // 0-100
  message?: string; // Mensagem opcional para feedback rápido
  startTime?: number; // Timestamp de início (ms)
  endTime?: number; // Timestamp de conclusão (ms)
}

/**
 * Estado completo da análise com rastreamento de todos os agentes
 */
export interface AnalysisState {
  isAnalyzing: boolean;
  currentAgentIndex: number; // Índice do agente atualmente processando (0-3)
  agents: AgentStatus[];
  error?: string; // Erro geral, se houver
  startTime?: number;
}

/**
 * Metadados da fonte de dados (para arquitetura híbrida SQL+Vector DB)
 */
export interface DataSourceMetadata {
  source: 'postgresql' | 'vector_db' | 'hybrid';
  queryTime: number; // ms
  relevanceScore?: number; // Para Vector DB
  resultsCount: number;
}
