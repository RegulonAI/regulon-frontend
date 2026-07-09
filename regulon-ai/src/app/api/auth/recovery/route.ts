import { NextResponse, NextRequest } from "next/server";
import { generateSecureToken, sendRecoveryEmail } from "@/lib/MockEmailService";

/**
 * Padrão OWASP & Segurança de APIs:
 * 1. Prevenção de User Enumeration: Sempre retorna 200 OK com mensagem genérica se o e-mail for sintaticamente válido.
 * 2. Timing Attack Mitigation: Alinha o tempo de resposta (latência artificial com ruído/jitter) em todos os fluxos.
 * 3. Honeypot Anti-Bot: Rejeita requisições silenciosamente se o campo oculto estiver preenchido.
 * 4. Rate Limiting por IP e por E-mail: Limita a 3 tentativas a cada 15 minutos.
 */

// Armazenamento em memória para Rate Limiting (Substituir por Redis/Vercel KV em Produção)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const LIMIT_ATTEMPTS = 3;
const LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutos

function isRateLimited(key: string): { limited: boolean; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record) {
    rateLimitStore.set(key, { count: 1, resetTime: now + LIMIT_WINDOW_MS });
    return { limited: false, resetTime: now + LIMIT_WINDOW_MS };
  }

  if (now > record.resetTime) {
    // Reset da janela de tempo
    rateLimitStore.set(key, { count: 1, resetTime: now + LIMIT_WINDOW_MS });
    return { limited: false, resetTime: now + LIMIT_WINDOW_MS };
  }

  if (record.count >= LIMIT_ATTEMPTS) {
    return { limited: true, resetTime: record.resetTime };
  }

  record.count += 1;
  return { limited: false, resetTime: record.resetTime };
}

function getClientIp(req: NextRequest): string {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp.trim();
  }
  return "127.0.0.1";
}

async function alignLatency(startTime: number) {
  const elapsed = Date.now() - startTime;
  const minLatency = 500; // 500ms base
  const randomJitter = Math.floor(Math.random() * 150); // Jitter de 0 a 150ms para evitar assinaturas de latência fixa
  const targetLatency = minLatency + randomJitter;

  if (elapsed < targetLatency) {
    await new Promise((resolve) => setTimeout(resolve, targetLatency - elapsed));
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  const ip = getClientIp(req);

  try {
    const body = await req.json().catch(() => ({}));
    const { email, website, turnstileToken } = body;

    // 1. Validação do Honeypot (Campo de Anti-Bot oculto preenchido pelo bot)
    if (website && website.trim() !== "") {
      console.warn(`\x1b[33m[SECURITY ALERT] Honeypot ativado para o IP: ${ip}. Rejeitando silenciosamente.\x1b[0m`);
      
      // Timing alignment para simular resposta legítima
      await alignLatency(startTime);
      
      return NextResponse.json(
        { message: "Se o e-mail existir em nossa base, você receberá um link de recuperação em breve." },
        { status: 200 }
      );
    }

    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    // 2. Validação sintática do e-mail (Sem revelar existência)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!normalizedEmail || !emailRegex.test(normalizedEmail)) {
      await alignLatency(startTime);
      return NextResponse.json(
        { error: "Por favor, forneça um endereço de e-mail válido." },
        { status: 400 }
      );
    }

    // 3. Validação do Rate Limiting (por IP e por E-mail)
    const ipLimit = isRateLimited(`ip:${ip}`);
    const emailLimit = isRateLimited(`email:${normalizedEmail}`);

    if (ipLimit.limited || emailLimit.limited) {
      const resetTime = Math.max(ipLimit.resetTime, emailLimit.resetTime);
      const retryAfterSeconds = Math.ceil((resetTime - Date.now()) / 1000);

      await alignLatency(startTime);

      return NextResponse.json(
        { error: "Muitas tentativas. Por favor, aguarde antes de solicitar novamente." },
        { 
          status: 429,
          headers: {
            "Retry-After": String(retryAfterSeconds)
          }
        }
      );
    }

    // 4. TODO: Placeholder do Cloudflare Turnstile
    // Quando as credenciais de produção do Turnstile forem configuradas:
    /*
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        await alignLatency(startTime);
        return NextResponse.json({ error: "Captcha obrigatório não fornecido." }, { status: 400 });
      }

      const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}&remoteip=${ip}`,
      });

      const turnstileData = await turnstileResponse.json();
      if (!turnstileData.success) {
        await alignLatency(startTime);
        return NextResponse.json({ error: "Falha na validação do Captcha." }, { status: 400 });
      }
    }
    */

    // 5. Simular busca na base de dados
    // Na fase atual de MVP, assumimos que e-mails que terminam com o domínio da empresa ou mock são válidos,
    // mas geramos logs do Mock para todos os e-mails válidos facilitando os testes de William.
    const secureToken = generateSecureToken();
    
    // Simula o disparo de email via Mock
    await sendRecoveryEmail(normalizedEmail, secureToken);

    // 6. Timing Attack Mitigation
    await alignLatency(startTime);

    return NextResponse.json(
      { message: "Se o e-mail existir em nossa base, você receberá um link de recuperação em breve." },
      { status: 200 }
    );

  } catch (error) {
    console.error("[RECOVERY_API] Error during recovery process:", error);
    await alignLatency(startTime);
    return NextResponse.json(
      { error: "Erro interno no servidor. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
