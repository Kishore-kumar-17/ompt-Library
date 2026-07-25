# Formula — Midjourney (v4.2)

## Overview

Midjourney uses a **token-dense, `::` weight-break format**. The `::` separator acts as a concept boundary in MJ's tokenizer — it forces the model to treat each segment as an independent weight-unit. Lock block values are written in **hyphenated-token form** rather than prose. The prompt ends with parameter flags.

---

## Word Budget

| Version | Range |
|---------|-------|
| v4.1 | 180–220 words |
| v4.2 | 210–250 words |

Midjourney has the second-highest word count due to token-density and the `::` scaffolding.

---

## Structure (in order)

1. **Shot type + subject description** — natural language prose, `::` after opening phrase.
2. **Subject detail segments** — each major subject element is its own `::` segment.
3. **Lock block segments** — one `::` segment per lock type, values in hyphenated form.
4. **Camera rig segment** — `Phase One XF IQ4 150MP Schneider 80mm LS f/8 1/125s ISO 50 tethered ::`
5. **Grade segment** — `Capture-One-LUT grain-N ±EV ::`
6. **Palette segment** — `color #hex NN% color #hex NN% ... palette ::`
7. **References segment** — `Firstname-Lastname Brand-name-style ::`
8. **Parameter flags** — `--ar X:Y --v 6.1 --stylize 0 --style raw --q 2 --no token1 token2 ...`

---

## Lock Block Format

Each lock gets its own `::` segment. Values use **hyphenated tokens** — no spaces inside a value, use hyphens to join multi-word terms:

```
:: GEOMETRY <hyphenated-values> :: ORIENTATION <hyphenated-values> :: FRAMING <hyphenated-values> :: LIGHT <hyphenated-values> :: MATERIAL <hyphenated-values> ::
```

For PEOPLE tier:
```
:: ORIENTATION <hyphenated-values> :: FRAMING <hyphenated-values> :: LIGHT <hyphenated-values> :: CLOTHING <hyphenated-values> ::
```

For ART tier:
```
:: ORIENTATION <hyphenated-values> :: FRAMING <hyphenated-values> :: LIGHT <hyphenated-values> ::
```

---

## Tier Rules

| Tier | Locks Applied |
|------|--------------|
| PRODUCT | GEOMETRY · ORIENTATION · FRAMING · LIGHT · MATERIAL |
| PEOPLE | ORIENTATION · FRAMING · LIGHT · CLOTHING |
| ART | ORIENTATION · FRAMING · LIGHT |

---

## Hyphenation Rules for Lock Values

- Replace spaces within a value with hyphens: `32 angular cuts in 4 bands of 8` → `32-angular-cuts-4-bands-of-8`
- Degree symbol stays attached: `90°`, `45°az`, `38°alt`
- Ratios stay as-is: `1.23:1`, `3.5:1`, `4:5`
- Hex codes stay as-is: `#c38a4f`
- Multiply signs in softbox sizes: `4×6ft` → `4x6ft` (use x not ×)
- Decimal points stay: `0.92m`, `0.34`, `1.2mm`

---

## Parameter Flags

Always end the prompt with these flags (adjust AR and stylize value per row):

```
--ar X:Y --v 6.1 --stylize 0 --style raw --q 2 --no <exclude-list>
```

- `--ar` must match the row's canvas AR
- `--stylize 0` is the default; change only if the row spec says otherwise
- `--no` receives the exclude list as space-separated hyphenated tokens: `--no harsh-specular plastic-sheen visible-seams`

---

## Example (PRODUCT tier — PRD-PHT)

```
Medium-Shot Still-Life Product Photograph for ATELIER 14 SS26 Atelier Series :: structured caramel tote in Full-Grain Saffiano Leather embossed crosshatch :: hot-foil 'ATELIER 14' Didot 12pt serif on Ivory Suede interior label velvet nap :: gold-foil 'EST. 2014' 8pt sans tag handle base :: ivory Carrara Marble with folded ivory suede pouch and polished-brass key on thin leather fob :: GEOMETRY structured-trapezoidal-tote 32cm-W-26cm-H-14cm-D 1.23-to-1-W-H 4-body-panels 2-rolled-handles-38cm-1.8cm-gauge 4-D-rings-2-buckles 4-spi-hand-stitching :: ORIENTATION tote-vertical-centerline-90° front-face-0°-to-lens top-opening-0°-flat-rest handles-upright-88°-symmetrical pouch-24°-camera-right key-on-fob-12°-camera-left :: FRAMING lens-height-0.92m tilt-0° tote-68%-height-52%-width Rule-of-Thirds-Left-0.34-0.52 negative-38%-camera-right canvas-AR-4:5 :: LIGHT key-45°az-38°alt-5400K fill-270°az-12°alt-5400K-bounce rim-none-flag-behind-lens shadow-feather-32% contrast-3.5:1 :: MATERIAL Saffiano-22%-gloss-0.6mm-crosshatch suede-label-8%-matte-1.2mm-nap brass-92%-mirror-specular Carrara-18%-wax-4mm-vein-SSS pouch-6%-matte-1.5mm-nap :: Phase One XF IQ4 150MP Schneider 80mm LS f/8 1/125s ISO 50 tethered :: Capture-One-Cool-35-LUT Kodak-Portra-400 grain-12 -0.3-EV :: caramel #c38a4f 55% ivory #f2ebde 30% brass #b08d4a 15% palette :: Christian-Coigny Paolo-Roversi Celine-quiet-luxury Bonpoint-editorial Parisian-atelier-stillness :: --ar 4:5 --v 6.1 --stylize 0 --style raw --q 2 --no harsh-specular plastic-sheen visible-seams logo-distortion cluttered-props
```

---

## Quantization Rules

Numeric values must be non-round per the shared lock block:

| Avoid | Use Instead |
|-------|-------------|
| 50% | 48% or 52% |
| 45° | 47° or 43° |
| 1.5m | 1.52m or 1.47m |
| 5000K | 5200K or 4800K |
| 3:1 | 3.2:1 or 3.5:1 |

---

## Tokens to Delete

- `8K-ultra-sharp` or similar quality-booster cargo-cult tokens (MJ ignores them)
- `aesthetic` as a standalone token
- Vague style words that duplicate a reference name already in the reference segment
- Any token that duplicates the lock value in prose form — lock wins, prose is dropped
