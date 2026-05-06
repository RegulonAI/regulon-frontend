'use client';

import type { ComponentType } from 'react';
import { AlertTriangle, ShieldAlert, ShieldCheck, ShieldMinus } from 'lucide-react';
import type { RegulationImpact } from '@/types/compliance';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ImpactCardProps {
  impact: RegulationImpact;
  className?: string;
}

const businessRiskCopy: Record<RegulationImpact['impactLevel'], string> = {
  CRITICAL: 'Risco imediato de multas/sanções. Ação exigida nesta semana.',
  HIGH: 'Impacto significativo. Requer atenção nos próximos 30 dias.',
  MEDIUM: 'Risco moderado. Planejar mitigação no ciclo operacional atual.',
  LOW: 'Baixa criticidade. Monitoramento contínuo recomendado.',
};

const iconByLevel: Record<RegulationImpact['impactLevel'], ComponentType<{ className?: string }>> = {
  CRITICAL: AlertTriangle,
  HIGH: ShieldAlert,
  MEDIUM: ShieldMinus,
  LOW: ShieldCheck,
};

const toneByLevel: Record<RegulationImpact['impactLevel'], string> = {
  CRITICAL: 'border-l-zinc-900',
  HIGH: 'border-l-zinc-700',
  MEDIUM: 'border-l-zinc-500',
  LOW: 'border-l-zinc-300',
};

export function ImpactCard({ impact, className }: ImpactCardProps) {
  const LevelIcon = iconByLevel[impact.impactLevel];

  return (
    <Card className={cn('h-full border-l-4 bg-white', toneByLevel[impact.impactLevel], className)}>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <LevelIcon className="h-4 w-4 shrink-0 text-zinc-700" />
            <CardTitle className="text-sm leading-snug">{impact.title}</CardTitle>
          </div>
          <Badge impactLevel={impact.impactLevel}>{impact.impactLevel}</Badge>
        </div>
        <CardDescription className="text-xs text-zinc-500">
          {impact.source.regulationName} • {impact.source.jurisdiction}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-zinc-700">{impact.summary}</p>
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
            Tradução de risco para negócio
          </p>
          <p className="mt-1 text-xs text-zinc-800">{businessRiskCopy[impact.impactLevel]}</p>
        </div>
        <p className="text-xs text-zinc-500">
          <span className="font-medium text-zinc-700">Relevância:</span> {impact.relevance}
        </p>
      </CardContent>
    </Card>
  );
}
