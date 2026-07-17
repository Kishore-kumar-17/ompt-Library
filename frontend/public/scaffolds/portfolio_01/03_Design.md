# 03 — Design System
## Interactive 3D World Portfolio · portfolio_platform_01

---

### 1. Design Philosophy

The world IS the design. The 3D scene carries the full visual weight — UI is a minimal layer on top, never competing. The glassmorphic panels are intentionally understated so they feel like windows into the world rather than a website imposed on top.

Two registers: the 3D world (warm, textural, tangible) and the 2D UI (dark, glassy, precise). They feel like different materials in the same physical space.

---

### 2. Fonts

```css
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&family=Nunito:wght@400;600&display=swap');

:root {
  --font-display: 'Amatic SC', cursive;    /* zone labels, HUD name, panel headings */
  --font-body: 'Nunito', sans-serif;       /* panel body text, tags, buttons, meta */
}
```

**Amatic SC 700** — quirky, hand-lettered, uppercase. Used for: creator name in HUD, zone marker labels floating in 3D, ZonePanel section headings.

**Nunito 400/600** — rounded, warm, readable. Used for: all body text in panels, tech stack tags, button text, loading screen hint text.

| Token | Font | Weight | Size | Usage |
|-------|------|--------|------|-------|
| Creator name | Amatic SC | 700 | 28px | HUD top-left |
| HUD tagline | Nunito | 400 | 13px | HUD top-left below name |
| Zone label (3D) | Amatic SC | 700 | — | Drei `<Text>` in 3D world |
| Panel heading | Amatic SC | 700 | 32px | ZonePanel section title |
| Panel body | Nunito | 400 | 15px | Bio text, descriptions |
| Project title | Nunito | 600 | 17px | Inside ProjectsPanel |
| Tag | Nunito | 600 | 12px | Tech stack badges |
| Button | Nunito | 600 | 14px | Panel CTAs |
| Control hint | Nunito | 400 | 12px | HUD bottom bar |

---

### 3. Color System

```css
:root {
  /* 3D World palette */
  --color-terrain: #C8A573;       /* sandy ground plane */
  --color-sky: #1B2A4A;           /* deep dusk blue — fog + sky color */
  --color-road: #3D3D3D;          /* road/path geometry */
  --color-veg: #4A7C59;           /* trees, bushes (muted sage) */
  --color-building: #8B7355;      /* generic low-poly buildings */
  --color-car: #E84B30;           /* car body — signal red */

  /* UI / Panel palette */
  --panel-bg: rgba(10, 12, 20, 0.82);
  --panel-border: rgba(232, 162, 60, 0.25);
  --panel-text: #F0EBE0;          /* warm off-white */
  --panel-text-muted: rgba(240, 235, 224, 0.55);
  --panel-divider: rgba(240, 235, 224, 0.1);

  /* Accent — zone glow + active states */
  --accent: #E8A23C;              /* warm amber */
  --accent-dim: rgba(232, 162, 60, 0.15);
  --accent-border: rgba(232, 162, 60, 0.4);

  /* Loading bar */
  --progress: #E8A23C;

  /* Tags */
  --tag-bg: rgba(232, 162, 60, 0.12);
  --tag-border: rgba(232, 162, 60, 0.35);
  --tag-text: #E8A23C;
}
```

**3D World Lighting:**
- Ambient: `intensity={0.6}` warm white
- Directional: `position={[10, 20, 10]}` `intensity={1.2}` `color="#FFD89B"` — golden angle suggesting late afternoon
- Fog: `<fog args={['#1B2A4A', 40, 80]}/>` — fades to sky color at distance

---

### 4. Border Radius

| Element | Radius |
|---------|--------|
| ZonePanel | 12px |
| Tech stack tags | 6px |
| CTA buttons | 999px (pill) |
| Project thumbnail | 8px |
| Loading bar | 999px |
| Music toggle button | 999px |

---

### 5. ZonePanel Specification

```css
.zone-panel {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  width: 440px;
  max-width: 92vw;
  max-height: 70vh;
  overflow-y: auto;
  padding: 28px;
  background: var(--panel-bg);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--panel-border);
  border-radius: 12px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(232,162,60,0.08);
}

.zone-panel h2 {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--accent);
  margin-bottom: 16px;
  letter-spacing: 0.05em;
}

.zone-panel p {
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.65;
  color: var(--panel-text);
}

.zone-panel-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 28px;
  height: 28px;
  border: 1px solid var(--panel-border);
  border-radius: 999px;
  background: transparent;
  color: var(--panel-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.zone-panel-close:hover { color: var(--panel-text); border-color: var(--accent-border); }
```

---

### 6. ZonePanel Framer Motion Animation

```tsx
// Slide up from bottom, fade in
const panelVariants = {
  hidden:  { y: 60, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] } },
  exit:    { y: 60, opacity: 0, transition: { duration: 0.25, ease: [0.33, 1, 0.68, 1] } },
}
```

---

### 7. Tech Stack Tags

```tsx
<span className="inline-block px-2.5 py-0.5 rounded-[6px] text-[12px] font-semibold font-nunito"
  style={{ background: 'var(--tag-bg)', border: '1px solid var(--tag-border)', color: 'var(--tag-text)' }}>
  #{tag}
</span>
```

---

### 8. Loading Screen

- Full-viewport overlay: `background: #0A0C14`
- Creator name centered: Amatic SC 700, 52px, `#F0EBE0`
- Tagline below: Nunito 400, 15px, `rgba(240,235,224,0.5)`
- Progress bar: 200px wide, 4px tall, `border-radius: 999px`, background `rgba(240,235,224,0.1)`, fill `#E8A23C`
- Below bar: "WASD to drive" in Nunito 400, 12px, `rgba(240,235,224,0.4)`
- Fades out (opacity 0, then unmounts) when `isLoaded = true`

---

### 9. HUD Specification

```
Top-left (fixed, pointer-events: none):
  [Creator Name]    — Amatic SC 700, 26px, #F0EBE0
  [Tagline]         — Nunito 400, 13px, rgba(240,235,224,0.5)

Top-right (fixed):
  [♪] toggle        — 36px pill button, border rgba(232,162,60,0.3), icon #E8A23C when ON

Bottom-center (fixed, fades after 8s):
  "WASD / ↑↓←→ to drive"  — Nunito 400, 12px, rgba(240,235,224,0.45)
```

---

### 10. Mobile Joystick

- Position: fixed, bottom-left, 24px margin
- Size: 80px outer ring, 36px inner dot
- Outer ring: `rgba(240,235,224,0.15)` border, transparent fill
- Inner dot: `#E8A23C`
- Only visible on touch devices (`'ontouchstart' in window`)
- Does not overlap ZonePanel (joystick bottom-left; panel bottom-center)

---

### 11. 3D World Zone Markers

```tsx
<mesh rotation={[Math.PI / 2, 0, 0]}>
  <torusGeometry args={[2.5, 0.08, 16, 64]} />
  <meshStandardMaterial
    color="#E8A23C"
    emissive="#E8A23C"
    emissiveIntensity={1.2}
    transparent
    opacity={0.85}
  />
</mesh>
```

Zone label (Drei `<Text>` floating above marker):
```tsx
<Text
  position={[0, 3, 0]}
  fontSize={0.8}
  color="#E8A23C"
  font="/fonts/AmaticSC-Bold.ttf"
  anchorX="center"
  anchorY="middle"
>
  {zone.label}
</Text>
```

---

### 12. Anti-Patterns (Do Not Do)

- Playing music on page load — always OFF by default (autoplay policy)
- Opaque panel background — always use `rgba` + `backdrop-filter: blur`
- Border radius other than specified — no `rounded-full` on panels
- Nunito for zone labels / HUD name — those are always Amatic SC
- Amatic SC for body text inside panels — always Nunito
- Hiding controls hint permanently — it should fade out after 8s, not immediately
- Removing ✕ button from ZonePanel — 3 close methods always required
- Gold (#E8A23C) on pure white background — only used on dark panel bg or 3D world
- `display:none` for mobile joystick — use conditional render based on device detection
- Shadow casting on every world object — limit to car + key buildings only

---

### 13. Responsive Breakpoints

```css
/* Mobile-first approach. Tailwind breakpoints used for 2D UI only. */

/* Panel width */
.zone-panel {
  width: 440px;          /* ≥ 480px viewport */
  max-width: 92vw;       /* all viewports — clamps on mobile */
}

/* Panel padding */
@media (max-width: 480px) {
  .zone-panel {
    padding: 20px 16px;  /* tighter on small screens */
    bottom: 16px;        /* closer to bottom on phone */
    border-radius: 10px;
  }
}

/* HUD name — smaller on mobile */
@media (max-width: 480px) {
  .hud-name   { font-size: 22px; }
  .hud-tagline { font-size: 11px; }
}

/* Control hints hidden when joystick is visible (mobile has hints on joystick) */
@media (pointer: coarse) {
  .control-hint { display: none; }
}

/* Project cards: full-width buttons on small screens */
@media (max-width: 400px) {
  .panel-cta { width: 100%; text-align: center; }
}
```

---

### 14. Focus and Keyboard Interaction States

```css
/* Global focus ring (index.css) */
:focus-visible {
  outline: 2px solid #E8A23C;
  outline-offset: 3px;
  border-radius: 4px;
}

/* Suppress outline for mouse (non-keyboard) interaction */
:focus:not(:focus-visible) { outline: none; }

/* Music toggle — focus state */
.music-toggle:focus-visible {
  box-shadow: 0 0 0 2px #E8A23C;
  outline: none;
}

/* Panel close button — hover + focus */
.zone-panel-close:hover,
.zone-panel-close:focus-visible {
  color: var(--panel-text);
  border-color: var(--accent-border);
  background: var(--accent-dim);
  outline: none;
  box-shadow: 0 0 0 2px var(--accent);
}

/* Link states inside panels */
.panel-link        { color: var(--accent); text-decoration: none; }
.panel-link:hover  { text-decoration: underline; }
.panel-link:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 2px; }
.panel-link:visited { color: var(--panel-text-muted); }
```

---

### 15. ZonePanel Scrollbar Styling

```css
/* Custom scrollbar — WebKit */
.zone-panel::-webkit-scrollbar {
  width: 4px;
}
.zone-panel::-webkit-scrollbar-track {
  background: transparent;
}
.zone-panel::-webkit-scrollbar-thumb {
  background: rgba(232, 162, 60, 0.3);
  border-radius: 999px;
}
.zone-panel::-webkit-scrollbar-thumb:hover {
  background: rgba(232, 162, 60, 0.5);
}

/* Firefox scrollbar */
.zone-panel {
  scrollbar-width: thin;
  scrollbar-color: rgba(232,162,60,0.3) transparent;
}
```

Thin amber scrollbar matches the accent color without drawing attention. The panel itself is `overflow-y: auto` so scrollbar appears only when content overflows.

---

### 16. Reduced Motion Variant Table

| Component | Default animation | Reduced motion |
|-----------|-------------------|----------------|
| ZonePanel entry | `y: 60 → 0`, opacity 0→1, 350ms | opacity 0→1, 200ms (no Y movement) |
| ZonePanel exit | `y: 0 → 60`, opacity 1→0, 250ms | opacity 1→0, 150ms |
| Zone torus rotation | Y rotation 0.3 rad/s | Paused (no rotation) |
| Zone torus pulse | scale 1.0→1.05→1.0 | No pulse |
| LoadingScreen fade-out | opacity 1→0, 600ms | opacity 1→0, 200ms |
| HUD control hint | opacity 1→0, 800ms transition after 8s | opacity 1→0, 0ms (instant) |

Implementation: `window.matchMedia('(prefers-reduced-motion: reduce)')` checked once on mount or via `useReducedMotion()` hook. Pass result to animation variants.

---

### 17. Animation Timing Reference

```typescript
// src/lib/animations.ts — reusable Framer Motion variants

// ZonePanel (default)
export const panelVariants = {
  hidden:  { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] } },
  exit:    { y: 60, opacity: 0, transition: { duration: 0.25, ease: [0.33, 1, 0.68, 1] } },
}

// ZonePanel (reduced motion)
export const panelVariantsReduced = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
}

// HUD control hint fade
export const hintFade = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: { duration: 0.8, delay: 8 } },
}

// LoadingScreen dismiss
export const loadingDismiss = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
```

**Ease functions decoded:**
- `[0.32, 0, 0.67, 0]` — ease-in (panel enters slowly then snaps)
- `[0.33, 1, 0.68, 1]` — ease-out (panel exits quickly then slows)

---

### 18. Color Contrast Reference

| Pairing | Foreground | Background | Ratio | WCAG |
|---------|-----------|-----------|-------|------|
| Panel body text | `#F0EBE0` | `rgba(10,12,20,0.82)` | ~12:1 | AAA ✓ |
| Accent on panel | `#E8A23C` | `rgba(10,12,20,0.82)` | ~6.5:1 | AA ✓ |
| Muted text | `rgba(240,235,224,0.55)` | dark panel | ~4.8:1 | AA ✓ |
| Tag text | `#E8A23C` | `rgba(232,162,60,0.12)` | ~5.2:1 | AA ✓ |
| HUD name | `#F0EBE0` | Canvas (dark) | > 7:1 | AAA ✓ |

Note: All contrast ratios measured against the darkest part of the glassmorphic panel background. Verify using browser DevTools accessibility panel or axe extension after implementation.
