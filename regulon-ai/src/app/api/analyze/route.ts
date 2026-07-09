import { NextResponse } from 'next/server';
import type { RegulationImpact, ChecklistItem } from '@/types/compliance';
import { adaptFullExplanationResponse, backendFullExplanationResponse } from '@/lib/mocks/backendMock';

/**
 * POST /api/analyze
 * 
 * Endpoint de análise de documentos regulatórios (Mock)
 * 
 * @description
 * Processa uploads de documentos e retorna análise estruturada de impactos legais.
 * 
 * **STATUS ATUAL:** Mock data com delay simulado.
 * **FUTURO:** Backend substituirá esta implementação por:
 *   - API backend com PDF parsing
 *   - Vector embeddings para análise semântica
 *   - RAG queries para gerar impactos jurídicos estruturados
 * 
 * @see docs/BACKEND_INTEGRATION.md para detalhes
 * 
 * @param {NextRequest} request - Request do cliente
 * @returns {NextResponse} JSON com { impacts, checklist, metadata }
 * @throws {500} Se houver erro ao processar documento
 */
export async function POST(): Promise<NextResponse> {
  try {
    // Simular processamento/parsing de PDF com delay realista
    // Future: Substituir por chamada real ao backend quando disponível
    await new Promise(resolve => setTimeout(resolve, 2000));

    const { impact, checklist } = adaptFullExplanationResponse(backendFullExplanationResponse);
    const mockImpacts: RegulationImpact[] = [impact];
    const mockChecklist: ChecklistItem[] = checklist;

    // Resposta estruturada: consistente com padrão /api/chat
    return NextResponse.json(
      {
        impacts: mockImpacts,
        checklist: mockChecklist,
        metadata: {
          timestamp: new Date().toISOString(),
          status: 'mock-analysis',
          message: 'Dados simulados até integração com backend RAG do Samuel'
        }
      },
      { status: 200 }
    );
  } catch {
    console.error('[ANALYZE_API] Processing failed');
    
    // Formato de erro uniforme: consistente com /api/chat/route.ts
    return NextResponse.json(
      { error: 'Erro ao processar documento. Tente novamente.' },
      { status: 500 }
    );
  }
}

// ✅ Native Next.js Route Segment Config (replaces vercel.json functions block)
// Configures 60-second timeout for document analysis API endpoint on Vercel
export const maxDuration = 60;
