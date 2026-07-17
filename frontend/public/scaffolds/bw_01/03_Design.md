# 03 — Design System
## Luxury Minimalism Specifications · bw_platform_01

### 1. The Heritage Manifesto
1. **Respect the Detail.** High-resolution imagery must have generous white space to allow users to "feel" the fabric.
2. **Antique Gold as Infrastructure.** Use Gold (#D4AF37) for structural borders, badges, and primary buttons to signal prestige.
3. **Typography as Voice.** Pair modern Montserrat (Sans) with elegant Serif (Titles) to bridge the gap between "Futuristic" and "Traditional."
4. **Sharp Precision.** Strictly 0px rounding for every element. No soft blurs.

### 2. Color Palette
- **Background:** `#FFFFFF` (Pure White) - Main digital atelier surface.
- **Text Primary:** `#1A1A1A` (Charcoal Ink) - All authoritative typography.
- **Prestige:** `#D4AF37` (Antique Gold) - Critical CTAs and highlights.
- **Smoke:** `#F9F9F9` (Lightest Grey) - Subtle section dividers.
- **Midnight:** `#000000` (Pure Black) - Overrides for evening wear sections.

### 3. Typography
- **Headlines:** Playfair Display or Bodoni (Weight 500) - `font-serif`, `tracking-tight`.
- **UI/Nav:** Montserrat (Weight 500) - `font-sans`, `uppercase`, `tracking-widest` (0.15em).
- **Body:** Montserrat (Weight 400) - `font-normal`, `leading-loose`.

### 4. Component Specs
**The "Artisanal Story Block"**
- Layout: Full-bleed image -> Centered Text Overlay (`max-w-2xl`) -> Serif Header.
- Animation: Slow fade-in on scroll.

**The "Shop by Craft" Tile**
- Aspect Ratio: `3:4` or `4:5`.
- Header: Small uppercase craft name at top-right.
- Hover: Border expands to `1px solid gold`.

**The "Concierge Layer"**
- Position: Fixed bottom-right.
- Icon: Custom branded WhatsApp-in-Gold icon.
- Text: "Luxury Concierge" appearing on hover.
