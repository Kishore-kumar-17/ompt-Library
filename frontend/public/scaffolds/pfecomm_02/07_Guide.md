# 07 — Developer Guide
## Indian Heritage Fashion Storefront · pfecomm_platform_02

Reference while building. The system's identity lives in three decisions: the warm ivory background, the maroon CTA, and the instant swatch image swap.

---

## 1. Non-Negotiable Rules

| Rule | Why |
|------|-----|
| Swatch hover = instant image swap | Fashion convention. Animated fades look cheap on premium sites. Same rule as Aritzia. |
| `border-radius: 2px` on buttons | Precisely 2px — not 0 (that's Aritzia), not 4px (that's generic DTC). This specific value signals craft warmth. |
| `border-radius: 0` on images | Textile photography must bleed to the edge. |
| 7 color tokens, no additions | The warm system is the design. A 4th accent breaks it. |
| CTA buttons are maroon, not black | `var(--color-maroon)` on all buttons. This brand has a color. |
| `--font-display` for headlines only | Cormorant Garamond is editorial weight. It is not for product card names, nav links, or buttons. |
| Natural dye names are data, not CSS | "Indigo", "Madder Red", "Turmeric" come from `ColorVariant.name`. They are product data. |
| No urgency copy anywhere | The craft narrative is the value. Scarcity tactics contradict it. |
| INR pricing always | ₹ symbol, `toLocaleString('en-IN')`, no decimals. |
| No decorative motifs in UI CSS | The textiles carry all the pattern. The chrome must be clean. |

---

## 2. The Warm Ivory Background — Why It Matters

Pure white (`#FFFFFF`) and warm ivory (`hsl(36deg 25% 97%)`) look similar on screen. The difference emerges in two situations:

**Situation 1: Natural cotton product photography.**
Cotton photographed on a warm surface looks natural. Cotton photographed on pure clinical white looks like stock photography. The warm background makes the textile appear in context.

**Situation 2: The brand feeling test.**
Pure white says "tech startup" or "clinical luxury." Warm ivory says "heritage retailer that has been here for decades." FabIndia has been operating since 1960. The warmth is earned.

**Implementation:**
```css
/* CORRECT */
body { background: var(--color-bg); } /* hsl(36deg 25% 97%) */

/* WRONG — pure white loses the warmth */
body { background: #ffffff; }
body { background: hsl(0deg 0% 100%); }
```

**DevTools test:** If the body background appears pure white, it is wrong. The warm ivory should be subtly visible against pure white. If you cannot see the difference in DevTools, your implementation is incorrect.

---

## 3. Swatch Hover Interaction — Same Rules as Aritzia

The interaction is identical to pfecomm_01 in mechanism, different only in context (natural dye colors instead of fashion colors).

### Implementation

```tsx
const [activeColorIdx, setActiveColorIdx] = useState(0)
const displaySrc = product.colors[activeColorIdx].images[0]

return (
  <div>
    {/* The image src changes synchronously with state */}
    <Image src={displaySrc} alt={`${product.name} in ${product.colors[activeColorIdx].name}`} fill />

    <div className={styles.swatches}>
      {product.colors.map((color, idx) => (
        <button
          key={color.name}
          style={{ background: color.swatch }}  // hex appears ONLY here, as inline style
          onMouseEnter={() => setActiveColorIdx(idx)}
          aria-label={color.name}  // "Indigo", "Madder Red" — the natural dye name
        />
      ))}
    </div>
  </div>
)
```

### What NOT to do

```css
/* WRONG — no transition ever */
.image { transition: opacity 0.3s ease; }
```

```tsx
{/* WRONG — no cross-fade pattern */}
<Image src={primaryImage} className={isHovered ? styles.hidden : ''} />
<Image src={hoverImage} className={isHovered ? '' : styles.hidden} />
```

---

## 4. The Cormorant Garamond Rule — Display Only

Cormorant Garamond is loaded and applied via `--font-display`. It must be used **only** for editorial display purposes.

### Correct uses:
- Hero headline (`clamp(32px, 5vw, 72px)`)
- Collection names on homepage strips (`clamp(20px, 3vw, 36px)`)
- PDP product name `<h1>` (`24px`)
- Artisan Story strip centered text
- Cart drawer header title

### Incorrect uses (always use `--font-body`):
- Product card names
- Navigation links
- Button text
- Filter panel labels
- Price displays
- Craft badges, fabric labels
- Body descriptions
- Size button labels
- Accordion trigger labels

```css
/* CORRECT */
.heroTitle { font-family: var(--font-display); font-size: clamp(32px, 5vw, 72px); }
.productName { font-family: var(--font-display); font-size: 24px; } /* PDP only */

/* WRONG — Cormorant Garamond on UI elements */
.button { font-family: var(--font-display); }
.cardName { font-family: var(--font-display); }
.navLink { font-family: var(--font-display); }
```

**Why the rule:** Cormorant Garamond at small sizes (`12–14px`) reads poorly on screen — it is designed for larger display type. At card name sizes it will look romantic at best, illegible at worst.

---

## 5. Craft Badge Logic — The Key Conditional

The craft badge replaces the sub-brand badge of pfecomm_01. The logic is simpler:

```tsx
// CORRECT — conditional rendering based on craftTechnique
import { CRAFT_LABELS } from '@/types'

{product.craftTechnique !== 'none' && (
  <span className={styles.craftBadge}>
    {CRAFT_LABELS[product.craftTechnique]}
  </span>
)}
```

```tsx
// WRONG — rendering for all products
<span className={styles.craftBadge}>{product.craftTechnique}</span>

// WRONG — using the enum value directly (not the display label)
<span className={styles.craftBadge}>hand-block-print</span>
// Should be: "Hand-Block Print"
```

**The `CRAFT_LABELS` record is the single source of truth** for all badge text, filter labels, and cart line item labels. Always use it.

---

## 6. INR Pricing — Implementation and Format

```typescript
// src/lib/utils.ts
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}
```

```typescript
// Usage
formatINR(2499)   // "₹2,499"
formatINR(12000)  // "₹12,000"
formatINR(999)    // "₹999"
formatINR(89900)  // "₹89,900"
```

**Indian number formatting** uses the lakh/crore system: after the first three digits from the right, groups of two (not three). `toLocaleString('en-IN')` handles this automatically.

```tsx
// CORRECT — use formatINR everywhere
<span className={styles.price}>{formatINR(product.price)}</span>

// WRONG — raw number, missing ₹
<span className={styles.price}>{product.price}</span>

// WRONG — USD format
<span className={styles.price}>${product.price}</span>

// WRONG — with decimals
<span className={styles.price}>₹{product.price.toFixed(2)}</span>
// Should never have decimals — ₹2,499 not ₹2,499.00
```

**Free shipping threshold: ₹999**
```tsx
// CORRECT
const remaining = FREE_SHIPPING_THRESHOLD - subtotal
{remaining > 0 && (
  <p>Add {formatINR(Math.ceil(remaining))} more for free shipping</p>
)}
```

---

## 7. Per-Colorway Image Arrays — Same as pfecomm_01

The mechanism is identical to Aritzia: each `ColorVariant` has its own `images: string[]` array. An indigo hand-block printed kurta is photographed in indigo. A natural (undyed) version has completely different photography.

```typescript
// CORRECT — per-colorway images
{
  colors: [
    {
      name: 'Indigo',
      swatch: '#2C4A6E',
      images: ['/indigo-kurta-indigo-1.jpg', '/indigo-kurta-indigo-2.jpg', '/indigo-kurta-indigo-3.jpg'],
    },
    {
      name: 'Natural',
      swatch: '#EDE0CB',
      images: ['/indigo-kurta-natural-1.jpg', '/indigo-kurta-natural-2.jpg'],
    },
  ]
}

// WRONG — shared images (natural and indigo look completely different)
{
  images: ['/kurta-front.jpg', '/kurta-back.jpg'],
  colors: [{ name: 'Indigo', swatch: '#2C4A6E' }, { name: 'Natural', swatch: '#EDE0CB' }],
}
```

**PDP implication:** When `selectedColor` changes, the entire gallery resets to the new colorway's `images`. Gallery index returns to 0.

---

## 8. Common Mistakes

### Mistake 1: Using black CTAs (copying from pfecomm_01)

```css
/* WRONG — copied from pfecomm_01 (Aritzia) */
.button { background: var(--color-text); color: #fff; }

/* CORRECT — FabIndia uses maroon */
.button { background: var(--color-maroon); color: #fff; }
```

This is the most common mistake when using pfecomm_01 as a reference. The CTA color is fundamentally different.

### Mistake 2: `border-radius: 0` on buttons

```css
/* WRONG — that's Aritzia's rule */
.button { border-radius: 0; }

/* CORRECT — FabIndia is precisely 2px */
.button { border-radius: 2px; }
```

### Mistake 3: `border-radius: 4px` on buttons

```css
/* WRONG — generic DTC default */
.button { border-radius: 4px; }

/* CORRECT */
.button { border-radius: 2px; }
```

### Mistake 4: Using pure white background

```css
/* WRONG — too clinical for craft retail */
body { background: #fff; }
body { background: hsl(0deg 0% 100%); }

/* CORRECT — warm ivory */
body { background: var(--color-bg); } /* hsl(36deg 25% 97%) */
```

### Mistake 5: Cormorant Garamond on product card names

```tsx
// WRONG — Cormorant at 14px on screen is hard to read
<h2 style={{ fontFamily: 'var(--font-display)' }}>{product.name}</h2>

// CORRECT — product card names use Inter
<h2 className={styles.name}>{product.name}</h2>
```

```css
/* styles.name */
.name { font-family: var(--font-body); font-size: 14px; font-weight: 400; }
```

### Mistake 6: Using CSS transition on card image

```css
/* WRONG */
.image { transition: opacity 0.3s; }

/* CORRECT — no transition */
.image { object-fit: cover; display: block; }
```

### Mistake 7: Using `product.craftTechnique` value directly as badge text

```tsx
// WRONG — shows kebab-case enum value
<span>{product.craftTechnique}</span>  // "hand-block-print"

// CORRECT — uses display label
<span>{CRAFT_LABELS[product.craftTechnique]}</span>  // "Hand-Block Print"
```

### Mistake 8: Generic color names instead of natural dye vocabulary

```typescript
// WRONG — generic color names lose the craft narrative
{ name: 'Blue', swatch: '#2C4A6E' }
{ name: 'Beige', swatch: '#EDE0CB' }

// CORRECT — natural dye vocabulary
{ name: 'Indigo', swatch: '#2C4A6E' }
{ name: 'Natural', swatch: '#EDE0CB' }
```

### Mistake 9: Decimal prices in INR

```tsx
// WRONG
<span>₹{product.price.toFixed(2)}</span>  // "₹2499.00"
<span>₹{product.price}</span>              // "₹2499" (missing comma grouping)

// CORRECT
<span>{formatINR(product.price)}</span>    // "₹2,499"
```

### Mistake 10: PromoBanner initial state as `false` (visible)

```tsx
// WRONG — flash: banner appears then disappears on load
const [dismissed, setDismissed] = useState(false)

// CORRECT — start hidden, reveal if not previously dismissed
const [dismissed, setDismissed] = useState(true)
useEffect(() => {
  const wasDismissed = sessionStorage.getItem(STORAGE_KEY) === 'true'
  if (!wasDismissed) setDismissed(false)
}, [])
```

### Mistake 11: Adding decorative motifs in CSS

```css
/* WRONG — Indian ornament in the UI chrome */
.section::before {
  content: '◆';
  color: var(--color-maroon);
}

.nav {
  border-bottom: 2px double var(--color-border);
}

/* CORRECT — clean, no decoration */
.nav {
  border-bottom: 1px solid var(--color-border);
}
```

The products carry all the visual richness. The UI provides clean negative space.

---

## 9. Launch Checklist

- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds; all 12 product pages in `/out/products/`
- [ ] DevTools: every `<button>` has `border-radius: 2px` (not 0, not 4)
- [ ] DevTools: every product image container has `border-radius: 0`
- [ ] DevTools CSS: body background is warm ivory, not pure white
- [ ] DevTools CSS: no hex values in any `.module.css` file Computed Styles
- [ ] Swatch hover: instant image swap on 5 different products — no visible transition
- [ ] Craft badges: all 4+ technique types show correct label
- [ ] Craft badges: `craftTechnique === 'none'` products have no badge
- [ ] Sale products: saffron-orange price + muted strikethrough original
- [ ] All prices: ₹ symbol + Indian comma formatting + no decimals
- [ ] OOS sizes: strikethrough + 0.4 opacity, clicking has no effect
- [ ] PDP product name `<h1>`: in Cormorant Garamond (`font-family: var(--font-display)`)
- [ ] PDP origin line: appears for products with `origin` field
- [ ] PDP: selecting color changes gallery images to that colorway
- [ ] PDP: Add to Cart disabled until in-stock size selected
- [ ] PDP: Add to Cart opens drawer with maroon checkout button
- [ ] Cart drawer: maroon "Proceed to Checkout" button
- [ ] Cart: stepper works; remove works; ₹999 free shipping note
- [ ] PromoBanner: maroon background (not black)
- [ ] PromoBanner: dismisses on X, stays dismissed within session
- [ ] Filter: craft technique filter shows correct products
- [ ] Filter: category + craft combination works
- [ ] Filter: URL reflects active filters (`?craft=handloom`)
- [ ] Filter chips appear for active filters; chip click removes filter
- [ ] Artisan Story strip: present on homepage
- [ ] No urgency copy anywhere (grep: "only", "selling", "hurry", "limited")
- [ ] Focus rings: `2px solid var(--color-maroon)` visible on keyboard navigation
- [ ] `aria-label` on search, cart, close icon buttons
- [ ] Lighthouse performance ≥ 90
- [ ] Lighthouse accessibility ≥ 90
