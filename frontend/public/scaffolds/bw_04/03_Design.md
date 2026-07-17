# 03 — Design System
## Tropical Minimalist Specifications · bw_platform_04

### 1. The Airy Manifesto
1. **Whitespace as Atmosphere.** Sections must have expansive vertical margins (120px+) to create a "breezy" feel.
2. **Neutral Earth Tones.** Use Coconut White (#FDFDF9) and Sand (#EEEEEE) as the base to reflect nature.
3. **Bold All-Caps Headers.** Use heavy sans-serif type (tracking 0.05em+) for primary navigation and collection titles.
4. **Citrus Highlights.** Use Vibrant Yellow (#FDB913) or Teal (#008080) sparingly for badges and active states.

### 2. Color Palette
- **Background:** `#FDFDF9` (Coconut White) - Main digital hub surface.
- **Text Primary:** `#1A1A1A` (Charcoal Ink) - All authoritative typography.
- **Accent:** `#FDB913` (Citrus Yellow) - Highlights and Gifting cues.
- **Surface:** `#F3F4F1` (Dune Grey) - Secondary cards and block sections.
- **Stroke:** `#EEEEEE` (Sand hair-line) - Subtle structural dividers.

### 3. Typography
- **Headlines:** Montserrat or Public Sans (Weight 700) - `font-sans`, `uppercase`, `tracking-wide`.
- **UI/Nav:** Montserrat (Weight 500) - `font-sans`, `uppercase`, `tracking-widest` (0.1em).
- **Body:** Inter or Public Sans (Weight 400) - `font-sans`, `leading-extra-relaxed`.

### 4. Component Specs
**The "Lifestyle Hero"**
- Layout: Full-bleed image -> Bottom-third All-Caps Text Overlay -> Ghost Button.
- Style: Centered or Left-aligned depending on image composition.

**The "Discovery Tile"**
- Aspect Ratio: `4:5` or `1:1`.
- Content: One-word category title at top-left.
- Style: Minimal border-none, generous whitespace around the tile.

**The "Journal Card"**
- Background: `#F3F4F1`.
- Layout: Horizontal thumbnail (Left) -> Title & Byline (Right).
- Interaction: Slow fade-reveal on hover.
