# 03 — Design System
## Minimalist Publishing Specifications · pcpp_platform_15

### 1. The SubStack Manifesto
1. **The Gateway is the Goal.** The "Welcome" page must be the highest-converting screen on the site.
2. **Text is Sacred.** Typography must be large, breathable, and distraction-free (no sidebars during reading).
3. **Icons are Functional.** Use icons (padlocks, audio waves) only to signal state or format.
4. **Contrast as Premium.** Stark whites (#FFFFFF) and deep ink (#1A1A1A) signal high-quality, ad-free journalism.

### 2. Color Palette
- **Background:** `#FFFFFF` (Pure White) - Main content surface.
- **Paper:** `#FDFDFD` (Off-White) - Subtle depth for welcome pages.
- **Ink:** `#1A1A1A` (Near Black) - All primary typography.
- **Accent:** `#FF6719` (Vibrant Orange) - Primary CTAs (Subscribe, Sign In).
- **Slate:** `#666666` (Neutral Grey) - Metadata and sub-labels.
- **Gold:** `#D4AF37` (Bestseller Gold) - Prestige status badges.

### 3. Typography
- **Headlines:** Inter or Sans-serif (Weight 700) - `font-bold`, `tracking-tight`.
- **Reading Body:** Caslon or Book Serif - `font-serif`, `text-lg` (1.125rem), `leading-relaxed` (1.6).
- **Labels:** `text-[11px] uppercase tracking-widest font-bold`.

### 4. Component Specs
**The "Welcome Capture"**
- Layout: Large Wordmark -> Pitch Text -> Single Input + Button Row.
- Style: Centered, `max-w-xl`.
- Background: Full-screen `cover_photo_url` at 20% opacity.

**The "Post Feed Card"**
- Layout: Title (Bold) -> 1-line summary -> Metadata (Date, Read Time) -> Padlock icon if Paid.
- Spacing: `py-8` with `border-b border-slate-100`.

**The "Paywall Overlay"**
- Gradient: Linear gradient from `transparent` to `white` over the last 100px of the teaser.
- CTA: Centered card with "Continue reading with a free trial" and tier pricing.
