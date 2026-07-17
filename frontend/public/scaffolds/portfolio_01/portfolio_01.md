# Portfolio Prompt 01 — Interactive 3D World Portfolio
## Inspired by Bruno Simon · bruno-simon.com

---

## Base Prompt

You are a senior creative developer. Build an interactive 3D portfolio website where visitors drive a miniature car through a low-poly 3D world to discover the creator's work. Each zone of the world — About, Projects, Skills, Contact — is a physical location the visitor navigates to. Arriving at a zone triggers a floating UI panel that reveals content. The experience is playful, technically impressive, and unlike any traditional portfolio layout.

**Role:** Senior creative developer (Three.js / React Three Fiber specialist)

**Application Overview:**
A single-page interactive portfolio built as a navigable 3D world. No pages, no scrolling — the visitor drives a physics-enabled car using WASD/arrow keys (or on-screen joystick on mobile) through a miniature desert landscape. Geometric low-poly buildings, trees, and signs mark each content zone. Reaching a zone activates a glassmorphic overlay panel showing portfolio content. The world has ambient sound, soft lighting, and a satisfying physics feel. The goal: show technical creativity while still communicating work, skills, and contact information clearly.

**Brand Voice & Mood:**
Playful but technically credible. Warm and approachable, not cold or corporate. The 3D world should feel like a handcrafted toy world — geometric, charming, slightly whimsical. UI copy is short and human ("drive over here", "honk to contact me"). The palette is warm sandy desert tones with deep sky blue at dusk, avoiding the cold dark aesthetic most developer portfolios use.

**Core Features:**
- 3D world with physics-enabled car (WASD / arrow keys / on-screen touch joystick)
- Zone-based content: About, Projects (3–6 project cards), Skills, Contact
- Floating glassmorphic UI panels triggered by proximity to zone markers
- Project detail: title, description, tech stack tags, live link, GitHub link
- HUD: minimal top bar with creator name; bottom bar with controls hint
- Loading screen with progress bar before 3D scene loads
- Mobile: on-screen joystick + tap to interact
- Ambient background music (toggleable); collision sounds; car engine sound
- Responsive canvas: fills viewport at all screen sizes

**Design Specifications:**

Fonts: Amatic SC (Google Fonts, weight 700) for all headings and zone labels. Nunito (Google Fonts, weights 400 and 600) for body text, UI panels, and tags.

Color palette:
- Terrain base: `#C8A573` (sandy ground)
- Sky: `#1B2A4A` (deep dusk blue)
- Road/paths: `#3D3D3D` (dark asphalt)
- Vegetation: `#4A7C59` (muted sage green)
- UI panel background: `rgba(10, 12, 20, 0.82)` with `backdrop-filter: blur(14px)`
- UI text primary: `#F0EBE0` (warm off-white)
- UI text secondary: `rgba(240, 235, 224, 0.6)`
- Accent / highlight: `#E8A23C` (warm amber — matches world lighting)
- Car body: `#E84B30` (signal red)
- Zone marker glow: `#E8A23C` at 60% opacity
- Panel border: `rgba(232, 162, 60, 0.25)`

Border radius: 12px on all UI panels. 6px on tech stack tags. 99px on CTA buttons.

UI panel specs:
- Width: 420px desktop / 92vw mobile
- Padding: 28px
- Border: 1px solid `rgba(232, 162, 60, 0.25)`
- Box shadow: `0 8px 32px rgba(0,0,0,0.4)`
- Close: `Escape` key or ✕ button

**Structure:**
- Canvas (Three.js / R3F): fills 100vw × 100vh, z-index 0
- LoadingScreen: centered overlay, progress bar, creator name in Amatic SC
- HUD (fixed, pointer-events: none): top-left name + tagline; bottom-center control hints
- ZonePanel (fixed, centered): appears on zone proximity; Framer Motion slide-up entry
- MusicToggle: fixed top-right, icon button
- MobileJoystick: bottom-left, only on touch devices
- ProjectCard inside ZonePanel: image, title, description, stack tags, links

**Technical Specifications:**
- React + Vite (or Next.js 14 App Router)
- React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- Rapier physics (`@react-three/rapier`) for car and world collisions
- Framer Motion for 2D UI panel animations
- Howler.js for audio management
- Tailwind CSS for 2D UI chrome
- TypeScript strict
- GLTF models: low-poly car + world objects (simple geometric primitives acceptable)
- Shadows: soft baked or real-time PCFSoft
- Lighting: ambient + directional (warm golden angle, matching dusk sky)
- Post-processing: subtle bloom on glowing zone markers (optional)

**Implementation Steps:**
1. Set up React + Vite + TypeScript + Tailwind + R3F dependencies
2. Create loading screen with asset preload and progress tracking
3. Build 3D world: flat terrain plane + road paths + ambient decorations (trees, rocks as basic geometries)
4. Add car model (simple box-shaped low-poly or GLTF) with Rapier RigidBody physics
5. Implement WASD/arrow key controls with camera follow (third-person, smooth lerp)
6. Place zone markers (glowing amber rings) at About, Projects, Skills, Contact positions
7. Implement proximity detection (< 8 world units) → trigger ZonePanel open
8. Build ZonePanel component with Framer Motion entry animation + content slots
9. Build ProjectCard component with tech stack tags, links
10. Add HUD overlay (name, tagline, controls hint)
11. Add audio: engine loop (pitch varies with speed), collision thud, ambient music
12. Add mobile on-screen joystick using touch events
13. Implement music toggle (persist preference to localStorage)
14. Performance: use instanced meshes for repeated objects; limit shadow-casting objects

**User Experience:**
The visitor lands on a loading screen (Amatic SC title, warm amber progress bar, "buckle up" hint). Once loaded, they see a third-person view of a tiny red car in a sandy world. Control hints fade in briefly. They drive toward glowing amber markers. On proximity, a panel slides up from the bottom with glassmorphic styling. They read content, click project links, then drive away — panel closes. The experience rewards curiosity. Discovering a hidden Easter egg (a ramp, a spinning object) makes the portfolio memorable. The total time to "see" all content if driven efficiently: under 3 minutes.

**Constraints:**
- Zone panels must be readable without entering the 3D world — accessible fallback route `/about`, `/projects`, `/contact` for screen readers and no-WebGL environments
- Loading screen must not disappear until physics world and all textures are ready
- Car must not escape the world boundary — invisible physics walls at edges
- Music must default to OFF — only play after explicit user action (browser autoplay policy)
- Mobile joystick must not overlap zone panels
- No dark-mode toggle needed — the world IS the design; dark/light is meaningless here
- Tech stack tags: plain text with `#` prefix, never logos (legal simplicity)
- Panel close on `Escape` key + click outside + explicit ✕ button
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

## Platform Versions

---

### Lovable

Build an interactive 3D portfolio where visitors drive a tiny car through a miniature world to discover your work. Use React Three Fiber with Rapier physics. The world is a low-poly sandy desert with glowing amber zone markers for About, Projects, Skills, and Contact. Driving near a marker opens a glassmorphic panel with portfolio content.

**Design system:**
- Fonts: Amatic SC 700 (headings, zone labels) + Nunito 400/600 (UI panels)
- Terrain: `#C8A573`, Sky: `#1B2A4A`, Roads: `#3D3D3D`, Vegetation: `#4A7C59`
- Panel bg: `rgba(10,12,20,0.82)` + `backdrop-filter: blur(14px)`
- Panel text: `#F0EBE0`, Accent/glow: `#E8A23C`, Car: `#E84B30`
- Panel border: `1px solid rgba(232,162,60,0.25)`, radius: 12px
- CTA buttons: `bg-[#E8A23C] text-black rounded-full px-6 py-2`

**Components to build:**
1. `<Canvas>` full-viewport (R3F) with physics world (Rapier)
2. `<Car>` — box RigidBody, WASD controls, camera follow with lerp
3. `<World>` — terrain plane + road + trees/rocks as BoxGeometry primitives
4. `<ZoneMarker>` — glowing amber torus ring + proximity detection
5. `<ZonePanel>` — Framer Motion slide-up, glassmorphic, content slot
6. `<LoadingScreen>` — Amatic SC title, amber progress bar
7. `<HUD>` — fixed overlay: name top-left, controls hint bottom-center
8. `<MobileJoystick>` — touch joystick, shows only on touch devices
9. `<MusicToggle>` — top-right, defaults OFF

**Content zones:** About (bio + photo), Projects (3–6 cards: title, description, stack tags, links), Skills (tag cloud), Contact (email + social links)

**Constraints:** Music default OFF. Accessible fallback text for no-WebGL. Car stays within world bounds (invisible RigidBody walls). Panel closes on Escape or click-outside.

---

### ChatGPT Canvas

Create a 3D interactive portfolio site using React Three Fiber. The user drives a small car (WASD controls, Rapier physics) through a low-poly desert world. Each content zone (About, Projects, Skills, Contact) is marked by a glowing amber ring. Driving within 8 world units triggers a glassmorphic UI panel.

**Exact setup:**
```bash
npm create vite@latest portfolio -- --template react-ts
npm install three @react-three/fiber @react-three/drei @react-three/rapier framer-motion howler tailwindcss zustand
```

**Color tokens (globals.css):**
```css
:root {
  --terrain: #C8A573;
  --sky: #1B2A4A;
  --road: #3D3D3D;
  --veg: #4A7C59;
  --panel-bg: rgba(10,12,20,0.82);
  --panel-text: #F0EBE0;
  --accent: #E8A23C;
  --car: #E84B30;
}
```

**Key files:**
- `src/components/World.tsx` — R3F scene, physics, zone markers
- `src/components/Car.tsx` — RigidBody car + WASD input + camera lerp
- `src/components/ZonePanel.tsx` — Framer Motion panel, glassmorphic
- `src/components/HUD.tsx` — fixed 2D overlay
- `src/components/LoadingScreen.tsx`
- `src/components/MobileJoystick.tsx`
- `src/store/worldStore.ts` — Zustand: activeZone, musicEnabled, isLoaded
- `src/data/content.ts` — zone content (about text, projects array, skills, contact)

**World store (src/store/worldStore.ts):**
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WorldStore {
  activeZone: string | null
  isLoaded: boolean
  musicEnabled: boolean
  carPosition: [number, number, number]
  setActiveZone: (zone: string | null) => void
  setLoaded: (v: boolean) => void
  toggleMusic: () => void
  setCarPosition: (pos: [number, number, number]) => void
}

export const useWorldStore = create<WorldStore>()(
  persist(
    (set) => ({
      activeZone: null,
      isLoaded: false,
      musicEnabled: false,
      carPosition: [0, 0.5, 0],
      setActiveZone: (zone) => set({ activeZone: zone }),
      setLoaded: (v) => set({ isLoaded: v }),
      toggleMusic: () => set((s) => ({ musicEnabled: !s.musicEnabled })),
      setCarPosition: (pos) => set({ carPosition: pos }),
    }),
    { name: 'world-store', partialize: (s) => ({ musicEnabled: s.musicEnabled }) }
  )
)
```

**Zones array (src/data/zones.ts):**
```typescript
export const ZONES = [
  { id: 'about',    position: [-20, 0, -15] as [number, number, number], label: 'ABOUT' },
  { id: 'projects', position: [20,  0, -15] as [number, number, number], label: 'PROJECTS' },
  { id: 'skills',   position: [-20, 0,  20] as [number, number, number], label: 'SKILLS' },
  { id: 'contact',  position: [20,  0,  20] as [number, number, number], label: 'CONTACT' },
] as const

export const PROXIMITY_THRESHOLD = 8
export const WORLD_SIZE = 50
```

**ZonePanel animation:**
```tsx
<motion.div
  initial={{ y: 80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: 80, opacity: 0 }}
  transition={{ duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
  className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[420px] max-w-[92vw] p-7 rounded-xl"
  style={{ background: 'var(--panel-bg)', backdropFilter: 'blur(14px)', border: '1px solid rgba(232,162,60,0.25)' }}
/>
```

---

### Bolt

Build a portfolio website as a navigable 3D world. Stack: React + Vite + TypeScript + React Three Fiber + Rapier physics + Framer Motion + Tailwind CSS + Howler.js.

**The experience:** Visitor drives a red car (WASD) through a sandy low-poly world. Glowing amber rings mark 4 zones. Drive close → glassmorphic panel slides up with content. Drive away → panel closes.

**Design tokens:**
- Car color: `#E84B30`
- Zone glow: `#E8A23C`
- Sky: `#1B2A4A`, Terrain: `#C8A573`, Road: `#3D3D3D`
- Panel: `backdrop-blur-md bg-[rgba(10,12,20,0.82)] border border-[rgba(232,162,60,0.25)] rounded-xl`
- Text: `text-[#F0EBE0]`
- Heading font: Amatic SC 700 (import from Google Fonts)
- Body font: Nunito 400/600

**World geometry (use BoxGeometry/CylinderGeometry primitives — no external GLTF needed):**
- Terrain: `<mesh rotation={[-Math.PI/2,0,0]}><planeGeometry args={[100,100]}/><meshLambertMaterial color="#C8A573"/></mesh>`
- Trees: tall thin box (trunk) + short wide box (canopy) in `#4A7C59`
- Buildings: simple flat boxes in muted colours
- Car: 2 boxes (body + cabin) + 4 cylinders (wheels), color `#E84B30`
- Zone markers: `<TorusGeometry args={[2,0.1,16,32]}/>` in `#E8A23C` with emissive

**Boundary walls (invisible — physics only):**
```tsx
// In <World>, surround terrain with 4 CuboidCollider slabs
const W = 50
const walls = [
  { pos: [0, 2, -W/2] as [number,number,number], args: [W/2, 4, 0.5] as [number,number,number] },
  { pos: [0, 2,  W/2] as [number,number,number], args: [W/2, 4, 0.5] as [number,number,number] },
  { pos: [-W/2, 2, 0] as [number,number,number], args: [0.5, 4, W/2] as [number,number,number] },
  { pos: [ W/2, 2, 0] as [number,number,number], args: [0.5, 4, W/2] as [number,number,number] },
]
// <RigidBody type="fixed"><CuboidCollider args={wall.args} position={wall.pos} /></RigidBody>
```

**Car controls (Rapier RigidBody):**
```tsx
useFrame(() => {
  const velocity = { x: 0, z: 0 }
  if (keys.forward) velocity.z -= SPEED
  if (keys.backward) velocity.z += SPEED
  if (keys.left) velocity.x -= SPEED
  if (keys.right) velocity.x += SPEED
  carRef.current?.setLinvel(velocity, true)
  // Camera: lerp to position 8 units behind car
})
```

**Zones array:**
```typescript
const zones = [
  { id: 'about', position: [-20, 0, -15], label: 'ABOUT' },
  { id: 'projects', position: [20, 0, -15], label: 'PROJECTS' },
  { id: 'skills', position: [-20, 0, 20], label: 'SKILLS' },
  { id: 'contact', position: [20, 0, 20], label: 'CONTACT' },
]
```

Detect proximity: `distance(carPosition, zone.position) < 8` → set active zone in Zustand store.

---

### v0

Design and build a 3D interactive portfolio using shadcn/ui for the 2D panel components and React Three Fiber for the 3D world.

**Layout:** Full-viewport canvas (R3F) behind fixed 2D UI layer. HUD overlays top and bottom. ZonePanel is a shadcn `<Card>` with glassmorphic override styles, centered bottom.

**shadcn components to use:**
- `<Card>` + `<CardHeader>` + `<CardContent>` → ZonePanel
- `<Badge>` → tech stack tags (styled with `#E8A23C` accent)
- `<Button>` → project links, CTA (variant="outline" with amber border)
- `<Progress>` → loading screen progress bar

**CSS overrides for glassmorphic panels:**
```css
.zone-panel {
  background: rgba(10,12,20,0.82);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(232,162,60,0.25);
  border-radius: 12px;
}
.zone-panel h2 {
  font-family: 'Amatic SC', cursive;
  font-weight: 700;
  font-size: 2rem;
  color: #E8A23C;
}
.zone-panel p { font-family: 'Nunito', sans-serif; color: #F0EBE0; }
.tech-badge {
  background: rgba(232,162,60,0.15);
  border: 1px solid rgba(232,162,60,0.4);
  color: #E8A23C;
  border-radius: 6px;
}
```

**3D scene structure:**
```tsx
<Canvas shadows camera={{ position: [0, 8, 12], fov: 60 }}>
  <ambientLight intensity={0.6} />
  <directionalLight position={[10, 20, 10]} intensity={1.2} color="#FFD89B" castShadow />
  <fog attach="fog" args={['#1B2A4A', 40, 80]} />
  <Physics gravity={[0, -9.81, 0]}>
    <World />
    <Car />
    <ZoneMarkers />
  </Physics>
  <Sky sunPosition={[10, 2, 5]} />
  <EffectComposer>
    <Bloom intensity={0.4} luminanceThreshold={0.8} />
  </EffectComposer>
</Canvas>
```

**Project card inside ZonePanel:**
```tsx
<Card className="zone-panel w-[420px] max-w-[92vw]">
  <CardHeader><h2 className="amatic">PROJECTS</h2></CardHeader>
  <CardContent>
    {projects.map(p => (
      <div key={p.id} className="mb-4 border-b border-[rgba(232,162,60,0.15)] pb-4">
        <h3 className="nunito font-semibold text-[#F0EBE0]">{p.title}</h3>
        <p className="text-sm text-[rgba(240,235,224,0.6)] mb-2">{p.description}</p>
        <div className="flex gap-2 flex-wrap mb-2">
          {p.stack.map(tag => <Badge key={tag} className="tech-badge">#{tag}</Badge>)}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" asChild><a href={p.live}>Live ↗</a></Button>
          <Button variant="outline" size="sm" asChild><a href={p.github}>GitHub</a></Button>
        </div>
      </div>
    ))}
  </CardContent>
</Card>
```

---

### Claude Artifacts

```text
You are a senior creative developer specialising in React Three Fiber and interactive WebGL experiences.

Build a 3D interactive portfolio for a creative developer. The visitor drives a physics-enabled car through a low-poly 3D world to discover portfolio content. This is the canonical scaffold — read all 7 files before writing any code.

TECH STACK: React 18 + Vite + TypeScript strict + React Three Fiber + @react-three/drei + @react-three/rapier + Framer Motion + Howler.js + Zustand + Tailwind CSS

DESIGN SYSTEM:
- Fonts: Amatic SC 700 (headings) + Nunito 400/600 (body) — Google Fonts
- Terrain: #C8A573, Sky: #1B2A4A, Road: #3D3D3D, Vegetation: #4A7C59
- Car: #E84B30, Zone glow: #E8A23C
- Panel: rgba(10,12,20,0.82) + blur(14px), text: #F0EBE0, border: rgba(232,162,60,0.25)
- All UI radius: 12px panels / 6px tags / 99px CTAs

CRITICAL RULES:
- Music MUST default to OFF (browser autoplay policy)
- World must have invisible RigidBody boundary walls — car cannot escape
- ZonePanel must close on Escape + click-outside + ✕ button
- All 4 zones must have accessible fallback routes (/about, /projects, /skills, /contact)
- Never trust client-side content edits — content.ts is the single source of truth
- Camera: third-person, 8 units behind car, smooth lerp (factor 0.08)
- Proximity threshold: 8 world units to trigger zone panel
```

**Four defining constraints:**

**1. Music defaults OFF — browser autoplay policy**
`musicEnabled` initializes as `false` in `useWorldStore`. The Howler `Howl` instance is created in `<MusicToggle>` but `.play()` is only called inside a `useEffect` watching `musicEnabled`. When `false`, `.pause()` is called. Toggle button sets `musicEnabled: true` on first click. Persisted to localStorage — but default is always `false` for new visitors.

**2. Invisible Rapier boundary walls**
Four `<RigidBody type="fixed">` elements in `<World>`, each wrapping a `<CuboidCollider>` with no mesh geometry. Positions derived from `WORLD_SIZE = 50`. Zero visible geometry — only the physics collider. Never use opacity-0 meshes; the collider alone suffices in Rapier.

**3. Zone activation is proximity-only — no click**
`activeZone` in `useWorldStore` is set inside `useFrame` in `<Car>`. Distance check runs every frame: `sqrt((x1-x2)² + (z1-z2)²) < PROXIMITY_THRESHOLD`. When all zones are farther, `setActiveZone(null)`. `<ZonePanel>` reads `activeZone` — it has no local open/close state. `<AnimatePresence>` with `key={activeZone}` handles enter/exit.

**4. Panel closes via three routes — all call setActiveZone(null)**
(a) Escape key: `useEffect` in `<ZonePanel>` listens to `window.keydown`, checks `e.key === 'Escape'`, calls `setActiveZone(null)`, cleanup on unmount. (b) Backdrop: full-screen `<div className="fixed inset-0 z-40" onClick={...} />` behind the panel. (c) Explicit `<button aria-label="Close" onClick={...}>✕</button>` in the panel header.

---

### Grok

```text
You are building a 3D interactive portfolio website. Read all 7 scaffold files before writing any code. Then implement one task at a time from 06_Tasks.md.

PROJECT: Interactive 3D world portfolio — visitor drives a car to discover content zones.

STACK: React 18 + Vite + TypeScript + React Three Fiber + Rapier + Framer Motion + Zustand + Howler + Tailwind

DESIGN TOKENS:
fonts: { display: 'Amatic SC', body: 'Nunito' }
colors: {
  terrain: '#C8A573', sky: '#1B2A4A', road: '#3D3D3D', veg: '#4A7C59',
  car: '#E84B30', accent: '#E8A23C',
  panelBg: 'rgba(10,12,20,0.82)', panelText: '#F0EBE0',
  panelBorder: 'rgba(232,162,60,0.25)'
}
physics: { gravity: [0, -9.81, 0], carSpeed: 12, carTurnSpeed: 2.5 }
zones: [
  { id: 'about',    position: [-20, 0, -15] },
  { id: 'projects', position: [20,  0, -15] },
  { id: 'skills',   position: [-20, 0,  20] },
  { id: 'contact',  position: [20,  0,  20] },
]
proximityThreshold: 8

FILE GENERATION ORDER:
1. src/types/index.ts — Zone, Project, Skill, ZoneContent interfaces
2. src/data/content.ts — zone content (about text, projects[], skills[], contact)
3. src/data/zones.ts — ZONES array + PROXIMITY_THRESHOLD + WORLD_SIZE
4. src/store/worldStore.ts — Zustand store (activeZone, isLoaded, musicEnabled, carPosition)
5. src/components/LoadingScreen.tsx — progress bar, Amatic SC title
6. src/components/World.tsx — terrain, roads, trees, boundary walls
7. src/components/Car.tsx — RigidBody + WASD controls + camera lerp + proximity detection
8. src/components/ZoneMarker.tsx — amber torus + emissive glow
9. src/components/ZonePanel.tsx — Framer Motion slide-up + content slot + close handlers
10. src/components/ProjectCard.tsx — title, description, stack tags, links
11. src/components/HUD.tsx — fixed overlay, name + hints
12. src/components/MobileJoystick.tsx — touch joystick
13. src/components/MusicToggle.tsx — Howler integration, default OFF
14. src/App.tsx — Canvas + Physics + all components assembled

WORLD STATE (Zustand):
interface WorldStore {
  activeZone: string | null
  isLoaded: boolean
  musicEnabled: boolean
  carPosition: [number, number, number]
  setActiveZone: (zone: string | null) => void
  setLoaded: (v: boolean) => void
  toggleMusic: () => void
  setCarPosition: (pos: [number, number, number]) => void
}

NON-NEGOTIABLES:
- Music off by default
- Invisible boundary walls in Rapier
- Panel: Escape + outside click + ✕ all close it
- Accessible fallback pages for all 4 zones
```

---

### Gemini

**Project brief for Gemini:** Upload all 7 scaffold files. First summarise the PRD and Architecture before writing any code.

Build a 3D portfolio site where the visitor drives a car through a world to find content zones. The experience is built with React Three Fiber, Rapier physics, and Framer Motion for 2D UI.

**Summary checklist before coding:**
- [ ] Confirmed tech stack: React + Vite + TypeScript + R3F + Rapier + Framer Motion + Zustand + Howler + Tailwind
- [ ] Confirmed 4 zones: About (−20,0,−15), Projects (20,0,−15), Skills (−20,0,20), Contact (20,0,20)
- [ ] Confirmed design: Amatic SC + Nunito fonts; #C8A573 terrain; #1B2A4A sky; #E8A23C accent; #E84B30 car
- [ ] Confirmed panel: glassmorphic, rgba(10,12,20,0.82) bg, 12px radius
- [ ] Confirmed physics: Rapier gravity −9.81, car speed 12, proximity threshold 8 world units
- [ ] Confirmed constraints: music off by default; boundary walls; accessible fallbacks at /about /projects /skills /contact

**Gemini-specific instructions:**
- Generate `src/data/content.ts` first with all zone content (bio, projects array, skills, contact)
- Then generate `src/data/zones.ts` (ZONES array, PROXIMITY_THRESHOLD, WORLD_SIZE constants)
- Then generate `src/store/worldStore.ts` (Zustand with persist, musicEnabled defaults false)
- Then generate each 3D component in order: World → Car → ZoneMarkers → ZonePanel → HUD → LoadingScreen
- After each component, confirm it compiles before proceeding
- Do not generate audio integration until all visual components are confirmed working
- Generate accessible fallback routes (/about, /projects, /skills, /contact) last

---

### Cursor

**Cursor instructions:** Use `@` to reference each scaffold file as you work. Start with `@06_Tasks.md` and execute tasks in sequence. Use `@03_Design.md` whenever you need design token values.

```text
@00_Orchestrator.md @01_PRD.md @02_Architecture.md @03_Design.md

Build the 3D interactive portfolio scaffold. I'm using:
- React 18 + Vite + TypeScript strict
- React Three Fiber + @react-three/drei + @react-three/rapier
- Framer Motion, Zustand, Howler.js, Tailwind CSS

Start with TASK-001 from @06_Tasks.md.

Key constraints to keep in mind throughout:
- Music ALWAYS defaults to off
- ZonePanel closes on: Escape key, click outside, ✕ button
- Proximity trigger: < 8 world units from zone center
- Camera: lerp factor 0.08, always 8 units behind car, 4 units above
- All physics boundary walls must be invisible (no mesh, only collider)
- Accessible fallback: each zone has a /[zone-id] route with static HTML content
- Font: Amatic SC for ALL headings and zone labels; Nunito for ALL body text
- Panel background: rgba(10,12,20,0.82) — never opaque black
- Accent color #E8A23C — used for glows, zone labels, active states only
```

**ZonePanel.tsx — full implementation:**
```tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useWorldStore } from '@/store/worldStore'

export function ZonePanel() {
  const activeZone = useWorldStore(s => s.activeZone)
  const setActiveZone = useWorldStore(s => s.setActiveZone)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveZone(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setActiveZone])

  return (
    <AnimatePresence>
      {activeZone && (
        <>
          {/* Backdrop — click outside to close */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setActiveZone(null)}
          />
          <motion.div
            key={activeZone}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[420px] max-w-[92vw] rounded-xl p-7"
            style={{
              background: 'rgba(10,12,20,0.82)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(232,162,60,0.25)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <button
              aria-label="Close panel"
              className="absolute top-4 right-4 text-[rgba(240,235,224,0.6)] hover:text-[#F0EBE0] text-lg"
              onClick={() => setActiveZone(null)}
            >
              ✕
            </button>
            <ZoneContent zone={activeZone} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

**Car.tsx — proximity detection inside useFrame:**
```tsx
import { useFrame } from '@react-three/fiber'
import { useRapier } from '@react-three/rapier'
import { useWorldStore } from '@/store/worldStore'
import { ZONES, PROXIMITY_THRESHOLD } from '@/data/zones'

function dist2D(a: [number,number,number], b: [number,number,number]) {
  return Math.sqrt((a[0]-b[0])**2 + (a[2]-b[2])**2)
}

// Inside Car component:
useFrame(() => {
  const pos = carRef.current?.translation()
  if (!pos) return
  const carPos: [number,number,number] = [pos.x, pos.y, pos.z]
  setCarPosition(carPos)

  const near = ZONES.find(z => dist2D(carPos, z.position) < PROXIMITY_THRESHOLD)
  setActiveZone(near?.id ?? null)
})
```

**Accessible fallback routes (src/app/about|projects|skills|contact/page.tsx):**
```tsx
// Each fallback renders the same content as the 3D zone panel
// but as a standard Next.js page for screen readers and no-WebGL environments
import { content } from '@/data/content'

export default function AboutPage() {
  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <h1 className="font-['Amatic_SC'] text-4xl font-bold text-[#E8A23C] mb-6">About</h1>
      <p className="font-['Nunito'] text-[#F0EBE0]/90 leading-relaxed">{content.about.bio}</p>
    </main>
  )
}
```
Add `<link rel="alternate" href="/about">` in `LoadingScreen` for screen reader users.

**QA grep commands:**
```bash
# Music never auto-plays — musicEnabled must initialize false
grep -r "musicEnabled" src/store/ | grep "false"

# No hardcoded hex colors in tsx files (accent must come from tokens)
grep -rn "#E8A23C\|#C8A573\|#1B2A4A" src/components/

# All whileInView must have viewport once:true
grep -rn "whileInView" src/ | grep -v "once: true"

# No mesh geometry on boundary walls
grep -A5 "boundary\|wall" src/components/World.tsx | grep -v "CuboidCollider"

# ZonePanel must not have local isOpen state
grep -n "useState" src/components/ZonePanel.tsx

# Proximity threshold is a constant — never hardcoded
grep -rn "< 8\|> 8\|=== 8" src/components/ | grep -v "PROXIMITY_THRESHOLD"

# Accessible fallback pages exist for all 4 zones
ls src/app/about/page.tsx src/app/projects/page.tsx src/app/skills/page.tsx src/app/contact/page.tsx

# Boundary walls: 4 RigidBody elements, no mesh geometry
grep -c "RigidBody" src/components/World.tsx
```
