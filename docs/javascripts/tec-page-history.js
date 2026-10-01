function initTecPageHistory() {
  var root = document.getElementById("tec-page-history");
  if (!root || root.dataset.initialized === "1") return;
  root.dataset.initialized = "1";

  var params = new URLSearchParams(window.location.search);
  var page = params.get("page") || "index";

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function friendlyPageName(slug) {
    if (slug === "index") return "Home";
    return slug.split("-").map(function (part) {
      return part ? part.charAt(0).toUpperCase() + part.slice(1) : "";
    }).join(" ");
  }

  function formatDate(value) {
    if (!value) return "Unknown date";
    try {
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(new Date(value));
    } catch (e) {
      return value;
    }
  }

  function closePanel() {
    var panel = root.querySelector(".tec-history-detail");
    if (panel) panel.remove();
  }

  function showPanel(title, bodyHtml) {
    closePanel();
    var panel = document.createElement("section");
    panel.className = "tec-history-detail";
    panel.innerHTML =
      '<div class="tec-history-detail__head">' +
        '<h2>' + esc(title) + '</h2>' +
        '<button type="button" class="tec-history-close">Close</button>' +
      '</div>' +
      '<div class="tec-history-detail__body">' + bodyHtml + '</div>';
    root.appendChild(panel);
    panel.querySelector(".tec-history-close").addEventListener("click", closePanel);
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function diffHtml(text) {
    return String(text || "").split("\n").map(function (line) {
      var cls = "tec-history-diff__line";
      if (line.startsWith("+") && !line.startsWith("+++")) cls += " is-add";
      else if (line.startsWith("-") && !line.startsWith("---")) cls += " is-del";
      else if (line.startsWith("@@")) cls += " is-meta";
      return '<div class="' + cls + '">' + esc(line || " ") + '</div>';
    }).join("");
  }

  fetch("/api/page-history?page=" + encodeURIComponent(page))
    .then(function (response) {
      if (!response.ok) throw new Error("Could not load history");
      return response.json();
    })
    .then(function (data) {
      var revisions = data.revisions || [];
      var currentUrl = page === "index" ? "/" : "/" + page + "/";

      root.innerHTML =
        '<div class="tec-history-header">' +
          '<div><strong>History for:</strong> ' + esc(friendlyPageName(page)) + '</div>' +
          '<a class="tec-history-current" href="' + currentUrl + '">Back to current page</a>' +
        '</div>' +
        (revisions.length
          ? '<div class="tec-history-list">' + revisions.map(function (rev, index) {
              return '<article class="tec-history-entry">' +
                '<div class="tec-history-entry__main">' +
                  '<div class="tec-history-entry__title">' + esc(rev.message || "Page update") + '</div>' +
                  '<div class="tec-history-entry__meta">' +
                    esc(rev.author || "Unknown editor") + ' · ' + esc(formatDate(rev.date)) +
                    (index === 0 ? ' <span class="tec-history-current-badge">Current</span>' : '') +
                  '</div>' +
                '</div>' +
                '<div class="tec-history-entry__actions">' +
                  '<button type="button" data-history-diff="' + esc(rev.sha) + '">View changes</button>' +
                  '<button type="button" data-history-version="' + esc(rev.sha) + '">View this version</button>' +
                '</div>' +
              '</article>';
            }).join("") + '</div>'
          : '<p>No saved revisions were found for this page.</p>');

      root.querySelectorAll("[data-history-diff]").forEach(function (button) {
        button.addEventListener("click", function () {
          button.disabled = true;
          button.textContent = "Loading…";
          fetch("/api/page-diff?page=" + encodeURIComponent(page) + "&sha=" + encodeURIComponent(button.dataset.historyDiff))
            .then(function (response) {
              if (!response.ok) throw new Error("Could not load changes");
              return response.json();
            })
            .then(function (info) {
              showPanel(
                "Changes — " + (info.message || "Page update"),
                '<div class="tec-history-summary">' +
                  '<strong>' + esc(info.author || "Unknown editor") + '</strong> · ' +
                  esc(formatDate(info.date)) +
                  ' · <span class="tec-history-add">+' + Number(info.additions || 0) + '</span> ' +
                  '<span class="tec-history-del">−' + Number(info.deletions || 0) + '</span>' +
                '</div>' +
                '<div class="tec-history-diff">' + diffHtml(info.patch) + '</div>'
              );
            })
            .catch(function () {
              showPanel("Could not load changes", "<p>This revision could not be displayed right now.</p>");
            })
            .finally(function () {
              button.disabled = false;
              button.textContent = "View changes";
            });
        });
      });

      root.querySelectorAll("[data-history-version]").forEach(function (button) {
        button.addEventListener("click", function () {
          button.disabled = true;
          button.textContent = "Loading…";
          fetch("/api/page-version?page=" + encodeURIComponent(page) + "&sha=" + encodeURIComponent(button.dataset.historyVersion))
            .then(function (response) {
              if (!response.ok) throw new Error("Could not load version");
              return response.text();
            })
            .then(function (source) {
              showPanel(
                "Saved page version",
                '<pre class="tec-history-version">' + esc(source) + '</pre>'
              );
            })
            .catch(function () {
              showPanel("Could not load version", "<p>This saved version could not be displayed right now.</p>");
            })
            .finally(function () {
              button.disabled = false;
              button.textContent = "View this version";
            });
        });
      });
    })
    .catch(function () {
      root.innerHTML =
        '<div class="tec-history-error">' +
          '<strong>Page history could not be loaded.</strong><br>' +
          'Please try again in a moment.' +
        '</div>';
    });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTecPageHistory, { once: true });
} else {
  initTecPageHistory();
}
document.addEventListener("DOMContentSwitch", initTecPageHistory);
