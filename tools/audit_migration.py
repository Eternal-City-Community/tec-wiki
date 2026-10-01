#!/usr/bin/env python3
from pathlib import Path
from collections import Counter
import re

DOCS = Path("docs")
REPORT = Path("WIKI_AUDIT.md")

sep_re = re.compile(r'^\s*\|(?:\s*:?-{3,}:?\s*\|)+\s*$')

def split_cells(line):
    s=line.strip()
    if not (s.startswith("|") and s.endswith("|")):
        return None
    s=s[1:-1]
    cells=[]; cur=[]; esc=False; code=False
    for ch in s:
        if esc:
            cur.append(ch); esc=False; continue
        if ch=="\\":
            cur.append(ch); esc=True; continue
        if ch=="\`":
            code=not code; cur.append(ch); continue
        if ch=="|" and not code:
            cells.append("".join(cur).strip()); cur=[]
        else:
            cur.append(ch)
    cells.append("".join(cur).strip())
    return cells

# Safe site-wide table normalization.
table_stats=Counter()
table_issues=[]
changed_files=[]
for path in sorted(DOCS.rglob("*.md")):
    original=path.read_text(encoding="utf-8",errors="replace")
    lines=original.splitlines()
    out=[]; i=0
    while i<len(lines):
        if lines[i].lstrip().startswith("|") and i+1<len(lines) and sep_re.match(lines[i+1]):
            if out and out[-1].strip():
                out.append("")
                table_stats["spacing_fixes"]+=1
            block=[lines[i],lines[i+1]]
            i+=2
            while i<len(lines) and lines[i].lstrip().startswith("|"):
                if sep_re.match(lines[i]):
                    table_stats["duplicate_separators_removed"]+=1
                    i+=1
                    continue
                block.append(lines[i]); i+=1
            out.extend(block)
            if i<len(lines) and lines[i].strip():
                out.append("")
                table_stats["spacing_fixes"]+=1
            continue
        out.append(lines[i]); i+=1

    normalized="\n".join(out).rstrip()+"\n"
    if normalized!=original:
        path.write_text(normalized,encoding="utf-8")
        changed_files.append(path.relative_to(DOCS).as_posix())
        table_stats["files_changed"]+=1

# Inventory after fixes.
files={p.relative_to(DOCS).as_posix():p for p in DOCS.rglob("*.md")}
slugs=set()
for rel in files:
    if rel=="index.md":
        slugs.update({"","index"})
    elif rel.endswith("/index.md"):
        slugs.add(rel[:-9].rstrip("/"))
    else:
        slugs.add(rel[:-3])

counts=Counter()
syntax_pages={"wikidot_table":[],"wikidot_heading":[],"wikidot_escape":[],"wikidot_markup":[],"wdfiles":[]}
broken=set(); migration_pages=[]; wikidot_links=[]
link_re=re.compile(r'\[[^\]]*\]\(([^)]+)\)')

for rel,path in files.items():
    text=path.read_text(encoding="utf-8",errors="replace")
    lines=text.splitlines()

    # Table structure audit.
    i=0
    while i<len(lines):
        if lines[i].lstrip().startswith("|") and i+1<len(lines) and sep_re.match(lines[i+1]):
            table_stats["table_blocks"]+=1
            block=[lines[i],lines[i+1]]
            start=i+1
            i+=2
            while i<len(lines) and lines[i].lstrip().startswith("|"):
                block.append(lines[i]); i+=1
            cell_counts=[]
            for row in block:
                cells=split_cells(row)
                if cells is not None:
                    cell_counts.append(len(cells))
            if cell_counts and len(set(cell_counts))>1:
                table_issues.append((rel,start,"inconsistent column counts: "+", ".join(map(str,cell_counts[:16]))))
            continue

        s=lines[i].strip()
        # A pipe-heavy line outside a recognized table is usually a failed conversion.
        if s.startswith("|") and s.count("|")>=4:
            table_issues.append((rel,i+1,"pipe row outside a recognized Markdown table"))
        i+=1

    if "Migrated include" in text or "Dynamic Wikidot content" in text or "Migration note" in text:
        migration_pages.append(rel)
    counts["migrated_include"]+=text.count("Migrated include")
    counts["dynamic_wikidot"]+=text.count("Dynamic Wikidot content")
    counts["migration_note"]+=text.count("Migration note")
    if "eternal-city.wikidot.com" in text:
        wikidot_links.append(rel)

    checks={
        "wikidot_heading":r"^\+{1,6}\*?\s",
        "wikidot_escape":r"@@",
        "wikidot_markup":r"\[\[(?!/?(?:details|summary))",
        "wdfiles":r"eternal-city\.wdfiles\.com",
    }
    for key,pat in checks.items():
        if re.search(pat,text,re.M):
            syntax_pages[key].append(rel)
    if "||" in text and "<script" not in text.lower():
        syntax_pages["wikidot_table"].append(rel)

    for href in link_re.findall(text):
        href=href.strip()
        if not href.startswith("/") or href.startswith("//"):
            continue
        target=href.split("#",1)[0].split("?",1)[0].strip("/")
        if not target or target.startswith(("assets/","admin/")):
            continue
        if target.endswith(".md"):
            target=target[:-3]
        if target not in slugs:
            broken.add((rel,href))

lines=[
    "# TEC Wiki migration audit","",
    f"- Markdown pages scanned: **{len(files)}**",
    f"- Recognized Markdown table blocks: **{table_stats['table_blocks']}**",
    f"- Pages auto-fixed for table spacing/separators: **{table_stats['files_changed']}**",
    f"- Table spacing fixes: **{table_stats['spacing_fixes']}**",
    f"- Duplicate table separator rows removed: **{table_stats['duplicate_separators_removed']}**",
    f"- Table issues needing manual review: **{len(table_issues)}**",
    f"- Pages containing migration placeholders: **{len(set(migration_pages))}**",
    f"- Migrated include placeholders: **{counts['migrated_include']}**",
    f"- Dynamic Wikidot placeholders: **{counts['dynamic_wikidot']}**",
    f"- Other migration-note markers: **{counts['migration_note']}**",
    f"- Pages still containing direct eternal-city.wikidot.com links: **{len(set(wikidot_links))}**",
    f"- Unique unresolved internal links: **{len(broken)}**",
    f"- Pages still using WDFiles assets: **{len(set(syntax_pages['wdfiles']))}**",
    f"- Pages with leftover Wikidot table syntax: **{len(set(syntax_pages['wikidot_table']))}**",
    f"- Pages with leftover Wikidot heading syntax: **{len(set(syntax_pages['wikidot_heading']))}**",
    f"- Pages with leftover Wikidot escape markers: **{len(set(syntax_pages['wikidot_escape']))}**",
    f"- Pages with leftover Wikidot markup blocks: **{len(set(syntax_pages['wikidot_markup']))}**","",
]

if table_issues:
    lines+=["## Table issues requiring review",""]
    for rel,line,reason in table_issues[:500]:
        lines.append(f"- `{rel}` line {line}: {reason}")
    lines.append("")

if changed_files:
    lines+=["## Pages auto-fixed for table parsing",""]
    for rel in changed_files:
        lines.append(f"- `{rel}`")
    lines.append("")

if broken:
    lines+=["## Unresolved internal links",""]
    for rel,href in sorted(broken)[:500]:
        lines.append(f"- `{rel}` → `{href}`")
    lines.append("")

REPORT.write_text("\n".join(lines),encoding="utf-8")
print("\n".join(lines[:20]))
