(() => {
  "use strict";
  const root = document.getElementById("bio-admin-app");
  if (!root) return;
  root.innerHTML = `
    <div class="bio-form-card">
      <p>Only GitHub organization owners may use this tool.</p>
      <button id="bio-admin-login" type="button">Authorize with GitHub</button>
      <form id="bio-admin-form">
        <label>Full character name <input name="character_name" required maxlength="80" autocomplete="off"></label>
        <label>Recovery action
          <select name="action">
            <option value="inspect">Inspect ownership status</option>
            <option value="reset">Reset private editing code</option>
            <option value="revoke">Revoke player editing</option>
          </select>
        </label>
        <button type="submit" disabled>Run recovery action</button>
      </form>
      <p id="bio-admin-result" role="status" aria-live="polite"></p>
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
