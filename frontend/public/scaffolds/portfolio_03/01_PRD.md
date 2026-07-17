# 01 — Product Requirements Document
## Studio Portfolio with Case Studies · portfolio_platform_03

---

### 1. Product Vision

A studio portfolio that wins new client briefs. A potential client arrives, immediately understands the studio's positioning, sees credible work across multiple categories, reads a case study that tells a real story, and finds a clear path to getting in touch. The design system — specifically the `data-theme` section-level theming — demonstrates that this studio thinks in systems, not just layouts.

**Success metric:** A prospective client can identify the studio's positioning, find one relevant case study, and locate the contact email in under 60 seconds.

---

### 2. Personas

**Primary: New business prospect**
- CMO, brand director, or product lead at a mid-to-large company
- Arriving from a referral, award listing, or LinkedIn
- Evaluating: "Do they do work like ours? Are they credible? Can we afford them?"
- Needs: relevant case study, studio pedigree (awards, clients), contact path
- Time budget: 90 seconds before deciding to read deeper

**Secondary: Industry peer / award jury**
- Designer or developer evaluating craft quality
- Inspects code and design details
- Wants to see: thoughtful type, systematic theming, clean markup
- Arrives at /work or /about directly

**Tertiary: Candidate / recruitment**
- Evaluating the studio as a potential employer
- Arrives at /about, looks at team
- Wants: team structure, disciplines, studio culture signals

---

### 3. Core Features

**3.1 Homepage**
- Full-viewport video hero (dark theme section, autoplay muted loop)
- Studio positioning statement: large display-size headline
- Below hero: 3–4 featured case study cards (subset of work)
- Studio statement strip (brief 1–2 sentence manifesto)

**3.2 Work Index (/work)**
- Filter bar: All / Branding / Digital / Experience / E-commerce / Content
- Case study grid: 2 columns desktop, 1 mobile
- Each card: cover image, client name, category badge, year
- Hover: image scales to 1.04 (300ms, studio ease)
- Filter: client-side, instant, no page reload

**3.3 Case Study (/work/[slug])**
- Full-width hero image with project title
- Meta strip: client, scope, year, deliverables, live URL (if applicable)
- Three narrative sections: Challenge, Approach, Outcome
- Image blocks between narrative sections
- Next Project CTA at foot of page

**3.4 About (/about)**
- Manifesto section (dark theme): large display-size conviction statement
- Capabilities: Design services list + Development services list (two columns)
- Team: three discipline pillars with name/role per person
- Awards and recognition: list of wins (year, award, project)

**3.5 Contact (/contact)**
- Studio address
- General email
- New business inquiry email (or form link)
- Social links (LinkedIn, Twitter/X, Instagram, GitHub)

---

### 4. User Journeys

**Journey 1 — New business (60 seconds):**
Homepage → read positioning headline → scroll to featured work → click a case study → read Challenge/Approach/Outcome → go to /contact → copy email.

**Journey 2 — Award jury / peer:**
/work → filter by "Branding" → click case study → inspect craft → /about → check awards list → done.

**Journey 3 — Candidate:**
/about → read manifesto → see team structure → see disciplines → note culture → go to /contact → find recruitment email.

**Journey 4 — Mobile:**
Homepage hero (video degrades to static image on data-save mode) → scroll → featured work cards (1 col) → tap case study → narrative reads cleanly → contact link.

---

### 5. Non-Goals

| # | Non-goal | Why |
|---|----------|-----|
| NG1 | CMS or admin interface | Static data file sufficient for V1 |
| NG2 | Server-side contact form | Use mailto: or Formspree link |
| NG3 | Client login / password-protected work | All work is public |
| NG4 | Blog or articles section | Not a content publication |
| NG5 | Dark mode toggle | Theming is section-level, not user-preference |
| NG6 | Real-time animations beyond hover | CSS transitions sufficient |

---

### 6. Constraints

- Video hero: `autoplay muted loop playsInline` — no audio, no controls
- Theme switching: CSS only via `data-theme` attribute — no JavaScript colour interpolation
- No UI component library — HTML + CSS Modules only
- No border-radius on structural elements; 4px maximum on filter pills
- All case study images via `next/image` with correct `sizes` attribute
- All content from `src/data/work.ts` — no hardcoded client names in JSX
- Filter bar must be functional without JavaScript (CSS `:target` or `<details>` fallback)
- Nav must be legible on all four theme backgrounds

---

### 7. Acceptance Criteria

- [ ] Homepage: video hero plays on load (muted, looping, full-viewport)
- [ ] Homepage: studio positioning headline renders at display size
- [ ] Homepage: 3–4 featured case study cards visible below hero
- [ ] /work: all case studies display in 2-col grid
- [ ] /work: FilterBar filters by category, instant, no reload
- [ ] /work: WorkCard hover scales image to 1.04 in 300ms
- [ ] /work/[slug]: dynamic route resolves for all slugs in data file
- [ ] /work/[slug]: meta strip shows client, year, scope, deliverables
- [ ] /work/[slug]: Challenge, Approach, Outcome sections present
- [ ] /work/[slug]: Next Project CTA links to correct next case study
- [ ] /about: manifesto section has `data-theme="dark"` (dark bg, white text)
- [ ] /about: team listed under 3 discipline headers
- [ ] /contact: email link is `mailto:` functional
- [ ] Nav: legible (correct `--color` variable) on all 4 theme backgrounds
- [ ] Zero `border-radius` on structural elements (inspector check)
- [ ] No font files in Network tab (system stack only)
- [ ] All external links: `target="_blank" rel="noopener noreferrer"`
- [ ] Lighthouse performance ≥ 90 on /work page

---

### 8. Case Study Content Schema

```typescript
interface CaseStudy {
  slug: string                    // URL slug: 'acme-rebrand'
  client: string                  // Display name: 'Acme Co'
  category: Category              // 'branding' | 'digital' | 'experience' | 'ecommerce' | 'content'
  year: number                    // 2024
  featured: boolean               // appears on homepage if true
  coverImage: string              // path: '/work/acme-cover.jpg' (4:3 ratio)
  heroImage: string               // path: '/work/acme-hero.jpg' (16:9 or full-width)
  tagline: string                 // 1-line project description
  scope: string[]                 // ['Brand Strategy', 'Visual Identity', 'Web Design']
  deliverables: string[]          // ['Brand Guidelines', 'Website', 'Motion System']
  challenge: string               // paragraph
  approach: string                // paragraph
  outcome: string                 // paragraph
  images: string[]                // additional images for narrative sections
  liveUrl?: string               // external URL if public
  awards?: string[]              // ['Awwwards SOTD', 'CSS Design Awards']
}
```

---

### 9. Edge Cases

| Scenario | Expected Behaviour |
|----------|-------------------|
| `featured: true` on 0 case studies | Homepage shows no featured work — guard with `if (featured.length > 0)` |
| `featured: true` on 5+ case studies | Slice to first 3: `work.filter(s => s.featured).slice(0, 3)` |
| Case study has no images | NarrativeSection renders without image blocks — not an error |
| Case study has no `liveUrl` | MetaStrip does not render live link column — conditional render |
| Case study has no `awards` | CaseStudyHero/MetaStrip omits awards badge — `{study.awards && <Badge>}` |
| Category has zero case studies | FilterBar shows the pill; grid shows empty state: "No work in this category yet" |
| Video file missing from `public/` | Browser shows poster image; no 404 — `poster` is a graceful fallback |
| Mobile with `Save-Data` header | Treat same as `prefers-reduced-motion` — show poster, hide video |

---

### 10. Design Constraint Rationale

| Constraint | Reason |
|-----------|--------|
| `border-radius: 4px` only on filter pills | Filter pills are the only UI elements that need softening — everything else is editorial geometry |
| `data-theme` on sections (not CSS class toggling) | HTML attribute theming propagates via CSS custom property inheritance — zero JavaScript for colour changes |
| No Tailwind | CSS Modules expose the actual grid coordinates and theming logic — a visitor who inspects the code must see intentional craft, not utility classes |
| System font stack | The studio communicates professionalism via restraint — web fonts add FOUT risk and network overhead for no design benefit |
| Filter is client-side `useState`, not URL params | Case studies are few enough that client-side filtering is instant — no need for server-side query params in V1 |
| `notFound()` not `return null` | `notFound()` triggers Next.js 404 mechanics (proper HTTP status, error boundary) — `return null` silently renders a blank page |
