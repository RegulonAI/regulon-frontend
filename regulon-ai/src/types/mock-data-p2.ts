/**
 * Mock Data Examples for P2 Hybrid Architecture
 * 
 * Demonstrates how to use the new DataSourceMetadata, RegulationSource,
 * and extended interfaces with real-world scenarios.
 * 
 * Use these examples to test Dashboard, Chat, and Checklist components.
 */

import {
  RegulationImpact,
  ChecklistItem,
  ChatMessage,
  DataSourceMetadata,
  RegulationSource,
} from '@/types/compliance';

// ==================== MOCK: Data Source Metadata ====================

export const mockMetadataHighConfidenceSql: DataSourceMetadata = {
  source: 'sql',
  confidenceScore: 98,
  retrievedAt: '2026-04-30T10:00:00Z',
};

export const mockMetadataModerateConfidenceVector: DataSourceMetadata = {
  source: 'vector_db',
  confidenceScore: 72,
  similarity: 85,
  retrievedAt: '2026-04-30T10:00:00Z',
};

export const mockMetadataHybrid: DataSourceMetadata = {
  source: 'hybrid',
  confidenceScore: 95,
  similarity: 92,
  retrievedAt: '2026-04-30T10:00:00Z',
};

export const mockMetadataLowConfidence: DataSourceMetadata = {
  source: 'vector_db',
  confidenceScore: 45,
  similarity: 42,
  retrievedAt: '2026-04-30T10:00:00Z',
};

// ==================== MOCK: Juridical Source ====================

export const mockJuridicalSourceLgpd: RegulationSource = {
  regulationName: 'LGPD',
  jurisdiction: 'BR',
  effectiveDate: '2020-08-28',
};

export const mockJuridicalSourceGdpr: RegulationSource = {
  regulationName: 'GDPR',
  jurisdiction: 'UE',
  effectiveDate: '2018-05-25',
};

export const mockJuridicalSourceCalifornia: RegulationSource = {
  regulationName: 'CCPA',
  jurisdiction: 'US',
  effectiveDate: '2020-01-01',
};

export const mockJuridicalSourceInternational: RegulationSource = {
  regulationName: 'ISO 27001',
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
    regulationName: 'LGPD',
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
    regulationName: 'LGPD',
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
    metadata: {
      confidenceScore: 100,
    },
  },

  {
    role: 'assistant',
    content:
      'Sim, sua empresa está sujeita à LGPD (Lei Geral de Proteção de Dados do Brasil). Como você processa dados pessoais de residentes brasileiros, você deve cumprir todos os 11 artigos principais. Aqui estão as ações críticas:\n\n1. **Art. 18** - Direito de Acesso: Usuários podem solicitar seus dados\n2. **Art. 52** - Sanções: Multas até R$ 50 milhões por violação\n3. **Art. 33** - Transferência Internacional: Se enviar dados para o exterior\n\nRecomendação: Implementar API de acesso em 6 semanas.',
    timestamp: '2026-04-30T10:16:30Z',
    metadata: {
      confidenceScore: 93,
      agentsUsed: [
      {
        id: 'agent-1',
        name: 'classificador',
        displayName: 'Classificador',
      },
      {
        id: 'agent-2',
        name: 'matching',
        displayName: 'Matching',
      },
      {
        id: 'agent-3',
        name: 'interpretador',
        displayName: 'Interpretador',
      },
      ],
    },
  },

  {
    role: 'user',
    content: 'E quanto a dados biométricos? Temos reconhecimento facial em nossas lojas.',
    timestamp: '2026-04-30T10:18:15Z',
    metadata: {
      confidenceScore: 100,
    },
  },

  {
    role: 'assistant',
    content:
      '⚠️ **Confiança Moderada (72%)** - Esta análise é baseada em busca semântica.\n\nSeu uso de reconhecimento facial com dados biométricos toca em:  \n\n- **LGPD Art. 13** - Tratamento de dados sensíveis (requer consentimento explícito)  \n- Possível aplicação de **GDPR Art. 9** se você tiver usuários europeus  \n- Pode requerer **avaliação de impacto** (DPIA) conforme regulações  \n\n**Ação recomendada:** Revisar política de privacidade e obter parecer jurídico especializado.',
    timestamp: '2026-04-30T10:19:45Z',
    metadata: {
      confidenceScore: 72,
      agentsUsed: [
      {
        id: 'agent-2',
        name: 'matching',
        displayName: 'Matching',
      },
      {
        id: 'agent-3',
        name: 'interpretador',
        displayName: 'Interpretador',
      },
      ],
    },
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
 * @param confidence - Score 0-100
 * @returns Tailwind color class
 */
export function getConfidenceBadgeColor(confidence: number): string {
  if (confidence >= 80) return 'bg-green-50 text-green-700 border-green-200';
  if (confidence >= 50) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  return 'bg-red-50 text-red-700 border-red-200';
}

/**
 * Get badge emoji based on confidence score
 * @param confidence - Score 0-100
 * @returns Emoji string
 */
export function getConfidenceEmoji(confidence: number): string {
  if (confidence >= 80) return '🟢';
  if (confidence >= 50) return '🟡';
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
