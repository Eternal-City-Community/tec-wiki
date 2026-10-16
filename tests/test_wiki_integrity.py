"""Regression checks for intentional Wikidot-style red links and actual broken assets/redirects."""
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("wiki_integrity", ROOT / "tools/check_wiki_integrity.py")
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)


class WikiIntegrityTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.docs = Path(self.temp.name)
        (self.docs / "assets/data").mkdir(parents=True)

    def write(self, path, content):
        target = self.docs / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")

    def test_missing_page_is_red_link_not_error(self):
        self.write("index.md", "[Create this](/future-page/)")
        self.write("assets/data/missing-pages.json", json.dumps(["future-page"]))
        _, issues, red = audit.scan(self.docs)
        self.assertEqual(issues, [])
        self.assertEqual(red, [("index.md", "future-page")])

    def test_missing_manifest_entry_is_issue(self):
        self.write("index.md", "[Create](/future-page/)")
        self.write("assets/data/missing-pages.json", "[]")
        _, issues, _ = audit.scan(self.docs)
        self.assertTrue(any("absent from manifest" in message for _, message in issues))

    def test_asset_and_redirect_are_real_issues(self):
        self.write("index.md", '![](/assets/missing.png)\n<meta http-equiv="refresh" content="0; url=/gone/">')
        self.write("assets/data/missing-pages.json", "[]")
        _, issues, _ = audit.scan(self.docs)
        self.assertTrue(any("missing asset" in message for _, message in issues))
        self.assertTrue(any("broken redirect" in message for _, message in issues))

    def test_created_page_must_leave_manifest(self):
        self.write("future-page.md", "# Now exists")
        self.write("assets/data/missing-pages.json", '["future-page"]')
        _, issues, _ = audit.scan(self.docs)
        self.assertTrue(any("incorrectly marked missing" in message for _, message in issues))

    def test_live_red_link_contract(self):
        js = (ROOT / "docs/javascripts/tec-content.js").read_text(encoding="utf-8")
        self.assertIn('fetch("/assets/data/missing-pages.json")', js)
        self.assertIn('link.classList.add("tec-missing-link")', js)
        self.assertIn('link.href = "/admin/#/collections/pages/new"', js)
        self.assertIn("link.dataset.missingSlug", js)


if __name__ == "__main__":
    unittest.main()
