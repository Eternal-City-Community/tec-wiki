(() => {
  "use strict";
  const root = document.getElementById("bio-admin-app");
  if (!root) return;
  root.innerHTML = `
    <div class="bio-app-shell">
      <header class="bio-app-header">
        <div><span class="bio-app-eyebrow">The Eternal City · Wiki Administration</span>
          <h2>Biography recovery desk</h2>
          <p>Review ownership records and securely manage editing access.</p></div>
        <div class="bio-app-emblem" aria-hidden="true">✦</div>
      </header>
      <div class="bio-app-body">
        <section class="bio-form-card">
          <div class="bio-form-card-heading"><h3>Administrator authorization</h3>
            <p>Restricted to verified GitHub organization owners.</p></div>
          <p class="bio-security-note">Your GitHub permissions are verified by the server for every recovery request. Ordinary wiki editors cannot reset player codes.</p>
          <div class="bio-form-actions"><button id="bio-admin-login" type="button">Authorize with GitHub</button></div>
        </section>
        <form id="bio-admin-form" class="bio-form-card">
          <div class="bio-form-card-heading"><h3>Character recovery</h3>
            <p>Choose a biography and the action you need to take.</p></div>
          <div class="bio-form-grid">
            <div class="bio-field"><label for="bio-admin-character">Full character name</label>
              <input id="bio-admin-character" name="character_name" required maxlength="80" autocomplete="off" placeholder="Character's full name"></div>
            <div class="bio-field"><label for="bio-admin-action">Recovery action</label>
              <select id="bio-admin-action" name="action">
                <option value="inspect">Inspect ownership status</option>
                <option value="reset">Reset private editing code</option>
                <option value="revoke">Revoke player editing</option>
              </select></div>
          </div>
          <div class="bio-form-footer"><span class="bio-help">Reset issues a new one-time code. Revoke disables player editing.</span>
            <div class="bio-form-actions"><button type="submit" disabled>Run recovery action</button></div></div>
        </form>
        <section class="bio-form-card" aria-label="Recovery results">
          <div class="bio-form-card-heading"><h3>Recovery results</h3>
            <p>Review the outcome before leaving this page.</p></div>
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
    if (action !== "inspect" && !window.confirm("Confirm " + action + " for this biography?")) return;
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
        intro.textContent = "New private code. Copy and securely deliver it to the verified player; it will not be shown again.";
        const code = document.createElement("code");
        code.className = "bio-recovery-code";
        code.textContent = data.edit_code;
        const copy = document.createElement("button");
        copy.type = "button";
        copy.textContent = "Copy code";
        copy.addEventListener("click", () => navigator.clipboard.writeText(data.edit_code));
        result.append(intro, code, document.createElement("p"), copy);
      } else result.textContent = JSON.stringify(data);
    } catch (error) { result.textContent = error.message; }
    finally { button.disabled = false; }
  });
})();
