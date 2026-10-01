#!/usr/bin/env python3
from pathlib import Path
from collections import Counter
import re

DOCS = Path("docs")
REPORT = Path("WIKI_AUDIT.md")

files = {p.relative_to(DOCS).as_posix(): p for p in DOCS.rglob("*.md")}
slugs = set()
for rel in files:
    if rel == "index.md":
        slugs.add("")
        slugs.add("index")
    elif rel.endswith("/index.md"):
        slugs.add(rel[:-9].rstrip("/"))
    else:
        slugs.add(rel[:-3])

counts = Counter()
broken = set()
migration_pages = []
wikidot_links = []

link_re = re.compile(r'\[[^\]]*\]\(([^)]+)\)')
for rel, path in files.items():
    text = path.read_text(encoding="utf-8", errors="replace")
    if "Migrated include" in text or "Dynamic Wikidot content" in text or "Migration note" in text:
        migration_pages.append(rel)
    counts["migrated_include"] += text.count('Migrated include')
    counts["dynamic_wikidot"] += text.count('Dynamic Wikidot content')
    counts["migration_note"] += text.count('Migration note')
    if "eternal-city.wikidot.com" in text:
        wikidot_links.append(rel)

    for href in link_re.findall(text):
        href = href.strip()
        if not href.startswith("/") or href.startswith("//"):
            continue
        target = href.split("#", 1)[0].split("?", 1)[0].strip("/")
        if not target:
            continue
        if target.endswith(".md"):
            target = target[:-3]
        if target not in slugs:
            broken.add((rel, href))

lines = [
    "# TEC Wiki migration audit",
    "",
    f"- Markdown pages scanned: **{len(files)}**",
    f"- Pages containing migration placeholders: **{len(set(migration_pages))}**",
    f"- Migrated include placeholders: **{counts['migrated_include']}**",
    f"- Dynamic Wikidot placeholders: **{counts['dynamic_wikidot']}**",
    f"- Other migration-note markers: **{counts['migration_note']}**",
    f"- Pages still containing direct eternal-city.wikidot.com links: **{len(set(wikidot_links))}**",
    f"- Unique unresolved internal links: **{len(broken)}**",
    "",
]
if broken:
    lines += ["## Unresolved internal links", ""]
    for rel, href in sorted(broken)[:500]:
        lines.append(f"- `{rel}` → `{href}`")
    if len(broken) > 500:
        lines.append(f"- …and {len(broken)-500} more")
    lines.append("")
if migration_pages:
    lines += ["## Pages requiring migration review", ""]
    for rel in sorted(set(migration_pages)):
        lines.append(f"- `{rel}`")
    lines.append("")

REPORT.write_text("\n".join(lines), encoding="utf-8")
print("\n".join(lines[:12]))
