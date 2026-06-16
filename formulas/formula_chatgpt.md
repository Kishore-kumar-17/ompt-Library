# Formula — ChatGPT (v4.2)

## Overview

ChatGPT receives the **longest, most narrative** version of each prompt. It handles rich prose well and benefits from full context: camera rig, grade, palette, references, and excludes. The lock block uses inline bolded headers prefixed with `LOCKS —`.

---

## Word Budget

| Version | Range |
|---------|-------|
| v4.1 | 170–190 words |
| v4.2 | 200–225 words |

~30 words of headroom are used by the geometry and orientation locks added in v4.2.

---

## Structure (in order)

1. **Shot type + campaign line** — e.g. "Medium-Shot Still-Life Product Photograph for BRAND SS26 Campaign."
2. **Subject description** — detailed: form factor, material, color, finish, label/brand text, props.
3. **Lock block** (inline, bolded) — all applicable locks from the tier.
4. **Camera rig** — body, lens, aperture, shutter, ISO, tethered/stack info.
5. **Grade** — LUT, film emulation, grain, EV.
6. **Palette** — 3–5 named colors with hex codes and percentages.
7. **References** — 3–4 photographer or campaign references.
8. **Exclude** — comma-separated list of things to avoid.

---

## Lock Block Format

Use inline bolded headers, all on one line or wrapped naturally:

```
**LOCKS — GEOMETRY:** <content>. **ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>. **MATERIAL:** <content>.
```

For PEOPLE tier (no GEOMETRY / MATERIAL; CLOTHING added):
```
**LOCKS — ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>. **CLOTHING:** <content>.
```

For ART tier (ORIENTATION + FRAMING + LIGHT only):
```
**LOCKS — ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>.
```

---

## Tier Rules

| Tier | Locks Applied |
|------|--------------|
| PRODUCT | GEOMETRY · ORIENTATION · FRAMING · LIGHT · MATERIAL |
| PEOPLE | ORIENTATION · FRAMING · LIGHT · CLOTHING |
| ART | ORIENTATION · FRAMING · LIGHT |

---

## Lock Content (verbatim from lock block — do not paraphrase)

The values inside every lock header must be **byte-identical** to the shared lock block defined for that row. ChatGPT may have slightly expanded phrasing for readability, but all numeric values (angles, heights, ratios, Kelvin, percentages) must be exact.

---

## Example (PRODUCT tier — PRD-PHT)

```
Medium-Shot Still-Life Product Photograph for ATELIER 14 SS26 Atelier Series campaign. Subject: structured caramel tote in Full-Grain Saffiano Leather, hot-foil-stamped 'ATELIER 14' in Didot 12pt serif on the Ivory Suede interior label, gold-foil 'EST. 2014' tag in 8pt sans at handle base, on a sheet of ivory Carrara Marble paired with exactly 2 props — folded ivory suede pouch and a single polished-brass key on a thin leather fob.

**LOCKS — GEOMETRY:** structured trapezoidal tote, 32cm × 26cm × 14cm, 1.23:1 W-H, 4 body panels, 2 rolled handles 38cm × 1.8cm, 4 brass D-rings + 2 buckles, 4-spi hand-stitching. **ORIENTATION:** vertical centerline 90°, front face 0° to lens, top opening 0° flat-rest, handles 88° symmetrical, pouch 24° camera-right, key on fob 12° camera-left. **FRAMING:** lens 0.92m at mid-body, tilt 0°, tote 68%×52%, Rule-of-Thirds Left (0.34, 0.52), negative 38% camera-right marble, AR 4:5. **LIGHT:** key 45°az/38°alt 5400K, fill 270°az/12°alt 5400K bounce, rim none (flag behind lens), feather 32%, 3.5:1 contrast. **MATERIAL:** Saffiano 22% gloss 0.6mm crosshatch, suede label 8% matte 1.2mm nap, brass 92% specular, Carrara 18% wax 4mm vein SSS, pouch 6% matte 1.5mm nap.

Camera: Phase One XF IQ4 150MP, Schneider 80mm LS at f/8, 1/125s, ISO 50, tethered. Grade: Capture One Cool-35 LUT, Kodak Portra 400 emulation, grain 12, -0.3 EV. Palette: caramel #c38a4f 55%, ivory #f2ebde 30%, brass #b08d4a 15%. References: Christian Coigny, Paolo Roversi, Céline quiet-luxury, Bonpoint stillness. Exclude: harsh specular, plastic sheen, visible seams, logo distortion, cluttered props.
```

---

## Quantization Rules

Avoid round numbers — they read as approximate:

| Avoid | Use Instead |
|-------|-------------|
| 50% | 48% or 52% |
| 45° | 47° or 43° |
| 1.5m | 1.52m or 1.47m |
| 5000K | 5200K or 4800K |
| 3:1 | 3.2:1 or 3.5:1 |

Exception: semantically meaningful round values (AR 4:5, centered axis 0.50) are kept as-is.

---

## Tokens to Delete (filler — add zero lock-in value)

- `8K ultra-sharp commercial resolution`
- `aesthetic 8K ultra sharp`
- `sized perfectly for X:X`
- Generic lens defaults like `shot on 85mm at f/2.8` when not load-bearing
- Vague stacks: `refined elegant sophisticated` — pick one specific word
