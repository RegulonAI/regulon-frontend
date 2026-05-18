// ✅ Explicit re-export to prevent circular dependency issues
// Imports types directly from compliance module
export type {
  DataSourceType,
  DataSourceMetadata,
  RegulationSource,
  RegulationImpact,
  ChecklistItem,
  ChatProcessingAgent,
  ChatMessageMetadata,
  ChatMessage,
  ComplianceAction,
  AgentStatusType,
  AgentStatus,
} from './compliance';
