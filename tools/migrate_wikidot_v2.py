#!/usr/bin/env python3
from __future__ import annotations
import argparse, html, re, zipfile
from collections import Counter
from pathlib import Path
from urllib.parse import quote

EXCLUDE_PREFIXES=("admin_","admin-","system_","system-","forum_","forum-","testing_","testing-","template_","template-","deleted_","deleted-")
EXCLUDE_EXACT={"nav_side","nav_side-v2","nav_top","nav_top-v2","_template","skill-template","skill-template-v2","skill-template-backend","skill-template-backend-v2"}
SPECIAL={"tec":"TEC","mud":"MUD","ooc":"OOC","ic":"IC","npc":"NPC","gm":"GM","faq":"FAQ","rb":"RB","sp":"SP","hp":"HP"}

def normalize_slug(raw):
    raw=raw.strip().replace(" ","-").replace(":","_")
    raw=re.sub(r"[^A-Za-z0-9_.~-]+","-",raw)
    return re.sub(r"-+","-",raw).strip("-").lower()

def titleize(slug):
    return " ".join(SPECIAL.get(w.lower(),w[:1].upper()+w[1:]) for w in slug.replace("_"," ").replace("-"," ").split()) or slug

def parse_include_args(body):
    lines=body.replace("\r","").split("\n")
    target=lines[0].strip().split()[0] if lines else ""
    rest=lines[0].strip()[len(target):].strip() if lines else ""
    parts=([rest] if rest else [])+lines[1:]
    params={}; key=None; cur=[]
    for line in parts:
        m=re.match(r"\s*\|?\s*([A-Za-z0-9_-]+)\s*=\s?(.*)$",line)
        if m:
            if key is not None: params[key]="\n".join(cur).strip()
            key=m.group(1).upper(); cur=[m.group(2)]
        elif key is not None: cur.append(line)
    if key is not None: params[key]="\n".join(cur).strip()
    return target,params

def render_skill_template(p):
    out=[]; anchor=p.get("ANCHOR","").strip(); skill=p.get("SKILL","Skill").strip()
    usage=p.get("USAGE","").strip(); desc=p.get("DESCRIPTION","").strip()
    flavor=p.get("FLAVORTEXT","").strip(); ex=p.get("EXAMPLE","").strip()
    if anchor and anchor not in {"@@","@@@@"}: out.append(f'<a id="{html.escape(anchor,quote=True)}"></a>')
    h=f"### {skill}"
    if usage and usage not in {"@@","@@@@"}: h+=f"  *{usage}*"
    out.append(h)
    if desc and desc not in {"@@","@@@@"}: out.append(desc)
    if flavor and flavor not in {"@@","@@@@"}: out.extend(["> "+x if x.strip() else ">" for x in flavor.splitlines()])
    if ex and ex not in {"@@","@@@@"}: out+=["**When you see this in use you see:**",'<div class="skill-template">',ex,"</div>"]
    return "\n\n".join(out)

def convert_includes(text,warnings,source_map,depth=0):
    pat=re.compile(r"\[\[include\s+(.+?)\]\]",re.I|re.S)
    def repl(m):
        target,params=parse_include_args(m.group(1)); norm=target.lower().strip()
        if norm in {"skill-template","skill-template-v2"}: return "\n\n"+render_skill_template(params)+"\n\n"
        if depth<5:
            key=normalize_slug(target.replace(":","_"))
            if key in source_map:
                warnings["expanded_include"]+=1
                return "\n\n"+convert_includes(source_map[key],warnings,source_map,depth+1)+"\n\n"
        warnings["unexpanded_include"]+=1
        return "\n\n> **Archive include:** ["+html.escape(target)+"](/"+normalize_slug(target.replace(":","_"))+"/)\n\n"
    return pat.sub(repl,text)

def convert_comments(text):
    return re.sub(r"\[!--(.*?)--\]",lambda m:"<!--"+m.group(1)+"-->",text,flags=re.S)

def convert_headings(text):
    out=[]
    for line in text.splitlines():
        m=re.match(r"^(\+{1,6})(?:\*)?\s+(.*)$",line)
        out.append("#"*min(6,len(m.group(1))+1)+" "+m.group(2) if m else line)
    return "\n".join(out)

def convert_anchors(text):
    text=re.sub(r"\[\[#\s*([^\]]+)\]\]",lambda m:f'<a id="{html.escape(m.group(1).strip(),quote=True)}"></a>',text)
    return re.sub(r"\[#([A-Za-z0-9_.:-]+)\s+([^\]]+)\]",lambda m:f'[{m.group(2)}](#{m.group(1)})',text)

def same_site_url(url):
    m=re.match(r"https?://eternal-city\.wikidot\.com/([^#?]+)(#[^?]+)?",url,re.I)
    if not m: return None
    return "/"+normalize_slug(m.group(1))+"/"+(m.group(2) or "")

def convert_links(text):
    def triple(m):
        body=m.group(1).strip()
        if "|" in body: target,label=[x.strip() for x in body.split("|",1)]
        else: target=body; label=body
        target=target.lstrip("*")
        if target.startswith(("http://","https://")):
            return f'[{label}]({same_site_url(target) or target.replace("http://","https://")})'
        frag=""
        if "#" in target: target,frag=target.split("#",1); frag="#"+frag
        return f'[{label}](/{normalize_slug(target)}/{frag})'
    text=re.sub(r"\[\[\[(.+?)\]\]\]",triple,text,flags=re.S)
    def ext(m):
        url=m.group(2).replace("http://","https://"); label=(m.group(3) or url).strip()
        return f'[{label}]({same_site_url(url) or url})'
    return re.sub(r"\[(\*)?(https?://[^\s\]]+)(?:\s+([^\]]+))?\]",ext,text)

def local_asset_url(page,raw):
    raw=raw.strip().lstrip("*").replace("http://","https://")
    if raw.startswith("https://"): return raw
    return "https://eternal-city.wdfiles.com/local--files/{}/{}".format(quote(page,safe="-_"),quote(raw,safe="-_.~()%"))

def convert_images(text,page,warnings):
    pat=re.compile(r"\[\[image\s+([^\]]*)\]\]",re.I)
    def repl(m):
        arg=m.group(1).strip()
        if not arg: warnings["empty_image"]+=1; return ""
        q=re.match(r'''("[^"]+"|'[^']+'|\S+)(.*)$''',arg,re.S)
        if not q: return ""
        src=q.group(1).strip('"\''); attrs=q.group(2)
        altm=re.search(r'alt="([^"]*)"',attrs,re.I); alt=altm.group(1) if altm else ""
        linkm=re.search(r'link="\*?([^"]+)"',attrs,re.I)
        img=f'![{alt}]({local_asset_url(page,src)})'
        return f'[{img}]({linkm.group(1).replace("http://","https://")})' if linkm else img
    return pat.sub(repl,text)

def parse_table_row(raw):
    s=raw.strip()
    if not s.startswith("||"): return None
    core=s[2:]
    if core.rstrip().endswith("||"): core=core.rstrip()[:-2]
    cells=core.split("||"); out=[]
    for cell in cells:
        cell=cell.strip()
        cell=re.sub(r"^(?:~|=|<(?=\s)|>(?=\s))+\s*","",cell)
        cell=re.sub(r"\s*_\s*\n\s*_?\s*","<br><br>",cell)
        cell=re.sub(r"\s*_\s*\n\s*","<br>",cell)
        cell=cell.replace("\n","<br>")
        cell=re.sub(r"(?:<br>\s*){3,}","<br><br>",cell)
        out.append(cell.strip())
    return out

def convert_tables(text,warnings):
    lines=text.splitlines(); out=[]; i=0
    while i<len(lines):
        if not lines[i].lstrip().startswith("||"): out.append(lines[i]); i+=1; continue
        raw=[]
        while i<len(lines) and lines[i].lstrip().startswith("||"):
            parts=[lines[i].lstrip()]; i+=1
            while not parts[-1].rstrip().endswith("||") and i<len(lines):
                parts.append(lines[i]); i+=1
            raw.append("\n".join(parts))
        rows=[parse_table_row(r) for r in raw]; rows=[r for r in rows if r]
        if not rows: continue
        width=max(map(len,rows)); rows=[r+[""]*(width-len(r)) for r in rows]
        rows=[[c.replace("|","\\|") for c in r] for r in rows]
        out.append("| "+" | ".join(rows[0])+" |"); out.append("| "+" | ".join(["---"]*width)+" |")
        for r in rows[1:]: out.append("| "+" | ".join(r)+" |")
    return "\n".join(out)

def convert_collapsibles(text):
    def op(m):
        show=re.search(r'show="([^"]+)"',m.group(1),re.I)
        return f'\n<details>\n<summary>{html.escape(show.group(1) if show else "Show details")}</summary>\n\n'
    text=re.sub(r'\[\[collapsible\s+([^\]]*)\]\]',op,text,flags=re.I)
    return re.sub(r'\[\[/collapsible\]\]','\n</details>\n',text,flags=re.I)

def convert_code(text):
    def repl(m):
        tm=re.search(r'type="([^"]+)"',m.group(1) or "",re.I); lang=tm.group(1) if tm else ""
        return "\n~~~"+lang+"\n"+m.group(2).strip()+"\n~~~\n"
    return re.sub(r"\[\[code([^\]]*)\]\](.*?)\[\[/code\]\]",repl,text,flags=re.I|re.S)

def convert_anchor_tags(text):
    def repl(m):
        hm=re.search(r'href="\*?([^"]+)"',m.group(1),re.I)
        return f'[{m.group(2)}]({hm.group(1).replace("http://","https://")})' if hm else m.group(2)
    return re.sub(r"\[\[a\s+([^\]]+)\]\](.*?)\[\[/a\]\]",repl,text,flags=re.I|re.S)

def convert_wrappers(text):
    text=re.sub(r"\[\[(?:div|span)\b[^\]]*\]\]","",text,flags=re.I)
    text=re.sub(r"\[\[/(?:div|span)\]\]","",text,flags=re.I)
    # Wikidot alignment wrappers such as [[>]] ... [[/>]] and [[=]] ... [[/=]].
    text=re.sub(r"\[\[/?[<>=]\]\]","",text)
    return text

def convert_modules(text,warnings):
    paired=re.compile(r"\[\[module\s+([^\]]+)\]\](.*?)\[\[/module\]\]",re.I|re.S)
    def pair(m):
        name=m.group(1).split()[0].lower()
        if name in {"css","rate"}: return "\n"
        warnings["dynamic_module"]+=1
        return "\n> **Archive note:** Wikidot module "+html.escape(name)+" was not portable and has been omitted.\n"
    text=paired.sub(pair,text)
    def single(m):
        attrs=m.group(1); name=attrs.split()[0].lower()
        if name in {"rate","css"}: return ""
        if name=="redirect":
            dm=re.search(r'destination="([^"]+)"',attrs,re.I)
            if not dm: return ""
            dest=dm.group(1).strip(); local=same_site_url(dest)
            if not local and not dest.startswith(("http://","https://")): local="/"+normalize_slug(dest.strip("/"))+"/"
            dest=local or dest.replace("http://","https://")
            warnings["redirect_module"]+=1
            return '\n<meta http-equiv="refresh" content="0; url='+html.escape(dest,quote=True)+'">\n\nThis page has moved to ['+dest+']('+dest+').\n'
        if name=="search": warnings["search_module"]+=1; return "\nUse the **Search** control in the site header to search the migrated wiki.\n"
        if name=="frontforum": warnings["forum_module"]+=1; return "\n> **Forum feed:** See [In-Game News](/in-game-news/) and the official TEC forums for current discussion.\n"
        if name=="mailform": warnings["mailform_module"]+=1; return "\n> **Contact:** Use the community/editor links in the wiki navigation.\n"
        if name in {"newpage","pagetree","listpages","pagesbytag","pages","categories","tagcloud","backlinks","sitegrid","ratedpages","topratedpages","wantedpages","orphanedpages","sitechanges","recentposts","recentthreads","forumcategory","forumnewthread","forumthread","forumstart","members","managesite"}:
            warnings["static_"+name]+=1; return ""
        warnings["dynamic_module"]+=1
        return "\n> **Archive note:** Wikidot module "+html.escape(name)+" was not portable and has been omitted.\n"
    text=re.sub(r"\[\[module\s+([^\]]+)\]\]",single,text,flags=re.I)
    return re.sub(r"\[\[/module\]\]","",text,flags=re.I)

def convert_html(text,warnings):
    def repl(m): warnings["html_block"]+=1; return "\n\n"+m.group(1).strip()+"\n\n"
    return re.sub(r"\[\[html\]\](.*?)\[\[/html\]\]",repl,text,flags=re.I|re.S)

def convert_misc(text):
    text=re.sub(r"\[\[toc\]\]","",text,flags=re.I)
    text=re.sub(r"@@(.*?)@@",r"\1",text,flags=re.S)
    text=re.sub(r"^=\s+","",text,flags=re.M)
    protected=[]
    def hold(m): protected.append(m.group(0)); return "@@URL"+str(len(protected)-1)+"@@"
    text=re.sub(r"https?://[^\s)\]<>]+",hold,text)
    text=re.sub(r"//([^\n]+?)//",r"*\1*",text)
    for i,u in enumerate(protected): text=text.replace("@@URL"+str(i)+"@@",u)
    text=re.sub(r"__([^\n]+?)__",r"<u>\1</u>",text)
    text=re.sub(r"^-{4,}\s*$","---",text,flags=re.M)
    text=re.sub(r"\[\[/?size[^\]]*\]\]","",text,flags=re.I)
    return text

def convert_page(slug,source,warnings,source_map):
    text=source.replace("\r\n","\n").replace("\r","\n")
    text=convert_comments(text); text=convert_includes(text,warnings,source_map)
    text=convert_html(text,warnings); text=convert_modules(text,warnings); text=convert_collapsibles(text)
    text=convert_code(text); text=convert_images(text,slug,warnings); text=convert_anchors(text); text=convert_links(text)
    text=convert_tables(text,warnings); text=convert_headings(text); text=convert_anchor_tags(text); text=convert_wrappers(text); text=convert_misc(text)
    text=re.sub(r"\[\[/?(?:table|row|cell)\b[^\]]*\]\]","",text,flags=re.I)
    text=re.sub(r"\n{4,}","\n\n\n",text).strip()+"\n"
    return "# "+titleize(slug)+"\n\n"+text

def excluded(slug):
    low=slug.lower()
    return low in EXCLUDE_EXACT or any(low.startswith(x) for x in EXCLUDE_PREFIXES)

def main():
    ap=argparse.ArgumentParser(); ap.add_argument("backup"); ap.add_argument("--docs",default="docs"); ap.add_argument("--include-internal",action="store_true")
    a=ap.parse_args(); docs=Path(a.docs); docs.mkdir(parents=True,exist_ok=True)
    warnings=Counter(); stats=Counter()
    with zipfile.ZipFile(a.backup) as z:
        pages=[n for n in z.namelist() if n.startswith("source/") and n.endswith(".txt")]
        source_map={normalize_slug(Path(n).stem.replace(":","_")):z.read(n).decode("utf-8","replace") for n in pages}
        for name in sorted(pages):
            slug=Path(name).stem
            if excluded(slug) and not a.include_internal: stats["excluded_internal"]+=1; continue
            outslug="index" if slug=="homepage" else normalize_slug(slug)
            (docs/(outslug+".md")).write_text(convert_page(slug,z.read(name).decode("utf-8","replace"),warnings,source_map),encoding="utf-8")
            stats["migrated"]+=1
    report=docs.parent/"MIGRATION_REPORT.md"
    report.write_text(
        "# Wikidot migration report\n\n"
        "- Migrated pages: **"+str(stats["migrated"])+"**\n"
        "- Excluded Wikidot internal/test/template pages: **"+str(stats["excluded_internal"])+"**\n"
        "- Dynamic modules still requiring manual replacement: **"+str(warnings["dynamic_module"])+"**\n"
        "- Includes expanded automatically: **"+str(warnings["expanded_include"])+"**\n"
        "- Includes needing manual review: **"+str(warnings["unexpanded_include"])+"**\n"
        "- HTML blocks carried through: **"+str(warnings["html_block"])+"**\n"
        "- Empty image tags skipped: **"+str(warnings["empty_image"])+"**\n\n"
        "Images remain on WDFiles until the attachment import is completed.\n",encoding="utf-8")
    print(report.read_text())

if __name__=="__main__": main()
