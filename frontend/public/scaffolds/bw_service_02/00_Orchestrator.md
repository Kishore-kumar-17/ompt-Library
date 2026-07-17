# 00 — Orchestrator
## Indian Web Agency Directory · bw_service_02

---

## How to use this scaffold

This is the second service-category build and the first directory/marketplace build in the library. It introduces free-text search, three-tier badge logic, and budget-range formatting — none of which appear in prior builds. Read this file first, then 01–07 in order.

---

## Cross-Build Context

| Build | Domain | Primary interaction | Unique pattern |
|-------|--------|--------------------|----|
| bw_realestate_01 | Property listing | 4-dim FilterBar (multi-select array) | `filterProperties` |
| bw_realestate_04 | Rental discovery | 5-dim RentalFilterBar (incl. boolean) | `filterRentals` + deposit display |
| bw_service_01 | SaaS pricing page | BillingPeriod toggle | `formatPlanPrice(tier, period)` |
| **bw_service_02** | **Agency directory** | **Text search + 4 tag filters + featured sort** | **`filterAgencies` + `formatBudgetRange`** |

The filter systems grow in complexity across builds. bw_service_02 adds two patterns no prior build has:
1. **Free-text search** — partial string matching on two fields
2. **Featured-first sort** — encapsulated inside the filter utility, not the component

---

## The Four Core Constraints of bw_service_02

### Constraint 1: budgetCategory for Filtering, formatBudgetRange for Display

`Agency` has three budget fields, each serving one purpose only:

| Field | Type | Purpose |
|-------|------|---------|
| `budgetCategory` | `BudgetRange` (union) | Filter logic — O(1) string compare |
| `budgetMin` | `number` | `formatBudgetRange` display only |
| `budgetMax` | `number \| null` | `formatBudgetRange` display only |

**Filter** (correct):
```typescript
if (filters.budgetRange && a.budgetCategory !== filters.budgetRange) return false
```

**Display** (correct):
```tsx
<span>{formatBudgetRange(agency)}</span>
```

**Wrong** (bypasses both):
```tsx
<span>₹{agency.budgetMin / 100000}L+</span>  // raw numbers in JSX
if (agency.budgetMin < 200000) ...             // range math in filter
```

Why: range math in the filter creates implicit thresholds that must be kept in sync with the `BudgetRange` union values in two places. Pre-computing `budgetCategory` once in the data keeps the contract clear.

### Constraint 2: Text Search Matches Name OR Tagline

```typescript
if (filters.search.trim()) {
  const q = filters.search.toLowerCase()
  // OR — not AND
  if (!a.name.toLowerCase().includes(q) && !a.tagline.toLowerCase().includes(q)) return false
}
```

A user searching "studio" should find "PixelCraft **Studio**" (name match) and "**Studio**North" (name match) and any agency with "studio" in its tagline. The OR condition is not an oversight — it is the intended behaviour.

Whitespace trim before comparing prevents accidental no-results on leading/trailing spaces.

### Constraint 3: Featured Sort Is Inside filterAgencies

```typescript
// CORRECT — sort inside utility
export function filterAgencies(agencies, filters) {
  const result = agencies.filter(...)
  return [...result].sort((a, b) => Number(b.featured) - Number(a.featured))
}

// WRONG — sort in component
const filtered = useMemo(() => filterAgencies(agencies, filters), [agencies, filters])
const sorted = [...filtered].sort(...)  // duplicates sort logic, breaks encapsulation
```

The component receives a ready-to-render array. It does not sort. This keeps the component dumb and the utility testable.

### Constraint 4: Amber Requires Dark Text (Premier Badge)

```
L(amber #D97706):
RGB: 217, 119, 6
L ≈ 0.301

White on amber: (1.0+0.05)/(0.301+0.05) = 1.05/0.351 = 2.99:1 ✗ FAIL
Dark on amber:  (0.301+0.05)/(L(dark)+0.05) ≈ 6.31:1 ✓ AA
```

Premier badge: `background: var(--color-amber); color: var(--color-dark)` — same pattern as YieldBadge in bw_realestate_03 (gold bg, dark text). Both amber and gold are mid-brightness colors that fail with white text.

---

## Stop List

| Banned element | Why |
|----------------|-----|
| `a.budgetMin < 200000` in filter logic | Use `a.budgetCategory` string compare |
| `agency.budgetMin` / `agency.budgetMax` in JSX | Use `formatBudgetRange(agency)` |
| `color: var(--color-white)` on amber bg | 2.99:1 ✗ — Premier badge must have dark text |
| Sort logic in `AgencyFilterBar` component | Encapsulated in `filterAgencies` |
| `border-radius: 50%` | No circles |
| `font-weight: 700` | Max 600 |
| Hex in `.module.css` | Tokens only |
| `Space_Grotesk` weight `'700'` in layout.tsx | Not loaded |

---

## Proceed to: 01_PRD.md
