import { NextResponse, NextRequest } from "next/server";
import { validateAndConsumeToken } from "@/lib/MockEmailService";

/**
 * Padrão OWASP & Segurança de APIs - Redefinição de Senha:
 * 1. Validação de Complexidade de Senha no Backend.
 * 2. Token de Uso Único (Consumido imediatamente na validação).
 * 3. Timing Attack Mitigation: Alinha o tempo de resposta em todos os fluxos.
 * 4. Honeypot Anti-Bot no formulário de reset.
 * 5. Rate Limiting por IP: Limita a 3 tentativas a cada 15 minutos.
 */

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const LIMIT_ATTEMPTS = 3;
const LIMIT_WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(key: string): { limited: boolean; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record) {
    rateLimitStore.set(key, { count: 1, resetTime: now + LIMIT_WINDOW_MS });
    return { limited: false, resetTime: now + LIMIT_WINDOW_MS };
  }

  if (now > record.resetTime) {
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
  const minLatency = 500;
  const randomJitter = Math.floor(Math.random() * 150);
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
    const { token, password, confirmPassword, website } = body;

    // 1. Validação do Honeypot
    if (website && website.trim() !== "") {
      console.warn(`\x1b[33m[SECURITY ALERT] Honeypot de Reset de Senha ativado para o IP: ${ip}. Rejeitando silenciosamente.\x1b[0m`);
      await alignLatency(startTime);
      return NextResponse.json(
        { message: "Sua senha foi redefinida com sucesso." },
        { status: 200 }
      );
    }

    // 2. Validação do Rate Limiting
    const ipLimit = isRateLimited(`ip:${ip}`);
    if (ipLimit.limited) {
      const resetTime = ipLimit.resetTime;
      const retryAfterSeconds = Math.ceil((resetTime - Date.now()) / 1000);
      await alignLatency(startTime);
      return NextResponse.json(
        { error: "Muitas tentativas de redefinição de senha. Por favor, aguarde antes de tentar novamente." },
        { 
          status: 429,
          headers: { "Retry-After": String(retryAfterSeconds) }
        }
      );
    }

    // 3. Validação dos campos obrigatórios
    if (!token) {
      await alignLatency(startTime);
      return NextResponse.json(
        { error: "Token de recuperação inválido ou ausente." },
        { status: 400 }
      );
    }

    if (!password || !confirmPassword) {
      await alignLatency(startTime);
      return NextResponse.json(
        { error: "A senha e a confirmação de senha são obrigatórias." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      await alignLatency(startTime);
      return NextResponse.json(
        { error: "As senhas inseridas não coincidem." },
        { status: 400 }
      );
    }

    // 4. Validação de Complexidade da Senha (OWASP)
    // Mínimo de 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 caractere especial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      await alignLatency(startTime);
      return NextResponse.json(
        { 
          error: "A senha não atende aos requisitos de complexidade: mínimo de 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@$!%*?&)." 
        },
        { status: 400 }
      );
    }

    // 5. Validação e Consumo do Token (Uso Único)
    const tokenValidation = validateAndConsumeToken(token);
    if (!tokenValidation.success) {
      await alignLatency(startTime);
      return NextResponse.json(
        { error: tokenValidation.error || "O token de recuperação é inválido ou já foi utilizado." },
        { status: 400 }
      );
    }

    // 6. Log do Sucesso no Servidor (Simulando persistência no banco de dados)
    console.log("\n" + "=".repeat(80));
    console.log(`\x1b[42m\x1b[30m[SUCCESS] PASSWORD REDEFINED\x1b[0m`);
    console.log(`\x1b[36mUsuário:\x1b[0m       ${tokenValidation.email}`);
    console.log(`\x1b[36mStatus:\x1b[0m        Senha alterada com sucesso!`);
    console.log(`\x1b[36mLog do Sistema:\x1b[0m Token consumido e inutilizado.`);
    console.log("=".repeat(80) + "\n");

    // 7. Retorno com Latência Alinhada
    await alignLatency(startTime);
    return NextResponse.json(
      { message: "Sua senha foi alterada com sucesso." },
      { status: 200 }
    );

  } catch (error) {
    console.error("[RESET_API] Error during password reset process:", error);
    await alignLatency(startTime);
    return NextResponse.json(
      { error: "Erro interno no servidor. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
