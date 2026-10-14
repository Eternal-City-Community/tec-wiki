// Read-only production smoke check. Never sends real credentials or creates content.
import assert from "node:assert/strict";

const origin = process.env.BIO_SMOKE_ORIGIN || "https://tec-wiki.com";
const endpoint = new URL("/api/bio/configuration", origin);
async function request(path, method = "GET") {
  const response = await fetch(new URL(path, origin), {
    method,
    headers: method === "POST" ? { "content-type": "application/json" } : {},
    body: method === "POST" ? "{}" : undefined,
    signal: AbortSignal.timeout(12000),
    redirect: "manual"
  });
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error(path + ": expected JSON, got HTTP " + response.status); }
  return { status: response.status, data };
}
const config = await request(endpoint.pathname);
assert.ok([200, 503].includes(config.status), "Configuration route must return 200 or 503");
assert.equal(typeof config.data.ready, "boolean", "Configuration must report readiness");
for (const key of ["kv_binding", "editing_code_secret", "github_publisher_secret", "turnstile_secret"])
  assert.equal(typeof config.data.checks?.[key], "boolean", "Missing binding check: " + key);
for (const key of ["publication_enabled", "editing_enabled", "portrait_enabled", "admin_recovery_enabled"])
  assert.equal(config.data[key], false, "Launch gate unexpectedly enabled: " + key);
console.log("Configuration reachable; readiness:", config.data.ready);
for (const path of ["/api/bio/publish", "/api/bio/load", "/api/bio/edit", "/api/bio/portrait", "/api/bio/admin"]) {
  const result = await request(path, "POST");
  assert.equal(result.status, 503, path + " must be gated (got HTTP " + result.status + ")");
  console.log(path + ": safely gated (503)");
}
console.log("PASS: production read-only biography smoke check. No content written.");
