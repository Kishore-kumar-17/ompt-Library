# 03 — Design System
## Analytical Modernism Specifications · pcpp_platform_14

### 1. The Ken Manifesto
1. **Insight is Instant.** Summarize the "Why" immediately via the Nutgraph. Don't hide the value.
2. **Visuals are Evidence.** Infographics should be technical and clean, never decorative.
3. **Respect the Paper.** Use off-white (#F9F9F7) and deep slate (#1A1A1B) to mimic a high-quality physical journal.
4. **Consistency in Accents.** Use Ken Red (#E31E24) exclusively for primary CTAs and critical data highlights.

### 2. Color Palette
- **Paper:** `#F9F9F7` (Off-White) - Main background.
- **Ink:** `#1A1A1B` (Deep Slate) - All primary typography.
- **Ken Red:** `#E31E24` (Signature Red) - Logo, Nutgraph borders, and CTAs.
- **Data Blue:** `#3498DB` (Peacock Blue) - Secondary data lines.
- **Vein:** `#EEEEEE` (Light Grey) - Hair-line separators.

### 3. Typography
- **Story Body:** Tiempos Text or Georgia (Weight 400) - `font-serif`, `text-lg`, `leading-relaxed` (1.7).
- **Headlines:** Graphik or Inter (Weight 800) - `font-sans`, `tracking-tight`.
- **Labels:** `text-[11px] uppercase tracking-widest font-bold`.

### 4. Component Specs
**The "Nutgraph Block"**
- Border: `1px solid #E31E24`.
- Padding: `p-8`.
- Layout: Header ("Beyond the Nutgraph") -> 3 bullet points with custom red icons.

**The "Visual Story Card"**
- Aspect Ratio: `3:4`.
- Background: Black/Dark scrim with Red badge overlay.
- Interaction: Scale-up `1.05` on hover.

**The "Audio Bar" (Mobile)**
- Position: Sticky bottom.
- Background: `backdrop-blur-md` off-white.
- Controls: Play/Pause + Progress scrub line in Ken Red.
