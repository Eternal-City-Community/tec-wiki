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
    const actions = document.createElement("div");
    actions.className = "tec-storybook__actions";
    top.append(counter, actions);
    const sheet = document.createElement("div");
    sheet.className = "tec-storybook__sheet";
    sheet.tabIndex = 0;
    sheet.setAttribute("aria-label", "Scrollable storybook page");
    // Migrated player stories often use a plain-text first line as the chapter
    // title. Promote it for presentation without editing the source Markdown.
    // Only do this for later chapters; the introductory page is a preface.
    pages.forEach((nodes, i) => {
      if (i === 0 || nodes.some(n => /^H[2-6]$/.test(n.tagName))) return;
      const first = nodes.find(n => n.nodeType === Node.ELEMENT_NODE);
      if (!first || first.tagName !== "P") return;
      const html = first.innerHTML.trim();
      const text = first.textContent.trim();
      const lines = html.split(/<br\\s*\\/?>/i);
      if (!text || text.length > 90 || first.querySelector("img, a, code") || lines.length > 2) return;
      const title = lines[0].replace(/<[^>]*>/g, "").trim();
      if (!title || title.length > 75) return;
      const heading = document.createElement("h2");
      heading.className = "tec-storybook__chapter-title";
      heading.textContent = title;
      if (lines.length > 1 && lines[1].trim()) {
        first.innerHTML = lines.slice(1).join("<br>");
        first.before(heading);
        nodes.splice(nodes.indexOf(first), 0, heading);
      } else {
        first.replaceWith(heading);
        nodes[nodes.indexOf(first)] = heading;
      }
    });
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
    prev.textContent = "‹";
    next.textContent = "›";
    prev.setAttribute("aria-label", "Previous page");
    next.setAttribute("aria-label", "Next page");
    prev.title = "Previous page";
    next.title = "Next page";
    const select = document.createElement("select");
    select.setAttribute("aria-label", "Jump to page");
    pages.forEach((nodes, i) => {
      const opt = document.createElement("option");
      const title = nodes.find(n => /^H[2-6]$/.test(n.tagName));
      opt.value = String(i);
      opt.textContent = (i + 1) + ". " + (title?.textContent?.replace(/¶/g, "").trim() || (i === 0 ? "Introduction" : "Page " + (i + 1)));
      select.append(opt);
    });
    const dots = document.createElement("div");
    dots.className = "tec-storybook__dots";
    const dotButtons = pages.map((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "tec-storybook__dot";
      dot.setAttribute("aria-label", "Go to page " + (i + 1));
      dot.title = select.options[i].textContent;
      dot.addEventListener("click", () => goTo(i));
      dots.append(dot);
      return dot;
    });
    select.setAttribute("aria-label", "Jump to chapter");
    actions.append(select, mode);
    nav.append(prev, dots, next);
    root.append(top, sheet, nav);
    heading.after(root);
    let index = 0, continuous = false;
    function render() {
      root.classList.toggle("tec-storybook--all", continuous);
      sections.forEach((el, i) => { el.hidden = !continuous && i !== index; });
      counter.textContent = continuous ? "All " + pages.length + " pages" : "Page " + (index + 1) + " of " + pages.length;
      mode.textContent = continuous ? "Paged view" : "All pages";
      prev.disabled = continuous || index === 0;
      next.disabled = continuous || index === pages.length - 1;
      select.disabled = continuous;
      dots.hidden = continuous;
      dotButtons.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
        if (i === index) dot.setAttribute("aria-current", "page");
        else dot.removeAttribute("aria-current");
      });
      select.value = String(index);

    }
    function goTo(target) {
      if (continuous || target < 0 || target >= pages.length) return;
      index = target;
      render();
      sheet.scrollTop = 0;
    }
    prev.addEventListener("click", () => goTo(index - 1));
    next.addEventListener("click", () => goTo(index + 1));
    select.addEventListener("change", () => goTo(Number(select.value)));
    mode.addEventListener("click", () => { continuous = !continuous; render(); sheet.scrollTop = 0; });
    root.addEventListener("keydown", e => {
      if (continuous || ["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
      if (e.key === "ArrowRight" && index < pages.length - 1) { e.preventDefault(); goTo(index + 1); }
      if (e.key === "ArrowLeft" && index > 0) { e.preventDefault(); goTo(index - 1); }
    });
    render();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
  document.addEventListener("DOMContentSwitch", init);
})();
