# 04 — Build Plan
## Precision Dark SaaS Landing Page · lp_saas_platform_01

---

### Overview

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| 0 | Foundation | 1 day | Next.js scaffold, CSS tokens, Inter font, layout |
| 1 | Navigation + Hero | 1 day | sticky nav, hero with screenshot, scroll shadow |
| 2 | Trust + Features | 1 day | logo bar, feature section 1, feature section 2 |
| 3 | Grid + Pricing | 1 day | bento card grid, pricing preview |
| 4 | CTA + Footer | 0.5 day | final CTA section, 5-column footer |
| 5 | Animation + QA | 1 day | Framer Motion, reduced-motion, Lighthouse 95+, WCAG AA |

---

### Phase Gates

- [ ] token gate: zero hex values in any component file
- [ ] weight gate: no `font-weight: 700` anywhere in codebase
- [ ] gradient gate: no CSS `gradient` keyword (hero glow via radial-gradient is the one exception, capped at `rgba(94,106,210,0.08)`)
- [ ] radius gate: no `border-radius` above `12px`
- [ ] above-fold gate: hero CTA visible without scroll at 768px viewport
- [ ] motion gate: all scroll animations disabled under `prefers-reduced-motion`
- [ ] accessibility gate: WCAG AA contrast on all text, visible focus rings on all interactive elements
- [ ] performance gate: Lighthouse 95+ mobile

---

### Cut Order

Cut if scope shrinks (in order):
1. Pricing preview section (link from nav to `/pricing` page instead)
2. Feature section 2 (keep section 1 only)
3. Bento stagger animation (keep static bento grid)

Never cut:
- sticky navigation with "Get started" button
- hero section
- logo trust bar
- at least one feature section
- final CTA section

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| `font-weight: 700` used anywhere (weight gate violation) | High | High | ALL headings use `600`; `grep -r "font-weight: 700" src` → must return empty — this is the single most common AI error |
| `border-radius` above `12px` anywhere (radius gate) | High | High | Max `12px`; `grep -r "border-radius" src --include="*.module.css"` → all values ≤ 12px |
| CSS `gradient` keyword used outside hero glow exception | Medium | High | Only exception: hero radial glow capped at `rgba(94,106,210,0.08)`; `grep -r "gradient" src` → one result only |
| Hex value in component file instead of CSS token (token gate) | High | High | All colors via `var(--color-*)` tokens; `grep -r "#[0-9A-Fa-f]" src --include="*.tsx" --include="*.css"` → zero component results |
| Hero CTA not visible without scroll at 768px viewport | Medium | High | Test at exactly 768px viewport height; CTA must be visible without any scroll |
| Scroll animations not disabled under `prefers-reduced-motion` | Medium | Medium | All Framer Motion `whileInView` wrapped with `prefers-reduced-motion` check in `globals.css` |
| TypeScript strict mode errors blocking static export | Medium | High | Run `tsc --noEmit` after each phase; Phase 0 must have zero errors before Phase 1 starts |
