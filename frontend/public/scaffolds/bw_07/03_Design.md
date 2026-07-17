# 03 — Design System
## Michelin-Grade Minimalism Specifications · bw_platform_07

### 1. The Prestige Manifesto
1. **Contrast as Authority.** Use deep charcoal (#121212) and pure white to create a "Theater" for the plated work.
2. **Brass as Utility.** Use Aged Brass (#D4AF37) exclusively for interactive elements and prestige status markers.
3. **Architectural Grid.** Maintain strict alignment and sharp 0px corners to reflect the geometry of fine-dining interiors.
4. **Information Purity.** Text must be minimalist and factual. Let the world-class accolades provide the persuasion.

### 2. Color Palette
- **Theater:** `#121212` (Deep Charcoal) - Primary background for heros and hubs.
- **Paper:** `#FFFFFF` (Pure White) - High-contrast reading surface for menus.
- **Brass:** `#D4AF37` (Aged Gold) - Primary CTAs and active indicators.
- **Graphite:** `#333333` (Slate-800) - Secondary borders and hair-lines.
- **Ink:** `#1A1A1A` (Near Black) - All typography on light surfaces.

### 3. Typography
- **Headlines:** Didot or Bodoni (Weight 600) - `font-serif`, `tracking-tight`.
- **Sub-labels:** Montserrat (Weight 700) - `font-sans`, `uppercase`, `tracking-[0.15em]`.
- **Body:** Inter or Public Sans (Weight 400) - `font-sans`, `leading-normal`.

### 4. Component Specs
**The "Global Split Hero"**
- Layout: 3-column flex (Desktop).
- Content: Full-height B&W or Low-sat image -> City Label (Brass Hover) -> Link.
- Mobile: Vertical stack or horizontal drawer.

**The "Accolade Badge"**
- Style: Grayscale SVG with `opacity-40` default to `opacity-100` hover.
- Spacing: `gap-16` within a persistent strip.

**The "Tasting Item"**
- Layout: Square high-end image -> Centered text group below.
- Text: Name (Serif Bold) -> Description (Sans Light) -> Chef Note (Italic Small).
