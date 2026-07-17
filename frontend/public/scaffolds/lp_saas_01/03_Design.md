# 03 — Design System
## Precision Dark SaaS Landing Page · lp_saas_platform_01

---

### 1. Design Philosophy

Quiet confidence. Every element is intentional. Zero decoration. The product screenshot does the visual work. Typography communicates precision through restraint — weight 500 maximum, negative letter-spacing, generous line-height.

---

### 2. CSS Custom Properties (globals.css)

```css
:root {
  --bg:              #08090A;
  --surface:         #141517;
  --border:          rgba(255, 255, 255, 0.06);
  --text-primary:    #E4E5E9;
  --text-secondary:  rgba(255, 255, 255, 0.48);
  --text-tertiary:   rgba(255, 255, 255, 0.28);
  --accent:          #5E6AD2;
  --accent-hover:    #6E7AE2;
  --destructive:     #E85D4A;
  --success:         #4AB87A;

  --radius-card:     12px;
  --radius-button:   8px;
  --radius-chip:     6px;
  --radius-input:    8px;

  --section-spacing: 128px;
  --section-spacing-mobile: 80px;
}
```

---

### 3. Typography

All Inter Variable. Weight max 500.

| Role | Size | Weight | Letter-spacing | Line-height |
|------|------|--------|---------------|-------------|
| Display / Hero | `clamp(40px, 5vw, 64px)` | 500 | `-0.03em` | 1.1 |
| H2 / Section heading | `clamp(28px, 3.5vw, 40px)` | 500 | `-0.02em` | 1.15 |
| H3 / Card heading | `20px` | 500 | `-0.01em` | 1.3 |
| Body | `16px` | 400 | `0` | 1.6 |
| Small / Meta | `14px` | 400 | `0` | 1.5 |
| Micro / Label | `12px` | 500 | `+0.02em` | 1.4 |

**Max body line length:** 68 characters (enforce via `max-width` on paragraphs).

---

### 4. Component Specifications

#### SiteNav
- `position: sticky; top: 0; z-index: 50`
- `60px` height; `1px` bottom border `var(--border)`
- Scroll shadow: `box-shadow` adds at `scrollY > 0` via `useEffect`
- Logo: text-only wordmark in `var(--text-primary)`, weight 500
- Nav links: `var(--text-secondary)`, hover `var(--text-primary)`, `150ms ease`
- "Log in": text link, `var(--text-secondary)`
- "Get started": filled button, `var(--accent)` bg, white text, `8px` radius, `36px` height, `16px` horizontal padding

#### HeroSection
- Centered layout, `128px` vertical padding desktop
- Headline: Display scale, weight 500, `var(--text-primary)`, max 8 words
- Subtext: `18px`, `var(--text-secondary)`, max 16 words, `max-width: 480px`
- CTA pair: "Get started" (filled accent) + "Talk to sales" (ghost with `1px var(--border)` border), `40px` height, `8px` radius
- Social proof: `14px`, `var(--text-tertiary)`, below CTAs — "25,000+ teams"
- Screenshot: `90%` container width, `12px` radius, `1px` border `var(--border)`
- Optional: one subtle radial glow behind headline — `rgba(94,106,210,0.08)` max — not a gradient

#### LogoTrustBar
- "Trusted by" label in `var(--text-tertiary)`
- 6–8 company wordmarks: `rgba(255,255,255,0.35)` opacity
- Horizontal scroll on mobile; `gap: 40px` desktop

#### FeatureSection (used twice)
- Two columns: content 50% / visual 50%
- `layout` prop: `'text-left'` or `'text-right'` flips column order
- `128px` vertical padding
- H2 headline + max 2-line subtext at `var(--text-secondary)`
- Visual: product screenshot or UI mockup placeholder; `12px` radius

#### BentoGrid
- 3-col desktop, 2-col tablet (< 768px), 1-col mobile (< 640px)
- 6 cards: `var(--surface)` bg, `12px` radius, `1px var(--border)` border, `24px` padding
- Each card: Lucide icon `size={16} strokeWidth={1.5}` + H3 + 2-line description
- Staggered fade-in on scroll entry

#### PricingPreview
- 3 plan cards: plan name, price, one key differentiator
- Not a full comparison table — link to `/pricing` for details
- Highlighted plan: `1px solid var(--accent)` border

#### FinalCTASection
- Dark full-width, `var(--bg)` background
- 2-line headline
- Same CTA pair as hero
- No background image or illustration

#### SiteFooter
- 5 columns: Product, Features, Company, Resources, Legal
- `var(--text-secondary)` links, hover `var(--text-primary)`
- `1px var(--border)` top border
- Copyright in `var(--text-tertiary)`

---

### 5. Motion Rules

- Scroll fade-in: `opacity 0→1`, `y 12px→0`, `400ms ease-out`, `viewport={{ once: true }}`
- Bento stagger: `delay: index * 0.07s`
- Hover transitions: `150ms ease` via CSS only (not Framer Motion)
- `useReducedMotion()` disables all Framer Motion animations when preference is set
- Forbidden: parallax, autoplay video, continuous loops, bounce easing, CSS keyframe loops

---

### 6. Anti-Patterns (Do Not Do)

| Anti-pattern | Why |
|-------------|-----|
| font-weight 700 | max is 500; 700 breaks the tone |
| Any gradient | zero gradients; hero glow is the only exception |
| `border-radius` above `12px` | hard limit — no pill buttons, no full circles |
| Stock photography | product screenshots only |
| Carousel / auto-advancing slider | static or tab-switch only |
| `rgba(255,255,255,0.06)` border at higher opacity | structural borders, not decorative |
| Colored customer logos | monochrome `rgba(255,255,255,0.35)` only |
| Exclamation marks in copy | never |
| Buttons taller than `40px` (desktop) | not `56px` pill CTA |
| Section spacing below `128px` desktop | no compression to fit more content |
