#!/usr/bin/env python3
from pathlib import Path
import re

DOCS = Path("docs")
SKIP = {"admin", "assets", "javascripts", "stylesheets"}

def classify(slug, title):
    s = slug.lower()
    t = title.lower()
    if s.startswith("bio_") or s in {"character-bios"}:
        return "Character Bios"
    if s.startswith("archived_"):
        return "Archive"
    if any(k in s for k in ["map", "iridine", "monlon", "vetallun", "blackvine", "seld", "stromheim", "franlius", "rock-valley", "grasslands", "swamp", "cullaiden", "steps", "harbor", "forum", "colosseum", "sewers", "catacombs", "ravines", "mine", "cavern", "villa", "island", "village", "town-of", "city-of"]):
        return "World & Maps"
    if any(k in s for k in ["jewelry", "leather", "tailor", "craft", "smith", "metal", "gem", "wax", "mold", "woodwork", "cooking"]):
        return "Crafting & Trade"
    if any(k in s for k in ["armor", "weapon", "sword", "falx", "falcata", "trident", "archery", "sling", "shield", "axe", "club", "staff", "spear", "knife", "whip", "cestus", "pankration", "brawling", "combat", "dodge", "block", "crushing", "hunting", "avros"]):
        return "Skills & Combat"
    if any(k in s for k in ["guide", "commands", "speech", "language", "getting-started", "account", "character-creation", "newbie"]):
        return "Guides & Commands"
    if any(k in s for k in ["shop", "item", "equipment", "coin", "money", "bank", "merchant", "price", "material"]):
        return "Items & Economy"
    if any(k in s for k in ["religion", "culture", "history", "geography", "battle", "legion", "organization", "orgs", "assemblies", "legislation", "calendar", "year", "ama", "announcements", "state-of-the-game"]):
        return "Lore & Community"
    if s in {"about", "browser-editing", "faq", "index"} or any(k in s for k in ["wiki", "troubleshoot"]):
        return "Wiki & Help"
    return "Reference"

changed = 0
counts = {}
for path in sorted(DOCS.rglob("*.md")):
    rel = path.relative_to(DOCS)
    if rel.parts and rel.parts[0] in SKIP:
        continue
    text = path.read_text(encoding="utf-8", errors="replace")
    if not text.startswith("---\n"):
        continue
    end = text.find("\n---\n", 4)
    if end == -1:
        continue
    front = text[4:end]
    body = text[end+5:]
    m = re.search(r'(?m)^title:\s*["\']?(.*?)["\']?\s*$', front)
    title = m.group(1).strip() if m else path.stem.replace("-", " ").title()
    category = classify(path.stem, title)
    counts[category] = counts.get(category, 0) + 1
    if re.search(r"(?m)^category:\s*", front):
        newfront = re.sub(r"(?m)^category:\s*.*$", f'category: "{category}"', front)
    else:
        newfront = front.rstrip() + f'\ncategory: "{category}"'
    newtext = "---\n" + newfront + "\n---\n" + body
    if newtext != text:
        path.write_text(newtext, encoding="utf-8")
        changed += 1

print(f"Updated category metadata on {changed} pages.")
for k in sorted(counts):
    print(f"{k}: {counts[k]}")
