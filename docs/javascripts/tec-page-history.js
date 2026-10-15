// Page History: lists a page's saved revisions with on-wiki diffs. The data
// is generated at build time by hooks/page_history.py from Git history.
// ?page=<slug> picks the page; &rev=<sha> opens that revision's changes.
var TEC_REPO_URL = "https://github.com/Eternal-City-Community/tec-wiki";

function tecHistoryEsc(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Decap's automatic commit messages say nothing useful; editors who leave
// the change note empty get one of these.
function tecHistoryDescribe(message) {
  var auto = /^(Create|Update|Delete) Wiki Page “.*”$/.exec(message || "");
  if (!auto) return { text: message || "Page update", auto: false };
  var verb = { Create: "Created the page", Update: "Edited the page", Delete: "Deleted the page" }[auto[1]];
  return { text: verb, auto: true };
}

// Renders a unified diff as a two-gutter table. Runs of removed lines that
// are followed by added lines are paired, and the changed part of each pair
// is highlighted.
function tecHistoryDiffHtml(patch) {
  var esc = tecHistoryEsc;
  var rows = [];
  var oldNo = 0, newNo = 0;
  var lines = String(patch || "").split("\n");

  function changed(a, b) {
    var start = 0;
    while (start < a.length && start < b.length && a[start] === b[start]) start++;
    var endA = a.length, endB = b.length;
    while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) { endA--; endB--; }
    function mark(text, end) {
      if (end === start) return esc(text);
      return esc(text.slice(0, start)) + "<mark>" + esc(text.slice(start, end)) + "</mark>" + esc(text.slice(end));
    }
    return [mark(a, endA), mark(b, endB)];
  }

  function row(kind, oldN, newN, html) {
    var sign = kind === "del" ? "−" : kind === "add" ? "+" : "";
    rows.push('<tr class="tec-diff__row is-' + kind + '">' +
      '<td class="tec-diff__num">' + (oldN || "") + '</td>' +
      '<td class="tec-diff__num">' + (newN || "") + '</td>' +
      '<td class="tec-diff__sign">' + sign + '</td>' +
      '<td class="tec-diff__text">' + (html || "&nbsp;") + '</td></tr>');
  }

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var hunk = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(line);
    if (hunk) {
      oldNo = Number(hunk[1]);
      newNo = Number(hunk[2]);
      rows.push('<tr class="tec-diff__hunk"><td colspan="4">Line ' + newNo + '</td></tr>');
    } else if (line.charAt(0) === "-") {
      var dels = [], adds = [];
      while (i < lines.length && lines[i].charAt(0) === "-") dels.push(lines[i++].slice(1));
      while (i < lines.length && lines[i].charAt(0) === "+") adds.push(lines[i++].slice(1));
      i--;
      var pairs = Math.min(dels.length, adds.length);
      var delHtml = dels.map(esc), addHtml = adds.map(esc);
      for (var p = 0; p < pairs; p++) {
        var marked = changed(dels[p], adds[p]);
        delHtml[p] = marked[0];
        addHtml[p] = marked[1];
      }
      delHtml.forEach(function (html) { row("del", oldNo++, null, html); });
      addHtml.forEach(function (html) { row("add", null, newNo++, html); });
    } else if (line.charAt(0) === "+") {
      row("add", null, newNo++, esc(line.slice(1)));
    } else if (line.charAt(0) === " ") {
      row("ctx", oldNo++, newNo++, esc(line.slice(1)));
    }
    // "\ No newline at end of file" and blank trailing lines are skipped.
  }
  return '<div class="tec-diff"><table class="tec-diff__table">' + rows.join("") + '</table></div>';
}

function initTecPageHistory() {
  var root = document.getElementById("tec-page-history");
  if (!root || root.dataset.initialized === "1") return;
  root.dataset.initialized = "1";

  var esc = tecHistoryEsc;
  var params = new URLSearchParams(window.location.search);
  var page = params.get("page") || "index";
  var wantedRev = params.get("rev") || "";
  var currentUrl = page === "index" ? "/" : "/" + page + "/";

  function friendlyPageName(slug) {
    if (slug === "index") return "Home";
    return slug.split("-").map(function (part) {
      return part ? part.charAt(0).toUpperCase() + part.slice(1) : "";
    }).join(" ");
  }

  function formatDate(value) {
    if (!value) return "Unknown date";
    try {
      return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
    } catch (e) {
      return value;
    }
  }

  function githubCommit(sha) {
    return TEC_REPO_URL + "/commit/" + sha;
  }

  function githubFile(sha) {
    return TEC_REPO_URL + "/blob/" + sha + "/docs/" + encodeURIComponent(page) + ".md";
  }

  function counts(rev) {
    return '<span class="tec-history-add">+' + Number(rev.additions || 0) + '</span> ' +
      '<span class="tec-history-del">−' + Number(rev.deletions || 0) + '</span>';
  }

  function detailFor(entry) {
    var detail = entry.querySelector(".tec-history-detail");
    if (!detail) {
      detail = document.createElement("div");
      detail.className = "tec-history-detail";
      entry.appendChild(detail);
    }
    return detail;
  }

  function closeDetail(entry) {
    var detail = entry.querySelector(".tec-history-detail");
    if (detail) detail.remove();
    entry.querySelectorAll("[aria-expanded]").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
  }

  function toggle(entry, button, render) {
    var open = button.getAttribute("aria-expanded") === "true";
    closeDetail(entry);
    if (open) return;
    button.setAttribute("aria-expanded", "true");
    render(detailFor(entry));
  }

  function showChanges(entry, rev, detail) {
    var body;
    if (rev.patch === undefined) {
      body = '<p class="tec-history-note">This change is too large to show here. ' +
        '<a href="' + githubCommit(rev.sha) + '" target="_blank" rel="noopener">View it on GitHub</a>.</p>';
    } else if (!rev.patch) {
      body = '<p class="tec-history-note">No text changed in this revision.</p>';
    } else {
      body = tecHistoryDiffHtml(rev.patch);
    }
    detail.innerHTML =
      '<div class="tec-history-detail__bar">' +
        '<span>Changes in this revision · ' + counts(rev) + '</span>' +
        '<a href="' + githubCommit(rev.sha) + '" target="_blank" rel="noopener">View on GitHub</a>' +
      '</div>' + body;
  }

  function showVersion(entry, rev, detail) {
    var fallback = '<a href="' + githubFile(rev.sha) + '" target="_blank" rel="noopener">View it on GitHub</a>';
    detail.innerHTML = '<p class="tec-history-note">Loading this version…</p>';
    fetch("/api/page-version?page=" + encodeURIComponent(page) + "&sha=" + encodeURIComponent(rev.sha))
      .then(function (response) {
        if (!response.ok) throw new Error("Could not load version");
        return response.text();
      })
      .then(function (source) {
        detail.innerHTML =
          '<div class="tec-history-detail__bar">' +
            '<span>Page source as of ' + esc(formatDate(rev.date)) + '</span>' + fallback +
          '</div>' +
          '<pre class="tec-history-version">' + esc(source) + '</pre>';
      })
      .catch(function () {
        detail.innerHTML = '<p class="tec-history-note">This version could not be loaded right now. ' + fallback + '.</p>';
      });
  }

  fetch("/assets/data/history/" + encodeURIComponent(page) + ".json", { cache: "no-cache" })
    .then(function (response) {
      if (response.status === 404) return { revisions: [] };
      if (!response.ok) throw new Error("Could not load history");
      return response.json();
    })
    .then(function (data) {
      var revisions = data.revisions || [];
      root.innerHTML =
        '<div class="tec-history-header">' +
          '<div><strong>History for:</strong> ' + esc(friendlyPageName(page)) +
            ' <span class="tec-history-count">· ' + revisions.length + ' revision' + (revisions.length === 1 ? '' : 's') + '</span></div>' +
          '<a class="tec-history-current" href="' + currentUrl + '">Back to current page</a>' +
        '</div>' +
        (revisions.length
          ? '<ol class="tec-history-list">' + revisions.map(function (rev, index) {
              var described = tecHistoryDescribe(rev.message);
              return '<li class="tec-history-entry" data-index="' + index + '">' +
                '<div class="tec-history-entry__row">' +
                  '<div class="tec-history-entry__main">' +
                    '<div class="tec-history-entry__title' + (described.auto ? ' is-auto' : '') + '">' + esc(described.text) + '</div>' +
                    '<div class="tec-history-entry__meta">' +
                      esc(rev.author || "Unknown editor") + ' · ' + esc(formatDate(rev.date)) + ' · ' + counts(rev) +
                      (index === 0 ? ' <span class="tec-history-current-badge">Current</span>' : '') +
                    '</div>' +
                  '</div>' +
                  '<div class="tec-history-entry__actions">' +
                    '<button type="button" data-history-diff aria-expanded="false">View changes</button>' +
                    '<button type="button" data-history-version aria-expanded="false">View this version</button>' +
                  '</div>' +
                '</div>' +
              '</li>';
            }).join("") + '</ol>'
          : '<p class="tec-history-note">No saved revisions were found for this page.</p>');

      root.querySelectorAll(".tec-history-entry").forEach(function (entry) {
        var rev = revisions[Number(entry.dataset.index)];
        entry.querySelector("[data-history-diff]").addEventListener("click", function (event) {
          toggle(entry, event.currentTarget, function (detail) { showChanges(entry, rev, detail); });
        });
        entry.querySelector("[data-history-version]").addEventListener("click", function (event) {
          toggle(entry, event.currentTarget, function (detail) { showVersion(entry, rev, detail); });
        });
        if (wantedRev && rev.sha.indexOf(wantedRev) === 0) {
          entry.classList.add("is-selected");
          entry.querySelector("[data-history-diff]").click();
          entry.scrollIntoView({ block: "start" });
        }
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
