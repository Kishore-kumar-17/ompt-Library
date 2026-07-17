# 04 — Build Plan
## Studio Portfolio with Case Studies · portfolio_platform_03

---

### Overview

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| 0 | Foundation | 1 day | Setup, tokens, schema, sample data |
| 1 | Layout Shell | 1 day | Nav, page wrapper, theme system live |
| 2 | Homepage | 1 day | Video hero, featured work, studio strip |
| 3 | Work Section | 2 days | Filter, grid, case study page |
| 4 | About & Contact | 1 day | Manifesto, team, awards, contact |
| 5 | Polish & Launch | 1 day | Transitions, scroll reveals, a11y, perf |

**Total: 7 days**

---

### Phase 0 — Foundation (Day 1)

**Deliverables:**
- Next.js 14 + TypeScript + CSS Modules setup (no Tailwind)
- `globals.css`: theme system (`data-theme` vars), typography scale, spacing tokens, easing token
- `src/types/index.ts`: CaseStudy, TeamMember, Award interfaces
- `src/data/work.ts`: 6–8 sample case studies with all fields
- `src/data/team.ts`: 3 discipline pillars with 3+ members each
- `src/data/awards.ts`: 5+ sample awards

**Ship gate:**
- [ ] Theme CSS vars resolve correctly — `[data-theme="dark"]` gives white text on black
- [ ] `tsc --noEmit` zero errors
- [ ] Sample case study data fully typed, no `any`

---

### Phase 1 — Layout Shell (Day 2)

**Deliverables:**
- `Nav` component: sticky, theme-aware (`var(--color)`), logo + links + (optional) language toggle
- `SkipNav` component
- Root `layout.tsx`: Nav, skip-nav, body font setup, metadata
- Footer component: studio name, year, social links (dark theme)
- All 5 page files created (empty but routing works)

**Ship gate:**
- [ ] Nav visible on all 5 routes
- [ ] Nav text is black on default pages, white on dark theme pages (test with `data-theme="dark"` on body)
- [ ] Skip-nav appears on Tab press
- [ ] Footer renders with dark theme

---

### Phase 2 — Homepage (Day 3)

**Deliverables:**
- `VideoHero`: full-viewport, dark theme, `<video autoPlay muted loop playsInline>`, white headline
- Studio statement strip (dark theme, 1–2 sentence manifesto)
- Featured work: 3 `WorkCard` components (from `featured: true` case studies)
- `WorkCard` component with hover image scale

**Ship gate:**
- [ ] Video plays on load (muted, looped, full-viewport)
- [ ] On mobile: video respects `prefers-reduced-motion` — shows poster instead
- [ ] WorkCard hover: image scales to 1.04 in 300ms using `var(--ease)`
- [ ] Featured cards link to `/work/[slug]`

---

### Phase 3 — Work Section (Days 4–5)

**Deliverables:**
- `/work` page: FilterBar + WorkGrid (all case studies)
- FilterBar: category pills, active state, client-side filter
- WorkGrid: 2-col desktop, 1-col mobile, 5–8 WorkCards
- `/work/[slug]` dynamic page: `generateStaticParams` from work data
- CaseStudyHero: full-width image, title overlay, dark theme
- MetaStrip: client, year, scope, deliverables in a horizontal row
- NarrativeSection × 3: Challenge, Approach, Outcome (label + body, two-column)
- Image blocks between narrative sections
- NextProject CTA at page bottom

**Ship gate:**
- [ ] All filter categories work; "All" resets to full grid
- [ ] All case study slugs resolve (`/work/slug-name` renders correct content)
- [ ] `generateStaticParams` exports all slugs — no 404s
- [ ] Narrative sections use two-column layout on desktop, single on mobile
- [ ] NextProject wraps around to first case study from last

---

### Phase 4 — About & Contact (Day 6)

**Deliverables:**
- `/about`: ManifestoSection (dark theme) + CapabilitiesSection + TeamSection + AwardsSection
- ManifestoSection: display-size text, dark background, max 15 words
- CapabilitiesSection: two columns — Design services, Development services
- TeamSection: three discipline headers (Design / Development / Operations), name + role list per pillar
- AwardsSection: list — year, award name, project name
- `/contact`: address, general email, new business email, social links

**Ship gate:**
- [ ] `/about` manifesto has `data-theme="dark"` at section level (not page level)
- [ ] Team shows 3 discipline pillars with at least 3 members each
- [ ] `/contact` email renders as `mailto:` link
- [ ] All social links: `target="_blank" rel="noopener noreferrer"`

---

### Phase 5 — Polish & Launch (Day 7)

**Deliverables:**
- Framer Motion: page transition (opacity fade between routes)
- `useInView` hook: scroll reveal on WorkCards, narrative sections, team list
- Video: `poster` attribute pointing to `/hero-poster.jpg`
- `prefers-reduced-motion`: disable scale animation, disable video autoplay
- Open Graph meta in `layout.tsx`
- Lighthouse audit: performance, accessibility
- `tsc --noEmit` zero errors
- Deploy to Vercel

**Ship gate (launch):**
- [ ] Lighthouse performance ≥ 90 on /work
- [ ] Lighthouse accessibility ≥ 90 on all pages
- [ ] Zero `border-radius` on structural elements
- [ ] No font files in Network tab
- [ ] All `data-theme` attributes resolving correctly (browser inspector)
- [ ] `prefers-reduced-motion`: no scale animation, no auto-playing video
- [ ] All external links: `target="_blank" rel="noopener noreferrer"`

---

### Cut Order

**Never cut:**
- Video hero (it's the first impression)
- FilterBar on /work (usability requirement)
- Case study pages (without them, the work grid is just images)
- `/about` manifesto section
- `/contact` page
- Theme system (it IS the design language)

**Cut first:**
- Awards section (replace with honours count text)
- Framer Motion page transitions (fall back to CSS opacity)
- Scroll reveal animations (fall back to static)
- Language toggle

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| `data-theme` vars not propagating to Nav | Medium | High | Nav text uses `var(--color)` — test on each theme background before Phase 2 |
| Video hero blocked on iOS Safari | Medium | Medium | `playsInline` attribute required; test on real iPhone in Phase 2 gate |
| Framer Motion `AnimatePresence` filter flicker | Low | Medium | Use unique `key={study.slug}` on WorkCard; `mode="popLayout"` on AnimatePresence |
| `generateStaticParams` missing a slug | Low | High | Generate params from `work.ts` array directly; `npm run build` reveals missing slugs |
| `border-radius: 4px` on non-pill elements | Medium | Medium | Code review grep: `grep -r "border-radius" src/ | grep -v "border-radius: 0\|border-radius: 4px"` |
| `prefers-reduced-motion` not respected on video | Medium | High | CSS media query + React check both needed — CSS alone cannot pause `<video autoPlay>` |

---

### Testing Strategy

| Phase | Test | Method |
|-------|------|--------|
| 0 | Theme vars: `[data-theme="dark"]` correct | DevTools element inspector |
| 0 | `tsc --noEmit` zero errors | CLI |
| 1 | Nav readable on all 4 theme backgrounds | Manual — toggle `data-theme` on body in DevTools |
| 2 | Video plays on iOS Safari | Real device test |
| 2 | `prefers-reduced-motion` pauses video | Chrome DevTools → Rendering → prefers-reduced-motion |
| 2 | WorkCard hover: `scale(1.04)` only on image | DevTools Computed → `transform` |
| 3 | All filter categories work | Manual click through all category pills |
| 3 | `generateStaticParams` covers all slugs | `npm run build` — all slugs listed as pre-rendered |
| 3 | Unknown slug → 404 | Navigate to `/work/fake-slug` |
| 4 | `/about` ManifestoSection dark theme | DevTools: `data-theme="dark"` on section element |
| 5 | Lighthouse performance ≥ 90 on /work | Lighthouse CLI |
| 5 | All border-radius: `grep -r "border-radius" src/ | grep -v "0\|4px"` → empty | Bash |

---

### Definition of Done

**Phase 0:**
- [ ] `tsc --noEmit` zero errors
- [ ] `[data-theme="dark"]` gives white on near-black — verified in DevTools
- [ ] All 3 data files created with sample content (work.ts, team.ts, awards.ts)

**Phase 1:**
- [ ] Nav text adapts to `data-theme` on section — tested on all 4 variants
- [ ] Skip-nav jumps to `<main>` correctly
- [ ] Footer renders with dark theme on all pages

**Phase 2:**
- [ ] Video hero plays muted loop on Chrome and Safari
- [ ] `prefers-reduced-motion` — video hidden, poster shown
- [ ] WorkCard hover: image `scale(1.04)`, 300ms `var(--ease)`

**Phase 3:**
- [ ] All categories filter correctly; "All" resets
- [ ] Every case study slug resolves to correct content
- [ ] NextProject wraps from last to first
- [ ] Narrative sections: two-column desktop, single mobile

**Phase 4:**
- [ ] ManifestoSection: `data-theme="dark"` on section element (not body)
- [ ] Contact emails are `mailto:` links

**Phase 5 (launch):**
- [ ] Lighthouse performance ≥ 90 on /work
- [ ] Lighthouse accessibility ≥ 90 on all pages
- [ ] `npm run build` clean — zero TypeScript errors
- [ ] All non-negotiable grep checks pass
