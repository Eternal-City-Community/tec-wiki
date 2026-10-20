#!/usr/bin/env python3
"""Benchmark TEC MkDocs rendering with and without the search plugin.

This is a diagnostic only: disabling search is not a production recommendation.
Runs baseline -> no-search -> baseline to expose warm-cache/order effects.
"""
import hashlib
import json
import re
import subprocess
import sys
import tempfile
import time
from pathlib import Path


def fingerprint(root):
    return {
        str(p.relative_to(root)): hashlib.sha256(p.read_bytes()).hexdigest()
        for p in root.rglob("*.html")
    }


def build(repo, config, output):
    command = [
        sys.executable, "-m", "mkdocs", "build",
        "--clean", "--config-file", str(config), "--site-dir", str(output),
    ]
    start = time.perf_counter()
    result = subprocess.run(command, cwd=repo, capture_output=True, text=True)
    elapsed = time.perf_counter() - start
    print(f"Build {output.name}: {elapsed:.2f}s, exit={result.returncode}", flush=True)
    for line in (result.stdout + "\n" + result.stderr).splitlines():
        if any(token in line for token in ("What's New:", "Page history:", "Documentation built", "ERROR")):
            print("  " + line, flush=True)
    if result.returncode:
        print(result.stdout[-4000:], result.stderr[-4000:], file=sys.stderr)
        raise SystemExit(result.returncode)
    index = output / "search" / "search_index.json"
    return {
        "seconds": elapsed,
        "html": fingerprint(output),
        "search_index_bytes": index.stat().st_size if index.exists() else 0,
        "search_index_sha256": hashlib.sha256(index.read_bytes()).hexdigest() if index.exists() else None,
    }


def main():
    repo = Path(__file__).resolve().parents[1]
    source = (repo / "mkdocs.yml").read_text(encoding="utf-8")
    # Replace exactly the production search plugin declaration, not theme search UI.
    altered, replacements = re.subn(
        r"(?m)^plugins:\s*\n  - search\s*$",
        "plugins: []", source,
    )
    if replacements != 1:
        raise SystemExit("Expected exactly one search plugin entry in mkdocs.yml")
    with tempfile.TemporaryDirectory(prefix="tec-mkdocs-benchmark-") as temp:
        tmp = Path(temp)
        # Keep the temporary config in the repository root so relative theme,
        # docs, hook and override paths resolve exactly as in production.
        candidate_config = repo / ".tec-benchmark-no-search.yml"
        if candidate_config.exists():
            raise SystemExit(f"Refusing to overwrite {candidate_config}")
        try:
            candidate_config.write_text(altered, encoding="utf-8")
            base1 = build(repo, repo / "mkdocs.yml", tmp / "baseline-first")
            no_search = build(repo, candidate_config, tmp / "no-search")
            base2 = build(repo, repo / "mkdocs.yml", tmp / "baseline-second")
        finally:
            candidate_config.unlink(missing_ok=True)
        common = set(base1["html"]) & set(no_search["html"])
        changed = sorted(p for p in common if base1["html"][p] != no_search["html"][p])
        repeat_changed = sorted(
            p for p in set(base1["html"]) & set(base2["html"])
            if base1["html"][p] != base2["html"][p]
        )
        print("\nSummary (wall-clock; includes hooks and template rendering):")
        print(f"  Baseline first:  {base1['seconds']:.2f}s")
        print(f"  No search:       {no_search['seconds']:.2f}s")
        print(f"  Baseline second: {base2['seconds']:.2f}s")
        print(f"  Search index: {base1['search_index_bytes']} bytes baseline; "
              f"{no_search['search_index_bytes']} bytes without search")
        print(f"  HTML files shared: {len(common)}")
        print(f"  HTML files differing without search: {len(changed)}")
        print(f"  HTML files differing between baseline repeats: {len(repeat_changed)}")
        print("  Sample changed HTML:", json.dumps(changed[:12]))
        print("  Note: missing search index and search UI differences are expected.")
        print("  This benchmark does NOT validate disabling search for production.")
        if base1["search_index_bytes"] == 0 or base2["search_index_bytes"] == 0:
            raise SystemExit("Baseline search index missing; benchmark invalid")
        if no_search["search_index_bytes"] != 0:
            raise SystemExit("No-search build still produced a search index")


if __name__ == "__main__":
    main()
