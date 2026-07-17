# 03 — Design System
## Zen Specifications · lp_platform_04

### 1. The Zen Manifesto
1. **Content is the Hero.** Delete every element that isn't helping the user read or understand.
2. **Binary Palette.** Use strictly #000000 and #FFFFFF. Any color must be justified by 100% technical necessity.
3. **Typographic Intent.** Pairing Serif with Monospaced isn't just aesthetic—it separates "Narrative" from "Data."
4. **Structural Purity.** No border-radius. No box-shadows. No "Components." The site is a document, not a widget.

### 2. Color Palette
- **Paper:** `#FFFFFF` (Pure White) - The foundation of clarity.
- **Ink:** `#000000` (Pure Black) - All typography and 1px lines.
- **Ghost:** `#F9FAFB` (Subtle Grey) - Only for the occasional monospaced data box.
- **Highlight:** `#000000` with `text-decoration-underline`.

### 3. Typography
- **Narrative (Serif):** Lora, Georgia, or Playfair Display.
  - Body: `18px`, `leading-[1.6]`.
  - Headings: `24px` to `36px`.
- **Data (Mono):** JetBrains Mono or Courier New.
  - Dates/Links/Notes: `13px`, `tracking-tight`.
- **Line Length:** `65-75 characters` (approx. 700px) for optimal reading rhythm.

### 4. Component Specs
**The "Document Feed"**
- Layout: Vertical list with 48px gap between entries.
- Row: [Date (Mono)] [Title (Serif Bold)] [Links (Mono)].
- Hover: Title underline reveal.

**The "Monospaced Block"**
- Style: `bg-slate-50 p-4 border border-black/5`.
- Usage: For podcast timestamps, related book links, or legal footers.

**The "Zen Input"**
- Style: `border-b border-black rounded-none bg-transparent py-2 px-0`.
- Usage: For Newsletter and Search fields.
