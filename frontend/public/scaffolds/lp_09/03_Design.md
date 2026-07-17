# 03 — Design System
## High-Velocity Specifications · lp_platform_09

### 1. The Pyramid Manifesto
1. **The Headline is the Hero.** Use massive, high-contrast typography (Weight 900) to anchor the page.
2. **Visual Funneling.** Every line, gap, and font size must guide the user's eye toward the CTA button (The Tip of the Pyramid).
3. **Grayscale for Trust.** Use monochromatic logos for social proof to avoid distracting from the primary brand accent (Momentum Blue).
4. **Optical Precision.** Vertical centering must be slightly offset (10% higher) to look "balanced" to the human eye.

### 2. Color Palette
- **Canvas:** `#FFFFFF` (Pure White) - Main background.
- **Ink:** `#18181B` (Zinc-900) - Primary headlines and body text.
- **Momentum:** `#2563EB` (Primary Blue) - The only action color (CTA button).
- **Success:** `#22C55E` (Growth Green) - Only for "JOINED" counters or success ticks.
- **Ghost:** `#E4E4E7` (Zinc-200) - Hair-line input borders and secondary dividers.

### 3. Typography
- **Headline (Pyramid Base):** Inter (Weight 900) - `font-black`, `tracking-tighter`, `line-height-tight`.
- **UI/Sub-header:** Inter (Weight 500) - `font-medium`, `text-[18px]`, `leading-normal`.
- **Counter/Data:** JetBrains Mono - `font-mono`, `text-[13px]`, `uppercase`.

### 4. Component Specs
**The "Inverted Pyramid Group"**
- Layout: [Massive H1] -> [Sub-header] -> [Logos] -> [Input Group].
- Spacing: `gap-12` between major blocks; `gap-6` between sub-header and logos.

**The "Validation Logo Row"**
- Style: Horizontal flex with `justify-center`.
- Item: Grayscale SVG, height `h-6` to `h-8`, `opacity-40` default.
- Interaction: Hover reveals `opacity-100`.

**The "Velocity Input"**
- Style: Solid black or Zinc-50 background; 1px border.
- Button: Momentum Blue (#2563EB), all-caps text, sharp 4px corners.
