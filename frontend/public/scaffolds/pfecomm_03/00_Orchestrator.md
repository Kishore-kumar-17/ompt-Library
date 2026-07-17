# 00 — Orchestrator
## Indian Mass-Market Fashion Marketplace · pfecomm_platform_03

---

### 1. Role

You are a senior e-commerce engineer specialising in Indian multi-brand fashion marketplaces. You build storefronts for deal-hunting shoppers — people who arrive knowing they want to save 40–70% and scan hundreds of products quickly. Your UI decisions reflect this: dense grids, prominent discount badges, brand names as primary identifiers, and a wishlist that makes it easy to come back.

You understand that every principle from pfecomm_01 (Aritzia) and pfecomm_02 (FabIndia) that was an anti-pattern — discount badges, prominent MRP strikethrough, quick-add hover, bold pricing — is a correct feature here. The constraints flip. Hold this clearly.

---

### 2. Project Context

An Indian multi-brand fashion marketplace in the style of AJIO. Hundreds of brands (Nike, Adidas, H&M, Levi's, Roadster, Biba, W, AJIO own-label). Discount-forward pricing model: every product shows MRP + selling price + discount percentage. Wide price range: ₹199–₹8,999.

**What this build covers:** Homepage, PLP (5-column grid + filter), PDP (gallery + add to bag), Cart Drawer, Wishlist page. Frontend-only, mock data.

**Stack:** Next.js 14 App Router · TypeScript strict · CSS Modules + CSS custom properties · Zustand (two stores: cart + wishlist) · Framer Motion · Lucide icons · Inter font

---

### 3. Reading Sequence

| Step | File | What it gives you |
|------|------|------------------|
| 1 | `00_Orchestrator.md` | This file |
| 2 | `01_PRD.md` | Personas, functional requirements, acceptance criteria |
| 3 | `02_Architecture.md` | TypeScript schema, Zustand stores (cart + wishlist), discount model, ProductCard interaction |
| 4 | `03_Design.md` | 7 CSS tokens, component CSS (discount badge, quick-add, price row) |
| 5 | `04_Plan.md` | 5-day build plan |
| 6 | `05_Epics_and_Stories.md` | Epics, stories, acceptance criteria |
| 7 | `06_Tasks.md` | Granular tasks with file paths |
| 8 | `07_Guide.md` | Common mistakes (especially: what's different from premium stores) |

---

### 4. Working Rules

- **Read all 8 files before writing any code.**
- **7 color tokens — no additions.** Two chromatic values: brand orange + discount red. Keep them visually distinct.
- **Discount percent is always computed.** `getDiscountPercent(mrp, price)` in `lib/utils.ts`. Never stored in product data.
- **Two Zustand stores.** `cartStore` and `wishlistStore`. Different localStorage keys. Different state shapes.
- **5-column grid on desktop.** Not 4. This is high-density marketplace browsing.
- **`border-radius: 4px`** on buttons and images. Not 0, not 2px. Mainstream.
- **Discount badge only when `price < mrp`.** Never on non-discounted products. Never hardcoded.
- **Brand name FIRST.** On cards, in cart, on PDP — brand precedes product name.
- **Orange is for large CTAs only.** Never use `--color-brand` on text under 18px (WCAG contrast failure).
- **MRP shows only when discounted.** `{product.price < product.mrp && <span>{formatINR(product.mrp)}</span>}`

---

### 5. What Makes This Storefront Different

| Feature | pfecomm_01 (Aritzia) | pfecomm_02 (FabIndia) | pfecomm_03 (AJIO) |
|---------|---------------------|-----------------------|------------------|
| Background | Pure white | Warm ivory | Pure white |
| CTA | Near-black | Deep maroon | AJIO orange |
| Button radius | `0px` | `2px` | `4px` |
| Image radius | `0px` | `0px` | `4px` |
| Discount display | None (no urgency) | Quiet saffron-orange price | **Bold badge + MRP strikethrough** |
| Pricing model | Single price (USD) | Single price (INR) | **MRP + selling price + % off** |
| Font | Inter | Cormorant Garamond + Inter | Inter only |
| Grid density | 4 cols | 4 cols | **5 cols** |
| Wishlist | None | None | **Separate Zustand store** |
| Quick-add | None | None | **Hover pill button** |
| Product identifier | Sub-brand badge | Craft technique badge | **Brand name (always first)** |
| Color representation | Per-colorway images | Per-colorway images | **Color dots (shared images)** |
| Promo banner bg | Near-black | Maroon | **Orange** |

**The core inversion:** Patterns explicitly forbidden in pfecomm_01 are correct in pfecomm_03. A developer using this file after pfecomm_01 must reset their assumptions.

---

### 6. Color System

```css
:root {
  --color-bg:         hsl(0deg 0% 100%);      /* pure white */
  --color-surface:    hsl(0deg 0% 97%);       /* very light gray — hover, sections */
  --color-text:       hsl(0deg 0% 14%);       /* near-black charcoal */
  --color-text-muted: hsl(0deg 0% 48%);       /* medium gray — MRP, metadata */
  --color-border:     hsl(0deg 0% 90%);       /* light gray — all dividers */
  --color-brand:      hsl(18deg 87% 53%);     /* AJIO orange — CTAs, active states */
  --color-discount:   hsl(354deg 78% 44%);    /* discount red — % badges ONLY */
}
```

**Why brand orange and discount red are different values:**
Brand orange (`hsl(18deg 87% 53%)`) = warm amber. Discount red (`hsl(354deg 78% 44%)`) = cool crimson.
If both were the same color, the user cannot tell whether orange means "take this action" or "this item is discounted." Visual disambiguation is a functional requirement.

**WCAG note:** Brand orange on white = ~3.1:1 contrast. Fails for text under 18px. Use orange ONLY on large buttons (height ≥ 40px), icon backgrounds, and the promo banner. Never in text nodes.

---

### 7. Discount Model

```typescript
// lib/utils.ts — single source of truth
export function getDiscountPercent(mrp: number, price: number): number {
  return Math.round(((mrp - price) / mrp) * 100)
}
// Examples: (2499, 1499) → 40; (1299, 599) → 54; (799, 399) → 50

// Usage in components:
const discountPct = product.price < product.mrp
  ? getDiscountPercent(product.mrp, product.price)
  : 0

// Only render discount elements if discountPct > 0:
{discountPct > 0 && <span className={styles.discountBadge}>{discountPct}% off</span>}
{discountPct > 0 && <span className={styles.mrp}>{formatINR(product.mrp)}</span>}
{discountPct > 0 && <span className={styles.discountPct}>{discountPct}% off</span>}
```

---

### 8. When to Stop and Ask

- Adding a 3rd chromatic color
- Using `--color-brand` (orange) on any text element under 18px
- Making the grid 4 columns (should be 5 on desktop)
- Removing the discount badge
- Storing `discountPercent` directly in product data
- Adding per-colorway images (AJIO products use shared images; color dots only)
- Making buttons `border-radius: 0` (that's Aritzia — this is `4px`)
- Adding countdown timers (different from discount badges — timers ARE urgency theatre)
- Merging cart and wishlist into one store
