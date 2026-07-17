# 00 — Orchestrator
## Indian Property Listing Portal · bw_realestate_01

---

## What This Build Is

**VeriProperty** — a MagicBricks-pattern Indian property portal. This is the first real estate build in the library and introduces an entirely new category of UX patterns: mode-dependent search widgets, Indian price conventions (lakhs/crores), RERA regulatory badges, and listing-source-driven CTAs. The core entity is a `Property` — not a doctor, not a health package — with rich structured data: BHK, area, floor, locality, verified status, possession status, and listing source.

---

## What Makes This Category Different From Clinic Builds

| Dimension | Clinic builds (01–04) | Real estate (bw_realestate_01) |
|-----------|----------------------|-------------------------------|
| Core entity | Doctor / Provider / HealthPackage | `Property` |
| Hero widget | Search (condition/specialty/booking) | Mode-switching search (Buy/Rent/PG/Commercial/Plot) |
| Filter dimensions | 1–3 (single or multi) | 5 simultaneous (BHK + budget + type + possession + furnished) |
| Price display | `consultFee` / `discountedPrice` | Indian lakh/crore format (`formatPrice()`) |
| Regulatory badge | NABH / RERA (Apollo) | RERA (mandatory Indian real estate) |
| CTA text | Fixed per component | Dynamic: `Contact ${listingSource}` |
| Listing source | Doctor credential | Owner / Builder / Agent |
| Location model | City dropdown | City + Locality (two-level) |
| Mode switching | No (single booking flow) | 5 modes, each with different form fields |
| Price format | `toLocaleString('en-IN')` | `formatPrice()` → lakhs/crores convention |

---

## The Three Defining Constraints

### Constraint 1: Mode-dependent search widget — 5 tabs, 5 field sets

The `HeroSearchWidget` is not a simple form — it is a state machine. The active `mode: SearchMode` determines which form fields are rendered:

| Mode | Fields |
|------|--------|
| `buy` | City · Locality · Property Type · BHK multi-select · Budget range |
| `rent` | City · Locality · Property Type · BHK multi-select · Budget range |
| `pg` | City · Locality · Preferred By (Boys / Girls / Any) |
| `commercial` | City · Locality · Commercial Type (Office / Shop / Warehouse) |
| `plot` | City · Locality · Plot Area range |

Fields are rendered via **conditional JSX** — not CSS `display: none`. When mode switches from `buy` to `pg`, the BHKSelector and PropertyTypeSelect unmount from the DOM entirely; PreferredBySelector mounts. This is required for accessibility (screen readers must not encounter invisible form fields) and for clean state management (BHK state from buy mode should not persist into PG mode).

```tsx
// CORRECT — unmount fields on mode change
{(mode === 'buy' || mode === 'rent') && (
  <>
    <PropertyTypeSelect />
    <BHKSelector />
    <BudgetRangeSelect />
  </>
)}
{mode === 'pg' && <PreferredBySelector />}
{mode === 'commercial' && <CommercialTypeSelect />}
{mode === 'plot' && <PlotAreaSelect />}

// WRONG — hiding with CSS
<BHKSelector style={{ display: mode === 'buy' ? 'flex' : 'none' }} />
```

### Constraint 2: Indian price formatting — lakhs and crores

Indian real estate prices follow lakh/crore convention universally. Displaying `₹45,00,000` raw is incorrect; the expected format is `₹45 L`. The `formatPrice()` utility encodes these thresholds:

```typescript
10_000_000 (1 crore)  → display threshold for "X Cr"
100_000    (1 lakh)   → display threshold for "X L"
< 100_000             → raw format (used for rent amounts: ₹28,000/mo)
```

Examples:
- `₹1,20,00,000` → `₹1.20 Cr`
- `₹3,50,00,000` → `₹3.50 Cr`
- `₹85,00,000` → `₹85 L`
- `₹45,00,000` → `₹45 L`
- `₹28,000` (monthly rent) → `₹28,000/mo`

**`formatPrice()` must be called on every price display** — in `PropertyCard`, in `FeaturedProjects`, in filter budget labels. Never display a raw price integer.

### Constraint 3: ListingSource-driven CTA — never hardcode "Contact Owner"

Indian property portals have three listing source types: Owner (private seller, no brokerage), Builder (developer, project-based), Agent (real estate broker). Each has different implications for the buyer/renter — "Owner" properties are zero-commission, "Builder" listings are for new projects, "Agent" listings involve a broker fee.

The CTA on every `PropertyCard` derives from `property.listingSource`:

```tsx
// CORRECT — dynamic
<Button variant="outlineRed">Contact {property.listingSource}</Button>
// Renders: "Contact Owner" / "Contact Builder" / "Contact Agent"

// WRONG — hardcoded
<Button variant="outlineRed">Contact Owner</Button>
// Incorrect for 4 of the 8 mock properties (Builder × 3, Agent × 2)
```

QA enforcement:
```bash
grep -r "Contact Owner" src/components --include="*.tsx"   # must return empty
grep -r "Contact Builder" src/components --include="*.tsx" # must return empty
grep -r "Contact Agent" src/components --include="*.tsx"   # must return empty
# All three should be empty — the text is generated dynamically
```

---

## Stop-and-Ask List

| If you're about to... | Stop because... |
|-----------------------|-----------------|
| Hardcode "Contact Owner" in CTA | Constraint 3 — use `Contact ${property.listingSource}` |
| Display `₹8500000` or `₹85,00,000` raw | Constraint 2 — use `formatPrice(8_500_000)` → `₹85 L` |
| Add CSS `display: none` to hide search fields | Constraint 1 — unmount fields via conditional JSX |
| Add a doctor/provider/package entity | Wrong category — core entity is `Property` |
| Use green bg with white text for Verified badge | Wrong pattern — green TEXT on white card bg (7.78:1 ✓) |
| Use Roboto, Lato, Inter, or Nunito Sans | Wrong font — this build uses Poppins (400+500+600) |
| Add `border-radius: 20px` to anything other than filter chips | Constraint — 20px only on FilterBar chips |
| Use `border-radius: 12px` on PropertyCards | Wrong — cards use `8px`; only SearchWidget uses `12px` |
| Add `border-radius: 50%` to any element | No circular elements in this build |
| Show prices without `formatPrice()` | Constraint 2 — always format prices |
| Add NABH/JCI badges | Wrong category — RERA is the relevant regulatory badge |
| Ignore the `mode` state when rendering search fields | Constraint 1 — fields are mode-dependent |
| Add emergency link in nav | Not applicable — property portal |

---

## File Manifest

```
bw_realestate_01.md                         ← 8 platform prompt versions
bw_realestate_platform_01_scaffold/
  00_Orchestrator.md                        ← this file
  01_PRD.md                                 ← personas, functional requirements
  02_Architecture.md                        ← types, mock data, component map
  03_Design.md                              ← CSS tokens, component CSS, anti-patterns
  04_Plan.md                                ← 4-day build plan with gate checks
  05_Epics_and_Stories.md                   ← 8 epics, 40 stories
  06_Tasks.md                               ← TASK-001–018 with code snippets
  07_Guide.md                               ← constraint deep-dives, contrast math, 65-item checklist
```
