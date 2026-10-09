"""Build the Shops page data (docs/data/shops.txt) into a JSON file the page loads."""
import hashlib
import json
from pathlib import Path
import re

from mkdocs.exceptions import PluginError

SOURCE = Path("data") / "shops.txt"
OUTPUT_DIR = Path("assets")
PAGE = "shops.md"

LOCATION_RE = re.compile(r"^\*\*\*(.+?)\*\*\*\s*(?:\[\s*wikipage\s*=\s*([^\]]+?)\s*\])?$", re.I)
SHOP_RE = re.compile(r"^---(.+?)---\s*(?:\[(.*)\])?$")
KEEPER_RE = re.compile(r"^(.*?)\s*\(([^()]+)\)$")
ITEM_RE = re.compile(
    r"^(.+?)\s+((?:\d+(?:t|d|st|s| tokens?)\b\s*)+?)\s*(?:\[\s*(.+?)\s*\])?$", re.I)

_built = {}


def parse(text):
    """Return [{name, page, shops: [{name, keeper, rotating, items: [[name, price, options]]}]}]."""
    locations = []
    location = shop = None
    for number, raw in enumerate(text.splitlines(), 1):
        line = raw.strip()
        if not line or line.startswith("//"):
            continue
        m = LOCATION_RE.match(line)
        if m:
            location = {"name": m.group(1).strip(), "page": (m.group(2) or "").strip(), "shops": []}
            locations.append(location)
            shop = None
            continue
        m = SHOP_RE.match(line)
        if m:
            if location is None:
                raise PluginError("%s line %d: shop before any ***Location***" % (SOURCE.as_posix(), number))
            title = m.group(1).strip()
            k = KEEPER_RE.match(title)
            shop = {
                "name": k.group(1) if k else title,
                "keeper": k.group(2).strip() if k else "",
                "rotating": "rotating" in (m.group(2) or "").lower(),
                "items": [],
            }
            location["shops"].append(shop)
            continue
        m = ITEM_RE.match(line)
        if m and shop is not None:
            price = re.sub(r"\s+", " ", m.group(2).strip())
            shop["items"].append([m.group(1).strip(), price, (m.group(3) or "").strip()])
            continue
        raise PluginError("%s line %d: could not read %r" % (SOURCE.as_posix(), number, raw))
    return locations


def on_pre_build(config, **kwargs):
    source = Path(config["docs_dir"]) / SOURCE
    data = json.dumps(parse(source.read_text(encoding="utf-8")), ensure_ascii=False, separators=(",", ":"))
    digest = hashlib.sha256(data.encode("utf-8")).hexdigest()[:10]
    _built.update(data=data, url="/%s/shops.%s.json" % (OUTPUT_DIR.as_posix(), digest))


def on_page_markdown(markdown, page, **kwargs):
    # Point the page at the content-hashed file so browsers never use stale stock.
    if page.file.src_uri == PAGE:
        markdown = markdown.replace('id="tec-shops-app"', 'id="tec-shops-app" data-src="%s"' % _built["url"], 1)
    return markdown


def on_post_build(config, **kwargs):
    site = Path(config["site_dir"])
    for name in (_built["url"].lstrip("/"), (OUTPUT_DIR / "shops.json").as_posix()):
        out = site / name
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(_built["data"], encoding="utf-8")
