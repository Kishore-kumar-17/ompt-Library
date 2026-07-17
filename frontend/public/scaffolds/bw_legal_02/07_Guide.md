# 07 — Developer Guide
## Top-Tier Indian Law Firm · bw_legal_platform_02

The most important architectural fact for this build: **the sticky nav tracks which section is visible, not how far the user has scrolled.** Everything else follows from this — the dark/light alternation, the IntersectionObserver pattern, the `data-dark-section` attribute system.

---

## 1. The Section-Aware Nav — How It Works

This nav does NOT use `window.scrollY > N` (that's bw_legal_01's approach). It uses IntersectionObserver to watch dark sections and switches appearance when any of them is substantially visible.

```typescript
// CORRECT — section-based
useEffect(() => {
  const sections = document.querySelectorAll('[data-dark-section]')
  const observer = new IntersectionObserver(
    (entries) => setIsDark(entries.some((e) => e.isIntersecting)),
    { threshold: 0.3 }
  )
  sections.forEach((s) => observer.observe(s))
  return () => observer.disconnect()
}, [])

// WRONG — position-based (loses sync when resizing or fast-scrolling)
useEffect(() => {
  const handler = () => setIsDark(window.scrollY > 600)
  window.addEventListener('scroll', handler)
  return () => window.removeEventListener('scroll', handler)
}, [])
```

**Why `threshold: 0.3`?** At 30% visibility, the dark section is clearly the dominant context. Lower (0.1) causes flickering as the nav tries to decide which section is "active" during the transition. Higher (0.5) means the nav switches too late, leaving a light nav over a dark section for too long.

**The `data-dark-section` contract:** Every section with `background: var(--color-navy)` must carry this attribute. If you forget it on the practice areas section, the nav stays white over a dark background — a visible accessibility failure (light text, light nav).

```tsx
// CORRECT
<section className={styles.practiceSection} data-dark-section>

// WRONG — nav won't switch
<section className={styles.practiceSection}>
```

---

## 2. Hero Tabs — ARIA Pattern

The tabbed hero must implement the full ARIA tab pattern. This is more complex than a simple `useState` toggle.

```tsx
// Correct ARIA structure
<div role="tablist" aria-label="Firm pillars">
  <button
    role="tab"
    id="tab-energy"
    aria-selected={activeId === 'energy'}
    aria-controls="panel-energy"
  >
    Energy
  </button>
  {/* ... other tabs */}
</div>

<div
  role="tabpanel"
  id="panel-energy"
  aria-labelledby="tab-energy"
>
  {/* tab content */}
</div>

// Wrong — just state, no ARIA
<button onClick={() => setActive('energy')}>Energy</button>
<div>{activeId === 'energy' && <Content />}</div>
```

**Keyboard navigation:** Left/right arrow keys must cycle through tabs. The browser does NOT do this automatically for `role="tab"` elements — you must implement `onKeyDown`.

```typescript
const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
  if (e.key === 'ArrowRight') setActiveId(heroTabs[(idx + 1) % heroTabs.length].id)
  if (e.key === 'ArrowLeft')  setActiveId(heroTabs[(idx - 1 + heroTabs.length) % heroTabs.length].id)
}
```

**Hero H1 is terracotta, not white.** This is the most distinctive visual choice in the hero. Check it explicitly.

```css
/* CORRECT */
.headline { color: var(--color-terracotta); }

/* WRONG — looks like every other law firm site */
.headline { color: #fff; }
```

---

## 3. Two Radius Values — When to Use Each

This build has exactly two radius values. They must not be swapped.

| Element type | Border-radius | CSS value |
|---|---|---|
| All buttons (PillButton) | Pill | `border-radius: 9999px` |
| Filter inputs + selects | Pill (match button aesthetic) | `border-radius: 9999px` |
| Insight category tags | Pill | `border-radius: 9999px` |
| All content cards (practice, people, insight) | Slightly rounded | `border-radius: 10px` |
| People photos | Slightly rounded | `border-radius: 4px` |

```css
/* WRONG — swapped */
.card { border-radius: 9999px; }
.button { border-radius: 10px; }

/* WRONG — CAM's pattern applied here */
.card { border-radius: 0; }
```

---

## 4. Ghost Cards on Dark Background

Practice area cards use a semi-transparent background technique — not a white card on dark, and not a dark card on dark.

```css
/* CORRECT — ghost card */
.card {
  background: rgba(255, 255, 255, 0.04);   /* Almost invisible at rest */
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.card:hover {
  background: rgba(255, 255, 255, 0.08);   /* Slightly more visible */
  border-color: rgba(181, 117, 96, 0.4);   /* Terracotta tint on border */
}

/* WRONG — white card on dark (too stark) */
.card { background: #fff; }

/* WRONG — fully transparent (invisible card boundary) */
.card { background: transparent; border: none; }
```

The `rgba(181, 117, 96, 0.4)` in hover border-color is terracotta at 40% — this is the one place where terracotta appears at a smaller visual footprint. It's a border, not text, so contrast requirements don't apply.

---

## 5. Terracotta Contrast Constraint

`#B57560` on white = 2.8:1. This fails WCAG AA for normal text (4.5:1) and large text (3:1).

```
Use terracotta on text ONLY when:
  1. The text is ≥18px (large text threshold)
  2. OR the element is decorative (dot, border, rule)
  3. OR the text is on dark navy (#002346): #B57560 on #002346 = 4.6:1 ✓
```

```css
/* CORRECT — terracotta on large heading */
.sectionTitle { color: var(--color-terracotta); font-size: 2.5rem; }

/* CORRECT — terracotta on dark bg (hero headline) */
.heroHeadline { color: var(--color-terracotta); }  /* On var(--color-navy) */

/* CORRECT — terracotta on person role (uppercase label) */
.personRole { color: var(--color-terracotta); font-size: 0.8rem; text-transform: uppercase; }
/* 0.8rem uppercase = ~equivalent to 18px in visual weight — acceptable */

/* WRONG — terracotta on 14px body text */
.bodyText { color: var(--color-terracotta); font-size: 0.875rem; }
```

---

## 6. People Filter — Common Issues

```typescript
// CORRECT — useMemo prevents recompute on every render
const filtered = useMemo(() =>
  people.filter((p) =>
    p.name.toLowerCase().includes(nameQuery.toLowerCase()) &&
    (officeFilter === 'all' || p.office === officeFilter) &&
    (practiceFilter === 'all' || p.practice === practiceFilter)
  ),
  [nameQuery, officeFilter, practiceFilter]
)

// WRONG — recomputes on every render (even unrelated state changes)
const filtered = people.filter(...)  // without useMemo
```

**ARIA live region for filter results:**
```tsx
// Must update when filtered.length changes
<p
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  Showing {filtered.length} of {people.length} people
</p>
```

This is essential for screen reader users operating the filter. Without it, they type in the search input but receive no feedback about whether results changed.

---

## 7. Common Mistakes

### Mistake 1: Using scroll position for nav dark state

```typescript
// WRONG
const handler = () => setIsDark(window.scrollY > 200)

// CORRECT
const observer = new IntersectionObserver(
  (entries) => setIsDark(entries.some(e => e.isIntersecting)),
  { threshold: 0.3 }
)
darkSections.forEach(s => observer.observe(s))
```

### Mistake 2: White hero headline instead of terracotta

```css
/* WRONG */
.headline { color: #fff; }

/* CORRECT */
.headline { color: var(--color-terracotta); }
```

### Mistake 3: Grayscale people photos

```css
/* WRONG — that's bw_legal_01 */
.photo { filter: grayscale(1); }
.photo:hover { filter: grayscale(0); }

/* CORRECT — full color always */
.photo { /* no filter */ }
```

### Mistake 4: Sharp card corners (0px)

```css
/* WRONG — that's bw_legal_01 (CAM) */
.card { border-radius: 0; }

/* CORRECT */
.card { border-radius: 10px; }
```

### Mistake 5: GoldCorner L-bracket decoration

```tsx
/* WRONG — bw_legal_01's signature, not this site */
<GoldCorner><h2>Our Practices</h2></GoldCorner>

/* CORRECT — terracotta dot + label */
<p className={styles.dotLabel}>
  <span className={styles.dot} aria-hidden="true" />
  Our Expertise
</p>
<h2 className={styles.sectionTitle}>Practice Areas</h2>
```

### Mistake 6: Serif font in any heading

```css
/* WRONG — Playfair would be bw_legal_01's style */
.headline { font-family: 'Playfair Display', serif; }

/* CORRECT — DM Sans only */
.headline { font-family: var(--font-sans); }
```

### Mistake 7: Blue category tags on people cards

```tsx
/* WRONG — blue tags are for insights, not people */
<span style={{ background: '#00539B' }}>{person.role}</span>

/* CORRECT — person role in terracotta */
<p className={styles.role}>{person.role}</p>  /* styled terracotta via CSS */
```

### Mistake 8: Missing `data-dark-section` on practice areas

```tsx
/* WRONG — nav stays light over dark section */
<section className={styles.practiceSection}>

/* CORRECT */
<section className={styles.practiceSection} data-dark-section>
```

### Mistake 9: CTA in hero as PillButton instead of arrow text link

```tsx
/* WRONG — pill button in hero looks out of place */
<PillButton variant="ghost" href={tab.ctaHref}>{tab.ctaLabel}</PillButton>

/* CORRECT — inline arrow text link */
<a href={tab.ctaHref} className={styles.cta}>{tab.ctaLabel}</a>
/* Styled: white text, border-bottom, → suffix */
```

### Mistake 10: Terracotta as insight category tag color

```tsx
/* WRONG — category tags use blue */
<span style={{ background: '#B57560' }}>{insight.category}</span>

/* CORRECT */
<span className={styles.categoryPill}>{insight.category}</span>
/* CSS: background: var(--color-blue) → #00539B */
```

---

## 8. Launch Checklist

- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds
- [ ] No hex in CSS Module files
- [ ] DevTools: ALL buttons `border-radius: 9999px`
- [ ] DevTools: ALL content cards `border-radius: 10px`
- [ ] DevTools: no serif font in computed styles on any element
- [ ] DevTools: no `filter: grayscale` on people photos
- [ ] Nav: white over credentials strip, white over insights, white over people section
- [ ] Nav: dark over hero, dark over practice areas section
- [ ] Nav transition: smooth `400ms ease` — no flicker
- [ ] `data-dark-section` present on hero and practice areas section root elements
- [ ] Hero: 4 tabs visible; clicking switches content with fade
- [ ] Hero H1: terracotta color (not white) — confirmed in DevTools
- [ ] Hero CTA: inline arrow text link (not PillButton)
- [ ] Hero tab keyboard: left/right arrows cycle through 4 tabs
- [ ] Hero tab ARIA: tablist, tab, tabpanel, aria-selected, aria-controls, aria-labelledby
- [ ] CredentialsStrip: white bg, terracotta `4px` left-border on each stat
- [ ] CredentialsStrip: "Est. 1997" shows correctly (string, no count-up)
- [ ] Practice area cards: ghost bg on navy, UPPERCASE titles, terracotta arrows
- [ ] Practice area cards: `border-radius: 10px` confirmed
- [ ] Practice area titles: UPPERCASE via CSS, not stored uppercase in data
- [ ] People filter: name search works live
- [ ] People filter: office dropdown works
- [ ] People filter: practice dropdown works
- [ ] People filter: reset clears all three simultaneously
- [ ] ARIA live region announces filtered count
- [ ] People photos: FULL COLOR — no grayscale
- [ ] Quote cards: `border-left: 2px solid var(--color-terracotta)`
- [ ] Insight category pills: BLUE `#00539B` (not terracotta, not grey)
- [ ] Insight category pills: `border-radius: 9999px`
- [ ] "Read more →" links: terracotta
- [ ] Footer: `background: var(--color-navy)`, `border-top: 3px solid var(--color-terracotta)`
- [ ] Footer: 5 offices listed
- [ ] Footer links: terracotta on hover
- [ ] No GoldCorner `::before` L-bracket anywhere in codebase
- [ ] No star ratings, no pricing, no countdown timers
- [ ] Focus ring: `2px solid var(--color-terracotta)` offset `3px`
- [ ] Skip to main content link present
- [ ] `prefers-reduced-motion`: animations disabled; tabs switch instantly
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility ≥90
