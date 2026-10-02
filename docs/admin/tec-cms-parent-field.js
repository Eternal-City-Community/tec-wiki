// "Parent page" field: a search box over the page list the build writes to
// /admin/tec-pages.json (hooks/breadcrumbs.py). Decap's own relation widget
// loads every page file through GitHub before it can show anything.
// The stored value is the parent's page name (slug), e.g. "skills".
(function () {
  var MAX_RESULTS = 30;
  var pagesRequest = null;

  function loadPages() {
    pagesRequest = pagesRequest || fetch("/admin/tec-pages.json", { cache: "no-cache" })
      .then(function (response) {
        if (!response.ok) throw new Error("tec-pages.json " + response.status);
        return response.json();
      });
    return pagesRequest;
  }

  function search(pages, query, self) {
    var q = query.trim().toLowerCase();
    var starts = [], contains = [];
    pages.forEach(function (page) {
      if (page.slug === self) return;
      var title = page.title.toLowerCase();
      if (!q || title.indexOf(q) === 0) starts.push(page);
      else if (title.indexOf(q) > 0 || page.slug.indexOf(q) >= 0) contains.push(page);
    });
    return starts.concat(contains).slice(0, MAX_RESULTS);
  }

  var STYLE =
    ".tec-parent { position: relative; }" +
    ".tec-parent__row { display: flex; gap: 8px; align-items: center; }" +
    ".tec-parent__input { flex: 1; min-width: 0; padding: 0; border: 0; outline: 0; background: transparent; font: inherit; color: inherit; }" +
    ".tec-parent__clear { border: 0; background: none; color: #798291; cursor: pointer; font-size: 13px; padding: 2px 4px; }" +
    ".tec-parent__clear:hover { color: #3a69c7; }" +
    ".tec-parent__list { position: absolute; z-index: 20; left: -2px; right: -2px; top: calc(100% + 14px); max-height: 280px; overflow-y: auto;" +
    " margin: 0; padding: 4px 0; list-style: none; background: #fff; border: 2px solid #dfdfe3; border-radius: 5px; box-shadow: 0 4px 12px rgba(68,74,87,.15); }" +
    ".tec-parent__option { padding: 6px 12px; cursor: pointer; }" +
    ".tec-parent__option small { margin-left: 8px; color: #798291; }" +
    ".tec-parent__option--active { background: #e8f5fe; color: #3a69c7; }" +
    ".tec-parent__note { padding: 6px 12px; color: #798291; }" +
    ".tec-parent__missing { color: #b83a3a; font-size: 13px; }";

  function register() {
    var style = document.createElement("style");
    style.textContent = STYLE;
    document.head.appendChild(style);

    var Control = createClass({
      getInitialState: function () {
        return { pages: null, error: false, editing: false, query: "", active: 0 };
      },

      componentDidMount: function () {
        var self = this;
        loadPages().then(
          function (pages) { self.setState({ pages: pages }); },
          function () { self.setState({ error: true }); });
      },

      value: function () {
        return (this.props.value || "").trim();
      },

      pageFor: function (slug) {
        var pages = this.state.pages || [];
        for (var i = 0; i < pages.length; i++) if (pages[i].slug === slug) return pages[i];
        return null;
      },

      selfSlug: function () {
        var entry = this.props.entry;
        return entry && entry.get ? entry.get("slug") : null;
      },

      results: function () {
        return this.state.pages ? search(this.state.pages, this.state.query, this.selfSlug()) : [];
      },

      choose: function (page) {
        this.props.onChange(page ? page.slug : "");
        this.setState({ editing: false, query: "" });
      },

      onFocus: function () {
        this.setState({ editing: true, query: "", active: 0 });
        if (this.props.setActiveStyle) this.props.setActiveStyle();
      },

      onBlur: function () {
        var self = this;
        // Let a click on an option land before the list closes.
        setTimeout(function () { self.setState({ editing: false, query: "" }); }, 150);
        if (this.props.setInactiveStyle) this.props.setInactiveStyle();
      },

      onKeyDown: function (event) {
        var results = this.results();
        if (event.key === "ArrowDown") {
          event.preventDefault();
          this.setState({ active: Math.min(this.state.active + 1, results.length - 1) });
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          this.setState({ active: Math.max(this.state.active - 1, 0) });
        } else if (event.key === "Enter") {
          event.preventDefault();
          if (results[this.state.active]) {
            this.choose(results[this.state.active]);
            event.target.blur();
          }
        } else if (event.key === "Escape") {
          event.target.blur();
        }
      },

      render: function () {
        var self = this;
        var slug = this.value();
        var current = slug ? this.pageFor(slug) : null;
        var shown = this.state.editing ? this.state.query
          : current ? current.title
          : slug && !this.state.pages && !this.state.error ? "Loading…"
          : slug;

        var list = null;
        if (this.state.editing) {
          var results = this.results();
          list = h("ul", { className: "tec-parent__list", role: "listbox" },
            !this.state.pages
              ? h("li", { className: "tec-parent__note" }, this.state.error ? "Page list unavailable" : "Loading pages…")
              : results.length
                ? results.map(function (page, i) {
                    return h("li", {
                      key: page.slug,
                      role: "option",
                      "aria-selected": i === self.state.active,
                      className: "tec-parent__option" + (i === self.state.active ? " tec-parent__option--active" : ""),
                      onMouseDown: function (event) { event.preventDefault(); self.choose(page); },
                      onMouseEnter: function () { self.setState({ active: i }); }
                    }, page.title, h("small", null, page.slug));
                  })
                : h("li", { className: "tec-parent__note" }, "No matching pages"));
        }

        return h("div", { className: this.props.classNameWrapper },
          h("div", { className: "tec-parent" },
            h("div", { className: "tec-parent__row" },
              h("input", {
                id: this.props.forID,
                className: "tec-parent__input",
                type: "text",
                autoComplete: "off",
                placeholder: "Search pages by title…",
                value: shown || "",
                onFocus: this.onFocus,
                onBlur: this.onBlur,
                onKeyDown: this.onKeyDown,
                onChange: function (event) { self.setState({ query: event.target.value, active: 0 }); }
              }),
              slug && !this.state.editing
                ? h("button", { type: "button", className: "tec-parent__clear", title: "Remove the parent page",
                    onClick: function () { self.choose(null); } }, "Clear")
                : null),
            slug && this.state.pages && !current && !this.state.editing
              ? h("div", { className: "tec-parent__missing" }, "No page named \"" + slug + "\" exists.")
              : null,
            list));
      }
    });

    CMS.registerWidget("tec-parent", Control);
  }

  if (window.CMS && typeof window.createClass === "function" && typeof window.h === "function") {
    register();
  }
})();
