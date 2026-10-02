// Table cell markers, for the Wikidot cell formatting Markdown tables lack.
// A marker is written at the start of a cell:
//   | >> | >> | ~ Armor |   ">>" joins the cell to its right (colspan)
//   | ^^ | a bronze knife |  "^^" joins the cell above (rowspan)
//   | ~ Armor |              "~ " makes a header cell
//   | = 2 | > 400d |         "= " centers, "> " right-aligns one cell
// Whole columns are aligned with the usual Markdown |:---:| and |---:|.
// Header cells stay centered unless they have their own alignment marker.
// Runs before the other enhancers so they see the finished cells.
TEC.addPageEnhancer("table-cells", function (root) {
  var doc = root.ownerDocument;

  function isMarker(cell, marker) {
    return cell.textContent.trim() === marker && !cell.children.length;
  }

  // Removes a leading marker such as "~ " from the cell's text. Only plain
  // text counts, so a marker written as code (`~ `) is left alone.
  function takePrefix(cell, pattern) {
    var node = cell.firstChild;
    while (node && node.nodeType === 3 && !node.nodeValue.trim()) node = node.nextSibling;
    if (!node || node.nodeType !== 3) return null;
    var match = node.nodeValue.match(pattern);
    if (!match) return null;
    node.nodeValue = node.nodeValue.slice(match[0].length);
    return match[1];
  }

  function toHeader(cell) {
    var th = doc.createElement("th");
    Array.from(cell.attributes).forEach(function (attr) { th.setAttribute(attr.name, attr.value); });
    while (cell.firstChild) th.appendChild(cell.firstChild);
    cell.parentNode.replaceChild(th, cell);
    return th;
  }

  root.querySelectorAll("table").forEach(function (table) {
    var rows = Array.from(table.rows);

    rows.forEach(function (row) {
      Array.from(row.cells).forEach(function (cell) {
        if (takePrefix(cell, /^\s*(~)(?:\s|$)/) && cell.tagName === "TD") cell = toHeader(cell);
        var align = takePrefix(cell, /^\s*([=>])(?:\s|$)/);
        if (align) {
          cell.style.textAlign = align === "=" ? "center" : "right";
          cell.dataset.tecAlign = "1";
        } else if (cell.tagName === "TH" && !cell.dataset.tecAlign) {
          cell.style.textAlign = "";
          cell.removeAttribute("align");
        }
      });
    });

    rows.forEach(function (row) {
      var cells = Array.from(row.cells);
      var target = cells[cells.length - 1];
      for (var i = cells.length - 2; i >= 0; i--) {
        if (!isMarker(cells[i], ">>")) { target = cells[i]; continue; }
        target.colSpan += cells[i].colSpan;
        cells[i].remove();
      }
    });

    // "^^": walk the grid, tracking which cell covers each column.
    var cover = [];
    rows.forEach(function (row, r) {
      var col = 0;
      Array.from(row.cells).forEach(function (cell) {
        while (cover[col] && cover[col].last >= r) col++;
        var above = cover[col];
        if (r > 0 && above && above.last === r - 1 && isMarker(cell, "^^")) {
          above.cell.rowSpan += 1;
          for (var k = above.start; k < above.start + above.cell.colSpan; k++) cover[k] = { cell: above.cell, start: above.start, last: r };
          cell.remove();
          col = above.start + above.cell.colSpan;
          return;
        }
        var entry = { cell: cell, start: col, last: r + cell.rowSpan - 1 };
        for (var j = col; j < col + cell.colSpan; j++) cover[j] = entry;
        col += cell.colSpan;
      });
    });
  });
});
