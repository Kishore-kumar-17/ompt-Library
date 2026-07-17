# 03 — Design System
## Sophisticated Editorial Specifications · pcpp_platform_06

### 1. The Iconic Manifesto
1. **White Space is Breathing Room.** Use expansive margins (120px+) to elevate the imagery to "Fine Art" status.
2. **Typography as Texture.** Use wide tracking (`0.2em`) for navigation and UI labels to signal high-end luxury.
3. **The Grid is Fluid.** Masonry layouts must feel intentional and curated, never haphazard or crowded.
4. **Sharpness is Precision.** Strictly 0px rounding for every element. No soft blurs.

### 2. Color Palette
- **Background:** `#FFFFFF` (Pure White) - Main editorial canvas.
- **Section Dark:** `#1A1A1A` (Near Black) - High-contrast heros and footers.
- **Text Primary:** `#1A1A1A` (Near Black) - All primary typography.
- **Text Muted:** `#757575` (Muted Slate) - Sub-labels and meta-data.
- **Stroke:** `#E5E7EB` (Light Slate) - Subtle indicators if needed.

### 3. Typography
- **Headlines:** Didot or Playfair Display (Weight 600) - `font-serif`, `tracking-tight`.
- **UI/Nav:** Inter or Montserrat (Weight 500) - `font-sans`, `uppercase`, `tracking-widest` (0.2em).
- **Body:** Inter (Weight 400) - `font-normal`, `leading-normal`.

### 4. Component Specs
**The "Iconic Masonry Card"**
- Layout: Variable height based on image aspect ratio.
- Margin: `gap-8` (32px).
- Interaction: Slow `scale-105` zoom on hover with title reveal.

**The "Journal Vertical Scroll"**
- Width: Full width or centered `max-w-4xl`.
- Spacing: `mb-32` between vertical images.
- Text: Small centered editorial blocks every 4-5 images.

**The "Education Card"**
- Background: `#F9F9F9`.
- Content: Date (Mono) -> Title (Serif) -> Location -> "Register" (Black Button).
