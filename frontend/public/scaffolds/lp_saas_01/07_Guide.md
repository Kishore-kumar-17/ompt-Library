# 07 — Guide
## Precision Dark SaaS Landing Page · lp_saas_platform_01

---

### 1. The Four Constraints — Why They Exist

---

#### Constraint 1: Font Weight Max 500 — Not 700

The tone is quiet confidence, not bold assertion. Inter weight 700 is visually loud — it breaks the austere, engineer-adjacent feeling the design requires.

```css
/* WRONG — destroys tone */
font-weight: 700;
font-weight: bold;

/* CORRECT — maximum allowed */
font-weight: 500;
```

At `clamp(40px, 5vw, 64px)` and `-0.03em` letter-spacing, weight 500 already commands attention. Weight 700 would overpower the dark background and look like a startup template.

**Common temptation:** "the hero headline needs more impact." More impact comes from larger clamp value and tighter letter-spacing — not heavier weight.

---

#### Constraint 2: Zero Gradients (One Hero Glow Exception)

Gradients are the most common way a dark-mode site becomes generic. Every Bootstrap dark theme uses gradients. This site does not.

```css
/* WRONG — generic dark SaaS look */
background: linear-gradient(135deg, #5E6AD2, #08090A);
background: radial-gradient(circle, rgba(94,106,210,0.4) 0%, transparent 70%);

/* CORRECT — the only allowed exception */
/* One instance only, behind hero headline */
background: radial-gradient(ellipse at center top, rgba(94,106,210,0.08) 0%, transparent 60%);
```

If you feel the page needs more visual interest, the answer is: improve the product screenshot, not add a gradient.

---

#### Constraint 3: `rgba(255,255,255,0.06)` Borders — Never Higher Opacity

The borders are structural, not decorative. They define card boundaries without drawing attention to themselves.

```css
/* WRONG — suddenly visible, feels cheap */
border: 1px solid rgba(255,255,255,0.15);
border: 1px solid rgba(255,255,255,0.2);

/* CORRECT — barely there, structurally present */
border: 1px solid var(--border);  /* rgba(255,255,255,0.06) */
```

At 0.06 opacity on `#141517` surface, the border is visible but not prominent. At 0.15, it becomes a decorative element — breaking the minimal aesthetic.

---

#### Constraint 4: Monochrome Logos at `rgba(255,255,255,0.35)` — Never Colored

Customer logos in their original brand colors would create visual noise and unintended color additions to the palette.

```css
/* WRONG — adds uncontrolled colors */
/* Rendering company logos with their brand colors */

/* WRONG — too bright, becomes logo soup */
opacity: 0.8;

/* CORRECT — present but muted, unified */
color: rgba(255,255,255,0.35);
/* or: filter: brightness(0) invert(1); opacity: 0.35; */
```

The logos exist to signal social proof by company name recognition — not to showcase brand colors.

---

### 2. Engineering Rules

- all color values in CSS custom properties in `globals.css` — zero hex in component files
- Framer Motion only for scroll-triggered fades; hover states use CSS `transition`
- `useReducedMotion()` must guard all Framer Motion animation props
- `viewport={{ once: true }}` on all `whileInView` to prevent re-triggering
- Inter loaded with `weights: ['400', '500']` only — adding `'700'` is forbidden
- `<Image priority>` on hero screenshot (it is the LCP element)
- Lucide imports per icon (not barrel import) — `import { ChevronRight } from 'lucide-react'`

---

### 3. Copy Rules

- headlines: declarative statements, max 8 words, no punctuation except periods
- subtext: max 16 words per section
- no exclamation marks anywhere in the codebase
- no aspirational language: never "empower", "streamline", "unlock the potential", "revolutionize"
- feature card descriptions: max 2 lines; if longer, the feature name is wrong

---

### 4. Common Failure Modes

| Symptom | Root cause | Fix |
|---------|-----------|-----|
| Page looks like a Bootstrap dark theme | Gradient added | Remove all gradients; hero glow max `0.08` opacity |
| Headlines feel weak | Compensating with font-weight 700 | Use weight 500; increase clamp max or tighten letter-spacing instead |
| Bento cards look cluttered | Too much content per card | Max 2 lines per card description; trim card copy |
| Logo bar breaks on mobile | Fixed `gap` without wrapping | Use `overflow-x: auto` with `white-space: nowrap` inside scroll container |
| Animations trigger on every scroll | Missing `viewport={{ once: true }}` | Add `viewport={{ once: true }}` to all `whileInView` |
| Animations run despite reduced-motion | Missing `useReducedMotion()` guard | Wrap all Framer Motion props in `const shouldReduceMotion = useReducedMotion()` check |
| `tsc --noEmit` fails | Strict type error on Framer Motion variant | Import `Variants` type from `framer-motion`; annotate variant objects |
| Lighthouse score drops | Hero `<Image>` missing `priority` | Add `priority` prop to hero screenshot `<Image>` |
| Border looks too prominent | Border opacity too high | Reset to `var(--border)` — never override with higher opacity inline |
