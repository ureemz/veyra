"""Build final WebP assets from curated Pexels photos."""
import json
import os
import sys
import urllib.request
from PIL import Image, ImageOps

sys.stdout.reconfigure(encoding="utf-8")

PRODUCTS = {
    "solene-tote": [22434759, 22434773, 22432984],
    "mira-crossbody": [22432989, 22434766, 26736142],
    "noir-mini": [26736140, 36125059, 26736141],
    "dune-shoulder": [26954381, 27174573, 10340652],
    "layla-clutch": [27835301, 33471443, 13870014],
    "rania-top-handle": [8502477, 22434761, 12105084],
    "saha-tote": [36365228, 23223862, 5706269],
    "lina-shoulder": [10919291, 12442672, 31867644],
    "rima-mini": [12442670, 8502484, 27298414],
    "hana-crossbody": [29793778, 27292673, 20399713],
    "sofia-bag": [22432981, 27046147, 27046146],
    "ayla-clutch": [23223851, 22434782, 26954371],
}
HERO = {
    "hero-1": 5689076,
    "hero-2": 37384060,
    "hero-3": 8396731,
    "hero-4": 26316185,
}

os.makedirs("images/products", exist_ok=True)
os.makedirs("images/hero", exist_ok=True)
cache = "_tools/full"
os.makedirs(cache, exist_ok=True)

idx_alt = json.load(open("images_alt_index.json", encoding="utf-8"))
idx_ld = {r["url"].split("/photos/")[1].split("/")[0]: r for r in json.load(open("images_index.json", encoding="utf-8"))}
sources = {}


def meta(pid):
    key = str(pid)
    for u, alt in idx_alt.items():
        if u.split("/photos/")[1].split("/")[0] == key:
            return alt.replace("Free ", "", 1), ""
    row = idx_ld.get(key, {})
    return row.get("description", ""), row.get("credit", "")


def fetch(pid, width):
    path = f"{cache}/{pid}-{width}.jpg"
    if not os.path.exists(path):
        url = f"https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg?auto=compress&cs=tinysrgb&w={width}"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=40) as r, open(path, "wb") as f:
            f.write(r.read())
    return path


def save_product(pid, out, n):
    im = Image.open(fetch(pid, 1400)).convert("RGB")
    canvas = Image.new("RGB", (1200, 1500), "#FAF7F2")
    fitted = ImageOps.contain(im, (1140, 1440), Image.Resampling.LANCZOS)
    canvas.paste(fitted, ((1200 - fitted.width) // 2, (1500 - fitted.height) // 2))
    canvas.save(out, "WEBP", quality=84, method=6)
    desc, credit = meta(pid)
    sources[out] = {"pexels_id": pid, "page": f"https://www.pexels.com/photo/{pid}/", "credit": credit, "description": desc}


def save_hero(pid, out):
    im = Image.open(fetch(pid, 2000)).convert("RGB")
    fitted = ImageOps.fit(im, (2000, 1200), Image.Resampling.LANCZOS, centering=(0.5, 0.45))
    fitted.save(out, "WEBP", quality=84, method=6)
    desc, credit = meta(pid)
    sources[out] = {"pexels_id": pid, "page": f"https://www.pexels.com/photo/{pid}/", "credit": credit, "description": desc}


for slug, ids in PRODUCTS.items():
    for i, pid in enumerate(ids, 1):
        out = f"images/products/veyra-{slug}-{i}.webp"
        save_product(pid, out, i)
        print(out, pid)

for name, pid in HERO.items():
    out = f"images/hero/veyra-{name}.webp"
    save_hero(pid, out)
    print(out, pid)

with open("image_sources.json", "w", encoding="utf-8") as f:
    json.dump(sources, f, ensure_ascii=False, indent=2)
print("done", len(sources))
