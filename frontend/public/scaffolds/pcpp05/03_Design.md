# 03 — Design System
## Modern Royalty Specifications · pcpp_platform_05

### 1. The Opulence Manifesto
1. **Grand heros.** Every landing and chapter must start with a massive, high-production media element.
2. **Antique Gold Accents.** Use `#B59410` for structural lines, button borders, and "Snippet" labels to signal luxury.
3. **Sequence as Emotion.** Arrange photos to tell the story of the day: Prep -> Ceremony -> Celebration.
4. **Vibrancy is Life.** Avoid desaturated filters. Use deep, rich colors that celebrate the palette of Indian weddings.

### 2. Color Palette
- **Primary:** `#B59410` (Antique Gold) - Structural dividers and highlights.
- **Secondary:** `#7D0A0A` (Deep Maroon) - Emotive text and "Story" badges.
- **Background:** `#FFFFFF` (White) - Airy editorial canvas.
- **Ink:** `#1A1A1A` (Near Black) - All typography.
- **Theater:** `#000000` (Pure Black) - Video background and modals.

### 3. Typography
- **Headlines:** Playfair Display (Weight 600) - `font-serif`, `tracking-tight`.
- **Narration:** Montserrat (Weight 400) - `font-sans`, `leading-extra-relaxed` (1.7).
- **Labels:** `text-xs uppercase tracking-widest font-bold` (Antique Gold).

### 4. Component Specs
**The "Chapter Card"**
- Aspect Ratio: `16:9` cinematic landscape.
- Stroke: `1px solid #B59410` border with `16px` padding.
- Hover: "Read the Story" reveals with a slow gold-line expansion.

**The "Your Story" Form Field**
- Border: Bottom-border only (`2px solid #E5E7EB`).
- Active: Animates to `#B59410` gold.
- Text: Large, elegant serif font for user input.

**The "Cinema Overlay"**
- Transition: Darken viewport -> Slide up custom player controls.
- Metadata: Monospace text for "Resolution: 4K" and "Lens: Cinematic Prime."
