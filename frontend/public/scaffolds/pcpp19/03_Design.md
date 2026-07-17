# 03 — Design System
## Trust & Success Specifications · pcpp_platform_19

### 1. The ExamMaster Manifesto
1. **Goal above All.** Every interaction must be contextual to the student's selected exam goal.
2. **Success Indicators.** Use vibrant Green (#08BD80) for all primary actions to signal growth and progress.
3. **Exclusivity via Gold.** Use Iconic Gold (#FBB03B) for high-tier features to denoting personalized mentorship and premium quality.
4. **Teacher as Brand.** Headshots of educators must be high-resolution and high-contrast, establishing them as authoritative guides.

### 2. Color Palette
- **Canvas:** `#FFFFFF` (Pure White) - Main background.
- **Success:** `#08BD80` (Unacademy Green) - Primary CTAs and progress trackers.
- **Premium:** `#FBB03B` (Iconic Gold) - High-tier badges and labels.
- **Ink:** `#1A1A1A` (Near Black) - All primary typography.
- **Slate:** `#757575` (Muted Grey) - Sub-labels and metadata.
- **Shadow:** `0px 4px 20px rgba(0, 0, 0, 0.05)` (Subtle depth for cards).

### 3. Typography
- **Headlines:** Inter or SF Pro (Weight 800) - `font-extrabold`, `tracking-tight`.
- **UI/Labels:** Inter (Weight 600) - `font-semibold`, `text-sm`.
- **Body:** Inter (Weight 400) - `font-normal`, `leading-relaxed`.

### 4. Component Specs
**The "Goal Selector Card"**
- Layout: Small Icon -> Goal Name -> Chevron Arrow.
- Interaction: 1-tap redirect with smooth page transition.
- Style: `border border-slate-100 hover:border-green-500`.

**The "Plus vs Iconic" Comparison**
- Header: Sticky column headers for each tier.
- Logic: "Check" icons in Green (Plus) and Gold (Iconic).
- Tier Highlight: Iconic column has a subtle Gold outer-glow or border.

**The "Classroom Chat"**
- Width: `320px` (Right sidebar).
- Style: Semi-transparent background; staggered message entry.
- Features: Pinned questions and live poll popups in Green.
