# Biography launch verification

**Status: NOT LIVE.** The public publishing, player editing, portrait publishing, and owner recovery API routes are hard-disabled in `src/worker.js`. Do not enable them solely because Node unit tests pass.

## Implemented, currently gated

- Public submission form: separate first name and optional surname, preview, Turnstile and publishing request, one-time code receipt.
- Player editor: name + private code, Turnstile-protected load, revision-checked save.
- Durable Object: transactional biography reservations, submission limits, and per-IP/per-character editing attempt limits.
- Owner checks: HMAC-protected codes stored in KV; legacy biographies have no player editing rights.
- Administrator interface: GitHub OAuth plus server-side organization-owner verification; inspect, reset and revoke handlers.
- Portrait endpoint: strict file size and signature validation, slug-derived GitHub path, private-code authentication, Turnstile and throttling.
- Node regression tests: `npm run test:bio` (runs `tests/*.test.mjs`).

## Audit findings (2026-10-14)

- Fixed player-edit portrait preservation: previously escaped newlines and portrait matching could corrupt the saved biography (`43b946a`).
- Fixed custom organization submission: the publish UI previously sent the literal `__other__` marker rather than the player-entered organization (`afe66b4`).
- Repository tests have **not** been executed locally: the execution container cannot resolve `github.com`. GitHub Actions results still require confirmation. These code fixes do not establish end-to-end correctness.

## Launch blockers

1. Confirm all latest GitHub Actions tests pass, and run a real Worker runtime integration suite. Node mocks do not prove Cloudflare KV, Durable Object, GitHub API, or Turnstile behavior.
2. **Authoritative revocation integration:** Durable Object owner state now performs code activation, validation, reset, and revoke, avoiding KV propagation as the source of truth. Confirm these behaviors in a real Cloudflare runtime, including concurrent requests and KV outages.
3. **Ambiguous publication recovery:** administrator recovery now has an aged-claim reconciliation path (15-minute minimum), but this must be tested against actual GitHub writes and interrupted KV/coordinator operations before activation.
4. Test admin OAuth against a real organization owner and a regular wiki editor; verify the token scope, membership response and recovery flows. Never publish GitHub tokens or private editing codes in logs.
5. Test PNG/JPEG/WebP upload, size limits, malicious file types, conflicting GitHub updates, partial portrait writes, and the editor preserving existing portrait references.
6. Conduct a **controlled production test** with a disposable biography: publish, save private code, edit, add portrait, reset, verify old code denied, revoke, verify denied, remove test content. Do not create a production biography before recovery and revocation are safe.
7. Verify live `/api/bio/configuration` reports correct secret bindings and the expected feature gates. Validate that public writes return 503 while gated.
8. Only after all checks, enable the four server feature flags and update the draft-mode warnings. Confirm Cloudflare deployment and monitor errors.

## Operational notes

- Repo: `Eternal-City-Community/tec-wiki`, branch `main`.
- Cloudflare KV binding: `BIO_EDIT_CODES`; Durable Object: `BIO_COORDINATOR`.
- Secret values must never be committed.
- Admin recovery must remain restricted to verified GitHub organization owners.
- Existing legacy biographies are admin-only and must never be auto-claimed.
- A staging environment is not a prerequisite requested by the project owner, but a controlled production test is mandatory before public activation.
