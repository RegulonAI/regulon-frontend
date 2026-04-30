'use client';

import { AgentStatus } from '@/types/types';
import { Loader2, CheckCircle, AlertCircle, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

interface AgentProgressProps {
  agents: AgentStatus[];
  currentAgentIndex: number;
}

/**
 * Componente para visualizar o pipeline de 4 agentes em tempo real
 * Exibe status, progresso e feedbacks de cada etapa da análise regulatória
 */
export function AgentProgress({ agents, currentAgentIndex }: AgentProgressProps) {
  const getStatusIcon = (agent: AgentStatus, index: number) => {
    const iconProps = {
      className: 'w-5 h-5',
      strokeWidth: 2.5,
    };

    if (agent.status === 'processando') {
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 {...iconProps} className="w-5 h-5 text-blue-500" />
        </motion.div>
      );
    }

    if (agent.status === 'concluído') {
      return <CheckCircle {...iconProps} className="text-emerald-500" />;
    }

    if (agent.status === 'falhou') {
      return <AlertCircle {...iconProps} className="text-red-500" />;
    }

    // pendente
    return <Circle {...iconProps} className="text-zinc-300" />;
  };

  const getProgressBar = (agent: AgentStatus, index: number) => {
    if (agent.status !== 'processando' && agent.status !== 'concluído') {
      return null;
    }

    const targetProgress = agent.status === 'concluído' ? 100 : agent.progress;

    return (
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${targetProgress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`h-1 rounded-full ${
          agent.status === 'concluído'
            ? 'bg-emerald-500'
            : 'bg-blue-500'
        }`}
      />
    );
  };

  const getStatusLabel = (agent: AgentStatus) => {
    const labels = {
      pendente: 'Aguardando',
      processando: 'Processando',
      concluído: 'Concluído',
      falhou: 'Erro',
    };
    return labels[agent.status];
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600">
          Pipeline de Análise Regulatória
        </h3>
        <span className="text-[10px] text-zinc-400">
          {currentAgentIndex + 1}/4 agentes
        </span>
      </div>

      {/* Agent Pipeline */}
      <div className="space-y-3">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start gap-4 p-3 rounded-lg border transition-colors ${
              agent.status === 'processando'
                ? 'bg-blue-50/50 border-blue-200'
                : agent.status === 'concluído'
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : agent.status === 'falhou'
                    ? 'bg-red-50/50 border-red-200'
                    : 'bg-zinc-50/50 border-zinc-200'
            }`}
          >
            {/* Left: Sequential Number + Icon */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-6 h-6 flex items-center justify-center bg-white rounded border border-zinc-200 text-[10px] font-bold text-zinc-600">
                {index + 1}
              </div>
              <div className="flex-shrink-0">
                {getStatusIcon(agent, index)}
              </div>
            </div>

            {/* Middle: Name, Status Label, and Progress Bar */}
            <div className="flex-1 min-w-0">
              {/* Agent Name and Status Label */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-sm font-bold text-zinc-900">
                  {agent.displayName}
                </span>
                <span
                  className={`text-[10px] font-medium ${
                    agent.status === 'processando'
                      ? 'text-blue-600'
                      : agent.status === 'concluído'
                        ? 'text-emerald-600'
                        : agent.status === 'falhou'
                          ? 'text-red-600'
                          : 'text-zinc-500'
                  }`}
                >
                  {getStatusLabel(agent)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="bg-zinc-200/50 rounded-full overflow-hidden h-1.5">
                {getProgressBar(agent, index)}
              </div>

              {/* Message or Meta Info */}
              {agent.message && (
                <p className="text-[10px] text-zinc-600 mt-2 leading-snug">
                  {agent.message}
                </p>
              )}
              {agent.startTime && agent.endTime && (
                <p className="text-[9px] text-zinc-400 mt-1">
                  Tempo: {((agent.endTime - agent.startTime) / 1000).toFixed(2)}s
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer: Overall Progress */}
      <div className="mt-4 pt-3 border-t border-zinc-200/50">
        <div className="flex items-center justify-between text-[10px] text-zinc-500">
          <span>Progresso Geral</span>
          <span className="font-mono font-bold">
            {Math.round(
              (agents.filter(a => a.status === 'concluído').length / agents.length) * 100
            )}%
          </span>
        </div>
      </div>
    </div>
  );
}
