---
title: "Submit a Character Biography"
category: "Character Bios"
parent: character-bios
---

# Submit a Character Biography

Prepare your character's biography using the guided form below. You can preview it and copy the text without needing GitHub or the wiki editor.

!!! warning "Draft mode — publishing is not yet enabled"
    This form **does not submit or save your biography to the wiki yet**. You can preview your work and copy the Markdown draft to keep it. Automatic publishing, portraits, and private-code editing will be activated after security testing.

<div id="bio-submit-app" class="tec-bio-form">
<form id="bio-submit-form">
<fieldset>
<legend>Character details</legend>
<label for="bio-character-name">Character name (required)</label>
<input id="bio-character-name" name="character_name" required maxlength="80" autocomplete="off" placeholder="Your character's name">
<label for="bio-nationality">Nationality or origin</label>
<input id="bio-nationality" name="nationality" maxlength="120" placeholder="Optional">
<label for="bio-affiliations">Organizations and affiliations</label>
<textarea id="bio-affiliations" name="affiliations" rows="3" maxlength="2000" placeholder="Optional"></textarea>
</fieldset>
<fieldset>
<legend>Your character's story</legend>
<label for="bio-appearance">Appearance</label>
<textarea id="bio-appearance" name="appearance" rows="4" maxlength="6000"></textarea>
<label for="bio-background">Background</label>
<textarea id="bio-background" name="background" rows="5" maxlength="12000"></textarea>
<label for="bio-history">History</label>
<textarea id="bio-history" name="history" rows="7" maxlength="20000"></textarea>
<label for="bio-additional">Additional details</label>
<textarea id="bio-additional" name="additional" rows="4" maxlength="8000" placeholder="Optional"></textarea>
</fieldset>
<fieldset>
<legend>Portrait (optional)</legend>
<label for="bio-portrait">Character portrait</label>
<input id="bio-portrait" name="portrait" type="file" accept="image/png,image/jpeg,image/webp">
<p>PNG, JPEG, or WebP; maximum 3 MB. Portrait upload is not enabled during draft mode.</p>
</fieldset>
<div class="bio-form-actions">
<button type="button" id="bio-preview">Preview biography</button>
<button type="button" id="bio-copy">Copy Markdown draft</button>
</div>
<p id="bio-feedback" role="status" aria-live="polite"></p>
</form>
<section id="bio-preview-panel" hidden aria-label="Biography preview">
<h2>Biography preview</h2>
<div id="bio-preview-content"></div>
</section>
</div>

<script src="/javascripts/tec-bio-submit.js" defer></script>

[Browse existing character biographies](/character-bios/)
