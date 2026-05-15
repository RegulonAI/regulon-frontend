import Link from 'next/link';
import { Shield } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
            <Shield className="h-4 w-4 text-emerald-400" strokeWidth={1.5} />
          </div>
          <span className="text-base font-bold tracking-tight text-zinc-900">Regulon AI</span>
        </Link>

        <nav className="flex flex-col gap-2 text-sm text-zinc-600 sm:flex-row sm:items-center sm:gap-3">
          <Link href="/" className="rounded-xl px-3 py-2 transition-colors hover:bg-zinc-100 hover:text-zinc-900">
            Início
          </Link>
          <Link
            href="/contact"
            className="rounded-xl bg-zinc-900 px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Demo
          </Link>
          <Link href="/login" className="rounded-xl px-3 py-2 transition-colors hover:bg-zinc-100 hover:text-zinc-900">
            Entrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
