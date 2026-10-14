import { validateBiography, biographySlug, biographyWithExistingPortrait } from "./bio-validation.js";
import { verifyBiographyTurnstile, generateBiographyEditCode, storePendingBiographyCode, activateBiographyCode } from "./bio-turnstile.js";
import { biographyMarkdown } from "./bio-validation.js";
import { createBiographyFile } from "./bio-github.js";
import { readBiographyFile, updateBiographyFile } from "./bio-edit.js";
import { isBiographyAdministrator } from "./bio-admin.js";
import { hashBiographyEditCode } from "./bio-turnstile.js";
import { validatePortrait, publishPortrait } from "./bio-portrait.js";



async function biographyRateIdentity(request, secret) {
  // Do not store a raw IP address in coordinator storage.
  const ip = request.headers.get("CF-Connecting-IP");
  if (!ip || !secret || secret.length < 32) throw new Error("Rate identity unavailable");
  const bytes = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", bytes.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const result = await crypto.subtle.sign("HMAC", key, bytes.encode("bio-rate-v1:" + ip));
  return Array.from(new Uint8Array(result), byte => byte.toString(16).padStart(2, "0")).join("");
}

async function biographyCoordinatorCall(env, input) {
  if (!env.BIO_COORDINATOR) throw new Error("Biography coordinator binding missing");
  // A single Durable Object serializes claims across all biography slugs.
  const id = env.BIO_COORDINATOR.idFromName("biography-publication-v1");
  const stub = env.BIO_COORDINATOR.get(id);
  const response = await stub.fetch("https://internal.invalid/biography", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input)
  });
  if (!response.ok && ![403, 409, 429].includes(response.status)) throw new Error("Coordinator unavailable");
  return { statusCode: response.status, result: await response.json() };
}

async function biographyOwnerVerified(env, slug, code) {
  let hash;
  try { hash = await hashBiographyEditCode(code, env.BIO_EDIT_CODE_SECRET); }
  catch { return false; }
  const response = await biographyCoordinatorCall(env, {
    action: "owner_check", slug, hash, identity: "0".repeat(64), reservation: "0".repeat(64)
  });
  return response.result.status === "allowed";
}

async function handleBiographyPublish(request, env) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
  // Hard-coded launch gate: this branch must remain unreachable until an
  // integration test confirms successful publication and edit-code recovery.
  const PUBLIC_BIO_PUBLISHING_ENABLED = false;
  if (!PUBLIC_BIO_PUBLISHING_ENABLED) return jsonResponse({
    error: "Biography publishing is not enabled yet.", publication_enabled: false
  }, 503);

  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return jsonResponse({ error: "Expected JSON" }, 415);
  }
  const declaredSize = Number(request.headers.get("content-length") || 0);
  if (declaredSize > 60000) return jsonResponse({ error: "Submission too large" }, 413);
  if (!env.BIO_GITHUB_TOKEN || !env.BIO_EDIT_CODE_SECRET || !env.BIO_TURNSTILE_SECRET ||
      !env.BIO_EDIT_CODES || !env.BIO_COORDINATOR) {
    return jsonResponse({ error: "Publishing is not configured" }, 503);
  }

  let bio, slug, token;
  try {
    const raw = await request.text();
    if (raw.length > 60000) return jsonResponse({ error: "Submission too large" }, 413);
    const payload = JSON.parse(raw);
    bio = validateBiography(payload.biography);
    slug = biographySlug(bio.character_name);
    token = payload.turnstileToken;
  } catch {
    return jsonResponse({ error: "Invalid biography submission" }, 400);
  }

  // Verify the challenge before reserving a slug or consuming GitHub quota.
  const verified = await verifyBiographyTurnstile(
    token, request.headers.get("CF-Connecting-IP"), env.BIO_TURNSTILE_SECRET
  );
  if (!verified) return jsonResponse({ error: "Human verification failed" }, 403);

  let identity, reservation;
  try {
    identity = await biographyRateIdentity(request, env.BIO_EDIT_CODE_SECRET);
    reservation = generateBiographyEditCode();
    const reserved = await biographyCoordinatorCall(env, {
      action: "reserve", slug, identity, reservation
    });
    if (reserved.result.status === "limited") {
      return new Response(JSON.stringify({ error: "Too many submissions. Try again later." }), {
        status: 429, headers: { "content-type": "application/json", "cache-control": "no-store",
          "retry-after": String(reserved.result.retry_after || 3600) }
      });
    }
    if (reserved.result.status === "claimed") {
      return jsonResponse({ error: "A biography with this character name is already reserved." }, 409);
    }
    if (reserved.result.status !== "reserved") throw new Error("Reservation failed");
  } catch {
    return jsonResponse({ error: "Unable to reserve biography; please try again later." }, 503);
  }

  // The private code is generated server-side, never written to GitHub.
  const editCode = generateBiographyEditCode();
  try {
    await storePendingBiographyCode(env.BIO_EDIT_CODES, slug, editCode, env.BIO_EDIT_CODE_SECRET);
    const created = await createBiographyFile(env.BIO_GITHUB_TOKEN, slug, biographyMarkdown(bio));
    if (created.status !== "created") {
      await biographyCoordinatorCall(env, { action: "release", slug, identity, reservation });
      return jsonResponse({ error: "This character biography already exists." }, 409);
    }
    if (!/^[a-f0-9]{40}$/.test(created.commit || "")) {
      throw new Error("GitHub returned no commit identifier");
    }
    await activateBiographyCode(env.BIO_EDIT_CODES, slug, created.commit, editCode, env.BIO_EDIT_CODE_SECRET);
    const completed = await biographyCoordinatorCall(env, {
      action: "complete", slug, identity, reservation, commit: created.commit
    });
    if (completed.result.status !== "published") throw new Error("Unable to finalize publication");
    const hash = await hashBiographyEditCode(editCode, env.BIO_EDIT_CODE_SECRET);
    const owner = await biographyCoordinatorCall(env, {
      action: "owner_activate", slug, hash, identity, reservation
    });
    if (owner.result.status !== "active") throw new Error("Unable to activate authoritative owner record");
    return new Response(JSON.stringify({
      published: true, character_name: bio.character_name, slug,
      url: "/" + slug + "/", edit_code: editCode
    }), { status: 201, headers: { "content-type": "application/json", "cache-control": "no-store" } });
  } catch {
    // Never return the code on an ambiguous failure. Preserve the reservation
    // for administrator reconciliation rather than risking a second owner.
    return jsonResponse({
      error: "Publication could not be confirmed. Please contact a wiki administrator; do not resubmit."
    }, 503);
  }
}

// Ownership check and optimistic GitHub SHA comparison are mandatory.
// Editing remains gated until recovery and live validation are complete.
// Private biography retrieval; never expose page content or revision to a caller
// without a verified ownership code and a fresh challenge.
// Restricted recovery for biographies already registered with the submission system.
// A legacy biography without an existing ownership record cannot be claimed.
// Portraits are published only for an existing biography with a valid private code.
// Publication stays gated until the complete recovery flow has been tested.
async function handleBiographyPortrait(request, env) {
  const PORTRAIT_PUBLISHING_ENABLED = false;
  if (!PORTRAIT_PUBLISHING_ENABLED) return jsonResponse({ error: "Portrait publishing is not enabled yet" }, 503);
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return jsonResponse({ error: "Expected JSON" }, 415);
  let slug, code, token, image;
  try {
    const raw = await request.text();
    if (raw.length > 4500000) return jsonResponse({ error: "Portrait too large" }, 413);
    const input = JSON.parse(raw);
    slug = biographySlug(input.character_name);
    code = input.edit_code;
    token = input.turnstileToken;
    image = validatePortrait(input.base64, input.mime);
  } catch { return jsonResponse({ error: "Invalid portrait" }, 400); }
  if (!(await verifyBiographyTurnstile(token, request.headers.get("CF-Connecting-IP"), env.BIO_TURNSTILE_SECRET)))
    return jsonResponse({ error: "Human verification failed" }, 403);
  try {
    const identity = await biographyRateIdentity(request, env.BIO_EDIT_CODE_SECRET);
    const limit = await biographyCoordinatorCall(env, { action: "edit_attempt", slug, identity, reservation: "0".repeat(64) });
    if (limit.result.status === "limited") return jsonResponse({ error: "Too many attempts" }, 429);
    if (limit.result.status !== "allowed") throw new Error("Rate limit unavailable");
    if (!(await biographyOwnerVerified(env, slug, code)))
      return jsonResponse({ error: "Invalid editing credentials" }, 403);
    const file = await readBiographyFile(env.BIO_GITHUB_TOKEN, slug);
    if (!file) return jsonResponse({ error: "Biography not found" }, 404);
    const result = await publishPortrait(env.BIO_GITHUB_TOKEN, slug, image);
    if (result.status === "conflict") return jsonResponse({ error: "Portrait upload conflicted; retry later" }, 409);
    const bytes = Uint8Array.from(atob(file.content.replace(/\s/g, "")), x => x.charCodeAt(0));
    const markdown = new TextDecoder().decode(bytes);
    const portraitLine = "![Character portrait](" + result.path + ")";
    if (!markdown.includes(portraitLine)) {
      const updated = await updateBiographyFile(env.BIO_GITHUB_TOKEN, slug, markdown + "\n\n" + portraitLine + "\n", file.sha);
      if (updated.status !== "updated")
        return jsonResponse({ error: "Portrait saved but biography update conflicted; contact an administrator" }, 409);
    }
    return new Response(JSON.stringify({ published: true, path: result.path }), {
      headers: { "content-type": "application/json", "cache-control": "no-store" }
    });
  } catch { return jsonResponse({ error: "Unable to confirm portrait publication" }, 503); }
}

async function handleBiographyAdmin(request, env) {
  const ADMIN_RECOVERY_ENABLED = false;
  if (!ADMIN_RECOVERY_ENABLED) return jsonResponse({ error: "Biography recovery is not enabled yet" }, 503);
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return jsonResponse({ error: "Expected JSON" }, 415);
  let action, slug, token;
  try {
    const raw = await request.text();
    if (raw.length > 4096) return jsonResponse({ error: "Request too large" }, 413);
    const input = JSON.parse(raw);
    action = input.action;
    slug = biographySlug(input.character_name);
    token = input.github_token;
    if (!["reset", "revoke", "inspect"].includes(action)) throw new Error("Invalid action");
  } catch { return jsonResponse({ error: "Invalid recovery request" }, 400); }
  try {
    if (!(await isBiographyAdministrator(token)))
      return jsonResponse({ error: "GitHub organization owner access required" }, 403);
    const key = "bio-edit:" + slug;
    const record = await env.BIO_EDIT_CODES.get(key, "json");
    const file = await readBiographyFile(env.BIO_GITHUB_TOKEN, slug);
    if (!record || record.version !== 1 || !file)
      return jsonResponse({ error: "Not a registered player-managed biography" }, 404);
    if (action === "inspect")
      return new Response(JSON.stringify({ slug, status: record.status, page_exists: true }), {
        headers: { "content-type": "application/json", "cache-control": "no-store" }
      });
    if (record.status === "pending" && action === "revoke") return jsonResponse({ error: "Pending publication cannot be revoked before reconciliation" }, 409);
    if (action === "revoke") {
      const authoritative = await biographyCoordinatorCall(env, {
        action: "owner_revoke", slug, identity: "0".repeat(64), reservation: "0".repeat(64)
      });
      if (authoritative.result.status !== "revoked") throw new Error("Owner record unavailable");
      await env.BIO_EDIT_CODES.put(key, JSON.stringify({
        version: 1, status: "revoked", revoked_at: new Date().toISOString()
      }));
      return jsonResponse({ revoked: true }, 200);
    }
    const editCode = generateBiographyEditCode();
    const hash = await hashBiographyEditCode(editCode, env.BIO_EDIT_CODE_SECRET);
    const authoritative = await biographyCoordinatorCall(env, {
      action: record.status === "pending" ? "owner_reconcile" : "owner_reset", slug, hash, identity: "0".repeat(64), reservation: "0".repeat(64)
    });
    if (authoritative.result.status !== "active") throw new Error("Owner record unavailable");
    await env.BIO_EDIT_CODES.put(key, JSON.stringify({
      version: 1, status: "active", hash, reset_at: new Date().toISOString(),
      published_commit: record.published_commit || null
    }));
    return new Response(JSON.stringify({ reset: true, edit_code: editCode }), {
      headers: { "content-type": "application/json", "cache-control": "no-store" }
    });
  } catch { return jsonResponse({ error: "Unable to confirm recovery" }, 503); }
}

async function handleBiographyLoad(request, env) {
  const EDITING_ENABLED = false;
  if (!EDITING_ENABLED) return jsonResponse({ error: "Biography editing is not enabled yet" }, 503);
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return jsonResponse({ error: "Expected JSON" }, 415);
  let slug, code, challenge;
  try {
    const raw = await request.text();
    if (raw.length > 5000) return jsonResponse({ error: "Request too large" }, 413);
    const payload = JSON.parse(raw);
    slug = biographySlug(String(payload.character_name || ""));
    code = payload.edit_code;
    challenge = payload.turnstileToken;
  } catch { return jsonResponse({ error: "Invalid request" }, 400); }
  if (!(await verifyBiographyTurnstile(challenge, request.headers.get("CF-Connecting-IP"), env.BIO_TURNSTILE_SECRET)))
    return jsonResponse({ error: "Human verification failed" }, 403);
  try {
    const identity = await biographyRateIdentity(request, env.BIO_EDIT_CODE_SECRET);
    const limit = await biographyCoordinatorCall(env, { action: "edit_attempt", slug, identity, reservation: "0".repeat(64) });
    if (limit.result.status === "limited") return jsonResponse({ error: "Too many editing attempts" }, 429);
    if (limit.result.status !== "allowed") throw new Error("Rate limiting unavailable");
    if (!(await biographyOwnerVerified(env, slug, code)))
      return jsonResponse({ error: "Invalid biography editing credentials" }, 403);
    const file = await readBiographyFile(env.BIO_GITHUB_TOKEN, slug);
    if (!file) return jsonResponse({ error: "Biography not found" }, 404);
    return new Response(JSON.stringify({ slug, sha: file.sha, markdown_base64: file.content.replace(/\s/g, "") }), {
      headers: { "content-type": "application/json", "cache-control": "no-store" }
    });
  } catch { return jsonResponse({ error: "Unable to load biography" }, 503); }
}

async function handleBiographyEdit(request, env) {
  const EDITING_ENABLED = false;
  if (!EDITING_ENABLED) return jsonResponse({ error: "Biography editing is not enabled yet." }, 503);
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return jsonResponse({ error: "Expected JSON" }, 415);
  if (!env.BIO_EDIT_CODES || !env.BIO_EDIT_CODE_SECRET || !env.BIO_GITHUB_TOKEN)
    return jsonResponse({ error: "Editing is unavailable" }, 503);
  // Require a fresh human challenge for every edit attempt.
  // Never let unauthenticated callers probe edit codes without this check.
  let challenge;
  try {
    const length = Number(request.headers.get("content-length") || 0);
    if (length > 60000) return jsonResponse({ error: "Submission too large" }, 413);
  } catch { return jsonResponse({ error: "Invalid request" }, 400); }
  let bio, slug, code, expectedSha;
  try {
    const raw = await request.text();
    if (raw.length > 60000) return jsonResponse({ error: "Submission too large" }, 413);
    const input = JSON.parse(raw);
    bio = validateBiography(input.biography);
    slug = biographySlug(bio.character_name);
    code = input.edit_code;
    expectedSha = input.expected_sha;
    challenge = input.turnstileToken;
    if (!/^[a-f0-9]{40}$/.test(expectedSha || "")) throw new Error("Invalid revision");
  } catch { return jsonResponse({ error: "Invalid biography update" }, 400); }
  if (!(await verifyBiographyTurnstile(challenge, request.headers.get("CF-Connecting-IP"), env.BIO_TURNSTILE_SECRET)))
    return jsonResponse({ error: "Human verification failed" }, 403);
  try {
    const identity = await biographyRateIdentity(request, env.BIO_EDIT_CODE_SECRET);
    const result = await biographyCoordinatorCall(env, {
      action: "edit_attempt", slug, identity, reservation: "0".repeat(64)
    });
    if (result.result.status === "limited")
      return jsonResponse({ error: "Too many editing attempts; try again later." }, 429);
    if (result.result.status !== "allowed") throw new Error("Rate limit unavailable");
  } catch {
    return jsonResponse({ error: "Editing attempt limit unavailable" }, 503);
  }
  try {
    if (!(await biographyOwnerVerified(env, slug, code)))
      return jsonResponse({ error: "Invalid biography editing credentials" }, 403);
    const existing = await readBiographyFile(env.BIO_GITHUB_TOKEN, slug);
    if (!existing) return jsonResponse({ error: "Biography not found" }, 404);
    if (existing.sha !== expectedSha)
      return jsonResponse({ error: "Biography changed; reload before saving" }, 409);
    const original = new TextDecoder().decode(Uint8Array.from(
      atob(existing.content.replace(/\\s/g, "")), x => x.charCodeAt(0)
    ));
    const markdown = biographyWithExistingPortrait(bio, original, slug);
    const result = await updateBiographyFile(env.BIO_GITHUB_TOKEN, slug, markdown, existing.sha);
    if (result.status !== "updated") return jsonResponse({ error: "Biography changed; reload before saving" }, 409);
    return new Response(JSON.stringify({ updated: true, commit: result.commit }), {
      headers: { "content-type": "application/json", "cache-control": "no-store" }
    });
  } catch { return jsonResponse({ error: "Unable to confirm biography update" }, 503); }
}

async function handleBiographyPreflight(request, env) {
  if (request.method !== "POST") return new Response(JSON.stringify({error:"Method not allowed"}), {status:405,headers:{"content-type":"application/json","cache-control":"no-store"}});
  if (!request.headers.get("content-type")?.startsWith("application/json")) return jsonResponse({error:"Expected JSON"},415);
  const length=Number(request.headers.get("content-length") || 0);
  if (length>60000) return jsonResponse({error:"Submission too large"},413);
  let payload;
  try {
    const raw=await request.text();
    if(raw.length>60000) return jsonResponse({error:"Submission too large"},413);
    payload=JSON.parse(raw);
    const bio=validateBiography(payload.biography);
    const slug=biographySlug(bio.character_name);
    const verified=await verifyBiographyTurnstile(payload.turnstileToken,request.headers.get("CF-Connecting-IP"),env.BIO_TURNSTILE_SECRET);
    if(!verified) return jsonResponse({error:"Human verification failed"},403);
    return new Response(JSON.stringify({valid:true,slug,publication_enabled:false}),{headers:{"content-type":"application/json","cache-control":"no-store"}});
  } catch {
    return jsonResponse({error:"Invalid biography submission"},400);
  }
}


async function handleBiographyStorageCheck(request, env) {
  // This route never writes to KV or GitHub; it checks only server configuration.
  if (request.method !== "GET") return jsonResponse({ error: "Method not allowed" }, 405);
  const checks = {
    kv_binding: Boolean(env.BIO_EDIT_CODES),
    coordinator_binding: Boolean(env.BIO_COORDINATOR),
    editing_code_secret: Boolean(env.BIO_EDIT_CODE_SECRET),
    github_publisher_secret: Boolean(env.BIO_GITHUB_TOKEN),
    turnstile_secret: Boolean(env.BIO_TURNSTILE_SECRET)
  };
  const ready = Object.values(checks).every(Boolean);
  return new Response(JSON.stringify({ ready, checks, publication_enabled: false, editing_enabled: false, portrait_enabled: false, admin_recovery_enabled: false }), {
    status: ready ? 200 : 503,
    headers: { "content-type": "application/json", "cache-control": "no-store" }
  });
}

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
    scope: "public_repo user read:org",
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


const REPO = "Eternal-City-Community/tec-wiki";

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


// Durable Object for serializing biography publication requests.
// No public write operations are enabled until the publishing flow is tested.
export class BiographyCoordinator {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.sql = state.storage.sql;
    this.sql.exec("CREATE TABLE IF NOT EXISTS bio_limits (identity TEXT PRIMARY KEY, window_start INTEGER NOT NULL, attempts INTEGER NOT NULL)");
    this.sql.exec("CREATE TABLE IF NOT EXISTS bio_claims (slug TEXT PRIMARY KEY, status TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)");
    this.sql.exec("CREATE TABLE IF NOT EXISTS bio_owner_state (slug TEXT PRIMARY KEY, status TEXT NOT NULL, hash TEXT NOT NULL, updated_at INTEGER NOT NULL)");
    this.sql.exec("CREATE TABLE IF NOT EXISTS bio_edit_limits (identity TEXT NOT NULL, slug TEXT NOT NULL, window_start INTEGER NOT NULL, attempts INTEGER NOT NULL, PRIMARY KEY(identity, slug))");
    // New columns are additive so existing Durable Objects can migrate safely.
    const columns = this.sql.exec("PRAGMA table_info(bio_claims)").toArray().map(row => row.name);
    if (!columns.includes("reservation")) this.sql.exec("ALTER TABLE bio_claims ADD COLUMN reservation TEXT");
    if (!columns.includes("commit_sha")) this.sql.exec("ALTER TABLE bio_claims ADD COLUMN commit_sha TEXT");
  }

  async fetch(request) {
    if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
    if (!this.env.BIO_EDIT_CODE_SECRET || !request.headers.get("content-type")?.startsWith("application/json")) {
      return jsonResponse({ error: "Coordinator unavailable" }, 503);
    }
    let input;
    try {
      const raw = await request.text();
      if (raw.length > 2048) return jsonResponse({ error: "Request too large" }, 413);
      input = JSON.parse(raw);
    } catch { return jsonResponse({ error: "Invalid request" }, 400); }
    if (!input || !["reserve", "complete", "release", "inspect", "edit_attempt", "owner_activate", "owner_check", "owner_reset", "owner_revoke", "owner_status", "owner_reconcile"].includes(input.action) ||
        !/^bio_[a-z0-9]+(?:_[a-z0-9]+)*$/.test(input.slug || "") || input.slug.length > 74 ||
        !/^[a-f0-9]{64}$/.test(input.identity || "") ||
        !/^[a-f0-9]{64}$/.test(input.reservation || "")) {
      return jsonResponse({ error: "Invalid coordinator request" }, 400);
    }
    const now = Date.now(), hour = 3600000, ttl = 15 * 60000;
    const outcome = await this.state.storage.transaction(async () => {
      if (input.action.startsWith("owner_")) {
        const owner = this.sql.exec("SELECT status, hash FROM bio_owner_state WHERE slug = ?", input.slug).toArray()[0];
        if (input.action === "owner_status") return { status: owner?.status || "missing" };
        if (input.action === "owner_check") {
          if (!owner || owner.status !== "active" || !/^[a-f0-9]{64}$/.test(input.hash || ""))
            return { status: "denied" };
          let diff = 0;
          for (let j = 0; j < 64; j++) diff |= owner.hash.charCodeAt(j) ^ input.hash.charCodeAt(j);
          return { status: diff === 0 ? "allowed" : "denied" };
        }
        if (input.action === "owner_reconcile") {
          const claim = this.sql.exec("SELECT status, updated_at FROM bio_claims WHERE slug = ?", input.slug).toArray()[0];
          if (!claim || !["reserved", "review"].includes(claim.status) ||
              now - claim.updated_at < 15 * 60000 || owner ||
              !/^[a-f0-9]{64}$/.test(input.hash || "")) return { status: "denied" };
          this.sql.exec("UPDATE bio_claims SET status = 'published', updated_at = ? WHERE slug = ?", now, input.slug);
          this.sql.exec("INSERT INTO bio_owner_state (slug, status, hash, updated_at) VALUES (?, 'active', ?, ?)", input.slug, input.hash, now);
          return { status: "active" };
        }
        if (input.action === "owner_activate") {
          const claim = this.sql.exec("SELECT status, reservation FROM bio_claims WHERE slug = ?", input.slug).toArray()[0];
          if (!claim || claim.status !== "published" || claim.reservation !== input.reservation ||
              owner || !/^[a-f0-9]{64}$/.test(input.hash || "")) return { status: "denied" };
          this.sql.exec("INSERT INTO bio_owner_state (slug, status, hash, updated_at) VALUES (?, 'active', ?, ?)", input.slug, input.hash, now);
          return { status: "active" };
        }
        const claim = this.sql.exec("SELECT status FROM bio_claims WHERE slug = ?", input.slug).toArray()[0];
        if (!claim || claim.status !== "published") return { status: "denied" };
        if (!owner && input.action !== "owner_reset") return { status: "denied" };
        if (input.action === "owner_revoke") {
          this.sql.exec("UPDATE bio_owner_state SET status = 'revoked', updated_at = ? WHERE slug = ?", now, input.slug);
          return { status: "revoked" };
        }
        if (input.action === "owner_reset") {
          if (!/^[a-f0-9]{64}$/.test(input.hash || "")) return { status: "denied" };
          if (!owner) this.sql.exec("INSERT INTO bio_owner_state (slug, status, hash, updated_at) VALUES (?, 'active', ?, ?)", input.slug, input.hash, now);
          else this.sql.exec("UPDATE bio_owner_state SET status = 'active', hash = ?, updated_at = ? WHERE slug = ?", input.hash, now, input.slug);
          return { status: "active" };
        }
      }
      if (input.action === "edit_attempt") {
        const previous = this.sql.exec("SELECT window_start, attempts FROM bio_edit_limits WHERE identity = ? AND slug = ?", input.identity, input.slug).toArray()[0];
        const start = previous && now >= previous.window_start && now - previous.window_start < hour ? previous.window_start : now;
        const attempts = previous && start === previous.window_start ? previous.attempts + 1 : 1;
        this.sql.exec("INSERT INTO bio_edit_limits (identity, slug, window_start, attempts) VALUES (?, ?, ?, ?) ON CONFLICT(identity, slug) DO UPDATE SET window_start=excluded.window_start, attempts=excluded.attempts", input.identity, input.slug, start, attempts);
        return attempts > 10 ? { status: "limited", retry_after: Math.max(1, Math.ceil((start + hour - now) / 1000)) } : { status: "allowed" };
      }
      if (input.action === "reserve") {
        const previous = this.sql.exec("SELECT window_start, attempts FROM bio_limits WHERE identity = ?", input.identity).toArray()[0];
        const start = previous && now - previous.window_start < hour ? previous.window_start : now;
        const count = previous && start === previous.window_start ? previous.attempts + 1 : 1;
        this.sql.exec("INSERT INTO bio_limits (identity, window_start, attempts) VALUES (?, ?, ?) ON CONFLICT(identity) DO UPDATE SET window_start=excluded.window_start, attempts=excluded.attempts", input.identity, start, count);
        if (count > 5) return { status: "limited", retry_after: Math.max(1, Math.ceil((start + hour - now) / 1000)) };
      }
      const existing = this.sql.exec("SELECT status, reservation, updated_at, commit_sha FROM bio_claims WHERE slug = ?", input.slug).toArray()[0];
      if (input.action === "inspect") return { status: existing?.status || "missing" };
      if (input.action === "reserve") {
        // Expired reservations are deliberately NOT recycled: an in-flight
        // GitHub create may have succeeded before its response was lost.
        if (existing) return { status: "claimed", state: existing.status };
        this.sql.exec("INSERT INTO bio_claims (slug, status, created_at, updated_at, reservation) VALUES (?, 'reserved', ?, ?, ?)", input.slug, now, now, input.reservation);
        return { status: "reserved", expires_at: now + ttl };
      }
      if (!existing || existing.reservation !== input.reservation) return { status: "denied" };
      if (input.action === "complete") {
        if (!/^[a-f0-9]{40}$/.test(input.commit || "")) return { status: "invalid" };
        if (existing.status === "published" && existing.commit_sha === input.commit) return { status: "published" };
        if (existing.status !== "reserved") return { status: "denied" };
        this.sql.exec("UPDATE bio_claims SET status = 'published', commit_sha = ?, updated_at = ? WHERE slug = ?", input.commit, now, input.slug);
        return { status: "published" };
      }
      if (input.action === "release") {
        // Release only after an authoritative check confirms GitHub did not
        // create the page; the caller must not assume network errors mean failure.
        if (existing.status !== "reserved") return { status: "denied" };
        this.sql.exec("UPDATE bio_claims SET status = 'review', updated_at = ? WHERE slug = ?", now, input.slug);
        return { status: "review" };
      }
      return { status: "invalid" };
    });
    const code = outcome.status === "limited" ? 429 : outcome.status === "claimed" ? 409 :
      ["denied", "invalid"].includes(outcome.status) ? 403 : 200;
    return jsonResponse(outcome, code);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/auth") return handleAuth(request);
    if (url.pathname === "/callback") return handleCallback(request, env);
    if (url.pathname === "/api/bio/configuration") return handleBiographyStorageCheck(request, env);
    if (url.pathname === "/api/bio/publish") return handleBiographyPublish(request, env);
    if (url.pathname === "/api/bio/edit") return handleBiographyEdit(request, env);
    if (url.pathname === "/api/bio/load") return handleBiographyLoad(request, env);
    if (url.pathname === "/api/bio/admin") return handleBiographyAdmin(request, env);
    if (url.pathname === "/api/bio/portrait") return handleBiographyPortrait(request, env);
    if (url.pathname === "/api/bio/preflight") return handleBiographyPreflight(request, env);
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
