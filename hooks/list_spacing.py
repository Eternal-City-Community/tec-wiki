"""Start a list even when it directly follows a line of text.

Python-Markdown only starts a list after a blank line, so

    These are useful commands:
    * stats
    * @attributes

would run together as one paragraph. Pages (and the editor preview, which
follows CommonMark) expect a list there, so a blank line is added before a
`* ` line that follows paragraph text. Numbered lines are left alone: a list
would be renumbered from 1, and map legends continue their numbering across
sections (`24. Trainer`), so they stay as plain numbered lines.

Left untouched: front matter, fenced code, tables, headings, quotes, indented
lines, lines inside HTML blocks that are not marked `markdown`, and lines that
continue a list already started in the same block.
"""
import re

_ITEM = re.compile(r"^ {0,3}\* +\S")
_FENCE = re.compile(r"^(```|~~~)")
# A line that opens or closes a block-level HTML element.
_BLOCK_TAG = re.compile(
    r"<(/?)(div|details|table|blockquote|center|section|figure|ul|ol|dl|pre|p|form)\b([^>]*?)(/?)>",
    re.I,
)


def _starts_paragraph_text(line):
    stripped = line.lstrip()
    if not stripped or line != stripped:
        return False
    return not stripped.startswith(("|", "<", "#", ">", "!!!", "{", "---", "***", "___"))


def space_lists(markdown):
    lines = markdown.split("\n")
    out = []
    i = 0
    if lines and lines[0] == "---":
        end = next((k for k in range(1, len(lines)) if lines[k] == "---"), None)
        if end is not None:
            out.extend(lines[: end + 1])
            i = end + 1

    fence = None
    raw_depth = []  # one entry per open HTML block: True if its content is not Markdown
    block_has_item = False
    prev = ""
    for line in lines[i:]:
        if fence:
            out.append(line)
            if line.startswith(fence):
                fence = None
            prev = line
            continue
        match = _FENCE.match(line)
        if match:
            fence = match.group(1)
            out.append(line)
            prev = line
            continue

        in_raw = any(raw_depth)
        if not line.strip():
            block_has_item = False
        elif _ITEM.match(line):
            if not in_raw and not block_has_item and _starts_paragraph_text(prev):
                out.append("")
            block_has_item = True

        for tag in _BLOCK_TAG.finditer(line):
            closing, _, attrs, self_closing = tag.groups()
            if self_closing:
                continue
            if closing:
                if raw_depth:
                    raw_depth.pop()
            else:
                raw_depth.append("markdown" not in attrs.lower())

        out.append(line)
        prev = line
    return "\n".join(out)


def on_page_markdown(markdown, page, config, files):
    return space_lists(markdown)
