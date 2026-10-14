(() => {
  "use strict";
  const root = document.getElementById("bio-recovery-test");
  if (!root) return;
  const $ = id => document.getElementById(id);
  const result = $("bio-recovery-result");
  const receipt = $("bio-recovery-receipt");
  const code = $("bio-recovery-new-code");
  const secret = $("bio-recovery-secret");
  const github = $("bio-recovery-github");
  async function run(action) {
    const integrationSecret = secret.value.trim();
    const ownerToken = github.value.trim();
    if (integrationSecret.length < 32 || ownerToken.length < 20) {
      result.textContent = "Enter the temporary integration secret and your GitHub owner token.";
      return;
    }
    if (action === "reset" && !window.confirm("Reset the disposable biography editing code? The old code will stop working.")) return;
    $("bio-recovery-inspect").disabled = true;
    $("bio-recovery-reset").disabled = true;
    receipt.hidden = true;
    code.value = "";
    result.textContent = "Contacting protected recovery endpoint…";
    try {
      const response = await fetch("/api/bio/recovery-test", {
        method: "POST",
        headers: { authorization: "Bearer " + integrationSecret, "content-type": "application/json" },
        body: JSON.stringify({ action, character_name: "Wiki Integration Test", github_token: ownerToken }),
        cache: "no-store"
      });
      const data = await response.json();
      if (!response.ok) {
        result.textContent = "HTTP " + response.status + ": " + (data.error || "Recovery unavailable");
      } else if (action === "inspect") {
        result.textContent = "Registration status: " + data.status + "; page exists: " + data.page_exists;
      } else if (data.reset === true && typeof data.edit_code === "string") {
        code.value = data.edit_code;
        receipt.hidden = false;
        result.textContent = "PASS: Editing code reset. Save the replacement code before leaving this page.";
      } else {
        result.textContent = "Unexpected response. Do not retry until checked.";
      }
    } catch {
      result.textContent = "Network error: status unknown. Do not retry until checked.";
    } finally {
      github.value = "";
      secret.value = "";
      $("bio-recovery-inspect").disabled = false;
      $("bio-recovery-reset").disabled = false;
    }
  }
  $("bio-recovery-inspect").addEventListener("click", () => run("inspect"));
  $("bio-recovery-reset").addEventListener("click", () => run("reset"));
  $("bio-recovery-copy").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(code.value); } catch { code.select(); }
  });
})();
