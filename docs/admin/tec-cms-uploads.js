// Image uploads.
//
// 1. Naming: when a file is picked with the media library's Upload button, a
//    dialog asks for its name first (e.g. "dual-trainer"; the extension is
//    kept). Names already used on the wiki or in the library are refused:
//    Decap would otherwise offer to replace the old file, which for the wiki
//    team deletes it from the live wiki.
// 2. Unused uploads: a page save leaves out images uploaded during the edit
//    that the page does not use, e.g. a wrong pick.
(function () {
  if (!window.CMS) return;
  var CLASS = "tec-upload-name";
  var MEDIA_FOLDER = "docs/assets/uploads"; // media_folder in config.yml
  var PUBLIC_FOLDER = "/assets/uploads";    // public_folder in config.yml

  var style = document.createElement("style");
  style.id = "tec-cms-uploads-style";
  style.textContent =
    "." + CLASS + " { position: fixed; inset: 0; z-index: 2147483000; display: flex; align-items: center;" +
    " justify-content: center; padding: 16px; background: rgba(20,24,16,.6); }" +
    "." + CLASS + "__card { box-sizing: border-box; width: min(30rem, 100%); padding: 1.6rem 1.8rem 1.4rem;" +
    " background: #efe7c7; color: #2b271d; border: 1px solid #8d8659; border-bottom: 4px solid #173104;" +
    " box-shadow: 0 18px 50px rgba(20,26,12,.45); font-family: system-ui, -apple-system, 'Segoe UI', Arial, sans-serif; }" +
    "." + CLASS + "__title { margin: 0 0 1rem; font-family: Georgia, 'Times New Roman', serif; font-weight: 400;" +
    " font-size: 1.15rem; letter-spacing: .12em; text-transform: uppercase; }" +
    "." + CLASS + "__thumb { display: block; max-width: 100%; max-height: 160px; margin: 0 auto 1rem;" +
    " border: 1px solid #8d8659; background: #fff; }" +
    "." + CLASS + "__label { display: block; margin-bottom: .35rem; font-size: .9rem; font-weight: 600; }" +
    "." + CLASS + "__row { display: flex; align-items: stretch; border: 1px solid #8d8659; border-radius: 5px; background: #fffdf4; }" +
    "." + CLASS + "__row:focus-within { outline: 2px solid #234707; outline-offset: 1px; }" +
    "." + CLASS + "__input { flex: 1; min-width: 0; padding: 8px 10px; border: 0; outline: 0; background: transparent;" +
    " color: #2b271d; font: inherit; font-size: .95rem; }" +
    "." + CLASS + "__ext { padding: 8px 10px 8px 0; color: #665f49; font-size: .95rem; }" +
    "." + CLASS + "__hint { margin: .45rem 0 0; color: #665f49; font-size: .82rem; line-height: 1.4; }" +
    "." + CLASS + "__error { margin: .45rem 0 0; color: #8a342d; font-size: .85rem; font-weight: 600; }" +
    "." + CLASS + "__actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 1.2rem; }" +
    "." + CLASS + "__button { padding: 8px 18px; border: 1px solid #8d8659; border-radius: 5px; background: transparent;" +
    " color: #2b271d; font: inherit; font-size: .95rem; cursor: pointer; }" +
    "." + CLASS + "__button:hover { background: rgba(141,134,89,.15); }" +
    "." + CLASS + "__button--primary { background: #9c6a3b; border-color: #9c6a3b; color: #fff8e6; font-weight: 600; }" +
    "." + CLASS + "__button--primary:hover { background: #b07a45; }" +
    "." + CLASS + "__button:disabled { opacity: .6; cursor: wait; }";
  document.head.appendChild(style);

  // ---- Names ----

  function splitName(fileName) {
    var match = /^(.*?)(\.[a-z0-9]+)?$/i.exec(fileName);
    return { base: match[1], ext: (match[2] || "").toLowerCase() };
  }

  function cleanName(text) {
    return text.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase()
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+/, "");
  }

  // Camera and random names ("IMG_2041", "f3847e60d44a…") say nothing.
  function meaningless(base) {
    return /^[0-9a-f]{12,}$/i.test(base) || /^(img|image|screenshot|dsc|pxl)?[-_ ]?[\d_-]+$/i.test(base);
  }

  // Names on the library's cards: images on the wiki and this edit's uploads.
  function libraryNames() {
    return Array.prototype.map.call(document.querySelectorAll("[class*='CardText']"), function (el) {
      return el.textContent.trim().toLowerCase();
    });
  }

  // Also asks the live site, in case the library list is incomplete.
  function nameTaken(fileName) {
    if (libraryNames().indexOf(fileName) >= 0) return Promise.resolve(true);
    if (!/^https?:$/.test(window.location.protocol)) return Promise.resolve(false);
    return fetch(PUBLIC_FOLDER + "/" + encodeURIComponent(fileName), { method: "HEAD", cache: "no-store" })
      .then(function (res) { return res.ok; }, function () { return false; });
  }

  // ---- Dialog ----

  // Resolves to the chosen file name, or null when cancelled.
  function askName(file) {
    var parts = splitName(file.name);
    var thumb = /^image\//.test(file.type) ? URL.createObjectURL(file) : null;

    var overlay = document.createElement("div");
    overlay.className = CLASS;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML =
      '<form class="' + CLASS + '__card">' +
        '<h2 class="' + CLASS + '__title">Name this image</h2>' +
        (thumb ? '<img class="' + CLASS + '__thumb" alt="">' : '') +
        '<label class="' + CLASS + '__label" for="' + CLASS + '-input">File name</label>' +
        '<div class="' + CLASS + '__row">' +
          '<input class="' + CLASS + '__input" id="' + CLASS + '-input" autocomplete="off" spellcheck="false">' +
          '<span class="' + CLASS + '__ext"></span>' +
        '</div>' +
        '<p class="' + CLASS + '__hint">Describe the picture, e.g. <em>blackvine-square-map</em>. ' +
          'Lowercase letters, numbers and hyphens.</p>' +
        '<p class="' + CLASS + '__error" hidden></p>' +
        '<div class="' + CLASS + '__actions">' +
          '<button type="button" class="' + CLASS + '__button" data-cancel>Cancel</button>' +
          '<button type="submit" class="' + CLASS + '__button ' + CLASS + '__button--primary">Upload</button>' +
        '</div>' +
      '</form>';
    if (thumb) overlay.querySelector("img").src = thumb;
    overlay.querySelector("." + CLASS + "__ext").textContent = parts.ext;
    var form = overlay.querySelector("form");
    var input = overlay.querySelector("input");
    var error = overlay.querySelector("." + CLASS + "__error");
    var submit = overlay.querySelector('[type="submit"]');
    input.value = meaningless(parts.base) ? "" : cleanName(parts.base).replace(/-+$/, "");
    document.body.appendChild(overlay);
    input.focus();
    input.select();

    function showError(text) {
      error.textContent = text;
      error.hidden = !text;
    }

    input.addEventListener("input", function () {
      var cleaned = cleanName(input.value);
      if (cleaned !== input.value) input.value = cleaned;
      showError("");
    });

    return new Promise(function (resolve) {
      function finish(result) {
        overlay.remove();
        if (thumb) URL.revokeObjectURL(thumb);
        resolve(result);
      }

      overlay.querySelector("[data-cancel]").addEventListener("click", function () { finish(null); });
      overlay.addEventListener("keydown", function (event) {
        if (event.key === "Escape") finish(null);
      });

      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var base = input.value.replace(/-+$/, "");
        if (!base) return showError("Please enter a name.");
        var fileName = base + parts.ext;
        submit.disabled = true;
        nameTaken(fileName).then(function (taken) {
          submit.disabled = false;
          if (taken) {
            showError("An image named " + fileName + " already exists. Please choose another name.");
            input.focus();
          } else {
            finish(fileName);
          }
        });
      });
    });
  }

  // ---- Upload button ----

  // Catches the file choice before Decap's handler, renames the file, and
  // hands it on as a new change event.
  document.addEventListener("change", function (event) {
    var input = event.target;
    if (!input.matches || !input.matches(".nc-fileUploadButton input[type=file]")) return;
    if (input.__tecNamed || !input.files || !input.files.length) return;
    event.stopImmediatePropagation();
    var file = input.files[0];
    askName(file).then(function (fileName) {
      if (!fileName) {
        input.value = "";
        return;
      }
      var data = new DataTransfer();
      data.items.add(new File([file], fileName, { type: file.type, lastModified: file.lastModified }));
      input.files = data.files;
      input.__tecNamed = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));
      input.__tecNamed = false;
    });
  }, true);

  // ---- Unused uploads ----

  function used(asset, raw) {
    var path = String(asset.path || "");
    if (path.indexOf(MEDIA_FOLDER + "/") !== 0) return true;
    var publicPath = PUBLIC_FOLDER + path.slice(MEDIA_FOLDER.length);
    return raw.indexOf(publicPath) >= 0 || raw.indexOf(encodeURI(publicPath)) >= 0;
  }

  function patch(backend) {
    var persistEntry = backend.persistEntry;
    backend.persistEntry = function (entry, options) {
      var raw = (entry.dataFiles || []).map(function (file) { return file.raw || ""; }).join("\n");
      var assets = (entry.assets || []).filter(function (asset) { return used(asset, raw); });
      return persistEntry.call(this, Object.assign({}, entry, { assets: assets }), options);
    };
  }

  var github = CMS.getBackend && CMS.getBackend("github");
  if (!github) return;
  var init = github.init;
  github.init = function () {
    var backend = init.apply(this, arguments);
    patch(backend);
    return backend;
  };
})();
