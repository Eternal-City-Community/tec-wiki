#!/usr/bin/env python3
# Audit revision: post-restoration
import subprocess, re, json
from pathlib import Path

BASE = "be39d0ef1e85bae444464ce11f2f19e46e7f9258"

def git_show(ref, path):
    p = subprocess.run(["git", "show", ref + ":" + path], capture_output=True, text=True)
    return p.stdout if p.returncode == 0 else None

def files_at(ref):
    p = subprocess.run(["git", "ls-tree", "-r", "--name-only", ref, "docs"], capture_output=True, text=True, check=True)
    return [x for x in p.stdout.splitlines() if x.endswith(".md")]

def headings(text):
    out = []
    for line in text.splitlines():
        m = re.match(r"^(#{1,6})\s+(.+)$", line)
        if m:
            out.append(re.sub(r"\s+#+\s*$", "", m.group(2).strip()))
    return out

def anchors(text):
    return re.findall(r"<a\s+id=[\"']([^\"']+)[\"']\s*></a>", text, re.I)

base_files = files_at(BASE)
rows = []

for path in base_files:
    old = git_show(BASE, path)
    cur = git_show("HEAD", path)
    if old is None or cur is None:
        continue

    oh = headings(old)
    ch = headings(cur)
    oa = anchors(old)
    ca = anchors(cur)

    current_heading_set = set(ch)
    current_anchor_set = {x.lower() for x in ca}

    missing_h = [h for h in oh if h not in current_heading_set]
    missing_a = [a for a in oa if a.lower() not in current_anchor_set]

    old_len = len(old)
    cur_len = len(cur)
    shrink = ((old_len - cur_len) / old_len) if old_len else 0

    if missing_h or missing_a or shrink >= 0.15:
        rows.append({
            "path": path,
            "old_len": old_len,
            "current_len": cur_len,
            "shrink_pct": round(shrink * 100, 1),
            "old_headings": len(oh),
            "current_headings": len(ch),
            "missing_headings": missing_h,
            "old_anchors": len(oa),
            "current_anchors": len(ca),
            "missing_anchors": missing_a
        })

rows.sort(
    key=lambda x: (
        len(x["missing_headings"]) + len(x["missing_anchors"]),
        x["shrink_pct"]
    ),
    reverse=True
)

report = {
    "base_commit": BASE,
    "pages_compared": len(base_files),
    "flagged_pages": len(rows),
    "pages": rows
}

Path("CONTENT_LOSS_AUDIT.json").write_text(json.dumps(report, indent=2), encoding="utf-8")

md = [
    "# Content loss audit",
    "",
    "Baseline: " + BASE + " (initial Wikidot import)",
    "",
    "- Pages compared: **" + str(len(base_files)) + "**",
    "- Flagged pages: **" + str(len(rows)) + "**",
    "",
    "Flagged when headings or legacy anchors disappeared, or the page shrank by at least 15%.",
    "",
    "## Flagged pages",
    ""
]

for r in rows:
    md.append("### " + r["path"])
    md.append("- Size: " + str(r["old_len"]) + " -> " + str(r["current_len"]) + " (" + str(r["shrink_pct"]) + "% shrink)")
    md.append("- Headings: " + str(r["old_headings"]) + " -> " + str(r["current_headings"]))
    if r["missing_headings"]:
        md.append("- Missing headings: " + " | ".join(r["missing_headings"][:40]))
    md.append("- Legacy anchors: " + str(r["old_anchors"]) + " -> " + str(r["current_anchors"]))
    if r["missing_anchors"]:
        md.append("- Missing anchors: " + ", ".join(r["missing_anchors"][:80]))
    md.append("")

Path("CONTENT_LOSS_AUDIT.md").write_text("\n".join(md), encoding="utf-8")

print(json.dumps({
    "pages_compared": len(base_files),
    "flagged_pages": len(rows),
    "top": rows[:40]
}, indent=2))
