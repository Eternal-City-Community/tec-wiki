"""Generate a reader-facing recent wiki changes feed from local Git history."""
from datetime import datetime, timezone
import json
from pathlib import Path
import re
import subprocess

MAX_DAYS = 90
EXCLUDED = {"whats-new.md", "page-history.md"}

def _title(path):
    text = path.read_text(encoding="utf-8", errors="replace")
    front = re.search(r"^---\s*\n(.*?)\n---", text, re.S)
    if front:
        match = re.search(r'^title:\s*["\']?(.*?)["\']?\s*$', front.group(1), re.M)
        if match and match.group(1).strip():
            return match.group(1).strip()
    heading = re.search(r"^#\s+(.+?)\s*$", text, re.M)
    return heading.group(1).strip() if heading else path.stem.replace("-", " ").title()

def on_post_build(config, **kwargs):
    repo = Path(config["config_file_path"]).resolve().parent
    docs = Path(config["docs_dir"]).resolve()
    site = Path(config["site_dir"]).resolve()
    marker = "%x1e%H%x1f%aI%x1f%an%x1f%s"
    entries = []
    try:
        result = subprocess.run(
            ["git", "log", "--since=%d days ago" % MAX_DAYS, "--date=iso-strict",
             "--pretty=format:" + marker, "--name-only", "--", "docs"],
            cwd=repo, capture_output=True, text=True, encoding="utf-8",
            errors="replace", check=True,
        )
        newest = {}
        for record in result.stdout.split("\x1e"):
            record = record.strip()
            if not record:
                continue
            lines = record.splitlines()
            meta = lines[0].split("\x1f", 3)
            if len(meta) != 4:
                continue
            sha, date, author, message = meta
            for filename in lines[1:]:
                filename = filename.strip().replace("\\", "/")
                if not filename.startswith("docs/") or not filename.endswith(".md"):
                    continue
                rel = filename[5:]
                if rel.startswith("admin/") or rel in EXCLUDED:
                    continue
                source = docs / rel
                if not source.is_file():
                    continue
                slug = rel[:-3]
                if slug.endswith("/index"):
                    slug = slug[:-6]
                if slug in newest:
                    continue
                newest[slug] = {
                    "title": _title(source),
                    "url": "/" if rel == "index.md" else "/" + slug.strip("/") + "/",
                    "date": date,
                    "summary": message.splitlines()[0].strip() or "Page updated",
                }
        entries = sorted(newest.values(), key=lambda item: item["date"], reverse=True)
    except (OSError, subprocess.CalledProcessError):
        pass
    output = site / "assets" / "data" / "whats-new.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps({
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "max_days": MAX_DAYS,
        "entries": entries,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
