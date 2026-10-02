// Makes the editor's top-left "Back to Wiki Pages" link return to the wiki page
// being edited. New pages have no live page yet, so they keep Decap's default.
// Leaving with unsaved changes still triggers Decap's "leave page?" warning.
// Also hides Decap's "Changes saved" badge until a save actually happens,
// since Decap shows it on every freshly opened page.
(function () {
  var MODE_CLASS = "tec-back-to-page";
  var SAVED_CLASS = "tec-saved";
  var BACK_LINK = '[class*="ToolbarSectionBackLink"]';

  var style = document.createElement("style");
  style.id = "tec-cms-back-link-style";
  style.textContent =
    "html." + MODE_CLASS + ' ' + BACK_LINK + ' [class*="BackCollection"] { font-size: 0; }' +
    "html." + MODE_CLASS + ' ' + BACK_LINK + ' [class*="BackCollection"]::before { content: "Back to page"; font-size: 14px; }' +
    "html:not(." + SAVED_CLASS + ') ' + BACK_LINK + ' [class*="BackStatusUnchanged"] { display: none; }';
  document.head.appendChild(style);

  // Which entry the editor is on: a slug, "new" for an unsaved new page, or null.
  function entryKey() {
    var hash = window.location.hash;
    if (/^#\/collections\/pages\/new(?:[?#]|$)/.test(hash)) return "new";
    var match = hash.match(/^#\/collections\/pages\/entries\/([^?#]+)/);
    return match ? match[1] : null;
  }

  var savedKey = null;

  function markSaved() {
    savedKey = entryKey();
    schedule();
  }

  function trackSavedEntry() {
    var key = entryKey();
    // Saving a new page moves Decap from ".../new" to the page's real address.
    if (savedKey === "new" && key && key !== "new") savedKey = key;
    else if (key !== savedKey) savedKey = null;
  }

  if (window.CMS && typeof window.CMS.registerEventListener === "function") {
    window.CMS.registerEventListener({ name: "postSave", handler: markSaved });
    window.CMS.registerEventListener({ name: "postPublish", handler: markSaved });
  }

  // Live page for the entry being edited, or null for new pages and other screens.
  function pageUrl() {
    var key = entryKey();
    if (!key || key === "new") return null;

    var slug;
    try {
      slug = decodeURIComponent(key);
    } catch (e) {
      return null;
    }
    return slug === "index" ? "/" : "/" + encodeURIComponent(slug) + "/";
  }

  function navigate(url) {
    if (typeof window.tecCmsNavigate === "function") return window.tecCmsNavigate(url);
    window.location.assign(url);
  }

  function update() {
    var active = pageUrl() !== null;
    document.documentElement.classList.toggle(MODE_CLASS, active);
    document.documentElement.classList.toggle(SAVED_CLASS, savedKey !== null && savedKey === entryKey());

    document.querySelectorAll(BACK_LINK).forEach(function (link) {
      if (active) {
        if (link.getAttribute("aria-label") !== "Back to page") link.setAttribute("aria-label", "Back to page");
        if (link.title !== "Back to the wiki page") link.title = "Back to the wiki page";
      } else {
        if (link.hasAttribute("aria-label")) link.removeAttribute("aria-label");
        if (link.hasAttribute("title")) link.removeAttribute("title");
      }
    });
  }

  // Capture phase, so this runs before Decap's router handles the click.
  window.addEventListener("click", function (event) {
    var url = pageUrl();
    if (!url || event.button !== 0) return;
    if (!event.target.closest || !event.target.closest(BACK_LINK)) return;

    event.preventDefault();
    event.stopPropagation();

    if (event.ctrlKey || event.metaKey || event.shiftKey) {
      window.open(url, "_blank", "noopener");
    } else {
      navigate(url);
    }
  }, true);

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
  window.addEventListener("hashchange", function () {
    trackSavedEntry();
    schedule();
  });
  schedule();
})();
