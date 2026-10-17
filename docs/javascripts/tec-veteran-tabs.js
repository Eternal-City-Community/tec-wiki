TEC.addPageEnhancer("veteran-tabs", function (root, ctx) {
  if (ctx.path.replace(/\/+$/, "") !== "/veteran-characters") return;
  var doc = root.ownerDocument;
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
      if (TEC.headingText(h4s[i]) === label) {
        cursor = i + 1;
        return h4s[i];
      }
    }
    return null;
  }

  function buildTabset(labels, groupIndex) {
    var headings = labels.map(nextHeading).filter(Boolean);
    if (!headings.length) return;

    var shell = doc.createElement("section");
    shell.className = "tec-tabs";
    shell.setAttribute("data-tec-tabset", String(groupIndex));

    var tabs = doc.createElement("div");
    tabs.className = "tec-tabs__bar";
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", groupIndex === 0 ? "Veteran Character combat skill trainers" : "Veteran Character service skill trainers");

    var panels = doc.createElement("div");
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
      var button = doc.createElement("button");
      button.type = "button";
      button.className = "tec-tabs__tab";
      button.id = id + "-tab";
      button.setAttribute("role", "tab");
      button.setAttribute("aria-controls", id);
      button.setAttribute("aria-selected", idx === 0 ? "true" : "false");
      button.tabIndex = idx === 0 ? 0 : -1;
      button.textContent = displayLabel;
      tabs.appendChild(button);

      var panel = doc.createElement("div");
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

  // Vendor headings are h5, while trainer headings are h4. Keep their
  // existing anchor IDs so direct links to individual shops still work.
  function buildVendorTabs() {
    var labels = ["Weapons", "Clothing", "Armor", "Jewelry", "Miscellaneous"];
    var headings = Array.from(root.querySelectorAll("h5")).filter(function (h) {
      return labels.some(function (label) { return TEC.headingText(h) === label + " Vendor"; });
    });
    if (headings.length !== labels.length) return;
    var shell = doc.createElement("section");
    shell.className = "tec-tabs tec-vendor-tabs";
    var bar = doc.createElement("div");
    bar.className = "tec-tabs__bar";
    bar.setAttribute("role", "tablist");
    bar.setAttribute("aria-label", "Veteran Character vendors");
    var panels = doc.createElement("div");
    panels.className = "tec-tabs__panels";
    headings[0].parentNode.insertBefore(shell, headings[0]);
    shell.appendChild(bar);
    shell.appendChild(panels);
    headings.forEach(function (heading, index) {
      var button = doc.createElement("button");
      var panel = doc.createElement("div");
      var id = "vc-vendor-" + index;
      button.type = "button";
      button.className = "tec-tabs__tab";
      button.id = id + "-tab";
      button.textContent = labels[index];
      button.setAttribute("role", "tab");
      button.setAttribute("aria-controls", id);
      button.setAttribute("aria-selected", index === 0 ? "true" : "false");
      button.tabIndex = index === 0 ? 0 : -1;
      panel.id = id;
      panel.className = "tec-tabs__panel";
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", button.id);
      panel.hidden = index !== 0;
      var node = heading;
      var end = headings[index + 1] || null;
      while (node && node !== end) {
        if (node.nodeType === 1 && /^H[1-4]$/.test(node.tagName)) break;
        var next = node.nextSibling;
        panel.appendChild(node);
        node = next;
      }
      heading.classList.add("tec-tabs__source-heading");
      panels.appendChild(panel);
      bar.appendChild(button);
      button.addEventListener("click", function () {
        Array.from(bar.children).forEach(function (tab, i) {
          var active = i === index;
          tab.setAttribute("aria-selected", active ? "true" : "false");
          tab.tabIndex = active ? 0 : -1;
          panels.children[i].hidden = !active;
        });
      });
      button.addEventListener("keydown", function (event) {
        var all = Array.from(bar.children);
        var pos = all.indexOf(button);
        if (event.key === "ArrowRight") pos = (pos + 1) % all.length;
        else if (event.key === "ArrowLeft") pos = (pos - 1 + all.length) % all.length;
        else return;
        event.preventDefault();
        all[pos].focus();
        all[pos].click();
      });
    });
    // A hidden panel cannot be scrolled to. Reveal it first, then scroll
    // the visible tabset into view for both TOC clicks and direct URLs.
    var anchorIds = ["Weapons", "Clothing", "Armor", "Jewelry", "Misc"];
    function activateHash(scroll) {
      var hash = decodeURIComponent(window.location.hash.slice(1));
      var index = anchorIds.indexOf(hash);
      if (index < 0) return;
      bar.children[index].click();
      if (scroll) shell.scrollIntoView({ block: "start" });
    }
    window.addEventListener("hashchange", function () { activateHash(true); });
    // Handle clicks even if the same hash is already in the URL (no
    // hashchange event), and reveal the panel before attempting to scroll.
    root.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var hash = decodeURIComponent(link.getAttribute("href").slice(1));
        var index = anchorIds.indexOf(hash);
        if (index < 0) return;
        event.preventDefault();
        bar.children[index].click();
        if (window.location.hash !== "#" + hash) {
          window.history.pushState(null, "", "#" + hash);
        }
        shell.scrollIntoView({ block: "start", behavior: "instant" });
      });
    });
    window.addEventListener("popstate", function () { activateHash(true); });
    activateHash(!!window.location.hash);

  }

  buildVendorTabs();
  buildTabset(groups[0], 0);
  buildTabset(groups[1], 1);
});
