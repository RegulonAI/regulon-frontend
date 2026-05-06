'use client';

import type { AgentStatus } from '@/types/compliance';
import {
  AgentProgress as AgentProgressPrimitive,
  type AgentStep,
  type AgentStepStatus,
} from '@/components/ui/agent-progress';

interface AgentProgressProps {
  agents: AgentStatus[];
  currentAgentIndex?: number;
}

function toStepStatus(status: AgentStatus['status']): AgentStepStatus {
  if (status === 'processando') return 'processing';
  if (status === 'concluído') return 'done';
  if (status === 'falhou') return 'error';
  return 'pending';
}

export function AgentProgress({ agents }: AgentProgressProps) {
  const steps = agents.map<AgentStep>(agent => ({
    id: agent.name,
    label: agent.displayName,
    status: toStepStatus(agent.status),
  }));

  return <AgentProgressPrimitive steps={steps} />;
}
