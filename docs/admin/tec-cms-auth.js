// Makes GitHub login go straight to the editor.
//
// Decap asks GitHub who the user is right after login. A brand-new token can
// briefly get 401 "Bad credentials", and Decap caches that failed answer: it
// then treats a maintainer as an outsider and shows its "Open Authoring is
// enabled: we need to use a fork" page (a reload worked because the token was
// valid by then). Here those lookups retry instead of caching a failure, and
// the fork prompt is skipped: editors without write access get their fork
// made silently, as Decap would after they clicked "Fork the repo".
(function () {
  if (!window.CMS || !CMS.getBackend) return;
  var github = CMS.getBackend("github");
  if (!github) return;

  var ATTEMPTS = 6;
  var FRESH_LOGIN_MS = 60000;
  var loginAt = 0;

  // The login popup reports a new token with this message. Only that token
  // may still be unknown to GitHub; a saved login that gets 401 has expired
  // or been revoked, so it fails at once and the Log In button shows.
  window.addEventListener("message", function (event) {
    if (typeof event.data === "string" && event.data.indexOf("authorization:github:success") === 0) {
      loginAt = Date.now();
    }
  });

  function freshLogin() {
    return Date.now() - loginAt < FRESH_LOGIN_MS;
  }

  function wait(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  // Retries while GitHub has not yet accepted a new token (401) or errors.
  function fetchJson(url, auth, attempt) {
    attempt = attempt || 1;
    return fetch(url, { headers: { Authorization: auth } })
      .then(function (res) {
        if (((res.status === 401 && freshLogin()) || res.status >= 500) && attempt < ATTEMPTS) {
          throw new Error("retry");
        }
        return res.json().then(function (body) { return { status: res.status, body: body }; });
      })
      .catch(function (err) {
        if (attempt >= ATTEMPTS) throw err;
        return wait(500 * attempt).then(function () { return fetchJson(url, auth, attempt + 1); });
      });
  }

  function authHeader(backend, token) {
    return (backend.tokenKeyword || "token") + " " + token;
  }

  function patch(backend) {
    backend.currentUser = function (args) {
      var self = this;
      if (!self._currentUserPromise) {
        self._currentUserPromise = fetchJson(self.apiRoot + "/user", authHeader(self, args.token)).then(function (r) {
          if (!r.body || !r.body.login) throw new Error("Could not read your GitHub account. Please try again.");
          return Object.assign({}, r.body, { name: r.body.name || "Unknown" });
        });
        self._currentUserPromise.catch(function () { self._currentUserPromise = null; });
      }
      return self._currentUserPromise;
    };

    backend.userIsOriginMaintainer = function (args) {
      var self = this;
      var token = args.token;
      var username = args.username;
      var userPromise = username ? Promise.resolve({ login: username }) : self.currentUser({ token: token });
      return userPromise.then(function (user) {
        var url = self.apiRoot + "/repos/" + self.originRepo + "/collaborators/" +
          encodeURIComponent(user.login) + "/permission";
        return fetchJson(url, authHeader(self, token)).then(function (r) {
          var permission = r.body && r.body.permission;
          return permission === "admin" || permission === "write";
        });
      });
    };

    var authenticateWithFork = backend.authenticateWithFork;
    backend.authenticateWithFork = function (args) {
      return authenticateWithFork.call(this, {
        userData: args.userData,
        getPermissionToFork: function () { return true; }
      });
    };
  }

  var init = github.init;
  github.init = function () {
    var backend = init.apply(this, arguments);
    patch(backend);
    return backend;
  };
})();
