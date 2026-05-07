'use client';

import { cn } from '@/lib/utils';

interface PrototypeDisclaimerFooterProps {
  className?: string;
}

export function PrototypeDisclaimerFooter({ className }: PrototypeDisclaimerFooterProps) {
  return (
    <footer
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200/80 bg-zinc-50/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-zinc-50/80',
        className,
      )}
      role="note"
      aria-label="Aviso de ambiente de protótipo"
    >
      <p className="mx-auto max-w-7xl text-center text-[11px] leading-relaxed text-zinc-500">
        AVISO: Este é um ambiente de protótipo (Regulon AI MVP). As análises são simuladas para
        fins de validação técnica.
      </p>
    </footer>
  );
}
