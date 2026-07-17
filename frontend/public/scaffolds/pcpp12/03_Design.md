# 03 — Design System
## Modular Editorial Specifications · pcpp_platform_12

### 1. The Canvas Manifesto
1. **Resume as Catalog.** Every entry must feel like a page in a high-end design book.
2. **Layers for Depth.** Don't show all the data at once. Use "Expandable Layers" to reveal depth on demand.
3. **Paper & Ink.** Use warm neutrals (#FAF9F6) and charcoal (#1A1A1A) to mimic a physical professional document.
4. **Breathable Grids.** Use generous whitespace (24px+) between cards to prevent "LinkedIn Overwhelm."

### 2. Color Palette
- **Background:** `#FAF9F6` (Warm Off-White) - The primary canvas.
- **Surface:** `#FFFFFF` (Pure White) - Card surfaces.
- **Ink:** `#1A1A1A` (Charcoal) - All primary typography.
- **Muted:** `#71717A` (Zinc-500) - Dates, metadata, and sub-labels.
- **Accent:** `#3B82F6` (Modern Blue) - Active links, badges, and status.
- **Border:** `#E5E7EB` (Slate-200) - 1px hair-line separators.

### 3. Typography
- **Name/Headers:** Inter (Weight 600) - `font-semibold`, `tracking-tight`.
- **Editorial Body:** Inter (Weight 400) - `font-normal`, `text-[15px]`, `leading-relaxed` (1.6).
- **Writing Serif:** Georgia or Garamond - `font-serif`, `text-lg` (For the Writing tab body).
- **Meta Labels:** `text-[11px] uppercase tracking-widest font-bold`.

### 4. Component Specs
**The "Timeline Card"**
- Layout: [Logo (32x32)] [Text Group].
- Connector: `2px` vertical slate-100 line linking cards.
- Radius: `12px`.
- Border: `1px solid #E5E7EB`.

**The "Expandable Layer"**
- Transition: `height: auto` with `overflow-hidden`.
- Header: Sticky title when expanded.
- Content: Full-width media -> MDX Narrative.

**The "Status Chip"**
- Style: `bg-slate-100 border-none px-3 py-1 rounded-full`.
- Text: `text-xs font-medium`.
