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

        // The template field cannot mutate props.entry: that is only the
        // immutable snapshot Decap passed to this widget. Ask the Body widget
        // itself to accept the template through a document event instead.
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

  // Populate Body through Decap's Markdown textarea. React tracks input
  // values internally, so use the native value setter plus input/change events.
  // Switching to Markdown first gives us the real controlled textarea rather
  // than ProseMirror's contenteditable surface.
  document.addEventListener("tec-template-selected", function (event) {
    if (!event.detail || !event.detail.value) return;
    var value = event.detail.value;

    function findBodyTextarea() {
      var areas = Array.prototype.slice.call(document.querySelectorAll("textarea"));
      if (areas.length === 1) return areas[0];
      return areas.find(function (x) {
        var aria = (x.getAttribute("aria-label") || "").toLowerCase();
        var name = (x.getAttribute("name") || "").toLowerCase();
        return aria.indexOf("body") >= 0 || name === "body";
      }) || null;
    }

    function apply() {
      var area = findBodyTextarea();
      if (!area) return false;
      area.focus();
      var setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set;
      setter.call(area, value);
      area.dispatchEvent(new Event("input", { bubbles: true }));
      area.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    }

    // If already in Markdown mode, update immediately.
    if (apply()) return;

    // Otherwise switch the Body widget to Markdown. Decap then mounts its
    // controlled textarea; updating that control changes entry.data.body,
    // which drives both preview and save.
    var candidates = Array.prototype.slice.call(document.querySelectorAll("button, label, span"));
    var markdown = candidates.find(function (el) {
      return /^Markdown$/i.test((el.textContent || "").trim()) && el.offsetParent !== null;
    });
    if (markdown) markdown.click();

    var attempts = 0;
    var timer = setInterval(function () {
      attempts += 1;
      if (apply() || attempts >= 20) clearInterval(timer);
    }, 50);
  });
})();
