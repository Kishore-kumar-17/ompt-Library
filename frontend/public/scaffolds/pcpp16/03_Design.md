# 03 — Design System
## Minimalist Builder Specifications · pcpp_platform_16

### 1. The Builder Manifesto
1. **Insight Above All.** Structural summary blocks ("Top 3 Lessons") must be the first thing a user sees on long-form content.
2. **The Palette is the Page.** Use pure white (#FFFFFF) and deep slate (#111827) to maintain the feel of a modern technical library.
3. **App-Like Utility.** Navigation and course tools should feel like high-performance software, not a static blog.
4. **Content-Driven Texture.** Let the book covers, code snippets, and diagrams provide the visual variety.

### 2. Color Palette
- **Paper:** `#FFFFFF` (Pure White) - Main background.
- **Ink:** `#111827` (Deep Slate) - All primary typography.
- **Slate:** `#6B7280` (Cool Grey) - Metadata, sub-labels, and borders.
- **Action:** `#000000` (Pure Black) - Primary CTAs and Navigation.
- **Code:** `#F3F4F6` (Lightest Grey) - Technical highlights and summary boxes.

### 3. Typography
- **Reading Body:** Tiempos Text or Merriweather (Weight 400) - `font-serif`, `text-lg`, `leading-relaxed` (1.7).
- **Headlines:** Inter or Public Sans (Weight 700) - `font-sans`, `tracking-tight`.
- **System/UI:** Inter (Weight 500) - `text-sm`, `font-sans`.
- **Code:** JetBrains Mono - `font-mono`, `text-xs`.

### 4. Component Specs
**The "Note Summary Box"**
- Background: `#F3F4F6`.
- Border: `1px solid #E5E7EB`.
- Content: "Top 3 Takeaways" header -> Numbered list.
- Radius: `4px`.

**The "Course Progress Card"**
- Layout: Horizontal stack. Lesson Title -> Time -> Checkbox.
- Active State: `bg-slate-100 font-bold`.
- Style: `py-3 border-b border-zinc-100`.

**The "Digital Library Search"**
- Position: Top-aligned with instant modal popup on `/` or search-icon click.
- Results: Visual thumbnails for book notes, text snippets for articles.
