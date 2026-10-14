import test from "node:test";
import assert from "node:assert/strict";
import { BiographyCoordinator } from "../src/worker.js";

function makeCoordinator() {
  const limits = new Map(), claims = new Map();
  const sql = {
    exec(sql, ...args) {
      if (sql.startsWith("PRAGMA table_info")) return { toArray: () => [{ name: "reservation" }, { name: "commit_sha" }] };
      if (sql.startsWith("SELECT window_start, attempts FROM bio_limits")) return { toArray: () => limits.has(args[0]) ? [limits.get(args[0])] : [] };
      if (sql.startsWith("INSERT INTO bio_limits")) limits.set(args[0], { window_start: args[1], attempts: args[2] });
      if (sql.startsWith("SELECT status, reservation, updated_at, commit_sha FROM bio_claims")) return { toArray: () => claims.has(args[0]) ? [claims.get(args[0])] : [] };
      if (sql.startsWith("INSERT INTO bio_claims")) claims.set(args[0], { status: "reserved", reservation: args[3], updated_at: args[2], commit_sha: null });
      if (sql.startsWith("UPDATE bio_claims SET status = 'published'")) {
        const previous = claims.get(args[2]);
        claims.set(args[2], { ...previous, status: "published", commit_sha: args[0], updated_at: args[1] });
      }
      if (sql.startsWith("UPDATE bio_claims SET status = 'review'")) {
        const previous = claims.get(args[1]);
        claims.set(args[1], { ...previous, status: "review", updated_at: args[0] });
      }
      return { toArray: () => [] };
    }
  };
  return new BiographyCoordinator({ storage: { sql, transaction: async fn => fn() } },
    { BIO_EDIT_CODE_SECRET: "x".repeat(40) });
}
async function call(coordinator, action, opts = {}) {
  const input = {
    action, slug: "bio_test", identity: "a".repeat(64), reservation: "b".repeat(64), ...opts
  };
  const response = await coordinator.fetch(new Request("https://internal.invalid", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(input)
  }));
  return { code: response.status, ...await response.json() };
}
test("duplicate slug reservation cannot overwrite existing owner", async () => {
  const coordinator = makeCoordinator();
  assert.equal((await call(coordinator, "reserve")).status, "reserved");
  const duplicate = await call(coordinator, "reserve", { identity: "c".repeat(64), reservation: "d".repeat(64) });
  assert.equal(duplicate.status, "claimed");
  assert.equal(duplicate.code, 409);
});
test("wrong reservation cannot complete another player's biography", async () => {
  const coordinator = makeCoordinator();
  await call(coordinator, "reserve");
  assert.equal((await call(coordinator, "complete", {
    reservation: "d".repeat(64), commit: "f".repeat(40)
  })).status, "denied");
});
test("matching reservation completes once and remains idempotent", async () => {
  const coordinator = makeCoordinator();
  await call(coordinator, "reserve");
  const input = { commit: "f".repeat(40) };
  assert.equal((await call(coordinator, "complete", input)).status, "published");
  assert.equal((await call(coordinator, "complete", input)).status, "published");
});
test("ambiguous release preserves review claim against reassignment", async () => {
  const coordinator = makeCoordinator();
  await call(coordinator, "reserve");
  assert.equal((await call(coordinator, "release")).status, "review");
  assert.equal((await call(coordinator, "reserve", { identity: "c".repeat(64) })).status, "claimed");
});
test("submission rate limiting blocks sixth reservation per identity", async () => {
  const coordinator = makeCoordinator();
  for (let n = 0; n < 5; n++) {
    await call(coordinator, "reserve", { slug: "bio_test_" + n, reservation: String(n).repeat(64) });
  }
  const result = await call(coordinator, "reserve", { slug: "bio_test_6" });
  assert.equal(result.status, "limited");
  assert.equal(result.code, 429);
});
