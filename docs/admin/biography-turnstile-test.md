---
title: "Turnstile Integration Test"
---

# Turnstile Integration Test

!!! warning "Temporary administrator test"
    This page is for verifying Cloudflare Turnstile before enabling biography submissions. It does **not** publish a biography. Use it only while the temporary integration secret is configured, and remove that secret afterward.

<div id="bio-turnstile-test">
  <p>Complete the verification challenge, then enter the temporary <code>BIO_INTEGRATION_TEST_SECRET</code> value. It is sent only to this site's protected verification endpoint and is not saved in browser storage.</p>
  <div id="bio-turnstile-test-widget"></div>
  <p><label for="bio-turnstile-test-secret">Temporary integration secret</label></p>
  <p><input id="bio-turnstile-test-secret" type="password" autocomplete="off" spellcheck="false" style="width:100%;max-width:35rem" /></p>
  <p><button id="bio-turnstile-test-run" type="button" disabled>Verify real token</button></p>
  <p id="bio-turnstile-test-result" role="status" aria-live="polite">Waiting for Turnstile challenge.</p>
</div>

<script src="/javascripts/tec-bio-turnstile-test.js" defer></script>
