#!/usr/bin/env python3
from pathlib import Path
from urllib.parse import quote, unquote
import hashlib
import re
import shutil
import zipfile

ROOT = Path(".")
DOCS = Path("docs")
ASSETS = DOCS / "assets" / "wikidot"
MIGRATION = ROOT / "migration"
PARTS = [MIGRATION / f"tec-full.part-{i:02d}" for i in range(7)]
CHECKSUMS = MIGRATION / "tec-full-parts.sha256"

missing = [str(p) for p in PARTS if not p.exists()]
if missing:
    raise SystemExit("Missing archive parts: " + ", ".join(missing))

verified = 0
if CHECKSUMS.exists():
    expected = {}
    for line in CHECKSUMS.read_text(encoding="utf-8", errors="replace").splitlines():
        line = line.strip()
        if not line:
            continue
        bits = line.split()
        if len(bits) >= 2:
            expected[Path(bits[-1]).name] = bits[0].lower()
    for p in PARTS:
        want = expected.get(p.name)
        if not want:
            continue
        h = hashlib.sha256()
        with p.open("rb") as fh:
            for chunk in iter(lambda: fh.read(1024 * 1024), b""):
                h.update(chunk)
        got = h.hexdigest().lower()
        if got != want:
            raise SystemExit(f"Checksum mismatch for {p.name}: expected {want}, got {got}")
        verified += 1

tmp = Path("/tmp/tec-full-backup.zip")
with tmp.open("wb") as out:
    for p in PARTS:
        with p.open("rb") as src:
            shutil.copyfileobj(src, out, length=1024 * 1024)

copied = 0
skipped_fonts = 0
with zipfile.ZipFile(tmp) as z:
    bad = z.testzip()
    if bad:
        raise SystemExit(f"ZIP integrity check failed at {bad}")
    for info in z.infolist():
        if info.is_dir() or not info.filename.startswith("files/"):
            continue
        rel = Path(info.filename).relative_to("files")
        if rel.suffix.lower() in {".ttf", ".otf", ".woff", ".woff2", ".eot"}:
            skipped_fonts += 1
            continue
        dest = ASSETS / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        with z.open(info) as src, dest.open("wb") as dst:
            shutil.copyfileobj(src, dst, length=1024 * 1024)
        copied += 1

wdfiles = re.compile(r"https://eternal-city\.wdfiles\.com/local--files/([^/\s)\"']+)/([^\s)\"']+)", re.I)
rewritten = 0
unresolved_assets = set()

for md in DOCS.rglob("*.md"):
    text = md.read_text(encoding="utf-8", errors="replace")
    def repl(m):
        page = unquote(m.group(1))
        filename = unquote(m.group(2)).rstrip("/")
        local = ASSETS / page / filename
        if local.exists():
            rel = local.relative_to(ASSETS)
            return "/assets/wikidot/" + "/".join(quote(part, safe="-_.~()%") for part in rel.parts)

        # Wikidot sometimes served a file through a page alias different from
        # the folder used in the backup. If the filename exists uniquely
        # elsewhere in the migrated assets, use that copy.
        matches = [p for p in ASSETS.rglob(filename) if p.is_file()]
        if len(matches) == 1:
            rel = matches[0].relative_to(ASSETS)
            return "/assets/wikidot/" + "/".join(quote(part, safe="-_.~()%") for part in rel.parts)

        unresolved_assets.add(f"{page}/{filename}")
        return m.group(0)
    new, n = wdfiles.subn(repl, text)
    rewritten += n
    if new != text:
        md.write_text(new, encoding="utf-8")

bg = ASSETS / "files" / "colosseum-690384.jpg"
css = DOCS / "stylesheets" / "tec.css"
if bg.exists() and css.exists():
    css_text = css.read_text(encoding="utf-8", errors="replace")
    marker = "/* Local TEC background asset */"
    rule = """

/* Local TEC background asset */
html, body {
  background-image:
    linear-gradient(rgba(45,52,34,.38), rgba(45,52,34,.38)),
    url("/assets/wikidot/files/colosseum-690384.jpg");
  background-size: cover;
  background-position: center top;
  background-attachment: fixed;
}
"""
    if marker not in css_text:
        css.write_text(css_text.rstrip() + "\n" + rule, encoding="utf-8")

report = Path("ATTACHMENT_MIGRATION_REPORT.md")
report.write_text(
    "# Attachment migration report\n\n"
    + f"- Split archive parts consumed: **{len(PARTS)}**\n"
    + f"- Parts verified against SHA-256 file: **{verified}**\n"
    + f"- Attachment files copied: **{copied}**\n"
    + f"- Font files intentionally excluded: **{skipped_fonts}**\n"
    + f"- WDFiles references rewritten locally: **{rewritten}**\n"
    + f"- Referenced assets not found in the backup: **{len(unresolved_assets)}**\n\n"
    + (
        "## Referenced assets not found\n\n"
        + "\n".join("- " + x for x in sorted(unresolved_assets))
        + "\n"
        if unresolved_assets else ""
      ),
    encoding="utf-8",
)
print(report.read_text())
