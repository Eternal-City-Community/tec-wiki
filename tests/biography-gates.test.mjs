import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/worker.js";

for (const endpoint of ["/api/bio/publish", "/api/bio/edit", "/api/bio/load", "/api/bio/admin", "/api/bio/portrait"]) {
  test("launch gate protects " + endpoint, async () => {
    const request = new Request("https://tec-wiki.com" + endpoint, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ character_name: "Test", edit_code: "a".repeat(64) })
    });
    const response = await worker.fetch(request, {});
    assert.equal(response.status, 503);
    assert.match((await response.json()).error, /not enabled yet/i);
  });
}

test("configuration reports disabled publishing, editing, portrait and recovery", async () => {
  const request = new Request("https://tec-wiki.com/api/bio/configuration");
  const response = await worker.fetch(request, {
    BIO_EDIT_CODES: {}, BIO_COORDINATOR: {}, BIO_EDIT_CODE_SECRET: "a".repeat(40),
    BIO_GITHUB_TOKEN: "test", BIO_TURNSTILE_SECRET: "test"
  });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.ready, true);
  assert.equal(result.checks.coordinator_binding, true);
  assert.equal(result.publication_enabled, false);
  assert.equal(result.editing_enabled, false);
  assert.equal(result.portrait_enabled, false);
  assert.equal(result.admin_recovery_enabled, false);
});

test("configuration is not ready without Durable Object coordinator", async () => {
  const response = await worker.fetch(new Request("https://tec-wiki.com/api/bio/configuration"), {
    BIO_EDIT_CODES: {}, BIO_EDIT_CODE_SECRET: "a".repeat(40),
    BIO_GITHUB_TOKEN: "test", BIO_TURNSTILE_SECRET: "test"
  });
  assert.equal(response.status, 503);
  const result = await response.json();
  assert.equal(result.ready, false);
  assert.equal(result.checks.coordinator_binding, false);
});

test("coordinator integration probe is disabled without its separate secret", async () => {
  const response = await worker.fetch(new Request("https://tec-wiki.com/api/bio/integration-probe", {
    method: "POST", headers: { authorization: "Bearer " + "a".repeat(64) }
  }), { BIO_COORDINATOR: {}, BIO_EDIT_CODE_SECRET: "test" });
  assert.equal(response.status, 503);
});

test("coordinator integration probe denies requests without matching secret", async () => {
  const response = await worker.fetch(new Request("https://tec-wiki.com/api/bio/integration-probe", {
    method: "POST", headers: { authorization: "Bearer " + "b".repeat(64) }
  }), { BIO_INTEGRATION_TEST_SECRET: "a".repeat(64), BIO_COORDINATOR: {}, BIO_EDIT_CODE_SECRET: "test" });
  assert.equal(response.status, 401);
});

test("coordinator integration probe rejects GET requests", async () => {
  const response = await worker.fetch(new Request("https://tec-wiki.com/api/bio/integration-probe"), {
    BIO_INTEGRATION_TEST_SECRET: "a".repeat(64), BIO_COORDINATOR: {}, BIO_EDIT_CODE_SECRET: "test"
  });
  assert.equal(response.status, 405);
});

test("storage integration probe is disabled without temporary secret", async () => {
  const response = await worker.fetch(new Request("https://tec-wiki.com/api/bio/storage-probe", {
    method: "POST", headers: { authorization: "Bearer " + "a".repeat(64) }
  }), { BIO_EDIT_CODES: {}, BIO_GITHUB_TOKEN: "test" });
  assert.equal(response.status, 503);
});

test("storage integration probe denies incorrect bearer secret", async () => {
  const response = await worker.fetch(new Request("https://tec-wiki.com/api/bio/storage-probe", {
    method: "POST", headers: { authorization: "Bearer " + "b".repeat(64) }
  }), { BIO_INTEGRATION_TEST_SECRET: "a".repeat(64), BIO_EDIT_CODES: {}, BIO_GITHUB_TOKEN: "test" });
  assert.equal(response.status, 401);
});

test("storage integration probe rejects GET", async () => {
  const response = await worker.fetch(new Request("https://tec-wiki.com/api/bio/storage-probe"), {
    BIO_INTEGRATION_TEST_SECRET: "a".repeat(64)
  });
  assert.equal(response.status, 405);
});

test("GitHub write probe is disabled without separate secret", async () => {
  const response = await worker.fetch(new Request("https://tec-wiki.com/api/bio/github-write-probe", {
    method: "POST", headers: { authorization: "Bearer " + "a".repeat(64) }
  }), { BIO_GITHUB_TOKEN: "test" });
  assert.equal(response.status, 503);
});

test("GitHub write probe rejects invalid bearer secret", async () => {
  const response = await worker.fetch(new Request("https://tec-wiki.com/api/bio/github-write-probe", {
    method: "POST", headers: { authorization: "Bearer " + "b".repeat(64) }
  }), { BIO_INTEGRATION_TEST_SECRET: "a".repeat(64), BIO_GITHUB_TOKEN: "test" });
  assert.equal(response.status, 401);
});

test("GitHub write probe rejects GET", async () => {
  const response = await worker.fetch(new Request("https://tec-wiki.com/api/bio/github-write-probe"), {
    BIO_INTEGRATION_TEST_SECRET: "a".repeat(64), BIO_GITHUB_TOKEN: "test"
  });
  assert.equal(response.status, 405);
});
