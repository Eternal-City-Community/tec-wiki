function initTecTool() {
  var root = document.getElementById("tec-rb-calculator");
  if (!root) return;

  var tierEnds = [0, 10, 30, 50, 100, 150, 200, 500, 1000];
  var tierMods = [3, 2, 1, 0.5, 0.25, 0.125, 0.0675, 0.025, 0.01];
  var mode = "offense";
  var rows = 5;
  var cols = 5;
  var decimals = 8;

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

  function trunc(n) {
    if (!isFinite(n)) return "";
    if (decimals >= 8) return String(Math.floor(n * 1e8) / 1e8).replace(/\.0+$/, "");
    var p = Math.pow(10, decimals);
    return String(Math.floor(n * p) / p);
  }

  function calc(basics, sub, diffMod, stanceMod, basicOnly) {
    if (basicOnly) {
      if (!basics) return "";
      return trunc(tierBonus(basics) * stanceMod);
    }
    if (!sub) return "";
    return trunc((Math.floor(tierBonus(basics)) * diffMod + tierBonus(sub)) * stanceMod);
  }

  function stanceRows() {
    if (mode === "noncombat") return [{label:"", mod:1}];
    var offense = [
      ["Bers.",1],["Aggr.",0.75],["Norm.",0.5],["Wary",0.25],["Def.",0]
    ];
    var defense = [
      ["Def.",1],["Wary",0.75],["Norm.",0.5],["Aggr.",0.25],["Bers.",0]
    ];
    var source = mode === "defense" ? defense : offense;
    if (rows === 1) return [source[2]];
    if (rows === 3) return [source[0], source[2], source[4]];
    return source;
  }

  root.innerHTML =
    '<div class="tec-rb-shell">' +
      '<div class="tec-rb-toolbar">' +
        '<strong id="tec-rb-title">Offensive Rank Bonus</strong>' +
        '<div class="tec-rb-tools">' +
          '<button type="button" id="tec-rb-mode" class="tec-rb-icon tec-rb-sword" title="Switch rank bonus type" aria-label="Switch rank bonus type"></button>' +
          '<button type="button" id="tec-rb-cols" class="tec-rb-icon tec-rb-five-col" title="Toggle columns" aria-label="Toggle columns"></button>' +
          '<button type="button" id="tec-rb-rows" class="tec-rb-icon tec-rb-five-row" title="Toggle rows" aria-label="Toggle stance rows"></button>' +
          '<button type="button" id="tec-rb-dec" class="tec-rb-dec" title="Change decimal precision">.000</button>' +
        '</div>' +
      '</div>' +
      '<div class="tec-rb-body">' +
        '<div class="tec-rb-inputs">' +
          '<input id="tec-rb-basics" type="number" min="0" inputmode="numeric" placeholder="Basics rank..." aria-label="Basics rank">' +
          '<input id="tec-rb-sub" type="number" min="0" inputmode="numeric" placeholder="Subskill rank..." aria-label="Subskill rank">' +
        '</div>' +
        '<div class="tec-rb-results-wrap"><table class="tec-rb-results"><thead></thead><tbody></tbody></table></div>' +
      '</div>' +
    '</div>' +
    '<button type="button" id="tec-rb-add" class="tec-rb-add" title="Add another calculator" aria-label="Add another calculator">+</button>';

  var basics = root.querySelector("#tec-rb-basics");
  var sub = root.querySelector("#tec-rb-sub");
  var thead = root.querySelector("thead");
  var tbody = root.querySelector("tbody");

  function render() {
    var title = mode === "offense" ? "Offensive Rank Bonus" : mode === "defense" ? "Defensive Rank Bonus" : "Non-Combat Rank Bonus";
    root.querySelector("#tec-rb-title").textContent = title;

    var modeBtn = root.querySelector("#tec-rb-mode");
    modeBtn.className = "tec-rb-icon " + (mode === "offense" ? "tec-rb-sword" : mode === "defense" ? "tec-rb-shield" : "tec-rb-tree");

    var rowBtn = root.querySelector("#tec-rb-rows");
    rowBtn.className = "tec-rb-icon " + (rows === 5 ? "tec-rb-five-row" : rows === 3 ? "tec-rb-three-row" : "tec-rb-one-row");
    rowBtn.disabled = mode === "noncombat";

    var colBtn = root.querySelector("#tec-rb-cols");
    colBtn.className = "tec-rb-icon " + (cols === 5 ? "tec-rb-five-col" : "tec-rb-three-col");

    root.querySelector("#tec-rb-dec").textContent = decimals === 0 ? ".0×" : decimals >= 8 ? ".000…" : "." + "0".repeat(decimals);

    var defs = [
      ["Basic", 1, true],
      ["Easy", .75, false],
      ["Avg.", .5, false],
      ["Diff.", .25, false],
      ["Impos.", .1, false]
    ];
    if (cols === 3) defs = defs.slice(1,4);

    thead.innerHTML = "<tr><th></th>" + defs.map(function(d){ return "<th>"+d[0]+"</th>"; }).join("") + "</tr>";
    tbody.innerHTML = stanceRows().map(function(r){
      return "<tr><th>"+r[0]+"</th>" + defs.map(function(d){
        var val = calc(basics.value, sub.value, d[1], r.mod, d[2]);
        return '<td><input readonly tabindex="-1" value="'+val+'"></td>';
      }).join("") + "</tr>";
    }).join("");
  }

  basics.addEventListener("input", render);
  sub.addEventListener("input", render);

  root.querySelector("#tec-rb-mode").addEventListener("click", function(){
    mode = mode === "offense" ? "defense" : mode === "defense" ? "noncombat" : "offense";
    render();
  });
  root.querySelector("#tec-rb-cols").addEventListener("click", function(){
    cols = cols === 5 ? 3 : 5;
    render();
  });
  root.querySelector("#tec-rb-rows").addEventListener("click", function(){
    if (mode === "noncombat") return;
    rows = rows === 5 ? 3 : rows === 3 ? 1 : 5;
    render();
  });
  root.querySelector("#tec-rb-dec").addEventListener("click", function(){
    decimals = decimals === 8 ? 0 : decimals === 0 ? 1 : decimals === 1 ? 2 : decimals === 2 ? 3 : 8;
    render();
  });
  root.querySelector("#tec-rb-add").addEventListener("click", function(){
    var clone = document.createElement("div");
    clone.className = "tec-rb-copy";
    clone.innerHTML = '<div class="tec-rb-copy-inputs"><input type="number" min="0" placeholder="Basics rank..."><input type="number" min="0" placeholder="Subskill rank..."></div><div class="tec-rb-copy-value">Enter ranks to compare.</div>';
    root.appendChild(clone);
    var ins = clone.querySelectorAll("input");
    var out = clone.querySelector(".tec-rb-copy-value");
    function updateCopy(){
      var b = ins[0].value, s = ins[1].value;
      out.textContent = s ? "Normal / Average RB: " + trunc((Math.floor(tierBonus(b)) * .5 + tierBonus(s)) * .5) : "Enter ranks to compare.";
    }
    ins[0].addEventListener("input", updateCopy);
    ins[1].addEventListener("input", updateCopy);
  });

  render();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTecTool, { once: true });
} else {
  initTecTool();
}

document.addEventListener("DOMContentSwitch", initTecTool);
