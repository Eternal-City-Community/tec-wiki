document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".tec-topnav")) return;
  var header = document.querySelector(".md-header");
  if (!header) return;

  var nav = document.createElement("nav");
  nav.className = "tec-topnav";
  nav.setAttribute("aria-label", "TEC wiki shortcuts");
  nav.innerHTML = '<div class="tec-topnav__inner">' +
    '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Maps</button><div class="tec-topnav__menu">' +
    '<a href="#">All Maps</a><a href="#">Unofficial World Map</a><a href="#">City Of Iridine »</a><a href="#">The Stepps »</a><a href="#">The West Grasslands and Woods »</a><a href="#">The Salinae Swamp »</a><a href="#">Eastern Grasslands »</a><a href="#">Rock Valley »</a><a href="#">Franlius</a><a href="#">Monlon »</a><a href="#">Seld</a><a href="#">Cullaiden Island »</a><a href="#">Historic Player Maps »</a></div></div>' +
    '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Cities & Towns</button><div class="tec-topnav__menu"><a href="#">Iridine</a><a href="#">Vetallun</a><a href="#">Sostaeran</a></div></div>' +
    '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Tools</button><div class="tec-topnav__menu"><a href="/armor/">Armor Reference</a><a href="/crafting/jewelry/">Jewelry Crafting</a><a href="/crafting/leatherworking/">Leatherworking</a><a href="/mechanics/combat/">Combat Reference</a></div></div>' +
    '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Wiki Team</button><div class="tec-topnav__menu"><a href="/about/">About the Wiki</a><a href="#">Submit feedback or edits</a></div></div>' +
    '<div class="tec-topnav__item"><button class="tec-topnav__button" type="button">Help</button><div class="tec-topnav__menu"><a href="/">Wiki Home</a><a href="#">Search the Site</a></div></div>' +
    '</div>';

  header.insertAdjacentElement("afterend", nav);

  document.addEventListener("click", function (event) {
    var button = event.target.closest(".tec-topnav__button");
    document.querySelectorAll(".tec-topnav__item.is-open").forEach(function (item) {
      if (!button || item !== button.parentElement) item.classList.remove("is-open");
    });
    if (button) button.parentElement.classList.toggle("is-open");
  });
});