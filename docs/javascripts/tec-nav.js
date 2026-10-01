document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".tec-topnav")) return;
  var header = document.querySelector(".md-header");
  if (!header) return;

  function p(slug) { return "/" + slug + "/"; }
  var repo = "https://github.com/herdias/tec-wiki";

  var nav = document.createElement("nav");
  nav.className = "tec-topnav";
  nav.setAttribute("aria-label", "TEC wiki shortcuts");
  nav.innerHTML = '<div class="tec-topnav__inner">' +

    '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Maps</button><div class="tec-topnav__menu">' +
      '<a href="' + p("maps") + '">All Maps</a>' +
      '<a href="' + p("unofficial-world-map") + '">Unofficial World Map</a>' +
      '<a href="' + p("iridine") + '">City Of Iridine »</a>' +
      '<a href="' + p("the-steps") + '">The Steps »</a>' +
      '<a href="' + p("the-west-grasslands") + '">The West Grasslands and Woods »</a>' +
      '<a href="' + p("the-salinae-swamp") + '">The Salinae Swamp »</a>' +
      '<a href="' + p("eastern-grasslands-and-woods") + '">Eastern Grasslands »</a>' +
      '<a href="' + p("rock-valley") + '">Rock Valley »</a>' +
      '<a href="' + p("franlius") + '">Franlius</a>' +
      '<a href="' + p("monlon-master") + '">Monlon »</a>' +
      '<a href="' + p("seld") + '">Seld</a>' +
      '<a href="' + p("cullaiden-island-map") + '">Cullaiden Island »</a>' +
      '<a href="' + p("historic-map-marnevel") + '">Historic Player Maps »</a>' +
    '</div></div>' +

    '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Cities & Towns</button><div class="tec-topnav__menu">' +
      '<a href="' + p("city-of-iridine") + '">City of Iridine</a>' +
      '<a href="' + p("city-of-monlon") + '">City of Monlon</a>' +
      '<a href="' + p("kelestian-outpost") + '">Kelestian Outpost</a>' +
      '<a href="' + p("town-of-franlius") + '">Town of Franlius</a>' +
      '<a href="' + p("town-of-rock-valley") + '">Town of Rock Valley</a>' +
      '<a href="' + p("town-of-vetallun") + '">Town of Vetallun</a>' +
      '<a href="' + p("village-of-blackvine") + '">Village of Blackvine</a>' +
      '<a href="' + p("village-of-seld") + '">Village of Seld</a>' +
      '<a href="' + p("village-of-stromheim") + '">Village of Stromheim</a>' +
    '</div></div>' +

    '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Tools</button><div class="tec-topnav__menu">' +
      '<a href="' + p("rank-bonus-calculator") + '">Rank Bonus Calculator</a>' +
      '<a href="' + p("training-cost-calculator") + '">Training Cost Calculator</a>' +
      '<a href="' + p("money-calculator") + '">Money Calculator</a>' +
      '<a href="' + p("blocks-and-dodges") + '">Blocks and Dodges</a>' +
      '<a href="' + p("fight-it-calculator") + '">Fight It!™ Calculator</a>' +
    '</div></div>' +

    '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Wiki Team</button><div class="tec-topnav__menu">' +
      '<a href="' + repo + '">Become a Wiki Editor</a>' +
      '<a href="#" data-tec-edit-current="true">Edit page</a>' +
      '<a href="' + repo + '/blob/main/docs/javascripts/tec-nav.js">Edit this menu</a>' +
      '<a href="' + repo + '/blob/main/docs/javascripts/tec-sidebar.js">Edit side menu</a>' +
      '<a href="' + repo + '/issues">Troubleshooting</a>' +
      '<a href="' + repo + '/commits/main">Recent changes</a>' +
      '<a href="' + repo + '/discussions">Editor Forum</a>' +
      '<a href="' + repo + '/settings">Manage site</a>' +
      '<a href="' + repo + '/tree/main/docs">Files</a>' +
    '</div></div>' +

    '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Help</button><div class="tec-topnav__menu">' +
      '<a href="' + p("faq") + '">FAQ</a>' +
    '</div></div>' +

  '</div>';

  header.insertAdjacentElement("afterend", nav);

  document.addEventListener("click", function (event) {
    var editCurrent = event.target.closest("[data-tec-edit-current]");
    if (editCurrent) {
      event.preventDefault();
      var path = window.location.pathname.replace(/^\/+|\/+$/g, "");
      var file = path ? "docs/" + path + ".md" : "docs/index.md";
      window.location.href = repo + "/edit/main/" + file;
      return;
    }

    var button = event.target.closest(".tec-topnav__button");
    document.querySelectorAll(".tec-topnav__item.is-open").forEach(function (item) {
      if (!button || item !== button.parentElement) item.classList.remove("is-open");
    });
    if (button) button.parentElement.classList.toggle("is-open");
  });
});