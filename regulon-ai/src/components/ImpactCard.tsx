'use client';

import type { ComponentProps, ComponentType } from 'react';
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

type BadgeVariant = NonNullable<ComponentProps<typeof Badge>['variant']>;

const badgeStyleByLevel: Record<RegulationImpact['impactLevel'], { variant: BadgeVariant; className: string }> = {
  CRITICAL: {
    variant: 'destructive',
    className: 'border-red-200 bg-red-50 text-red-700',
  },
  HIGH: {
    variant: 'outline',
    className: 'border-orange-200 bg-orange-50 text-orange-700',
  },
  MEDIUM: {
    variant: 'outline',
    className: 'border-yellow-200 bg-yellow-50 text-yellow-700',
  },
  LOW: {
    variant: 'outline',
    className: 'border-green-200 bg-green-50 text-green-700',
  },
};

export function ImpactCard({ impact, className }: ImpactCardProps) {
  const LevelIcon = iconByLevel[impact.impactLevel];
  const badgeStyle = badgeStyleByLevel[impact.impactLevel];
  const regulationName = impact.source?.regulationName ?? 'Regulação não informada';
  const jurisdiction = impact.source?.jurisdiction ?? impact.metadata?.jurisdiction ?? 'Jurisdição não informada';

  return (
    <Card className={cn('h-full border-l-4 bg-white', toneByLevel[impact.impactLevel], className)}>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <LevelIcon className="h-4 w-4 shrink-0 text-zinc-700" />
            <CardTitle className="text-sm leading-snug">{impact.title}</CardTitle>
          </div>
          <Badge variant={badgeStyle.variant} className={badgeStyle.className}>
            {impact.impactLevel}
          </Badge>
        </div>
        <CardDescription className="text-xs text-zinc-500">
          {regulationName} • {jurisdiction}
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
