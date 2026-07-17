# 04 — Build Plan
## Top-Tier Indian Law Firm · bw_legal_platform_02

4-day plan. Each day ends with a demonstrable working state.

---

## Day 1 — Foundation + Shell

**Goal:** Project setup, tokens, font, sticky nav with section-aware dark state, footer.

| # | Task | Done when |
|---|------|-----------|
| 1 | `npx create-next-app@latest` — TypeScript, App Router, CSS Modules, src/ dir, no Tailwind | `npm run dev` starts |
| 2 | Install deps: `framer-motion lucide-react` | Installed |
| 3 | `src/types/index.ts` — `TabId`, `HeroTab`, `PracticeArea`, `Person`, `Insight`, `Stat`, `Office` type | `tsc --noEmit` clean |
| 4 | `src/app/globals.css` — 7 `--color-*` tokens + `--font-sans` + `--container` + `--section-pad` + reset | Tokens accessible in DevTools |
| 5 | `src/lib/data.ts` — 4 heroTabs, 17 practiceAreas, 9 people, 6 insights, 4 stats | All imports compile |
| 6 | `src/app/layout.tsx` — DM_Sans from `next/font/google`, weights 300/400/500/600/700 | DevTools shows DM Sans in computed styles |
| 7 | `src/components/ui/PillButton.tsx` + CSS — 3 variants, 2 sizes, `border-radius: 9999px` | Renders; pill shape confirmed |
| 8 | `src/components/layout/StickyNav.tsx` — white state + dark state, IntersectionObserver on `[data-dark-section]` | Nav visible; dark state works when test dark section added |
| 9 | `src/components/layout/Footer.tsx` — navy bg, `border-top: 3px solid var(--color-terracotta)`, 4 columns | Footer renders; terracotta top border visible |
| 10 | Mount StickyNav + Footer in `layout.tsx` | Both on every page |

**Gate:** Nav white at page top; add a `<section data-dark-section style="background:#002346;height:200vh"></section>` to `page.tsx` → nav turns dark when this section enters view. Footer dark navy with terracotta top border. Pill button is pill-shaped.

---

## Day 2 — Hero + Credentials + Practice Areas

**Goal:** Dark navy sections complete. The alternating dark/light architecture visible.

| # | Task | Done when |
|---|------|-----------|
| 1 | `src/components/home/HeroTabs.tsx` — full-vh navy bg, `data-dark-section`, geometric pattern overlay | Hero fills viewport; nav turns dark |
| 2 | HeroTabs: 4 tab buttons with `role="tablist"` and `role="tab"` ARIA | Tab bar visible |
| 3 | HeroTabs: active tab — terracotta underline `3px`, white weight 600 | Active underline confirmed |
| 4 | HeroTabs: tab content with Framer Motion `AnimatePresence` fade 200ms | Content fades on tab switch |
| 5 | HeroTabs: H1 in terracotta `var(--color-terracotta)`, `clamp(2.75rem,5.5vw,4.5rem)` | Terracotta headline confirmed in DevTools |
| 6 | HeroTabs: keyboard left/right arrow navigation between tabs | Arrow keys cycle tabs |
| 7 | `src/components/home/CredentialsStrip.tsx` — white bg, 4 stats, terracotta left-border on each | Strip renders; left-border visible |
| 8 | `src/components/home/PracticeAreas.tsx` — navy bg, `data-dark-section`, 4-col grid | Dark section renders |
| 9 | Practice cards: `border-radius: 10px`, ghost background on navy | 10px radius confirmed; ghost card visible |
| 10 | Practice card hover: background lightens, terracotta border tint | Hover works |
| 11 | Practice section: terracotta dot + section label before heading | Dot visible |
| 12 | Compose Hero + CredentialsStrip + PracticeAreas in `page.tsx` | All 3 sections render |

**Gate:** Page top: hero tabs, nav dark. Scroll to credentials: nav turns white. Scroll to practice areas: nav turns dark again. Practice cards have 10px radius, ghost bg, uppercase titles.

---

## Day 3 — People + Insights + Animations

**Goal:** All homepage sections complete. Filter bar working. Scroll entrance animations.

| # | Task | Done when |
|---|------|-----------|
| 1 | `src/components/home/PeopleGrid.tsx` — white section, filter bar (name + office + practice) | Filter bar renders |
| 2 | People filter: `useMemo` on filtered array; live (no submit button) | Typing in name search filters instantly |
| 3 | People filter: office and practice dropdowns work independently | Dropdowns filter correctly |
| 4 | People filter: Reset button clears all | Reset works |
| 5 | People filter: ARIA live region announces filtered count | Screen reader support |
| 6 | People grid: 3-col, 10px radius cards, full-color photos | Photos NOT grayscale — confirmed |
| 7 | People card: name black, role terracotta uppercase, practice grey, quote italic with terracotta left-border | All elements present |
| 8 | `src/components/home/Insights.tsx` — 3-col, 10px radius, blue category pills, terracotta "Read more" | Insights render |
| 9 | Framer Motion `whileInView` fade-up on CredentialsStrip, PracticeAreas, PeopleGrid, Insights | Sections animate in |
| 10 | `prefers-reduced-motion` verified: no transforms, instant visibility | Confirmed in DevTools motion setting |
| 11 | Compose all sections in `page.tsx` | Full homepage scrolls correctly |

**Gate:** Filter "Mumbai" → only Mumbai people shown; ARIA live region updates. People photos are full color. Quote cards have terracotta left-border on quote text. Insights have blue pills (not terracotta). Scroll animations on entry.

---

## Day 4 — Audit + Polish

**Goal:** `tsc` clean, build passes, all design rules verified.

| # | Task | Done when |
|---|------|-----------|
| 1 | `tsc --noEmit` → fix any type errors | Zero errors |
| 2 | `npm run build` | Build succeeds |
| 3 | Grep: no hex in CSS Module files | Zero results |
| 4 | DevTools: ALL buttons `border-radius: 9999px` | Confirmed |
| 5 | DevTools: ALL cards `border-radius: 10px` (not 0, not 8px) | Confirmed — practice, people, insight cards |
| 6 | DevTools: no element has `filter: grayscale` on people photos | Confirmed full color |
| 7 | DevTools: no serif font in computed styles | DM Sans only confirmed |
| 8 | DevTools: terracotta `#B57560` not used on any text element <18px | Inspect small elements |
| 9 | Nav dark/light: scroll through all sections — nav correctly reflects current section background | Manual verification |
| 10 | Hero tab keyboard navigation: arrow keys cycle tabs | Confirmed |
| 11 | Hero tab ARIA: `aria-selected`, `role="tabpanel"`, `aria-labelledby` correct | DevTools Accessibility tree |
| 12 | No GoldCorner `::before` L-bracket anywhere | Visual inspection |
| 13 | No countdown timers, no star ratings, no pricing | Visual inspection |
| 14 | Lighthouse ≥90/90 | Run and confirm |

**Gate checklist:**
- [ ] Nav correctly dark over navy sections, white over white sections
- [ ] 4 tabs in hero; active tab has terracotta underline
- [ ] H1 headline is terracotta (not white, not black)
- [ ] Credentials strip: white bg, terracotta left-border per stat
- [ ] Practice cards: 10px radius, ghost bg, uppercase titles, terracotta arrows
- [ ] People photos: full color (no grayscale)
- [ ] People filter: name + office + practice work independently
- [ ] Quote text has terracotta left-border
- [ ] Insight category tags are blue (`#00539B`), pill-shaped
- [ ] Footer: navy bg, terracotta top border
- [ ] DM Sans only — no serif anywhere
- [ ] Pill buttons: `border-radius: 9999px`
- [ ] Cards: `border-radius: 10px`
- [ ] `data-dark-section` on hero and practice sections
- [ ] `tsc --noEmit` clean
- [ ] Lighthouse ≥90/90

---

### Cut Order

**Never cut:**
- HeroTabs with keyboard left/right navigation + ARIA (`role="tablist"`, `aria-selected`) — core interactive identity
- `data-dark-section` IntersectionObserver nav switching (brand differentiator — nav reacts to section bg)
- PeopleGrid with 3-filter bar + `useMemo` (key discovery feature)

**Cut first if time-constrained:**
- Insights section
- Individual person quote cards (keep cards, remove quote text block)
- Office directory list

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Nav dark/light state not reflecting correct section | High | High | IntersectionObserver on `[data-dark-section]` — test by scrolling through all sections; nav must switch at each boundary |
| Hero H1 in white or black instead of terracotta | High | High | H1 must be `var(--color-terracotta)` (`#B57560`); verify computed color in DevTools |
| Cards given wrong border-radius | Medium | High | All cards: `border-radius: 10px` — NOT 0, NOT 8px, NOT 9999px; verify in DevTools |
| Tab keyboard navigation missing (arrow keys) | Medium | High | Left/right arrow keys must cycle tabs with `aria-selected` update; test manually |
| People photos accidentally grayscale | Medium | Medium | Unlike bw_legal_01, people photos are full-colour; `filter: grayscale` must NOT appear anywhere |
| Terracotta used on small text (<18px) | Low | High | `#B57560` = 3.0:1 on white — large/bold text only; inspect all small terracotta text elements |
| CSS token leak (hex in .module.css) | Medium | Medium | Run `grep -r "#[0-9A-Fa-f]" src --include="*.module.css"` before every commit |
