import test from "node:test";
import assert from "node:assert/strict";
import { validateBiography, biographySlug, biographyMarkdown, biographyWithExistingPortrait } from "../src/bio-validation.js";

test("first and last names combine into page title and slug", () => {
  const bio = validateBiography({ first_name: "Veridio", last_name: "DiMori", affiliations: [] });
  assert.equal(bio.character_name, "Veridio DiMori");
  assert.equal(biographySlug(bio.character_name), "bio_veridio_dimori");
  assert.match(biographyMarkdown(bio), /title: "Veridio DiMori"/);
});

test("last name is optional", () => {
  for (const last_name of ["", undefined]) {
    const bio = validateBiography({ first_name: "Demerian", last_name, affiliations: [] });
    assert.equal(bio.character_name, "Demerian");
    assert.equal(biographySlug(bio.character_name), "bio_demerian");
  }
});

test("first name is required for split name submission", () => {
  assert.throws(() => validateBiography({ first_name: "", last_name: "DiMori", affiliations: [] }));
});

test("conflicting legacy name and split name are rejected", () => {
  assert.throws(() => validateBiography({
    character_name: "Someone Else", first_name: "Veridio", last_name: "DiMori", affiliations: []
  }));
});

test("legacy full name remains supported", () => {
  assert.equal(validateBiography({ character_name: "Legacy Character", affiliations: [] }).character_name, "Legacy Character");
});

test("editing preserves an existing canonical portrait and real Markdown line breaks", () => {
  const bio = validateBiography({ first_name: "Veridio", last_name: "DiMori", background: "Updated story", affiliations: [] });
  const slug = biographySlug(bio.character_name);
  const portrait = "![Character portrait](/assets/uploads/bio_veridio_dimori.webp)";
  const updated = biographyWithExistingPortrait(bio, "# Old biography\n\n" + portrait + "\n", slug);
  assert.ok(updated.includes("\n\n" + portrait + "\n"));
  assert.ok(updated.includes("Updated story"));
  assert.ok(!updated.includes("\\n"));
});

test("editing ignores noncanonical portrait references", () => {
  const bio = validateBiography({ first_name: "Veridio", last_name: "DiMori", affiliations: [] });
  const updated = biographyWithExistingPortrait(bio,
    "![Character portrait](/assets/uploads/bio_other.webp)\n", "bio_veridio_dimori");
  assert.doesNotMatch(updated, /bio_other.webp/);
});
