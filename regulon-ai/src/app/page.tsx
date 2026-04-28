/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { useState } from 'react';
import { Upload, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { RegulationImpact, ChecklistItem, ChatMessage } from '@/types/types';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { Chat } from '@/components/Chat';
import { Checklist } from '@/components/Checklist';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'checklist'>('dashboard');
  const [loading, setLoading] = useState(false);

  // App state
  const [impacts, setImpacts] = useState<RegulationImpact[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [analysisActive, setAnalysisActive] = useState(false);

  // --- Actions ---

  const handleFileUpload = async () => {
    setLoading(true);
    setAnalysisActive(true);

    try {
      // Usando uma rota de API (backend Express neste caso) para simular o tráfego 
      // de Next.js Route Handlers. Evita lógicas complexas e chaves de API no Frontend.
      const res = await fetch('/api/analyze', { method: 'POST' });
      const data = await res.json();

      setImpacts(data.impacts || []);
      setChecklist(data.checklist || []);
    } catch (error) {
      console.error('Error in mock analysis:', error);
    } finally {
      setLoading(false);
    }
  };

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
              disabled={loading}
              className="bg-zinc-900 text-white px-4 py-1.5 rounded text-xs font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2"
            >
              <Upload className="w-3 h-3" />
              {loading ? 'Processando...' : 'Carregar PDF'}
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
                className="max-w-5xl"
              >
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
