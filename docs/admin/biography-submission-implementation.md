# Public Character Biography Submission — Private-Code Editing Plan

Status: **Implementation started; public submission and editing are not enabled.**

## Decisions (2026-10-14)

- A public guided form at `/submit-bio/`, usable without GitHub or wiki editor knowledge.
- Automatic publication of newly submitted biographies after validation and deployment.
- Optional portrait upload.
- **Self-service editing using a private, cryptographically random code** shown once on successful publication. No email or player account required.
- Existing biographies remain editor-managed. Only newly submitted biographies are eligible for code-based editing. Wiki owners can revoke and reset access after independently verifying a player's claim.
- Guided fields: character name (required), nationality, appearance, background, history, affiliations, optional portrait, and optional freeform sections.
- New pages use the established `docs/bio_<slug>.md` pattern; protect all existing slugs from overwrite.
- Preserve the existing `/character-bios/` card layout and historical URLs; automatically include new bios sorted alphabetically by character display name.

## Existing infrastructure

- `src/worker.js` handles existing wiki API endpoints; `wrangler.jsonc` routes `/api/*` to the Worker.
- `docs/character-bios.md` contains hardcoded biography cards.
- Portraits currently live under `docs/assets/uploads/`.
- The existing GitHub OAuth integration is for wiki editors and must not be exposed to anonymous visitors.

## Implementation

1. Build a mobile-friendly guided form and preview.
2. Add a Cloudflare Worker submission endpoint that validates/sanitizes fields and images, enforces strict request-size limits, rejects duplicates, and prevents arbitrary repository writes.
3. Protect anonymous publishing with Turnstile, rate limiting, and appropriate abuse controls. **Do not deploy an unrestricted public write endpoint.**
4. Use a least-privilege server-side GitHub credential stored as a Cloudflare secret to create only approved biography paths and optional images. Never expose credentials in frontend JavaScript.
5. Add a build-time alphabetical biography index generator, preserving legacy card titles and URLs. **Implemented:** `hooks/biography_index.py` and `mkdocs.yml` (commits `ef14097a61320b7a7ffab3e9c37e9be4d87e7c95`, `96af4eac757fbbea935a0ffdcbf902f6a7b21a6c`).
6. Confirm successful GitHub commit and communicate that publication completes after the site build.
7. Create 256-bit random editing codes, show each once, and store only keyed/hashed verification material in Cloudflare KV. Verify codes server-side with rate limits before updating the exact owned page; reject concurrent changes safely.\n8. Add wiki-owner reset/revoke operations protected by server-side verification that the authenticated GitHub user is currently an **owner** of the `Eternal-City-Community` organization (not merely an organization member or repository collaborator). Reset generates a new code, invalidating the old one; original codes are never recoverable.\n9. Stage-test abuse handling, duplicate submissions, image validation, legacy protection, edit authorization, reset/revocation, and deployment before linking the form publicly.

## Required operator setup

- Restricted GitHub write credential in Cloudflare Worker secrets (prefer a narrowly scoped GitHub App or fine-grained token).
- Cloudflare Turnstile site key and secret.
- Rate limiting (Cloudflare configuration or an appropriate durable mechanism).
- **No email provider or biography ownership database required.**

## Deferred

Email login, public ownership transfers, and existing-biography claiming are out of scope. Lost codes are replaced by verified wiki owners, not recovered.
