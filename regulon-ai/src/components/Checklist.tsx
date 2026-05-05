'use client';

import type { ChecklistItem } from '@/types/compliance';
import { CheckSquare } from 'lucide-react';

interface ChecklistProps {
  checklist: ChecklistItem[];
  setChecklist: React.Dispatch<React.SetStateAction<ChecklistItem[]>>;
}

export function Checklist({ checklist, setChecklist }: ChecklistProps) {
  return (
    <div className="max-w-3xl border border-zinc-200 rounded-2xl bg-white shadow-sm overflow-hidden">
      <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
        <h3 className="text-lg font-bold">Checklist de Conformidade Operacional</h3>
        <div className="flex items-center gap-2 text-[10px] text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          {checklist.filter(c => c.completed).length}/{checklist.length} Finalizados
        </div>
      </div>
      <div className="p-2">
        {checklist.length === 0 ? (
          <div className="p-20 text-center text-zinc-400 text-sm">
            Carregue um documento para gerar seu checklist acionável automaticamente.
          </div>
        ) : (
          checklist.map(item => (
            <div
              key={item.id}
              className="group flex items-start gap-4 p-4 hover:bg-zinc-50 rounded-xl transition-colors cursor-pointer"
              onClick={() => {
                setChecklist(prev => prev.map(c => c.id === item.id ? { ...c, completed: !c.completed } : c));
              }}
            >
              <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${item.completed
                  ? 'bg-zinc-900 border-zinc-900 text-white'
                  : 'border-zinc-300 hover:border-zinc-900'
                }`}>
                {item.completed && <CheckSquare className="w-3 h-3" />}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-bold ${item.completed ? 'line-through text-zinc-400' : ''}`}>{item.task}</p>
                <p className="text-xs text-zinc-500 mt-1">{item.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
