# Public Character Biography Submission — Simplified Plan

Status: **Approved scope, not yet implemented or enabled.**

## Decisions (2026-10-14)

- A public guided form at `/submit-bio/`, usable without GitHub or wiki editor knowledge.
- Automatic publication of newly submitted biographies after validation and deployment.
- Optional portrait upload.
- **No self-service editing, edit links, edit codes, email verification, or player account system for now.**
- Existing biographies remain editor-managed. Changes to submitted biographies are requested from wiki editors.
- Guided fields: character name (required), nationality, appearance, background, history, affiliations, optional portrait, and optional freeform sections.
- New pages use the established `docs/bio_<slug>.md` pattern; protect all existing slugs from overwrite.
- Preserve the existing `/character-bios/` card layout and historical URLs; automatically include new bios sorted alphabetically by character display name.

## Existing infrastructure

- `src/worker.js` handles existing wiki API endpoints; `wrangler.jsonc` routes `/api/*` to the Worker.
- `docs/character-bios.md` contains hardcoded biography cards.
- Portraits currently live under `docs/assets/uploads/`.
- The existing GitHub OAuth integration is for wiki editors and must not be exposed to anonymous visitors.

## Minimal implementation

1. Build a mobile-friendly guided form and preview.
2. Add a Cloudflare Worker submission endpoint that validates/sanitizes fields and images, enforces strict request-size limits, rejects duplicates, and prevents arbitrary repository writes.
3. Protect anonymous publishing with Turnstile, rate limiting, and appropriate abuse controls. **Do not deploy an unrestricted public write endpoint.**
4. Use a least-privilege server-side GitHub credential stored as a Cloudflare secret to create only approved biography paths and optional images. Never expose credentials in frontend JavaScript.
5. Add a build-time alphabetical biography index generator, preserving legacy card titles and URLs.
6. Confirm successful GitHub commit and communicate that publication completes after the site build.
7. Stage-test abuse handling, duplicate submissions, image validation, legacy protection, and deployment before linking the form publicly.

## Required operator setup

- Restricted GitHub write credential in Cloudflare Worker secrets (prefer a narrowly scoped GitHub App or fine-grained token).
- Cloudflare Turnstile site key and secret.
- Rate limiting (Cloudflare configuration or an appropriate durable mechanism).
- **No email provider or biography ownership database required.**

## Deferred

Self-service edits, recovery, ownership transfer, email login, and existing-biography claiming are explicitly out of scope until separately requested.
