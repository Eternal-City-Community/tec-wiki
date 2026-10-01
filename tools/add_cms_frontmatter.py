#!/usr/bin/env python3
from pathlib import Path
import re

DOCS = Path("docs")
skipped = {"admin", "stylesheets", "javascripts", "assets"}
changed = 0
untitled = []

for path in sorted(DOCS.rglob("*.md")):
    rel = path.relative_to(DOCS)
    if rel.parts and rel.parts[0] in skipped:
        continue

    text = path.read_text(encoding="utf-8", errors="replace")
    if text.startswith("---\n"):
        continue

    m = re.search(r"^#\s+(.+?)\s*$", text, re.M)
    if m:
        title = m.group(1).strip()
    else:
        title = path.stem.replace("_", " ").replace("-", " ").title()
        untitled.append(rel.as_posix())

    # YAML-safe quoted scalar.
    safe = title.replace("\\", "\\\\").replace('"', '\\"')
    new = '---\ntitle: "' + safe + '"\n---\n\n' + text
    path.write_text(new, encoding="utf-8")
    changed += 1

print(f"Added CMS title metadata to {changed} pages.")
if untitled:
    print(f"Used filename-derived titles for {len(untitled)} pages.")
