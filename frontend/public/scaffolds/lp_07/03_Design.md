# 03 — Design System
## High-Contrast Authority Specifications · lp_platform_07

### 1. The Warikoo Manifesto
1. **Contrast establishes Pedigree.** Use bold blacks (#000000) and pure whites to create a professional "Social Educator" environment.
2. **Neon for Action.** Use Neon Yellow (#FAFF00) exclusively for primary CTAs and urgency markers to guide the user's eye.
3. **Typography as Product.** Headlines must use heavy, geometric sans-serifs that mirror the authority of a physical book cover.
4. **Honesty through Layout.** Use vertical lines and chronological steps in the "Failure Resume" to signal a linear, transparent journey.

### 2. Color Palette
- **Canvas:** `#FFFFFF` (Pure White) - Main content surface.
- **Ink:** `#111827` (Rich Slate Black) - All primary typography.
- **Action:** `#FAFF00` (Neon Yellow) - Primary conversion buttons.
- **Focus:** `#FF5C00` (Warikoo Orange) - Section headers and "Important" chips.
- **Ghost:** `#F9FAFB` (Cloud Grey) - Subtle section backgrounds and card borders.

### 3. Typography
- **Headlines:** Montserrat (Weight 900) - `font-extrabold`, `all-caps`, `tracking-tighter`.
- **Editorial/UI:** Inter or Public Sans (Weight 400/600) - `font-normal`, `text-[16px]`, `leading-relaxed`.
- **Metadata Labels:** `text-[12px] uppercase tracking-widest font-bold`.

### 4. Component Specs
**The "Failure Timeline Row"**
- Layout: [Year (Bold)] [Vertical Line] [Rejection Title] -> [Lesson (Italic)].
- Style: `border-l-2 border-black ml-4 pl-8 py-6 relative`.
- Interaction: Dot on the line pulses on hover.

**The "WebVeda Card"**
- Layout: Square Image -> Title -> "Outcome Chips" Row -> Price -> Enroll Button.
- Style: `bg-white p-4 border border-slate-100 shadow-sm rounded-lg`.
- Highlight: "Bestseller" ribbon in Neon Yellow.

**The "Social Proof Strip"**
- Style: Fixed height `h-16` high-contrast background.
- Content: Row of 3-4 massive stats (e.g., "16M+ Followers") with minimal icons.
