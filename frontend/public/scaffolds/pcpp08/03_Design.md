# 03 — Design System
## Production Modern Specifications · pcpp_platform_08

### 1. The Crew Manifesto
1. **Scale over Solo.** Use team portraits and statistical counters to signal production house volume.
2. **Video Leads.** Motion is our core product; heros and previews must be video-first whenever possible.
3. **Mosaic Dynamics.** Avoid boring grids. Use variable card sizes (1x1, 2x2, 2x1) to create visual energy.
4. **Vibrant Precision.** Maintain high saturation in imagery but keep UI borders and backgrounds clean and neutral.

### 2. Color Palette
- **Primary:** `#111827` (Deep Slate) - Header, Footer, and authoritative UI.
- **Accent:** `#DAA520` (Goldenrod) - Success markers, active states, and "Premium" badges.
- **Background:** `#FFFFFF` (Pure White) - Main content surface.
- **Surface:** `#F3F4F6` (Light Grey) - Card backgrounds and secondary blocks.
- **Text:** `#111827` (Slate) / `#4B5563` (Muted Grey).

### 3. Typography
- **Headlines:** Montserrat or Inter (Weight 800) - `font-extrabold`, `tracking-tight`.
- **Service Titles:** Inter (Weight 700) - `font-bold`.
- **Body:** Open Sans - `font-normal`, `leading-relaxed`.

### 4. Component Specs
**The "Service Mosaic Block"**
- Layout: Absolute positioned title overlay at bottom-left.
- Hover: Image expands slightly; "View All" button fades in.
- Radius: `8px`.

**The "Crew Card"**
- Aspect Ratio: `1:1` or `3:4` portrait.
- Content: Full portrait -> Hover reveals role and brief bio.
- Style: `bg-white shadow-sm`.

**The "Trust Strip"**
- Background: `#111827`.
- Logo Style: Grayscale icons at 50% opacity.
- Badge: Gold circle with "4.6" star rating.
