# 07 — Guide
## Indian CA / Tax Filing Service · bw_legal_platform_03

---

## The Three Constraints — Why They Exist

### Constraint 1: Dark throughout (`#151515`)

ClearTax's dark theme signals **software product, not consulting firm**. Law firms use white backgrounds to signal stability and tradition. Fintech platforms use dark backgrounds to signal precision, security, and modernity.

Every section must be `var(--color-dark)`. Section separation is achieved exclusively through:
- `border-top: 0.5px solid var(--color-border)` — ultra-thin divider
- Vertical padding (`96px` above and below each section)

**Common mistake:** Using `rgba(255,255,255,0.04)` (the `--color-surface` token) as a section background. This token is only for card interiors — not section backgrounds. At section scale, even 4% white creates an unwanted "stripe" effect.

---

### Constraint 2: 4px button radius — exactly

| Value | Signal | Product |
|-------|---------|---------|
| `0px` | Authoritative, aggressive | CAM law firm |
| `4px` | Product precision, SaaS | ClearTax, this build |
| `8px` | Friendly, e-commerce | Cards only in this build |
| `9999px` | Approachable, traditional | AZB, CAM buttons |

The `4px` radius appears on:
- All `<Button>` components (primary and secondary)
- The "Recommended" badge on the CA Filing tier
- The "File Now" nav CTA
- Nothing else

Cards use `8px`. That is the full radius vocabulary.

**If you find yourself adding `border-radius: 16px` or higher** — stop. That is an e-commerce image wrapper pattern. It does not belong here.

---

### Constraint 3: Consumer trust signals are required

In law firm builds (bw_legal_01, bw_legal_02), star ratings and pricing are explicitly forbidden — they would cheapen a premium positioning.

This build is the opposite. For a first-time tax filer:
- "4.9/5" reduces anxiety about making mistakes
- "₹5,346 Cr+ Refunds" proves the platform delivers outcomes
- "ISO 27001 / SOC 2" proves financial data is safe
- "500+ ICAI-Qualified CAs" answers "but who is actually reviewing my return?"

Removing any of these signals degrades the product for its actual users.

---

## Dark Theme CSS — Token Rules

All colour references in `.module.css` files **must** use `var(--color-*)` tokens. Zero hex values.

**Correct:**
```css
.card {
  background: var(--color-surface);
  border: 0.5px solid var(--color-border);
}
```

**Wrong:**
```css
.card {
  background: rgba(255, 255, 255, 0.04);   /* hardcoded — breaks refactoring */
  border: 0.5px solid rgba(155, 170, 189, 0.3);
}
```

**Enforcement check:**
```bash
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"
grep -r "rgba(" src --include="*.module.css"
```

Both must return zero results.

---

## StickyNav — Why It's a Server Component

bw_legal_02 (AZB) needed `'use client'` because its nav switches between light and dark based on which section is visible (IntersectionObserver).

bw_legal_03 does NOT have that complexity. The nav is always dark. No state, no effects, no observer. This means `StickyNav.tsx` can be a server component — faster TTI, no hydration.

**If you add `'use client'` to StickyNav** — ask yourself: *why*? If the answer is "scroll-triggered transparency", you have introduced the AZB pattern into the ClearTax build. Remove it.

---

## Hero — Dual CTA Architecture

The two CTAs target different personas:

| CTA | Variant | Persona |
|-----|---------|---------|
| "File Yourself" | Primary (blue bg) | Ankit — confident, salaried employee |
| "Get CA Help" | Secondary (outline) | Rahul — SMB owner, wants a CA |

**Both must be present.** A single primary CTA removes the expert path entirely.

**They must be equal in visual weight:**
- Same `height`
- Same `border-radius: 4px`
- Side by side on desktop

The secondary button is NOT a text link. It is a bordered button — same height, same padding, different fill.

---

## Logo Marquee — CSS-Only Implementation

```css
/* TrustStrip.module.css */

.track {
  display: flex;
  width: 200%;                           /* twice the container — fits doubled array */
  animation: marquee 20s linear infinite;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); } /* move exactly one full set leftward */
}

@media (prefers-reduced-motion: reduce) {
  .track { animation: none; }
}
```

The doubled array (`[...trustLogos, ...trustLogos]`) creates 12 logo items. The `.track` is `200%` wide. When it moves `translateX(-50%)`, it has moved exactly one full set of 6 logos — which is visually identical to the start position. This creates the seamless loop.

**Do not use JavaScript for this.** No `setInterval`, no `requestAnimationFrame` on the marquee. CSS `animation` is sufficient, pauses when the tab is hidden, and is handled by `prefers-reduced-motion` automatically.

---

## Stats Count-Up — Three Common Mistakes

### Mistake 1: Forgetting decimal preservation

```typescript
// WRONG — 4.9 becomes "5", 99.9 becomes "100"
setCount(Math.round(eased * value))

// CORRECT — preserves one decimal
setCount(Math.round(eased * value * 10) / 10)
```

### Mistake 2: Animation re-fires on scroll

```typescript
// WRONG — fires every time element enters viewport
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) { startAnimation() }
})

// CORRECT — fires once, then disconnects
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting && !started.current) {
    started.current = true
    startAnimation()
    observer.disconnect()  // <-- critical
  }
})
```

### Mistake 3: `started.current` not a ref

```typescript
// WRONG — useState causes re-render, breaking the animation
const [started, setStarted] = useState(false)

// CORRECT — ref does not cause re-render
const started = useRef(false)
```

---

## ServiceTiers — Recommended Badge Positioning

The "Recommended" badge sits **above** the card, not inside it. This requires a wrapper element:

```tsx
<div className={styles.cardWrapper}>       {/* position: relative; padding-top: 20px */}
  {tier.recommended && (
    <span className={styles.recommendedBadge}>  {/* position: absolute; top: 0 */}
      Recommended
    </span>
  )}
  <div className={styles.card}>
    {/* card content */}
  </div>
</div>
```

The `cardWrapper` has `position: relative` and `padding-top: 20px`. The badge is `position: absolute; top: 0; left: 50%; transform: translateX(-50%)`.

If you put the badge **inside** the card, the padding calculation changes and the 3 cards no longer align at the same vertical position — the recommended card is taller inside.

---

## Feature Checklist — Icon vs Text Character

```tsx
// WRONG — text characters, not scalable, no semantic value
{feature.included ? '✓' : '—'}

// CORRECT — Lucide icons, styled with CSS classes
import { Check, Minus } from 'lucide-react'

{feature.included
  ? <Check className={cn(styles.featureIcon, styles.check)} size={18} />
  : <Minus className={cn(styles.featureIcon, styles.dash)} size={18} />
}
```

CSS:
```css
.featureIcon.check { color: var(--color-blue); }
.featureIcon.dash  { color: var(--color-muted); }
```

The `included: false` items are NOT hidden — they show as grey dashes. This helps users compare tiers by scanning the full column.

---

## Contrast Reference (All on `#151515`)

| Colour | Token | Ratio | Level |
|--------|-------|-------|-------|
| `#EDEFF2` | `--color-text` | 15.8:1 | AAA |
| `#929FB0` | `--color-muted` | 6.1:1 | AA |
| `white on #1678FB` | CTA text | 4.6:1 | AA |
| `#1678FB` on `#151515` | Blue accent text | 5.2:1 | AA |

All body text uses `--color-text` (15.8:1). Secondary labels use `--color-muted` (6.1:1). Both pass WCAG AA at normal text size and AAA for large text.

**`--color-blue-tint` (`rgba(22,120,251,0.08)`) is background only** — never use it as a text colour. At 0.08 opacity it has near-zero contrast against dark.

---

## 10 Most Common Mistakes

1. **Adding a white hero section** — "to make it pop against dark". The hero IS dark. Pop comes from the blue accent and strong typography.

2. **`border-radius: 9999px` on the "File Now" nav button** — copied muscle memory from law firm builds. Change to `4px`.

3. **Colored stats strip** — using a blue or lighter background on `StatsRow` to "make numbers stand out". The numbers stand out via `font-weight: 800` and `clamp(2rem, 4vw, 3rem)`, not background color.

4. **Removing "Get CA Help" CTA** — simplifying to one hero CTA. This eliminates the expert path for Persona 3 (SMB owner). Both CTAs are product-critical.

5. **`counter.started` as `useState` instead of `useRef`** — causes re-render mid-animation, visible as a "flicker" where the count resets.

6. **Logo images in full color** — forgetting `filter: brightness(0) invert(1)`. Full-color Swiggy orange on dark looks like a sponsorship, not a trust signal.

7. **"Recommended" badge inside the card** — the `padding-top: 20px` on `.cardWrapper` creates space for the absolute badge. Without this space, the badge overlaps the tier name.

8. **Marquee with JavaScript** — `setInterval` + `translateX` via JS. Use the CSS `@keyframes marquee` pattern. JS marquees break under `prefers-reduced-motion`.

9. **Card shadows** (`box-shadow: 0 2px 8px rgba(0,0,0,0.08)`) — this is the Bewakoof e-commerce pattern. On dark backgrounds, shadows are invisible. Use `border: 0.5px solid var(--color-border)` instead.

10. **Serif font in any text** — often slips in via browser default styles on `<blockquote>` or `<q>`. Verify with: `document.querySelectorAll('*')` → check computed `font-family` in DevTools.

---

## Launch Checklist

### Foundation
- [ ] `tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 (static export)
- [ ] `/out` directory created, no server required
- [ ] `node --version` ≥ 18

### CSS Tokens
- [ ] Exactly 8 `--color-*` tokens in `globals.css`
- [ ] Zero hex values in any `.module.css` file (`grep` check)
- [ ] Zero `rgba(` literals in any `.module.css` file

### Radius Audit
- [ ] Every interactive button: `border-radius: 4px` (DevTools)
- [ ] Every card: `border-radius: 8px` (DevTools)
- [ ] "Recommended" badge: `border-radius: 4px` (DevTools)
- [ ] Nav "File Now" CTA: `border-radius: 4px`
- [ ] Zero `border-radius: 9999px` anywhere in codebase (`grep`)
- [ ] Zero `border-radius: 16px` or higher anywhere

### Dark Theme
- [ ] Every section background resolves to `rgb(21, 21, 21)` or `rgb(13, 13, 13)` in DevTools
- [ ] No white or near-white section backgrounds
- [ ] `StatsRow` background same dark as rest of page (NOT a colored strip)
- [ ] Footer background: `rgb(13, 13, 13)` (`--color-darker`)

### Navigation
- [ ] Nav is always dark — inspect at top, middle, bottom of page
- [ ] No scroll event listener in `StickyNav.tsx`
- [ ] No `'use client'` in `StickyNav.tsx`
- [ ] Nav height: 64px

### Hero
- [ ] Both "File Yourself" AND "Get CA Help" CTAs present
- [ ] Trust row visible: star + 4.9/5 + 45K+ Reviews + ₹5,346 Cr+ Refunds
- [ ] H1 font-weight: 800 in DevTools
- [ ] H1 font-family: Plus Jakarta Sans (not serif, not system-ui)
- [ ] Hero `min-height: 80vh`

### TrustStrip
- [ ] 6 logos scroll via CSS animation (not JavaScript)
- [ ] Logos appear white/monochrome (filter applied)
- [ ] Animation pauses under `prefers-reduced-motion: reduce`
- [ ] No visible loop seam
- [ ] Cert badges (ISO, SSL, SOC 2) visible below marquee

### ServiceTiers
- [ ] All 3 price labels shown: "Free", "₹999/year", "₹1,999/year"
- [ ] No "Contact for pricing" text anywhere
- [ ] CA Filing card: blue border + blue-tint background
- [ ] "Recommended" badge sits above card top edge (not inside)
- [ ] Feature icons: Lucide `Check` (blue) and `Minus` (muted) — not text characters
- [ ] CA Filing CTA: `variant="primary"` (blue)
- [ ] Self File + Expert Assist CTAs: `variant="secondary"` (outline)
- [ ] No `'use client'` in `ServiceTiers.tsx`

### HowItWorks
- [ ] 3 steps with correct titles
- [ ] Number circles: blue, 40×40px, `border-radius: 50%`
- [ ] Connector line visible on desktop
- [ ] Connector line hidden on mobile (≤768px)

### StatsRow
- [ ] 4 stats animate on scroll entry
- [ ] Stats don't reset on re-scroll (verify `started.current`)
- [ ] "4.9" displays as "4.9" (not "5")
- [ ] "99.9" displays as "99.9" (not "100")
- [ ] Section background is dark — not a colored strip

### ExpertStrip
- [ ] 3 callout blocks with stats (500+, <24hr, 100%)
- [ ] Lucide icons in blue
- [ ] No individual CA photos or names

### Footer
- [ ] 4 columns on desktop
- [ ] Links change to blue on hover
- [ ] Cert badges visible at bottom bar
- [ ] Copyright with current year

### Performance
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility ≥90
- [ ] WCAG AA contrast passes on all text
- [ ] All interactive elements have accessible labels
- [ ] `prefers-reduced-motion` disables all animations
- [ ] No serif font in any rendered text
