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

  // Decap does not expose a supported setter for a sibling field from a
  // custom widget. This helper only performs that final handoff to Body.
  document.addEventListener("tec-template-selected", function (event) {
    if (!event.detail || !event.detail.value) return;
    setTimeout(function () {
      var areas = Array.prototype.slice.call(document.querySelectorAll("textarea"));
      var area = areas.find(function (x) {
        var name=(x.getAttribute("name")||"").toLowerCase();
        var aria=(x.getAttribute("aria-label")||"").toLowerCase();
        return name==="body" || aria==="body";
      });
      if (!area) {
        // Rich Text mode uses a contenteditable surface instead of textarea.
        var labels=Array.prototype.slice.call(document.querySelectorAll("label"));
        var label=labels.find(function(x){return /^Body\\b/i.test((x.textContent||"").trim());});
        var host=label && label.parentElement;
        for(var n=0; host && n<6; n++,host=host.parentElement){
          area=host.querySelector("[contenteditable=true], textarea");
          if(area)break;
        }
      }
      if (!area) return;
      if (area.tagName === "TEXTAREA") {
        var setter=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value").set;
        setter.call(area,event.detail.value);
        area.dispatchEvent(new Event("input",{bubbles:true}));
        area.dispatchEvent(new Event("change",{bubbles:true}));
      } else {
        // Switch to Markdown using the visible mode control, then retry. This
        // preserves the Markdown template instead of injecting formatted HTML.
        var buttons=Array.prototype.slice.call(document.querySelectorAll("button"));
        var markdown=buttons.find(function(b){return /Markdown/i.test(b.textContent||"");});
        if(markdown){ markdown.click(); setTimeout(function(){document.dispatchEvent(new CustomEvent("tec-template-selected",{detail:event.detail}));},150); }
      }
    }, 50);
  });
})();
