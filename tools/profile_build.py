#!/usr/bin/env python3
"""Opt-in MkDocs profiler, including targeted render/search diagnostics."""
import cProfile
import io
import pstats

def report(stats, label, sort, count, restriction=None):
    output = io.StringIO()
    view = pstats.Stats(stats, stream=output).strip_dirs().sort_stats(sort)
    if restriction:
        view.print_stats(restriction, count)
    else:
        view.print_stats(count)
    print("\n" + label + "\n" + output.getvalue())

def main():
    from mkdocs.__main__ import cli
    profiler = cProfile.Profile()
    profiler.enable()
    try:
        cli.main(args=["build", "--clean"], standalone_mode=False)
    finally:
        profiler.disable()
        report(profiler, "MkDocs cumulative time (top 60)", "cumulative", 60)
        report(profiler, "MkDocs own CPU time (top 60)", "tottime", 60)
        report(profiler, "Search plugin functions", "cumulative", 40, "search")
        report(profiler, "TEC hooks", "cumulative", 60, "hooks/")

if __name__ == "__main__":
    main()
