// Turnstile verification helper; fail closed if configuration or verification is missing.
export async function verifyBiographyTurnstile(token, ip, secret) {
  if (!secret || typeof token !== "string" || token.length < 10 || token.length > 2048) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(7000)
    });
    if (!response.ok) return false;
    const result = await response.json();
    return result.success === true && (!result.hostname || result.hostname === "tec-wiki.com");
  } catch {
    return false;
  }
}

// Editing-code material is handled only on the server.
export function generateBiographyEditCode() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
}
