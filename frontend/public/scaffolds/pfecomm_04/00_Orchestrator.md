# 00 — Orchestrator
## Indian D2C Youth Fashion Brand · pfecomm_platform_04

You are building a Bewakoof-style Indian D2C youth fashion e-commerce site. Read this file first. It tells you what makes this build unique and where to find everything else.

---

## Reading Sequence

| Order | File | Read when |
|-------|------|-----------|
| 1 | `00_Orchestrator.md` | Always first — this file |
| 2 | `01_PRD.md` | Before writing any component |
| 3 | `02_Architecture.md` | Before writing any TypeScript |
| 4 | `03_Design.md` | Before writing any CSS |
| 5 | `04_Plan.md` | For day-by-day build order |
| 6 | `05_Epics_and_Stories.md` | For acceptance criteria |
| 7 | `06_Tasks.md` | For task-by-task execution |
| 8 | `07_Guide.md` | When stuck or making a mistake |

---

## The Four-Site Progression

This is the fourth in a series. Each site is architecturally and visually distinct:

| Dimension | pfecomm_01 (Aritzia) | pfecomm_02 (FabIndia) | pfecomm_03 (AJIO) | pfecomm_04 (Bewakoof) |
|-----------|----------------------|-----------------------|--------------------|-----------------------|
| Background | Pure white | Warm ivory | Pure white | Pure white |
| CTA color | Black | Deep maroon | AJIO orange | **Yellow** |
| CTA text color | White | White | White | **BLACK** |
| Button radius | 0px | 2px | 4px | **8px** |
| Image radius | 0px | 0px | 4px | **16px** |
| Card shadow | None | None | None | **0 2px 8px rgba(0,0,0,0.08)** |
| Font | Freight + DM Sans | Cormorant + Inter | Inter only | **Montserrat only** |
| Grid | 4 columns | 4 columns | 5 columns | 4 columns |
| Discount display | Never | Never | Always (badge) | Always (badge, no timer) |
| Craft/brand badge | None | CraftTechnique | None | **PrintStyle** |
| Color images | Per-colorway | Per-colorway | Shared | **Per-colorway (tee color)** |
| Loyalty | None | None | None | **Coins (informational)** |
| Combo deal | None | None | None | **3-for-₹1199** |
| Wishlist store | None | None | Separate Zustand | None (basic) |
| Free shipping | ₹800 | ₹999 | ₹599 | **₹499** |

---

## What Makes pfecomm_04 Unique

**1. Yellow CTA with black text** — the single most important rule.
Yellow `hsl(47deg 100% 60%)` (#FFD232) with WHITE text fails WCAG AA (1.5:1 contrast). With BLACK text it passes (14:1). Every CTA in this build uses `color: var(--color-text)` (black) on yellow. This is the opposite of every other site in the series.

**2. Card box shadow** — Bewakoof's tactile identity.
Every product card has `box-shadow: 0 2px 8px rgba(0,0,0,0.08)` at rest and `0 4px 16px rgba(0,0,0,0.14)` on hover. No other site in this series uses shadows. This soft elevation is the brand signature.

**3. Combo deal system** — unique mechanics.
When a user has 3+ `comboEligible` items (tshirts, crop-tops) in cart, a batch discount applies: `Math.floor(count / COMBO_QTY) * COMBO_PRICE`. This is not a coupon — it's automatic. `getComboSavings()` and `getComboProgress()` in `lib/utils.ts` are the only computation points.

**4. PrintStyle taxonomy** — replaces craft badge.
Like pfecomm_02 has `CraftTechnique`, pfecomm_04 has `PrintStyle`: `'hyperprint' | 'minimal' | 'acid-wash' | 'typography' | 'solid' | 'graphic' | 'licensed'`. Show badge only when `printStyle !== 'solid'`.

**5. Montserrat, single font** — no display/body split.
Unlike pfecomm_02's dual-font system (Cormorant + Inter), pfecomm_04 uses only Montserrat at weights 400/500/600/700/800. No serif face anywhere.

---

## Color System at a Glance

```css
--color-brand: hsl(47deg 100% 60%);    /* Yellow #FFD232 — CTA background */
--color-deal: hsl(26deg 100% 50%);     /* Orange #FF6F00 — combo pricing only */
--color-discount: hsl(354deg 78% 44%); /* Red — discount badge on cards */
--color-text: hsl(0deg 0% 10%);        /* Near-black — ALL text, CTA labels */
--color-text-muted: hsl(0deg 0% 45%);  /* Mid-grey — secondary text */
--color-border: hsl(0deg 0% 88%);      /* Light grey border */
--color-surface: hsl(0deg 0% 100%);    /* Pure white — background */
```

**Critical: `--color-brand` is NEVER used for text. It is only a background color.**

---

## Working Rules

1. Read `02_Architecture.md` before writing any TypeScript
2. Combo deal: `getComboSavings()` and `getComboProgress()` are the ONLY computation points
3. PrintStyle badge: show ONLY when `printStyle !== 'solid'`
4. CTA text is always black (`var(--color-text)`), never white, never the brand yellow
5. `--color-deal` (orange) appears ONLY in combo pricing callouts — not as a button color
6. Card shadows are required on all product cards — no shadow = off-brand
7. `border-radius: 16px` on product image wrappers; `8px` on buttons
8. Per-color images: `ColorOption.images[]` contains different photography per tee color
9. `coinsEarned` on Product is display-only — no transaction logic in this build
10. No countdown timers — combo progress bar ≠ timer

---

## When to Stop and Ask

Stop and ask the user if:
- You are about to use white text on the yellow CTA button
- You are about to add a countdown timer (combo progress bar is allowed; countdown is not)
- You are about to use orange (`--color-deal`) as a CTA or nav color
- You are about to implement coins as a real transaction system (they are display-only)
- You are about to merge `getComboSavings` and `getComboProgress` into the cart store (they belong in `lib/utils.ts`)
- You are about to use a serif or display font
- You are about to remove box shadows from product cards
- You are about to make the grid 5 columns (that's AJIO's pattern)
- You are about to apply `border-radius: 16px` to buttons (that's the image radius; buttons use 8px)
