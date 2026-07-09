'use client';

import type { LegalTraceDetails as LegalTraceDetailsType } from '@/types/compliance';

interface LegalTraceDetailsProps {
  trace: LegalTraceDetailsType;
}

export function LegalTraceDetails({ trace }: LegalTraceDetailsProps) {
  return (
    <div className="space-y-3 text-xs text-zinc-600">
      <div className="rounded-2xl border border-zinc-200 bg-white p-3">
        <p className="text-[10px] uppercase tracking-wide text-zinc-400">Ação canônica</p>
        <p className="mt-1 text-sm font-semibold text-zinc-800 break-words">
          {trace.canonical.action}
        </p>
        <p className="mt-1 text-xs text-zinc-500 line-clamp-3 break-words">
          {trace.canonical.reasoning}
        </p>
        <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-zinc-500">
          <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5">
            {trace.canonical.legalBasis}
          </span>
          <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5">
            {trace.canonical.source}
          </span>
          <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5">
            {Math.round(trace.canonical.confidence * 100)}% confiança
          </span>
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-wide text-zinc-400">Trechos usados</p>
        <div className="mt-2 space-y-2">
          {trace.chunksUsed.map((chunk) => (
            <div
              key={chunk.chunkId}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3"
            >
              <div className="flex flex-wrap items-center gap-2 text-[10px] text-zinc-500">
                <span className="rounded-md border border-zinc-200 bg-white px-2 py-0.5">
                  {chunk.primaryDomain}
                </span>
                <span className="rounded-md border border-zinc-200 bg-white px-2 py-0.5">
                  Art. {chunk.article}
                </span>
                <span className="rounded-md border border-zinc-200 bg-white px-2 py-0.5">
                  {Math.round(chunk.similarityScore * 100)}% similaridade
                </span>
                <span className="rounded-md border border-zinc-200 bg-white px-2 py-0.5 capitalize">
                  {chunk.riskLevel}
                </span>
              </div>
              <p className="mt-2 max-h-28 overflow-auto text-xs text-zinc-600 break-words">
                {chunk.chunkText}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-wide text-zinc-400">Rastro de agentes</p>
        <div className="mt-2 space-y-2">
          {trace.agentTrace.map((agent, index) => (
            <div
              key={`${agent.agent}-${index}`}
              className="rounded-2xl border border-zinc-200 bg-white p-3"
            >
              <div className="flex items-center justify-between text-[10px] text-zinc-500">
                <span className="font-medium text-zinc-700">{agent.agent}</span>
                <span className="uppercase">{agent.status}</span>
              </div>
              <pre className="mt-2 max-h-24 overflow-auto whitespace-pre-wrap break-words text-[10px] text-zinc-500">
                {JSON.stringify(agent.output, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
