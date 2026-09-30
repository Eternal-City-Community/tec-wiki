document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".tec-topnav")) return;
  var header = document.querySelector(".md-header");
  if (!header) return;

  var legacy = "https://eternal-city.wikidot.com";

  var nav = document.createElement("nav");
  nav.className = "tec-topnav";
  nav.setAttribute("aria-label", "TEC wiki shortcuts");
  nav.innerHTML = '<div class="tec-topnav__inner">' +

    '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Maps</button><div class="tec-topnav__menu">' +
      '<a href="' + legacy + '/maps">All Maps</a>' +
      '<a href="' + legacy + '/world-map">Unofficial World Map</a>' +
      '<a href="' + legacy + '/iridine-maps">City Of Iridine »</a>' +
      '<a href="' + legacy + '/steps-maps">The Steps »</a>' +
      '<a href="' + legacy + '/west-grasslands-maps">The West Grasslands and Woods »</a>' +
      '<a href="' + legacy + '/salinae-swamp-maps">The Salinae Swamp »</a>' +
      '<a href="' + legacy + '/eastern-grasslands-maps">Eastern Grasslands »</a>' +
      '<a href="' + legacy + '/rock-valley-maps">Rock Valley »</a>' +
      '<a href="' + legacy + '/franlius">Franlius</a>' +
      '<a href="' + legacy + '/monlon-maps">Monlon »</a>' +
      '<a href="' + legacy + '/seld">Seld</a>' +
      '<a href="' + legacy + '/cullaiden-island">Cullaiden Island »</a>' +
      '<a href="' + legacy + '/player-maps">Historic Player Maps »</a>' +
    '</div></div>' +

    '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Cities & Towns</button><div class="tec-topnav__menu">' +
      '<a href="' + legacy + '/iridine">City of Iridine</a>' +
      '<a href="' + legacy + '/monlon">City of Monlon</a>' +
      '<a href="' + legacy + '/kelestian-outpost">Kelestian Outpost</a>' +
      '<a href="' + legacy + '/franlius">Town of Franlius</a>' +
      '<a href="' + legacy + '/rock-valley">Town of Rock Valley</a>' +
      '<a href="' + legacy + '/vetallun">Town of Vetallun</a>' +
      '<a href="' + legacy + '/blackvine">Village of Blackvine</a>' +
      '<a href="' + legacy + '/seld">Village of Seld</a>' +
      '<a href="' + legacy + '/stromheim">Village of Stromheim</a>' +
    '</div></div>' +

    '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Tools</button><div class="tec-topnav__menu">' +
      '<a href="' + legacy + '/rank-bonus-calculator">Rank Bonus Calculator</a>' +
      '<a href="' + legacy + '/training-cost-calculator">Training Cost Calculator</a>' +
      '<a href="' + legacy + '/money-calculator">Money Calculator</a>' +
      '<a href="' + legacy + '/blocks-and-dodges">Blocks and Dodges</a>' +
      '<a href="' + legacy + '/fight-it-calculator">Fight It!™ Calculator</a>' +
    '</div></div>' +

    '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Wiki Team</button><div class="tec-topnav__menu">' +
      '<a href="' + legacy + '/system:join">Become a Wiki Editor</a>' +
      '<a href="#" data-tec-edit-current="true">Edit page</a>' +
      '<a href="' + legacy + '/nav:top">Edit this menu</a>' +
      '<a href="' + legacy + '/nav:side">Edit side menu</a>' +
      '<a href="' + legacy + '/troubleshooting">Troubleshooting</a>' +
      '<a href="' + legacy + '/system:recent-changes">Recent changes</a>' +
      '<a href="' + legacy + '/forum/c-0/wiki-editor-forum">Editor Forum</a>' +
      '<a href="' + legacy + '/admin:manage">Manage site</a>' +
      '<a href="' + legacy + '/system:list-all-files">Files</a>' +
    '</div></div>' +

    '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Help</button><div class="tec-topnav__menu">' +
      '<a href="' + legacy + '/faq">FAQ</a>' +
    '</div></div>' +

  '</div>';

  header.insertAdjacentElement("afterend", nav);

  document.addEventListener("click", function (event) {
    var editCurrent = event.target.closest("[data-tec-edit-current]");
    if (editCurrent) {
      event.preventDefault();
      var editButton = document.querySelector('a[title="Edit this page"], .md-content__button');
      if (editButton && editButton.href) {
        window.location.href = editButton.href;
      }
      return;
    }

    var button = event.target.closest(".tec-topnav__button");
    document.querySelectorAll(".tec-topnav__item.is-open").forEach(function (item) {
      if (!button || item !== button.parentElement) item.classList.remove("is-open");
    });
    if (button) button.parentElement.classList.toggle("is-open");
  });
});