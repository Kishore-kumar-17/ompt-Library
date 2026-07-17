# 02 — Architecture
## Interactive 3D World Portfolio · portfolio_platform_01

---

### 1. Architecture Decision

Client-side SPA. No server required. React + Vite + TypeScript. All 3D runs in the browser via React Three Fiber (Three.js). Static content served from `src/data/content.ts`. Deployed to Vercel or Netlify as a static site.

Accessible fallback routes handled by React Router — same app, different views, no 3D loaded on fallback routes.

---

### 2. Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | React 18 + Vite | Fast HMR, ideal for Three.js dev |
| Language | TypeScript strict | Type-safe 3D state, physics params |
| 3D | React Three Fiber (`@react-three/fiber`) | React bindings for Three.js |
| 3D Helpers | `@react-three/drei` | Camera controls, Sky, Text, etc. |
| Physics | `@react-three/rapier` | Rapier WASM physics for car + world |
| 2D Animation | Framer Motion | ZonePanel slide animations |
| State | Zustand | activeZone, music, isLoaded, carPos |
| Audio | Howler.js | Engine loop, collision SFX, music |
| Styling | Tailwind CSS | 2D UI chrome only |
| Post-processing | `@react-three/postprocessing` | Bloom on zone markers (optional) |
| Routing | React Router v6 | `/` (3D world) + fallback routes |

---

### 3. Folder Structure

```text
src/
├── components/
│   ├── world/
│   │   ├── World.tsx            ← terrain, road, decorations
│   │   ├── Car.tsx              ← RigidBody car + WASD + camera
│   │   ├── ZoneMarker.tsx       ← glowing torus + label + proximity
│   │   ├── Boundary.tsx         ← invisible RigidBody walls
│   │   └── Decorations.tsx      ← trees, rocks, signs (geometry prims)
│   ├── ui/
│   │   ├── ZonePanel.tsx        ← glassmorphic panel, Framer Motion
│   │   ├── HUD.tsx              ← creator name, control hints
│   │   ├── LoadingScreen.tsx    ← progress overlay
│   │   ├── MusicToggle.tsx      ← top-right audio toggle
│   │   ├── MobileJoystick.tsx   ← touch joystick (touch devices only)
│   │   └── panels/
│   │       ├── AboutPanel.tsx
│   │       ├── ProjectsPanel.tsx
│   │       ├── SkillsPanel.tsx
│   │       └── ContactPanel.tsx
├── pages/
│   ├── World3D.tsx              ← main 3D experience route "/"
│   ├── AboutPage.tsx            ← accessible fallback "/about"
│   ├── ProjectsPage.tsx         ← accessible fallback "/projects"
│   ├── SkillsPage.tsx           ← accessible fallback "/skills"
│   └── ContactPage.tsx          ← accessible fallback "/contact"
├── store/
│   └── worldStore.ts            ← Zustand store
├── hooks/
│   ├── useKeyboard.ts           ← WASD key state
│   ├── useProximity.ts          ← zone proximity detection
│   ├── useAudio.ts              ← Howler.js abstraction
│   └── useDeviceType.ts         ← touch vs desktop detection
├── data/
│   └── content.ts               ← all portfolio content (single source of truth)
├── lib/
│   ├── constants.ts             ← zone positions, thresholds, physics params
│   └── utils.ts                 ← distance3D(), clamp(), lerp()
├── assets/
│   ├── audio/
│   │   ├── engine.mp3
│   │   ├── collision.mp3
│   │   └── ambient.mp3
│   └── models/                  ← optional GLTF files
├── App.tsx
├── main.tsx
└── index.css
```

---

### 4. World State (Zustand)

```typescript
// src/store/worldStore.ts
interface WorldStore {
  // Scene state
  isLoaded: boolean
  loadProgress: number

  // Navigation state
  activeZone: string | null        // 'about' | 'projects' | 'skills' | 'contact' | null
  carPosition: [number, number, number]

  // UI state
  musicEnabled: boolean
  isPanelOpen: boolean

  // Actions
  setLoaded: (v: boolean) => void
  setLoadProgress: (p: number) => void
  setActiveZone: (zone: string | null) => void
  setCarPosition: (pos: [number, number, number]) => void
  toggleMusic: () => void
  openPanel: () => void
  closePanel: () => void
}

// musicEnabled persisted to localStorage
```

---

### 5. World Constants

```typescript
// src/lib/constants.ts
export const WORLD_SIZE = 100          // world plane: 100×100 units

export const ZONES = [
  { id: 'about',    position: [-20, 0, -15] as const, label: 'ABOUT'    },
  { id: 'projects', position: [ 20, 0, -15] as const, label: 'PROJECTS' },
  { id: 'skills',   position: [-20, 0,  20] as const, label: 'SKILLS'   },
  { id: 'contact',  position: [ 20, 0,  20] as const, label: 'CONTACT'  },
]

export const PROXIMITY_THRESHOLD = 8  // world units
export const CAMERA_LERP = 0.08
export const CAMERA_OFFSET = { y: 4, z: 8 }

export const CAR_SPEED = 12
export const CAR_TURN_SPEED = 2.5
export const GRAVITY = -9.81
```

---

### 6. Proximity Detection Pattern

```typescript
// src/hooks/useProximity.ts
import { useFrame } from '@react-three/fiber'
import { useWorldStore } from '../store/worldStore'
import { ZONES, PROXIMITY_THRESHOLD } from '../lib/constants'
import { distance3D } from '../lib/utils'

export function useProximity(carRef: React.RefObject<THREE.Group>) {
  const { setActiveZone, activeZone } = useWorldStore()

  useFrame(() => {
    if (!carRef.current) return
    const carPos = carRef.current.position

    const nearestZone = ZONES.find(zone => {
      const [zx, zy, zz] = zone.position
      return distance3D(carPos, { x: zx, y: zy, z: zz }) < PROXIMITY_THRESHOLD
    })

    const nextZone = nearestZone?.id ?? null
    if (nextZone !== activeZone) setActiveZone(nextZone)
  })
}

// src/lib/utils.ts
export function distance3D(
  a: { x: number; y: number; z: number },
  b: { x: number; y: number; z: number }
): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2)
}
```

---

### 7. Car Controller Pattern

```typescript
// src/components/world/Car.tsx (simplified)
import { RigidBody, RigidBodyApi } from '@react-three/rapier'
import { useFrame, useThree } from '@react-three/fiber'
import { useKeyboard } from '../../hooks/useKeyboard'

export function Car() {
  const rigidBodyRef = useRef<RigidBodyApi>(null)
  const meshRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const keys = useKeyboard()

  useFrame(() => {
    if (!rigidBodyRef.current) return
    const pos = rigidBodyRef.current.translation()
    const vel = { x: 0, y: 0, z: 0 }

    if (keys.forward)  vel.z -= CAR_SPEED
    if (keys.backward) vel.z += CAR_SPEED
    if (keys.left)     vel.x -= CAR_SPEED
    if (keys.right)    vel.x += CAR_SPEED

    // Preserve vertical velocity (gravity)
    vel.y = rigidBodyRef.current.linvel().y
    rigidBodyRef.current.setLinvel(vel, true)

    // Camera follow: lerp toward offset position behind car
    const targetPos = {
      x: pos.x,
      y: pos.y + CAMERA_OFFSET.y,
      z: pos.z + CAMERA_OFFSET.z,
    }
    camera.position.lerp(targetPos as any, CAMERA_LERP)
    camera.lookAt(pos.x, pos.y + 1, pos.z)

    // Update store
    useWorldStore.getState().setCarPosition([pos.x, pos.y, pos.z])
  })

  return (
    <RigidBody ref={rigidBodyRef} colliders="cuboid" mass={1} linearDamping={5} angularDamping={5}>
      <group ref={meshRef}>
        {/* Car body */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[1.6, 0.6, 3]} />
          <meshLambertMaterial color="#E84B30" />
        </mesh>
        {/* Car cabin */}
        <mesh position={[0, 0.85, 0.2]} castShadow>
          <boxGeometry args={[1.2, 0.5, 1.6]} />
          <meshLambertMaterial color="#E84B30" />
        </mesh>
        {/* Wheels: 4× CylinderGeometry */}
      </group>
    </RigidBody>
  )
}
```

---

### 8. Audio Architecture

```typescript
// src/hooks/useAudio.ts
import { Howl, Howler } from 'howler'
import { useEffect, useRef } from 'react'

const engineSound = new Howl({ src: ['/audio/engine.mp3'], loop: true, volume: 0 })
const collisionSound = new Howl({ src: ['/audio/collision.mp3'], volume: 0.6 })
const ambientMusic = new Howl({ src: ['/audio/ambient.mp3'], loop: true, volume: 0.3, autoplay: false })

export function useAudio(speed: number, musicEnabled: boolean) {
  useEffect(() => {
    // Engine pitch scales with speed
    engineSound.rate(0.8 + (speed / CAR_SPEED) * 0.4)
    engineSound.volume(0.3 + (speed / CAR_SPEED) * 0.3)
  }, [speed])

  useEffect(() => {
    if (musicEnabled) ambientMusic.play()
    else ambientMusic.pause()
  }, [musicEnabled])
}

// Music starts ONLY after user interaction — never on page load
```

---

### 9. Accessible Fallback Routes

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      {/* Skip nav for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content (no 3D required)
      </a>
      <Routes>
        <Route path="/"         element={<World3D />} />
        <Route path="/about"    element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/skills"   element={<SkillsPage />} />
        <Route path="/contact"  element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

---

### 10. Environment Variables

```bash
# .env
VITE_OWNER_NAME="Your Name"
VITE_OWNER_TAGLINE="Creative Developer"
VITE_CONTACT_EMAIL="your@email.com"
```

No server-side secrets — this is a fully client-side static site.

---

### 11. Performance Notes

- Use `<Suspense>` + `useProgress` from `@react-three/drei` for asset loading tracking
- Instanced meshes for repeated world objects (trees, rocks)
- Bloom post-processing is optional — disable on low-end devices (`navigator.hardwareConcurrency < 4`)
- Shadow casting: car + large buildings only (not every decoration)
- Mobile: reduce shadow map size to 512, disable post-processing

---

### 12. Component Interaction Diagram

```
App.tsx (BrowserRouter)
│
├── Route "/"  → WorldErrorBoundary → Suspense → World3D.tsx
│                                                    │
│               ┌────────────────────────────────────┤
│               │ Canvas (R3F)     │ 2D Overlay       │
│               │  Physics          │  LoadingScreen   │
│               │   World.tsx       │  HUD.tsx         │
│               │   Car.tsx ────────┼→ useProximity    │
│               │   ZoneMarkers.tsx │  ZonePanel.tsx   │
│               │   Boundary.tsx    │   AboutPanel     │
│               │                   │   ProjectsPanel  │
│               │                   │   SkillsPanel    │
│               │                   │   ContactPanel   │
│               └───────────────────┴──────────────────┘
│
├── Route "/about"    → AboutPage.tsx    (no Three.js)
├── Route "/projects" → ProjectsPage.tsx (no Three.js)
├── Route "/skills"   → SkillsPage.tsx   (no Three.js)
└── Route "/contact"  → ContactPage.tsx  (no Three.js)

State flow:
  Car.tsx (useFrame) → worldStore.setCarPosition
  useProximity       → worldStore.setActiveZone
  ZonePanel          ← worldStore.activeZone (read)
  HUD                ← worldStore (read: name, tagline, musicEnabled)
  LoadingScreen      ← worldStore.isLoaded, loadProgress
```

---

### 13. Data Flow: Store → Components

```typescript
// Who reads what from worldStore:
//
// LoadingScreen    → isLoaded, loadProgress
// HUD              → musicEnabled, toggleMusic
// ZonePanel        → activeZone, isPanelOpen, closePanel
// Car.tsx          → setCarPosition (write only)
// useProximity     → carPosition (read), setActiveZone (write)
// useAudio         → musicEnabled (read)
// ProgressTracker  → setLoaded, setLoadProgress (write only)
//
// Rule: 3D components inside <Canvas> may call store selectors.
// Rule: 2D components outside <Canvas> may call store selectors.
// Rule: Never pass worldStore state via props through App.tsx — always select directly.
```

---

### 14. Bundle Architecture

```
dist/
├── index.html                         (< 1kb)
├── assets/
│   ├── index-[hash].css               (Tailwind, ~15kb)
│   ├── app-[hash].js                  (React + Router + UI, ~120kb)
│   ├── three-vendor-[hash].js         (Three.js + R3F + Rapier, ~700kb)
│   └── ui-vendor-[hash].js            (Framer Motion + Zustand, ~60kb)
├── audio/
│   ├── engine.mp3
│   ├── collision.mp3
│   └── ambient.mp3
└── fonts/
    └── AmaticSC-Bold.ttf

Initial load (visiting /about): index.html + app-[hash].js + index.css
Three.js chunk loaded only when visiting "/" and Suspense boundary resolves.
```

Chunk split configured in `vite.config.ts` via `rollupOptions.output.manualChunks`.

---

### 15. Rapier WASM Loading

Rapier physics is WASM — it must be loaded asynchronously before physics can run. This is handled by `@react-three/rapier`'s `<Physics>` component internally, but it adds ~1–2 seconds to the loading sequence.

```tsx
// Loading sequence:
// 1. React app mounts → LoadingScreen shows at 0%
// 2. R3F Canvas mounts → Three.js scene begins
// 3. Rapier WASM fetches → Physics initialises
// 4. Assets (textures, fonts via Drei <Text>) load
// 5. useProgress() from Drei → loadProgress 0→100
// 6. active === false → setLoaded(true) → LoadingScreen fades
//
// DO NOT call setLoaded(true) before useProgress().active is false
// DO NOT use a timer — always use Drei's actual progress event
```

---

### 16. React Router and Static Hosting

```typescript
// src/App.tsx — full route setup
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { WorldErrorBoundary } from './components/ui/WorldErrorBoundary'
import { AboutPage }    from './pages/AboutPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { SkillsPage }   from './pages/SkillsPage'
import { ContactPage }  from './pages/ContactPage'

const World3D = lazy(() => import('./pages/World3D'))

export default function App() {
  return (
    <BrowserRouter>
      <a href="/about" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded">
        Skip to accessible content (no 3D required)
      </a>
      <Routes>
        <Route path="/" element={
          <WorldErrorBoundary>
            <Suspense fallback={<LoadingScreen />}>
              <World3D />
            </Suspense>
          </WorldErrorBoundary>
        } />
        <Route path="/about"    element={<AboutPage />}    />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/skills"   element={<SkillsPage />}   />
        <Route path="/contact"  element={<ContactPage />}  />
      </Routes>
    </BrowserRouter>
  )
}
```

---

### 17. TypeScript Type Guards

```typescript
// src/types/index.ts — complete type definitions
export type ZoneId = 'about' | 'projects' | 'skills' | 'contact'

export interface Zone {
  id: ZoneId
  position: readonly [number, number, number]
  label: string
}

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
  emailUser: string     // split to thwart scrapers
  emailDomain: string
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

// Type guard for zone IDs
export function isZoneId(v: string | null): v is ZoneId {
  return v === 'about' || v === 'projects' || v === 'skills' || v === 'contact'
}
```

---

### 18. Security Considerations

| Risk | Mitigation |
|------|-----------|
| Email scraping | `emailUser` + `emailDomain` joined in JS only — never in static HTML |
| XSS via content | Content is static TypeScript, not user input — no sanitisation needed |
| Clickjacking | Not applicable for portfolio — no sensitive actions |
| Referrer leaks | All external links use `rel="noopener noreferrer"` |
| CORS | No API calls — fully static, no CORS headers needed |
| Supply chain | Lock dependencies with `package-lock.json`; review major dependency updates |
