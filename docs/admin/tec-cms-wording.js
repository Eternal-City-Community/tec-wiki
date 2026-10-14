// Wording changes to Decap's English text. With the editorial workflow, Save
// only stores a draft; "Changes saved" and "Entry saved" made editors think
// their edit was already on the wiki.
(function () {
  if (!window.CMS || !CMS.getLocale || !CMS.registerLocale) return;
  var en = CMS.getLocale("en");
  if (!en || !en.editor || !en.ui) return;
  var phrases = JSON.parse(JSON.stringify(en));
  phrases.editor.editorToolbar.changesSaved = "Draft saved";
  phrases.ui.toast.entrySaved = "Draft saved";
  CMS.registerLocale("en", phrases);
})();
