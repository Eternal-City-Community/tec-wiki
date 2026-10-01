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



### Outdoor Survival tail rebuilt as plain Markdown

- User reported that live rendering still stopped after **Forester Conceal**, even though the repository contained Survival Weaving, Whittling, and lore sections.
- The break point aligned with the remaining legacy raw-HTML tail of the page.
- Rebuilt everything from **Survival Weaving onward** as plain MkDocs Markdown:
  - converted legacy `<a id=...>` anchors to heading attr-list IDs
  - converted `.skill-template` raw HTML blocks to fenced text blocks
  - converted collapsible `<details markdown="1">` rank sections to normal visible Markdown sections/tables
  - preserved all existing descriptions, tables, command examples, and lore content
- Commit: `545561bd29b299af238f10700d1643e710cd94bf`



### Migration presentation cleanup batch

User-reported issues and fixes on 2026-10-01:

- **Character bios:** migrated bio pages had inconsistent/broken quote markup. Added `docs/javascripts/tec-content.js` to normalize `/bio_*/` pages into a single quote-style biography frame at runtime without rewriting hundreds of source files.
  - Commit: `0f8a9adfe1418f509a0fb8a280ac50eea6133143`
- **Skill example spacing:** normalized blank source lines inside migrated `.skill-template` blocks and trimmed leading/trailing whitespace.
  - Commits: `bcc5af28190cbafc4741b52d32d67663ea59d618`, `191284a01a5ab49668d70d7caa643ac5a3d61aae`
- **Legacy single-line breaks:** enabled the Markdown `nl2br` extension because many migrated map legends, related-map lists, and guide instructions preserve meaningful single newlines in source.
  - Commit: `53f6d03da63f4dd104d703f52456c9ba49a97c17`
- **H5 readability:** added distinct, larger fifth-level heading styling.
- **Map images:** linked images may use the full article-column width instead of the prose-width cap, and linked image/map assets now open in a new tab.
- **Top navigation:** removed the old CSS rule that completely hid the TEC top navigation below the desktop breakpoint; compact responsive navigation remains available on narrow desktop and mobile.
  - Shared styling commit: `4e59a2eaf52a613fc3275356a1a0c12b6b5d0303`
- **Maps index:** restored concrete map links under the regional headings in `docs/maps.md` using known current wiki map pages.
  - Commit: `ef3066001becbbc26727403a2c3cc37e21f05c1c`
- **Rank Bonus Calculator:** allow calculations when either basics or subskill input is present rather than suppressing combat output when subskill is empty; seeded the calculator with the classic defaults of basics 10 / subskill 1 so combat results display immediately.
  - Commits: `76cf6d9ed4fade917b407c36377156e9f8464261`, `793e8b2f4e1c672458ec7ccb327712f44e951a76`
  - User also expressed a preference concern about the current `+` button behavior; that interaction has not been redesigned yet.
- **Announcements / ListPages:** the old Announcements page used a Wikidot `ListPages` module whose generated content was not captured by migration. Replaced the raw technical warning with a clearer restoration note, but the actual historical announcement index still needs reconstruction from archived Wikidot source.
  - Announcements note commit: `3cf922d0c5fb7457ca4026f95071f14bc9c900e6`
- **Migration audit:** updated `tools/audit_migration.py` to flag `Archive note:` and `Wikidot module` markers so remaining dynamic-module losses are visible in future audits.
  - Commit: `3533db56834eda4581ee954285bbb2b0f2538ddc`




### Rank Bonus Calculator classic functionality restoration

- User confirmed Offensive and Defensive modes still rendered blank while Non-Combat worked.
- Root cause: combat stance rows were represented as arrays, but the renderer read `row.mod`; only Non-Combat used an object with a valid `mod` property. This produced `NaN`/blank combat results.
- Rebuilt `docs/javascripts/tec-rank-bonus.js` around a consistent calculator-card model while preserving the polished UI.
- Restored the original Wikidot calculation behavior:
  - Basic column uses raw RB for the entered Basics rank.
  - Easy/Average/Difficult/Impossible subskills use `floor(Basics RB) × difficulty modifier + Subskill RB`.
  - Combat stance modifier is applied to the calculated RB.
  - Defensive mode uses the inverse stance modifiers.
  - Non-combat uses 100% stance modifier.
  - Restored the original `RB +/- Mod` field; the modifier is applied after stance to subskill results, matching the classic calculator.
- Restored `+` behavior: clicking `+` now creates a complete independent copy of the **first calculator box**, including its current ranks, modifier, mode, row/column settings, and decimal precision. The temporary one-line comparison widget was removed.
- Main functionality commit: `fe2d9a9ef388a3b8bd08dc178641a70a074d75af`
- Duplicate-card spacing/style commit: `0f54ee779872904bf95d2fc5028d0df281dbc4c2`



### RB calculator input parity correction

- User provided screenshots of the Wikidot calculator and current rebuilt calculator.
- The target Wikidot UI has only **Basics Rank** and **Subskill Rank** inputs; the previously restored third `RB +/- Mod` field came from an older preserved source variant and should not be present in the rebuilt UI.
- Removed the third modifier input and modifier math from the current calculator.
- Removed the default `10 / 1` ranks; both inputs now start blank, matching the Wikidot calculator shown by the user.
- The `+` button still duplicates the complete first calculator box and its current state.
- Commit: `df4908914487f0354ab1a2c6ce362307c805d4ac`



### Breadcrumb restoration

- Page breadcrumbs were missing from the migrated site.
- No custom CSS was hiding them; the Material theme's breadcrumb/path feature simply was not enabled.
- Enabled `navigation.path` in `mkdocs.yml`.
- Commit: `5d173b61e954ce050d87270bc1ab3399122feaf6`
- Material breadcrumbs follow the configured `nav:` hierarchy, so pages not represented in that hierarchy may still have limited/no breadcrumb context until the nav structure is expanded.



### Mobile-friendly pass for other calculators

- Applied a responsive/mobile usability pass to the non-Rank-Bonus calculators without changing calculator formulas or mechanics.
- **Training Cost Calculator**
  - Single-column layout on phones.
  - Current/Desired Rank rows use compact two-column mobile layout.
  - Inputs and modifier buttons enlarged for touch.
  - NPC and SP result tables remain intact and scroll horizontally instead of overflowing/collapsing.
  - Notes text enlarged slightly for phone readability.
  - Commit: `55b43b4841ba243f633af665902d85415c52f49d`
- **Money Calculator**
  - Mobile-safe horizontal table scrolling.
  - Larger 16px numeric inputs and 44px action buttons.
  - Action buttons stack full-width.
  - Reduced card padding and improved heading/help readability.
- **Fight It! Calculator**
  - Panels/results remain single-column on narrow screens.
  - Selects/text inputs become full-width 44px controls with 16px text to avoid mobile zoom.
  - Checkboxes enlarged.
  - Calculate button becomes full-width.
  - Results/cards use tighter mobile spacing and larger readable text.
- Shared Money/Fight It styling commit: `38560d6f37ceba9c267a6c3d811b4ba29b46edb6`



### Mobile-friendly Shops pass

- Treated `/shops/` as an interactive calculator/search tool and made the existing UI genuinely phone-friendly without changing inventory parsing, search behavior, prices, or data.
- Search field now uses 16px text and a 44px touch target; Options becomes a full-width button on phones.
- Shop search option checkboxes are larger and easier to tap.
- Location links become a two-column touch-friendly grid (one column on very narrow screens).
- Browse-mode shop cards use full width with tighter headers, readable item rows, and preserved item/price layout.
- Search-mode results no longer force a 720px horizontal table on phones; each result becomes a stacked mobile card showing item, price, shop, and location.
- Commit: `2a5f5cb227a1857e8d4cf5e5291ef3df73f7cf8c`



### Missing-page / red-link restoration

- The hardened migration had created **47 fake preservation stub pages** for internal links whose source did not exist in the Wikidot backup.
- This made genuinely missing pages look like normal existing pages, unlike Wikidot where missing links appeared red and led to page creation.
- Confirmed examples included:
  - `/dual-daggers-combat-guide/`
  - `/bio_mortarian-santum/`
- Removed all 47 auto-generated preservation stubs.
- Updated `tools/post_migration.py` so it no longer recreates fake missing-source pages.
- Added `docs/assets/data/missing-pages.json` as the manifest of currently known unresolved slugs.
- Updated `docs/javascripts/tec-content.js` so links to those slugs:
  - render with a red/dotted missing-page style
  - get a tooltip explaining the page does not exist
  - route to Decap's **New Wiki Page** workflow at `/admin/#/collections/pages/new`
- Added matching CSS in `docs/stylesheets/tec.css`.
- Commit: `a75b09986faadb12ec09dbca9475f8d0a1fd3d8a`



### Obsolete map legend migration-note cleanup

- User identified old Wikidot map-template instructions containing `display_legend` that had survived migration and were rendering as ordinary text on some pages.
- Repository search found **47 affected Markdown pages**.
- Removed the obsolete instruction block from all affected pages, including both properly formed HTML comments and malformed migrated `[!-- ... --]` variants.
- Verified representative pages such as `docs/storm-drain-system.md`, `docs/franlius.md`, and `docs/harbor-of-the-moons.md` no longer contain the block in source.
- Cleanup commits:
  - `f7f2911c0fab525124df983db0b871816dbd1f28`
  - `e9ff076406baf736337a9fa3cca26d0c4e190860`
  - `58bedf876fd2b8439e06fc1b62405e3a2445032b`
  - `14bbcdef9136c1509cf6d243a492aa76a303c6a5`
  - `c917e30a0bf0a5b5b81e7bbfeae9688199cc30ff`
  - `828114a81db9ebe5ef3b41523d0318c5f19c7334`
  - `8518042deee717e8e322b09abe4c34fb724c2f62`
  - `b0199a85dfee0c1c0cbc84d276b7ce9ae2a118ff`
  - `90de8c65988c823c0d336dd7f855658ef78f0549`
  - `f421a74d7211a410ccd4a9d2479e5c0d2b6b436c`



### Harbor of the Moons feature-image sizing correction

- User reported the top illustration on `/harbor-of-the-moons/` became excessively large on desktop after the broader map-image width change.
- Root cause: the generic linked-image/map styling treated all linked images as map-like content.
- Converted the Harbor artwork to an explicit `.tec-feature-image` / `.tec-feature-image-link` treatment.
- Feature artwork is now capped at 900px wide and 68vh tall on desktop, centered, while remaining full-width/fluid on mobile.
- The actual Harbor map inside the Map section keeps the wider map behavior.
- Page commit: `c39f147ad41abbd4bd5d2a26d6dc1c6c148053e4`
- CSS commit: `175d89cdb3a2797211066961648c879c9b5746be`



### Top navigation overlap fix

- User reported the TEC top navigation overlapping page content at certain desktop/mobile breakpoints and scroll positions.
- Root cause: `.tec-topnav` was independently sticky with hard-coded `top: 80px` on desktop and `top: 48px` below the responsive breakpoint, while Material's header changes size/position across those states.
- Removed sticky positioning and breakpoint-specific top offsets from the TEC top nav.
- The shortcut bar now remains in normal document flow directly beneath the masthead, matching the old wiki behavior and preventing the closed bar from covering page content.
- Dropdown/flyout menus remain positioned overlays only while intentionally open.
- Commit: `89315e315031477a6889542edce2a37cfd78a3b7`



### Top navigation header-stack correction

- User provided a screen recording showing that after the previous overlap fix, the TEC shortcut bar scrolled away independently while Material's masthead remained sticky and changed from the site title to the current page title.
- Root cause: the TEC nav was inserted *after* the Material header as a separate document-flow element.
- Moved `.tec-topnav` inside `.md-header` so the masthead and shortcut bar form one sticky header stack.
- Added dynamic measurement of the actual combined header height via `ResizeObserver` and the CSS variable `--tec-header-stack-height`.
- Mobile drawer and desktop sticky sidebar now use the measured header-stack height instead of hard-coded `68px` / rem offsets.
- This should keep the top nav visible with the header while preventing it from covering content across viewport widths and Material's scroll-title transitions.
- JS commit: `8c3da86f441303f94a7e14bdbd3b8a0ef34a34a9`
- CSS commit: `b0cc21e113827317703cdc69c1991f29b9980951`

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
