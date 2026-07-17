# 03 — Design System
## Professional Expert Specifications · dpecom_platform_04

### 1. The Top-Tier Aesthetic Manifesto
1. **Focus on the Creator.** The profile header must be high-impact and clean.
2. **Clarity in Services.** Service cards must be modular, scannable, and distinct.
3. **Frictionless Utility.** Booking buttons must be large and prominent.
4. **Professional Authority.** Use bold, heavy sans-serif headings to convey trust.

### 2. Color Palette
- **Primary Accent:** `#3B82F6` (Professional Blue) - All action buttons.
- **Secondary Accent:** `#8B5CF6` (Vivid Purple) - Badges and secondary highlights.
- **Background:** `#F8FAFC` (Soft Slate) - Main page background.
- **Text:** `#0F172A` (Deep Slate) - Primary headings.

### 3. Typography
- **Headlines:** Inter (Weight 700) - `font-bold`, `tracking-tight`.
- **Body:** Inter (Weight 400) - `font-normal`, `leading-relaxed`.
- **Metadata:** Monospace (e.g., JetBrains Mono) - For duration and prices.

### 4. Component Specs
**The "Service Card"**
- Mobile-first: Full width on small screens.
- Shadow: `shadow-md` on hover.
- Radius: `12px`.
- Layout: Flex row with icon on left and "Book" button on right.

**The "Booking Grid"**
- Columns: 3 columns for time slots on desktop, 2 on mobile.
- Selected State: `bg-[#3B82F6] text-white`.
- Disabled State: `opacity-30 pointer-events-none`.
