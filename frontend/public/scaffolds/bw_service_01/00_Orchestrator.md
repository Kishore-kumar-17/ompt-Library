# 00 — Orchestrator
## Indian Email Marketing SaaS Landing Page · bw_service_01

---

## How to use this scaffold

This is the first SaaS/service build in the BusiWeb library. It introduces a fundamentally different domain — no property data, no rental units, no real estate. Read this file first to understand what makes it different, then proceed through 01–07.

---

## Cross-Category Context

### Prior builds (all real estate)

| Build | Domain | Primary interaction | Key utility |
|-------|--------|--------------------|----|
| bw_realestate_01 | Property listing grid | 4-dim filter bar | `filterProperties` |
| bw_realestate_02 | Property detail page | Tab-based content | `calculateEMI` |
| bw_realestate_03 | Premium listing grid | Single-dim category filter | `filterByCategory` + `formatYield` |
| bw_realestate_04 | Rental discovery | 5-dim rental filter | `filterRentals` + `calculateBrokerSavings` |

### This build (SaaS)

| Build | Domain | Primary interaction | Key utility |
|-------|--------|--------------------|----|
| bw_service_01 | Email marketing SaaS homepage | Billing period toggle (monthly/yearly) | `formatPlanPrice` + `calculateYearlySavings` |

No filtering of a list. No properties. The primary interactive state is a two-value toggle that changes what price is displayed across 4 plan cards simultaneously.

---

## The Four Core Constraints of bw_service_01

### Constraint 1: Yellow Background Always Gets Dark Text

Yellow `#FFE01B` has a relative luminance of 0.749 — almost as bright as white (1.0). The WCAG contrast ratios:

| Pairing | Ratio | Result |
|---------|-------|--------|
| Dark `#241C15` on yellow | 12.77:1 | ✓✓ AAA |
| White `#FFFFFF` on yellow | 1.31:1 | ✗✗ CATASTROPHIC FAIL |

White text on yellow looks fine to some designers — it feels "high contrast" because yellow is so saturated. This is a perceptual trap. The luminance math is unambiguous. White on yellow fails more than any other pairing in this library.

**Every yellow-bg element must set `color: var(--color-dark)` explicitly:**
```css
.highlighted   { background: var(--color-yellow); color: var(--color-dark); }
.trustSection  { background: var(--color-yellow); color: var(--color-dark); }
.savingsPill   { background: var(--color-yellow); color: var(--color-dark); }
```

Detection: `grep -r "color-yellow" src/components --include="*.module.css"` should return ZERO lines where the same rule also sets `color: var(--color-white)`.

### Constraint 2: formatPlanPrice Takes Both Tier and Period

The billing period lives in `PlanGrid` state. `PlanCard` receives it as a prop. Neither `PlanCard` nor any child reads `tier.monthlyPrice` or `tier.yearlyPrice` directly.

```typescript
// WRONG — exposes billing logic to JSX
<span>{tier.monthlyPrice === 0 ? 'Free' : `₹${tier.monthlyPrice}/mo`}</span>

// CORRECT — encapsulated
<span>{formatPlanPrice(tier, period)}</span>
```

The utility function is the single source of truth for price formatting, billing period logic, and the Free tier display. Test it in isolation before wiring up components.

### Constraint 3: Yearly Savings Is Conditional JSX

When the user switches to yearly billing, a savings line appears on each paid tier. This must be conditional JSX — not a hidden element.

```tsx
// WRONG — hidden DOM element
<p style={{ visibility: period === 'yearly' ? 'visible' : 'hidden' }}>
  Save ₹{calculateYearlySavings(tier).toLocaleString('en-IN')}/yr
</p>

// CORRECT — not in DOM when not applicable
{period === 'yearly' && tier.monthlyPrice > 0 && (
  <p className={styles.savings}>
    Save ₹{calculateYearlySavings(tier).toLocaleString('en-IN')}/yr
  </p>
)}
```

The `tier.monthlyPrice > 0` guard prevents the Free tier from showing a "Save ₹0/yr" line.

### Constraint 4: BillingToggle Uses aria-pressed, Not Radio Inputs

The toggle is a two-state switch. The correct ARIA pattern:

```tsx
<button aria-pressed={period === 'monthly'} onClick={() => setPeriod('monthly')}>
  Monthly
</button>
<button aria-pressed={period === 'yearly'} onClick={() => setPeriod('yearly')}>
  Yearly
</button>
```

Not `<input type="radio">`. Not `role="tab"` (that's for tab panels). `aria-pressed` on buttons is the correct semantic for a two-state toggle switch.

---

## Stop List

| Banned element | Why |
|----------------|-----|
| `color: var(--color-white)` on yellow bg | White on yellow = 1.31:1 ✗✗ |
| `tier.monthlyPrice` or `tier.yearlyPrice` directly in JSX | Use `formatPlanPrice(tier, period)` |
| CSS `display: none` / `visibility: hidden` for savings line | Conditional JSX only |
| `<input type="radio">` for billing toggle | Use `aria-pressed` buttons |
| `font-weight: 700` | Max weight 600 in Inter design system |
| `border-radius: 50%` | No circles in any component |
| `#FFE01B` in `.module.css` | Use `var(--color-yellow)` |
| Property/rental data | Wrong domain entirely |

---

## Proceed to: 01_PRD.md
