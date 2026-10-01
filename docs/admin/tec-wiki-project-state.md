# TEC Wiki Project State

This file is the persistent handoff record for work on the **new TEC Wiki** at https://tec-wiki.com/.

Future TEC Wiki chats should read this file, inspect the relevant current source page, and review recent related commits before continuing work.

## Repository

- Repository: `herdias/tec-wiki`
- Default branch: `main`
- Primary wiki source: `docs/`
- Production site generator: Zensical 0.0.66 in MkDocs-compatibility mode (configuration remains in `mkdocs.yml`)
- Production site: https://tec-wiki.com/

## Standing Workflow Rules

- When the user says a page is broken, empty, incomplete, incorrect, screwed up, needs restoring, or needs fixing, assume they want the **actual wiki build updated**, not merely replacement text drafted in chat.
- Inspect the current `docs/<slug>.md` file before editing.
- Use the old TEC Wiki at `eternal-city.wikidot.com` as a historical/restoration source when useful.
- Do **not** assume old Wikidot mechanics are current when there is evidence of later changes.
- Current in-game evidence, user testing, GM statements, and confirmed mechanics take precedence over old wiki information.
- Never invent TEC mechanics, ranks, prices, trainer caps, formulas, commands, directions, or effects to fill gaps.
- Clean migration damage as part of restoration:
  - broken anchors
  - malformed Markdown
  - broken internal links
  - duplicated sections
  - incorrect copied commands
  - Wikidot markup remnants
  - empty/nearly-empty pages
  - broken tables
- Preserve useful real command examples and in-game output when available.
- Internal wiki links should use root-relative format, e.g. `/page-slug/`.
- Use MkDocs-compatible Markdown consistent with the repository.
- Commit requested page fixes directly to `main` unless the user explicitly requests another workflow.
- Report the commit SHA after changes.
- Update this file after significant repairs, confirmed mechanics, or project-wide decisions that future chats may need.

## Source Priority

When sources disagree, use this order:

1. Current user-provided in-game testing/output
2. Current GM-confirmed statements
3. Current game behavior documented elsewhere in the repo
4. Related current TEC Wiki pages
5. Old Wikidot material
6. Inference only when clearly labeled and never used to invent mechanics

## Confirmed Mechanics / Project Knowledge

### Two-Handed Crushing

- Two-Handed Crushing uses **0.25 reputation × the rank being purchased** for training cost.
- Do not use the old `30 sens × rank` model for this skill.

### Jewelry Crafting

Confirmed from user testing / GM clarification:

- Only skills actually used in a recipe contribute to finished quality.
- Assembly contributes only when the recipe uses assembly.
- Gem-cutting skills do not affect casting quality.
- Captuo teaches the listed jewelry skills through rank 100.
- Skill difficulties:
  - Basic Jewelry — Average
  - Assemble Jewelry — Average
  - Cast Jewelry — Average
  - Cold Work Stock — Average
  - Engrave Jewelry — Difficult
  - Form Wax — Average
  - Hot Work Stock — Difficult
  - Layout Gem — Average
  - Make Mold — Average
  - Set Gem — Difficult
  - Rough Cut Gem — Average
  - Shape Gem — Average
  - Polish Gem — Average
- Self-trained SP cost per rank observed:
  - Easy — 9
  - Average — 12
  - Difficult — 15
  - Impossible — 18

## Recent Repairs

### Locksmithing

- File: `docs/locksmithing.md`
- Restored/repaired the full Locksmithing page from surviving TEC material.
- Rebuilt the trainer table and skill sections.
- Repaired broken anchors and section links.
- Corrected migrated clay-mold examples that incorrectly repeated `imprint wax with lockpick`; they now use the proper clay-mold action.
- Preserved useful in-game examples and command syntax.
- Commit: `e6f5957534e63007b7229d4396d42ca2f9285b00`

### Two-Handed Crushing

- File: `docs/two-handed-crushing.md`
- Skill table repair committed.
- Commit: `5908a8d8321f16615af315b6ea2cfdd64b68483e`
- Important confirmed rule: training cost is `0.25 reputation × rank purchased`.



### Outdoor Survival

- File: `docs/outdoor-survival.md`
- Source content was present, but the rendered page was reported as missing its content.
- Repaired migration/rendering issues conservatively:
  - enabled Markdown parsing inside migrated `.skill-template` HTML blocks
  - removed remaining Wikidot double-brace command markup
  - fixed malformed emphasis in rank-note text
  - cleaned minor migration typos without changing mechanics
- Commit: `a2d6731ccecf778c9b1ee05ba965e01bcca19e62`

### MkDocs fenced code support

- Enabled the `fenced_code` Markdown extension globally so restored pages using triple-backtick code blocks render correctly instead of showing literal backticks.
- This specifically fixes the Locksmithing formatting issue reported after restoration.
- Commit: `b0c73c18135d56f1bc281bb9157aaf3f63d60e05`



### Pickpocketing

- File: `docs/pickpocketing.md`
- Source content was present, but the rendered page was reported as empty.
- Repaired migrated `.skill-template` HTML blocks so Markdown inside them is parsed correctly.
- Normalized broken/case-sensitive section links to MkDocs-generated heading anchors.
- Did not invent missing Silent Slip / Silent Draw mechanics; those actions are listed in the trainer table but no surviving sections were found in the current source or repository search.
- Commit: `b6eb6b92526100a293fd3e1477fe02b67c30da5b`



### Production build / Zensical cache

- Cloudflare Workers Builds runs `zensical build` for production, not `mkdocs build`.
- Zensical is pinned at `0.0.66` in `requirements.txt` and reads the existing `mkdocs.yml` in compatibility mode.
- Pages such as Outdoor Survival and Pickpocketing had full Markdown sources but rendered as an empty site shell, indicating stale/incorrect generated assets rather than missing source.
- `wrangler.jsonc` now defines a custom deploy-time build command: `zensical build --clean`.
- This forces a clean Zensical rebuild immediately before Wrangler uploads `./site`, avoiding stale Zensical build state in CI.
- Commit: `77823450ed5d163297260ca1614fbbea02741880`



### Known-good rollback: Pickpocketing and Outdoor Survival

- On 2026-10-01, repeated render/deploy repair attempts caused unstable behavior for `/pickpocketing/` and `/outdoor-survival/`.
- User requested both pages be restored to the last known-good repository state from roughly four hours earlier.
- Exact restore source: repository commit `3b788f91219135ef523973d93cababa2a3df8789`, the parent state immediately before the later anchor-repair changes affecting these files.
- `docs/outdoor-survival.md` restored byte-for-byte to blob `f0d7a0880c8e6b2eb12454e319342be5f07826d6`.
  - Restore commit: `30fe754bd27cd4ec2557ffdf4f445b0c0008e9fe`
- `docs/pickpocketing.md` restored byte-for-byte to blob `e85cb0c8c157c100350e9b939bd78eb27197b54f`.
  - Restore commit: `e2da0f673dc256a277a59124632a2186ecf944ff`
- Do not reapply the prior page-specific rendering/anchor edits to these two pages unless a specific root cause is verified first.



### Production renderer rollback to MkDocs

- Investigation showed `docs/pickpocketing.md` and `docs/outdoor-survival.md` were byte-for-byte identical to their earlier working versions.
- Working skill pages use the same general migrated markup patterns, so the page source itself was not the differentiator.
- The meaningful environment change was the production renderer: earlier working builds used `mkdocs build`, while later broken builds used `zensical build`.
- `wrangler.jsonc` now forces `mkdocs build --clean` immediately before asset upload, so the deployed `site/` is generated by MkDocs even if an earlier Cloudflare build step runs Zensical.
- Commit: `861ee151e818e4b70d650b60caadfb2c8c0e58a5`



### Grouped skill trainer table styling

- The blank-page issue was resolved by restoring MkDocs as the final production renderer.
- After content returned, Pickpocketing and Outdoor Survival showed a separate table-formatting defect: the main trainer table rendered unstyled while ordinary tables rendered correctly.
- Root cause: `tec-skill-pages.js` assigns the class `tec-skill-overview-table` to grouped trainer tables, while the base TEC table CSS targeted only `.md-typeset table:not([class])`.
- Added an isolated CSS skin for `.md-typeset table.tec-skill-overview-table` instead of changing page Markdown or the shared table JavaScript.
- A first broad selector patch was immediately superseded because it could distort unrelated selectors.
- Correct fix commit: `96d63bdee4ff8e04ff9ac5260bf069bb368063a0`



### Skill description truncation: raw <object> placeholders

- After restoring MkDocs and fixing grouped trainer table styling, Pickpocketing and Outdoor Survival still appeared to lose later skill-description content.
- Root cause identified in page Markdown: command syntax was written with raw angle-bracket placeholders such as `<object>`. Under MkDocs/browser HTML parsing, `<object>` is a real HTML element, not a harmless placeholder, and an unclosed occurrence can absorb later page content in the DOM.
- Working skill pages often use placeholders such as `<target>`, which do not trigger the same built-in HTML element behavior.
- Escaped command placeholders in skill headings so the literal syntax displays without becoming HTML.
- Also escaped the Pickpocketing `unpalm <object>` prose command and remaining Outdoor Survival `<object>` placeholders.
- Pickpocketing fix commit: `62db7233c06a3b2e0a96d8e5bb8a4c35641cedc3`
- Outdoor Survival fix commit: `c76dc3a73ebbe51381f0e440bfa0399e3b4ae78b`
- The Pickpocketing source still has no surviving detailed sections for Silent Slip or Silent Draw; do not invent those mechanics.

## Recent Migration/Audit Work

Recent repository work before this handoff file was created includes:

- `eb90201f77d4c664422901c7b5c6e15b6c15b304` — Audit migrated pages for content loss
- `72af4d255fbb234d313939f6a56ebade877171da` — Refresh content loss audit after restorations
- `9f5f4a6d4856d63ede46a519d362132bd1c1df8c` — Restore Account property section anchor
- `320fab1e1041314858446f3ca8d021adce5f0e6a` — Audit migrated prose for content loss
- `adbd83b393e2c6ab075f8441543e04b9543674cd` — Run semantic migration content audit
- `c44451c0c1df1b08f8ad519c55834301704a8999` — Add semantic migration content audit

Useful audit files at repository root include:

- `CONTENT_LOSS_AUDIT.md`
- `SEMANTIC_CONTENT_AUDIT.md`
- `FULL_SITE_AUDIT.md`
- `WIKI_AUDIT.md`
- `ANCHOR_REPAIR_REPORT.md`
- `FORMAT_REPAIR_REPORT.md`

## New-Chat Startup Checklist

At the beginning of a fresh TEC Wiki chat:

1. Read `docs/admin/tec-wiki-project-state.md`.
2. Inspect recent commits relevant to the page/topic.
3. Fetch the current `docs/<slug>.md` source.
4. Check old Wikidot or related current pages only as needed.
5. Apply the repair to the actual repository.
6. Commit to `main`.
7. Update this handoff file when the work adds durable project knowledge.
