"""Keep the existing biography card directory in alphabetical order at build time.

Legacy card labels are authoritative for migrated biographies. Newly submitted
biographies are discovered from docs/bio_*.md and use character_name metadata.
No source Markdown is rewritten during builds.
"""
from html import escape, unescape
from pathlib import Path
import re
import yaml

GRID_RE = re.compile(r'<div class="bio-grid">(?P<cards>.*?)</div>', re.S)
CARD_RE = re.compile(
    r'<article class="bio-card">\s*<h3><a href="/(?P<slug>bio_[a-zA-Z0-9_-]+)/">'
    r'(?P<label>.*?)</a></h3>.*?</article>', re.S
)
VALID_SLUG = re.compile(r'^bio_[a-zA-Z0-9_-]+$')


def _character_name(path):
    raw = path.read_text(encoding="utf-8", errors="replace")
    if not raw.startswith("---\n"):
        return None
    end = raw.find("\n---\n", 4)
    if end == -1:
        return None
    try:
        meta = yaml.safe_load(raw[4:end]) or {}
    except yaml.YAMLError:
        return None
    name = meta.get("character_name")
    return name.strip() if isinstance(name, str) and name.strip() else None


def on_page_markdown(markdown, page, config, files):
    if page.file.src_uri != "character-bios.md":
        return markdown
    match = GRID_RE.search(markdown)
    if not match:
        return markdown

    # Keep exact legacy labels, including unusual spellings/capitalization.
    names = {}
    for card in CARD_RE.finditer(match.group("cards")):
        label = re.sub(r"<[^>]*>", "", card.group("label"))
        names[card.group("slug")] = unescape(label).strip()

    for path in Path(config["docs_dir"]).glob("bio_*.md"):
        if not VALID_SLUG.fullmatch(path.stem):
            continue
        name = _character_name(path)
        if name:
            names[path.stem] = name

    ordered = sorted(names.items(), key=lambda item: (item[1].casefold(), item[0]))
    cards = "\n".join(
        '<article class="bio-card">\n'
        f'<h3><a href="/{slug}/">{escape(name)}</a></h3>\n'
        f'<a class="bio-card__more" href="/{slug}/">Read biography</a>\n'
        '</article>'
        for slug, name in ordered
    )
    return markdown[:match.start()] + '<div class="bio-grid">\n' + cards + '\n</div>' + markdown[match.end():]
