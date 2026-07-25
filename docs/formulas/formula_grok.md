# Formula — Grok (v4.2)

## Overview

Grok receives the **most compressed** version of each prompt. It has the tightest word budget of any prose platform. The surrounding description is stripped to subject identity and key differentiators only. The lock block uses the same bolded headers as Gemini but the non-lock prose is reduced to telegraphic form — no articles, minimal connective tissue.

---

## Word Budget

| Version | Range |
|---------|-------|
| v4.1 | 125–150 words |
| v4.2 | 140–165 words |

Tightest compression of all six platforms.

---

## Structure (in order)

1. **Shot type + campaign line** — single compact line.
2. **Subject description** — essential identifiers only: form, material, color, label text, key props. No explanatory phrases.
3. **Lock block** (inline, bolded) — all applicable locks, values in maximally compressed form.
4. **Camera + grade** — bare minimum: body abbreviation, lens, settings. No expanded prose.
5. **Palette** — hex + percentage, no color names spelled out.
6. **References** — surnames only (no first names, no campaign titles).
7. **Exclude** — comma-separated, kept short.

---

## Lock Block Format

Same bolded headers as Gemini. Values are written in **hyphen-chain / space-separated abbreviated form** — remove articles and connective words inside the lock values:

```
**GEOMETRY:** <compressed values>. **ORIENTATION:** <compressed values>. **FRAMING:** <compressed values>. **LIGHT:** <compressed values>. **MATERIAL:** <compressed values>.
```

For PEOPLE tier:
```
**ORIENTATION:** <compressed values>. **FRAMING:** <compressed values>. **LIGHT:** <compressed values>. **CLOTHING:** <compressed values>.
```

For ART tier:
```
**ORIENTATION:** <compressed values>. **FRAMING:** <compressed values>. **LIGHT:** <compressed values>.
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

All **numeric values** (angles, heights, ratios, Kelvin, percentages) must be **byte-identical** to the shared lock block. Grok may drop connecting words like "at", "with", "and" inside lock values, but must never change a number or measurement.

---

## Example (PRODUCT tier — PRD-PHT)

```
ATELIER 14 SS26 Atelier Series Medium-Shot Still-Life Product Photograph 4:5. Caramel Saffiano tote, hot-foil 'ATELIER 14' Didot 12pt serif on Ivory Suede label, gold-foil 'EST. 2014' 8pt sans handle tag, on Carrara Marble, suede pouch + brass key on leather fob.

**GEOMETRY:** trapezoidal tote 32×26×14cm 1.23:1 W-H 4 panels 2 handles 38cm×1.8cm 4 D-rings 2 buckles 4-spi stitch. **ORIENTATION:** centerline 90° front 0° top 0° handles 88° pouch 24° camera-right key 12° camera-left. **FRAMING:** lens 0.92m tilt 0° tote 68%×52% Rule-of-Thirds Left (0.34, 0.52) neg 38% camera-right AR 4:5. **LIGHT:** key 45°/38°/5400K fill 270°/12°/5400K rim none feather 32% 3.5:1. **MATERIAL:** Saffiano 22% gloss 0.6mm crosshatch suede 8% matte 1.2mm brass 92% specular Carrara 18% wax 4mm SSS pouch 6% matte.

Phase One XF IQ4 Schneider 80mm LS f/8 1/125s ISO 50. Cool-35 LUT Portra 400 grain 12 -0.3 EV. Caramel #c38a4f 55% ivory #f2ebde 30% brass #b08d4a 15%. Coigny Roversi Céline Bonpoint. Exclude: harsh specular, plastic sheen, visible seams, logo distortion, cluttered props.
```

---

## Compression Rules Specific to Grok

- Drop articles in subject line and lock values: "a tote 32×26cm" → "tote 32×26cm"
- Compress camera line — omit "tethered", "medium-format body", "leaf-shutter" unless load-bearing
- Use slash-separated compact light notation: `key az°/alt°/Kelvin`
- Drop "MP" suffix on camera body if obvious (XF IQ4 is always 150MP)
- Reference line: surnames only, no "Paolo" or "Tim" — just "Roversi Walker"
- Exclude list: drop items that are implied (e.g. "logo distortion" can stay; "poor lighting" is too vague to include)

---

## Quantization Rules

Same across all platforms:

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
- Any vague adjective stacks
- Full camera model names where shortened form is unambiguous
- Expanded prose that restates what the lock block already encodes
