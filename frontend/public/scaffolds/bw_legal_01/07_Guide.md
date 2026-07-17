# 07 — Developer Guide
## Premier Indian Law Firm · bw_legal_platform_01

The most important fact for this build: **this is an authority site, not a sales site.** Every CSS decision — the sharp card corners, the grayscale-until-hover portraits, the restrained gold accent — signals institutional gravity. Any deviation toward "friendly" or "modern startup" aesthetics undermines the brief.

---

## 1. The Three Non-Negotiable Constraints

### Constraint 1: Gold is decorative, never communicative

Gold `#d0a56d` on white background = 2.7:1 contrast ratio. This fails WCAG AA for normal text (requires 4.5:1). Therefore:

```css
/* WRONG — gold as text fails WCAG AA */
.sectionTitle { color: var(--color-gold); }
.link:hover { color: var(--color-gold); }  /* Only exception: footer links */

/* CORRECT — gold as border/decoration */
.goldRule { background: var(--color-gold); height: 2px; width: 80px; }
.corner::before { border-top: 2px solid var(--color-gold); border-left: 2px solid var(--color-gold); }
```

The one exception: footer link hover state uses gold on the dark background `#3d0e35` (gold on `#3d0e35` = approximately 4.6:1 — passes AA).

### Constraint 2: Pill buttons, sharp cards — always

```css
/* CORRECT */
.button { border-radius: 9999px; }
.card { border-radius: 0; }

/* WRONG — any deviation */
.button { border-radius: 8px; }   /* Too square for this brand */
.card { border-radius: 4px; }     /* Law firm cards must be sharp */
```

The pill shape is the one "soft" element in an otherwise geometric, sharp design system. This contrast is intentional: it signals that while the firm is rigorous and precise (sharp cards, serif type, dark authority colors), they remain approachable to clients (soft pill CTAs).

### Constraint 3: Grayscale-until-hover is CSS only — no JavaScript

```css
/* CORRECT — pure CSS */
.photo { filter: grayscale(1); transition: filter 400ms ease; }
.photoWrapper:hover .photo { filter: grayscale(0); }

/* WRONG — unnecessary JS */
const [hovered, setHovered] = useState(false)
<img style={{ filter: hovered ? 'none' : 'grayscale(1)' }} onMouseEnter={() => setHovered(true)} />
```

The grayscale effect communicates restraint. A lawyer's authority comes from their title and bio, not their photo color. Restoring color on hover rewards curiosity without making the default state promotional.

---

## 2. The GoldCorner Pattern

The gold L-bracket corner decoration is the brand's prestige signature. It appears on every major section heading but nowhere else.

```tsx
// CORRECT usage
<GoldCorner>
  <h2 className={styles.sectionTitle}>Our Practice Areas</h2>
</GoldCorner>

// WRONG — applying to cards
<GoldCorner>
  <div className={styles.card}>...</div>
</GoldCorner>

// WRONG — applying to nav items
<GoldCorner>
  <a href="/practice-areas">Practice Areas</a>
</GoldCorner>
```

The CSS implementation:
```css
.wrapper {
  position: relative;
  padding-top: 20px;
  padding-left: 20px;
}
.wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  border-top: 2px solid var(--color-gold);
  border-left: 2px solid var(--color-gold);
}
```

The `padding-top: 20px; padding-left: 20px` is critical — without it, the 24px corner bracket overlaps the heading text.

---

## 3. Scroll-Triggered Nav — The Timing

The scroll threshold (200px) is calibrated so the nav transitions after the hero's above-fold content, not while the user is still reading it.

```typescript
// CORRECT threshold
const handler = () => setScrolled(window.scrollY > 200)

// WRONG — too early, nav flickers on hero
const handler = () => setScrolled(window.scrollY > 0)

// WRONG — too late, purple only appears halfway down
const handler = () => setScrolled(window.scrollY > 600)
```

The `backdrop-filter: blur(8px)` on the scrolled state is a luxury detail — it makes the nav feel premium even when over text. If performance is a concern (mobile), remove it.

---

## 4. Stat Counter — IntersectionObserver Lifecycle

The counter must fire exactly once — not every time the user scrolls past the StatsStrip.

```typescript
// CORRECT — fires once, disconnects
const started = useRef(false)
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting && !started.current) {
    started.current = true
    // animate...
    observer.disconnect()  // Disconnects after firing
  }
})

// WRONG — fires every time element enters viewport
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    // animate every time — annoying on scroll-back
  }
})
```

For `prefers-reduced-motion` users, skip the animation entirely:
```typescript
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReduced) {
  setCount(value)  // Jump to final value immediately
  return
}
// else animate
```

---

## 5. Font Assignment Rules

Two fonts. One rule for each:

| Font | Used on | Never on |
|------|---------|----------|
| Playfair Display (`--font-display`) | H1, H2, H3, card headings, stat numbers, insight titles, pull quotes | Body paragraphs, nav links, button labels, captions, dates |
| Roboto (`--font-body`) | All body text, nav links, button labels, captions, dates, labels | Any heading or title element |

```css
/* CORRECT */
h1, h2, h3 { font-family: var(--font-display); }
p, a, button, label, span { font-family: var(--font-body); }

/* WRONG */
h1 { font-family: var(--font-body); }           /* Loses authority */
p { font-family: var(--font-display); }          /* Unreadable at length */
```

---

## 6. Common Mistakes

### Mistake 1: Using gold as text color

```css
/* WRONG — 2.7:1 contrast fails AA */
.heading { color: var(--color-gold); }

/* CORRECT */
.heading { color: var(--color-text); }  /* And wrap in GoldCorner for decoration */
```

### Mistake 2: Rounded card corners

```css
/* WRONG */
.card { border-radius: 8px; }

/* CORRECT */
.card { border-radius: 0; }
```

### Mistake 3: Square or rounded-md buttons

```css
/* WRONG */
.button { border-radius: 8px; }
.button { border-radius: 4px; }

/* CORRECT */
.button { border-radius: 9999px; }
```

### Mistake 4: Color photos by default for leaders

```css
/* WRONG */
.photo { /* no filter */ }

/* CORRECT */
.photo { filter: grayscale(1); transition: filter 400ms ease; }
.photoWrapper:hover .photo { filter: grayscale(0); }
```

### Mistake 5: Adding star ratings to insights or testimonials

```tsx
/* WRONG */
<div className="stars">★★★★★</div>
<p>"Exceptional service" — Client Name</p>

/* CORRECT */
<blockquote>
  <p>"The team's advice on the CCI filing was decisive in clearing the transaction."</p>
  <cite>CFO, Fortune 500 Company</cite>
</blockquote>
```

### Mistake 6: Applying purple via hex in CSS modules

```css
/* WRONG */
.button { background: #621755; }

/* CORRECT */
.button { background: var(--color-brand); }
```

### Mistake 7: Using sans-serif for H1

```css
/* WRONG — loses institutional authority */
h1 { font-family: var(--font-body); }

/* CORRECT */
h1 { font-family: var(--font-display); }
```

### Mistake 8: Using `color: var(--color-dark)` for footer background

```css
/* Technically works but causes confusion */
.footer { background: var(--color-dark); }  /* OK — #3d0e35 */

/* Don't confuse dark with brand */
.footer { background: var(--color-brand); }  /* WRONG — this is #621755 medium purple */
```

### Mistake 9: Adding a casual chat widget

```tsx
// WRONG — Intercom/Drift widget is inappropriate for a law firm
<script src="//widget.intercom.io/widget/..."></script>

// CORRECT — contact form link only
<a href="/contact">Get in touch →</a>
```

### Mistake 10: Showing pricing

```tsx
// WRONG — never display pricing on a law firm's public site
<div>Partner hourly rate: ₹25,000</div>

// CORRECT — contact CTA only
<PillButton href="/contact">Discuss Your Matter</PillButton>
```

---

## 7. Launch Checklist

- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds
- [ ] No hex values in any `.module.css` file (grep confirms)
- [ ] DevTools: ALL buttons `border-radius: 9999px` — no exceptions
- [ ] DevTools: ALL practice/insight/leader cards `border-radius: 0`
- [ ] DevTools: computed `color` on any element — no `rgb(208, 165, 109)` (gold) as text
- [ ] Nav: transparent at page top; turns `rgba(98,23,85,0.95)` at scroll >200px
- [ ] Nav height: 80px → 64px on scroll
- [ ] Logo text switches white on scroll
- [ ] Hero: full viewport height, gold horizontal rule above H1, Playfair Display confirmed
- [ ] Hero: two CTAs visible — primary (white bg) + ghost (white border)
- [ ] Stats strip: purple background, 4 metrics, gold dividers, count-up animation fires
- [ ] Count-up fires only once (not on every re-entry into viewport)
- [ ] Practice cards: `border-radius: 0` confirmed; hover left-border purple
- [ ] GoldCorner L-bracket visible on 3 section headings (Practice, Leadership, Insights)
- [ ] Leadership photos: grayscale at rest, color on hover
- [ ] Insights: category pills are pill-shaped (`border-radius: 9999px`)
- [ ] Footer: dark purple `#3d0e35`, gold top border `2px`, all 9 offices listed
- [ ] Footer links: gold on hover
- [ ] No star ratings anywhere
- [ ] No pricing anywhere
- [ ] No countdown timers anywhere
- [ ] No casual chat widget
- [ ] `prefers-reduced-motion`: no transforms; stat counter jumps to final value
- [ ] Focus ring: gold outline on all interactive elements
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility ≥90
