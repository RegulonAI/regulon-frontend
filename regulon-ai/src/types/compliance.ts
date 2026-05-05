/**
 * Contrato de dados central do domínio de Compliance.
 * Este arquivo é a fonte única de verdade para tipagem entre Frontend e Backend.
 */

/**
 * Origem dos dados retornados pelo pipeline RAG.
 */
export type DataSourceType = 'sql' | 'vector_db' | 'hybrid';

/**
 * Jurisdições suportadas para rastreabilidade jurídica.
 */
export type Jurisdiction = 'BR' | 'UE' | 'US' | 'INTL';

/**
 * Níveis de impacto regulatório.
 */
export type ImpactLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

/**
 * Metadados sobre a fonte e qualidade dos dados retornados.
 */
export interface DataSourceMetadata {
  /**
   * Origem da informação.
   * - `sql`: base relacional estruturada
   * - `vector_db`: recuperação semântica vetorial
   * - `hybrid`: combinação das duas fontes
   */
  source: DataSourceType;

  /**
   * Nível de confiança do resultado, em percentual (0 a 100).
   */
  confidenceScore: number;

  /**
   * Similaridade vetorial (0 a 100), quando houver recuperação por embeddings.
   */
  similarity?: number;

  /**
   * Data/hora de recuperação dos dados no formato ISO 8601.
   */
  retrievedAt: string;
}

/**
 * Referência jurídica que origina o impacto regulatório.
 */
export interface RegulationSource {
  /**
   * Jurisdição aplicável da norma (ex.: BR, UE).
   */
  jurisdiction: Jurisdiction;

  /**
   * Nome da norma/regulação (ex.: LGPD, GDPR).
   */
  regulationName: string;

  /**
   * Data de vigência da norma no formato ISO 8601.
   */
  effectiveDate: string;
}

/**
 * Representa um impacto regulatório identificado na análise.
 */
export interface RegulationImpact {
  /**
   * Identificador único do impacto.
   */
  id: string;

  /**
   * Título resumido do impacto.
   */
  title: string;

  /**
   * Severidade do impacto para priorização de resposta.
   */
  impactLevel: ImpactLevel;

  /**
   * Síntese executiva do impacto para leitura rápida.
   */
  summary: string;

  /**
   * Justificativa de relevância para o contexto de negócio.
   */
  relevance: string;

  /**
   * Metadados de rastreio técnico e confiança da recuperação.
   */
  metadata?: DataSourceMetadata;

  /**
   * Referência jurídica de origem para auditoria e rastreabilidade.
   */
  source: RegulationSource;
}

/**
 * Prioridade operacional para execução de tarefas de compliance.
 */
export type ChecklistPriority = 'critical' | 'high' | 'medium' | 'low';

/**
 * Item de checklist operacional derivado da análise jurídica.
 */
export interface ChecklistItem {
  /**
   * Identificador único da tarefa.
   */
  id: string;

  /**
   * Título curto e acionável.
   */
  task: string;

  /**
   * Descrição detalhada da ação necessária.
   */
  description: string;

  /**
   * Indica se a tarefa foi concluída.
   */
  completed: boolean;

  /**
   * Prioridade operacional para ordenação do backlog de compliance.
   */
  priority?: ChecklistPriority;

  /**
   * ID do impacto regulatório associado à tarefa.
   */
  linkedImpactId?: string;

  /**
   * Prazo sugerido para conclusão no formato ISO 8601.
   */
  dueDate?: string;
}

/**
 * Agente participante do processamento de uma resposta no chat.
 */
export interface ChatProcessingAgent {
  /**
   * Identificador técnico do agente.
   */
  id: string;

  /**
   * Nome interno do agente no pipeline.
   */
  name: string;

  /**
   * Nome amigável exibido na interface.
   */
  displayName: string;
}

/**
 * Metadados opcionais anexados a mensagens do chat.
 */
export interface ChatMessageMetadata {
  /**
   * Nível de confiança da resposta gerada pela IA (0 a 100).
   */
  confidenceScore?: number;

  /**
   * Lista de agentes que contribuíram para a resposta.
   */
  agentsUsed?: ChatProcessingAgent[];
}

/**
 * Mensagem trocada no canal conversacional da aplicação.
 */
export interface ChatMessage {
  /**
   * Papel da mensagem na conversa.
   */
  role: 'user' | 'assistant';

  /**
   * Conteúdo textual apresentado no chat.
   */
  content: string;

  /**
   * Data/hora da mensagem no formato ISO 8601.
   */
  timestamp: string;

  /**
   * Metadados opcionais com rastreio de confiança e processamento.
   */
  metadata?: ChatMessageMetadata;
}

/**
 * Estados possíveis para cada agente da análise.
 */
export type AgentStatusType = 'pendente' | 'processando' | 'concluído' | 'falhou';

/**
 * Estado de execução de um agente no pipeline de análise.
 */
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

/**
 * Estado agregado da análise multiagente.
 */
export interface AnalysisState {
  isAnalyzing: boolean;
  currentAgentIndex: number;
  agents: AgentStatus[];
  error?: string;
  startTime?: number;
}
