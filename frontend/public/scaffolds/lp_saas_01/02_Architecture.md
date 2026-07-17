# 02 — Architecture
## Precision Dark SaaS Landing Page · lp_saas_platform_01

---

### 1. Architecture Decision

Static Next.js 14 App Router site with `output: 'export'`. No server-side rendering required — this is a marketing page with no auth, database, or CMS for v1. Framer Motion for scroll animations. All content is static data.

---

### 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Create React App / Vite | ecosystem alignment with app |
| Export | `output: 'export'` | server functions | no dynamic server needs |
| Language | TypeScript strict | JavaScript | type safety |
| Styling | Tailwind + CSS vars | CSS-in-JS | performance + token system |
| Animation | Framer Motion | GSAP / CSS only | viewport detection + reduced-motion |
| Icons | Lucide | HeroIcons / FontAwesome | `size={16} strokeWidth={1.5}` standard |
| Images | Next.js `<Image>` | `<img>` | LCP optimization |

---

### 3. Folder Structure

```text
src/
├── app/
│   ├── globals.css          ← all 9 color tokens + typography vars
│   ├── layout.tsx           ← Inter Variable font, meta, dark body
│   └── page.tsx             ← imports all section components
├── components/
│   ├── SiteNav.tsx          ← sticky nav, scroll shadow, mobile menu
│   ├── HeroSection.tsx      ← headline, subtext, CTAs, screenshot
│   ├── LogoTrustBar.tsx     ← monochrome company wordmarks
│   ├── FeatureSection.tsx   ← reusable: layout prop ('text-left' | 'text-right')
│   ├── BentoGrid.tsx        ← 3-col grid of 6 feature cards
│   ├── PricingPreview.tsx   ← plan names, prices, 1 differentiator each
│   ├── FinalCTASection.tsx  ← closing 2-line headline + 2 CTAs
│   └── SiteFooter.tsx       ← 5-column link grid + copyright
├── data/
│   ├── features.ts          ← feature section content
│   ├── bento.ts             ← bento card content
│   ├── logos.ts             ← company name list
│   └── pricing.ts           ← plan data
└── types/index.ts
```

---

### 4. CSS Token System

All 9 color values live in `globals.css` as CSS custom properties. Zero hex values in any component file.

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
}
```

---

### 5. Animation Strategy

- Framer Motion `motion.div` with `whileInView` for scroll-triggered fades
- Props: `initial={{ opacity: 0, y: 12 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.4, ease: 'easeOut' }}`
- `viewport={{ once: true }}` on all scroll animations
- Staggered bento grid: `delay: index * 0.07`
- Hover: CSS `transition: 150ms ease` on buttons and nav links — no Framer Motion for hover
- Reduced motion: `useReducedMotion()` hook disables all Framer Motion animations

---

### 6. Performance Requirements

- `<Image priority>` on hero screenshot (LCP element)
- Logo images: SVG or WebP, no raster PNGs above 40KB
- No unused icon imports — import per Lucide icon
- `font-display: optional` on Inter to prevent FOUT blocking
- Lighthouse 95+ all metrics
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms

---

### 7. No Server Requirements

This is a fully static export. No:
- `use server` / server actions
- API routes
- cookies or sessions
- database connections
- environment variables at runtime

Any future form (e.g. email capture) should be handled by a third-party form service (Formspark, Formspree) via client-side POST — not a custom API route.
