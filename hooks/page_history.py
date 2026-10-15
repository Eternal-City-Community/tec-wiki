"""Generate per-page revision history (with diffs) from local Git history.

Writes site/assets/data/history/<slug>.json for the Page History page, so
readers never depend on GitHub's rate-limited API.
"""
import json
from pathlib import Path
import subprocess

EXCLUDED = {"whats-new.md", "page-history.md"}
# A revision whose diff is larger than this (e.g. the migration import of a
# long page) is listed without a diff; the reader is sent to GitHub instead.
MAX_PATCH_CHARS = 150000


def _git(repo, *args, timeout=None):
    return subprocess.run(
        ["git", "-c", "core.quotepath=off", *args],
        cwd=repo, capture_output=True, text=True, encoding="utf-8",
        errors="replace", check=False, timeout=timeout,
    )


def _ensure_full_history(repo):
    # Cloudflare builds may check out shallow history (see whats_new.py).
    if _git(repo, "rev-parse", "--is-shallow-repository").stdout.strip().lower() == "true":
        _git(repo, "fetch", "--quiet", "--unshallow", "origin", "main", timeout=60)


def _file_patches(body):
    """Yield (path, patch) for each file section of one commit's diff."""
    for section in body.split("\ndiff --git ")[1:]:
        lines = section.split("\n")
        path = None
        for line in lines[1:6]:
            if line.startswith("+++ b/"):
                path = line[6:]
            elif line.startswith("--- a/") and path is None:
                path = line[6:]
        if path is None:
            continue
        start = next((i for i, line in enumerate(lines) if line.startswith("@@")), None)
        yield path, "" if start is None else "\n".join(lines[start:]).rstrip("\n")


def on_post_build(config, **kwargs):
    repo = Path(config["config_file_path"]).resolve().parent
    docs = Path(config["docs_dir"]).resolve()
    out_dir = Path(config["site_dir"]).resolve() / "assets" / "data" / "history"
    out_dir.mkdir(parents=True, exist_ok=True)

    try:
        _ensure_full_history(repo)
        result = _git(
            repo, "log", "--no-merges", "--no-renames", "--no-color", "--no-ext-diff",
            "--date=iso-strict", "-p", "--format=%x00%H%x1f%aI%x1f%an%x1f%s",
            "--", "docs/*.md",
        )
        if result.returncode != 0:
            return
    except OSError:
        return

    pages = {}
    for record in result.stdout.split("\x00")[1:]:
        header, _, body = record.partition("\n")
        meta = header.split("\x1f")
        if len(meta) != 4:
            continue
        sha, date, author, message = meta
        for path, patch in _file_patches("\n" + body):
            if not path.startswith("docs/") or "/" in path[5:] or not path.endswith(".md"):
                continue
            rel = path[5:]
            if rel in EXCLUDED or not (docs / rel).is_file():
                continue
            lines = patch.split("\n") if patch else []
            revision = {
                "sha": sha,
                "date": date,
                "author": author,
                "message": message.strip(),
                "additions": sum(1 for l in lines if l.startswith("+")),
                "deletions": sum(1 for l in lines if l.startswith("-")),
            }
            if len(patch) <= MAX_PATCH_CHARS:
                revision["patch"] = patch
            pages.setdefault(rel[:-3], []).append(revision)

    for slug, revisions in pages.items():
        (out_dir / (slug + ".json")).write_text(
            json.dumps({"page": slug, "revisions": revisions}, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )
