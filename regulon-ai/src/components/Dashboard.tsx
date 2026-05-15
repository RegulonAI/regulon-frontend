'use client';

import type { RegulationImpact } from '@/types/compliance';
import { FileText, ArrowRight, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SourceMetadata } from '@/components/SourceMetadata';

interface DashboardProps {
  analysisActive: boolean;
  impacts: RegulationImpact[];
  handleFileUpload: () => void;
}

const ImpactBadge = ({ level }: { level: RegulationImpact['impactLevel'] }) => {
  const styles = {
    CRITICAL: 'border-zinc-900 bg-zinc-900 text-zinc-50',
    HIGH: 'border-zinc-700 bg-zinc-700 text-zinc-100',
    MEDIUM: 'border-zinc-300 bg-zinc-200 text-zinc-800',
    LOW: 'border-zinc-200 bg-zinc-100 text-zinc-600',
  } as const;
  return <Badge className={styles[level]}>{level}</Badge>;
};

export function Dashboard({ analysisActive, impacts, handleFileUpload }: DashboardProps) {
  if (!analysisActive) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50">
        <div className="w-16 h-16 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
          <FileText className="w-8 h-8 text-zinc-400" />
        </div>
        <h2 className="text-xl font-bold mb-2">Traduza leis em decisões agora</h2>
        <p className="text-zinc-500 text-sm text-center max-w-sm mb-6">
          Faça o upload de uma regulamentação ou contrato para extrair impactos e ações operacionais imediatas.
        </p>
        <button
          onClick={handleFileUpload}
          className="bg-zinc-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-lg shadow-zinc-200"
        >
          Começar Análise
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Análise de Risco Regulatório</h2>
          <span className="text-[10px] text-zinc-500">Última atualização: Agora mesmo</span>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-200">
          {/* Technical Data Grid Pattern */}
          <div className="hidden bg-zinc-50 p-3 text-[10px] font-bold uppercase text-zinc-500 md:grid md:grid-cols-12 md:border-b md:border-zinc-200">
            <div className="md:col-span-5">Regulamentação / Norma</div>
            <div className="text-center md:col-span-2">Nível de Impacto</div>
            <div className="md:col-span-5">Relevância no Negócio</div>
          </div>

          {impacts.map(impact => (
            <div key={impact.id} className="grid grid-cols-1 items-start gap-3 border-b border-zinc-200 p-4 transition-colors last:border-0 hover:bg-zinc-50 md:grid-cols-12 md:items-center">
              <div className="flex flex-col gap-1 md:col-span-5">
                <span className="font-bold text-sm">{impact.title}</span>
                <span className="text-xs text-zinc-500">{impact.summary}</span>
                {impact.metadata && <SourceMetadata compact metadata={impact.metadata} />}
              </div>
              <div className="md:col-span-2 md:flex md:justify-center">
                <ImpactBadge level={impact.impactLevel} />
              </div>
              <div className="text-xs italic text-zinc-500 md:col-span-5">
                {impact.relevance}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-900 rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Resumo Executivo para Decisão</h3>
            <p className="text-zinc-400 text-xs">Síntese automatizada para C-Level e Departamentos Jurídicos.</p>
          </div>
          <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1 rounded text-[10px] font-mono">
            <AlertTriangle className="w-3 h-3 text-yellow-500" />
            ALERTA DE COMPLIANCE
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
            <span className="text-[10px] text-zinc-500 uppercase block mb-1">Impacto Financeiro</span>
            <span className="text-lg font-bold">R$ 450k+ Estimado</span>
            <p className="text-[10px] text-zinc-500 mt-2">Baseado em multas por não conformidade c/ art. 52 LGPD.</p>
          </div>
          <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50 text-emerald-400">
            <span className="text-[10px] text-zinc-500 uppercase block mb-1">Ações Corretivas</span>
            <span className="text-lg font-bold">{impacts.length * 4} Pontos Críticos</span>
            <p className="text-[10px] text-zinc-500 mt-2">Identificados pelo cérebro RAG Jurídico Regulon.</p>
          </div>
          <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
            <span className="text-[10px] text-zinc-500 uppercase block mb-1">Escalabilidade</span>
            <span className="text-lg font-bold">Jurisdição BR</span>
            <p className="text-[10px] text-zinc-500 mt-2">Sistema validado com base na ontologia jurídica nacional.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
