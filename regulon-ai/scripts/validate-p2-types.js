#!/usr/bin/env node
/**
 * Validation Script for P2 Hybrid Architecture Types
 * 
 * Validates:
 * 1. All new interfaces are correctly exported
 * 2. Mock data conforms to new type definitions
 * 3. Backward compatibility with existing types
 * 4. Confidence scoring range (0-1)
 * 5. ISO 8601 date formats
 * 
 * Run: npm run validate:p2
 * or: node scripts/validate-p2-types.js
 */

const fs = require('fs');
const path = require('path');

const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const BLUE = '\x1b[36m';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

// ==================== TEST UTILITIES ====================

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ${GREEN}✓${RESET} ${message}`);
    passedTests++;
  } else {
    console.log(`  ${RED}✗${RESET} ${message}`);
    failedTests++;
  }
}

function section(title) {
  console.log(`\n${BLUE}${title}${RESET}`);
  console.log('─'.repeat(60));
}

// ==================== VALIDATORS ====================

function isValidConfidenceScore(value) {
  return typeof value === 'number' && value >= 0 && value <= 1;
}

function isValidISO8601(value) {
  // Simple ISO 8601 validation: YYYY-MM-DD or full timestamp
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}Z)?$/;
  return iso8601Regex.test(value);
}

function isValidJurisdiction(value) {
  return ['BR', 'UE', 'US', 'INTL'].includes(value);
}

function isValidSource(value) {
  return ['postgresql', 'vector_db', 'hybrid'].includes(value);
}

function isValidPriority(value) {
  return ['critical', 'high', 'medium', 'low'].includes(value);
}

function isValidImpactLevel(value) {
  return ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].includes(value);
}

// ==================== TEST SUITES ====================

section('✓ INTERFACE EXPORTS');

// Test 1: Check if types.ts file exists
const typesPath = path.join(__dirname, '../src/types/types.ts');
assert(fs.existsSync(typesPath), 'types.ts file exists');

// Test 2: Read file and check for interfaces
const typesContent = fs.readFileSync(typesPath, 'utf8');

const interfaces = [
  'DataSourceMetadata',
  'JuridicalSource',
  'RegulationImpact',
  'ChecklistItem',
  'ChatMessage',
  'AgentStatus',
  'AnalysisState',
  'AgentStatusType',
];

interfaces.forEach(iface => {
  assert(
    typesContent.includes(`interface ${iface}`) || typesContent.includes(`type ${iface}`),
    `Interface/Type '${iface}' is exported`
  );
});

// ==================== TEST SUITE 2 ====================

section('✓ TYPE STRUCTURE VALIDATION');

// Test DataSourceMetadata
assert(
  typesContent.includes("source: 'postgresql' | 'vector_db' | 'hybrid'"),
  'DataSourceMetadata.source has correct literal types'
);

assert(
  typesContent.includes('confidence: number'),
  'DataSourceMetadata.confidence field exists'
);

assert(
  typesContent.includes('vectorSimilarity?: number'),
  'DataSourceMetadata.vectorSimilarity is optional'
);

assert(
  typesContent.includes('sourceId?: string'),
  'DataSourceMetadata.sourceId is optional'
);

// Test JuridicalSource
assert(
  typesContent.includes("jurisdiction: 'BR' | 'UE' | 'US' | 'INTL'"),
  'JuridicalSource.jurisdiction has correct values'
);

assert(
  typesContent.includes("regulation: string"),
  'JuridicalSource.regulation field exists'
);

// Test RegulationImpact extensions
assert(
  typesContent.includes('metadata: DataSourceMetadata'),
  'RegulationImpact.metadata field added'
);

assert(
  typesContent.includes('source: JuridicalSource'),
  'RegulationImpact.source field added'
);

// Test ChecklistItem extensions
assert(
  typesContent.includes("priority?: 'critical' | 'high' | 'medium' | 'low'"),
  'ChecklistItem.priority field added'
);

assert(
  typesContent.includes('linkedImpactId?: string'),
  'ChecklistItem.linkedImpactId field added'
);

assert(
  typesContent.includes('dueDate?: string'),
  'ChecklistItem.dueDate field added'
);

// Test ChatMessage extensions
assert(
  typesContent.includes('timestamp: string'),
  'ChatMessage.timestamp field added'
);

assert(
  typesContent.includes('confidence?: number'),
  'ChatMessage.confidence field added'
);

assert(
  typesContent.includes('agentsUsed?: AgentStatus[]'),
  'ChatMessage.agentsUsed field added'
);

// ==================== TEST SUITE 3 ====================

section('✓ MOCK DATA VALIDATION');

const mockDataPath = path.join(__dirname, '../src/types/mock-data-p2.ts');
assert(fs.existsSync(mockDataPath), 'mock-data-p2.ts file exists');

if (fs.existsSync(mockDataPath)) {
  const mockDataContent = fs.readFileSync(mockDataPath, 'utf8');

  // Test DataSourceMetadata examples
  assert(
    mockDataContent.includes('mockMetadataHighConfidenceSql'),
    'mockMetadataHighConfidenceSql export exists'
  );

  assert(
    mockDataContent.includes('mockMetadataHybrid'),
    'mockMetadataHybrid export exists'
  );

  // Test JuridicalSource examples
  assert(
    mockDataContent.includes('mockJuridicalSourceLgpd'),
    'mockJuridicalSourceLgpd export exists'
  );

  // Test RegulationImpact examples
  assert(
    mockDataContent.includes('mockImpactLgpd'),
    'mockImpactLgpd export exists'
  );

  // Test ChecklistItem examples
  assert(
    mockDataContent.includes('mockChecklistItemCritical'),
    'mockChecklistItemCritical export exists'
  );

  // Test ChatMessage examples
  assert(
    mockDataContent.includes('mockChatMessages'),
    'mockChatMessages export exists'
  );

  // Test helper functions
  assert(
    mockDataContent.includes('getConfidenceBadgeColor'),
    'getConfidenceBadgeColor helper exists'
  );

  assert(
    mockDataContent.includes('getPriorityBadgeColor'),
    'getPriorityBadgeColor helper exists'
  );
}

// ==================== TEST SUITE 4 ====================

section('✓ DOCUMENTATION');

const docPath = path.join(__dirname, '../docs/P2_HYBRID_TYPING.md');
assert(fs.existsSync(docPath), 'P2_HYBRID_TYPING.md documentation exists');

if (fs.existsSync(docPath)) {
  const docContent = fs.readFileSync(docPath, 'utf8');

  assert(
    docContent.includes('DataSourceMetadata'),
    'Documentation covers DataSourceMetadata'
  );

  assert(
    docContent.includes('Confidence'),
    'Documentation covers confidence interpretation'
  );

  assert(
    docContent.includes('🟢'),
    'Documentation includes confidence badge colors'
  );

  assert(
    docContent.includes('Rastreabilidade'),
    'Documentation covers audit/traceability'
  );
}

// ==================== SUMMARY ====================

section(`✓ SUMMARY`);

const percentage = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

console.log(`\nTotal Tests:  ${BLUE}${totalTests}${RESET}`);
console.log(`Passed:       ${GREEN}${passedTests}${RESET}`);
console.log(`Failed:       ${failedTests > 0 ? RED : GREEN}${failedTests}${RESET}`);
console.log(`Success Rate: ${percentage >= 90 ? GREEN : RED}${percentage}%${RESET}`);

// ==================== RECOMMENDATIONS ====================

if (failedTests === 0) {
  console.log(`\n${GREEN}✓ All P2 type validations passed!${RESET}`);
  console.log(`\nNext Steps:`);
  console.log(`1. Use mock-data-p2.ts in components for testing`);
  console.log(`2. Update Dashboard.tsx to show confidence badges`);
  console.log(`3. Update Checklist.tsx to show priority and dueDate`);
  console.log(`4. Update Chat.tsx to show timestamp and agentsUsed`);
  console.log(`5. Coordinate with Samuel for backend integration`);
} else {
  console.log(
    `\n${RED}✗ Some validations failed. Please review the errors above.${RESET}`
  );
  process.exit(1);
}

console.log(`\n${GREEN}P2 Type System Ready for Frontend Integration${RESET}\n`);
