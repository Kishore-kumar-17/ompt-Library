# 03 — Design System
## Authority Minimalism Specifications · lp_platform_05

### 1. The Authority Manifesto
1. **The Bibliography is the UI.** Don't hide links; use clean, structured bulleted lists to signal resource density.
2. **Professional Blue.** Use Deep Blue (#1D4ED8) exclusively for interaction (Links, Buttons) to Establish corporate/academic trust.
3. **No Decorative Clutter.** Every 1px line or icon must serve a functional purpose (e.g., distinguishing a Podcast from an Article).
4. **Breathable Archives.** Use generous vertical spacing (24px+) between list items to prevent "List Fatigue" for the reader.

### 2. Color Palette
- **Paper:** `#FFFFFF` (Pure White) - Main content surface.
- **Ink:** `#111827` (Deep Slate / Black) - All primary typography and headers.
- **Authority Blue:** `#1D4ED8` (Professional Blue) - Primary CTAs and links.
- **Ghost:** `#F8F9FA` (Softest Grey) - Sidebar backgrounds and data boxes.
- **Vein:** `#E5E7EB` (Slate-200) - Hair-line structural borders.

### 3. Typography
- **Headlines:** Helvetica Neue or Inter (Weight 800) - `font-extrabold`, `tracking-tight`.
- **Reading Body:** Inter or Open Sans (Weight 400) - `font-sans`, `text-[17px]`, `leading-relaxed` (1.7).
- **Show Note Items:** Inter (Weight 500) - `text-[15px]`, `font-sans`.
- **Labels:** `text-[11px] uppercase tracking-widest font-bold`.

### 4. Component Specs
**The "Show Note Bullet"**
- Layout: [Timestamp (Grey)] [Link/Text (Blue Bold)].
- Spacing: `mb-4`.
- Interaction: Click timestamp to trigger podcast player `currentTime`.

**The "Start Here Card"**
- Layout: Square B&W Icon -> Title -> 2-line Description.
- Style: `bg-white p-8 border border-slate-100 hover:border-blue-500 transition-all`.

**The "Acquisition Hero"**
- Position: Full-width block.
- Text: "Join 2M+ readers. 5-Bullet Friday."
- Action: Single input + "Subscribe" button in Authority Blue.
