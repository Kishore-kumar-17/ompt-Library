# 03 — Design System
## Design-Forward Specifications · pcpp_platform_21

### 1. The Config Manifesto
1. **Motion is texture.** Use video backgrounds and CSS marquees to create a high-energy, "Live" environment.
2. **Contrast is Quality.** Deep Black (#000000) and Kelly Green (#10B981) signal technical precision and creative audacity.
3. **Typography as Software.** Use bold, heavy sans-serifs and monospaced accents to reflect the tools the attendees use daily.
4. **Sharp 0px/2px Geometry.** Avoid soft or bubbly patterns. The site should feel as precise as a Figma canvas.

### 2. Color Palette
- **Canvas:** `#000000` (Pure Black) - Main content surface.
- **Surface:** `#121212` (Deep Charcoal) - For cards and secondary sections.
- **Action:** `#10B981` (Kelly Green) - Primary CTAs and active states.
- **Ink:** `#FFFFFF` (Pure White) - All primary typography.
- **Slate:** `#A1A1AA` (Zinc-400) - Metadata and sub-labels.
- **Warning:** `#FACC15` (Yellow) - Special alerts or urgency banners.

### 3. Typography
- **Headlines:** Inter or SF Pro (Weight 800) - `font-extrabold`, `tracking-tighter`, `line-height-1.1`.
- **UI/Nav:** Inter (Weight 600) - `font-semibold`, `text-sm`, `tracking-wide`.
- **Technical:** JetBrains Mono - `font-mono`, `text-[12px]` for times and tracks.

### 4. Component Specs
**The "Speaker Hover Card"**
- Layout: Square B&W image -> Name -> Role.
- Hover: Image fades to `color_portrait_url`; Role slides up `4px`.
- Radius: `2px`.

**The "Urgency Marquee"**
- Style: Fixed height `h-10` top-bar.
- Animation: `infinite-scroll` CSS animation.
- Text: All-caps bold sans-serif in Black on Kelly Green background.

**The "Schedule Session Card"**
- Layout: [Time (Mono)] [Title (Bold)] [Track Badge].
- Interaction: "Plus" icon (+) that rotates 45 degrees to "Check" (✓) when added.
- Radius: `0px` with 1px borders.
