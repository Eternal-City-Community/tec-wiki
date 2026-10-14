// Restricted helper for new biography pages; never pass client-supplied paths.
const root = "https://api.github.com/repos/Eternal-City-Community/tec-wiki/contents/docs/";
function filename(slug) {
  if (!/^bio_[a-z0-9]+(?:_[a-z0-9]+)*$/.test(slug) || slug.length > 74) throw new Error("Invalid biography slug");
  return slug + ".md";
}
function auth(token) {
  if (!token) throw new Error("Missing publisher credential");
  return { authorization: "Bearer " + token, accept: "application/vnd.github+json", "user-agent": "TEC-Wiki" };
}
export async function biographyFileExists(token, slug) {
  const result = await fetch(root + filename(slug) + "?ref=main", { headers: auth(token) });
  if (result.status === 404) return false;
  if (!result.ok) throw new Error("Unable to verify existing biography");
  return true;
}
export async function createBiographyFile(token, slug, markdown) {
  if (typeof markdown !== "string" || markdown.length > 70000) throw new Error("Invalid biography");
  if (await biographyFileExists(token, slug)) return { status: "exists" };
  const bytes = new TextEncoder().encode(markdown);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const response = await fetch(root + filename(slug), {
    method: "PUT",
    headers: { ...auth(token), "content-type": "application/json" },
    body: JSON.stringify({ message: "Add character biography " + slug, content: btoa(binary), branch: "main" })
  });
  if (response.status === 409) return { status: "conflict" };
  if (response.status === 422) {
    if (await biographyFileExists(token, slug)) return { status: "conflict" };
    throw new Error("GitHub rejected biography creation");
  }
  if (response.status !== 201) throw new Error("Biography creation failed");
  const result = await response.json();
  return { status: "created", commit: result.commit?.sha || null };
}
