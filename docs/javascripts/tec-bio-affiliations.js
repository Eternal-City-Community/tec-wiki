document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("bio-affiliations");
  if (!select) return;
  const header = document.querySelector("#bio-submit-app .bio-app-header h2");
  if (header) header.textContent = "Tell your character's story.";
  const names = Array.from(select.options).filter(o => o.value && o.value !== "__other__").map(o => o.value);
  const wrap = document.createElement("div");
  wrap.className = "bio-affiliation-picker";
  wrap.innerHTML = '<input type="search" placeholder="Search organizations…" aria-label="Search organizations"><div class="bio-affiliation-choices"></div><label class="bio-affiliation-other"><input type="checkbox" value="Other"> Other organization</label><input class="bio-affiliation-custom" placeholder="Enter other organization names, separated by commas" hidden><p class="bio-help">Select all that apply.</p>';
  select.after(wrap);
  select.hidden = true;
  select.tabIndex = -1;
  const choices = wrap.querySelector(".bio-affiliation-choices");
  for (const name of names) {
    const label = document.createElement("label");
    const box = document.createElement("input");
    box.type = "checkbox";
    box.value = name;
    label.append(box, document.createTextNode(" " + name));
    choices.append(label);
  }
});
