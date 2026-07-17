# 03 — Design System
## Neo-Brutalist Specifications · dpecom_platform_01

### 1. The Neo-Brutalist Manifesto
1. **Borders define structure.** Every element must have a 2px black border.
2. **Shadows are hard.** No blurs. Use 4px-8px black offset shadows.
3. **Typography is loud.** Bold, heavy weights. Tight tracking.
4. **Colors are saturated.** Pink, Yellow, and pure Black.
5. **Sharp corners only.** `rounded-none` is the default.

### 2. Color Palette
- **Primary:** `#FF90E8` (Pink) - Primary CTAs
- **Secondary:** `#FFD338` (Yellow) - Hover states, Badges
- **Background:** `#FFFFFF` (Pure White)
- **Stroke/Text:** `#000000` (Pure Black)

### 3. Typography
- **Headlines:** Archivo Black (or similar) - `font-black`, `tracking-tighter`.
- **Body:** Inter - `font-normal`, `leading-relaxed`.
- **UI/Meta:** Monospace - For prices, dates, and technical details.

### 4. Component Specs
**The "Neo-Box"**
```css
.neo-box {
  border: 2px solid black;
  box-shadow: 4px 4px 0px 0px black;
  transition: all 0.1s ease-in-out;
}
.neo-box:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px black;
}
```

**Buttons**
- Primary: `bg-[#FF90E8] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
- Hover: `bg-[#FFD338]`
- Radius: `0px` (Mandatory)
