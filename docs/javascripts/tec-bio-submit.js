(function () {
  "use strict";
  const form = document.getElementById("bio-submit-form");
  if (!form) return;
  const feedback = document.getElementById("bio-feedback");
  const panel = document.getElementById("bio-preview-panel");
  const content = document.getElementById("bio-preview-content");
  const fields = ["character_name", "nationality", "appearance", "background", "history", "affiliations", "additional"];
  const labels = {
    nationality: "Nationality or origin", appearance: "Appearance",
    background: "Background", history: "History",
    affiliations: "Organizations and affiliations", additional: "Additional details"
  };
  function values() {
    const result = {};
    fields.forEach((name) => { result[name] = String(form.elements[name].value || "").trim(); });
    return result;
  }
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
      lines.push("## " + labels[field], "", value, "");
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
      data[field].split(/\n\s*\n/).forEach((part) => addText(content, "p", clean(part)));
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
