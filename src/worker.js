const CLIENT_ID = "Ov23lic8smpqjOHteIwJ";
const CALLBACK_PATH = "/callback";

function htmlResponse(body, status = 200, headers = {}) {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "no-store",
      ...headers,
    },
  });
}

function parseCookies(request) {
  const raw = request.headers.get("cookie") || "";
  const out = {};
  raw.split(";").forEach((part) => {
    const idx = part.indexOf("=");
    if (idx < 0) return;
    out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
  });
  return out;
}

function randomState() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function callbackHtml(status, content) {
  const statusJson = JSON.stringify(status);
  const contentJson = JSON.stringify(content).replace(/</g, "\\u003c");
  return "<!doctype html><html><head><meta charset=\"utf-8\"><title>GitHub authorization</title></head><body>" +
    "<script>(function(){const status=" + statusJson + ";const content=" + contentJson + ";" +
    "function receiveMessage(message){if(!window.opener)return;window.opener.postMessage(" +
    "\"authorization:github:\"+status+\":\"+JSON.stringify(content),message.origin);" +
    "window.removeEventListener(\"message\",receiveMessage,false);window.close();}" +
    "window.addEventListener(\"message\",receiveMessage,false);" +
    "if(window.opener){window.opener.postMessage(\"authorizing:github\",\"*\");}" +
    "else{document.body.textContent=\"Authorization finished. You can close this window.\";}})();</script>" +
    "</body></html>";
}

async function handleAuth(request) {
  const url = new URL(request.url);
  const state = randomState();
  const callback = url.origin + CALLBACK_PATH;
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: callback,
    scope: "public_repo user",
    state,
  });
  return new Response(null, {
    status: 302,
    headers: {
      location: "https://github.com/login/oauth/authorize?" + params.toString(),
      "set-cookie": "tec_oauth_state=" + encodeURIComponent(state) + "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600",
      "cache-control": "no-store",
    },
  });
}

async function handleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");
  const cookies = parseCookies(request);
  const expectedState = cookies.tec_oauth_state;

  if (oauthError) {
    return htmlResponse(callbackHtml("error", {
      message: url.searchParams.get("error_description") || oauthError,
    }));
  }

  if (!code || !state || !expectedState || state !== expectedState) {
    return htmlResponse(callbackHtml("error", {
      message: "OAuth state validation failed. Please close this window and try again.",
    }), 400);
  }

  if (!env.GITHUB_CLIENT_SECRET) {
    return htmlResponse(callbackHtml("error", {
      message: "GitHub OAuth is not fully configured on the wiki yet.",
    }), 500);
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "user-agent": "tec-wiki-oauth",
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: url.origin + CALLBACK_PATH,
      state,
    }),
  });

  const token = await tokenResponse.json();
  if (!tokenResponse.ok || !token.access_token) {
    return htmlResponse(callbackHtml("error", {
      message: token.error_description || token.error || "GitHub token exchange failed.",
    }), 500);
  }

  return htmlResponse(callbackHtml("success", {
    token: token.access_token,
    provider: "github",
  }), 200, {
    "set-cookie": "tec_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
  });
}


const REPO = "herdias/tec-wiki";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "cache-control": status === 200 ? "public, max-age=60" : "no-store",
    },
  });
}

function validPageSlug(value) {
  return /^[a-zA-Z0-9_-]+$/.test(value || "");
}

async function githubJson(url) {
  const response = await fetch(url, {
    headers: {
      "accept": "application/vnd.github+json",
      "user-agent": "tec-wiki-history",
      "x-github-api-version": "2022-11-28",
    },
  });
  if (!response.ok) {
    throw new Error("GitHub request failed with status " + response.status);
  }
  return response.json();
}

async function handlePageHistory(request) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "index";
  if (!validPageSlug(page)) return jsonResponse({ error: "Invalid page." }, 400);

  try {
    const filePath = "docs/" + page + ".md";
    const commits = await githubJson(
      "https://api.github.com/repos/" + REPO + "/commits?path=" +
      encodeURIComponent(filePath) + "&per_page=50"
    );

    return jsonResponse({
      page,
      revisions: commits.map((item) => ({
        sha: item.sha,
        short_sha: item.sha.slice(0, 7),
        message: (item.commit && item.commit.message ? item.commit.message.split("\n")[0] : "Page update"),
        author: (item.commit && item.commit.author && item.commit.author.name) || "Unknown editor",
        date: item.commit && item.commit.author ? item.commit.author.date : null,
      })),
    });
  } catch (error) {
    return jsonResponse({ error: "Could not load page history." }, 502);
  }
}

async function handlePageVersion(request) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "index";
  const sha = url.searchParams.get("sha") || "";
  if (!validPageSlug(page) || !/^[0-9a-f]{7,40}$/i.test(sha)) {
    return jsonResponse({ error: "Invalid page or revision." }, 400);
  }

  try {
    const rawUrl = "https://raw.githubusercontent.com/" + REPO + "/" + sha + "/docs/" + page + ".md";
    const response = await fetch(rawUrl, {
      headers: { "user-agent": "tec-wiki-history" },
    });
    if (!response.ok) throw new Error("Version not found");
    return new Response(await response.text(), {
      headers: {
        "content-type": "text/plain; charset=UTF-8",
        "cache-control": "public, max-age=300",
      },
    });
  } catch (error) {
    return jsonResponse({ error: "Could not load that page version." }, 502);
  }
}

async function handlePageDiff(request) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "index";
  const sha = url.searchParams.get("sha") || "";
  if (!validPageSlug(page) || !/^[0-9a-f]{7,40}$/i.test(sha)) {
    return jsonResponse({ error: "Invalid page or revision." }, 400);
  }

  try {
    const commit = await githubJson(
      "https://api.github.com/repos/" + REPO + "/commits/" + sha
    );
    const wanted = "docs/" + page + ".md";
    const file = (commit.files || []).find((item) => item.filename === wanted);
    return jsonResponse({
      sha,
      message: commit.commit && commit.commit.message ? commit.commit.message.split("\n")[0] : "Page update",
      author: commit.commit && commit.commit.author ? commit.commit.author.name : "Unknown editor",
      date: commit.commit && commit.commit.author ? commit.commit.author.date : null,
      status: file ? file.status : null,
      additions: file ? file.additions : 0,
      deletions: file ? file.deletions : 0,
      patch: file && file.patch ? file.patch : "No line-by-line diff is available for this revision.",
    });
  } catch (error) {
    return jsonResponse({ error: "Could not load revision changes." }, 502);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/auth") return handleAuth(request);
    if (url.pathname === "/callback") return handleCallback(request, env);
    if (url.pathname === "/api/page-history") return handlePageHistory(request);
    if (url.pathname === "/api/page-version") return handlePageVersion(request);
    if (url.pathname === "/api/page-diff") return handlePageDiff(request);

    if (url.pathname === "/admin/config.yml") {
      const asset = await env.ASSETS.fetch(request);
      const headers = new Headers(asset.headers);
      headers.set("cache-control", "no-store, no-cache, must-revalidate");
      headers.set("pragma", "no-cache");
      headers.set("expires", "0");
      return new Response(asset.body, {
        status: asset.status,
        statusText: asset.statusText,
        headers,
      });
    }

    return env.ASSETS.fetch(request);
  },
};
