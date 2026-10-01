document.addEventListener("DOMContentLoaded", function () {
  var root = document.querySelector(".md-typeset");
  if (!root) return;

  root.querySelectorAll("table").forEach(function (table) {
    if (table.closest(".md-typeset__table, .tec-table-scroll, .tec-shops-table-wrap, .tec-rb-results-wrap, .tec-money-scroll")) {
      return;
    }

    var wrap = document.createElement("div");
    wrap.className = "tec-table-scroll";
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });
});
