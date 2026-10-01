#!/usr/bin/env python3
from pathlib import Path
import re

DOCS = Path("docs")
SKIP = {"admin","assets","javascripts","stylesheets"}
changed = []

def norm(s):
    return re.sub(r'[^a-z0-9]+', '', s.lower())

for path in sorted(DOCS.rglob("*.md")):
    rel = path.relative_to(DOCS)
    if rel.parts and rel.parts[0] in SKIP:
        continue
    text = path.read_text(encoding="utf-8", errors="replace")
    lines = text.splitlines()
    h1_idx = next((i for i,l in enumerate(lines) if l.startswith("# ")), None)
    if h1_idx is None:
        continue
    h1 = lines[h1_idx][2:].strip()

    h2_idx = None
    for i in range(h1_idx+1, min(len(lines), h1_idx+12)):
        if lines[i].startswith("## "):
            h2_idx = i
            break
        if lines[i].startswith("# "):
            break
    if h2_idx is None:
        continue

    h2 = lines[h2_idx][3:].strip()
    if norm(h1) != norm(h2):
        continue

    # Remove duplicate heading and a single adjacent blank line.
    del lines[h2_idx]
    if h2_idx < len(lines) and lines[h2_idx] == "":
        del lines[h2_idx]
    new = "\n".join(lines).rstrip() + "\n"
    if new != text:
        path.write_text(new, encoding="utf-8")
        changed.append(rel.as_posix())

print(f"Removed redundant H2 titles from {len(changed)} pages.")
for rel in changed:
    print(rel)
