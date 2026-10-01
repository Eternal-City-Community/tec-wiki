#!/usr/bin/env python3
from pathlib import Path
import re

DOCS = Path("docs")
REPORT = Path("FORMAT_REPAIR_REPORT.md")

stats = {
    "files_scanned": 0,
    "files_changed": 0,
    "anchors_fixed": 0,
    "orphan_pipes_removed": 0,
    "orphan_underscores_removed": 0,
    "duplicate_separators_removed": 0,
    "community_notes_fixed": 0,
}
changed_files = []

def repair_table_block(lines):
    if len(lines) < 2:
        return lines, 0

    out = []
    sep_seen = False
    removed = 0

    for idx, line in enumerate(lines):
        is_sep = bool(re.match(r'^\|(?:\s*---\s*\|)+\s*$', line))
        if is_sep:
            if not sep_seen:
                out.append(line)
                sep_seen = True
            else:
                removed += 1
            continue
        out.append(line)
    return out, removed

for path in sorted(DOCS.rglob("*.md")):
    stats["files_scanned"] += 1
    original = path.read_text(encoding="utf-8", errors="replace")
    text = original

    # First-pass converter occasionally dropped the opening '<' on HTML anchors.
    text, n = re.subn(r'(?<!<)\ba id="([^"]+)"></a>', r'<a id="\1"></a>', text)
    stats["anchors_fixed"] += n

    # Clean raw Wikidot row closers that escaped conversion.
    text, n = re.subn(r'\s*\|\|\s*$', '', text, flags=re.M)
    stats["orphan_pipes_removed"] += n

    # Wikidot uses a lone underscore as a forced line-break marker.
    text, n = re.subn(r'^\s*_\s*$', '', text, flags=re.M)
    stats["orphan_underscores_removed"] += n

    # Normalize Community Note wrappers left with an unmatched leading bracket.
    text, n = re.subn(r'\[\*\*Community Note:\*\*', r'**Community Note:**', text)
    stats["community_notes_fixed"] += n

    # Remove duplicate Markdown table separator rows inside a single table.
    lines = text.splitlines()
    rebuilt = []
    i = 0
    while i < len(lines):
        if lines[i].startswith("|") and i + 1 < len(lines) and re.match(r'^\|(?:\s*---\s*\|)+\s*$', lines[i+1]):
            block = [lines[i], lines[i+1]]
            i += 2
            while i < len(lines) and (lines[i].startswith("|") or not lines[i].strip()):
                if lines[i].startswith("|"):
                    block.append(lines[i])
                i += 1
            repaired, removed = repair_table_block(block)
            stats["duplicate_separators_removed"] += removed
            rebuilt.extend(repaired)
            rebuilt.append("")
            continue
        rebuilt.append(lines[i])
        i += 1
    text = "\n".join(rebuilt)

    # Collapse excessive blank lines introduced by cleanup.
    text = re.sub(r'\n{4,}', '\n\n\n', text).rstrip() + "\n"

    if text != original:
        path.write_text(text, encoding="utf-8")
        changed_files.append(path.relative_to(DOCS).as_posix())
        stats["files_changed"] += 1

lines = [
    "# Formatting repair report",
    "",
    f"- Files scanned: **{stats['files_scanned']}**",
    f"- Files changed: **{stats['files_changed']}**",
    f"- Broken HTML anchors repaired: **{stats['anchors_fixed']}**",
    f"- Raw Wikidot row closers removed: **{stats['orphan_pipes_removed']}**",
    f"- Lone Wikidot line-break markers removed: **{stats['orphan_underscores_removed']}**",
    f"- Duplicate Markdown table separators removed: **{stats['duplicate_separators_removed']}**",
    f"- Community Note wrappers normalized: **{stats['community_notes_fixed']}**",
    "",
    "## Changed files",
    "",
]
lines += [f"- `{p}`" for p in changed_files]
REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8")
print("\n".join(lines[:10]))
