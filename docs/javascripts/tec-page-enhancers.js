// Page-content enhancements shared by the live site and the editor preview.
// Each enhancer is a function (root, ctx) that adjusts the page body in place:
//   root      element holding the page content (.md-typeset on the live site)
//   ctx.path  page path, e.g. "/brawling/"
//   ctx.body  <body> to put page-type classes on
// Enhancers must create elements with root.ownerDocument (the preview is an
// iframe) and must be safe to run more than once on the same content.
window.TEC = window.TEC || {};

(function (TEC) {
  var enhancers = [];

  // Heading text without the "¶" permalink that the toc extension adds.
  TEC.headingText = function (heading) {
    var copy = heading.cloneNode(true);
    copy.querySelectorAll(".headerlink").forEach(function (link) { link.remove(); });
    return copy.textContent.trim();
  };

  // Registers an enhancer and, on live pages, runs it when the page is ready.
  TEC.addPageEnhancer = function (name, enhance) {
    enhancers.push({ name: name, enhance: enhance });

    function runOnPage() {
      var root = document.querySelector(".md-typeset");
      if (!root) return;
      enhance(root, { path: window.location.pathname || "", body: document.body });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", runOnPage, { once: true });
    } else {
      runOnPage();
    }
    document.addEventListener("DOMContentSwitch", runOnPage);
  };

  // Runs every registered enhancer on other content (used by the editor preview).
  TEC.runPageEnhancers = function (root, ctx) {
    enhancers.forEach(function (entry) {
      try {
        entry.enhance(root, ctx);
      } catch (error) {
        console.error("Page enhancer failed: " + entry.name, error);
      }
    });
  };
})(window.TEC);
