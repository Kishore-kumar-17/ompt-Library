# 03 — Design System
## Enterprise Modern Specifications · lp_platform_02

### 1. The Leadership Manifesto
1. **Contrast as Trust.** Use Deep Navy (#0A192F) and Pure White to create a "Boardroom" environment for high-stakes info.
2. **Glass for Innovation.** Use semi-transparent, blurred surfaces (`backdrop-blur-md`) for cards and navigation to signal transparency and tech-forwardness.
3. **Pillars as Storytelling.** Core event themes (AI, Policy) must be represented by custom, technical iconography.
4. **Precision Hierarchy.** Use bold Inter typography and tight tracking. Information density is a sign of high-value content.

### 2. Color Palette
- **Canvas:** `#0A192F` (Deep Navy) - Main background.
- **Surface:** `rgba(255, 255, 255, 0.05)` (Glass White) - Cards and nav.
- **Accent:** `#6366F1` (Vivid Indigo) - Innovation highlights and track markers.
- **Action:** `#F97316` (Nasscom Orange) - Primary CTAs and "Register" buttons.
- **Metal:** `rgba(255, 255, 255, 0.1)` - Hair-line structural borders.

### 3. Typography
- **Headlines:** Inter (Weight 700) - `font-bold`, `tracking-tight`, `line-height-1.1`.
- **UI/Nav:** Inter (Weight 600) - `font-semibold`, `text-sm`, `tracking-wide`.
- **Labels:** Inter (Weight 500) - `text-[12px] uppercase tracking-widest`.

### 4. Component Specs
**The "Speaker Authority Card"**
- Layout: Square headshot -> Name (White) -> Designation (Zinc-400).
- Style: `bg-white/5 border border-white/10 backdrop-blur-sm`.
- Interaction: Subtle `translate-y-[-4px]` and Indigo glow on hover.

**The "Thematic Pillar Icon"**
- Style: Custom SVG with Indigo stroke and glass background.
- Layout: Centered Icon -> Large Label -> 2-line description.

**The "Agenda Row"**
- Layout: [Time (Indigo)] [Venue (Pill)] [Title] [Speakers (Mini Avatars)].
- Style: `border-b border-white/5 py-4 hover:bg-white/5 transition-colors`.
