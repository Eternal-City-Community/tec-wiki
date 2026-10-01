#!/usr/bin/env python3
from pathlib import Path
import html, re

DOCS=Path("docs")
ALIASES={
 "slings":"sling","your-account":"account","time-and-dates":"dates-and-time",
 "national-bonuses":"national-advantages","blackvine":"village-of-blackvine",
 "seld":"village-of-seld","stromheim":"village-of-stromheim",
 "vetallun":"town-of-vetallun","franlius":"town-of-franlius",
 "rock-valley":"town-of-rock-valley","hg-black-hand-caves":"hg-black-hand-caverns",
}
stats={"aliases":0,"stubs":0,"wikidot_links":0}

def titleize(s):
    return " ".join(x[:1].upper()+x[1:] for x in s.replace("_"," ").replace("-"," ").split())

def slugs():
    return {p.stem for p in DOCS.glob("*.md")}

# Rebuild character bio index after ListPages is removed.
bios=[]
for p in DOCS.glob("bio_*.md"):
    t=p.read_text(encoding="utf-8",errors="replace")
    m=re.search(r"^#\s+(.+)$",t,re.M)
    title=m.group(1).strip() if m else titleize(p.stem[4:])
    bios.append((title,p.stem))
bios.sort(key=lambda x:x[0].lower())
body=["# Character Bios","","Character biographies preserved from the original community wiki.","",'<div class="bio-grid">']
for title,slug in bios:
    body+=['<article class="bio-card">','<h3><a href="/'+slug+'/">'+html.escape(title)+'</a></h3>','<a class="bio-card__more" href="/'+slug+'/">Read biography</a>','</article>']
body+=["</div>","",f"**{len(bios)} biographies** are preserved in the migrated archive.",""]
(DOCS/"character-bios.md").write_text("\n".join(body),encoding="utf-8")

existing=slugs()

# Normalize old Wikidot attachment links first so they work before the local
# attachment import. The attachment importer later rewrites these WDFiles URLs
# to /assets/wikidot/... once the binaries are present.
attachment_rel=re.compile(r'\]\(/local--files/([^/]+)/([^\)]+)\)')
pseudo_include=re.compile(r'^> \*\*Archive include:\*\* \[[^\]]+\]\(/_(?:modules|csi|scp|snippets)[^\)]*\)\s*
mdlink=re.compile(r"\]\(/([^/#?)]+)([^)]*)\)")
wikidot=re.compile(r"\]\(https?://eternal-city\.wikidot\.com/([^#?)]+)([^)]*)\)",re.I)
for p in DOCS.glob("*.md"):
    text=p.read_text(encoding="utf-8",errors="replace")
    text=pseudo_include.sub("",text)
    text=attachment_rel.sub(lambda m: "](https://eternal-city.wdfiles.com/local--files/"+m.group(1)+"/"+m.group(2)+")",text)
    def oldsite(m):
        stats["wikidot_links"]+=1
        return "](/"+m.group(1).strip("/")+"/"+m.group(2)+")"
    text=wikidot.sub(oldsite,text)
    def alias(m):
        target=m.group(1); suffix=m.group(2)
        dest=ALIASES.get(target)
        if not dest and target not in existing:
            bio="bio_"+target
            if bio in existing: dest=bio
            elif target.replace("-","_") in existing: dest=target.replace("-","_")
            elif target.replace("_","-") in existing: dest=target.replace("_","-")
        if dest and dest in existing:
            stats["aliases"]+=1
            return "](/"+dest+suffix+")"
        return m.group(0)
    text=mdlink.sub(alias,text)
    # Known source typo that otherwise duplicates the wound text.
    if p.name=="two-handed-crushing.md":
        text=text.replace("Bruise<br><br>Bruise","Bruise")
    p.write_text(text,encoding="utf-8")

existing=slugs()

# Find still-missing internal page targets and create preservation stubs instead of 404s.
missing=set()
for p in DOCS.glob("*.md"):
    text=p.read_text(encoding="utf-8",errors="replace")
    for m in re.finditer(r"\[[^\]]*\]\(/([^/#?)]+)",text):
        target=m.group(1)
        if target not in existing and not target.startswith(("_","http_")):
            missing.add(target)

for target in sorted(missing):
    if target in slugs(): continue
    legacy="https://eternal-city.wikidot.com/"+target
    stub=(
      "# "+titleize(target)+"\n\n"
      "This page is referenced by the migrated TEC wiki, but its source was not present in the Wikidot backup.\n\n"
      "The reference has been preserved so old links do not become a 404. "
      "[Check the legacy Wikidot page]("+legacy+") if it is still available.\n"
    )
    (DOCS/(target+".md")).write_text(stub,encoding="utf-8")
    stats["stubs"]+=1

# Native-search replacement page.
(DOCS/"search_site.md").write_text(
 "# Search the Site\n\nUse the **Search** field in the wiki header. The new site search indexes the migrated Markdown pages directly.\n",
 encoding="utf-8"
)

report=Path("POST_MIGRATION_REPORT.md")
report.write_text(
 "# Post-migration cleanup report\n\n"
 f"- Character biographies indexed: **{len(bios)}**\n"
 f"- Legacy aliases rewritten: **{stats['aliases']}**\n"
 f"- Same-site Wikidot links rewritten locally: **{stats['wikidot_links']}**\n"
 f"- Missing-source preservation stubs created: **{stats['stubs']}**\n",
 encoding="utf-8"
)
print(report.read_text())
,re.M|re.I)

# Rewrite obvious aliases and same-site Wikidot links.
mdlink=re.compile(r"\]\(/([^/#?)]+)([^)]*)\)")
wikidot=re.compile(r"\]\(https?://eternal-city\.wikidot\.com/([^#?)]+)([^)]*)\)",re.I)
for p in DOCS.glob("*.md"):
    text=p.read_text(encoding="utf-8",errors="replace")
    def oldsite(m):
        stats["wikidot_links"]+=1
        return "](/"+m.group(1).strip("/")+"/"+m.group(2)+")"
    text=wikidot.sub(oldsite,text)
    def alias(m):
        target=m.group(1); suffix=m.group(2)
        dest=ALIASES.get(target)
        if not dest and target not in existing:
            bio="bio_"+target
            if bio in existing: dest=bio
            elif target.replace("-","_") in existing: dest=target.replace("-","_")
            elif target.replace("_","-") in existing: dest=target.replace("_","-")
        if dest and dest in existing:
            stats["aliases"]+=1
            return "](/"+dest+suffix+")"
        return m.group(0)
    text=mdlink.sub(alias,text)
    # Known source typo that otherwise duplicates the wound text.
    if p.name=="two-handed-crushing.md":
        text=text.replace("Bruise<br><br>Bruise","Bruise")
    p.write_text(text,encoding="utf-8")

existing=slugs()

# Find still-missing internal page targets and create preservation stubs instead of 404s.
missing=set()
for p in DOCS.glob("*.md"):
    text=p.read_text(encoding="utf-8",errors="replace")
    for m in re.finditer(r"\[[^\]]*\]\(/([^/#?)]+)",text):
        target=m.group(1)
        if target not in existing and not target.startswith(("_","http_")):
            missing.add(target)

for target in sorted(missing):
    if target in slugs(): continue
    legacy="https://eternal-city.wikidot.com/"+target
    stub=(
      "# "+titleize(target)+"\n\n"
      "This page is referenced by the migrated TEC wiki, but its source was not present in the Wikidot backup.\n\n"
      "The reference has been preserved so old links do not become a 404. "
      "[Check the legacy Wikidot page]("+legacy+") if it is still available.\n"
    )
    (DOCS/(target+".md")).write_text(stub,encoding="utf-8")
    stats["stubs"]+=1

# Native-search replacement page.
(DOCS/"search_site.md").write_text(
 "# Search the Site\n\nUse the **Search** field in the wiki header. The new site search indexes the migrated Markdown pages directly.\n",
 encoding="utf-8"
)

report=Path("POST_MIGRATION_REPORT.md")
report.write_text(
 "# Post-migration cleanup report\n\n"
 f"- Character biographies indexed: **{len(bios)}**\n"
 f"- Legacy aliases rewritten: **{stats['aliases']}**\n"
 f"- Same-site Wikidot links rewritten locally: **{stats['wikidot_links']}**\n"
 f"- Missing-source preservation stubs created: **{stats['stubs']}**\n",
 encoding="utf-8"
)
print(report.read_text())
