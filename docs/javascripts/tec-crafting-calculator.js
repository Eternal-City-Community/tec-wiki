function initTecCraftingCalculator() {
  var root = document.getElementById("tec-crafting-calculator");
  if (!root || root.dataset.ready === "true") return;
  root.dataset.ready = "true";

  var currency = [
    ["t", 18750],
    ["c", 300],
    ["d", 12],
    ["st", 3],
    ["s", 1]
  ];

  function formatMoney(totalSens) {
    var remaining = Math.round(totalSens);
    var parts = [];
    currency.forEach(function (entry) {
      var label = entry[0];
      var value = entry[1];
      var amount = Math.floor(remaining / value);
      if (amount) {
        parts.push(amount + label);
        remaining -= amount * value;
      }
    });
    return parts.length ? parts.join(" ") : "0s";
  }

  function gcd(a, b) {
    while (b) {
      var tmp = a % b;
      a = b;
      b = tmp;
    }
    return a;
  }

  function fractionLabel(numerator, denominator) {
    if (!numerator) return "0";
    var whole = Math.floor(numerator / denominator);
    var remainder = numerator % denominator;
    if (!remainder) return String(whole);
    var divisor = gcd(remainder, denominator);
    remainder /= divisor;
    denominator /= divisor;
    return (whole ? whole + " " : "") + remainder + "/" + denominator;
  }

  var metals = [
    { name: "Tin", sens: 349 },
    { name: "Copper", sens: 698 },
    { name: "Brass", sens: 1047 },
    { name: "Bronze", sens: 1396 },
    { name: "Iron", sens: 2095 },
    { name: "Silver", sens: 2793 },
    { name: "Gold", sens: 5820 },
    { name: "Alanti", sens: 181875 },
    { name: "Seelan", sens: 272812 },
    { name: "Caon", sens: 363750 },
    { name: "Boison", sens: 454687 }
  ];

  // Requirements are stored as sixths of a slag so the known 1/3 and 1/6
  // jewelry recipes stay exact instead of relying on floating-point decimals.
  var recipes = [
    { name: "Broad Cast Bracelet", sixths: 6 },
    { name: "Broad Cast Ring", sixths: 6 },
    { name: "Cast Bangle", sixths: 6 },
    { name: "Cast Charm", sixths: 6 },
    { name: "Cast Pendant", sixths: 6 },
    { name: "Cast Simple Band", sixths: 6 },
    { name: "Cast Stud Earrings", sixths: 6 },
    { name: "Drop Earrings", sixths: 6 },
    { name: "Eyebrow Ring", sixths: 6 },
    { name: "Forged Anklet", sixths: 6 },
    { name: "Forged Bangle", sixths: 6 },
    { name: "Forged Tiara", sixths: 6 },
    { name: "Lip Ring", sixths: 6 },
    { name: "Lip Stud", sixths: 6 },
    { name: "Nose Ring", sixths: 6 },
    { name: "Nose Stud", sixths: 6 },
    { name: "Ornate Forged Ring", sixths: 6 },
    { name: "Septum Ring", sixths: 6 },
    { name: "Simple Band Ring", sixths: 6 },
    { name: "Wire Ring", sixths: 6 },
    { name: "Charm Bracelet (10 tiny links)", sixths: 10 },
    { name: "Hoop Earrings", sixths: 12 },
    { name: "Wire Anklet", sixths: 12 },
    { name: "Wire Bracelet", sixths: 12 },
    { name: "Wire Earrings", sixths: 12 },
    { name: "Wire Necklace", sixths: 18 },
    { name: "Fine Chain Necklace (20 tiny links)", sixths: 20 },
    { name: "Pendant Necklace (20 tiny links + 1 casting)", sixths: 26 },
    { name: "Waist Chain (31 tiny links)", sixths: 31 },
    { name: "Locket (20 tiny links + body + lid + hinge pin)", sixths: 38 },
    { name: "Heavy Chain Necklace (10 thick links)", sixths: 60 }
  ];

  root.innerHTML =
    '<div class="tec-craft-card">' +
      '<div class="tec-craft-grid">' +
        '<label><span>Crafting skill</span><select data-craft>' +
          '<option value="jewelry">Jewelry Crafting</option>' +
          '<option disabled>Leatherworking — coming later</option>' +
          '<option disabled>Woodworking — coming later</option>' +
        '</select></label>' +
        '<label><span>Recipe</span><select data-recipe></select></label>' +
        '<label><span>Material</span><select data-metal></select></label>' +
      '</div>' +
      '<div class="tec-craft-result" aria-live="polite">' +
        '<div><span>Recipe consumes</span><strong data-used></strong></div>' +
        '<div><span>Slags to purchase</span><strong data-buy></strong></div>' +
        '<div><span>Purchase cost</span><strong data-cost></strong></div>' +
        '<div><span>Expected leftover</span><strong data-leftover></strong></div>' +
      '</div>' +
      '<p class="tec-craft-note">Jewelry calculations assume metal is purchased as whole slags. Fractional recipe requirements leave the remaining metal available for later crafting.</p>' +
    '</div>';

  var recipeSelect = root.querySelector("[data-recipe]");
  var metalSelect = root.querySelector("[data-metal]");

  recipeSelect.innerHTML = recipes.map(function (recipe, index) {
    return '<option value="' + index + '">' + recipe.name + '</option>';
  }).join("");

  metalSelect.innerHTML = metals.map(function (metal, index) {
    return '<option value="' + index + '">' + metal.name + '</option>';
  }).join("");

  function render() {
    var recipe = recipes[Number(recipeSelect.value) || 0];
    var metal = metals[Number(metalSelect.value) || 0];
    var slagsToBuy = Math.ceil(recipe.sixths / 6);
    var leftoverSixths = slagsToBuy * 6 - recipe.sixths;

    root.querySelector("[data-used]").textContent = fractionLabel(recipe.sixths, 6) + " slag" + (recipe.sixths === 6 ? "" : "s");
    root.querySelector("[data-buy]").textContent = slagsToBuy + " slag" + (slagsToBuy === 1 ? "" : "s");
    root.querySelector("[data-cost]").textContent = formatMoney(metal.sens * slagsToBuy);
    root.querySelector("[data-leftover]").textContent = leftoverSixths ? fractionLabel(leftoverSixths, 6) + " slag" : "None";
  }

  recipeSelect.addEventListener("change", render);
  metalSelect.addEventListener("change", render);
  render();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTecCraftingCalculator, { once: true });
} else {
  initTecCraftingCalculator();
}

document.addEventListener("DOMContentSwitch", initTecCraftingCalculator);
