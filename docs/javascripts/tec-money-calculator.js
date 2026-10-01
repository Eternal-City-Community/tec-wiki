function initTecTool() {
  var root = document.getElementById("tec-money-calculator");
  if (!root) return;

  var values = { talent: 18750, cent: 300, denar: 12, sterce: 3, sen: 1 };
  var coinNames = ["talent", "cent", "denar", "sterce", "sen"];
  var labels = { talent:"Talents", cent:"Cents", denar:"Denars", sterce:"Sterces", sen:"Sens" };

  function num(v) {
    var n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
  }

  function fmt(n) {
    if (!Number.isFinite(n)) return "0";
    if (Math.abs(n - Math.round(n)) < 1e-10) return String(Math.round(n));
    return String(Math.round(n * 1000000) / 1000000);
  }

  function decompose(totalSens, maxCoin) {
    var out = {};
    var negative = totalSens < 0;
    var remaining = Math.abs(totalSens);
    var maxIndex = coinNames.indexOf(maxCoin);
    coinNames.forEach(function(name, i) {
      if (i < maxIndex) {
        out[name] = 0;
        return;
      }
      if (name === "sen") {
        out[name] = remaining;
      } else {
        out[name] = Math.floor(remaining / values[name]);
        remaining -= out[name] * values[name];
      }
    });
    if (negative) {
      var first = coinNames.slice(maxIndex).find(function(name){ return out[name] !== 0; });
      if (first) out[first] = -out[first];
    }
    return out;
  }

  function rowHtml(i) {
    return '<tr data-row="'+i+'">' +
      coinNames.map(function(name) {
        return '<td><input type="number" step="any" data-coin="'+name+'" value="0" aria-label="Row '+(i+1)+' '+labels[name]+'"></td>';
      }).join("") +
      '<td><input type="number" step="any" data-mult value="1" aria-label="Row '+(i+1)+' multiplier"></td>' +
      '</tr>';
  }

  root.innerHTML =
    '<div class="tec-money-card">' +
      '<div class="tec-money-heading"><strong>Coins to Add</strong><span>Use negative values to subtract.</span></div>' +
      '<div class="tec-money-scroll"><table class="tec-money-input-table">' +
        '<thead><tr>' +
          coinNames.map(function(name){ return '<th>'+labels[name]+'</th>'; }).join("") +
          '<th>Multiplier ×</th>' +
        '</tr></thead>' +
        '<tbody>' + [0,1,2,3,4].map(rowHtml).join("") + '</tbody>' +
      '</table></div>' +
      '<div class="tec-money-actions">' +
        '<button type="button" data-action="clear">Clear</button>' +
        '<button type="button" data-action="use-total">Sum Total into First Row</button>' +
      '</div>' +
      '<div class="tec-money-total-title">Total Coins</div>' +
      '<div class="tec-money-scroll"><table class="tec-money-total-table">' +
        '<thead><tr><th>Denominated in</th>' +
          coinNames.map(function(name){ return '<th>'+labels[name]+'</th>'; }).join("") +
        '</tr></thead><tbody></tbody>' +
      '</table></div>' +
    '</div>';

  var tbody = root.querySelector(".tec-money-total-table tbody");

  function totalSens() {
    var total = 0;
    root.querySelectorAll(".tec-money-input-table tbody tr").forEach(function(tr) {
      var subtotal = 0;
      tr.querySelectorAll("[data-coin]").forEach(function(input) {
        subtotal += num(input.value) * values[input.dataset.coin];
      });
      total += subtotal * num(tr.querySelector("[data-mult]").value);
    });
    return total;
  }

  function renderTotals() {
    var total = totalSens();
    tbody.innerHTML = coinNames.map(function(maxCoin) {
      var d = decompose(total, maxCoin);
      return '<tr><th>'+labels[maxCoin]+'</th>' +
        coinNames.map(function(name, i) {
          var allowed = i >= coinNames.indexOf(maxCoin);
          return '<td>' + (allowed ? fmt(d[name] || 0) : '') + '</td>';
        }).join("") +
      '</tr>';
    }).join("");
  }

  root.addEventListener("input", function(e) {
    if (e.target.matches("input")) renderTotals();
  });

  root.querySelector('[data-action="clear"]').addEventListener("click", function() {
    root.querySelectorAll("[data-coin]").forEach(function(i){ i.value = "0"; });
    root.querySelectorAll("[data-mult]").forEach(function(i){ i.value = "1"; });
    renderTotals();
  });

  root.querySelector('[data-action="use-total"]').addEventListener("click", function() {
    var d = decompose(totalSens(), "talent");
    root.querySelectorAll("[data-coin]").forEach(function(i){ i.value = "0"; });
    root.querySelectorAll("[data-mult]").forEach(function(i){ i.value = "1"; });
    var first = root.querySelector(".tec-money-input-table tbody tr");
    coinNames.forEach(function(name) {
      first.querySelector('[data-coin="'+name+'"]').value = fmt(d[name] || 0);
    });
    renderTotals();
  });

  renderTotals();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTecTool, { once: true });
} else {
  initTecTool();
}

document.addEventListener("DOMContentSwitch", initTecTool);
