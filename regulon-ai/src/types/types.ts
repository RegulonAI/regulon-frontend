/**
 * Metadados de fonte de dados para arquitetura híbrida (PostgreSQL + Vector DB)
 * Rastreia a origem e confiabilidade de cada informação no sistema.
 * 
 * @example
 * ```typescript
 * const metadata: DataSourceMetadata = {
 *   source: 'hybrid',
 *   confidence: 0.95,
 *   vectorSimilarity: 0.92,
 *   sourceId: 'reg-2024-001'
 * };
 * ```
 */
export interface DataSourceMetadata {
  /**
   * Origem dos dados
   * - 'postgresql': Dados estruturados do banco SQL (compliance rules, regulations)
   * - 'vector_db': Dados semânticos do banco vetorial (semantic search, embeddings)
   * - 'hybrid': Combinação de ambas as fontes (informação triangulada)
   */
  source: 'postgresql' | 'vector_db' | 'hybrid';

  /**
   * Score de confiança da resposta (0-1)
   * 0.0 = Confiança muito baixa (dados incertos)
   * 0.5 = Confiança moderada (interpretação necessária)
   * 1.0 = Confiança máxima (dados validados)
   * 
   * Usado pela UI para exibir badges de precisão (🟢 ≥0.8, 🟡 0.5-0.8, 🔴 <0.5)
   */
  confidence: number;

  /**
   * Score de similaridade vetorial do Vector DB (0-1)
   * Presente apenas quando source é 'vector_db' ou 'hybrid'
   * Indica quanto a busca semântica corresponde ao contexto do usuário
   * @optional
   */
  vectorSimilarity?: number;

  /**
   * Referência cruzada para registro no PostgreSQL
   * Permite rastrear o impacto até sua origem jurídica estruturada
   * Exemplo: "reg-2024-lgpd-052" (Artigo 52 da LGPD, 2024)
   * @optional
   */
  sourceId?: string;
}

/**
 * Informações de rastreabilidade jurídica
 * Encapsula dados sobre a norma que originou o impacto
 */
export interface JuridicalSource {
  /**
   * Identificação da norma (ex: "Artigo 52 da Lei 13.709/2018 (LGPD)")
   */
  regulation: string;

  /**
   * Jurisdição aplicável
   * - 'BR': Legislação brasileira
   * - 'UE': Regulamentações da União Europeia
   * - 'US': Legislação dos EUA
   * - 'INTL': Tratados internacionais
   */
  jurisdiction: 'BR' | 'UE' | 'US' | 'INTL';

  /**
   * Data de vigência da norma (ISO 8601)
   * Permite ordenação cronológica e detecção de normas obsoletas
   */
  effectiveDate: string; // ISO 8601: "2020-08-28"
}

/**
 * Impacto de uma regulamentação no negócio
 * Representa o mapeamento entre legislação e consequências operacionais
 * 
 * P2 Enhancement: Adiciona rastreamento de origem e confiança para auditoria
 */
export interface RegulationImpact {
  /** Identificador único do impacto */
  id: string;

  /** Nome/título da norma ou impacto (ex: "Compliance com LGPD - Artigo 52") */
  title: string;

  /**
   * Nível de impacto crítico para o negócio
   * - 'CRITICAL': Pode resultar em bloqueio operacional ou multas severas
   * - 'HIGH': Impacto significativo em processos ou finanças
   * - 'MEDIUM': Impacto moderado, requer ação planejada
   * - 'LOW': Impacto mínimo, requer apenas documentação
   */
  impactLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

  /** Descrição breve da relevância para o negócio */
  relevance: string;

  /** Sumário executivo do impacto e seus efeitos */
  summary: string;

  /**
   * P2: Metadados da origem (SQL vs Vector DB e confiança)
   * Permite distinguir se informação é estruturada ou derivada de busca semântica
   */
  metadata: DataSourceMetadata;

  /**
   * P2: Rastreabilidade jurídica completa
   * Vincula o impacto à norma específica que o gerou
   */
  source: JuridicalSource;
}

/**
 * Item do checklist de conformidade operacional
 * Representa uma ação concreta derivada de um impacto regulatório
 */
export interface ChecklistItem {
  /** Identificador único do item */
  id: string;

  /** Tarefa curta e acionável (ex: "Implementar política de retenção de dados") */
  task: string;

  /** Descrição detalhada do que precisa ser feito */
  description: string;

  /** Status de conclusão */
  completed: boolean;

  /**
   * P2: Prioridade de execução
   * - 'critical': Prazo imediato, risco legal alto
   * - 'high': Prazo semanas, impacto significativo
   * - 'medium': Prazo meses, planejamento recomendado
   * - 'low': Prazo flexível, baixo risco
   * @optional - Padrão: 'high' se não informado
   */
  priority?: 'critical' | 'high' | 'medium' | 'low';

  /**
   * P2: ID do RegulationImpact que originou esta tarefa
   * Permite rastrear de volta qual norma/impacto gerou a ação
   * Vincula checklist → impact → regulation (auditoria)
   * @optional
   */
  linkedImpactId?: string;

  /**
   * P2: Prazo para conclusão (ISO 8601)
   * Exemplo: "2025-06-30"
   * Usado para alertas de compliance e planejamento operacional
   * @optional
   */
  dueDate?: string; // ISO 8601: "2025-12-31"
}

/**
 * Mensagem no sistema de chat jurídico
 * P2 Enhancement: Adiciona rastreamento de processamento e confiança
 */
export interface ChatMessage {
  /**
   * Papel do autor da mensagem
   * - 'user': Pergunta do usuário
   * - 'assistant': Resposta do assistente IA
   */
  role: 'user' | 'assistant';

  /** Conteúdo textual da mensagem */
  content: string;

  /**
   * P2: Timestamp de quando a mensagem foi criada
   * ISO 8601 format: "2026-04-30T14:30:00Z"
   * Obrigatório para auditoria e ordenação cronológica
   */
  timestamp: string;

  /**
   * P2: Nível de confiança da resposta (0-1)
   * Preenchido apenas para mensagens 'assistant'
   * 
   * Interpretação visual:
   * - ≥ 0.8: 🟢 Confiança alta (usar badge verde)
   * - 0.5-0.8: 🟡 Confiança moderada (usar badge amarela)
   * - < 0.5: 🔴 Confiança baixa (usar badge vermelha + aviso)
   * 
   * @optional - Padrão: 1.0 para 'user', 0.7 para 'assistant' se não informado
   */
  confidence?: number;

  /**
   * P2: Agentes que processaram esta mensagem
   * Permite rastrear qual parte do pipeline contribuiu para a resposta
   * 
   * @example
   * ```typescript
   * agentsUsed: [
   *   { id: 'agent-1', name: 'classificador', displayName: 'Classificador', ... },
   *   { id: 'agent-3', name: 'interpretador', displayName: 'Interpretador', ... }
   * ]
   * ```
   * @optional
   */
  agentsUsed?: AgentStatus[];
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
