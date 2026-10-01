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


  // Restore Wikidot-style missing-page links. The migration originally created
  // placeholder Markdown files for these references; those stubs are now removed.
  // A small manifest keeps the browser from issuing a request for every link.
  fetch("/assets/data/missing-pages.json")
    .then(function (response) {
      if (!response.ok) return [];
      return response.json();
    })
    .then(function (missingPages) {
      var missing = new Set(missingPages);
      root.querySelectorAll('a[href^="/"]').forEach(function (link) {
        var href = link.getAttribute("href") || "";
        var match = href.match(/^\/([^\/#?]+)\/?(?:[#?].*)?$/);
        if (!match || !missing.has(match[1])) return;

        link.classList.add("tec-missing-link");
        link.dataset.missingSlug = match[1];
        link.title = "This page does not exist yet. Create it in the wiki editor.";
        link.href = "/admin/#/collections/pages/new";
        link.setAttribute("aria-label", (link.textContent.trim() || match[1]) + " — missing page, create in editor");
      });
    })
    .catch(function () {
      // Missing-page enhancement is non-critical; normal links remain usable.
    });

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
