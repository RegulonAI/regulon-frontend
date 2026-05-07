 'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Top nav */}
      <nav className="bg-white border-b border-zinc-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-zinc-900 rounded-lg flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
            </div>
            <span className="text-zinc-900 text-sm" style={{ fontWeight: 700 }}>Regulon AI</span>
          </Link>
          <Link href="/contact" className="text-xs text-zinc-500 hover:text-zinc-800 transition-colors">
            Precisa de ajuda? → Fale com o suporte
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[420px]">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-zinc-900 mb-2" style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: '1.2' }}>
              Acesso à Plataforma
            </h1>
            <p className="text-zinc-500 text-sm">Entre com suas credenciais corporativas</p>
          </div>

          {/* Security Indicator */}
          <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl mb-6">
            <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lock className="w-3.5 h-3.5 text-emerald-700" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs text-emerald-800" style={{ fontWeight: 600 }}>Conexão segura estabelecida</p>
              <p className="text-xs text-emerald-600">TLS 1.3 · Criptografia AES-256</p>
            </div>
            <div className="ml-auto">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-emerald-600" style={{ fontWeight: 500 }}>Ativo</span>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs text-zinc-700 mb-1.5" style={{ fontWeight: 600 }}>
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
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-xs text-zinc-700" style={{ fontWeight: 600 }}>
                    Senha
                  </label>
                  <a href="#" className="text-xs text-emerald-600 hover:text-emerald-700 transition-colors" style={{ fontWeight: 500 }}>
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Lock className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-11 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400 transition-all"
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

              {/* Remember */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-4 h-4 border border-zinc-300 rounded peer-checked:bg-emerald-400 peer-checked:border-emerald-400 transition-all"></div>
                </div>
                <span className="text-xs text-zinc-500">Manter conectado neste dispositivo</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                style={{ fontWeight: 600 }}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Verificando credenciais...
                  </>
                ) : (
                  <>
                    Acessar Plataforma
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-100"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-xs text-zinc-400">ou acesse via SSO</span>
              </div>
            </div>

            {/* SSO */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Microsoft', icon: '⬛' },
                { name: 'Google', icon: '🔵' },
              ].map((sso) => (
                <button
                  key={sso.name}
                  className="flex items-center justify-center gap-2 py-2.5 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 hover:border-zinc-300 transition-all text-sm text-zinc-700"
                  style={{ fontWeight: 500 }}
                >
                  {sso.name} SSO
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-zinc-500 mt-5">
              Sem acesso?{' '}
              <Link href="/contact" className="text-emerald-600 hover:text-emerald-700 transition-colors" style={{ fontWeight: 600 }}>
                Solicite uma demonstração
              </Link>
            </p>
          </div>

          {/* Certifications */}
          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
            {['ISO 27001', 'SOC 2 Type II', 'LGPD Compliant', 'GDPR Ready'].map((cert) => (
              <div key={cert} className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-zinc-400" strokeWidth={1.5} />
                <span className="text-xs text-zinc-400">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 px-6 text-center">
        <p className="text-xs text-zinc-400">
          © 2026 Regulon AI · <a href="#" className="hover:text-zinc-600 transition-colors">Privacidade</a> · <a href="#" className="hover:text-zinc-600 transition-colors">Termos</a>
        </p>
      </div>
    </div>
  );
}
