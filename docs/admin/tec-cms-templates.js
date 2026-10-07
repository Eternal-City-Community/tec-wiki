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
    return h("select", {
      value: "",
      onChange: function (event) {
        var choice = event.target.value;
        if (!choice || !templates[choice]) return;

        // Decap officially supports dynamic defaults on the /new route,
        // including the special body field. Re-open the new-entry route with
        // the selected starter as the body instead of trying to mutate a
        // sibling widget through unsupported DOM/React internals.
        var params = new URLSearchParams();
        params.set("body", templates[choice]);
        params.set("category", choice === "combat" ? "Skills & Combat" : "Crafting & Trade");

        // Preserve a title already typed before choosing the starter.
        var title = document.querySelector('input[id*="title"], input[name="title"]');
        if (title && title.value) params.set("title", title.value);

        window.location.hash = "#/collections/pages/new?" + params.toString();
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

})();
