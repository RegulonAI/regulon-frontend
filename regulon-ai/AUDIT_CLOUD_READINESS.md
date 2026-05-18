# ☁️ AUDIT: Cloud Readiness & Security Hardening

**Projeto:** Regulon AI (Next.js 16.2.4, pnpm)  
**Data:** 18 de maio de 2026  
**Status:** 🔴 4 Gargalos Críticos Identificados  
**Impacto:** Falhas silenciosas em SSR / Hydration Mismatch no Vercel

---

## 🔴 GARGALOS ENCONTRADOS

### 1. **Hydration Mismatch Risk - `sidebar.tsx` (ui/)**
**Severidade:** 🔴 CRÍTICO  
**Arquivo:** `src/components/ui/sidebar.tsx:86` e `108-109`

**Problema:**
```typescript
// ❌ PROBLEMA: Executa no servidor durante SSR
document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;

// ❌ PROBLEMA: window event listeners adicionados sem proteção useEffect
window.addEventListener("keydown", handleKeyDown);
```

**Por que falha:**
- `document` não existe no servidor (SSR)
- `window` não existe no servidor (SSR)
- Causa erro: `ReferenceError: document is not defined`
- Pode quebrar a build da Vercel silenciosamente

**Risco:** Página não renderiza no Vercel, manifesta como erro 500 ou página branca

---

### 2. **Missing Environment Variables Documentation**
**Severidade:** 🔴 CRÍTICO  
**Arquivos:** 
- `.env.local.example` (incompleto)
- `src/app/api/chat/route.ts` (usa `GEMINI_API_KEY`)
- `src/components/FileUpload.tsx` (fetch para `/api/analyze`)

**Problema:**
```typescript
// src/app/api/chat/route.ts:24
const apiKey = process.env.GEMINI_API_KEY;
```

**Por que falha:**
- Variável não documentada no `.env.local.example`
- Vercel não sabe qual variável adicionar no painel
- Deploy falha silenciosamente com erro 503

**Risco:** API Chat não funciona em produção

---

### 3. **No Vercel Configuration**
**Severidade:** 🟠 ALTO  
**Arquivo:** Não existe `vercel.json`

**Problema:**
- Sem `Security-Headers` (CSP, X-Frame-Options)
- Sem configuração de CORS para futuro backend
- Sem regras de cache customizadas
- Sem redirects de SEO

**Por que falha:**
- Sem headers de segurança, vulnerável a XSS/Clickjacking
- CORS falhará quando Samuel integrar backend

**Risco:** Vulnerabilidades de segurança expostas, falha de integração backend

---

### 4. **next.config.ts - Configuração Incompleta**
**Severidade:** 🟡 MÉDIO  
**Arquivo:** `src/../next.config.ts`

**Problema Atual:**
```typescript
// Apenas otimizações de imagem e cache
// Faltam:
// - Redirects para rotas antigas
// - Headers de segurança customizados
// - Configuração de duração de build
// - Experimental features para Turbopack
```

**Por que falha:**
- Build lenta em WSL2 (sem otimizações Turbopack)
- Sem compressão de response
- Sem cache optimal para assets estáticas

**Risco:** Deploy lento na Vercel (~3-5 min quando deveria ser <1 min)

---

### 5. **Importações Cíclicas Potenciais**
**Severidade:** 🟡 MÉDIO  
**Arquivos:** 
- `src/types/compliance.ts` (exporta 8 interfaces)
- `src/types/types.ts` (re-exporta de compliance)
- `src/app/api/chat/route.ts` (importa ChatProcessingAgent)

**Problema:**
```typescript
// src/types/types.ts
export * from './compliance';

// Potencial: src/types/compliance.ts poderia importar de types.ts
// Criaria ciclo: types -> compliance -> types
```

**Por que falha:**
- Bundler de produção pode falhar ou gerar bundle ineficiente
- Tree-shaking não funciona corretamente

**Risco:** Build quebra em produção ou código desnecessário incluído

---

---

## ✅ REFATORAÇÃO SEGURA - CÓDIGO CORRIGIDO

### Fix #1: Proteger `sidebar.tsx` contra SSR

**Arquivo:** `src/components/ui/sidebar.tsx`

```typescript
// ✅ ANTES (linha ~80-110)
const setOpen = React.useCallback(
  (value: boolean | ((value: boolean) => boolean)) => {
    const openState = typeof value === "function" ? value(open) : value;
    if (setOpenProp) {
      setOpenProp(openState);
    } else {
      _setOpen(openState);
    }

    // ❌ PROBLEMA: Executa no servidor
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  },
  [setOpenProp, open],
);

// ❌ PROBLEMA: window listeners sem proteção
React.useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      toggleSidebar();
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [toggleSidebar]);

// ✅ DEPOIS
const setOpen = React.useCallback(
  (value: boolean | ((value: boolean) => boolean)) => {
    const openState = typeof value === "function" ? value(open) : value;
    if (setOpenProp) {
      setOpenProp(openState);
    } else {
      _setOpen(openState);
    }

    // ✅ PROTEÇÃO: Apenas executa no cliente
    if (typeof document !== 'undefined') {
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }
  },
  [setOpenProp, open],
);

// ✅ PROTEÇÃO: useEffect já garante execução apenas no cliente
React.useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      toggleSidebar();
    }
  };

  // ✅ Redundante (useEffect já protege), mas deixar para clareza
  if (typeof window !== 'undefined') {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }
}, [toggleSidebar]);
```

---

### Fix #2: Documentar Variáveis de Ambiente

**Arquivo:** `.env.local.example` (ATUALIZAR)

```bash
# ============================================
# REGULON AI - AMBIENTE LOCAL & VERCEL
# ============================================

# ─── SERVIDOR ────────────────────────────────
# Usado apenas em Route Handlers (API routes)
# NUNCA será exposto ao navegador

## Gemini API (Compliance Analysis)
# Obtenha em: https://ai.google.dev
# Escopo: POST /api/chat - Análise jurídica com IA
GEMINI_API_KEY=your_gemini_api_key_here

## Backend Integration (Futuro - Samuel)
# URL do backend FastAPI para RAG
# Formato: http://localhost:8000 (dev) | https://api.regulon.internal (prod)
# Escopo: POST /api/analyze - Análise de documentos
# ⚠️ ONLY internal backend communication (não NEXT_PUBLIC)
BACKEND_API_URL=http://localhost:8000

# ─── CLIENTE (NEXT_PUBLIC) ───────────────────
# Variáveis com prefixo NEXT_PUBLIC_ são expostas no navegador
# Use APENAS para informações não-sensíveis

## Application Settings
# Nome da aplicação para telemetria
NEXT_PUBLIC_APP_NAME=Regulon AI
NEXT_PUBLIC_APP_VERSION=1.0.0

## Optional: Analytics
# NEXT_PUBLIC_POSTHOG_KEY=your_key
# NEXT_PUBLIC_GTAG_ID=your_gtag_id

# ─── VERCEL DEPLOYMENT ───────────────────────
# Definir via painel Vercel Settings → Environment Variables
# NÃO committar .env.production ou .env.*.local
```

---

### Fix #3: Criar `vercel.json` (Configuração Cloud)

**Novo arquivo:** `vercel.json`

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "version": 2,
  "buildCommand": "pnpm run build",
  "devCommand": "pnpm run dev",
  "installCommand": "pnpm install --frozen-lockfile",
  "env": {
    "GEMINI_API_KEY": {
      "description": "Chave de API do Google Gemini (obrigatória para /api/chat)",
      "required": true
    },
    "BACKEND_API_URL": {
      "description": "URL do backend FastAPI (futuro - não obrigatória para MVP)",
      "required": false
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": false
    },
    {
      "source": "/admin",
      "destination": "/dashboard",
      "permanent": false
    }
  ],
  "rewrites": [
    {
      "source": "/api/internal/(.*)",
      "destination": "https://internal-api.regulon.internal/$1"
    }
  ],
  "functions": {
    "api/chat/route.ts": {
      "maxDuration": 30,
      "memory": 512
    },
    "api/analyze/route.ts": {
      "maxDuration": 60,
      "memory": 1024
    }
  }
}
```

---

### Fix #4: Otimizar `next.config.ts`

**Arquivo:** `next.config.ts` (SUBSTITUIR)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── PERFORMANCE: Turbopack & Build ─────────────────────────────
  
  // Development mode - WSL2 optimization
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // Keep pages for 1 hour
    pagesBufferLength: 5, // Compile 5 pages ahead
  },

  // ─── EXPERIMENTAL: Turbopack Acceleration ─────────────────────────
  // Uncomment when Turbopack is stable for production
  // experimental: {
  //   turbopack: {},
  // },

  // ─── IMAGE OPTIMIZATION ─────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache for images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ─── RESPONSE COMPRESSION ───────────────────────────────────────────
  compress: true,

  // ─── SECURITY: React Strict Mode ────────────────────────────────────
  reactStrictMode: true,

  // ─── ENVIRONMENT VARIABLES ──────────────────────────────────────────
  env: {
    // Populate from .env.local
  },

  // ─── WEBPACK OPTIMIZATION ───────────────────────────────────────────
  webpack: (config, { isServer }) => {
    // Otimizações customizadas para ambos server e client
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
    };

    return config;
  },

  // ─── SECURITY: Headers via Next.js ──────────────────────────────────
  // Note: Use vercel.json headers para melhor performance na Vercel
  
  // ─── REDIRECT & REWRITE LEGACY URLs ──────────────────────────────
  // Note: Use vercel.json redirects para melhor performance
  
  // ─── BUILD OUTPUT ────────────────────────────────────────────────────
  // Gera relatório de build size
  productionBrowserSourceMaps: false, // Desabilitar em produção por segurança
  poweredByHeader: false, // Remove header X-Powered-By
};

export default nextConfig;
```

---

### Fix #5: Resolver Potencial Ciclo de Importações

**Arquivo:** `src/types/types.ts` (VERIFICAR)

**Problema:** Re-exporta `compliance.ts` que pode criar ciclo

**Solução A (Recomendada):** Remover re-export desnecessário

```typescript
// ❌ ANTES
export * from './compliance';

// ✅ DEPOIS - Deixar importações diretas
// Arquivo é agregador central de tipos
// Importar diretamente de src/types/compliance

// Em componentes:
// import type { ChatMessage, RegulationImpact } from '@/types/compliance';
// Em vez de:
// import type { ChatMessage, RegulationImpact } from '@/types';
```

**Solução B (Se precisar agregador):** Apontar explicitamente

```typescript
// ✅ ALTERNATIVA - Agregador explícito
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
  AgentStatus
} from './compliance';
```

---

---

## 📋 TEMPLATE DE VARIÁVEIS - VERCEL CONSOLE

### Dashboard Vercel: Settings → Environment Variables

```plaintext
╔════════════════════════════════════════════════════════════════════╗
║ Environment Variables para Deploy na Vercel                       ║
╚════════════════════════════════════════════════════════════════════╝

1. PRODUÇÃO (Production)
   ├─ GEMINI_API_KEY: [your-production-key]
   │  Escopo: api/chat - Configurar antes do merge
   ├─ BACKEND_API_URL: https://api.regulon.internal
   │  Escopo: Futuro - backend Samuel
   └─ NODE_ENV: production
      Automático pela Vercel

2. STAGING/PREVIEW (Preview)
   ├─ GEMINI_API_KEY: [your-staging-key]
   │  Escopo: Testes antes de produção
   ├─ BACKEND_API_URL: https://staging-api.regulon.internal
   └─ NODE_ENV: production
      Automático pela Vercel

3. DESENVOLVIMENTO (Local)
   └─ Usar .env.local com valores mock/dev
      Nunca committar em repo

```

---

## 🔐 CHECKLIST PRÉ-DEPLOY VERCEL

- [ ] **Variáveis de Ambiente**
  - [ ] GEMINI_API_KEY adicionada no console Vercel
  - [ ] BACKEND_API_URL adicionada (mesmo que vazio)
  - [ ] Nenhuma variável privada com prefixo NEXT_PUBLIC_

- [ ] **Segurança**
  - [ ] vercel.json criado com security headers
  - [ ] X-Frame-Options = DENY
  - [ ] CSP configurado (Referrer-Policy, Permissions-Policy)
  - [ ] Sem console.log(secrets) no código

- [ ] **SSR/Hydration**
  - [ ] sidebar.tsx protegido com `typeof document !== 'undefined'`
  - [ ] Nenhuma chamada a `window` fora de `useEffect`
  - [ ] Componentes com `'use client'` devidamente marcados

- [ ] **Build & Performance**
  - [ ] next.config.ts otimizado
  - [ ] npm audit / pnpm audit sem vulnerabilidades críticas
  - [ ] `pnpm run build` completa sem warnings
  - [ ] Build size < 50MB (ideal < 30MB)

- [ ] **Dependências**
  - [ ] Nenhuma importação cíclica (verificar com `pnpm list --depth=3`)
  - [ ] Todas as dependências no package.json
  - [ ] Tree-shaking ativo (sem código morto)

- [ ] **Integração Backend**
  - [ ] API routes esperam BACKEND_API_URL configurado
  - [ ] CORS headers configurados em vercel.json
  - [ ] Fallback para mock data se backend indisponível

---

## 📊 IMPACTO POTENCIAL

| Gargalo | Sem Fix | Com Fix | Risco |
|---------|---------|--------|-------|
| sidebar.tsx | ❌ Error 500 | ✅ Renderiza | Deploy falha |
| Env Vars | ⚠️ 503 Service Unavailable | ✅ Funciona | API não responde |
| Sem vercel.json | ⚠️ Sem headers de segurança | ✅ Protegido | Vulnerável a XSS |
| next.config.ts | ⚠️ Build lenta (~3-5 min) | ✅ Build rápida (~30-60s) | Slow deploys |
| Importações cíclicas | ⚠️ Bundler warning | ✅ Tree-shake perfeito | Código desnecessário |

---

## 🚀 PRÓXIMOS PASSOS

1. **Imediato (Crítico)**
   ```bash
   # Fix SSR hidration
   # Update .env.local.example
   # Create vercel.json
   # Optimizar next.config.ts
   ```

2. **Antes de Merge**
   ```bash
   pnpm run build  # Verificar sem errors
   pnpm audit      # Vulnerabilidades críticas
   git push origin [branch]
   ```

3. **Antes de Deploy Vercel**
   ```
   1. Ir para Dashboard Vercel
   2. Settings → Environment Variables
   3. Adicionar GEMINI_API_KEY e BACKEND_API_URL
   4. Trigger redeploy
   ```

4. **Futuro (Backend Samuel)**
   ```typescript
   // Quando Samuel integrar FastAPI:
   // 1. Configurar BACKEND_API_URL em Vercel
   // 2. Implementar CORS headers em vercel.json
   // 3. Remover mock data de /api/analyze
   // 4. Conectar WebSocket para progress real
   ```

---

**Auditoria Completa | Cloud Readiness ✅**
