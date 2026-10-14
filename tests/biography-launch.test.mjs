import test from "node:test";
import assert from "node:assert/strict";
import { BiographyCoordinator } from "../src/worker.js";
import { validatePortrait } from "../src/bio-portrait.js";
import { isBiographyAdministrator } from "../src/bio-admin.js";

function coordinator() {
  const limits = new Map();
  const sql = {
    exec(query, ...args) {
      if (query.startsWith("PRAGMA table_info")) return { toArray: () => [{ name: "reservation" }, { name: "commit_sha" }] };
      if (query.startsWith("SELECT window_start, attempts FROM bio_edit_limits")) {
        const item = limits.get(args.join(":"));
        return { toArray: () => item ? [item] : [] };
      }
      if (query.startsWith("INSERT INTO bio_edit_limits")) {
        limits.set(args[0] + ":" + args[1], { window_start: args[2], attempts: args[3] });
      }
      return { toArray: () => [] };
    }
  };
  const state = { storage: { sql, transaction: async callback => callback() } };
  return new BiographyCoordinator(state, { BIO_EDIT_CODE_SECRET: "a".repeat(40) });
}
function request(identity = "a".repeat(64), slug = "bio_example") {
  return new Request("https://internal.invalid/biography", {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ action: "edit_attempt", identity, slug, reservation: "b".repeat(64) })
  });
}

test("coordinator allows ten attempts and blocks the eleventh", async () => {
  const object = coordinator();
  for (let n = 0; n < 10; n++) {
    const response = await object.fetch(request());
    assert.equal(response.status, 200);
    assert.equal((await response.json()).status, "allowed");
  }
  const blocked = await object.fetch(request());
  assert.equal(blocked.status, 429);
  assert.equal((await blocked.json()).status, "limited");
});

test("editing limits isolate distinct identities and biographies", async () => {
  const object = coordinator();
  for (let n = 0; n < 11; n++) await object.fetch(request());
  assert.equal((await (await object.fetch(request("c".repeat(64)))).json()).status, "allowed");
  assert.equal((await (await object.fetch(request("a".repeat(64), "bio_other"))).json()).status, "allowed");
});

test("portrait rejects wrong magic bytes and excessive size", () => {
  assert.throws(() => validatePortrait(btoa("not a real PNG"), "image/png"));
  assert.throws(() => validatePortrait("a".repeat(4500000), "image/jpeg"));
  assert.throws(() => validatePortrait("abc", "image/svg+xml"));
});

test("portrait accepts a PNG signature and returns safe extension", () => {
  const bytes = Uint8Array.from([137,80,78,71,13,10,26,10,...Array(16).fill(0)]);
  const base64 = btoa(String.fromCharCode(...bytes));
  assert.equal(validatePortrait(base64, "image/png").extension, "png");
});

test("administrator access fails closed on invalid OAuth token", async () => {
  assert.equal(await isBiographyAdministrator("invalid"), false);
});
