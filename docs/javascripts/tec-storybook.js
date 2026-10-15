(() => {
  "use strict";
  function init() {
    const article = document.querySelector(".md-content .md-typeset");
    if (!article || !document.querySelector('meta[name="storybook"]') && !location.pathname.includes("/journey-rock-valley-storybook/")) return;
    if (article.querySelector(".tec-storybook")) return;
    const heading = article.querySelector("h1");
    if (!heading) return;
    const all = [...article.children];
    const start = all.indexOf(heading);
    const body = all.slice(start + 1).filter(el => !el.classList.contains("headerlink"));
    const chapters = [[]];
    for (const node of body) {
      if (node.tagName === "HR") { if (chapters.at(-1).length) chapters.push([]); node.remove(); }
      else chapters.at(-1).push(node);
    }
    const pages = chapters.filter(nodes => nodes.length);
    if (pages.length < 2) return;
    const root = document.createElement("section");
    root.className = "tec-storybook";
    root.setAttribute("aria-label", "Storybook reader");
    const top = document.createElement("div");
    top.className = "tec-storybook__top";
    const counter = document.createElement("span");
    counter.className = "tec-storybook__counter";
    const mode = document.createElement("button");
    mode.type = "button";
    mode.className = "tec-storybook__mode";
    mode.textContent = "All pages";
    top.append(counter, mode);
    const sheet = document.createElement("div");
    sheet.className = "tec-storybook__sheet";
    const sections = pages.map((nodes, i) => {
      const page = document.createElement("section");
      page.className = "tec-storybook__page";
      page.setAttribute("aria-label", "Page " + (i + 1));
      for (const node of nodes) page.append(node);
      sheet.append(page);
      return page;
    });
    const nav = document.createElement("nav");
    nav.className = "tec-storybook__nav";
    nav.setAttribute("aria-label", "Book pages");
    const prev = document.createElement("button"), next = document.createElement("button");
    prev.type = next.type = "button";
    prev.textContent = "‹ Previous";
    next.textContent = "Next ›";
    const select = document.createElement("select");
    select.setAttribute("aria-label", "Jump to page");
    pages.forEach((nodes, i) => {
      const opt = document.createElement("option");
      const title = nodes.find(n => /^H[2-6]$/.test(n.tagName));
      opt.value = String(i);
      opt.textContent = (i + 1) + ". " + (title?.textContent?.replace(/¶/g, "").trim() || (i === 0 ? "Introduction" : "Page " + (i + 1)));
      select.append(opt);
    });
    nav.append(prev, select, next);
    root.append(top, sheet, nav);
    heading.after(root);
    let index = 0, continuous = false;
    function render(scroll = false) {
      root.classList.toggle("tec-storybook--all", continuous);
      sections.forEach((el, i) => { el.hidden = !continuous && i !== index; });
      counter.textContent = continuous ? "All " + pages.length + " pages" : "Page " + (index + 1) + " of " + pages.length;
      mode.textContent = continuous ? "Paged view" : "All pages";
      prev.disabled = continuous || index === 0;
      next.disabled = continuous || index === pages.length - 1;
      select.disabled = continuous;
      select.value = String(index);
      if (scroll) root.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    prev.addEventListener("click", () => { if (index > 0) { index--; render(true); } });
    next.addEventListener("click", () => { if (index < pages.length - 1) { index++; render(true); } });
    select.addEventListener("change", () => { index = Number(select.value); render(true); });
    mode.addEventListener("click", () => { continuous = !continuous; render(); });
    root.addEventListener("keydown", e => {
      if (continuous || ["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
      if (e.key === "ArrowRight" && index < pages.length - 1) { e.preventDefault(); index++; render(); }
      if (e.key === "ArrowLeft" && index > 0) { e.preventDefault(); index--; render(); }
    });
    render();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
  document.addEventListener("DOMContentSwitch", init);
})();
