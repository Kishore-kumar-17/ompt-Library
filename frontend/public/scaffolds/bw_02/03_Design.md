# 03 — Design System
## Restrained Baroque Specifications · bw_platform_02

### 1. The Sabyasachi Manifesto
1. **The Frame is Invisible.** Navigation and UI elements must recede to let the cinematic imagery lead.
2. **Vintage Sepia Palette.** Use `#F4F1EA` for backgrounds to evoke nostalgia and "old-world" grandeur.
3. **Typography as Stature.** Use wide-tracked serif fonts (0.15em+) to create breathable, authoritative headings.
4. **Vertical Focus.** Prioritize portrait-oriented layouts (2:3 or 4:5) to mimic high-end fashion editorials.

### 2. Color Palette
- **Background:** `#F4F1EA` (Vintage Sepia) - Main editorial surface.
- **Ink:** `#1A1A1A` (Near Black) - All primary typography and lines.
- **Prestige:** `#B59410` (Antique Gold) - Subtle badges and labels.
- **Theater:** `#000000` (Pure Black) - Video backgrounds and dark mode overrides.
- **Stroke:** `#E5E7EB` (Slate-200) - Hair-line dividers for scannability.

### 3. Typography
- **Headlines:** Bodoni or Didot (Weight 600) - `font-serif`, `tracking-[0.15em]`.
- **UI/Nav:** Montserrat or Inter (Weight 500) - `font-sans`, `uppercase`, `tracking-[0.2em]`.
- **Narration:** Serif Italic - `font-serif`, `italic`, `leading-extra-loose`.

### 4. Component Specs
**The "Vertical Portrait Card"**
- Aspect Ratio: Strictly `2:3` or `4:5`.
- Margin: `gap-12` (48px) between portraits.
- Entry: `FadeIn` on scroll with 10% vertical slide.

**The "Luxury Inquiry Bar"**
- Position: Sticky bottom or integrated into Product Sidebar.
- Action: "Inquire with Boutique" text link with small arrow icon.
- Style: 1px top border in Slate-200.

**The "Flagship Interior Slide"**
- Layout: Full-bleed background image.
- Content: Name -> City -> Text Link overlay centered in the lower third.
