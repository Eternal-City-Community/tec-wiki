---
title: "Browser Editing"
category: "Wiki & Help"
---

# Browser Editing

The replacement TEC wiki includes a browser-based editor at **/admin/**.

The editor is powered by Decap CMS and uses the GitHub repository as the source of truth. Changes submitted by community contributors can use an editorial workflow rather than publishing directly.

## Contributor workflow

1. Open **/admin/**.
2. Sign in with GitHub.
3. Select a wiki page or create a new page.
4. Make the change in the browser editor.
5. Submit it for review.
6. A maintainer reviews and merges the resulting change before it appears on the public wiki.

## Authentication status

The editor files are installed, but GitHub authentication still requires the site's OAuth/authentication service to be connected. Until that is configured, maintainers can continue editing through GitHub.

Open Authoring is enabled so contributors do not need direct write access to the main repository.

## Formatting rules {#formatting-rules}

Pages are written in Markdown. This section covers a few useful Markdown reminders, along with features that get special handling on this wiki.

### Line breaks

A single line break in the text stays a line break on the page. Leave a blank line to start a new paragraph.

### Link targets on headings

Add `{#Name}` to the end of a heading to give it a link target:

~~~
### Monlon {#Monlon}
~~~

Link to it with `/reputation/#Monlon`, or `#Monlon` from the same page.

### Tables

#### Aligning columns

The line under a table's first row sets how each column is aligned. It has one entry per column:

| Entry | Column |
| --- | --- |
| `---` | Left (the default) |
| `:---:` | Centered |
| `---:` | Right |

~~~
| Skills/Actions | Difficulty | Wound |
| --- | :---: | :---: |
| Falcata Slash | Easy | Cut |
~~~

Here the first column is left-aligned and the other two are centered. To change a column, change its entry in that line rather than marking cells one by one. Skill tables put `---` under the first column and `:---:` under every other column.

#### Cell markers

Tables can also merge cells, mark header cells and align a single cell. Put the marker at the start of the cell:

| Cell | Effect |
| --- | --- |
| `>>` | Joins the cell to the one on its right. Two `>>` cells before **Armor** make one cell spanning three columns. |
| `^^` | Joins the cell to the one above it. |
| `~ Armor` | Makes a header cell. |
| `= 25` | Centers this one cell. Only for a cell that should differ from its column. |
| `> 400d` | Aligns this one cell to the right. Only for a cell that should differ from its column. |

- Header cells are always centered, unless they have their own `= ` or `> `.
- A `>>` or `^^` cell must contain nothing else.
- If a cell's text really starts with `~ `, `= ` or `> `, drop the space or reword it, for example `~5 GSP`.

This table:

~~~
| Item | Warrior | Ravager |
| --- | :---: | :---: |
| >> | >> | ~ Armor |
| Stone Katitra | 2 | 8 |
| Bronze Katitra | 4 | ^^ |
| >> | >> | ~ Weapons |
| Iron Falcata | 2 | > - |
~~~

shows as:

| Item | Warrior | Ravager |
| --- | :---: | :---: |
| >> | >> | ~ Armor |
| Stone Katitra | 2 | 8 |
| Bronze Katitra | 4 | ^^ |
| >> | >> | ~ Weapons |
| Iron Falcata | 2 | > - |

### Note boxes

Start a line with `!!!` and a type (`note`, `tip` or `warning`), then indent the box's text by four spaces:

~~~
!!! warning
    A failed unjamming attempt can break your pick.
~~~
