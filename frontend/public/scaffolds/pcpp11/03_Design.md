# 03 — Design System
## Professional Minimalism Specifications · pcpp_platform_11

### 1. The Author Manifesto
1. **Clarity over Chaos.** Use generous margins and constrained widths to create a "reading-first" environment.
2. **Authority in Typography.** Pair classic serifs (Headings) with modern sans-serifs (UI) to signal intellectual weight.
3. **Monochrome Prestige.** Use grayscale logos and neutral backgrounds. Color should only come from book covers and portraits.
4. **Sharpness is Professional.** Strictly 0px-2px rounding for every element. No modern "bubbly" patterns.

### 2. Color Palette
- **Background:** `#FFFFFF` (Pure White) - Main editorial surface.
- **Ink:** `#111111` (Near Black) - All primary typography and structural lines.
- **Slate:** `#555555` (Slate Grey) - Metadata and sub-labels.
- **Paper:** `#F7F7F7` (Lightest Grey) - Subtle section backgrounds.
- **Accent:** `#111111` (Black structural accents).

### 3. Typography
- **Headlines:** Caslon or Georgia (Weight 600) - `font-serif`, `tracking-tight`.
- **UI/Body:** Inter or Public Sans (Weight 400) - `font-sans`, `leading-relaxed`.
- **Captions:** `text-[10px] uppercase tracking-widest font-bold`.

### 4. Component Specs
**The "Book Hero"**
- Layout: Large Cover Image (Left/Center) -> Acclaim Badge -> Title -> Call to Action.
- Scale: Cover should be at least `400px` height.
- Style: Subtle shadow for depth.

**The "Prestige Logo Strip"**
- Height: `h-16`.
- Logic: Grayscale images with `opacity-50` hover-to-`opacity-100`.
- Spacing: `justify-between` or centered with `gap-16`.

**The "Article Card"**
- Layout: [Date] [Publication] [Headline (Bold)] [Excerpt].
- Divider: `1px solid #D1D1D1` bottom border.
- Margin: `mb-12`.
