# 03 — Design System
## Notion-Native Specifications · lp_platform_10

### 1. The Simplicity Manifesto
1. **The Canvas is the Hero.** The UI should feel like a fresh sheet of paper. Minimize toolbars and sidebars.
2. **High-Contrast Precision.** Use strictly black-on-white. Accent colors should be used only for small, meaningful badges or active states.
3. **Block Hierarchy.** Every input field or text line is a "Block." Maintain consistent vertical rhythm (8px grid) between blocks.
4. **Friction is a Bug.** Remove any step that requires a click or a thought before the user can see their form taking shape.

### 2. Color Palette
- **Canvas:** `#FFFFFF` (Pure White) - Main content area.
- **Ink:** `#000000` (Pure Black) - Primary typography and buttons.
- **Lead:** `#737373` (Neutral-500) - Muted secondary text and placeholders.
- **Ghost:** `#F7F7F7` (Light Grey) - Subtle section backgrounds and hover states.
- **Sky:** `#E0F2FE` (Soft Blue) - Badges for "Free" features.
- **Warning:** `#FEF2F2` (Soft Red) - For error states.

### 3. Typography
- **Headlines:** Inter (Weight 800) - `font-extrabold`, `tracking-tighter`, `line-height-1.1`.
- **Editorial/UI:** Inter (Weight 400/500) - `font-normal`, `text-[16px]`, `leading-relaxed`.
- **Command Mono:** JetBrains Mono - `font-mono`, `text-[14px]` for `/commands`.

### 4. Component Specs
**The "Block Inserter" (Slash Menu)**
- Layout: Vertical list of items: [Icon] [Label] [Keyboard Shortcut].
- Style: `bg-white border border-zinc-200 shadow-xl rounded-lg w-64`.
- Interaction: Highlight item on hover or arrow-key navigation.

**The "Form Block" (Input)**
- Layout: [Question Text (Editable)] -> [Input Box Placeholder].
- Interaction: "Hover state" reveals a drag-handle and a "+" button in the margin.
- Style: Zero border-radius on inputs; only a 1px bottom border until focused.

**The "Public Roadmap Card"**
- Style: `bg-zinc-50 p-4 border border-zinc-100 rounded-md`.
- Content: [Badge: Launched] [Feature Title] [Date].
