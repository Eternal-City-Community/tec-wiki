function initTecTool() {
  var root = document.getElementById("tec-rb-calculator");
  if (!root || root.dataset.tecRbReady === "1") return;
  root.dataset.tecRbReady = "1";

  var tierEnds = [0, 10, 30, 50, 100, 150, 200, 500, 1000];
  var tierMods = [3, 2, 1, 0.5, 0.25, 0.125, 0.0675, 0.025, 0.01];

  // ---- Saved settings (same cookie names/values as the old calculator) ----
  var modeCookie = { offense: "sword", defense: "shield", noncombat: "tree" };
  var rowCookie = { "5": "five", "3": "three", "1": "one" };
  var colCookie = { "5": "five", "3": "three" };
  var decCookie = { "0": "none", "1": "one", "2": "two", "3": "three", "8": "infin" };

  function setCookie(name, value) {
    try {
      var d = new Date();
      d.setTime(d.getTime() + 999 * 24 * 60 * 60 * 1000);
      document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
    } catch (e) {}
  }

  function getCookie(name) {
    try {
      var prefix = name + "=";
      var parts = document.cookie.split(";");
      for (var i = 0; i < parts.length; i++) {
        var c = parts[i].trim();
        if (c.indexOf(prefix) === 0) return c.substring(prefix.length);
      }
    } catch (e) {}
    return "";
  }

  function loadSetting(map, cookieName, fallback) {
    var saved = getCookie(cookieName);
    for (var key in map) {
      if (map[key] === saved) return key;
    }
    return fallback;
  }

  // One set of settings shared by every calculator on the page,
  // like the single toolbar in the old version.
  var settings = {
    mode: loadSetting(modeCookie, "rbTypeButton", "offense"),
    rows: Number(loadSetting(rowCookie, "rbRowButton", "5")),
    cols: Number(loadSetting(colCookie, "rbColButton", "5")),
    decimals: Number(loadSetting(decCookie, "rbDecButton", "8"))
  };

  function saveSettings() {
    setCookie("rbTypeButton", modeCookie[settings.mode]);
    setCookie("rbRowButton", rowCookie[settings.rows]);
    setCookie("rbColButton", colCookie[settings.cols]);
    setCookie("rbDecButton", decCookie[settings.decimals]);
  }

  function renderAll() {
    renderToolbar();
    root.querySelectorAll(".tec-rb-calculator-card").forEach(function (c) {
      c.tecRender();
    });
  }

  function tierBonus(rank) {
    rank = Math.max(0, Number(rank) || 0);
    var bonus = 0;

    for (var i = 0; i < tierEnds.length; i++) {
      var start = tierEnds[i];
      var end = i + 1 < tierEnds.length ? tierEnds[i + 1] : rank;
      if (rank <= start) break;

      bonus += (Math.min(rank, end) - start) * tierMods[i];
      if (rank <= end) break;
    }

    // All tier values are exact to 8 decimal places; rounding here removes
    // float noise (e.g. 29.999999999999996) so Math.floor() behaves correctly.
    return Math.round(bonus * 1e8) / 1e8;
  }

  function formatNumber(n, decimals) {
    if (n == null || !isFinite(n)) return "";

    // Work in whole units of 1e-8 so truncation is exact (matches the old
    // Decimal.js behavior), then truncate down to the requested places.
    var units = Math.round(n * 1e8);

    if (decimals >= 8) {
      return String(units / 1e8);
    }

    var step = Math.pow(10, 8 - decimals);
    return String((units - (units % step)) / step / Math.pow(10, decimals));
  }

  function stanceRows(mode, rowCount) {
    // Non-combat has a single unlabeled row; the old calculator hid the
    // stance label column entirely in this mode.
    if (mode === "noncombat") {
      return [{ label: null, mod: 1 }];
    }

    var rows = [
      { label: "Bers.", attack: 1, defense: 0 },
      { label: "Aggr.", attack: 0.75, defense: 0.25 },
      { label: "Norm.", attack: 0.5, defense: 0.5 },
      { label: "Wary", attack: 0.25, defense: 0.75 },
      { label: "Def.", attack: 0, defense: 1 }
    ].map(function (row) {
      return {
        label: row.label,
        mod: mode === "defense" ? row.defense : row.attack
      };
    });

    // Old calculator listed defense rows top-to-bottom as Def, Wary, Norm, Aggr, Bers
    if (mode === "defense") rows.reverse();

    if (rowCount === 1) return [rows[2]];
    if (rowCount === 3) return [rows[1], rows[2], rows[3]];
    return rows;
  }

  function calculate(basicsRaw, subRaw, difficultyModifier, stanceModifier, basicOnly) {
    var basicsRank = Number(basicsRaw) || 0;
    var subRank = Number(subRaw) || 0;

    if (basicOnly) {
      // Old behavior: Basic column is blank when Basics rank is empty or < 1.
      if (basicsRaw === "" || basicsRank < 1) return null;

      // Matches the old Wikidot Basic column: the entered Basics rank is
      // treated as the rank whose raw RB is being displayed.
      return tierBonus(basicsRank) * stanceModifier;
    }

    // Old behavior: Easy/Avg./Diff./Impos. are blank when Subskill rank is empty.
    if (subRaw === "") return null;

    // Preserve the old Wikidot formula exactly:
    // floor(Basics RB) * difficulty modifier + Subskill RB, then apply stance.
    return (
      (Math.floor(tierBonus(basicsRank)) * difficultyModifier + tierBonus(subRank)) *
      stanceModifier
    );
  }

  // The toolbar is rendered once above all calculators, like the old version.
  function renderToolbar() {
    var mode = settings.mode;
    var rowCount = settings.rows;
    var colCount = settings.cols;
    var decimals = settings.decimals;

    root.querySelector(".tec-rb-title").textContent =
      mode === "offense"
        ? "Offensive Rank Bonus"
        : mode === "defense"
          ? "Defensive Rank Bonus"
          : "Non-Combat Rank Bonus";

    root.querySelector(".tec-rb-mode").className = "tec-rb-mode tec-rb-icon " +
      (mode === "offense" ? "tec-rb-sword" : mode === "defense" ? "tec-rb-shield" : "tec-rb-tree");

    var rowBtn = root.querySelector(".tec-rb-rows");
    rowBtn.className = "tec-rb-rows tec-rb-icon " +
      (rowCount === 5 ? "tec-rb-five-row" : rowCount === 3 ? "tec-rb-three-row" : "tec-rb-one-row");
    rowBtn.disabled = mode === "noncombat";

    root.querySelector(".tec-rb-cols").className = "tec-rb-cols tec-rb-icon " +
      (colCount === 5 ? "tec-rb-five-col" : "tec-rb-three-col");

    // The decimal icon is drawn in CSS from the class, as in the old version.
    var decBtn = root.querySelector(".tec-rb-dec");
    var decLabel = "Decimal places: " +
      (decimals === 0 ? "none" : decimals >= 8 ? "all" : decimals);
    decBtn.className = "tec-rb-dec tec-rb-dec-" + decCookie[decimals];
    decBtn.title = decLabel;
    decBtn.setAttribute("aria-label", decLabel);
  }

  function makeCard() {
    var card = document.createElement("div");
    card.className = "tec-rb-body tec-rb-calculator-card";

    card.innerHTML =
      '<div class="tec-rb-inputs">' +
        '<input class="tec-rb-basics" type="number" min="0" inputmode="numeric" autocomplete="off" placeholder="Basics rank..." aria-label="Basics rank">' +
        '<input class="tec-rb-sub" type="number" min="0" inputmode="numeric" autocomplete="off" placeholder="Subskill rank..." aria-label="Subskill rank">' +
      '</div>' +
      '<div class="tec-rb-results-wrap">' +
        '<table class="tec-rb-results"><thead></thead><tbody></tbody></table>' +
      '</div>';

    function render() {
      var decimals = settings.decimals;
      var basicsRaw = card.querySelector(".tec-rb-basics").value;
      var subRaw = card.querySelector(".tec-rb-sub").value;

      var defs = [
        { label: "Basic", modifier: 1, basicOnly: true },
        { label: "Easy", modifier: 0.75, basicOnly: false },
        { label: "Avg.", modifier: 0.5, basicOnly: false },
        { label: "Diff.", modifier: 0.25, basicOnly: false },
        { label: "Impos.", modifier: 0.1, basicOnly: false }
      ];

      if (settings.cols === 3) {
        defs = defs.slice(1, 4);
      }

      var rows = stanceRows(settings.mode, settings.rows);
      var hasLabels = rows[0].label !== null;

      card.querySelector("thead").innerHTML =
        "<tr>" + (hasLabels ? "<th></th>" : "") +
        defs.map(function (def) {
          return "<th>" + def.label + "</th>";
        }).join("") +
        "</tr>";

      card.querySelector("tbody").innerHTML = rows.map(function (row) {
        return "<tr>" + (hasLabels ? "<th>" + row.label + "</th>" : "") +
          defs.map(function (def) {
            var value = calculate(
              basicsRaw,
              subRaw,
              def.modifier,
              row.mod,
              def.basicOnly
            );

            return '<td><input readonly tabindex="-1" value="' +
              formatNumber(value, decimals) +
              '"></td>';
          }).join("") +
          "</tr>";
      }).join("");
    }

    card.querySelectorAll(".tec-rb-inputs input").forEach(function (input) {
      input.addEventListener("input", render);
      input.addEventListener("change", render);
    });

    card.tecRender = render;

    render();
    return card;
  }

  root.innerHTML =
    '<div class="tec-rb-shell">' +
      '<div class="tec-rb-toolbar">' +
        '<strong class="tec-rb-title">Offensive Rank Bonus</strong>' +
        '<div class="tec-rb-tools">' +
          '<button type="button" class="tec-rb-mode tec-rb-icon tec-rb-sword" title="Switch rank bonus type" aria-label="Switch rank bonus type"></button>' +
          '<button type="button" class="tec-rb-cols tec-rb-icon tec-rb-five-col" title="Toggle columns" aria-label="Toggle columns"></button>' +
          '<button type="button" class="tec-rb-rows tec-rb-icon tec-rb-five-row" title="Toggle stance rows" aria-label="Toggle stance rows"></button>' +
          '<button type="button" class="tec-rb-dec tec-rb-dec-infin" title="Decimal places: all" aria-label="Decimal places: all"></button>' +
        '</div>' +
      '</div>' +
      '<div class="tec-rb-stack"></div>' +
    '</div>' +
    '<button type="button" class="tec-rb-add" title="Add another calculator" aria-label="Add another calculator"></button>';

  var stack = root.querySelector(".tec-rb-stack");

  // The toolbar buttons change the shared settings, then re-render every
  // calculator so they all stay in sync (as in the old version).
  root.querySelector(".tec-rb-mode").addEventListener("click", function () {
    settings.mode =
      settings.mode === "offense" ? "defense" :
      settings.mode === "defense" ? "noncombat" :
      "offense";
    saveSettings();
    renderAll();
  });

  root.querySelector(".tec-rb-cols").addEventListener("click", function () {
    settings.cols = settings.cols === 5 ? 3 : 5;
    saveSettings();
    renderAll();
  });

  root.querySelector(".tec-rb-rows").addEventListener("click", function () {
    if (settings.mode === "noncombat") return;
    settings.rows = settings.rows === 5 ? 3 : settings.rows === 3 ? 1 : 5;
    saveSettings();
    renderAll();
  });

  root.querySelector(".tec-rb-dec").addEventListener("click", function () {
    var decimals = settings.decimals;
    settings.decimals =
      decimals === 8 ? 0 :
      decimals === 0 ? 1 :
      decimals === 1 ? 2 :
      decimals === 2 ? 3 :
      8;
    saveSettings();
    renderAll();
  });

  renderToolbar();
  stack.appendChild(makeCard());

  root.querySelector(".tec-rb-add").addEventListener("click", function () {
    // Old behavior: "+" adds another calculator with empty rank inputs
    // below the existing ones, sharing the single toolbar.
    stack.appendChild(makeCard());
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTecTool, { once: true });
} else {
  initTecTool();
}

document.addEventListener("DOMContentSwitch", initTecTool);
