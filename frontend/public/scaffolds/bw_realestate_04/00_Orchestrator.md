# 00 — Orchestrator
## Modern Indian Rental Discovery · bw_realestate_04

---

## How to use this scaffold

Read this file first. It tells you what makes bw_realestate_04 different from the three prior builds and what constraints to enforce throughout. Then proceed through 01–07 in order.

---

## Four-Build Real Estate Comparison

| Dimension | bw_01 MagicBricks | bw_02 99acres | bw_03 Square Yards | bw_04 NoBroker |
|-----------|-------------------|---------------|-------------------|----------------|
| Page type | Listing grid | Property detail | Premium homepage | Rental discovery |
| Transaction mode | Buy + Rent | Buy (detail) | Buy + Invest | Rent only |
| Listing source | Owner / Builder / Agent | Builder / Agent | Builder / SqYards | Owner ONLY |
| Brand colour | Red `#E03228` | Orange `#E84118` | Teal `#0B6E77` + Gold `#C9941A` | Purple `#6C3CE1` |
| Accent colour | — | — | Gold `#C9941A` | Green `#15803D` |
| Font | Poppins | Poppins | DM Sans | Plus Jakarta Sans |
| Filter type | 4-dim multi-select FilterBar | Tab sections (not a filter) | 1-dim single-select CategoryFilter | 5-dim RentalFilterBar |
| Primary metric | Price (sale) | Price + EMI | Rental yield + appreciation | Monthly rent + deposit |
| Unique entity | — | PropertyDetail tabs | Agent directory | OwnerProfile on each listing |
| Key utility | formatPrice | calculateEMI | formatYield + filterByCategory | calculateBrokerSavings + filterRentals |
| Hero CTA | "Search Properties" | — (detail page) | "Search Properties" | "Find Zero Brokerage Homes" |
| Trust signal | VerifiedBadge (green) | ReraBadge | SqVerifiedBadge (teal) | ZeroBrokerageBadge (green) |
| Card radius | 8px | 8px (cards) | 12px | 10px |
| Font max weight | 600 | 600 | 600 | 600 |

---

## The Four Core Constraints of bw_realestate_04

### Constraint 1: Owner-Only — No Agent, No Builder, No Brokerage

Every `RentalProperty` has `owner: OwnerProfile`. There is no `listingSource` field that can be 'Agent' or 'Builder'. The CTA is always `"Contact Owner"` — never dynamic from a data field (unlike bw_01/02/03 where CTAs come from `property.listingSource`).

```typescript
// bw_01/02/03 — dynamic CTA (correct for those builds)
<Button>Contact {property.listingSource}</Button>

// bw_04 — ALWAYS hardcoded (correct for this build)
<Button>Contact Owner</Button>
```

The zero-brokerage positioning is the entire product identity. Any agent/builder reference breaks the brand promise.

### Constraint 2: Rent Display vs Deposit Display

`RentalProperty` has two money fields that MUST be displayed differently:

| Field | Formatter | Output example |
|-------|-----------|----------------|
| `monthlyRent` | `formatPrice(rent)` | `₹28,000/mo` |
| `deposit` | `` `₹${deposit.toLocaleString('en-IN')}` `` | `₹56,000` |

`formatPrice()` appends `/mo` for amounts under ₹1L. If you accidentally use `formatPrice(deposit)`, the deposit will show as `₹56,000/mo` — which is wrong. Deposit is a one-time amount. Never pass `deposit` to `formatPrice()`.

### Constraint 3: Broker Savings Is Always 2× Monthly Rent

```typescript
export function calculateBrokerSavings(monthlyRent: number): number {
  return monthlyRent * 2
}
```

The `BrokerSavingsWidget` uses this formula. The `BrokerSavingsStrip` hardcodes the message "Save up to 2 months rent = ₹X". Never change the multiplier. Never add conditional logic. The formula is intentionally simple and must stay that way.

### Constraint 4: Purple Contrast — Green Is For Savings Only

Purple `#6C3CE1` — white on purple = 6.23:1 ✓ — safe for buttons and active chips.
Green `#15803D` — green on white = 5.03:1 ✓ — safe for ZeroBrokerageBadge and savings highlights.

Green must ONLY appear in savings-related contexts: `ZeroBrokerageBadge`, `BrokerSavingsStrip` text, `OwnerVerifiedBadge`. Green must NOT be used for general UI elements (borders, headings, icons) — that would dilute the "savings = green" semantic.

---

## Stop List

Do NOT build any of these — they break the positioning:

| Banned element | Why |
|----------------|-----|
| `listingSource: 'Agent'` in any mock data | Owner-only portal |
| `"Contact Agent"` or `"Contact Builder"` as CTA text | Zero-brokerage brand |
| `BrokerageFeeDisplay` component | Antithetical to product |
| `formatPrice(property.deposit)` | Appends wrong `/mo` suffix |
| `color: var(--color-white)` on `var(--color-purple)` inner text | White on purple = ✓ but see Constraint 4 — ensure text is always white or dark, not mixed |
| `border-radius: 50%` on owner photos | Use 8px rect photos, not circles |
| `font-weight: 700` anywhere | Max weight is 600 in Plus Jakarta Sans |

---

## Proceed to: 01_PRD.md
