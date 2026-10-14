import test from "node:test";
import assert from "node:assert/strict";
import { authorizeBiographyOwner } from "../src/bio-owner.js";
import { hashBiographyEditCode } from "../src/bio-turnstile.js";

const secret = "owner-test-secret-with-more-than-thirty-two-characters";
const code = "a".repeat(64);
const slug = "bio_example_character";

test("correct code authorizes an active player biography", async () => {
  const hash = await hashBiographyEditCode(code, secret);
  const kv = { get: async () => ({ version: 1, status: "active", hash }) };
  assert.equal(await authorizeBiographyOwner(kv, slug, code, secret), true);
});

test("incorrect code is denied", async () => {
  const hash = await hashBiographyEditCode(code, secret);
  const kv = { get: async () => ({ version: 1, status: "active", hash }) };
  assert.equal(await authorizeBiographyOwner(kv, slug, "b".repeat(64), secret), false);
});

test("legacy biographies without an active code cannot be claimed", async () => {
  const kv = { get: async () => null };
  assert.equal(await authorizeBiographyOwner(kv, slug, code, secret), false);
});

test("pending or revoked editing records cannot authorize updates", async () => {
  const hash = await hashBiographyEditCode(code, secret);
  for (const status of ["pending", "revoked"]) {
    const kv = { get: async () => ({ version: 1, status, hash }) };
    assert.equal(await authorizeBiographyOwner(kv, slug, code, secret), false);
  }
});

test("invalid slug and malformed code are rejected without KV reads", async () => {
  const kv = { get: async () => { throw new Error("must not read KV"); } };
  assert.equal(await authorizeBiographyOwner(kv, "../admin", code, secret), false);
  assert.equal(await authorizeBiographyOwner(kv, slug, "invalid", secret), false);
});
