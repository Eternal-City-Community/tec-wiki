TEC.addPageEnhancer("skill-pages", function (root, ctx) {
  if (!root.querySelector(".skill-template")) return;
  var doc = root.ownerDocument;

  ctx.body.classList.add("tec-skill-page");

  // Clean migrated recipe/lore tables inside collapsible sections.
  // Wikidot used colspan rows for grouped headings and category labels;
  // Markdown migration turns those into mostly-empty cells.
  root.querySelectorAll('details table').forEach(function (table) {
    var rows = Array.from(table.querySelectorAll('tr'));
    if (!rows.length) return;

    // Recreate Wikidot-style colspan category rows such as "Metal Stock",
    // "Rings", "Patterns", etc.
    Array.from(table.querySelectorAll('tr')).forEach(function (row) {
      var cells = Array.from(row.children);
      if (cells.length === 1 && cells[0].colSpan > 1) {
        cells[0].classList.add("tec-skill-table-section");
        return;
      }
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

  // Skill-template blocks often contain blank text nodes before and after
  // the example. Because the template preserves line breaks, those blanks
  // become visible vertical space. Trim only outer whitespace; blank lines
  // inside the example are gaps between its steps and stay.
  root.querySelectorAll(".skill-template").forEach(function (box) {
    while (box.firstChild && box.firstChild.nodeType === Node.TEXT_NODE && !box.firstChild.textContent.trim()) {
      box.removeChild(box.firstChild);
    }
    while (box.lastChild && box.lastChild.nodeType === Node.TEXT_NODE && !box.lastChild.textContent.trim()) {
      box.removeChild(box.lastChild);
    }

    if (box.firstChild && box.firstChild.nodeType === Node.TEXT_NODE) {
      box.firstChild.textContent = box.firstChild.textContent.replace(/^\s+/, "");
    }
    if (box.lastChild && box.lastChild.nodeType === Node.TEXT_NODE) {
      box.lastChild.textContent = box.lastChild.textContent.replace(/\s+$/, "");
    }
  });


  // Restore grouped headers used by legacy skill tables.
  // Markdown cannot express colspan, so infer the split from the real
  // column-heading row beneath the migrated grouping row.
  Array.from(root.querySelectorAll("table")).forEach(function (table) {
    if (table.dataset.tecGrouped === "1") return;
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
    } else if (/^(Skills\/Actions|Lore|Recipes)$/i.test(headerCells[0] || "") &&
               /^Difficulty$/i.test(headerCells[1] || "")) {
      infoCols = 2;
    } else {
      return;
    }

    if (infoCols <= 0 || infoCols >= headerCells.length) return;

    groupRow.innerHTML = "";

    var info = doc.createElement("th");
    info.colSpan = infoCols;
    info.className = "tec-skill-group-heading";
    var leftLabel = labels.find(function (label) {
      return label && label !== "Ranks Taught by Trainer";
    }) || "Skill Info";
    info.textContent = leftLabel;

    var trainers = doc.createElement("th");
    trainers.colSpan = headerCells.length - infoCols;
    trainers.className = "tec-skill-group-heading";
    trainers.textContent = "Ranks Taught by Trainer";

    groupRow.appendChild(info);
    groupRow.appendChild(trainers);
    table.classList.add("tec-skill-overview-table");
    table.dataset.tecGrouped = "1";
  });


  var headings = Array.from(root.querySelectorAll("h3"));
  var inSkillDetails = false;

  headings.forEach(function (h) {
    var label = TEC.headingText(h);

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

    // On a repeat run the section already ends with its Back to Top link.
    if (last !== h && !last.classList.contains("tec-backtop") &&
        !last.nextElementSibling?.classList?.contains("tec-backtop")) {
      var back = doc.createElement("a");
      back.href = "#";
      back.className = "tec-backtop";
      back.textContent = "Back to Top";
      last.insertAdjacentElement("afterend", back);
    }
  });
});
