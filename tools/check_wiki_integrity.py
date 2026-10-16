#!/usr/bin/env python3
"""Read-only TEC Wiki audit; intentionally missing wiki pages are red-link invitations.

--strict fails on actual integrity issues, never on intentional red links.
"""
import argparse
import json
import re
from pathlib import Path
from urllib.parse import unquote, urlsplit

ASSET_SUFFIXES = (".png", ".jpg", ".jpeg", ".gif", ".webp", ".pdf", ".svg", ".js", ".css")
LINK_RE = re.compile(r'!?\[[^\]\n]*\]\((/[^\s)]+)')
HTML_LINK_RE = re.compile(r'(?:src|href)=["\x27](/[^"\x27]+)', re.I)
REDIRECT_RE = re.compile(r'<meta\s+[^>]*http-equiv=["\x27]refresh["\x27][^>]*content=["\x27][^"\x27]*?url\s*=\s*([^"\x27;\s]+)', re.I)


def scan(docs):
    pages = sorted(docs.rglob("*.md"))
    slugs = {p.relative_to(docs).with_suffix("").as_posix() for p in pages}
    issues, red_links = set(), set()
    for page in pages:
        rel = page.relative_to(docs).as_posix()
        if rel.startswith("admin/"):
            continue
        text = page.read_text(encoding="utf-8", errors="replace")
        if text.startswith("---\n"):
            end = text.find("\n---\n", 4)
            if end < 0:
                issues.add((rel, "unclosed front matter"))
            else:
                parent = re.search(r"^parent:\s*(\S+)", text[4:end], re.M)
                if parent and parent.group(1).strip("'\"") not in slugs:
                    issues.add((rel, "missing parent: " + parent.group(1)))
                text = text[end + 5:]
        anchors = re.findall(r'<a\s+[^>]*\bid=["\x27]([^"\x27]+)', text, re.I)
        for anchor in set(anchors):
            if anchors.count(anchor) > 1:
                issues.add((rel, "duplicate explicit anchor: " + anchor))
        clean, fence = [], None
        for line in text.splitlines():
            marker = line.lstrip()[:3]
            if marker in ("```", "~~~"):
                fence = None if fence == marker else marker
                continue
            if fence is None:
                clean.append(line)
        source = "\n".join(clean)
        urls = LINK_RE.findall(source) + HTML_LINK_RE.findall(source)
        redirects = REDIRECT_RE.findall(source)
        urls += redirects
        for url in set(urls):
            path = unquote(urlsplit(url).path).lstrip("/")
            if not path or path.startswith(("api/", "admin/", "auth/", "callback/")):
                continue
            if path.startswith("assets/") or path.lower().endswith(ASSET_SUFFIXES):
                if not (docs / path).is_file():
                    issues.add((rel, "missing asset: /" + path))
            else:
                slug = path.rstrip("/")
                if slug not in slugs and slug + "/index" not in slugs:
                    if url in redirects:
                        issues.add((rel, "broken redirect: /" + path))
                    elif path.endswith("/"):
                        red_links.add((rel, slug))
                    else:
                        issues.add((rel, "malformed or unresolved URL: /" + path))
    manifest = docs / "assets/data/missing-pages.json"
    if manifest.exists():
        try:
            declared = json.loads(manifest.read_text(encoding="utf-8"))
            if not isinstance(declared, list) or any(not isinstance(s, str) for s in declared):
                raise ValueError("expected an array of slugs")
            for _, slug in red_links:
                if slug not in declared:
                    issues.add(("assets/data/missing-pages.json", "red-link slug absent from manifest: " + slug))
            for slug in declared:
                if slug in slugs or slug + "/index" in slugs:
                    issues.add(("assets/data/missing-pages.json", "existing page incorrectly marked missing: " + slug))
        except (ValueError, OSError) as exc:
            issues.add(("assets/data/missing-pages.json", "invalid manifest: " + str(exc)))
    else:
        issues.add(("assets/data/missing-pages.json", "missing red-link manifest"))
    return len(pages), sorted(issues), sorted(red_links)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--strict", action="store_true")
    parser.add_argument("--max-report", type=int, default=80)
    args = parser.parse_args()
    count, issues, red_links = scan(Path(__file__).resolve().parents[1] / "docs")
    print(f"TEC integrity: {count} markdown files, {len(issues)} issues, {len(red_links)} intentional red-link references")
    for rel, issue in issues[:args.max_report]:
        print(rel + ": " + issue)
    if len(issues) > args.max_report:
        print(f"... {len(issues) - args.max_report} more issues")
    return int(args.strict and bool(issues))


if __name__ == "__main__":
    raise SystemExit(main())
