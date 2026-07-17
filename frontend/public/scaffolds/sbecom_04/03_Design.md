# 03 — Design System
## Culinary Editorial Specifications · sbecom_platform_04

### 1. The BlueChef Manifesto
1. **The Grid is the Plate.** Use clean, structured layouts (Mise en place style) for ingredient lists and dashboards.
2. **Authority in Blue.** Deep Navy (#0F3460) represents the "Chef's Jacket" - use it for structural elements and primary headers.
3. **Gold for Premium.** Use Golden Harvest (#FFD369) to highlight wine pairings and limited-edition "Premium" recipes.
4. **Photography is Narrated.** Use grain-filtered, high-contrast imagery that tells a story of sourcing and technique.

### 2. Color Palette
- **Primary:** `#0F3460` (Deep Navy) - All structural components.
- **Secondary:** `#FFD369` (Gold) - Wine & Premium highlights.
- **Background:** `#FFFFFF` (White) - Airy editorial space.
- **Surface:** `#F3F4F6` (Cool Slate) - Secondary dashboard panels.
- **Text:** `#1F2937` (Charcoal Ink) - Professional readability.

### 3. Typography
- **Headlines:** Playfair Display (Weight 600) - `font-serif`, `tracking-tight`.
- **UI/Body:** Inter (Weight 400) - `font-sans`, `leading-normal`.
- **Instructional:** Monospace Labels - `text-xs uppercase tracking-widest`.

### 4. Component Specs
**The "Recipe Selection Card"**
- Shadow: `0px 4px 20px rgba(15, 52, 96, 0.08)`.
- Badge: Top-right "Chef's Choice" or "Wine Pairing".
- Layout: Square image -> Title (Serif) -> Metadata Row (Duration/Cals/Difficulty).

**The "Active Box" Sidebar**
- Fixed height: `h-screen`.
- Background: `#F3F4F6` with `border-l border-slate-200`.
- Items: List of selected recipes + Curated wine pairing suggestion block.
