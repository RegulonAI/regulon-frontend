/**
 * Mock Data Examples for P2 Hybrid Architecture
 * 
 * Demonstrates how to use the new DataSourceMetadata, JuridicalSource,
 * and extended interfaces with real-world scenarios.
 * 
 * Use these examples to test Dashboard, Chat, and Checklist components.
 */

import {
  RegulationImpact,
  ChecklistItem,
  ChatMessage,
  AgentStatus,
  DataSourceMetadata,
  JuridicalSource,
} from '@/types/types';

// ==================== MOCK: Data Source Metadata ====================

export const mockMetadataHighConfidenceSql: DataSourceMetadata = {
  source: 'postgresql',
  confidence: 0.98,
  sourceId: 'reg-2024-lgpd-052',
};

export const mockMetadataModerateConfidenceVector: DataSourceMetadata = {
  source: 'vector_db',
  confidence: 0.72,
  vectorSimilarity: 0.85,
};

export const mockMetadataHybrid: DataSourceMetadata = {
  source: 'hybrid',
  confidence: 0.95,
  vectorSimilarity: 0.92,
  sourceId: 'reg-2024-lgpd-052',
};

export const mockMetadataLowConfidence: DataSourceMetadata = {
  source: 'vector_db',
  confidence: 0.45,
  vectorSimilarity: 0.42,
};

// ==================== MOCK: Juridical Source ====================

export const mockJuridicalSourceLgpd: JuridicalSource = {
  regulation: 'Artigo 52 da Lei 13.709/2018 (Lei Geral de Proteção de Dados)',
  jurisdiction: 'BR',
  effectiveDate: '2020-08-28',
};

export const mockJuridicalSourceGdpr: JuridicalSource = {
  regulation: 'Regulamento (UE) 2016/679 - GDPR, Artigo 17 (Direito ao Esquecimento)',
  jurisdiction: 'UE',
  effectiveDate: '2018-05-25',
};

export const mockJuridicalSourceCalifornia: JuridicalSource = {
  regulation: 'California Consumer Privacy Act (CCPA), Seção 1798.100',
  jurisdiction: 'US',
  effectiveDate: '2020-01-01',
};

export const mockJuridicalSourceInternational: JuridicalSource = {
  regulation: 'ISO 27001:2022 - Information Security Management System',
  jurisdiction: 'INTL',
  effectiveDate: '2022-10-14',
};

// ==================== MOCK: Regulation Impact ====================

/**
 * High-confidence impact from PostgreSQL
 * Typical: Regulations stored in structured database
 */
export const mockImpactLgpd: RegulationImpact = {
  id: 'impact-lgpd-001',
  title: 'Compliance com LGPD - Direito de Acesso (Art. 18)',
  impactLevel: 'CRITICAL',
  relevance: 'Aplicável a toda operação de processamento de dados pessoais de residentes no Brasil',
  summary:
    'Necessário implementar mecanismo para que titulares de dados possam acessar seus dados pessoais em formato compreensível',

  metadata: mockMetadataHighConfidenceSql,
  source: mockJuridicalSourceLgpd,
};

/**
 * Moderate-confidence impact from Vector DB
 * Typical: Semantic search match on policy documents
 */
export const mockImpactVectorSearch: RegulationImpact = {
  id: 'impact-vector-001',
  title: 'Possível Impacto: Retenção de Dados em Terceiros',
  impactLevel: 'HIGH',
  relevance:
    'Baseado em análise semântica de documento de política de privacidade enviado',
  summary:
    'Sistema detectou menção a retenção de dados em servidores internacionais. Pode requerer adequação conforme LGPD Art. 33',

  metadata: mockMetadataModerateConfidenceVector,
  source: {
    regulation: 'Artigo 33 da Lei 13.709/2018 (LGPD) - Transferência Internacional',
    jurisdiction: 'BR',
    effectiveDate: '2020-08-28',
  },
};

/**
 * Hybrid-confidence impact combining SQL + Vector
 * Typical: High-trust result from triangulated sources
 */
export const mockImpactHybrid: RegulationImpact = {
  id: 'impact-hybrid-001',
  title: 'Compliance Multinacional: LGPD + GDPR',
  impactLevel: 'CRITICAL',
  relevance:
    'Triangulação de dados: Regulação SQL + Busca semântica confirmam aplicabilidade dupla',
  summary:
    'Empresa com operações em BR e UE. Requer compliance dual: LGPD (Art. 52) + GDPR (Art. 17)',

  metadata: mockMetadataHybrid,
  source: mockJuridicalSourceLgpd,
};

/**
 * Low-confidence impact (use with caution in UI)
 * Display with 🔴 badge, request manual verification
 */
export const mockImpactLowConfidence: RegulationImpact = {
  id: 'impact-low-conf-001',
  title: '⚠️ Possível Impacto Detectado (Requer Revisão)',
  impactLevel: 'MEDIUM',
  relevance: 'Análise semântica com confiança baixa - verifique manualmente',
  summary: 'Documento contém termos relacionados a "dados biométricos". Pode se relacionar à LGPD Art. 13',

  metadata: mockMetadataLowConfidence,
  source: {
    regulation: 'Artigo 13 da Lei 13.709/2018 (LGPD) - Dados Sensíveis',
    jurisdiction: 'BR',
    effectiveDate: '2020-08-28',
  },
};

// ==================== MOCK: Checklist Items ====================

export const mockChecklistItemCritical: ChecklistItem = {
  id: 'task-lgpd-access-api',
  task: 'Implementar API de Direito de Acesso',
  description:
    'Desenvolver endpoint que permite usuários acessarem seus dados pessoais em formato estruturado e legível',
  completed: false,

  priority: 'critical',
  linkedImpactId: 'impact-lgpd-001',
  dueDate: '2026-06-15', // 6 weeks from now
};

export const mockChecklistItemHigh: ChecklistItem = {
  id: 'task-lgpd-deletion-impl',
  task: 'Implementar Direito ao Esquecimento',
  description:
    'Implementar mecanismo de exclusão completa de dados pessoais com cascata em serviços relacionados',
  completed: false,

  priority: 'high',
  linkedImpactId: 'impact-lgpd-001',
  dueDate: '2026-07-30',
};

export const mockChecklistItemMedium: ChecklistItem = {
  id: 'task-audit-policy',
  task: 'Revisar Política de Privacidade',
  description: 'Atualizar documento de política de privacidade conforme LGPD e comunicar a usuários',
  completed: false,

  priority: 'medium',
  linkedImpactId: 'impact-hybrid-001',
  dueDate: '2026-09-30',
};

export const mockChecklistItemLow: ChecklistItem = {
  id: 'task-training',
  task: 'Treinar equipe em LGPD',
  description: 'Curso online obrigatório para todos os funcionários que lidam com dados pessoais',
  completed: true,

  priority: 'low',
  linkedImpactId: 'impact-lgpd-001',
  dueDate: '2026-12-31',
};

// ==================== MOCK: Chat Messages ====================

export const mockChatMessages: ChatMessage[] = [
  {
    role: 'user',
    content: 'Somos uma empresa com operações no Brasil e Europa. Como ficamos com LGPD?',
    timestamp: '2026-04-30T10:15:00Z',
    confidence: 1.0, // User input always 100% confident
  },

  {
    role: 'assistant',
    content:
      'Sim, sua empresa está sujeita à LGPD (Lei Geral de Proteção de Dados do Brasil). Como você processa dados pessoais de residentes brasileiros, você deve cumprir todos os 11 artigos principais. Aqui estão as ações críticas:\n\n1. **Art. 18** - Direito de Acesso: Usuários podem solicitar seus dados\n2. **Art. 52** - Sanções: Multas até R$ 50 milhões por violação\n3. **Art. 33** - Transferência Internacional: Se enviar dados para o exterior\n\nRecomendação: Implementar API de acesso em 6 semanas.',
    timestamp: '2026-04-30T10:16:30Z',
    confidence: 0.93, // High confidence - data from PostgreSQL + Vector confirmation
    agentsUsed: [
      {
        id: 'agent-1',
        name: 'classificador',
        displayName: 'Classificador',
        status: 'concluído',
        progress: 100,
        message: 'Classificou como: LGPD Compliance',
      },
      {
        id: 'agent-2',
        name: 'matching',
        displayName: 'Matching',
        status: 'concluído',
        progress: 100,
        message: 'Encontrou 3 normas relevantes',
      },
      {
        id: 'agent-3',
        name: 'interpretador',
        displayName: 'Interpretador',
        status: 'concluído',
        progress: 100,
        message: 'Gerou 5 impactos críticos',
      },
    ],
  },

  {
    role: 'user',
    content: 'E quanto a dados biométricos? Temos reconhecimento facial em nossas lojas.',
    timestamp: '2026-04-30T10:18:15Z',
    confidence: 1.0,
  },

  {
    role: 'assistant',
    content:
      '⚠️ **Confiança Moderada (72%)** - Esta análise é baseada em busca semântica.\n\nSeu uso de reconhecimento facial com dados biométricos toca em:  \n\n- **LGPD Art. 13** - Tratamento de dados sensíveis (requer consentimento explícito)  \n- Possível aplicação de **GDPR Art. 9** se você tiver usuários europeus  \n- Pode requerer **avaliação de impacto** (DPIA) conforme regulações  \n\n**Ação recomendada:** Revisar política de privacidade e obter parecer jurídico especializado.',
    timestamp: '2026-04-30T10:19:45Z',
    confidence: 0.72, // Moderate confidence - vector similarity 0.85
    agentsUsed: [
      {
        id: 'agent-2',
        name: 'matching',
        displayName: 'Matching',
        status: 'concluído',
        progress: 100,
        message: 'Busca semântica com 0.85 score',
      },
      {
        id: 'agent-3',
        name: 'interpretador',
        displayName: 'Interpretador',
        status: 'concluído',
        progress: 100,
        message: 'Interpretação com confiança moderada',
      },
    ],
  },
];

// ==================== MOCK: Complete Scenario ====================

export const mockCompleteScenario = {
  impacts: [mockImpactLgpd, mockImpactVectorSearch, mockImpactHybrid, mockImpactLowConfidence],
  checklist: [mockChecklistItemCritical, mockChecklistItemHigh, mockChecklistItemMedium, mockChecklistItemLow],
  messages: mockChatMessages,
};

// ==================== HELPERS: Confidence Interpretation ====================

/**
 * Get badge color based on confidence score
 * @param confidence - Score 0-1
 * @returns Tailwind color class
 */
export function getConfidenceBadgeColor(confidence: number): string {
  if (confidence >= 0.8) return 'bg-green-50 text-green-700 border-green-200';
  if (confidence >= 0.5) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  return 'bg-red-50 text-red-700 border-red-200';
}

/**
 * Get badge emoji based on confidence score
 * @param confidence - Score 0-1
 * @returns Emoji string
 */
export function getConfidenceEmoji(confidence: number): string {
  if (confidence >= 0.8) return '🟢';
  if (confidence >= 0.5) return '🟡';
  return '🔴';
}

/**
 * Get priority badge color
 * @param priority - Priority level
 * @returns Tailwind color class
 */
export function getPriorityBadgeColor(
  priority?: 'critical' | 'high' | 'medium' | 'low'
): string {
  switch (priority) {
    case 'critical':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'high':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'medium':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'low':
      return 'bg-green-50 text-green-700 border-green-200';
    default:
      return 'bg-zinc-50 text-zinc-700 border-zinc-200';
  }
}
