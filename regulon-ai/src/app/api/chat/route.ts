import { NextRequest, NextResponse } from 'next/server';
import type { ChatProcessingAgent } from '@/types/compliance';

/**
 * POST /api/chat
 * Endpoint seguro para consultas jurídicas com IA
 * 
 * - Funciona com ou sem GEMINI_API_KEY configurada
 * - Se GEMINI_API_KEY ausente: usa dados mock (MVP/Prototipagem)
 * - Se GEMINI_API_KEY presente: será integrado com IA real em breve
 * - Retorna sempre status 200 com metadata P2 (confidence, agentsUsed)
 */
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Mensagem inválida. Por favor, envie um texto não-vazio.' },
        { status: 400 }
      );
    }

    // ✅ Lazy initialization: Check for API key only when needed
    // If absent, fall back to mock data gracefully (no error, MVP mode active)
    const apiKey = process.env.GEMINI_API_KEY;
    const isProductionMode = apiKey && apiKey.trim().length > 0;

    if (isProductionMode) {
      // Future: Initialize Gemini client and call real API
      // const client = new GoogleGenerativeAI(apiKey);
      // const result = await client.generateContent(message);
      // return NextResponse.json(...);
      
      console.log('[CHAT_API] GEMINI_API_KEY configurada - modo integração real (futuro)');
    } else {
      console.warn('[CHAT_API] GEMINI_API_KEY não configurada - usando mock data (MVP)');
    }

    // Gerar resposta: usa mock agora, será substituído por IA real
    const { reply, confidence, agentsUsed } = await generateLegalInsight(message);

    // P2: Retornar metadata de confiança
    return NextResponse.json(
      { 
        reply,
        confidence,
        agentsUsed
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('[CHAT_API] Request processing error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar consulta jurídica. Tente novamente.' },
      { status: 500 }
    );
  }
}

/**
 * Gera resposta simulada de assistente jurídico com metadata P2
 * 
 * STATUS ATUAL: Mock data elegante para MVP
 * FUTURO: Será substituído por integração real com Gemini/Claude + FastAPI do Samuel
 */
async function generateLegalInsight(
  userMessage: string
): Promise<{ reply: string; confidence: number; agentsUsed: ChatProcessingAgent[] }> {
  // Simular latência de processamento
  await new Promise(resolve => setTimeout(resolve, 800));

  const insights: Record<string, { reply: string; confidence: number }> = {
    'lgpd': {
      reply: 'A LGPD exige consentimento prévio e explícito do titular de dados. Recomendações: 1) Remova checkboxes pré-marcadas, 2) Atualize Política de Privacidade, 3) Implemente direito ao esquecimento.',
      confidence: 95
    },
    'gdpr': {
      reply: 'GDPR se aplica a dados de residentes da UE. Recomendações: 1) Designar Data Protection Officer, 2) Realizar DPIA, 3) Estabelecer SLA de resposta a direitos.',
      confidence: 92
    },
    'compliance': {
      reply: 'Conformidade regulatória requer mapeamento contínuo. Recomendações: 1) Auditar processos mensalmente, 2) Documentar decisões legais, 3) Treinar equipe.',
      confidence: 88
    },
    'risco': {
      reply: 'Análise de risco identifica vulnerabilidades legais. Recomendações: 1) Classificar por impacto, 2) Priorizar mitigação, 3) Monitorar legislação.',
      confidence: 85
    },
  };

  const lowerMessage = userMessage.toLowerCase();
  let selectedInsight = null;
  let selectedConfidence = 70;

  for (const [key, insight] of Object.entries(insights)) {
    if (lowerMessage.includes(key)) {
      selectedInsight = insight.reply;
      selectedConfidence = insight.confidence;
      break;
    }
  }

  const reply = selectedInsight || 
    'Consulta registrada. Para análise jurídica detalhada, o cérebro RAG do Samuel processará seu documento em breve. Você pode: 1) Fazer upload de um PDF, 2) Formular nova pergunta, 3) Consultar checklist.';

  // P2: Simular agentes que processaram a mensagem
  const agentsUsed: ChatProcessingAgent[] = [
    { id: 'agent-1', name: 'classificador', displayName: 'Classificador' },
    { id: 'agent-2', name: 'matching', displayName: 'Matching' },
    { id: 'agent-3', name: 'interpretador', displayName: 'Interpretador' }
  ];

  return { 
    reply, 
    confidence: selectedInsight ? selectedConfidence : 65,
    agentsUsed
  };
}
