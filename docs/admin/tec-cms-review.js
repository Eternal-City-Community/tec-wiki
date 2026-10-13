// Guides editors who are not on the wiki team (Decap's "open authoring") from
// Save to a review request. Their saves go to a draft in their own fork, and
// nothing reaches the wiki team until the entry's status is "In review", which
// opens a pull request. After each save this asks whether to submit, sets the
// status for them, and links the pull request.
(function () {
  var REPO = "Eternal-City-Community/tec-wiki"; // backend.repo in config.yml
  var STORAGE_KEY = "decap-cms-user";
  var SAVE = '[class*="SaveButton"]';
  var STATUS = '[class*="StatusButton"]';
  var WAIT_MS = 60000;
  var CLASS = "tec-review";

  function currentUser() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch (e) {
      return null;
    }
  }

  function isOutsideEditor() {
    var user = currentUser();
    return !!(user && user.useOpenAuthoring);
  }

  function statusText() {
    var button = document.querySelector(STATUS);
    return button ? button.textContent.trim() : "";
  }

  function entrySlug() {
    var match = /\/entries\/([^/?#]+)/.exec(window.location.hash);
    return match ? decodeURIComponent(match[1]) : "";
  }

  function wait(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  // Polls until test() passes or the time runs out.
  function waitFor(test, timeout) {
    var start = Date.now();
    return new Promise(function (resolve, reject) {
      (function check() {
        var value = test();
        if (value) return resolve(value);
        if (Date.now() - start > timeout) return reject(new Error("timeout"));
        setTimeout(check, 250);
      })();
    });
  }

  // ---- Dialog ----

  var style = document.createElement("style");
  style.id = "tec-cms-review-style";
  style.textContent =
    "." + CLASS + " { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: center;" +
    " justify-content: center; padding: 16px; background: rgba(20,24,16,.6); }" +
    "." + CLASS + "__card { box-sizing: border-box; width: min(30rem, 100%); padding: 1.6rem 1.8rem 1.4rem;" +
    " background: #efe7c7; color: #2b271d; border: 1px solid #8d8659; border-bottom: 4px solid #173104;" +
    " box-shadow: 0 18px 50px rgba(20,26,12,.45); font-family: system-ui, -apple-system, 'Segoe UI', Arial, sans-serif; }" +
    "." + CLASS + "__title { margin: 0 0 .8rem; font-family: Georgia, 'Times New Roman', serif; font-weight: 400;" +
    " font-size: 1.15rem; letter-spacing: .12em; text-transform: uppercase; }" +
    "." + CLASS + "__body { font-size: .95rem; line-height: 1.5; }" +
    "." + CLASS + "__body p { margin: 0 0 .7rem; }" +
    "." + CLASS + "__body a { color: #234707; font-weight: 600; word-break: break-all; }" +
    "." + CLASS + "__actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 1.2rem; }" +
    "." + CLASS + "__button { padding: 8px 18px; border: 1px solid #8d8659; border-radius: 5px; background: transparent;" +
    " color: #2b271d; font: inherit; font-size: .95rem; cursor: pointer; }" +
    "." + CLASS + "__button:hover { background: rgba(141,134,89,.15); }" +
    "." + CLASS + "__button--primary { background: #9c6a3b; border-color: #9c6a3b; color: #fff8e6; font-weight: 600; }" +
    "." + CLASS + "__button--primary:hover { background: #b07a45; }" +
    "." + CLASS + "__status { margin: 0; color: #665f49; }";
  document.head.appendChild(style);

  var open = null;

  function close() {
    if (open) open.remove();
    open = null;
  }

  // buttons: [{ label, primary, onClick }]. Returns the card's body element.
  function dialog(title, html, buttons) {
    close();
    var overlay = document.createElement("div");
    overlay.className = CLASS;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML =
      '<div class="' + CLASS + '__card"><h2 class="' + CLASS + '__title"></h2>' +
      '<div class="' + CLASS + '__body"></div><div class="' + CLASS + '__actions"></div></div>';
    overlay.querySelector("." + CLASS + "__title").textContent = title;
    var body = overlay.querySelector("." + CLASS + "__body");
    body.innerHTML = html;
    var actions = overlay.querySelector("." + CLASS + "__actions");
    (buttons || []).forEach(function (spec) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = CLASS + "__button" + (spec.primary ? " " + CLASS + "__button--primary" : "");
      button.textContent = spec.label;
      button.addEventListener("click", spec.onClick || close);
      actions.appendChild(button);
    });
    document.body.appendChild(overlay);
    open = overlay;
    var primary = actions.querySelector("." + CLASS + "__button--primary") || actions.firstChild;
    if (primary) primary.focus();
    return body;
  }

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function linkHtml(url, text) {
    return '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(text) + "</a>";
  }

  // ---- Pull request lookup ----

  // Decap names the branch ".../pages/<slug>", from the editor's fork.
  function findPullRequest() {
    var user = currentUser();
    var slug = entrySlug();
    if (!user || !user.token || !user.login || !slug) return Promise.resolve(null);
    return fetch("https://api.github.com/repos/" + REPO + "/pulls?state=open&per_page=100", {
      headers: { Authorization: "token " + user.token }
    })
      .then(function (res) { return res.ok ? res.json() : []; })
      .then(function (pulls) {
        return pulls.filter(function (pr) {
          return pr.user && pr.user.login === user.login && pr.head && /\/pages\/[^/]+$/.test(pr.head.ref) &&
            pr.head.ref.slice(pr.head.ref.lastIndexOf("/") + 1) === slug;
        })[0] || null;
      })
      .catch(function () { return null; });
  }

  // The pull request can take a moment to show up after the status change.
  function pullRequestLink() {
    var tries = 0;
    function attempt() {
      return findPullRequest().then(function (pr) {
        if (pr || ++tries >= 5) return pr;
        return wait(1500).then(attempt);
      });
    }
    return attempt().then(function (pr) {
      if (pr) return linkHtml(pr.html_url, "Pull request #" + pr.number + ": " + pr.title);
      var user = currentUser();
      var url = "https://github.com/" + REPO + "/pulls" + (user && user.login ? "?q=is%3Apr+author%3A" + encodeURIComponent(user.login) : "");
      return linkHtml(url, "Your review requests on GitHub");
    });
  }

  // ---- Status change ----

  // Uses Decap's own Status menu, so the editor stays in sync.
  // Starts after the current click has finished: the menu closes on any click
  // that reaches the page while it opens.
  function setInReview() {
    return wait(100).then(function () {
      var button = document.querySelector(STATUS);
      if (!button) throw new Error("no status menu");
      button.click();
      return waitFor(function () {
        return Array.prototype.find.call(document.querySelectorAll('[role="menuitem"]'), function (item) {
          return item.textContent.trim() === "In review";
        });
      }, 3000);
    }).then(function (item) {
      item.click();
      return waitFor(function () { return /In review/.test(statusText()); }, 30000);
    });
  }

  // ---- Dialogs ----

  function showSubmitted(intro) {
    var body = dialog("Sent for review",
      "<p>" + intro + "</p><p class=\"" + CLASS + "__status\">Finding the review request&hellip;</p>",
      [{ label: "OK", primary: true }]);
    pullRequestLink().then(function (link) {
      var status = body.querySelector("." + CLASS + "__status");
      if (status) status.outerHTML = "<p>You can follow it here:<br>" + link + "</p>";
    });
  }

  function showDraftNote() {
    dialog("Saved as a draft",
      "<p>Your changes are saved in your own copy of the wiki (a fork on your GitHub account). " +
      "Nobody else can see them yet.</p>" +
      "<p>When you are ready, change <strong>Status</strong> in the top bar from <strong>Draft</strong> to " +
      "<strong>In review</strong> to send them to the wiki team.</p>",
      [{ label: "OK", primary: true }]);
  }

  function askToSubmit() {
    dialog("Submit for review?",
      "<p>Your changes are saved. Are you ready to send this change to the wiki team for review?</p>" +
      "<p>They will look it over before it appears on the wiki.</p>",
      [
        { label: "Not yet", onClick: showDraftNote },
        {
          label: "Submit",
          primary: true,
          onClick: function () {
            dialog("Submitting…", "<p>Sending your change to the wiki team.</p>", []);
            setInReview().then(function () {
              showSubmitted("Your change was sent to the wiki team. It will appear on the wiki once they approve it.");
            }, function () {
              dialog("Could not submit",
                "<p>Your changes are saved, but sending them for review did not work.</p>" +
                "<p>Change <strong>Status</strong> in the top bar from <strong>Draft</strong> to " +
                "<strong>In review</strong> to send them to the wiki team.</p>",
                [{ label: "OK", primary: true }]);
            });
          }
        }
      ]);
  }

  function afterSave() {
    if (/In review/.test(statusText())) {
      showSubmitted("Your new changes were added to the change you already sent to the wiki team.");
    } else {
      askToSubmit();
    }
  }

  // ---- Watching Save ----

  var watching = false;

  document.addEventListener("click", function (event) {
    var save = event.target.closest && event.target.closest(SAVE);
    if (!save || save.disabled || watching || !isOutsideEditor()) return;
    watching = true;
    // Saved: the button settles back to a disabled "Save" and the status menu shows.
    waitFor(function () {
      var button = document.querySelector(SAVE);
      return button && button.disabled && !/Saving/.test(button.textContent) &&
        /Status:/.test(statusText()) && !/Updating/.test(statusText());
    }, WAIT_MS).then(afterSave, function () {}).then(function () {
      watching = false;
    });
  }, true);

  document.addEventListener("keydown", function (event) {
    // Escape picks the first button: "Not yet" or "OK".
    var first = open && open.querySelector("." + CLASS + "__button");
    if (event.key === "Escape" && first) first.click();
  });
})();
