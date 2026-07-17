# 07 — Guide
## Indian Web Agency Directory · bw_service_02

---

## Constraint Deep-Dives

---

### Constraint 1: budgetCategory vs budgetMin/budgetMax — Two Fields, One Purpose Each

`Agency` carries three budget-related fields. Each has exactly one purpose:

| Field | Type | Purpose | Used in |
|-------|------|---------|---------|
| `budgetCategory` | `BudgetRange` union | Filter — O(1) string compare | `filterAgencies` only |
| `budgetMin` | `number` | Display — human-readable range | `formatBudgetRange` only |
| `budgetMax` | `number \| null` | Display — upper bound or unlimited | `formatBudgetRange` only |

**Why not range math in the filter?**

A naive filter might look like:
```typescript
// BAD — range math in filter
if (filters.budgetRange === 'Under ₹2L' && agency.budgetMin >= 200000) return false
if (filters.budgetRange === '₹2L–₹10L' && (agency.budgetMin < 200000 || agency.budgetMin >= 1000000)) return false
```

This creates two problems:
1. The threshold values (200000, 1000000) are implicit constants not connected to the `BudgetRange` union type. Add a new tier range and you must update both the data and the filter.
2. `budgetMin` represents the agency's minimum project size, not its category midpoint. An agency might have `budgetMin: 300000` but `budgetCategory: '₹2L–₹10L'`. The category is set intentionally by the agency — the min is for display.

Pre-computing `budgetCategory` on each `Agency` object resolves both issues. The filter becomes one string compare. The data is the source of truth.

**Detection:**
```bash
grep -r "budgetMin\b\|budgetMax\b" src/components --include="*.tsx"
```
Must return 0 hits. Any hit is bypassing the utility.

---

### Constraint 2: Text Search Is OR, Not AND

```typescript
// Correct — matches if name OR tagline contains query
if (
  !a.name.toLowerCase().includes(q) &&
  !a.tagline.toLowerCase().includes(q)
) return false
```

If this were AND:
```typescript
// Wrong — would require query to appear in both name AND tagline
if (
  !a.name.toLowerCase().includes(q) ||
  !a.tagline.toLowerCase().includes(q)
) return false
```

User intent: "find me agencies related to my search term". An agency's tagline is their elevator pitch. Excluding agencies where the term appears in the tagline but not the name would miss exactly the right results.

Example: search `"startup"` — this should match AppMade (tagline: "Startup MVPs...") even though "startup" isn't in its name.

---

### Constraint 3: Amber — Contrast Math and Perceptual Trap

Amber is a similar perceptual trap to yellow (bw_service_01) but less extreme.

```
L(amber #D97706) ≈ 0.301

White on amber: (1.0+0.05)/(0.301+0.05) = 1.05/0.351 = 2.99:1 ✗ FAIL
Dark on amber:  (0.301+0.05)/(0.00569+0.05) = 0.351/0.05569 = 6.30:1 ✓ AA
```

Amber is at approximately 30% of white's luminance. It's medium-brightness. White text on amber looks passable to the eye — it has colour contrast even if not luminance contrast. But WCAG is based on luminance, not colour difference. 2.99:1 fails by a significant margin.

**This is the same fundamental issue as:**
- Gold `#C9941A` in bw_realestate_03 (2.72:1 — white on gold forbidden)
- Amber `#D97706` here (2.99:1 — white on amber forbidden)

In both builds, dark text on the mid-brightness badge passes clearly, while white fails.

**The `.premier` CSS rule must be:**
```css
.premier {
  background: var(--color-amber);
  color: var(--color-dark);    /* 6.30:1 ✓ */
}
/* NOT: color: var(--color-white); — that's 2.99:1 ✗ */
```

---

### Constraint 4: Featured Sort Belongs to the Utility, Not the Component

`filterAgencies` returns a sorted array. `AgencyFilterBar` renders it. No sorting happens in the component.

This matters for two reasons:

**1. Testability:** `filterAgencies` can be unit-tested in isolation. Pass in a known array, assert the featured order. If sort is in the component, you need to render the component to test it.

**2. Correctness under composition:** If another consumer of `filterAgencies` is added later (e.g. an API route, a different page), it gets the sort for free. The sort isn't tied to one component's render logic.

**Detection:**
```bash
# Sort must be in the utility
grep -r "\.sort(" src/lib/filterAgencies.ts    # must be present

# Sort must NOT be in the component
grep -r "\.sort(" src/components/home/AgencyFilterBar.tsx  # must be empty
```

---

## Full Contrast Table

| Fg | Bg | Ratio | Level | Usage |
|----|-----|-------|-------|-------|
| White `#FFFFFF` | Indigo `#4F46E5` | 6.29:1 | AA ✓ | Expert badge, active chips, indigo button |
| Indigo `#4F46E5` | White `#FFFFFF` | 6.29:1 | AA ✓ | Certified badge, logo, indigo text |
| Dark `#0F0F23` | Amber `#D97706` | 6.30:1 | AA ✓ | Premier badge text |
| White `#FFFFFF` | Amber `#D97706` | 2.99:1 | FAIL ✗ | FORBIDDEN on amber bg |
| Dark `#0F0F23` | White `#FFFFFF` | ~17.5:1 | AAA ✓✓ | Body text, headings |
| Muted `#6B7280` | White `#FFFFFF` | ~4.5:1 | AA ✓ | Review counts, meta, taglines |
| Indigo `#4F46E5` | Surface `#F5F5FF` | ~6.1:1 | AA ✓ | Indigo text on surface bg |
| White `#FFFFFF` | Footer `#070715` | ~19:1 | AAA ✓✓ | TrustBar, footer text |

---

## 50-Item Launch Checklist

### Foundation (8)
- [ ] 1. `tsc --noEmit` exits 0
- [ ] 2. `npm run build` exits 0, `/out` created
- [ ] 3. `Space_Grotesk` imported with weights 400/500/600 — not Inter, Poppins, or DM Sans
- [ ] 4. 8 tokens defined — includes `--color-indigo` and `--color-amber`
- [ ] 5. `.sr-only` + `prefers-reduced-motion` in globals.css
- [ ] 6. `filterAgencies(AGENCIES, { search: 'studio' })` → 2 results
- [ ] 7. `filterAgencies(AGENCIES, { tier: 'Premier' })` → 2 results, featured first
- [ ] 8. `formatBudgetRange({ budgetMin: 5000000, budgetMax: null })` → `'₹50L+'`

### Design System (5)
- [ ] 9. Zero hex in `.module.css`
- [ ] 10. No `font-weight: 700` anywhere
- [ ] 11. No `border-radius: 50%` anywhere
- [ ] 12. `TierBadge.module.css` `.premier` has `color: var(--color-dark)` — NOT white
- [ ] 13. `TierBadge.module.css` `.expert` has `color: var(--color-white)` on indigo — 6.29:1 ✓

### SiteNav (3)
- [ ] 14. Logo: `color: var(--color-indigo)` — indigo on white = 6.29:1 ✓
- [ ] 15. Sticky + scroll shadow
- [ ] 16. `<nav aria-label="Main navigation">`

### HeroSection (2)
- [ ] 17. White background — no indigo bg in hero
- [ ] 18. Large search bar with Search icon present

### AgencyFilterBar (7)
- [ ] 19. `'use client'` on `AgencyFilterBar.tsx`
- [ ] 20. Text search input (`type="search"`) with search icon
- [ ] 21. Specialization chips (7 options including "All")
- [ ] 22. Budget, city, tier `<select>` elements
- [ ] 23. `useMemo` wraps `filterAgencies`
- [ ] 24. No `.sort(` in `AgencyFilterBar.tsx` (sort in utility)
- [ ] 25. ARIA live region announces filtered count

### AgencyCard (8)
- [ ] 26. Portfolio thumbnail placeholder div present
- [ ] 27. Featured strip: `agency.featured && <span>Featured</span>` — conditional JSX
- [ ] 28. Featured strip on ag-01, ag-02, ag-03 only (3 of 8)
- [ ] 29. `TierBadge` rendered on every card
- [ ] 30. `StarRating` rendered on every card
- [ ] 31. `SpecTag` for each specialization
- [ ] 32. `formatBudgetRange(agency)` for budget display — no raw numbers
- [ ] 33. "View Agency" `outlineIndigo` CTA button

### filterAgencies Behaviour (5)
- [ ] 34. `{ search: 'saas' }` (lowercase) matches ag-01, ag-02, ag-06 (case-insensitive)
- [ ] 35. `{ search: '  studio  ' }` (with spaces) same result as `{ search: 'studio' }`
- [ ] 36. `{ budgetRange: '₹2L–₹10L' }` → ag-02, ag-05, ag-08 (string compare on budgetCategory)
- [ ] 37. No sort in AgencyFilterBar component
- [ ] 38. Featured agencies (ag-01/02/03) always appear before non-featured in any result set

### TrustBar (3)
- [ ] 39. Background: `var(--color-footer)`
- [ ] 40. All text white — white on footer = 19:1 ✓✓
- [ ] 41. Framer Motion stagger with `viewport={{ once: true }}`

### QA Greps (9)
- [ ] 42. `grep -r "border-radius: 50%" src --include="*.module.css"` → empty
- [ ] 43. `grep -r "font-weight: 700" src --include="*.module.css"` → empty
- [ ] 44. `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty
- [ ] 45. `grep -r "color-white" src/components/ui/TierBadge.module.css` → zero `color:` lines
- [ ] 46. `grep -r "budgetMin\b\|budgetMax\b" src/components --include="*.tsx"` → empty
- [ ] 47. `grep -r "\.sort(" src/components/home/AgencyFilterBar.tsx` → empty
- [ ] 48. `grep -r "\.sort(" src/lib/filterAgencies.ts` → present ✓
- [ ] 49. `grep -r "Inter\b\|Poppins\|DM_Sans\|Plus_Jakarta_Sans" src/app/layout.tsx` → empty
- [ ] 50. `npm run build` exits 0
