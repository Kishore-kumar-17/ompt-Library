# 03 — Design System
## Dark Gallery Specifications · pcpp_platform_01

### 1. The Museum Manifesto
1. **The Canvas is Black.** Use `#000000` for all main backgrounds to create a "void" where images live.
2. **Invisible Navigation.** Menus should be tucked away until needed (scroll-up or icon-click).
3. **Sharp & Precise.** Strictly `rounded-none` (0px) for all elements. No soft edges.
4. **Captions over Copy.** Keep text blocks small and centered. Let the visual storytelling lead.

### 2. Color Palette
- **Canvas:** `#000000` (Pure Black) - Overall background.
- **Ink:** `#FFFFFF` (Pure White) - Headlines and primary text.
- **Slate:** `#888888` (Muted Grey) - Descriptions and secondary UI.
- **Stroke:** `#1A1A1A` (Dark Grey) - Subtle dividers if absolutely necessary.

### 3. Typography
- **Headlines:** Modern Sans (e.g., Inter) - `font-bold`, `uppercase`, `tracking-widest`.
- **Body:** Modern Sans - `font-normal`, `leading-loose`.
- **Meta:** Monospace (e.g., JetBrains Mono) - `font-mono`, `text-xs` for technical specs.

### 4. Component Specs
**The "Full-Bleed Image"**
- Width: `100vw`.
- Height: `auto` or `100vh` (Section dependent).
- Entry: `FadeIn` on viewport enter.

**The "High-Density Grid Card"**
- Aspect Ratio: `3:4`.
- Interaction: Black-to-translucent-white overlay on hover showing Title + Category.
- Animation: Subtle scale-up `1.05` on hover.

**The "Minimal Nav"**
- Fixed: `top-0`.
- Height: `64px`.
- Background: Transparent with `backdrop-blur` or solid black on scroll.
