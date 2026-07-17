# 00 — Orchestrator
## Indian Property Detail Page · bw_realestate_02

---

## What This Build Is

**VeriAcres** — a 99acres-pattern property detail page (PDP). Where `bw_realestate_01` is the *search and browse* experience (homepage with search widget + listing grid), `bw_realestate_02` is the *deep-dive* experience — the full property page a visitor lands on after clicking a listing card.

The two defining features are: **tab-based content sections** (Overview, Floor Plan, Amenities, Locality, Price Trends) and a **RERA compliance block** — a full section with registration number, expiry date, and authority — not merely a badge.

---

## Two-Build Real Estate Comparison

| Dimension | bw_realestate_01 (MagicBricks) | bw_realestate_02 (99acres) |
|-----------|-------------------------------|---------------------------|
| Page type | Homepage — search + listing grid | Property Detail Page (PDP) |
| Primary interaction | Mode tabs + FilterBar | Content tabs (no filter) |
| Core entity | `Property` (list item) | `PropertyDetail` (full record) |
| Price display | `formatPrice(price)` on cards | `formatPrice()` + EMI calculator |
| RERA treatment | `ReraBadge` — small inline badge | `RERASection` — full compliance block |
| Brand color | Red `#E03228` | Orange `#E84118` |
| Contrast pattern | White on red = 4.51:1 ✓ (tight) | Dark on orange = 4.64:1 ✓ |
| Tab switching | Hero search mode tabs (5) | Content section tabs (5) |
| Layout | Full-width grid | Two-column: content + sticky sidebar |
| Sidebar | — | ContactForm + EMICalculator (toggle) |
| EMI utility | — | `calculateEMI(principal, rate, years)` |
| Photos | Count badge | Full gallery (hero + thumbnails) |
| Locality | Locality string | LocalityInsights (scores + nearby places) |
| Similar content | 8 cards in grid | 3 SimilarPropertyCards |
| Font weight max | 600 | 600 |
| `border-radius: 50%` | Forbidden | Forbidden |
| `display: none` | Forbidden | Forbidden |

---

## The Three Defining Constraints

### Constraint 1: Tab-Based Content — Conditional JSX, Not CSS

The `PropertyTabs` component manages `activeTab: TabSection`. When the user switches from "Overview" to "Amenities", the OverviewTab component unmounts entirely and AmenitiesTab mounts. This is the same principle as bw_realestate_01's mode-dependent search fields, applied to content sections.

```tsx
// CORRECT — content unmounts/mounts on tab switch
{activeTab === 'overview'   && <OverviewTab property={property} />}
{activeTab === 'floorplan'  && <FloorPlanTab plans={property.floorPlans} />}
{activeTab === 'amenities'  && <AmenitiesTab groups={property.amenities} />}
{activeTab === 'locality'   && <LocalityTab insights={property.localityInsights} />}
{activeTab === 'pricetrend' && <PriceTrendTab trends={property.priceTrends} />}

// WRONG — content stays in DOM, screen readers encounter all tabs simultaneously
<OverviewTab style={{ display: activeTab === 'overview' ? 'block' : 'none' }} />
```

Detection: `grep -r "display.*none" src/components/property/PropertyTabs.tsx` → empty.

### Constraint 2: RERA as a Full Section Block

This is the key differentiator from bw_realestate_01. The `ReraBadge` component (a small inline indicator) remains in `PropertyHeader`. But a separate `RERASection` component provides the full compliance block — always visible on the page, regardless of active tab.

```
RERASection structure:
┌──────────────────────────────────────────────────────┐
│ ▌ (green left border)  RERA Registered ✓             │
│                                                      │
│  Reg. Number          Valid Until       Authority    │
│  PRM/KA/RERA/...      31 Dec 2026       KRERA        │
│                                                      │
│  → View on RERA Portal                               │
└──────────────────────────────────────────────────────┘
```

CSS: `border-left: 4px solid var(--color-green); border-radius: 8px; background: var(--color-surface)`.

**What RERASection is NOT:**
- Not a badge (that's `ReraBadge`)
- Not a modal or popup
- Not inside a tab (it sits below the tab panel, always visible)
- Not conditional (always rendered when `reraNumber` is present)

### Constraint 3: Orange Contrast — Dark Text on Orange Buttons

`#E84118` (brand orange) with white text = 4.15:1 — fails WCAG AA for normal-weight text at small sizes. The solution mirrors the Cult.fit build's pattern with pink:

```css
/* Button.module.css */
.primary {
  background: var(--color-orange);
  color: var(--color-text);   /* #212121 on #E84118 = 4.64:1 ✓ AA */
}
/* NEVER: color: var(--color-white) on .primary — that's 4.15:1 ✗ */
```

Orange text on white background:
- For large text (price: 1.375rem bold, heading: 1.5rem+): 4.15:1 passes "large text" WCAG AA threshold (3:1)
- For normal/small text: FAILS — use `var(--color-text)` instead

---

## Stop-and-Ask List

| If you're about to... | Stop because... |
|-----------------------|-----------------|
| Use `display: none` to hide tab content | Constraint 1 — conditional JSX only |
| Add only a `ReraBadge` with no RERASection block | Constraint 2 — RERA needs a full section |
| Put `color: var(--color-white)` on orange buttons | Constraint 3 — 4.15:1 fails for normal text |
| Display raw `property.price` integer in JSX | Always `formatPrice(property.price)` |
| Hardcode `calculateEMI` with a lookup table | Use the formula: `P×r×(1+r)^n/((1+r)^n−1)` |
| Show RERA block inside a tab | RERASection is always-visible, below tabs |
| Use `border-radius: 50%` | No circular elements in this build |
| Use font-weight 700 | Max is 600 in this build |
| Use orange text for UI labels / small metadata | Orange only for large text ≥18px |
| Use `white` text on orange for any body text | Dark text on orange — Constraint 3 |
| Hardcode "Contact Owner" in CTA | `Contact ${property.listingSource}` |
| Add `formatPrice()` logic inside a component | It belongs in `src/lib/formatPrice.ts` |

---

## File Manifest

```
bw_realestate_02.md                           ← 8 platform prompt versions
bw_realestate_platform_02_scaffold/
  00_Orchestrator.md                          ← this file
  01_PRD.md                                   ← personas, functional requirements
  02_Architecture.md                          ← types, mock data, component map
  03_Design.md                                ← CSS tokens, component CSS, anti-patterns
  04_Plan.md                                  ← 4-day build plan with gate checks
  05_Epics_and_Stories.md                     ← 7 epics, 38 stories
  06_Tasks.md                                 ← TASK-001–022 with code snippets
  07_Guide.md                                 ← constraint deep-dives, contrast math, 60-item checklist
```
