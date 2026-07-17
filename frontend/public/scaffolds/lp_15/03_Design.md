# 03 — Design System
## Electric Youth Specifications · lp_platform_15

### 1. The High-Energy Manifesto
1. **Saturation is Credibility.** Use vibrant, high-saturation reds (#FF0000) and deep blacks to signal energy, passion, and modern tech-lifestyle.
2. **Visual Navigation.** Don't tell the user what a product is; show them who wears it and where (Gym, Party, Street).
3. **Aggressive Urgency.** Badges like "80% OFF" and real-time timers must be the primary visual anchors after the hero shot.
4. **Mobile Density.** Use horizontal swiping for everything. Mobile users shouldn't have to scroll deep to find deals; they should swipe side-to-side.

### 2. Color Palette
- **Deep Pitch:** `#000000` (Pure Black) - The Foundation.
- **Brand Electric:** `#FF0000` (Electric Red) - Primary CTAs and deal labels.
- **Neon Pulse:** `#22D3EE` (Cyan) and `#A3E635` (Lime) - For "New Launch" and "Stock" status.
- **Tribe Canvas:** `#111827` (Deep Charcoal) - For card backgrounds and subtle sections.
- **Success:** `#00D26A` - Discount percentage highlights.

### 3. Typography
- **Headlines:** Montserrat (Weight 900) - `font-black`, `all-caps`, `tracking-tight`.
- **Product Titles:** Inter (Weight 700) - `font-bold`, `text-[18px]`, `leading-tight`.
- **Timer Mono:** JetBrains Mono - `font-mono`, `text-[20px]` for large-scale countdowns.

### 4. Component Specs
**The "High-Impact Hero Slider"**
- Layout: Full-bleed. Overlay text: [H1 (Vibrant)] [Subtitle] [CTA (Red)].
- Animation: Snappy horizontal transitions; `scale-110` on the product image.

**The "FOMO Countdown Widget"**
- Layout: [Title: DEAL ENDS IN] [Time Segments (HH:MM:SS)].
- Style: `bg-red-600 text-white p-2 rounded-lg font-mono flex gap-2`.

**The "Lifestyle Vibe Block"**
- Layout: Atmospheric Photo -> Centered Title -> "Explore" link.
- Style: `aspect-[4/5] relative rounded-2xl overflow-hidden`.
- Hover: `brightness-75` transition.
