"""Present newly submitted biographies in the TEC parchment app style.

Only pages carrying the new submission system's character_name metadata are
transformed. Legacy biographies and stored Markdown remain untouched.
"""
from html import escape
import re

PORTRAIT = re.compile(r'(?m)^!\[Character portrait\]\((/assets/uploads/bio_[a-z0-9_]+\.(?:png|jpg|webp))\)\s*$')
HEADING = re.compile(r"(?m)^## (Nationality|Appearance|Background & History|Organizations and Affiliations|Additional Details)\s*$")
LABELS = {
    "Nationality": "Nationality",
    "Appearance": "Appearance",
    "Background & History": "Background & History",
    "Organizations and Affiliations": "Organizations & Affiliations",
    "Additional Details": "Additional Details",
}


def on_page_markdown(markdown, page, config, files):
    if not page.file.src_uri.startswith("bio_"):
        return markdown
    name = page.meta.get("character_name")
    if not isinstance(name, str) or not name.strip():
        return markdown
    # Limit the transformation to the canonical generated format.
    match = re.match(r"\A# ([^\n]+)\n+", markdown)
    if not match or match.group(1).strip() != name.strip():
        return markdown
    rest = markdown[match.end():]
    portrait_match = PORTRAIT.search(rest)
    portrait = portrait_match.group(1) if portrait_match else None
    if portrait_match:
        rest = rest[:portrait_match.start()] + rest[portrait_match.end():]
    sections = list(HEADING.finditer(rest))
    if not sections:
        return markdown
    header = (
        '<div class="tec-bio-profile" markdown="1">\n'
        '<header class="tec-bio-profile__hero">\n'
        '<span class="tec-bio-profile__eyebrow">The Eternal City · Character Biography</span>\n'
        f'<h1>{escape(name)}</h1>\n'
        '<span class="tec-bio-profile__emblem" aria-hidden="true">✦</span>\n'
        '</header>\n'
        '<div class="tec-bio-profile__content" markdown="1">\n'
    )
    output = [header]
    if portrait:
        output.append(
            '<aside class="tec-bio-profile__portrait">\\n'
            f'<img src="{escape(portrait, quote=True)}" alt="Portrait of {escape(name, quote=True)}" loading="lazy">\\n'
            '</aside>\\n'
        )
    intro = rest[:sections[0].start()].strip()
    if intro:
        output.append(intro + "\n\n")
    for index, heading in enumerate(sections):
        title = heading.group(1)
        end = sections[index + 1].start() if index + 1 < len(sections) else len(rest)
        body = rest[heading.end():end].strip()
        if not body:
            continue
        label = escape(LABELS[title])
        modifier = " tec-bio-profile__card--nationality" if title == "Nationality" else ""
        output.append(
            f'<section class="tec-bio-profile__card{modifier}" markdown="1">\n'
            f'<h2>{label}</h2>\n\n'
            f'{body}\n\n'
            '</section>\n'
        )
    output.append('</div>\n</div>\n')
    return "\n".join(output)
)
HEADING = re.compile(r"(?m)^## (Nationality|Appearance|Background & History|Organizations and Affiliations|Additional Details)\s*$")
LABELS = {
    "Nationality": "Nationality",
    "Appearance": "Appearance",
    "Background & History": "Background & History",
    "Organizations and Affiliations": "Organizations & Affiliations",
    "Additional Details": "Additional Details",
}


def on_page_markdown(markdown, page, config, files):
    if not page.file.src_uri.startswith("bio_"):
        return markdown
    name = page.meta.get("character_name")
    if not isinstance(name, str) or not name.strip():
        return markdown
    # Limit the transformation to the canonical generated format.
    match = re.match(r"\A# ([^\n]+)\n+", markdown)
    if not match or match.group(1).strip() != name.strip():
        return markdown
    rest = markdown[match.end():]
    sections = list(HEADING.finditer(rest))
    if not sections:
        return markdown
    header = (
        '<div class="tec-bio-profile" markdown="1">\n'
        '<header class="tec-bio-profile__hero">\n'
        '<span class="tec-bio-profile__eyebrow">The Eternal City · Character Biography</span>\n'
        f'<h1>{escape(name)}</h1>\n'
        '<span class="tec-bio-profile__emblem" aria-hidden="true">✦</span>\n'
        '</header>\n'
        '<div class="tec-bio-profile__content" markdown="1">\n'
    )
    output = [header]
    intro = rest[:sections[0].start()].strip()
    if intro:
        output.append(intro + "\n\n")
    for index, heading in enumerate(sections):
        title = heading.group(1)
        end = sections[index + 1].start() if index + 1 < len(sections) else len(rest)
        body = rest[heading.end():end].strip()
        if not body:
            continue
        label = escape(LABELS[title])
        modifier = " tec-bio-profile__card--nationality" if title == "Nationality" else ""
        output.append(
            f'<section class="tec-bio-profile__card{modifier}" markdown="1">\n'
            f'<h2>{label}</h2>\n\n'
            f'{body}\n\n'
            '</section>\n'
        )
    output.append('</div>\n</div>\n')
    return "\n".join(output)
