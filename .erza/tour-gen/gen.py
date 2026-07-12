#!/usr/bin/env python3
"""Render localized captions over blanked tour-tile bases and emit final WebP.

Usage:
  python3 gen.py calibrate   # render en-02/he-02 replicas and print metric diffs
  python3 gen.py build       # render the 5 missing tiles into out/final/
"""
import json
import os
import subprocess
import sys
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'out')
FINAL = os.path.join(OUT, 'final')
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
FONTS_CSS = ('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700'
             '&family=Rubik:wght@600;700;800&family=Geist:wght@400;500'
             '&family=Assistant:wght@400;500;600&display=block')

# Tunable typography (calibrated against en/02 + he/02 originals).
STYLE = {
    'en': {
        'h_font': "'Space Grotesk'", 'h_weight': 700, 'h_size': 80, 'h_lh': 83,
        'h_ls': '-1.2px', 'h_top': 112,
        's_font': "'Geist'", 's_weight': 400, 's_size': 34, 's_lh': 42, 's_mt': 17,
    },
    'he': {
        'h_font': "'Rubik'", 'h_weight': 700, 'h_size': 76, 'h_lh': 79,
        'h_ls': '1px', 'h_top': 116,
        's_font': "'Assistant'", 's_weight': 500, 's_size': 36, 's_lh': 44, 's_mt': 17,
    },
}
YELLOW = '#FFC72E'
SUBCOL = '#C2C0F1'

# Caption copy. <y>...</y> marks the yellow span.
TILES = {
    ('en', '02-lock-pin'): {  # calibration replica — must match the real tile
        'h': 'Your memories.<br><y>Locked</y>.',
        's': 'Guarded by a password and Face ID.',
    },
    ('he', '02-lock-pin'): {  # calibration replica
        'h': 'הזיכרונות<br>שלך. <y>נעולים</y>.',
        's': 'מוגנים בסיסמה וב-Face ID.',
    },
    ('he', '01-vault-home'): {
        'h': 'מרחב <y>פרטי</y><br>לחיים שלך',
        's': 'תמונות, סרטונים ומסמכים — רק שלך.',
    },
    ('he', '06-media-viewer'): {
        'h': 'לחיות מחדש<br><y>כל רגע</y>',
        's': 'תמונות וסרטונים במסך מלא —<br>לעיניים שלך בלבד.',
    },
    ('he', '08-share'): {
        'h': 'שיתוף ישירות<br>אל <y>הכספת</y>',
        's': 'שמירת תמונות וקבצים מכל אפליקציה — בפרטיות.',
    },
    ('en', '05-import'): {
        'h': 'Import. <y>Secure</y>.<br>Relax.',
        's': 'From the camera, gallery, or Files.',
    },
    ('en', '07-settings'): {
        'h': 'Backed up.<br><y>Encrypted</y>. Yours.',
        's': 'Optional iCloud sync, private end to end.',
    },
}

HTML = """<!doctype html><html lang="{lang}" dir="{dir}"><head><meta charset="utf-8">
<link rel="stylesheet" href="{fonts}">
<style>
  * {{ margin: 0; padding: 0; }}
  html, body {{ width: 900px; height: 1956px; }}
  body {{ position: relative; overflow: hidden; background: #000; }}
  img.base {{ position: absolute; left: 0; top: 0; width: 900px; height: 1956px; }}
  .cap {{ position: absolute; left: 40px; right: 40px; top: {h_top}px; text-align: center; }}
  h1 {{ font-family: {h_font}; font-weight: {h_weight}; font-size: {h_size}px;
       line-height: {h_lh}px; color: #fff; letter-spacing: {h_ls}; }}
  h1 y {{ color: {yellow}; }}
  p {{ font-family: {s_font}; font-weight: {s_weight}; font-size: {s_size}px;
      line-height: {s_lh}px; color: {subcol}; margin-top: {s_mt}px; }}
</style></head><body>
<img class="base" src="{base}">
<div class="cap"><h1>{h}</h1><p>{s}</p></div>
</body></html>
"""


def render(locale, stem, out_png):
    st = STYLE[locale]
    tile = TILES[(locale, stem)]
    base = os.path.join(OUT, f'{locale}-{stem}-blank.png')
    html_path = os.path.join(OUT, f'{locale}-{stem}.html')
    with open(html_path, 'w') as f:
        f.write(HTML.format(
            lang=locale, dir='rtl' if locale == 'he' else 'ltr',
            fonts=FONTS_CSS, base='file://' + base, yellow=YELLOW, subcol=SUBCOL,
            h=tile['h'], s=tile['s'], **st,
        ))
    subprocess.run([
        CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars',
        '--force-device-scale-factor=1', '--window-size=900,1956',
        '--virtual-time-budget=15000', f'--screenshot={out_png}',
        'file://' + html_path,
    ], check=True, capture_output=True)


def metrics(img):
    """Text-row bands + horizontal extents, same method used to measure originals."""
    px = img.convert('RGB').load()
    bands = {'white': [], 'yellow': [], 'sub': []}
    ext = {}
    for y in range(60, 520):
        for name, test in (
            ('white', lambda r, g, b: r > 225 and g > 225 and b > 225),
            ('yellow', lambda r, g, b: r > 200 and 130 < g < 200 and b < 90),
            ('sub', lambda r, g, b: 140 < r < 200 and 150 < g < 205 and 200 < b < 255),
        ):
            xs = [x for x in range(40, 860) if test(*px[x, y])]
            if len(xs) > 8:
                bands[name].append(y)
                lo, hi = ext.get((name, 'x'), (900, 0))
                ext[(name, 'x')] = (min(lo, xs[0]), max(hi, xs[-1]))

    def ranges(rows):
        if not rows:
            return []
        out, s, p = [], rows[0], rows[0]
        for y in rows[1:]:
            if y - p > 6:
                out.append((s, p))
                s = y
            p = y
        out.append((s, p))
        return out

    return {k: ranges(v) for k, v in bands.items()}, ext


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else 'calibrate'
    os.makedirs(FINAL, exist_ok=True)
    if mode == 'calibrate':
        for locale in ('en', 'he'):
            out_png = os.path.join(OUT, f'cal-{locale}-02.png')
            render(locale, '02-lock-pin', out_png)
            got, gext = metrics(Image.open(out_png))
            ref = Image.open(os.path.join(ROOT, 'public', 'tour', locale, '02-lock-pin.webp'))
            want, wext = metrics(ref)
            print(f'--- {locale}/02-lock-pin')
            print('  rendered:', json.dumps({k: v for k, v in got.items()}), dict(gext))
            print('  original:', json.dumps({k: v for k, v in want.items()}), dict(wext))
    else:
        jobs = [(l, s) for (l, s) in TILES if s != '02-lock-pin']
        for locale, stem in jobs:
            out_png = os.path.join(FINAL, f'{locale}-{stem}.png')
            render(locale, stem, out_png)
            print('rendered', out_png)


if __name__ == '__main__':
    main()
