import test from "node:test";
import assert from "node:assert/strict";
import { publishPortrait, validatePortrait } from "../src/bio-portrait.js";
import { isBiographyAdministrator } from "../src/bio-admin.js";

const validImage = { extension: "png", base64: btoa(String.fromCharCode(137,80,78,71,13,10,26,10,...Array(16).fill(0))) };

test("portrait creation is restricted to slug-derived image path", async () => {
  const original = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options = {}) => {
    calls.push({ url, options });
    if (!options.method) return { status: 404, ok: false };
    return { status: 201, ok: true };
  };
  try {
    const result = await publishPortrait("fake-token", "bio_example", validImage);
    assert.equal(result.status, "created");
    assert.equal(result.path, "/assets/uploads/bio_example.png");
    assert.equal(JSON.parse(calls[1].options.body).branch, "main");
    assert.ok(calls.every(x => x.url.includes("/docs/assets/uploads/bio_example.png")));
  } finally { globalThis.fetch = original; }
});

test("portrait creation does not overwrite an existing image", async () => {
  const original = globalThis.fetch;
  let count = 0;
  globalThis.fetch = async () => { count++; return { status: 200, ok: true }; };
  try {
    assert.equal((await publishPortrait("fake-token", "bio_example", validImage)).status, "exists");
    assert.equal(count, 1);
  } finally { globalThis.fetch = original; }
});

test("portrait paths reject traversal", async () => {
  await assert.rejects(publishPortrait("fake-token", "../admin", validImage));
});

test("organization owner check rejects non-admin membership", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async url => ({
    ok: true,
    json: async () => url.endsWith("/user")
      ? { login: "TestUser" }
      : { state: "active", role: "member", organization: { login: "Eternal-City-Community" } }
  });
  try { assert.equal(await isBiographyAdministrator("a".repeat(32)), false); }
  finally { globalThis.fetch = original; }
});

test("organization owner check accepts verified active admin membership", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async url => ({
    ok: true,
    json: async () => url.endsWith("/user")
      ? { login: "TestUser" }
      : { state: "active", role: "admin", organization: { login: "Eternal-City-Community" } }
  });
  try { assert.equal(await isBiographyAdministrator("a".repeat(32)), true); }
  finally { globalThis.fetch = original; }
});
