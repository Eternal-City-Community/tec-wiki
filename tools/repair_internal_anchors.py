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
html_id_re = re.compile(r'<a\s+id=["\']([^"\']+)["\']\s*></a>', re.I)

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
    explicit = {}
    fenced = False

    for i, line in enumerate(text.splitlines(), 1):
        if is_fence(line):
            fenced = not fenced
            continue
        if fenced:
            continue

        for m in html_id_re.finditer(line):
            explicit[m.group(1).lower()] = m.group(1)

        m = heading_re.match(line)
        if m:
            title = strip_inline(m.group(2))
            slug = slugify(title)
            headings.append({
                "title": title,
                "slug": slug,
                "norm": norm(title),
                "line": i,
            })

    return text, headings, explicit

pages = {}
for path in sorted(DOCS.rglob("*.md")):
    rel = path.relative_to(DOCS)
    if rel.parts and rel.parts[0] in SKIP_DIRS:
        continue
    slug = rel.as_posix()[:-3]
    text, headings, explicit = load_page(path)
    pages[slug] = {
        "path": path,
        "text": text,
        "headings": headings,
        "explicit": explicit,
    }

def resolve_fragment(target_slug, old_anchor, label):
    target = pages.get(target_slug)
    if not target:
        return None, "missing-page"

    low = old_anchor.lower()

    if low in target["explicit"]:
        return target["explicit"][low], "explicit-anchor"

    for h in target["headings"]:
        if h["slug"].lower() == low:
            return h["slug"], "heading-exact"

    label_n = norm(label)
    exact = [h for h in target["headings"] if label_n and h["norm"] == label_n]
    if len(exact) == 1:
        return exact[0]["slug"], "label-exact"

    return None, "no-safe-target"

report = {
    "pages_scanned": len(pages),
    "pages_changed": 0,
    "links_changed": 0,
    "back_to_top_fixed": 0,
    "same_page_dead_links_removed": 0,
    "cross_page_fragments_dropped": 0,
    "fragment_case_normalized": 0,
    "unresolved_missing_pages": [],
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
                return f'[{label}](#)'

            if href.startswith("#"):
                old_anchor = href[1:]
                resolved, method = resolve_fragment(current_slug, old_anchor, label)
                if resolved:
                    new_href = "#" + resolved
                    if new_href != href:
                        report["links_changed"] += 1
                        report["fragment_case_normalized"] += 1
                        report["methods"][method] = report["methods"].get(method, 0) + 1
                        return f'[{label}]({new_href})'
                    return m.group(0)

                report["links_changed"] += 1
                report["same_page_dead_links_removed"] += 1
                return label

            cm = re.match(r'^/([^?#]+)/#([^?#]+)$', href)
            if cm:
                target_slug = cm.group(1).strip("/")
                old_anchor = cm.group(2)
                if target_slug not in pages:
                    report["unresolved_missing_pages"].append({
                        "page": current_slug + ".md",
                        "line": line_no,
                        "href": href,
                        "label": label,
                    })
                    return m.group(0)

                resolved, method = resolve_fragment(target_slug, old_anchor, label)
                if resolved:
                    new_href = "/" + target_slug + "/#" + resolved
                    if new_href != href:
                        report["links_changed"] += 1
                        report["fragment_case_normalized"] += 1
                        report["methods"][method] = report["methods"].get(method, 0) + 1
                        return f'[{label}]({new_href})'
                    return m.group(0)

                report["links_changed"] += 1
                report["cross_page_fragments_dropped"] += 1
                return f'[{label}](/' + target_slug + '/)'

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
    f"- Links safely changed: **{report['links_changed']}**",
    f"- Back-to-top links repaired: **{report['back_to_top_fixed']}**",
    f"- Dead same-page fragment links converted to text: **{report['same_page_dead_links_removed']}**",
    f"- Dead cross-page fragments reduced to page links: **{report['cross_page_fragments_dropped']}**",
    f"- Existing anchors normalized/repaired: **{report['fragment_case_normalized']}**",
    f"- Links to missing pages left untouched: **{len(report['unresolved_missing_pages'])}**",
    "",
    "## Exact resolution methods",
]
for method, count in sorted(report["methods"].items()):
    md.append(f"- {method}: **{count}**")

md += ["", "## Missing target pages left untouched"]
if report["unresolved_missing_pages"]:
    for item in report["unresolved_missing_pages"]:
        md.append(f"- {item['page']}:{item['line']} — {item['label']} -> {item['href']}")
else:
    md.append("- None")

Path("ANCHOR_REPAIR_REPORT.md").write_text("\n".join(md) + "\n", encoding="utf-8")
print(json.dumps(report, indent=2))
