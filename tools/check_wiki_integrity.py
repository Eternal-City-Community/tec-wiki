#!/usr/bin/env python3
"""Read-only TEC Wiki integrity audit. --strict fails on findings."""
import argparse
import re
from pathlib import Path
from urllib.parse import unquote, urlsplit

def scan(docs):
    pages = sorted(docs.rglob("*.md"))
    slugs = {p.relative_to(docs).with_suffix("").as_posix() for p in pages}
    issues = set()
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
                text = text[end+5:]
        anchors = re.findall(r'<a\s+[^>]*\bid=["\x27]([^"\x27]+)', text, re.I)
        for anchor in set(anchors):
            if anchors.count(anchor) > 1:
                issues.add((rel, "duplicate explicit anchor: " + anchor))
        clean, fence = [], None
        for line in text.splitlines():
            marker = line.lstrip()[:3]
            if marker in (chr(96)*3, "~~~"):
                fence = None if fence == marker else marker
                continue
            if fence is None:
                clean.append(line)
        source = "\n".join(clean)
        urls = re.findall(r'!?\[[^\]\n]*\]\((/[^\s)]+)', source)
        urls += re.findall(r'(?:src|href)=["\x27](/assets/[^"\x27]+)', source, re.I)
        for url in set(urls):
            path = unquote(urlsplit(url).path).lstrip("/")
            if not path or path.startswith(("api/", "admin/", "auth/", "callback/")):
                continue
            if path.startswith("assets/") or path.lower().endswith((".png",".jpg",".jpeg",".gif",".webp",".pdf",".svg",".js",".css")):
                if not (docs/path).is_file():
                    issues.add((rel, "missing asset: /"+path))
            elif path.endswith("/"):
                slug = path.rstrip("/")
                if slug not in slugs and slug+"/index" not in slugs:
                    issues.add((rel, "missing page: /"+path))
    return len(pages), sorted(issues)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--strict", action="store_true")
    parser.add_argument("--max-report", type=int, default=80)
    args = parser.parse_args()
    count, issues = scan(Path(__file__).resolve().parents[1]/"docs")
    print("TEC integrity: %d markdown files, %d findings" % (count, len(issues)))
    for rel, issue in issues[:args.max_report]:
        print(rel+": "+issue)
    if len(issues)>args.max_report:
        print("... %d more findings" % (len(issues)-args.max_report))
    return int(args.strict and bool(issues))

if __name__ == "__main__":
    raise SystemExit(main())
