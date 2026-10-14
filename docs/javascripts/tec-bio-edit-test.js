(() => {
  "use strict";
  const root = document.getElementById("bio-edit-test-app");
  if (!root) return;
  root.innerHTML = `
    <div class="bio-app-shell">
      <header class="bio-app-header">
        <div><span class="bio-app-eyebrow">The Eternal City · Character Biographies</span>
          <h2>Continue their story</h2>
          <p>Return to a biography you've published and make changes.</p></div>
        <div class="bio-app-emblem" aria-hidden="true">✦</div>
      </header>
      <div class="bio-app-body">
        <form id="bio-owner-form" class="bio-form-card">
          <div class="bio-form-card-heading"><h3>Find your biography</h3>
            <p>Use the character's full name and your private editing code.</p></div>
          <div class="bio-form-grid">
            <div class="bio-field"><label for="bio-edit-name">Character name</label>
              <input id="bio-edit-name" name="character_name" required maxlength="80" autocomplete="off" placeholder="First and last name, if applicable"></div>
            <div class="bio-field"><label for="bio-edit-code">Private editing code</label>
              <input id="bio-edit-code" name="edit_code" required minlength="64" maxlength="64" autocomplete="off" spellcheck="false" placeholder="Your private 64-character code"></div>
          </div>
          <p class="bio-help">Only biographies created through the player submission system can be edited here.</p>
          <div id="bio-owner-turnstile"></div>
          <div class="bio-form-footer"><span class="bio-help">Your code is never displayed publicly.</span>
            <div class="bio-form-actions"><button type="submit">Load biography</button></div></div>
        </form>
        <form id="bio-owner-editor" class="bio-form-card" hidden>
          <div class="bio-form-card-heading"><h3>Edit character details</h3>
            <p>Your character name stays the same so existing links continue working.</p></div>
          <div class="bio-form-grid">
            <div class="bio-field bio-field-wide"><label for="bio-edit-nationality">Nationality</label>
              <input id="bio-edit-nationality" name="nationality" maxlength="80"></div>
            <div class="bio-field bio-field-wide"><label for="bio-edit-appearance">Appearance</label>
              <textarea id="bio-edit-appearance" name="appearance" maxlength="6000" rows="5"></textarea></div>
            <div class="bio-field bio-field-wide"><label for="bio-edit-background">Background &amp; history</label>
              <textarea id="bio-edit-background" name="background" maxlength="30000" rows="10"></textarea></div>
            <div class="bio-field bio-field-wide"><label for="bio-edit-affiliations">Organizations and affiliations</label>
              <textarea id="bio-edit-affiliations" name="affiliations" rows="4" placeholder="One organization per line"></textarea></div>
            <div class="bio-field bio-field-wide"><label for="bio-edit-additional">Additional details</label>
              <textarea id="bio-edit-additional" name="additional" maxlength="8000" rows="5"></textarea></div>
          </div>
          <div id="bio-edit-turnstile"></div>
          <div class="bio-form-footer"><span class="bio-help">Saving updates your existing biography.</span>
            <div class="bio-form-actions"><button type="submit">Save changes</button></div></div>
        </form>
        <p id="bio-owner-feedback" class="bio-feedback" role="status" aria-live="polite"></p>
      </div>
    </div>`;
  const secretField = document.createElement("div");
  secretField.className = "bio-field bio-field-wide";
  secretField.innerHTML = `<label for="bio-test-secret">Temporary integration secret</label><input id="bio-test-secret" type="password" autocomplete="off" spellcheck="false" placeholder="Temporary integration secret">`;
  root.querySelector("#bio-owner-form .bio-form-grid").appendChild(secretField);
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
      method: "POST", headers: { "content-type": "application/json", authorization: "Bearer " + secretField.querySelector("input").value.trim() },
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
      const data = await post("/api/bio/load-test", { character_name: name, edit_code: code, turnstileToken: turnstileToken(loadWidget) });
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
      const data = await post("/api/bio/edit-test", {
        biography, edit_code: code, expected_sha: sha, turnstileToken: turnstileToken(editWidget)
      });
      feedback.textContent = "Changes saved. Reload your biography to edit it again.";
      editor.hidden = true;
      sha = "";
    } catch (error) { feedback.textContent = error.message; }
    finally { if (window.turnstile && editWidget !== undefined) window.turnstile.reset(editWidget); }
  });
})();
