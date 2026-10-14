// Run with: node --test tests/biography.test.mjs
// All network and KV operations are mocked; this suite never publishes.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createBiographyFile } from '../src/bio-github.js';
import { activateBiographyCode, storePendingBiographyCode, verifyBiographyEditCode } from '../src/bio-turnstile.js';

const sha = 'a'.repeat(40);
const secret = 'test-only-secret-not-for-production-'.repeat(2);
const code = 'b'.repeat(64);
const slug = 'bio_automated_fixture';
const originalFetch = globalThis.fetch;

function kvMock({ failOnPut = 0, staleReads = false } = {}) {
  const data = new Map();
  let puts = 0;
  return {
    data,
    async get(key) { return staleReads ? null : data.get(key) ?? null; },
    async put(key, value) {
      puts++;
      if (puts === failOnPut) throw new Error('simulated KV outage');
      data.set(key, JSON.parse(value));
    }
  };
}

test('pending record stores hash, not plaintext code', async () => {
  const kv = kvMock();
  await storePendingBiographyCode(kv, slug, code, secret);
  const record = kv.data.get('bio-edit:' + slug);
  assert.equal(record.status, 'pending');
  assert.notEqual(record.hash, code);
  assert.equal(await verifyBiographyEditCode(code, record.hash, secret), true);
  assert.equal(await verifyBiographyEditCode('c'.repeat(64), record.hash, secret), false);
});

test('activation works despite stale KV reads', async () => {
  const kv = kvMock({ staleReads: true });
  await activateBiographyCode(kv, slug, sha, code, secret);
  const record = kv.data.get('bio-edit:' + slug);
  assert.equal(record.status, 'active');
  assert.equal(record.published_commit, sha);
  assert.equal(await verifyBiographyEditCode(code, record.hash, secret), true);
});

test('pending KV outage stops before GitHub publication', async () => {
  const kv = kvMock({ failOnPut: 1 });
  await assert.rejects(storePendingBiographyCode(kv, slug, code, secret));
});

test('activation KV outage surfaces an error for reconciliation', async () => {
  const kv = kvMock({ failOnPut: 2 });
  await storePendingBiographyCode(kv, slug, code, secret);
  await assert.rejects(activateBiographyCode(kv, slug, sha, code, secret));
  assert.equal(kv.data.get('bio-edit:' + slug).status, 'pending');
});

test('existing GitHub page is never overwritten', async () => {
  const calls = [];
  globalThis.fetch = async (_url, options = {}) => {
    calls.push(options.method || 'GET');
    return { ok: true, status: 200 };
  };
  try {
    assert.deepEqual(await createBiographyFile('fake-token', slug, '# Example'), { status: 'exists' });
    assert.deepEqual(calls, ['GET']);
  } finally { globalThis.fetch = originalFetch; }
});

test('GitHub ambiguous failure is not treated as successful publication', async () => {
  let calls = 0;
  globalThis.fetch = async (_url, options = {}) => {
    calls++;
    if (options.method === 'PUT') throw new Error('simulated timeout after possible write');
    return { status: 404, ok: false };
  };
  try {
    await assert.rejects(createBiographyFile('fake-token', slug, '# Example'), /simulated timeout/);
    assert.equal(calls, 2);
  } finally { globalThis.fetch = originalFetch; }
});

test('422 without an existing file is not mislabeled as a conflict', async () => {
  globalThis.fetch = async (_url, options = {}) =>
    options.method === 'PUT' ? { status: 422 } : { status: 404, ok: false };
  try {
    await assert.rejects(createBiographyFile('fake-token', slug, '# Example'), /rejected/);
  } finally { globalThis.fetch = originalFetch; }
});
