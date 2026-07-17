# 03 — Design System
## Analytic Austerity Specifications · pcpp_platform_13

### 1. The Stratechery Manifesto
1. **The Analysis is the Product.** Every UI choice should make the text more readable and the diagrams more clear.
2. **Minimalism as Trust.** Removing "Artsy" fluff signals that the author is an independent thinker, not a corporate marketer.
3. **One-to-One Connection.** The UI should feel like a direct letter from the analyst to the subscriber.
4. **Sharpness is Clarity.** Strictly 0px rounding. The site should feel as precise as a strategic framework.

### 2. Color Palette
- **Paper:** `#FFFFFF` (Pure White) - Main background.
- **Ink:** `#1A1A1A` (Near Black) - All primary typography.
- **Strategy:** `#004B87` (Stratechery Blue) - Diagram lines, links, and "Plus" accents.
- **Slate:** `#757575` (Muted Grey) - Sub-labels and dates.
- **Divider:** `#E5E7EB` (Slate-200) - Hair-line separators.

### 3. Typography
- **Analysis Body:** Equity or Miller (Weight 400) - `font-serif`, `text-xl`, `leading-relaxed` (1.6).
- **Headlines:** Inter or Public Sans (Weight 700) - `font-sans`, `tracking-tight`, `uppercase` for sub-headers.
- **Labels:** `text-[10px] uppercase tracking-widest font-bold`.

### 4. Component Specs
**The "Reading Container"**
- Width: `680px` (Strict max-width).
- Padding: `pt-20 pb-40`.
- Margins: Centered with massive side gutters.

**The "Thompson Diagram"**
- Stroke: `2px` solid Stratechery Blue or Black.
- Style: Simple geometric shapes (Circles, Rectangles) with text labels.
- Layout: Responsive SVG that scales with the reading column.

**The "Plus Upgrade Box"**
- Background: `#004B87` (5% opacity).
- Border: `1px solid #004B87`.
- Action: "Upgrade to Stratechery Plus" button in solid blue.
