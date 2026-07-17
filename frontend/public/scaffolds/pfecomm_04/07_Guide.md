# 07 — Developer Guide
## Indian D2C Youth Fashion Brand · pfecomm_platform_04

The single most important engineering fact for this build: **yellow CTA buttons have black text, not white.** Everything else in this guide supports understanding that one constraint and the few unique mechanics around combo deals and print badges.

---

## 1. The Four-Site Contrast Table

If you have built pfecomm_01/02/03, reset these assumptions explicitly:

| Pattern | pfecomm_01 (Aritzia) | pfecomm_02 (FabIndia) | pfecomm_03 (AJIO) | pfecomm_04 (Bewakoof) |
|---------|----------------------|-----------------------|--------------------|------------------------|
| CTA bg | Black | Maroon | Orange | **Yellow** |
| CTA text | White | White | White | **BLACK** |
| Button radius | 0px | 2px | 4px | **8px** |
| Image radius | 0px | 0px | 4px | **16px** |
| Card shadow | None | None | None | **Required** |
| Font | Freight Display + DM Sans | Cormorant + Inter | Inter | **Montserrat only** |
| Grid | 4 col | 4 col | 5 col | **4 col** |
| Discount | Never | Never | Always | **Always** |
| Loyalty | None | None | None | **Coins (display only)** |
| Combo | None | None | None | **3-for-₹1,199** |
| Badge type | None | CraftTechnique | None | **PrintStyle** |
| Images | Per-colorway | Per-colorway | Shared | **Per-colorway (tee color)** |

---

## 2. Non-Negotiable Rules

| Rule | Why |
|------|-----|
| `color: var(--color-text)` on ALL yellow buttons | Yellow + white text = 1.5:1 contrast (WCAG fail); yellow + black text = 14:1 |
| `border-radius: 16px` on image wrappers | Bewakoof's rounded card aesthetic |
| `border-radius: 8px` on buttons | Consistent softness — these two radii must not be swapped |
| `box-shadow: var(--shadow-card)` on all product cards | Shadow is the brand's tactile signature |
| `getComboSavings()` and `getComboProgress()` in `lib/utils.ts` only | Not in the store; store calls utils |
| `printStyle !== 'solid'` is the only gate for print badge | Never show badge on solid tees |
| `--color-deal` only in combo active state | Orange is NOT a CTA color or accent |
| Montserrat single font | No serif, no display font pairing (unlike pfecomm_02) |
| `coinsEarned` is display-only | No coins store, no balance, no redemption UI |
| 4-column grid | Not 5 — 5 columns is pfecomm_03 (AJIO) |

---

## 3. Yellow WCAG Constraint — Full Explanation

Yellow `hsl(47deg 100% 60%)` has a relative luminance of approximately 0.55. On a white background (luminance 1.0), the contrast ratio is 1.8:1 — fine for large decorative elements. As a **background** for button labels:

```
White text on yellow: (1.0 + 0.05) / (0.55 + 0.05) = 1.75:1  → WCAG FAIL (need 3:1 for large, 4.5:1 for normal)
Black text on yellow: (0.55 + 0.05) / (0.05 + 0.05) = 6.0:1  → WCAG PASS (AA large and normal)
```

**The rule:** Every element that uses `background: var(--color-brand)` must also set `color: var(--color-text)` (near-black).

```css
/* CORRECT */
.addToBag {
  background: var(--color-brand);
  color: var(--color-text);  /* Black */
}

/* WRONG — fails WCAG AA */
.addToBag {
  background: var(--color-brand);
  color: #fff;
}
```

Exceptions: The logo wordmark uses `color: var(--color-brand)` as text on white — this is large decorative text at high weight. 22px Montserrat 800 at 1.8:1 on white is acceptable for decorative branding. But any interactive element, label, or body text must not use yellow as a foreground color.

---

## 4. Combo Deal Architecture

The combo deal is **not a coupon code and not a cart-level override**. It is a computed discount applied whenever the cart reaches a threshold of combo-eligible items.

```
Cart state (CartItem[])
  ↓
getComboProgress(items) → { count: 2, neededForNext: 1 }
  ↓ shown in ComboProgress component
getComboSavings(items) → ₹448 savings
  ↓ subtracted in checkout total display
```

```typescript
// Correct separation
// store/cart.ts
comboSavings: () => getComboSavings(get().items),  // Getter calls util

// lib/utils.ts — the only math
export function getComboSavings(items: CartItem[]): number {
  const eligibleItems = items.filter((i) => i.comboEligible)
  const totalQty = eligibleItems.reduce((sum, i) => sum + i.quantity, 0)
  const comboGroups = Math.floor(totalQty / COMBO_QTY)
  if (comboGroups === 0) return 0
  const normalTotal = eligibleItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const comboGroupCost = comboGroups * COMBO_PRICE
  // Items beyond last full group cost their individual price
  const remainder = totalQty % COMBO_QTY
  // ... simplification: normalTotal - comboGroupCost (see 02_Architecture for full impl)
  return Math.max(0, normalTotal - comboGroupCost)
}
```

**`comboEligible` on CartItem:** When `addItem()` is called, copy `product.comboEligible` onto the `CartItem`. This lets `getComboSavings` filter without looking up the product catalog.

**ComboProgress is not a countdown timer.** It shows static progress: "you have 2, add 1 more". It does not count down seconds. The distinction matters because countdown timers create manufactured urgency (forbidden in this series); progress bars show factual cart state.

---

## 5. PrintStyle Badge Logic

```typescript
// Correct
const showPrintBadge = product.printStyle !== 'solid'
const badgeLabel =
  product.printStyle === 'licensed' && product.collection
    ? product.collection           // "Star Wars" not "Licensed"
    : PRINT_LABELS[product.printStyle]

{showPrintBadge && (
  <span className={styles.printBadge}>{badgeLabel}</span>
)}

// Wrong — shows badge on solid tees
{product.printStyle && (
  <span className={styles.printBadge}>{PRINT_LABELS[product.printStyle]}</span>
)}

// Wrong — shows "Licensed" instead of the IP name
{product.printStyle === 'licensed' && (
  <span className={styles.printBadge}>Licensed</span>
)}
```

---

## 6. Per-Color Image Swap

Same mechanism as pfecomm_01 and pfecomm_02 — instant swap, no transition:

```typescript
// PDP state
const [activeColor, setActiveColor] = useState(product.colors[0])

// Color dot click
<button onClick={() => setActiveColor(color)} />

// Gallery receives current colorway's images
<ImageGallery images={activeColor.images} />
```

```typescript
// Wrong — would transition the image (not Bewakoof pattern)
<Image style={{ transition: 'opacity 300ms' }} src={activeColor.images[0]} />

// Correct — instant
<Image src={activeColor.images[0]} />
```

On the product card, clicking a color dot updates `activeColor` state and the displayed image. It does NOT navigate to the PDP (unlike the "quick-add" pattern in pfecomm_03). The card image just changes.

---

## 7. Common Mistakes

### Mistake 1: White text on yellow CTA

```css
/* WRONG — WCAG fail, 1.75:1 contrast */
.addToBag { background: var(--color-brand); color: #fff; }

/* CORRECT */
.addToBag { background: var(--color-brand); color: var(--color-text); }
```

### Mistake 2: Using deal orange as a CTA color

```css
/* WRONG — orange is for combo active state only */
.addToBag { background: var(--color-deal); }

/* CORRECT — yellow is the CTA color */
.addToBag { background: var(--color-brand); }
```

### Mistake 3: Swapping button and image radii

```css
/* WRONG — radii reversed */
.button { border-radius: 16px; }
.imageWrapper { border-radius: 8px; }

/* CORRECT */
.button { border-radius: 8px; }
.imageWrapper { border-radius: 16px; }
```

### Mistake 4: Forgetting card box shadow

```css
/* WRONG — no shadow = off-brand for Bewakoof */
.card { border-radius: 16px; }

/* CORRECT */
.card {
  border-radius: 16px;
  box-shadow: var(--shadow-card);
  transition: box-shadow 200ms ease, transform 200ms ease;
}
.card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}
```

### Mistake 5: Showing print badge on solid products

```tsx
/* WRONG — shows "Solid" badge on solid tees */
<span className={styles.printBadge}>{PRINT_LABELS[product.printStyle]}</span>

/* CORRECT — conditional */
{product.printStyle !== 'solid' && (
  <span className={styles.printBadge}>{badgeLabel}</span>
)}
```

### Mistake 6: 5-column grid (copying from pfecomm_03)

```css
/* WRONG — that's AJIO */
.grid { grid-template-columns: repeat(5, 1fr); }

/* CORRECT */
.grid { grid-template-columns: repeat(4, 1fr); }
```

### Mistake 7: Putting combo math in the Zustand store

```typescript
// WRONG — math in the store
const store = create(() => ({
  comboSavings: (items) => {
    const eligible = items.filter(i => i.comboEligible)
    return Math.floor(eligible.length / 3) * 1199
  }
}))

// CORRECT — math in lib/utils.ts; store calls utils
comboSavings: () => getComboSavings(get().items),
```

### Mistake 8: Adding coins redemption UI

```tsx
/* WRONG — out of scope */
<input placeholder="Enter coins to redeem" />
<button>Apply Coins</button>

/* CORRECT — display only */
<p className={styles.coins}>Earn {product.coinsEarned} Bewakoof Coins on this order</p>
```

### Mistake 9: Adding a countdown timer

```tsx
/* WRONG — urgency theatre */
<div>Sale ends in: {countdown}</div>

/* Combo progress is allowed (factual cart state): */
<p>Add {neededForNext} more tees for combo deal</p>
```

### Mistake 10: Using a serif or display font

```css
/* WRONG — pfecomm_02 pattern */
.headline { font-family: 'Cormorant Garamond', serif; }

/* CORRECT — Montserrat only */
.headline { font-family: var(--font-sans); font-weight: 800; }
```

---

## 8. Launch Checklist

- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds
- [ ] DevTools: CTA buttons `border-radius: 8px`
- [ ] DevTools: product image wrappers `border-radius: 16px`
- [ ] DevTools: print badges `border-radius: 4px`
- [ ] DevTools: ALL yellow buttons have `color` computed to near-black — no white text on yellow
- [ ] 4-column grid confirmed on desktop
- [ ] Card box shadows visible at rest; deeper on hover; card lifts 2px
- [ ] Solid product: NO print badge
- [ ] Licensed product: badge shows collection name (e.g., "Star Wars"), not "Licensed"
- [ ] Non-discounted product: NO discount badge, NO MRP, NO discount % text
- [ ] Discounted product: badge shows correct computed %, price row shows MRP + %
- [ ] `coinsEarned` shown on all cards and all PDP pages
- [ ] ComboProgress on PDP for combo-eligible products
- [ ] ComboProgress in cart drawer footer when eligible items in cart
- [ ] ComboProgress NOT shown on PDP for non-eligible products (hoodies, sweatshirts)
- [ ] `getComboSavings` with 3 items returns correct value
- [ ] `getComboSavings` with 4 items: same as 3 (only one group of 3 complete)
- [ ] `getComboSavings` with 6 items: two groups (2 × COMBO_PRICE)
- [ ] Color dot click on PDP updates ImageGallery images instantly
- [ ] UGC Community Looks strip visible on every PDP
- [ ] PromoBanner is yellow with black text (not white)
- [ ] Cart checkout button is yellow with black text
- [ ] All prices: `₹X,XXX` format, no decimals
- [ ] No countdown timers anywhere
- [ ] No coins redemption or apply UI
- [ ] No hex in CSS Module files
- [ ] Montserrat only — no other font family in computed styles
- [ ] `--color-brand` not used as text color on any element (only as background)
- [ ] `--color-deal` not used on any CTA, nav, or interactive element (only in combo active text)
- [ ] Lighthouse performance ≥90
- [ ] Lighthouse accessibility ≥90
