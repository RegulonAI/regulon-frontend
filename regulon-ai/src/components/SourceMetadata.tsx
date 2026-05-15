import { Info, Shield, Calendar, TrendingUp } from 'lucide-react';
import type { DataSourceMetadata } from '@/types/compliance';

interface SourceMetadataProps {
  metadata: DataSourceMetadata;
  compact?: boolean;
}

export function SourceMetadata({ metadata, compact = false }: SourceMetadataProps) {
  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-orange-600 bg-orange-50 border-orange-200';
  };

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <div className="flex items-center gap-1 text-zinc-400">
          <Shield className="w-3 h-3" strokeWidth={1.5} />
          <span>{metadata.source}</span>
        </div>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md border ${getConfidenceColor(metadata.confidenceScore)}`} style={{ fontWeight: 600 }}>
          <TrendingUp className="w-3 h-3" strokeWidth={2} />
          <span>{metadata.confidenceScore}%</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 pt-3 border-t border-zinc-100 space-y-2">
      <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-2">
        <Info className="w-3 h-3" strokeWidth={1.5} />
        <span style={{ fontWeight: 600 }}>Rastreabilidade da Fonte</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="flex items-start gap-2">
          <Shield className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="text-zinc-400 text-xs">Fonte Oficial</p>
            <p className="text-zinc-700" style={{ fontWeight: 500 }}>{metadata.source}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Calendar className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="text-zinc-400 text-xs">Data de Vigência</p>
            <p className="text-zinc-700" style={{ fontWeight: 500 }}>
              {metadata.effectiveDate ?? 'N/A'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="text-zinc-400 text-xs">Confidence Score (RAG)</p>
            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${getConfidenceColor(metadata.confidenceScore)}`} style={{ fontWeight: 600 }}>
              {metadata.confidenceScore}% similaridade vetorial
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="text-zinc-400 text-xs">Jurisdição</p>
            <p className="text-zinc-700" style={{ fontWeight: 500 }}>
              {metadata.jurisdiction ?? 'N/A'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-zinc-50">
        <p className="text-xs text-zinc-400">
          <span style={{ fontWeight: 600 }}>Doc ID:</span> {metadata.documentId ?? 'N/A'} ·
          <span className="ml-1">Última atualização: {metadata.lastUpdated ?? 'N/A'}</span>
        </p>
      </div>
    </div>
  );
}
