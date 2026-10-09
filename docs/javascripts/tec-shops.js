function initTecShops() {
  var root = document.getElementById("tec-shops-app");
  if (!root || root.dataset.initialized === "1") return;
  root.dataset.initialized = "1";
  root.innerHTML = '<div class="tec-shops-loading">Loading shop inventories…</div>';

  // Built from docs/data/shops.txt by hooks/shops.py; data-src is the content-hashed copy.
  fetch(root.dataset.src || "/assets/shops.json")
    .then(function(r) {
      if (!r.ok) throw new Error("Could not load shop inventory data.");
      return r.json();
    })
    .then(build)
    .catch(function(err) {
      root.innerHTML = '<div class="tec-shops-error">' + err.message + '</div>';
    });

  function expand(locations) {
    locations.forEach(function(loc) {
      loc.shops.forEach(function(shop) {
        shop.items = shop.items.map(function(item) {
          return { name:item[0], price:item[1], options:item[2] };
        });
      });
    });
    return locations;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function(ch) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch];
    });
  }

  function markers(shop, item) {
    return (shop.rotating ? ' <span class="tec-shop-rotating" tabindex="0" data-tip="Example rotating stock" aria-label="Example rotating stock">☘</span>' : '') +
      (item.options ? ' <span class="tec-shop-info" tabindex="0" data-tip="'+esc(item.options)+'" aria-label="'+esc(item.options)+'">?</span>' : '');
  }

  function slug(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  }

  function build(data) {
    var locations = expand(data);
    root.innerHTML =
      '<section class="tec-shops-controls">' +
        '<div class="tec-shops-search-row">' +
          '<span class="tec-shops-search-icon">⌕</span>' +
          '<input id="tec-shop-search" type="search" placeholder="Search Midlight for items…" autocomplete="off">' +
          '<button type="button" id="tec-shop-options-button" aria-expanded="false">Options</button>' +
        '</div>' +
        '<div id="tec-shop-options" class="tec-shops-options" hidden>' +
          '<label><input type="checkbox" id="tec-shop-keepers" checked> Search shopkeeper names</label>' +
          '<label><input type="checkbox" id="tec-shop-rotating" checked> Include example rotating stock</label>' +
          '<label><input type="checkbox" id="tec-shop-item-options"> Search item options (color, substance, etc.)</label>' +
          '<small>Use double quotes to search for an exact phrase.</small>' +
        '</div>' +
      '</section>' +
      '<nav class="tec-shops-locations" aria-label="Shop locations">' +
        '<strong>Locations</strong><div class="tec-shops-location-links">' +
        locations.map(function(loc){ return '<a href="#shop-'+slug(loc.name)+'">'+esc(loc.name)+'</a>'; }).join("") +
        '</div>' +
      '</nav>' +
      '<div id="tec-shop-results"></div>';

    var input = root.querySelector("#tec-shop-search");
    var results = root.querySelector("#tec-shop-results");
    var keepers = root.querySelector("#tec-shop-keepers");
    var rotating = root.querySelector("#tec-shop-rotating");
    var options = root.querySelector("#tec-shop-item-options");
    var optionsPanel = root.querySelector("#tec-shop-options");
    var optionsButton = root.querySelector("#tec-shop-options-button");
    var locationNav = root.querySelector(".tec-shops-locations");

    optionsButton.addEventListener("click", function() {
      var open = optionsPanel.hidden;
      optionsPanel.hidden = !open;
      optionsButton.setAttribute("aria-expanded", String(open));
    });

    [input, keepers, rotating, options].forEach(function(el) {
      el.addEventListener(el === input ? "input" : "change", render);
    });

    function terms(q) {
      var out = [];
      q.replace(/"([^"]+)"|([^\s]+)/g, function(_, phrase, word) {
        var raw = (phrase || word || "").trim().toLowerCase();
        if (raw) out.push({text:raw, exact:!!phrase});
        return _;
      });
      return out;
    }

    function matches(haystack, ts) {
      haystack = haystack.toLowerCase();
      return ts.every(function(t) {
        return haystack.indexOf(t.text) !== -1;
      });
    }

    function renderBrowse() {
      locationNav.hidden = false;
      results.className = "tec-shops-browse";
      results.innerHTML = locations.map(function(loc) {
        return '<section class="tec-shop-location" id="shop-'+slug(loc.name)+'">' +
          '<h2>' + (loc.page ? '<a href="/'+esc(loc.page)+'/">'+esc(loc.name)+'</a>' : esc(loc.name)) + '</h2>' +
          loc.shops.map(function(shop) {
            return '<article class="tec-shop-card">' +
              '<h3>'+esc(shop.name)+(shop.keeper ? ' <span>— '+esc(shop.keeper)+'</span>' : '')+'</h3>' +
              '<table><tbody>' +
              shop.items.map(function(item) {
                return '<tr><td>'+esc(item.name)+markers(shop, item)+'</td><td>'+esc(item.price)+'</td></tr>';
              }).join("") +
              '</tbody></table>' +
            '</article>';
          }).join("") +
        '</section>';
      }).join("");
    }

    function renderSearch(q) {
      locationNav.hidden = true;
      var ts = terms(q);
      var rows = [];
      locations.forEach(function(loc) {
        loc.shops.forEach(function(shop) {
          shop.items.forEach(function(item) {
            if (!rotating.checked && shop.rotating) return;
            var hay = item.name;
            if (keepers.checked) hay += " " + shop.keeper + " " + shop.name;
            if (options.checked) hay += " " + item.options;
            if (!matches(hay, ts)) return;
            rows.push({loc:loc, shop:shop, item:item});
          });
        });
      });

      results.className = "tec-shops-search-results";
      if (!rows.length) {
        results.innerHTML = '<div class="tec-shops-empty"><strong>That is not for sale here.</strong><br>Clear or change the search to return to the shop list.</div>';
        return;
      }

      results.innerHTML =
        '<div class="tec-shops-results-count">'+rows.length+' matching item'+(rows.length===1?'':'s')+'</div>' +
        '<div class="tec-shops-table-wrap"><table class="tec-shops-results-table"><thead><tr>' +
          '<th>Item</th><th>Price</th><th>Shop</th><th>Location</th>' +
        '</tr></thead><tbody>' +
        rows.map(function(r) {
          return '<tr><td>'+esc(r.item.name)+markers(r.shop, r.item)+'</td><td>'+esc(r.item.price)+'</td><td>'+esc(r.shop.name)+(r.shop.keeper?' — '+esc(r.shop.keeper):'')+'</td><td>' +
            (r.loc.page?'<a href="/'+esc(r.loc.page)+'/">'+esc(r.loc.name)+'</a>':esc(r.loc.name)) +
          '</td></tr>';
        }).join("") +
        '</tbody></table></div>';
    }

    function render() {
      var q = input.value.trim();
      if (!q) renderBrowse();
      else renderSearch(q);
    }

    render();
    tooltips(root);
  }
}

// Custom tooltip for the ☘ and ? markers: appears instantly on hover/focus, and on tap for touch screens.
function tooltips(root) {
  var tip = document.getElementById("tec-shop-tip");
  if (!tip) {
    tip = document.createElement("div");
    tip.id = "tec-shop-tip";
    tip.setAttribute("role", "tooltip");
    tip.hidden = true;
    document.body.appendChild(tip);
    window.addEventListener("scroll", hideShopTip, {passive:true});
    window.addEventListener("resize", hideShopTip);
    // pointerdown, not click: iOS Safari doesn't fire click when tapping non-interactive content.
    document.addEventListener("pointerdown", function(e) {
      if (!e.target.closest || !e.target.closest("[data-tip]")) hideShopTip();
    });
    document.addEventListener("keydown", function(e) { if (e.key === "Escape") hideShopTip(); });
  }

  function show(el) {
    if (!tip.hidden && tip.owner === el) return;
    tip.owner = el;
    // "QUALITIES: a, b - COLORS: c" -> one labelled line per option group
    tip.innerHTML = "";
    el.getAttribute("data-tip").split(/\s+-\s+(?=[A-Z][A-Z ]+:)/).forEach(function(part) {
      var line = document.createElement("div");
      var m = part.match(/^([A-Z][A-Z ]+):\s*([\s\S]*)$/);
      if (m) {
        var label = document.createElement("strong");
        label.textContent = m[1].charAt(0) + m[1].slice(1).toLowerCase() + ": ";
        line.appendChild(label);
        line.appendChild(document.createTextNode(m[2]));
      } else {
        line.textContent = part;
      }
      tip.appendChild(line);
    });
    tip.hidden = false;
    var r = el.getBoundingClientRect();
    var w = tip.offsetWidth, h = tip.offsetHeight, gap = 8;
    var left = Math.max(8, Math.min(r.left + r.width / 2 - w / 2, window.innerWidth - w - 8));
    var below = r.top - h - gap < 8;
    tip.style.left = left + "px";
    tip.style.top = (below ? r.bottom + gap : r.top - h - gap) + "px";
    tip.className = below ? "below" : "";
    tip.style.setProperty("--arrow-x", (r.left + r.width / 2 - left) + "px");
  }

  function target(e) {
    return e.target.closest ? e.target.closest("[data-tip]") : null;
  }

  root.addEventListener("mouseover", function(e) { var el = target(e); if (el) show(el); });
  root.addEventListener("mouseout", function(e) {
    var el = target(e);
    if (el && !el.contains(e.relatedTarget)) hideShopTip();
  });
  root.addEventListener("focusin", function(e) { var el = target(e); if (el) show(el); });
  root.addEventListener("focusout", hideShopTip);
  root.addEventListener("click", function(e) { var el = target(e); if (el) show(el); });
}

function hideShopTip() {
  var tip = document.getElementById("tec-shop-tip");
  if (tip) { tip.hidden = true; tip.owner = null; }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTecShops, {once:true});
} else {
  initTecShops();
}
document.addEventListener("DOMContentSwitch", initTecShops);
