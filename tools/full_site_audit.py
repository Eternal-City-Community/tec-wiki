#!/usr/bin/env python3
from pathlib import Path
import re, json

DOCS = Path("docs")
SKIP_DIRS = {"assets","admin","javascripts","stylesheets"}
report = {
  "pages_scanned": 0,
  "pages_changed": 0,
  "safe_fixes": {
    "details_markdown": 0,
    "legacy_color": 0,
    "size_directive": 0,
    "literal_anchor_heading": 0,
    "duplicate_title": 0,
  },
  "manual_review": []
}

def norm(s):
    return re.sub(r"[^a-z0-9]+","",s.lower())

def table_cols(line):
    if not line.strip().startswith("|"):
        return None
    return len(line.strip().strip("|").split("|"))

for path in sorted(DOCS.rglob("*.md")):
    rel = path.relative_to(DOCS)
    if rel.parts and rel.parts[0] in SKIP_DIRS:
        continue
    report["pages_scanned"] += 1
    text = path.read_text(encoding="utf-8", errors="replace")
    orig = text

    # Safe: Markdown tables/lists inside raw details must opt in.
    n = text.count("<details>")
    if n:
        text = text.replace("<details>", '<details markdown="1">')
        report["safe_fixes"]["details_markdown"] += n

    # Safe: common Wikidot color spans -> inner text.
    def color_sub(m):
        report["safe_fixes"]["legacy_color"] += 1
        return m.group(1)
    text = re.sub(r"##(?:red|green|blue|purple|gray|grey|black|white|orange|yellow)\\?\|([^#\n]+)##", color_sub, text, flags=re.I)

    # Safe: leftover Wikidot size token at end of a line.
    def size_sub(m):
        report["safe_fixes"]["size_directive"] += 1
        return m.group(1)
    text = re.sub(r"^(.*?)(?:\s+\*?size\s+\d+%\*?)\s*$", size_sub, text, flags=re.I|re.M)

    # Safe: headings with literal migrated [#] anchor prefix.
    def anchor_sub(m):
        report["safe_fixes"]["literal_anchor_heading"] += 1
        return m.group(1) + m.group(2)
    text = re.sub(r"^(#{1,6}\s+)\[#\](?:\([^\n)]*\))?\s*(.+)$", anchor_sub, text, flags=re.M)

    # Safe: immediate duplicate title H1/H2 in first 12 body lines.
    lines = text.splitlines()
    h1i = next((i for i,l in enumerate(lines[:20]) if l.startswith("# ")), None)
    if h1i is not None:
        h1 = lines[h1i][2:].strip()
        for i in range(h1i+1, min(len(lines), h1i+12)):
            if lines[i].startswith("## "):
                if norm(lines[i][3:].strip().replace("(in progress)","")) == norm(h1.replace("(in progress)","")):
                    del lines[i]
                    if i < len(lines) and lines[i] == "":
                        del lines[i]
                    report["safe_fixes"]["duplicate_title"] += 1
                break
            if lines[i].startswith("# "):
                break
        text = "\n".join(lines).rstrip() + "\n"

    if text != orig:
        path.write_text(text, encoding="utf-8")
        report["pages_changed"] += 1

    # Re-read after safe fixes for review checks.
    c = text
    issues = []

    # Strip fenced/code/script regions before looking for migration syntax.
    scrub = re.sub(r"(?ms)^~~~.*?^~~~\\s*$", "", c)
    scrub = re.sub(r"(?ms)^```.*?^```\\s*$", "", scrub)
    scrub = re.sub(r"(?is)<script\\b.*?</script>", "", scrub)

    plain = scrub.replace("\\\\|\\\\|", "")
    if "||" in plain:
        issues.append("possible leftover Wikidot || table markup")
    if re.search(r"@<[^>]*>@", scrub):
        issues.append("leftover Wikidot escape markup")
    if re.search(r"##[A-Za-z]+\\\\?\\|", scrub):
        issues.append("leftover Wikidot color markup")

    # Only flag fenced blocks when they look like a table accidentally trapped as code.
    for fm in re.finditer(r"(?ms)^~~~\\s*\\n(.*?)\\n~~~\\s*$", c):
        body = fm.group(1)
        if re.search(r"(?m)^\\s*[^\\n]+\\|[^\\n]+$", body) and re.search(r"(?m)^\\s*-{3,}\\s*\\|", body):
            issues.append("possible table trapped in fenced code")
            break

    # Additional H1s outside fenced blocks are suspicious.
    body_h1 = []
    fenced = False
    for li, line in enumerate(c.splitlines(), 1):
        stripped = line.strip()
        if stripped.startswith("~~~") or stripped.startswith("```"):
            fenced = not fenced
            continue
        if not fenced and li - 1 != h1i and line.startswith("# "):
            body_h1.append(li)
    if body_h1:
        issues.append("additional H1 headings at lines " + ",".join(map(str, body_h1[:12])))

    # Tables with inconsistent column counts inside one contiguous block.
    # Ignore escaped pipes inside cell text.
    ls = c.splitlines()
    i = 0
    bad_tables = []
    while i < len(ls):
        if not ls[i].lstrip().startswith("|"):
            i += 1
            continue
        start_line = i + 1
        counts = []
        while i < len(ls) and ls[i].lstrip().startswith("|"):
            safe = re.sub(r"\\\\\\|", "", ls[i])
            counts.append(table_cols(safe))
            i += 1
        if len(counts) >= 2 and len(set(counts)) > 1:
            bad_tables.append((start_line, min(counts), max(counts)))
    if bad_tables:
        issues.append("inconsistent table columns: " + "; ".join(f"line {s} ({a}-{b})" for s,a,b in bad_tables[:8]))

    # Raw details without markdown opt-in should now be zero.
    if "<details>" in c:
        issues.append("raw <details> without markdown=1")

    if issues:
        report["manual_review"].append({"page": rel.as_posix(), "issues": issues})

Path("FULL_SITE_AUDIT.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
md = [
    "# Full site acceptance audit",
    "",
    f"- Markdown pages scanned: **{report['pages_scanned']}**",
    f"- Pages safely changed: **{report['pages_changed']}**",
    f"- Pages needing manual review: **{len(report['manual_review'])}**",
    "",
    "## Safe fixes",
]
for k,v in report["safe_fixes"].items():
    md.append(f"- {k.replace('_',' ').title()}: **{v}**")
md += ["", "## Manual review"]
if report["manual_review"]:
    for item in report["manual_review"]:
        md.append(f"- `{item['page']}`: " + "; ".join(item["issues"]))
else:
    md.append("- None")
Path("FULL_SITE_AUDIT.md").write_text("\n".join(md)+"\n", encoding="utf-8")
print(json.dumps(report, indent=2))
