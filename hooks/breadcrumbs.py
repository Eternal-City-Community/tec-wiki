"""Breadcrumbs from each page's `parent:` front matter.

A page names only its parent page (e.g. `parent: skills`); the full chain up
to Home is worked out here on every build, so renaming or moving a page
updates every breadcrumb below it. overrides/partials/path.html renders it.
"""
from pathlib import Path
import logging
import re
import yaml

log = logging.getLogger("mkdocs.hooks.breadcrumbs")
_pages = {}  # slug -> {"title": str, "parent": str}


def _read_front_matter(path: Path):
    text = path.read_text(encoding="utf-8", errors="replace").replace("\r\n", "\n")
    if not text.startswith("---\n"):
        return {}, text
    end = text.find("\n---\n", 4)
    if end == -1:
        return {}, text
    try:
        meta = yaml.safe_load(text[4:end]) or {}
    except Exception:
        meta = {}
    return meta, text[end + 5:]


def _title(meta, body, slug):
    if meta.get("title"):
        return str(meta["title"]).strip()
    match = re.search(r"^#\s+(.+?)\s*$", body, re.M)
    if match:
        return re.sub(r"<[^>]+>", "", match.group(1)).strip()
    return slug.replace("-", " ").replace("_", " ").title()


def _url(slug):
    return "/" if slug == "index" else f"/{slug}/"


def on_pre_build(config):
    _pages.clear()
    docs_dir = Path(config["docs_dir"])
    for path in docs_dir.glob("*.md"):
        meta, body = _read_front_matter(path)
        _pages[path.stem] = {
            "title": _title(meta, body, path.stem),
            "parent": str(meta.get("parent") or "").strip(),
        }
    for slug, page in sorted(_pages.items()):
        if page["parent"] and page["parent"] not in _pages:
            log.warning("%s.md: parent page '%s' does not exist", slug, page["parent"])


def on_page_markdown(markdown, page, config, files):
    slug = Path(page.file.src_path).with_suffix("").as_posix()
    crumbs, seen = [], {slug}
    parent = _pages.get(slug, {}).get("parent")
    while parent and parent in _pages:
        if parent in seen:
            log.warning("%s.md: parent pages loop back to '%s'", slug, parent)
            break
        seen.add(parent)
        crumbs.insert(0, {"title": "Home" if parent == "index" else _pages[parent]["title"], "url": _url(parent)})
        parent = _pages[parent]["parent"]
    # Every breadcrumb starts at Home, even when a page higher up has no parent set.
    if crumbs and crumbs[0]["url"] != "/":
        crumbs.insert(0, {"title": "Home", "url": "/"})
    page.meta["breadcrumbs"] = crumbs
    return markdown
