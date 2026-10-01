#!/usr/bin/env python3
from pathlib import Path
import re

DOCS = Path("docs")
SKIP_DIRS = {"admin", "assets", "javascripts", "stylesheets"}
changed = []
counts = {
    "heading_permalink": 0,
    "size_directive": 0,
    "color_markup": 0,
    "collapsed_tables": 0,
}
review = []

heading_re = re.compile(r'^(#{2,6})\s+\[#\]\(#[^)]+\)(.+)$', re.M)
size_re = re.compile(r'(?<!\w)size\s+\d{1,3}%\s*', re.I)
color_re = re.compile(r'##(?:red|green|blue|yellow|orange|purple|gray|grey|white|black)\|([^#\n]*?)##', re.I)
collapsed_re = re.compile(r'(?ms)^\|\s*\|\n\|\s*---\s*\|\n\|\s*((?:\\\|\\\|.*?))\s*\|(?=\n\n|\n#|\n---|\Z)')

def convert_collapsed(match):
    payload = match.group(1)
    raw = payload.replace("\\|", "|")
    rows = [r.strip() for r in re.split(r'<br\s*/?>', raw, flags=re.I) if r.strip()]
    parsed = []
    for row in rows:
        if not (row.startswith("||") and row.endswith("||")):
            return match.group(0)
        cells = [c.strip() for c in row[2:-2].split("||")]
        parsed.append(cells)
    if len(parsed) < 2:
        return match.group(0)
    width = len(parsed[0])
    if width < 2 or any(len(r) != width for r in parsed):
        return match.group(0)
    header = [re.sub(r'^~\s*', '', c) for c in parsed[0]]
    body = parsed[1:]
    def esc(c):
        return c.replace("|", "\\|")
    lines = [
        "| " + " | ".join(esc(c) for c in header) + " |",
        "| " + " | ".join("---" for _ in header) + " |",
    ]
    lines += ["| " + " | ".join(esc(c) for c in r) + " |" for r in body]
    counts["collapsed_tables"] += 1
    return "\n".join(lines)

for path in sorted(DOCS.rglob("*.md")):
    rel = path.relative_to(DOCS)
    if rel.parts and rel.parts[0] in SKIP_DIRS:
        continue
    original = path.read_text(encoding="utf-8", errors="replace")
    text = original

    def heading_sub(m):
        counts["heading_permalink"] += 1
        return f"{m.group(1)} {m.group(2).strip()}"
    text = heading_re.sub(heading_sub, text)

    before = text
    text = size_re.sub("", text)
    counts["size_directive"] += len(size_re.findall(before))

    def color_sub(m):
        counts["color_markup"] += 1
        return m.group(1)
    text = color_re.sub(color_sub, text)

    text = collapsed_re.sub(convert_collapsed, text)

    # Flag suspicious migration artifacts that are not safe to rewrite automatically.
    suspicious = []
    checks = {
        "escaped Wikidot table markers": r'\\\|\\\|~',
        "remaining color markup": r'##[A-Za-z]+\|',
        "remaining size directive": r'\bsize\s+\d{1,3}%',
        "literal permalink heading": r'^#{2,6}\s+\[#\]',
        "raw Wikidot heading": r'^\+{1,6}\s+',
    }
    for label, pat in checks.items():
        if re.search(pat, text, re.M | re.I):
            suspicious.append(label)

    # Duplicate H1 followed soon by a near-identical H2 is review-only.
    heads = re.findall(r'^(#{1,2})\s+(.+?)\s*$', text, re.M)
    if len(heads) >= 2 and heads[0][0] == "#" and heads[1][0] == "##":
        norm = lambda s: re.sub(r'[^a-z0-9]+', '', s.lower())
        if norm(heads[0][1]) == norm(heads[1][1]):
            suspicious.append("duplicate H1/H2 title")

    if suspicious:
        review.append((rel.as_posix(), sorted(set(suspicious))))

    if text != original:
        path.write_text(text, encoding="utf-8")
        changed.append(rel.as_posix())

report = [
    "# Site-wide formatting sweep",
    "",
    f"- Pages changed: **{len(changed)}**",
    f"- Literal [#] headings fixed: **{counts['heading_permalink']}**",
    f"- Wikidot size directives removed: **{counts['size_directive']}**",
    f"- Simple Wikidot color spans normalized: **{counts['color_markup']}**",
    f"- Collapsed Wikidot tables restored: **{counts['collapsed_tables']}**",
    f"- Pages still needing manual review: **{len(review)}**",
    "",
]
if changed:
    report += ["## Automatically repaired pages", ""] + [f"- `{x}`" for x in changed] + [""]
if review:
    report += ["## Manual review", ""]
    for rel, issues in review:
        report.append(f"- `{rel}`: " + ", ".join(issues))
    report.append("")

Path("FORMATTING_SWEEP.md").write_text("\n".join(report), encoding="utf-8")
print("\n".join(report[:12]))
