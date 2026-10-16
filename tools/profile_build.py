#!/usr/bin/env python3
"""Opt-in MkDocs CPU profiler: python tools/profile_build.py."""
import cProfile
import io
import pstats

def main():
    from mkdocs.__main__ import cli
    profiler = cProfile.Profile()
    profiler.enable()
    try:
        cli.main(args=["build", "--clean"], standalone_mode=False)
    finally:
        profiler.disable()
        output = io.StringIO()
        pstats.Stats(profiler, stream=output).strip_dirs().sort_stats("cumulative").print_stats(35)
        print("\nMkDocs CPU profile:\n" + output.getvalue())

if __name__ == "__main__":
    main()
