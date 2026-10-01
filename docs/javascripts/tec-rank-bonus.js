function initTecTool() {
  var root = document.getElementById("tec-rb-calculator");
  if (!root || root.dataset.tecRbReady === "1") return;
  root.dataset.tecRbReady = "1";

  var tierEnds = [0, 10, 30, 50, 100, 150, 200, 500, 1000];
  var tierMods = [3, 2, 1, 0.5, 0.25, 0.125, 0.0675, 0.025, 0.01];

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

    return bonus;
  }

  function formatNumber(n, decimals) {
    if (!isFinite(n)) return "";

    if (decimals >= 8) {
      return String(Math.floor(n * 1e8) / 1e8).replace(/\.0+$/, "");
    }

    var p = Math.pow(10, decimals);
    return String(Math.floor(n * p) / p);
  }

  function stanceRows(mode, rowCount) {
    if (mode === "noncombat") {
      return [{ label: "", mod: 1 }];
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

    if (rowCount === 1) return [rows[2]];
    if (rowCount === 3) return [rows[0], rows[2], rows[4]];
    return rows;
  }

  function makeCard(state) {
    state = state || {};

    var card = document.createElement("div");
    card.className = "tec-rb-shell tec-rb-calculator-card";
    card.dataset.mode = state.mode || "offense";
    card.dataset.rows = String(state.rows || 5);
    card.dataset.cols = String(state.cols || 5);
    card.dataset.decimals = String(state.decimals == null ? 8 : state.decimals);

    card.innerHTML =
      '<div class="tec-rb-toolbar">' +
        '<strong class="tec-rb-title">Offensive Rank Bonus</strong>' +
        '<div class="tec-rb-tools">' +
          '<button type="button" class="tec-rb-mode tec-rb-icon tec-rb-sword" title="Switch rank bonus type" aria-label="Switch rank bonus type"></button>' +
          '<button type="button" class="tec-rb-cols tec-rb-icon tec-rb-five-col" title="Toggle columns" aria-label="Toggle columns"></button>' +
          '<button type="button" class="tec-rb-rows tec-rb-icon tec-rb-five-row" title="Toggle stance rows" aria-label="Toggle stance rows"></button>' +
          '<button type="button" class="tec-rb-dec" title="Change decimal precision">.000…</button>' +
        '</div>' +
      '</div>' +
      '<div class="tec-rb-body">' +
        '<div class="tec-rb-inputs">' +
          '<input class="tec-rb-basics" type="number" min="0" inputmode="numeric" value="' + (state.basics == null ? "" : state.basics) + '" placeholder="Basics rank..." aria-label="Basics rank">' +
          '<input class="tec-rb-sub" type="number" min="0" inputmode="numeric" value="' + (state.sub == null ? "" : state.sub) + '" placeholder="Subskill rank..." aria-label="Subskill rank">' +
        '</div>' +
        '<div class="tec-rb-results-wrap">' +
          '<table class="tec-rb-results"><thead></thead><tbody></tbody></table>' +
        '</div>' +
      '</div>';

    function getMode() {
      return card.dataset.mode || "offense";
    }

    function getRows() {
      return Number(card.dataset.rows) || 5;
    }

    function getCols() {
      return Number(card.dataset.cols) || 5;
    }

    function getDecimals() {
      var n = Number(card.dataset.decimals);
      return isNaN(n) ? 8 : n;
    }

    function calculate(basicsRank, subRank, difficultyModifier, stanceModifier, basicOnly) {
      if (basicOnly) {
        // Matches the old Wikidot Basic column: the entered Basics rank is
        // treated as the rank whose raw RB is being displayed.
        return tierBonus(basicsRank) * stanceModifier;
      }

      // Preserve the old Wikidot formula exactly:
      // floor(Basics RB) * difficulty modifier + Subskill RB,
      // then apply stance, then apply the RB +/- modifier.
      return (
        (Math.floor(tierBonus(basicsRank)) * difficultyModifier + tierBonus(subRank)) *
        stanceModifier
      );
    }

    function render() {
      var mode = getMode();
      var rowCount = getRows();
      var colCount = getCols();
      var decimals = getDecimals();

      var basicsInput = card.querySelector(".tec-rb-basics");
      var subInput = card.querySelector(".tec-rb-sub");
      var basics = Number(basicsInput.value) || 0;
      var sub = Number(subInput.value) || 0;

      var title = mode === "offense"
        ? "Offensive Rank Bonus"
        : mode === "defense"
          ? "Defensive Rank Bonus"
          : "Non-Combat Rank Bonus";
      card.querySelector(".tec-rb-title").textContent = title;

      var modeBtn = card.querySelector(".tec-rb-mode");
      modeBtn.className = "tec-rb-mode tec-rb-icon " +
        (mode === "offense" ? "tec-rb-sword" : mode === "defense" ? "tec-rb-shield" : "tec-rb-tree");

      var rowBtn = card.querySelector(".tec-rb-rows");
      rowBtn.className = "tec-rb-rows tec-rb-icon " +
        (rowCount === 5 ? "tec-rb-five-row" : rowCount === 3 ? "tec-rb-three-row" : "tec-rb-one-row");
      rowBtn.disabled = mode === "noncombat";

      var colBtn = card.querySelector(".tec-rb-cols");
      colBtn.className = "tec-rb-cols tec-rb-icon " +
        (colCount === 5 ? "tec-rb-five-col" : "tec-rb-three-col");

      card.querySelector(".tec-rb-dec").textContent =
        decimals === 0 ? ".0×" : decimals >= 8 ? ".000…" : "." + "0".repeat(decimals);

      var defs = [
        { label: "Basic", modifier: 1, basicOnly: true },
        { label: "Easy", modifier: 0.75, basicOnly: false },
        { label: "Avg.", modifier: 0.5, basicOnly: false },
        { label: "Diff.", modifier: 0.25, basicOnly: false },
        { label: "Impos.", modifier: 0.1, basicOnly: false }
      ];

      if (colCount === 3) {
        defs = defs.slice(1, 4);
      }

      var thead = card.querySelector("thead");
      var tbody = card.querySelector("tbody");

      thead.innerHTML =
        "<tr><th></th>" +
        defs.map(function (def) {
          return "<th>" + def.label + "</th>";
        }).join("") +
        "</tr>";

      tbody.innerHTML = stanceRows(mode, rowCount).map(function (row) {
        return "<tr><th>" + row.label + "</th>" +
          defs.map(function (def) {
            var value = calculate(
              basics,
              sub,
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

    card.querySelector(".tec-rb-mode").addEventListener("click", function () {
      var mode = getMode();
      card.dataset.mode =
        mode === "offense" ? "defense" :
        mode === "defense" ? "noncombat" :
        "offense";
      render();
    });

    card.querySelector(".tec-rb-cols").addEventListener("click", function () {
      card.dataset.cols = getCols() === 5 ? "3" : "5";
      render();
    });

    card.querySelector(".tec-rb-rows").addEventListener("click", function () {
      if (getMode() === "noncombat") return;
      var rows = getRows();
      card.dataset.rows = rows === 5 ? "3" : rows === 3 ? "1" : "5";
      render();
    });

    card.querySelector(".tec-rb-dec").addEventListener("click", function () {
      var decimals = getDecimals();
      card.dataset.decimals =
        decimals === 8 ? "0" :
        decimals === 0 ? "1" :
        decimals === 1 ? "2" :
        decimals === 2 ? "3" :
        "8";
      render();
    });

    card.getCalculatorState = function () {
      return {
        mode: getMode(),
        rows: getRows(),
        cols: getCols(),
        decimals: getDecimals(),
        basics: card.querySelector(".tec-rb-basics").value,
        sub: card.querySelector(".tec-rb-sub").value
      };
    };

    render();
    return card;
  }

  root.innerHTML =
    '<div class="tec-rb-stack"></div>' +
    '<button type="button" class="tec-rb-add" title="Copy first calculator" aria-label="Copy first calculator">+</button>';

  var stack = root.querySelector(".tec-rb-stack");
  stack.appendChild(makeCard({
    mode: "offense",
    rows: 5,
    cols: 5,
    decimals: 8,
    basics: "",
    sub: ""
  }));

  root.querySelector(".tec-rb-add").addEventListener("click", function () {
    var first = stack.querySelector(".tec-rb-calculator-card");
    if (!first || typeof first.getCalculatorState !== "function") return;

    // Restore the old behavior: "+" creates another full calculator,
    // initialized as an exact copy of the first one.
    stack.appendChild(makeCard(first.getCalculatorState()));
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTecTool, { once: true });
} else {
  initTecTool();
}

document.addEventListener("DOMContentSwitch", initTecTool);
