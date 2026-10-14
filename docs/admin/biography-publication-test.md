# Disposable Biography Publication Test

!!! warning "Temporary administrator-only test"
    This page creates a real disposable biography commit on `main`. Do not submit more than once. Public biography submissions remain disabled.

<div id="bio-publish-test">
  <p>Test character: <strong>Wiki Integration Test</strong>. Complete Turnstile and enter the temporary integration secret. The secret is not saved to browser storage.</p>
  <div id="bio-publish-test-challenge"></div>
  <p><label for="bio-publish-test-secret">Temporary integration secret</label></p>
  <p><input id="bio-publish-test-secret" type="password" autocomplete="off" style="width:100%;max-width:35rem"></p>
  <p><button id="bio-publish-test-submit" type="button" disabled>Publish disposable test biography</button></p>
  <p id="bio-publish-test-status" role="status" aria-live="polite">Waiting for verification.</p>
  <div id="bio-publish-test-receipt" hidden>
    <p><strong>Save this editing code now.</strong> It will not be displayed again.</p>
    <p><input id="bio-publish-test-code" readonly style="width:100%;max-width:35rem"></p>
    <p><a id="bio-publish-test-link" href="#">View test biography</a></p>
  </div>
</div>

<script src="/javascripts/tec-bio-publish-test.js" defer></script>
