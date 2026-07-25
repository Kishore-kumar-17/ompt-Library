# Formula — Gemini (v4.2)

## Overview

Gemini receives a **compact but complete** version. It follows the same lock block as ChatGPT but omits the `LOCKS —` prefix on headers. The surrounding prose is tighter — no expanded camera rig sentences, just compressed parameter strings. References and excludes appear as a single trailing line.

---

## Word Budget

| Version | Range |
|---------|-------|
| v4.1 | 125–150 words |
| v4.2 | 155–180 words |

~30 words added for lock block content; compensated by trimming prose redundancies.

---

## Structure (in order)

1. **Shot type + campaign line** — same as ChatGPT but shorter.
2. **Subject description** — compressed: key material, color, label text, props in one paragraph.
3. **Lock block** (inline, bolded — no `LOCKS —` prefix) — all applicable locks.
4. **Camera + grade** — single compressed line (body, lens, settings, LUT, grain, EV).
5. **Palette** — hex codes + percentages in a single line.
6. **References** — short name list.
7. **Exclude** — comma-separated.

---

## Lock Block Format

No `LOCKS —` prefix. Plain bolded header followed by colon:

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

Values must be **byte-identical** to the shared lock block. Gemini uses the same numeric precision as the lock block — no rounding or paraphrasing of measured values.

---

## Example (PRODUCT tier — PRD-PHT)

```
ATELIER 14 SS26 Atelier Series Medium-Shot Still-Life Product Photograph 4:5. Subject: structured caramel tote in Full-Grain Saffiano Leather, hot-foil 'ATELIER 14' Didot 12pt serif on Ivory Suede interior label, gold-foil 'EST. 2014' 8pt sans handle tag, on ivory Carrara Marble with folded ivory suede pouch and polished-brass key on leather fob.

**GEOMETRY:** structured trapezoidal tote, 32cm × 26cm × 14cm, 1.23:1 W-H, 4 body panels, 2 rolled handles 38cm × 1.8cm, 4 brass D-rings + 2 buckles, 4-spi hand-stitching. **ORIENTATION:** vertical centerline 90°, front face 0° to lens, top opening 0° flat-rest, handles 88° symmetrical, pouch 24° camera-right, key on fob 12° camera-left. **FRAMING:** lens 0.92m at mid-body, tilt 0°, tote 68%×52%, Rule-of-Thirds Left (0.34, 0.52), negative 38% camera-right marble, AR 4:5. **LIGHT:** key 45°az/38°alt 5400K, fill 270°az/12°alt 5400K bounce, rim none, feather 32%, 3.5:1. **MATERIAL:** Saffiano 22% gloss 0.6mm crosshatch, suede label 8% matte 1.2mm nap, brass 92% specular, Carrara 18% wax 4mm vein SSS, pouch 6% matte 1.5mm nap.

Phase One XF IQ4 150MP Schneider 80mm LS f/8 1/125s ISO 50 tethered. Capture One Cool-35 LUT Portra 400 grain 12 -0.3 EV. Caramel #c38a4f 55% ivory #f2ebde 30% brass #b08d4a 15%. Christian Coigny Paolo Roversi Céline quiet-luxury Bonpoint stillness. Exclude: harsh specular, plastic sheen, visible seams, logo distortion, cluttered props.
```

---

## Compression Rules

Gemini's budget is tighter than ChatGPT's. Apply these compressions to the prose sections:

- Drop article words where not needed ("a", "the") in camera/grade lines
- Compress camera rig to: `Body Lens f/X 1/Xs ISO XX [tethered/stack N frames]`
- Compress grade to: `LUT-name grain-N ±EV`
- Drop expanded explanatory phrases — keep nouns + numbers only
- The lock block values are **never compressed** — they appear at full precision

---

## Quantization Rules

Same as all platforms — avoid round numbers:

| Avoid | Use Instead |
|-------|-------------|
| 50% | 48% or 52% |
| 45° | 47° or 43° |
| 1.5m | 1.52m or 1.47m |
| 5000K | 5200K or 4800K |
| 3:1 | 3.2:1 or 3.5:1 |

---

## Tokens to Delete

- `8K ultra-sharp commercial resolution`
- `sized perfectly for X:X`
- Vague adjective stacks (`refined elegant sophisticated`)
- Redundant prose that duplicates lock values (e.g. "centered burger 50% x 50% y" in prose if FRAMING lock already states it)
