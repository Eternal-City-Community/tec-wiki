function initTecTopNav() {
  if (document.querySelector(".tec-topnav")) return;
  var header = document.querySelector(".md-header");
  if (!header) return;

  // The wiki title links to the homepage.
  var logo = header.querySelector(".md-logo");
  var title = header.querySelector(".md-header__topic:first-child .md-ellipsis");
  if (logo && title && !title.querySelector("a")) {
    var home = document.createElement("a");
    home.className = "tec-header-home";
    home.href = logo.href;
    home.textContent = title.textContent.trim();
    title.textContent = "";
    title.appendChild(home);
  }

  // Scrolled down, the header shows the page title instead of the wiki title.
  // A scroll icon before it keeps a way back to the homepage.
  var topic = header.querySelector('[data-md-component="header-topic"] .md-ellipsis');
  if (logo && topic && !topic.querySelector(".tec-header-home-icon")) {
    var icon = document.createElement("a");
    icon.className = "tec-header-home-icon";
    icon.href = logo.href;
    icon.title = "Home";
    icon.setAttribute("aria-label", "Home");
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.8 20c-.4 1.2-1.5 2-2.8 2H5c-1.7 0-3-1.3-3-3v-1h12.2c.4 1.2 1.5 2 2.8 2zM19 2H8C6.3 2 5 3.3 5 5v11h11v1c0 .6.4 1 1 1h1V5c0-.6.4-1 1-1s1 .4 1 1v1h2V5c0-1.7-1.3-3-3-3"/></svg>';
    topic.insertBefore(icon, topic.firstChild);
  }

  function p(slug) { return "/" + slug + "/"; }
  function link(label, slug) { return '<a href="' + p(slug) + '">' + label + '</a>'; }
  function fly(label, slug, children) {
    return '<div class="tec-topnav__fly">' +
      '<a class="tec-topnav__flylink" href="' + (slug ? p(slug) : '#') + '">' +
        label + '<span class="tec-topnav__arrow">»</span>' +
      '</a>' +
      '<div class="tec-topnav__submenu">' + children.join("") + '</div>' +
    '</div>';
  }

  var repo = "https://github.com/herdias/tec-wiki";

  var maps =
    link("All Maps", "maps") +
    link("Unofficial World Map", "unofficial-world-map") +
    fly("City Of Iridine", "iridine", [
      link("Bronze Lane","bronze-lane"),
      link("Campus Martius","campus-martius"),
      link("Colosseum","colosseum"),
      link("East Ravanite Tunnels","east-ravanite-tunnels"),
      link("Forum","forum"),
      link("Gardens and Hospice","gardens-and-hospice"),
      link("Harbor","harbor"),
      link("Old City and Moondeep","old-city-and-moondeep"),
      link("Quartz Heights","quartz-heights"),
      link("Rat Pits and Aralex Pits","rat-pits-and-aralex-pits"),
      link("Riverside","riverside"),
      link("Sandbar","sandbar"),
      link("Sewers and Sea Caves","sewers-and-sea-caves"),
      link("Shipwreck","shipwreck"),
      link("Signal Tower Island","signal-tower-island"),
      link("Storm Drain System","storm-drain-system"),
      link("Transinvexium","transinvexium"),
      link("Vetallun Road","vetallun-road")
    ]) +
    fly("The Steps", "the-steps", [
      link("The Steps Central","the-steps-central"),
      link("The Steps East","the-steps-east"),
      link("The Steps North","the-steps-north"),
      link("Ludus Quintus","steps-ludus-quintus"),
      link("The Steps Sewers","the-steps-sewers"),
      link("The Steps South","the-steps-south")
    ]) +
    fly("The West Grasslands and Woods", "the-west-grasslands", [
      link("Burnt Villa","burnt-villa"),
      link("Spider Caverns","spider-caverns"),
      link("Vetallun","vetallun")
    ]) +
    fly("The Salinae Swamp", "the-salinae-swamp", [
      link("Salt Flats","salt-flats"),
      link("Swamp Mansion","swamp-mansion"),
      link("Swamp Vale","swamp-vale"),
      link("Worm Temple","worm-temple")
    ]) +
    fly("Eastern Grasslands", "eastern-grasslands-and-woods", [
      link("Black Hand Caverns","black-hand-caverns"),
      link("Black Hand Mines","black-hand-mines"),
      link("Blackvine","blackvine"),
      link("Brigand Treehouse","brigand-treehouse"),
      link("Esecarnus Caves","esecarnus-caves"),
      link("Filinius Villa","hg-filinius-villa"),
      link("Fist Fort","fist-fort"),
      link("Grey Sands","grey-sands"),
      link("Pirate Ship","pirate-ship")
    ]) +
    fly("Rock Valley", "rock-valley", [
      link("Fenri'Gifr Ruins","fenri-gifr-ruins"),
      link("Rock Valley Dumps","rock-valley-dumps"),
      link("Rock Valley Mine","rock-valley-mine"),
      link("Stromheim","stromheim"),
      link("Town of Rock Valley","town-of-rock-valley-map"),
      link("Rock Valley Well","rock-valley-well"),
      link("Undertown","hg-undertown")
    ]) +
    link("Franlius","franlius") +
    fly("Monlon", "monlon-master", [
      link("City of Monlon","monlon"),
      link("Kelestian Outpost","monlon-kelestian-outpost"),
      link("Monlon Battlefield","monlon-battlefield"),
      link("Monlon Catacombs","monlon-catacombs"),
      link("Monlon Mines","monlon-mines"),
      link("Monlon Ravines","monlon-ravines"),
      link("Monlon Rockslide","monlon-rockslide")
    ]) +
    link("Seld","seld") +
    fly("Cullaiden Island", "cullaiden-island-map", [
      link("Cullaiden Island Temple","cullaiden-island-temple")
    ]) +
    fly("Historic Player Maps", "", [
      link("Marnevel's Maps","historic-map-marnevel"),
      link("PepaQuest Maps","historic-map-pepaquest")
    ]);

  var nav = document.createElement("nav");
  nav.className = "tec-topnav";
  nav.setAttribute("aria-label", "TEC wiki shortcuts");
  nav.innerHTML =
    '<div class="tec-topnav__inner">' +
      '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Maps</button><div class="tec-topnav__menu">' + maps + '</div></div>' +
      '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Cities & Towns</button><div class="tec-topnav__menu">' +
        link("City of Iridine","city-of-iridine") +
        link("City of Monlon","city-of-monlon") +
        link("Kelestian Outpost","kelestian-outpost") +
        link("Town of Franlius","town-of-franlius") +
        link("Town of Rock Valley","town-of-rock-valley") +
        link("Town of Vetallun","town-of-vetallun") +
        link("Village of Blackvine","village-of-blackvine") +
        link("Village of Seld","village-of-seld") +
        link("Village of Stromheim","village-of-stromheim") +
      '</div></div>' +
      '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Tools</button><div class="tec-topnav__menu">' +
        link("Rank Bonus Calculator","rank-bonus-calculator") +
        link("Training Cost Calculator","training-cost-calculator") +
        link("Money Calculator","money-calculator") +
        link("Blocks and Dodges","blocks-and-dodges") +
        link("Shops","shops") +
        link("Fight It!™ Calculator","fight-it-calculator") +
      '</div></div>' +
      '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Wiki Team</button><div class="tec-topnav__menu">' +
        '<a href="#" data-tec-edit-current="true">Edit this page</a>' +
        '<a href="#" data-tec-page-history="true">Page history</a>' +
        '<a href="#" data-tec-view-source="true">View source</a>' +
        '<a href="/admin/">Editor Dashboard</a>' +
        '<a href="/admin/#/workflow">Review Workflow</a>' +
        '<a href="/admin/#/media">Media Library</a>' +
        link("Editing Help","browser-editing") +
        '<a href="' + repo + '/commits/main">Recent changes</a>' +
        '<a href="' + repo + '/issues">Report a problem</a>' +
        fly("Maintainer Tools", "", [
          '<a href="' + repo + '/blob/main/docs/javascripts/tec-nav.js">Edit top menu</a>',
          '<a href="' + repo + '/blob/main/docs/javascripts/tec-sidebar.js">Edit side menu</a>',
          '<a href="' + repo + '/tree/main/docs">Repository files</a>',
          '<a href="' + repo + '/settings">Repository settings</a>'
        ]) +
      '</div></div>' +
      '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Help</button><div class="tec-topnav__menu">' +
        link("FAQ","faq") +
      '</div></div>' +
    '</div>';

  // Keep the TEC shortcut bar directly beneath Material's masthead row, but
  // before the expandable search UI so opening search cannot push the nav down.
  var headerInner = header.querySelector(".md-header__inner");
  if (headerInner) {
    headerInner.insertAdjacentElement("afterend", nav);
  } else {
    header.appendChild(nav);
  }

  function syncHeaderStackHeight() {
    var mastheadHeight = headerInner ? headerInner.offsetHeight : 0;
    var navHeight = nav.offsetHeight || 0;
    document.documentElement.style.setProperty(
      "--tec-header-stack-height",
      (mastheadHeight + navHeight + 10) + "px"
    );
  }

  // On narrow screens, shrink the wiki title until all of it fits between the
  // header buttons.
  var siteTitle = header.querySelector(".md-header__topic:first-child");
  var siteTitleText = siteTitle && siteTitle.querySelector(".md-ellipsis");
  function fitSiteTitle() {
    if (!siteTitleText) return;
    siteTitle.style.fontSize = "";
    var have = siteTitleText.clientWidth;
    var need = siteTitleText.scrollWidth;
    if (have > 0 && need > have) {
      var size = parseFloat(getComputedStyle(siteTitle).fontSize);
      siteTitle.style.fontSize = Math.floor(size * have / need * 10) / 10 + "px";
    }
  }

  // Likewise shrink the shortcut buttons so they stay on one row.
  var navInner = nav.querySelector(".tec-topnav__inner");
  function fitNavButtons() {
    nav.style.removeProperty("--tec-topnav-fit");
    var last = navInner.lastElementChild;
    if (!last) return;
    var left = navInner.getBoundingClientRect().left;
    var room = navInner.clientWidth - 4;
    function used() { return last.getBoundingClientRect().right - left; }
    var fit = 1;
    for (var i = 0; i < 4 && used() > room; i++) {
      fit *= room / used();
      nav.style.setProperty("--tec-topnav-fit", Math.floor(fit * 100) / 100);
    }
  }

  function syncHeader() {
    fitSiteTitle();
    fitNavButtons();
    syncHeaderStackHeight();
  }

  syncHeader();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncHeader);
  window.addEventListener("resize", syncHeader, { passive: true });
  if ("ResizeObserver" in window) {
    new ResizeObserver(syncHeaderStackHeight).observe(header);
  }

  function currentSourcePath() {
    var path = window.location.pathname.replace(/^\/+|\/+$/g, "");
    var slug = path || "index";
    return "docs/" + slug + ".md";
  }

  var historyLink = nav.querySelector("[data-tec-page-history]");
  if (historyLink) {
    var historySlug = window.location.pathname.replace(/^\/+|\/+$/g, "") || "index";
    historyLink.href = "/page-history/?page=" + encodeURIComponent(historySlug);
  }

  var sourceLink = nav.querySelector("[data-tec-view-source]");
  if (sourceLink) {
    sourceLink.href = repo + "/blob/main/" + currentSourcePath();
    sourceLink.target = "_blank";
    sourceLink.rel = "noopener";
  }

  document.addEventListener("click", function (event) {
    var editCurrent = event.target.closest("[data-tec-edit-current]");
    if (editCurrent) {
      event.preventDefault();
      var path = window.location.pathname.replace(/^\/+|\/+$/g, "");
      var slug = path || "index";
      window.location.href = "/admin/#/collections/pages/entries/" + encodeURIComponent(slug);
      return;
    }

    var button = event.target.closest(".tec-topnav__button");
    document.querySelectorAll(".tec-topnav__item.is-open").forEach(function (item) {
      if (!button || item !== button.parentElement) item.classList.remove("is-open");
    });
    if (button) button.parentElement.classList.toggle("is-open");
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTecTopNav, { once: true });
} else {
  initTecTopNav();
}
document.addEventListener("DOMContentSwitch", initTecTopNav);
