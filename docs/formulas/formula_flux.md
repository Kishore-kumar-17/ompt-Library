# Formula — Flux (v4.2)

## Overview

Flux receives the **longest, most fully-elaborated** version of each prompt. It reads long natural-language prose best, so every lock is written as a **complete sentence** with a `LOCK` suffix on each header (e.g. `**GEOMETRY LOCK:**`). There is no camera jargon — Flux interprets photographic language differently and benefits from descriptive scene prose instead. The surrounding subject description is the richest of all six platforms.

---

## Word Budget

| Version | Range |
|---------|-------|
| v4.1 | 220–240 words |
| v4.2 | 255–285 words |

Flux has the highest word budget. The `LOCK` suffix blocks are written as full sentences, which naturally extends length.

---

## Structure (in order)

1. **Shot type + campaign line** — full sentence with campaign context.
2. **Subject description** — the most detailed of all six platforms. Full material, texture, label text, finish, props described in narrative form. Use "Subject: ..." opener.
3. **Lock block** (full sentences, bolded headers ending in `LOCK`) — all applicable locks.
4. **Capture line** — camera body, lens, aperture, shutter, ISO, focus-stack info (if applicable). Use "Capture: ..." opener.
5. **Grade line** — LUT, film emulation, grain, EV, any selective dodges. Use "Grade: ..." opener.
6. **Palette** — named colors + hex + percentage. Use "Palette: ..." opener.
7. **References** — 3–5 names/campaigns written out in full. Use "References: ..." opener.
8. **Exclude** — comma-separated. Use "Exclude: ..." opener.

---

## Lock Block Format

Each lock header ends in `LOCK` and is followed by a full sentence. All five (or applicable) locks appear as bold inline headers in sequence:

```
**GEOMETRY LOCK:** <full sentence>. **ORIENTATION LOCK:** <full sentence>. **FRAMING LOCK:** <full sentence>. **LIGHT LOCK:** <full sentence>. **MATERIAL LOCK:** <full sentence>.
```

For PEOPLE tier:
```
**ORIENTATION LOCK:** <full sentence>. **FRAMING LOCK:** <full sentence>. **LIGHT LOCK:** <full sentence>. **CLOTHING LOCK:** <full sentence>.
```

For ART tier:
```
**ORIENTATION LOCK:** <full sentence>. **FRAMING LOCK:** <full sentence>. **LIGHT LOCK:** <full sentence>.
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

All **numeric values** must be **byte-identical** to the shared lock block. Flux lock sentences expand the abbreviated lock block into full English syntax — "at" and "with" and connective words are added back — but no number, ratio, angle, or measurement changes.

Acceptable expansion:
- Lock block: `32cm width × 26cm height × 14cm depth`
- Flux: `32cm width by 26cm height by 14cm depth`

Not acceptable:
- Changing `1.23:1` to `1.2:1`
- Rounding `0.92m` to `0.9m`
- Paraphrasing `4-spi hand-stitching` as `hand-stitched seams`

---

## Full-Sentence Expansion Rules

- `lens height 0.92m at mid-body` → `camera lens height 0.92m positioned at the tote mid-body`
- `tilt 0° horizon level` → `tilt at 0° horizon level`
- `key 45°az/38°alt 5400K` → `key 4×6ft softbox at 45° azimuth camera-right / 38° altitude / 5400K`
- `fill 270°az/12°alt 5400K bounce` → `fill 4×6ft white bounce at 270° azimuth camera-left / 12° altitude / 5400K`
- `feather 32%` → `shadow feather 32%`
- `3.5:1 contrast` → `contrast ratio 3.5:1 key-to-fill`

---

## Example (PRODUCT tier — PRD-PHT)

```
Medium-Shot Still-Life Product Photograph for ATELIER 14 SS26 Atelier Series campaign. Subject: a structured caramel tote crafted in Full-Grain Saffiano Leather with embossed crosshatch texture and subtle tonal gloss, hot-foil-stamped 'ATELIER 14' in Didot 12pt serif on the Ivory Suede interior label, a gold-foil 'EST. 2014' tag in 8pt sans at the handle base, set on a sheet of ivory Carrara Marble and paired with exactly 2 props — a folded ivory suede drawstring pouch and a single polished-brass key on a thin rolled leather fob.

**GEOMETRY LOCK:** structured trapezoidal tote, 32cm width × 26cm height × 14cm depth, 1.23:1 width-to-height ratio, 4 vertical body panels, 2 rolled top handles at 38cm length and 1.8cm gauge, 4 polished brass D-rings plus 2 buckles, 4-stitches-per-inch tonal hand-stitching at every seam. **ORIENTATION LOCK:** tote vertical centerline at 90° to ground, front face squared 0° to lens, top opening at 0° flat-rest, handles upright at 88° as a symmetrical pair, suede pouch canted 24° camera-right of base, brass key on fob aligned 12° camera-left along the marble grain. **FRAMING LOCK:** camera lens height 0.92m at tote mid-body, tilt 0° horizon level, tote occupies 68% of frame height and 52% of frame width, anchored on the Rule-of-Thirds Left intersection at (x=0.34, y=0.52), negative space 38% on camera-right marble surface, canvas AR 4:5. **LIGHT LOCK:** key 4×6ft softbox at 45° azimuth camera-right / 38° altitude / 5400K, fill 4×6ft white bounce at 270° azimuth camera-left / 12° altitude / 5400K, rim none with black flag behind lens, shadow feather 32%, contrast ratio 3.5:1 key-to-fill. **MATERIAL LOCK:** Saffiano calf with 22% tonal gloss and embossed crosshatch at 0.6mm pitch, ivory suede label 8% matte velvet nap at 1.2mm, polished brass 92% mirror-specular with hairline grain, Carrara marble 18% wax-polish with 4mm grey vein subsurface, suede pouch 6% matte at 1.5mm nap.

Capture: Phase One XF IQ4 150MP medium-format body with Schneider 80mm LS leaf-shutter at f/8, 1/125s, ISO 50, tethered to Capture One. Grade: Capture One Cool-35 LUT, Kodak Portra 400 film emulation, grain 12, -0.3 EV, selective label dodge +0.5 stop. Palette: caramel #c38a4f 55%, ivory #f2ebde 30%, brass #b08d4a 15%. References: Christian Coigny, Paolo Roversi, Céline quiet-luxury, Bonpoint stillness, Parisian-atelier mood. Exclude: harsh specular, plastic sheen, visible seams, logo distortion, cluttered props.
```

---

## Quantization Rules

Same non-round number rule applies throughout — in both lock sentences and prose:

| Avoid | Use Instead |
|-------|-------------|
| 50% | 48% or 52% |
| 45° | 47° or 43° |
| 1.5m | 1.52m or 1.47m |
| 5000K | 5200K or 4800K |
| 3:1 | 3.2:1 or 3.5:1 |

---

## Tokens to Delete

- `8K ultra-sharp` or any resolution cargo-cult phrase
- `shot on 85mm at f/2.8` as a filler default (include only when the specific lens is load-bearing)
- `refined elegant sophisticated` stacks — choose one precise word
- Any prose that restates what the lock sentence already encodes with higher precision — the lock is authoritative
