# 03 — Design System
## Tropical Shabby-Chic Specifications · bw_platform_06

### 1. The Coastal Manifesto
1. **Sunlight is the Medium.** Use warm, golden off-whites (#FFF9F2) to create an immediate sense of Goan "Susegaad."
2. **Modular is Human.** The homepage must feel like a collection of snapshots on a bungalow wall, not a rigid corporate grid.
3. **Mascots for Wit.** "Rocky" the rooster should appear in unexpected UI corners to add brand personality and playfulness.
4. **Architectural Sharpness.** Use 0px rounding and 1px lines to reflect the precise, vaulted architecture of Portuguese houses.

### 2. Color Palette
- **Sunlight:** `#FFF9F2` (Warm Cream) - Main digital bungalow surface.
- **Terracotta:** `#CD5C5C` (Earth Red) - Primary navigation and heritage labels.
- **Ocean:** `#5F9EA0` (Teal Blue) - Success markers and active accents.
- **Ink:** `#1A1A1A` (Near Black) - All authoritative typography.
- **Pistachio:** `#F3E5D8` (Sand Grey) - Subtle block backgrounds and dividers.

### 3. Typography
- **Headlines:** Lora or Playfair Display (Weight 600) - `font-serif`, `tracking-tight`.
- **UI/Body:** Montserrat or Montserrat (Weight 400) - `font-sans`, `leading-relaxed`.
- **Mascot Notes:** Hand-lettered script or playful font - `font-display`, `text-lg`.

### 4. Component Specs
**The "Bento Block"**
- Layout: Square or 4:5 image -> Center Title Overlay.
- Border: `1px solid #F3E5D8`.
- Hover: Subtle `translate-y-[-4px]` with shadow depth increase.

**The "Rocky Favorite" Badge**
- Layout: Small circular illustration of Rocky.
- Position: Floating at top-right of menu items or bento blocks.
- Animation: Subtle "peck" motion on hover.

**The "Sister-Hub Strip"**
- Background: `#FFF9F2`.
- Logo Style: Full-color mini-icons with `opacity-60` hover-to-`opacity-100`.
- Position: Persistent above footer.
