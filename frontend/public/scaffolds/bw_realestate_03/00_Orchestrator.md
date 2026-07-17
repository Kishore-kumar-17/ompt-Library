# 00 — Orchestrator
## Indian Premium Property Portal · bw_realestate_03

---

## What This Build Is

**SquareView** — a Square Yards-pattern premium property portal. This is the third real estate build, introducing two patterns absent from the first two: **investment metrics** (rental yield + capital appreciation) on every property card, and an **Agent Directory** as a first-class homepage section.

Where bw_realestate_01 (MagicBricks) is a mass-market listing platform and bw_realestate_02 (99acres) is a deep-dive property detail page, bw_realestate_03 is a **premium curated portal** — fewer properties, higher quality, investment-angle data, verified agents.

---

## Three-Build Real Estate Comparison

| Dimension | bw_realestate_01 | bw_realestate_02 | bw_realestate_03 |
|-----------|-----------------|-----------------|-----------------|
| Inspiration | MagicBricks | 99acres | Square Yards |
| Page type | Homepage + listing grid | Property detail page | Premium homepage |
| Brand colour | Red `#E03228` | Orange `#E84118` | Teal `#0B6E77` + Gold `#C9941A` |
| Colour system | 1 brand colour | 1 brand colour | **2 brand colours** |
| Font | Poppins | Poppins | **DM Sans** |
| Primary entity | `Property` | `PropertyDetail` | `PremiumProperty` + **`Agent`** |
| Filter system | 4-dim multi-select FilterBar | None | **Single-dim category tabs** |
| Investment data | None | None | `rentalYield` + `capitalAppreciation` |
| Verification badge | Green VerifiedBadge | Green VerifiedBadge | **Teal SqVerifiedBadge** |
| Gold accent | None | None | YieldBadge, AgentCard rating |
| Card radius | 8px | 12px | **12px** (premium) |
| Agent directory | None | None | **AgentDirectory — 3 AgentCards** |
| EMI calculator | None | EMICalculator | None |
| New Launches | Listing badge only | None | **NewLaunches horizontal scroll** |
| Services section | None | None | **Services — 4 tiles** |
| International cities | No | No | **Dubai + London in CityLinks** |
| RERA treatment | Inline badge | Full section block | Inline badge |
| `border-radius: 50%` | Forbidden | Forbidden | Forbidden |
| Font weight max | 600 | 600 | 600 |

---

## The Three Defining Constraints

### Constraint 1: Two-Colour Brand — Gold Requires Dark Text

This is the first build in the library with two brand colours. The combination of teal and gold creates a premium, aspirational identity. Each colour has different contrast properties:

| Pair | Ratio | Rule |
|------|-------|------|
| White on teal `#0B6E77` | 5.99:1 ✓ | Teal buttons use white text |
| Dark `#1A1A2E` on gold `#C9941A` | 5.94:1 ✓ | Gold elements use dark text |
| White on gold `#C9941A` | 2.72:1 ✗ | FORBIDDEN — white text on gold always fails |

```css
/* Button.module.css */
.teal { background: var(--color-teal); color: var(--color-white); }   /* 5.99:1 ✓ */
.gold { background: var(--color-gold); color: var(--color-text); }    /* 5.94:1 ✓ */

/* YieldBadge.module.css */
.badge { background: var(--color-gold); color: var(--color-text); }   /* 5.94:1 ✓ */
/* NEVER: color: var(--color-white) on gold — that's 2.72:1 ✗ */
```

Detection: `grep -r "var(--color-white)" src/components/ui/YieldBadge.module.css` → empty.

### Constraint 2: SqVerifiedBadge Is Teal, Not Green

Previous builds use `VerifiedBadge` with `color: var(--color-green)`. This build has a distinct verification concept — **Square Yards platform curation** — signalled by teal (the brand colour) rather than green (which is reserved for RERA/regulatory signalling).

```tsx
// SqVerifiedBadge.tsx — teal (Square Yards platform verification)
// .badge { color: var(--color-teal); }

// VerifiedBadge.tsx (from bw_01/02) — green (generic listing verification)
// .badge { color: var(--color-green); }

// ReraBadge.tsx — green + border (RERA regulatory)
// .badge { color: var(--color-green); border: 1px solid var(--color-green); }
```

Detection: `grep -r "color: var(--color-green)" src/components/ui/SqVerifiedBadge.module.css` → empty.

### Constraint 3: Category Filter Is Single-Dimension

The FilterBar in bw_realestate_01 is a multi-dimension filter (BHK array + possession + type + furnished — 4 independent dimensions, multi-select on BHK). This build's `CategoryFilter` is fundamentally different: **exactly one category active at a time**, from a closed set of investment-oriented categories.

```typescript
// filterByCategory.ts — one active category, no array state
export type PropertyCategory = 'all' | 'luxury' | 'ready' | 'new-launch' | 'high-yield'

export function filterByCategory(
  properties: PremiumProperty[],
  category: PropertyCategory
): PremiumProperty[] {
  if (category === 'all')        return properties
  if (category === 'luxury')     return properties.filter(p => p.price >= 10_000_000)
  if (category === 'ready')      return properties.filter(p => p.possessionStatus === 'Ready to Move')
  if (category === 'new-launch') return properties.filter(p => p.possessionStatus === 'New Launch')
  if (category === 'high-yield') return properties.filter(p => p.rentalYield >= 4.0)
  return properties
}
```

No multi-select. No BHK array. No `FilterState` object with 4 keys. One `useState<PropertyCategory>('all')`.

---

## Stop-and-Ask List

| If you're about to... | Stop because... |
|-----------------------|-----------------|
| Use white text on gold (YieldBadge, gold button) | Constraint 1 — white/gold = 2.72:1 ✗ |
| Use `color: var(--color-green)` in SqVerifiedBadge | Constraint 2 — SqVerified uses teal |
| Add multi-select BHK filter | Constraint 3 — this build uses single-dim category tabs |
| Use `border-radius: 50%` on agent photos | No circles — use `8px` rectangular |
| Display `property.price` raw | Always `formatPrice(property.price)` |
| Display `property.rentalYield` as raw `4.2` | Always `formatYield(property.rentalYield)` |
| Hardcode "Contact Owner" | `Contact ${property.listingSource}` |
| Use Poppins | This build uses DM Sans — different font family |
| Use `font-weight: 700` | Max is 600 in this build |
| Put hex values in `.module.css` (except hero gradient) | Use CSS variables — hex only in `globals.css` |
| Skip investment metrics on PropertyCard | Every PremiumPropertyCard must show yield + appreciation |
| Add EMI calculator | Not in this build — that's bw_realestate_02 |
| Put green text on SqVerifiedBadge | Teal — Constraint 2 |

---

## File Manifest

```
bw_realestate_03.md
bw_realestate_platform_03_scaffold/
  00_Orchestrator.md        ← this file
  01_PRD.md
  02_Architecture.md
  03_Design.md
  04_Plan.md
  05_Epics_and_Stories.md
  06_Tasks.md
  07_Guide.md
```
