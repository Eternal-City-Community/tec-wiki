// Change note: clicking Save first asks for an optional sentence about the
// change. It becomes the commit message, so it shows in Page History and
// What's New (and as the review request's title when it is the first save).
// Left empty, Decap's own message is used.
//
// Only Save needs it: Publish merges saves that already have their notes, and
// setting a status to "In review" makes no commit.
(function () {
  if (!window.CMS) return;
  var SAVE = '[class*="SaveButton"]';
  var CLASS = "tec-change-note";
  var MAX_LENGTH = 120;
  var note = "";       // for the save in progress; cleared once it succeeds
  var passing = false; // true while our own click goes through to Decap

  var style = document.createElement("style");
  style.id = "tec-cms-change-note-style";
  style.textContent =
    "." + CLASS + " { position: fixed; inset: 0; z-index: 2147483000; display: flex; align-items: center;" +
    " justify-content: center; padding: 16px; background: rgba(20,24,16,.6); }" +
    "." + CLASS + "__card { box-sizing: border-box; width: min(30rem, 100%); padding: 1.6rem 1.8rem 1.4rem;" +
    " background: #efe7c7; color: #2b271d; border: 1px solid #8d8659; border-bottom: 4px solid #173104;" +
    " box-shadow: 0 18px 50px rgba(20,26,12,.45); font-family: system-ui, -apple-system, 'Segoe UI', Arial, sans-serif; }" +
    "." + CLASS + "__title { margin: 0 0 .8rem; font-family: Georgia, 'Times New Roman', serif; font-weight: 400;" +
    " font-size: 1.15rem; letter-spacing: .12em; text-transform: uppercase; }" +
    "." + CLASS + "__label { display: block; margin-bottom: .35rem; font-size: .9rem; font-weight: 600; }" +
    "." + CLASS + "__input { box-sizing: border-box; width: 100%; padding: 8px 10px; border: 1px solid #8d8659;" +
    " border-radius: 5px; background: #fffdf4; color: #2b271d; font: inherit; font-size: .95rem; }" +
    "." + CLASS + "__input:focus { outline: 2px solid #234707; outline-offset: 1px; }" +
    "." + CLASS + "__hint { margin: .45rem 0 0; color: #665f49; font-size: .82rem; line-height: 1.4; }" +
    "." + CLASS + "__actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 1.2rem; }" +
    "." + CLASS + "__button { padding: 8px 18px; border: 1px solid #8d8659; border-radius: 5px; background: transparent;" +
    " color: #2b271d; font: inherit; font-size: .95rem; cursor: pointer; }" +
    "." + CLASS + "__button:hover { background: rgba(141,134,89,.15); }" +
    "." + CLASS + "__button--primary { background: #9c6a3b; border-color: #9c6a3b; color: #fff8e6; font-weight: 600; }" +
    "." + CLASS + "__button--primary:hover { background: #b07a45; }";
  document.head.appendChild(style);

  function clean(text) {
    return text.replace(/\s+/g, " ").trim();
  }

  // ---- Dialog ----

  function ask(onSave) {
    var overlay = document.createElement("div");
    overlay.className = CLASS;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML =
      '<form class="' + CLASS + '__card">' +
        '<h2 class="' + CLASS + '__title">Save changes</h2>' +
        '<label class="' + CLASS + '__label" for="' + CLASS + '-input">Describe your change (optional)</label>' +
        '<input class="' + CLASS + '__input" id="' + CLASS + '-input" autocomplete="off" maxlength="' + MAX_LENGTH + '"' +
        ' placeholder="e.g. Fixed trainer directions">' +
        '<p class="' + CLASS + '__hint">Shown in Page History and What\'s New.</p>' +
        '<div class="' + CLASS + '__actions">' +
          '<button type="button" class="' + CLASS + '__button" data-cancel>Cancel</button>' +
          '<button type="submit" class="' + CLASS + '__button ' + CLASS + '__button--primary">Save</button>' +
        '</div>' +
      '</form>';
    var input = overlay.querySelector("input");
    input.value = note;
    document.body.appendChild(overlay);
    input.focus();
    input.select();

    function close() { overlay.remove(); }
    overlay.querySelector("[data-cancel]").addEventListener("click", close);
    overlay.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });
    overlay.querySelector("form").addEventListener("submit", function (event) {
      event.preventDefault();
      note = clean(input.value);
      close();
      onSave();
    });
  }

  // Runs before Decap's Save (and before tec-cms-review.js, which loads later).
  document.addEventListener("click", function (event) {
    var save = event.target.closest && event.target.closest(SAVE);
    if (!save || save.disabled || passing) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    ask(function () {
      passing = true;
      try {
        save.click();
      } finally {
        passing = false;
      }
    });
  }, true);

  // A note kept from a failed save does not follow the editor to another page.
  window.addEventListener("hashchange", function () { note = ""; });

  // ---- Commit message ----

  function patch(backend) {
    var persistEntry = backend.persistEntry;
    backend.persistEntry = function (entry, options) {
      var text = note;
      if (text) options = Object.assign({}, options, { commitMessage: text });
      return persistEntry.call(this, entry, options).then(function (result) {
        if (note === text) note = "";
        return result;
      });
    };
  }

  var github = CMS.getBackend && CMS.getBackend("github");
  if (!github) return;
  var init = github.init;
  github.init = function () {
    var backend = init.apply(this, arguments);
    patch(backend);
    return backend;
  };
})();
