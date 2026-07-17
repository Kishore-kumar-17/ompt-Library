# 03 — Design System
## Art Deco Glocal Specifications · bw_platform_05

### 1. The Canteen Manifesto
1. **Parchment is the Canvas.** Use warm, aged off-whites (#FFFDF6) to create a sense of heritage and nostalgia.
2. **Icons tell the Story.** Every menu category must have a custom illustrative icon to add visual wit and charm.
3. **Typography is Eclectic.** Mix authoritative Serifs with playful Display accents to bridge the gap between "Vintage" and "Modern."
4. **Vibrancy in Focus.** Use high-saturation foliage greens and cinnabar reds sparingly but boldly for primary interactions.

### 2. Color Palette
- **Paper:** `#FFFDF6` (Warm Parchment) - Main digital flagship surface.
- **Foliage:** `#067A46` (Tropical Green) - Primary navigation and healthy highlights.
- **Spice:** `#E31E24` (Urgency Red) - Primary CTAs (Book a Table) and warnings.
- **Ink:** `#1A1A1A` (Deep Slate) - All primary typography and structural lines.
- **Ochre:** `#EAB308` (Sunset Yellow) - For "Stories" highlights and secondary badges.

### 3. Typography
- **Headlines:** Recoleta or Playfair Display (Weight 600) - `font-serif`, `tracking-tight`.
- **Narrative Labels:** Chee or custom script lettering - `font-display`, `text-lg`.
- **Body/Menu:** Inter or Montserrat (Weight 400) - `font-sans`, `leading-normal`.

### 4. Component Specs
**The "Narrative Card"**
- Layout: Large image -> Centered text block with floating sub-headings.
- Border: `1px solid #E5E7EB` (Slate-200).
- Radius: `16px` (Soft bubbles).

**The "Iconic Menu Tab"**
- Layout: Top Icon (SVG) -> Center Title (All-Caps) -> Bottom indicator line.
- Active State: Icon shifts from Black to Foliage Green.

**The "Reservation Drawer"**
- Position: Slide-out from right (`width: 480px` on desktop).
- Background: `#FFFFFF` (Pure white for clarity in booking forms).
- Close: Minimal "X" icon in Spice Red.
