// Reusable private-code ownership verification for player-managed biographies.
// Legacy pages without active ownership records are not editable by players.
import { verifyBiographyEditCode } from "./bio-turnstile.js";

export async function authorizeBiographyOwner(kv, slug, code, secret) {
  if (!kv || typeof slug !== "string" ||
      !/^bio_[a-z0-9]+(?:_[a-z0-9]+)*$/.test(slug) || slug.length > 74)
    return false;
  if (typeof code !== "string" || !/^[a-f0-9]{64}$/.test(code)) return false;
  if (typeof secret !== "string" || secret.length < 32) return false;
  const record = await kv.get("bio-edit:" + slug, "json");
  if (!record || record.version !== 1 || record.status !== "active") return false;
  return verifyBiographyEditCode(code, record.hash, secret);
}
