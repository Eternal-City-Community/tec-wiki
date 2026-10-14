(() => {
  "use strict";
  const root = document.getElementById("bio-admin-app");
  if (!root) return;
  root.innerHTML = `
    <div class="bio-app-shell">
      <header class="bio-app-header">
        <div><span class="bio-app-eyebrow">The Eternal City · Wiki Administration</span>
          <h2>Biography recovery desk</h2>
          <p>Check a biography, replace a lost editing code, or turn off editing.</p></div>
        <div class="bio-app-emblem" aria-hidden="true">✦</div>
      </header>
      <div class="bio-app-body">
        <section class="bio-form-card">
          <div class="bio-form-card-heading"><h3>Administrator authorization</h3>
            <p>Step 1: Sign in with your GitHub account.</p></div>
          <p class="bio-security-note">Only Eternal-City-Community GitHub organization owners can use this tool. First, confirm that the player requesting help owns the character.</p>
          <div class="bio-form-actions"><button id="bio-admin-login" type="button">Authorize with GitHub</button></div>
        </section>
        <form id="bio-admin-form" class="bio-form-card">
          <div class="bio-form-card-heading"><h3>Character recovery</h3>
            <p>Step 2: Enter the character name and choose what you want to do.</p></div>
          <div class="bio-form-grid">
            <div class="bio-field"><label for="bio-admin-character">Full character name</label>
              <input id="bio-admin-character" name="character_name" required maxlength="80" autocomplete="off" placeholder="Character's full name"></div>
            <div class="bio-field"><label for="bio-admin-action">Recovery action</label>
              <select id="bio-admin-action" name="action">
                <option value="inspect">Check editing status (no changes)</option>
                <option value="reset">Replace a lost editing code</option>
                <option value="revoke">Turn off player editing</option>
              </select></div>
          </div>
          <div class="bio-form-footer"><span class="bio-help">Check changes nothing. Replace makes the old code stop working. Turn off editing does not delete the page.</span>
            <div class="bio-form-actions"><button type="submit" disabled>Continue</button></div></div>
        </form>
        <section class="bio-form-card" aria-label="Recovery results">
          <div class="bio-form-card-heading"><h3>Recovery results</h3>
            <p>Step 3: Read the result. If you replaced a code, copy it now and send it privately to the verified player.</p></div>
          <div id="bio-admin-result" class="bio-feedback" role="status" aria-live="polite">Authorize with GitHub to begin.</div>
        </section>
      </div>
    </div>`;
  const form = root.querySelector("#bio-admin-form");
  const button = form.querySelector('button[type="submit"]');
  const result = root.querySelector("#bio-admin-result");
  let githubToken = null;
  root.querySelector("#bio-admin-login").addEventListener("click", () => {
    const popup = window.open("/auth", "tec-bio-admin-auth", "width=700,height=720");
    if (!popup) result.textContent = "Allow the GitHub authorization popup.";
  });
  window.addEventListener("message", event => {
    if (event.origin !== location.origin) return;
    if (event.data === "authorizing:github") {
      event.source?.postMessage("tec-wiki-bio-admin", location.origin);
      return;
    }
    if (typeof event.data !== "string" || !event.data.startsWith("authorization:github:")) return;
    const match = event.data.match(/^authorization:github:(success|error):(.*)$/s);
    if (!match) return;
    try {
      const payload = JSON.parse(match[2]);
      if (match[1] !== "success" || typeof payload.token !== "string") {
        result.textContent = "GitHub authorization failed.";
        return;
      }
      githubToken = payload.token;
      button.disabled = false;
      result.textContent = "Authorized. The server will verify organization-owner privileges for each request.";
    } catch { result.textContent = "Unexpected GitHub authorization response."; }
  });
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!githubToken) return;
    const action = form.elements.action.value;
    if (action !== "inspect" && !window.confirm(action === "reset" ? "Replace this player’s editing code? Their old code will stop working. Make sure you can give the new code to the verified player." : "Turn off player editing for this biography? The biography will stay on the wiki, but the current code will stop working.")) return;
    button.disabled = true;
    result.textContent = "Verifying administrator permissions…";
    try {
      const response = await fetch("/api/bio/admin", {
        method: "POST", cache: "no-store",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action, character_name: form.elements.character_name.value.trim(), github_token: githubToken
        })
      });
      const data = await response.json();
      if (!response.ok) throw Error(data.error || "Recovery failed");
      if (data.edit_code) {
        result.replaceChildren();
        const intro = document.createElement("p");
        intro.textContent = "New editing code: copy it now and send it privately to the verified player. The old code no longer works. This new code will not be shown again.";
        const code = document.createElement("code");
        code.className = "bio-recovery-code";
        code.textContent = data.edit_code;
        const copy = document.createElement("button");
        copy.type = "button";
        copy.textContent = "Copy code";
        copy.addEventListener("click", () => navigator.clipboard.writeText(data.edit_code));
        result.append(intro, code, document.createElement("p"), copy);
      } else if (action === "inspect") result.textContent = "Editing status: " + (data.status || "unknown") + ". No changes were made.";
      else if (action === "revoke" && data.revoked) result.textContent = "Player editing is now turned off. The biography remains published.";
      else result.textContent = "Action completed.";
    } catch (error) { result.textContent = error.message; }
    finally { button.disabled = false; }
  });
})();
