import React from "react";
import { Metadata } from "next";
import { CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Redefinir Senha | Regulon AI",
  description: "Crie uma nova senha segura para acessar sua conta corporativa.",
};

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.token;

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[420px] flex flex-col items-center">
          
          {!token ? (
            <div className="w-full max-w-[420px] bg-white border border-zinc-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
              <div className="mx-auto w-12 h-12 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-zinc-900 text-base font-semibold text-red-600">Token Ausente</h2>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Esta URL de redefinição de senha é inválida ou expirou. Por favor, solicite um novo link de recuperação.
                </p>
              </div>
              <div className="pt-4 border-t border-zinc-100">
                <Link
                  href="/recovery"
                  className="inline-flex h-11 items-center justify-center w-full bg-zinc-950 text-white rounded-2xl hover:bg-zinc-800 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-zinc-950/50"
                >
                  Solicitar Novo Link
                </Link>
              </div>
            </div>
          ) : (
            <ResetPasswordForm token={token} />
          )}

          {/* Compliance & Certifications */}
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            {["ISO 27001", "SOC 2 Type II", "LGPD Compliant", "GDPR Ready"].map((cert) => (
              <div key={cert} className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-zinc-400" strokeWidth={2} />
                <span className="text-[11px] text-zinc-400 font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="py-4 px-6 text-center border-t border-zinc-100 bg-white/50">
        <p className="text-xs text-zinc-400">
          © 2026 Regulon AI · <a href="#" className="hover:text-zinc-600 transition-colors">Privacidade</a> · <a href="#" className="hover:text-zinc-600 transition-colors">Termos</a>
        </p>
      </footer>
    </div>
  );
}
