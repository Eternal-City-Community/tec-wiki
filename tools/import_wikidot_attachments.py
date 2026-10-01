#!/usr/bin/env python3
from pathlib import Path
from urllib.parse import quote, unquote
import re, shutil, zipfile

ROOT=Path(".")
DOCS=Path("docs")
ASSETS=DOCS/"assets"/"wikidot"
PARTS=sorted((ROOT/"migration").glob("tec-full.part-*"))
if not PARTS:
    raise SystemExit("No attachment parts found in migration/")

tmp=Path("/tmp/tec-full-backup.zip")
with tmp.open("wb") as out:
    for p in PARTS:
        out.write(p.read_bytes())

copied=0
with zipfile.ZipFile(tmp) as z:
    for info in z.infolist():
        if info.is_dir() or not info.filename.startswith("files/"):
            continue
        rel=Path(info.filename).relative_to("files")
        dest=ASSETS/rel
        dest.parent.mkdir(parents=True,exist_ok=True)
        with z.open(info) as src, dest.open("wb") as dst:
            shutil.copyfileobj(src,dst)
        copied+=1

# Rewrite WDFiles attachment URLs to local static assets.
pat=re.compile(r'https://eternal-city\.wdfiles\.com/local--files/([^/\s)]+)/([^\s)]+)')
rewritten=0
for md in DOCS.rglob("*.md"):
    text=md.read_text(encoding="utf-8",errors="replace")
    def repl(m):
        nonlocal_dummy=None
        page=unquote(m.group(1)); filename=unquote(m.group(2))
        local=ASSETS/page/filename
        if local.exists():
            return "/assets/wikidot/"+quote(page,safe="-_")+"/"+quote(filename,safe="-_.~()%")
        return m.group(0)
    new,n=pat.subn(repl,text)
    rewritten+=n
    if new!=text:
        md.write_text(new,encoding="utf-8")

# Reuse the original Wikidot Colosseum background if present.
bg=ASSETS/"files"/"colosseum-690384.jpg"
css=DOCS/"stylesheets"/"tec.css"
if bg.exists() and css.exists():
    text=css.read_text(encoding="utf-8")
    marker="/* Local TEC background asset */"
    rule='''\n/* Local TEC background asset */\nhtml, body {\n  background-image:\n    linear-gradient(rgba(45,52,34,.38), rgba(45,52,34,.38)),\n    url("/assets/wikidot/files/colosseum-690384.jpg");\n  background-size: cover;\n  background-position: center top;\n  background-attachment: fixed;\n}\n'''\n    if marker not in text:\n        css.write_text(text+rule,encoding="utf-8")

Path("ATTACHMENT_MIGRATION_REPORT.md").write_text(
    "# Attachment migration report\n\n"
    f"- Attachment files copied: **{copied}**\n"
    f"- WDFiles references rewritten: **{rewritten}**\n"
    f"- Split archive parts consumed: **{len(PARTS)}**\n",
    encoding="utf-8"
)
print(Path("ATTACHMENT_MIGRATION_REPORT.md").read_text())
