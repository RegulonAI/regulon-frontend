'use client';

import { useMemo, useState } from 'react';
import { Activity, Building2, ShieldCheck } from 'lucide-react';
import type { RegulationImpact } from '@/types/compliance';
import { cn } from '@/lib/utils';
import { ImpactCard } from '@/components/ImpactCard';
import { PrototypeDisclaimerFooter } from '@/components/PrototypeDisclaimerFooter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const nexusFinanceMockImpacts: RegulationImpact[] = [
  {
    id: 'nx-1',
    title: 'LGPD: Controle de consentimento granular no onboarding digital',
    impactLevel: 'CRITICAL',
    summary:
      'Fluxos atuais não registram evidência auditável de consentimento por finalidade de uso de dados.',
    relevance: 'Risco direto em abertura de conta e campanhas de cross-sell.',
    source: {
      jurisdiction: 'BR',
      regulationName: 'LGPD - Arts. 7º e 8º',
      effectiveDate: '2020-08-28',
    },
    metadata: {
      source: 'hybrid',
      confidenceScore: 97,
      similarity: 90,
      retrievedAt: new Date().toISOString(),
    },
  },
  {
    id: 'nx-2',
    title: 'Resolução CVM 193: Divulgação de riscos climáticos em relatório anual',
    impactLevel: 'HIGH',
    summary:
      'Necessidade de consolidar indicadores ESG em formato compatível com auditoria e governança.',
    relevance: 'Afeta reporting para investidores e conselho administrativo.',
    source: {
      jurisdiction: 'BR',
      regulationName: 'CVM 193',
      effectiveDate: '2023-01-02',
    },
    metadata: {
      source: 'sql',
      confidenceScore: 93,
      retrievedAt: new Date().toISOString(),
    },
  },
  {
    id: 'nx-3',
    title: 'LGPD: Política de retenção e descarte para dados financeiros sensíveis',
    impactLevel: 'MEDIUM',
    summary:
      'Prazos de retenção precisam ser harmonizados entre jurídico, risco e operações para reduzir exposição.',
    relevance: 'Impacta processamento de documentos de crédito e dossiês de compliance.',
    source: {
      jurisdiction: 'BR',
      regulationName: 'LGPD - Art. 15',
      effectiveDate: '2020-08-28',
    },
    metadata: {
      source: 'vector_db',
      confidenceScore: 84,
      similarity: 79,
      retrievedAt: new Date().toISOString(),
    },
  },
  {
    id: 'nx-4',
    title: 'CVM: Atualização de trilha de auditoria para eventos de suitability',
    impactLevel: 'HIGH',
    summary:
      'Eventos críticos de suitability carecem de trilha imutável e consulta rápida para fiscalizações.',
    relevance: 'Risco operacional em processos de investimento consultivo.',
    source: {
      jurisdiction: 'BR',
      regulationName: 'Resolução CVM 30',
      effectiveDate: '2021-07-01',
    },
    metadata: {
      source: 'hybrid',
      confidenceScore: 91,
      similarity: 83,
      retrievedAt: new Date().toISOString(),
    },
  },
];

export default function DashboardPage() {
  const [monitoringStatus] = useState<'Ativo' | 'Atenção'>('Ativo');

  const orderedImpacts = useMemo(
    () =>
      [...nexusFinanceMockImpacts].sort((a, b) => {
        const rank = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
        return rank[b.impactLevel] - rank[a.impactLevel];
      }),
    [],
  );

  return (
    <div className="min-h-screen bg-zinc-50 pb-16 text-zinc-900 antialiased">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-900/5">
          <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Compliance Dashboard</p>
              <h1 className="flex items-center gap-2 text-xl font-semibold">
                <Building2 className="h-5 w-5 text-zinc-700" />
                Nexus Finance
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge impactLevel={monitoringStatus === 'Ativo' ? 'LOW' : 'HIGH'}>
                Monitoramento {monitoringStatus}
              </Badge>
              <span className="inline-flex h-11 items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-600 shadow-sm shadow-zinc-900/5">
                <Activity className="h-4 w-4" />
                Atualização contínua de normas CVM + LGPD
              </span>
            </div>
          </div>
        </header>

        <section className="mb-6">
          <Card muted>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-zinc-700" />
                Estado atual de conformidade regulatória
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600">
                A leitura abaixo prioriza riscos jurídicos com potencial de impacto financeiro e reputacional
                para a Nexus Finance.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {orderedImpacts.map((impact, index) => (
            <ImpactCard
              key={impact.id}
              impact={impact}
              className={cn(
                'col-span-12',
                impact.impactLevel === 'CRITICAL'
                  ? 'md:col-span-6'
                  : impact.impactLevel === 'HIGH' && index < 3
                    ? 'md:col-span-6'
                    : 'md:col-span-4',
              )}
            />
          ))}
        </section>
      </main>

      <PrototypeDisclaimerFooter />
    </div>
  );
}
