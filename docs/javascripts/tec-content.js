function initTecContent() {
  var root = document.querySelector(".md-typeset");
  if (!root) return;

  var path = window.location.pathname || "";

  // Character biography pages on the old wiki used a quotation-style frame.
  // Normalize the migrated mix of standalone ">" markers and partial
  // blockquotes into one consistent quote block without altering content.
  if (/^\/bio_[^/]+\/?$/.test(path) && !root.querySelector(".tec-bio-quote")) {
    document.body.classList.add("tec-bio-page");
    var h1 = root.querySelector(":scope > h1");
    if (h1) {
      var quote = document.createElement("blockquote");
      quote.className = "tec-bio-quote";

      var node = h1.nextSibling;
      while (node) {
        var next = node.nextSibling;

        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "BLOCKQUOTE") {
          while (node.firstChild) quote.appendChild(node.firstChild);
          node.remove();
        } else {
          quote.appendChild(node);
        }

        node = next;
      }

      root.appendChild(quote);
    }
  }

  // Linked map/art images should open separately, matching the old wiki.
  root.querySelectorAll("a > img").forEach(function (img) {
    var link = img.parentElement;
    var href = link.getAttribute("href") || "";
    if (!/\.(?:gif|png|jpe?g|webp)(?:$|[?#])/i.test(href)) return;

    link.classList.add("tec-map-image-link");
    link.target = "_blank";
    link.rel = "noopener";
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTecContent, { once: true });
} else {
  initTecContent();
}
document.addEventListener("DOMContentSwitch", initTecContent);
