"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Mail, ArrowLeft, CheckCircle, KeyRound } from "lucide-react";

export function RecoveryForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot
  const turnstileToken = "mock-turnstile-token"; // Placeholder
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/recovery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          website, // Honeypot field: bots will fill this
          turnstileToken, // Captcha placeholder
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Algo deu errado. Tente novamente.");
      }

      // Sucesso no fluxo (OWASP: Mesmo que o e-mail não exista, retorna sucesso)
      setIsSuccess(true);
      toast.success("Solicitação recebida!", {
        description: "Se o e-mail estiver cadastrado, as instruções foram enviadas.",
        duration: 5000,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro interno ao processar requisição.";
      toast.error("Erro na solicitação", {
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[420px]">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mx-auto w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center mb-4 border border-zinc-200">
          <KeyRound className="w-5 h-5 text-zinc-950" strokeWidth={1.5} />
        </div>
        <h1 className="text-zinc-950 mb-2 text-2xl font-bold tracking-tight">
          Recuperação de Senha
        </h1>
        <p className="text-zinc-500 text-sm">
          Faremos o envio das instruções de redefinição de acesso para seu e-mail corporativo.
        </p>
      </div>

      {/* Main card */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm transition-all duration-300">
        {isSuccess ? (
          <div className="text-center py-4 space-y-4">
            <div className="mx-auto w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" strokeWidth={2} />
            </div>
            <div className="space-y-2">
              <h2 className="text-zinc-900 text-base font-semibold">E-mail Enviado</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Se o endereço <strong className="text-zinc-800 font-medium">{email}</strong> estiver em nossa base de dados, um link de recuperação contendo o token de redefinição de senha chegará em sua caixa de entrada em instantes.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-100 flex flex-col gap-2">
              <p className="text-xs text-zinc-400">
                Lembre-se de verificar a pasta de spam ou lixo eletrônico.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setEmail("");
                }}
                className="mt-2 text-sm text-zinc-900 hover:text-zinc-700 font-semibold transition-colors focus:outline-none focus:underline"
              >
                Tentar outro e-mail
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot: Campo camuflado para bots. Totalmente invisível e inalcançável para humanos. */}
            <div
              className="absolute opacity-0 pointer-events-none -z-50 select-none"
              aria-hidden="true"
            >
              <label htmlFor="website">Website URL (Leave Empty)</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Turnstile Captcha Hidden Field - Placeholder */}
            {/* TODO: Quando a chave do Turnstile for configurada no dashboard do Cloudflare:
                1. Importar script Turnstile no root layout:
                   <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
                2. Renderizar widget:
                   <div className="cf-turnstile" data-sitekey="SITE_KEY" data-callback={(token) => setTurnstileToken(token)} />
            */}
            <input type="hidden" name="turnstileToken" value={turnstileToken} />

            {/* Email Input */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-zinc-700">
                Email Corporativo
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Mail className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="seu.email@empresa.com"
                  className="w-full h-11 pl-10 pr-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm text-zinc-900 placeholder:text-zinc-400 transition-all focus:outline-none focus:ring-2 focus:ring-zinc-950/20 focus:border-zinc-950 focus:bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 flex items-center justify-center gap-2 bg-zinc-950 text-white rounded-2xl hover:bg-zinc-800 disabled:bg-zinc-800/80 disabled:opacity-75 disabled:cursor-not-allowed transition-all text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/50 focus:ring-offset-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Enviando link...
                </>
              ) : (
                "Enviar link de recuperação"
              )}
            </button>
          </form>
        )}

        {/* Back Link */}
        <div className="mt-6 text-center border-t border-zinc-100 pt-5">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors focus:outline-none focus:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}
