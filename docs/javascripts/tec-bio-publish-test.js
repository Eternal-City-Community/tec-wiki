(() => {
  "use strict";
  const root = document.getElementById("bio-publish-test");
  if (!root) return;
  const input = document.getElementById("bio-publish-test-secret");
  const button = document.getElementById("bio-publish-test-submit");
  const status = document.getElementById("bio-publish-test-status");
  const receipt = document.getElementById("bio-publish-test-receipt");
  let widget;
  function render() {
    if (!window.turnstile || widget !== undefined) return;
    widget = window.turnstile.render("#bio-publish-test-challenge", {
      sitekey: "0x4AAAAAAFW5CvcMWb-nnJ6R",
      callback: () => { button.disabled = false; status.textContent = "Challenge completed. Ready for test."; },
      "expired-callback": () => { button.disabled = true; status.textContent = "Challenge expired."; },
      "error-callback": () => { button.disabled = true; status.textContent = "Challenge unavailable."; }
    });
  }
  button.addEventListener("click", async () => {
    const secret = input.value.trim();
    const token = window.turnstile?.getResponse(widget);
    if (secret.length < 32 || !token) {
      status.textContent = "Complete Turnstile and enter the temporary secret.";
      return;
    }
    if (!window.confirm("Publish the disposable Wiki Integration Test biography to the live wiki?")) return;
    button.disabled = true;
    status.textContent = "Submitting. Do not retry if the result is unclear.";
    const biography = {
      character_name: "Wiki Integration Test",
      first_name: "Wiki", last_name: "Integration Test",
      nationality: "Iridine",
      appearance: "Temporary character used to verify the TEC Wiki biography publication workflow.",
      background: "This is a disposable integration test. It is not a player character biography.",
      additional: "For administrator testing only. Remove after validation.",
      affiliations: []
    };
    try {
      const response = await fetch("/api/bio/publish-test", {
        method: "POST",
        headers: { authorization: "Bearer " + secret, "content-type": "application/json" },
        body: JSON.stringify({ biography, turnstileToken: token }),
        cache: "no-store"
      });
      const data = await response.json();
      if (response.status === 201 && data.published === true && typeof data.edit_code === "string") {
        status.textContent = "PASS: Biography published. Save the editing code below privately.";
        document.getElementById("bio-publish-test-code").value = data.edit_code;
        const link = document.getElementById("bio-publish-test-link");
        link.href = data.url;
        receipt.hidden = false;
      } else {
        status.textContent = "HTTP " + response.status + ": " + (data.error || "Unexpected response") + ". Do not resubmit until checked.";
      }
    } catch {
      status.textContent = "Network error: publication status unknown. Do not resubmit until checked.";
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
    script.onerror = () => { status.textContent = "Unable to load Turnstile."; };
    document.head.appendChild(script);
  }
})();
