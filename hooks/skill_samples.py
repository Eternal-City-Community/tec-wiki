"""Apply bold and italic inside skill sample boxes.

A sample is an HTML block (`<div class="skill-template">`), and Markdown is not
applied inside HTML blocks, so `*> jab goblin*` would show its asterisks. Only
`*italic*` and `**bold**` are converted; everything else in a sample stays as
written. Underscores are left alone because game output uses them as divider
lines, and a line starting with `>`, `* ` or `[Success: ...]` is not read as
Markdown.
"""
import re

_SAMPLE = re.compile(r'(<div class="skill-template"[^>]*>)(.*?)(</div>)', re.S)
_STRONG = re.compile(r"(?<![*\w])\*\*(?=\S)([^*\n]+?)(?<=\S)\*\*(?![*\w])")
_EM_STAR = re.compile(r"(?<![*\w])\*(?=[^\s*])([^*\n]+?)(?<=[^\s*])\*(?![*\w])")


def _emphasis(text):
    text = _STRONG.sub(r"<strong>\1</strong>", text)
    return _EM_STAR.sub(r"<em>\1</em>", text)


def format_samples(markdown):
    return _SAMPLE.sub(lambda m: m.group(1) + _emphasis(m.group(2)) + m.group(3), markdown)


def on_page_markdown(markdown, page, config, files):
    return format_samples(markdown)
