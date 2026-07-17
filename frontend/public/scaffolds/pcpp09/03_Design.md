# 03 — Design System
## Bookish UI Specifications · pcpp_platform_09

### 1. The Marginalia Manifesto
1. **The Screen is Paper.** Use warm off-whites (#FAF9F6) and ink-charcoals (#1C1917) to eliminate digital eye strain.
2. **Typography is the Interface.** Icons and lines are secondary to the weight and rhythm of the serif fonts.
3. **Margins are Boundaries of Thought.** Use generous, un-cluttered margins to create a "Sanctuary" for reading.
4. **Yellow for Optimism.** Use Goldenrod (#EAB308) exclusively for support and community features.

### 2. Color Palette
- **Paper:** `#FAF9F6` (Warm Off-White) - Primary background.
- **Ink:** `#1C1917` (Near Black) - All primary typography.
- **Stone:** `#57534E` (Soft Grey) - Sub-labels and archived dates.
- **Glow:** `#EAB308` (Goldenrod) - Donation blocks and lead highlights.
- **Vein:** `#E7E5E4` (Hair-line grey) - Subtle dividers.

### 3. Typography
- **Headlines:** Hoefler Text or Georgia (Weight 600) - `font-serif`, `tracking-tight`.
- **Essay Body:** Caslon or Book Serif - `font-normal`, `text-xl`, `leading-extra-loose` (1.8).
- **Asides/Quotes:** Italic Serif - `font-italic`, `pl-8`, `border-l-2 border-yellow-400`.

### 4. Component Specs
**The "Reading Column"**
- Width: `720px` (max-width).
- Padding: `pt-24 pb-48`.
- Alignment: Centered.

**The "Complementary Card"**
- Layout: Small square thumbnail (Vintage art) -> Title -> 1-line Excerpt.
- Style: `border-none bg-transparent hover:underline`.

**The "Loving Block"**
- Background: `#EAB308` (10% opacity) or solid for high impact.
- Text: Large serif headline: "Donating = Loving."
- Style: Centered block within the reading flow.
