# 03 — Design System
## Functional Utility Specifications · pcpp_platform_02

### 1. The Creator Manifesto
1. **Navigation is Infrastructure.** The sidebar is the backbone; it must be persistent, clear, and highly organized.
2. **Whitespace for Saturated Art.** Use pure white (#FFFFFF) backgrounds to balance highly experimental, saturated imagery.
3. **Structure over Vibe.** Use 1px hair-line borders and clear labels. The site should feel like a well-organized catalog.
4. **Instant Response.** Hover states and dropdowns must respond instantly (200ms or less) to convey a "pro tool" feel.

### 2. Color Palette
- **Primary:** `#000000` (Pure Black) - Typography and structural icons.
- **Secondary:** `#666666` (Mid Grey) - Metadata and labels.
- **Border:** `#EEEEEE` (Light Grey) - Hair-line separators.
- **Canvas:** `#FFFFFF` (Pure White) - Main background.
- **Accent:** `#000000` (Minimalist accents only).

### 3. Typography
- **Titles:** Geometric Sans (e.g., Inter) - `font-bold`, `text-lg`, `dot-separated`.
- **Body:** Modern Sans - `font-normal`, `leading-relaxed` (1.6).
- **Specs:** Monospace (e.g., JetBrains Mono) - `font-mono`, `text-xs` for lens data tables.

### 4. Component Specs
**The "Fixed Sidebar"**
- Width: `260px` desktop.
- Style: Sticky or fixed left. `border-r border-slate-100`.
- Mobile: Collapses into a `h-16` top-bar with a hamburger menu.

**The "Lens Spec Card"**
- Layout: Top Image -> Bottom Spec Table.
- Table: 2-column grid (Label: Value) with monospace text.
- Radius: `2px`.

**The "Gallery Toggle"**
- Icons: 4-square grid vs. 1-square immersion.
- Position: Top-right of category pages.
