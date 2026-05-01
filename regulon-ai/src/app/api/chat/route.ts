import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/chat
 * Endpoint seguro para consultas jurídicas com IA
 * - API Key (GEMINI_API_KEY) permanece oculta no servidor
 * - Valida entrada e trata erros gracefully
 * - P2: Retorna metadata com confidence e agentsUsed
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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === '') {
      console.error('[CHAT_API] API key não configurada');
      return NextResponse.json(
        { 
          error: 'Serviço de IA temporariamente indisponível. Por favor, configure GEMINI_API_KEY no servidor.' 
        },
        { status: 503 }
      );
    }

    // Simulando resposta de IA até backend estar pronto
    // Future: Integrar com API real de IA quando disponível
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
    console.error('[CHAT_API] Request failed');
    return NextResponse.json(
      { error: 'Erro ao processar consulta jurídica. Tente novamente.' },
      { status: 500 }
    );
  }
}

/**
 * Gera resposta simulada de assistente jurídico com metadata P2
 * Será substituído por integração real com backend LLM quando disponível
 */
async function generateLegalInsight(
  userMessage: string
): Promise<{ reply: string; confidence: number; agentsUsed: { id: string; name: string; displayName: string }[] }> {
  // Simular latência de rede
  await new Promise(resolve => setTimeout(resolve, 800));

  const insights: Record<string, { reply: string; confidence: number }> = {
    'lgpd': {
      reply: 'A LGPD exige consentimento prévio e explícito do titular de dados. Recomendações: 1) Remova checkboxes pré-marcadas, 2) Atualize Política de Privacidade, 3) Implemente direito ao esquecimento.',
      confidence: 0.95
    },
    'gdpr': {
      reply: 'GDPR se aplica a dados de residentes da UE. Recomendações: 1) Designar Data Protection Officer, 2) Realizar DPIA, 3) Estabelecer SLA de resposta a direitos.',
      confidence: 0.92
    },
    'compliance': {
      reply: 'Conformidade regulatória requer mapeamento contínuo. Recomendações: 1) Auditar processos mensalmente, 2) Documentar decisões legais, 3) Treinar equipe.',
      confidence: 0.88
    },
    'risco': {
      reply: 'Análise de risco identifica vulnerabilidades legais. Recomendações: 1) Classificar por impacto, 2) Priorizar mitigação, 3) Monitorar legislação.',
      confidence: 0.85
    },
  };

  const lowerMessage = userMessage.toLowerCase();
  let selectedInsight = null;
  let selectedConfidence = 0.7;

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
  const agentsUsed = [
    { id: 'agent-1', name: 'classificador', displayName: 'Classificador' },
    { id: 'agent-2', name: 'matching', displayName: 'Matching' },
    { id: 'agent-3', name: 'interpretador', displayName: 'Interpretador' }
  ];

  return { 
    reply, 
    confidence: selectedInsight ? selectedConfidence : 0.65,
    agentsUsed
  };
}

