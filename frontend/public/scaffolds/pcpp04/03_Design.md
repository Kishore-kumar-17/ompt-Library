# 03 — Design System
## Literary Broad-sheet Specifications · pcpp_platform_04

### 1. The Universe Manifesto
1. **Sequence over Single.** The relationship between images is more important than any individual shot.
2. **White Space is Luxury.** Use generous margins (up to 160px) to allow the viewer to "digest" the narrative.
3. **Typography as Voice.** Use bold, authoritative headers and high-readability body text to signal journalistic intent.
4. **Sharp Edges Only.** Strictly 0px rounding. The site should feel like it was cut from high-quality paper.

### 2. Color Palette
- **Paper:** `#FFFFFF` (Pure White) - The primary canvas.
- **Ink:** `#1A1A1A` (Near Black) - All typography and structural lines.
- **Smoke:** `#F5F5F5` (Light Grey) - Subtle section dividers.
- **Action:** `#000000` (Pure Black) - Links and portaling UI.

### 3. Typography
- **Headlines:** Inter (Weight 800) - `font-extrabold`, `tracking-tighter`.
- **Essay Body:** Inter (Weight 400) - `font-normal`, `text-lg`, `leading-extra-loose` (1.8).
- **Captions/Meta:** JetBrains Mono - `font-mono`, `text-xs`, `uppercase`.

### 4. Component Specs
**The "Sequence Pair"**
- Layout: 2-column flex.
- Gap: `16px` between images.
- Logic: Both images must enter the viewport simultaneously for the "Third Meaning" effect.

**The "Planet Card"**
- Size: Large scale (`h-[60vh]`).
- Overlay: Title + Summary on hover.
- Portal: "Enter Universe" large text link.

**The "Journey Nav" (Project Sidebar)**
- Position: Sticky left or fixed bottom on mobile.
- Typography: Vertical text for a "spine" feel or simple horizontal list.
