# 03 — Design System
## Homely Modern Specifications · bw_platform_03

### 1. The Suta Manifesto
1. **Vibrancy as Identity.** Use saturated, "edible" colors in UI blocks to reflect the richness of Indian festivals.
2. **Softness over Starkness.** Strictly 12px rounding for all surfaces and buttons to create a "friendly" feel.
3. **Community is the Grid.** Stagger customer photos within the professional grids to signal inclusivity and real-life use.
4. **Narrative Labels.** Use Serif/Script fonts for sub-headings to create a "journalistic/personal" tone.

### 2. Color Palette
- **Background:** `#FFFFFF` (Pure White) - Main content area.
- **Suta Red:** `#E31E24` (Urgency Red) - Sale banners and primary CTAs.
- **Suta Teal:** `#3AA4CB` (Friendly Teal) - Help icons and Testimonial backgrounds.
- **Text:** `#242424` (Soft Charcoal) - High legibility.
- **Story Ink:** `#57534E` (Warm Stone) - Narrative body text.

### 3. Typography
- **UI/Nav:** Montserrat (Weight 500) - `font-sans`, `uppercase`, `tracking-wide`.
- **Story Titles:** Playfair Display (Weight 500) - `font-serif`, `leading-snug`.
- **Product Titles:** Inter (Weight 600) - `font-semibold`.

### 4. Component Specs
**The "Product Reel"**
- Layout: Horizontal scroll with `snap-x`.
- Card: Large square image -> Title -> Price -> Floating "Choose Options" button.
- Interaction: Left/Right arrows on desktop; swipe on mobile.

**The "Quick-Option Modal"**
- Transition: Slide-up `200ms` from bottom-of-screen (mobile) or centered (desktop).
- Selection: Grid of size chips with `border-2 border-slate-200`.

**The "Offer Progress Bar"**
- Style: `h-2` height in the cart.
- Color: `#E31E24` (Red) fill.
- Text: "You're 1 saree away from a FREE gift!"
