# 06 — Tasks
## Top-Tier Indian Law Firm · bw_legal_platform_02

Execute one task at a time. Report: "Task [ID] complete. [Built]. [Tested]."

---

## Phase 0 — Foundation

### TASK-001: Project setup + dependencies
```bash
npx create-next-app@latest store --typescript --app --src-dir --no-eslint --no-tailwind
cd store
npm install framer-motion lucide-react
```
`next.config.ts`: `output: 'export', images: { unoptimized: true }`

Done when: `npm run dev` starts; `tsc --noEmit` passes.

---

### TASK-002: TypeScript schema
Create `src/types/index.ts`:
- `TabId` type — union of 4 tab id strings
- `Office` type — union of 5 city strings
- `InsightCategory` type — union of 4 category strings
- `HeroTab` interface — id, label, headline, subheading, body, ctaLabel, ctaHref
- `PracticeArea` interface — id, title, description, slug
- `Person` interface — id, name, role, practice, office (Office type), image, quote
- `Insight` interface — id, title, category, date, image, slug, excerpt
- `Stat` interface — value (string), label

Done when: All types exported; `tsc --noEmit` clean.

---

### TASK-003: CSS tokens + global reset
`src/app/globals.css`:
- 7 `--color-*` tokens: navy, terracotta, blue, text, heading, surface, border
- Comment on `--color-terracotta`: "use only on text elements ≥18px tall"
- `--font-sans`, `--container`, `--section-pad` variables
- Base reset + body styles
- Focus ring: `2px solid var(--color-terracotta)` offset `3px`
- `.sr-only` utility class
- `prefers-reduced-motion` block

Done when: Page background white; tokens accessible in DevTools.

---

### TASK-004: Mock data
`src/lib/data.ts`:
- `heroTabs`: 4 entries — one per TabId value, each with distinct headline and content
- `practiceAreas`: 17 entries — matching AZB's actual practice scope
- `people`: 9 entries — mix of Founding Partner / Senior Partner / Partner; distributed across all 5 offices
- `insights`: 6 entries — mix of all 4 InsightCategory values
- `stats`: 4 entries — "Est. 1997", "500+", "5", "17" with labels
- `officeList`: string array of 5 office names

Done when: All arrays compile; `tsc --noEmit` clean.

---

### TASK-005: Font setup + layout
`src/app/layout.tsx`:
- `DM_Sans` from `next/font/google`, weights 300/400/500/600/700, variable `'--font-dm-sans'`
- Applied as className on `<html>`
- `globals.css` `--font-sans` references the variable
- Metadata: firm name + description

Done when: DevTools computed styles show DM Sans on body; no serif font in computed styles.

---

### TASK-006: PillButton component
`src/components/ui/PillButton.tsx` + `PillButton.module.css`:
- Props: `variant: 'primary' | 'secondary' | 'ghost'`, `size?: 'md' | 'sm'`, `children`, `href?`, `onClick?`
- `border-radius: 9999px` — confirmed in DevTools
- md: 44px height, 28px H-padding; sm: 38px height, 20px H-padding
- Primary: `background: var(--color-terracotta); color: #fff`
- Secondary: terracotta border + text, fills terracotta on hover
- Ghost: white border + text, for dark backgrounds

Done when: All 3 variants render; `border-radius: 9999px` confirmed.

---

## Phase 1 — Layout Shell

### TASK-007: StickyNav (section-aware)
`src/components/layout/StickyNav.tsx` + `StickyNav.module.css`:
- `'use client'` — `useState(isDark)`, IntersectionObserver on `[data-dark-section]`
- Default: white bg, border-bottom
- Dark: `rgba(0,35,70,0.95)`, `backdrop-filter: blur(8px)`
- Transition: `background 400ms ease, border-color 400ms ease`
- Logo + links switch to white in dark state
- Links hover: terracotta in both states
- "Contact" PillButton (primary, sm) right side
- `{ threshold: 0.3 }` — triggers when section 30% in viewport
- Cleanup `observer.disconnect()` on unmount

Done when: Add test dark section to page → nav turns dark when section scrolls into view (30%+ visible); turns white when section exits.

---

### TASK-008: Footer
`src/components/layout/Footer.tsx` + `Footer.module.css`:
- `background: var(--color-navy)`
- `border-top: 3px solid var(--color-terracotta)`
- 4-column layout: logo+tagline | Expertise (practice links) | Offices (5 cities) | Connect
- White text, 60% opacity secondary items
- Link hover: `color: var(--color-terracotta)`
- Responsive: 2-col tablet, 1-col mobile

Done when: Dark navy bg; terracotta top border (3px) visible; 5 offices listed.

---

## Phase 2 — Hero + Credentials + Practice Areas

### TASK-009: HeroTabs
`src/components/home/HeroTabs.tsx` + `HeroTabs.module.css`:
- `'use client'` — `useState<TabId>('energy')`
- `min-height: 100vh`, `background: var(--color-navy)`, `data-dark-section`
- SVG geometric pattern overlay (abstract ellipses, terracotta ~5% opacity, right side)
- Tab bar: `role="tablist"`, 4 tabs, `role="tab"`, `aria-selected`, `aria-controls`
- Active tab: white weight 600, `border-bottom: 3px solid var(--color-terracotta)`
- Inactive: white 50% opacity, weight 400
- Tab content: `role="tabpanel"`, `aria-labelledby`, `AnimatePresence` fade 200ms
- H1: terracotta, `clamp(2.75rem,5.5vw,4.5rem)`, weight 700
- Subtitle: white 90%, weight 300
- Body: white 70%, weight 400
- CTA: inline arrow text link (NOT PillButton), white → terracotta on hover
- Keyboard: `onKeyDown` with ArrowLeft/ArrowRight handling

Done when: 4 tabs visible; clicking switches content with fade; H1 is terracotta (not white); keyboard arrow keys cycle; nav turns dark over this section.

---

### TASK-010: CredentialsStrip
`src/components/home/CredentialsStrip.tsx` + `CredentialsStrip.module.css`:
- White bg, `border-top: 1px solid var(--color-border)`, `border-bottom: 1px solid var(--color-border)`
- 4 stat blocks: `border-left: 4px solid var(--color-terracotta); padding-left: 20px`
- Value: `3rem`, weight 700, black — display string as-is (no count-up animation)
- Label: `0.875rem`, grey
- 4-col desktop, 2-col tablet

Done when: White strip; terracotta left-borders visible on all 4 stats; values show correctly ("Est. 1997" renders as string).

---

### TASK-011: PracticeAreas section
`src/components/home/PracticeAreas.tsx` + `PracticeAreas.module.css`:
- `background: var(--color-navy)`, `data-dark-section`
- Geometric pattern overlay (same SVG approach as hero, very subtle)
- Terracotta dot (6px circle) + section eyebrow label
- Section heading: white, weight 700
- 4-col grid (3 tablet, 2 mobile)
- Ghost cards: `rgba(255,255,255,0.04)` bg, `rgba(255,255,255,0.1)` border, `border-radius: 10px`
- Title: `text-transform: uppercase`, white, weight 700, `0.12em` letter-spacing
- Desc: white 65% opacity, weight 300, 3-line clamp
- Arrow link: terracotta, gap increases on hover
- Hover: bg lightens, border turns terracotta-tinted
- Framer Motion `whileInView` stagger

Done when: Nav turns dark over this section. 17 cards in grid. Ghost cards visible. Uppercase titles. Terracotta arrow links. 10px radius confirmed.

---

## Phase 3 — People + Insights

### TASK-012: PeopleGrid
`src/components/home/PeopleGrid.tsx` + `PeopleGrid.module.css`:
- `'use client'` — 3 filter state values, `useMemo` on filtered result
- Filter bar: pill-shaped search input + 2 selects + reset button
- ARIA live region for filtered count
- 3-col grid (2 tablet, 1 mobile)
- Card: `border: 1px solid var(--color-border); border-radius: 10px; padding: 24px`
- Photo: square, `border-radius: 4px`, NO grayscale filter
- Name: black weight 600; role: terracotta uppercase; practice+office: grey
- Quote: `<blockquote>`, italic, `border-left: 2px solid var(--color-terracotta)`, padding-left
- Card hover: `box-shadow: 0 4px 20px rgba(0,35,70,0.10)`
- Framer Motion `whileInView` stagger

Done when: Filter by "Mumbai" shows only Mumbai people. Photos are full color. Quotes have terracotta left-border. 10px card radius confirmed. ARIA live region updates on filter.

---

### TASK-013: Insights section
`src/components/home/Insights.tsx` + `Insights.module.css`:
- White section, 3-col grid, `gap: 24px`
- Cards: `border: 1px solid var(--color-border); border-radius: 10px`
- Image: 16:9 aspect ratio
- Category pill: `background: var(--color-blue)` (blue, NOT terracotta), `border-radius: 9999px`
- Date: grey, small
- Title: black weight 600, 2-line clamp
- "Read more →": terracotta, underlines on hover
- Framer Motion `whileInView`

Done when: 6 insight cards; blue category pills; terracotta "Read more"; 10px radius.

---

## Phase 4 — Composition + Audit

### TASK-014: Page composition
`src/app/page.tsx`:
Compose in order:
1. `<HeroTabs />` — `data-dark-section`
2. `<CredentialsStrip />`
3. `<PracticeAreas />` — `data-dark-section` (already on the component's root)
4. `<PeopleGrid />`
5. `<Insights />`

Verify: scroll through all sections → nav alternates correctly between dark and light states.

Done when: Full homepage renders; nav alternates correctly.

---

### TASK-015: Final audit
```bash
npx tsc --noEmit
npm run build
grep -r "#[0-9a-fA-F]\{3,6\}" src/ --include="*.module.css"
```

Checks:
- [ ] `tsc --noEmit` zero errors
- [ ] Build succeeds
- [ ] No hex in CSS Module files
- [ ] DevTools: ALL buttons `border-radius: 9999px`
- [ ] DevTools: ALL cards `border-radius: 10px`
- [ ] DevTools: people photos — no `filter: grayscale` in computed styles
- [ ] DevTools: no serif font in computed styles anywhere
- [ ] DevTools: terracotta `#B57560` not on any text element < 18px
- [ ] Nav: dark over hero and practice sections; white over credentials, people, insights
- [ ] Hero tab H1 is terracotta (not white)
- [ ] Tab keyboard navigation: arrow keys cycle tabs
- [ ] Tab ARIA: correct tablist/tab/tabpanel structure
- [ ] Practice titles UPPERCASE in UI (via CSS, not stored uppercase)
- [ ] People filter works: name + office + practice independently and combined
- [ ] Insight category tags are blue (`#00539B`), not terracotta
- [ ] Footer: navy bg, terracotta `3px` top border
- [ ] No GoldCorner L-brackets anywhere
- [ ] No star ratings, no pricing, no countdown timers
- [ ] Lighthouse ≥90/90
