# 03 — Design System
## Vibrant Culinary Specifications · sbecom_platform_01

### 1. The Zest Manifesto
1. **Freshness via Color.** Salem Green (#067A46) is the hero. Use it for all "Go" actions.
2. **Photography is the Product.** Recipe images must be full-vibrancy, non-studio "real kitchen" style.
3. **Quirky Details.** Use handwritten script fonts for "Stickers" (e.g., "Save $40").
4. **Structured Steppers.** Maintain a persistent sense of "Where am I?" during onboarding.

### 2. Color Palette
- **Primary:** `#067A46` (Salem Green) - Conversion actions.
- **Accent:** `#9ECE1A` (Summer Lime) - New tags, small badges.
- **Text:** `#242424` (Soft Black) - High legibility.
- **Info:** `#3AA4CB` (Peacock Blue) - Tooltips and FAQs.
- **Background:** `#FFFFFF` (White) / `#F8F8F8` (Light Grey Surface).

### 3. Typography
- **Headlines:** Geometric Sans (e.g., Public Sans) - `font-bold`, `tracking-tight`.
- **Script:** Handwritten (e.g., Caveat) - For "Stickers" and "Chef's Notes."
- **Body:** Sans-serif - `font-normal`, `leading-relaxed`.

### 4. Component Specs
**The "Plan Card"**
- Outline: `2px solid #E5E7EB`
- Selected State: `border-[#067A46] bg-[#F0FDF4]`
- Layout: Top icon -> Center title -> Bottom "Select" button.

**The "Recipe Card"**
- Aspect Ratio: `4:3` for imagery.
- Footer: Title + Dietary Tags + "Add to Box" (Salem Green).
- Interaction: Shadow lift and subtle image zoom on hover.
