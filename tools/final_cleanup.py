#!/usr/bin/env python3
from pathlib import Path
import re

DOCS = Path("docs")
SKIP = {"assets", "admin", "javascripts", "stylesheets"}
LIST_PAGES = {
    "cult-of-ereal.md", "old-cult-of-ereal.md", "customization-guide.md", "faq.md",
    "newbie-combat-guide.md", "staves-guide.md", "praetor-guide.md", "praetor-scripts.md",
    "praetor.md", "leather-working-guide.md", "jewelry-guide.md"
}

def split_cells(line):
    s = line.strip()
    if not (s.startswith("|") and s.endswith("|")):
        return None
    body = s[1:-1]
    return [p.strip() for p in re.split(r"(?<!\\\\)\\|", body)]

def join_cells(cells):
    return "| " + " | ".join(cells) + " |"

def convert_h1_runs(text):
    lines = text.splitlines()
    fenced = False
    i = 0
    page_h1_seen = False
    while i < len(lines):
        stripped = lines[i].strip()
        if stripped.startswith("~~~") or stripped.startswith("\`\`\`"):
            fenced = not fenced
            i += 1
            continue
        if not fenced and lines[i].startswith("# "):
            if not page_h1_seen:
                page_h1_seen = True
                i += 1
                continue
            idx = []
            j = i
            while j < len(lines):
                if lines[j].startswith("# "):
                    idx.append(j)
                    j += 1
                    while j < len(lines) and lines[j].strip() == "":
                        j += 1
                    continue
                break
            if len(idx) >= 2:
                for n, k in enumerate(idx, 1):
                    lines[k] = f"{n}. " + lines[k][2:].lstrip()
                i = j
                continue
        i += 1
    return "\n".join(lines).rstrip() + "\n"

changed = []
for path in sorted(DOCS.rglob("*.md")):
    rel = path.relative_to(DOCS)
    if rel.parts and rel.parts[0] in SKIP:
        continue
    text = path.read_text(encoding="utf-8", errors="replace")
    orig = text

    text = text.replace("@<&#124;>@", "|")
    text = re.sub(r"\*\*@<\*\*>@\*\*([^*\n]+)", r"**\1", text)
    text = re.sub(r"\*\*@<\*\*>@([^*\n]+)\*\*", r"**\1**", text)
    text = re.sub(r"\*\*@<\*>@([^*\n]+)\*\*", r"**\1**", text)

    if path.name in LIST_PAGES:
        text = convert_h1_runs(text)

    lines = text.splitlines()
    i = 0
    while i < len(lines):
        if not lines[i].lstrip().startswith("|"):
            i += 1
            continue
        j = i
        block = []
        while j < len(lines) and lines[j].lstrip().startswith("|"):
            cells = split_cells(lines[j])
            if cells is None:
                break
            block.append(cells)
            j += 1
        if len(block) >= 2 and len({len(r) for r in block}) == 1:
            while len(block[0]) > 1 and all(r[-1] == "" for r in block):
                for r in block:
                    r.pop()
            for off, row in enumerate(block):
                lines[i + off] = join_cells(row)
        i = max(j, i + 1)
    text = "\n".join(lines).rstrip() + "\n"

    if path.name == "armor.md":
        text = text.replace("Right foot, left foot\\|", "Right foot, left foot")

    if text != orig:
        path.write_text(text, encoding="utf-8")
        changed.append(rel.as_posix())

print(f"Changed {len(changed)} pages")
for p in changed:
    print(p)
