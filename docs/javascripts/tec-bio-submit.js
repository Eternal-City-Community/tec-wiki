(function () {
  "use strict";
  const root = document.getElementById("bio-submit-app");
  if (!root) return;
  root.innerHTML = "<div class=\"bio-app-shell\">\n  <div class=\"bio-app-header\"><div><span class=\"bio-app-eyebrow\">The Eternal City - Character Biography Submissions</span><h2>Tell your character's story</h2><p></p></div><div class=\"bio-app-emblem\" aria-hidden=\"true\">✦</div></div>\n  <form id=\"bio-submit-form\" novalidate>\n    <section class=\"bio-form-card\" aria-labelledby=\"bio-section-identity\">\n      <div class=\"bio-form-card-heading\"><h3 id=\"bio-section-identity\">Character details</h3><p>The essentials of who they are.</p></div>\n      <div class=\"bio-form-grid\">\n        <div class=\"bio-field\"><label for=\"bio-character-name\">Character name <span class=\"bio-required\">*</span></label><input id=\"bio-character-name\" name=\"character_name\" required maxlength=\"80\" autocomplete=\"off\" placeholder=\"Enter character name\"></div>\n        <div class=\"bio-field\"><label for=\"bio-nationality\">Nationality</label><select id=\"bio-nationality\" name=\"nationality\"><option value=\"\">Select a nationality</option><option>Aestivan League</option><option>Altene</option><option>Cinera</option><option>Gadaene</option><option>Iridine</option><option>Parcines</option><option>Remath</option><option>Safelands</option><option>Sostarea</option><option>Tuchea</option><option>Windward</option></select></div>\n        <div class=\"bio-field bio-field-wide\"><label for=\"bio-affiliations\">Guilds and organizations</label><select id=\"bio-affiliations\" name=\"affiliations\"><option value=\"\">No organization selected</option><option>Divortium Auxilii</option><option>Iridine Constables</option><option>Legio</option><option>Black Centurions</option><option>Harbor Rats</option><option>Umbra Alati</option><option>Monlon Volunteer Guard</option><option>Seld Sentinels</option><option>Cult of Ereal</option><option>Soldiers of Ereal</option><option>Cruentus Laureola</option><option>Silver Wolves</option><option>Guild of Locksmiths</option><option>Healers of Light</option><option>Vestis Formatae</option><option>Diamond Eye</option><option>Slime Squad</option><option value=\"__other__\">Other organization…</option></select><div id=\"bio-other-wrap\" class=\"bio-other-wrap\" hidden><label for=\"bio-other-org\">Organization name</label><input id=\"bio-other-org\" name=\"other_org\" maxlength=\"120\" placeholder=\"Enter the organization\"></div></div>\n      </div>\n    </section>\n    <section class=\"bio-form-card\" aria-labelledby=\"bio-section-story\">\n      <div class=\"bio-form-card-heading\"><h3 id=\"bio-section-story\">Their story</h3><p>Describe their appearance, origins, and the life they've led.</p></div>\n      <div class=\"bio-form-grid\">\n        <div class=\"bio-field bio-field-wide\"><label for=\"bio-appearance\">Appearance</label><textarea id=\"bio-appearance\" name=\"appearance\" rows=\"4\" maxlength=\"6000\" placeholder=\"What would someone notice when meeting your character?\"></textarea></div>\n        <div class=\"bio-field bio-field-wide\"><label for=\"bio-background\">Background &amp; history</label><textarea id=\"bio-background\" name=\"background\" rows=\"9\" maxlength=\"30000\" placeholder=\"Where did they come from? What shaped them? Tell their story…\"></textarea></div>\n        <div class=\"bio-field bio-field-wide\"><label for=\"bio-additional\">Additional details <span class=\"bio-optional\">· Optional</span></label><textarea id=\"bio-additional\" name=\"additional\" rows=\"4\" maxlength=\"8000\" placeholder=\"Relationships, accomplishments, rumors, or anything else…\"></textarea></div>\n      </div>\n    </section>\n    <section class=\"bio-form-card\" aria-labelledby=\"bio-section-portrait\">\n      <div class=\"bio-form-card-heading\"><h3 id=\"bio-section-portrait\">Portrait</h3><p>Give readers a face to put to the name. Optional.</p></div>\n      <div class=\"bio-field bio-portrait-field\"><label for=\"bio-portrait\">Choose an image</label><input id=\"bio-portrait\" name=\"portrait\" type=\"file\" accept=\"image/png,image/jpeg,image/webp\"><p class=\"bio-help\">PNG, JPEG or WebP · Up to 3 MB. Image publishing is unavailable in draft mode.</p></div>\n    </section>\n    <div class=\"bio-form-footer\"><div class=\"bio-form-footer-copy\"><strong>Ready to see their story?</strong><span>Preview your biography or save a copy of the draft.</span></div><div class=\"bio-form-actions\"><button type=\"button\" id=\"bio-preview\" class=\"bio-primary-action\">Preview biography</button><button type=\"button\" id=\"bio-copy\" class=\"bio-secondary-action\">Copy draft</button></div></div>\n    <p id=\"bio-feedback\" role=\"status\" aria-live=\"polite\"></p>\n  </form>\n  <section id=\"bio-preview-panel\" class=\"bio-form-card bio-preview-panel\" hidden aria-label=\"Biography preview\"><h3>Biography preview</h3><div id=\"bio-preview-content\"></div></section>\n</div>";
  const form = document.getElementById("bio-submit-form");
  if (!form) return;
  const feedback = document.getElementById("bio-feedback");
  const panel = document.getElementById("bio-preview-panel");
  const content = document.getElementById("bio-preview-content");
  const fields = ["character_name", "nationality", "appearance", "background", "affiliations", "additional"];
  const labels = {
    nationality: "Nationality or origin", appearance: "Appearance",
    background: "Background & history",
    affiliations: "Organizations and affiliations", additional: "Additional details"
  };
  function values() {
    const result = {};
    fields.forEach((name) => { result[name] = String(form.elements[name].value || "").trim(); });
    if (result.affiliations === "__other__") {
      result.affiliations = String(form.elements.other_org.value || "").trim();
      if (!result.affiliations) throw new Error("Enter the name of the other organization.");
    }
    return result;
  }
  const affiliationSelect = form.elements.affiliations;
  const otherWrap = document.getElementById("bio-other-wrap");
  const otherInput = form.elements.other_org;
  function toggleOther() {
    const selected = affiliationSelect.value === "__other__";
    otherWrap.hidden = !selected;
    otherInput.required = selected;
    if (!selected) otherInput.value = "";
  }
  affiliationSelect.addEventListener("change", toggleOther);
  toggleOther();
  function clean(value) {
    return value.replace(/[<>]/g, "").replace(/\r/g, "").trim();
  }
  function draft(data) {
    const name = clean(data.character_name);
    if (!name) throw new Error("Enter your character's name first.");
    const lines = ["# " + name, ""];
    Object.keys(labels).forEach((field) => {
      const value = clean(data[field]);
      if (!value) return;
      lines.push("## " + labels[field], "", field === "affiliations" ? value.split(",").map(item => "- " + item.trim()).join("\n") : value, "");
    });
    return lines.join("\n").trim() + "\n";
  }
  function addText(parent, tag, text) {
    const node = document.createElement(tag);
    node.textContent = text;
    parent.appendChild(node);
  }
  function preview() {
    const data = values();
    draft(data);
    content.replaceChildren();
    addText(content, "h3", clean(data.character_name));
    Object.keys(labels).forEach((field) => {
      if (!data[field]) return;
      addText(content, "h4", labels[field]);
      if (field === "affiliations") { const list = document.createElement("ul"); data[field].split(",").map(x => x.trim()).filter(Boolean).forEach(x => addText(list, "li", clean(x))); content.appendChild(list); }
      else data[field].split(/\n\s*\n/).forEach((part) => addText(content, "p", clean(part)));
    });
    panel.hidden = false;
    feedback.textContent = "Preview ready. Publishing is not enabled yet.";
  }
  document.getElementById("bio-preview").addEventListener("click", () => {
    try { preview(); } catch (error) { feedback.textContent = error.message; }
  });
  document.getElementById("bio-copy").addEventListener("click", async () => {
    try {
      const text = draft(values());
      await navigator.clipboard.writeText(text);
      feedback.textContent = "Biography Markdown copied. This does not publish your biography.";
    } catch (error) {
      feedback.textContent = error instanceof Error ? error.message : "Could not copy draft.";
    }
  });
  const portrait = form.elements.portrait;
  portrait.addEventListener("change", () => {
    const file = portrait.files && portrait.files[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 3 * 1024 * 1024) {
      portrait.value = "";
      feedback.textContent = "Choose a PNG, JPEG, or WebP image smaller than 3 MB.";
    } else {
      feedback.textContent = "Portrait selected. Portraits are not included in copied drafts.";
    }
  });
})();
