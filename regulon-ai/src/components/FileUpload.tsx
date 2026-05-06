'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import type { ChecklistItem, RegulationImpact } from '@/types/compliance';

type UploadState = 'idle' | 'selected' | 'uploading' | 'success' | 'error';

interface AnalyzeResponse {
  impacts?: RegulationImpact[];
  checklist?: ChecklistItem[];
}

interface FileUploadProps {
  onAnalysisComplete: (result: { impacts: RegulationImpact[]; checklist: ChecklistItem[] }) => void;
}

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['pdf', 'txt', 'docx'] as const;
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({ onAnalysisComplete }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const allowedFormatsText = useMemo(
    () => ALLOWED_EXTENSIONS.map(ext => `.${ext}`).join(', '),
    [],
  );

  const clearProgressTimer = () => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  };

  useEffect(() => () => clearProgressTimer(), []);

  const validateFile = (file: File): string | null => {
    const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
    const extensionAllowed = ALLOWED_EXTENSIONS.includes(
      extension as (typeof ALLOWED_EXTENSIONS)[number],
    );
    const mimeAllowed = ALLOWED_MIME_TYPES.includes(
      file.type as (typeof ALLOWED_MIME_TYPES)[number],
    );

    if (!extensionAllowed && !mimeAllowed) {
      return `Formato inválido. Envie apenas ${allowedFormatsText}.`;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `Arquivo acima de ${MAX_FILE_SIZE_MB}MB. Escolha um arquivo menor.`;
    }

    return null;
  };

  const handleSelectFile = (file: File) => {
    const validationError = validateFile(file);

    if (validationError) {
      setSelectedFile(null);
      setUploadState('error');
      setErrorMessage(validationError);
      setSuccessMessage('');
      setProgress(0);
      return;
    }

    setSelectedFile(file);
    setUploadState('selected');
    setErrorMessage('');
    setSuccessMessage('');
    setProgress(0);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    handleSelectFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    handleSelectFile(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setUploadState('error');
      setErrorMessage('Selecione um arquivo antes de iniciar a análise.');
      return;
    }

    setUploadState('uploading');
    setErrorMessage('');
    setSuccessMessage('');
    setProgress(10);

    clearProgressTimer();
    progressTimerRef.current = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.floor(Math.random() * 12) + 4, 90));
    }, 180);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = (await response.json()) as AnalyzeResponse & { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? 'Não foi possível concluir a análise.');
      }

      clearProgressTimer();
      setProgress(100);
      setUploadState('success');
      setSuccessMessage('Documento analisado com sucesso.');

      onAnalysisComplete({
        impacts: data.impacts ?? [],
        checklist: data.checklist ?? [],
      });
    } catch (error) {
      clearProgressTimer();
      setUploadState('error');
      setProgress(0);
      setErrorMessage(
        error instanceof Error ? error.message : 'Erro inesperado ao enviar o arquivo.',
      );
    }
  };

  const isUploading = uploadState === 'uploading';

  return (
    <section className="w-full rounded-[16px] border border-zinc-200 bg-zinc-50 p-6">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt,.docx,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleInputChange}
        disabled={isUploading}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={event => {
          event.preventDefault();
          event.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={event => {
          event.preventDefault();
          event.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
        disabled={isUploading}
        className={[
          'w-full rounded-[16px] border-2 border-dashed p-8 text-center transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400',
          isDragging
            ? 'border-zinc-500 bg-zinc-100'
            : 'border-zinc-300 bg-white hover:border-zinc-400 hover:bg-zinc-100/60',
          isUploading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
        ].join(' ')}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50">
          {isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-zinc-600" />
          ) : (
            <Upload className="h-6 w-6 text-zinc-600" />
          )}
        </div>
        <p className="text-base font-semibold text-zinc-900">
          Arraste seu PDF ou clique para carregar
        </p>
        <p className="mt-1 text-sm text-zinc-500">
          Suporte para PDF e Texto Puro (Máx. 10MB)
        </p>
      </button>

      {selectedFile && (
        <div className="mt-4 rounded-[16px] border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-zinc-500" />
              <div>
                <p className="text-sm font-medium text-zinc-800">{selectedFile.name}</p>
                <p className="text-xs text-zinc-500">{formatBytes(selectedFile.size)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isUploading}
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUploading ? 'Enviando...' : 'Iniciar Análise'}
            </button>
          </div>

          {isUploading && (
            <div className="mt-4">
              <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
                <div
                  className="h-full rounded-full bg-zinc-900 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-zinc-500">Processando documento... {progress}%</p>
            </div>
          )}
        </div>
      )}

      {uploadState === 'error' && errorMessage && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {uploadState === 'success' && successMessage && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}
    </section>
  );
}
