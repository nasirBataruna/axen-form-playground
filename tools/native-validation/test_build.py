"""Exercise the original playground production build with its installed package."""
import json
from pathlib import Path
import shutil
import subprocess
import unittest


class PlaygroundBuild(unittest.TestCase):
    def test_original_build_with_pinned_form(self):
        root = Path(__file__).resolve().parents[2]
        package = json.loads((root / "package.json").read_text())
        self.assertEqual(package["dependencies"]["@axenstudio/axen-form"], "0.1.19")
        installed = json.loads((root / "node_modules/@axenstudio/axen-form/package.json").read_text())
        self.assertEqual(installed["version"], "0.1.19")
        pnpm = shutil.which("pnpm")
        self.assertIsNotNone(pnpm)
        subprocess.run([pnpm, "build"], cwd=root, check=True, timeout=90)
