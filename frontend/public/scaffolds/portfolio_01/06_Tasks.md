# 06 — Tasks
## Interactive 3D World Portfolio · portfolio_platform_01

Execute one task at a time. Report: "Task [ID] complete. [Built]. [Tested]. Ready for review."
Ask before changing zone positions, physics parameters, or audio architecture.

---

## Phase 0 — Foundation

### TASK-001: Project bootstrap
**Story:** STORY-001

```bash
npm create vite@latest portfolio -- --template react-ts
cd portfolio
npm install three @react-three/fiber @react-three/drei @react-three/rapier @react-three/postprocessing
npm install framer-motion howler zustand react-router-dom
npm install -D tailwindcss postcss autoprefixer @types/three @types/howler
npx tailwindcss init -p
```

`tailwind.config.js`:
```js
fontFamily: {
  display: ['Amatic SC', 'cursive'],
  body: ['Nunito', 'sans-serif'],
}
```

`index.css`: Add Google Fonts import + all CSS custom properties from 03_Design.md.

Done when: `npm run dev` runs; `tsc --noEmit` zero errors; Amatic SC visible in browser.

---

### TASK-002: Constants and utilities
**Story:** STORY-001

Create `src/lib/constants.ts` with `ZONES`, `WORLD_SIZE`, `PROXIMITY_THRESHOLD`, `CAMERA_LERP`, `CAMERA_OFFSET`, `CAR_SPEED`, `GRAVITY`.

Create `src/lib/utils.ts`:
```typescript
export function distance3D(
  a: { x: number; y: number; z: number },
  b: { x: number; y: number; z: number }
): number {
  return Math.sqrt((a.x-b.x)**2 + (a.y-b.y)**2 + (a.z-b.z)**2)
}
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}
export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}
```

Done when: Constants importable; utilities exported and typed.

---

### TASK-003: TypeScript types
**Story:** STORY-002

Create `src/types/index.ts`:
```typescript
export interface Project {
  id: string
  title: string
  description: string
  stack: string[]
  liveUrl: string
  githubUrl: string
  imageUrl?: string
}
export interface Owner {
  name: string
  tagline: string
  bio: string
  location: string
  yearsOfExperience: number
  photoUrl?: string
}
export interface Contact {
  emailUser: string        // obfuscated: 'yourname'
  emailDomain: string      // obfuscated: 'gmail.com'
  github: string
  linkedin: string
  twitter?: string
  availability: string
}
export interface Skills {
  languages: string[]
  frameworks: string[]
  tools: string[]
  creative: string[]
}
export interface Zone {
  id: 'about' | 'projects' | 'skills' | 'contact'
  position: readonly [number, number, number]
  label: string
}
```

Done when: Types exported, no `any` anywhere.

---

### TASK-004: Content data file
**Story:** STORY-002

Create `src/data/content.ts` with sample portfolio content:
```typescript
import type { Owner, Project, Skills, Contact } from '../types'

export const owner: Owner = {
  name: 'Alex Rivera',
  tagline: 'Creative Developer',
  bio: 'I build interactive experiences at the intersection of design and engineering...',
  location: 'London, UK',
  yearsOfExperience: 5,
}

export const projects: Project[] = [
  { id: 'p1', title: 'Project One', description: '...', stack: ['React','Three.js','TypeScript'], liveUrl: '#', githubUrl: '#' },
  // 2-5 more projects
]

export const skills: Skills = {
  languages: ['TypeScript', 'JavaScript', 'GLSL', 'Python'],
  frameworks: ['React', 'Three.js', 'Next.js', 'React Three Fiber'],
  tools: ['Blender', 'Figma', 'Git', 'Vite', 'Supabase'],
  creative: ['WebGL', 'GSAP', 'Framer Motion', 'Rapier Physics'],
}

export const contact: Contact = {
  emailUser: 'alex',
  emailDomain: 'example.com',
  github: 'https://github.com/alexrivera',
  linkedin: 'https://linkedin.com/in/alexrivera',
  availability: 'Open to full-time and freelance opportunities',
}
```

Done when: All content importable, correctly typed.

---

### TASK-005: Zustand world store
**Story:** STORY-003

Create `src/store/worldStore.ts`:
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WorldStore {
  isLoaded: boolean
  loadProgress: number
  activeZone: string | null
  carPosition: [number, number, number]
  musicEnabled: boolean
  isPanelOpen: boolean
  setLoaded: (v: boolean) => void
  setLoadProgress: (p: number) => void
  setActiveZone: (zone: string | null) => void
  setCarPosition: (pos: [number, number, number]) => void
  toggleMusic: () => void
  openPanel: () => void
  closePanel: () => void
}

export const useWorldStore = create<WorldStore>()(
  persist(
    (set) => ({
      isLoaded: false,
      loadProgress: 0,
      activeZone: null,
      carPosition: [0, 0, 0],
      musicEnabled: false,    // ALWAYS default false
      isPanelOpen: false,
      setLoaded: (v) => set({ isLoaded: v }),
      setLoadProgress: (p) => set({ loadProgress: p }),
      setActiveZone: (zone) => set({ activeZone: zone, isPanelOpen: zone !== null }),
      setCarPosition: (pos) => set({ carPosition: pos }),
      toggleMusic: () => set((s) => ({ musicEnabled: !s.musicEnabled })),
      openPanel: () => set({ isPanelOpen: true }),
      closePanel: () => set({ isPanelOpen: false, activeZone: null }),
    }),
    { name: 'portfolio-world', partialize: (s) => ({ musicEnabled: s.musicEnabled }) }
  )
)
```

Done when: Store importable; musicEnabled persists to localStorage; defaults to false.

---

### TASK-006: React Router setup
**Story:** STORY-001

Create `src/App.tsx` with `BrowserRouter` + 5 routes. Lazy-load `World3D` so Three.js is not bundled with fallback pages.

```tsx
const World3D = lazy(() => import('./pages/World3D'))

export default function App() {
  return (
    <BrowserRouter>
      <a href="/about" className="sr-only focus:not-sr-only p-2 bg-black text-white">
        Skip to accessible content (no 3D required)
      </a>
      <Routes>
        <Route path="/" element={<Suspense fallback={<LoadingScreen />}><World3D /></Suspense>} />
        <Route path="/about"    element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/skills"   element={<SkillsPage />} />
        <Route path="/contact"  element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

Done when: All 5 routes render; Three.js not loaded when visiting /about.

---

## Phase 1 — 3D World

### TASK-007: R3F Canvas and physics
**Story:** STORY-004

Create `src/pages/World3D.tsx`:
```tsx
<Canvas
  shadows
  camera={{ position: [0, 8, 12], fov: 60 }}
  style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}
  gl={{ antialias: true }}
>
  <Suspense fallback={<ProgressTracker />}>
    <Physics gravity={[0, -9.81, 0]}>
      <World />
      <Car />
      <ZoneMarkers />
      <Boundary />
    </Physics>
    <Sky sunPosition={[10, 2, 5]} />
    <fog attach="fog" args={['#1B2A4A', 40, 80]} />
    <ambientLight intensity={0.6} />
    <directionalLight position={[10, 20, 10]} intensity={1.2} color="#FFD89B" castShadow shadow-mapSize={1024} />
  </Suspense>
</Canvas>
```

`ProgressTracker` reads `useProgress()` from Drei and writes to `worldStore.setLoadProgress`. When `active === false`, calls `setLoaded(true)`.

Done when: Canvas renders; Rapier physics initialises without errors; `isLoaded` becomes true.

---

### TASK-008: World terrain and decorations
**Story:** STORY-005

Create `src/components/world/World.tsx`:
1. Terrain: flat `<RigidBody type="fixed">` plane, 100×100, `#C8A573`, `receiveShadow`
2. Road strips: 3–4 dark box strips connecting zone positions, `#3D3D3D`
3. Trees: `TreePrimitive` component (trunk box + canopy box), 10 placed around world, `#4A7C59`
4. Rocks: `CylinderGeometry` slightly flattened, 5 placed, `#8B7355`
5. Simple flat-top box buildings (2–3) near world edges for depth

Use `useMemo` for geometry to avoid re-creation on render.

Done when: World renders; no warnings about missing receiveShadow; frame rate > 50fps.

---

### TASK-009: Car with physics
**Story:** STORY-006

Create `src/components/world/Car.tsx`:
1. Geometry: body box `[1.6, 0.6, 3]` + cabin box `[1.2, 0.5, 1.6]`, all `#E84B30`, `castShadow`
2. 4 wheel cylinders `CylinderGeometry args={[0.35, 0.35, 0.25, 16]}` rotated on Z axis
3. Wrap all in `<RigidBody linearDamping={5} angularDamping={5} mass={1} lockRotations>`
4. `useKeyboard` hook: tracks WASD + arrow keys pressed state
5. `useFrame`: apply velocity from keys, write position to store

`useKeyboard`:
```typescript
export function useKeyboard() {
  const keys = useRef({ forward: false, backward: false, left: false, right: false })
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (['ArrowUp','w','W'].includes(e.key)) keys.current.forward = true
      if (['ArrowDown','s','S'].includes(e.key)) keys.current.backward = true
      if (['ArrowLeft','a','A'].includes(e.key)) keys.current.left = true
      if (['ArrowRight','d','D'].includes(e.key)) keys.current.right = true
    }
    const onUp = (e: KeyboardEvent) => { /* reverse above */ }
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp) }
  }, [])
  return keys.current
}
```

Done when: Car drives with WASD and arrow keys; position updates in store each frame.

---

### TASK-010: Third-person camera
**Story:** STORY-007

In Car.tsx `useFrame`, after applying velocity:
```typescript
const { camera } = useThree()
const pos = rigidBody.current.translation()

const targetCamPos = new THREE.Vector3(
  pos.x,
  pos.y + CAMERA_OFFSET.y,
  pos.z + CAMERA_OFFSET.z,
)
camera.position.lerp(targetCamPos, CAMERA_LERP)
camera.lookAt(pos.x, pos.y + 1, pos.z)
```

Done when: Camera follows car from behind; no jitter; lerp feels smooth (not instant, not laggy).

---

### TASK-011: Boundary walls
**Story:** STORY-008

Create `src/components/world/Boundary.tsx`:
```tsx
const WALL_THICKNESS = 1
const HALF = WORLD_SIZE / 2
const walls = [
  { pos: [0, 5, -HALF], size: [HALF, 10, WALL_THICKNESS] },  // North
  { pos: [0, 5,  HALF], size: [HALF, 10, WALL_THICKNESS] },  // South
  { pos: [-HALF, 5, 0], size: [WALL_THICKNESS, 10, HALF] },  // West
  { pos: [ HALF, 5, 0], size: [WALL_THICKNESS, 10, HALF] },  // East
]

// RigidBody type="fixed" with CuboidCollider only — no mesh
walls.map(w => (
  <RigidBody type="fixed" position={w.pos as any}>
    <CuboidCollider args={w.size as any} />
  </RigidBody>
))
```

Done when: Car bounces off all 4 edges; cannot exit at any direction.

---

## Phase 2 — Zones & Panels

### TASK-012: Zone markers
**Story:** STORY-009

Create `src/components/world/ZoneMarker.tsx`:
1. Amber torus ring: `TorusGeometry args={[2.5, 0.08, 16, 64]}`, emissive amber material
2. Slow Y rotation in `useFrame` (0.3 rad/s)
3. Subtle scale pulse via `Math.sin(clock.elapsedTime * 1.5) * 0.025 + 1`
4. Drei `<Text>` floating 3 units above: zone.label, Amatic SC, amber, 0.8 fontSize

Place all 4 via `src/components/world/ZoneMarkers.tsx` mapping over `ZONES`.

Done when: 4 glowing amber rings visible in correct positions; labels float above; rings rotate and pulse.

---

### TASK-013: Proximity detection hook
**Story:** STORY-010

Create `src/hooks/useProximity.ts`:
```typescript
export function useProximity() {
  const { carPosition, activeZone, setActiveZone } = useWorldStore()

  useEffect(() => {
    const [cx, cy, cz] = carPosition
    const nearest = ZONES.find(zone => {
      const [zx, zy, zz] = zone.position
      return distance3D({ x: cx, y: cy, z: cz }, { x: zx, y: zy, z: zz }) < PROXIMITY_THRESHOLD
    })
    const nextZone = nearest?.id ?? null
    if (nextZone !== activeZone) setActiveZone(nextZone)
  }, [carPosition])
}
```

Call `useProximity()` inside Car.tsx (after position is written to store).

Done when: Driving to About zone position sets `activeZone = 'about'`; driving away sets it to null.

---

### TASK-014: ZonePanel component
**Story:** STORY-011

Create `src/components/ui/ZonePanel.tsx`:
1. Reads `activeZone` from store
2. `<AnimatePresence>` wrapper — only mounts panel when `activeZone !== null`
3. Framer Motion variants (from 03_Design.md)
4. Panel div with glassmorphic styles (inline style using CSS vars)
5. ✕ button top-right → `setActiveZone(null)`
6. `useEffect` for Escape key listener
7. `useEffect` for click-outside (attach to document, skip if click is inside `panelRef`)
8. Renders child based on `activeZone`: switch statement → correct panel component

Done when: Panel slides up when zone entered; all 3 close methods work; `AnimatePresence` exit animation plays.

---

## Phase 3 — Content & HUD

### TASK-015: AboutPanel
**Story:** STORY-012

Create `src/components/ui/panels/AboutPanel.tsx`:
- Owner name: Amatic SC 700, `var(--accent)`, 2rem
- Optional circular photo: 80px, `border: 2px solid var(--accent)`, `border-radius: 50%`
- Tagline: Nunito 400, muted
- Bio: Nunito 400, 15px, `var(--panel-text)`, line-height 1.65
- Location + experience: small meta row, muted text
All data from `content.owner`.

Done when: AboutPanel renders bio, photo if present, location — all from content.ts.

---

### TASK-016: ProjectsPanel
**Story:** STORY-013

Create `src/components/ui/panels/ProjectsPanel.tsx`:
- Section heading "PROJECTS": Amatic SC, `var(--accent)`
- `content.projects.map(project => <ProjectCard key={project.id} project={project} />)`
- `ProjectCard`: title (Nunito 600), description (Nunito 400, muted), stack tags (amber badges), "Live ↗" + "GitHub" links (new tab)
- Divider between cards: `1px solid var(--panel-divider)`
- Panel overflow-y: auto (scrollable)

Done when: All projects render; tags amber; links open new tab.

---

### TASK-017: SkillsPanel + ContactPanel
**Story:** STORY-014, STORY-015

**SkillsPanel:**
- 4 category sections from `content.skills`
- Category heading: Amatic SC, amber, 1.2rem
- Tags: amber badge, flex-wrap

**ContactPanel:**
- Email constructed in JS: `` `${emailUser}@${emailDomain}` `` — never raw string in HTML
- Availability badge: muted text
- GitHub + LinkedIn as labelled link buttons
- "Send me a message" → `mailto:` link, amber outline pill button

Done when: Email never appears as plain text in page source; all links work; availability shows.

---

### TASK-018: LoadingScreen
**Story:** STORY-016

Create `src/components/ui/LoadingScreen.tsx`:
- Full-viewport fixed overlay, `background: #0A0C14`, `z-index: 100`
- Creator name: Amatic SC 700, 52px, centered
- Progress bar: 200px wide, 4px tall, amber fill (`width: ${loadProgress}%`)
- Hint: "WASD to drive" below bar
- When `isLoaded`: `opacity: 0` transition 600ms → unmount

Done when: Loading screen shows; progress bar fills; fades when scene ready.

---

### TASK-019: HUD and music toggle
**Story:** STORY-017

Create `src/components/ui/HUD.tsx`:
- Top-left: `pointer-events: none` — name (Amatic SC 26px) + tagline (Nunito 13px muted)
- Top-right: music toggle button — `pointer-events: auto` — amber ♪ when ON, muted when OFF
- Bottom-center: control hint text, `opacity: 1` → transitions to `0` after 8s via `useEffect + setTimeout`
- Overall HUD: `position: fixed; z-index: 10; pointer-events: none`
- Music toggle div: `pointer-events: auto`

Done when: HUD renders over canvas; toggle fires `toggleMusic`; hint fades after 8s.

---

## Phase 4 — Audio & Mobile

### TASK-020: Audio system
**Story:** STORY-018, STORY-019

Create `src/hooks/useAudio.ts`:
1. Three Howl instances: engine (loop), collision, ambient (loop, vol 0.3)
2. Engine: start playing on first user interaction (`'pointerdown'` event once)
3. Engine pitch: `useEffect` on car speed
4. Ambient: `useEffect` on `musicEnabled` — play/fade-in or pause
5. All audio files in `public/audio/`

Music MUST NOT play on load — only after `musicEnabled` becomes true via user toggle.

Done when: Engine loops; pitch changes with speed; music toggle works; no autoplay errors.

---

### TASK-021: Mobile joystick
**Story:** STORY-020

Create `src/components/ui/MobileJoystick.tsx`:
1. Detect touch: `const isTouch = 'ontouchstart' in window` → only render on touch devices
2. Outer ring: 80px circle, `rgba(240,235,224,0.15)` border
3. Inner dot: 36px, `#E8A23C`, draggable
4. `onTouchStart/Move/End`: compute delta from ring center → clamp to radius → emit direction
5. Expose direction via `useJoystickStore` or callback prop to Car component
6. Car.tsx: merge joystick direction with keyboard input

Done when: Joystick visible on mobile; dragging moves car; hidden on desktop.

---

## Phase 5 — Fallback & Polish

### TASK-022: Accessible fallback pages
**Story:** STORY-022

Create `src/pages/AboutPage.tsx`, `ProjectsPage.tsx`, `SkillsPage.tsx`, `ContactPage.tsx`:
- Same content from `content.ts`
- Plain HTML: `<main id="main-content">`, semantic headings, lists
- Minimal styling: dark background, readable typography, proper contrast
- Zero Three.js imports
- Keyboard navigable (logical tab order)

Done when: `/about` renders bio text; `/projects` lists all projects; no WebGL; keyboard works.

---

### TASK-023: Reduced motion
**Story:** (implicit accessibility requirement)

```tsx
// In ZonePanel animation
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const panelVariants = prefersReducedMotion
  ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
  : { hidden: { y: 60, opacity: 0 }, visible: { y: 0, opacity: 1 }, exit: { y: 60, opacity: 0 } }
```

Also: pause zone marker rotation + pulse animations when `prefers-reduced-motion`.

Done when: Panel appears without vertical movement under `prefers-reduced-motion: reduce`.

---

### TASK-024: Performance and QA
**Story:** STORY-030

1. Replace repeated geometry (trees, rocks) with `<InstancedMesh>` — one draw call
2. Low-end detection: `navigator.hardwareConcurrency < 4` → disable bloom, reduce shadow map
3. Mobile: `shadow-mapSize={512}` instead of 1024
4. Lighthouse audit fallback routes — fix any accessibility violations
5. `tsc --noEmit` — zero errors
6. Verify: car cannot exit world; music defaults off; all 3 panel close methods work

Done when: Fallback routes score ≥ 90 accessibility; no TypeScript errors; performance stable on mid-range device.
