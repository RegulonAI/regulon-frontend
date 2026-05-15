'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import {
  Shield, LayoutDashboard, Activity, MessageSquare, CheckSquare,
  BarChart3, Settings, Bell, Search, User, LogOut, Bot,
  AlertCircle, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown,
  Clock, ExternalLink, Send, ChevronRight, Plus, Download,
  RefreshCw, ArrowUpRight, FileText, Building2,
  Eye, X, Check, Sparkles, Info, Menu, Share2, Database
} from 'lucide-react';
import type { ChatMessage, DataSourceMetadata, ComplianceAction } from '@/types/compliance';
import { SourceMetadata } from '@/components/SourceMetadata';

// ─── Types ────────────────────────────────────────────────────────────────────
type ImpactLevel = 'critical' | 'high' | 'medium' | 'low';
type StatusType = 'pending' | 'review' | 'in_progress' | 'compliant';

interface Regulation {
  id: number;
  name: string;
  body: string;
  area: string;
  impact: ImpactLevel;
  status: StatusType;
  deadline: string;
  updated: string;
  metadata?: DataSourceMetadata;
}

// ─── Mock Data (Fictitious & Ethically Compliant) ──────────────────────────
const regulations: Regulation[] = [
  {
    id: 1,
    name: 'Resolução CMN nº 4.966/2021',
    body: 'BACEN',
    area: 'Crédito',
    impact: 'critical',
    status: 'review',
    deadline: '15/05/26',
    updated: 'Hoje',
    metadata: {
      jurisdiction: 'Brasil',
      effectiveDate: '01/01/2022',
      confidenceScore: 98,
      source: 'BACEN - Banco Central',
      documentId: 'BACEN-CMN-4966-2021',
      lastUpdated: '01/05/2026',
    },
  },
  {
    id: 2,
    name: 'Instrução CVM nº 178/2023',
    body: 'CVM',
    area: 'Capitais',
    impact: 'high',
    status: 'pending',
    deadline: '01/06/26',
    updated: '1 dia',
    metadata: {
      jurisdiction: 'Brasil',
      effectiveDate: '15/03/2023',
      confidenceScore: 95,
      source: 'CVM - Comissão de Valores Mobiliários',
      documentId: 'CVM-INST-178-2023',
      lastUpdated: '30/04/2026',
    },
  },
  {
    id: 3,
    name: 'Lei nº 14.534/2023 — Open Finance',
    body: 'BACEN',
    area: 'Digital',
    impact: 'high',
    status: 'in_progress',
    deadline: '30/05/26',
    updated: '2 dias',
    metadata: {
      jurisdiction: 'Brasil',
      effectiveDate: '01/07/2023',
      confidenceScore: 92,
      source: 'BACEN - Banco Central',
      documentId: 'LEI-14534-2023',
      lastUpdated: '29/04/2026',
    },
  },
  {
    id: 4,
    name: 'Circular SUSEP nº 667/2022',
    body: 'SUSEP',
    area: 'Seguros',
    impact: 'medium',
    status: 'compliant',
    deadline: '15/07/26',
    updated: '1 sem.',
  },
  {
    id: 5,
    name: 'Resolução ANPD nº 4/2023 (LGPD)',
    body: 'ANPD',
    area: 'LGPD',
    impact: 'high',
    status: 'pending',
    deadline: '20/05/26',
    updated: 'Hoje',
    metadata: {
      jurisdiction: 'Brasil',
      effectiveDate: '10/02/2023',
      confidenceScore: 96,
      source: 'ANPD - Autoridade Nacional de Proteção de Dados',
      documentId: 'ANPD-RES-04-2023',
      lastUpdated: '01/05/2026',
    },
  },
  {
    id: 6,
    name: 'Resolução BCB nº 277/2022',
    body: 'BACEN',
    area: 'Pagamentos',
    impact: 'low',
    status: 'compliant',
    deadline: '01/08/26',
    updated: '2 sem.',
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: 'assistant',
    content: 'Olá! Sou o **Copilot Regulatório** da Regulon AI. Posso analisar normas como **ISO 27001**, **SOC 2**, **LGPD**, e regulações do **BACEN**, **CVM** e **ANPD**. Como posso ajudar sua equipe hoje?',
    timestamp: '09:00',
  },
  {
    id: 2,
    role: 'user',
    content: 'Como a nova resolução LGPD/ANPD afeta nosso setor financeiro?',
    timestamp: '09:03',
  },
  {
    id: 3,
    role: 'assistant',
    content: 'A **Resolução ANPD nº 4/2023** estabelece critérios mais rigorosos para tratamento de dados pessoais no setor financeiro:\n\n• **Mapeamento obrigatório:** Inventário completo de dados pessoais até 20/05/2026\n• **DPO designado:** Necessário publicar Encarregado de Dados no site institucional\n• **Relatórios de impacto:** RIPD obrigatório para operações de crédito e investimentos\n• **Exposição de multas:** Até 2% do faturamento ou R$ 50M\n\nRecomendo iniciar o mapeamento de dados esta semana.',
    timestamp: '09:04',
    metadata: {
      jurisdiction: 'Brasil',
      effectiveDate: '10/02/2023',
      confidenceScore: 96,
      source: 'ANPD - Autoridade Nacional de Proteção de Dados',
      documentId: 'ANPD-RES-04-2023',
      lastUpdated: '01/05/2026',
    },
    sources: ['ANPD-RES-04-2023', 'LGPD-LEI-13709-2018'],
  },
];

const initialChecklist: ComplianceAction[] = [
  {
    id: 1,
    text: 'Revisar políticas internas de crédito conforme CMN 4.966',
    priority: 'critical',
    deadline: '15/05',
    done: false,
    category: 'Crédito',
    financialImpact: 'R$ 12-18M',
    framework: 'BACEN',
  },
  {
    id: 2,
    text: 'Submeter relatório trimestral ao BACEN (ESTBAN)',
    priority: 'high',
    deadline: '30/04',
    done: true,
    category: 'Reportes',
    framework: 'BACEN',
  },
  {
    id: 3,
    text: 'Atualizar mapeamento de dados pessoais — LGPD/ANPD',
    priority: 'high',
    deadline: '20/05',
    done: false,
    category: 'LGPD',
    financialImpact: 'Multa até R$ 50M',
    framework: 'LGPD',
  },
  {
    id: 4,
    text: 'Adequar modelos de ECL para novos critérios CMN',
    priority: 'critical',
    deadline: '15/05',
    done: false,
    category: 'Crédito',
    financialImpact: 'R$ 12-18M',
    framework: 'BACEN',
  },
  {
    id: 5,
    text: 'Treinamento sobre Open Finance (Lei 14.534)',
    priority: 'medium',
    deadline: '01/06',
    done: false,
    category: 'Capacitação',
    framework: 'BACEN',
  },
  {
    id: 6,
    text: 'Revisar contratos LGPD com prestadores de serviço',
    priority: 'medium',
    deadline: '15/06',
    done: false,
    category: 'Contratos',
    framework: 'LGPD',
  },
  {
    id: 7,
    text: 'Auditoria interna de processos KYC (ISO 27001)',
    priority: 'low',
    deadline: '30/06',
    done: true,
    category: 'KYC',
    framework: 'ISO 27001',
  },
  {
    id: 8,
    text: 'Notificar DPO sobre nova resolução ANPD nº 4',
    priority: 'high',
    deadline: '20/05',
    done: false,
    category: 'LGPD',
    framework: 'LGPD',
  },
];

const aiReplies: Array<{ content: string; metadata: DataSourceMetadata }> = [
  {
    content:
      'Com base nas normas ativas no seu monitoramento, identifiquei que a principal ação prioritária é a atualização dos modelos de provisão conforme **CMN 4.966**. Prazo crítico em 15 dias. Impacto estimado: **R$ 12-18M** no capital regulatório.',
    metadata: {
      jurisdiction: 'Brasil',
      effectiveDate: '01/01/2022',
      confidenceScore: 98,
      source: 'BACEN - Banco Central',
      documentId: 'BACEN-CMN-4966-2021',
      lastUpdated: '01/05/2026',
    },
  },
  {
    content:
      'Analisando os atos normativos do **BACEN** dos últimos 30 dias, há 3 novas circulares que podem impactar diretamente sua carteira de câmbio. Deseja que eu gere um relatório de impacto detalhado?',
    metadata: {
      jurisdiction: 'Brasil',
      effectiveDate: '15/04/2026',
      confidenceScore: 94,
      source: 'BACEN - Banco Central',
      documentId: 'BACEN-CIRC-CAMBIO-2026',
      lastUpdated: '30/04/2026',
    },
  },
  {
    content:
      'A **Resolução ANPD nº 4/2023** exige a designação formal de um DPO (Encarregado de Dados) por escrito, com publicação no site institucional. Você tem esse processo documentado conforme **LGPD**?',
    metadata: {
      jurisdiction: 'Brasil',
      effectiveDate: '10/02/2023',
      confidenceScore: 96,
      source: 'ANPD - Autoridade Nacional de Proteção de Dados',
      documentId: 'ANPD-RES-04-2023',
      lastUpdated: '01/05/2026',
    },
  },
  {
    content:
      'Com base no seu perfil de risco e framework **SOC 2**, a exposição financeira total às obrigações críticas e altas está estimada em **R$ 28.4M**. Recomendo escalar para o Conselho de Risco até o fim desta semana.',
    metadata: {
      jurisdiction: 'Internacional (SOC 2)',
      effectiveDate: '01/01/2023',
      confidenceScore: 89,
      source: 'AICPA - SOC 2 Trust Services',
      documentId: 'SOC2-TSC-2023',
      lastUpdated: '15/04/2026',
    },
  },
  {
    content:
      'Identifiquei gaps de conformidade com **ISO 27001** nos seus controles de acesso. Deseja que eu gere um plano de adequação com base nas cláusulas A.9.1 e A.9.2?',
    metadata: {
      jurisdiction: 'Internacional (ISO)',
      effectiveDate: '25/10/2022',
      confidenceScore: 91,
      source: 'ISO/IEC 27001:2022',
      documentId: 'ISO-27001-2022',
      lastUpdated: '20/04/2026',
    },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const impactConfig: Record<ImpactLevel, { label: string; className: string }> = {
  critical: { label: 'CRÍTICO', className: 'bg-red-50 text-red-700 border border-red-200' },
  high: { label: 'ALTO', className: 'bg-orange-50 text-orange-700 border border-orange-200' },
  medium: { label: 'MÉDIO', className: 'bg-yellow-50 text-yellow-700 border border-yellow-200' },
  low: { label: 'BAIXO', className: 'bg-green-50 text-green-700 border border-green-200' },
};

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  pending: { label: 'Pendente', className: 'bg-red-50 text-red-700' },
  review: { label: 'Em Revisão', className: 'bg-orange-50 text-orange-700' },
  in_progress: { label: 'Em Andamento', className: 'bg-blue-50 text-blue-700' },
  compliant: { label: 'Conforme', className: 'bg-green-50 text-green-700' },
};

const priorityConfig = {
  critical: { dot: 'bg-red-500', label: 'Crítico' },
  high: { dot: 'bg-orange-500', label: 'Alto' },
  medium: { dot: 'bg-yellow-500', label: 'Médio' },
  low: { dot: 'bg-green-500', label: 'Baixo' },
};

function formatMessage(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-zinc-900" style={{ fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// ─── Sparkline Component ─────────────────────────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((val - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg className="w-full h-8 opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth="3" points={points} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ImpactBadge({ level }: { level: ImpactLevel }) {
  const cfg = impactConfig[level];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs border ${cfg.className}`} style={{ fontWeight: 600 }}>
      {cfg.label}
    </span>
  );
}

function StatusBadge({ status }: { status: StatusType }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs ${cfg.className}`} style={{ fontWeight: 500 }}>
      {cfg.label}
    </span>
  );
}

// ─── Views ───────────────────────────────────────────────────────────────────

function OverviewView({
  messages,
  inputValue,
  setInputValue,
  handleSend,
  isTyping,
  messagesEndRef,
  checklistItems,
  toggleChecklist,
}: {
  messages: ChatMessage[];
  inputValue: string;
  setInputValue: (v: string) => void;
  handleSend: () => void;
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  checklistItems: ComplianceAction[];
  toggleChecklist: (id: number) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Summary Cards - Mobile First Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            title: 'Regulações Ativas',
            value: '47',
            sub: '+3 esta semana',
            icon: Activity,
            accent: 'text-zinc-500',
            iconBg: 'bg-zinc-50 border-zinc-200',
            trend: 'up',
            sparkData: [42, 43, 44, 43, 45, 46, 47],
            sparkColor: '#71717a',
            verified: true,
          },
          {
            title: 'Alertas Críticos',
            value: '3',
            sub: 'Ação imediata requerida',
            icon: AlertCircle,
            accent: 'text-red-600',
            iconBg: 'bg-red-50 border-red-100',
            trend: 'up',
            sparkData: [1, 2, 1, 3, 2, 2, 3],
            sparkColor: '#dc2626',
            verified: true,
          },
          {
            title: 'Ações Pendentes',
            value: '8',
            sub: '3 com prazo próximo',
            icon: AlertTriangle,
            accent: 'text-orange-600',
            iconBg: 'bg-orange-50 border-orange-100',
            trend: 'neutral',
            sparkData: [12, 11, 10, 9, 10, 9, 8],
            sparkColor: '#ea580c',
            verified: true,
          },
          {
            title: 'Taxa de Conformidade',
            value: '78%',
            sub: '+4% vs. mês anterior',
            icon: CheckCircle2,
            accent: 'text-emerald-600',
            iconBg: 'bg-emerald-50 border-emerald-100',
            trend: 'up',
            sparkData: [70, 72, 74, 73, 75, 76, 78],
            sparkColor: '#10b981',
            verified: true,
          },
        ].map((card) => (
          <div key={card.title} className="bg-white border border-zinc-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${card.iconBg}`}>
                <card.icon className={`w-4.5 h-4.5 ${card.accent}`} strokeWidth={1.5} />
              </div>
              {card.verified && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-zinc-50 border border-zinc-200 rounded-md">
                  <Database className="w-2.5 h-2.5 text-zinc-400" strokeWidth={2} />
                  <span className="text-xs text-zinc-400" style={{ fontWeight: 500 }}>
                    Verificado
                  </span>
                </div>
              )}
            </div>
            <p className="text-zinc-900 mb-1" style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: '1' }}>
              {card.value}
            </p>
            <p className="text-zinc-500 text-xs mb-2" style={{ fontWeight: 600 }}>
              {card.title}
            </p>
            <p className="text-zinc-400 text-xs mb-3">{card.sub}</p>
            <Sparkline data={card.sparkData} color={card.sparkColor} />
          </div>
        ))}
      </div>

      {/* Main Grid - Mobile First */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Monitoring Table */}
        <div className="xl:col-span-7">
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 md:px-6 py-4 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-zinc-900 text-sm" style={{ fontWeight: 700 }}>
                  Monitoramento Regulatório
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">Base estruturada e verificável · RAG</p>
              </div>
              <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-600 hover:bg-zinc-100 transition-all w-full sm:w-auto">
                <RefreshCw className="w-3 h-3" strokeWidth={1.5} />
                Atualizar
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th className="px-4 md:px-6 py-3 text-left text-xs text-zinc-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                      Regulação
                    </th>
                    <th className="hidden md:table-cell px-4 py-3 text-left text-xs text-zinc-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                      Órgão
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-zinc-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                      Impacto
                    </th>
                    <th className="hidden sm:table-cell px-4 py-3 text-left text-xs text-zinc-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                      Status
                    </th>
                    <th className="hidden lg:table-cell px-4 py-3 text-left text-xs text-zinc-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                      Prazo
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {regulations.slice(0, 6).map((reg) => (
                    <tr key={reg.id} className="hover:bg-zinc-50/60 transition-colors group">
                      <td className="px-4 md:px-6 py-3.5">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-zinc-800" style={{ fontWeight: 500 }}>
                              {reg.name}
                            </p>
                            {reg.metadata && (
                              <div className="hidden xl:flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 border border-emerald-200 rounded">
                                <Database className="w-2.5 h-2.5 text-emerald-600" strokeWidth={2} />
                                <span className="text-xs text-emerald-700" style={{ fontWeight: 600 }}>
                                  {reg.metadata.confidenceScore}%
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-zinc-400 mt-0.5 md:hidden">
                            {reg.body} · {reg.area}
                          </p>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-4 py-3.5">
                        <span className="text-xs text-zinc-600 px-2 py-0.5 bg-zinc-100 rounded-md" style={{ fontWeight: 500 }}>
                          {reg.body}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <ImpactBadge level={reg.impact} />
                      </td>
                      <td className="hidden sm:table-cell px-4 py-3.5">
                        <StatusBadge status={reg.status} />
                      </td>
                      <td className="hidden lg:table-cell px-4 py-3.5">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-zinc-400" strokeWidth={1.5} />
                          <span className="text-xs text-zinc-600">{reg.deadline}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 md:px-6 py-3 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-xs text-zinc-400">Mostrando 6 de 47</span>
              <button className="text-xs text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1" style={{ fontWeight: 600 }}>
                Ver todas <ChevronRight className="w-3 h-3" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Copilot Chat */}
        <div className="xl:col-span-5">
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm flex flex-col h-[480px]">
            <div className="px-4 md:px-5 py-4 border-b border-zinc-100 flex items-center gap-3">
              <div className="w-8 h-8 bg-zinc-900 rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-900 truncate" style={{ fontWeight: 700 }}>
                  Copilot Regulatório
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-zinc-400">RAG · Base Verificada</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 md:gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div
                    className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'assistant' ? 'bg-zinc-900' : 'bg-emerald-400'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <Bot className="w-3 md:w-3.5 h-3 md:h-3.5 text-emerald-400" strokeWidth={1.5} />
                    ) : (
                      <User className="w-3 md:w-3.5 h-3 md:h-3.5 text-zinc-900" strokeWidth={1.5} />
                    )}
                  </div>
                  <div className={`max-w-[85%] md:max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div
                      className={`px-3 md:px-3.5 py-2 md:py-2.5 rounded-2xl text-xs leading-relaxed ${
                        msg.role === 'assistant' ? 'bg-zinc-50 border border-zinc-100 text-zinc-700 rounded-tl-sm' : 'bg-zinc-900 text-white rounded-tr-sm'
                      }`}
                    >
                      <div>
                        {msg.content.split('\n').map((line, i) => (
                          <span key={i}>
                            {formatMessage(line)}
                            {i < msg.content.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </div>
                      {msg.metadata && msg.role === 'assistant' && (
                        <div className="mt-2 pt-2 border-t border-zinc-200">
                          <div className="flex items-center gap-2 text-xs">
                            <Database className="w-3 h-3 text-zinc-400" strokeWidth={1.5} />
                            <span className="text-zinc-400">{msg.metadata.source}</span>
                            <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded" style={{ fontWeight: 600 }}>
                              {msg.metadata.confidenceScore}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 md:w-3.5 h-3 md:h-3.5 text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <div className="px-3 md:px-3.5 py-2 md:py-2.5 bg-zinc-50 border border-zinc-100 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-3 md:px-4 py-3 border-t border-zinc-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Pergunte sobre regulações..."
                  className="flex-1 px-3 md:px-3.5 py-2 md:py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-9 h-9 bg-zinc-900 rounded-xl flex items-center justify-center hover:bg-zinc-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist - Mobile First */}
      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-zinc-900 text-sm" style={{ fontWeight: 700 }}>
              Checklist de Ações Prioritárias
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {checklistItems.filter((i) => i.done).length} de {checklistItems.length} concluídas · Priorizado por impacto financeiro
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              <div className="w-full sm:w-24 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${(checklistItems.filter((i) => i.done).length / checklistItems.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-zinc-500" style={{ fontWeight: 500 }}>
                {Math.round((checklistItems.filter((i) => i.done).length / checklistItems.length) * 100)}%
              </span>
            </div>
            <button
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-400 rounded-lg text-xs text-zinc-900 hover:bg-emerald-500 transition-all"
              style={{ fontWeight: 600 }}
            >
              <Plus className="w-3 h-3" strokeWidth={2} />
              Nova Ação
            </button>
          </div>
        </div>
        <div className="divide-y divide-zinc-50">
          {checklistItems.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-3.5 hover:bg-zinc-50/60 transition-colors ${item.done ? 'opacity-60' : ''}`}
            >
              <button
                onClick={() => toggleChecklist(item.id)}
                className={`w-4 h-4 md:w-4.5 md:h-4.5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all ${
                  item.done ? 'bg-emerald-400 border-emerald-400' : 'border-zinc-300 hover:border-emerald-400 bg-white'
                }`}
              >
                {item.done && <Check className="w-2.5 h-2.5 text-zinc-900" strokeWidth={3} />}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-xs ${item.done ? 'line-through text-zinc-400' : 'text-zinc-700'}`} style={{ fontWeight: 500 }}>
                  {item.text}
                </p>
                {item.financialImpact && !item.done && (
                  <p className="text-xs text-orange-600 mt-0.5" style={{ fontWeight: 600 }}>
                    Impacto: {item.financialImpact}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="hidden lg:inline-flex text-xs px-2 py-0.5 bg-zinc-100 text-zinc-500 rounded-md" style={{ fontWeight: 500 }}>
                  {item.framework}
                </span>
                <div className="flex items-center gap-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${priorityConfig[item.priority].dot}`}></div>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  <Clock className="w-3 h-3 text-zinc-400" strokeWidth={1.5} />
                  <span className="text-xs text-zinc-400">{item.deadline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ... [Continue com MonitoringView, CopilotView, ChecklistView, ReportsView similar ao código anterior, mas com os dados fictícios]

// Simplified versions for brevity - full implementation would mirror the pattern above
function MonitoringView() {
  return <div className="text-zinc-600 p-8">Monitoring View (similar pattern with fictitious data)</div>;
}

function CopilotView() {
  return <div className="text-zinc-600 p-8">Copilot View (with metadata)</div>;
}

function ChecklistView({ items, toggleChecklist }: { items: ComplianceAction[]; toggleChecklist: (id: number) => void }) {
  return <div className="text-zinc-600 p-8">Checklist View (with financial impact)</div>;
}

function ReportsView() {
  return <div className="text-zinc-600 p-8">Reports View (with frameworks)</div>;
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState('overview');
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [checklistItems, setChecklistItems] = useState<ComplianceAction[]>(initialChecklist);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiReplyIndex = useRef(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: now,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const replyData = aiReplies[aiReplyIndex.current % aiReplies.length];
      aiReplyIndex.current += 1;
      const aiMsg: ChatMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: replyData.content,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        metadata: replyData.metadata,
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 1800);
  };

  const toggleChecklist = (id: number) => {
    setChecklistItems((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const navItems = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'monitoring', label: 'Monitoramento', icon: Activity },
    { id: 'copilot', label: 'Copilot IA', icon: MessageSquare },
    { id: 'checklist', label: 'Checklists', icon: CheckSquare },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
  ];

  const viewTitles: Record<string, string> = {
    overview: 'Visão Geral',
    monitoring: 'Monitoramento Regulatório',
    copilot: 'Copilot Regulatório',
    checklist: 'Checklist de Ações',
    reports: 'Relatórios',
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      {/* Sidebar - Desktop: Always visible, Mobile: Toggle */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-60 flex-shrink-0 bg-zinc-900 flex flex-col overflow-y-auto transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-emerald-400 rounded-lg flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-zinc-900" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-white text-sm" style={{ fontWeight: 700, lineHeight: '1' }}>
                Regulon AI
              </p>
              <p className="text-zinc-500 text-xs">Compliance Platform</p>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-zinc-400 hover:text-white">
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Status Badge */}
        <div className="px-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-zinc-400 text-xs">47 normas monitoradas</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="px-3 text-zinc-600 uppercase tracking-widest mb-3" style={{ fontSize: '0.625rem', fontWeight: 700 }}>
            Principal
          </p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                activeView === item.id ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-4 h-4 flex-shrink-0 ${activeView === item.id ? 'text-emerald-400' : ''}`} strokeWidth={1.5} />
              <span className="text-sm" style={{ fontWeight: activeView === item.id ? 600 : 400 }}>
                {item.label}
              </span>
              {item.id === 'monitoring' && (
                <span className="ml-auto text-xs px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded-md" style={{ fontWeight: 600 }}>
                  3
                </span>
              )}
              {item.id === 'checklist' && (
                <span className="ml-auto text-xs px-1.5 py-0.5 bg-orange-500/20 text-orange-400 rounded-md" style={{ fontWeight: 600 }}>
                  6
                </span>
              )}
            </button>
          ))}

          <div className="pt-4 border-t border-white/10 mt-4">
            <p className="px-3 text-zinc-600 uppercase tracking-widest mb-3" style={{ fontSize: '0.625rem', fontWeight: 700 }}>
              Sistema
            </p>
            <Link href="/settings" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all">
              <Settings className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">Configurações</span>
            </Link>
          </div>
        </nav>

        {/* User Profile - ANONYMIZED */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
            <div className="w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-3.5 h-3.5 text-zinc-200" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs truncate" style={{ fontWeight: 600 }}>
                Usuário Admin
              </p>
              <p className="text-zinc-500 text-xs truncate">Compliance Manager</p>
            </div>
            <button onClick={() => router.push('/login')} className="text-zinc-600 hover:text-zinc-300 transition-colors">
              <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* DISCLAIMER */}
        <div className="px-5 py-4 border-t border-white/10 bg-white/5">
          <p className="text-xs text-zinc-500 leading-relaxed">
            <span style={{ fontWeight: 600 }}>Ambiente de Protótipo:</span> Simulação de conformidade baseada em RAG. Integrações finais sujeitas ao backend.
          </p>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Top Bar - Mobile Optimized */}
        <header className="bg-white border-b border-zinc-100 flex-shrink-0 px-4 md:px-6 py-3 md:py-3.5 flex items-center gap-3 md:gap-4">
          {/* Hamburger Menu - Mobile Only */}
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-50 transition-all">
            <Menu className="w-5 h-5 text-zinc-600" strokeWidth={1.5} />
          </button>

          {/* Breadcrumb - Hidden on small mobile */}
          <div className="hidden sm:flex items-center gap-2 text-sm flex-1">
            <span className="text-zinc-400">Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-300" strokeWidth={1.5} />
            <span className="text-zinc-900 truncate" style={{ fontWeight: 600 }}>
              {viewTitles[activeView]}
            </span>
          </div>

          {/* Mobile: Just the title */}
          <div className="flex-1 sm:hidden">
            <span className="text-sm text-zinc-900 truncate block" style={{ fontWeight: 600 }}>
              {viewTitles[activeView]}
            </span>
          </div>

          {/* Search - Hidden on mobile */}
          <div className="hidden md:block relative w-56">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
            <input
              placeholder="Buscar..."
              className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 focus:border-emerald-400 transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative w-8 h-8 md:w-9 md:h-9 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-center hover:bg-zinc-100 transition-all"
              >
                <Bell className="w-4 h-4 text-zinc-500" strokeWidth={1.5} />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-zinc-200 rounded-2xl shadow-xl z-50">
                  <div className="px-4 py-3.5 border-b border-zinc-100 flex items-center justify-between">
                    <h4 className="text-sm text-zinc-900" style={{ fontWeight: 700 }}>
                      Notificações
                    </h4>
                    <button onClick={() => setNotificationsOpen(false)}>
                      <X className="w-4 h-4 text-zinc-400 hover:text-zinc-600" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="py-2">
                    {[
                      { title: 'Prazo crítico em 15 dias', desc: 'CMN 4.966 — Revisão de crédito', time: '2h', dot: 'bg-red-500' },
                      { title: 'Nova regulação LGPD publicada', desc: 'ANPD — Circular 12/2026', time: '4h', dot: 'bg-orange-500' },
                      { title: 'Relatório SOC 2 gerado', desc: 'Relatório Q1/2026 disponível', time: '1d', dot: 'bg-emerald-500' },
                    ].map((n, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.dot}`}></div>
                        <div className="flex-1">
                          <p className="text-xs text-zinc-800" style={{ fontWeight: 600 }}>
                            {n.title}
                          </p>
                          <p className="text-xs text-zinc-400 mt-0.5">{n.desc}</p>
                        </div>
                        <span className="text-xs text-zinc-400 flex-shrink-0">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center gap-2 px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl">
              <Building2 className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.5} />
              <span className="text-xs text-zinc-600" style={{ fontWeight: 500 }}>
                Nexus Finance
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6" onClick={() => notificationsOpen && setNotificationsOpen(false)}>
          {activeView === 'overview' && (
            <OverviewView
              messages={messages}
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSend={handleSend}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
              checklistItems={checklistItems}
              toggleChecklist={toggleChecklist}
            />
          )}
          {activeView === 'monitoring' && <MonitoringView />}
          {activeView === 'copilot' && <CopilotView />}
          {activeView === 'checklist' && <ChecklistView items={checklistItems} toggleChecklist={toggleChecklist} />}
          {activeView === 'reports' && <ReportsView />}
        </main>

        {/* Footer Disclaimer */}
        <footer className="bg-white border-t border-zinc-100 px-4 md:px-6 py-3 flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-zinc-400">
            <p>
              <span style={{ fontWeight: 600 }}>Frameworks Suportados:</span> ISO 27001, SOC 2, LGPD
            </p>
            <p className="text-xs">
              <span style={{ fontWeight: 600 }}>Protótipo:</span> Simulação de conformidade baseada em RAG
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
