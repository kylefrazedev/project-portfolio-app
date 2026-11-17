"""Shrink oversized source images so builds are faster, without changing how the site looks.

Why: @sveltejs/enhanced-img encodes every source image to AVIF + WebP + a fallback at several
widths. Two things make that slow: originals far wider than the site ever shows, and opaque
screenshots saved as PNG (which get a large PNG fallback at every width).

What it does:
  1. Caps each image's width at the largest size it can be shown at (CSS width x 2 for HiDPI),
     per the rules below. Images already under their cap are left alone.
  2. Re-saves opaque PNG screenshots as high-quality JPEG (4:4:4 chroma, ~q95). Images that use
     transparency (logos) stay PNG.
  3. Updates imports that point at renamed files.
  4. Prints SSIM between the old and new image at the new size (1.0 = identical). For a stricter
     check, compare PSNR (40+ dB is visually indistinguishable).

Usage: python scripts/shrink-images.py <ffmpeg-bin-dir>
"""

import re
import subprocess
import sys
from pathlib import Path

BIN = Path(sys.argv[1])
FFMPEG = str(BIN / "ffmpeg.exe")
ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "src/lib/assets"

# Largest width each image is ever displayed at, x2 for HiDPI screens (see layout notes).
CAPS = {
    # Card-only images (sizes <= 600px wide; phones at 3x top out near 1300px).
    "projects/bolt.png": 1600,
    "projects/no-mind.png": 1600,
    "projects/no-head.jpg": 1600,
    "projects/COPano.png": 1600,
    "projects/rounds-on-me/cover.png": 1600,
    "projects/pursuit-of-laughter/cover.png": 1600,
    "projects/kodansha-house/cover.jpg": 1600,
    # Case-study image shown up to ~900px wide.
    "projects/pursuit-of-laughter/group-pic.jpg": 2400,
    # Logo shown at most ~300px wide.
    "logos/nationwide.png": 1200,
}
DIR_CAPS = {
    # LA gallery (sizes: 380px / 50vw / 100vw) and dev photos in small grid cells.
    "projects/kodansha-house/la/": 1600,
    "projects/kodansha-house/dev/": 1600,
}
# Opaque screenshots/renders saved as PNG -> JPEG. Tiny flat graphics stay PNG.
TO_JPEG = [
    "about/gdc-me.png",
    "projects/bolt.png",
    "projects/COPano.png",
    "projects/express-polar/cover-thin.png",
    "projects/express-polar/cover.png",
    "projects/express-polar/train-1.png",
    "projects/express-polar/train-2.png",
    "projects/hotelandmecha.png",
    "projects/no-mind.png",
    "projects/pursuit-of-laughter/armory-amusement.png",
    "projects/pursuit-of-laughter/cover.png",
    "projects/pursuit-of-laughter/wardens.png",
    "projects/rounds-on-me/cover.png",
    "projects/rounds-on-me/image-1.png",
    "projects/rounds-on-me/image-2.png",
    "projects/rounds-on-me/image-3.png",
    "projects/rounds-on-me/image-5.png",
    "projects/this-site.png",
    "projects/xr-opening/xr5.png",
]


def ffmpeg(*args):
    return subprocess.run([FFMPEG, "-v", "error", "-y", *args], capture_output=True, text=True, check=True)


def width_of(path):
    out = subprocess.run([str(BIN / "ffprobe.exe"), "-v", "error", "-select_streams", "v:0",
                          "-show_entries", "stream=width", "-of", "csv=p=0", str(path)],
                         capture_output=True, text=True, check=True)
    return int(out.stdout.strip())


def ssim(a, b, width):
    """SSIM of a vs b, both scaled to `width` (the size it will actually be shown at)."""
    res = subprocess.run(
        [FFMPEG, "-v", "info", "-i", str(a), "-i", str(b), "-filter_complex",
         f"[0]scale={width}:-2:flags=lanczos,format=rgb24[x];[1]scale={width}:-2:flags=lanczos,format=rgb24[y];[x][y]ssim",
         "-f", "null", "-"], capture_output=True, text=True)
    m = re.search(r"All:([0-9.]+)", res.stderr)
    return float(m.group(1)) if m else float("nan")


def cap_for(rel):
    if rel in CAPS:
        return CAPS[rel]
    for prefix, cap in DIR_CAPS.items():
        if rel.startswith(prefix):
            return cap
    return None


renames = {}
work = sorted(set(CAPS) | set(TO_JPEG) |
              {p.relative_to(ASSETS).as_posix() for d in DIR_CAPS for p in (ASSETS / d).glob("*.jpg")})
for rel in work:
    src = ASSETS / rel
    if not src.exists():  # already converted or removed
        continue
    w = width_of(src)
    cap = cap_for(rel)
    new_w = min(w, cap) if cap else w
    to_jpeg = rel in TO_JPEG
    if new_w == w and not to_jpeg:
        continue
    dst = src.with_suffix(".jpg") if to_jpeg else src
    tmp = dst.with_name(dst.stem + ".tmp" + dst.suffix)
    # Resize in RGB(A) and keep the exact aspect ratio (-1, not -2: no rounding to even heights).
    scale = f",scale={new_w}:-1:flags=lanczos" if new_w != w else ""
    if dst.suffix == ".png":
        ffmpeg("-i", str(src), "-vf", f"format=rgba{scale}", "-pix_fmt", "rgba", str(tmp))
    else:
        # Max-quality JPEG with 4:4:4 chroma: visually lossless; metadata stripped.
        ffmpeg("-i", str(src), "-vf", f"format=rgb24{scale},format=yuvj444p", "-q:v", "2",
               "-map_metadata", "-1", str(tmp))
    score = ssim(src, tmp, new_w)
    before, after = src.stat().st_size // 1024, tmp.stat().st_size // 1024
    tmp.replace(dst)
    if dst != src:
        src.unlink()
        renames[rel] = dst.relative_to(ASSETS).as_posix()
    print(f"{rel:52} {w:>5}->{new_w:<5} {before:>6}KB -> {after:>5}KB  SSIM {score:.4f}"
          + ("  [png->jpg]" if dst != src else ""))

# Point imports at renamed files.
for f in list((ROOT / "src").rglob("*.svelte")) + list((ROOT / "src").rglob("*.ts")):
    text = f.read_text(encoding="utf-8")
    new = text
    for old, cur in renames.items():
        new = new.replace(f"assets/{old}", f"assets/{cur}")
    if new != text:
        f.write_text(new, encoding="utf-8")
        print("updated imports:", f.relative_to(ROOT).as_posix())
