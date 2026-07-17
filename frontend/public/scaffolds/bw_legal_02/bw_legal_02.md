# bw_legal_02 — Top-Tier Indian Law Firm
## Reference: AZB & Partners · azbpartners.com

---

## Base Prompt

**Role:** Senior product designer specialising in top-tier Indian law firm websites, scroll-triggered architectural design systems, and tabbed hero narrative patterns.

Design a top-tier Indian law firm website — clean, confident, and architecturally bold with a three-color authority system: dark navy for depth, terracotta for warmth, secondary blue for precision. The firm is one of India's "Big 4" law firms with 5 offices and 17 practice areas. Unlike a heritage firm's restrained ornamentation, this firm's identity is built on structural sophistication: scroll-triggered section transitions, a tabbed hero narrative, geometric pattern overlays on dark sections, and quote-driven people profiles.

**Brand color system (exact):**
- Dark navy: `#002346` — hero background, dark section fills, practice area section background
- Terracotta: `#B57560` — heading accents, decorative dots, key emphasis elements
- Secondary blue: `#00539B` — links, interactive states, data highlights
- Body text: `#6B6B6B` — all paragraph text
- Black: `#000000` — primary headings, strong contrast text
- White: `#ffffff` — light section backgrounds, text on dark
- Border/muted: `#e5e7eb`

**Typography system:**
- Single font: "DM Sans" (Google Fonts proxy for Helvetica Neue), weights 300/400/500/600/700
- H1 hero: `clamp(2.75rem, 5.5vw, 4.5rem)`, weight 700, color `#B57560` (terracotta)
- Section H2: `clamp(1.5rem, 3vw, 2.5rem)`, weight 700, color `#000` or `#fff` on dark
- Practice area heading: `1rem`, weight 700, uppercase, `0.12em` letter-spacing
- Body: `0.875rem / 1.7`, weight 400, `#6B6B6B`
- Nav links: `0.875rem`, weight 500, color `#000` at rest / `#fff` on dark nav
- Quote text: `1.125rem`, weight 400 italic, `#6B6B6B`
- Button label: `0.875rem`, weight 600, uppercase, `0.08em` letter-spacing

**Layout system:**
- Container: `min(90%, 1280px)`, centered
- Section padding: `clamp(64px, 8vw, 112px)` vertical
- Practice area grid: 4 columns desktop, 3 tablet (900px+), 2 small tablet (640px+), 1 mobile
- People grid: 3 columns desktop, 2 tablet, 1 mobile
- Insights grid: 3 columns desktop, 2 tablet, 1 mobile
- Hero tab height: `min-height: 100vh`

**Component specifications:**

*Sticky navigation:*
- Height `72px`, white background at rest, `1px solid #e5e7eb` bottom border
- On dark sections (navy background): nav background shifts to `rgba(0,35,70,0.95)`
- Logo left, nav links center, search icon + CTA right
- Mega-dropdown for Expertise (Practice Areas + Sectors), People, Insights
- "Contact" pill CTA right: terracotta background `#B57560`, white text, pill-shaped

*Hero — tabbed narrative:*
- Full viewport height, dark navy background `#002346`
- Geometric ellipse pattern overlay: large abstract SVG ellipses in `rgba(181,117,96,0.08)` (terracotta, very subtle) positioned right side
- 4 tab labels: "Energy" | "Expertise" | "Execution" | "Unmatched" — horizontal row
- Active tab: terracotta underline `3px solid #B57560`, label in white weight 600
- Inactive tabs: white at 50% opacity, weight 400
- Tab content: large H1 in terracotta `#B57560`, subtitle in white Roboto 300, brief body text in `rgba(255,255,255,0.75)`
- Arrow CTA links in white with right-arrow icon (→)
- NO pill CTA button in hero — arrow text links only (distinguishes from nav CTA)

*Scroll-triggered section backgrounds:*
- Sections alternate between white background and dark navy `#002346`
- Use IntersectionObserver on each section: when a dark-bg section enters viewport (>40% visible), add `data-dark="true"` to the nav → nav switches to dark variant
- This creates the dynamic "blue-screen / white-screen" transition as user scrolls
- Transition: `background 400ms ease`

*Practice area section (dark navy background):*
- Full-width dark navy background `#002346`
- Decorative geometric pattern: abstract ellipses in `rgba(255,255,255,0.03)` positioned top-right
- Terracotta dot accents `width: 6px; height: 6px; background: #B57560; border-radius: 50%` preceding each section label
- Section heading: white, weight 700
- 4-column grid of practice area cards
- Cards: `background: rgba(255,255,255,0.04)`, `border: 1px solid rgba(255,255,255,0.1)`, `border-radius: 10px`
- Card title: WHITE UPPERCASE, `1rem`, weight 700, `0.12em` letter-spacing
- Card hover: `background: rgba(255,255,255,0.08)`, `border-color: rgba(181,117,96,0.4)` (terracotta tint)
- "→" arrow link in terracotta `#B57560`

*People cards — quote-driven:*
- White background section
- Each card: photo (square, `border-radius: 4px`), name (black weight 600), role (terracotta `#B57560` weight 400 uppercase), then a personal quote in italic grey
- Quote format: `"What drives me is..."` or `"I am passionate about..."`
- Cards: `border: 1px solid #e5e7eb; border-radius: 10px; padding: 24px`
- Hover: `box-shadow: 0 4px 20px rgba(0,35,70,0.10)`
- Photos: FULL COLOR (not grayscale — contrasts with CAM)
- Filter bar above grid: name search + office dropdown + practice area dropdown

*Stat/credentials strip:*
- White background, terracotta left-border accent `4px solid #B57560` on each stat block
- Stats: "Est. 1997", "500+ Lawyers", "5 Offices", "17 Practice Areas"
- Numbers: `3rem`, weight 700, `#000`
- Labels: `0.875rem`, weight 400, `#6B6B6B`
- NOT a full-width purple strip — individual stat blocks with terracotta left-border

*Insights cards:*
- White background
- Card: `border: 1px solid #e5e7eb; border-radius: 10px`
- Category tag: secondary blue `#00539B`, small pill `border-radius: 9999px`
- Title: black weight 600, `1.125rem`, 2-line clamp
- Date: muted grey, `0.8125rem`
- "Read more →" in terracotta

*Buttons:*
- Primary: `background: #B57560; color: #fff; border-radius: 9999px; height: 44px; padding: 0 28px`
- Secondary: `background: transparent; border: 2px solid #B57560; color: #B57560; border-radius: 9999px; height: 44px`
- Ghost (on dark bg): `border: 2px solid rgba(255,255,255,0.6); color: #fff; border-radius: 9999px`
- Arrow links: `color: #B57560` with `→` icon, no border-radius — these are inline text links

*Footer:*
- Dark navy background `#002346`
- Terracotta top accent: `3px solid #B57560`
- 4-column layout: logo + tagline | Expertise | Offices | Connect
- Terracotta link hover
- White text, 60% opacity for secondary items

**Motion and animation:**
- Scroll-triggered nav dark/light switch: `400ms ease` on background
- Tab switch in hero: content fade `200ms ease`
- Section entrance: `opacity: 0; translateY(16px)` → visible, `500ms ease`
- Practice card hover: `border-color + background 200ms ease`
- People card hover: `box-shadow 200ms ease`
- `prefers-reduced-motion`: all transitions disabled; tabs switch instantly

**Accessibility:**
- WCAG AA throughout: white on `#002346` = 15.3:1 ✓; white on `#B57560` = 3.8:1 (large text only — use only on 18px+ buttons)
- `#B57560` on white = 2.8:1 — fails AA at small text; use for headings 18px+ or decorative elements only
- `#6B6B6B` on white = 5.7:1 ✓
- Focus ring: `2px solid #B57560; outline-offset: 3px`
- Tab component: ARIA `tablist`, `tab`, `tabpanel` roles; keyboard left/right arrow navigation
- People filter: ARIA live region announces result count changes
- Skip to main content link

**Anti-patterns — never include:**
- Serif fonts of any kind — DM Sans only throughout
- Gold corner L-bracket decorations (that's bw_legal_01 / CAM's signature)
- Grayscale-until-hover on people photos (AZB shows full color)
- Warm ivory or maroon — wrong brand
- Star ratings, pricing, countdown timers
- `border-radius: 0` on cards — AZB uses 10px (unlike CAM's sharp zero)
- Single-color hero (flat purple) — hero uses navy with geometric pattern overlay
- Static section backgrounds — the scroll-triggered light/dark switching is architecturally essential

---

## Platform Versions

---

### Version 1 — Lovable

Build a top-tier Indian law firm website using React + Tailwind CSS. Reference: AZB & Partners design language.

**Exact colors:**
```
Navy:        #002346
Terracotta:  #B57560
Blue:        #00539B
Body text:   #6B6B6B
White:       #ffffff
```

**Font:** Import DM Sans (300/400/500/600/700) from Google Fonts.

**Components to build:**

1. **StickyNav** — white bg + border-bottom at rest. When `.dark-section` is in viewport (via IntersectionObserver), switch to `bg-[#002346]/95`. Terracotta pill "Contact" CTA right side.

2. **HeroTabs** — full viewport height, `bg-[#002346]`. Geometric ellipse SVG pattern overlay right side in `rgba(181,117,96,0.08)`. 4 tabs: Energy / Expertise / Execution / Unmatched. Active tab: white text + `border-b-2 border-[#B57560]`. Tab content: H1 in terracotta `text-[#B57560]`, subtitle white, arrow text links.

3. **CredentialsStrip** — white bg, 4 stats in a row. Each stat: `border-l-4 border-[#B57560]` accent, `pl-5`. Large black number + grey label.

4. **PracticeAreas** — `bg-[#002346]` section with pattern. 4-col grid. Cards: `bg-white/4 border border-white/10 rounded-[10px]`. Title `text-white uppercase tracking-wider text-sm font-bold`. Hover: `bg-white/8 border-[#B57560]/40`.

5. **PeopleGrid** — white section, 3-col. Cards: `border border-gray-200 rounded-[10px] p-6`. Photo square with `rounded`. Name black bold, role in terracotta uppercase small. Quote italic grey. Filter bar: name + office + practice dropdowns.

6. **Insights** — 3-col, `rounded-[10px]` cards, category pill in `#00539B`, terracotta "Read more →".

7. **Footer** — `bg-[#002346]`, `border-t-[3px] border-[#B57560]`, 4 columns.

**Critical rules:**
- DM Sans only — no serif anywhere
- All buttons: `rounded-full` (pill shape)
- Cards: `rounded-[10px]` — not 0, not 8px, exactly 10px
- People photos: FULL COLOR (not grayscale)
- No L-bracket gold corner decoration
- Terracotta (`#B57560`) on large text only — 2.8:1 contrast fails AA at small sizes

---

### Version 2 — ChatGPT Canvas

Create a Next.js 14 app router project for a top-tier Indian law firm website. Stack: Next.js, TypeScript, CSS Modules, Framer Motion.

**Brand:** Navy `#002346`, Terracotta `#B57560`, Blue `#00539B`, Grey `#6B6B6B`
**Font:** `next/font/google` — DM_Sans (300, 400, 500, 600, 700) as single font variable `--font-sans`

**File structure:**
```
src/
  app/
    layout.tsx          ← font + metadata
    page.tsx            ← section composition
    globals.css         ← 7 CSS token variables
  components/
    layout/
      StickyNav.tsx     ← dark/light section-aware nav
      Footer.tsx
    home/
      HeroTabs.tsx      ← tabbed hero with geometric pattern
      CredentialsStrip.tsx
      PracticeAreas.tsx ← dark navy section
      PeopleGrid.tsx    ← quote cards + filter bar
      Insights.tsx
    ui/
      PillButton.tsx    ← border-radius: 9999px
      TerraCottaDot.tsx ← 6px decorative dot
```

**`globals.css` tokens:**
```css
:root {
  --color-navy:       #002346;
  --color-terracotta: #B57560;
  --color-blue:       #00539B;
  --color-text:       #6B6B6B;
  --color-heading:    #000000;
  --color-surface:    #ffffff;
  --color-border:     #e5e7eb;
}
```

**Scroll-aware nav implementation:**
```typescript
// StickyNav reads IntersectionObserver on dark sections
// data-dark-section attribute on <section> elements with navy bg
// When any dark section is ≥40% in viewport → nav goes dark
useEffect(() => {
  const darkSections = document.querySelectorAll('[data-dark-section]')
  const observer = new IntersectionObserver(
    (entries) => {
      const anyDark = entries.some(e => e.isIntersecting && e.intersectionRatio >= 0.4)
      setIsDark(anyDark)
    },
    { threshold: [0.4] }
  )
  darkSections.forEach(s => observer.observe(s))
  return () => observer.disconnect()
}, [])
```

**HeroTabs:** `useState(activeTab)`, tab panels with `aria-selected`, `role="tablist"`. Tab content fade via Framer Motion `AnimatePresence`.

**Non-negotiables:** DM Sans only; 10px card radius; full-color people photos; no GoldCorner; no serif fonts.

---

### Version 3 — Bolt

Build a law firm website for AZB & Partners. Vite + React + TypeScript + plain CSS.

**Colors (strict — 7 tokens only):**
```css
--navy:        #002346;
--terracotta:  #B57560;
--blue:        #00539B;
--text:        #6B6B6B;
--heading:     #000000;
--bg:          #ffffff;
--border:      #e5e7eb;
```

**Font:** DM Sans via Google Fonts `<link>` in index.html. Weight 300/400/500/600/700.

**Components:**

`Navbar.jsx` — sticky, white+border at rest. IntersectionObserver on `[data-dark]` sections → `background: rgba(0,35,70,0.95)` when dark section is in view. Terracotta pill "Contact" right.

`HeroTabs.jsx` — `min-height: 100vh; background: var(--navy)`. SVG pattern overlay (abstract ellipses, terracotta at 5% opacity). Tabs array `['Energy','Expertise','Execution','Unmatched']`. Active tab underline: `border-bottom: 3px solid var(--terracotta)`. Tab H1 in terracotta, subtitle white.

`CredentialStrip.jsx` — white bg, 4 stat blocks each with `border-left: 4px solid var(--terracotta); padding-left: 20px`.

`PracticeGrid.jsx` — `background: var(--navy)` parent. Data attribute `data-dark` for nav observer. 4-col CSS grid. Cards: `background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px`. Hover: `background: rgba(255,255,255,0.08); border-color: rgba(181,117,96,0.4)`.

`PeopleGrid.jsx` — white section, 3-col grid. Filter bar: `<input type="search">` + `<select>` for office + practice. Cards: `border: 1px solid var(--border); border-radius: 10px; padding: 24px`. Quote in italic grey below role.

`TerraCottaDot` — `<span style="display:inline-block;width:6px;height:6px;background:#B57560;border-radius:50%;margin-right:8px"/>`.

`Footer.jsx` — `background: var(--navy); border-top: 3px solid var(--terracotta)`.

**Forbidden:** Serif fonts, gold L-brackets, grayscale photos, 0px card radius, `border-radius: 0` on cards.

---

### Version 4 — v0

Create a law firm homepage for AZB & Partners — one of India's top-tier legal practices.

**Design specification:**

Color tokens:
```
navy:        #002346  (hero, dark sections, footer)
terracotta:  #B57560  (headings, dots, CTA buttons, accents — large text only)
blue:        #00539B  (links, insight category tags)
text:        #6B6B6B  (body copy)
heading:     #000000  (light-bg headings)
surface:     #ffffff
border:      #e5e7eb
```

Font: **DM Sans** only — weights 300/400/500/600/700. No serif.

**Sections in order:**
1. Sticky nav — white at rest, dark navy when dark section in viewport, terracotta "Contact" pill right
2. Hero — full vh, navy bg, geometric ellipse SVG pattern, 4 tabs, active tab H1 in terracotta
3. Credentials strip — white, 4 stats with terracotta left-border accents
4. Practice areas — navy section (`data-dark-section`), 4-col grid, cards with 10px radius
5. People grid — white section, 3-col, quote cards, filter bar
6. Insights — 3-col, 10px radius cards, blue category pills, terracotta "Read more"
7. Footer — navy bg, terracotta top border

**Key patterns:**

Terracotta dot separator:
```css
.dotAccent::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #B57560;
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
}
```

Practice card on dark:
```css
.card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 28px;
  transition: background 200ms, border-color 200ms;
}
.card:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(181,117,96,0.4);
}
```

Quote card:
```css
.quoteCard {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 24px;
}
.quote {
  font-style: italic;
  color: #6B6B6B;
  font-size: 0.9375rem;
  line-height: 1.65;
  margin-top: 12px;
}
```

Do not include: serif fonts, star ratings, grayscale photos, gold L-brackets, pricing, countdown timers.

---

### Version 5 — Claude Artifacts

Build `bw_legal_02` — AZB & Partners-style law firm website. Next.js 14 App Router, TypeScript strict, CSS Modules, Framer Motion. Static export.

**Color tokens (`globals.css`):**
```css
:root {
  --color-navy:       #002346;  /* Dark navy — hero, dark sections, footer */
  --color-terracotta: #B57560;  /* Terracotta — headings, accents, CTAs (large text only) */
  --color-blue:       #00539B;  /* Secondary blue — links, insight tags */
  --color-text:       #6B6B6B;  /* Body text grey */
  --color-heading:    #000000;  /* Strong headings on white */
  --color-surface:    #ffffff;  /* Light backgrounds */
  --color-border:     #e5e7eb;  /* Card borders, separators */
}
```

**`src/types/index.ts`:**
```typescript
export type TabId = 'energy' | 'expertise' | 'execution' | 'unmatched'

export interface HeroTab {
  id: TabId
  label: string
  headline: string
  subheading: string
  body: string
  ctaLabel: string
  ctaHref: string
}

export interface PracticeArea {
  id: string
  title: string      // UPPERCASE in display
  description: string
  slug: string
}

export interface Person {
  id: string
  name: string
  role: string       // "Senior Partner", "Partner"
  practice: string
  office: string
  image: string
  quote: string      // "What drives my practice is..."
}

export interface Insight {
  id: string
  title: string
  category: 'Legal Update' | 'Client Alert' | 'Thought Leadership' | 'Publication'
  date: string
  image: string
  slug: string
}

export interface Stat {
  value: string    // "500+" stored as string (includes suffix)
  label: string
}
```

**Build sequence:**

1. `globals.css` — 7 tokens + font variable + container + reset
2. `layout.tsx` — DM_Sans from next/font/google, weights 300–700
3. `PillButton.tsx` — 3 variants, `border-radius: 9999px`
4. `TerraCottaDot.tsx` — 6px decorative circle inline component
5. `StickyNav.tsx` — dark/light section-aware (IntersectionObserver on `[data-dark-section]`)
6. `HeroTabs.tsx` — tabbed full-vh hero on navy bg, animated tab content
7. `CredentialsStrip.tsx` — 4 stats with terracotta left-border
8. `PracticeAreas.tsx` — navy section, 4-col grid, ghost cards
9. `PeopleGrid.tsx` — white section, quote cards, filter bar (name + office + practice)
10. `Insights.tsx` — 3-col, 10px radius, blue category tags
11. `Footer.tsx` — navy, terracotta top border, 4 columns
12. `page.tsx` — compose; add `data-dark-section` attr to navy sections

**Non-negotiables:**
- `border-radius: 9999px` on all buttons
- `border-radius: 10px` on all cards (NOT 0, NOT 4px)
- DM Sans only — no serif anywhere
- People photos: full color (NOT grayscale)
- Terracotta only on text ≥18px (2.8:1 contrast fails AA at small sizes)
- Dark section nav switch via IntersectionObserver, not scroll position

---

### Version 6 — Grok

Implement `bw_legal_02`: AZB & Partners law firm site. Next.js 14 + TypeScript + CSS Modules + Framer Motion. Static export.

**Tokens:** `--color-navy: #002346`, `--color-terracotta: #B57560`, `--color-blue: #00539B`, `--color-text: #6B6B6B`, `--color-heading: #000`, `--color-surface: #fff`, `--color-border: #e5e7eb`

**Architecture:**
```
src/
  types/index.ts           ← HeroTab, PracticeArea, Person, Insight, Stat
  lib/data.ts              ← mock arrays
  app/layout.tsx           ← DM_Sans next/font
  app/page.tsx             ← section composition with data-dark-section attrs
  app/globals.css          ← tokens + reset
  components/
    layout/StickyNav.tsx   ← IntersectionObserver dark-aware nav
    layout/Footer.tsx
    ui/PillButton.tsx      ← 9999px radius
    ui/TerraCottaDot.tsx   ← 6px circle
    home/HeroTabs.tsx      ← tabbed, navy bg, Framer AnimatePresence
    home/CredentialsStrip.tsx
    home/PracticeAreas.tsx ← navy section, data-dark-section
    home/PeopleGrid.tsx    ← filter + quote cards
    home/Insights.tsx
```

**Dark-section nav toggle:**
```typescript
// StickyNav.tsx
const [isDark, setIsDark] = useState(false)
useEffect(() => {
  const sections = document.querySelectorAll('[data-dark-section]')
  const obs = new IntersectionObserver(
    (entries) => setIsDark(entries.some(e => e.isIntersecting)),
    { threshold: 0.3 }
  )
  sections.forEach(s => obs.observe(s))
  return () => obs.disconnect()
}, [])
```

**Hero tabs (Framer Motion):**
```typescript
// HeroTabs.tsx
const [active, setActive] = useState<TabId>('energy')
// AnimatePresence around tab content panels
// Tab buttons: aria-selected, role="tab", keyboard left/right
// Content: role="tabpanel", aria-labelledby
```

**Practice card on dark bg:**
```css
.card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transition: background 200ms, border-color 200ms;
}
.card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(181, 117, 96, 0.4);
}
```

**Filter bar (people):**
```typescript
const [nameQuery, setNameQuery] = useState('')
const [officeFilter, setOfficeFilter] = useState('all')
const [practiceFilter, setPracticeFilter] = useState('all')
const filtered = people.filter(p =>
  p.name.toLowerCase().includes(nameQuery.toLowerCase()) &&
  (officeFilter === 'all' || p.office === officeFilter) &&
  (practiceFilter === 'all' || p.practice === practiceFilter)
)
```

Enforce: DM Sans only; 10px cards; pill buttons; no serif; no grayscale photos; terracotta on large text only.

---

### Version 7 — Gemini

Design and implement a prestigious law firm website for AZB & Partners.

**Visual identity:**
- Dark navy `#002346` commands institutional depth — used for hero, practice area section, footer
- Terracotta `#B57560` signals approachable authority — used for headings, accents, CTA buttons
- The two together create warmth-within-formality: less cold than pure navy, less traditional than purple
- Single font: DM Sans across all weights — no serif/sans split; clean and modern
- 10px card border-radius — slightly soft, not angular like CAM, not fully rounded
- Full-color people photos — the firm leads with personal warmth, not restraint

**Core design architecture:**

The defining pattern of this site is the scroll-triggered light/dark alternation. Dark navy sections (hero, practice areas, footer) alternate with white sections (credentials, people, insights). The sticky nav adapts between white and dark navy as the user scrolls, using IntersectionObserver on dark sections.

**Tabbed hero:**
Four tabs represent the firm's positioning: "Energy" / "Expertise" / "Execution" / "Unmatched". Each tab reveals a distinct headline (in terracotta) and supporting content. Tab switching uses Framer Motion AnimatePresence for smooth content transitions. Active tab indicated by terracotta underline.

**Practice areas on dark navy:**
Cards use `rgba(255,255,255,0.04)` background with `rgba(255,255,255,0.1)` borders — subtle ghost cards. Titles are uppercase white. Hover: subtle background lightening + terracotta border tint. Terracotta decorative dots (`6px` circles) used as accent separators.

**People with quote-led profiles:**
Each person card leads with their practice role (in terracotta) then a personal quote in italic grey — "What drives my practice is..." This is a fundamentally different people presentation from firms that show only credentials.

**Accessibility:**
- WCAG: white on `#002346` = 15.3:1 ✓; `#6B6B6B` on white = 5.7:1 ✓
- Terracotta `#B57560` on white = 2.8:1 — use only on text ≥18px or as decorative
- Hero tabs: full ARIA tablist/tab/tabpanel pattern, keyboard arrow navigation
- Focus ring: `2px solid #B57560` offset `3px`

**Do not include:** serif fonts, gold L-brackets (CAM's signature), grayscale photos by default, 0px card radius, star ratings, pricing, countdown timers.

---

### Version 8 — Cursor

**Project:** `bw_legal_02` — AZB & Partners law firm site
**Stack:** Next.js 14 App Router + TypeScript + CSS Modules + Framer Motion
**Export:** Static (`output: 'export'`)

**CLAUDE.md for this build:**
```
Color tokens (globals.css — 7 tokens):
  --color-navy:       #002346  ← Hero, dark sections, footer
  --color-terracotta: #B57560  ← Headings, accents, CTAs (18px+ text only)
  --color-blue:       #00539B  ← Links, insight category tags
  --color-text:       #6B6B6B  ← All body copy
  --color-heading:    #000000  ← Strong headings on white bg
  --color-surface:    #ffffff  ← Light section backgrounds
  --color-border:     #e5e7eb  ← Card borders

Font: DM Sans only (300/400/500/600/700) — NO serif anywhere

Card rule: border-radius: 10px on ALL cards
Button rule: border-radius: 9999px on ALL buttons
Photo rule: FULL COLOR people photos (NOT grayscale)
Nav rule: white at rest → rgba(0,35,70,0.95) when dark section (≥30% viewport)
Dark sections: hero, practice areas, footer — add data-dark-section attribute
Terracotta rule: only on text/elements ≥18px tall (2.8:1 contrast, fails small text AA)
```

**Types (`src/types/index.ts`):**
- `TabId`: union of 4 hero tab values
- `HeroTab`: id, label, headline, subheading, body, ctaLabel, ctaHref
- `PracticeArea`: id, title, description, slug (title displayed UPPERCASE)
- `Person`: id, name, role, practice, office, image, quote
- `Insight`: id, title, category (4-value union), date, image, slug
- `Stat`: value (string, includes suffix), label

**Build sequence:**
1. `globals.css` — 7 tokens + `--font-sans` + `--container` + reset
2. `layout.tsx` — DM_Sans from next/font/google
3. `PillButton.tsx` — primary/secondary/ghost, `border-radius: 9999px`
4. `TerraCottaDot.tsx` — `6px × 6px`, `border-radius: 50%`, `background: var(--color-terracotta)`
5. `StickyNav.tsx` — IntersectionObserver on `[data-dark-section]`, dark/light states
6. `HeroTabs.tsx` — full-vh navy, 4 tabs, Framer Motion AnimatePresence content
7. `CredentialsStrip.tsx` — white bg, 4 stats, terracotta left-border on each block
8. `PracticeAreas.tsx` — navy bg, `data-dark-section`, 4-col grid, ghost cards
9. `PeopleGrid.tsx` — white bg, filter bar, 3-col quote cards
10. `Insights.tsx` — 3-col, 10px radius, blue pills, terracotta "Read more"
11. `Footer.tsx` — navy, `border-top: 3px solid var(--color-terracotta)`
12. `page.tsx` — compose with `data-dark-section` on dark sections

**Gate:** `tsc --noEmit` clean, `npm run build` succeeds, no hex in CSS module files, 10px card radius confirmed, pill buttons confirmed, DM Sans confirmed in DevTools, no serif anywhere.
```
