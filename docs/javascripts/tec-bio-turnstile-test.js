(() => {
  "use strict";
  const root = document.getElementById("bio-turnstile-test");
  if (!root) return;
  const input = document.getElementById("bio-turnstile-test-secret");
  const button = document.getElementById("bio-turnstile-test-run");
  const result = document.getElementById("bio-turnstile-test-result");
  const sitekey = "0x4AAAAAAFW5CvcMWb-nnJ6R";
  let widget;
  function render() {
    if (!window.turnstile || widget !== undefined) return;
    widget = window.turnstile.render("#bio-turnstile-test-widget", {
      sitekey,
      callback: () => { button.disabled = false; result.textContent = "Challenge complete. Ready to verify."; },
      "expired-callback": () => { button.disabled = true; result.textContent = "Challenge expired. Complete it again."; },
      "error-callback": () => { button.disabled = true; result.textContent = "Turnstile challenge could not load."; }
    });
  }
  button.addEventListener("click", async () => {
    const secret = input.value.trim();
    const token = window.turnstile?.getResponse(widget);
    if (secret.length < 32 || !token) {
      result.textContent = "Enter the temporary secret and complete the challenge.";
      return;
    }
    button.disabled = true;
    result.textContent = "Verifying with Cloudflare…";
    try {
      const response = await fetch("/api/bio/turnstile-probe", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: "Bearer " + secret },
        body: JSON.stringify({ turnstileToken: token }),
        cache: "no-store"
      });
      const data = await response.json();
      result.textContent = response.ok
        ? (data.verified === true ? "PASS: Real Turnstile token verified." : "FAIL: Turnstile rejected this token.")
        : "Probe unavailable: HTTP " + response.status + ".";
    } catch {
      result.textContent = "Unable to reach verification endpoint.";
    } finally {
      input.value = "";
      window.turnstile?.reset(widget);
    }
  });
  if (window.turnstile) render();
  else {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = render;
    script.onerror = () => { result.textContent = "Unable to load Turnstile."; };
    document.head.appendChild(script);
  }
})();
