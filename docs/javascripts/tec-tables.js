TEC.addPageEnhancer("tables", function (root) {
  var doc = root.ownerDocument;

  root.querySelectorAll("table").forEach(function (table) {
    if (table.closest(".md-typeset__table, .tec-table-scroll, .tec-shops-table-wrap, .tec-rb-results-wrap, .tec-money-scroll")) {
      return;
    }

    var wrap = doc.createElement("div");
    wrap.className = "tec-table-scroll";
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });
});
