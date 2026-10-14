---
title: "Submit a Character Biography"
category: "Character Bios"
parent: character-bios
---

# Submit a Character Biography

Create your character's story using the guided form. Preview your biography before publishing.

!!! warning "Draft mode"
    Publishing is not enabled yet. You can preview and copy a Markdown draft, but this form does **not** save or submit your biography. Private editing codes and portrait publishing will be enabled after security testing.

<div id="bio-submit-app" class="tec-bio-form">
<form id="bio-submit-form">
  <section class="bio-form-card">
    <div class="bio-form-card-heading"><span class="bio-step">01</span><div><h2>Character details</h2><p>Tell us who your character is.</p></div></div>
    <div class="bio-form-grid">
      <div class="bio-field"><label for="bio-character-name">Character name <span class="bio-required">*</span></label><input id="bio-character-name" name="character_name" required maxlength="80" autocomplete="off" placeholder="Enter character name"></div>
      <div class="bio-field"><label for="bio-nationality">Nationality</label>
        <select id="bio-nationality" name="nationality">
          <option value="">Select nationality (optional)</option>
          <option>Aestivan League</option><option>Altene</option><option>Cinera</option><option>Gadaene</option><option>Iridine</option><option>Parcines</option><option>Remath</option><option>Safelands</option><option>Sostarea</option><option>Tuchea</option><option>Windward</option>
        </select>
      </div>
      <div class="bio-field bio-field-wide"><label for="bio-affiliations">Guild / organization</label>
        <select id="bio-affiliations" name="affiliations">
          <option value="">Select an organization (optional)</option>
          <option>Divortium Auxilii</option><option>Iridine Constables</option><option>Legio</option><option>Black Centurions</option><option>Harbor Rats</option><option>Umbra Alati</option><option>Monlon Volunteer Guard</option><option>Seld Sentinels</option><option>Cult of Ereal</option><option>Soldiers of Ereal</option><option>Cruentus Laureola</option><option>Silver Wolves</option><option>Guild of Locksmiths</option><option>Healers of Light</option><option>Vestis Formatae</option><option>Diamond Eye</option><option>Slime Squad</option>
          <option value="__other__">Other (enter organization)</option>
        </select>
        <div id="bio-other-wrap" class="bio-other-wrap" hidden><label for="bio-other-org">Other organization</label><input id="bio-other-org" name="other_org" maxlength="120" placeholder="Enter the organization name"></div>
      </div>
    </div>
  </section>
  <section class="bio-form-card">
    <div class="bio-form-card-heading"><span class="bio-step">02</span><div><h2>Your character's story</h2><p>Share as much or as little as you like.</p></div></div>
    <div class="bio-form-grid">
      <div class="bio-field bio-field-wide"><label for="bio-appearance">Appearance</label><textarea id="bio-appearance" name="appearance" rows="4" maxlength="6000" placeholder="What does your character look like?"></textarea></div>
      <div class="bio-field bio-field-wide"><label for="bio-background">Background &amp; history</label><textarea id="bio-background" name="background" rows="9" maxlength="30000" placeholder="Tell your character's story, origins, and experiences..."></textarea></div>
      <div class="bio-field bio-field-wide"><label for="bio-additional">Additional details <span class="bio-optional">(optional)</span></label><textarea id="bio-additional" name="additional" rows="4" maxlength="8000" placeholder="Anything else you'd like to share"></textarea></div>
    </div>
  </section>
  <section class="bio-form-card">
    <div class="bio-form-card-heading"><span class="bio-step">03</span><div><h2>Character portrait</h2><p>Add an image to accompany the biography (optional).</p></div></div>
    <div class="bio-field"><label for="bio-portrait">Portrait image</label><input id="bio-portrait" name="portrait" type="file" accept="image/png,image/jpeg,image/webp"><p class="bio-help">PNG, JPEG or WebP, up to 3 MB. Image uploads are disabled during draft mode.</p></div>
  </section>
  <div class="bio-form-actions">
    <button type="button" id="bio-preview" class="bio-primary-action">Preview biography</button>
    <button type="button" id="bio-copy" class="bio-secondary-action">Copy Markdown draft</button>
  </div>
  <p id="bio-feedback" role="status" aria-live="polite"></p>
</form>
<section id="bio-preview-panel" class="bio-form-card bio-preview-panel" hidden aria-label="Biography preview"><h2>Biography preview</h2><div id="bio-preview-content"></div></section>
</div>

<script src="/javascripts/tec-bio-submit.js" defer></script>

[Browse existing character biographies](/character-bios/)
