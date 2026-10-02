from pathlib import Path
import re
import yaml


MARKER_RE = re.compile(r"<!--\s*TEC_LISTPAGES\s+parent=([A-Za-z0-9_-]+)\s*-->")


def _read_front_matter(path: Path):
    text = path.read_text(encoding="utf-8", errors="replace")
    if not text.startswith("---\n"):
        return {}, text

    end = text.find("\n---\n", 4)
    if end == -1:
        return {}, text

    raw = text[4:end]
    try:
        meta = yaml.safe_load(raw) or {}
    except Exception:
        meta = {}

    return meta, text[end + 5:]


def _page_title(meta, body, fallback):
    title = meta.get("title")
    if title:
        return str(title).strip()

    match = re.search(r"^#\s+(.+?)\s*$", body, re.M)
    if match:
        return re.sub(r"<[^>]+>", "", match.group(1)).strip()

    return fallback.replace("-", " ").replace("_", " ").title()


def _children_for(parent_slug, config):
    docs_dir = Path(config["docs_dir"])
    children = []

    for path in docs_dir.rglob("*.md"):
        if any(part.startswith(".") for part in path.parts):
            continue

        meta, body = _read_front_matter(path)
        if str(meta.get("parent", "")).strip() != parent_slug:
            continue

        rel = path.relative_to(docs_dir).with_suffix("")
        slug = rel.as_posix()
        title = _page_title(meta, body, path.stem)
        children.append((slug, title))

    # Wikidot's order="name asc" sorts by page name, not displayed title.
    children.sort(key=lambda item: item[0].lower())
    return children


def on_page_markdown(markdown, page, config, files):
    matches = list(MARKER_RE.finditer(markdown))
    if not matches:
        return markdown

    for match in reversed(matches):
        parent = match.group(1)
        children = _children_for(parent, config)

        if children:
            rendered = '<div class="tec-listpages" markdown="1">\n\n' + "\n".join(
                f'- [{title}](/{slug}/)' for slug, title in children
            ) + '\n\n</div>'
        else:
            rendered = (
                '<div class="tec-listpages tec-listpages--empty" markdown="1">\n\n'
                '*No child pages are currently tagged for this index.*\n\n'
                '</div>'
            )

        markdown = markdown[:match.start()] + rendered + markdown[match.end():]

    return markdown
