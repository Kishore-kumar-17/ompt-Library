# 03 — Design System
## Professional Mastery Specifications · pcpp_platform_18

### 1. The CohortHub Manifesto
1. **Headshots are Trust.** Instructor portraits must be high-resolution and take visual priority over generic course icons.
2. **Boldness over Nuance.** Use heavy typographic weights (Inter 800) and high contrast to signal professional ambition.
3. **Information Density is Utility.** Professional users value scannability. Use accordions and grids to organize complex syllabi.
4. **Urgency via Data.** "Starts [Date]" isn't a marketing tactic—it's a critical logistical data point. Highlight it in Red or Electric Blue.

### 2. Color Palette
- **Paper:** `#FFFFFF` (Pure White) - Main content surface.
- **Ink:** `#111827` (Deep Slate / Black) - All primary typography and headers.
- **AI/Tech Blue:** `#3B82F6` - Accents for engineering/technical tracks.
- **Product Purple:** `#8B5CF6` - Accents for product/management tracks.
- **Smoke:** `#F8F9FA` (Lightest Grey) - Subtle section dividers and card backgrounds.
- **Metal:** `#E5E7EB` (Slate-200) - Hair-line structural borders.

### 3. Typography
- **Headlines:** Inter (Weight 800) - `font-extrabold`, `tracking-tighter`, `leading-tight`.
- **UI/Curriculum:** Inter (Weight 400/600) - `font-normal`, `text-[16px]`, `leading-relaxed`.
- **Metadata Labels:** `text-[12px] uppercase tracking-widest font-bold` (Accent Color).

### 4. Component Specs
**The "Pedigree Card" (Instructor)**
- Layout: Large Circle Avatar -> Name -> Bold Career Title (e.g., Ex-Airbnb).
- Style: `bg-white p-6 shadow-sm border border-slate-100`.
- Interaction: Slow scale-up on hover; "View Courses" button reveal.

**The "Cohort Urgency Badge"**
- Style: Pill-shaped, high-contrast (Background: Accent, Text: White).
- Content: "Starts May 30 · 6 Weeks".
- Position: Top-right of course cards.

**The "Weekly Syllabus Accordion"**
- Header: Week Number (e.g., 01) + Theme (e.g., Scaling).
- Content: List of 3-4 lessons -> "What you'll learn" bullet points.
- Style: Clean 1px border; chevron rotation on expand.
