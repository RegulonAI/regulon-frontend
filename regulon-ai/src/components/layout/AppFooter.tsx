import Link from 'next/link';

export function AppFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-6 text-center md:px-6">
        <p className="text-xs text-zinc-500">
          © 2026 Regulon AI ·{' '}
          <Link href="/contact" className="transition-colors hover:text-zinc-700">
            Privacidade
          </Link>{' '}
          ·{' '}
          <Link href="/contact" className="transition-colors hover:text-zinc-700">
            Termos
          </Link>
        </p>
        <p className="text-[11px] text-zinc-500">
          AVISO: Este é um <strong>Ambiente de Protótipo</strong> (Regulon AI MVP). As análises são
          simuladas para validação técnica.
        </p>
      </div>
    </footer>
  );
}
