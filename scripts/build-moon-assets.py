"""
Produce the site's moon assets from the procedural renderer.

Skips work when the assets already exist, so local builds stay fast; on a
clean checkout (e.g. a Vercel build) it renders them once.
"""
import os
import subprocess
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, "public")
OUT = {
    os.path.join(PUB, "moon", "moon-1000.webp"): (1000, 76),
    os.path.join(PUB, "moon", "moon-1800.webp"): (1800, 78),
}
OG = os.path.join(PUB, "og.jpg")

if all(os.path.exists(p) for p in [*OUT, OG]):
    print("moon assets present, skipping")
    sys.exit(0)

os.makedirs(os.path.join(PUB, "moon"), exist_ok=True)
master = os.path.join(ROOT, ".moon-master.png")
subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "generate-moon.py"), master, "2048"], check=True)
moon = Image.open(master)

for path, (size, quality) in OUT.items():
    moon.resize((size, size), Image.LANCZOS).save(path, "WEBP", quality=quality, alpha_quality=90, method=6)

# Open Graph card: moon rising from the bottom edge of a midnight field.
og = Image.new("RGB", (1200, 630), (23, 26, 35))
small = moon.resize((520, 520), Image.LANCZOS)
og.paste(small, ((1200 - 520) // 2, 630 - 520 // 2 - 90), small)
fade = Image.linear_gradient("L").resize((1200, 630))
og = Image.composite(Image.new("RGB", (1200, 630), (23, 26, 35)), og, fade.point(lambda v: min(255, max(0, v - 170) * 3)))
og.save(OG, "JPEG", quality=84, optimize=True)

os.remove(master)
print("rendered moon assets")
