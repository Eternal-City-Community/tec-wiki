# Public Character Biography Submission — Implementation Specification

Status: **Approved requirements; implementation pending.** Do not expose a public submission button until the full authenticated write path is tested.

## Confirmed product decisions (2026-10-14)

- Public guided biography submission, no GitHub or CMS knowledge required.
- Automatic publishing after email ownership verification, validation, and successful deployment; no routine editor approval.
- Optional portrait upload.
- Subsequent edits by the verified submitting email address, using short-lived, single-use email links.
- Existing migrated biographies remain editor-managed; never let a public submission overwrite or claim one.
- Guided fields: character name (required), nationality, appearance, background, history, affiliations, portrait, and optional freeform sections.
- Canonical new page paths: `docs/bio_<normalized-character-name>.md`; retain existing historical paths.
- Preserve all current `docs/character-bios.md` cards and generate a unified alphabetical directory by *display name*.

## Existing infrastructure verified

- Cloudflare Worker entrypoint: `src/worker.js`; `wrangler.jsonc` routes `/api/*` to Worker.
- Existing GitHub OAuth is for Decap editors, **not** public player identity.
- Existing uploaded media directory: `docs/assets/uploads`.
- Existing biography index is hardcoded HTML cards in `docs/character-bios.md`.
- Existing listpages hook sorts child slugs rather than biography display names.
- Production build uses `mkdocs build --clean` via Wrangler.

## Secure architecture

1. Public `/submit-bio/` frontend with accessible mobile form, draft preview, upload validation, and clear status feedback.
2. `POST /api/bios/request-link`: validate email, enforce Turnstile and rate limits, issue expiring one-use email verification link. Never reveal whether an email owns a character.
3. `GET /api/bios/verify`: redeem one-use token server-side, establish HttpOnly Secure SameSite session scoped to verified email; avoid putting bearer edit credentials into published content.
4. `POST /api/bios`: require verified session, validate fields and image, reject reserved/existing paths, atomically claim normalized slug, create Markdown and optional portrait via restricted GitHub App credentials. Do not accept arbitrary file paths or raw HTML.
5. `GET /api/bios/:slug` and `PUT /api/bios/:slug`: authorize by stored verified-email ownership record; use GitHub file SHA optimistic concurrency; protect editor-managed historical pages.
6. Durable Cloudflare D1 or equivalent storage for hashed one-use tokens, sessions, verified-email ownership, idempotency keys, and audit history. No private email addresses in Markdown or Git history.
7. Use a Cloudflare GitHub App installation token with minimum Contents write permission, stored only as a Worker secret. Do not expose the current Decap OAuth client secret or a GitHub token to browsers.
8. Restrict images to validated raster formats, cap dimensions and bytes, reject SVG/HTML, and store only safe normalized paths. Strip metadata if feasible.
9. Enforce Turnstile, per-IP/email rate limits, content length limits, Markdown/HTML sanitization, and safe GitHub API error handling. Reject duplicate names, including collisions with historical pages.
10. On successful commit, show “Publishing — awaiting deployment” rather than claiming the page is already live. Expose retry-safe status.

## Directory generation

Replace manual card maintenance with a MkDocs build hook that scans `docs/bio_*.md`, extracts safe display names from explicit frontmatter (fallback to current legacy card label or headings), sorts case-insensitively by display name, and emits existing `bio-grid` / `bio-card` markup. Preserve existing legacy labels and URLs. Keep build output deterministic; do not touch unrelated `listpages.py` behavior.

## Deployment gates

- Worker credentials, email delivery, Turnstile, and D1 bindings configured.
- Staging verification of new submission, duplicate rejection, edit authorization, expired/replayed link, image abuse, concurrent edits, deployment success, and historical bio protection.
- Only then link the public submission form from `/character-bios/`.

## Operator configuration required

- Cloudflare: D1 database binding and migrations; Turnstile site key + secret; outbound transactional email provider API key and verified sending domain.
- GitHub: restricted GitHub App installed on `Eternal-City-Community/tec-wiki`, installation ID and App private key as Worker secrets, Contents read/write permission. Keep secrets out of chat and Git.
- Decide public sender address, e.g. `wiki@tec-wiki.com`, and DNS email verification records.
- Confirm policy for character-name collisions and whether all submitted bios require email verification before first publication (recommended: yes).

## Work sequencing

1. Build deterministic directory hook and tests; retain all historical bios.
2. Add D1 schema and secure email authentication API.
3. Implement GitHub write operations and portrait processing.
4. Add frontend form, preview, editor and status UX.
5. Test staging, configure Cloudflare secrets, enable public link.
