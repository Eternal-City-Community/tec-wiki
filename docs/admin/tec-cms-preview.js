// Editor preview that renders pages inside the same wrapper as the live site,
// so the site's own stylesheets and page enhancers (loaded by tec-preview-assets.js) apply.
(function () {
  // Layout width the preview frame is rendered at, then scaled to fit the pane,
  // so the site's width-based rules see a desktop screen.
  var DESKTOP_WIDTH = 1000;

  // Blocks whose text Python-Markdown's nl2br extension turns line breaks into <br>.
  var NL2BR_BLOCKS = { P: 1, LI: 1, TD: 1, TH: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1, DT: 1, DD: 1 };
  var BLOCK_TAGS = /^(P|LI|TD|TH|H[1-6]|DT|DD|DIV|BLOCKQUOTE|UL|OL|TABLE|THEAD|TBODY|TR|SECTION|ARTICLE|DETAILS|SUMMARY|PRE|DL|BODY)$/;
  var NO_BREAK_INSIDE = /^(PRE|CODE|SCRIPT|STYLE|TEXTAREA)$/;

  function blockOf(node) {
    var el = node.parentNode;
    while (el && !BLOCK_TAGS.test(el.nodeName)) el = el.parentNode;
    return el;
  }

  function insideNoBreak(node, stop) {
    for (var el = node.parentNode; el && el !== stop; el = el.parentNode) {
      if (NO_BREAK_INSIDE.test(el.nodeName)) return true;
    }
    return false;
  }

  // Mirrors nl2br: line breaks inside paragraph-like blocks become <br>, except
  // at the very start or end of the block. Replaced newlines are removed, so
  // running this again changes nothing.
  function lineBreaksToBr(root) {
    var doc = root.ownerDocument;
    var walker = doc.createTreeWalker(root, 4 /* NodeFilter.SHOW_TEXT */);
    var byBlock = new Map();
    var node;

    while ((node = walker.nextNode())) {
      if (node.nodeValue.indexOf("\n") === -1 || insideNoBreak(node, root)) continue;
      var block = blockOf(node);
      if (!block || !NL2BR_BLOCKS[block.nodeName] || !root.contains(block)) continue;
      if (!byBlock.has(block)) byBlock.set(block, []);
      byBlock.get(block).push(node);
    }

    byBlock.forEach(function (nodes, block) {
      var texts = [];
      var all = doc.createTreeWalker(block, 4);
      while ((node = all.nextNode())) texts.push(node);
      var first = texts[0];
      var last = texts[texts.length - 1];

      nodes.forEach(function (text) {
        var value = text.nodeValue;
        if (text === first) value = value.replace(/^\s+/, "");
        if (text === last) value = value.replace(/\s+$/, "");
        if (value.indexOf("\n") === -1) {
          text.nodeValue = value;
          return;
        }

        var parts = value.split("\n");
        var frag = doc.createDocumentFragment();
        parts.forEach(function (part, i) {
          if (i > 0) frag.appendChild(doc.createElement("br"));
          if (part) frag.appendChild(doc.createTextNode(part));
        });
        text.parentNode.replaceChild(frag, text);
      });
    });
  }

  // Material's own script wraps plain tables like this on the live site.
  function wrapTables(root) {
    var doc = root.ownerDocument;
    root.querySelectorAll("table:not([class])").forEach(function (table) {
      var parent = table.parentNode;
      if (parent.classList && parent.classList.contains("md-typeset__table")) return;
      var scrollwrap = doc.createElement("div");
      scrollwrap.className = "md-typeset__scrollwrap";
      var wrap = doc.createElement("div");
      wrap.className = "md-typeset__table";
      parent.insertBefore(scrollwrap, table);
      scrollwrap.appendChild(wrap);
      wrap.appendChild(table);
    });
  }

  // Python-Markdown's admonition extension: "!!! type "Title"" plus indented text.
  // CommonMark leaves it as one paragraph, so rebuild the site's markup:
  // <div class="admonition type"><p class="admonition-title">Title</p><p>text</p></div>
  function admonitions(root) {
    var doc = root.ownerDocument;
    root.querySelectorAll("p").forEach(function (p) {
      var first = p.firstChild;
      if (!first || first.nodeType !== 3) return;
      var match = first.nodeValue.match(/^!!!\s+([\w-]+)(?:[ \t]+"([^"]*)")?[ \t]*(?:\n|$)/);
      if (!match) return;

      var type = match[1].toLowerCase();
      var title = match[2] !== undefined ? match[2] : type.charAt(0).toUpperCase() + type.slice(1);

      var box = doc.createElement("div");
      box.className = "admonition " + type;
      if (title) {
        var heading = doc.createElement("p");
        heading.className = "admonition-title";
        heading.textContent = title;
        box.appendChild(heading);
      }

      first.nodeValue = first.nodeValue.slice(match[0].length);
      if (p.textContent.trim()) {
        var text = doc.createElement("p");
        while (p.firstChild) text.appendChild(p.firstChild);
        box.appendChild(text);
      }
      p.parentNode.replaceChild(box, p);
    });
  }

  // attr_list heading ids written as "## Heading {#id}".
  function headingIds(root) {
    root.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(function (heading) {
      var last = heading.lastChild;
      if (!last || last.nodeType !== 3) return;
      var match = last.nodeValue.match(/\s*\{:?\s*#([\w-]+)\s*\}\s*$/);
      if (!match) return;
      last.nodeValue = last.nodeValue.slice(0, match.index);
      heading.id = match[1];
    });
  }

  // Order matters: admonitions must be rebuilt before line breaks become <br>.
  var previewFixes = [admonitions, headingIds, lineBreaksToBr, wrapTables];

  // Decap re-renders the page body into the same container element, so undo the
  // classes and data attributes the enhancers put on it last time.
  function resetRoot(root) {
    (root.__tecAddedClasses || []).forEach(function (name) { root.classList.remove(name); });
    (root.__tecAddedAttributes || []).forEach(function (name) { root.removeAttribute(name); });
  }

  function rootState(root) {
    return {
      classes: Array.from(root.classList),
      attributes: Array.from(root.attributes).map(function (attr) { return attr.name; })
    };
  }

  function rememberAdditions(root, before) {
    root.__tecAddedClasses = Array.from(root.classList).filter(function (name) {
      return before.classes.indexOf(name) === -1;
    });
    root.__tecAddedAttributes = Array.from(root.attributes).map(function (attr) { return attr.name; })
      .filter(function (name) { return before.attributes.indexOf(name) === -1; });
  }

  // The page body is inside Decap's widget preview container, the article's last
  // child (after our optional title heading). Decap 3 puts the content directly in
  // that container; another variant renders <style> + <div>, with the div holding it.
  function bodyRoot(article) {
    var wrap = article && article.lastElementChild;
    if (!wrap || wrap.tagName === "H1") return null;
    var style = wrap.querySelector(":scope > style");
    return style && style.nextElementSibling ? style.nextElementSibling : wrap;
  }

  // Live address of the entry, e.g. "/brawling/"; the home page is "/".
  function pagePath(entry) {
    var slug = entry.get("slug");
    return !slug || slug === "index" ? "/" : "/" + slug + "/";
  }

  function hasHeading(body) {
    return /^#[ \t]/m.test(body) || /<h1[\s>]/i.test(body);
  }

  function registerTemplate() {
    var PagePreview = createClass({
      setArticle: function (el) {
        this.article = el;
      },

      applyFixes: function () {
        var root = bodyRoot(this.article);
        if (!root) return;

        // Only fresh content needs work: when the body text changes, Decap replaces
        // the container's children. Re-renders for other reasons keep them.
        if (root.firstChild && root.firstChild.__tecPreviewDone) return;

        resetRoot(root);
        var before = rootState(root);

        previewFixes.forEach(function (fix) {
          fix(root);
        });

        // Then the site's own page enhancers (docs/javascripts/tec-page-enhancers.js),
        // as on the live page. Page-type body classes are recomputed every time.
        if (window.TEC && typeof TEC.runPageEnhancers === "function") {
          var body = root.ownerDocument.body;
          body.className = "";
          TEC.runPageEnhancers(root, { path: pagePath(this.props.entry), body: body });
        }

        rememberAdditions(root, before);
        if (root.firstChild) root.firstChild.__tecPreviewDone = true;
      },

      componentDidMount: function () {
        this.applyFixes();
      },

      componentDidUpdate: function () {
        this.applyFixes();
      },

      render: function () {
        var data = this.props.entry.get("data");
        var title = data.get("title");
        var body = data.get("body") || "";

        // Like the site theme: show the title as the heading when the page has none.
        var heading = title && !hasHeading(body) ? h("h1", null, title) : null;

        // dir="ltr" is on the live <body>; many theme rules are scoped to [dir=ltr].
        return h("div", { className: "md-container", dir: "ltr" },
          h("main", { className: "md-main" },
            h("div", { className: "md-main__inner md-grid" },
              h("div", { className: "md-content" },
                h("article", { className: "md-content__inner md-typeset", ref: this.setArticle },
                  heading,
                  this.props.widgetFor("body"))))));
      }
    });

    CMS.registerPreviewTemplate("pages", PagePreview);
  }

  // Render the preview frame at desktop width and scale it down to fit the pane.
  function fitFrame(frame) {
    var pane = frame.parentElement;
    if (!pane) return;

    // Take the frame out of the layout flow. Otherwise its 1000px layout width
    // stretches Decap's split pane, which flips the scaling on and off every frame.
    pane.style.position = "relative";
    pane.style.overflow = "hidden";
    frame.style.position = "absolute";
    frame.style.top = "0";
    frame.style.left = "0";

    var width = pane.clientWidth;

    if (!width || width >= DESKTOP_WIDTH) {
      frame.style.width = "";
      frame.style.height = "";
      frame.style.transform = "";
      frame.style.transformOrigin = "";
      return;
    }

    var scale = width / DESKTOP_WIDTH;
    frame.style.width = DESKTOP_WIDTH + "px";
    frame.style.height = (pane.clientHeight / scale) + "px";
    frame.style.transform = "scale(" + scale + ")";
    frame.style.transformOrigin = "0 0";
  }

  var watchedFrame = null;
  var resizeObserver = typeof ResizeObserver === "function"
    ? new ResizeObserver(function () {
        if (watchedFrame) fitFrame(watchedFrame);
      })
    : null;

  function watchFrame() {
    var frame = document.getElementById("preview-pane");
    if (frame === watchedFrame) return;
    if (resizeObserver) resizeObserver.disconnect();
    watchedFrame = frame;
    if (!frame) return;
    if (resizeObserver && frame.parentElement) resizeObserver.observe(frame.parentElement);
    fitFrame(frame);
  }

  window.tecCmsPreview = {
    DESKTOP_WIDTH: DESKTOP_WIDTH,
    lineBreaksToBr: lineBreaksToBr,
    wrapTables: wrapTables,
    admonitions: admonitions,
    headingIds: headingIds,
    fitFrame: fitFrame
  };

  if (window.CMS && typeof window.createClass === "function" && typeof window.h === "function") {
    registerTemplate();
  }

  new MutationObserver(watchFrame).observe(document.documentElement, { childList: true, subtree: true });
  watchFrame();
})();
