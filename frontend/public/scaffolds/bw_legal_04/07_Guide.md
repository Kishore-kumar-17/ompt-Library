# 07 — Guide
## Productized Indian Legal Services · bw_legal_platform_04

---

## The Three Constraints — Why They Exist

### Constraint 1: White background throughout

Vakilsearch is a consumer product that sells legal services like software subscriptions. A white background communicates clarity, openness, and e-commerce familiarity — the same signals that make Amazon and Flipkart feel approachable. Dark backgrounds (bw_legal_03's territory) work for security-first fintech. Light backgrounds work for service marketplaces.

Section alternation: white sections → `#F5FAFF` tint sections → white → navy footer. Never a dark `#151515` band.

**If you add a dark section** — ask yourself: is this visual interest, or is it brand-correct? The answer is always brand-correct: use white or `#F5FAFF`.

---

### Constraint 2: 6px button radius — positioned between SaaS and e-commerce

| Value | Signal | Example |
|-------|---------|---------|
| 0px | Institutional authority | CAM law firm |
| 4px | Precise SaaS product | ClearTax |
| 6px | Consumer product, approachable | **This build** |
| 10px | Friendly e-commerce | Cards only |
| 9999px | Traditional / approachable brand | AZB, CAM buttons |

`6px` is deliberately between ClearTax's `4px` (SaaS precision) and e-commerce roundness. It says "modern product company" while remaining warmer than pure SaaS. Cards use `10px` — slightly more approachable than buttons.

---

### Constraint 3: Prices shown with strike-through originals

Vakilsearch pioneered e-commerce pricing psychology in Indian legal services. The strike-through pattern triggers loss aversion ("I'm saving ₹500") and removes the fear of surprise invoices.

Every `ProductCard` must show:
1. `<del>₹1,499</del>` — semantic struck-through original (screen readers announce "deleted")
2. `₹999` — large, bold discounted price
3. `-33% Off` — yellow badge reinforcing the saving
4. `+ Govt. Fee (varies)` — fine print honesty (fee transparency builds trust)

**"Contact for pricing" is not just forbidden — it is a brand violation.** Vakilsearch's entire differentiation vs traditional CA firms is that pricing is visible upfront.

---

## Yellow-on-Navy Contrast — The One Critical Rule

`#FFD000` (yellow) on `#022B50` (navy) = **11.2:1 contrast ratio** — AAA compliant.

`#FFD000` (yellow) on `#FFFFFF` (white) = **1.07:1 contrast ratio** — catastrophic failure.

**This means:**
- Yellow buttons MUST have navy text: `color: var(--color-navy)` ✓
- Yellow badges MUST have navy text ✓
- Yellow tab indicator (3px border) — decorative line, no text contrast issue ✓
- Yellow text on white backgrounds: NEVER ✗

**If you write yellow text on a white section** — it's invisible. Fix immediately.

The footer uses yellow for link hover on the navy background — this works (11.2:1). Do not copy this yellow hover to white-background sections.

---

## ServiceTabs — ARIA Pattern

```tsx
// Correct ARIA structure
<div role="tablist" aria-label="Service categories">
  <button
    role="tab"
    aria-selected={active === tab.id}
    aria-controls={`tabpanel-${tab.id}`}
  >
    {tab.label}
  </button>
</div>

<div
  id={`tabpanel-${tab.id}`}
  role="tabpanel"
  aria-label={`${activeTabLabel} services`}
>
  {/* ProductCards */}
</div>
```

Keyboard navigation: `ServiceTabs` buttons respond to keyboard natively (they're `<button>` elements). Tab key moves focus. Enter/Space activates. Accessible without additional JS.

**ServiceTabs is the only `'use client'` component in the project.** Every other component is a server component. If you find yourself adding `'use client'` to `ProductCard` or `TrustSignals`, stop — there's no interactivity in those components.

---

## ProductCard — "Most Popular" Ribbon Positioning

The ribbon sits ABOVE the card's top edge, using `position: absolute`:

```css
.card {
  position: relative;    /* establishes stacking context */
}

.popularRibbon {
  position: absolute;
  top: -1px;            /* kisses the card border */
  right: 16px;
  background: var(--color-yellow);
  color: var(--color-navy);
  border-radius: 0 0 6px 6px;   /* rounds the bottom corners only */
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 700;
}
```

The `border-radius: 0 0 6px 6px` makes it look like the ribbon drapes down from the card's top edge.

**If the ribbon is inside the card** — it takes up space and breaks the feature list alignment across the 3 cards in the grid. The absolute positioning is intentional.

---

## Strike-Through Price — `<del>` Tag

```tsx
// CORRECT — semantic HTML, accessible
<del className={styles.originalPrice}>
  ₹{product.originalPrice.toLocaleString('en-IN')}
</del>

// WRONG — CSS only, not announced by screen readers
<span style={{ textDecoration: 'line-through' }}>
  ₹{product.originalPrice}
</span>
```

Screen readers announce `<del>` content as "deleted" or "strikethrough", giving context that this was the old price. This is important for accessibility — a user listening to the page should understand the price structure.

Also add `text-decoration: line-through` in CSS as a visual reinforcement (belt and suspenders).

---

## HowItWorks — Yellow Connector, Not Blue

ClearTax (bw_legal_03) uses a blue connector: `rgba(22, 120, 251, 0.3)`.

This build uses a **yellow connector**: `var(--color-yellow)`.

This is not arbitrary. Yellow is the brand accent. The connector should match the brand energy (action, discount, highlight) rather than blending into a near-invisible tint.

```css
/* Correct for bw_legal_04 */
.connector {
  height: 2px;
  background: var(--color-yellow);
  width: 48px;
}

/* Wrong — copied from bw_legal_03 */
.connector {
  height: 1px;
  background: rgba(22, 120, 251, 0.3);
}
```

---

## Footer — Yellow Hover on Navy

Footer links hover to `var(--color-yellow)` (not white):

```css
.linkList a:hover {
  color: var(--color-yellow);   /* CORRECT — brand accent on dark bg */
}

/* WRONG for this build */
.linkList a:hover {
  color: var(--color-white);    /* generic, not brand-specific */
}
```

Yellow on navy = 11.2:1 (AAA). White on navy is also accessible but generic. Yellow reinforces the brand's accent colour throughout the interaction experience.

---

## 10 Most Common Mistakes

1. **Adding `border-radius: 4px` to buttons** — copying from bw_legal_03 (ClearTax). Change to `6px`. Run the grep check.

2. **Yellow text on white sections** — catastrophic contrast failure (1.07:1). Yellow only on navy backgrounds, or as backgrounds (with navy text).

3. **White text on yellow buttons** — similar failure. Yellow buttons (`variant="yellow"`) always use `color: var(--color-navy)`.

4. **Showing only one rating (Google or Trustpilot)** — both are required. One-source trust is weaker; Vakilsearch's differentiator is multi-source social proof.

5. **"Contact for pricing" on any service** — brand violation. All 12 products need visible pricing with strike-through.

6. **Adding `'use client'` to ProductCard** — there is no interactivity in ProductCard. Tab state lives only in ServiceTabs.

7. **Blue connector lines in HowItWorks** — copied from bw_legal_03. The connector here is yellow (`var(--color-yellow)`).

8. **White hover on footer links** — generic pattern. This build uses yellow hover on the navy footer.

9. **Dark section backgrounds** — any section with a dark (`#022B50` or darker) background (other than the footer) is a mistake. Sections are white or `#F5FAFF`.

10. **Forgetting `govtFee` fine print** — displaying only the discounted price without the "+ Govt. Fee" fine print creates false expectations. Show fine print below the price.

---

## Launch Checklist

### Foundation
- [ ] `tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
- [ ] `/out` directory produced (static export)

### CSS Token Audit
- [ ] Exactly 8 `--color-*` tokens in `globals.css`
- [ ] `grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"` returns empty
- [ ] `grep -r "rgba(" src --include="*.module.css"` returns empty

### Radius Audit
- [ ] Every button: `border-radius: 6px` in DevTools (not 4px, not 9999px)
- [ ] Nav "Get Started" CTA: `border-radius: 6px`
- [ ] Every card: `border-radius: 10px` in DevTools
- [ ] "Most Popular" ribbon: `border-radius: 0 0 6px 6px`
- [ ] `grep -r "9999px" src` returns empty
- [ ] `grep -r "border-radius: 4px" src/components` returns empty

### Background Audit
- [ ] Every section: white or `#F5FAFF` — no dark backgrounds
- [ ] Footer only: `var(--color-navy)`
- [ ] TrustSignals: `var(--color-surface)` (`#F5FAFF`) — confirmed different from white sections

### Navigation
- [ ] Nav always white (scroll to bottom and back — stays white)
- [ ] No `'use client'` in `StickyNav.tsx`
- [ ] "Get Started": yellow bg, navy text, 6px radius, height 40px

### Hero
- [ ] Both Google AND Trustpilot rating badges present
- [ ] ISO 27001 badge visible in ratings row
- [ ] Money-back guarantee text in hero
- [ ] "Register My Business" (primary) AND "Talk to an Expert" (secondary) both present
- [ ] Split layout on desktop (55/45), stacked on mobile
- [ ] Right visual panel hidden on mobile (≤900px)
- [ ] H1: Roboto 700, navy color

### Service Catalog
- [ ] All 4 tabs clickable and filter correctly (manually test each)
- [ ] All 12 products have `<del>` original price in DOM
- [ ] All 12 products have discounted price displayed
- [ ] All 12 products have yellow discount badge
- [ ] All 12 products have `+ Govt. Fee` fine print
- [ ] `popular: true` products show "Most Popular" ribbon at absolute position
- [ ] Feature items use Lucide `Check` icon (not text "✓")
- [ ] `ServiceTabs.tsx` is only `'use client'` component
- [ ] `ProductCard.tsx` has no `'use client'`

### TrustSignals
- [ ] 4 blocks: ISO, Guarantee, Google, Businesses
- [ ] Background is `#F5FAFF` (not white)
- [ ] Lucide icons in navy, inside white rounded icon box

### HowItWorks
- [ ] 3 steps with correct titles
- [ ] Connector color is YELLOW (`var(--color-yellow)`) — not blue
- [ ] Connectors hidden on mobile (≤768px)
- [ ] Navy circles 40×40px

### Testimonials
- [ ] 3 cards visible
- [ ] Star ratings on each card
- [ ] White bg, 10px radius, shadow

### Footer
- [ ] Navy `#022B50` background
- [ ] 4 columns on desktop
- [ ] Links hover to YELLOW (not white)
- [ ] Cert badges at 50% opacity
- [ ] Copyright with current year

### Performance
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility ≥90
- [ ] All WCAG AA contrast passes (especially: no yellow text on white)
- [ ] `prefers-reduced-motion` disables all animations
- [ ] No serif font anywhere (DevTools check)
