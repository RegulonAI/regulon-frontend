'use client';

import { motion } from 'framer-motion';
import {
  Circle,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Fingerprint,
  Link2,
  Scale,
  ListChecks,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type AgentStepStatus = 'pending' | 'processing' | 'done' | 'error';

export interface AgentStep {
  id: 'classificador' | 'matching' | 'interpretador' | 'executor';
  label: string;
  status: AgentStepStatus;
}

interface AgentProgressProps {
  steps?: AgentStep[];
}

const defaultSteps: AgentStep[] = [
  { id: 'classificador', label: 'Classificador', status: 'pending' },
  { id: 'matching', label: 'Matching', status: 'pending' },
  { id: 'interpretador', label: 'Interpretador', status: 'pending' },
  { id: 'executor', label: 'Executor', status: 'pending' },
];

const iconByStep = {
  classificador: Fingerprint,
  matching: Link2,
  interpretador: Scale,
  executor: ListChecks,
};

function StatusDot({ status }: { status: AgentStepStatus }) {
  if (status === 'processing') {
    return <Loader2 className="h-4 w-4 animate-spin text-zinc-700" />;
  }
  if (status === 'done') {
    return <CheckCircle2 className="h-4 w-4 text-zinc-900" />;
  }
  if (status === 'error') {
    return <AlertCircle className="h-4 w-4 text-red-600" />;
  }
  return <Circle className="h-4 w-4 text-zinc-300" />;
}

export function AgentProgress({ steps = defaultSteps }: AgentProgressProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm shadow-zinc-900/5">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
          Pipeline de Agentes
        </p>
        <p className="text-[10px] text-zinc-500">
          {steps.filter(step => step.status === 'done').length}/4 concluídos
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-4">
        {steps.map((step, index) => {
          const StepIcon = iconByStep[step.id];

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className={cn(
                'relative rounded-2xl border px-3 py-3',
                'bg-white shadow-sm shadow-zinc-900/5',
                step.status === 'processing' && 'border-zinc-400',
                step.status === 'done' && 'border-zinc-900',
                step.status === 'error' && 'border-red-300',
                step.status === 'pending' && 'border-zinc-200',
              )}
            >
              <div className="mb-2 flex items-center justify-between">
                <StepIcon className="h-4 w-4 text-zinc-600" />
                <StatusDot status={step.status} />
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-700">
                {step.label}
              </p>

              {index < steps.length - 1 && (
                <span className="pointer-events-none absolute -right-1 top-1/2 hidden h-px w-2 bg-zinc-300 sm:block" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
