// Heading text without the "¶" permalink that the toc extension adds.
function tecHeadingText(heading) {
  var copy = heading.cloneNode(true);
  copy.querySelectorAll(".headerlink").forEach(function (link) { link.remove(); });
  return copy.textContent.trim();
}

function initTecVeteranTabs() {
  if (window.location.pathname.replace(/\/+$/, "") !== "/veteran-characters") return;

  var root = document.querySelector(".md-typeset");
  if (!root) return;
  if (root.dataset.tecVeteranTabs === "1") return;
  root.dataset.tecVeteranTabs = "1";

  var groups = [
    [
      "Archery","Pankration","Tridents","Short Whip","Cestus","2H Axes","1H Axes",
      "Clubs","Staves","Spears","Swords","Shields","Knives","Combat Maneuvers",
      "Brawling","Avros","Nelsor","Cineran Knife Fighting","Falcata","Sling",
      "Chainblade","Falx"
    ],
    [
      "Pickpocketing","Outdoors","Hunting","Tailoring","Healing","Locksmithing",
      "Setups","Street Smarts","Herbalism","Tailoring"
    ]
  ];

  var h4s = Array.from(root.querySelectorAll("h4"));
  var cursor = 0;

  function nextHeading(label) {
    for (var i = cursor; i < h4s.length; i++) {
      if (tecHeadingText(h4s[i]) === label) {
        cursor = i + 1;
        return h4s[i];
      }
    }
    return null;
  }

  function buildTabset(labels, groupIndex) {
    var headings = labels.map(nextHeading).filter(Boolean);
    if (!headings.length) return;

    var shell = document.createElement("section");
    shell.className = "tec-tabs";
    shell.setAttribute("data-tec-tabset", String(groupIndex));

    var tabs = document.createElement("div");
    tabs.className = "tec-tabs__bar";
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", groupIndex === 0 ? "Veteran Character combat skill trainers" : "Veteran Character service skill trainers");

    var panels = document.createElement("div");
    panels.className = "tec-tabs__panels";

    headings[0].parentNode.insertBefore(shell, headings[0]);
    shell.appendChild(tabs);
    shell.appendChild(panels);

    headings.forEach(function (heading, idx) {
      var rawLabel = labels[idx] || heading.textContent.trim();
      var displayLabel = rawLabel;
      if (groupIndex === 1 && rawLabel === "Tailoring") {
        var duplicateBefore = labels.slice(0, idx).filter(function (x) { return x === "Tailoring"; }).length;
        displayLabel = duplicateBefore ? "Tailoring (Recipes)" : "Tailoring (Skills)";
      }

      var id = "vc-tabs-" + groupIndex + "-" + idx;
      var button = document.createElement("button");
      button.type = "button";
      button.className = "tec-tabs__tab";
      button.id = id + "-tab";
      button.setAttribute("role", "tab");
      button.setAttribute("aria-controls", id);
      button.setAttribute("aria-selected", idx === 0 ? "true" : "false");
      button.tabIndex = idx === 0 ? 0 : -1;
      button.textContent = displayLabel;
      tabs.appendChild(button);

      var panel = document.createElement("div");
      panel.className = "tec-tabs__panel";
      panel.id = id;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", button.id);
      if (idx !== 0) panel.hidden = true;

      // Move the original heading and its content into this panel.
      var nextMatched = headings[idx + 1] || null;
      var node = heading;
      while (node) {
        var next = node.nextSibling;

        // Group 1 ends before the "A young man" trainer introduction.
        if (groupIndex === 0 && idx === headings.length - 1 && node.nodeType === 1 &&
            /A young man teaches/i.test(node.textContent || "")) {
          break;
        }

        // Group 2 ends before the next main section / Back to Top.
        if (groupIndex === 1 && idx === headings.length - 1 && node.nodeType === 1) {
          var tag = node.tagName ? node.tagName.toLowerCase() : "";
          var txt = (node.textContent || "").trim();
          if ((tag === "h3" && node !== heading) || /^Back to Top$/i.test(txt)) break;
        }

        if (node === nextMatched) break;
        panel.appendChild(node);
        node = next;
      }

      heading.classList.add("tec-tabs__source-heading");
      panels.appendChild(panel);

      button.addEventListener("click", function () {
        tabs.querySelectorAll(".tec-tabs__tab").forEach(function (b) {
          b.setAttribute("aria-selected", "false");
          b.tabIndex = -1;
        });
        panels.querySelectorAll(".tec-tabs__panel").forEach(function (p) { p.hidden = true; });
        button.setAttribute("aria-selected", "true");
        button.tabIndex = 0;
        panel.hidden = false;
      });

      button.addEventListener("keydown", function (event) {
        var all = Array.from(tabs.querySelectorAll(".tec-tabs__tab"));
        var pos = all.indexOf(button);
        if (event.key === "ArrowRight") pos = (pos + 1) % all.length;
        else if (event.key === "ArrowLeft") pos = (pos - 1 + all.length) % all.length;
        else return;
        event.preventDefault();
        all[pos].focus();
        all[pos].click();
      });
    });
  }

  buildTabset(groups[0], 0);
  buildTabset(groups[1], 1);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTecVeteranTabs, { once: true });
} else {
  initTecVeteranTabs();
}
document.addEventListener("DOMContentSwitch", initTecVeteranTabs);
