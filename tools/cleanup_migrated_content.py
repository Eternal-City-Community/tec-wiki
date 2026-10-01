#!/usr/bin/env python3
from pathlib import Path
import re, html

DOCS=Path("docs")
REPORT=Path("CONTENT_CLEANUP_REPORT.md")
stats={"bios_cleaned":0,"rate_notes_removed":0,"links_rewritten":0,"include_notes_replaced":0}
changed=set()
paths={p.stem:p for p in DOCS.glob("*.md")}
slugs=set(paths)

ALIASES={
    "general-narisse":"bio_general-narisse","sordo-calsuan":"bio_sordo-calsuan",
    "valstaron-martius":"bio_valstaron-martius","orasca-calsuan":"bio_orasca-calsuan",
    "warlord-kars":"bio_warlord-kars","warlord-juxta":"bio_warlord-juxta",
    "tivarrus":"bio_tivarrus","cascar-olgulan":"bio_cascar-olgulan",
    "altaran-calsuan":"bio_altaran-calsuan","oman-anande":"bio_oman-anande",
    "septum-anande":"bio_septum-anande","mortarian-santum":"bio_mortarian-santum",
    "sedivain-oradanae":"bio_sedivain-oradanae","astri":"bio_astri",
    "jalian-triarchus":"bio_jalian-triarchus","celeres-illryia":"bio_celeres-illryia",
    "aoden_hunting_guide":"aoden-hunting-guide","way_of_bright_hope":"way-of-bright-hope",
    "slings":"sling","blackvine":"village-of-blackvine","seld":"village-of-seld",
    "stromheim":"village-of-stromheim","vetallun":"town-of-vetallun",
    "franlius":"town-of-franlius","rock-valley":"town-of-rock-valley"
}
for s in list(slugs):
    if "_" in s:
        ALIASES.setdefault(s.replace("_","-"),s)

rate_re=re.compile(
    r'\n*!!! note "Dynamic Wikidot content"\n\s+The original page used the \x60Rate\x60 module here\. This dynamic section needs a replacement on the new wiki\.\n*',
    re.I
)
include_re=re.compile(
    r'!!! note "Migrated include"\n\s+This page originally included \x60([^\x60]+)\x60 on Wikidot\. The transcluded content still needs review\.',
    re.I
)
link_re=re.compile(r'\]\(/([^/#?)]+)([^)]*)\)')

for p in sorted(DOCS.glob("*.md")):
    original=p.read_text(encoding="utf-8",errors="replace")
    text=original
    text,n=rate_re.subn("\n",text)
    if n:
        stats["rate_notes_removed"]+=n
        if p.name.startswith("bio_"):
            stats["bios_cleaned"]+=1

    def inc(m):
        target=m.group(1).strip()
        norm=target.lower().replace(":","_")
        norm=re.sub(r"[^a-z0-9_.-]+","-",norm).strip("-")
        candidate=ALIASES.get(norm,norm)
        if candidate in slugs:
            stats["include_notes_replaced"]+=1
            label=target.replace("-"," ").replace("_"," ").title()
            return '> **Included content:** ['+label+'](/'+candidate+'/)'
        return m.group(0)
    text=include_re.sub(inc,text)

    def lnk(m):
        slug=m.group(1); suffix=m.group(2)
        dest=ALIASES.get(slug,slug)
        if dest!=slug and dest in slugs:
            stats["links_rewritten"]+=1
            return '](/'+dest+suffix+')'
        return m.group(0)
    text=link_re.sub(lnk,text)

    text=re.sub(r'\n{4,}','\n\n\n',text).rstrip()+"\n"
    if text!=original:
        p.write_text(text,encoding="utf-8")
        changed.add(p.name)

bios=[]
for p in sorted(DOCS.glob("bio_*.md")):
    text=p.read_text(encoding="utf-8",errors="replace")
    m=re.search(r'^#\s+(.+)$',text,re.M)
    title=(m.group(1).strip() if m else p.stem[4:].replace("-"," ").replace("_"," ").title())
    body=re.sub(r'<[^>]+>','',text)
    body=re.sub(r'[#>*_\[\]()]',' ',body)
    body=re.sub(r'https?://\S+','',body)
    body=re.sub(r'\s+',' ',body).replace(title,'',1).strip()
    preview=(body[:180].rsplit(" ",1)[0]+"…") if len(body)>180 else body
    bios.append((title,p.stem,preview))
bios.sort(key=lambda x:x[0].lower())

cards=['# Character Bios','',
       'Character biographies preserved from the original community wiki. Select a character to read their page.','',
       '<div class="bio-grid">']
for title,slug,preview in bios:
    cards.append('<article class="bio-card">')
    cards.append('<h3><a href="/'+slug+'/">'+html.escape(title)+'</a></h3>')
    if preview:
        cards.append('<p>'+html.escape(preview)+'</p>')
    cards.append('<a class="bio-card__more" href="/'+slug+'/">Learn More</a>')
    cards.append('</article>')
cards+=['</div>','',f'**{len(bios)} biographies** are currently preserved in the migrated archive.','']
cb=DOCS/"character-bios.md"
new="\n".join(cards)
if not cb.exists() or cb.read_text(encoding="utf-8",errors="replace")!=new:
    cb.write_text(new,encoding="utf-8")
    changed.add(cb.name)

lines=[
"# Content cleanup report","",
f"- Character bio pages cleaned: **{stats['bios_cleaned']}**",
f"- Obsolete Rate-widget placeholders removed: **{stats['rate_notes_removed']}**",
f"- Legacy internal-link aliases rewritten: **{stats['links_rewritten']}**",
f"- Simple migrated-include warnings replaced with local links: **{stats['include_notes_replaced']}**",
f"- Character bios indexed: **{len(bios)}**",
f"- Files changed: **{len(changed)}**","",
"## Changed files",""
]+["- "+x for x in sorted(changed)]
REPORT.write_text("\n".join(lines)+"\n",encoding="utf-8")
print("\n".join(lines[:9]))
