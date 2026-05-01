/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { useState, useCallback } from 'react';
import { Upload, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  RegulationImpact,
  ChecklistItem,
  ChatMessage,
  AgentStatus,
  AnalysisState,
} from '@/types/types';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { Chat } from '@/components/Chat';
import { Checklist } from '@/components/Checklist';
import { AgentProgress } from '@/components/AgentProgress';

// ==================== MOCK DATA & INITIALIZATION ====================

/**
 * Inicializa o array de agentes com estado 'pendente'
 */
function initializeAgents(): AgentStatus[] {
  return [
    {
      id: 'agent-1',
      name: 'classificador',
      displayName: 'Classificador',
      status: 'pendente',
      progress: 0,
      message: 'Aguardando classificação do documento...',
    },
    {
      id: 'agent-2',
      name: 'matching',
      displayName: 'Matching',
      status: 'pendente',
      progress: 0,
      message: 'Aguardando busca de regulamentações relevantes...',
    },
    {
      id: 'agent-3',
      name: 'interpretador',
      displayName: 'Interpretador',
      status: 'pendente',
      progress: 0,
      message: 'Aguardando análise de impactos...',
    },
    {
      id: 'agent-4',
      name: 'executor',
      displayName: 'Executor',
      status: 'pendente',
      progress: 0,
      message: 'Aguardando geração de checklist...',
    },
  ];
}

/**
 * Mock: Simula o progresso dos agentes sequencialmente
 * Cada agente processa por um tempo aleatório entre 300-600ms
 * Futuramente, será substituído por WebSocket/EventSource do FastAPI de Samuel
 */
async function simulateAgentProgress(
  setAnalysisState: React.Dispatch<React.SetStateAction<AnalysisState>>,
): Promise<{ impacts: RegulationImpact[]; checklist: ChecklistItem[] }> {
  const agents = initializeAgents();

  // Start analysis
  setAnalysisState({
    isAnalyzing: true,
    currentAgentIndex: 0,
    agents,
    startTime: Date.now(),
  });

  // Process each agent sequentially
  for (let i = 0; i < agents.length; i++) {
    const agent = agents[i];
    const startTime = Date.now();

    // Mark as processing
    setAnalysisState(prev => ({
      ...prev,
      currentAgentIndex: i,
      agents: prev.agents.map((a, idx) =>
        idx === i
          ? {
            ...a,
            status: 'processando' as const,
            progress: 0,
            startTime: Date.now(),
            message: `${a.displayName}: Processando análise...`,
          }
          : a,
      ),
    }));

    // Simulate progress with random duration (300-600ms)
    const processingTime = Math.random() * 300 + 300;
    const progressInterval = 50; // Update every 50ms
    const steps = Math.ceil(processingTime / progressInterval);

    for (let step = 0; step < steps; step++) {
      await new Promise(resolve => setTimeout(resolve, progressInterval));

      const progress = Math.min(((step + 1) / steps) * 100, 99);

      setAnalysisState(prev => ({
        ...prev,
        agents: prev.agents.map((a, idx) =>
          idx === i ? { ...a, progress } : a,
        ),
      }));
    }

    // Wait for the full processing time
    await new Promise(resolve => setTimeout(resolve, processingTime));

    // Mark as completed
    const endTime = Date.now();
    setAnalysisState(prev => ({
      ...prev,
      agents: prev.agents.map((a, idx) =>
        idx === i
          ? {
            ...a,
            status: 'concluído' as const,
            progress: 100,
            endTime,
            message: `${a.displayName}: Análise concluída com sucesso!`,
          }
          : a,
      ),
    }));
  }

  // Mock: Fetch data from /api/analyze
  // Em produção, será substituído por integração com WebSocket/polling do backend
  try {
    const res = await fetch('/api/analyze', { method: 'POST' });
    const data = await res.json();

    // Final state
    setAnalysisState(prev => ({
      ...prev,
      isAnalyzing: false,
      currentAgentIndex: -1,
    }));

    return {
      impacts: data.impacts || [],
      checklist: data.checklist || [],
    };
  } catch (error) {
    console.error('[PAGE] Analysis request failed');

    // Fallback to empty results on error
    setAnalysisState(prev => ({
      ...prev,
      isAnalyzing: false,
      error: 'Erro ao buscar resultados da análise',
    }));

    return { impacts: [], checklist: [] };
  }
}

// ==================== MAIN COMPONENT ====================

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'checklist'>('dashboard');

  // Analysis state with multi-agent tracking
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    isAnalyzing: false,
    currentAgentIndex: -1,
    agents: initializeAgents(),
  });

  // App state
  const [impacts, setImpacts] = useState<RegulationImpact[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [analysisActive, setAnalysisActive] = useState(false);

  // --- Actions ---

  const handleFileUpload = useCallback(async () => {
    setAnalysisActive(true);

    const { impacts: newImpacts, checklist: newChecklist } =
      await simulateAgentProgress(setAnalysisState);

    setImpacts(newImpacts);
    setChecklist(newChecklist);
  }, []);


  return (
    <div className="flex h-screen bg-white font-sans text-zinc-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex-shrink-0 border-b border-zinc-100 flex items-center justify-between px-8 bg-zinc-50/50">
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <span>Sessão: Compliance Global</span>
            <span className="text-zinc-200">/</span>
            <span className="text-zinc-900 font-medium capitalize">{activeTab}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white border border-zinc-200 rounded px-3 py-1 flex items-center gap-2 text-xs text-zinc-500">
              <Search className="w-3 h-3" />
              <input type="text" placeholder="Buscar normas..." className="outline-none bg-transparent w-32" />
            </div>
            <button
              onClick={handleFileUpload}
              disabled={analysisState.isAnalyzing}
              className="bg-zinc-900 text-white px-4 py-1.5 rounded text-xs font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="w-3 h-3" />
              {analysisState.isAnalyzing ? 'Processando...' : 'Carregar PDF'}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-5xl space-y-6"
              >
                {/* Agent Progress Tracker */}
                {analysisState.isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AgentProgress
                      agents={analysisState.agents}
                      currentAgentIndex={analysisState.currentAgentIndex}
                    />
                  </motion.div>
                )}

                {/* Dashboard Component */}
                <Dashboard
                  analysisActive={analysisActive}
                  impacts={impacts}
                  handleFileUpload={handleFileUpload}
                />
              </motion.div>
            )}

            {activeTab === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="h-[calc(100vh-8rem)]"
              >
                <Chat messages={messages} setMessages={setMessages} />
              </motion.div>
            )}

            {activeTab === 'checklist' && (
              <motion.div
                key="checklist"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <Checklist checklist={checklist} setChecklist={setChecklist} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
