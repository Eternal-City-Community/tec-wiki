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
      var amount = Math.floor(remaining / entry[1]);
      if (amount) {
        parts.push(amount + entry[0]);
        remaining -= amount * entry[1];
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

  function recipeOptions() {
    return recipes.map(function (recipe, index) {
      return '<option value="' + index + '">' + recipe.name + '</option>';
    }).join("");
  }

  function metalOptions() {
    return metals.map(function (metal, index) {
      return '<option value="' + index + '">' + metal.name + '</option>';
    }).join("");
  }

  root.innerHTML =
    '<div class="tec-craft-shell">' +
      '<div class="tec-craft-toolbar">' +
        '<strong>Crafting Calculator</strong>' +
        '<span>Build an order and calculate the materials to buy.</span>' +
      '</div>' +
      '<div class="tec-craft-stack"></div>' +
      '<div class="tec-craft-summary">' +
        '<div class="tec-craft-summary-title">Order Total</div>' +
        '<div class="tec-craft-summary-body" data-summary></div>' +
      '</div>' +
    '</div>' +
    '<button type="button" class="tec-craft-add" title="Add another item" aria-label="Add another item"></button>';

  var stack = root.querySelector(".tec-craft-stack");
  var summary = root.querySelector("[data-summary]");

  function makeCard() {
    var card = document.createElement("div");
    card.className = "tec-craft-card";
    card.innerHTML =
      '<div class="tec-craft-fields">' +
        '<label><span>Crafting skill</span><select data-craft>' +
          '<option value="jewelry">Jewelry Crafting</option>' +
          '<option disabled>Leatherworking — coming later</option>' +
          '<option disabled>Woodworking — coming later</option>' +
        '</select></label>' +
        '<label><span>Recipe</span><select data-recipe>' + recipeOptions() + '</select></label>' +
        '<label><span>Material</span><select data-metal>' + metalOptions() + '</select></label>' +
        '<label><span>Quantity</span><input type="number" min="1" step="1" value="1" inputmode="numeric" data-quantity></label>' +
      '</div>' +
      '<div class="tec-craft-line-result">' +
        '<div><span>Material used</span><strong data-used></strong></div>' +
        '<div><span>Whole slags if bought alone</span><strong data-buy></strong></div>' +
        '<div><span>Cost if bought alone</span><strong data-cost></strong></div>' +
        '<div><span>Leftover if bought alone</span><strong data-leftover></strong></div>' +
      '</div>' +
      '<button type="button" class="tec-craft-remove" data-remove aria-label="Remove this item" title="Remove this item">Remove</button>';

    function renderLine() {
      var recipe = recipes[Number(card.querySelector("[data-recipe]").value) || 0];
      var metal = metals[Number(card.querySelector("[data-metal]").value) || 0];
      var quantity = Math.max(1, Math.floor(Number(card.querySelector("[data-quantity]").value) || 1));
      var usedSixths = recipe.sixths * quantity;
      var slagsToBuy = Math.ceil(usedSixths / 6);
      var leftoverSixths = slagsToBuy * 6 - usedSixths;

      card.querySelector("[data-used]").textContent = fractionLabel(usedSixths, 6) + " slag" + (usedSixths === 6 ? "" : "s");
      card.querySelector("[data-buy]").textContent = slagsToBuy + " slag" + (slagsToBuy === 1 ? "" : "s");
      card.querySelector("[data-cost]").textContent = formatMoney(metal.sens * slagsToBuy);
      card.querySelector("[data-leftover]").textContent = leftoverSixths ? fractionLabel(leftoverSixths, 6) + " slag" : "None";
      renderSummary();
    }

    card.querySelectorAll("select, input").forEach(function (field) {
      field.addEventListener("change", renderLine);
      field.addEventListener("input", renderLine);
    });

    card.querySelector("[data-remove]").addEventListener("click", function () {
      if (stack.children.length === 1) return;
      card.remove();
      renderSummary();
    });

    card.tecRender = renderLine;
    return card;
  }

  function renderSummary() {
    var byMetal = {};

    stack.querySelectorAll(".tec-craft-card").forEach(function (card) {
      var recipe = recipes[Number(card.querySelector("[data-recipe]").value) || 0];
      var metalIndex = Number(card.querySelector("[data-metal]").value) || 0;
      var quantity = Math.max(1, Math.floor(Number(card.querySelector("[data-quantity]").value) || 1));
      if (!byMetal[metalIndex]) byMetal[metalIndex] = 0;
      byMetal[metalIndex] += recipe.sixths * quantity;
    });

    var rows = Object.keys(byMetal).map(function (metalIndex) {
      var metal = metals[Number(metalIndex)];
      var usedSixths = byMetal[metalIndex];
      var slagsToBuy = Math.ceil(usedSixths / 6);
      var leftoverSixths = slagsToBuy * 6 - usedSixths;
      return '<tr>' +
        '<th>' + metal.name + '</th>' +
        '<td>' + fractionLabel(usedSixths, 6) + '</td>' +
        '<td><strong>' + slagsToBuy + '</strong></td>' +
        '<td><strong>' + formatMoney(metal.sens * slagsToBuy) + '</strong></td>' +
        '<td>' + (leftoverSixths ? fractionLabel(leftoverSixths, 6) : 'None') + '</td>' +
      '</tr>';
    }).join("");

    summary.innerHTML =
      '<div class="tec-craft-summary-scroll"><table>' +
        '<thead><tr><th>Material</th><th>Used</th><th>Buy</th><th>Cost</th><th>Leftover</th></tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
      '</table></div>' +
      '<p>Leftovers are pooled across items made from the same metal before the calculator rounds up to whole slags.</p>';
  }

  stack.appendChild(makeCard());
  stack.firstElementChild.tecRender();

  root.querySelector(".tec-craft-add").addEventListener("click", function () {
    var card = makeCard();
    stack.appendChild(card);
    card.tecRender();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTecCraftingCalculator, { once: true });
} else {
  initTecCraftingCalculator();
}

document.addEventListener("DOMContentSwitch", initTecCraftingCalculator);
