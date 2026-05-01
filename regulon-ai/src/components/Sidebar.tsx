import {
  BarChart3,
  MessageSquare,
  CheckSquare,
  Settings,
  ShieldCheck,
  Building2,
  Terminal
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'dashboard' | 'chat' | 'checklist';
  setActiveTab: (tab: 'dashboard' | 'chat' | 'checklist') => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${active
        ? 'bg-zinc-900 text-white border-r-2 border-zinc-100'
        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
      }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-zinc-200 flex flex-col bg-white">
      <div className="p-6 flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold tracking-tight text-lg">Regulon AI</span>
      </div>

      <nav className="flex-1">
        <div className="px-6 mb-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Monitoramento</div>
        <SidebarItem
          icon={BarChart3}
          label="Impacto Legal"
          active={activeTab === 'dashboard'}
          onClick={() => setActiveTab('dashboard')}
        />
        <SidebarItem
          icon={MessageSquare}
          label="Consulta (Chat)"
          active={activeTab === 'chat'}
          onClick={() => setActiveTab('chat')}
        />
        <SidebarItem
          icon={CheckSquare}
          label="Checklists"
          active={activeTab === 'checklist'}
          onClick={() => setActiveTab('checklist')}
        />

        <div className="px-6 mt-8 mb-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Sistema</div>
        <SidebarItem icon={Building2} label="Perfil da Empresa" onClick={() => { }} />
        <SidebarItem icon={Settings} label="Configurações" onClick={() => { }} />
      </nav>

      <div className="p-4 border-t border-zinc-100 italic text-[10px] text-zinc-400 flex items-center gap-2">
        <Terminal className="w-3 h-3" />
        Versão MVP 1.0.2
      </div>
    </aside>
  );
}

