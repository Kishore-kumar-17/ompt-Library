# 05 — Epics and Stories
## Interactive 3D World Portfolio · portfolio_platform_01

---

## Epic 1 — Foundation

**Goal:** Working project with design tokens, routing, typed content, and Zustand store.

### Stories

**STORY-001: Project bootstrap**
As a developer, I need the project configured with Vite + React + TypeScript + Tailwind + R3F dependencies so that all subsequent work has a stable base.

Acceptance criteria:
- `tsc --noEmit` passes with zero errors
- Tailwind configured with Amatic SC + Nunito in `fontFamily`
- All CSS custom properties from 03_Design.md in `index.css`
- React Router renders 5 routes: `/`, `/about`, `/projects`, `/skills`, `/contact`

**STORY-002: Content data**
As a developer, I need all portfolio content in a single typed file so that there is one source of truth for all panel content.

Acceptance criteria:
- `src/data/content.ts` exports: `owner`, `projects[]`, `skills`, `contact`
- `projects` array: each item has `id`, `title`, `description`, `stack: string[]`, `liveUrl`, `githubUrl`, optional `imageUrl`
- `skills`: object with category keys (`languages`, `frameworks`, `tools`, `creative`)
- All fields typed with TypeScript interfaces in `src/types/index.ts`

**STORY-003: Zustand world store**
As a developer, I need a Zustand store managing scene state so that 3D and 2D components share state without prop drilling.

Acceptance criteria:
- `useWorldStore` exports: `isLoaded`, `loadProgress`, `activeZone`, `carPosition`, `musicEnabled`, `isPanelOpen`
- Actions: `setLoaded`, `setLoadProgress`, `setActiveZone`, `setCarPosition`, `toggleMusic`, `openPanel`, `closePanel`
- `musicEnabled` persisted to localStorage (defaults to `false`)

---

## Epic 2 — 3D World

**Goal:** Navigable physics world with terrain, decorations, car, and camera.

### Stories

**STORY-004: R3F canvas and physics setup**
As a developer, I need the 3D canvas with Rapier physics initialised so that the world can host physical objects.

Acceptance criteria:
- `<Canvas>` fills 100vw × 100vh (no overflow)
- `<Physics>` wraps the scene with `gravity={[0, -9.81, 0]}`
- `<Suspense>` with `useProgress` tracks load progress → updates `worldStore.loadProgress`
- Scene renders without WebGL errors in console

**STORY-005: World terrain and decorations**
As a visitor, I want to see a handcrafted low-poly world so that the portfolio feels crafted rather than generated.

Acceptance criteria:
- Terrain: `<RigidBody type="fixed"><mesh rotation={[-π/2,0,0]}><planeGeometry args={[100,100]}/>` in `#C8A573`
- Road paths: dark box strips `#3D3D3D` between zone positions
- Trees: 8–12 placed around world (tall box trunk `#4A7C59` + short wide box canopy)
- Rocks: 4–6 low cylinder geometry in `#8B7355`
- Ambient + directional light `color="#FFD89B"` from position `[10,20,10]`
- `<fog args={['#1B2A4A', 40, 80]}/>` on scene
- `<Sky sunPosition={[10,2,5]}/>` from Drei

**STORY-006: Car with physics and controls**
As a visitor, I want to drive a car with WASD keys so that navigating the world feels tactile and fun.

Acceptance criteria:
- Car: 2 box meshes (body + cabin) + 4 cylinder wheels, all `#E84B30`
- `<RigidBody>` with `linearDamping={5}`, `angularDamping={5}`, `mass={1}`
- WASD + arrow key controls via `useKeyboard` hook
- Speed: 12 world units/s forward/back; 12 left/right
- Car position written to `worldStore.setCarPosition` on every frame

**STORY-007: Third-person camera**
As a visitor, I want the camera to follow my car smoothly so that I always have a clear view of where I'm going.

Acceptance criteria:
- Camera starts 8 units behind car, 4 units above
- `camera.position.lerp(target, 0.08)` every frame
- `camera.lookAt(carPos.x, carPos.y + 1, carPos.z)` every frame
- No camera jitter when car is stationary
- Camera does not clip through terrain

**STORY-008: World boundary walls**
As a developer, I need invisible walls at the world edges so that the car cannot escape the playable area.

Acceptance criteria:
- 4 `<RigidBody type="fixed">` walls with `<CuboidCollider>` at world edges (x/z ±50)
- No visible mesh on boundary walls
- Car rebounds naturally from wall (Rapier handles impulse)
- Car cannot pass through any wall at any speed

---

## Epic 3 — Zone System

**Goal:** Glowing zone markers with proximity detection and animated panel display.

### Stories

**STORY-009: Zone markers**
As a visitor, I want to see glowing amber rings marking each content zone so that I know where to drive.

Acceptance criteria:
- 4 torus rings placed at zone positions from `ZONES` constants
- Material: `meshStandardMaterial color="#E8A23C" emissive="#E8A23C" emissiveIntensity={1.2}`
- Slow rotation animation (Y axis, 0.3 rad/s) to draw attention
- Drei `<Text>` floating 3 units above ring, Amatic SC 700, amber — zone.label text
- Rings pulse with subtle scale animation (1.0 → 1.05 → 1.0, 2s cycle)

**STORY-010: Proximity detection**
As a visitor, I want the portfolio content to appear when I drive near a zone so that discovery feels natural.

Acceptance criteria:
- `useProximity` hook runs on every frame via `useFrame`
- Computes `distance3D(carPosition, zone.position)` for each zone
- If distance < 8 AND `activeZone !== zone.id` → `setActiveZone(zone.id)`
- If no zone within 8 units AND `activeZone !== null` → `setActiveZone(null)`
- Zone change debounced by 0 (instant — no delay needed, Rapier handles smooth approach)

**STORY-011: ZonePanel component**
As a visitor, I want a beautiful floating panel to appear with portfolio content so that I can read it comfortably.

Acceptance criteria:
- `<AnimatePresence>` wraps the panel — only renders when `activeZone !== null`
- Framer Motion: `initial={{ y: 60, opacity: 0 }}` → `animate={{ y: 0, opacity: 1 }}` → `exit={{ y: 60, opacity: 0 }}`
- Panel: glassmorphic, 440px desktop / 92vw mobile, bottom-centered, max-height 70vh, scroll inside
- ✕ button: top-right of panel, calls `setActiveZone(null)`
- Escape key listener: calls `setActiveZone(null)`
- Click-outside: `useEffect` attaches click handler to document, ignores clicks inside panel ref
- Panel renders child based on `activeZone`: `<AboutPanel>`, `<ProjectsPanel>`, `<SkillsPanel>`, `<ContactPanel>`

---

## Epic 4 — Content Panels

**Goal:** All 4 zone panels with correct content from content.ts.

### Stories

**STORY-012: AboutPanel**
As a potential employer, I want to read a clear bio so that I understand who this developer is.

Acceptance criteria:
- Shows: owner name (Amatic SC, amber), tagline, bio paragraphs, years of experience, location
- Optional: circular photo (80px, border 2px solid amber)
- All text from `content.owner`
- Font: Nunito 400 for body, Amatic SC for name heading

**STORY-013: ProjectsPanel**
As a potential employer, I want to see projects with links so that I can evaluate the developer's work.

Acceptance criteria:
- Shows all projects from `content.projects` (3–6 items)
- Each card: project title (Nunito 600), description (Nunito 400, 2–3 lines), tech tags (amber badges), "Live ↗" link, "GitHub" link
- Cards separated by `rgba(240,235,224,0.1)` divider line
- Tag format: `#tagname` in amber small badge (`rounded-[6px]`)
- Links open in new tab (`target="_blank" rel="noopener"`)
- Panel scrollable if > 2 projects

**STORY-014: SkillsPanel**
As a potential employer, I want to see the developer's skills as a tag cloud so that I can scan quickly.

Acceptance criteria:
- Skills grouped by category: Languages, Frameworks, Tools, Creative (headings from `content.skills` keys)
- Category heading: Amatic SC, amber, smaller (1.2rem)
- Tags: amber badge style matching tech stack tags
- All tags from `content.skills` data
- Responsive wrap: tags wrap on mobile

**STORY-015: ContactPanel**
As a visitor who wants to get in touch, I want contact information presented clearly so that I can reach the developer.

Acceptance criteria:
- Email: obfuscated (split and rejoined in JS, never plain string in HTML source)
- Availability status from `content.contact.availability` (e.g. "Open to opportunities")
- GitHub + LinkedIn links with icon + label
- All links open in new tab
- CTA button "Send me a message": `mailto:` link, pill button, amber border outline

---

## Epic 5 — UI Shell

**Goal:** Loading screen, HUD, and music toggle.

### Stories

**STORY-016: LoadingScreen**
As a visitor, I want a polished loading experience so that I don't see a blank screen or broken 3D.

Acceptance criteria:
- Full-viewport overlay `background: #0A0C14`
- Creator name centered, Amatic SC 700, 52px, `#F0EBE0`
- Tagline below, Nunito 400, 15px, muted
- Progress bar: 200px wide, amber fill, updates with `loadProgress`
- Hint text: "WASD to drive" below bar
- Fades out over 600ms when `isLoaded = true`, then unmounts

**STORY-017: HUD and music toggle**
As a visitor, I want to know whose portfolio I'm in and how to drive so that the experience is immediately understandable.

Acceptance criteria:
- Top-left: creator name (Amatic SC 700, 26px, `#F0EBE0`) + tagline (Nunito 400, 13px, muted)
- Bottom-center: "WASD / ↑↓←→ to drive · Drive to a glowing ring" — fades to 0 opacity after 8 seconds (CSS transition)
- Top-right: music toggle button (♪ icon, pill, 36px) — amber when ON, muted when OFF
- HUD has `pointer-events: none` except on music toggle
- `z-index: 10` — above canvas, below panels

---

## Epic 6 — Audio

**Goal:** Immersive audio with correct default state.

### Stories

**STORY-018: Engine and collision audio**
As a visitor, I want to hear the car engine and feel collision feedback so that driving feels physical.

Acceptance criteria:
- Engine sound: loops when car is moving; stops/mutes when stationary
- Engine pitch: `rate = 0.8 + (speed / MAX_SPEED) * 0.4`
- Collision sound: plays once on RigidBody collision event (Rapier `onCollisionEnter`)
- Both sounds muted on initial load — only play after first user interaction

**STORY-019: Ambient music**
As a visitor, I want optional background music that enhances the mood so that the world feels alive without being intrusive.

Acceptance criteria:
- Music: OFF by default — never plays on load without user action
- Toggle button switches `musicEnabled` in Zustand store (persisted to localStorage)
- `useEffect` on `musicEnabled`: plays or pauses `ambientMusic` Howler instance
- Volume: 0.3 (never louder)
- Music fades in over 2 seconds when enabled (Howler `.fade()`)

---

## Epic 7 — Mobile & Accessibility

**Goal:** Touch controls, responsive panels, accessible fallback routes.

### Stories

**STORY-020: Mobile joystick**
As a mobile visitor, I want to drive using an on-screen joystick so that I can experience the portfolio on my phone.

Acceptance criteria:
- Joystick renders only on touch devices (`'ontouchstart' in window`)
- Position: fixed, bottom-left, 24px from edges
- Outer ring: 80px, `rgba(240,235,224,0.15)` border + transparent fill
- Inner dot: 36px, `#E8A23C`
- Touch delta from outer ring center maps to car directional input
- Joystick does not overlap ZonePanel (joystick bottom-left; panel bottom-center)

**STORY-021: Responsive panels**
As a mobile visitor, I want zone panels to be readable on my phone so that I can access all content.

Acceptance criteria:
- Panel: `max-width: 92vw` on all screen sizes
- Panel: `max-height: 70vh`, overflow-y scroll
- Tech tags wrap to multiple lines (flex-wrap)
- Project titles don't truncate — wrap onto 2 lines if needed
- Buttons full-width on screens < 400px

**STORY-022: Accessible fallback routes**
As a screen reader user or someone without WebGL, I need all portfolio content accessible without 3D so that I'm not excluded.

Acceptance criteria:
- `/about`, `/projects`, `/skills`, `/contact` render readable static pages
- No Three.js or physics code loaded on these routes (lazy import `World3D`)
- Semantic HTML: `<main>`, `<h1>`, `<ul>`, `<article>` as appropriate
- Keyboard navigable: tab order logical, focus visible
- Skip-nav link at top of `/` route: "Skip to accessible content"
- Lighthouse accessibility ≥ 90 on all fallback routes

---

## Epic 8 — Testing & Quality Assurance

**Goal:** Verify all critical user paths, guard against regressions on music default, panel close, boundary walls, and content rendering.

### Stories

**STORY-023: Proximity detection edge cases**
As a developer, I need the proximity system to handle rapid movement and simultaneous zone adjacency correctly so that panels do not flicker or double-open.

Acceptance criteria:
- Car driving between two zones at max speed triggers at most one zone change per frame
- Driving out of a zone while panel is open closes the panel (setActiveZone → null)
- If car spawns within 8 units of a zone on load, panel does NOT open until after `isLoaded = true`
- `activeZone` never holds two values simultaneously (state is `string | null`)
- Verified by: drive to zone boundary and oscillate in/out — panel must not flicker more than once per crossing

**STORY-024: ZonePanel three-close-paths integration test**
As a developer, I need all three panel close methods verified so that no close path silently breaks in a refactor.

Acceptance criteria:
- ✕ button: click fires `closePanel()` and `setActiveZone(null)`; panel exits via `AnimatePresence`
- Escape key: `keydown` listener triggers `closePanel()`; listener removed on unmount (no memory leak)
- Click-outside: clicking the canvas (not panel) triggers `closePanel()`; clicking inside panel does NOT close it
- All three methods must leave `activeZone === null` and `isPanelOpen === false` in Zustand
- Verified by: open panel, use each close method in sequence, confirm store state after each

**STORY-025: Music default state verification**
As a developer, I need the music-off default to be guaranteed by tests so that autoplay policy errors never surface in production.

Acceptance criteria:
- On fresh load (no localStorage), `musicEnabled = false` and no audio plays
- After `toggleMusic()`, `musicEnabled = true` and `ambientMusic.play()` is called
- After page reload with localStorage set, `musicEnabled` restores from stored value
- Howler `ambientMusic` instance: `autoplay: false` in constructor — verified by code search
- QA grep: `grep -r "autoplay: true" src/` must return zero results

**STORY-026: Boundary wall stress test**
As a developer, I need boundary walls verified at high speed and corner impacts so that the car cannot clip through under any condition.

Acceptance criteria:
- Drive car directly at each of the 4 walls at max speed — car rebounds, does not pass through
- Drive into each corner at 45-degree angle — car rebounds correctly
- No physics explosion (car flying upward) on wall collision at any speed
- Walls are invisible: `grep -r "CuboidCollider" src/components/world/Boundary.tsx` shows no `<mesh>` sibling

**STORY-027: Cross-browser and device compatibility**
As a developer, I need the core experience to work on Chrome, Safari, and Firefox so that visitors on any browser can use the portfolio.

Acceptance criteria:
- `backdrop-filter: blur(14px)` works on Safari: `-webkit-backdrop-filter` present on `.zone-panel`
- Howler audio works on iOS Safari (requires user gesture — engine sound starts after first `pointerdown`)
- Canvas renders on Firefox without WebGL2 errors
- Mobile joystick touch events work on iOS Safari and Android Chrome
- Verified by: test suite on BrowserStack or manual device test log

---

## Epic 9 — Performance Budget

**Goal:** Maintain 60fps on desktop mid-range GPU, 30fps on 4-year-old Android; bundle < 500kb initial; Lighthouse ≥ 90 on fallback routes.

### Stories

**STORY-028: Frame rate budget and draw call limit**
As a developer, I need the 3D scene to run at ≥ 60fps on desktop and ≥ 30fps on mobile so that driving feels smooth.

Acceptance criteria:
- Chrome DevTools performance trace: average frame time ≤ 16.7ms on desktop (MacBook Pro M1 baseline)
- Draw calls: ≤ 20 total (trees/rocks use `<InstancedMesh>`)
- Shadow maps: car body + 2 buildings only — all other objects have `castShadow={false}`
- Bloom post-processing disabled if `navigator.hardwareConcurrency < 4`
- `<fog>` present — culls distant objects automatically
- Verified by: Chrome DevTools → Performance → Record 10s of driving → check "Frames" panel

**STORY-029: Bundle size audit**
As a developer, I need the initial JS bundle to load quickly so that visitors on slower connections don't abandon before the 3D experience starts.

Acceptance criteria:
- `World3D.tsx` and all Three.js code is inside a `React.lazy()` + `<Suspense>` boundary
- Fallback routes (`/about`, `/projects`, `/skills`, `/contact`) load zero Three.js code
- `vite-bundle-analyzer` (or `rollup-plugin-visualizer`) run: Three.js chunk separate from app chunk
- Initial load for `/about` route: < 50kb JS (no 3D)
- Verified by: `npm run build && npx vite-bundle-analyzer dist/` — confirm chunk separation

**STORY-030: Lighthouse audit on fallback routes**
As a developer, I need fallback routes to score ≥ 90 accessibility on Lighthouse so that the portfolio is inclusive.

Acceptance criteria:
- Run Lighthouse CI on `/about`, `/projects`, `/skills`, `/contact`
- Accessibility score ≥ 90 on all 4 routes
- No critical axe violations (alt text, label associations, contrast ratios)
- Performance score ≥ 70 on each fallback route
- SEO score ≥ 80 (`<title>`, `<meta description>` present on each route)
- Verified by: `npx lighthouse http://localhost:5173/about --only-categories=accessibility,performance,seo`

---

## Epic 10 — Deployment & CI

**Goal:** Reproducible, tested, zero-downtime deployment from `main` to Vercel/Netlify.

### Stories

**STORY-031: Static build configuration**
As a developer, I need a clean production build so that the site deploys correctly to a static host.

Acceptance criteria:
- `npm run build` completes without errors or TypeScript warnings
- `tsc --noEmit` zero errors before build
- `dist/` directory contains: `index.html`, `/assets/` (JS/CSS chunks), `/audio/`, `/fonts/`
- Vite `base` path configurable via env var for subdirectory deploys
- SPA fallback: `vercel.json` or `netlify.toml` redirects all routes to `index.html`
- Audio files (`public/audio/*.mp3`) copied to `dist/audio/` in build

**STORY-032: Post-deploy smoke test checklist**
As a developer, I need a smoke test to run after every deploy so that regressions are caught before users notice.

Acceptance criteria:
- [ ] Home page `/` loads 3D world — canvas visible, no console errors
- [ ] Loading screen appears then fades after scene loads
- [ ] WASD drives car; car cannot escape world
- [ ] Drive to ABOUT zone — panel opens, bio visible
- [ ] Escape closes panel
- [ ] Music toggle button: OFF by default; toggle plays music; toggle again stops
- [ ] `/about` route loads with no 3D content
- [ ] `/projects` route — project list visible with tech tags
- [ ] On mobile: joystick visible, drives car, panel opens at zone
- [ ] No 404s in network tab for audio files or font files

---

## Story Cross-Reference

| Story | Epic | Phase | Task |
|-------|------|-------|------|
| STORY-001 | Foundation | Phase 0 | TASK-001, TASK-006 |
| STORY-002 | Foundation | Phase 0 | TASK-003, TASK-004 |
| STORY-003 | Foundation | Phase 0 | TASK-005 |
| STORY-004 | 3D World | Phase 1 | TASK-007 |
| STORY-005 | 3D World | Phase 1 | TASK-008 |
| STORY-006 | 3D World | Phase 1 | TASK-009 |
| STORY-007 | 3D World | Phase 1 | TASK-010 |
| STORY-008 | 3D World | Phase 1 | TASK-011 |
| STORY-009 | Zone System | Phase 2 | TASK-012 |
| STORY-010 | Zone System | Phase 2 | TASK-013 |
| STORY-011 | Zone System | Phase 2 | TASK-014 |
| STORY-012 | Content Panels | Phase 3 | TASK-015 |
| STORY-013 | Content Panels | Phase 3 | TASK-016 |
| STORY-014 | Content Panels | Phase 3 | TASK-017 |
| STORY-015 | Content Panels | Phase 3 | TASK-017 |
| STORY-016 | UI Shell | Phase 3 | TASK-018 |
| STORY-017 | UI Shell | Phase 3 | TASK-019 |
| STORY-018 | Audio | Phase 4 | TASK-020 |
| STORY-019 | Audio | Phase 4 | TASK-020 |
| STORY-020 | Mobile | Phase 4 | TASK-021 |
| STORY-021 | Mobile | Phase 4 | TASK-021 |
| STORY-022 | Accessibility | Phase 5 | TASK-022 |
| STORY-023 | Testing | Phase 5 | TASK-024 |
| STORY-024 | Testing | Phase 5 | TASK-024 |
| STORY-025 | Testing | Phase 5 | TASK-024 |
| STORY-026 | Testing | Phase 5 | TASK-024 |
| STORY-027 | Testing | Phase 5 | TASK-024 |
| STORY-028 | Performance | Phase 5 | TASK-024 |
| STORY-029 | Performance | Phase 5 | TASK-024 |
| STORY-030 | Performance | Phase 5 | TASK-024 |
| STORY-031 | Deployment | Post-build | — |
| STORY-032 | Deployment | Post-build | — |

---

## Story Size Reference

| Story | Points | Reason |
|-------|--------|--------|
| STORY-001 | 3 | Boilerplate + config, no logic |
| STORY-002 | 2 | TypeScript types + data, no logic |
| STORY-003 | 2 | Zustand store — straightforward |
| STORY-004 | 5 | R3F Canvas + Rapier — configuration-heavy |
| STORY-005 | 5 | World geometry, lighting, fog — many pieces |
| STORY-006 | 8 | Car physics + WASD — core mechanic |
| STORY-007 | 3 | Camera lerp — small addition to Car.tsx |
| STORY-008 | 2 | Boundary walls — 20 lines of code |
| STORY-009 | 3 | Zone markers — geometry + animation |
| STORY-010 | 3 | Proximity hook — logic-focused |
| STORY-011 | 8 | ZonePanel — Framer Motion + 3 close methods |
| STORY-012 | 2 | AboutPanel — content layout |
| STORY-013 | 3 | ProjectsPanel — cards + links + overflow |
| STORY-014 | 2 | SkillsPanel — tag cloud |
| STORY-015 | 2 | ContactPanel — obfuscated email |
| STORY-016 | 3 | LoadingScreen — progress + fade |
| STORY-017 | 3 | HUD — pointer events + timer |
| STORY-018 | 5 | Engine audio — gesture guard + pitch |
| STORY-019 | 3 | Ambient music — musicEnabled reactive |
| STORY-020 | 8 | Mobile joystick — touch events + car merge |
| STORY-021 | 2 | Responsive panels — CSS only |
| STORY-022 | 5 | 4 fallback pages — semantic HTML |
| STORY-023 | 3 | Proximity edge cases — QA focused |
| STORY-024 | 3 | Panel close paths — integration QA |
| STORY-025 | 2 | Music default verification — grep + manual |
| STORY-026 | 2 | Boundary stress test — manual QA |
| STORY-027 | 5 | Cross-browser — BrowserStack testing |
| STORY-028 | 3 | Frame rate budget — DevTools trace |
| STORY-029 | 3 | Bundle size audit — vite-bundle-analyzer |
| STORY-030 | 2 | Lighthouse — CLI audit |
| STORY-031 | 3 | Static build — vite + vercel config |
| STORY-032 | 2 | Smoke test checklist — manual post-deploy |
| **Total** | **116** | ~6 sprints at 2-week / 20 points per sprint |

---

## Acceptance Criteria Quick-Reference

The following constraints must pass for **every** story that touches these systems:

**Music constraint (all audio stories):**
```
grep -r "autoplay: true" src/          → 0 results
grep -r "musicEnabled: true" src/store → 0 results (default is false)
```

**Panel constraint (all ZonePanel stories):**
```
All 3 close methods (Escape / ✕ / click-outside) leave:
  activeZone    === null
  isPanelOpen   === false
```

**Boundary constraint (all world stories):**
```
grep -r "CuboidCollider" src/components/world/Boundary.tsx
→ Must have no <mesh> sibling inside the same RigidBody
```

**TypeScript constraint (all stories):**
```
tsc --noEmit  → 0 errors, 0 warnings
No 'any' types in production code (// @ts-ignore banned except third-party type gaps)
```

---

## Epic and Story Count Summary

| Epic | Stories | Story Points | Phase |
|------|---------|-------------|-------|
| Epic 1 — Foundation | 3 | 7 | Phase 0 |
| Epic 2 — 3D World | 5 | 23 | Phase 1 |
| Epic 3 — Zone System | 3 | 14 | Phase 2 |
| Epic 4 — Content Panels | 4 | 9 | Phase 3 |
| Epic 5 — UI Shell | 2 | 6 | Phase 3 |
| Epic 6 — Audio | 2 | 8 | Phase 4 |
| Epic 7 — Mobile & Accessibility | 3 | 15 | Phase 4–5 |
| Epic 8 — Testing & QA | 5 | 15 | Phase 5 |
| Epic 9 — Performance Budget | 3 | 8 | Phase 5 |
| Epic 10 — Deployment & CI | 2 | 5 | Post-build |
| **Total** | **32** | **110** | — |

**Sprint allocation (2-week sprints, 20 points/sprint):**
- Sprint 1: Epics 1–2 (Foundation + 3D World) — 30 points
- Sprint 2: Epics 3–5 (Zones, Panels, UI Shell) — 29 points
- Sprint 3: Epics 6–7 (Audio, Mobile, Accessibility) — 23 points
- Sprint 4: Epics 8–10 (QA, Performance, Deploy) — 28 points
