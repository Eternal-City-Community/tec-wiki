function initNationalLores() {
  var article = document.querySelector(".md-typeset");
  if (!article) return;

  var h1 = article.querySelector("h1");
  if (!h1 || h1.textContent.trim() !== "National Lores") return;
  if (article.classList.contains("tec-national-lores")) return;

  article.classList.add("tec-national-lores");

  var headings = Array.from(article.querySelectorAll("h4"));
  headings.forEach(function (heading) {
    if (heading.parentElement && heading.parentElement.classList.contains("tec-lore-card")) return;

    var card = document.createElement("section");
    card.className = "tec-lore-card";
    heading.parentNode.insertBefore(card, heading);
    card.appendChild(heading);

    var node = card.nextSibling;
    while (node && !(node.nodeType === 1 && (node.tagName === "H4" || node.tagName === "H2"))) {
      var next = node.nextSibling;
      card.appendChild(node);
      node = next;
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNationalLores, { once: true });
} else {
  initNationalLores();
}
document.addEventListener("DOMContentSwitch", initNationalLores);
