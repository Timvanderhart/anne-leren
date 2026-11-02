#!/usr/bin/env python3
"""Bouwt Anne's studietrainer: één zelfstandige index.html voor GitHub Pages (en een versie voor de Claude-preview).

Inhoud per vak staat in src/courses/<vak>/ (meta, flashcards, oefenvragen, open vragen, proeftoets, sprint)
met de afbeeldingen in src/courses/<vak>/img/. Na een wijziging: python3 build.py
"""
import base64
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
COURSES = ["nlt"]  # volgorde op het hoofdscherm; nieuw vak = nieuwe map + naam hier toevoegen
FILES = ["meta.js", "flashcards.js", "mc.js", "open.js", "exam.js", "sprint.js"]
TITLE = "Anne leert"
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700'
         '&family=Nunito+Sans:ital,opsz,wght@0,6..12,400..800;1,6..12,400&display=swap">')
MIME = {".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp"}


def images(cid):
    folder = SRC / "courses" / cid / "img"
    out = []
    if folder.is_dir():
        for f in sorted(folder.iterdir()):
            if f.suffix.lower() in MIME:
                b64 = base64.b64encode(f.read_bytes()).decode("ascii")
                out.append(f'"{f.stem}":"data:{MIME[f.suffix.lower()]};base64,{b64}"')
    return "window.IMG = {" + ",\n".join(out) + "};"


css = (SRC / "styles.css").read_text(encoding="utf-8")
body = (SRC / "body.html").read_text(encoding="utf-8")
app = (SRC / "app.js").read_text(encoding="utf-8")

parts = ["window.COURSE_DATA = {};"]
for cid in COURSES:
    files = "\n".join((SRC / "courses" / cid / f).read_text(encoding="utf-8") for f in FILES)
    parts.append(f"(function(){{ var window = {{}};\n{files}\n{images(cid)}\nCOURSE_DATA.{cid} = window; }})();")
data = "\n".join(parts)

inner = f"{body}\n<script>\n{data}\n</script>\n<script>\n{app}\n</script>\n"

frag = (f'<title>{TITLE}</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n'
        f'{FONTS}\n<style>\n{css}\n</style>\n{inner}')
(ROOT / "dist" / "artifact").mkdir(parents=True, exist_ok=True)
(ROOT / "dist" / "artifact" / "anne-leert.html").write_text(frag, encoding="utf-8")

site_reset = (":root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}"
              "img{max-width:100%}[hidden]{display:none!important}")
icon = ("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22%3E"
        "%3Ccircle cx=%2232%22 cy=%2232%22 r=%2232%22 fill=%22%23c06c79%22/%3E"
        "%3Ctext x=%2232%22 y=%2244%22 font-size=%2234%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22Georgia%22%3EA%3C/text%3E%3C/svg%3E")
full = (f'<!doctype html>\n<html lang="nl">\n<head>\n<meta charset="utf-8">\n'
        f'<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        f'<title>{TITLE}</title>\n<meta name="robots" content="noindex">\n'
        f'<meta name="theme-color" content="#f4ede2">\n'
        f'<link rel="icon" href="{icon}">\n'
        f'{FONTS}\n<style>\n{site_reset}\n{css}\n</style>\n</head>\n<body>\n{inner}</body>\n</html>\n')
(ROOT / "index.html").write_text(full, encoding="utf-8")
print("ok", len(frag), len(full))
