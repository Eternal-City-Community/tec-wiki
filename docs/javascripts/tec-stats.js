TEC.addPageEnhancer("stats", function (article) {
  var doc = article.ownerDocument;

  var h1 = article.querySelector("h1");
  if (!h1 || TEC.headingText(h1) !== "Stats") return;
  if (article.classList.contains("stats-page")) return;

  article.classList.add("stats-page");

  var attrHeading = Array.from(article.querySelectorAll("h3")).find(function(h) {
    return TEC.headingText(h) === "Attribute Types";
  });
  if (!attrHeading) return;

  var node = attrHeading.nextElementSibling;
  while (node && node.tagName !== "H3") {
    if (node.tagName === "H4") {
      var heading = node;
      var card = doc.createElement("section");
      card.className = "tec-stat-card";
      heading.parentNode.insertBefore(card, heading);
      card.appendChild(heading);

      var next = card.nextSibling;
      while (next) {
        if (next.nodeType === 1 && (next.tagName === "H4" || next.tagName === "H3")) break;
        var move = next.nextSibling;
        card.appendChild(next);
        next = move;
      }
      node = card.nextElementSibling;
    } else {
      node = node.nextElementSibling;
    }
  }
});
