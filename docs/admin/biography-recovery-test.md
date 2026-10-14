# Disposable Biography Recovery Test

!!! warning "Administrator-only integration test"
    Only the disposable **Wiki Integration Test** biography can be inspected or reset here. A GitHub token belonging to an owner of Eternal-City-Community is required. The replacement code appears once. Do not share the token or code.

<div id="bio-recovery-test" class="bio-recovery-test">
  <div class="bio-recovery-test__card">
    <h2>Test editing-code recovery</h2>
    <p>Character: <strong>Wiki Integration Test</strong></p>
    <label for="bio-recovery-secret">Temporary integration secret</label>
    <input id="bio-recovery-secret" type="password" autocomplete="off">
    <label for="bio-recovery-github">GitHub organization-owner token</label>
    <input id="bio-recovery-github" type="password" autocomplete="off">
    <p class="bio-recovery-test__actions"><button id="bio-recovery-inspect" type="button">Inspect registration</button> <button id="bio-recovery-reset" type="button">Reset editing code</button></p>
    <p id="bio-recovery-result" role="status" aria-live="polite">No request sent.</p>
    <div id="bio-recovery-receipt" hidden>
      <label for="bio-recovery-new-code">New editing code — save privately</label>
      <input id="bio-recovery-new-code" readonly>
      <button id="bio-recovery-copy" type="button">Copy new code</button>
    </div>
  </div>
</div>

<script src="/javascripts/tec-bio-recovery-test.js" defer></script>
