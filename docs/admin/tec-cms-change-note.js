// "Change note" field: an optional sentence about this save. It becomes the
// commit message, so it shows in Page History and What's New, and it is never
// written into the page file. Left empty, Decap's own message is used.
//
// The note lives here rather than in the entry: Decap keeps entry data after
// a save, so a stored note would be reused by the next save. Typing a note
// therefore does not by itself enable Save; it goes with the next content save
// and is cleared once that save succeeds.
(function () {
  if (!window.CMS) return;
  var FIELD = "change_note";
  var MAX_LENGTH = 120;
  var note = "";
  var listeners = [];

  function setNote(value) {
    note = value;
    listeners.forEach(function (fn) { fn(); });
  }

  // ---- Field ----

  var Control = createClass({
    componentDidMount: function () {
      this.refresh = this.forceUpdate.bind(this, undefined);
      listeners.push(this.refresh);
    },

    componentWillUnmount: function () {
      var refresh = this.refresh;
      listeners = listeners.filter(function (fn) { return fn !== refresh; });
      // Leaving the entry discards an unsaved note.
      note = "";
    },

    render: function () {
      var props = this.props;
      return h("input", {
        id: props.forID,
        type: "text",
        className: props.classNameWrapper,
        value: note,
        maxLength: MAX_LENGTH,
        placeholder: "e.g. Fixed trainer directions",
        onChange: function (event) { setNote(event.target.value); },
        onFocus: props.setActiveStyle,
        onBlur: props.setInactiveStyle
      });
    }
  });

  CMS.registerWidget("tec-change-note", Control, function () { return null; });

  // Never save the field into the page's front matter.
  CMS.registerEventListener({
    name: "preSave",
    handler: function (args) {
      var data = args.entry.get("data");
      return data.has(FIELD) ? data.delete(FIELD) : data;
    }
  });

  // ---- Commit message ----

  function patch(backend) {
    var persistEntry = backend.persistEntry;
    backend.persistEntry = function (entry, options) {
      var text = note.replace(/\s+/g, " ").trim();
      if (text) options = Object.assign({}, options, { commitMessage: text });
      return persistEntry.call(this, entry, options).then(function (result) {
        if (text && note.replace(/\s+/g, " ").trim() === text) setNote("");
        return result;
      });
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
