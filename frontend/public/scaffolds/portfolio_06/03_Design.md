# 03 — Design System
## Iconic Developer Portfolio · portfolio_platform_06

---

## 1. Design Philosophy

This portfolio earns its iconic status through discipline. Every colour choice, every spacing decision, every interactive state exists for a reason. The teal is used sparingly enough that when you see it, it means something. The dark navy creates a focused reading environment. The monospace labels signal precision.

The two rules that make this portfolio look right:
1. **Teal as signal, never as fill.** When teal appears, the user's eye goes there. One teal thing per component. Never a teal background.
2. **Information hierarchy through opacity.** Active = off-white. Secondary = lightest-slate. Body = slate. Muted = light-slate. Navigation uses opacity transitions (0.6 → 1), not colour changes, for inactive → hover states.

---

## 2. Colour Reference

```
Navy       #0a192f   — the only background. Deep focus environment.
Light navy #112240   — card backgrounds, tab hover. One step lighter.
Lightest   #233554   — borders, dividers, decorative lines.
slate      #8892b0   — body text, secondary content.
L-slate    #a8b2d8   — lighter secondary text.
LL-slate   #ccd6f6   — primary body text, list items.
Off-white  #e6f1ff   — headings, active nav, job titles.
Teal       #64ffda   — the one accent. Use once per component.
```

**Teal usage map:**
| Location | Usage |
|----------|-------|
| Section number prefix ("01.") | text-teal |
| Active nav line | bg-teal (border-t or width fill) |
| Active job tab border-left | border-teal |
| Active job tab text | text-teal |
| ▹ bullets in About skills | text-teal |
| ▹ bullets in job bullets | text-teal |
| "Featured Project" overline | text-teal |
| Social icon hover | hover:text-teal |
| Project title hover | hover:text-teal |
| Project card title hover | hover:text-teal |
| Section heading horizontal line (after:) | bg-lightest-navy (NOT teal) |

---

## 3. Typography

```
Font sans: 'Calibre', 'Inter', 'San Francisco', '-apple-system', system-ui, sans-serif
Font mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace

Size scale (Tailwind):
  text-xs    = 0.75rem  — mono labels, tech tags, date ranges
  text-sm    = 0.875rem — body bullets, card descriptions
  text-base  = 1rem     — general body text
  text-lg    = 1.125rem — section subheadings
  text-xl    = 1.25rem  — header title/role
  text-2xl   = 1.5rem   — featured project titles, section headings
  text-4xl   = 2.25rem  — header name (mobile)
  text-5xl   = 3rem     — header name (desktop)

Font weights:
  font-normal   — body text
  font-medium   — active nav, role title, job title
  font-semibold — section headings, card titles
  font-bold     — header name, featured project titles

Mono font uses:
  - Section number prefix: <span className="font-mono text-teal">01.</span>
  - "Featured Project" overline: font-mono text-xs text-teal tracking-widest
  - Tech stack lists: font-mono text-xs text-slate
  - Job date range: font-mono text-xs text-slate
  - Nav labels: font-mono text-xs uppercase tracking-widest
```

---

## 4. Nav Active State Specification

```css
/* Active nav item */
.nav-item-active {
  /* Line */
  width: 4rem;        /* w-16 */
  background: #e6f1ff; /* bg-off-white */

  /* Text */
  color: #e6f1ff;     /* text-off-white */
  font-weight: 500;   /* font-medium */
}

/* Inactive nav item */
.nav-item-inactive {
  /* Line */
  width: 2rem;        /* w-8 */
  background: #8892b0; /* bg-slate */

  /* Text */
  color: #8892b0;     /* text-slate */
  opacity: 0.6;
}

/* Hover (inactive → hover) */
.nav-item-inactive:hover {
  /* Line grows to w-12, lightens */
  width: 3rem;
  background: #ccd6f6;
  opacity: 1;
  color: #ccd6f6;
}

transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
```

---

## 5. JobTabs Specification

```
Tab list (vertical):
  border on left side: border-lightest-navy (inactive strip)

Each tab button:
  Inactive:
    border-l-2 border-transparent
    text-slate
    hover: text-teal, bg-light-navy/30, border-lightest-navy
    px-5 py-3 font-mono text-sm

  Active:
    border-l-2 border-teal
    text-teal
    bg-light-navy/50
    font-medium

Tab content:
  Title: text-lightest-slate font-medium text-lg
  "@ Company": text-teal (as <a> link to company URL)
  Date range: font-mono text-xs text-slate mt-1 mb-4
  Bullets: flex gap-3
    ▹: text-teal font-mono shrink-0 mt-0.5
    Text: text-lightest-slate text-sm leading-relaxed

Mobile: tabs become horizontal scrollable row at top.
```

---

## 6. FeaturedProject Card Specification

```
Layout: lg:grid lg:grid-cols-12
  Image: lg:col-span-7
  Content: lg:col-span-7 lg:absolute z-10
    Even index: content on RIGHT (text-right on desktop)
    Odd index: content on LEFT (text-left on desktop)

Image treatment:
  mix-blend-multiply filter grayscale opacity-50
  hover: opacity-100 grayscale-0
  transition-all duration-300

Overline: "Featured Project"
  font-mono text-xs text-teal tracking-widest mb-2

Title:
  text-off-white font-bold text-2xl
  hover:text-teal transition-colors

Description box:
  bg-light-navy p-6 lg:p-7
  text-lightest-slate text-sm leading-relaxed
  shadow-xl
  (floats over image on desktop via absolute positioning of content)

Tech list:
  flex flex-wrap gap-4 font-mono text-xs text-slate
  Even: lg:justify-end
  Odd: justify-start

Links:
  text-lightest-slate hover:text-teal transition-colors
  Use text arrows (↗) instead of icon components
```

---

## 7. ProjectCard Specification (Small Grid Cards)

```
Container:
  bg-light-navy
  hover:-translate-y-1 transition-all duration-200
  p-7 flex flex-col
  h-full (for equal height in grid)

Header row:
  flex justify-between items-center mb-8
  Folder icon: text-teal text-3xl (use 📁 emoji or SVG)
  Links: flex gap-4, text-lightest-slate hover:text-teal

Title:
  text-off-white font-semibold text-lg mb-2
  hover:text-teal transition-colors

Description:
  text-slate text-sm leading-relaxed flex-grow

Tech list (bottom):
  flex flex-wrap gap-3 font-mono text-xs text-slate mt-4
```

---

## 8. About Section Specification

```
Skills grid:
  grid grid-cols-2 gap-x-4 gap-y-2 max-w-sm
  Each item: flex items-center gap-2
    ▹: text-teal font-mono text-xs shrink-0
    Skill name: text-lightest-slate text-sm font-mono

Bio paragraphs:
  text-slate leading-relaxed mb-4
  max-w-xl (readable line length)

Section heading:
  "01. About" — see SectionHeading pattern in 02_Architecture.md
  mb-12
```

---

## 9. Section Heading with Decorative Line

The section headings have a horizontal line extending to the right:

```tsx
<h2 className="flex items-center gap-3 text-lightest-slate font-semibold text-2xl mb-12">
  <span className="font-mono text-teal text-lg">01.</span>
  <span>About</span>
  <span className="block h-px flex-grow bg-lightest-navy ml-4 max-w-[300px]" />
</h2>
```

The line caps at `max-w-[300px]` — it grows to fill available space but stops before spanning the whole section width.

---

## 10. Fade-Up Animation Classes

```css
/* Start state — apply when element is not yet in view */
.fade-up-hidden {
  opacity: 0;
  transform: translateY(1.5rem);  /* translate-y-6 */
  transition: opacity 500ms ease, transform 500ms ease;
}

/* End state — apply when element enters view via useInView */
.fade-up-visible {
  opacity: 1;
  transform: translateY(0);
}
```

In Tailwind:
```tsx
className={`transition-all duration-500 ${
  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
}`}
```

Stagger delays for list items: `delay-[100ms]`, `delay-[200ms]` etc.

---

## 11. SocialLinks Specification

```tsx
const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/username', icon: 'GH' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/username', icon: 'LI' },
  { label: 'CodePen', href: 'https://codepen.io/username', icon: 'CP' },
  { label: 'Instagram', href: 'https://instagram.com/username', icon: 'IG' },
]

// Style: flex gap-5
// Each: text-lightest-slate hover:text-teal hover:-translate-y-0.5
//       transition-all duration-200 text-sm font-mono
// Use SVG icons or text abbreviations — no icon library
```

---

## 12. Anti-Patterns

| What | Why forbidden |
|------|--------------|
| White or light-mode sections | The dark navy IS the identity. No light sections. |
| Teal as background | Teal as fill destroys its signal value. Accent only. |
| Timeline for experience | Tab switcher is the designed interaction. Timelines are lists, not interactive. |
| Uniform grid for ALL projects | Featured projects need the alternating full-width treatment. |
| Blue or purple links | All links are lightest-slate → teal hover. One link colour. |
| Icon libraries (Heroicons, Lucide, etc.) | Every icon library is ~30KB. Use SVG inline or text symbols. |
| Progress bars for skills | Binary: either you know it enough to list it, or you don't list it. |
| Percentage gauges for skills | Same as above — fabricated numbers. |
| Floating mobile nav that blocks content | Nav is in left panel on desktop; on mobile, keep it in the document flow. |
| box-shadow on cards | Use `shadow-xl` from Tailwind on description boxes only. Cards lift via `-translate-y-1` only. |
| Gradient text | Single colour headings. Gradients read as decorative, not purposeful. |
| Using `<div>` for tab buttons | Use `<button role="tab">` with `aria-selected`. |
| Forgetting `tabIndex={-1}` on inactive tabs | Keyboard users should Tab to the tablist, then use arrow keys to navigate tabs. |
