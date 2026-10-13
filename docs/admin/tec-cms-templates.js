// Starter templates for new pages, inserted from a "Templates" menu in the
// Body editor's toolbar. The editor is Markdown only, so Decap's own toolbar
// (formatting buttons and the + component menu) is disabled; the menu
// replaces it.
(function () {
  var combat = `# [Combat Skill Name]

## Skill Overview

[Describe the combat skill and its role.]

| >> | >> | >> | >> | >> | Skill Info | >> | Ranks Taught by Trainer |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| ~ Skills/Actions | ~ Difficulty | ~ Hands | ~ Range | ~ Wound | ~ Prerequisites | ~ [Trainer] | ~ [Trainer] |
| *<u>[Combat Skill]</u>* | [Difficulty] | - | - | - | - | [Rank] | [Rank] |
| [Action Name](#Action-Name) | [Difficulty] | [Hands] | [Range] | [Wound] | [Prerequisite] | [Rank] | [Rank] |

**Directions to [Trainer]** ([Location](/location/)): [Directions]

#### Notes on Learning

* [Add only confirmed trainer, prerequisite, or learning notes.]

## Skill Details

### [Action Name]  *[command] <target>* {#Action-Name}

[Describe the confirmed behavior of the action.]

**When you see this in use you see:**

<div class="skill-template">

[Paste actual game output here when available.]

</div>
`;

  var crafting = `# [Crafting Skill Name]

## Skill Overview

[Describe the craft, what it produces, and the tools/materials it uses.]

| Skill Info |  | Ranks Taught by Trainer |
| --- | :---: | :---: |
| ~ Skills/Actions | ~ Difficulty | ~ [Trainer] |
| <u>*Basic [Craft]*</u> | [Difficulty] | [Rank] |
| [Crafting Action](#Crafting-Action) | [Difficulty] | [Rank] |

<a id="Recipes"></a>

<details markdown="1">
<summary>+ Show [Craft] Recipes</summary>

| [Craft] Recipes |  | Ranks Taught by Trainer |
| --- | :---: | :---: |
| ~ Recipes | ~ Difficulty | ~ [Trainer] |
| [Recipe Name] | [Difficulty] | [Rank] |

</details>

<a id="Lores"></a>

<details markdown="1">
<summary>+ Show [Craft] Lores</summary>

| [Craft] Lores |  | Ranks Taught by Trainer |
| --- | :---: | :---: |
| ~ Lore | ~ Difficulty | ~ [Trainer] |
| [Lore Name] | [Difficulty] | [Rank] |

</details>

**Directions to [Trainer]** ([Location](/location/)): [Directions]

#### Notes on Learning

* [Add only confirmed learning, recipe, lore, or prerequisite notes.]

## Skill Details

### [Crafting Action]  *[command] <object>* {#Crafting-Action}

[Describe the confirmed action behavior and setup.]

**Required Tools / Setup:** [Tools or setup]

**When you see this in use you see:**

<div class="skill-template">

[Paste actual game output here when available.]

</div>

### Materials and Tools

* **[Material/tool]** — [Purpose.]

### See Also

* [Crafting Skill Guide](/crafting-skill-guide/)
`;

  var TEMPLATES = [
    { label: "Combat Skill starter", body: combat },
    { label: "Crafting Skill starter", body: crafting }
  ];
  var MENU_CLASS = "tec-templates";

  var style = document.createElement("style");
  style.id = "tec-cms-templates-style";
  style.textContent =
    ".cms-editor-raw [class*='ToolbarContainer'] > div:not(." + MENU_CLASS + ") { display: none; }" +
    "." + MENU_CLASS + " { position: relative; }" +
    "." + MENU_CLASS + "__button { display: inline-flex; align-items: center; gap: 6px; height: 30px;" +
    " padding: 0 10px; border: 0; border-radius: 4px; background: none; color: inherit; font: inherit;" +
    " font-size: 14px; cursor: pointer; }" +
    "." + MENU_CLASS + "__button:hover, ." + MENU_CLASS + "--open ." + MENU_CLASS + "__button { color: #3a69c7; }" +
    "." + MENU_CLASS + "__menu { display: none; position: absolute; top: 100%; left: 0; z-index: 30;" +
    " min-width: 220px; margin: 4px 0 0; padding: 4px 0; list-style: none; background: #fff;" +
    " border: 2px solid #dfdfe3; border-radius: 5px; box-shadow: 0 4px 12px rgba(68,74,87,.15); }" +
    "." + MENU_CLASS + "--open ." + MENU_CLASS + "__menu { display: block; }" +
    "." + MENU_CLASS + "__item { display: block; width: 100%; padding: 8px 14px; border: 0; background: none;" +
    " color: #313d3e; font: inherit; font-size: 14px; text-align: left; cursor: pointer; }" +
    "." + MENU_CLASS + "__item:hover, ." + MENU_CLASS + "__item:focus-visible { background: #e8f5fe; color: #3a69c7; }";
  document.head.appendChild(style);

  // Puts the text in at the cursor (or the top of the page when the editor has
  // no cursor yet) the way a paste would, so Decap's editor and undo see it.
  function insert(editor, text) {
    var sel = window.getSelection();
    editor.focus();
    if (!sel.rangeCount || !editor.contains(sel.anchorNode)) {
      var first = editor.querySelector("[data-slate-string], [data-slate-zero-width]");
      var range = document.createRange();
      range.setStart(first ? first.firstChild || first : editor, 0);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    // Let the editor pick up the cursor before the paste arrives.
    setTimeout(function () {
      var data = new DataTransfer();
      data.setData("text/plain", text);
      editor.dispatchEvent(new ClipboardEvent("paste", { clipboardData: data, bubbles: true, cancelable: true }));
    }, 50);
  }

  function makeMenu(toolbar) {
    var wrap = document.createElement("div");
    wrap.className = MENU_CLASS;
    wrap.innerHTML =
      '<button type="button" class="' + MENU_CLASS + '__button" aria-haspopup="true" aria-expanded="false"' +
      ' title="Insert a starter layout for a new page">Templates <span aria-hidden="true">&#9662;</span></button>' +
      '<ul class="' + MENU_CLASS + '__menu" role="menu"></ul>';
    var button = wrap.firstChild;
    var menu = wrap.lastChild;

    function setOpen(open) {
      wrap.classList.toggle(MENU_CLASS + "--open", open);
      button.setAttribute("aria-expanded", String(open));
    }

    TEMPLATES.forEach(function (template) {
      var li = document.createElement("li");
      var item = document.createElement("button");
      item.type = "button";
      item.className = MENU_CLASS + "__item";
      item.setAttribute("role", "menuitem");
      item.textContent = template.label;
      // Keep the editor's cursor where it is while the menu is used.
      item.addEventListener("mousedown", function (event) { event.preventDefault(); });
      item.addEventListener("click", function () {
        setOpen(false);
        var editor = toolbar.closest(".cms-editor-raw").querySelector("[data-slate-editor]");
        if (editor) insert(editor, template.body);
      });
      li.appendChild(item);
      menu.appendChild(li);
    });

    button.addEventListener("mousedown", function (event) { event.preventDefault(); });
    button.addEventListener("click", function () {
      setOpen(!wrap.classList.contains(MENU_CLASS + "--open"));
    });
    document.addEventListener("click", function (event) {
      if (!wrap.contains(event.target)) setOpen(false);
    });
    wrap.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setOpen(false);
        button.focus();
      }
    });
    return wrap;
  }

  function update() {
    document.querySelectorAll(".cms-editor-raw [class*='ToolbarContainer']").forEach(function (toolbar) {
      if (toolbar.querySelector("." + MENU_CLASS)) return;
      toolbar.insertBefore(makeMenu(toolbar), toolbar.firstChild);
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
