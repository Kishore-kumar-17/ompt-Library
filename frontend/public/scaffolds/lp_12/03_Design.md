# 03 — Design System
## Emotional Tech Specifications · lp_platform_12

### 1. The Cinematic Manifesto
1. **The Product is the Light.** Use pure white or black backgrounds to let the metallic and plastic textures of the hardware provide the visual depth.
2. **Control the Pace.** Use long scrollable sections (`2000px+`) for complex animations to give the user a sense of "Air and Time."
3. **Typographic Authority.** Use massive headlines (80px+) with tight tracking to signal confidence and emotional scale.
4. **Fluid Transitions.** No hard cuts. Use smooth `Power2.easeOut` for all text reveals and canvas frame shifts.

### 2. Color Palette
- **Canvas:** `#FFFFFF` (Pure White) - Main storytelling background.
- **Shadow:** `#000000` (Pure Black) - For Dark Mode or high-impact intro heros.
- **Ink:** `#1D1D1F` (Apple Dark Grey) - All primary typography.
- **Accent:** `#0071E3` (Apple Blue) - Links and "Buy" primary actions.
- **Grid:** `#D2D2D7` (Zinc-300) - For technical spec borders and separators.

### 3. Typography
- **Headlines:** SF Pro Display or Inter (Weight 700) - `font-bold`, `tracking-tighter`, `line-height-[1.05]`.
- **Narrative:** SF Pro Text or Inter (Weight 400) - `font-normal`, `text-[21px]`, `leading-tight`.
- **Technical Specs:** `text-[12px] uppercase font-semibold tracking-wide`.

### 4. Component Specs
**The "Scrolly Canvas"**
- Layout: Fixed `w-full h-screen`.
- Behavior: `object-fit: contain` or `cover` based on product geometry.
- Context: 2x resolution (`ctx.scale(2, 2)`) for Retina clarity.

**The "Pinned Overlay"**
- Layout: Absolute centered or Bottom-left text block.
- Motion: Starts at `opacity-0 y-20`; ends at `opacity-1 y-0` at the chapter's "Midpoint."
- Style: `max-w-xl` with high-contrast typography.

**The "Technical Spec Row"**
- Layout: 3-column flex: [Icon (24px)] [Label (Grey)] [Value (Dark)].
- Border: `border-b border-zinc-200 py-6`.
