# 03 — Design System
## Designer-Grade Specifications · lp_platform_11

### 1. The Gallery Manifesto
1. **The UI is Invisible.** Foundations must be pure neutral (#FFFFFF or #000000) to ensure zero conflict with template content.
2. **Precision Borders.** Use strictly 1px hair-lines for grid separators and card borders to signal high-end tool-quality.
3. **Motion is a Preview.** Every hover or transition should reflect the high-fidelity motion capabilities of the templates themselves.
4. **Metadata Density.** Use clean, monospaced accents for prices and labels to Establish a "Technical Professional" aesthetic.

### 2. Color Palette
- **Canvas:** `#FFFFFF` (Pure White) - Main discovery background.
- **Ink:** `#111827` (Deep Slate) - Primary typography and active states.
- **Accent:** `#0055FF` (Brand Blue) - Strictly for primary conversion triggers (Remix).
- **Ghost:** `#F9FAFB` (Subtle Grey) - For inactive filter tags and sidebar surfaces.
- **Vein:** `#E5E7EB` (Slate-200) - Hair-line structural borders.

### 3. Typography
- **Headlines:** Inter or SF Pro (Weight 600) - `font-semibold`, `tracking-tight`.
- **Editorial/UI:** Inter (Weight 400) - `font-normal`, `text-[14px]`, `leading-normal`.
- **System Mono:** JetBrains Mono - `font-mono`, `text-[12px]` for prices and technical tags.

### 4. Component Specs
**The "Template Masonry Card"**
- Layout: [Thumbnail (Video-ready)] -> [Title] -> [Creator Avatar + Name].
- Price Badge: Positioned top-right of the thumbnail; monochrome background.
- Style: `border border-zinc-100 shadow-sm hover:shadow-lg transition-all`.

**The "Category Toggle Pill"**
- Layout: [Label] [Count (Mono)].
- Style: `bg-zinc-50 border border-zinc-100 px-3 py-1 rounded-full`.
- Active: `bg-black text-white border-black`.

**The "Detail Modal Overlay"**
- Layout: Left Sidebar (Remix CTA, Features) | Right Main (Scrolling Snapshots).
- Style: `bg-white/95 backdrop-blur-xl fixed inset-0 z-50`.
