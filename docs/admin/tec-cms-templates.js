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

      editSelection: function (before, after, fallback) {
        var textarea = this.textarea;
        if (!textarea) return;
        var value = this.props.value || "";
        var start = textarea.selectionStart || 0;
        var end = textarea.selectionEnd || start;
        var selected = value.slice(start, end) || fallback || "";
        var replacement = before + selected + after;
        this.props.onChange(value.slice(0, start) + replacement + value.slice(end));
        var cursorStart = start + before.length;
        var cursorEnd = cursorStart + selected.length;
        setTimeout(function () {
          textarea.focus();
          textarea.setSelectionRange(cursorStart, cursorEnd);
        }, 0);
      },

      prefixLines: function (prefix) {
        var textarea = this.textarea;
        if (!textarea) return;
        var value = this.props.value || "";
        var start = textarea.selectionStart || 0;
        var end = textarea.selectionEnd || start;
        var lineStart = value.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
        var selected = value.slice(lineStart, end);
        var replacement = selected.split("\n").map(function (line) { return prefix + line; }).join("\n");
        this.props.onChange(value.slice(0, lineStart) + replacement + value.slice(end));
        setTimeout(function () { textarea.focus(); }, 0);
      },

      toolbarButton: function (label, title, action) {
        return h("button", {
          type: "button",
          title: title,
          onMouseDown: function (event) { event.preventDefault(); },
          onClick: action,
          style: {
            minWidth: "34px", height: "32px", padding: "0 8px", border: "0",
            borderRight: "1px solid #ddd", background: "#fff", cursor: "pointer",
            fontWeight: "600"
          }
        }, label);
      },

      render: function () {
        var self = this;
        var buttons = [
          this.toolbarButton("H2", "Heading", function () { self.prefixLines("## "); }),
          this.toolbarButton("B", "Bold", function () { self.editSelection("**", "**", "bold text"); }),
          this.toolbarButton("I", "Italic", function () { self.editSelection("*", "*", "italic text"); }),
          this.toolbarButton("🔗", "Link", function () { self.editSelection("[", "](/page/)", "link text"); }),
          this.toolbarButton("•", "Bulleted list", function () { self.prefixLines("* "); }),
          this.toolbarButton("1.", "Numbered list", function () { self.prefixLines("1. "); }),
          this.toolbarButton("❝", "Blockquote", function () { self.prefixLines("> "); }),
          this.toolbarButton("<>", "Inline code", function () { self.editSelection("`", "`", "code"); })
        ];
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
          h("div", {
            role: "toolbar",
            "aria-label": "Markdown formatting",
            style: {
              display: "flex", flexWrap: "wrap", border: "1px solid #dfdfe3",
              borderBottom: "0", borderRadius: "4px 4px 0 0", overflow: "hidden",
              background: "#fff"
            }
          }, buttons),
          h("textarea", {
            ref: function (el) { self.textarea = el; },
            id: this.props.forID,
            value: this.props.value || "",
            onChange: function (event) { self.props.onChange(event.target.value); },
            spellCheck: true,
            style: {
              width: "100%", minHeight: "560px", boxSizing: "border-box",
              resize: "vertical", padding: "12px", border: "1px solid #dfdfe3",
              borderRadius: "0 0 4px 4px", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
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
