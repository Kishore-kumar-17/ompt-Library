# 03 — Design System
## Professional Tech Editorial Specifications · pcpp_platform_17

### 1. The Reforge Manifesto
1. **Documents are UI.** Use real-world document previews (blurred or gated) to signal immediate practical value.
2. **Operator Authority.** Host profiles must include high-quality headshots and corporate logos to establish credibility.
3. **Density is Clarity.** Don't fear information-dense layouts; for senior professionals, a well-structured list is more useful than a "fluffy" carousel.
4. **Prestigious Monochrome.** Use grayscale for alumni logos and secondary UI to let the primary Blue CTAs and high-saturation document previews lead.

### 2. Color Palette
- **Paper:** `#FFFFFF` (Pure White) - Main content surface.
- **Ink:** `#111827` (Deep Slate / Black) - All primary typography and headers.
- **Reforge Blue:** `#1D4ED8` (Primary Blue) - Conversion CTAs and interactive links.
- **Smoke:** `#F9FAFB` (Lightest Grey) - Subtle section backgrounds and card surfaces.
- **Metal:** `#E5E7EB` (Slate-200) - Hair-line structural borders.

### 3. Typography
- **Headlines:** Inter (Weight 800) - `font-extrabold`, `tracking-tight`, `leading-tight`.
- **Editorial/UI:** Inter (Weight 400/500) - `font-normal`, `text-[15px]`, `leading-relaxed`.
- **Labels:** `text-[11px] uppercase tracking-widest font-bold` (Reforge Blue or Black).

### 4. Component Specs
**The "Artifact Preview Card"**
- Layout: [Company Logo (Small)] -> [Doc Title] -> [Image Preview with Gate Overlay].
- Style: `border border-slate-100 shadow-sm rounded-lg overflow-hidden`.
- Interaction: Slow scale-up on hover; "Join to Unlock" badge reveal.

**The "Host Operator Card"**
- Layout: Horizontal. [Circle Avatar (48x48)] [Name & Title Group].
- Content: "Ravi Mehta · Former CPO, Tinder".
- Style: Minimalist, text-first.

**The "Curriculum Module"**
- Layout: Vertical accordion or fixed list.
- Markers: Numerical index (01, 02) + Module Title (Bold).
- Style: Dense, scannable list of 4-5 lessons per module.
