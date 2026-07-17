# 07 — Guide
## Modern Indian Rental Discovery · bw_realestate_04

---

## Constraint Deep-Dives

---

### Constraint 1: Deposit Must Never Use formatPrice()

This is the most likely mistake in this build. `RentalProperty` has two money fields:

```typescript
monthlyRent: number   // a recurring payment
deposit:     number   // a one-time payment
```

`formatPrice()` appends `/mo` for amounts under ₹1L:

```typescript
formatPrice(56000) → '₹56,000/mo'   // WRONG for deposit
```

The deposit is not a monthly expense. It's paid once. The correct display:

```typescript
// CORRECT — deposit
`₹${property.deposit.toLocaleString('en-IN')}`
// → '₹56,000'

// CORRECT — monthly rent
formatPrice(property.monthlyRent)
// → '₹28,000/mo'
```

**Detection grep:**

```bash
grep -rn "formatPrice.*deposit\|formatPrice(property\.deposit)" src/components
```

Must return 0 hits. Any hit is a bug.

**The UI pattern:**

```tsx
<span className={styles.rent}>{formatPrice(property.monthlyRent)}</span>
<span className={styles.deposit}>
  Deposit: ₹{property.deposit.toLocaleString('en-IN')}
</span>
```

The word "Deposit:" as a label before the amount removes ambiguity for the user. The `/mo` absence signals it's not a recurring cost.

---

### Constraint 2: Owner-Only CTA — Never Dynamic

In bw_realestate_01/02/03, the CTA is dynamic:

```tsx
// bw_01/02/03 — dynamic (correct for those builds)
<Button>Contact {property.listingSource}</Button>
// renders: "Contact Owner" / "Contact Agent" / "Contact Builder"
```

In bw_realestate_04, `RentalProperty` has no `listingSource` field. The CTA is always:

```tsx
// bw_04 — always hardcoded (correct for this build)
<Button variant="outlinePurple" size="sm" fullWidth>
  Contact Owner
</Button>
```

This is a deliberate product decision. The zero-brokerage brand means every listing is owner-direct. Hardcoding `"Contact Owner"` is the correct architectural choice, not a shortcut.

**Detection grep:**

```bash
grep -r "Contact Agent\|Contact Builder" src/components --include="*.tsx"
```

Must return 0 hits.

---

### Constraint 3: Purple Luminance and Contrast

```
Purple #6C3CE1
RGB: 108, 60, 225

Linearize:
R_lin = (108/255)^2.2 ≈ 0.1384
G_lin = (60/255)^2.2  ≈ 0.0468
B_lin = (225/255)^2.2 ≈ 0.7683

L(purple) = 0.2126 × 0.1384 + 0.7152 × 0.0468 + 0.0722 × 0.7683
           = 0.02941 + 0.03347 + 0.05547
           = 0.1184

White on purple:
(L_white + 0.05) / (L_purple + 0.05)
= (1.0 + 0.05) / (0.1184 + 0.05)
= 1.05 / 0.1684
= 6.23:1  ✓ AA (passes 4.5:1 threshold)
```

**Purple usage rules:**
- Purple bg → white text ✓ (primary buttons, active chips, BrokerSavingsStrip)
- Purple text on white → 6.23:1 ✓ (logo, outline button text, PetFriendlyBadge)
- Purple text on surface `#F8F7FF` → approximately 6.1:1 ✓ (almost identical to white)

Purple is a strong, accessible brand colour. Unlike gold in bw_03 (which had a 2.72:1 failure), purple presents no contrast challenges.

---

### Constraint 4: Green Is Semantically Restricted

```
Green #15803D
RGB: 21, 128, 61

L(green) = 0.2126 × (21/255)^2.2 + 0.7152 × (128/255)^2.2 + 0.0722 × (61/255)^2.2
         ≈ 0.2126 × 0.0055 + 0.7152 × 0.2158 + 0.0722 × 0.0497
         ≈ 0.0012 + 0.1544 + 0.0036
         = 0.1592

Green on white:
(1.0 + 0.05) / (0.1592 + 0.05) = 1.05 / 0.2092 = 5.02:1  ✓ AA
```

Green passes AA contrast. But it must be used **only** for savings-related semantics:

| Correct green use | Incorrect green use |
|-------------------|---------------------|
| `ZeroBrokerageBadge` text + border | Button primary colour |
| `OwnerVerifiedBadge` text | Icon tint for navigation |
| `BrokerSavingsWidget` savings amount | Section headings |
| `BrokerSavingsStrip` accent text | Category filter chips |

The design rule: **green = money saved**. Every green element on the page should reinforce the zero-brokerage message. If green appears in unrelated UI, it dilutes this semantic and the brand feels inconsistent.

---

## Full Contrast Table

| Fg | Bg | Ratio | Level | Usage |
|----|-----|-------|-------|-------|
| White `#FFFFFF` | Purple `#6C3CE1` | 6.23:1 | AA ✓ | Buttons, active chips, strip text |
| Purple `#6C3CE1` | White `#FFFFFF` | 6.23:1 | AA ✓ | Logo, outline button, PetFriendlyBadge |
| Purple `#6C3CE1` | Surface `#F8F7FF` | ~6.1:1 | AA ✓ | Purple text on page background |
| Green `#15803D` | White `#FFFFFF` | 5.02:1 | AA ✓ | ZeroBrokerageBadge, savings amounts |
| Dark `#1A1033` | White `#FFFFFF` | ~14.5:1 | AAA ✓✓ | Body, titles, card text |
| Muted `#6B7280` | White `#FFFFFF` | ~4.5:1 | AA ✓ | Deposit label, meta text |
| White `#FFFFFF` | Dark `#0D0B14` | ~18:1 | AAA ✓✓ | Footer, TrustBar |

---

## 50-Item Launch Checklist

### Foundation (8)
- [ ] 1. `tsc --noEmit` exits 0
- [ ] 2. `npm run build` exits 0, `/out` created
- [ ] 3. `Plus_Jakarta_Sans` imported (not Poppins, not DM Sans) with weights 400/500/600
- [ ] 4. 8 tokens defined — includes both `--color-purple` and `--color-green`
- [ ] 5. `--color-surface: #F8F7FF` is purple-tinted (not neutral white)
- [ ] 6. `.sr-only` + `prefers-reduced-motion` in globals.css
- [ ] 7. `calculateBrokerSavings(28000)` → `56000`
- [ ] 8. `filterRentals(data, { bhk: ['2 BHK'], ... })` → 3 properties (nb-01, nb-04, nb-07)

### Design System (7)
- [ ] 9. Zero hex in `.module.css` (hero gradient exception documented with comment)
- [ ] 10. No `font-weight: 700` anywhere
- [ ] 11. No `border-radius: 50%` anywhere
- [ ] 12. `ZeroBrokerageBadge`: `color: var(--color-green)` — on EVERY card
- [ ] 13. `OwnerVerifiedBadge`: `color: var(--color-green)` — no border
- [ ] 14. `PetFriendlyBadge`: `color: var(--color-purple)` — conditional on `petFriendly === true`
- [ ] 15. Card radius: `10px` (not 8px from bw_01/02 nor 12px from bw_03)

### SiteNav (3)
- [ ] 16. Logo: `color: var(--color-purple)`
- [ ] 17. Sticky + scroll shadow
- [ ] 18. `<nav aria-label="Main navigation">`

### HeroSection (4)
- [ ] 19. Purple gradient background `linear-gradient(135deg, #6C3CE1 0%, #3D1FA3 100%)`
- [ ] 20. Gradient hex documented with `/* hex allowed in gradient */` comment
- [ ] 21. Search widget: white bg, 12px radius, strong shadow
- [ ] 22. `BrokerSavingsStrip` visible immediately (in or directly below hero)

### BrokerSavingsStrip (3)
- [ ] 23. Background: `var(--color-purple)` — never hardcoded hex
- [ ] 24. White text on purple = 6.23:1 ✓
- [ ] 25. Shows `calculateBrokerSavings` result or derived value

### RentalFilterBar (5)
- [ ] 26. BHK: multi-select `BHKType[]` array (not single-select)
- [ ] 27. 5 filter dimensions total: BHK, furnishing, maxRent, petFriendly, tenantPreference
- [ ] 28. `useMemo` wraps `filterRentals`
- [ ] 29. ARIA live region with result count
- [ ] 30. "Clear all" button resets to `INITIAL` state

### RentalPropertyCard (6)
- [ ] 31. `ZeroBrokerageBadge` on every card
- [ ] 32. `formatPrice(property.monthlyRent)` → shows `/mo` suffix
- [ ] 33. `property.deposit.toLocaleString('en-IN')` → NO `/mo` suffix
- [ ] 34. `OwnerProfileSnippet` with owner name + `OwnerVerifiedBadge` (if verified)
- [ ] 35. CTA is exactly `"Contact Owner"` — hardcoded, not dynamic
- [ ] 36. `petFriendly === true` → `PetFriendlyBadge` visible; `false` → not rendered (conditional JSX)

### BrokerSavingsWidget (3)
- [ ] 37. `'use client'` directive present
- [ ] 38. Savings amount in `var(--color-green)`
- [ ] 39. Live update on every input change via `calculateBrokerSavings`

### TrustBar (3)
- [ ] 40. Dark background: `var(--color-dark)`
- [ ] 41. Icons: `color: var(--color-purple)` (not teal like bw_03)
- [ ] 42. Framer Motion stagger entrance, `viewport={{ once: true }}`

### QA Greps (8)
- [ ] 43. `grep -r "border-radius: 50%" src --include="*.module.css"` → empty
- [ ] 44. `grep -r "font-weight: 700" src --include="*.module.css"` → empty
- [ ] 45. `grep -rn "formatPrice.*deposit" src/components` → empty
- [ ] 46. `grep -r "Contact Agent\|Contact Builder" src/components --include="*.tsx"` → empty
- [ ] 47. `grep -r "Contact Owner" src/components/home/RentalPropertyCard.tsx` → present ✓
- [ ] 48. `grep -r "useMemo" src/components/home/RentalFilterBar.tsx` → present ✓
- [ ] 49. `grep -r "Poppins\|DM_Sans" src/app/layout.tsx` → empty ✓
- [ ] 50. `npm run build` exits 0
