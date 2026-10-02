"""Show command placeholders such as `jab <target>` as text.

Pages write game syntax with angle brackets. Left alone, a browser takes
`<target>` for an HTML tag and hides it, and the search index treats the rest
of the section as part of the heading. Anything shaped like a tag that is not
one of the HTML tags these pages use is escaped before Markdown runs.
docs/admin/tec-cms-placeholders.js does the same for the editor preview.
"""
import re

# HTML tags the pages really use. Keep in step with tec-cms-placeholders.js.
HTML_TAGS = set("""
a abbr article aside b base blockquote body br button caption center code col
dd del details div dl dt em fieldset figcaption figure font footer form h1 h2
h3 h4 h5 h6 head header hr html i iframe img input ins kbd label legend li link
main mark meta nav ol option p pre s script section select small span strong
style sub summary sup table tbody td textarea tfoot th thead tr u ul wbr
""".split())

# Left untouched: front matter, fenced code, HTML comments, script and style
# blocks, and inline code on one line.
_PROTECTED = re.compile(
    r"\A---\n.*?\n---\n"
    r"|^(```|~~~).*?^\1[^\n]*$"
    r"|<!--.*?-->"
    r"|<(script|style)\b.*?</\2\s*>"
    r"|(`+)(?:(?!\3)[^\n])+?\3",
    re.S | re.M | re.I,
)
_TAG = re.compile(r"<(/?)([A-Za-z][^<>\n]*)>")


def _is_html(inner):
    name = re.match(r"[A-Za-z][\w-]*", inner).group(0).lower()
    rest = inner[len(name):].strip().strip("/").strip()
    if name in HTML_TAGS and (not rest or "=" in rest):
        return True
    # Autolinks such as <https://...> and <someone@example.com>.
    return "://" in inner or "@" in inner


def _escape(text):
    def replace(match):
        if _is_html(match.group(2)):
            return match.group(0)
        return "&lt;" + match.group(1) + match.group(2) + "&gt;"
    return _TAG.sub(replace, text)


def escape_placeholders(markdown):
    out, pos = [], 0
    for match in _PROTECTED.finditer(markdown):
        out.append(_escape(markdown[pos:match.start()]))
        out.append(match.group(0))
        pos = match.end()
    out.append(_escape(markdown[pos:]))
    return "".join(out)


def on_page_markdown(markdown, page, config, files):
    return escape_placeholders(markdown)
