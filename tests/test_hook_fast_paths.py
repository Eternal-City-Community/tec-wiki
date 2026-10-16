"""Checks that MkDocs hook fast paths preserve representative page output."""
import importlib.util
import unittest
from pathlib import Path

HOOKS = Path(__file__).resolve().parents[1] / "hooks"

def load(name):
    spec = importlib.util.spec_from_file_location(name, HOOKS / (name + ".py"))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

class HookFastPathTests(unittest.TestCase):
    def test_skill_samples(self):
        mod = load("skill_samples")
        self.assertEqual(mod.format_samples("# Ordinary page"), "# Ordinary page")
        sample = '<div class="skill-template">*hit*</div>'
        self.assertIn("<em>hit</em>", mod.format_samples(sample))

    def test_placeholders(self):
        mod = load("placeholders")
        self.assertEqual(mod.on_page_markdown("No markup", None, None, None), "No markup")
        self.assertEqual(mod.on_page_markdown("jab <target>", None, None, None), "jab &lt;target&gt;")

    def test_list_spacing(self):
        mod = load("list_spacing")
        self.assertEqual(mod.on_page_markdown("No lists", None, None, None), "No lists")
        self.assertEqual(mod.on_page_markdown("Actions:\n* jab", None, None, None), "Actions:\n\n* jab")

if __name__ == "__main__":
    unittest.main()
