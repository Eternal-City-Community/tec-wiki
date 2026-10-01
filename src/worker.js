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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/auth") return handleAuth(request);
    if (url.pathname === "/callback") return handleCallback(request, env);
    return env.ASSETS.fetch(request);
  },
};
