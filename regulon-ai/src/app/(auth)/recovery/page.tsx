import React from "react";
import { Metadata } from "next";
import { CheckCircle } from "lucide-react";
import { RecoveryForm } from "@/components/auth/RecoveryForm";

// SEO Best Practices
export const metadata: Metadata = {
  title: "Recuperação de Senha | Regulon AI",
  description: "Redefina o acesso à sua conta corporativa com segurança na plataforma Regulon AI.",
};

export default function RecoveryPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[420px] flex flex-col items-center">
          
          {/* Recovery Form Component */}
          <RecoveryForm />

          {/* Compliance & Security Certifications */}
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

      {/* Footer */}
      <footer className="py-4 px-6 text-center border-t border-zinc-100 bg-white/50">
        <p className="text-xs text-zinc-400">
          © 2026 Regulon AI · <a href="#" className="hover:text-zinc-600 transition-colors">Privacidade</a> · <a href="#" className="hover:text-zinc-600 transition-colors">Termos</a>
        </p>
      </footer>
    </div>
  );
}
