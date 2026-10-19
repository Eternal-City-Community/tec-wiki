#!/usr/bin/env python3
"""Compare complete and blob-filtered Git history retrieval for TEC Wiki.

Run against two independent shallow checkouts of the same commit. Measure the
entire history-consuming workload, not merely git fetch, since `git log -p`
may lazily download blobs omitted by a filtered fetch.
"""
import hashlib
import subprocess
import sys
import time
from pathlib import Path


def run(repo, *args, timeout=180):
    started = time.perf_counter()
    result = subprocess.run(
        ["git", *args], cwd=repo, capture_output=True, check=False,
        timeout=timeout,
    )
    elapsed = time.perf_counter() - started
    return result, elapsed


def measure(repo, filtered):
    shallow, _ = run(repo, "rev-parse", "--is-shallow-repository")
    if shallow.returncode or shallow.stdout.strip() != b"true":
        raise RuntimeError(f"{repo}: expected a shallow checkout")
    fetch_args = ["fetch", "--quiet", "--no-tags", "--no-write-fetch-head"]
    if filtered:
        fetch_args.append("--filter=blob:none")
    fetch_args.extend(["--unshallow", "origin", "main"])
    fetched, fetch_time = run(repo, *fetch_args)
    if fetched.returncode:
        raise RuntimeError(f"{repo}: fetch failed: {fetched.stderr.decode(errors='replace')}")
    # Match the two production hooks' Git history reads.
    recent, recent_time = run(
        repo, "log", "--since=90 days ago", "--date=iso-strict",
        "--pretty=format:TEC_WIKI_COMMIT|%H|%aI|%an|%s",
        "--name-only", "--", "docs",
    )
    history, history_time = run(
        repo, "log", "--no-merges", "--no-renames", "--no-color",
        "--no-ext-diff", "--date=iso-strict", "-p",
        "--format=%x00%H%x1f%aI%x1f%an%x1f%s", "--", "docs/*.md",
    )
    for name, result in (("recent changes", recent), ("page history", history)):
        if result.returncode:
            raise RuntimeError(
                f"{repo}: {name} failed: {result.stderr.decode(errors='replace')}"
            )
    return {
        "fetch": fetch_time,
        "recent": recent_time,
        "history": history_time,
        "total": fetch_time + recent_time + history_time,
        "recent_digest": hashlib.sha256(recent.stdout).hexdigest(),
        "history_digest": hashlib.sha256(history.stdout).hexdigest(),
        "history_bytes": len(history.stdout),
    }


def main():
    if len(sys.argv) != 3:
        raise SystemExit("Usage: benchmark_git_history.py BASELINE_CHECKOUT FILTERED_CHECKOUT")
    baseline, filtered = (Path(p).resolve() for p in sys.argv[1:])
    base_head, _ = run(baseline, "rev-parse", "HEAD")
    filter_head, _ = run(filtered, "rev-parse", "HEAD")
    if base_head.stdout != filter_head.stdout or base_head.returncode or filter_head.returncode:
        raise SystemExit("Checkouts do not point to the same commit")
    print("Benchmarking Git history for commit", base_head.stdout.decode().strip(), flush=True)
    results = {}
    for label, repo, use_filter in (
        ("full", baseline, False), ("blob-filtered", filtered, True),
    ):
        try:
            result = measure(repo, use_filter)
        except (RuntimeError, subprocess.TimeoutExpired) as error:
            print(f"{label}: unavailable ({error})", flush=True)
            if label == "full":
                raise SystemExit(1) from error
            return
        results[label] = result
        print(
            f"{label}: fetch={result['fetch']:.2f}s "
            f"recent={result['recent']:.2f}s "
            f"history={result['history']:.2f}s "
            f"total={result['total']:.2f}s "
            f"patch_bytes={result['history_bytes']}",
            flush=True,
        )
    same = all(
        results["full"][key] == results["blob-filtered"][key]
        for key in ("recent_digest", "history_digest")
    )
    print("Identical recent-change and complete page-history output:", same, flush=True)
    print(
        "Filtered minus full elapsed seconds:",
        round(results["blob-filtered"]["total"] - results["full"]["total"], 2),
        flush=True,
    )
    if not same:
        raise SystemExit("History mismatch: filtered fetch is unsafe for production")


if __name__ == "__main__":
    main()
