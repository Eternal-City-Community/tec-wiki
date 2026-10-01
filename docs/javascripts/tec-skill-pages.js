document.addEventListener("DOMContentLoaded", function () {
  var root = document.querySelector(".md-typeset");
  if (!root || !root.querySelector(".skill-template")) return;

  document.body.classList.add("tec-skill-page");


  // Restore the grouped header row used by legacy skill tables.
  // Migrated Markdown cannot express colspan, so the first row arrives as
  // eight separate cells with labels only in columns 6 and 8.
  Array.from(root.querySelectorAll("table")).forEach(function (table) {
    var firstRow = table.querySelector("thead tr, tr");
    if (!firstRow) return;

    var cells = Array.from(firstRow.children);
    if (cells.length !== 8) return;

    var labels = cells.map(function (cell) {
      return cell.textContent.trim();
    });

    if (labels[5] !== "Skill Info" || labels[7] !== "Ranks Taught by Trainer") return;

    firstRow.innerHTML = "";

    var skillInfo = document.createElement("th");
    skillInfo.colSpan = 6;
    skillInfo.className = "tec-skill-group-heading";
    skillInfo.textContent = "Skill Info";

    var trainers = document.createElement("th");
    trainers.colSpan = 2;
    trainers.className = "tec-skill-group-heading";
    trainers.textContent = "Ranks Taught by Trainer";

    firstRow.appendChild(skillInfo);
    firstRow.appendChild(trainers);
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