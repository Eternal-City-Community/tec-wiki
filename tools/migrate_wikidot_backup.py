#!/usr/bin/env python3
"""Convert a Wikidot backup's source/*.txt pages into Markdown for TEC Wiki.

This is intentionally conservative: it converts common TEC/Wikidot constructs and
leaves explicit migration notes for dynamic constructs that cannot be represented
faithfully in a static site.
"""
from __future__ import annotations

import argparse
import html
import re
import zipfile
from collections import Counter
from pathlib import Path
from urllib.parse import quote

EXCLUDE_PREFIXES = (
    "admin_", "admin-", "system_", "system-", "forum_", "forum-",
    "testing_", "testing-", "template_", "template-", "deleted_", "deleted-",
)
EXCLUDE_EXACT = {
    "nav_side", "nav_side-v2", "nav_top", "nav_top-v2", "_template",
    "skill-template", "skill-template-v2", "skill-template-backend",
    "skill-template-backend-v2",
}

SPECIAL_TITLE_WORDS = {
    "tec": "TEC", "mud": "MUD", "ooc": "OOC", "ic": "IC", "npc": "NPC",
    "gm": "GM", "faq": "FAQ", "rb": "RB", "sp": "SP", "hp": "HP",
}


def titleize(slug: str) -> str:
    s = slug.replace("_", " ").replace("-", " ")
    words = []
    for w in s.split():
        lw = w.lower()
        if lw in SPECIAL_TITLE_WORDS:
            words.append(SPECIAL_TITLE_WORDS[lw])
        elif lw == "bio":
            words.append("Bio")
        else:
            words.append(w[:1].upper() + w[1:])
    return " ".join(words) or slug


def slug_from_source_name(name: str) -> str:
    return Path(name).stem


def normalize_slug(raw: str) -> str:
    raw = raw.strip().replace(" ", "-")
    raw = raw.replace(":", "_")
    raw = re.sub(r"[^A-Za-z0-9_.~-]+", "-", raw)
    raw = re.sub(r"-+", "-", raw).strip("-")
    return raw.lower()


def parse_include_args(body: str):
    lines = body.replace("\r", "").split("\n")
    target = lines[0].strip().split()[0] if lines else ""
    rest_first = lines[0].strip()[len(target):].strip() if lines else ""
    parts = ([rest_first] if rest_first else []) + lines[1:]
    params = {}
    current_key = None
    current = []
    for line in parts:
        m = re.match(r"\s*\|?\s*([A-Za-z0-9_-]+)\s*=\s?(.*)$", line)
        if m:
            if current_key is not None:
                params[current_key] = "\n".join(current).strip()
            current_key = m.group(1).upper()
            current = [m.group(2)]
        elif current_key is not None:
            current.append(line)
    if current_key is not None:
        params[current_key] = "\n".join(current).strip()
    return target, params


def render_skill_template(params: dict) -> str:
    skill = params.get("SKILL", "Skill").strip()
    anchor = params.get("ANCHOR", "").strip()
    usage = params.get("USAGE", "").strip()
    desc = params.get("DESCRIPTION", "").strip()
    flavor = params.get("FLAVORTEXT", "").strip()
    example = params.get("EXAMPLE", "").strip()
    out = []
    if anchor and anchor not in {"@@", "@@@@"}:
        out.append(f'<a id="{html.escape(anchor, quote=True)}"></a>')
    heading = f"### {skill}"
    if usage and usage not in {"@@", "@@@@"}:
        heading += f"  *{usage}*"
    out.append(heading)
    if desc and desc not in {"@@", "@@@@"}:
        out.append(desc)
    if flavor and flavor not in {"@@", "@@@@"}:
        out.extend(["> " + ln if ln.strip() else ">" for ln in flavor.splitlines()])
    if example and example not in {"@@", "@@@@"}:
        out.append("**When you see this in use you see:**")
        out.append('<div class="skill-template">')
        out.append(example)
        out.append("</div>")
    return "\n\n".join(out)


def convert_includes(text: str, warnings: Counter) -> str:
    pat = re.compile(r"\[\[include\s+(.+?)\]\]", re.I | re.S)
    def repl(m):
        body = m.group(1)
        target, params = parse_include_args(body)
        norm = target.lower().strip()
        if norm in {"skill-template", "skill-template-v2"}:
            return "\n\n" + render_skill_template(params) + "\n\n"
        warnings["unexpanded_include"] += 1
        label = html.escape(target)
        return f'\n\n!!! note "Migrated include"\n    This page originally included `{label}` on Wikidot. The transcluded content still needs review.\n\n'
    return pat.sub(repl, text)


def convert_comments(text: str) -> str:
    return re.sub(r"\[!--(.*?)--\]", lambda m: "<!--" + m.group(1) + "-->", text, flags=re.S)


def convert_headings(text: str) -> str:
    out=[]
    for line in text.splitlines():
        m=re.match(r"^(\+{1,6})\s+(.*)$", line)
        if m:
            out.append("#" * min(6, len(m.group(1))+1) + " " + m.group(2))
        else:
            out.append(line)
    return "\n".join(out)


def convert_anchors(text: str) -> str:
    text = re.sub(r"\[\[#\s*([^\]]+)\]\]", lambda m: f'<a id="{html.escape(m.group(1).strip(), quote=True)}"></a>', text)
    text = re.sub(r"\[#([A-Za-z0-9_.:-]+)\s+([^\]]+)\]", lambda m: f'[{m.group(2)}](#{m.group(1)})', text)
    return text


def convert_links(text: str) -> str:
    def triple(m):
        body=m.group(1).strip()
        if "|" in body:
            target,label=[x.strip() for x in body.split("|",1)]
        else:
            target=body
            label=body
        frag=""
        if "#" in target:
            target,frag=target.split("#",1)
            frag="#"+frag
        return f'[{label}](/{normalize_slug(target)}/{frag})'
    text=re.sub(r"\[\[\[(.+?)\]\]\]", triple, text, flags=re.S)

    def ext(m):
        url=m.group(2)
        label=(m.group(3) or url).strip()
        return f'[{label}]({url})'
    text=re.sub(r"\[(\*)?(https?://[^\s\]]+)(?:\s+([^\]]+))?\]", ext, text)
    return text


def local_asset_url(page_slug: str, raw: str) -> str:
    raw=raw.strip().lstrip("*")
    raw=raw.replace("http://", "https://")
    if raw.startswith("https://"):
        return raw
    return "https://eternal-city.wdfiles.com/local--files/{}/{}".format(
        quote(page_slug, safe="-_"), quote(raw, safe="-_.~()%")
    )


def convert_images(text: str, page_slug: str, warnings: Counter) -> str:
    pat=re.compile(r"\[\[image\s+([^\]]*)\]\]", re.I)
    def repl(m):
        arg=m.group(1).strip()
        if not arg:
            warnings["empty_image"] += 1
            return ""
        q=re.match(r'''("[^"]+"|'[^']+'|\S+)(.*)$''',arg,re.S)
        if not q:
            return ""
        src=q.group(1).strip('"\'')
        attrs=q.group(2)
        altm=re.search(r'alt="([^"]*)"',attrs,re.I)
        alt=altm.group(1) if altm else ""
        linkm=re.search(r'link="\*?([^"]+)"',attrs,re.I)
        url=local_asset_url(page_slug,src)
        img=f'![{alt}]({url})'
        if linkm:
            return f'[{img}]({linkm.group(1).replace("http://","https://")})'
        return img
    return pat.sub(repl,text)


def parse_table_row(line: str):
    s=line.strip()
    if not s.startswith("||"):
        return None
    core=s[2:]
    if core.endswith("||"):
        core=core[:-2]
    cells=core.split("||")
    out=[]
    headers=[]
    for c in cells:
        c=c.strip()
        is_head=c.startswith("~")
        c=re.sub(r"^[~>=<]+\s*", "", c)
        c=c.replace(" _ ", "<br>").replace("_\n", "<br>\n")
        out.append(c)
        headers.append(is_head)
    return out,headers


def convert_tables(text: str, warnings: Counter) -> str:
    lines=text.splitlines()
    out=[]; i=0
    while i<len(lines):
        if lines[i].lstrip().startswith("||"):
            block=[]
            while i<len(lines) and lines[i].lstrip().startswith("||"):
                block.append(lines[i]); i+=1
            parsed=[parse_table_row(x) for x in block]
            parsed=[x for x in parsed if x]
            if not parsed:
                continue
            width=max(len(x[0]) for x in parsed)
            rows=[]
            for cells,heads in parsed:
                cells += [""]*(width-len(cells))
                cells=[c.replace("|","\\|") for c in cells]
                rows.append((cells,heads))
            out.append("| " + " | ".join(rows[0][0]) + " |")
            out.append("| " + " | ".join(["---"]*width) + " |")
            for cells,_ in rows[1:]:
                out.append("| " + " | ".join(cells) + " |")
            continue
        out.append(lines[i]); i+=1
    return "\n".join(out)


def convert_collapsibles(text: str, warnings: Counter) -> str:
    open_pat=re.compile(r'\[\[collapsible\s+([^\]]*)\]\]',re.I)
    close_pat=re.compile(r'\[\[/collapsible\]\]',re.I)
    def op(m):
        attrs=m.group(1)
        show=re.search(r'show="([^"]+)"',attrs,re.I)
        summary=show.group(1) if show else "Show details"
        return f'\n<details>\n<summary>{html.escape(summary)}</summary>\n\n'
    text=open_pat.sub(op,text)
    text=close_pat.sub("\n</details>\n",text)
    return text


def convert_code(text: str) -> str:
    def repl(m):
        attrs=m.group(1) or ""
        body=m.group(2).strip("\n")
        lang=""
        tm=re.search(r'type="([^"]+)"',attrs,re.I)
        if tm: lang=tm.group(1)
        return f"\n```{lang}\n{body}\n```\n"
    return re.sub(r"\[\[code([^\]]*)\]\](.*?)\[\[/code\]\]",repl,text,flags=re.I|re.S)


def convert_wikidot_anchor_tags(text: str) -> str:
    pat=re.compile(r"\[\[a\s+([^\]]+)\]\](.*?)\[\[/a\]\]", re.I|re.S)
    def repl(m):
        attrs=m.group(1); body=m.group(2)
        hm=re.search(r'href="\*?([^"]+)"',attrs,re.I)
        if not hm: return body
        url=hm.group(1).replace("http://","https://")
        return f'[{body}]({url})'
    return pat.sub(repl,text)


def convert_div_span(text: str) -> str:
    text=re.sub(r"\[\[(?:div|span)\b[^\]]*\]\]", "", text, flags=re.I)
    text=re.sub(r"\[\[/(?:div|span)\]\]", "", text, flags=re.I)
    return text


def convert_modules(text: str, warnings: Counter) -> str:
    pat=re.compile(r"\[\[module\s+([^\]]+)\]\](.*?)\[\[/module\]\]",re.I|re.S)
    def repl(m):
        warnings["dynamic_module"] += 1
        name=m.group(1).split()[0]
        return f'\n\n!!! note "Dynamic Wikidot content"\n    The original page used the `{html.escape(name)}` module here. This dynamic section needs a replacement on the new wiki.\n\n'
    text=pat.sub(repl,text)
    text=re.sub(r"\[\[module\s+([^\]]+)\]\]",lambda m: f'\n> **Migration note:** Wikidot module `{m.group(1).split()[0]}` omitted.\n',text,flags=re.I)
    text=re.sub(r"\[\[/module\]\]", "", text, flags=re.I)
    return text


def convert_html_blocks(text: str, warnings: Counter) -> str:
    def repl(m):
        warnings["html_block"] += 1
        return "\n\n" + m.group(1).strip() + "\n\n"
    return re.sub(r"\[\[html\]\](.*?)\[\[/html\]\]", repl, text, flags=re.I|re.S)


def convert_misc(text: str) -> str:
    text=re.sub(r"\[\[toc\]\]", "", text, flags=re.I)
    text=text.replace("@@@@", "")
    text=re.sub(r"^=\s+", "", text, flags=re.M)
    protected=[]
    def hold_url(m):
        protected.append(m.group(0))
        return f"@@URL{len(protected)-1}@@"
    text=re.sub(r"https?://[^\s)\]<>]+", hold_url, text)
    text=re.sub(r"//([^\n]+?)//", r"*\1*", text)
    for i,u in enumerate(protected):
        text=text.replace(f"@@URL{i}@@",u)
    text=re.sub(r"__([^\n]+?)__", r"<u>\1</u>", text)
    text=re.sub(r"^-{4,}\s*$", "---", text, flags=re.M)
    text=re.sub(r"\[\[size\s+[^\]]+\]\]", "", text, flags=re.I)
    text=re.sub(r"\[\[/size\]\]", "", text, flags=re.I)
    return text


def convert_page(slug: str, source: str, warnings: Counter) -> str:
    text=source.replace("\r\n","\n").replace("\r","\n")
    text=convert_comments(text)
    text=convert_includes(text,warnings)
    text=convert_html_blocks(text,warnings)
    text=convert_modules(text,warnings)
    text=convert_collapsibles(text,warnings)
    text=convert_code(text)
    text=convert_images(text,slug,warnings)
    text=convert_anchors(text)
    text=convert_links(text)
    text=convert_tables(text,warnings)
    text=convert_headings(text)
    text=convert_wikidot_anchor_tags(text)
    text=convert_div_span(text)
    text=convert_misc(text)
    text=re.sub(r"\[\[(?:table|row|cell)\b[^\]]*\]\]", "", text, flags=re.I)
    text=re.sub(r"\[\[/(?:table|row|cell)\]\]", "", text, flags=re.I)
    text=re.sub(r"\n{4,}", "\n\n\n", text).strip()+"\n"
    return f"# {titleize(slug)}\n\n{text}"


def should_exclude(slug: str) -> bool:
    low=slug.lower()
    if low in EXCLUDE_EXACT: return True
    return any(low.startswith(p) for p in EXCLUDE_PREFIXES)


def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("backup",help="Wikidot backup ZIP")
    ap.add_argument("--docs",default="docs",help="Output docs directory")
    ap.add_argument("--include-internal",action="store_true",help="Also migrate Wikidot system/admin/test pages")
    args=ap.parse_args()
    docs=Path(args.docs)
    docs.mkdir(parents=True,exist_ok=True)
    warnings=Counter(); stats=Counter()

    with zipfile.ZipFile(args.backup) as z:
        pages=[n for n in z.namelist() if n.startswith("source/") and n.endswith(".txt")]
        for name in sorted(pages):
            slug=slug_from_source_name(name)
            if should_exclude(slug) and not args.include_internal:
                stats["excluded_internal"] += 1
                continue
            src=z.read(name).decode("utf-8","replace")
            outslug="index" if slug=="homepage" else normalize_slug(slug)
            md=convert_page(slug,src,warnings)
            (docs/f"{outslug}.md").write_text(md,encoding="utf-8")
            stats["migrated"] += 1

    report=docs.parent/"MIGRATION_REPORT.md"
    report.write_text(
        "# Wikidot migration report\n\n"
        f"- Migrated pages: **{stats['migrated']}**\n"
        f"- Excluded Wikidot internal/test/template pages: **{stats['excluded_internal']}**\n"
        f"- Dynamic Wikidot modules needing manual replacement: **{warnings['dynamic_module']}**\n"
        f"- Includes needing manual review: **{warnings['unexpanded_include']}**\n"
        f"- HTML blocks carried through: **{warnings['html_block']}**\n"
        f"- Empty image tags skipped: **{warnings['empty_image']}**\n\n"
        "Images are intentionally linked to the existing Wikidot/WDFiles CDN in the first pass. "
        "This keeps the migrated pages functional while binary attachments are moved separately.\n",
        encoding="utf-8"
    )
    print(report.read_text())

if __name__=="__main__":
    main()
