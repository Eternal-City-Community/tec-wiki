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

Pages are written in Markdown. This section covers only what works differently on this wiki.

### Line breaks

A single line break in the text stays a line break on the page. Leave a blank line to start a new paragraph.

### Link targets on headings

Add `{#Name}` to the end of a heading to give it a link target:

~~~
### Monlon {#Monlon}
~~~

Link to it with `/reputation/#Monlon`, or `#Monlon` from the same page.

### Tables

Tables can merge cells, mark header cells and align single cells. Put the marker at the start of the cell:

| Cell | Effect |
| --- | --- |
| `>>` | Joins the cell to the one on its right. Two `>>` cells before **Armor** make one cell spanning three columns. |
| `^^` | Joins the cell to the one above it. |
| `~ Armor` | Makes a header cell. |
| `= 25` | Centers the cell. |
| `> 400d` | Aligns the cell to the right. |

- To align a whole column, use `:---:` (center) or `---:` (right) in the line under the first row.
- Header cells are always centered, unless they have their own `= ` or `> `.
- A `>>` or `^^` cell must contain nothing else.
- If a cell's text really starts with `~ `, `= ` or `> `, drop the space or reword it, for example `~5 GSP`.
- Cells are left-aligned unless marked.

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
