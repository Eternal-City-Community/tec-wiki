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
  const search = wrap.querySelector('input[type="search"]');
  const custom = wrap.querySelector(".bio-affiliation-custom");
  const other = wrap.querySelector(".bio-affiliation-other input");
  function sync() {
    const selected = Array.from(choices.querySelectorAll("input:checked")).map(x => x.value);
    if (other.checked) selected.push(...custom.value.split(",").map(x => x.trim()).filter(Boolean));
    const value = selected.join(", ");
    select.replaceChildren(new Option("None", ""));
    if (value) select.add(new Option(value, value, true, true));
    custom.hidden = !other.checked;
  }
  choices.addEventListener("change", sync);
  other.addEventListener("change", sync);
  custom.addEventListener("input", sync);
  search.addEventListener("input", () => {
    const term = search.value.toLowerCase().trim();
    for (const label of choices.children) {
      label.hidden = !label.textContent.toLowerCase().includes(term);
    }
  });
  sync();
});
