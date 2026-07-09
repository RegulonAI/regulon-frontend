import { FullExplanation } from '@/types/types';

// Read API URL from environment, with local dev server fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ApiErrorResponse {
  error: string;
  fallback: string;
}

/**
 * Checks if a response is an error response
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isApiError(response: any): response is ApiErrorResponse {
  return response && typeof response === 'object' && 'error' in response;
}

/**
 * Fetch explanation for a specific compliance action from FastAPI backend.
 * Integrates error intercepting / wrapper handling.
 * 
 * @param actionId - The ID of the action to explain.
 * @returns The FullExplanation or a structured error object.
 */
export async function explainAction(actionId: string): Promise<FullExplanation | ApiErrorResponse> {
  try {
    const url = `${API_BASE_URL}/explain/action/${actionId}?include_chunks=true`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return {
          error: `Explicação não encontrada (404) para a ação: ${actionId}`,
          fallback: 'Esta ação foi criada com base em análise estruturada do documento regulatório.'
        };
      }
      
      return {
        error: `Erro no Servidor (${response.status}): Não foi possível processar a explicabilidade no momento.`,
        fallback: 'Esta ação foi criada com base em análise estruturada do documento regulatório.'
      };
    }

    const data = await response.json();
    return data as FullExplanation;
  } catch (error) {
    console.error(`[apiClient] explainAction failed for ${actionId}:`, error);
    return {
      error: 'Não foi possível estabelecer conexão com o servidor FastAPI local.',
      fallback: 'Esta ação foi criada com base em análise estruturada do documento regulatório.'
    };
  }
}
