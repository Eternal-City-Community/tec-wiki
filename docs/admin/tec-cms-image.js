// "Image" button in the Body editor's toolbar, beside Templates. It opens
// Decap's media library; the chosen or uploaded image is put in at the cursor
// as Markdown, e.g. ![Dual trainer](/assets/uploads/dual-trainer.png).
//
// The media library only opens for a field, so the hidden "insert_image"
// field (widget tec-image-insert) opens it. An image uploaded while editing
// a page is saved with that page's next Save, in the same draft and review
// request as the text change.
(function () {
  if (!window.CMS) return;
  var FIELD = "insert_image";
  var BUTTON_CLASS = "tec-insert-image";
  var MARKER_CLASS = "tec-image-insert";
  var opener = null;
  var pending = null; // { editor, cursor } when the button was used

  var style = document.createElement("style");
  style.id = "tec-cms-image-style";
  style.textContent =
    "[class*='ControlContainer']:has(." + MARKER_CLASS + ") { display: none; }" +
    // Beside Templates (the toolbar spreads its items apart), in its colors.
    ".cms-editor-raw [class*='ToolbarContainer'] ." + BUTTON_CLASS + " { margin-right: auto; color: inherit; }" +
    ".cms-editor-raw [class*='ToolbarContainer'] ." + BUTTON_CLASS + ":hover { color: #3a69c7; }";
  document.head.appendChild(style);

  function altText(path) {
    var name = decodeURIComponent(path.split("/").pop() || "").replace(/\.[a-z0-9]+$/i, "");
    // Names like "f3847e60d44a1cec725613bf618591bb" or "IMG_2041" say nothing.
    if (/^[0-9a-f]{12,}$/i.test(name) || /^(img|image|screenshot|dsc|pxl)?[-_ ]?\d+$/i.test(name)) return "Image";
    return name.replace(/[-_]+/g, " ").replace(/[\[\]]/g, "").trim() || "Image";
  }

  function imageChosen(path) {
    if (!pending || !window.tecCmsInsert) return;
    var target = pending;
    pending = null;
    var markdown = "![" + altText(path) + "](" + encodeURI(decodeURI(path)) + ")";
    window.tecCmsInsert(target.editor, markdown, target.cursor);
  }

  // ---- Hidden field that owns the media library ----

  var Control = createClass({
    componentDidMount: function () {
      this.controlID = "tec-image-" + Math.random().toString(36).slice(2);
      var self = this;
      opener = function () {
        self.props.onOpenMediaLibrary({
          controlID: self.controlID,
          forImage: true,
          // privateUpload is left out, as Decap's own image field does: the
          // library drops its file list if this differs from the list's own.
          value: [],
          allowMultiple: false,
          field: self.props.field
        });
      };
    },

    // Decap only re-renders a field when its value changes; this one has no
    // value, so it asks to update when the media library hands it an image.
    shouldComponentUpdate: function (nextProps) {
      return !!(nextProps.mediaPaths && nextProps.mediaPaths.get(this.controlID));
    },

    componentDidUpdate: function () {
      var path = this.props.mediaPaths && this.props.mediaPaths.get(this.controlID);
      if (!path) return;
      if (typeof path !== "string") path = path.first ? path.first() : path[0];
      this.props.onRemoveInsertedMedia(this.controlID);
      if (path) imageChosen(path);
    },

    componentWillUnmount: function () {
      opener = null;
      this.props.onRemoveMediaControl(this.controlID);
    },

    render: function () {
      return h("span", { className: MARKER_CLASS });
    }
  });

  CMS.registerWidget("tec-image-insert", Control, function () { return null; });

  // The field holds no data; keep it out of the page's front matter.
  CMS.registerEventListener({
    name: "preSave",
    handler: function (args) {
      var data = args.entry.get("data");
      return data.has(FIELD) ? data.delete(FIELD) : data;
    }
  });

  // ---- Toolbar button ----

  function makeButton(toolbar) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "tec-templates__button " + BUTTON_CLASS;
    button.title = "Upload an image, or pick one already on the wiki, and put it in at the cursor";
    button.textContent = "Image";
    // Keep the editor's cursor where it is.
    button.addEventListener("mousedown", function (event) { event.preventDefault(); });
    button.addEventListener("click", function () {
      var editor = toolbar.closest(".cms-editor-raw").querySelector("[data-slate-editor]");
      if (!editor || !opener) return;
      pending = { editor: editor, cursor: window.tecCmsCursor ? window.tecCmsCursor(editor) : null };
      opener();
    });
    return button;
  }

  function update() {
    document.querySelectorAll(".cms-editor-raw [class*='ToolbarContainer']").forEach(function (toolbar) {
      if (toolbar.querySelector("." + BUTTON_CLASS)) return;
      var templates = toolbar.querySelector(".tec-templates");
      toolbar.insertBefore(makeButton(toolbar), templates ? templates.nextSibling : toolbar.firstChild);
    });
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(function () {
      queued = false;
      update();
    });
  }

  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  schedule();
})();
