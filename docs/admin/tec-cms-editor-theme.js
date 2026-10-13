// Dark theme for the editor's fields, on unless the editor turned it off.
// The choice is kept in this browser. Styles: tec-cms-editor-dark.css.
(function () {
  var KEY = "tec-editor-theme";
  var DARK_CLASS = "tec-editor-dark";
  var SLOT = '[class*="ToolbarSubSectionLast"]';
  var SWITCH_CLASS = "tec-theme-switch";

  function isDark() {
    try {
      return localStorage.getItem(KEY) !== "light";
    } catch (e) {
      return true;
    }
  }

  function apply(dark) {
    document.documentElement.classList.toggle(DARK_CLASS, dark);
    document.querySelectorAll("." + SWITCH_CLASS).forEach(function (button) {
      button.setAttribute("aria-checked", String(dark));
    });
  }

  function setDark(dark) {
    try {
      localStorage.setItem(KEY, dark ? "dark" : "light");
    } catch (e) {}
    apply(dark);
  }

  function makeSwitch() {
    var button = document.createElement("button");
    button.type = "button";
    button.className = SWITCH_CLASS;
    button.setAttribute("role", "switch");
    button.setAttribute("aria-checked", String(isDark()));
    button.title = "Dark or light colors for the editing pane";
    button.innerHTML = '<span>Dark mode</span><span class="' + SWITCH_CLASS + '__track" aria-hidden="true"></span>';
    button.addEventListener("click", function () {
      setDark(!isDark());
    });
    return button;
  }

  // First in the top bar's right-hand group, before "Formatting" and "View Live".
  function update() {
    document.querySelectorAll(SLOT).forEach(function (slot) {
      var button = slot.querySelector("." + SWITCH_CLASS) || makeSwitch();
      if (slot.firstChild !== button) slot.insertBefore(button, slot.firstChild);
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

  // Another tab changed the setting.
  window.addEventListener("storage", function (e) {
    if (e.key === KEY || e.key === null) apply(isDark());
  });

  apply(isDark());
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  schedule();
})();
