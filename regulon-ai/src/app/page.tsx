 'use client';

import Link from 'next/link';
import { Shield, Brain, TrendingDown, CheckCircle, ArrowRight, BarChart3, FileText, Lock, Zap, Globe, ChevronRight, Star, Activity, AlertCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Nav - Mobile Optimized */}
      <nav className="border-b border-zinc-100 bg-white/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 text-emerald-400" strokeWidth={1.5} />
            </div>
            <span className="text-zinc-900 tracking-tight text-base md:text-lg" style={{ fontWeight: 700 }}>Regulon AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-zinc-500 hover:text-zinc-900 transition-colors text-sm">Recursos</a>
            <a href="#how-it-works" className="text-zinc-500 hover:text-zinc-900 transition-colors text-sm">Como Funciona</a>
            <a href="#stats" className="text-zinc-500 hover:text-zinc-900 transition-colors text-sm">Resultados</a>
            <Link href="/contact" className="text-zinc-500 hover:text-zinc-900 transition-colors text-sm">Contato</Link>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/login" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors px-3 md:px-4 py-2">
              Entrar
            </Link>
            <Link href="/contact" className="text-xs md:text-sm px-3 md:px-5 py-2 md:py-2.5 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-all">
              Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Announcement Bar */}
      <div className="bg-emerald-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5 flex items-center justify-center gap-2">
          <Zap className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.5} />
          <span className="text-xs text-emerald-700 text-center">
            Novo: RAG Technology v2.0 com suporte a BACEN, CVM e SUSEP
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-emerald-600 hidden sm:block" strokeWidth={1.5} />
        </div>
      </div>

      {/* Hero Section - Mobile First */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-12 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-full mb-6 md:mb-8">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-zinc-600">Monitoramento em tempo real ativo</span>
            </div>
            <h1 className="text-zinc-900 mb-4 md:mb-6 tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', fontWeight: 800, lineHeight: '1.1' }}>
              Compliance Regulatório{' '}
              <span className="text-emerald-500">Inteligente</span>{' '}
              por Design
            </h1>
            <p className="text-zinc-500 mb-8 md:mb-10" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', lineHeight: '1.75' }}>
              Transforme textos jurídicos em ações de negócio. Nossa plataforma RAG monitora
              regulações em tempo real e converte obrigações em protocolos de conformidade acionáveis.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 md:px-7 py-3 md:py-3.5 bg-emerald-400 text-zinc-900 rounded-xl hover:bg-emerald-500 transition-all text-sm shadow-sm hover:shadow-md"
                style={{ fontWeight: 600 }}
              >
                Começar Agora
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-6 md:px-7 py-3 md:py-3.5 bg-white text-zinc-700 rounded-xl border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all text-sm"
                style={{ fontWeight: 500 }}
              >
                Ver Demonstração
              </Link>
            </div>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-6 md:pt-8 border-t border-zinc-100">
              <div className="flex -space-x-2">
                {['AB', 'CJ', 'MF', 'RL', 'SP'].map((initials) => (
                  <div key={initials} className="w-8 h-8 rounded-full bg-zinc-700 border-2 border-white flex items-center justify-center text-xs text-white" style={{ fontWeight: 600 }}>
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-zinc-500">+240 equipes de compliance confiam na Regulon AI</p>
              </div>
            </div>
          </div>

          {/* Hero Visual - Dashboard Mockup */}
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-zinc-50 rounded-3xl -z-10 transform rotate-1"></div>
              <div className="bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden">
                {/* Mockup Header */}
                <div className="border-b border-zinc-100 px-4 md:px-5 py-2 md:py-3 flex items-center justify-between bg-zinc-50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white rounded-md border border-zinc-200">
                    <Activity className="w-3 h-3 text-emerald-500" strokeWidth={1.5} />
                    <span className="text-xs text-zinc-500">regulon.ai/dashboard</span>
                  </div>
                  <div className="w-8 sm:w-16"></div>
                </div>

                {/* Mockup Content */}
                <div className="p-4 md:p-5 space-y-3 md:space-y-4">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    <div className="bg-red-50 border border-red-100 rounded-xl p-2 md:p-3">
                      <div className="flex items-center gap-1 md:gap-1.5 mb-1">
                        <AlertCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-red-600" strokeWidth={1.5} />
                        <span className="text-xs text-red-600 hidden md:block" style={{ fontWeight: 600 }}>Crítico</span>
                      </div>
                      <p className="text-zinc-900" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 700, lineHeight: '1' }}>3</p>
                      <p className="text-xs text-zinc-500 mt-0.5 hidden sm:block">alertas ativos</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-2 md:p-3">
                      <div className="flex items-center gap-1 md:gap-1.5 mb-1">
                        <span className="text-xs text-orange-600 hidden md:block" style={{ fontWeight: 600 }}>Pendente</span>
                      </div>
                      <p className="text-zinc-900" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 700, lineHeight: '1' }}>8</p>
                      <p className="text-xs text-zinc-500 mt-0.5 hidden sm:block">ações aguardando</p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2 md:p-3">
                      <div className="flex items-center gap-1 md:gap-1.5 mb-1">
                        <CheckCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-emerald-600" strokeWidth={1.5} />
                        <span className="text-xs text-emerald-600 hidden md:block" style={{ fontWeight: 600 }}>Conf.</span>
                      </div>
                      <p className="text-zinc-900" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 700, lineHeight: '1' }}>78%</p>
                      <p className="text-xs text-zinc-500 mt-0.5 hidden sm:block">taxa atual</p>
                    </div>
                  </div>

                  {/* Table Preview */}
                  <div className="border border-zinc-100 rounded-xl overflow-hidden">
                    <div className="bg-zinc-50 px-3 md:px-4 py-2 md:py-2.5 border-b border-zinc-100 flex items-center justify-between">
                      <span className="text-xs text-zinc-600" style={{ fontWeight: 600 }}>Monitoramento</span>
                      <span className="text-xs text-emerald-600" style={{ fontWeight: 500 }}>47 ativas</span>
                    </div>
                    {[
                      { name: 'Res. CMN nº 4.966/2021', body: 'BACEN', level: 'CRÍTICO', color: 'text-red-700 bg-red-50 border-red-200' },
                      { name: 'Instrução CVM nº 178/23', body: 'CVM', level: 'ALTO', color: 'text-orange-700 bg-orange-50 border-orange-200' },
                      { name: 'Lei 14.534 - Open Finance', body: 'BACEN', level: 'ALTO', color: 'text-orange-700 bg-orange-50 border-orange-200' },
                    ].map((reg, i) => (
                      <div key={i} className="px-3 md:px-4 py-2 md:py-2.5 flex items-center justify-between border-b border-zinc-50 last:border-0">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-zinc-800 truncate" style={{ fontWeight: 500 }}>{reg.name}</p>
                          <p className="text-xs text-zinc-400">{reg.body}</p>
                        </div>
                        <span className={`inline-flex px-2 py-0.5 rounded-md border text-xs ml-2 flex-shrink-0 ${reg.color}`} style={{ fontWeight: 500 }}>
                          {reg.level}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Chat Preview */}
                  <div className="border border-zinc-100 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-emerald-400 rounded-md flex items-center justify-center">
                        <Brain className="w-3 h-3 text-zinc-900" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs text-zinc-600" style={{ fontWeight: 600 }}>Copilot Regulatório</span>
                    </div>
                    <p className="text-xs text-zinc-500 bg-zinc-50 rounded-lg px-3 py-2 leading-relaxed">
                      "A Res. CMN 4.966 requer revisão dos critérios de provisão até 15/05. Identifiquei 3 gaps nos seus processos atuais..."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By - DADOS FICTÍCIOS */}
      <section className="border-y border-zinc-100 py-10 md:py-12 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-center text-xs text-zinc-400 mb-6 md:mb-8 uppercase tracking-widest" style={{ fontWeight: 600 }}>
            Confiado por equipes jurídicas e de compliance em
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-50">
            {['Nexus Finance', 'Aether Bank', 'Horizon Capital', 'Quantum Systems', 'Vertex Financial', 'Pulse Investments'].map((name) => (
              <span key={name} className="text-zinc-600 text-xs md:text-sm" style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Mobile First Grid */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-full mb-4">
              <Zap className="w-3 h-3 text-emerald-600" strokeWidth={1.5} />
              <span className="text-xs text-emerald-700" style={{ fontWeight: 600 }}>Plataforma Completa</span>
            </span>
            <h2 className="text-zinc-900 mb-4" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, lineHeight: '1.2' }}>
              Tudo que sua equipe de compliance precisa
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-sm md:text-base" style={{ lineHeight: '1.75' }}>
              Uma plataforma integrada que cobre desde o monitoramento de normas até a operacionalização das obrigações regulatórias.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6">
            {[
              {
                icon: Brain,
                title: 'RAG Intelligence',
                desc: 'Análise contextual profunda de documentos regulatórios com recuperação aumentada por IA. Precisão jurídica de 99.2%.',
                badge: 'IA Generativa',
                span: 'lg:col-span-4',
              },
              {
                icon: Activity,
                title: 'Monitoramento em Tempo Real',
                desc: 'Receba alertas instantâneos sobre novas regulamentações do BACEN, CVM, SUSEP, ANPD e outros órgãos reguladores.',
                badge: 'Real-time',
                span: 'lg:col-span-4',
              },
              {
                icon: TrendingDown,
                title: 'Gestão de Risco Financeiro',
                desc: 'Calcule e visualize a exposição financeira a cada obrigação regulatória antes que se torne uma penalidade.',
                badge: 'Risk Management',
                span: 'lg:col-span-4',
              },
              {
                icon: CheckCircle,
                title: 'Checklists Acionáveis',
                desc: 'Converta automaticamente textos jurídicos complexos em tarefas concretas, atribuídas e rastreáveis por equipe.',
                badge: 'Automação',
                span: 'lg:col-span-6',
              },
              {
                icon: BarChart3,
                title: 'Relatórios Executivos',
                desc: 'Dashboards prontos para apresentação ao board e ao regulador, com trilha de auditoria completa e rastreabilidade total.',
                badge: 'Analytics',
                span: 'lg:col-span-6',
              },
            ].map((feature) => (
              <div key={feature.title} className={feature.span}>
                <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 h-full hover:border-zinc-300 hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between mb-4 md:mb-5">
                    <div className="w-11 h-11 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-center group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all">
                      <feature.icon className="w-5 h-5 text-zinc-600 group-hover:text-emerald-600 transition-colors" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-zinc-50 text-zinc-500 rounded-full border border-zinc-200" style={{ fontWeight: 500 }}>
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-zinc-900 mb-2" style={{ fontSize: '1rem', fontWeight: 600 }}>{feature.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — RAG Flow - Mobile First */}
      <section id="how-it-works" className="py-16 md:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-zinc-900 mb-4" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, lineHeight: '1.2' }}>
              Como o Fluxo RAG Funciona
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto text-sm leading-relaxed">
              Da publicação do ato normativo até a ação da sua equipe — em minutos, não semanas.
            </p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-[3.5rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-zinc-200 via-emerald-300 to-zinc-200"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {[
                {
                  step: '01',
                  icon: Globe,
                  title: 'Ingestão Automatizada',
                  desc: 'O sistema monitora continuamente Diário Oficial, DOU, portais do BACEN, CVM, SUSEP e ANPD. Novos atos normativos são capturados automaticamente.',
                  color: 'emerald',
                },
                {
                  step: '02',
                  icon: Brain,
                  title: 'Análise RAG com IA',
                  desc: 'LLMs especializados em direito financeiro extraem obrigações, prazos, sujeitos passivos e penalidades, com citação precisa da fonte normativa.',
                  color: 'emerald',
                },
                {
                  step: '03',
                  icon: FileText,
                  title: 'Mapeamento de Impacto',
                  desc: 'O impacto é classificado por criticidade (Crítico, Alto, Médio, Baixo), área de negócio afetada e exposição financeira calculada.',
                  color: 'emerald',
                },
                {
                  step: '04',
                  icon: CheckCircle,
                  title: 'Ações Operacionais',
                  desc: 'Cada obrigação é convertida em tarefas concretas no checklist, atribuídas ao time responsável com prazo e evidência de conformidade.',
                  color: 'emerald',
                },
              ].map((step, idx) => (
                <div key={step.step}>
                  <div className="text-center">
                    <div className="relative inline-flex mb-6">
                      <div className="w-14 h-14 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center shadow-sm">
                        <step.icon className="w-6 h-6 text-zinc-700" strokeWidth={1.5} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                        <span className="text-zinc-900" style={{ fontSize: '0.6rem', fontWeight: 700 }}>{step.step}</span>
                      </div>
                    </div>
                    <h3 className="text-zinc-900 mb-2" style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{step.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Mobile First */}
      <section id="stats" className="py-16 md:py-20 bg-white border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 flex flex-col justify-center">
              <h2 className="text-zinc-900 mb-4" style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', fontWeight: 700, lineHeight: '1.2' }}>
                Resultados que empresas líderes alcançam com a Regulon AI
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Dados consolidados de nossa base de clientes enterprise no setor financeiro brasileiro.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 mt-6 text-sm text-emerald-600 hover:text-emerald-700 transition-colors" style={{ fontWeight: 600 }}>
                Ver Case Studies <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[
                  { value: '87%', label: 'Redução de riscos regulatórios', sub: 'vs. processos manuais' },
                  { value: '4 min', label: 'Análise de novo ato normativo', sub: 'vs. 2.3h com consultoria' },
                  { value: '99.2%', label: 'Precisão na extração jurídica', sub: 'validado por advogados' },
                  { value: 'R$2.8M', label: 'Multas evitadas em média', sub: 'por cliente ao ano' },
                  { value: '47+', label: 'Reguladores monitorados', sub: 'BACEN, CVM, SUSEP, ANPD...' },
                  { value: '<24h', label: 'Tempo de onboarding', sub: 'integração via API REST' },
                ].map((stat) => (
                  <div key={stat.value} className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 md:p-6">
                    <p className="text-zinc-900 mb-1" style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', fontWeight: 800, lineHeight: '1' }}>{stat.value}</p>
                    <p className="text-zinc-700 text-xs md:text-sm mb-1" style={{ fontWeight: 500 }}>{stat.label}</p>
                    <p className="text-zinc-400 text-xs">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zinc-900 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="w-12 h-12 bg-emerald-400/20 border border-emerald-400/30 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Lock className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
          </div>
          <h2 className="text-white mb-4" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, lineHeight: '1.2' }}>
            Pronto para transformar seu compliance?
          </h2>
          <p className="text-zinc-400 mb-8 md:mb-10 max-w-xl mx-auto text-sm md:text-base" style={{ lineHeight: '1.75' }}>
            Agende uma demonstração personalizada com nossos especialistas e veja como a Regulon AI se adapta ao contexto regulatório da sua instituição.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 md:px-7 py-3 md:py-3.5 bg-emerald-400 text-zinc-900 rounded-xl hover:bg-emerald-300 transition-all text-sm shadow-sm" style={{ fontWeight: 600 }}>
              Solicitar Demonstração Gratuita
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center gap-2 px-6 md:px-7 py-3 md:py-3.5 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/15 transition-all text-sm" style={{ fontWeight: 500 }}>
              Acessar Plataforma
            </Link>
          </div>
          <p className="text-zinc-600 text-xs mt-6 md:mt-8">
            Frameworks: ISO 27001 · SOC 2 · LGPD · Setup em menos de 24 horas
          </p>
        </div>
      </section>

      {/* Footer - Mobile First */}
      <footer className="bg-white border-t border-zinc-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-4">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 bg-zinc-900 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
                </div>
                <span className="text-zinc-900 text-sm" style={{ fontWeight: 700 }}>Regulon AI</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mb-4">
                A plataforma líder em compliance regulatório inteligente para instituições financeiras no Brasil.
              </p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-full text-xs text-zinc-500">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  Todos os sistemas operacionais
                </span>
              </div>
            </div>
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  { title: 'Produto', links: ['Recursos', 'Segurança', 'Integrações', 'Preços', 'Changelog'] },
                  { title: 'Empresa', links: ['Sobre', 'Blog', 'Carreiras', 'Imprensa', 'Contato'] },
                  { title: 'Legal', links: ['Privacidade', 'Termos de Uso', 'Compliance', 'LGPD', 'Cookies'] },
                ].map((col) => (
                  <div key={col.title}>
                    <h4 className="text-zinc-900 text-sm mb-4" style={{ fontWeight: 600 }}>{col.title}</h4>
                    <ul className="space-y-2.5">
                      {col.links.map((link) => (
                        <li key={link}>
                          <a href="#" className="text-zinc-500 hover:text-zinc-800 transition-colors text-sm">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-100 pt-6 md:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-400 text-xs text-center sm:text-left">© 2026 Regulon AI Tecnologia Ltda. CNPJ 00.000.000/0001-00. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-zinc-400">São Paulo, Brasil</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
