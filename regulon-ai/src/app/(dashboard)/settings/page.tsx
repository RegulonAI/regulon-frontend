 'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Shield, User, Building2, Zap, Bell, Save, Upload, X, Check,
  Mail, FileText, Globe, Database, Cloud, CheckCircle2, AlertCircle,
  Loader2, ArrowLeft, Settings
} from 'lucide-react';

type Tab = 'profile' | 'company' | 'integrations' | 'notifications';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: typeof Database;
  status: 'connected' | 'disconnected' | 'error';
  category: string;
}

const integrations: Integration[] = [
  { id: 'bacen', name: 'BACEN API', description: 'Normas do Banco Central', icon: Database, status: 'connected', category: 'Fontes Oficiais' },
  { id: 'cvm', name: 'CVM Portal', description: 'Instruções da CVM', icon: Globe, status: 'connected', category: 'Fontes Oficiais' },
  { id: 'anpd', name: 'ANPD', description: 'Resoluções LGPD', icon: Shield, status: 'disconnected', category: 'Fontes Oficiais' },
  { id: 'sap', name: 'SAP ERP', description: 'Integração com processos internos', icon: Cloud, status: 'connected', category: 'ERP' },
  { id: 'totvs', name: 'TOTVS Protheus', description: 'Dados financeiros e operacionais', icon: Database, status: 'disconnected', category: 'ERP' },
  { id: 'oracle', name: 'Oracle Cloud', description: 'Sistema de gestão corporativa', icon: Cloud, status: 'error', category: 'ERP' },
];

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'profile' as Tab, label: 'Perfil do Usuário', icon: User },
    { id: 'company' as Tab, label: 'Dados da Empresa', icon: Building2 },
    { id: 'integrations' as Tab, label: 'Integrações', icon: Zap },
    { id: 'notifications' as Tab, label: 'Notificações', icon: Bell },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1200);
  };

  const handleBack = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      {/* Mobile-Only Navigation Header (Glassmorphism) */}
      <div className="block lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={handleBack}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-all active:scale-95"
            aria-label="Voltar ao Dashboard"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-900" strokeWidth={1.5} />
          </button>
          <div className="flex-1">
            <h1 className="text-zinc-900 text-base" style={{ fontWeight: 700 }}>Configurações</h1>
            <p className="text-xs text-zinc-400">Gerencie suas preferências</p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-400 rounded-lg text-xs text-zinc-900 hover:bg-emerald-500 transition-all disabled:opacity-50"
            style={{ fontWeight: 600 }}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2} />
                <span className="hidden xs:inline">Salvando...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" strokeWidth={2} />
                <span className="hidden xs:inline">Salvar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar Desktop - Hidden on mobile, show on desktop */}
      <aside className="hidden lg:flex w-60 flex-shrink-0 bg-zinc-900 flex-col overflow-y-auto">
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-emerald-400 rounded-lg flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-zinc-900" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-white text-sm" style={{ fontWeight: 700, lineHeight: '1' }}>Regulon AI</p>
              <p className="text-zinc-500 text-xs">Compliance Platform</p>
            </div>
          </Link>
        </div>

        <div className="flex-1 px-3 py-4">
          <button
            onClick={handleBack}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all mb-2"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-sm">Voltar ao Dashboard</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Desktop Only */}
        <header className="hidden lg:block bg-white border-b border-zinc-100 px-4 md:px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-zinc-900 text-lg md:text-xl" style={{ fontWeight: 700 }}>Configurações</h1>
              <p className="text-xs md:text-sm text-zinc-400 mt-0.5">Gerencie suas preferências e integrações</p>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-400 rounded-xl text-sm text-zinc-900 hover:bg-emerald-500 transition-all disabled:opacity-50"
              style={{ fontWeight: 600 }}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" strokeWidth={2} />
                  <span className="hidden sm:inline">Salvar</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Content Area with Mobile Padding Top */}
        <div className="flex-1 overflow-y-auto pt-[60px] lg:pt-0">
          <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
            {/* Tabs - Horizontal scroll on mobile */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-2 shadow-sm overflow-x-auto">
              <div className="flex gap-2 min-w-max md:min-w-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" strokeWidth={1.5} />
                    <span className="text-sm" style={{ fontWeight: activeTab === tab.id ? 600 : 500 }}>
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'profile' && <ProfileTab />}
              {activeTab === 'company' && <CompanyTab />}
              {activeTab === 'integrations' && <IntegrationsTab integrations={integrations} />}
              {activeTab === 'notifications' && <NotificationsTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-zinc-200 rounded-2xl p-5 md:p-6 shadow-sm">
        <h3 className="text-zinc-900 text-base mb-4" style={{ fontWeight: 700 }}>Informações Pessoais</h3>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-zinc-400" strokeWidth={1.5} />
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-600 hover:bg-zinc-100 transition-all">
              <Upload className="w-3.5 h-3.5" strokeWidth={1.5} />
              Upload Foto
            </button>
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5" style={{ fontWeight: 600 }}>Nome Completo</label>
                <input
                  type="text"
                  defaultValue="Usuário Admin"
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5" style={{ fontWeight: 600 }}>Cargo</label>
                <input
                  type="text"
                  defaultValue="Compliance Manager"
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-500 mb-1.5" style={{ fontWeight: 600 }}>E-mail Corporativo</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                <input
                  type="email"
                  defaultValue="admin@nexusfinance.com.br"
                  className="w-full pl-11 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-100">
          <h4 className="text-xs text-zinc-500 mb-3 uppercase tracking-wider" style={{ fontWeight: 700 }}>Autenticação</h4>
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-600 hover:bg-zinc-100 transition-all">
            <Shield className="w-4 h-4" strokeWidth={1.5} />
            Alterar Senha
          </button>
        </div>
      </div>
    </div>
  );
}

function CompanyTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-zinc-200 rounded-2xl p-5 md:p-6 shadow-sm">
        <h3 className="text-zinc-900 text-base mb-4" style={{ fontWeight: 700 }}>Dados da Organização</h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5" style={{ fontWeight: 600 }}>Razão Social</label>
              <input
                type="text"
                defaultValue="Nexus Finance S/A"
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5" style={{ fontWeight: 600 }}>CNPJ</label>
              <input
                type="text"
                defaultValue="00.000.000/0001-00"
                placeholder="Dados fictícios de protótipo"
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5" style={{ fontWeight: 600 }}>Setor</label>
              <select className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400">
                <option>Financeiro</option>
                <option>Seguros</option>
                <option>Saúde</option>
                <option>Tecnologia</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5" style={{ fontWeight: 600 }}>Porte</label>
              <select className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400">
                <option>Grande</option>
                <option>Médio</option>
                <option>Pequeno</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5" style={{ fontWeight: 600 }}>Jurisdição</label>
              <select className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400">
                <option>Brasil</option>
                <option>Brasil + Internacional</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl p-5 md:p-6 shadow-sm">
        <h3 className="text-zinc-900 text-base mb-4" style={{ fontWeight: 700 }}>Documentos Base</h3>
        <p className="text-xs text-zinc-400 mb-4">Upload de políticas internas, estatutos e frameworks de compliance</p>

        <div className="space-y-3">
          {[
            { name: 'Política de Compliance - v3.2.pdf', size: '2.4 MB', date: '15/04/2026', framework: 'ISO 27001' },
            { name: 'Manual de Controles Internos - BACEN.pdf', size: '5.1 MB', date: '10/04/2026', framework: 'BACEN' },
            { name: 'Matriz de Riscos Corporativa.xlsx', size: '890 KB', date: '08/04/2026', framework: 'SOC 2' },
          ].map((doc, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-zinc-50 border border-zinc-200 rounded-xl hover:bg-zinc-100 transition-all">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 bg-white border border-zinc-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-zinc-500" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-800 truncate" style={{ fontWeight: 500 }}>{doc.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-zinc-400">{doc.size} · {doc.date}</p>
                    <span className="px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded text-xs" style={{ fontWeight: 500 }}>{doc.framework}</span>
                  </div>
                </div>
              </div>
              <button className="p-1.5 hover:bg-zinc-200 rounded-lg transition-all flex-shrink-0">
                <X className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-zinc-200 rounded-xl text-sm text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50 transition-all">
          <Upload className="w-4 h-4" strokeWidth={1.5} />
          Adicionar Documento
        </button>
      </div>
    </div>
  );
}

function IntegrationsTab({ integrations }: { integrations: Integration[] }) {
  const categories = Array.from(new Set(integrations.map(i => i.category)));

  const statusConfig = {
    connected: { label: 'Conectado', className: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle2 },
    disconnected: { label: 'Desconectado', className: 'bg-zinc-50 text-zinc-500 border-zinc-200', icon: AlertCircle },
    error: { label: 'Erro', className: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
  };

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category} className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 md:px-6 py-4 bg-zinc-50 border-b border-zinc-100">
            <h3 className="text-zinc-900 text-sm" style={{ fontWeight: 700 }}>{category}</h3>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.filter(i => i.category === category).map((integration) => {
              const status = statusConfig[integration.status];
              const StatusIcon = status.icon;
              return (
                <div key={integration.id} className="border border-zinc-200 rounded-xl p-4 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-center">
                      <integration.icon className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
                    </div>
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border ${status.className}`} style={{ fontWeight: 600 }}>
                      <StatusIcon className="w-3 h-3" strokeWidth={2} />
                      {status.label}
                    </span>
                  </div>
                  <h4 className="text-sm text-zinc-900 mb-1" style={{ fontWeight: 600 }}>{integration.name}</h4>
                  <p className="text-xs text-zinc-400 mb-3 leading-relaxed">{integration.description}</p>
                  <button
                    className={`w-full px-3 py-2 rounded-lg text-xs transition-all ${
                      integration.status === 'connected'
                        ? 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                        : 'bg-emerald-400 text-zinc-900 hover:bg-emerald-500'
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    {integration.status === 'connected' ? 'Desconectar' : 'Conectar'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function NotificationsTab() {
  const [notifications, setNotifications] = useState({
    newLaws: true,
    criticalAlerts: true,
    highAlerts: true,
    mediumAlerts: false,
    lowAlerts: false,
    weeklyReport: true,
    monthlyReport: true,
  });

  const toggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-zinc-200 rounded-2xl p-5 md:p-6 shadow-sm">
        <h3 className="text-zinc-900 text-base mb-4" style={{ fontWeight: 700 }}>Alertas de Novas Regulações</h3>

        <div className="space-y-3">
          <ToggleRow
            label="Novas Leis e Normas Publicadas"
            description="Receber notificação imediata quando uma nova regulação for publicada"
            enabled={notifications.newLaws}
            onToggle={() => toggle('newLaws')}
          />
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl p-5 md:p-6 shadow-sm">
        <h3 className="text-zinc-900 text-base mb-4" style={{ fontWeight: 700 }}>Níveis de Criticidade</h3>

        <div className="space-y-3">
          <ToggleRow
            label="Alertas Críticos"
            description="Regulações com impacto crítico e prazo imediato"
            enabled={notifications.criticalAlerts}
            onToggle={() => toggle('criticalAlerts')}
            badge="CRÍTICO"
            badgeColor="bg-red-50 text-red-700 border-red-200"
          />
          <ToggleRow
            label="Alertas de Alta Prioridade"
            description="Regulações de alto impacto financeiro ou operacional"
            enabled={notifications.highAlerts}
            onToggle={() => toggle('highAlerts')}
            badge="ALTO"
            badgeColor="bg-orange-50 text-orange-700 border-orange-200"
          />
          <ToggleRow
            label="Alertas de Média Prioridade"
            description="Regulações com impacto moderado"
            enabled={notifications.mediumAlerts}
            onToggle={() => toggle('mediumAlerts')}
            badge="MÉDIO"
            badgeColor="bg-yellow-50 text-yellow-700 border-yellow-200"
          />
          <ToggleRow
            label="Alertas de Baixa Prioridade"
            description="Regulações informativas ou de baixo impacto"
            enabled={notifications.lowAlerts}
            onToggle={() => toggle('lowAlerts')}
            badge="BAIXO"
            badgeColor="bg-green-50 text-green-700 border-green-200"
          />
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl p-5 md:p-6 shadow-sm">
        <h3 className="text-zinc-900 text-base mb-4" style={{ fontWeight: 700 }}>Relatórios Periódicos</h3>

        <div className="space-y-3">
          <ToggleRow
            label="Relatório Semanal"
            description="Resumo executivo enviado todas as segundas-feiras"
            enabled={notifications.weeklyReport}
            onToggle={() => toggle('weeklyReport')}
          />
          <ToggleRow
            label="Relatório Mensal"
            description="Relatório completo de conformidade no início de cada mês"
            enabled={notifications.monthlyReport}
            onToggle={() => toggle('monthlyReport')}
          />
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  enabled,
  onToggle,
  badge,
  badgeColor,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  badge?: string;
  badgeColor?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-3 md:p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
          <p className="text-sm text-zinc-900" style={{ fontWeight: 600 }}>{label}</p>
          {badge && (
            <span className={`inline-flex px-2 py-0.5 rounded-md text-xs border w-fit ${badgeColor}`} style={{ fontWeight: 600 }}>
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${
          enabled ? 'bg-emerald-400' : 'bg-zinc-300'
        }`}
        aria-label={`${enabled ? 'Desativar' : 'Ativar'} ${label}`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${
            enabled ? 'left-[22px]' : 'left-0.5'
          }`}
        ></div>
      </button>
    </div>
  );
}
