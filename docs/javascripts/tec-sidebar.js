function initTecSidebar() {
  var host = document.querySelector(".md-sidebar--primary .md-sidebar__inner");
  if (!host || host.querySelector(".tec-side")) return;

  function page(slug) { return "/" + slug + "/"; }
  function link(label, href, cls) {
    return '<a class="tec-side__link' + (cls ? " " + cls : "") + '" href="' + href + '">' + label + '</a>';
  }
  function group(label, items, open) {
    return '<div class="tec-side__group' + (open ? " is-open" : "") + '">' +
      '<button class="tec-side__toggle" type="button" aria-expanded="' + (open ? "true" : "false") + '">' +
      '<span class="tec-side__sign">' + (open ? "−" : "+") + '</span>' + label + '</button>' +
      '<div class="tec-side__children">' + items.join("") + '</div></div>';
  }
  function section(title, body) {
    return '<section class="tec-side__section"><div class="tec-side__plaque">' + title + '</div>' + body.join("") + '</section>';
  }

  var html = '<div class="tec-side">';

  html += section("PLAY NOW", [
    link("The Eternal City Game", "https://www.eternalcitygame.com/"),
    link("The Eternal City Forums", "https://www.eternalcitygame.com/index.php/community/"),
    link("TEC Related Sites", page("tec-related-sites")),
    link("Submit feedback or edits", page("submit-feedback-or-edits")),
    group("Game Clients", [
      link("Orchil", page("orchil"), "tec-side__sub"),
      link("Praetor", page("praetor"), "tec-side__sub"),
      link("TECElite", page("tecelite"), "tec-side__sub")
    ], false)
  ]);

  html += section("Community", [
    '<a class="tec-side__discord" href="https://discord.gg/fevBA8j">JOIN THE<br><strong>DISCORD</strong></a>',
    group("Vote and Promote!", [
      link("MudVerse", "https://www.mudverse.com/game/598", "tec-side__sub"),
      link("MudConnect", "https://www.mudconnect.com/cgi-bin/search.cgi?mode=mud_listing&mud=The+Eternal+City", "tec-side__sub"),
      link("GameScry", "https://game-scry.online/game/the%20eternal%20city", "tec-side__sub"),
      link("TopMudSites! (Deprecated)", "http://bit.ly/VoteTEC", "tec-side__sub"),
      link("Promote on Reddit!", "https://www.reddit.com/r/MUD", "tec-side__sub")
    ], false),
    link("Announcements", page("announcements")),
    link("Official TEC Facebook", "https://www.facebook.com/TheEternalCityGame/"),
    link("TEC Fan Facebook", "https://www.facebook.com/groups/6506471437/")
  ]);

  html += section("Getting Started", [
    link("GET STARTED HERE!", page("getting-started"), "tec-side__strong"),
    link("Search the Site", "#", "tec-side__search"),
    link("General Rules", page("general-rules")),
    link("Account", page("account")),
    link("Character Condition", page("character-condition")),
    group("Character Creation", [
      link("Char Generator", page("character-generator"), "tec-side__sub"),
      link("↳ Veteran Characters", page("veteran-characters"), "tec-side__sub2"),
      link("↳ Traits", page("traits"), "tec-side__sub2"),
      link("↳ National Lores", page("national-lores"), "tec-side__sub2"),
      link("↳ National Advantages", page("national-advantages"), "tec-side__sub2"),
      link("↳ Stats", page("stats"), "tec-side__sub2")
    ], false),
    group("Guides", [
      link("Learning Languages", page("newbie-language-guide"), "tec-side__sub"),
      link("Mission Guide", page("newbie-mission-guide"), "tec-side__sub"),
      link("Money Guide", page("newbie-money-guide"), "tec-side__sub"),
      link("Combat Guide", page("newbie-combat-guide"), "tec-side__sub"),
      link("Non-Combat Guides", page("newbie-non-combat-guides"), "tec-side__sub"),
      link("O'dH - Newbie Office", page("newbie-office"), "tec-side__sub"),
      link("Hunting Guide", page("aoden-hunting-guide"), "tec-side__sub"),
      link("Customization Guide", page("customization-guide"), "tec-side__sub"),
      link("Player's Guide", page("players-guide"), "tec-side__sub")
    ], false),
    group("Role Point Purchases", [
      link("Role Point Expenditures", page("rp-expenditure"), "tec-side__sub"),
      link("↳ Purchasing Property", page("rp-expenditure") + "#properties", "tec-side__sub2"),
      link("Custom Item Requests", page("customization-guide"), "tec-side__sub"),
      link("↳ Item Alterations", page("customization-guide") + "#Alterations", "tec-side__sub2")
    ], false)
  ]);

  html += section("The Game World", [
    link("Midlight", page("game-world"), "tec-side__strong"),
    group("History", [
      link("History of Midlight", page("history"), "tec-side__sub"),
      link("Monlon Invasion", page("monlon-invasion"), "tec-side__sub")
    ], false),
    group("Items", [
      link("Armor", page("armor"), "tec-side__sub"),
      link("House of Mercantile", page("house-of-mercantile"), "tec-side__sub"),
      link("Metals", page("metals"), "tec-side__sub"),
      link("Shops", page("shops"), "tec-side__sub"),
      link("Stones & Ores", page("stones-ores"), "tec-side__sub"),
      link("Weapons", page("weapons"), "tec-side__sub"),
      link("Containers", page("containers"), "tec-side__sub")
    ], false),
    group("Nations", [
      link("Aestivan League", page("aestivan-league"), "tec-side__sub"),
      link("Altene", page("altene"), "tec-side__sub"),
      link("Cenath", page("cenath"), "tec-side__sub"),
      link("Cinera", page("cinera"), "tec-side__sub"),
      link("Fehcratos", page("fehcratos"), "tec-side__sub"),
      link("Gadaene", page("gadaene"), "tec-side__sub"),
      link("Iridine", page("republic-of-iridine"), "tec-side__sub"),
      link("Kelestia", page("kelestia"), "tec-side__sub"),
      link("Panzacor", page("panzacor"), "tec-side__sub"),
      link("Parcines", page("parcines"), "tec-side__sub"),
      link("Remath", page("remath"), "tec-side__sub"),
      link("Safelands", page("safelands"), "tec-side__sub"),
      link("Sostaera", page("sostaera"), "tec-side__sub"),
      link("Tuchea", page("tuchea"), "tec-side__sub"),
      link("Ut-Jor", page("ut-jor"), "tec-side__sub"),
      link("Windward", page("windward"), "tec-side__sub")
    ], false),
    group("Services", [
      link("Buyers", page("services") + "#Buyers", "tec-side__sub"),
      link("Healers", page("services") + "#Healers", "tec-side__sub"),
      link("Innkeepers", page("services") + "#Inns", "tec-side__sub"),
      link("Shopkeepers", page("shops"), "tec-side__sub"),
      link("Trainers", page("trainers"), "tec-side__sub")
    ], false),
    link("Dates & Time", page("dates-and-time")),
    link("Flora & Fauna", page("flora-fauna")),
    link("Law & Order", page("law")),
    link("Library", page("library")),
    link("Organizations", page("orgs")),
    link("Politics", page("republic-of-iridine") + "#Politics"),
    link("Property", page("property")),
    link("Religion", page("religion")),
    link("Reputation", page("reputation")),
    link("Shops", page("shops")),
    link("Wealth", page("wealth"))
  ]);

  html += section("Roleplaying", [
    link("Advanced Commands", page("advanced-commands")),
    link("Advanced Speech", page("advanced-speech")),
    link("Command List", page("commands")),
    link("Macros", page("macros"))
  ]);

  html += section("Getting Around", [
    link("Navigation Overview", page("nav-overview")),
    group("Dangerous Areas", [
      link("All", page("hunting-grounds"), "tec-side__sub"),
      link("East of Invex River", page("hunting-grounds") + "#East", "tec-side__sub"),
      link("Franlius", page("hunting-grounds") + "#Franlius", "tec-side__sub"),
      link("Invex River Delta", page("hunting-grounds") + "#Invex", "tec-side__sub"),
      link("Iridine", page("hunting-grounds") + "#Iridine", "tec-side__sub"),
      link("Monlon", page("hunting-grounds") + "#Monlon", "tec-side__sub"),
      link("Rock Valley", page("hunting-grounds") + "#Rock-Valley", "tec-side__sub"),
      link("Swamps", page("hunting-grounds") + "#Swamps", "tec-side__sub")
    ], false),
    group("Maps", [
      link("All", page("maps"), "tec-side__sub"),
      link("World Map", page("unofficial-world-map"), "tec-side__sub"),
      link("City Of Iridine", page("maps") + "#Iridine", "tec-side__sub"),
      link("The Steps", page("maps") + "#Steps", "tec-side__sub"),
      link("The Invex River Delta", page("maps") + "#WestGrasslands", "tec-side__sub"),
      link("The Salinae Swamp", page("maps") + "#Swamps", "tec-side__sub"),
      link("East of the Salinae River", page("maps") + "#EastGrasslands", "tec-side__sub"),
      link("Rock Valley", page("maps") + "#RockValley", "tec-side__sub"),
      link("Franlius", page("franlius"), "tec-side__sub"),
      link("Monlon", page("maps") + "#Monlon", "tec-side__sub"),
      link("Seld", page("seld"), "tec-side__sub"),
      link("Cullaiden Island", page("maps") + "#Cullaiden", "tec-side__sub")
    ], false)
  ]);

  html += section("Skill Sets & Lores", [
    link("Skills Overview", page("skills")),
    group("Offensive", [
      link("Archery", page("missile-weapons-bows"), "tec-side__sub"),
      link("Brawling", page("brawling"), "tec-side__sub"),
      link("Cestus", page("cestus"), "tec-side__sub"),
      link("Chainblade", page("chainblade"), "tec-side__sub"),
      link("Dual Daggers", page("dual-daggers"), "tec-side__sub"),
      link("Falcata", page("falcata"), "tec-side__sub"),
      link("Falx", page("falx"), "tec-side__sub"),
      link("Hoplite Combat", page("hoplite-combat"), "tec-side__sub"),
      link("Knives", page("knives"), "tec-side__sub"),
      link("↳ Cineran Knife Fighting", page("cineran-knife-fighting-knives"), "tec-side__sub2"),
      link("One-Handed Axes", page("one-handed-axes"), "tec-side__sub"),
      link("One-Handed Swords", page("one-handed-swords"), "tec-side__sub"),
      link("↳ Avros", page("avros-one-handed-swords"), "tec-side__sub2"),
      link("↳ Nelsor", page("nelsor-one-handed-swords"), "tec-side__sub2"),
      link("↳ Pardelian", page("pardelian-one-handed-swords"), "tec-side__sub2"),
      link("One-Handed Crushing", page("one-handed-crushing"), "tec-side__sub"),
      link("Pankration", page("pankration"), "tec-side__sub"),
      link("Two-Handed Axes", page("two-handed-axes"), "tec-side__sub"),
      link("Two-Handed Crushing", page("two-handed-crushing"), "tec-side__sub"),
      link("Sling", page("sling"), "tec-side__sub"),
      link("Spears", page("spears"), "tec-side__sub"),
      link("Staves", page("staves"), "tec-side__sub"),
      link("Tridents", page("tridents"), "tec-side__sub"),
      link("Whips", page("whips"), "tec-side__sub")
    ], false),
    group("Defensive", [
      link("Combat Maneuvers", page("combat-maneuvers"), "tec-side__sub"),
      link("Shields", page("shields"), "tec-side__sub")
    ], false),
    group("Service", [
      link("Healing", page("healing"), "tec-side__sub"),
      link("Locksmithing", page("locksmithing"), "tec-side__sub")
    ], false),
    group("Survival & Crafting", [
      link("Herbalism", page("herbalism"), "tec-side__sub"),
      link("Hunting", page("hunting"), "tec-side__sub"),
      link("Leatherworking", page("leather-working"), "tec-side__sub"),
      link("Outdoor Survival", page("outdoor-survival"), "tec-side__sub"),
      link("Tailoring", page("tailoring"), "tec-side__sub"),
      link("Tanning", page("tanning"), "tec-side__sub"),
      link("Jewelry", page("jewelry"), "tec-side__sub")
    ], false),
    group("Subtlety", [
      link("Pickpocketing", page("pickpocketing"), "tec-side__sub"),
      link("Setups", page("setups"), "tec-side__sub"),
      link("Street Smarts", page("street-smarts"), "tec-side__sub")
    ], false),
    link("Acolyte Skills", page("magic")),
    link("Languages", page("languages"))
  ]);

  html += section("Combat", [
    link("Combat Overview", page("combat-overview")),
    group("Advanced Topics", [
      link("Armor", page("armor"), "tec-side__sub"),
      link("Enemy Guide", page("enemy-guide"), "tec-side__sub"),
      link("PVP Info", page("pvp"), "tec-side__sub"),
      link("Critical Hits", page("critical-hits"), "tec-side__sub")
    ], false),
    link("Macros and Targeting", page("macros-and-targeting")),
    link("Fighting Areas", page("hunting-grounds"))
  ]);

  html += section("Player Submissions", [
    link("Character Bios", page("character-bios")),
    link("Fiction", page("fiction")),
    link("Player Stories", page("player-stories"))
  ]);

  html += "</div>";
  host.innerHTML = html;

  function normalizePath(value) {
    try {
      var url = new URL(value, window.location.origin);
      var path = url.pathname.replace(/\/+/g, "/").replace(/\/$/, "");
      return path || "/";
    } catch (e) {
      return "";
    }
  }

  var currentPath = normalizePath(window.location.href);
  var activeLink = null;

  host.querySelectorAll(".tec-side__link[href]").forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href || href === "#" || /^https?:\/\//i.test(href)) return;

    var linkPath = normalizePath(href);
    if (linkPath && linkPath === currentPath) {
      a.setAttribute("aria-current", "page");
      activeLink = a;
    }
  });

  if (activeLink) {
    var parentGroup = activeLink.closest(".tec-side__group");
    if (parentGroup) {
      parentGroup.classList.add("is-open");
      var parentToggle = parentGroup.querySelector(":scope > .tec-side__toggle");
      if (parentToggle) {
        parentToggle.setAttribute("aria-expanded", "true");
        var sign = parentToggle.querySelector(".tec-side__sign");
        if (sign) sign.textContent = "−";
      }
    }
  }

  host.querySelectorAll(".tec-side__toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      var groupEl = button.closest(".tec-side__group");
      groupEl.classList.toggle("is-open");
      var open = groupEl.classList.contains("is-open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
      button.querySelector(".tec-side__sign").textContent = open ? "−" : "+";
    });
  });

  var searchLink = host.querySelector(".tec-side__search");
  if (searchLink) {
    searchLink.addEventListener("click", function (e) {
      e.preventDefault();
      var searchButton = document.querySelector("[data-md-component='search'] label, .md-header__button[for='__search']");
      if (searchButton) searchButton.click();
    });
  }
}

// Overlay scrollbars (e.g. Firefox on Windows 11) take no width and draw over
// the menu, so the CSS reserves room for them when this class is set.
(function () {
  var probe = document.createElement("div");
  probe.style.cssText = "position:absolute;top:-999px;width:100px;height:50px;overflow-y:scroll;scrollbar-width:thin";
  document.documentElement.appendChild(probe);
  if (probe.offsetWidth === probe.clientWidth) {
    document.documentElement.classList.add("tec-overlay-scrollbars");
  }
  probe.remove();
})();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTecSidebar, { once: true });
} else {
  initTecSidebar();
}
document.addEventListener("DOMContentSwitch", initTecSidebar);
