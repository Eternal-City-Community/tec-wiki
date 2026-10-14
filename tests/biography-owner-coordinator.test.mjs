import test from "node:test";
import assert from "node:assert/strict";
import { BiographyCoordinator } from "../src/worker.js";

function fixture(status = "published", ageMs = 3600000) {
  const now = Date.now();
  const claim = { status, reservation: "b".repeat(64), updated_at: now - ageMs };
  let owner = null;
  const sql = { exec(query, ...args) {
    if (query.startsWith("PRAGMA table_info")) return { toArray: () => [{ name: "reservation" }, { name: "commit_sha" }] };
    if (query.startsWith("SELECT status, hash FROM bio_owner_state")) return { toArray: () => owner ? [owner] : [] };
    if (query.startsWith("SELECT status, reservation FROM bio_claims") ||
        query.startsWith("SELECT status, updated_at FROM bio_claims") ||
        query.startsWith("SELECT status FROM bio_claims")) return { toArray: () => [claim] };
    if (query.startsWith("INSERT INTO bio_owner_state")) owner = { status: "active", hash: args[1] };
    if (query.startsWith("UPDATE bio_owner_state SET status = 'active'")) owner = { status: "active", hash: args[0] };
    if (query.startsWith("UPDATE bio_owner_state SET status = 'revoked'")) owner.status = "revoked";
    if (query.startsWith("UPDATE bio_claims SET status = 'published'")) claim.status = "published";
    return { toArray: () => [] };
  }};
  const coordinator = new BiographyCoordinator({
    storage: { sql, transaction: async fn => fn() }
  }, { BIO_EDIT_CODE_SECRET: "x".repeat(40) });
  async function call(action, hash = "a".repeat(64)) {
    const response = await coordinator.fetch(new Request("https://internal.invalid", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ action, slug: "bio_test", identity: "c".repeat(64),
        reservation: "b".repeat(64), hash })
    }));
    return (await response.json()).status;
  }
  return { call };
}

test("newly activated owner code is verified by coordinator", async () => {
  const { call } = fixture();
  assert.equal(await call("owner_activate"), "active");
  assert.equal(await call("owner_check"), "allowed");
  assert.equal(await call("owner_check", "d".repeat(64)), "denied");
});

test("revocation invalidates previously valid code immediately", async () => {
  const { call } = fixture();
  await call("owner_activate");
  assert.equal(await call("owner_revoke"), "revoked");
  assert.equal(await call("owner_check"), "denied");
});

test("reset replaces the active owner code", async () => {
  const { call } = fixture();
  await call("owner_activate");
  assert.equal(await call("owner_reset", "d".repeat(64)), "active");
  assert.equal(await call("owner_check"), "denied");
  assert.equal(await call("owner_check", "d".repeat(64)), "allowed");
});

test("interrupted publication cannot be reconciled while still in flight", async () => {
  const { call } = fixture("reserved", 1000);
  assert.equal(await call("owner_reconcile"), "denied");
});

test("aged interrupted publication can be reconciled by authenticated admin route", async () => {
  const { call } = fixture("reserved", 3600000);
  assert.equal(await call("owner_reconcile"), "active");
  assert.equal(await call("owner_check"), "allowed");
});
