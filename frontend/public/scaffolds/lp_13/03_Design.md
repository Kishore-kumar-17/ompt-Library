# 03 — Design System
## Dynamic Glass Specifications · lp_platform_13

### 1. The Glass Manifesto
1. **Depth is Authority.** Use blurred translucency (`backdrop-blur-xl`) and subtle 1px inner-glows to create a multi-layered, tactile environment.
2. **The Gradient is the Life.** Backgrounds must never be static. Use deep, vibrant linear gradients to provide "Back-light" for the glass surfaces.
3. **Typography as Structure.** Use massive, 800-weight sans-serifs (Weight 800) to anchor the page against the soft glass elements.
4. **Deconstructed Reality.** Mockups shouldn't be "flat" screenshots; they should be floating glass frames that deconstruct the software's UI into its core components.

### 2. Color Palette
- **Deep Canvas:** Dynamic Gradients: `#1A0B2E` (Midnight) to `#0F172A` (Navy).
- **Glass Surface:** `rgba(255, 255, 255, 0.08)` (Transparent White).
- **Ink:** `#FFFFFF` (Pure White) - All primary typography.
- **Muted Ink:** `rgba(255, 255, 255, 0.6)` - Sub-labels and metadata.
- **AI Glow:** High-saturation blurs: Indigo `#6366F1`, Magenta `#D946EF`, Teal `#14B8A6`.
- **Vein:** `rgba(255, 255, 255, 0.1)` - Ghostly 1px inner borders.

### 3. Typography
- **Headlines:** Inter or Satoshi (Weight 800) - `font-black`, `tracking-tighter`, `all-caps`.
- **Editorial/UI:** Inter (Weight 400/500) - `font-normal`, `text-[18px]`, `leading-snug`.
- **System Mono:** JetBrains Mono - `font-mono`, `text-[12px]` for version codes.

### 4. Component Specs
**The "Browser Mockup Frame"**
- Layout: Vertical Sidebar (Glass) | Address Bar (Blurred) | Content Pane (Texture).
- Style: `bg-white/5 border border-white/10 rounded-2xl shadow-2xl`.
- Floating: `animate-float` (Subtle 8px vertical bounce).

**The "Glass Feature Card"**
- Layout: [SVG Icon] [Heading] [Description].
- Style: `backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl`.
- Hover: Inner-glow increases; Scale-up `1.05`.

**The "Vibrant CTA"**
- Style: `bg-white text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-all`.
