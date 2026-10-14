(() => {
  "use strict";
  const form = document.getElementById("bio-submit-form");
  if (!form) return;
  const actions = form.querySelector(".bio-form-actions");
  const feedback = document.getElementById("bio-feedback");
  const submit = document.createElement("button");
  submit.type = "button";
  submit.className = "bio-primary-action";
  submit.textContent = "Publish biography";
  submit.disabled = true;
  actions.appendChild(submit);
  const verify = document.createElement("div");
  verify.id = "bio-publish-turnstile";
  actions.before(verify);
  const receipt = document.createElement("section");
  receipt.className = "bio-form-card";
  receipt.hidden = true;
  receipt.setAttribute("aria-live", "polite");
  actions.parentElement.after(receipt);
  let widget, portraitWidget, active = false, portraitEnabled = false, issued = null;
  const siteKey = "0x4AAAAAAFW5CvcMWb-nnJ6R";
  function render() {
    if (!window.turnstile || widget !== undefined) return;
    widget = window.turnstile.render("#bio-publish-turnstile", { sitekey: siteKey });
  }
  function reset() { if (window.turnstile && widget !== undefined) window.turnstile.reset(widget); }
  function token() {
    const value = widget === undefined ? "" : window.turnstile?.getResponse(widget);
    if (!value) throw new Error("Complete human verification first.");
    return value;
  }
  function biography() {
    const first_name = form.elements.first_name.value.trim();
    const last_name = form.elements.last_name.value.trim();
    const character_name = [first_name, last_name].filter(Boolean).join(" ");
    if (!first_name || character_name.length > 80) throw Error("Enter a valid character name.");
    const chosen = form.elements.affiliations.value;
    return {
      first_name, last_name, character_name,
      nationality: form.elements.nationality.value,
      appearance: form.elements.appearance.value,
      background: form.elements.background.value,
      additional: form.elements.additional.value,
      affiliations: chosen ? chosen.split(",").map(x => x.trim()).filter(Boolean) : []
    };
  }
  async function post(url, body) {
    const response = await fetch(url, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify(body), cache: "no-store"
    });
    const data = await response.json();
    if (!response.ok) throw Error(data.error || "Unable to publish.");
    return data;
  }
  function showReceipt(data) {
    receipt.replaceChildren();
    const heading = document.createElement("h3");
    heading.textContent = "Your biography was published";
    const info = document.createElement("p");
    info.textContent = "Save this private editing code now. It cannot be retrieved later.";
    const code = document.createElement("code");
    code.textContent = data.edit_code;
    const copy = document.createElement("button");
    copy.type = "button";
    copy.textContent = "Copy editing code";
    copy.addEventListener("click", () => navigator.clipboard.writeText(data.edit_code));
    const link = document.createElement("a");
    link.href = data.url;
    link.textContent = "View published biography";
    receipt.append(heading, info, code, document.createElement("p"), copy, document.createElement("p"), link);
    const portraitFile = form.elements.portrait.files?.[0];
    if (portraitFile && portraitEnabled) {
      const verifyPortrait = document.createElement("div");
      verifyPortrait.id = "bio-portrait-turnstile";
      const upload = document.createElement("button");
      upload.type = "button";
      upload.textContent = "Upload selected portrait";
      receipt.append(document.createElement("p"), verifyPortrait, upload);
      if (window.turnstile) portraitWidget = window.turnstile.render(verifyPortrait, { sitekey: siteKey });
      upload.addEventListener("click", async () => {
        upload.disabled = true;
        try {
          const base64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result).split(",")[1]);
            reader.onerror = () => reject(new Error("Unable to read portrait"));
            reader.readAsDataURL(portraitFile);
          });
          const response = await post("/api/bio/portrait", {
            character_name: data.character_name, edit_code: data.edit_code,
            mime: portraitFile.type, base64,
            turnstileToken: window.turnstile.getResponse(portraitWidget)
          });
          feedback.textContent = response.published ? "Portrait published." : "Portrait publication not confirmed.";
          if (response.published) upload.hidden = true;
        } catch (error) {
          feedback.textContent = "Biography published, but portrait upload failed: " + error.message;
          upload.disabled = false;
        } finally {
          if (window.turnstile && portraitWidget !== undefined) window.turnstile.reset(portraitWidget);
        }
      });
    }
    receipt.hidden = false;
  }
  submit.addEventListener("click", async () => {
    if (!active) return;
    submit.disabled = true;
    feedback.textContent = "Publishing biography…";
    try {
      const data = await post("/api/bio/publish", { biography: biography(), turnstileToken: token() });
      issued = data;
      showReceipt(data);
      feedback.textContent = "Published. Save your editing code before leaving this page.";
      submit.hidden = true;
    } catch (error) { feedback.textContent = error.message; }
    finally { reset(); if (!issued) submit.disabled = !active; }
  });
  async function setup() {
    try {
      const response = await fetch("/api/bio/configuration", { cache: "no-store" });
      const data = await response.json();
      active = response.ok && data.publication_enabled === true;
      portraitEnabled = data.portrait_enabled === true;
      submit.disabled = !active;
      if (!active) return;
      if (window.turnstile) render();
      else {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.onload = render;
        document.head.appendChild(script);
      }
    } catch { submit.disabled = true; }
  }
  setup();
})();
