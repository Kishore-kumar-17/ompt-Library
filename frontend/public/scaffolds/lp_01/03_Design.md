# 03 — Design System
## Tech-Noir Modernism Specifications · lp_platform_01

### 1. The Impact Manifesto
1. **Motion as Authority.** Use video heros and endless CSS marquees to create a high-energy, broadcast-grade environment.
2. **Neon as Progress.** Use Web Summit Green (#00FF85) exclusively for primary actions, success markers, and urgency signals.
3. **Density is Scale.** Don't fear information-dense layouts; for tech professionals, a grid of 500 speakers is more impressive than a "fluffy" carousel.
4. **Sharp 0px Geometry.** Avoid soft or bubbly patterns. The site should feel as precise as a terminal or a circuit board.

### 2. Color Palette
- **Canvas:** `#000000` (Pure Black) - Main content surface.
- **Ink:** `#FFFFFF` (Pure White) - All primary typography and headers.
- **Neon:** `#00FF85` (Electric Green) - Conversion CTAs and scarcity badges.
- **Electric:** `#0055FF` (Vivid Blue) - Secondary tracks and informative links.
- **Metal:** `#1F1F1F` (Dark Slate) - Hair-line structural borders.

### 3. Typography
- **Headlines:** Inter or SF Pro (Weight 900) - `font-black`, `tracking-tighter`, `line-height-1.1`.
- **UI/Logistics:** Inter (Weight 600) - `font-semibold`, `text-sm`.
- **Technical:** JetBrains Mono - `font-mono`, `text-[12px]` for times and scarcity counters.

### 4. Component Specs
**The "Speaker Masonry Card"**
- Layout: Square B&W image -> Name -> Role (Grey).
- Interaction: Slow scale-up `1.05` on hover with title reveal.
- Style: `bg-zinc-950 border border-zinc-900`.

**The "Urgency Marquee"**
- Style: Fixed height `h-10` top-bar.
- Animation: `infinite-scroll` CSS animation.
- Text: All-caps black sans-serif on Neon Green background.

**The "Ticket Comparison Grid"**
- Columns: 3 columns with 1px Slate-200 dividers.
- Header: Price in large black type on White/Green backgrounds.
- Action: Full-width button in Neon Green.
