import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/chat
 * Endpoint seguro para consultas jurídicas com IA
 * - API Key (GEMINI_API_KEY) permanece oculta no servidor
 * - Valida entrada e trata erros gracefully
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
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey === '') {
      console.error('[CHAT_API] GEMINI_API_KEY não configurada');
      return NextResponse.json(
        { 
          error: 'Serviço de IA temporariamente indisponível. Por favor, configure GEMINI_API_KEY no servidor.' 
        },
        { status: 503 }
      );
    }

    // Simulando resposta de IA até backend do Samuel estar pronto
    // TODO: Integrar com API real do Gemini quando disponível
    const simulatedReply = await generateLegalInsight(message);

    return NextResponse.json({ reply: simulatedReply }, { status: 200 });
  } catch (error) {
    console.error('[CHAT_API] Erro interno:', error);
    return NextResponse.json(
      { error: 'Erro ao processar consulta jurídica. Tente novamente.' },
      { status: 500 }
    );
  }
}

/**
 * Gera resposta simulada de assistente jurídico
 * Será substituído por integração real com Gemini/Claude
 */
async function generateLegalInsight(userMessage: string): Promise<string> {
  // Simular latência de rede
  await new Promise(resolve => setTimeout(resolve, 800));

  const insights: Record<string, string> = {
    'lgpd': 'A LGPD exige consentimento prévio e explícito do titular de dados. Recomendações: 1) Remova checkboxes pré-marcadas, 2) Atualize Política de Privacidade, 3) Implemente direito ao esquecimento.',
    'gdpr': 'GDPR se aplica a dados de residentes da UE. Recomendações: 1) Designar Data Protection Officer, 2) Realizar DPIA, 3) Estabelecer SLA de resposta a direitos.',
    'compliance': 'Conformidade regulatória requer mapeamento contínuo. Recomendações: 1) Auditar processos mensalmente, 2) Documentar decisões legais, 3) Treinar equipe.',
    'risco': 'Análise de risco identifica vulnerabilidades legais. Recomendações: 1) Classificar por impacto, 2) Priorizar mitigação, 3) Monitorar legislação.',
  };

  const lowerMessage = userMessage.toLowerCase();
  for (const [key, insight] of Object.entries(insights)) {
    if (lowerMessage.includes(key)) {
      return insight;
    }
  }

  return 'Consulta registrada. Para análise jurídica detalhada, o cérebro RAG do Samuel processará seu documento em breve. Você pode: 1) Fazer upload de um PDF, 2) Formular nova pergunta, 3) Consultar checklist.';
}

