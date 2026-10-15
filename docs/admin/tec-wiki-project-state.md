# TEC Wiki Project State

This file is the persistent handoff record for work on the **new TEC Wiki** at https://tec-wiki.com/.

Future TEC Wiki chats should read this file, inspect the relevant current source page, and review recent related commits before continuing work.

## Repository

- Repository: `Eternal-City-Community/tec-wiki`
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
- Superseded by a build step: `hooks/placeholders.py` escapes any `<word>` that is not an HTML tag the pages use, so pages keep plain `<target>`, `<object>` and the like (the CMS shows `&lt;` literally and saves typed `<` raw). `docs/admin/tec-cms-placeholders.js` does the same for the editor preview. Unescaped placeholders also hid in the search index, where the rest of a section became part of its heading. Only `&lt;label&gt;` and `&lt;mark&gt;`, which are real tag names, stay escaped in the pages.



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
- Replaced later by front-matter breadcrumbs:
  - Each page names its parent page, e.g. `parent: skills`. `hooks/breadcrumbs.py` works out the chain up to Home on every build, and `overrides/partials/path.html` (theme `custom_dir: overrides`) renders it in place of Material's nav-based path. Parent pages are links; the current page is plain text. Every chain starts at Home.
  - Parents were recovered from the old wiki's breadcrumbs (743 pages; Combat and Hunting Grounds listed themselves and were corrected), plus 68 set by clear evidence (bios, `codex-`/`scroll-` books, hunting grounds, crafting skills and their guides, History articles, Aestivan pages). About 40 pages, mostly test, meta and stray pages, are left without one on purpose.
  - The editor has a **Parent page** field (searchable dropdown of titles). The build warns about a parent that doesn't exist or a loop.
  - `forum-news` ("IG - @Forum") was never migrated; it was restored as a generated child-page list.



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



### Search/top-nav stacking correction

- After moving the TEC shortcut bar inside the sticky Material header, the expanded Material search UI could render beneath the green shortcut row.
- Cause was a stacking-order conflict: `.tec-topnav` had a higher effective layer than the expanded search form/output in some responsive states.
- Raised Material search/form/output above the TEC nav while leaving the nav/header layout unchanged.
- Mobile search overlay/inner/output receive a higher overlay layer as well.
- Commit: `93ace0df0954eea94f0c36d41b2b82e992d94c90`



### Search expansion / top-nav displacement fix

- Screenshot showed expanded search pushing the TEC nav far down the viewport.
- Root cause: `.tec-topnav` had been appended as the last child of `.md-header`; Material's expanded search UI participates in that header structure, so the nav followed it downward.
- Changed insertion point so the TEC nav is placed immediately after `.md-header__inner` (the normal masthead row), ahead of the expandable search UI.
- Header-stack measurement now explicitly uses masthead-row height + TEC-nav height rather than the full expanded header box.
- Search output is treated as an overlay and the TEC nav is hidden while search is actively open so it cannot visually compete with the search panel.
- JS commit: `3fe7a248f9f693d8fe6123d8c6389b537c346a71`
- CSS commit: `930f59ce8ba99310388cd8f74575e14abb17426c`



### Account page table repair and section redesign

- User reported one broken table on `/account/` and that the major account topics blended together visually.
- Broken table root cause: the Role Point Expenditure table was interrupted by the `requests-property` anchor; the following property/pet/event rows had no Markdown table header/separator, so they rendered incorrectly.
- Repaired that portion as a deliberate second table with the same five columns and a **Property, Pet, and Event Requests** subheading.
- Promoted the five major topics to consistent H2 sections:
  - Account Subscriptions
  - Role Points
  - StoryPoints
  - Apartments
  - Perks
- Added a compact jump navigation at the top linking directly to all five topics.
- Added account-specific section styling so H2 topics have a distinct band/divider treatment, subtopics are easier to scan, and mobile spacing remains readable.
- Clarified apartment subheadings as Monlon Apartments / Rock Valley Apartments / Vetallun Apartments without changing mechanics or prices.
- Page commit: `5032cbd6a726a151621c21df92c8fc2fe21d3b39`
- CSS commit: `6e051ebc362d12f21c2d7e1d3baa83fce6b969e4`



### Wikidot ListPages replacement

- Recreated the old Wikidot dynamic child-page listing behavior in MkDocs using a build hook.
- Added `hooks/listpages.py` and enabled it from `mkdocs.yml`.
- Pages can declare a Wikidot-like parent relationship in front matter, e.g. `parent: announcements`.
- A marker such as `<!-- TEC_LISTPAGES parent=announcements -->` is replaced at build time with linked child-page titles.
- Child pages are sorted by slug/page name ascending to reproduce `order="name asc"`, while the visible link text uses each page's title to reproduce `%%title_linked%%`.
- Generated links use 1.2em text, matching the old `[[size 120%]]` intent.
- `docs/announcements.md` now uses the generated-list marker instead of the migration restoration warning.
- Hook commit: `3168bca5fd0eb05f7416d3ad6117984223e643d1`
- MkDocs config commit: `59267ee1bd2c7b31abc37f4837a7486800312b00`
- Announcements marker commit: `fd0d8f37dce388d5cf5be0428267fec4c37ca414`
- Styling commit: `4be999d174b779f65627b45395bd61b1bef81f92`
- Children of `announcements` (and every other parent) now come from the parents recovered for breadcrumbs, see Breadcrumb restoration.
- The generated list needs `markdown="1"` on its wrapper div; without it the list showed as raw Markdown text.



### General Rules two-column layout restoration

- User reported that `/general-rules/` lost the two-column layout from the old Wikidot page.
- Restored the page as a responsive two-column grid:
  - left column: **The Eternal City Rules and Policies**
  - right column: **Contacting the GM Staff**, **Contacting an SG**, **Contacting an Auxilii**, and **Contacting ThreeSeas LLC**
- Columns collapse to a single column below 62rem for tablet/mobile usability.
- Added a subtle divider and stronger section styling to the contact column.
- Removed stray `Test Text` left at the bottom of the page.
- Page commit: `2b81fd5a7b7d7398dafd4d9f2577267b5c686786`
- CSS commit: `4bb47246530794576b16974201020d1e30dfc773`



### Stats responsive two-column redesign

- User reported that `/stats/` had been two-column on Wikidot and looked awkward as one long linear page after migration.
- Restored the two-column intent with a more deliberate responsive layout rather than one giant page-wide split:
  - all 13 **Attribute Types** are individual cards in a two-column desktop grid
  - **The Training Courses** and **Numeric Equivalents** are side-by-side reference panels
  - **Improving Attributes**, **Natural Attribute Increases**, **Stat Skills**, and **Temporary Modifiers** remain full-width for long-form readability
- All grids collapse to one column below 62rem for tablet/mobile.
- Existing mechanics, stat descriptions, values, training-course directions, and formulas were preserved.
- Promoted major section headings to H2 for clearer hierarchy.
- Page commit: `befe35771cf74e0d1cceb76d0b560efa6490cac2`
- CSS commit: `8f35d3969193d18b0c9fd8d7b92b73f728f23737`



### Markdown parsing fix for responsive grid pages

- User screenshots showed both `/general-rules/` and `/stats/` rendering Markdown syntax literally after their responsive grid redesigns.
- Root cause: inner columns/cards had `markdown="1"`, but the **outer grid wrappers** did not. With MkDocs/Python-Markdown `md_in_html`, the outer HTML container must also opt into Markdown parsing for nested Markdown content to render correctly.
- Added `markdown="1"` to:
  - `.tec-general-rules-grid`
  - `.tec-stat-grid`
  - `.tec-stats-reference-grid`
- General Rules fix commit: `04f5bd20d675fb8c88ac491b69d98609b7ed0073`
- Stats fix commit: `6a72ddf5499b8f505635cd375afb59a2e5fa8faa`



### Recurring MkDocs `md_in_html` rule

- When introducing responsive layouts with raw HTML wrappers such as `<div>`, `<section>`, `<article>`, cards, grids, or columns that contain Markdown, **every containing HTML wrapper in the nesting chain must use `markdown="1"`**.
- Adding `markdown="1"` only to an inner child is not sufficient if an outer wrapper is still plain HTML.
- Failure mode: headings render as literal `##` / `#####`, lists show literal `*`, emphasis shows literal `**`, and tables/links may stop parsing.
- Before committing any new HTML-based layout, verify Markdown rendering inside the deepest content block and all parent wrappers.
- Prefer plain Markdown when an HTML wrapper is unnecessary.

### Table cell markers

Markdown tables lack Wikidot's cell formatting, so a marker at the start of a cell supplies it (`docs/javascripts/tec-table-cells.js`, run before the other page enhancers on the live site and in the editor preview):

| Wikidot | Markdown cell | Meaning |
| --- | --- | --- |
| `\|\|\|\|~ Armor \|\|` | `\| >> \| ~ Armor \|` | `>>` joins the cell to its right (colspan) |
| `[[cell rowspan="2"]]` | `\| ^^ \|` (in the row below) | `^^` joins the cell above (rowspan) |
| `\|\|~ Armor` | `~ Armor` | header cell |
| `\|\|= 2` / `\|\|> 400d` | `= 2` / `> 400d` | center / right-align one cell |

- Whole columns use normal Markdown alignment (`:---:`, `---:`). Header cells stay centered unless they have their own marker.
- Alignment is set per column, not per cell: the 775 migrated `= ` markers were removed. A column where most cells had one became `:---:`; elsewhere the few marked cells now follow their column. Skill overview tables ("Ranks Taught by Trainer") are `---` for the first column and `:---:` for the rest. `= ` and `> ` remain only for a cell that should differ from its column.
- Editor-facing docs: the "Formatting rules" section of `docs/browser-editing.md`, linked from the "Formatting" link in the CMS editor toolbar (`docs/admin/tec-cms-format-link.js`). Only markers in plain text count; a marker inside code (`` `~ ` ``) is shown as written.
- There is no left marker (the CMS escapes a leading `<`); left is the default.
- Content that itself starts with a marker needs rewording, e.g. `~5 GSP` rather than `~ 5 GSP`.
- The migration had dropped all of this (spans became empty cells, `~ = >` were stripped, and some "~" meaning "approximately" were lost with them). Restored from the Wikidot source where the table still matches it. Not restored: tables restructured after migration (Account, Locksmithing); on Jewelry, Leather-working, Tailoring and Tanning skill tables only header/section rows were restored (their source alignment was inconsistent).

### Lists after text, and emphasis in skill samples

- `hooks/list_spacing.py`: a `* ` line directly under a line of text starts a list (Python-Markdown needs a blank line first; the editor preview does not). Fixed 290 lists on 80+ pages, e.g. Stats "Jump to:". Numbered lines are left as plain lines, since a Markdown list renumbers from 1 and map legends continue their numbers across sections.
- `hooks/skill_samples.py`: `*italic*` and `**bold**` inside `<div class="skill-template">` render as emphasis (Markdown is not applied inside HTML blocks). Underscores are not converted: game output uses `____` divider lines. A `* ` line inside a sample stays literal game text.
- `tec-skill-pages.js` no longer removes blank lines inside skill samples; one blank line is a gap between steps, two a larger gap.




### GitHub organization transfer

- Repository ownership moved from `herdias/tec-wiki` to `Eternal-City-Community/tec-wiki`.
- The ChatGPT Codex Connector is installed for the `Eternal-City-Community` organization and retains admin/write access to the repository.
- Decap CMS backend configuration was updated to use `Eternal-City-Community/tec-wiki`.
- Future TEC Wiki work should use the organization repository as the canonical source.



### Cloudflare Git integration after organization transfer

- Cloudflare Workers Builds was reconnected to the canonical organization repository: `Eternal-City-Community/tec-wiki`.
- Production branch remains `main`.
- The existing Worker/deployment remains `tec-wiki`.
- Future pushes to `main` should trigger Cloudflare builds from the organization-owned repository.

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


### What's New and editor starter templates

- Added a reader-facing `/whats-new/` page generated from local Git history during the MkDocs build.
- The feed is page-oriented: repeated edits to one page collapse to its latest edit; `docs/admin/`, the What's New page itself, and Page History are excluded.
- The full page offers 7-, 30-, and 90-day views. The homepage shows up to five recent wiki page changes from the last 30 days.
- Added new-page starter templates to the Decap editor: Blank page (default), Combat Skill based structurally on Tridents, and Crafting Skill based structurally on Jewelry.
- Templates only seed the Body field and do not add template metadata or create a runtime dependency. Mechanics/trainer values/commands remain placeholders until confirmed for the new page.
- The Body editor is Markdown only (`modes: [raw]`); rich text mode is off. Starters are inserted from a "Templates" menu in the Body toolbar (`docs/admin/tec-cms-templates.js`), which replaces Decap's disabled formatting buttons.
- The editor's field pane is dark by default; a "Dark mode" switch in the top bar turns it off, remembered per browser (`tec-cms-editor-theme.js`, `tec-cms-editor-dark.css`).
- Corrected the Worker Page History repository target to the canonical organization repository.

- 2026-10-07: Cloudflare missed the automatic build trigger for commit `4e2ca2355ad23a29f8670c2e184e7bb2db319048`; follow-up commit created to retrigger the Git integration.


### Interactive Trait Calculator (2026-10-10)

- Added `/trait-calculator/` with 93 traits sourced from `docs/traits.md` (10 neutral, 47 positive, 36 negative).
- Source files: `docs/trait-calculator.md`, `docs/javascripts/tec-trait-calculator.js`, `docs/stylesheets/tec-trait-calculator.css`.
- Added navigation in `mkdocs.yml` and link from `docs/traits.md`.
- Calculator enforces 5 positive / 5 negative / 1 neutral, zero-or-negative balance, and explicitly documented mutual exclusions. Displays source descriptions, rather than inventing stacking rules.
- Google Drive 'Trait Selector' example spreadsheet (new copy) confirms 9 positive / 9 negative and Ox's Grace neutral.
- Last enabling commit: `9c0a407acec8400d542ac280f9736ec603ab942c`.

- 2026-10-10 UX revision: calculator changed to a full-width responsive parchment dashboard with contrasting trait cards, left search/type filters, center scrollable desktop grid, right selected-traits/effects summary, and mobile stacking. JS commit `b5c8b05eba0cf7091349067bc25ff91d12592621`, CSS commit `3fb8e580079adf60f3cbd8f774f66b016cebeba8`.

- 2026-10-10 layout follow-up: trait list now alphabetized by name within type filters; selected positive/negative/neutral traits are horizontal chips above the list; search moved immediately under balance; right-side effects summary widened and no longer internally scrolls. Main JS commit `7fa82898c0db374ba67340fb1330a976b733639c`; CSS commit `04dda39ba6659869a91dd1e693e2c856ac881ac7`.

### Dual Axes verified action prerequisites (2026-10-10)

- User-confirmed terminology: **Capable** means rank 40; **Learned** means rank 30.
- Sundering Chop, Flank Hew, and Hand Cleave require Capable (rank 40) in Dual Axes Rotating Chop.
- Wolf's Hew requires Learned (rank 30) in Rotating Chop and Head Butt.
- Wolf's Gyre requires Learned (rank 30) in Rotating Chop and Sweeping Cleave.
- Recorded in `docs/dual-axes.md` prerequisite table; do not assume other prerequisites without confirmation.

### Confirmed TEC attribute mechanics (user confirmation 2026-10-10)

- Raw attributes range from 0 to 200. The 200 raw-stat ceiling is not a hard cap on effective attributes after traits.
- Trait bonuses can raise effective attributes above 200; Steady Hands gives +10% Dexterity, so raw Dexterity 200 can yield effective Dexterity 220.
- User confirmed the stat-tier ranges, trait-adjusted stat calculations, and derived offense/defense/HP/carrying-capacity formulas shown in their 2026-10-10 character planner screenshots are correct. Preserve these as confirmed mechanics when adding stats to the trait calculator. Do not assume unconfirmed rounding rules; screenshots display ranges.

### Trait Calculator character stat planner (2026-10-10)

- Implemented expandable Character Stats & Bonuses section below selected trait chips in `docs/javascripts/tec-trait-calculator.js`; styling in `docs/stylesheets/tec-trait-calculator.css` and instructions in `docs/trait-calculator.md`.
- All 13 stats support wiki descriptive tiers (Abysmal 0–50 through Outstanding 191–200) or exact raw input 0–200. Effective stats and effective raw-200 caps include numeric trait modifiers, including exceeding 200.
- Stat modifiers mapped from documented Traits page; multiple percentages add as in user-confirmed planner screenshot. Night Owl includes selectable day/night conditions. Conditional non-stat bonuses remain descriptive.
- Derived offense = Dexterity/2 + Perception/4 + Empathy/4 + Strength/10; defense = Agility/2 + Speed/4; HP = Endurance; significant load = Strength/2 (+30 lbs with Heavy Arms); maximum load = Strength*1.5 (Strength*2.5 with Mule's Back). Bows flip Dexterity/Perception weighting. Rounded values are display estimates; in-game rounding is not asserted.
- Implementation commits: JS `a6447cfed96ad7662e695ff360c8479c86c6162a`, CSS `df269792bacd418cbb71a942e3d1b51f90be92a2`, documentation `1f9bea4d7e8be877066e4302a38efc6a72c2d349`. JavaScript syntax was checked successfully; live browser/deployment not yet verified.

- 2026-10-10 user correction: Strength/10 (10:1) offense contribution is weapon-dependent, not universal. Removed it from the Trait Calculator's generic Offense from stats calculation. Generic displayed offense is Dexterity/2 + Perception/4 + Empathy/4, with a note that weapon-specific Strength modifiers are excluded. Do not reintroduce Strength/10 into a universal offense formula. Commit `484b178d21e1a242de5d4a7b22f0d3f190fdba51`.

### Dual Axes momentum and commands (user-confirmed 2026-10-12)

- Momentum ranges from 0 to 5 (full). Alternating left/right-hand attacks builds it; repeating the same strike stalls without changing momentum. In-game messages for each level, reset, stall, and spending 2 are documented verbatim in `docs/dual-axes.md`.
- Momentum builders: Rotating Chop (`rotchop`), Offhand Chop (`offchop`), Poll Smash (`pollsmash`), Offhand Crush (`offcrush`), Onslaught (`onslaught`), Offhand Pivoting Jab (`offpivot`).
- Momentum minimums: Flank Hew unknown (target snared/entangled); Frenzied Hack 3 (berserk); Hand Cleave 2; Harrowing 5; Wolf's Hew 3; Sundering Chop 3; Sweeping Cleave 2; Wolf's Gyre 3; Twin Fangs 3 (can consume up to 5).
- Commands for spenders: `flankhew`, `fhack`, `handcleave`, `harrow`, `wolfshew`, `sunderchop`, `sweepcleave`, `wolfsgyre`, `twinfangs`. Requirements for Rotating Chop, Head Butt, and Sweeping Cleave ranks remain documented above.
- Distinguish momentum required from momentum actually consumed; do not infer an exact spend from a minimum unless independently verified.

### Veteran Characters (user-confirmed 2026-10-13)

- Free VC packages are redeemed through `@perks`. During new character creation, players may upgrade a redeemed package by paying the RP difference between desired and issued package prices; the prior `@request` upgrade instruction is obsolete.
- Only one redeemed VC package can be pending character creation at a time.
- VC lobby attribute points cannot increase Empathy, Charisma, or Appearance; these require Story Points.
- Updated `docs/veteran-characters.md` in commit `a269e4ed853d56ac353de5e560d3b7bc59a2fddb`.


## Public Character Biography Submission (2026-10-14)

- User approved automatic publishing, guided form, portrait uploads, and verified-email-based subsequent editing.
- Existing migrated biographies stay editor-managed. Basic fields: name, nationality, appearance, background, history, affiliations, portrait, optional freeform.
- Implementation and required infrastructure documented in `docs/admin/biography-submission-implementation.md` (commit `4c88d0d470c200f6a62ea6badfa3feccb97dea43`).
- Not live yet. Requires restricted GitHub App, Cloudflare D1, Turnstile, verified email sender/provider, implementation and staging validation before public exposure.

- **2026-10-14 scope revision:** User deferred all self-service biography editing. Public guided form + optional portrait + automatic new-page publishing and alphabetical directory remain in scope; edits are handled by wiki editors. No email verification or ownership database. Simplified spec: `docs/admin/biography-submission-implementation.md` (commit `aedc356719a3d64714329a5b671564647d03ab9d`).

- **2026-10-14 later decision supersedes deferral:** User approved private editing codes for new biographies and wiki-owner reset/revoke. No email system. Existing bios stay editor-managed. Implement using Cloudflare KV and strong code hashing, rate limiting, admin GitHub allowlist. Updated spec `docs/admin/biography-submission-implementation.md` (commit `e6dd85f65b8cc1541be736f36efc5f10a323800a`).
- Implementation started: `hooks/biography_index.py` auto-sorts existing cards and new `character_name` metadata at build time; enabled in `mkdocs.yml` (commits `ef14097a61320b7a7ffab3e9c37e9be4d87e7c95`, `96af4eac757fbbea935a0ffdcbf902f6a7b21a6c`). Public API/form not yet implemented or enabled.

## Biography submission progress (2026-10-14)

- Cloudflare KV binding is committed in `wrangler.jsonc` (commit `6dcca54bf5823df0c711c4e413191c6454c0194d`).
- `docs/submit-bio.md` is a noninteractive placeholder clearly marking public submissions as unavailable (commit `36ef2c674d3fc51aee7b5b4fd9592991e1d98db9`). It is not linked from navigation.
- Do not claim the guided form, portrait uploads, private editing, owner resets, or publishing API are implemented. These are the next development tasks. The existing biography directory build hook was added earlier.

- **2026-10-14 biography UI:** Added draft-only guided form at `docs/submit-bio.md` and `docs/javascripts/tec-bio-submit.js` (commits `3d2eb0a5d14a864c9a12d1952ae61f6a587d0f4f`, `8b1ec96d9e9c47015332ab97d61bea051da48979`). Preview and copy actions only; no public publishing API, portrait upload, or private-code editing yet. GitHub org owners are approved admins; backend must verify current owner role server-side and fail closed.

- **Mandatory pre-commit validation (user directive, 2026-10-14):** Before EVERY TEC Wiki commit, check syntax of all changed code/config files (JavaScript parse, Python compilation, YAML/JSON parse as applicable), check Markdown/HTML structure and relevant references, and run a site build when tooling permits. Do not commit known syntax errors. If a check cannot be performed, explicitly report that limitation; distinguish syntax checks from successful build and live verification. This follows the biography app regression caused by a JavaScript syntax error.

- **2026-10-14 backend stage 1:** `src/bio-validation.js` added (commit `dc0c038da0f98f475e8b515a472d2666ef609342`), with server-side field checks, nationality allowlist, multiple organizations including custom names, slug derivation, and Markdown generation with bullet affiliations. Module was syntax-checked and smoke-tested after commit. Not yet imported by Worker; no public publishing, portrait upload, editing, or owner reset endpoint exists. Next: security-reviewed Turnstile/rate-limited Worker submission flow with safe GitHub collision handling, code issuance, and integration tests before enabling any writes. Keep public draft mode active. User prefers removing duplicate intro line alongside draft-mode notice at launch.

- **2026-10-14 biography publishing helper:** Added `src/bio-github.js` (commit `693a3721ac7003a41216e0288c3a395b1106af2b`), a create-only GitHub Contents helper restricted to `docs/bio_<slug>.md` on `main`, with existence/conflict handling and UTF-8 encoding. JavaScript syntax checked before commit. Not yet connected to a public Worker write endpoint. Remaining: robust abuse controls, private-code lifecycle and recovery, portrait handling, end-to-end testing before enabling public writes.

- **2026-10-14 editing-code cryptography:** `src/bio-turnstile.js` now also exports `generateBiographyEditCode`, `hashBiographyEditCode` (HMAC-SHA256 keyed by a server secret), and `verifyBiographyEditCode` (constant-time comparison); commits `00da06784638cd67c43110bcf3c1617f517031ec`, `aa3382d73eb77fa607b0295387cf0f02a605fca7`, `e38ab685e2e54c85fb5c38c286cee154beca3fdc`. JavaScript syntax checked before each commit. The originally proposed separate `src/bio-edit-codes.js` file could not be created through the connector, so existing helper module was used. **Not yet wired to KV, rate limiting, publication, or editing endpoints.** The HMAC requires a distinct high-entropy Worker secret (not configured/verified); do not reuse Turnstile or GitHub tokens as pepper. Public submission remains disabled. Full build/live integration tests not performed.

- **2026-10-14 Cloudflare secret confirmation:** User reports `BIO_EDIT_CODE_SECRET` added to `tec-wiki` Worker. `src/bio-turnstile.js` now includes KV pending/active code record helpers (commit `6b78aa6a9f87fbcd04893bba94ea993efc793e1a`); `src/worker.js` exposes read-only `/api/bio/configuration` returning `ready` and `publication_enabled:false` (commit `9341e16479b8e2ee9199cd288dfbdb0ad57c513b`). JS syntax checks passed before commits. **No public write endpoint enabled.** KV eventual consistency means pending/active lifecycle alone does not provide atomic uniqueness; design concurrency and rollback/recovery before activation. Full MkDocs/Worker build and live API tests not run. Next: safe, rate-limited publication transaction, recovery, edit endpoint, owner verification, portraits, launch tests.

- **2026-10-14 runtime configuration verified by user:** Production `/api/bio/configuration` returned `ready:true`, with `kv_binding`, `editing_code_secret`, `github_publisher_secret`, and `turnstile_secret` all `true`; `publication_enabled:false` remains intentional. User identified and corrected distinction between Cloudflare Build variables/secrets and Worker Runtime variables/secrets. This verifies binding presence, NOT credential validity or successful GitHub publishing. Next: implement and test secure rate-limited publishing, KV edit-code lifecycle/recovery, edits, portrait uploads, and organization-owner administration; do not enable public submissions until reviewed and tested.

- **2026-10-14 publishing route staging:** `src/worker.js` now imports biography Markdown generation, create-only GitHub publishing helper, and editing-code lifecycle functions; `/api/bio/publish` route is present but **hard-disabled** (HTTP 503 for POST; 405 for other methods). Commits `1e33a685769c8d5bf380890dfea3428d74e0a308` and `dbb08bd28ca0f634c2b7a5d7f61d214d91235615`; JavaScript syntax checked before each commit. This is not a functional publishing endpoint yet. Cloudflare KV is eventually consistent and cannot by itself guarantee atomic rate limiting/locks; need strongly consistent concurrency controls, safe code issuance and partial-failure recovery, content/portrait checks, and integration tests before enabling writes. No user action needed yet.

- **2026-10-14 Durable Object foundation:** `wrangler.jsonc` declares `BIO_COORDINATOR` Durable Object binding, `BiographyCoordinator` class and SQLite migration `bio-coordinator-v1` (commit `cd888e1e30dfc2ef9119f92b16a0e2c7ff13e8f7`). `src/worker.js` exports matching fail-closed class responding 503 (commit `6247788d79f580c73f72b27eafc86a967675a1e3`). JSON and JS syntax checked before commits. **Coordinator does not yet implement rate limiting, locking, or publishing**; public publish endpoint remains 503. Verify Cloudflare deployment succeeds before further changes. Next: strongly consistent coordinator request logic, integration, recovery and tests.

- **2026-10-14 coordinator reservation milestone:** Commit `8c8bc2f3a1397a26eaa66564bfa3ed4214bf2302` adds SQLite-backed `bio_limits` and `bio_claims` tables in `BiographyCoordinator`, a transactional `reserve` action, 5 attempts/hour per supplied 64-hex identity, and duplicate-slug reservation rejection. JS syntax checked. **Not production-ready:** the coordinator is not wired to `/api/bio/publish`; the identity must be generated server-side as a privacy-preserving keyed hash of requester IP, not trusted from clients; there is no reservation expiry, commit/fail state machine, partial-publish recovery, or retention cleanup. Public publish endpoint still returns 503. Next: implement complete state machine and securely authenticated internal coordinator calls, verify Cloudflare deployment and test rate limiting, then integrate Turnstile and GitHub publication while retaining launch gate.

- **2026-10-14 coordinator lifecycle and identity helpers:** Commit `affed38fdf005bbfa8a8ae2f74e268e56f217ab1` adds transactional `reserve`, `complete`, `release` (review-only), and `inspect` actions with reservation tokens and recorded GitHub commit SHAs. Reservations are deliberately never automatically recycled due to ambiguous GitHub write outcomes; `release` marks `review` rather than deleting. Commit `620d8e70601d614bab27b7e4449209b17ef009b1` adds server-side HMAC-SHA256 pseudonymous rate identity from CF-Connecting-IP and a Durable Object stub caller, both **not yet invoked by public publishing**. JS syntax checked. **Critical remaining work:** server-controlled publication flow, safe one-time editing code activation/recovery, reconciliation of stuck claims, verify GitHub PAT and real deploy, abuse testing, portrait and owner admin. The coordinator currently trusts identity/reservation values sent by its internal caller, so never expose its stub to public inputs. `/api/bio/publish` stays HTTP 503. No live end-to-end test or deployment verification performed for these commits.

- **2026-10-14 retry succeeded:** Commit `211af0a8e7f803cd09c6e01bb06817b770af08a4` updates `activateBiographyCode` to calculate the active record from the supplied code and secret without a potentially stale KV read. Commit `022d870dde62ee969f67fdf00fcc377c47f875a4` updates its Worker caller to supply those arguments and corrects the returned biography URL to `/<bio_slug>/`. Both passed JavaScript syntax checks. **Public publishing remains hard-disabled.** Need to verify Cloudflare deployment, test end-to-end publishing with a controlled fixture, and resolve partial-failure recovery, code ownership integrity, portrait upload and editing/admin flows before launch.

- **2026-10-14 automated test pass:** Ran source-level JavaScript checks against fetched current repository code: 9/9 passed (validation, slug, affiliations, invalid content rejection, launch gate, editing-code caller, URL). Ran mocked GitHub helper tests: 4/4 passed after correcting the test harness's missing `TextEncoder` mock (initial harness failures were environmental, not production failures). Found that all HTTP 422 responses were being mislabeled conflicts; fixed `src/bio-github.js` in commit `a03b148776bd7cb64ad336db74459b461538efaa` to recheck file existence and throw on non-conflict validation errors. Retested 4/4 including both 422 cases. These are in-tool simulated tests, **not a real Cloudflare runtime, Durable Object, KV, Turnstile or end-to-end publication test**. Public publishing remains disabled. Next: durable automated test suite in repository, mocked coordinator/KV failure matrix, isolated staging tests, code issuance/recovery before launch.

- **2026-10-14 recovery regression suite:** Commit `12de0b3778bc61faea26ac8fd2716114015dec8e` adds `tests/biography.test.mjs` with seven Node built-in tests covering pending-code hash, stale KV reads, pending KV outage, activation KV outage, existing GitHub page protection, ambiguous GitHub timeout, and HTTP 422 validation handling. Run via `node --test tests/biography.test.mjs` in a checkout configured for ESM. **Tests were committed but not executed in a repository checkout** (runtime network access to GitHub raw files unavailable); do not claim a passing suite. Durable Object transactional tests, recovery tooling, owner-only reset, and staging tests remain outstanding. Public publishing remains disabled.

- **2026-10-14 biography finalization continuation:** GitHub Actions regression suite #2 passed (user screenshot). Security commit `033a57cee7789716c0db3a8993336dbfbdeac17b` requires the Turnstile hostname to be `tec-wiki.com`. Commit `cda12842596e1e12a3e39ab4c6f6b5d506695313` adds optional destination parameters to the GitHub create-only helper, allowing an isolated staging repository and disallowing a non-main branch in the production repository. Commit `b085142b067e147ae8d0155d0563de5034c7bfc3` adds two regression tests for staging isolation; CI results for these changes have not yet been verified. **Public publishing remains disabled.** NOT READY: need Durable Object transaction tests, authenticated admin recovery/reset/revoke, owner edit flow, portrait support, staging Worker/KV/DO with distinct GitHub token, end-to-end publication and recovery validation. Do not claim these are finished or turn on public publishing.

- **2026-10-14 player editing groundwork:** Added `src/bio-edit.js` with GitHub SHA-guarded read/update helpers in `b5c02a0beded6df1d2eb38d2de3e3c0b0843f047`. Added gated `/api/bio/edit` endpoint in `7c6cd892bada0704ff10471c60dfdb0dd09bba6b`, verifying active KV edit-code HMAC and expected GitHub blob SHA before updating. Added three regression tests in `7924faeab7e4aec288714a610287f21309698d42`; CI results not yet verified. **Editing and publishing remain hard-disabled.** This is groundwork only: no player UI, no secure admin recovery/reset/revoke, no portrait support, no production integration validation. Do not activate until those controls are implemented and reviewed. Note `src/bio-edit.js` has an unused `biographyFileExists` import to clean up.

- **2026-10-14 name fields:** User confirmed biography form needs required first name and optional last name, concatenated with one space for the page title and slug. `src/bio-validation.js` now accepts `first_name`/`last_name` and derives `character_name` (commit `28c7cd0024f68dab3a29af5cf3729069637452f8`); draft form now collects split names (commit `0da22c3ddf48947375cd8f68d9427fcab02dd426`). Existing `character_name` payloads remain accepted for compatibility. Tests for split names and remaining editing/admin/portrait workflow are outstanding; attempts to commit the additional tests were blocked. **Publishing and editing remain disabled.** User explicitly wants continued implementation without repeated permission requests and does not prioritize a staging environment.

- **2026-10-14 biography ownership security continuation:** Added `src/bio-owner.js` with active-code-only HMAC ownership checks (`ac63715c77be072b1196290d5dd1bdd396fb50d6`), wired gated `/api/bio/edit` to this helper (`4cf6e9dcf8683fdb232c9930b98891990819cb21`), and added five owner/legacy/invalid-code regression tests (`ae03dd90c5aaf13246cb702a8752fb8b0ce5bb47`). Added Turnstile verification to edit endpoint (`1dbcbf3ea270d0574f2866f017f7cb1709a7790c`) and removed unused import (`092e282843c38a611bdc93877171265712b72420`). Tests are committed but execution not verified. **Both public publishing and editing remain hard-disabled.** Still need rate limiting for edit-code guesses, owner editing UI with safe load, admin authenticated reset/revoke/recovery, portraits, Durable Object tests, controlled production integration tests, and explicit launch decision. Do not turn on edit endpoint without edit attempt throttling.

- **2026-10-14 launch implementation batch (user authorized completion without repeated prompts):** Added transactional edit-attempt rate limiting (10 per HMAC-IP+slug per hour) to the Durable Object (`e65540fe0584ef88bce46897abe1987c87e3e4a0`), gated ownership-verified biography loading (`4f939e9408fefac0e2d53b4d486543d96bdefb6d`), player editor page and JS (`f44bfee715a46fdc6eb6f3e14c5083ba3db5a7e1`, `3007a0082968484358c862867e864fd5b247089a`), GitHub-org-owner verification and gated reset/revoke/recovery API (`978bdfb8373799015f5bb50e40d0645c766f8713`, `c42028e866ceaa295ce7c8ef01976d05ba5e8822`), admin page and UI (`4f56318171e9628a4b6ba52ddeb03b097c8c4631`, `545d0cd53372380f502e57ee15b23627725b1241`), portrait MIME/magic/size validation and owner-authenticated publishing (`d655b946062bb31e157727f8155e0009e9538f10`, `9dd9fec33cccd528daad34914063d67b8402dd1a`), and submission publishing UI with one-time code receipt and optional portrait upload (`35203d759f1bd0d3f0d7bc15b47217b3f856e279`, `00c1424f752549eb09a462456ad637283aa346c6`). Added multiple regression files covering rate limits, coordinator duplicate claims, admin access, portraits, owner revocation/recovery and feature gates (notably `a6b5a1039214914c39d14bd6532033159da46a74`, `d3aaffaace6a46ca686798e05e7c1b09dbd695da`, `64a324e9200b37c2ebb5e3c9103fbaf5bd2ee941`, `992fdc10279f2d2e4ac9d9effbd1d6ae3ff72bdf`, `6e5bd8559f645dae1c4b3b096e0461f64d5f1e7f`). Strongly consistent Durable Object owner code activation/check/reset/revoke and aged-claim reconciliation added (`b4df38f706a9829d7d9a2aac0ac0f99c9d75cfe6`, `8d633415bd89d68f2d187c38848193d1866705`, `8279430f3a60b91b0b1fc0ebaa6c461b700d317b`, `fe91899f8af16b46b75b6660cd1625e113e3a664`, `01f62701c2099f8efbea21007dfa98b7c4c5e280`). Fixed portrait preservation on edit. `docs/admin/biography-launch-checklist.md` records operational verification requirements. **Critical: all four write feature gates remain hard-disabled, no production write performed, and new GitHub Actions results and actual Cloudflare runtime integration have NOT been verified.** Attempts to reach live `/api/bio/configuration` from the execution environment failed due network/DNS restrictions. Do not claim live launch or enable until integration/controlled production tests pass. The user does not prioritize staging.

- **2026-10-14 biography app visual consistency:** User requested `/edit-bio/` and `/admin/biography-recovery/` use the same contrasting parchment app aesthetic as `/submit-bio/`. Added shared responsive app shell/card/header/form CSS in `docs/stylesheets/tec-bio-submit.css` (`c53bd3dda982bbdea4842369786a96f10ee7f544`), updated player editing markup (`ba63d3cea760e8078f67392cd7219b50fea0b9e2`) and owner recovery markup (`5e77d5f193bf491bb2c4ae2ea2ca382d7c213fe3`). Preserved existing JS form IDs, names, event handlers and disabled launch gates. JavaScript syntax checks passed; deployed visual appearance not yet inspected.

- **2026-10-14 regression follow-up:** Extracted `biographyWithExistingPortrait` from Worker into `src/bio-validation.js` (`7e7ab07`), used it in edit route (`1f97cfa`, import fix `0d0ac53`), added portrait retention and newline regression tests in `tests/biography-names.test.mjs` (`f61ab9b`). Direct JavaScript evaluation of name/portrait preservation passed; syntax checks passed. **Full Node `npm run test:bio` not run**: container cannot resolve GitHub to obtain full repository, and GitHub connector exposes no push-run workflow listing/dispatch; GitHub Actions workflow is configured to run automatically on changes to `src/bio-*.js`, `src/worker.js`, and `tests/**`. Check Actions for commit `f61ab9b` and resolve failures before launch. Gates remain off.

- **2026-10-14 CI failure and owner recovery UX:** User supplied GitHub Actions log for `npm run test:bio`: 29 passed, 4 test files failed to load because `src/worker.js` imported `biographyWithExistingPortrait` twice. Removed duplicate import in `4c6920355034a19f2e90408bc3991c2c7a292863`. Rewrote recovery instructions in `docs/admin/biography-recovery.md` (`c32d5d59a90284fcc02c1553b74743b1dc461b36`) and clarified actions, confirmations, and results in `docs/javascripts/tec-bio-admin.js` (`0f7f11b5d9e65f45fe29a3bc7f0288cd123496a0`). Verified no duplicate named imports and admin JS syntax; **new GitHub Actions run not yet confirmed passing**. Feature gates remain disabled.

- **2026-10-14 live configuration confirmed by user:** `/api/bio/configuration` returned `ready:true` with `kv_binding`, `editing_code_secret`, `github_publisher_secret`, `turnstile_secret` all true. `publication_enabled`, `editing_enabled`, `portrait_enabled`, `admin_recovery_enabled` all false. This verifies binding presence and disabled launch gates, **not** operational GitHub/KV/DO/Turnstile integration. GitHub Actions biography regression #44 green (user screenshot). Next: controlled integration verification before enabling writes; no secret values requested.

- **2026-10-14 biography readiness hardening:** Discovered `/api/bio/configuration` omitted `BIO_COORDINATOR` despite publish and ownership depending on it. Added `coordinator_binding` to readiness in `src/worker.js` (`5e62ba6`), fail-closed regression test in `tests/biography-gates.test.mjs` (`92304ec`), and required it in read-only production smoke script (`23aad1e`). User's earlier `ready:true` response covered four components only, so coordinator binding must be rechecked after deploy. Public gates remain false. No real coordinator transaction or production write test performed.

- **2026-10-14 portrait replacement hardening:** Fixed a launch bug where uploading a replacement portrait with a different image extension left multiple image links in the biography. Added `biographyWithUploadedPortrait` in `src/bio-validation.js` (`76982d1`), wired portrait endpoint (`9f3eb82`), and regression tests for replacement/idempotency/cross-character path (`07ef558`). Syntax and duplicate-import checks passed; GitHub Actions and real Cloudflare/GitHub runtime integration still need confirmation. Public gates remain disabled.

- **2026-10-14 latest regression CI confirmed:** User supplied screenshot showing GitHub Actions biography regression runs #48, #49, #50, and #51 all green; latest #51 for commit `07ef558` (portrait replacement/idempotency/cross-character tests). Cloudflare configuration previously confirmed all five bindings present and four public gates false. Remaining blockers are real Cloudflare DO ownership lifecycle, GitHub/Turnstile/KV integration, admin OAuth, and controlled disposable production test. No public features enabled.

- **2026-10-14 restricted coordinator integration:** Added `POST /api/bio/integration-probe` (`61a184b`) protected by separately configured `BIO_INTEGRATION_TEST_SECRET` (minimum 32 characters, bearer comparison via SHA-256). Without that secret endpoint is 503; no public feature gates changed. Probe uses unique random `bio_integration_probe_...` coordinator slug and tests reserve, duplicate, complete, activate, owner check, reset, previous-code denial, revoke and final denial. Does not touch GitHub, KV, Turnstile or wiki pages. Added disabled/unauthorized/method tests (`e01caf1`). **Probe not yet executed against production**; operator must configure temporary Cloudflare secret, call endpoint, and remove secret after verification. Remaining full-system integration blockers unchanged.

- **2026-10-14 live coordinator integration PASSED:** User ran `POST /api/bio/integration-probe` on production with temporary Cloudflare runtime secret; screenshot shows `passed:true` and all 12 results true: initial, reserved, duplicate_rejected, completed, activated, old_code_allowed, wrong_code_denied, reset, old_code_denied_after_reset, new_code_allowed, revoked, code_denied_after_revoke. This validates real DO SQL transaction lifecycle only; no GitHub/KV/Turnstile/portrait/admin OAuth integration tested. **Operator must delete `BIO_INTEGRATION_TEST_SECRET` from Cloudflare and redeploy**, then verify probe returns 503. Public launch gates remain false.

- **2026-10-14 integration probe closed:** After deleting the temporary `BIO_INTEGRATION_TEST_SECRET`, user ran POST `/api/bio/integration-probe` and supplied PowerShell screenshot showing `{\"error\":\"Integration probe is disabled\"}` (expected HTTP 503). Temporary probe is now confirmed inaccessible. Live DO lifecycle passed all 12 checks. Next: restricted KV and GitHub publishing integration without enabling public submissions; keep all launch gates off.

- **2026-10-14 restricted KV/GitHub connectivity test prepared:** Added `POST /api/bio/storage-probe` in `src/worker.js` (`f780ee6`) and disabled/unauthorized/method regression tests (`549ba18`). Probe uses temporary `BIO_INTEGRATION_TEST_SECRET` (>=32 chars), writes/reads/deletes isolated expiring `bio-integration-probe:` KV key and checks authenticated GitHub repository metadata GET. Does **not** create/update wiki content and does **not** establish GitHub write permission or Turnstile correctness. Not yet run in production; await green CI, temporary runtime secret, PowerShell test, secret removal and 503 confirmation. All four public launch gates remain false.

- **2026-10-14 live KV/GitHub connectivity PASSED:** User's PowerShell screenshot of `POST /api/bio/storage-probe` shows `passed:true` and `kv_written`, `kv_read`, `kv_deleted`, `github_repository_readable` all true on production. GitHub Actions green reported. An initial 404 resolved after Worker deployment. This confirms KV round-trip/delete and authenticated GitHub repo metadata read only, **not** GitHub write, Turnstile or complete biography lifecycle. Operator instructed to remove temporary `BIO_INTEGRATION_TEST_SECRET` again and confirm disabled response before further testing. Public launch gates remain false.

- **2026-10-14 temporary integration endpoints confirmed closed:** User's PowerShell screenshot shows POST `/api/bio/integration-probe` HTTP 503 and POST `/api/bio/storage-probe` HTTP 503 after removal of `BIO_INTEGRATION_TEST_SECRET`. Live DO lifecycle and KV/GitHub read connectivity tests are complete, with both probes closed. Next test GitHub write authorization in a controlled, isolated manner; all public biography gates remain false.

- **2026-10-14 GitHub write-permission probe prepared:** Added restricted `POST /api/bio/github-write-probe` (`af3b11b`) and gate tests (`00ac8ff`). Uses short-lived `BIO_INTEGRATION_TEST_SECRET` bearer and production `BIO_GITHUB_TOKEN` to POST a unique **unattached Git blob** to `Eternal-City-Community/tec-wiki` (`/git/blobs`); does not create a tree, commit, branch, biography page, or deployment. Reports status and boolean, not secrets or blob SHA. This is safer than a test branch, given `src/bio-github.js` intentionally rejects production repo non-main destinations. Blob may remain as unreachable object until GitHub garbage collection. **Not yet executed**, wait for green CI and Worker deployment, then operator adds temporary secret, runs probe, removes secret and confirms 503. A successful blob write confirms GitHub object-write permission, NOT full Contents API publication or editing; separate controlled end-to-end test still required. Public gates remain false.

- **2026-10-14 GitHub blob write probe confirmed and closed:** User reported GitHub Actions #56/#57 green and live `/api/bio/github-write-probe` JSON `passed:true`, `github_blob_created:true`, `no_branch_or_page_modified:true`, `github_status:201`. After removing `BIO_INTEGRATION_TEST_SECRET`, user confirmed probe returns HTTP 503. This verifies unattached Git object write only, not Contents API publication. Remaining: Turnstile, end-to-end publish/edit/portrait/recovery/admin OAuth. Four public gates remain off.

- **2026-10-14 genuine Turnstile test UI prepared:** Created temporary on-domain page `docs/admin/biography-turnstile-test.md` (`e22c000`) at `/admin/biography-turnstile-test/` and browser JS `docs/javascripts/tec-bio-turnstile-test.js` (`64ceff1`). Page renders production Turnstile site key, asks operator to enter temporary `BIO_INTEGRATION_TEST_SECRET` into a password input, sends challenge token and bearer secret to protected `/api/bio/turnstile-probe`, reports only pass/fail, clears input and resets widget. Does not publish or write wiki data. User previously confirmed invalid token returned `verified:false`; genuine token verification is pending live deployment/test. Operator must remove temporary Cloudflare secret after test and verify 503. Remove temporary page and JS when tests are complete. All public biography gates remain disabled.

- **2026-10-14 live Turnstile verified:** User reported invalid token returned `verified:false`, followed by on-domain `/admin/biography-turnstile-test/` challenge returning `PASS: Real Turnstile token verified.` This confirms production Turnstile siteverify and hostname enforcement accepted a genuine token. Temporary `BIO_INTEGRATION_TEST_SECRET` removal and endpoint HTTP 503 confirmation still pending. After confirmation remove temporary test page/JS, and continue controlled biography publishing test with public gates off.

- **2026-10-14 Turnstile cleanup completed:** User confirmed HTTP 503 after removing `BIO_INTEGRATION_TEST_SECRET`. Deleted temporary on-domain Turnstile test page (`68a143e`) and its script (`c537dfe`) from `main`. Invalid-token rejection and genuine-token acceptance both passed. Public biography launch gates remain disabled. Next: safely design and execute restricted disposable biography creation and editing tests; no disposable biography has been published yet.

- **2026-10-14 controlled biography publication test prepared:** User screenshot confirms GitHub Actions biography regression #59/#60 green and Cloudflare deployment status showing latest changes ready. Restricted `/api/bio/publish-test` committed (`c74ca87`), route-gate tests (`bd9cacc`). It accepts only `Wiki Integration Test`, requires a temporary bearer secret and genuine Turnstile; public `/api/bio/publish` remains gated. Verified `docs/bio_wiki_integration_test.md` absent before testing. Added temporary browser form `/admin/biography-publication-test/` (`de1e2bb`) and script (`b84531e`) that creates a fixed disposable biography, displays the private edit code after 201, and warns against resubmission on ambiguous failure. Await deployment, then operator configures temporary `BIO_INTEGRATION_TEST_SECRET` (>=32 characters), tests once, securely retains edit code, removes temporary secret and confirms 503. Cleanup page/script and disposable biography after controlled edit/recovery testing. No biography published yet.

- **2026-10-14 controlled publication succeeded:** User showed publication-test receipt with private edit code (do not reproduce it); GitHub `main` now contains `docs/bio_wiki_integration_test.md`, fetched and verified with expected test metadata, nationality, appearance, background, and additional details. Confirms real GitHub Contents API creation. Because screenshot exposed the editing code, treat it as compromised: rotate through owner recovery before normal editing or rely on it only for tightly controlled testing followed by revocation. Need confirm temporary secret removal/503, deploy availability, and test editing/recovery; public gates remain disabled. Do not delete disposable biography until lifecycle tests are finished.

- **2026-10-14 new biography profile visual design:** User requested newly submitted biographies match parchment/olive app and calculator styling without retrofitting migrated pages. Added `hooks/biography_profile.py` (`de892bd`) to render only `bio_*.md` pages with canonical `character_name` metadata as profile hero and section cards at build time, preserving source Markdown and editing/publishing payloads. Added responsive stylesheet `docs/stylesheets/tec-bio-profile.css` (`dcae4b3`) and enabled hook/CSS in `mkdocs.yml` (`044bad8`, `817890d`). Existing legacy biographies without `character_name` metadata are unchanged. Disposable `bio_wiki_integration_test.md` is the first example. Need confirm GitHub Actions/Cloudflare build and inspect deployed page appearance; public biography gates remain disabled.

- **2026-10-14 profile heading correction:** User screenshot showed global site h2 styling overriding new profile card headings with dark green rectangular bars and oversized uppercase text. Fixed in `docs/stylesheets/tec-bio-profile.css` with tightly scoped, higher-specificity resets matching `tec-bio-submit.css` form headings (transparent background, normal-case Georgia olive title, subtle divider); also reset profile h1 global decoration and matched nationality card fill. Commit `3e03146`. User confirmed temporary integration secret removed. Await deployment screenshot to verify styling. No legacy biography changes.

- **2026-10-14 restricted editing test prepared:** Added secret-gated `/api/bio/load-test` and `/api/bio/edit-test` for `Wiki Integration Test` only (`08edc7b`), with public `/api/bio/load` and `/api/bio/edit` still disabled. Created temporary browser test page `/admin/biography-editing-test/` (`94a0631`) and test JS (`6b08c78`), then isolated its DOM mount from the public edit JS to prevent duplicate handlers (`2d42474`, `18d6de3`). User previously removed `BIO_INTEGRATION_TEST_SECRET`; a fresh >=32-character temporary value must be configured for live testing, and removed afterward. No edit performed yet. Test requires existing private editing code and fresh Turnstile token. Confirm Cloudflare deploy before testing; do not post secret or code in chat.

- **2026-10-14 restricted biography LOAD succeeded:** User screenshot of `/admin/biography-editing-test/` shows Turnstile success, test secret input, editor populated with correct Wiki Integration Test fields, and `Biography loaded. Review the details before saving.` This verifies owner-code authentication and private biography retrieval through `/api/bio/load-test`. Test UI initially unstyled because `tec-bio-submit.css` only targeted `#bio-edit-app` and `#bio-admin-app`; fixed by adding `#bio-edit-test-app` to shared selectors (commit `8eae0dc`). No save yet. Next: after deployment refresh test page, load again, make a small disposable change, and save through `/api/bio/edit-test`; verify GitHub commit and rendered page. Public editing remains disabled.

- **2026-10-14 restricted biography EDIT succeeded:** User screenshot shows styled restricted editor and `Changes saved. Reload your biography to edit it again.` Independently fetched `docs/bio_wiki_integration_test.md` from GitHub `main` (file SHA `177b804bf5c348f791fef58c887662cab2aff27e`) and confirmed Additional Details now includes `Biography editing integration test completed successfully.` Existing character name, nationality, appearance and background preserved. This verifies real code-authorized GitHub update via `/api/bio/edit-test`. Public editing and publishing remain gated off. Next: remove temporary integration secret and confirm 503; then controlled admin recovery/rotation and revoke tests, followed by cleanup of disposable character and test UI/routes. User previously indicated test edit code exposure is acceptable.

- **2026-10-14 recovery test prepared (not yet executed):** User removed temporary `BIO_INTEGRATION_TEST_SECRET` after successful editing test. Inspected `handleBiographyAdmin` and `src/bio-admin.js`: recovery requires a GitHub token belonging to an active Eternal-City-Community organization owner and validates membership with GitHub; reset changes coordinator hash and KV record. Added restricted `/api/bio/recovery-test` for only `Wiki Integration Test` and actions `inspect`/`reset` (`57755f6`), requiring fresh temporary bearer secret, while public `/api/bio/admin` remains disabled. Added temporary recovery page `/admin/biography-recovery-test/` (`05ca69c`), JS (`027d594`), stylesheet (`8c50e6f`) and MkDocs CSS registration (`669d768`). Await deployment and temporary secret reconfiguration. Operator must provide GitHub owner token locally (never in chat) and save new editing code. Then verify old code denied and new code accepted via restricted load test; remove secret, confirm 503, and clean up temporary routes/pages. No recovery action executed yet.

- **2026-10-14 recovery lifecycle PASSED:** User confirmed after successful administrator `inspect` (`status: active`, `page_exists: true`) that resetting the disposable `Wiki Integration Test` editing code invalidated the old code and the replacement code successfully loaded the biography via restricted editing test. This completes live creation/load/edit/recovery tests. Temporary `BIO_INTEGRATION_TEST_SECRET` and GitHub owner PAT should now be removed/revoked by operator; confirmation pending. Do not enable public gates yet. Cleanup still needed: temporary test pages/scripts/CSS and restricted test routes, then disposable biography and associated KV/coordinator registration with a safe cleanup plan. Preserve normal production biography endpoints and new profile styling.

- **2026-10-14 post-test cleanup:** User confirmed temporary Cloudflare integration secret removed and GitHub owner PAT revoked. Deleted temporary biography publication, editing, and recovery test pages, their three browser scripts, and recovery-test CSS. Removed disposable `/api/bio/{publish,load,edit,recovery}-test` handlers/routes from `src/worker.js` in commit `4fa827c`, restoring the original public launch gates. Removed retired test CSS reference from `mkdocs.yml` (`a590474`) and test-only selectors from biography form CSS (`e436f43`). Public biography publishing, editing, portrait, and admin recovery remain disabled. The disposable `docs/bio_wiki_integration_test.md` and its Cloudflare KV/Durable Object ownership records still require coordinated cleanup; do not delete only the Markdown without considering those records. Older authenticated integration probe routes remain in source but cannot run without the removed temporary secret. Verify deployment and cleanup before launch.

- **2026-10-14 disposable page removed:** User explicitly chose to leave any remaining Cloudflare KV and Durable Object test records in place rather than implement coordinated storage cleanup. Deleted `docs/bio_wiki_integration_test.md` from `main` in commit `a92f67f3aa9e1da5a7b90eed52ea2d197538e5a8`. The page will disappear after successful deployment. Do not attempt further Cloudflare test-record cleanup unless requested. Public biography features remain disabled.

- **2026-10-14 biography prelaunch source review (no feature gates changed):** Inspected Worker publishing/load/edit/recovery/portrait flows and `src/bio-validation.js`, `src/bio-edit.js`, `src/bio-admin.js`, `src/bio-github.js`, `src/bio-portrait.js`, `src/bio-turnstile.js`. Prior live create/load/edit/recovery tests passed. Launch blockers to evaluate: partial publication can strand reserved slug and pending KV record after failure (intentional fail-closed behavior, needs administrator reconciliation procedure); portrait GitHub upload and Markdown update are separate commits, so update conflict can leave image without biography reference; `publishPortrait` treats an existing image as success, so replacements are not supported despite replacement-oriented helper naming; test/probe routes still exist behind removed integration secret. Existing editing-code ownership, Turnstile, optimistic SHA checks, and GitHub organization-owner recovery are present. No public switches enabled. Review and repair these concerns before launch.

- **2026-10-14 biography release changes:** User explicitly requested fixes and release. Added GitHub SHA-based portrait replacement in `src/bio-portrait.js` (`1514bfe`), removed retired integration probe handlers/routes (`b2c1198`), added owner-verified admin `abandon` action for failed pending publication only when GitHub page is absent and coordinator reservation is >=15 minutes old (`913ad32`, `4bf7114`), and exposed action in recovery desk (`a73bf7a`). Enabled previously live-tested public publishing, editing/load and admin recovery gates (`1f2ab1e`); configuration now reports those true. **Portrait gate remains disabled** because portrait end-to-end publication was not live-tested and two-step GitHub writes can still leave orphaned images after update conflicts. Verify Cloudflare deployment and live `/api/bio/configuration` response before announcing operational release; external tool could not reach configuration URL. Admin abandon should be used only after checking GitHub absence. Remaining release task: live smoke test publishing/editing/recovery on new disposable character, then decide portrait rollout after test. No Cloudflare secret values stored.

- **2026-10-14 portrait live-test activation:** After user confirmed live biography creation, saving, editing, and builds, enabled portrait publishing and configuration reporting in `src/worker.js` (commit `86a7c8d2b876f8d6add09da9ee5b16105aa969c3`). This is **enabled for live validation, not yet proven working**. Test first portrait and replacement on disposable biography after deployment. Portrait GitHub asset upload and biography Markdown update remain separate commits; if latter fails, image can be orphaned. No full repository build or Node syntax/test execution was available during this connector-only change; check GitHub Actions and deployed configuration before asserting success.

- **2026-10-14 biography release readiness:** Live user validated creation, edit/load, initial portrait upload, desktop/mobile portrait display and Cloudflare deployment after repairing hook syntax. Portrait replacement and production administrator recovery have NOT been live tested. Portrait upload currently makes two GitHub Contents commits (asset, then Markdown), potentially leaving an orphan if second update conflicts; extension changes can leave unused assets. Added GitHub Actions validation workflow at .github/workflows/wiki-validation.yml (commit dd31e4c) for Python hook compile, JS syntax, biography tests and MkDocs build. Confirm workflow runs successfully and consider branch protection before community-wide announcement. Last CSS portrait width adjustment commit 2e7ca0b; deployment status not yet confirmed. Keep edit codes private. Do not mark recovery or replacement validated without live tests.

- **2026-10-14 live release smoke tests confirmed by user:** Testy McTesterson portrait replacement successfully changed the displayed image; GitHub-owner biography recovery `inspect` succeeded for the existing character. These validate replacement and non-mutating admin inspection only, not reset/revoke/abandon recovery or two-step upload failure handling. User eager to announce feature. Confirm latest Cloudflare build and GitHub Actions validation workflow before broad launch; `get_commit_combined_status` returned no statuses for handoff commit `4c02181` (not evidence of pass/failure).

- **2026-10-14 admin reset live test passed:** User performed GitHub-owner recovery reset for disposable `Testy McTesterson`; new editing code successfully loaded the biography and previous code was rejected. This validates credential rotation and old-code invalidation in production. Previous live tests also confirmed portrait replacement and admin inspect. Public launch recommended after confirming current Cloudflare deployment and automated validation workflow; revoke/abandon and partial-failure paths remain untested. Never store private edit codes or admin tokens in repo.
