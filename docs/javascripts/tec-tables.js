TEC.addPageEnhancer("tables", function (root) {
  var doc = root.ownerDocument;
  var win = doc.defaultView;

  root.querySelectorAll("table").forEach(function (table) {
    if (table.closest(".md-typeset__table, .tec-table-scroll, .tec-shops-table-wrap, .tec-rb-results-wrap, .tec-money-scroll")) {
      return;
    }

    var wrap = doc.createElement("div");
    wrap.className = "tec-table-scroll";
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });

  // Header rows stay in view while scrolling through a table. That only works
  // when nothing around the table scrolls sideways, so a table that fits the
  // column gets "tec-table-fits" on its wrapper, which turns sideways
  // scrolling off and sticky headers on. Wider tables keep scrolling sideways.
  function markFits() {
    root.querySelectorAll(".md-typeset__scrollwrap, .tec-table-scroll").forEach(function (wrap) {
      if (wrap.parentElement.closest(".md-typeset__scrollwrap, .tec-table-scroll")) return;
      var table = wrap.querySelector("table");
      if (!table) return;
      var box = table.parentElement;
      var style = win.getComputedStyle(box);
      var room = box.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      wrap.classList.toggle("tec-table-fits", table.offsetWidth <= room + 1);
    });
  }

  markFits();
  if (win) {
    // One listener per window, always checking the latest content. Tables in
    // a closed expandable box are measured again when it opens.
    if (win.tecTableFitsCheck) {
      win.removeEventListener("resize", win.tecTableFitsCheck);
      doc.removeEventListener("toggle", win.tecTableFitsCheck, true);
    }
    win.tecTableFitsCheck = markFits;
    win.addEventListener("resize", markFits, { passive: true });
    doc.addEventListener("toggle", markFits, true);
  }
});
