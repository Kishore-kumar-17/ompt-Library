# Formula — Firefly (v4.2)

## Overview

Firefly receives a **compact, commercially-safe** version that mirrors Gemini's structure and density. It uses the same bolded lock headers as Gemini (no `LOCKS —` prefix). The prose is similarly compressed — camera and grade on one line, references as a short name list. Firefly does not receive the `--ar` or `--v` flags used in Midjourney.

---

## Word Budget

| Version | Range |
|---------|-------|
| v4.1 | 125–150 words |
| v4.2 | 155–180 words |

Firefly and Gemini share the same word budget; Firefly's prose phrasing skews slightly more editorial.

---

## Structure (in order)

1. **Shot type + campaign line** — single compressed line including AR notation.
2. **Subject description** — material, color, finish, label text, key props in one paragraph.
3. **Lock block** (inline, bolded — no `LOCKS —` prefix) — all applicable locks.
4. **Camera + grade** — single compressed line (body, lens, settings, LUT, grain).
5. **Palette** — hex + percentage, compact single line.
6. **References** — short surname / brand list.
7. **Exclude** — comma-separated.

---

## Lock Block Format

Same format as Gemini — bolded headers with colon, no `LOCKS —` prefix:

```
**GEOMETRY:** <content>. **ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>. **MATERIAL:** <content>.
```

For PEOPLE tier:
```
**ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>. **CLOTHING:** <content>.
```

For ART tier:
```
**ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>.
```

---

## Tier Rules

| Tier | Locks Applied |
|------|--------------|
| PRODUCT | GEOMETRY · ORIENTATION · FRAMING · LIGHT · MATERIAL |
| PEOPLE | ORIENTATION · FRAMING · LIGHT · CLOTHING |
| ART | ORIENTATION · FRAMING · LIGHT |

---

## Lock Content

All **numeric values** must be **byte-identical** to the shared lock block. Firefly's lock values are at the same precision as Gemini — no shortening or rounding of angles, heights, ratios, or Kelvin values.

---

## Firefly-Specific Rules

- Phrase the opening line as **"editorial [shot type] [AR]"** to signal commercial intent: `editorial Medium-Shot Still-Life Product Photograph 4:5`
- Avoid camera jargon that Firefly ignores: drop "tethered", "focus-stacked N frames", and "leaf-shutter"
- Keep grade line as: `LUT-name grain-N [EV if non-zero]`
- References: use surname-only for photographers, full brand name for campaigns
- Exclude list: identical to Gemini for same row

---

## Example (PRODUCT tier — PRD-PHT)

```
ATELIER 14 SS26 Atelier Series editorial Medium-Shot Still-Life Product Photograph 4:5. Caramel Saffiano tote, hot-foil 'ATELIER 14' Didot 12pt serif on Ivory Suede label, gold-foil 'EST. 2014' 8pt sans handle tag, on Carrara Marble with folded ivory suede pouch and polished-brass key on leather fob.

**GEOMETRY:** structured trapezoidal tote, 32cm × 26cm × 14cm, 1.23:1 W-H, 4 body panels, 2 rolled handles 38cm × 1.8cm, 4 brass D-rings + 2 buckles, 4-spi hand-stitching. **ORIENTATION:** vertical centerline 90°, front face 0° to lens, top opening 0° flat-rest, handles 88° symmetrical, pouch 24° camera-right, key on fob 12° camera-left. **FRAMING:** lens 0.92m at mid-body, tilt 0°, tote 68%×52%, Rule-of-Thirds Left (0.34, 0.52), negative 38% camera-right marble, AR 4:5. **LIGHT:** key 45°az/38°alt 5400K, fill 270°az/12°alt 5400K bounce, rim none, feather 32%, 3.5:1. **MATERIAL:** Saffiano 22% gloss 0.6mm crosshatch, suede label 8% matte 1.2mm nap, brass 92% specular, Carrara 18% wax 4mm vein SSS, pouch 6% matte 1.5mm nap.

Phase One XF IQ4 Schneider 80mm LS f/8 1/125s ISO 50 tethered. Cool-35 LUT Portra 400 grain 12. Caramel #c38a4f 55% ivory #f2ebde 30% brass #b08d4a 15%. Coigny Roversi Céline Bonpoint. Exclude: harsh specular, plastic sheen, visible seams, logo distortion, cluttered props.
```

---

## Quantization Rules

Identical across all platforms:

| Avoid | Use Instead |
|-------|-------------|
| 50% | 48% or 52% |
| 45° | 47° or 43° |
| 1.5m | 1.52m or 1.47m |
| 5000K | 5200K or 4800K |
| 3:1 | 3.2:1 or 3.5:1 |

---

## Tokens to Delete

- `8K ultra-sharp`
- `sized perfectly for X:X`
- `tethered` (Firefly ignores tethering workflow references)
- `focus-stacked N frames` (not meaningful to Firefly)
- Vague adjective stacks — pick one specific descriptive word
- Prose that duplicates what the lock block already states at higher precision
