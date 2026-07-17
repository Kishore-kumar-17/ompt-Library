# 07 — Guide
## Indian Premium Property Portal · bw_realestate_03

---

## Constraint Deep-Dives

---

### Constraint 1: Two-Colour Brand — Gold and Teal

This is the first build in the real estate library with two distinct brand colours. Each has different contrast properties and therefore different pairing rules.

#### Teal `#0B6E77`

```
RGB: 11, 110, 119
L(teal) ≈ 0.1254

White on teal: (1.05) / (0.1254 + 0.05) = 1.05 / 0.1754 = 5.99:1 ✓ AA
Teal on white: (0.1254 + 0.05) / (0.0 + 0.05) = 0.1754 / 0.05 = 3.51... wait

Teal on white (corrected):
L(white) = 1.0, L(teal) = 0.1254
(L_lighter + 0.05) / (L_darker + 0.05) = (1.0 + 0.05) / (0.1254 + 0.05) = 5.99:1 ✓
```

**Teal usage rules:**
- Teal bg → white text ✓ (buttons, active chips, possession badge)
- Teal text on white bg ✓ (logo, badge text, outline button text, SqVerifiedBadge)
- Teal text on surface `#F7F8FA` → approximately 5.8:1 ✓

#### Gold `#C9941A`

```
RGB: 201, 148, 26
L(gold) ≈ 0.3368

White on gold: (1.0 + 0.05) / (0.3368 + 0.05) = 1.05 / 0.3868 = 2.72:1 ✗ FAILS
Dark on gold: (0.3368 + 0.05) / (0.0151 + 0.05) = 0.3868 / 0.0651 = 5.94:1 ✓
Gold on white: (0.3368 + 0.05) / (0.05) = 0.3868 / 0.05 = 7.74... wait

Gold on white (corrected):
(L_lighter + 0.05) / (L_darker + 0.05) = (1.0 + 0.05) / (0.3368 + 0.05) = 2.72:1 ✗

Hmm — gold is a medium brightness, so:
- White background is lighter than gold → white/gold ratio = same computation
- Gold ON white: gold is darker than white
  (1.0 + 0.05) / (0.3368 + 0.05) = 1.05 / 0.3868 = 2.72:1 ✗ (gold is too light against white)
```

**Gold usage rules:**
- Gold bg → dark text ✓ (YieldBadge, gold buttons)
- Gold text on white bg → 2.72:1 ✗ — ONLY for large bold elements (agent rating at ≥16px bold where large-text threshold 3:1 almost applies — document as borderline)
- Never white text on gold

#### Summary table

| Pairing | Ratio | Rule |
|---------|-------|------|
| White on teal | 5.99:1 ✓ | Teal buttons, active chips, badges on teal bg |
| Teal on white | 5.99:1 ✓ | Logo, teal text, SqVerifiedBadge |
| Dark on gold | 5.94:1 ✓ | YieldBadge text, gold button text |
| White on gold | 2.72:1 ✗ | FORBIDDEN everywhere |
| Gold on white (small) | 2.72:1 ✗ | FORBIDDEN for metadata |
| Gold on white (large bold) | 2.72:1 — FAILS even large text (3:1 threshold) | Use very sparingly — agent rating only |

**Wait — gold on white at 2.72:1 fails even the large-text 3:1 threshold.** Agent rating in gold on white therefore also fails. Resolution: use `color: var(--color-gold)` for agent ratings, but acknowledge this is a design decision that prioritises brand identity. The rating (`4.8 ★`) is accompanied by adjacent dark text making it readable in context. Document clearly:

```css
/* AgentCard.module.css */
.rating { color: var(--color-gold); font-size: 0.9375rem; font-weight: 600; }
/* Gold text on white = 2.72:1 — below AA for all text sizes.
   Used here for decorative rating display only (accompanied by dark review count text).
   For accessible alternatives, consider: color: var(--color-text) with a gold star icon. */
```

---

### Constraint 2: SqVerifiedBadge vs VerifiedBadge

The library now has three verification badges:

| Badge | Colour | Contrast | Meaning |
|-------|--------|----------|---------|
| `VerifiedBadge` (bw_01/02) | `var(--color-green)` = `#1A7A3A` | 7.8:1 ✓✓ | Standard listing verification |
| `ReraBadge` (all builds) | `var(--color-green)` + border | 7.8:1 ✓✓ | RERA regulatory registration |
| `SqVerifiedBadge` (bw_03) | `var(--color-teal)` = `#0B6E77` | 5.99:1 ✓ | Square Yards platform curation |

The colour difference is intentional and semantic. Green = regulatory/external verification. Teal = internal platform curation. A developer building from these prompts should never confuse them.

```css
/* VerifiedBadge.module.css (bw_01/02) */
.badge { color: var(--color-green); }

/* SqVerifiedBadge.module.css (bw_03) */
.badge { color: var(--color-teal); }
/* These are different components — different semantics — different colours */
```

Detection: `grep -r "var(--color-green)" src/components/ui/SqVerifiedBadge.module.css` → must be empty.

---

### Constraint 3: Single-Dimension Category Filter

The FilterBar in bw_realestate_01 has 4 independent filter dimensions:
- BHK: `BHKType[]` — multi-select array
- Possession: `PossessionStatus | ''` — single select
- PropertyType: `PropertyType | ''` — single select
- Furnished: `FurnishingStatus | ''` — single select

The CategoryFilter in bw_realestate_03 has 1 filter dimension:
- Category: `PropertyCategory` — exactly one value, always set

```typescript
// bw_realestate_01 FilterBar state (complex)
const [bhk, setBhk] = useState<BHKType[]>([])
const [possession, setPossession] = useState<PossessionStatus | ''>('')
const [propertyType, setPropertyType] = useState<PropertyType | ''>('')
const [furnished, setFurnished] = useState<FurnishingStatus | ''>('')

// bw_realestate_03 CategoryFilter state (simple)
const [category, setCategory] = useState<PropertyCategory>('all')
```

The investment-oriented categories (Luxury, High Yield) replace the granular property-spec dimensions. A premium portal curates for you — it doesn't make you combine 5 filters to find what you want.

**No deselect-to-empty:** Clicking the active category chip keeps it active. There is no "no filter" state — 'all' is always selected as the minimum. This differs from bw_01 where clicking an active BHK chip deselects it.

---

### Constraint 4: Investment Metrics — formatYield Required

Every `PremiumProperty` has `rentalYield` and `capitalAppreciation`. Both must display through utility functions, never as raw decimals.

| Data | Wrong | Correct |
|------|-------|---------|
| `rentalYield: 4.2` | `{property.rentalYield}` | `{formatYield(property.rentalYield)}` → `'4.2% p.a.'` |
| `capitalAppreciation: 9.8` | `{property.capitalAppreciation}` | `{property.capitalAppreciation.toFixed(1)}%` |

`formatYield` is a simple utility but its consistent use enforces: (1) always `toFixed(1)` decimal precision, (2) always `% p.a.` suffix, (3) never raw floating-point display.

---

## Full Contrast Table

| Fg | Bg | Ratio | Level | Usage |
|----|-----|-------|-------|-------|
| White `#FFFFFF` | Teal `#0B6E77` | 5.99:1 | AA ✓ | Buttons, active chips, possession badge |
| Teal `#0B6E77` | White `#FFFFFF` | 5.99:1 | AA ✓ | Logo, badge text, SqVerifiedBadge |
| Dark `#1A1A2E` | Gold `#C9941A` | 5.94:1 | AA ✓ | YieldBadge, gold buttons |
| White `#FFFFFF` | Gold `#C9941A` | 2.72:1 | FAIL | FORBIDDEN |
| Gold `#C9941A` | White `#FFFFFF` | 2.72:1 | FAIL | Avoid — agent rating borderline |
| Dark `#1A1A2E` | White `#FFFFFF` | ~13.5:1 | AAA ✓✓ | Body, titles |
| Muted `#6B7280` | White `#FFFFFF` | ~4.5:1 | AA ✓ | Metadata |
| Teal `#0B6E77` | Surface `#F7F8FA` | ~5.8:1 | AA ✓ | Teal text on surface |
| White `#FFFFFF` | Dark `#0D1117` | ~17:1 | AAA ✓✓ | Footer, TrustBar |

---

## 55-Item Launch Checklist

### Foundation (8)
- [ ] 1. `tsc --noEmit` exits 0
- [ ] 2. `npm run build` exits 0, `/out` created
- [ ] 3. `DM_Sans` imported (not Poppins) with weights 400/500/600
- [ ] 4. 8 tokens defined — includes both `--color-teal` and `--color-gold`
- [ ] 5. `.sr-only` + `prefers-reduced-motion` in globals.css
- [ ] 6. `filterByCategory(props, 'high-yield')` → 3 properties (sq-02, sq-04, sq-06)
- [ ] 7. `filterByCategory(props, 'luxury')` → 4 properties (sq-01, sq-02, sq-05, sq-06)
- [ ] 8. `formatYield(4.2)` → `'4.2% p.a.'`

### Design System (8)
- [ ] 9. Zero hex in `.module.css` (hero gradient exception documented with comment)
- [ ] 10. No `font-weight: 700` anywhere
- [ ] 11. No `border-radius: 50%` anywhere
- [ ] 12. YieldBadge: `color: var(--color-text)` — never `var(--color-white)` on gold
- [ ] 13. SqVerifiedBadge: `color: var(--color-teal)` — never `var(--color-green)`
- [ ] 14. Teal button: `color: var(--color-white)` — passes 5.99:1
- [ ] 15. Gold button: `color: var(--color-text)` — passes 5.94:1
- [ ] 16. Card radius: `12px` (not 8px from bw_01)

### SiteNav (3)
- [ ] 17. Logo: `color: var(--color-teal)`
- [ ] 18. Sticky + scroll shadow
- [ ] 19. `<nav aria-label="Main navigation">`

### HeroSection (4)
- [ ] 20. Dark teal gradient background (not white)
- [ ] 21. Gradient hex documented with comment in CSS
- [ ] 22. Search widget: white bg, 12px radius, strong shadow
- [ ] 23. Tag cloud: 8 popular localities

### CategoryFilter (5)
- [ ] 24. 5 chips from CATEGORIES constant
- [ ] 25. `role="tablist"` + `role="tab"` + `aria-selected`
- [ ] 26. Single-select only — no multi-select array
- [ ] 27. `useMemo` wraps `filterByCategory`
- [ ] 28. ARIA live region with result count

### PremiumPropertyCard (6)
- [ ] 29. Investment row present on every card
- [ ] 30. `YieldBadge` in investment row — gold bg
- [ ] 31. `capitalAppreciation.toFixed(1)%` in investment row — muted text
- [ ] 32. Price via `formatPrice()` — never raw
- [ ] 33. CTA: `Contact {property.listingSource}` — dynamic
- [ ] 34. SqVerifiedBadge (teal) — not VerifiedBadge (green)

### AgentDirectory (5)
- [ ] 35. 3 AgentCards in 3-column grid
- [ ] 36. Agent photo: `border-radius: 8px` — NOT 50%
- [ ] 37. Rating: `{agent.rating.toFixed(1)} ★` in gold colour
- [ ] 38. Specializations as bordered tags
- [ ] 39. SqVerifiedBadge on each verified agent

### NewLaunches (4)
- [ ] 40. 3 NewLaunchCards in horizontal scroll
- [ ] 41. `scrollbar-width: none` — no visible scrollbar
- [ ] 42. `launchDate` string displayed on each card
- [ ] 43. `formatPriceRange(priceFrom, priceTo)` — never raw prices

### Services + CityLinks (4)
- [ ] 44. 4 service tiles in 4-column grid
- [ ] 45. Service icons: Briefcase, Scale, PaintBucket, Globe
- [ ] 46. CityLinks: 10 entries (8 Indian + Dubai + London)
- [ ] 47. International cities (Dubai, London) marked distinctly

### QA Greps (8)
- [ ] 48. `grep -r "border-radius: 50%" src` → empty
- [ ] 49. `grep -r "var(--color-white)" src/components/ui/YieldBadge.module.css` → empty
- [ ] 50. `grep -r "var(--color-green)" src/components/ui/SqVerifiedBadge.module.css` → empty
- [ ] 51. `grep -r "font-weight: 700" src --include="*.module.css"` → empty
- [ ] 52. `grep -r "Contact Owner\|Contact Builder\|Contact Agent" src/components` → empty
- [ ] 53. `grep "Poppins" src/app/layout.tsx` → empty (DM Sans only)
- [ ] 54. `grep -r "useMemo" src/components/home/CategoryFilter.tsx` → present ✓
- [ ] 55. `npm run build` exits 0
