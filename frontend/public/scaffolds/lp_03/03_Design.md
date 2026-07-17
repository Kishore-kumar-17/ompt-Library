# 03 — Design System
## Minimalist Elegance Specifications · lp_platform_03

### 1. The LumaStyle Manifesto
1. **Whitespace as Intimacy.** Use generous padding and centered content to make the user feel focused and special.
2. **Typography as Voice.** Pair high-end Serif (EB Garamond) with functional Sans (Inter) to convey both prestige and approachability.
3. **Avatars as Proof.** Circular attendee profile photos must be clean, high-res, and overlapping to signal "Community Density."
4. **Soft Geometry.** Use 12px rounding and subtle shadows to create a "Digital Stationery" feel rather than a "Corporate Platform."

### 2. Color Palette
- **Paper:** `#FFFFFF` (Pure White) - Main content surface.
- **Linen:** `#F9FAFB` (Cloud Grey) - Subtle section backgrounds.
- **Ink:** `#111827` (Rich Black) - Primary serif typography.
- **Sky:** `#2563EB` (Luma Blue) - Action buttons and highlights.
- **Dust:** `#E5E7EB` (Light Platinum) - Hair-line borders and dividers.

### 3. Typography
- **Invitation Headings:** EB Garamond (Weight 500) - `font-serif`, `tracking-tight`, `leading-tight`.
- **Editorial/UI:** Inter (Weight 400/600) - `font-sans`, `text-[15px]`, `leading-relaxed`.
- **Labels:** `text-[11px] uppercase tracking-widest font-bold` (Zinc-500).

### 4. Component Specs
**The "Attendee Avatar Stack"**
- Layout: Horizontal overlapping circles (32x32px).
- Interaction: Z-index increases on hover; Tooltip shows "Name".
- Logic: Show first 6 avatars -> then "+X others" text.

**The "Glassmorphism Card"**
- Style: `bg-white/70 border border-white/20 backdrop-blur-md shadow-lg`.
- Radius: `rounded-2xl`.

**The "Logistics Block"**
- Layout: Vertical stack on mobile; Horizontal row on desktop.
- Icons: Clean, 1px stroke minimalist SVGs for Calendar, Pin, and Host.
