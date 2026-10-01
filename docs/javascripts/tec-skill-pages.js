document.addEventListener("DOMContentLoaded", function () {
  var root = document.querySelector(".md-typeset");
  if (!root || !root.querySelector(".skill-template")) return;

  document.body.classList.add("tec-skill-page");

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