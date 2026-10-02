// Adds a "Formatting" link to the editor toolbar, beside "View Live".
// It opens the wiki's formatting rules in a new tab, so unsaved edits stay put.
(function () {
  var URL = "/browser-editing/#formatting-rules";
  var SLOT = '[class*="ToolbarSubSectionLast"]';
  var LINK_CLASS = "tec-format-link";

  var style = document.createElement("style");
  style.id = "tec-cms-format-link-style";
  style.textContent =
    "." + LINK_CLASS + " { display: inline-flex; align-items: center; margin-right: 12px;" +
    " color: #3a69c7; text-decoration: none; white-space: nowrap; }" +
    "." + LINK_CLASS + " span { margin-right: 6px; }" +
    "." + LINK_CLASS + ":hover span { text-decoration: underline; }";
  document.head.appendChild(style);

  // Same shape as Decap's small new-tab icon on "View Live".
  var ICON =
    '<svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">' +
    '<path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3z"/>' +
    '<path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7z"/></svg>';

  function makeLink() {
    var link = document.createElement("a");
    link.className = LINK_CLASS;
    link.href = URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.title = "Special formatting this wiki supports, such as merged table cells";
    link.innerHTML = "<span>Formatting</span>" + ICON;
    return link;
  }

  function update() {
    document.querySelectorAll(SLOT).forEach(function (slot) {
      if (slot.querySelector("." + LINK_CLASS)) return;
      // First in the slot, so Decap's own "View Live" stays to its right.
      slot.insertBefore(makeLink(), slot.firstChild);
    });
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(function () {
      queued = false;
      update();
    });
  }

  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  schedule();
})();
