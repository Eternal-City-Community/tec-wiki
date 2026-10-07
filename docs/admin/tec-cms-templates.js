// Body editor with reliable starter templates for new wiki pages.
// The template selector lives inside the Body widget so Decap's supported
// onChange callback updates the actual body field and preview immediately.
(function () {
  var templates = {
    combat: `# [Combat Skill Name]

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
`,
    crafting: `# [Crafting Skill Name]

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
`
  };

  function register() {
    var Control = createClass({
      getInitialState: function () {
        return { template: "" };
      },

      applyTemplate: function (event) {
        var choice = event.target.value;
        if (!choice || !templates[choice]) {
          this.setState({ template: "" });
          return;
        }

        var current = this.props.value || "";
        if (current.trim() && current !== templates[choice]) {
          if (!window.confirm("Replace the current Body with the selected starter template?")) {
            event.target.value = this.state.template || "";
            return;
          }
        }

        this.props.onChange(templates[choice]);
        this.setState({ template: choice });
      },

      render: function () {
        var self = this;
        return h("div", { className: this.props.classNameWrapper },
          h("div", { style: { marginBottom: "10px" } },
            h("label", { style: { display: "block", fontWeight: "600", marginBottom: "6px" } }, "Starter template"),
            h("select", {
              value: this.state.template,
              onChange: this.applyTemplate,
              style: { width: "100%", minHeight: "42px", padding: "8px" }
            }, [
              h("option", { key: "blank", value: "" }, "Blank page"),
              h("option", { key: "combat", value: "combat" }, "Combat Skill — based on Tridents"),
              h("option", { key: "crafting", value: "crafting" }, "Crafting Skill — based on Jewelry")
            ])),
          h("textarea", {
            id: this.props.forID,
            value: this.props.value || "",
            onChange: function (event) { self.props.onChange(event.target.value); },
            spellCheck: true,
            style: {
              width: "100%", minHeight: "560px", boxSizing: "border-box",
              resize: "vertical", padding: "12px", border: "1px solid #dfdfe3",
              borderRadius: "4px", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
              fontSize: "14px", lineHeight: "1.5"
            }
          }));
      }
    });

    var Preview = createClass({
      render: function () {
        var value = this.props.value || "";
        var html = window.marked && window.marked.parse
          ? window.marked.parse(value, { gfm: true })
          : "<pre>" + value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</pre>";
        return h("div", { dangerouslySetInnerHTML: { __html: html } });
      }
    });

    CMS.registerWidget("tec-body", Control, Preview);
  }

  if (window.CMS && typeof window.createClass === "function" && typeof window.h === "function") {
    register();
  }
})();
