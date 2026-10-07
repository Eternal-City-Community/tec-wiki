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

  function newPage() { return /collections\/pages\/new/.test(location.hash); }
  function bodyArea() {
    var labels = Array.prototype.slice.call(document.querySelectorAll("label"));
    var label = labels.find(function(x){return /^Body\b/.test((x.textContent||"").trim());});
    if (!label) return null;
    var node = label.parentElement;
    for (var i=0; node && i<7; i++,node=node.parentElement) {
      var area=node.querySelector("textarea");
      if(area)return {area:area,host:node};
    }
    return null;
  }
  function setBody(area,value) {
    var setter=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value").set;
    setter.call(area,value);
    area.dispatchEvent(new Event("input",{bubbles:true}));
    area.dispatchEvent(new Event("change",{bubbles:true}));
  }
  function install() {
    if(!newPage())return;
    var found=bodyArea();
    if(!found || document.getElementById("tec-page-template"))return;
    var wrap=document.createElement("div");
    wrap.id="tec-page-template";
    wrap.style.margin="0 0 14px";
    wrap.innerHTML='<label style="display:block;font-weight:600;margin-bottom:6px">Page template</label><select style="width:100%;min-height:42px;padding:8px"><option value="">Blank page</option><option value="combat">Combat Skill — based on Tridents</option><option value="crafting">Crafting Skill — based on Jewelry</option></select><small style="display:block;margin-top:5px">Optional. Choosing a template fills the Body with a starter layout.</small>';
    var select=wrap.querySelector("select");
    select.addEventListener("change",function(){
      if(!select.value)return;
      if(found.area.value.trim() && !confirm("Replace the current Body with this starter template?")) { select.value=""; return; }
      setBody(found.area,templates[select.value]);
    });
    found.host.insertBefore(wrap,found.host.firstChild);
  }
  var observer=new MutationObserver(function(){install();});
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener("hashchange",function(){setTimeout(install,100);});
  setTimeout(install,300);
})();
