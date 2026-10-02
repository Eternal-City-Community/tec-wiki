// Shows "Signed in as @login" next to Decap CMS's account button, so editors
// can see which GitHub account they are using. Decap only shows an avatar.
(function () {
  var STORAGE_KEY = "decap-cms-user";
  var ACCOUNT_BUTTON = '[aria-label="Account options dropdown"]';

  function currentUser() {
    try {
      var user = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
      return user && user.login ? user : null;
    } catch (e) {
      return null;
    }
  }

  function settingsWrapper(button) {
    var wrapper = button.closest('[class*="SettingsWrapper"]');
    if (wrapper) return wrapper;

    // Fallback: climb past single-child wrappers to Decap's settings row.
    var el = button;
    while (el.parentElement && el.parentElement.children.length === 1) {
      el = el.parentElement;
    }
    return el.parentElement;
  }

  function dropdownRoot(wrapper, button) {
    var el = button;
    while (el.parentElement && el.parentElement !== wrapper) {
      el = el.parentElement;
    }
    return el;
  }

  function describe(user) {
    // Decap substitutes "Unknown" when the GitHub profile has no name.
    var name = user.name && user.name !== "Unknown" && user.name !== user.login ? user.name : "";
    return {
      text: "Signed in as @" + user.login,
      title: "GitHub account: " + user.login + (name ? " (" + name + ")" : ""),
      href: user.html_url || "https://github.com/" + encodeURIComponent(user.login)
    };
  }

  function update() {
    var user = currentUser();
    var info = user && describe(user);

    document.querySelectorAll(".tec-cms-user").forEach(function (label) {
      if (!info || !label.parentElement.querySelector(ACCOUNT_BUTTON)) label.remove();
    });

    if (!info) return;

    document.querySelectorAll(ACCOUNT_BUTTON).forEach(function (button) {
      var wrapper = settingsWrapper(button);
      if (!wrapper) return;

      var label = wrapper.querySelector(":scope > .tec-cms-user");
      if (!label) {
        label = document.createElement("a");
        label.className = "tec-cms-user";
        label.target = "_blank";
        label.rel = "noopener noreferrer";
        label.style.cssText =
          "margin:0 8px 0 4px;font-size:13px;color:#313d3e;text-decoration:none;" +
          "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:220px;";
        wrapper.insertBefore(label, dropdownRoot(wrapper, button));
      }

      if (label.textContent !== info.text) label.textContent = info.text;
      if (label.title !== info.title) label.title = info.title;
      if (label.getAttribute("href") !== info.href) label.setAttribute("href", info.href);
    });
  }

  // Decap re-renders its header when screens change or the user logs in/out.
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
  window.addEventListener("storage", function (e) {
    if (e.key === STORAGE_KEY || e.key === null) schedule();
  });
  schedule();
})();
