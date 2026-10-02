// Shows command placeholders such as `jab <target>` as text in the editor and
// its preview, instead of letting the browser hide them as unknown HTML tags.
// The site build does the same in hooks/placeholders.py.
(function () {
  // HTML tags the pages really use. Keep in step with hooks/placeholders.py.
  var HTML_TAGS = (
    "a abbr article aside b base blockquote body br button caption center code col " +
    "dd del details div dl dt em fieldset figcaption figure font footer form h1 h2 " +
    "h3 h4 h5 h6 head header hr html i iframe img input ins kbd label legend li link " +
    "main mark meta nav ol option p pre s script section select small span strong " +
    "style sub summary sup table tbody td textarea tfoot th thead tr u ul wbr"
  ).split(" ");
  var TAG = /^<\/?([A-Za-z][^<>\n]*)>$/;

  function isPlaceholder(value) {
    var match = TAG.exec(value);
    if (!match) return false;
    var inner = match[1];
    var name = /^[A-Za-z][\w-]*/.exec(inner)[0].toLowerCase();
    var rest = inner.slice(name.length).replace(/^\s*\/?\s*|\s*\/?\s*$/g, "");
    if (HTML_TAGS.indexOf(name) !== -1 && (!rest || rest.indexOf("=") !== -1)) return false;
    return inner.indexOf("://") === -1 && inner.indexOf("@") === -1;
  }

  function visit(node) {
    if (node.type === "html" && isPlaceholder(node.value)) node.type = "text";
    (node.children || []).forEach(visit);
  }

  function placeholdersAsText() {
    return visit;
  }

  if (window.CMS && typeof window.CMS.registerRemarkPlugin === "function") {
    CMS.registerRemarkPlugin(placeholdersAsText);
  }
})();
