// Makes the editor preview follow the site's Markdown rules where the editor's
// parser (remark, CommonMark-style) and the site's (Python-Markdown) disagree.
// Each fix below undoes one thing remark builds that the site does not.
(function () {
  var DELIMITERS = { left: ":---", center: ":---:", right: "---:" };

  // --- Tables -----------------------------------------------------------------
  // Python-Markdown only builds a table when the alignment row (| --- | :---: |)
  // has as many columns as the header row; otherwise the lines stay one
  // paragraph, with nl2br turning each line break into <br>.

  function rowNodes(cells) {
    var nodes = [{ type: "text", value: "| " }];
    cells.forEach(function (cell, i) {
      if (i > 0) nodes.push({ type: "text", value: " | " });
      nodes = nodes.concat(cell);
    });
    nodes.push({ type: "text", value: " |" });
    return nodes;
  }

  // The alignment row is not kept as a row; its column count is align.length.
  function tableAsParagraph(table) {
    var rows = table.children.map(function (row) {
      return rowNodes(row.children.map(function (cell) { return cell.children; }));
    });
    var delimiter = table.align.map(function (align) {
      return [{ type: "text", value: DELIMITERS[align] || "---" }];
    });
    rows.splice(1, 0, rowNodes(delimiter));

    var children = [];
    rows.forEach(function (row, i) {
      if (i > 0) children.push({ type: "break" });
      children = children.concat(row);
    });
    return { type: "paragraph", children: children };
  }

  function isBrokenTable(node) {
    var header = node.type === "table" && node.children[0];
    return Boolean(header) && node.align.length !== header.children.length;
  }

  // --- Nested lists -----------------------------------------------------------
  // Python-Markdown nests a list only when it is indented 4 or more spaces past
  // its parent item; less than that and its items join the parent list.
  // A list on the item's own line ("* * text") is nested on both.
  // remark's columns inside lists are unreliable, so indents come from the source.

  function indentOf(line) {
    var text = (line || "").replace(/^(\s*>)+/, "").replace(/\t/g, "    ");
    return /^ */.exec(text)[0].length;
  }

  function flattenShallowLists(list, lines) {
    for (var i = 0; i < list.children.length; i++) {
      var item = list.children[i];
      var itemIndent = indentOf(lines[item.position.start.line - 1]);
      var lifted = [];
      item.children = item.children.filter(function (child) {
        var shallow = child.type === "list" &&
          child.position.start.line > item.position.start.line &&
          indentOf(lines[child.position.start.line - 1]) - itemIndent < 4;
        if (shallow) lifted = lifted.concat(child.children);
        return !shallow;
      });
      list.children.splice.apply(list.children, [i + 1, 0].concat(lifted));
    }
  }

  // --- Headings without a space -------------------------------------------------
  // Python-Markdown makes "#Heading" a heading, even in the middle of a
  // paragraph; remark keeps it as text.

  // Splits a paragraph's inline nodes into lines at the "\n"s in its text.
  function splitLines(children) {
    var lines = [[]];
    children.forEach(function (node) {
      if (node.type !== "text") {
        lines[lines.length - 1].push(node);
        return;
      }
      node.value.split("\n").forEach(function (part, i) {
        if (i > 0) lines.push([]);
        if (part) lines[lines.length - 1].push({ type: "text", value: part });
      });
    });
    return lines;
  }

  function headingLevel(line, sourceLine) {
    var first = line[0];
    if (!first || first.type !== "text" || !/^#/.test(first.value)) return 0;
    // An escaped "\#" reaches remark's tree as a plain "#".
    if (!/^#/.test((sourceLine || "").replace(/^(\s*>)*\s*/, ""))) return 0;
    return Math.min(/^#+/.exec(first.value)[0].length, 6);
  }

  function toHeading(line, depth) {
    var children = line.slice();
    var first = children[0];
    children[0] = { type: "text", value: first.value.slice(depth).replace(/^\s+/, "") };
    var last = children[children.length - 1];
    if (last.type === "text") {
      children[children.length - 1] = { type: "text", value: last.value.replace(/#*$/, "").replace(/\s+$/, "") };
    }
    return { type: "heading", depth: depth, children: children };
  }

  function joinLines(lines) {
    var children = [];
    lines.forEach(function (line, i) {
      if (i > 0) children.push({ type: "text", value: "\n" });
      children = children.concat(line);
    });
    return { type: "paragraph", children: children };
  }

  // Returns the nodes that replace the paragraph, or null to keep it.
  function splitHeadings(paragraph, lines) {
    var parts = splitLines(paragraph.children);
    var start = paragraph.position ? paragraph.position.start.line : 0;
    var found = false;
    var out = [];
    var pending = [];
    parts.forEach(function (line, i) {
      var depth = start ? headingLevel(line, lines[start - 1 + i]) : 0;
      if (!depth) {
        pending.push(line);
        return;
      }
      found = true;
      if (pending.length) out.push(joinLines(pending));
      pending = [];
      out.push(toHeading(line, depth));
    });
    if (!found) return null;
    if (pending.length) out.push(joinLines(pending));
    return out;
  }

  // --- Numbered lines after text -----------------------------------------------
  // Python-Markdown starts a numbered list only after a blank line, so numbered
  // lines straight after text stay part of that paragraph. (The site's list
  // hook adds that blank line for bullets only; map legends rely on this.)
  // remark starts a list there, so put those lines back into the paragraph.

  var MARKER = /^(?:\s*>)*\s*(\d+[.)]|[*+-])/;

  // The item's lines as they read in the source, or null if it holds more
  // than paragraphs and lists.
  function itemLines(item, lines) {
    var marker = MARKER.exec(lines[item.position.start.line - 1] || "");
    var out = [];
    var ok = item.children.every(function (child, i) {
      if (child.type === "paragraph") {
        var line = i === 0 && marker ? [{ type: "text", value: marker[1] + " " }] : [];
        out.push(line.concat(child.children));
        return true;
      }
      if (child.type !== "list") return false;
      var nested = listLines(child.children, lines);
      if (nested) out = out.concat(nested);
      return Boolean(nested);
    });
    return ok ? out : null;
  }

  function listLines(items, lines) {
    var out = [];
    for (var i = 0; i < items.length; i++) {
      var more = itemLines(items[i], lines);
      if (!more) return null;
      out = out.concat(more);
    }
    return out;
  }

  // Moves the list's leading items that have no blank line before them into
  // the paragraph. Returns false if nothing moved.
  function mergeIntoParagraph(paragraph, list, lines) {
    var end = paragraph.position.end.line;
    var taken = 0;
    // An item's end line can include a trailing blank line, so check the source.
    while (taken < list.children.length) {
      var item = list.children[taken];
      var start = item.position.start.line;
      if (!(lines[start - 2] || "").replace(/^(\s*>)*/, "").trim()) break;
      end = item.position.end.line;
      taken++;
    }
    var moved = taken && listLines(list.children.slice(0, taken), lines);
    if (!moved) return false;
    moved.forEach(function (line) {
      paragraph.children = paragraph.children.concat([{ type: "text", value: "\n" }], line);
    });
    paragraph.position = { start: paragraph.position.start, end: { line: end } };
    list.children = list.children.slice(taken);
    return true;
  }

  // --- Strikethrough ------------------------------------------------------------
  // The site has no strikethrough, so ~~text~~ stays as typed.

  function deleteAsText(node) {
    return [{ type: "text", value: "~~" }].concat(node.children, [{ type: "text", value: "~~" }]);
  }

  function visit(node, lines) {
    if (node.type === "list") flattenShallowLists(node, lines);
    // The site numbers every list from 1, whatever number it starts with.
    if (node.type === "list" && node.ordered) node.start = null;
    if (!node.children) return;
    var children = [];
    node.children.forEach(function (child) {
      var previous = children[children.length - 1];
      // Inside a list item, a list on the next line is a nested list instead.
      if (child.type === "list" && child.ordered && node.type !== "listItem" &&
          previous && previous.type === "paragraph" && previous.position &&
          mergeIntoParagraph(previous, child, lines) && !child.children.length) {
        return;
      }
      if (isBrokenTable(child)) {
        children.push(tableAsParagraph(child));
        return;
      }
      if (child.type === "delete") {
        deleteAsText(child).forEach(function (part) { visit(part, lines); children.push(part); });
        return;
      }
      var split = child.type === "paragraph" && splitHeadings(child, lines);
      if (split) {
        split.forEach(function (part) { visit(part, lines); children.push(part); });
        return;
      }
      visit(child, lines);
      children.push(child);
    });
    node.children = children;
  }

  // remark's tree does not keep the source text, so remember it while parsing.
  function siteMarkdown() {
    var Parser = this.Parser;
    var lines = [];
    function SourceParser(doc, file) {
      lines = String(doc).split("\n");
      Parser.call(this, doc, file);
    }
    SourceParser.prototype = Parser.prototype;
    this.Parser = SourceParser;

    return function (tree) {
      visit(tree, lines);
    };
  }

  if (window.CMS && typeof window.CMS.registerRemarkPlugin === "function") {
    CMS.registerRemarkPlugin(siteMarkdown);
  }
})();
