import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

// Runs the plugin on a hand-built remark tree, after "parsing" source so the
// plugin sees the same text Decap's parser would hand it.
function run(source, tree) {
  let plugin;
  const CMS = { registerRemarkPlugin: (p) => { plugin = p; } };
  const code = readFileSync(new URL("../docs/admin/tec-cms-site-markdown.js", import.meta.url), "utf8");
  vm.runInNewContext(code, { window: { CMS }, CMS });
  function Parser() {}
  Parser.prototype.parse = () => tree;
  const processor = { Parser };
  const transform = plugin.call(processor);
  new processor.Parser(source, {});
  transform(tree);
  // Arrays made inside the vm context are a different Array; copy them out.
  return JSON.parse(JSON.stringify(tree));
}

const at = (line) => ({ start: { line }, end: { line } });
const text = (value) => ({ type: "text", value });
const para = (line, ...children) => ({ type: "paragraph", position: at(line), children });
const row = (...cells) => ({ type: "tableRow", children: cells.map((c) => ({ type: "tableCell", children: [text(c)] })) });
const item = (line, ...children) => ({ type: "listItem", position: at(line), children });
const list = (line, ...items) => ({ type: "list", position: at(line), children: items });

function lines(paragraph) {
  const out = [""];
  for (const node of paragraph.children) {
    if (node.type === "break") out.push("");
    else out[out.length - 1] += node.value;
  }
  return out;
}

test("table whose alignment row is short becomes a paragraph", () => {
  const tree = run("", { type: "root", children: [{ type: "table", align: [null, "center"], children: [row("a", "b", "c"), row("1", "2", "3")] }] });
  assert.equal(tree.children[0].type, "paragraph");
  assert.deepEqual(lines(tree.children[0]), ["| a | b | c |", "| --- | :---: |", "| 1 | 2 | 3 |"]);
});

test("table with matching columns is left alone", () => {
  const table = { type: "table", align: [null, "left"], children: [row("a", "b"), row("1", "2")] };
  const before = JSON.parse(JSON.stringify(table));
  assert.deepEqual(run("", { type: "root", children: [table] }).children[0], before);
});

test("list indented less than 4 spaces joins the parent list", () => {
  const tree = run("* a\n  * b\n* c\n    * d", {
    type: "root",
    children: [list(1,
      item(1, para(1, text("a")), list(2, item(2, para(2, text("b"))))),
      item(3, para(3, text("c")), list(4, item(4, para(4, text("d"))))))],
  });
  const items = tree.children[0].children;
  assert.deepEqual(items.map((i) => i.children[0].children[0].value), ["a", "b", "c"]);
  assert.equal(items[2].children[1].type, "list");
});

test("list on the item's own line stays nested", () => {
  const tree = run("* * a", { type: "root", children: [list(1, item(1, list(1, item(1, para(1, text("a"))))))] });
  assert.equal(tree.children[0].children[0].children[0].type, "list");
});

test("#Heading without a space becomes a heading, even mid-paragraph", () => {
  const tree = run("x\n#Head ##\ny", { type: "root", children: [para(1, text("x\n#Head ##\ny"))] });
  assert.deepEqual(tree.children.map((n) => n.type), ["paragraph", "heading", "paragraph"]);
  assert.equal(tree.children[1].depth, 1);
  assert.equal(tree.children[1].children[0].value, "Head");
});

test("escaped \\# stays text", () => {
  const tree = run("\\#tag", { type: "root", children: [para(1, text("#tag"))] });
  assert.equal(tree.children[0].type, "paragraph");
});

test("strikethrough stays as typed", () => {
  const tree = run("~~old~~", { type: "root", children: [para(1, { type: "delete", children: [text("old")] })] });
  assert.deepEqual(tree.children[0].children.map((n) => n.value), ["~~", "old", "~~"]);
});

test("numbered lines straight after text stay in the paragraph", () => {
  const ol = (line, ...items) => ({ ...list(line, ...items), ordered: true, start: 24 });
  const tree = run("Legend:\n24. Trainer\n25. Shop\n\n26. Inn", {
    type: "root",
    children: [
      para(1, text("Legend:")),
      ol(2, item(2, para(2, text("Trainer"))), item(3, para(3, text("Shop"))), item(5, para(5, text("Inn")))),
    ],
  });
  assert.deepEqual(tree.children[0].children.map((n) => n.value).join(""), "Legend:\n24. Trainer\n25. Shop");
  assert.equal(tree.children[1].children.length, 1);
  assert.equal(tree.children[1].start, null);
});
