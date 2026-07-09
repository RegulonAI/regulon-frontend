"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock, Eye, EyeOff, Check, X, ShieldCheck, ArrowRight } from "lucide-react";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validação de requisitos em tempo real
  const requirements = {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[@$!%*?&]/.test(password),
  };

  const isPasswordValid = Object.values(requirements).every(Boolean);
  const passwordsMatch = password !== "" && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error("Requisitos não atendidos", {
        description: "A nova senha deve atender a todas as diretrizes de segurança.",
      });
      return;
    }

    if (!passwordsMatch) {
      toast.error("Senhas divergentes", {
        description: "A confirmação de senha não coincide com a nova senha digitada.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
          confirmPassword,
          website, // Honeypot
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao redefinir senha.");
      }

      setIsSuccess(true);
      toast.success("Senha redefinida!", {
        description: "Sua conta foi atualizada com a nova senha de segurança.",
        duration: 4000,
      });

      // Redireciona para o login após 3 segundos
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro de conexão ao redefinir senha.";
      toast.error("Erro na redefinição", {
        description: errorMessage,
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
          <ShieldCheck className="w-5 h-5 text-zinc-950" strokeWidth={1.5} />
        </div>
        <h1 className="text-zinc-950 mb-2 text-2xl font-bold tracking-tight">
          Definir Nova Senha
        </h1>
        <p className="text-zinc-500 text-sm">
          Insira e confirme sua nova senha corporativa de alta segurança.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center">
              <Check className="w-6 h-6 text-emerald-600" strokeWidth={2} />
            </div>
            <div className="space-y-2">
              <h2 className="text-zinc-900 text-base font-semibold">Alteração Concluída</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Sua credencial de acesso foi atualizada com sucesso. Você será redirecionado para a tela de login em instantes.
              </p>
            </div>
            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-zinc-400">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                <span>Redirecionando...</span>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot */}
            <div className="absolute opacity-0 pointer-events-none -z-50 select-none" aria-hidden="true">
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

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold text-zinc-700">
                Nova Senha
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Lock className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-10 pr-10 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm text-zinc-900 placeholder:text-zinc-400 transition-all focus:outline-none focus:ring-2 focus:ring-zinc-950/20 focus:border-zinc-950 focus:bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                  ) : (
                    <Eye className="w-4 h-4" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="block text-xs font-semibold text-zinc-700">
                Confirmar Nova Senha
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Lock className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-10 pr-10 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm text-zinc-900 placeholder:text-zinc-400 transition-all focus:outline-none focus:ring-2 focus:ring-zinc-950/20 focus:border-zinc-950 focus:bg-white"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                  ) : (
                    <Eye className="w-4 h-4" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            {/* Password Complexity Checklist Visual indicator */}
            <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-3.5 space-y-2">
              <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Diretrizes de Segurança da Senha
              </p>
              <ul className="space-y-1.5">
                {[
                  { met: requirements.length, text: "Mínimo de 8 caracteres" },
                  { met: requirements.hasUpper, text: "Pelo menos uma letra maiúscula" },
                  { met: requirements.hasLower, text: "Pelo menos uma letra minúscula" },
                  { met: requirements.hasNumber, text: "Pelo menos um número" },
                  { met: requirements.hasSpecial, text: "Pelo menos um caractere especial (@$!%*?&)" },
                  { met: passwordsMatch, text: "Senhas coincidem" },
                ].map((req, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    {req.met ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-zinc-300 flex items-center justify-center text-[8px] font-bold text-zinc-400">
                        •
                      </div>
                    )}
                    <span className={req.met ? "text-zinc-800" : "text-zinc-400"}>
                      {req.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isPasswordValid || !passwordsMatch}
              className="w-full h-11 flex items-center justify-center gap-2 bg-zinc-950 text-white rounded-2xl hover:bg-zinc-800 disabled:bg-zinc-800/40 disabled:text-zinc-400 disabled:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-all text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/50 focus:ring-offset-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Redefinindo senha...
                </>
              ) : (
                <>
                  Salvar Nova Senha
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Cancel link */}
        {!isSuccess && (
          <div className="mt-6 text-center border-t border-zinc-100 pt-5">
            <Link
              href="/login"
              className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors focus:outline-none"
            >
              Cancelar e voltar ao login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
