import Link from "next/link";
import { Shield } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-zinc-100 bg-white px-6 py-4">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900">
              <Shield className="h-3.5 w-3.5 text-emerald-400" strokeWidth={1.5} />
            </div>
            <span className="text-sm text-zinc-900" style={{ fontWeight: 700 }}>
              Regulon AI
            </span>
          </Link>
          <Link href="/contact" className="text-xs text-zinc-500 transition-colors hover:text-zinc-800">
            Precisa de ajuda? → Fale com o suporte
          </Link>
        </div>
      </header>
      {children}
    </>
  );
}
