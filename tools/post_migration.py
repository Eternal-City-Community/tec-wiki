#!/usr/bin/env python3
from pathlib import Path
import html
import re

DOCS = Path("docs")
ALIASES = {
    "slings": "sling",
    "your-account": "account",
    "time-and-dates": "dates-and-time",
    "national-bonuses": "national-advantages",
    "blackvine": "village-of-blackvine",
    "seld": "village-of-seld",
    "stromheim": "village-of-stromheim",
    "vetallun": "town-of-vetallun",
    "franlius": "town-of-franlius",
    "rock-valley": "town-of-rock-valley",
    "hg-black-hand-caves": "hg-black-hand-caverns",
}

stats = {"aliases": 0, "stubs": 0, "wikidot_links": 0, "attachment_links": 0, "pseudo_includes": 0}

def titleize(s):
    return " ".join(x[:1].upper() + x[1:] for x in s.replace("_", " ").replace("-", " ").split())

def slugs():
    return {p.stem for p in DOCS.glob("*.md")}

# Rebuild character-bio index after ListPages is removed.
bios = []
for p in DOCS.glob("bio_*.md"):
    t = p.read_text(encoding="utf-8", errors="replace")
    m = re.search(r"^#\s+(.+)$", t, re.M)
    title = m.group(1).strip() if m else titleize(p.stem[4:])
    bios.append((title, p.stem))
bios.sort(key=lambda x: x[0].lower())

body = [
    "# Character Bios",
    "",
    "Character biographies preserved from the original community wiki.",
    "",
    '<div class="bio-grid">',
]
for title, slug in bios:
    body += [
        '<article class="bio-card">',
        '<h3><a href="/' + slug + '/">' + html.escape(title) + '</a></h3>',
        '<a class="bio-card__more" href="/' + slug + '/">Read biography</a>',
        "</article>",
    ]
body += ["</div>", "", "**" + str(len(bios)) + " biographies** are preserved in the migrated archive.", ""]
(DOCS / "character-bios.md").write_text("\n".join(body), encoding="utf-8")

existing = slugs()

# Convert old /local--files/... attachment URLs to WDFiles temporarily.
# The attachment-import workflow later localizes these to /assets/wikidot/...
attachment_rel = re.compile(
    r"(?:https?://eternal-city\.(?:wikidot|wdfiles)\.com)?/local--files/([^/\s)]+)/([^\s)]+)",
    re.I,
)
pseudo_include = re.compile(
    r"^> \*\*Archive include:\*\* \[[^\]]+\]\(/_(?:modules|csi|scp|snippets)[^\)]*\)\s*$",
    re.M | re.I,
)
mdlink = re.compile(r"\]\(/([^/#?)]+)([^)]*)\)")
wikidot = re.compile(r"\]\(https?://eternal-city\.wikidot\.com/([^#?)]+)([^)]*)\)", re.I)

for p in DOCS.glob("*.md"):
    text = p.read_text(encoding="utf-8", errors="replace")

    # Earlier migration passes may have prepended a Wikidot/WDFiles hostname
    # to an already-local /assets/wikidot/ path. Normalize those first.
    text = re.sub(
        r"https?://eternal-city\.(?:wdfiles|wikidot)\.com/assets/wikidot/",
        "/assets/wikidot/",
        text,
        flags=re.I,
    )

    text, n = pseudo_include.subn("", text)
    stats["pseudo_includes"] += n

    def attachment(m):
        stats["attachment_links"] += 1
        return "https://eternal-city.wdfiles.com/local--files/" + m.group(1) + "/" + m.group(2)
    text = attachment_rel.sub(attachment, text)

    def oldsite(m):
        stats["wikidot_links"] += 1
        return "](/" + m.group(1).strip("/") + "/" + m.group(2) + ")"
    text = wikidot.sub(oldsite, text)

    # Also rewrite bare same-site Wikidot URLs found inside HTML or legacy text
    # when the referenced page exists in the migrated corpus.
    bare_wikidot = re.compile(r"https?://eternal-city\.wikidot\.com/([A-Za-z0-9:_-]+)(#[A-Za-z0-9_.:-]+)?", re.I)
    def bare_local(m):
        target = m.group(1).replace(":", "_").lower()
        target = ALIASES.get(target, target)
        if target in existing:
            stats["wikidot_links"] += 1
            return "/" + target + "/" + (m.group(2) or "")
        return m.group(0)
    text = bare_wikidot.sub(bare_local, text)

    def alias(m):
        target = m.group(1)
        suffix = m.group(2)
        dest = ALIASES.get(target)
        if not dest and target not in existing:
            bio = "bio_" + target
            if bio in existing:
                dest = bio
            elif target.replace("-", "_") in existing:
                dest = target.replace("-", "_")
            elif target.replace("_", "-") in existing:
                dest = target.replace("_", "-")
        if dest and dest in existing:
            stats["aliases"] += 1
            return "](/" + dest + suffix + ")"
        return m.group(0)

    text = mdlink.sub(alias, text)

    if p.name == "two-handed-crushing.md":
        text = text.replace("Bruise<br><br>Bruise", "Bruise")

    # A couple of legacy inline constructs survive normal Wikidot conversion.
    text = text.replace("[[source](", "[source](")
    if p.name == "aoden-hunting-guide.md":
        text = text.replace("1s @@", "1s")
    if p.name == "newbie-combat-guide.md":
        text = text.replace("http://eternal-city.wikidot.com/combat-skills", "/combat-skills/")
    if p.name == "shops.md":
        text = text.replace('a.href = "https://eternal-city.wikidot.com/" + locObj[2];', 'a.href = "/" + locObj[2] + "/";')

    text = re.sub(r"\n{4,}", "\n\n\n", text)
    p.write_text(text, encoding="utf-8")

existing = slugs()

# Create preservation stubs for references whose source was absent from the backup.
missing = set()
for p in DOCS.glob("*.md"):
    text = p.read_text(encoding="utf-8", errors="replace")
    for m in re.finditer(r"\[[^\]]*\]\(/([^/#?)]+)", text):
        target = m.group(1)
        if target not in existing and not target.startswith(("_", "http_")):
            missing.add(target)

for target in sorted(missing):
    if target in slugs():
        continue
    legacy = "https://eternal-city.wikidot.com/" + target
    stub = (
        "# " + titleize(target) + "\n\n"
        "This page is referenced by the migrated TEC wiki, but its source was not present in the Wikidot backup.\n\n"
        "The reference has been preserved so old links do not become a 404. "
        "[Check the legacy Wikidot page](" + legacy + ") if it is still available.\n"
    )
    (DOCS / (target + ".md")).write_text(stub, encoding="utf-8")
    stats["stubs"] += 1

# Native-search replacement.
(DOCS / "search_site.md").write_text(
    "# Search the Site\n\n"
    "Use the **Search** field in the wiki header. The new site search indexes the migrated Markdown pages directly.\n",
    encoding="utf-8",
)

report = Path("POST_MIGRATION_REPORT.md")
report.write_text(
    "# Post-migration cleanup report\n\n"
    "- Character biographies indexed: **" + str(len(bios)) + "**\n"
    "- Legacy aliases rewritten: **" + str(stats["aliases"]) + "**\n"
    "- Same-site Wikidot links rewritten locally: **" + str(stats["wikidot_links"]) + "**\n"
    "- Legacy attachment links normalized: **" + str(stats["attachment_links"]) + "**\n"
    "- Wikidot system include placeholders removed: **" + str(stats["pseudo_includes"]) + "**\n"
    "- Missing-source preservation stubs created: **" + str(stats["stubs"]) + "**\n",
    encoding="utf-8",
)
print(report.read_text())
