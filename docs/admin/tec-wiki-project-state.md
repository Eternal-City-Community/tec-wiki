# TEC Wiki Project State

This file is the persistent handoff record for work on the **new TEC Wiki** at https://tec-wiki.com/.

Future TEC Wiki chats should read this file, inspect the relevant current source page, and review recent related commits before continuing work.

## Repository

- Repository: `herdias/tec-wiki`
- Default branch: `main`
- Primary wiki source: `docs/`
- Site generator: MkDocs
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
