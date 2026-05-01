'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types/types';
import { MessageSquare, ChevronRight } from 'lucide-react';

interface ChatProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export function Chat({ messages, setMessages }: ChatProps) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Secure Backend API Call via Express endpoints (acts like a Next.js Server Action / API Route)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      console.error("[CHAT] Request failed");
      setMessages(prev => [...prev, { role: 'assistant', content: "Desculpe, tivemos um problema ao processar sua consulta. Tente novamente." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-bold tracking-tight">Cérebro Regulon RAG v1</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-400">Contexto: Legislação Empresarial BR</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-zinc-400 gap-4 opacity-50">
            <MessageSquare className="w-12 h-12" />
            <p className="text-sm">Inicie uma consulta jurídica em linguagem natural.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.role === 'user'
                ? 'bg-zinc-900 text-white rounded-tr-none'
                : 'bg-zinc-100 text-zinc-900 rounded-tl-none border border-zinc-200'
              }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-4 rounded-2xl text-sm bg-zinc-100 text-zinc-900 rounded-tl-none border border-zinc-200 flex gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce delay-75" />
              <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce delay-150" />
              <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce delay-300" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Pergunte sobre impactos da nova LGPD..."
          className="flex-1 bg-white border border-zinc-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all shadow-sm"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim()}
          className="bg-zinc-900 text-white p-3 rounded-xl hover:bg-zinc-800 transition-colors disabled:opacity-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

