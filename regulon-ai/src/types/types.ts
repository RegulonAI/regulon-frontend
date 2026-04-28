export interface RegulationImpact {
  id: string;
  title: string;
  impactLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  relevance: string;
  summary: string;
}

export interface ChecklistItem {
  id: string;
  task: string;
  description: string;
  completed: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
