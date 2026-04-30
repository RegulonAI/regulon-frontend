#!/usr/bin/env node

/**
 * Script de Validação Automatizada da Implementação P0
 * Valida a presença de tipos, imports, componentes e animações
 */

const fs = require('fs');
const path = require('path');

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';
const CHECK = '✓';
const CROSS = '✗';

console.log('\n' + YELLOW + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + RESET);
console.log(YELLOW + 'Validação da Implementação P0 - Multi-Agent Tracking' + RESET);
console.log(YELLOW + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + RESET + '\n');

let passedTests = 0;
let totalTests = 0;

function test(description, condition) {
  totalTests++;
  if (condition) {
    console.log(GREEN + CHECK + RESET + ' ' + description);
    passedTests++;
  } else {
    console.log(RED + CROSS + RESET + ' ' + description);
  }
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    return null;
  }
}

// 1. Validar Types
console.log(YELLOW + '📋 TIPOS' + RESET);
const typesFile = readFile(path.join(__dirname, '../src/types/types.ts'));
test('AgentStatusType exportada', typesFile?.includes("type AgentStatusType"));
test('AgentStatus interface exportada', typesFile?.includes("interface AgentStatus"));
test('AnalysisState interface exportada', typesFile?.includes("interface AnalysisState"));
test('status: \'pendente\' | \'processando\' | \'concluído\' | \'falhou\'', 
  typesFile?.includes("'pendente'") && typesFile?.includes("'processando'"));
console.log();

// 2. Validar AgentProgress Component
console.log(YELLOW + '🎨 COMPONENTE AGENTPROGRESS' + RESET);
const agentProgressFile = readFile(path.join(__dirname, '../src/components/AgentProgress.tsx'));
test('Arquivo AgentProgress existe', agentProgressFile !== null);
test('\'use client\' directive presente', agentProgressFile?.includes("'use client'"));
test('Lucide React icons importados', 
  agentProgressFile?.includes("Loader2") && agentProgressFile?.includes("CheckCircle"));
test('Framer Motion importado', agentProgressFile?.includes("import { motion }"));
test('motion.div com animate', agentProgressFile?.includes("motion.div") && agentProgressFile?.includes("animate="));
test('getStatusIcon function definida', agentProgressFile?.includes("getStatusIcon"));
test('getProgressBar function definida', agentProgressFile?.includes("getProgressBar"));
console.log();

// 3. Validar Page.tsx
console.log(YELLOW + '📄 PAGE.TSX - STATE MANAGEMENT' + RESET);
const pageFile = readFile(path.join(__dirname, '../src/app/page.tsx'));
test('AgentProgress importado', pageFile?.includes("import { AgentProgress }"));
test('analysisState com AnalysisState type', pageFile?.includes("AnalysisState"));
test('initializeAgents() function', pageFile?.includes("function initializeAgents"));
test('simulateAgentProgress() function', pageFile?.includes("async function simulateAgentProgress"));
test('useCallback importado', pageFile?.includes("useCallback"));
test('AgentProgress renderizado', pageFile?.includes("<AgentProgress"));
test('Props agents e currentAgentIndex passadas', 
  pageFile?.includes("agents={analysisState.agents}") && pageFile?.includes("currentAgentIndex={analysisState.currentAgentIndex}"));
console.log();

// 4. Validar Animações
console.log(YELLOW + '✨ ANIMAÇÕES' + RESET);
test('Spinner rotation animation (2s)', agentProgressFile?.includes("duration: 2"));
test('Progress bar animation', agentProgressFile?.includes("duration: 0.5"));
test('Stagger animation (delay por index)', agentProgressFile?.includes("delay: index"));
test('Fade animations (opacity, scale)', 
  agentProgressFile?.includes("opacity") && agentProgressFile?.includes("scale"));
console.log();

// 5. Validar Integrações
console.log(YELLOW + '🔗 INTEGRAÇÕES' + RESET);
test('/api/analyze chamado', pageFile?.includes("fetch('/api/analyze'"));
test('setAnalysisState chamado durante simulação', 
  pageFile?.includes("setAnalysisState") && pageFile?.includes("simulateAgentProgress"));
test('States transitam: pendente → processando → concluído', 
  pageFile?.includes("'pendente'") && pageFile?.includes("'processando'") && pageFile?.includes("'concluído'"));
console.log();

// 6. Validar Build
console.log(YELLOW + '🏗️  BUILD' + RESET);
const nextConfigFile = readFile(path.join(__dirname, '../tsconfig.json'));
test('tsconfig.json contém paths alias @/*', nextConfigFile?.includes("@/*"));
const packageFile = readFile(path.join(__dirname, '../package.json'));
test('framer-motion instalado', packageFile?.includes('"framer-motion"'));
test('lucide-react instalado', packageFile?.includes('"lucide-react"'));
console.log();

// Summary
console.log(YELLOW + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + RESET);
console.log(`Resultado: ${GREEN}${passedTests}/${totalTests}${RESET} testes passaram`);
console.log(YELLOW + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' + RESET);

if (passedTests === totalTests) {
  console.log(GREEN + '\n✓ Implementação validada com sucesso!\n' + RESET);
  process.exit(0);
} else {
  console.log(RED + `\n✗ ${totalTests - passedTests} testes falharam!\n` + RESET);
  process.exit(1);
}
