# 07 — Guide
## Indian Email Marketing SaaS Landing Page · bw_service_01

---

## Constraint Deep-Dives

---

### Constraint 1: Yellow Is Nearly As Bright As White

This is the defining constraint of bw_service_01 — and the most counterintuitive one in the entire library.

Yellow `#FFE01B` looks bold and high-contrast to the human eye because of its saturation. But WCAG contrast is based on relative luminance, not perceived vividness. Yellow is a very bright colour.

```
L(yellow #FFE01B):
R = 255/255 = 1.0     → linearized = 1.0
G = 224/255 = 0.8784  → linearized ≈ 0.749
B = 27/255  = 0.1059  → linearized ≈ 0.01881

L = 0.2126 × 1.0 + 0.7152 × 0.749 + 0.0722 × 0.01881
  = 0.2126 + 0.5357 + 0.001359
  = 0.7496 ≈ 0.749

Compare: L(white #FFFFFF) = 1.0
Yellow is at 75% of white's luminance.

White on yellow:
(L_lighter + 0.05) / (L_darker + 0.05) = (1.0 + 0.05) / (0.749 + 0.05)
= 1.05 / 0.799
= 1.31:1 ✗✗ CATASTROPHIC FAIL
```

**1.31:1 is nearly no contrast at all.** It is a lower contrast ratio than any combination used intentionally in prior builds. In the entire library:

| Worst prior case | Ratio |
|-----------------|-------|
| Gold on white (bw_realestate_03) | 2.72:1 ✗ — documented as forbidden |
| Orange on white (bw_realestate_02) | 4.15:1 — passes for large text only |
| **Yellow on white (this build)** | **1.31:1 ✗✗ — barely visible** |

Yellow text on a white nav background would be nearly invisible. White text on a yellow section would be nearly invisible. Both directions fail.

**The correct pattern:** dark `#241C15` on yellow = 12.77:1 ✓✓ — exceptional contrast that easily clears the AAA threshold.

---

### Constraint 2: The Logo Problem

SiteNav has a white background. "MailFlow" must appear in the nav. If the logo text is yellow, it fails with 1.31:1.

Options:
1. **Dark text + yellow accent element** (recommended)
   ```tsx
   <span className={styles.logoText}>MailFlow</span>
   {/* .logoText { color: var(--color-dark); } */}
   // Yellow appears as a small square icon before the text, or an underline
   ```

2. **Dark text with yellow bg behind a letter**
   ```tsx
   <span className={styles.logoM}>M</span>
   <span className={styles.logoRest}>ailFlow</span>
   // .logoM { background: var(--color-yellow); color: var(--color-dark); padding: 2px 6px; }
   // .logoRest { color: var(--color-dark); }
   ```

Either approach lets yellow appear in the logo without using yellow text on white.

**Detection:** `grep -r "color: var(--color-yellow)" src/components/layout/SiteNav.module.css` — any hit should be reviewed to confirm it is a `background:` context and not `color:` (text).

---

### Constraint 3: FeatureCheckmark Green Fails on Yellow Card

The highlighted PlanCard has `background: var(--color-yellow)`. Feature checkmarks normally use `color: var(--color-green)` (5.02:1 on white). On yellow background:

```
L(green #15803D) ≈ 0.1592

Green on yellow:
(L_lighter + 0.05) / (L_darker + 0.05) = (0.749 + 0.05) / (0.1592 + 0.05)
= 0.799 / 0.2092
= 3.82:1 ✗ (fails AA for normal text at 4.5:1)
```

**Resolution:** On the highlighted yellow card, use a dark-colored check icon instead of green.

```tsx
// PlanCard.tsx
const checkColor = tier.highlighted ? 'var(--color-dark)' : 'var(--color-green)'

// Or: pass an isHighlighted prop to FeatureCheckmark:
<FeatureCheckmark key={f} text={f} dark={tier.highlighted} />
```

```tsx
// FeatureCheckmark.tsx
interface Props { text: string; dark?: boolean }
export default function FeatureCheckmark({ text, dark }: Props) {
  return (
    <li className={styles.item}>
      <Check
        size={16}
        className={dark ? styles.iconDark : styles.icon}
        aria-hidden="true"
      />
      <span className={styles.text}>{text}</span>
    </li>
  )
}
// .icon     { color: var(--color-green); }  — on white bg = 5.02:1 ✓
// .iconDark { color: var(--color-dark);  }  — on yellow bg = 12.77:1 ✓✓
```

---

### Constraint 4: formatPlanPrice Is the Only Price Surface

In prior builds, a single `formatPrice(amount)` utility formatted one number. In this build, the price depends on two variables: the tier and the billing period.

```typescript
// Wrong — creates duplicated billing logic in JSX
const price = period === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice
const display = price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}/mo`

// Wrong — accesses raw tier property
<span>₹{tier.monthlyPrice}/mo</span>

// Correct — encapsulated
<span>{formatPlanPrice(tier, period)}</span>
```

The `formatPlanPrice` function is the single place where:
1. The period decides which price to use
2. The zero-price check decides "Free" vs INR format
3. The `/mo` suffix is applied

**Detection grep:**
```bash
grep -r "tier\.monthlyPrice\b\|tier\.yearlyPrice\b" src/components --include="*.tsx"
```
Must return 0 hits. Any hit means a component is bypassing the utility.

---

## Full Contrast Table

| Fg | Bg | Ratio | Level | Usage |
|----|-----|-------|-------|-------|
| Dark `#241C15` | Yellow `#FFE01B` | 12.77:1 | AAA ✓✓ | Highlighted card, TrustBar, savings pill |
| Yellow `#FFE01B` | Dark `#241C15` | 12.77:1 | AAA ✓✓ | Yellow accent on dark footer |
| White `#FFFFFF` | Yellow `#FFE01B` | 1.31:1 | FAIL ✗✗ | FORBIDDEN everywhere |
| Yellow `#FFE01B` | White `#FFFFFF` | 1.31:1 | FAIL ✗✗ | FORBIDDEN (logo text on white nav) |
| Dark `#241C15` | White `#FFFFFF` | ~13.5:1 | AAA ✓✓ | Body, headings, dark buttons |
| White `#FFFFFF` | Dark `#241C15` | ~13.5:1 | AAA ✓✓ | Button text on dark bg, footer |
| Muted `#6B7280` | White `#FFFFFF` | ~4.5:1 | AA ✓ | Descriptions, plan descriptions |
| Green `#15803D` | White `#FFFFFF` | 5.02:1 | AA ✓ | Feature checkmarks on white cards |
| Green `#15803D` | Yellow `#FFE01B` | 3.82:1 | FAIL ✗ | Forbidden — use dark icon on yellow |

---

## 50-Item Launch Checklist

### Foundation (8)
- [ ] 1. `tsc --noEmit` exits 0
- [ ] 2. `npm run build` exits 0, `/out` created
- [ ] 3. `Inter` imported with weights 400/500/600 — not Poppins, not DM Sans
- [ ] 4. 8 tokens defined — includes `--color-yellow` and `--color-yellow-tint`
- [ ] 5. `.sr-only` + `prefers-reduced-motion` in globals.css
- [ ] 6. `formatPlanPrice(PRICING_TIERS[2], 'yearly')` → `'₹1,199/mo'`
- [ ] 7. `calculateYearlySavings(PRICING_TIERS[2])` → `3600`
- [ ] 8. `calculateYearlySavings(PRICING_TIERS[0])` → `0`

### Design System (6)
- [ ] 9. Zero hex in `.module.css`
- [ ] 10. No `font-weight: 700` anywhere
- [ ] 11. No `border-radius: 50%` anywhere
- [ ] 12. `TrustBar.module.css` has `background: var(--color-yellow)` — no `color: var(--color-white)`
- [ ] 13. `PlanCard.module.css` `.cardHighlighted` has `color: var(--color-dark)` — not white
- [ ] 14. `BillingToggle.module.css` `.savingsPill` has `background: var(--color-yellow); color: var(--color-dark)`

### SiteNav (3)
- [ ] 15. Logo text is `var(--color-dark)` — NOT yellow on white
- [ ] 16. Sticky + scroll shadow
- [ ] 17. `<nav aria-label="Main navigation">`

### HeroSection (3)
- [ ] 18. White background (no yellow in hero section)
- [ ] 19. Two CTAs: "Get Started Free" (dark) + "See Pricing" (ghost)
- [ ] 20. Illustration placeholder div present on right side

### PlanGrid + BillingToggle (6)
- [ ] 21. `PlanGrid` is `'use client'` — `BillingToggle` and `PlanCard` are not
- [ ] 22. `BillingToggle` has `aria-pressed` on both buttons — NOT radio inputs
- [ ] 23. Switching period updates all 4 plan prices simultaneously
- [ ] 24. ARIA live region: "Showing {period} pricing"
- [ ] 25. Savings pill: `background: var(--color-yellow); color: var(--color-dark)`
- [ ] 26. `useMemo` does NOT appear in `PlanGrid` (no list — only 4 static tiers)

### PlanCard (7)
- [ ] 27. All 4 tiers render with correct prices
- [ ] 28. `formatPlanPrice` used — `tier.monthlyPrice` / `tier.yearlyPrice` NOT in JSX
- [ ] 29. Highlighted Standard card: yellow bg + dark text
- [ ] 30. "Most Popular" badge on Standard card only
- [ ] 31. Yearly savings line appears on Essentials, Standard, Premium when yearly selected
- [ ] 32. Yearly savings line does NOT appear on Free tier
- [ ] 33. Savings line uses conditional JSX — not CSS display/visibility

### FeatureShowcase (3)
- [ ] 34. 3 feature rows present
- [ ] 35. Alternating layout: text-right, text-left, text-right
- [ ] 36. Illustration placeholders styled (not empty blank areas)

### TrustBar (3)
- [ ] 37. Yellow background: `var(--color-yellow)`
- [ ] 38. All stat values + labels: `var(--color-dark)` text
- [ ] 39. Framer Motion stagger with `viewport={{ once: true }}`

### QA Greps (10)
- [ ] 40. `grep -r "border-radius: 50%" src --include="*.module.css"` → empty
- [ ] 41. `grep -r "font-weight: 700" src --include="*.module.css"` → empty
- [ ] 42. `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty
- [ ] 43. `grep -r "color-white" src/components/home/TrustBar.module.css` → empty
- [ ] 44. `grep -r "color-white" src/components/home/PlanCard.module.css` → empty
- [ ] 45. `grep -r "tier\.monthlyPrice\b\|tier\.yearlyPrice\b" src/components --include="*.tsx"` → empty
- [ ] 46. `grep -r "aria-pressed" src/components/home/BillingToggle.tsx` → present ✓
- [ ] 47. `grep -r "display: none\|visibility:" src/components/home/PlanCard.module.css` → empty
- [ ] 48. `grep -r "Poppins\|DM_Sans\|Plus_Jakarta_Sans" src/app/layout.tsx` → empty
- [ ] 49. `grep -r "color: var(--color-yellow)" src/components/layout/SiteNav.module.css` → empty (yellow as text color forbidden on white nav)
- [ ] 50. `npm run build` exits 0
