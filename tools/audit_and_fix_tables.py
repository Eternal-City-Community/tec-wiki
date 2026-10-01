#!/usr/bin/env python3
from pathlib import Path
import re

DOCS = Path("docs")
REPORT = Path("TABLE_QA_REPORT.md")

stats = {
    "pages_scanned": 0,
    "table_blocks": 0,
    "files_changed": 0,
    "spacing_fixes": 0,
    "duplicate_separators_removed": 0,
}
manual = []
changed = []
sep_re = re.compile(r"^\s*\|(?:\s*:?-{3,}:?\s*\|)+\s*$")

def split_cells(line):
    s = line.strip()
    if not (s.startswith("|") and s.endswith("|")):
        return None
    s = s[1:-1]
    cells = []
    cur = []
    escaped = False
    code = False
    for ch in s:
        if escaped:
            cur.append(ch)
            escaped = False
            continue
        if ch == "\\":
            cur.append(ch)
            escaped = True
            continue
        if ch == "`":
            code = not code
            cur.append(ch)
            continue
        if ch == "|" and not code:
            cells.append("".join(cur).strip())
            cur = []
        else:
            cur.append(ch)
    cells.append("".join(cur).strip())
    return cells

for path in sorted(DOCS.rglob("*.md")):
    stats["pages_scanned"] += 1
    original = path.read_text(encoding="utf-8", errors="replace")
    lines = original.splitlines()
    out = []
    i = 0
    while i < len(lines):
        if lines[i].lstrip().startswith("|") and i + 1 < len(lines) and sep_re.match(lines[i + 1]):
            if out and out[-1].strip():
                out.append("")
                stats["spacing_fixes"] += 1
            out.append(lines[i])
            out.append(lines[i + 1])
            i += 2
            while i < len(lines) and lines[i].lstrip().startswith("|"):
                if sep_re.match(lines[i]):
                    stats["duplicate_separators_removed"] += 1
                    i += 1
                    continue
                out.append(lines[i])
                i += 1
            if i < len(lines) and lines[i].strip():
                out.append("")
                stats["spacing_fixes"] += 1
            continue
        out.append(lines[i])
        i += 1

    text = "\n".join(out).rstrip() + "\n"
    if text != original:
        path.write_text(text, encoding="utf-8")
        changed.append(path.relative_to(DOCS).as_posix())
        stats["files_changed"] += 1

    lines = text.splitlines()
    i = 0
    while i < len(lines):
        if lines[i].lstrip().startswith("|") and i + 1 < len(lines) and sep_re.match(lines[i + 1]):
            stats["table_blocks"] += 1
            start = i + 1
            block = [lines[i], lines[i + 1]]
            i += 2
            while i < len(lines) and lines[i].lstrip().startswith("|"):
                block.append(lines[i])
                i += 1
            counts = []
            for row in block:
                cells = split_cells(row)
                if cells is not None:
                    counts.append(len(cells))
            if counts and len(set(counts)) > 1:
                manual.append((path.relative_to(DOCS).as_posix(), start, "inconsistent column counts: " + ", ".join(map(str, counts[:12]))))
            continue

        line = lines[i]
        stripped = line.strip()
        if stripped.count("|") >= 4 and not stripped.startswith(("```", "~~~", "<", "//")) and "||" not in stripped and not stripped.startswith("|"):
            manual.append((path.relative_to(DOCS).as_posix(), i + 1, "pipe-heavy line outside a recognized table"))
        i += 1

report = [
    "# TEC Wiki table QA report",
    "",
    "- Markdown pages scanned: **" + str(stats["pages_scanned"]) + "**",
    "- Recognized table blocks: **" + str(stats["table_blocks"]) + "**",
    "- Pages auto-fixed: **" + str(stats["files_changed"]) + "**",
    "- Table spacing fixes: **" + str(stats["spacing_fixes"]) + "**",
    "- Duplicate separator rows removed: **" + str(stats["duplicate_separators_removed"]) + "**",
    "- Table issues needing manual review: **" + str(len(manual)) + "**",
    "",
]

if manual:
    report += ["## Manual review", ""]
    for rel, line, reason in manual:
        report.append("- `" + rel + "` line " + str(line) + ": " + reason)
    report.append("")

if changed:
    report += ["## Auto-fixed pages", ""]
    for rel in changed:
        report.append("- `" + rel + "`")
    report.append("")

REPORT.write_text("\n".join(report), encoding="utf-8")
print("\n".join(report[:12]))
