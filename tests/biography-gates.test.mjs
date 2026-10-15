import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/worker.js";

const configured = {
  BIO_EDIT_CODES: {}, BIO_COORDINATOR: {}, BIO_EDIT_CODE_SECRET: "a".repeat(40),
  BIO_GITHUB_TOKEN: "test", BIO_TURNSTILE_SECRET: "test"
};

test("configuration advertises enabled biography features when bindings exist", async () => {
  const response = await worker.fetch(new Request("https://tec-wiki.com/api/bio/configuration"), configured);
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.ready, true);
  assert.equal(result.checks.coordinator_binding, true);
  for (const feature of ["publication_enabled", "editing_enabled", "portrait_enabled", "admin_recovery_enabled"])
    assert.equal(result[feature], true, feature);
});

test("configuration fails closed without Durable Object coordinator", async () => {
  const { BIO_COORDINATOR, ...missing } = configured;
  const response = await worker.fetch(new Request("https://tec-wiki.com/api/bio/configuration"), missing);
  assert.equal(response.status, 503);
  const result = await response.json();
  assert.equal(result.ready, false);
  assert.equal(result.checks.coordinator_binding, false);
});

for (const endpoint of ["/api/bio/publish", "/api/bio/edit", "/api/bio/load", "/api/bio/admin", "/api/bio/portrait"]) {
  test("live biography endpoint rejects GET: " + endpoint, async () => {
    const response = await worker.fetch(new Request("https://tec-wiki.com" + endpoint), {});
    assert.equal(response.status, 405);
  });
}

for (const endpoint of ["/api/bio/integration-probe", "/api/bio/storage-probe",
  "/api/bio/github-write-probe", "/api/bio/publish-test"]) {
  test("retired diagnostic endpoint does not execute a privileged operation: " + endpoint, async () => {
    let called = false;
    const env = { ASSETS: { fetch: async () => {
      called = true;
      return new Response("Not found", { status: 404 });
    } } };
    const response = await worker.fetch(new Request("https://tec-wiki.com" + endpoint, {
      method: "POST", headers: { authorization: "Bearer " + "a".repeat(64) }
    }), env);
    assert.equal(response.status, 404);
    assert.equal(called, true);
  });
}
