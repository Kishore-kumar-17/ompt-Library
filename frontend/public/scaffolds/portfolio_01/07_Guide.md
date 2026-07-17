# 07 — Implementation Guide
## Interactive 3D World Portfolio · portfolio_platform_01

---

## 1. Core Principle: The World IS the Interface

This portfolio has no traditional pages, no hero sections, no scroll. The 3D world is the design. Every technical decision flows from this:

- 2D UI must never overpower the 3D canvas — glassmorphic panels are intentionally understated
- Performance matters more here than in a regular site — 60fps is the target, not a nice-to-have
- The experience must be complete before the first interaction — loading screen cannot disappear early

---

## 2. Non-Negotiable Rules

| Rule | Correct | Wrong |
|------|---------|-------|
| Music default | `musicEnabled: false` | Playing on load |
| Panel close | Escape + click-outside + ✕ | Any single method only |
| Boundary walls | Invisible `CuboidCollider` | Visible mesh OR missing |
| Panel fonts | Amatic SC for headings, Nunito for body | Swapped or mixed |
| Fallback routes | Full content, no Three.js | Missing or broken |
| Email obfuscation | Constructed in JS | Raw string in HTML |
| Zone labels (3D) | Drei `<Text>` Amatic SC | div overlay on canvas |

---

## 3. The Physics Stack

```
@react-three/rapier (Rapier WASM)
  ├── <Physics gravity={[0, -9.81, 0]}>
  │   ├── <RigidBody type="fixed"> → terrain, boundary walls, buildings
  │   └── <RigidBody linearDamping={5} angularDamping={5}> → car
  └── Collision events: onCollisionEnter → play collision sound
```

**Critical physics parameters (do not change without asking):**
- `gravity`: `[0, -9.81, 0]` — realistic gravity
- `linearDamping: 5` — car slows naturally when keys released
- `angularDamping: 5` — prevents car spinning uncontrollably
- `lockRotations` on car — prevents car flipping over
- `mass: 1` on car — affects collision response

---

## 4. State Architecture

```
worldStore (Zustand + localStorage for musicEnabled only)
  │
  ├── isLoaded: bool         ← set by ProgressTracker when scene ready
  ├── loadProgress: 0–100    ← from Drei useProgress()
  ├── activeZone: string|null ← set by useProximity() based on car position
  ├── carPosition: [x,y,z]   ← written by Car.tsx every frame
  ├── musicEnabled: bool      ← persisted, always initialises to false
  └── isPanelOpen: bool       ← derived from activeZone

Data flow:
  Car.tsx useFrame → setCarPosition()
  useProximity useEffect → setActiveZone()
  ZonePanel reads activeZone → renders correct panel
  MusicToggle reads/writes musicEnabled → Howler responds
```

---

## 5. Zone Positioning Reference

```
World top-down view (Y up, looking down):

          North (Z negative)
               |
  (-20,0,-15)  |  (20,0,-15)
     ABOUT     |   PROJECTS
               |
West ──────────┼────────── East (X positive)
               |
  (-20,0,20)   |  (20,0,20)
     SKILLS    |   CONTACT
               |
          South (Z positive)

Car starts at: (0, 0.5, 5) — between zones, can drive to any
World boundaries: ±50 on X and Z
```

---

## 6. Proximity Detection Pattern

```typescript
// useProximity runs on carPosition changes (from store)
// Distance formula: straight-line 3D distance
// Threshold: 8 world units — generous enough to feel natural

// Why useEffect on carPosition (not useFrame):
// carPosition updates every frame anyway, and useEffect avoids
// running Three.js code outside the render loop.
// Alternative: run inside Car.tsx useFrame directly (also valid).
```

---

## 7. Audio Rules

```typescript
// WRONG — causes autoplay policy error:
const sound = new Howl({ src: ['...'], autoplay: true })

// CORRECT — only play after user gesture:
document.addEventListener('pointerdown', () => {
  engineSound.play()
}, { once: true })

// WRONG — music plays on mount:
useEffect(() => { ambientMusic.play() }, [])

// CORRECT — music plays only when user enables it:
useEffect(() => {
  if (musicEnabled) ambientMusic.fade(0, 0.3, 2000)
  else ambientMusic.fade(0.3, 0, 500)
}, [musicEnabled])
```

---

## 8. Glassmorphic Panel: Critical CSS

The panel must use `backdrop-filter: blur()` — this only works when:
1. The element has `background` with alpha < 1 (use `rgba`, not `rgb`)
2. The element is positioned above the canvas (not inside it)
3. The canvas has `position: fixed` so content is behind the panel

```css
/* This works: */
background: rgba(10, 12, 20, 0.82);
backdrop-filter: blur(14px);
-webkit-backdrop-filter: blur(14px); /* Safari */

/* This does NOT work: */
background: #0A0C14;   /* opaque — nothing to blur through */
background: rgba(10, 12, 20, 1); /* opaque alpha — nothing to blur */
```

---

## 9. Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| 3D components | PascalCase in `world/` | `Car.tsx`, `ZoneMarker.tsx` |
| 2D UI components | PascalCase in `ui/` | `ZonePanel.tsx`, `HUD.tsx` |
| Panel content | PascalCase in `ui/panels/` | `AboutPanel.tsx` |
| Hooks | `use` prefix, camelCase | `useKeyboard`, `useProximity` |
| Constants | SCREAMING_SNAKE_CASE | `PROXIMITY_THRESHOLD`, `CAMERA_LERP` |
| Store | `useWorldStore` | single store for all scene state |
| Content | `content.ts` export names | `owner`, `projects`, `skills`, `contact` |

---

## 10. Performance Patterns

**Instanced meshes for repeated objects:**
```tsx
// Wrong: 12 separate Tree components = 12 draw calls
{trees.map((t, i) => <Tree key={i} position={t.pos} />)}

// Correct: InstancedMesh = 1 draw call
<instancedMesh ref={meshRef} args={[undefined, undefined, 12]}>
  <boxGeometry args={[0.3, 2, 0.3]} />
  <meshLambertMaterial color="#4A7C59" />
</instancedMesh>
```

**Shadow casting limit:**
```tsx
// Only these cast shadows:
<mesh castShadow>  ← Car body/cabin
<mesh castShadow>  ← Major buildings (2-3 max)

// These should NOT cast shadows:
<mesh>  ← terrain, road, small rocks, trees (use receiveShadow on terrain only)
```

**Bloom post-processing (optional):**
```tsx
const isLowEnd = navigator.hardwareConcurrency < 4
// Only mount EffectComposer if !isLowEnd
```

---

## 11. Mobile-Specific Patterns

```typescript
// Device detection (once on mount, not reactive):
const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window

// Joystick direction → car input:
// Joystick exposes { x: -1→1, z: -1→1 }
// Merge with keyboard in Car.tsx useFrame:
const direction = {
  x: keys.left ? -1 : keys.right ? 1 : joystick.x,
  z: keys.forward ? -1 : keys.backward ? 1 : joystick.z,
}
rigidBody.setLinvel({ x: direction.x * CAR_SPEED, y: linvel.y, z: direction.z * CAR_SPEED }, true)
```

---

## 12. Accessible Fallback Pages Pattern

```tsx
// pages/ProjectsPage.tsx
import { projects } from '../data/content'

export default function ProjectsPage() {
  return (
    <main id="main-content" className="max-w-2xl mx-auto p-8" style={{ background: '#0A0C14', color: '#F0EBE0', minHeight: '100vh' }}>
      <h1 style={{ fontFamily: 'Amatic SC', fontSize: '2.5rem', color: '#E8A23C' }}>Projects</h1>
      <ul className="space-y-8 mt-6">
        {projects.map(p => (
          <li key={p.id}>
            <h2 style={{ fontFamily: 'Nunito', fontWeight: 600 }}>{p.title}</h2>
            <p style={{ fontFamily: 'Nunito' }}>{p.description}</p>
            <div>{p.stack.map(tag => <span key={tag} className="mr-2">#{tag}</span>)}</div>
            <a href={p.liveUrl} target="_blank" rel="noopener">Live ↗</a>
            <a href={p.githubUrl} target="_blank" rel="noopener" className="ml-4">GitHub</a>
          </li>
        ))}
      </ul>
    </main>
  )
}
```

These pages must load with zero JavaScript if the user disables JS — use React's SSR if hosting on Next.js.

---

## 13. Common Mistakes

**Physics:**
- ❌ `<RigidBody>` without `lockRotations` on car → car flips over when hitting walls
- ❌ Missing `linearDamping` → car keeps sliding after keys released
- ❌ Boundary walls as visible mesh → breaks the "invisible wall" illusion

**Audio:**
- ❌ `autoplay: true` on any Howl → browser blocks, console error
- ❌ `ambientMusic.play()` in component mount → blocked by autoplay policy
- ❌ Music toggle starts as `true` → user surprise on load

**Panels:**
- ❌ Only Escape closes the panel → fails for mouse users and mobile
- ❌ Panel inside canvas → `backdrop-filter` won't work; panel is part of 3D scene
- ❌ Opaque panel background → defeats glassmorphic effect entirely

**Fonts:**
- ❌ Nunito for zone labels in 3D → use Drei `<Text>` with Amatic SC TTF
- ❌ Amatic SC for project descriptions → hard to read at body size
- ❌ Forgetting `-webkit-backdrop-filter` → panel appears solid on Safari

**Performance:**
- ❌ Shadow casting on terrain → inverts shadow direction, causes artifacts
- ❌ Unique geometry per tree instance → kills frame rate on 12+ objects
- ❌ `useProgress` not connected to store → loading screen never disappears

---

## 14. Deployment

Static deployment to Vercel or Netlify:
```bash
npm run build
# dist/ folder is the deployable artifact
```

`vite.config.ts` — ensure base path is correct if deploying to a subdirectory.

No environment variables needed — all content in `content.ts`. If email obfuscation is insufficient, consider a Vercel Edge Function contact form endpoint.

**Audio files:** Place in `public/audio/` — Vite serves these as static assets at `/audio/filename.mp3`.

**Font files for Drei `<Text>`:** Place Amatic SC TTF in `public/fonts/AmaticSC-Bold.ttf` and reference via `font="/fonts/AmaticSC-Bold.ttf"` on the `<Text>` component.

---

## 15. vite.config.ts — Recommended Setup

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei', '@react-three/rapier'],
          'ui-vendor': ['framer-motion', 'zustand', 'react-router-dom'],
        },
      },
    },
    target: 'es2020',
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
})
```

Chunking Three.js separately ensures `/about` and other fallback routes load < 50kb of JavaScript.

---

## 16. TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

`strict: true` + `noUnusedLocals` catches dead code early. Run `tsc --noEmit` before every commit.

---

## 17. Error Boundary for the 3D World

Wrap the `World3D` route in an error boundary so a Three.js crash doesn't kill the entire app:

```tsx
// src/components/ui/WorldErrorBoundary.tsx
import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean; error: Error | null }

export class WorldErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: '#0A0C14', color: '#F0EBE0', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'Nunito, sans-serif' }}>
          <h1 style={{ fontFamily: 'Amatic SC, cursive', fontSize: '2.5rem', color: '#E8A23C' }}>3D World Failed to Load</h1>
          <p style={{ marginBottom: '1.5rem' }}>Your browser may not support WebGL. Try the accessible version:</p>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <a href="/about" style={{ color: '#E8A23C' }}>About</a>
            <a href="/projects" style={{ color: '#E8A23C' }}>Projects</a>
            <a href="/skills" style={{ color: '#E8A23C' }}>Skills</a>
            <a href="/contact" style={{ color: '#E8A23C' }}>Contact</a>
          </nav>
        </div>
      )
    }
    return this.props.children
  }
}
```

Usage in `App.tsx`:
```tsx
<Route path="/" element={
  <WorldErrorBoundary>
    <Suspense fallback={<LoadingScreen />}>
      <World3D />
    </Suspense>
  </WorldErrorBoundary>
} />
```

---

## 18. Keyboard Focus and Accessibility Rules

All interactive 2D elements (ZonePanel ✕ button, music toggle, links inside panels) must have visible focus rings:

```css
/* index.css — global focus style */
:focus-visible {
  outline: 2px solid #E8A23C;
  outline-offset: 3px;
  border-radius: 4px;
}

/* Suppress for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

**Tab order inside ZonePanel:**
1. ✕ close button (first tab stop when panel opens — use `autoFocus`)
2. All links in panel content
3. Tab wraps inside panel while open (focus trap)

**Focus trap implementation:**
```typescript
// On panel open, trap focus inside panel
useEffect(() => {
  if (!isPanelOpen || !panelRef.current) return
  const focusable = panelRef.current.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  first?.focus()

  const trapFocus = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }
  document.addEventListener('keydown', trapFocus)
  return () => document.removeEventListener('keydown', trapFocus)
}, [isPanelOpen])
```

---

## 19. Reduced Motion — Full Implementation

```tsx
// src/hooks/useReducedMotion.ts
import { useState, useEffect } from 'react'

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return prefersReducedMotion
}
```

Usage in `ZonePanel.tsx`:
```tsx
const reducedMotion = useReducedMotion()

const panelVariants = reducedMotion
  ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
  : {
      hidden:  { y: 60, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] } },
      exit:    { y: 60, opacity: 0, transition: { duration: 0.25, ease: [0.33, 1, 0.68, 1] } },
    }
```

In 3D world, check in `useFrame`:
```typescript
// Skip rotation and pulse if reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
```

---

## 20. netlify.toml / vercel.json — SPA Routing

Without this, refreshing `/projects` returns a 404 on static hosts:

**Netlify:**
```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Vercel:**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Both allow React Router to handle `/about`, `/projects`, `/skills`, `/contact` client-side.

---

## 21. QA Checklist — Before Each Commit

```bash
# Run all at once:
tsc --noEmit                    # zero TypeScript errors
grep -r "autoplay: true" src/   # must return NOTHING
grep -r "musicEnabled: true" src/store/  # must return NOTHING (default is false)
grep -r "backdrop-filter" src/components/ui/ZonePanel.tsx  # must exist
grep -r "webkit-backdrop-filter" src/components/ui/ZonePanel.tsx  # must exist
grep -r "lockRotations" src/components/world/Car.tsx  # must exist
```

Manual checks:
- [ ] Drive car into all 4 walls — rebounds, never escapes
- [ ] Open panel via proximity — all 3 close methods work (Escape, ✕, click-outside)
- [ ] Hard-refresh — music is OFF
- [ ] Visit `/about` — no Three.js in Network tab
- [ ] `aria-label` on music toggle button
- [ ] Loading screen fades only after canvas is ready

---

## 22. Instanced Mesh Setup for Trees

```tsx
// src/components/world/Decorations.tsx
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

const TREE_POSITIONS: [number, number, number][] = [
  [-35, 0, -35], [-10, 0, -40], [15, 0, -38],
  [38, 0, -20],  [40, 0, 10],   [35, 0, 38],
  [-40, 0, 30],  [-38, 0, -10], [5, 0, 42],
  [-25, 0, 25],  [30, 0, -30],  [-15, 0, 40],
]

export function Trees() {
  const trunkRef = useRef<THREE.InstancedMesh>(null)
  const canopyRef = useRef<THREE.InstancedMesh>(null)

  useMemo(() => {
    const dummy = new THREE.Object3D()
    TREE_POSITIONS.forEach(([x, y, z], i) => {
      dummy.position.set(x, y + 1.5, z)  // trunk centered at 1.5 height
      dummy.updateMatrix()
      trunkRef.current?.setMatrixAt(i, dummy.matrix)

      dummy.position.set(x, y + 3.5, z)  // canopy centered at 3.5
      dummy.updateMatrix()
      canopyRef.current?.setMatrixAt(i, dummy.matrix)
    })
    if (trunkRef.current) trunkRef.current.instanceMatrix.needsUpdate = true
    if (canopyRef.current) canopyRef.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <>
      <instancedMesh ref={trunkRef} args={[undefined, undefined, TREE_POSITIONS.length]}>
        <boxGeometry args={[0.3, 3, 0.3]} />
        <meshLambertMaterial color="#5C4033" />
      </instancedMesh>
      <instancedMesh ref={canopyRef} args={[undefined, undefined, TREE_POSITIONS.length]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshLambertMaterial color="#4A7C59" />
      </instancedMesh>
    </>
  )
}
```

This replaces 12 separate `<Tree>` components with 2 draw calls total.

---

## 23. Howler Setup with User Gesture Guard

```typescript
// src/hooks/useAudio.ts — complete implementation
import { useEffect, useRef } from 'react'
import { Howl } from 'howler'

let engineStarted = false

export function useAudio(speed: number, musicEnabled: boolean) {
  const engine = useRef(new Howl({ src: ['/audio/engine.mp3'], loop: true, volume: 0, rate: 0.8 }))
  const collision = useRef(new Howl({ src: ['/audio/collision.mp3'], volume: 0.6 }))
  const ambient = useRef(new Howl({ src: ['/audio/ambient.mp3'], loop: true, volume: 0, autoplay: false }))

  // Start engine on first user gesture only
  useEffect(() => {
    const start = () => {
      if (!engineStarted) {
        engine.current.play()
        engineStarted = true
      }
    }
    window.addEventListener('pointerdown', start, { once: true })
    return () => window.removeEventListener('pointerdown', start)
  }, [])

  // Engine pitch + volume follows speed
  useEffect(() => {
    const t = Math.min(speed / 12, 1)
    engine.current.rate(0.8 + t * 0.4)
    engine.current.volume(0.2 + t * 0.25)
  }, [speed])

  // Ambient responds to music toggle
  useEffect(() => {
    if (musicEnabled) {
      if (!ambient.current.playing()) ambient.current.play()
      ambient.current.fade(ambient.current.volume(), 0.3, 2000)
    } else {
      ambient.current.fade(ambient.current.volume(), 0, 500)
    }
  }, [musicEnabled])

  return { playCollision: () => collision.current.play() }
}
```

---

## 24. Contact Email Obfuscation Pattern

**Never put raw email in JSX:**
```tsx
// WRONG — visible in page source, scraped immediately
<a href="mailto:alex@example.com">alex@example.com</a>

// CORRECT — assembled in JavaScript
export function ContactPanel() {
  const { emailUser, emailDomain } = contact
  const email = `${emailUser}@${emailDomain}`
  return (
    <a href={`mailto:${email}`}>{email}</a>
  )
}
```

The `emailUser` and `emailDomain` are separate fields in `content.ts` — split so simple scrapers that look for `@` patterns in source find nothing useful. For stronger protection, use a Vercel Edge Function contact form endpoint that never exposes the address client-side.
