 'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Shield, Mail, Phone, MapPin, Send, Building, User, MessageSquare, CheckCircle, ArrowLeft, Clock, Zap, Info } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Nav - Mobile Optimized */}
      <nav className="border-b border-zinc-100 bg-white/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-zinc-900 rounded-lg flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
            </div>
            <span className="text-zinc-900 text-sm" style={{ fontWeight: 700 }}>Regulon AI</span>
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="hidden sm:inline">Início</span>
            </Link>
            <Link href="/login" className="text-xs md:text-sm px-3 md:px-5 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-all" style={{ fontWeight: 500 }}>
              Entrar
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-white border-b border-zinc-100 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-full mb-5">
              <MessageSquare className="w-3 h-3 text-zinc-500" strokeWidth={1.5} />
              <span className="text-xs text-zinc-600" style={{ fontWeight: 500 }}>Suporte Especializado</span>
            </span>
            <h1 className="text-zinc-900 mb-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, lineHeight: '1.2' }}>
              Fale com nossa equipe
            </h1>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Especialistas em compliance regulatório e tecnologia disponíveis para ajudar sua equipe jurídica e de risco a entender como a Regulon AI pode transformar seus processos.
            </p>
          </div>
        </div>
      </section>

      {/* Main - Mobile First Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

          {/* Form */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 shadow-sm text-center">
                <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-7 h-7 text-emerald-600" strokeWidth={1.5} />
                </div>
                <h2 className="text-zinc-900 mb-3" style={{ fontSize: '1.5rem', fontWeight: 700 }}>Mensagem enviada!</h2>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-md mx-auto mb-8">
                  Nossa equipe especializada entrou em contato em até <strong className="text-zinc-700">24 horas úteis</strong>.
                  Verifique sua caixa de entrada corporativa.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-all text-sm"
                  style={{ fontWeight: 500 }}
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-zinc-900 mb-1.5" style={{ fontSize: '1.25rem', fontWeight: 700 }}>Fale com Especialistas</h2>
                <p className="text-zinc-500 text-sm mb-7">Nossa equipe responde em até 24 horas úteis.</p>

                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                  {/* Row 1 - Mobile: Stack, Desktop: 2 cols */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs text-zinc-700 mb-1.5" style={{ fontWeight: 600 }}>
                        Nome Completo *
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                          <User className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                        </div>
                        <input
                          type="text"
                          id="name"
                          placeholder="João Silva"
                          className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs text-zinc-700 mb-1.5" style={{ fontWeight: 600 }}>
                        Empresa *
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                          <Building className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                        </div>
                        <input
                          type="text"
                          id="company"
                          placeholder="Nexus Finance S/A"
                          className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-xs text-zinc-700 mb-1.5" style={{ fontWeight: 600 }}>
                        Email Corporativo *
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                          <Mail className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                        </div>
                        <input
                          type="email"
                          id="email"
                          placeholder="joao@empresa.com"
                          className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs text-zinc-700 mb-1.5" style={{ fontWeight: 600 }}>
                        Telefone
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                          <Phone className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          placeholder="+55 (11) 9999-9999"
                          className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Department */}
                  <div>
                    <label htmlFor="department" className="block text-xs text-zinc-700 mb-1.5" style={{ fontWeight: 600 }}>
                      Departamento *
                    </label>
                    <select
                      id="department"
                      className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400 transition-all appearance-none"
                      required
                    >
                      <option value="">Selecione o departamento</option>
                      <option value="juridico">Jurídico / Legal</option>
                      <option value="compliance">Compliance & Regulatório</option>
                      <option value="risco">Gestão de Risco</option>
                      <option value="comercial">Comercial / Negócios</option>
                      <option value="ti">Tecnologia da Informação</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>

                  {/* Interest - Mobile: Stack, Desktop: 2 cols */}
                  <div>
                    <label className="block text-xs text-zinc-700 mb-3" style={{ fontWeight: 600 }}>
                      Interesse Principal *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { value: 'demo', label: 'Demonstração da Plataforma', desc: 'Ver o produto em ação' },
                        { value: 'pricing', label: 'Informações Comerciais', desc: 'Planos e contratos' },
                        { value: 'legal', label: 'Suporte Jurídico', desc: 'Dúvidas regulatórias' },
                        { value: 'partnership', label: 'Parcerias Estratégicas', desc: 'Integração e canais' },
                      ].map((option) => (
                        <label key={option.value} className="relative flex items-start gap-3 p-4 bg-zinc-50 border border-zinc-200 rounded-xl cursor-pointer hover:border-zinc-300 hover:bg-zinc-100/50 transition-all group">
                          <input type="radio" name="interest" value={option.value} className="mt-0.5 accent-emerald-500 w-3.5 h-3.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-zinc-800" style={{ fontWeight: 600 }}>{option.label}</p>
                            <p className="text-xs text-zinc-400 mt-0.5">{option.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs text-zinc-700 mb-1.5" style={{ fontWeight: 600 }}>
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Descreva suas necessidades de compliance, os principais desafios regulatórios da sua instituição e como podemos ajudar..."
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400 transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* Privacy */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 w-4 h-4 accent-emerald-500 rounded flex-shrink-0" required />
                    <span className="text-xs text-zinc-500 leading-relaxed">
                      Concordo com a{' '}
                      <a href="#" className="text-emerald-600 hover:text-emerald-700 transition-colors" style={{ fontWeight: 600 }}>
                        Política de Privacidade
                      </a>{' '}
                      e autorizo a Regulon AI a me contatar sobre seus produtos e serviços.
                    </span>
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
                        Enviando mensagem...
                      </>
                    ) : (
                      <>
                        Enviar Mensagem
                        <Send className="w-4 h-4" strokeWidth={1.5} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-5">
            {/* Response Time */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 md:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-center">
                  <Clock className="w-4.5 h-4.5 text-zinc-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-zinc-900 text-sm" style={{ fontWeight: 700 }}>Tempo de Resposta</h3>
              </div>
              <div className="space-y-3">
                {[
                  { type: 'Demonstração comercial', time: '< 4 horas', highlight: true },
                  { type: 'Suporte jurídico', time: '< 24 horas', highlight: false },
                  { type: 'Suporte técnico', time: '< 2 horas', highlight: false },
                  { type: 'Enterprise (SLA)', time: '< 1 hora', highlight: false },
                ].map((item) => (
                  <div key={item.type} className="flex items-center justify-between py-2 border-b border-zinc-50 last:border-0">
                    <span className="text-xs text-zinc-600">{item.type}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-lg ${item.highlight ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'text-zinc-700 bg-zinc-50 border border-zinc-100'}`} style={{ fontWeight: 600 }}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Direct */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 md:p-6 shadow-sm">
              <h3 className="text-zinc-900 text-sm mb-4" style={{ fontWeight: 700 }}>Contato Direto</h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', value: 'contato@regulon.ai', href: 'mailto:contato@regulon.ai' },
                  { icon: Phone, label: 'Telefone', value: '+55 (11) 4040-9090', href: 'tel:+551140409090' },
                  { icon: MapPin, label: 'Endereço', value: 'Av. Paulista, 1000 · São Paulo, SP', href: '#' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-zinc-50 border border-zinc-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 mb-0.5">{item.label}</p>
                      <a href={item.href} className="text-xs text-zinc-700 hover:text-emerald-600 transition-colors" style={{ fontWeight: 500 }}>
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 md:p-6 shadow-sm">
              <h3 className="text-zinc-900 text-sm mb-4" style={{ fontWeight: 700 }}>Horários de Atendimento</h3>
              <div className="space-y-2.5 text-xs">
                {[
                  { day: 'Segunda — Sexta', time: '9h às 18h' },
                  { day: 'Sábado', time: '9h às 13h' },
                  { day: 'Domingo', time: 'Fechado' },
                ].map((s) => (
                  <div key={s.day} className="flex justify-between">
                    <span className="text-zinc-500">{s.day}</span>
                    <span className="text-zinc-700" style={{ fontWeight: 600 }}>{s.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-100">
                <div className="flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Suporte emergencial <strong className="text-zinc-700">24/7</strong> disponível para clientes Enterprise e Financial.
                  </p>
                </div>
              </div>
            </div>

            {/* Frameworks - VERACIDADE E TRANSPARÊNCIA */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-emerald-600" strokeWidth={1.5} />
                <h3 className="text-emerald-900 text-sm" style={{ fontWeight: 700 }}>Roadmap de Monitoramento</h3>
              </div>
              <p className="text-xs text-emerald-700 mb-3 leading-relaxed" style={{ fontWeight: 600 }}>
                Frameworks em Roadmap de Monitoramento:
              </p>
              <div className="space-y-2">
                {['ISO 27001', 'SOC 2', 'LGPD'].map((framework) => (
                  <div key={framework} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full flex-shrink-0"></div>
                    <span className="text-xs text-emerald-800" style={{ fontWeight: 500 }}>{framework}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer com Disclaimer */}
      <footer className="bg-white border-t border-zinc-100 py-6 md:py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-zinc-900 rounded-md flex items-center justify-center">
                <Shield className="w-3 h-3 text-emerald-400" strokeWidth={1.5} />
              </div>
              <span className="text-xs text-zinc-600" style={{ fontWeight: 600 }}>Regulon AI</span>
            </div>
            <p className="text-xs text-zinc-400 text-center sm:text-right">© 2026 Regulon AI. Todos os direitos reservados.</p>
          </div>

          {/* DISCLAIMER CRÍTICO */}
          <div className="pt-4 border-t border-zinc-100">
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <p className="text-xs text-zinc-500 leading-relaxed">
                  <span style={{ fontWeight: 600 }}>Ambiente de Protótipo:</span> Simulações baseadas em dados sintéticos e arquitetura RAG.
                  Certificações finais dependem de auditorias externas. Frameworks mencionados estão em roadmap de monitoramento e não constituem
                  garantia de conformidade imediata.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
