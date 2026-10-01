document.addEventListener("DOMContentLoaded", function () {
  var root = document.querySelector(".md-typeset");
  if (!root || !root.querySelector(".skill-template")) return;

  document.body.classList.add("tec-skill-page");

  // Clean migrated recipe/lore tables inside collapsible sections.
  // Wikidot used colspan rows for grouped headings and category labels;
  // Markdown migration turns those into mostly-empty cells.
  root.querySelectorAll('details table').forEach(function (table) {
    var rows = Array.from(table.querySelectorAll('tr'));
    if (!rows.length) return;

    // Remove the redundant decorative group row (e.g. "Jewelry Recipes"
    // plus "Ranks Taught by Trainer"). The real column headings are below it.
    var firstLabels = Array.from(rows[0].children).map(function (cell) {
      return cell.textContent.trim();
    });
    if (firstLabels.indexOf("Ranks Taught by Trainer") !== -1) {
      rows[0].remove();
    }

    // Recreate Wikidot-style colspan category rows such as "Metal Stock",
    // "Rings", "Patterns", etc.
    Array.from(table.querySelectorAll('tr')).forEach(function (row) {
      var cells = Array.from(row.children);
      if (cells.length < 2) return;

      var nonempty = cells.filter(function (cell) {
        return cell.textContent.trim() !== "";
      });
      if (nonempty.length !== 1) return;

      var label = nonempty[0].textContent.trim();
      if (!label || /^---+$/.test(label)) return;

      var lead = cells[0];
      lead.textContent = label;
      lead.colSpan = cells.length;
      lead.classList.add("tec-skill-table-section");
      cells.slice(1).forEach(function (cell) { cell.remove(); });
    });
  });

  // Migrated skill-template blocks often contain blank text nodes before
  // and after the example. Because the template preserves line breaks,
  // those blanks become visible vertical space. Trim only outer whitespace.
  root.querySelectorAll(".skill-template").forEach(function (box) {
    while (box.firstChild && box.firstChild.nodeType === Node.TEXT_NODE && !box.firstChild.textContent.trim()) {
      box.removeChild(box.firstChild);
    }
    while (box.lastChild && box.lastChild.nodeType === Node.TEXT_NODE && !box.lastChild.textContent.trim()) {
      box.removeChild(box.lastChild);
    }
  });


  // Restore grouped headers used by legacy skill tables.
  // Markdown cannot express colspan, so infer the split from the real
  // column-heading row beneath the migrated grouping row.
  Array.from(root.querySelectorAll("table")).forEach(function (table) {
    var rows = Array.from(table.querySelectorAll("tr"));
    if (rows.length < 2) return;

    var groupRow = rows[0];
    var labels = Array.from(groupRow.children).map(function (cell) {
      return cell.textContent.trim();
    });

    if (!labels.some(function (label) { return label === "Ranks Taught by Trainer"; })) return;

    var headerCells = Array.from(rows[1].children).map(function (cell) {
      return cell.textContent.trim();
    });

    var infoCols = 0;
    var prereqIndex = headerCells.findIndex(function (label) {
      return /^Prerequisite$/i.test(label);
    });

    if (prereqIndex >= 0) {
      infoCols = prereqIndex + 1;
    } else if (/^(Skills\/Actions|Lore)$/i.test(headerCells[0] || "") &&
               /^Difficulty$/i.test(headerCells[1] || "")) {
      infoCols = 2;
    } else {
      return;
    }

    if (infoCols <= 0 || infoCols >= headerCells.length) return;

    groupRow.innerHTML = "";

    var info = document.createElement("th");
    info.colSpan = infoCols;
    info.className = "tec-skill-group-heading";
    info.textContent = labels.some(function (label) { return label === "Hunting Lores"; })
      ? "Hunting Lores"
      : "Skill Info";

    var trainers = document.createElement("th");
    trainers.colSpan = headerCells.length - infoCols;
    trainers.className = "tec-skill-group-heading";
    trainers.textContent = "Ranks Taught by Trainer";

    groupRow.appendChild(info);
    groupRow.appendChild(trainers);
    table.classList.add("tec-skill-overview-table");
  });


  var headings = Array.from(root.querySelectorAll("h3"));
  var inSkillDetails = false;

  headings.forEach(function (h) {
    var label = h.textContent.trim();

    if (/^Skill Details$/i.test(label)) {
      inSkillDetails = true;
      h.classList.add("tec-skill-section-title");
      return;
    }

    if (!inSkillDetails) return;

    h.classList.add("tec-skill-action-title");
  });

  root.querySelectorAll("p").forEach(function (p) {
    if (/^When you see this in use you see:/i.test(p.textContent.trim())) {
      p.classList.add("tec-skill-example-label");
    }
  });

  var actions = Array.from(root.querySelectorAll(".tec-skill-action-title"));
  actions.forEach(function (h, index) {
    var next = actions[index + 1] || null;
    var node = h.nextElementSibling;
    var last = h;

    while (node && node !== next) {
      if (node.classList && node.classList.contains("tec-skill-section-title")) break;
      last = node;
      node = node.nextElementSibling;
    }

    if (last !== h && !last.nextElementSibling?.classList?.contains("tec-backtop")) {
      var back = document.createElement("a");
      back.href = "#";
      back.className = "tec-backtop";
      back.textContent = "Back to Top";
      last.insertAdjacentElement("afterend", back);
    }
  });
});