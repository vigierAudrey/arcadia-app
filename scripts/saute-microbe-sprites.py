#!/usr/bin/env python3
"""Génère la planche de dessins du mini-jeu « Saute-Microbe ».

Le moteur du jeu (public/jeux/saute-microbe/jeu.js) vient du jeu hors ligne de
Chromium et lit ses images à des coordonnées fixes dans une seule planche.
Ce script redessine entièrement ces images pour ArcadiA : un élève qui court,
des microbes à éviter. Aucun dessin d'origine n'est réutilisé.

Usage : python3 scripts/saute-microbe-sprites.py
Sortie : public/jeux/saute-microbe/microbes-1x.png et microbes-2x.png
"""

from __future__ import annotations

import os

from PIL import Image, ImageDraw, ImageFont

INK = (72, 72, 76, 255)
SKIN = (240, 199, 166, 255)
HAIR = (74, 54, 42, 255)
SHIRT = (43, 122, 158, 255)
PANTS = (58, 66, 88, 255)
SHOE = (48, 48, 52, 255)
GERM = (95, 160, 78, 255)
GERM_DARK = (58, 112, 52, 255)
WHITE = (255, 255, 255, 255)

FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"

# Coordonnées imposées par le moteur (Runner.spriteDefinition).
LDPI = {
    "RESTART": (2, 2),
    "CLOUD": (86, 2),
    "PTERODACTYL": (134, 2),
    "CACTUS_SMALL": (228, 2),
    "CACTUS_LARGE": (332, 2),
    "MOON": (484, 2),
    "STAR": (645, 2),
    "TEXT_SPRITE": (655, 2),
    "TREX": (848, 2),
    "HORIZON": (2, 54),
}
HDPI = {
    "RESTART": (2, 2),
    "CLOUD": (166, 2),
    "PTERODACTYL": (260, 2),
    "CACTUS_SMALL": (446, 2),
    "CACTUS_LARGE": (652, 2),
    "MOON": (954, 2),
    "STAR": (1276, 2),
    "TEXT_SPRITE": (1294, 2),
    "TREX": (1678, 2),
    "HORIZON": (2, 104),
}

SHEET_1X = (1240, 68)
SHEET_2X = (2460, 136)

# Décalages des images du personnage à l'intérieur de sa zone (Trex.animFrames).
RUNNER_FRAMES = {"stand": 0, "blink": 44, "run1": 88, "run2": 132, "wait": 176, "crash": 220}
DUCK_FRAMES = {"duck1": 264, "duck2": 323}


class Pen:
    """Dessine en coordonnées « 1x » dans une case, à l'échelle demandée."""

    def __init__(self, draw: ImageDraw.ImageDraw, ox: int, oy: int, scale: int):
        self.d = draw
        self.ox = ox
        self.oy = oy
        self.s = scale

    def rect(self, x0, y0, x1, y1, color):
        s, ox, oy = self.s, self.ox, self.oy
        self.d.rectangle(
            [ox + x0 * s, oy + y0 * s, ox + x1 * s - 1, oy + y1 * s - 1], fill=color
        )

    def oval(self, x0, y0, x1, y1, color, outline=None, width=1):
        s, ox, oy = self.s, self.ox, self.oy
        self.d.ellipse(
            [ox + x0 * s, oy + y0 * s, ox + x1 * s - 1, oy + y1 * s - 1],
            fill=color,
            outline=outline,
            width=width * s,
        )

    def poly(self, points, color):
        s, ox, oy = self.s, self.ox, self.oy
        self.d.polygon([(ox + x * s, oy + y * s) for x, y in points], fill=color)

    def line(self, x0, y0, x1, y1, color, width=1):
        s, ox, oy = self.s, self.ox, self.oy
        self.d.line(
            [ox + x0 * s, oy + y0 * s, ox + x1 * s, oy + y1 * s], fill=color, width=width * s
        )


def draw_runner(p: Pen, pose: str) -> None:
    """L'élève qui court, dans une case de 44 x 47 (sol en bas)."""
    # Jambes et chaussures.
    if pose in ("run1", "wait"):
        p.rect(17, 30, 22, 43, PANTS)
        p.rect(14, 43, 23, 47, SHOE)
        p.rect(24, 30, 29, 38, PANTS)
        p.rect(26, 38, 31, 42, PANTS)
        p.rect(26, 42, 35, 46, SHOE)
    elif pose == "run2":
        p.rect(24, 30, 29, 43, PANTS)
        p.rect(23, 43, 32, 47, SHOE)
        p.rect(17, 30, 22, 38, PANTS)
        p.rect(12, 38, 22, 42, PANTS)
        p.rect(10, 42, 19, 46, SHOE)
    elif pose == "crash":
        p.rect(16, 30, 21, 42, PANTS)
        p.rect(12, 42, 22, 46, SHOE)
        p.rect(24, 30, 29, 42, PANTS)
        p.rect(24, 42, 34, 46, SHOE)
    else:  # stand, blink : saut, jambes repliées
        p.rect(17, 30, 22, 41, PANTS)
        p.rect(14, 41, 23, 45, SHOE)
        p.rect(24, 30, 29, 39, PANTS)
        p.rect(25, 39, 33, 43, SHOE)

    # Bras (toujours sous le menton, jamais devant le visage).
    if pose == "run1":
        p.rect(29, 20, 35, 25, SKIN)
        p.rect(11, 21, 17, 26, SKIN)
    elif pose == "run2":
        p.rect(29, 25, 35, 30, SKIN)
        p.rect(11, 18, 17, 23, SKIN)
    elif pose == "crash":
        p.rect(32, 8, 36, 22, SKIN)
        p.rect(10, 8, 14, 22, SKIN)
    else:
        p.rect(30, 19, 35, 26, SKIN)
        p.rect(11, 19, 16, 26, SKIN)

    # Buste.
    p.rect(16, 17, 30, 31, SHIRT)
    p.rect(16, 28, 30, 31, INK)

    # Tête.
    p.oval(15, 2, 32, 18, SKIN)
    p.oval(15, 1, 32, 11, HAIR)
    p.rect(15, 6, 19, 12, HAIR)

    # Visage.
    if pose == "crash":
        p.line(25, 9, 29, 13, INK)
        p.line(29, 9, 25, 13, INK)
        p.rect(24, 15, 29, 17, INK)
    elif pose == "blink":
        p.rect(25, 11, 29, 12, INK)
    else:
        p.rect(26, 10, 29, 13, INK)


def draw_runner_duck(p: Pen, pose: str) -> None:
    """L'élève baissé, dans une case de 59 x 47."""
    p.rect(10, 40, 16, 47, PANTS)
    p.rect(6, 43, 17, 47, SHOE)
    if pose == "duck2":
        p.rect(20, 40, 26, 47, PANTS)
        p.rect(18, 43, 29, 47, SHOE)
    else:
        p.rect(22, 38, 30, 44, PANTS)
        p.rect(26, 42, 37, 46, SHOE)

    p.rect(8, 26, 40, 41, SHIRT)
    p.rect(8, 38, 40, 41, INK)
    p.rect(30, 34, 44, 39, SKIN)

    p.oval(38, 22, 56, 39, SKIN)
    p.oval(38, 21, 56, 31, HAIR)
    p.rect(38, 26, 43, 33, HAIR)
    p.rect(50, 30, 53, 33, INK)


def draw_germ(p: Pen, w: int, h: int) -> None:
    """Un microbe : corps vert, piquants, deux yeux."""
    body_top = h - int(h * 0.72)
    cx = w / 2
    p.oval(2, body_top, w - 2, h - 1, GERM)

    # Piquants tout autour du corps.
    spikes = [
        (cx, body_top - 4, 3),
        (3, body_top + 3, 3),
        (w - 4, body_top + 3, 3),
        (1, (body_top + h) / 2, 3),
        (w - 2, (body_top + h) / 2, 3),
    ]
    for sx, sy, size in spikes:
        p.oval(sx - size / 2, sy - size / 2, sx + size / 2, sy + size / 2, GERM_DARK)

    # Antennes.
    p.line(cx - 2, body_top, cx - 4, body_top - 6, GERM_DARK)
    p.line(cx + 2, body_top, cx + 4, body_top - 6, GERM_DARK)

    # Yeux.
    eye_y = body_top + max(4, h // 8)
    eye_r = 3 if w > 20 else 2
    for ex in (cx - eye_r - 1, cx + eye_r + 1):
        p.oval(ex - eye_r, eye_y, ex + eye_r, eye_y + eye_r * 2, WHITE)
        p.rect(ex - 1, eye_y + eye_r - 1, ex + 1, eye_y + eye_r + 1, INK)

    # Bouche.
    p.rect(cx - 3, eye_y + eye_r * 2 + 2, cx + 3, eye_y + eye_r * 2 + 4, GERM_DARK)


def draw_flying_germ(p: Pen, pose: str) -> None:
    """Le microbe volant, dans une case de 46 x 40."""
    if pose == "up":
        p.poly([(14, 18), (2, 2), (16, 14)], GERM_DARK)
        p.poly([(32, 18), (44, 2), (30, 14)], GERM_DARK)
    else:
        p.poly([(14, 18), (2, 34), (16, 24)], GERM_DARK)
        p.poly([(32, 18), (44, 34), (30, 24)], GERM_DARK)

    p.oval(13, 10, 34, 31, GERM)
    for sx, sy in ((23, 7), (12, 14), (35, 14), (12, 27), (35, 27), (23, 33)):
        p.oval(sx - 2, sy - 2, sx + 2, sy + 2, GERM_DARK)
    for ex in (19, 27):
        p.oval(ex - 3, 15, ex + 3, 22, WHITE)
        p.rect(ex - 1, 18, ex + 2, 21, INK)


def draw_cloud(p: Pen) -> None:
    p.oval(0, 4, 20, 14, WHITE, outline=INK)
    p.oval(12, 0, 34, 14, WHITE, outline=INK)
    p.oval(28, 4, 46, 14, WHITE, outline=INK)
    p.rect(6, 9, 40, 13, WHITE)
    p.rect(6, 12, 40, 13, INK)


def draw_star(p: Pen, size: int) -> None:
    """Une petite étoile de 9 x 9."""
    if size > 1:
        p.rect(4, 0, 5, 9, INK)
        p.rect(0, 4, 9, 5, INK)
        for sx, sy in ((2, 2), (6, 2), (2, 6), (6, 6)):
            p.rect(sx, sy, sx + 1, sy + 1, INK)
    else:
        p.rect(4, 1, 5, 8, INK)
        p.rect(1, 4, 8, 5, INK)


MOON_CRESCENTS = [5, 8, 12, None, 12, 8, 5]


def moon_tile(phase: int, scale: int) -> Image.Image:
    """Une phase de lune : 20 x 40, ou 40 x 40 pour la pleine lune."""
    thickness = MOON_CRESCENTS[phase]
    if thickness is None:
        tile = Image.new("RGBA", (40 * scale, 40 * scale), (0, 0, 0, 0))
        ImageDraw.Draw(tile).ellipse(
            [2 * scale, 2 * scale, 38 * scale - 1, 38 * scale - 1], fill=INK
        )
        return tile

    tile = Image.new("RGBA", (20 * scale, 40 * scale), (0, 0, 0, 0))
    draw = ImageDraw.Draw(tile)
    draw.ellipse([0, 0, 20 * scale - 1, 40 * scale - 1], fill=INK)
    offset = thickness * scale
    if phase < 3:
        draw.ellipse([offset, 0, 20 * scale - 1 + offset, 40 * scale - 1], fill=(0, 0, 0, 0))
    else:
        draw.ellipse([-offset, 0, 20 * scale - 1 - offset, 40 * scale - 1], fill=(0, 0, 0, 0))
    return tile


def draw_ground(p: Pen, bumpy: bool) -> None:
    """Le sol : 600 x 12, ligne continue et petits cailloux."""
    p.rect(0, 0, 600, 2, INK)
    seed = 7 if bumpy else 3
    for i in range(0, 600, 11):
        wobble = (i * seed) % 17
        if wobble < 4:
            p.rect(i, 2, i + 2 + wobble, 3, INK)
        if bumpy and wobble > 12:
            p.rect(i, 0, i + 6, 1, (0, 0, 0, 0))
            p.rect(i, 1, i + 6, 3, INK)


def draw_restart(p: Pen) -> None:
    """L'icône « rejouer » : une flèche circulaire, 36 x 32."""
    p.oval(4, 2, 32, 30, INK)
    p.oval(8, 6, 28, 26, (0, 0, 0, 0))
    p.rect(18, 0, 32, 10, (0, 0, 0, 0))
    p.poly([(16, 0), (28, 6), (16, 12)], INK)


def draw_text(img: Image.Image, coords, scale: int) -> None:
    """Les chiffres du score, les lettres HI, et le message de fin de partie."""
    draw = ImageDraw.Draw(img)
    ox, oy = coords["TEXT_SPRITE"]
    digits_font = ImageFont.truetype(FONT_PATH, 11 * scale)
    for index, char in enumerate("0123456789HI"):
        box = draw.textbbox((0, 0), char, font=digits_font)
        x = ox + index * 10 * scale + (10 * scale - (box[2] - box[0])) // 2 - box[0]
        y = oy + (13 * scale - (box[3] - box[1])) // 2 - box[1]
        draw.text((x, y), char, font=digits_font, fill=INK)

    message = "PARTIE FINIE"
    message_font = ImageFont.truetype(FONT_PATH, 10 * scale)
    box = draw.textbbox((0, 0), message, font=message_font)
    x = ox + (191 * scale - (box[2] - box[0])) // 2 - box[0]
    y = oy + 13 * scale + (11 * scale - (box[3] - box[1])) // 2 - box[1]
    draw.text((x, y), message, font=message_font, fill=INK)


def build_sheet(scale: int, coords, size) -> Image.Image:
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    def pen(key, dx=0, dy=0):
        x, y = coords[key]
        return Pen(draw, x + dx * scale, y + dy * scale, scale)

    draw_restart(pen("RESTART"))
    draw_cloud(pen("CLOUD"))
    draw_flying_germ(pen("PTERODACTYL"), "up")
    draw_flying_germ(pen("PTERODACTYL", dx=46), "down")

    # Microbes : une case d'un microbe, puis de deux, puis de trois.
    for width, height, key in ((17, 35, "CACTUS_SMALL"), (25, 50, "CACTUS_LARGE")):
        slot = 0
        for group in (1, 2, 3):
            for index in range(group):
                draw_germ(pen(key, dx=(slot + index) * width), width, height)
            slot += group

    moon_x, moon_y = coords["MOON"]
    for phase, offset in enumerate([0, 20, 40, 60, 100, 120, 140]):
        tile = moon_tile(phase, scale)
        img.alpha_composite(tile, (moon_x + offset * scale, moon_y))

    for index, size_step in enumerate((1, 2, 1)):
        draw_star(pen("STAR", dy=index * 9), size_step)

    for index, (name, offset) in enumerate(RUNNER_FRAMES.items()):
        draw_runner(pen("TREX", dx=offset), name)
    for name, offset in DUCK_FRAMES.items():
        draw_runner_duck(pen("TREX", dx=offset), name)

    draw_ground(pen("HORIZON"), bumpy=False)
    draw_ground(pen("HORIZON", dx=600), bumpy=True)

    draw_text(img, coords, scale)
    return img


def main() -> None:
    target = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "public",
        "jeux",
        "saute-microbe",
    )
    os.makedirs(target, exist_ok=True)
    build_sheet(1, LDPI, SHEET_1X).save(os.path.join(target, "microbes-1x.png"))
    build_sheet(2, HDPI, SHEET_2X).save(os.path.join(target, "microbes-2x.png"))
    print("Planches écrites dans", target)


if __name__ == "__main__":
    main()
