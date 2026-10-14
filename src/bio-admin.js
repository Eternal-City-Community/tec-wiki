// Verify GitHub organization owner privileges using the supplied user OAuth token.
// Never trust client-provided role or username.
const ORG = "Eternal-City-Community";
async function githubGet(token, path) {
  const response = await fetch("https://api.github.com" + path, {
    headers: { authorization: "Bearer " + token, accept: "application/vnd.github+json", "user-agent": "TEC-Wiki" }
  });
  if (!response.ok) return null;
  return response.json();
}
export async function isBiographyAdministrator(token) {
  if (typeof token !== "string" || !/^[a-zA-Z0-9_\-]{20,255}$/.test(token)) return false;
  const user = await githubGet(token, "/user");
  if (!user || typeof user.login !== "string" || !/^[A-Za-z0-9-]{1,39}$/.test(user.login)) return false;
  const membership = await githubGet(token, "/orgs/" + ORG + "/memberships/" + encodeURIComponent(user.login));
  return membership?.state === "active" && membership?.role === "admin" &&
    membership?.organization?.login?.toLowerCase() === ORG.toLowerCase();
}
