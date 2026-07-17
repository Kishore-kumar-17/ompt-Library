# 03 — Design System
## Studio Minimalist Specifications · lp_platform_08

### 1. The Studio Manifesto
1. **The Void is Focus.** Whitespace is not empty—it is a frame for the single task.
2. **Binary Authority.** Use black and white as the primary language. Color is only for system states (errors).
3. **Typographic Separation.** Use Sans for the "Human" message and Mono for the "Technical" status.
4. **Sharpness over Softness.** 2px rounding signals a "Professional/Technical" tool. Avoid bubbly "consumer" rounding.

### 2. Color Palette
- **Paper:** `#FFFFFF` (Pure White) - The foundation of clarity.
- **Ink:** `#000000` (Pure Black) - Typography and primary buttons.
- **Lead:** `#71717A` (Zinc-500) - Secondary text and monospaced labels.
- **Vein:** `#E4E4E7` (Zinc-200) - Hair-line input borders.
- **Focus:** `#09090B` (Black with soft 2px ring).

### 3. Typography
- **Primary Message (Sans):** Inter or Satoshi.
  - Tease: `16px`, `medium (500)`, `tracking-tight`.
- **System Labels (Mono):** JetBrains Mono or SF Mono.
  - Status/Version: `12px`, `regular (400)`, `uppercase`.
- **Optical Height:** Main content group is offset `10%` above the exact vertical center for a more balanced "Hero" feel.

### 4. Component Specs
**The "Optical Input Group"**
- Layout: [Email Input (Fluid)] [Submit Arrow or 'Join' (Fixed)].
- Style: `border-b border-zinc-200 py-2 focus-within:border-black transition-colors`.
- Interaction: No heavy boxes. Use "Text on a line" aesthetic.

**The "Mono Status Bar"**
- Layout: Top-right or centered above the input.
- Content: "VER 1.0.4 // 12K JOINED".
- Style: `text-zinc-500 font-mono text-[10px]`.

**The "Success Message"**
- Style: Identical typography to the "Tease" sentence.
- Content: "You're on the list. We'll be in touch."
