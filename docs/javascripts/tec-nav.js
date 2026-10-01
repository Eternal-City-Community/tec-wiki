function initTecTopNav() {
  if (document.querySelector(".tec-topnav")) return;
  var header = document.querySelector(".md-header");
  if (!header) return;

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
        link("Fight It!™ Calculator","fight-it-calculator") +
      '</div></div>' +
      '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Wiki Team</button><div class="tec-topnav__menu">' +
        '<a href="#" data-tec-edit-current="true">Edit this page</a>' +
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

  header.insertAdjacentElement("afterend", nav);

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
