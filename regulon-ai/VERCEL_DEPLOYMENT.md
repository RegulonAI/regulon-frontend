# Deployment na Vercel - Guia Completo

## Status Atual

✅ **Projeto pronto para deploy na Vercel**
- Build compila em 11.8s sem erros
- TypeScript strict mode: OK
- SSR safety guards: OK
- Mock data fallback: OK

---

## Pré-requisitos

1. Conta Vercel ativa ([vercel.com](https://vercel.com))
2. Git repository linkado à Vercel
3. Esta branch commitada e pushed

---

## Passos de Deployment

### 1️⃣ **Conectar Repository à Vercel (Se ainda não fez)**

```bash
# Login
vercel login

# Deployar
vercel --prod
```

Ou via console Vercel:
- [Novo Projeto](https://vercel.com/new)
- Selecionar repo RegulonAI/regulon-frontend
- Detectará Next.js automaticamente
- Clickar Deploy

---

### 2️⃣ **Configurar Variáveis de Ambiente (Essencial!)**

Na Vercel Console:
1. Ir para: **Settings → Environment Variables**
2. **Adicionar** as seguintes variáveis:

#### **MVP (Mínimo para Demo)**
```
GEMINI_API_KEY = [deixar em branco ou não configurar]
```
- Resultado: API usa mock data
- Status: ✅ Funciona 100%
- Comportamento: Chat, análise e checklist funcionam com dados simulados

#### **Produção (Com IA Real)**
```
GEMINI_API_KEY = [sua-chave-aqui]
BACKEND_API_URL = https://api.regulon.internal  (opcional, futuro)
```
- Resultado: API integra com Gemini + Backend Real
- Status: 🔄 Pronto quando backend implementado
- Comportamento: Chat com IA real, análise semântica real

---

### 3️⃣ **Fazer Deploy**

#### Opção A: Auto-deploy (Recomendado)
```bash
git push origin deploy-preparation
# Vercel detecta push e faz deploy automático
```

#### Opção B: Redeploy via Console
Na Vercel Console → Projeto → **Deployments**
- Clique em último build
- Clique em **Redeploy**

---

## Estrutura do vercel.json

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install --frozen-lockfile",
  
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ],
  
  "redirects": [
    { "source": "/docs", "destination": "/", "permanent": false }
  ]
}
```

**Nota importante:** Variáveis de ambiente NÃO são mais definidas em `vercel.json`. Use o **Vercel Console** para configurar.

---

## Comportamento por Ambiente

### 🟢 MVP Mode (GEMINI_API_KEY ausente)

**Quando:** Você ainda não configurou a chave
**Comportamento:**
- ✅ Chat endpoint funciona com mock data
- ✅ Análise endpoint funciona com mock data
- ✅ Dashboard carrega corretamente
- ✅ Checklist funciona com dados estáticos
- ✅ Nenhum erro 5xx

**Log Console:**
```
[CHAT_API] GEMINI_API_KEY não configurada - usando mock data (MVP)
```

---

### 🔵 Integração Real (GEMINI_API_KEY presente)

**Quando:** Você configurou a chave no Vercel Console
**Comportamento:**
- 🔄 Chat integra com Gemini API real
- 🔄 Análise integra com FastAPI do Samuel
- 🔄 Embeddings do Vector DB são usados
- 🔄 Confidence scores baseados em IA real

**Log Console:**
```
[CHAT_API] GEMINI_API_KEY configurada - modo integração real (futuro)
```

---

## Checklist de Deployment

- [ ] Branch `deploy-preparation` está commitada
- [ ] `npm run build` executa sem erros localmente
- [ ] Vercel project está criado
- [ ] GEMINI_API_KEY está (ou não) configurada em Environment Variables
- [ ] Outras env vars configuradas (se necessário)
- [ ] Auto-deploy está habilitado (Settings → Git)
- [ ] Domínio customizado configurado (opcional)

---

## Troubleshooting

### ❌ "Invalid request: env.GEMINI_API_KEY should be string"

**Solução:** Este erro foi corrigido nesta versão. Se receber:
1. Verificar que `vercel.json` NÃO tem objeto `env` complexo
2. Usar a versão atual deste repositório
3. Fazer redeploy

---

### ❌ "Build failed: GEMINI_API_KEY undefined"

**Solução:** Isso não acontecerá com a versão atual porque:
- ✅ GEMINI_API_KEY é verificada **dentro da função POST** (lazy)
- ✅ Nenhuma inicialização no escopo global
- ✅ Mock data é padrão se chave ausente

---

### ❌ "Chat retorna erro 503"

**Solução:** Verificar logs na Vercel:
1. Console Vercel → Deployments → Selecionar build → Logs
2. Procurar por `[CHAT_API] error`
3. Se vir `API key não configurada`, configure em Environment Variables

---

## URLs Importantes

| Recurso | URL |
|---------|-----|
| Vercel Console | https://vercel.com/dashboard |
| Seu Projeto | https://vercel.com/projects/[project-name] |
| Environment Variables | [project-name]/settings/environment-variables |
| Domínio Live | https://[seu-dominio].vercel.app |

---

## Próximas Implementações

### Fase 2: Backend Real
```
Quando: Samuel integrar FastAPI
Ação: Configurar BACKEND_API_URL na Vercel
Resultado: Análise semântica real com RAG
```

### Fase 3: Vector DB
```
Quando: Embeddings conectados
Ação: Adicionar VECTOR_DB_URL
Resultado: Pesquisa semântica por similitude
```

### Fase 4: Monitoring
```
Quando: Pronto para produção
Ação: Integrar Sentry/DataDog
Resultado: Error tracking em tempo real
```

---

## Suporte

**Para problemas:**
1. Checar logs: `vercel logs [project-name]`
2. Executar localmente: `npm run dev`
3. Comparar behavior: Mock vs. Real
4. Verificar build: `npm run build`

---

**Última atualização:** 2024
**Build Status:** ✅ Ready for Vercel
