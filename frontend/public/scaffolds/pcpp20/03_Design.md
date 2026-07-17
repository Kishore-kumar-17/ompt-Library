# 03 — Design System
## Professional Growth Specifications · pcpp_platform_20

### 1. The ROIMaster Manifesto
1. **Evidence-First UI.** Statistics (Hikes, Placements) must take visual priority over syllabus lists.
2. **Institutional Aura.** University logos and certificates must be framed in high-contrast white boxes toEstablish authority.
3. **The "Next Big Move".** CTA copy should focus on the "After" state: "Get Hired," "Transform Career," "Unlock Salary Hike."
4. **Sharp Professionalism.** Strictly 4px rounding for all cards and buttons to signal technical and corporate precision.

### 2. Color Palette
- **Canvas:** `#FFFFFF` (Pure White) - Main content surface.
- **Ink:** `#111827` (Deep Slate) - All primary typography and headers.
- **Impact Red:** `#E31E24` (upGrad Red) - Primary CTAs and conversion triggers.
- **Trust Blue:** `#1D4ED8` (Corporate Blue) - Secondary highlights and university labels.
- **Success:** `#059669` (Emerald) - Used exclusively for salary-growth percentages.
- **Metal:** `#F3F4F6` (Light Grey) - Subtle section dividers and block backgrounds.

### 3. Typography
- **Headlines:** Montserrat (Weight 800) - `font-extrabold`, `all-caps`, `tracking-tight`.
- **UI/Stats:** Inter (Weight 600) - `font-semibold`, `text-lg`.
- **Body:** Inter (Weight 400) - `font-normal`, `leading-relaxed`.

### 4. Component Specs
**The "Program Grid Card"**
- Layout: [University Logo (Top-Left)] -> [Program Title] -> [Outcome Badge (e.g., 360 Career Support)].
- Footer: "Download Syllabus" (Primary) and "View Details" (Link).
- Style: `bg-white p-6 border border-slate-100 shadow-sm`.

**The "ROI Stat Block"**
- Layout: Large Number (Count-up) -> Percentage Sign (%) -> Metric Label (e.g., Average Salary Hike).
- Style: Centered within a high-contrast Red or Blue block section.

**The "Multi-Step Inquiry Form"**
- Position: Full-screen modal on mobile; centered drawer on desktop.
- Progress: "Step 1 of 3: Career Interest" -> "Step 2: Experience" -> "Step 3: Contact."
