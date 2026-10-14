// Ownership-checked biography updates. The caller must authenticate the owner first.
import { biographyFileExists } from "./bio-github.js";

const repo = "Eternal-City-Community/tec-wiki";
const api = "https://api.github.com/repos/" + repo + "/contents/docs/";
function path(slug) {
  if (typeof slug !== "string" || !/^bio_[a-z0-9]+(?:_[a-z0-9]+)*$/.test(slug) || slug.length > 74)
    throw new Error("Invalid biography slug");
  return slug + ".md";
}
function headers(token) {
  if (!token) throw new Error("Publisher token unavailable");
  return { authorization: "Bearer " + token, accept: "application/vnd.github+json", "user-agent": "TEC-Wiki" };
}
function encode(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}
export async function readBiographyFile(token, slug) {
  const response = await fetch(api + path(slug) + "?ref=main", { headers: headers(token) });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Unable to read biography");
  const file = await response.json();
  if (!/^[a-f0-9]{40}$/.test(file.sha || "") || typeof file.content !== "string")
    throw new Error("Unexpected GitHub biography response");
  return { sha: file.sha, content: file.content };
}
export async function updateBiographyFile(token, slug, markdown, expectedSha) {
  path(slug);
  if (typeof markdown !== "string" || markdown.length > 70000 ||
      !/^[a-f0-9]{40}$/.test(expectedSha || "")) throw new Error("Invalid biography update");
  const response = await fetch(api + path(slug), {
    method: "PUT",
    headers: { ...headers(token), "content-type": "application/json" },
    body: JSON.stringify({
      message: "Update character biography " + slug,
      content: encode(markdown), sha: expectedSha, branch: "main"
    })
  });
  if (response.status === 409 || response.status === 422) return { status: "conflict" };
  if (!response.ok) throw new Error("Biography update failed");
  const data = await response.json();
  if (!/^[a-f0-9]{40}$/.test(data.commit?.sha || "")) throw new Error("Missing GitHub commit");
  return { status: "updated", commit: data.commit.sha };
}
