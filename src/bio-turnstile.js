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
    return result.success === true && result.hostname === "tec-wiki.com";
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

export async function hashBiographyEditCode(code, secret) {
  if (typeof code !== "string" || !/^[0-9a-f]{64}$/.test(code) || typeof secret !== "string" || secret.length < 32) {
    throw new Error("Invalid editing code or server configuration");
  }
  const bytes = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", bytes.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, bytes.encode(code));
  return Array.from(new Uint8Array(signature), b => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyBiographyEditCode(code, expectedHash, secret) {
  if (typeof expectedHash !== "string" || !/^[0-9a-f]{64}$/.test(expectedHash)) return false;
  let actual;
  try { actual = await hashBiographyEditCode(code, secret); } catch { return false; }
  let diff = 0;
  for (let i = 0; i < 64; i++) diff |= actual.charCodeAt(i) ^ expectedHash.charCodeAt(i);
  return diff === 0;
}

export async function storePendingBiographyCode(kv, slug, code, secret) {
  if (!kv || !/^bio_[a-z0-9]+(?:_[a-z0-9]+)*$/.test(slug)) throw new Error("Editing-code storage unavailable");
  const key = "bio-edit:" + slug;
  if (await kv.get(key)) throw new Error("Biography editing record already exists");
  const hash = await hashBiographyEditCode(code, secret);
  await kv.put(key, JSON.stringify({ version: 1, status: "pending", hash, created: new Date().toISOString() }));
  return key;
}
export async function activateBiographyCode(kv, slug, commit, code, secret) {
  if (!kv || !/^bio_[a-z0-9]+(?:_[a-z0-9]+)*$/.test(slug) ||
      !/^[a-f0-9]{40}$/.test(commit || "")) throw new Error("Cannot activate editing record");
  const hash = await hashBiographyEditCode(code, secret);
  await kv.put("bio-edit:" + slug, JSON.stringify({
    version: 1, status: "active", hash,
    published_commit: commit, activated: new Date().toISOString()
  }));
}
