import { randomBytes } from "crypto";

/**
 * Interface representing the structure of a recovery email log.
 */
export interface EmailLog {
  email: string;
  token: string;
  expiresAt: Date;
  sentAt: Date;
}

// Armazenamento em memória dos tokens ativos (Simula a tabela de tokens no banco de dados)
export const activeTokensStore = new Map<string, { email: string; expiresAt: Date }>();

/**
 * Generates a cryptographically secure token.
 * Uses Node's standard crypto.randomBytes to ensure high entropy.
 * 
 * @returns {string} A 64-character hexadecimal string representing the secure token.
 */
export function generateSecureToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Simulates sending a password recovery email via Resend by logging
 * the details elegantly in the server console and saving the token in memory.
 * 
 * @param {string} email - The destination email address.
 * @param {string} token - The recovery token generated for the user.
 * @returns {Promise<boolean>} Resolves to true when the simulated email is logged.
 */
export async function sendRecoveryEmail(email: string, token: string): Promise<boolean> {
  const expiresMinutes = 15;
  const sentAt = new Date();
  const expiresAt = new Date(sentAt.getTime() + expiresMinutes * 60 * 1000);

  // Armazena o token para validação no fluxo de redefinição
  activeTokensStore.set(token, { email, expiresAt });

  // Format an eye-catching security console log for the developer (William)
  console.log("\n" + "=".repeat(80));
  console.log(`\x1b[45m\x1b[37m[RESEND MOCK] EMAIL SERVICE ACTIVE\x1b[0m`);
  console.log(`\x1b[36mDestinatário:\x1b[0m      ${email}`);
  console.log(`\x1b[36mToken de Acesso:\x1b[0m   ${token}`);
  console.log(`\x1b[36mLink de Reset:\x1b[0m     http://localhost:3000/reset-password?token=${token}`);
  console.log(`\x1b[36mEnviado em:\x1b[0m        ${sentAt.toISOString()}`);
  console.log(`\x1b[31mExpira em:\x1b[0m         ${expiresMinutes}m (Válido até: ${expiresAt.toLocaleTimeString()})`);
  console.log(`\x1b[33mNota para Testes:\x1b[0m  Clique no link acima para validar a próxima etapa do fluxo de redefinição de senha.`);
  console.log("=".repeat(80) + "\n");

  return true;
}

/**
 * Validates a recovery token and consumes it (ensuring single-use).
 * 
 * @param {string} token - The recovery token.
 * @returns {Object} Object indicating success or error, along with the associated email.
 */
export function validateAndConsumeToken(token: string): { success: boolean; email?: string; error?: string } {
  const tokenData = activeTokensStore.get(token);
  
  if (!tokenData) {
    return { success: false, error: "Token inválido, inexistente ou já utilizado." };
  }

  if (Date.now() > tokenData.expiresAt.getTime()) {
    activeTokensStore.delete(token); // Cleanup expired token
    return { success: false, error: "O link de recuperação expirou (limite de 15 minutos)." };
  }

  // Deleta o token garantindo o princípio de uso único (OWASP password reset guidelines)
  activeTokensStore.delete(token);
  
  return { success: true, email: tokenData.email };
}
