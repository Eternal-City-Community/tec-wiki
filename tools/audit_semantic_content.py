#!/usr/bin/env python3
import subprocess, re, json, difflib
from pathlib import Path

BASE = "be39d0ef1e85bae444464ce11f2f19e46e7f9258"

def git_show(ref, path):
    p = subprocess.run(["git","show",ref + ":" + path], capture_output=True, text=True)
    return p.stdout if p.returncode == 0 else None

def files_at(ref):
    p = subprocess.run(["git","ls-tree","-r","--name-only",ref,"docs"], capture_output=True, text=True, check=True)
    return [x for x in p.stdout.splitlines() if x.endswith(".md")]

def clean_line(line):
    s = line.strip()
    if not s:
        return ""
    if s.startswith("---") or s.startswith("|") or s.startswith("[[") or s.startswith("!!!"):
        return ""
    if s.startswith("<") and s.endswith(">"):
        return ""
    if s.startswith("<!--"):
        return ""
    if re.match(r"^#{1,6}\s+", s):
        return ""
    if re.match(r"^\s*[-*+]\s+", s):
        s = re.sub(r"^\s*[-*+]\s+", "", s)
    if "http" in s and len(s) < 100:
        return ""
    s = re.sub(r"<br\s*/?>", " ", s, flags=re.I)
    s = re.sub(r"<[^>]+>", " ", s)
    s = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", s)
    s = re.sub(r"[*_~#@]+", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    if len(s) < 45:
        return ""
    return s

def prose_lines(text):
    lines=[]
    in_fence=False
    fence=chr(96)*3
    for raw in text.splitlines():
        st=raw.strip()
        if st.startswith(fence) or st.startswith("~~~"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        c=clean_line(raw)
        if c:
            lines.append(c)
    return lines

def norm(s):
    s=s.lower()
    s=re.sub(r"[^a-z0-9]+"," ",s)
    return re.sub(r"\s+"," ",s).strip()

def matched(old_line, current_lines):
    no=norm(old_line)
    if not no:
        return True
    for cur in current_lines:
        nc=norm(cur)
        if no == nc or no in nc or nc in no:
            return True
    # Fuzzy comparison only against reasonably similar lengths.
    for cur in current_lines:
        nc=norm(cur)
        if not nc:
            continue
        ratio_len=len(no)/len(nc)
        if ratio_len < 0.55 or ratio_len > 1.8:
            continue
        if difflib.SequenceMatcher(None,no,nc).ratio() >= 0.86:
            return True
    return False

rows=[]
for path in files_at(BASE):
    old=git_show(BASE,path)
    cur=git_show("HEAD",path)
    if old is None or cur is None:
        continue
    ol=prose_lines(old)
    cl=prose_lines(cur)
    missing=[x for x in ol if not matched(x,cl)]
    # Ignore obvious migration/module notices.
    missing=[x for x in missing if "dynamic wikidot content" not in x.lower()
             and "this dynamic section needs a replacement" not in x.lower()
             and "migration note" not in x.lower()]
    if missing:
        rows.append({
            "path":path,
            "old_prose_lines":len(ol),
            "current_prose_lines":len(cl),
            "missing_count":len(missing),
            "missing":missing[:60]
        })

rows.sort(key=lambda x:x["missing_count"], reverse=True)
report={"base_commit":BASE,"flagged_pages":len(rows),"pages":rows}
Path("SEMANTIC_CONTENT_AUDIT.json").write_text(json.dumps(report,indent=2),encoding="utf-8")

md=["# Semantic content audit","",
    "Compares prose in the initial migration import against current pages while ignoring tables, headings, raw HTML, and code blocks.","",
    "- Flagged pages: **"+str(len(rows))+"**",""]
for r in rows:
    md.append("## "+r["path"])
    md.append("- Missing substantive prose lines: **"+str(r["missing_count"])+"**")
    for line in r["missing"][:20]:
        md.append("- "+line)
    md.append("")
Path("SEMANTIC_CONTENT_AUDIT.md").write_text("\n".join(md),encoding="utf-8")
print(json.dumps({"flagged_pages":len(rows),"top":rows[:40]},indent=2))
