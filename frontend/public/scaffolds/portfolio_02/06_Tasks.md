# 06 — Tasks
## Editorial Grid Portfolio · portfolio_platform_02

Execute one task at a time. Report: "Task [ID] complete. [Built]. [Tested]. Ready for review."
Ask before changing grid template, palette, or font strategy.

---

## Phase 0 — Foundation

### TASK-001: Project setup
**Story:** STORY-001

```bash
npx create-next-app@latest portfolio --typescript --no-tailwind --app --src-dir --no-eslint
cd portfolio
```

Open `src/app/globals.css`. Replace all content with:
```css
*, *::before, *::after {
  box-sizing: border-box;
  border-radius: 0;
  margin: 0;
  padding: 0;
}
```
(Full token definitions added in TASK-002.)

Confirm: `npm run dev` runs without error; no `border-radius` in DevTools.

Done when: App boots; `tsc --noEmit` zero errors; no web font requests in Network tab.

---

### TASK-002: CSS custom properties
**Story:** STORY-002

Replace `src/app/globals.css` with full token set from 02_Architecture.md § Fluid Typography Scale. Include:
- Color tokens (`--bg`, `--accent`, `--text`, `--text-muted`)
- Font stack (`--font`)
- Weight tokens (`--weight-body: 400`, `--weight-strong: 800`)
- Size tokens (`--size-display: calc(1.6rem + 1.6vw)` through `--size-caption`)
- Space tokens (`--space-xs` through `--space-xl`)
- Base `body` styles, `a` styles, `h1–h4` styles

Critical rule: `*, *::before, *::after { border-radius: 0 }` must remain in the reset.

Done when: CSS vars accessible; all anchor elements weight 800 uppercase; headings uppercase.

---

### TASK-003: TypeScript types
**Story:** STORY-003

Create `src/types/index.ts` with interfaces: `Owner`, `Talk`, `Experiment`, `Article`, `Contact`.
(See full interface definitions in 02_Architecture.md § TypeScript Types.)

Done when: All interfaces exported; no `any` types; file compiles cleanly.

---

### TASK-004: Content data file
**Story:** STORY-004

Create `src/data/content.ts`. Populate with sample data:
- `owner`: name, role, affiliation, 2-paragraph bio, photoUrl: `/photo.jpg`, photoAlt
- `talks`: 4 sample entries with title, event, year, videoUrl
- `experiments`: 3 sample entries with title, description, url
- `contact`: email, github, linkedin

Add a placeholder `public/photo.jpg` (any square image for development).

Done when: Data file imports without TypeScript errors; all sample entries typed correctly.

---

### TASK-005: Skip navigation component
**Story:** STORY-015

Create `src/components/SkipNav/SkipNav.tsx`:
```tsx
export function SkipNav() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  )
}
```

Add to `globals.css`:
```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  padding: 0.75rem 1.5rem;
  background: var(--text);
  color: var(--bg);
  font-weight: var(--weight-strong);
  font-size: var(--size-small);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-decoration: none;
  z-index: 999;
  transition: top 0ms;
}
.skip-link:focus { top: 0; }
```

Add `<SkipNav>` as first child of `<body>` in `layout.tsx`.

Done when: Tab key from page top shows the skip link; clicking it jumps to `#main-content`.

---

## Phase 1 — Grid Shell

### TASK-006: PageGrid component
**Story:** STORY-005

Create `src/components/PageGrid/PageGrid.module.css`:
```css
.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, auto);
  min-height: 100vh;
  padding: var(--space-lg);
  gap: 0;
  background: var(--bg);
}
.nameArea    { grid-column: 1 / 4; grid-row: 1 / 6; z-index: 2; }
.accentArea  { grid-column: 3 / 6; grid-row: 1 / 6; z-index: 0; pointer-events: none; }
.navArea     { grid-column: 4 / 5; grid-row: 1 / 3; z-index: 2; }
.photoArea   { grid-column: 3 / 6; grid-row: 3 / 6; z-index: 1; }
.contentArea { grid-column: 6 / 8; grid-row: 4 / 6; z-index: 2; }
.footerArea  { grid-column: 1 / 8; grid-row: 6 / 7; z-index: 2; }
```

Create `src/components/PageGrid/PageGrid.tsx` rendering placeholder `<div>`s for each area. Verify in browser with DevTools grid inspector overlay.

Done when: Grid inspector shows 7 columns and 5 rows; all areas in correct positions.

---

### TASK-007: Responsive breakpoint
**Story:** STORY-006

Add to `PageGrid.module.css`:
```css
@media (max-width: 900px) {
  .grid { display: block; padding: var(--space-md); }
  .accentArea { display: none; }
}
```

Done when: At 899px viewport the layout is single-column; no overlapping; accent box gone.

---

## Phase 2 — Hero Elements

### TASK-008: NameBlock component
**Story:** STORY-007

Create `src/components/NameBlock/NameBlock.module.css` + `NameBlock.tsx`.

CSS:
```css
.block { display: flex; flex-direction: column; justify-content: flex-end; height: 100%; padding: 0 1rem 2rem 0; }
.first { font-size: var(--size-display); font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; line-height: 0.95; color: var(--text); }
.last  { font-size: var(--size-display); font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; line-height: 0.95; color: var(--accent); }
.role  { font-size: var(--size-small); font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-top: var(--space-sm); }
@media (max-width: 900px) {
  .block { padding: 0 0 var(--space-md) 0; align-items: center; text-align: center; }
  .first, .last { font-size: clamp(2.5rem, 8vw, 4rem); }
}
```

TSX:
```tsx
import { owner } from '../../data/content'
export function NameBlock() {
  const [firstName, ...rest] = owner.displayName.split(' ')
  const lastName = rest.join(' ')
  return (
    <div className={styles.block}>
      <h1>
        <span className={styles.first}>{firstName}</span>
        <span className={styles.last}>{lastName}</span>
      </h1>
      <p className={styles.role}>{owner.role}</p>
    </div>
  )
}
```

Done when: Name renders at fluid size; first name black, last name coral; role muted below.

---

### TASK-009: SideNav component
**Story:** STORY-008

Create `src/components/SideNav/SideNav.module.css` + `SideNav.tsx`.

CSS:
```css
.nav { writing-mode: vertical-rl; text-orientation: mixed; display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-sm); }
.link { font-weight: 800; font-size: var(--size-small); text-transform: uppercase; letter-spacing: 0.08em; color: var(--text); text-decoration: none; transition: color 120ms ease; }
.link:hover { color: var(--accent); }
.link:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
@media (max-width: 900px) {
  .nav { writing-mode: horizontal-tb; flex-direction: row; flex-wrap: wrap; gap: var(--space-sm); margin-bottom: var(--space-md); }
}
```

Navigation links from `content.ts` or hardcoded nav items (Bio, Talks, Experiments, Contact as anchor links).

Done when: Vertical text on desktop; horizontal on mobile; coral hover; visible focus ring.

---

### TASK-010: AccentBox component
**Story:** STORY-009

Create `src/components/AccentBox/AccentBox.tsx`:
```tsx
import styles from './AccentBox.module.css'
export function AccentBox() {
  return <div className={styles.box} aria-hidden="true" />
}
```

CSS:
```css
.box { border: 3px solid var(--accent); width: 100%; height: 100%; pointer-events: none; }
@media (max-width: 900px) { .box { display: none; } }
```

Done when: Red border box visible in grid; no background fill; behind photo and nav.

---

### TASK-011: HeroPhoto component
**Story:** STORY-010

Create `src/components/HeroPhoto/HeroPhoto.module.css` + `HeroPhoto.tsx`.

CSS:
```css
.wrapper { position: relative; width: 100%; height: 100%; overflow: hidden; }
.photo { width: 100%; height: 100%; object-fit: cover; opacity: 0.5; mix-blend-mode: multiply; display: block; transition: opacity 200ms ease; }
.photo:hover { opacity: 0.65; }
@media (max-width: 900px) { .wrapper { max-height: 280px; margin-bottom: var(--space-md); } }
@media (prefers-color-scheme: dark) { .photo { mix-blend-mode: screen; opacity: 0.6; } }
```

TSX (use `next/image`):
```tsx
<div className={styles.wrapper}>
  <Image
    src={owner.photoUrl}
    alt={owner.photoAlt}
    fill
    className={styles.photo}
    sizes="(max-width: 900px) 100vw, 40vw"
  />
</div>
```

Done when: Photo visible; blend mode integrates with beige background; no white rectangle visible around photo edges.

---

## Phase 3 — Content Sections

### TASK-012: Section heading helper
Create a reusable `<SectionHeading>` component:
```tsx
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.heading}>{children}</h2>
}
```
```css
.heading { font-size: var(--size-h2); font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 2px solid var(--text); padding-bottom: 0.5rem; margin-bottom: 1.5rem; }
```

Done when: Heading renders with correct weight, uppercase, black underline rule.

---

### TASK-013: BioSection
**Story:** STORY-011

Create `BioSection.tsx`:
```tsx
<section aria-labelledby="bio-heading">
  <SectionHeading id="bio-heading">About</SectionHeading>
  <p className={styles.role}>{owner.role} · {owner.affiliation}</p>
  {owner.bio.map((para, i) => <p key={i} className={styles.para}>{para}</p>)}
</section>
```

CSS: body text 1.1rem, 1.65 line-height; role line weight 800 uppercase; paragraphs with `margin-bottom: 1rem`.

Done when: Bio paragraphs render from `content.owner.bio`; role line above in uppercase bold.

---

### TASK-014: TalksSection
**Story:** STORY-012

Create `TalksSection.tsx`. Sort talks by year descending.

```tsx
<ul className={styles.list}>
  {[...talks].sort((a,b) => b.year - a.year).map(talk => (
    <li key={talk.title} className={styles.item}>
      <a href={talk.videoUrl} target="_blank" rel="noopener noreferrer" className={styles.title}>
        {talk.title}
      </a>
      <span className={styles.meta}>{talk.event} · {talk.year}</span>
    </li>
  ))}
</ul>
```

CSS:
```css
.item { display: flex; flex-direction: column; padding: 0.75rem 0; border-bottom: 1px solid rgba(0,0,0,0.15); }
.title { font-weight: 800; font-size: var(--size-small); text-transform: uppercase; letter-spacing: 0.04em; }
.title:hover { color: var(--accent); }
.meta { font-size: var(--size-small); color: var(--text-muted); margin-top: 0.25rem; }
```

Done when: Talks list renders; newest first; titles are links; event/year muted below.

---

### TASK-015: ExperimentsSection
**Story:** STORY-013

Same list pattern as TASK-014 but for experiments. Each item: name (link to `url`), description (muted below).

Done when: Experiments list renders; all items are links; descriptions muted.

---

### TASK-016: ContactSection
**Story:** STORY-014

```tsx
<ul className={styles.list}>
  <li><a href={`mailto:${contact.email}`} className={styles.link}>Email ↗</a></li>
  <li><a href={contact.github} target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub ↗</a></li>
  <li><a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn ↗</a></li>
  {contact.mastodon && <li><a href={contact.mastodon} target="_blank" rel="noopener noreferrer" className={styles.link}>Mastodon ↗</a></li>}
</ul>
```

CSS: links weight 800, uppercase, letter-spacing 0.06em; border-bottom 1px dividers; hover coral.

Done when: All contact links render; email opens `mailto:`; external links open new tab.

---

## Phase 4 — Polish & Launch

### TASK-017: Heading hierarchy audit
**Story:** STORY-016

1. Confirm single `<h1>` (creator name in NameBlock)
2. Confirm all section headings are `<h2>` via `SectionHeading` component
3. No `<h3>` needed for current content — if added, must follow `<h2>`
4. Run axe DevTools — fix any heading order violations

Done when: Axe reports no heading order issues; VoiceOver announces correct hierarchy.

---

### TASK-018: Focus ring audit
**Story:** STORY-017

1. Tab through entire page — every interactive element must show visible focus ring
2. Confirm skip-nav appears on first Tab press
3. Confirm all links have `focus-visible` outline using `var(--accent)`
4. Confirm no `outline: none` without replacement

Done when: Tab order logical; every link has visible coral focus ring.

---

### TASK-019: Open Graph meta
**Story:** STORY-018

Update `src/app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: `${owner.name} — ${owner.role}`,
  description: owner.bio[0],
  openGraph: {
    title: `${owner.name} — ${owner.role}`,
    description: owner.bio[0],
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}
```

Create `/public/og-image.png` (1200×630): name + role on `#E4E4D5` background in black text.

Done when: OG tags visible in page source; link preview shows correctly when tested.

---

### TASK-020: Dark mode
**Story:** STORY-019

Add to `globals.css`:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1C1C1A;
    --text: #E4E4D5;
    --text-muted: rgba(228,228,213,0.5);
  }
}
```

Add to `HeroPhoto.module.css`:
```css
@media (prefers-color-scheme: dark) {
  .photo { mix-blend-mode: screen; opacity: 0.6; }
}
```

Done when: Enabling system dark mode switches palette; accent unchanged; photo blend mode adapts.

---

### TASK-021: Final audit and deploy
**Story:** (launch gate)

Checklist:
- [ ] `tsc --noEmit` zero errors
- [ ] Browser inspector: zero `border-radius` values on any element
- [ ] Network tab: zero font file requests (no `.woff`, `.woff2`, `.ttf`)
- [ ] All external links: `target="_blank" rel="noopener noreferrer"`, weight 800, uppercase
- [ ] Photo has `mix-blend-mode: multiply` (verify in Computed styles)
- [ ] Nav is `writing-mode: vertical-rl` on desktop (verify in Computed)
- [ ] Skip-nav functional on Tab
- [ ] All 4 sections present: About, Talks, Experiments, Contact
- [ ] Lighthouse accessibility ≥ 90 desktop and mobile
- [ ] OG meta tags present in page source

Deploy: `vercel --prod` or push to GitHub (Vercel auto-deploys).

Done when: All checklist items confirmed.
