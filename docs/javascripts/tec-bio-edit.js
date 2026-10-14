(() => {
  "use strict";
  const root = document.getElementById("bio-edit-app");
  if (!root) return;
  root.innerHTML = `
    <form id="bio-owner-form" class="bio-form-card">
      <h2>Open your biography</h2>
      <p>Enter your full character name and the private editing code you received when publishing.</p>
      <label>Character name <input name="character_name" required maxlength="80" autocomplete="off"></label>
      <label>Private editing code <input name="edit_code" required minlength="64" maxlength="64" autocomplete="off" spellcheck="false"></label>
      <div id="bio-owner-turnstile"></div>
      <button type="submit">Load biography</button>
    </form>
    <form id="bio-owner-editor" class="bio-form-card" hidden>
      <h2>Edit biography</h2>
      <p>The character name cannot be changed here because it determines the page address.</p>
      <label>Nationality <input name="nationality" maxlength="80"></label>
      <label>Appearance <textarea name="appearance" maxlength="6000" rows="5"></textarea></label>
      <label>Background &amp; history <textarea name="background" maxlength="30000" rows="10"></textarea></label>
      <label>Organizations and affiliations (one per line) <textarea name="affiliations" rows="4"></textarea></label>
      <label>Additional details <textarea name="additional" maxlength="8000" rows="5"></textarea></label>
      <div id="bio-edit-turnstile"></div>
      <button type="submit">Save changes</button>
    </form>
    <p id="bio-owner-feedback" role="status" aria-live="polite"></p>`;
  const openForm = root.querySelector("#bio-owner-form");
  const editor = root.querySelector("#bio-owner-editor");
  const feedback = root.querySelector("#bio-owner-feedback");
  let name = "", code = "", sha = "";
  const siteKey = "0x4AAAAAAFW5CvcMWb-nnJ6R";
  let loadWidget, editWidget;
  function turnstileToken(widget) {
    if (!window.turnstile || widget === undefined) throw Error("Human verification is unavailable.");
    const token = window.turnstile.getResponse(widget);
    if (!token) throw Error("Complete human verification first.");
    return token;
  }
  function renderChallenges() {
    if (!window.turnstile) return;
    if (loadWidget === undefined) loadWidget = window.turnstile.render("#bio-owner-turnstile", { sitekey: siteKey });
    if (editWidget === undefined) editWidget = window.turnstile.render("#bio-edit-turnstile", { sitekey: siteKey });
  }
  if (window.turnstile) renderChallenges();
  else {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = renderChallenges;
    document.head.appendChild(script);
  }
  async function post(url, payload) {
    const response = await fetch(url, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify(payload), cache: "no-store"
    });
    const result = await response.json();
    if (!response.ok) throw Error(result.error || "The request could not be completed.");
    return result;
  }
  function sections(markdown) {
    const output = {};
    const pattern = /^## (Nationality|Appearance|Background & History|Organizations and Affiliations|Additional Details)\s*$/gm;
    const matches = [...markdown.matchAll(pattern)];
    for (let i = 0; i < matches.length; i++) {
      const heading = matches[i][1];
      output[heading] = markdown.slice(matches[i].index + matches[i][0].length, matches[i + 1]?.index ?? markdown.length).trim();
    }
    return output;
  }
  openForm.addEventListener("submit", async event => {
    event.preventDefault();
    feedback.textContent = "Checking ownership…";
    try {
      name = openForm.elements.character_name.value.trim();
      code = openForm.elements.edit_code.value.trim();
      const data = await post("/api/bio/load", { character_name: name, edit_code: code, turnstileToken: turnstileToken(loadWidget) });
      sha = data.sha;
      const binary = atob(data.markdown_base64);
      const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
      const content = new TextDecoder().decode(bytes);
      const parts = sections(content);
      editor.elements.nationality.value = parts.Nationality || "";
      editor.elements.appearance.value = parts.Appearance || "";
      editor.elements.background.value = parts["Background & History"] || "";
      editor.elements.affiliations.value = (parts["Organizations and Affiliations"] || "").split("\n").map(x => x.replace(/^-\s*/, "")).join("\n");
      editor.elements.additional.value = parts["Additional Details"] || "";
      editor.hidden = false;
      feedback.textContent = "Biography loaded. Review the details before saving.";
    } catch (error) { feedback.textContent = error.message; }
    finally { if (window.turnstile && loadWidget !== undefined) window.turnstile.reset(loadWidget); }
  });
  editor.addEventListener("submit", async event => {
    event.preventDefault();
    feedback.textContent = "Saving changes…";
    try {
      const parts = name.split(/\s+/);
      const biography = {
        character_name: name, first_name: parts[0], last_name: parts.slice(1).join(" "),
        nationality: editor.elements.nationality.value,
        appearance: editor.elements.appearance.value,
        background: editor.elements.background.value,
        additional: editor.elements.additional.value,
        affiliations: editor.elements.affiliations.value.split("\n").map(x => x.trim()).filter(Boolean)
      };
      const data = await post("/api/bio/edit", {
        biography, edit_code: code, expected_sha: sha, turnstileToken: turnstileToken(editWidget)
      });
      feedback.textContent = "Changes saved. Reload your biography to edit it again.";
      editor.hidden = true;
      sha = "";
    } catch (error) { feedback.textContent = error.message; }
    finally { if (window.turnstile && editWidget !== undefined) window.turnstile.reset(editWidget); }
  });
})();
