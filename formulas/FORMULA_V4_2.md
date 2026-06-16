# Pro Formula v4.2 — Geometry Lock spec

v4.2 = v4.1 + **verbatim LOCK BLOCK** repeated byte-identical in all 6 platform cells. The lock block is what forces shape / orientation / framing / lighting / material convergence across ChatGPT, Gemini, Grok, Midjourney, Firefly, and Flux.

---

## The 10 invariants (2 new)

Carried from v4.1 (1-8):
1. Anchor phrase verbatim in every platform
2. ≥5 hex codes with `%` in every platform
3. Identical camera rig (body, lens, aperture, shutter, ISO)
4. Identical lighting rig
5. Identical exclude list
6. Identical typography (when applicable)
7. Skin physics phrase on every face
8. Consistent canvas AR

**New in v4.2:**
9. **Object Geometry Lock** — precise shape nouns + H:W ratio + sub-features, verbatim in every platform.
10. **Orientation + Framing + Light-direction Lock** — numeric values for body/head/gaze angles, lens height, tilt, subject %, grid position, key azimuth/altitude, Kelvin, shadow feather — verbatim in every platform.

---

## Tier assignment (by subcategory prefix)

| Tier | Locks applied | Subcategories | Rows |
|---|---|---|---|
| **PRODUCT** | GEOMETRY · ORIENTATION · FRAMING · LIGHT · MATERIAL | PRD-PHT, PRD-LIF, PRD-PKG, PRD-BAF, MKT-ADC, MKT-FLY, MKT-POS, MKT-BAN, FAS-ACC | ~140 |
| **PEOPLE** | ORIENTATION · FRAMING · LIGHT · CLOTHING | PEO-PRO, PEO-AVT, PEO-LIF, PEO-CUL, FAS-CLO, FAS-LBK, FAS-TRD, SOC-INS, SOC-YTB, SOC-TWX, SOC-FAC, SOC-LIN | ~160 |
| **ART** | ORIENTATION · FRAMING · LIGHT | ART-CUL, ART-DIG, ART-TRD | ~50 |

---

## Lock-block format (verbatim text, all tiers)

**PRODUCT tier template** (all 5 locks):
```
GEOMETRY: <object form nouns>, <primary dimension> <unit>, <secondary dimension> <unit>, <H-to-W ratio>, <count or sub-feature>, <deformation or variation%>.
ORIENTATION: <primary axis deg>, <sub-element-1 angle>, <sub-element-2 angle>, <sub-element-3 angle>, <sub-element-4 angle>, <spatial-relation rule>.
FRAMING: lens height <m>, tilt <deg>, subject occupies <H%> × <W%> frame, centered (x=<0.xx>, y=<0.xx>), negative space <%> <distribution>, canvas AR <X:Y>.
LIGHT: key <az>°/<alt>°/<Kelvin>, rim <az>°/<alt>°/<Kelvin>, fill <az>°/<alt>°/<Kelvin>, shadow feather <%>, contrast <ratio> key-to-fill.
MATERIAL: <surface-1> <sheen%>, <surface-2> <state> <metric>, <surface-3> <property> <metric>, ...
```

**PEOPLE tier template** (no GEOMETRY, no MATERIAL; CLOTHING added):
```
ORIENTATION: body rotated <deg> <direction>, shoulders <state>, head counter-rotated <deg> <direction>, chin <level>, gaze <direction> to lens at <vert>°/<horiz>°, eyelids <% open>, mouth <state> with <corner-lift deg>.
FRAMING: lens height <m> at <landmark>, tilt <deg>, subject <frame type>, face occupies <%> of frame area, face centered on <grid intersection> (x=<0.xx>, y=<0.xx>), negative space <%> <distribution>, canvas AR <X:Y>.
LIGHT: key <source> <az>° <direction> / <alt>° / <Kelvin>, fill <source> <az>° <direction> / <alt>° / <Kelvin> (<gel>), shadow feather <%>, contrast <ratio>, catch-light at <clock-position> on both iris.
CLOTHING: <garment> <fabric> <construction>, <feature-1> <metric>, <feature-2> <metric>, <fit descriptor> <ease>, <break point>; <second garment> <fabric> <feature>, drape <deg> <direction>.
```

**ART tier template** (ORIENTATION + FRAMING + LIGHT only):
```
ORIENTATION: <subject-1 body orientation + head angle>, <subject-2 body orientation + head angle>, <symmetry rule>, <detail count or sub-feature>, <central element orientation>.
FRAMING: <view type>, camera perpendicular to <plane> at <deg>, <element-1> at (x=<0.xx>, y=<0.xx>), <element-2> at (x=<0.xx>, y=<0.xx>), border <%> <rule>, negative space <%>, canvas AR <X:Y>.
LIGHT: <source> <Kelvin> <altitude>°/<azimuth>°, <chiaroscuro state>, shadow feather <%>, contrast <ratio>, specular <state>.
```

---

## Platform-specific formatting rules

All platforms get the SAME lock-block content. Only the surrounding formatting differs.

**ChatGPT / Gemini / Grok / Firefly / Flux** — plain prose, use inline bolded header:
```
**LOCKS — GEOMETRY:** <content>. **ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>. **MATERIAL:** <content>.
```

**Midjourney** — use `::` weight-break with hyphenated tokens, since MJ's tokenizer reads `::` as a concept boundary:
```
:: GEOMETRY <hyphenated-content> :: ORIENTATION <hyphenated-content> :: FRAMING <hyphenated-content> :: LIGHT <hyphenated-content> :: MATERIAL <hyphenated-content> ::
```

**Flux** — full sentences with **LOCK** suffix on each header, since Flux reads long prose best:
```
**GEOMETRY LOCK:** <full sentence>. **ORIENTATION LOCK:** <full sentence>. **FRAMING LOCK:** <full sentence>. **LIGHT LOCK:** <full sentence>. **MATERIAL LOCK:** <full sentence>.
```

---

## Word budgets (v4.2 ceilings)

| Platform | v4.1 | v4.2 | Notes |
|---|---|---|---|
| ChatGPT | 170-190w | 200-225w | ~30w headroom for locks |
| Gemini | 125-150w | 155-180w | compact lock form |
| Grok | 125-150w | 140-165w | tightest compression |
| Midjourney | 180-220w | 210-250w | token-dense with `::` |
| Firefly | 125-150w | 155-180w | compact lock form |
| Flux | 220-240w | 255-285w | full-sentence lock form |

Rule: delete v4.1 tokens that are now redundant with the lock (e.g. "centered burger 50% x 50% y" in v4.1 prose goes away because FRAMING LOCK now has it with higher precision). The lock block is authoritative; prose is atmosphere.

---

## Quantization rules — avoid these defaults

Too-round numbers feel fake. Models treat them as approximate. Use slightly off-round values:

| Bad | Good |
|---|---|
| 50% | 48% or 52% |
| 45° | 47° or 43° |
| 1.5m | 1.52m or 1.47m |
| 5000K | 5200K or 4800K |
| 3:1 | 3.2:1 or 3.5:1 |

Exception: when the lock value is semantically meaningful (AR 4:5, centered axis 0.50), keep the round value.

---

## Numeric value catalog by subject type

Reference values for consistency across the 350-row sweep:

### PRODUCT subjects
- **Bottles / flacons**: H:W ratio 2.5:1 to 5:1; lens height at mid-point; facet count 4/6/8; cap-to-body ratio 0.2
- **Food plates / composites**: lens 1.2-1.4m; subject 55-65% frame; 3-point rig; 4:1 to 5:1 contrast
- **Packaging boxes**: 3/4 hero at 25° off-axis; lens 1.1m; subject 45% frame; 4 visible facets
- **Accessories (watches, bags)**: macro 1:1; lens 0.8m; subject 65-75% frame; ring-light or cross-polarized

### PEOPLE subjects
- **Executive headshots**: 20° quarter-turn, 8° head counter-rotation; lens 1.52m at eye-line; face 24% frame; 3:1 contrast
- **Lifestyle**: 3/4 at 30° camera-left; lens 1.40m; subject 55% frame; 4:1 golden-hour
- **Fashion editorial**: direct 0° or full profile 90°; lens 1.48m; subject 45% frame; 5:1 to 8:1 high-contrast
- **Cultural portraits**: direct 0° face-camera, eyes 0°/0°; lens 1.50m; face 30% frame; 2.5:1 soft
- **Avatars**: 0° frontal; lens 1.50m; face 35% frame; 2:1 flat

### ART subjects
- **Flat folk / traditional**: camera perpendicular 0°; canvas AR 1:1; 5600K overhead 90°/0°; feather 100%; 1:1 contrast
- **Digital illustration**: orthographic view 0°; subject 60% frame; flat lighting with rim 1:0.8 ratio
- **Traditional painting references**: gallery archival view; frame 45% ambient; subject 70% frame

---

## Output format for batch markdown files

```
## N. PID — Title
**Anchor:** anchor phrase · **AR:** X:Y · **Stylize:** N · **Tier:** PRODUCT/PEOPLE/ART
**Palette:** color #hex % · color #hex % · ...
**Lock block (verbatim in all 6 platforms):**
```
GEOMETRY: ...
ORIENTATION: ...
FRAMING: ...
LIGHT: ...
MATERIAL: ...
```

### ChatGPT (Nw)
[full v4.2 text]

### Gemini (Nw)
[full v4.2 text]

### Grok (Nw)
[full v4.2 text]

### Midjourney (Nw)
[full v4.2 text]

### Firefly (Nw)
[full v4.2 text]

### Flux (Nw)
[full v4.2 text]

---
```
