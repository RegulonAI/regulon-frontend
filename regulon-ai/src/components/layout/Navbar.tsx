import Link from "next/link";
import { Shield } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 md:h-8 md:w-8">
            <Shield className="h-3.5 w-3.5 text-emerald-400 md:h-4.5 md:w-4.5" strokeWidth={1.5} />
          </div>
          <span className="text-base tracking-tight text-zinc-900 md:text-lg" style={{ fontWeight: 700 }}>
            Regulon AI
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/#features" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900">
            Recursos
          </Link>
          <Link href="/#how-it-works" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900">
            Como Funciona
          </Link>
          <Link href="/#stats" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900">
            Resultados
          </Link>
          <Link href="/contact" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900">
            Contato
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Link href="/login" className="px-3 py-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 md:px-4">
            Entrar
          </Link>
          <Link
            href="/contact"
            className="rounded-lg bg-zinc-900 px-3 py-2 text-xs text-white transition-all hover:bg-zinc-800 md:px-5 md:py-2.5 md:text-sm"
          >
            Demo
          </Link>
        </div>
      </div>
    </header>
  );
}
