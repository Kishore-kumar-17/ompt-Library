# 03 — Design System
## Friendly Tech Modernism Specifications · lp_platform_06

### 1. The Creator Manifesto
1. **Approachability over Hustle.** Use bright white, rounded corners, and "Hand-drawn" scribbles to make the expert feel like a friend.
2. **Pathway Nav.** Users shouldn't "Browse"—they should follow a goal-based pathway (e.g., "How Can I Help You?").
3. **Outcome Visibility.** Every product must have a clear "Outcome Label" (Free vs Premium) to manage expectations instantly.
4. **Evidence-Based Aesthetic.** Use clean, structured metadata and high-contrast typography to signal scientific and technical rigour.

### 2. Color Palette
- **Canvas:** `#FFFFFF` (Pure White) - The foundation of "Feel-Good" productivity.
- **Ink:** `#111827` (Soft Slate Black) - All primary typography.
- **Ali Blue:** `#3B82F6` - Primary CTAs and links.
- **Productivity Yellow:** `#FDE047` - Intent-based highlights and category labels.
- **Academy Purple:** `#A855F7` - High-tier mastery badges.
- **Linen:** `#F9FAFB` (Cloud Grey) - Subtle section dividers and card borders.

### 3. Typography
- **Headlines:** Circular or Inter (Weight 800) - `font-extrabold`, `rounded-full` feel, `tracking-tight`.
- **Editorial/UI:** Inter or Public Sans (Weight 400/600) - `font-normal`, `text-[16px]`, `leading-relaxed`.
- **Labels:** `text-[11px] uppercase tracking-widest font-bold` (Accent Color).

### 4. Component Specs
**The "Pathway Intent Card"**
- Layout: [Emoji/Icon] [Title (Bold)] [Description].
- Style: `bg-white p-6 border-2 border-slate-50 hover:border-blue-500 rounded-2xl shadow-sm`.
- Interaction: Gentle `1.02` scale-up on hover.

**The "Outcome Badge"**
- Style: Pill-shaped, high-contrast (Background: Yellow or Blue, Text: Slate).
- Content: "Free Crash Course," "Live Masterclass."

**The "Annotated UI"**
- Style: Custom SVG paths mimicking hand-drawn arrows or circles.
- Color: `Ali Blue` or `Academy Purple`.
- Usage: Pointing to the newsletter input or the "Start Here" button.
