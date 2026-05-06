import * as React from 'react';
import { cn } from '@/lib/utils';

type ImpactLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

const impactStyles: Record<ImpactLevel, string> = {
  CRITICAL: 'bg-zinc-900 text-zinc-50 border-zinc-900',
  HIGH: 'bg-zinc-800 text-zinc-100 border-zinc-700',
  MEDIUM: 'bg-zinc-200 text-zinc-800 border-zinc-300',
  LOW: 'bg-zinc-100 text-zinc-600 border-zinc-200',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  impactLevel?: ImpactLevel;
}

export function Badge({ className, impactLevel = 'LOW', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide',
        impactStyles[impactLevel],
        className,
      )}
      {...props}
    />
  );
}
