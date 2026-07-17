# 03 — Design System
## Tech Editorial Specifications · pcpp_platform_10

### 1. The Insider Manifesto
1. **Text is the Technology.** Use bold, heavy typography to signal authority. Don't hide the reporting behind icons.
2. **Contrast is Clarity.** Strictly Black on White. Grey is for secondary metadata only.
3. **Friction is the Enemy.** The paywall must feel like a "Value Gate," not a "Blocker." One-click upgrades are mandatory.
4. **Information Density.** Mobile users should be able to see at least 3-4 news headlines above the fold.

### 2. Color Palette
- **Paper:** `#FFFFFF` (Pure White) - Main background.
- **Ink:** `#000000` (Pure Black) - Headlines and primary text.
- **Muted:** `#52525B` (Zinc-600) - Deck/Summaries and metadata.
- **Action:** `#4F46E5` (Indigo-600) - CTAs, links, and "Subscribe" buttons.
- **Warning:** `#FACC15` (Yellow-400) - Locked content badges.

### 3. Typography
- **Headlines:** Inter (Weight 800/900) - `font-extrabold`, `tracking-tighter`, `line-height-1.1`.
- **Deck/Excerpt:** Inter (Weight 500) - `font-medium`, `text-xl`, `text-zinc-600`.
- **Body:** Inter (Weight 400) - `font-normal`, `text-lg`, `leading-relaxed` (1.6).
- **Labels:** Inter (Weight 700) - `text-xs uppercase tracking-widest`.

### 4. Component Specs
**The "News Feed Card"**
- Layout: Vertical stack. H1 -> 2-sentence Summary -> Date/Time.
- Style: No borders. Separated by `border-b border-zinc-100`.
- Mobile: Headlines remain large (at least `24px`).

**The "Premium Paywall"**
- Style: Bottom of the teaser text fades to `opacity: 0` with a linear white gradient.
- CTA Card: High-contrast white box with shadow. Contains: "Annual ($100/yr) - Most Popular" vs "Monthly ($10/mo)".

**The "Member Portal" Modal**
- Width: `480px` centered.
- Transition: `spring` slide-up from bottom.
- Content: Magic-link email input -> Plan selection -> Stripe Element.
