# 04 — Build Plan
## Interactive 3D World Portfolio · portfolio_platform_01

---

### Overview

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| 0 | Foundation | 3 days | Project setup, design tokens, routing, content data |
| 1 | 3D World | 4 days | Scene, terrain, car physics, camera, boundary walls |
| 2 | Zones & Panels | 3 days | Zone markers, proximity detection, ZonePanel component |
| 3 | Content & HUD | 2 days | All 4 panel content components, HUD, loading screen |
| 4 | Audio & Mobile | 2 days | Howler audio system, mobile joystick, touch support |
| 5 | Fallback & Polish | 2 days | Accessible routes, performance, QA |

**Total: ~16 days**

---

### Phase 0 — Foundation (Days 1–3)

**Deliverables:**
- Vite + React 18 + TypeScript strict project
- Tailwind CSS configured
- Google Fonts imported (Amatic SC 700, Nunito 400/600)
- All CSS custom properties in `index.css` (from Design System)
- React Router: `/`, `/about`, `/projects`, `/skills`, `/contact`
- `src/data/content.ts` — all portfolio content defined
- `src/lib/constants.ts` — zone positions, physics params
- Zustand world store

**Ship gate:**
- [ ] `tsc --noEmit` passes
- [ ] All routes render without errors
- [ ] Content data structure typed correctly

---

### Phase 1 — 3D World (Days 4–7)

**Deliverables:**
- R3F Canvas full-viewport with Rapier physics world
- Terrain plane (100×100, sandy colour)
- Road paths (box geometry)
- Decorative elements: trees, rocks, distant buildings (geometry primitives)
- Car: box + cabin + 4 wheels, RigidBody, WASD/arrow key controls
- Third-person camera: smooth lerp (factor 0.08), 8 behind + 4 above
- Invisible boundary walls (Rapier RigidBody, no mesh)
- Lighting: ambient + directional golden light
- Fog: `#1B2A4A` at distance 40–80
- Sky: Drei `<Sky>` with dusk sun position

**Ship gate:**
- [ ] Car drives with WASD; arrow keys work too
- [ ] Car cannot exit world boundaries
- [ ] Camera follows car smoothly — no jitter
- [ ] World renders without WebGL errors in console

---

### Phase 2 — Zones & Panels (Days 8–10)

**Deliverables:**
- ZoneMarker component: amber torus ring + glowing material + floating Amatic SC label
- All 4 zone markers placed at correct positions
- `useProximity` hook: detects car within 8 world units
- ZonePanel: glassmorphic panel, Framer Motion slide-up, ✕ button
- Panel close logic: Escape key, click-outside, ✕ button — all 3 work
- Zustand `activeZone` drives panel visibility via `<AnimatePresence>`

**Ship gate:**
- [ ] Driving within 8 units of any marker opens correct panel
- [ ] Driving away closes panel
- [ ] All 3 close methods work: Escape, click-outside, ✕
- [ ] Panel animation: smooth slide-up (0.35s) and slide-down (0.25s)

---

### Phase 3 — Content & HUD (Days 11–12)

**Deliverables:**
- `AboutPanel.tsx` — bio text, optional photo
- `ProjectsPanel.tsx` — 3–6 project cards (title, description, tags, live/GitHub links)
- `SkillsPanel.tsx` — tag cloud (15–25 skills)
- `ContactPanel.tsx` — email (obfuscated), GitHub, LinkedIn links
- `LoadingScreen.tsx` — progress bar, creator name, fades on load complete
- `HUD.tsx` — creator name top-left, tagline, control hint (fades after 8s), music toggle

**Ship gate:**
- [ ] All 4 panels show correct content from `content.ts`
- [ ] Loading screen fades only when scene is fully ready
- [ ] HUD control hint fades after 8 seconds
- [ ] Tech stack tags render with amber styling

---

### Phase 4 — Audio & Mobile (Days 13–14)

**Deliverables:**
- Howler.js audio: engine loop (pitch varies with speed), collision thud, ambient music
- Music toggle: OFF by default; preference persisted to localStorage
- Music plays only after first user interaction (browser autoplay policy)
- Mobile joystick: on-screen touch joystick (bottom-left), visible only on touch devices
- Touch proximity interaction: tap panel content; scroll inside panel

**Ship gate:**
- [ ] Music defaults to OFF; toggle works
- [ ] Engine sound pitch changes with car speed
- [ ] Mobile joystick drives the car correctly
- [ ] Joystick hidden on desktop mouse/keyboard devices
- [ ] No autoplay console errors

---

### Phase 5 — Fallback & Polish (Days 15–16)

**Deliverables:**
- `/about`, `/projects`, `/skills`, `/contact` pages: readable static HTML, no 3D, keyboard navigable
- Skip-nav link at page top (for screen readers)
- Performance: instanced meshes for repeated objects; priority on above-fold
- Reduced motion: pause Framer Motion animations if `prefers-reduced-motion`
- Low-end device detection: disable bloom post-processing if `hardwareConcurrency < 4`
- Lighthouse audit: accessibility ≥ 90 on fallback routes

**Ship gate:**
- [ ] All fallback routes readable without JavaScript
- [ ] `prefers-reduced-motion`: panel animations disabled
- [ ] No critical axe violations on fallback pages
- [ ] World loads and is playable on 4-year-old mid-range Android (no bloom)

---

### Cut Order

**Never cut:**
- Car physics (the entire experience depends on it)
- Zone proximity detection
- ZonePanel (3 close methods)
- Music defaulting OFF
- Accessible fallback routes

**Cut first if time-constrained:**
- Bloom post-processing
- Engine pitch variation (use simple mute/unmute instead)
- Easter eggs
- Gamepad support
- Whisper wall / community features

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Rapier WASM blocks loading | Medium | High | Wrap in `<Suspense>`; show progress bar; do not call `setLoaded` until `useProgress().active === false` |
| Safari `backdrop-filter` failure | Low | Medium | Always include `-webkit-backdrop-filter`; test on Safari 16+ |
| Mobile autoplay blocked | High | Low | Engine sound starts only on `pointerdown`; music defaults OFF |
| Three.js bundle too large | Medium | Medium | Lazy-load `World3D`; split chunk via Vite `manualChunks` |
| Car physics explosion on wall hit | Low | Medium | `lockRotations` on RigidBody; `angularDamping: 5`; test high-speed corner impact |
| Zone proximity never fires | Low | High | Confirm `setCarPosition` writes to store every frame; `useProximity` reads from store correctly |
| Glassmorphic panel invisible | Low | High | Panel must be outside `<Canvas>`; `position: fixed` in DOM; canvas `position: fixed` too |

---

### Phase Dependencies

```
Phase 0 ──→ Phase 1 ──→ Phase 2 ──→ Phase 3 ──→ Phase 4 ──→ Phase 5
 (store,       (world,      (zones,      (content,    (audio,      (polish,
  routing,      car,         panels,      HUD,         mobile,      QA,
  content)      camera)      proximity)   loading)     joystick)    deploy)

  BLOCKED until Phase 0 complete:
    Phase 1 needs: constants.ts, worldStore, React Router

  BLOCKED until Phase 1 complete:
    Phase 2 needs: car position in store, world renders without errors

  BLOCKED until Phase 2 complete:
    Phase 3 needs: ZonePanel mounts/unmounts correctly (AnimatePresence)

  Phase 4 can start in parallel with Phase 3 (audio doesn't need panels)
  Phase 5 must come last (QA requires everything working)
```

---

### Definition of Done (per Phase)

**Phase 0 done when:**
- [ ] `tsc --noEmit` zero errors
- [ ] All 5 routes render at correct URLs
- [ ] `content.ts` exports all 4 data shapes
- [ ] Zustand store: `musicEnabled` persists to localStorage, defaults false
- [ ] CSS custom properties all present in `index.css`

**Phase 1 done when:**
- [ ] 3D world renders; car drives with WASD
- [ ] Car cannot escape boundaries (manual test: all 4 walls)
- [ ] Camera follows car smoothly; no jitter at rest
- [ ] No WebGL errors in console

**Phase 2 done when:**
- [ ] 4 amber rings visible at correct world positions
- [ ] Proximity detection: drive to each zone, verify `activeZone` changes
- [ ] All 3 panel close methods work (Escape, ✕, click-outside)
- [ ] Panel animation plays entry and exit

**Phase 3 done when:**
- [ ] All 4 panels display correct content from `content.ts`
- [ ] Loading screen fades only when scene is ready
- [ ] HUD hint fades after 8 seconds
- [ ] Tech tags render amber

**Phase 4 done when:**
- [ ] Music off on load; toggle works; preference persists
- [ ] Engine sound plays after first user gesture
- [ ] Mobile joystick drives car; hidden on desktop
- [ ] No autoplay console errors on any browser

**Phase 5 done when:**
- [ ] `/about`, `/projects`, `/skills`, `/contact` all readable, keyboard navigable
- [ ] Lighthouse accessibility ≥ 90 on fallback routes
- [ ] `prefers-reduced-motion`: panel animations disabled
- [ ] World runs at ≥ 60fps on target device (Chrome DevTools trace)
- [ ] `npm run build` — no errors; `dist/` deploys to Vercel/Netlify

---

### V2 Roadmap (Post-Launch)

**V2 features (not in scope for V1):**
- Gamepad API support (Xbox/PS controller)
- Easter egg: hidden ramp + jump mechanic
- Night mode: toggle sky colour (midnight navy with stars)
- GLTF car model replacing geometry primitives
- Contact form via Vercel Edge Function (hides email entirely)
- Multiplayer cursor: see other visitors' cars (Liveblocks or PartyKit)
- Analytics: Plausible.io (privacy-respecting, no cookies)

**V2 upgrade path:**
- Replace box-geometry car with GLTF: drop `Car.tsx` geometry section, load via `useGLTF`
- Add GLTF buildings: drop `Decorations.tsx` primitives, load `world.glb`
- Content updates: edit `content.ts` only — no other files change

---

### Testing Strategy per Phase

| Phase | Test Type | What to Test | Tool |
|-------|-----------|-------------|------|
| 0 | Unit | Zustand store: musicEnabled defaults false, persists | Vitest |
| 0 | Unit | `distance3D()` utility — correct distance calculation | Vitest |
| 1 | Manual | Car WASD controls; camera lerp smooth | Chrome DevTools |
| 1 | Manual | Boundary walls — drive into each at max speed | Manual |
| 2 | Manual | Proximity: drive to each zone, verify `activeZone` | Manual |
| 2 | Manual | Panel close — Escape, ✕, click-outside all work | Manual |
| 3 | Visual | All 4 panels render content correctly | Manual |
| 3 | Automated | `grep -r "autoplay: true" src/` returns nothing | Bash |
| 4 | Manual | Music OFF on load; toggle persists after refresh | Manual |
| 4 | Device | Mobile joystick: iOS Safari + Android Chrome | BrowserStack |
| 5 | Lighthouse | Accessibility ≥ 90 on all fallback routes | Lighthouse CI |
| 5 | TypeScript | `tsc --noEmit` zero errors | CI pre-deploy |
| 5 | Bundle | Three.js chunk separate from app chunk | vite-bundle-analyzer |

---

### Phase Gate Approvals

Before moving from one phase to the next, all ship gate checkboxes for that phase must be checked off manually. No phase gate is skipped even under time pressure — gates exist to prevent later phases from being built on broken foundations.

**Exception:** Phase 4 (Audio & Mobile) can run in parallel with Phase 3 (Content & HUD) since they touch different files. Phase 5 (Polish & QA) must wait for both Phases 3 and 4 to complete their gates.

---

### Estimated Deliverable File Count

| Phase | New Files | Modified Files |
|-------|-----------|---------------|
| 0 | `constants.ts`, `utils.ts`, `types/index.ts`, `content.ts`, `worldStore.ts`, `App.tsx`, `index.css` | — |
| 1 | `World3D.tsx`, `World.tsx`, `Car.tsx`, `Boundary.tsx`, `Decorations.tsx`, `useKeyboard.ts` | `App.tsx` |
| 2 | `ZoneMarker.tsx`, `ZoneMarkers.tsx`, `useProximity.ts`, `ZonePanel.tsx` | `Car.tsx` |
| 3 | `AboutPanel.tsx`, `ProjectsPanel.tsx`, `SkillsPanel.tsx`, `ContactPanel.tsx`, `LoadingScreen.tsx`, `HUD.tsx` | `ZonePanel.tsx` |
| 4 | `useAudio.ts`, `MobileJoystick.tsx`, `useDeviceType.ts` | `Car.tsx`, `HUD.tsx` |
| 5 | `AboutPage.tsx`, `ProjectsPage.tsx`, `SkillsPage.tsx`, `ContactPage.tsx`, `WorldErrorBoundary.tsx`, `netlify.toml` | `index.css` |

**Total new files: ~28. Modified files: ~5.**
