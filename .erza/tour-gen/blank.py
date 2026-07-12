#!/usr/bin/env python3
"""Reconstruct the shared tour-tile background and produce 'blanked' base images.

All tiles under public/tour/ share an identical gradient background (bit-exact
away from text; near text, lossy WebP blocks deviate by a few levels). The
baked-in captions also carry a dark drop shadow, so a plain per-pixel min()
leaves dark ghosts. Instead:

1. Build a piecewise-linear background model per column from three caption-free
   anchor bands present in every tile (y≈100-122, 282-298, 390-430).
2. Per pixel, average only the tile values within ±TOL of the model (inliers);
   text and shadow pixels are outliers. Fall back to the model if none qualify.

Output: .erza/tour-gen/out/<locale>-<stem>-blank.png — the source tile with
its caption area (y=BLANK_TOP..BLANK_BOT) replaced by the clean strip, edges
feathered. Captions are then re-rendered in HTML by gen.py.
"""
from PIL import Image
import numpy as np
import os

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
TOUR = os.path.join(ROOT, 'public', 'tour')
OUT = os.path.join(os.path.dirname(__file__), 'out')
os.makedirs(OUT, exist_ok=True)

ALL = [
    ('en', s) for s in ['01-vault-home','02-lock-pin','03-folder-detail','04-new-folder','06-media-viewer','08-share','09-widget']
] + [
    ('he', s) for s in ['02-lock-pin','03-folder-detail','04-new-folder','05-import','07-settings','09-widget']
]

BLANK_TOP, BLANK_BOT = 80, 470   # caption zone to erase (all phones start >= 489)
FEATHER = 14                     # px of linear blend at strip edges

def load(locale, stem):
    return np.asarray(Image.open(os.path.join(TOUR, locale, f'{stem}.webp')).convert('RGB'), dtype=np.uint8)

def main():
    H = BLANK_BOT + FEATHER + 40
    stack = np.stack([
        load(l, s)[:H] for l, s in ALL if not (l == 'he' and s == '07-settings')
    ]).astype(np.float64)  # (N, H, 900, 3)

    # Background model: piecewise-linear per column through caption-free bands.
    anchors = [(111, (100, 122)), (290, (282, 298)), (410, (390, 430))]
    anchor_vals = [stack[:, a:b].mean(axis=(0, 1)) for _, (a, b) in anchors]  # (900,3) each
    model = np.empty((H, 900, 3))
    for y in range(H):
        if y <= anchors[0][0]:
            model[y] = anchor_vals[0]
        elif y >= anchors[-1][0]:
            model[y] = anchor_vals[-1]
        else:
            for (y0, _), v0, (y1, _), v1 in zip(anchors, anchor_vals, anchors[1:], anchor_vals[1:]):
                if y0 <= y <= y1:
                    t = (y - y0) / (y1 - y0)
                    model[y] = v0 * (1 - t) + v1 * t
                    break

    # Inlier mean: use only tile values close to the model at each pixel.
    TOL = 12
    dist = np.abs(stack - model[None]).max(axis=3)          # (N, H, 900)
    inlier = (dist <= TOL)[..., None]                        # (N, H, 900, 1)
    n = inlier.sum(axis=0)                                   # (H, 900, 1)
    strip = np.where(n > 0, (stack * inlier).sum(axis=0) / np.maximum(n, 1), model)

    # Sources that donate everything except the caption: (target locale, stem, source locale)
    jobs = [
        ('he', '01-vault-home', 'en'),
        ('he', '06-media-viewer', 'en'),
        ('he', '08-share', 'en'),
        ('en', '05-import', 'he'),
        ('en', '07-settings', 'he'),
        # calibration targets: re-blank tiles that already exist in both languages
        ('en', '02-lock-pin', 'en'),
        ('he', '02-lock-pin', 'he'),
    ]
    for target_locale, stem, src_locale in jobs:
        img = load(src_locale, stem).astype(np.int16)
        for y in range(BLANK_TOP - FEATHER, BLANK_BOT + FEATHER):
            if y < BLANK_TOP:
                t = (y - (BLANK_TOP - FEATHER)) / FEATHER
            elif y >= BLANK_BOT:
                t = 1 - (y - BLANK_BOT) / FEATHER
            else:
                t = 1.0
            img[y] = img[y] * (1 - t) + strip[y] * t
        name = f'{target_locale}-{stem}-blank.png'
        Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).save(os.path.join(OUT, name))
        print('wrote', name)

if __name__ == '__main__':
    main()
