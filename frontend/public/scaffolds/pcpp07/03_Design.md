# 03 — Design System
## Atmospheric Minimalism Specifications · pcpp_platform_07

### 1. The Aero Manifesto
1. **Scale is the Metric.** Use full-width images and generous whitespace to create a sense of vast, open sky.
2. **Stone and Paper.** Use pure white (#FFFFFF) and stone grey (#E5E5E5) to create a high-end "nature-inspired" UI.
3. **Precision Typography.** Pair elegant serifs with clean, technical sans-serifs to reflect the "Pilot's Perspective."
4. **Sharp 0px Geometry.** No rounded corners. The site should feel like a technical drawing or a professional print.

### 2. Color Palette
- **Canvas:** `#FFFFFF` (Pure White) - Main background.
- **Stone:** `#E5E5E5` (Light Stone Grey) - Structural borders and secondary UI.
- **Ink:** `#1A1A1A` (Near Black) - All primary typography.
- **Slate:** `#6B7280` (Muted Grey) - Technical captions and sub-labels.

### 3. Typography
- **Headlines:** Bodoni or Garamond (Weight 500) - `font-serif`, `tracking-tight`.
- **UI/Body:** Public Sans or Inter (Weight 400) - `font-sans`, `leading-relaxed`.
- **Technical:** Monospace Labels - `text-[10px] uppercase tracking-widest font-mono`.

### 4. Component Specs
**The "AeroHero" Slideshow**
- Height: `90vh`.
- Transition: `opacity 0 -> 1` over `1500ms`.
- Interaction: Clicking "Explore" slides down to the story grid.

**The "Chronology Marker"**
- Layout: Hair-line horizontal border -> Left: Time/Label -> Right: Content.
- Style: `border-t border-stone-200 py-4`.

**The "International Form"**
- Width: `max-w-2xl` centered.
- Input Style: Clean bottom-border only with Stone Grey focus state.
