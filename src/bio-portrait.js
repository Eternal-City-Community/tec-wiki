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
