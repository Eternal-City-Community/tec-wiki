// Starter layouts for new pages. Choosing one only seeds the Body editor.
(function () {
  var templates = {
    combat: `# [Combat Skill Name]

## Skill Overview

[Describe the combat skill and its role.]

| >> | >> | >> | >> | >> | Skill Info | >> | Ranks Taught by Trainer |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| ~ Skills/Actions | ~ Difficulty | ~ Hands | ~ Range | ~ Wound | ~ Prerequisites | ~ [Trainer] | ~ [Trainer] |
| *<u>[Combat Skill]</u>* | [Difficulty] | - | - | - | - | [Rank] | [Rank] |
| [[Action Name]](#Action-Name) | [Difficulty] | [Hands] | [Range] | [Wound] | [Prerequisite] | [Rank] | [Rank] |

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
`,
    crafting: `# [Crafting Skill Name]

## Skill Overview

[Describe the craft, what it produces, and the tools/materials it uses.]

| Skill Info |  | Ranks Taught by Trainer |
| --- | :---: | :---: |
| ~ Skills/Actions | ~ Difficulty | ~ [Trainer] |
| <u>*Basic [Craft]*</u> | [Difficulty] | [Rank] |
| [[Crafting Action]](#Crafting-Action) | [Difficulty] | [Rank] |

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

* [[Crafting Skill Name] Guide](/[crafting-skill]-guide/)
`
  };

  function TemplateControl(props) {
    var h = window.h || (window.React && window.React.createElement);
    var value = props.value || "";
    return h("select", {
      value: value,
      onChange: function (event) {
        var choice = event.target.value;
        props.onChange(choice);
        if (!choice || !templates[choice]) return;
        var body = props.forID && props.forID.split("-").slice(0,-1).join("-");
        // Decap gives widgets access to the current entry through metadata in
        // some versions, but not a supported cross-field setter. Emit a
        // document event; the body helper below applies the selected starter.
        document.dispatchEvent(new CustomEvent("tec-template-selected", { detail: { value: templates[choice] } }));
      },
      style: { width:"100%", minHeight:"42px", padding:"8px" }
    }, [
      h("option",{key:"blank",value:""},"Blank page"),
      h("option",{key:"combat",value:"combat"},"Combat Skill — based on Tridents"),
      h("option",{key:"crafting",value:"crafting"},"Crafting Skill — based on Jewelry")
    ]);
  }

  function TemplatePreview(props) {
    var h = window.h || (window.React && window.React.createElement);
    return h("div", {}, props.value ? "Starter template: " + props.value : "Blank page");
  }

  function register() {
    // Decap exposes the same global createClass()/h() compatibility API used
    // by our working Parent page widget. createClass expects a component spec
    // object, not a function component.
    var Control = createClass({
      render: function () {
        return TemplateControl(this.props);
      }
    });
    var Preview = createClass({
      render: function () {
        return TemplatePreview(this.props);
      }
    });
    CMS.registerWidget("tec-template", Control, Preview);
  }

  if (window.CMS && typeof window.createClass === "function" && typeof window.h === "function") {
    register();
  }

  // Populate the sibling Body field through Decap's editor DOM. The rich-text
  // editor uses a contenteditable ProseMirror surface, so switching modes and
  // hunting for a textarea is unreliable. Insert the starter as plain text
  // into the active editor, then dispatch input so Decap records the change.
  document.addEventListener("tec-template-selected", function (event) {
    if (!event.detail || !event.detail.value) return;
    setTimeout(function () {
      var labels = Array.prototype.slice.call(document.querySelectorAll("label"));
      var label = labels.find(function (x) {
        return /^Body\\b/i.test((x.textContent || "").trim());
      });
      var host = label && label.parentElement;
      var area = null;
      for (var n = 0; host && n < 7; n++, host = host.parentElement) {
        area = host.querySelector("textarea, [contenteditable=true]");
        if (area) break;
      }

      // Fallback for Decap versions where the visible BODY caption is not a
      // semantic label.
      if (!area) {
        var editors = Array.prototype.slice.call(document.querySelectorAll("[contenteditable=true]"));
        area = editors.find(function (x) {
          return x.closest && x.closest("[class]") && !x.closest(".tec-parent");
        }) || document.querySelector("textarea");
      }
      if (!area) return;

      var value = event.detail.value;
      if (area.tagName === "TEXTAREA") {
        var setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set;
        setter.call(area, value);
        area.dispatchEvent(new Event("input", { bubbles: true }));
        area.dispatchEvent(new Event("change", { bubbles: true }));
        return;
      }

      area.focus();
      // execCommand is deprecated for general application code, but remains
      // useful here because it updates contenteditable through the browser's
      // native editing path, which ProseMirror/Decap observes.
      document.execCommand("selectAll", false, null);
      document.execCommand("insertText", false, value);
      area.dispatchEvent(new InputEvent("input", {
        bubbles: true,
        inputType: "insertText",
        data: value
      }));
    }, 75);
  });
})();
