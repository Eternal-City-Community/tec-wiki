// Strictly validate portrait bytes and only write to a slug-derived GitHub path.
const ROOT = "https://api.github.com/repos/Eternal-City-Community/tec-wiki/contents/docs/assets/uploads/";
const MAX_BYTES = 3 * 1024 * 1024;
const types = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" };
export function validatePortrait(base64, mime) {
  if (typeof base64 !== "string" || !/^[A-Za-z0-9+/]+={0,2}$/.test(base64) ||
      base64.length > Math.ceil(MAX_BYTES / 3) * 4 + 4 || !types[mime])
    throw new Error("Invalid portrait encoding or image type");
  const binary = atob(base64);
  if (!binary.length || binary.length > MAX_BYTES) throw new Error("Portrait exceeds size limit");
  const bytes = Uint8Array.from(binary, x => x.charCodeAt(0));
  const png = bytes.length >= 24 && [137,80,78,71,13,10,26,10].every((b,i) => bytes[i] === b);
  const jpeg = bytes.length >= 4 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  const webp = bytes.length >= 12 && String.fromCharCode(...bytes.slice(0,4)) === "RIFF" &&
    String.fromCharCode(...bytes.slice(8,12)) === "WEBP";
  if (!(mime === "image/png" && png || mime === "image/jpeg" && jpeg || mime === "image/webp" && webp))
    throw new Error("Portrait file does not match its declared type");
  return { extension: types[mime], base64 };
}
export async function publishPortrait(token, slug, image) {
  if (!/^bio_[a-z0-9]+(?:_[a-z0-9]+)*$/.test(slug) || slug.length > 74)
    throw new Error("Invalid biography slug");
  const file = slug + "." + image.extension;
  const headers = { authorization: "Bearer " + token, accept: "application/vnd.github+json",
    "content-type": "application/json", "user-agent": "TEC-Wiki" };
  const url = ROOT + file;
  const existing = await fetch(url + "?ref=main", { headers });
  let existingSha = null;
  if (existing.status !== 404) {
    if (!existing.ok) throw new Error("Unable to inspect portrait");
    const previous = await existing.json();
    if (!/^[a-f0-9]{40}$/.test(previous.sha || "")) throw new Error("Invalid existing portrait revision");
    existingSha = previous.sha;
  }
  const response = await fetch(url, {
    method: "PUT", headers,
    body: JSON.stringify({ message: "Add character portrait " + slug, content: image.base64, branch: "main", ...(existingSha ? { sha: existingSha } : {}) })
  });
  if (response.status === 409 || response.status === 422) return { status: "conflict" };
  if (response.status !== (existingSha ? 200 : 201)) throw new Error("Unable to publish portrait");
  return { status: existingSha ? "updated" : "created", path: "/assets/uploads/" + file };
}

/**
 * Commit portrait and biography reference together. A rejected ref update
 * leaves no image file on main (unreferenced Git objects are harmless).
 * The caller must verify the owner's editing code before invoking this.
 */
export async function publishPortraitAtomic(token, slug, image, originalMarkdown, expectedSha) {
  if (!/^bio_[a-z0-9]+(?:_[a-z0-9]+)*$/.test(slug) || slug.length > 74 ||
      !/^[a-f0-9]{40}$/.test(expectedSha || "") ||
      typeof originalMarkdown !== "string") throw new Error("Invalid portrait update");
  const { biographyWithUploadedPortrait } = await import("./bio-validation.js");
  const path = "docs/assets/uploads/" + slug + "." + image.extension;
  const publicPath = "/assets/uploads/" + slug + "." + image.extension;
  const markdown = biographyWithUploadedPortrait(originalMarkdown, slug, publicPath);
  const headers = { authorization: "Bearer " + token, accept: "application/vnd.github+json",
    "content-type": "application/json", "user-agent": "TEC-Wiki" };
  const repoApi = "https://api.github.com/repos/Eternal-City-Community/tec-wiki/";
  async function request(method, endpoint, body) {
    const response = await fetch(repoApi + endpoint, {
      method, headers, ...(body === undefined ? {} : { body: JSON.stringify(body) })
    });
    if (!response.ok) {
      if (response.status === 409 || response.status === 422) return null;
      throw new Error("GitHub portrait transaction failed");
    }
    return response.json();
  }
  // Snapshot main, and ensure the biography revision has not changed.
  const ref = await request("GET", "git/ref/heads/main");
  const head = ref?.object?.sha;
  if (!/^[a-f0-9]{40}$/.test(head || "")) throw new Error("Unable to read main");
  const existing = await request("GET", "contents/docs/" + slug + ".md?ref=" + head);
  if (!existing || existing.sha !== expectedSha) return { status: "conflict" };
  const commit = await request("GET", "git/commits/" + head);
  if (!commit?.tree?.sha) throw new Error("Unable to read repository tree");
  const blob = await request("POST", "git/blobs", { content: image.base64, encoding: "base64" });
  if (!blob?.sha) throw new Error("Unable to stage portrait");
  const entries = [
    { path, mode: "100644", type: "blob", sha: blob.sha },
    { path: "docs/" + slug + ".md", mode: "100644", type: "blob", content: markdown }
  ];
  // Remove the old image if its extension changed, in the SAME commit.
  const old = originalMarkdown.match(/^!\[Character portrait\]\(\/assets\/uploads\/(bio_[a-z0-9_]+\.(?:png|jpg|webp))\)$/m);
  if (old && old[1].startsWith(slug + ".") && old[1] !== slug + "." + image.extension) {
    const oldPath = "docs/assets/uploads/" + old[1];
    const oldFile = await request("GET", "contents/" + oldPath + "?ref=" + head);
    if (oldFile?.sha) entries.push({ path: oldPath, mode: "100644", type: "blob", sha: null });
  }
  const tree = await request("POST", "git/trees", { base_tree: commit.tree.sha, tree: entries });
  if (!tree?.sha) return { status: "conflict" };
  const next = await request("POST", "git/commits", {
    message: "Update character portrait " + slug, tree: tree.sha, parents: [head]
  });
  if (!next?.sha) return { status: "conflict" };
  // Non-force update: concurrent commits cannot be silently overwritten.
  const updated = await request("PATCH", "git/refs/heads/main", { sha: next.sha, force: false });
  if (!updated) return { status: "conflict" };
  return { status: "updated", path: publicPath, commit: next.sha };
}
