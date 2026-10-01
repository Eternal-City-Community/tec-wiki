#!/usr/bin/env python3
from pathlib import Path
import re
import unicodedata
import json

DOCS = Path("docs")
SKIP_DIRS = {"assets", "admin", "javascripts", "stylesheets"}
TICK_FENCE = chr(96) * 3
TICK = chr(96)

link_re = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')
heading_re = re.compile(r'^(#{1,6})\s+(.+?)\s*#*\s*$')

def strip_inline(text):
    text = re.sub(r'\[(.*?)\]\([^)]*\)', r'\1', text)
    text = text.replace(TICK, '')
    text = re.sub(r'[*_~]+', '', text)
    text = re.sub(r'<[^>]+>', '', text)
    return text.strip()

def slugify(text):
    text = strip_inline(text)
    text = unicodedata.normalize("NFKD", text)
    text = "".join(ch for ch in text if not unicodedata.combining(ch))
    text = text.lower()
    text = re.sub(r'[^a-z0-9 _-]', '', text)
    text = re.sub(r'[ _]+', '-', text)
    text = re.sub(r'-+', '-', text).strip('-')
    return text

def norm(text):
    return re.sub(r'[^a-z0-9]+', '', strip_inline(text).lower())

def is_fence(line):
    st = line.strip()
    return st.startswith("~~~") or st.startswith(TICK_FENCE)

def load_page(path):
    text = path.read_text(encoding="utf-8", errors="replace")
    headings = []
    fenced = False
    for i, line in enumerate(text.splitlines(), 1):
        if is_fence(line):
            fenced = not fenced
            continue
        if fenced:
            continue
        m = heading_re.match(line)
        if m:
            title = strip_inline(m.group(2))
            headings.append({
                "title": title,
                "slug": slugify(title),
                "norm": norm(title),
                "line": i,
            })
    return text, headings

pages = {}
for path in sorted(DOCS.rglob("*.md")):
    rel = path.relative_to(DOCS)
    if rel.parts and rel.parts[0] in SKIP_DIRS:
        continue
    slug = rel.as_posix()[:-3]
    text, headings = load_page(path)
    pages[slug] = {"path": path, "text": text, "headings": headings}

def resolve_target(current_slug, href, label):
    if href == "#":
        return "#", "already-top"

    if href.startswith("#"):
        target_slug = current_slug
        old_anchor = href[1:]
        prefix = ""
    else:
        m = re.match(r'^/([^?#]+)/#([^?#]+)$', href)
        if not m:
            return None, "not-anchor-link"
        target_slug = m.group(1).strip("/")
        old_anchor = m.group(2)
        prefix = "/" + target_slug + "/"

    target = pages.get(target_slug)
    if not target:
        return None, "missing-target-page"

    headings = target["headings"]
    if not headings:
        return None, "no-headings"

    old_n = norm(old_anchor)
    label_n = norm(label)

    for h in headings:
        if h["slug"].lower() == old_anchor.lower():
            return prefix + "#" + h["slug"], "exact"

    exact_label = [h for h in headings if label_n and h["norm"] == label_n]
    if len(exact_label) == 1:
        return prefix + "#" + exact_label[0]["slug"], "label-exact"

    anchor_matches = [h for h in headings if old_n and (h["norm"] == old_n or old_n in h["norm"])]
    if len(anchor_matches) == 1:
        return prefix + "#" + anchor_matches[0]["slug"], "anchor-contained"

    label_matches = [h for h in headings if label_n and (label_n in h["norm"] or h["norm"] in label_n)]
    if len(label_matches) == 1:
        return prefix + "#" + label_matches[0]["slug"], "label-contained"

    words = [w for w in re.findall(r'[a-z0-9]+', strip_inline(label).lower()) if len(w) > 2]
    if words:
        scored = []
        for h in headings:
            hw = set(re.findall(r'[a-z0-9]+', h["title"].lower()))
            score = sum(1 for w in words if w in hw)
            if score:
                scored.append((score, h))
        if scored:
            best = max(s for s, _ in scored)
            winners = [h for s, h in scored if s == best]
            if best >= max(1, len(words) - 1) and len(winners) == 1:
                return prefix + "#" + winners[0]["slug"], "token-match"

    return None, "ambiguous"

report = {
    "pages_scanned": len(pages),
    "links_changed": 0,
    "pages_changed": 0,
    "back_to_top_fixed": 0,
    "unresolved": [],
    "methods": {},
}

for current_slug, info in pages.items():
    text = info["text"]
    orig = text
    fenced = False
    out = []

    for line_no, line in enumerate(text.splitlines(), 1):
        if is_fence(line):
            fenced = not fenced
            out.append(line)
            continue
        if fenced:
            out.append(line)
            continue

        def repl(m):
            label, href = m.group(1), m.group(2)

            if label.strip().lower() in {"back to top", "back to top."} and href.startswith("#"):
                report["links_changed"] += 1
                report["back_to_top_fixed"] += 1
                report["methods"]["back-to-top"] = report["methods"].get("back-to-top", 0) + 1
                return f'[{label}](#)'

            new_href, method = resolve_target(current_slug, href, label)
            if new_href is None:
                if href.startswith("#") or re.match(r'^/[^?#]+/#', href):
                    report["unresolved"].append({
                        "page": current_slug + ".md",
                        "line": line_no,
                        "label": label,
                        "href": href,
                        "reason": method,
                    })
                return m.group(0)

            if new_href != href:
                report["links_changed"] += 1
                report["methods"][method] = report["methods"].get(method, 0) + 1
                return f'[{label}]({new_href})'
            return m.group(0)

        out.append(link_re.sub(repl, line))

    text = "\n".join(out)
    if orig.endswith("\n"):
        text += "\n"

    if text != orig:
        info["path"].write_text(text, encoding="utf-8")
        report["pages_changed"] += 1

Path("ANCHOR_REPAIR_REPORT.json").write_text(json.dumps(report, indent=2), encoding="utf-8")

md = [
    "# Anchor repair report",
    "",
    f"- Pages scanned: **{report['pages_scanned']}**",
    f"- Pages changed: **{report['pages_changed']}**",
    f"- Links repaired: **{report['links_changed']}**",
    f"- Back-to-top links repaired: **{report['back_to_top_fixed']}**",
    f"- Unresolved anchor links: **{len(report['unresolved'])}**",
    "",
    "## Resolution methods",
]
for method, count in sorted(report["methods"].items()):
    md.append(f"- {method}: **{count}**")

md += ["", "## Unresolved"]
if report["unresolved"]:
    for item in report["unresolved"]:
        md.append(
            f"- {item['page']}:{item['line']} — [{item['label']}]({item['href']}) ({item['reason']})"
        )
else:
    md.append("- None")

Path("ANCHOR_REPAIR_REPORT.md").write_text("\n".join(md) + "\n", encoding="utf-8")

print(json.dumps(report, indent=2))
