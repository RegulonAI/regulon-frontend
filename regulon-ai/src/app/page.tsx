/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  RegulationImpact,
  ChecklistItem,
  ChatMessage,
} from '@/types/compliance';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { Chat } from '@/components/Chat';
import { Checklist } from '@/components/Checklist';
import { FileUpload } from '@/components/FileUpload';

// ==================== MAIN COMPONENT ====================

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'checklist'>('dashboard');

  // App state
  const [impacts, setImpacts] = useState<RegulationImpact[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [analysisActive, setAnalysisActive] = useState(false);

  const handleAnalysisComplete = ({
    impacts: nextImpacts,
    checklist: nextChecklist,
  }: {
    impacts: RegulationImpact[];
    checklist: ChecklistItem[];
  }) => {
    setImpacts(nextImpacts);
    setChecklist(nextChecklist);
    setAnalysisActive(true);
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
          <div className="bg-white border border-zinc-200 rounded px-3 py-1 flex items-center gap-2 text-xs text-zinc-500">
            <Search className="w-3 h-3" />
            <input type="text" placeholder="Buscar normas..." className="outline-none bg-transparent w-32" />
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
                <FileUpload onAnalysisComplete={handleAnalysisComplete} />

                {analysisActive && (
                  <>
                    <Dashboard
                      analysisActive={analysisActive}
                      impacts={impacts}
                      handleFileUpload={() => undefined}
                    />
                    <section className="rounded-[16px] border border-zinc-200 bg-zinc-50 p-6">
                      <h3 className="text-sm font-semibold text-zinc-900">Checklist de execução</h3>
                      <p className="mt-1 text-xs text-zinc-500">
                        Itens retornados pela análise para ação imediata.
                      </p>
                      <div className="mt-4 space-y-2">
                        {checklist.slice(0, 4).map(item => (
                          <div
                            key={item.id}
                            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700"
                          >
                            {item.task}
                          </div>
                        ))}
                      </div>
                    </section>
                  </>
                )}
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
