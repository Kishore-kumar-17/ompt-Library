# 03 — Design System
## Industrial Minimalism Specifications · lp_platform_14

### 1. The Engineering Manifesto
1. **Deconstruction is Discovery.** Don't show a product—show its parts. Every component should justify its presence through visualized function.
2. **Numbers are Hero Elements.** Treat "100k RPM" with the same visual importance as the product title. Use bold weights and high-contrast color for metrics.
3. **The Accessory Grid is a Menu.** Show every tool top-down in a 2D plane to signal completeness and professional system value.
4. **Laboratory White.** The foundations must be pure white (#FFFFFF) to establish a "Clinical" environment that highlights product finishes like Nickel and Copper.

### 2. Color Palette
- **Lab foundations:** `#FFFFFF` (Pure White) - Main content canvas.
- **Machine Ink:** `#111827` (Slate Black) - Primary technical typography.
- **Innovation Purple:** `#702082` - Signature Dyson highlight color.
- **Copper Metallic:** `#BC6C25` - For hair care and high-end machine accents.
- **Laser Green:** `#00D26A` - For "Invisible Reveal" technical callouts.
- **Structural Vein:** `#E5E7EB` (Slate-200) - Hair-line border separators.

### 3. Typography
- **Technical Headlines:** Inter or Public Sans (Weight 700) - `font-bold`, `tracking-tight`, `leading-tight`.
- **Briefing Body:** Inter (Weight 400) - `font-normal`, `text-[16px]`, `leading-relaxed` (1.6).
- **Metric Mono:** JetBrains Mono - `font-mono`, `text-[14px]` for spec labels and counts.

### 4. Component Specs
**The "Exploded Hero"**
- Layout: Central core part (Fixed) | Peripheral parts (Absolute).
- Animation: `x/y` translate on scroll to "Re-assemble" the machine.
- Style: Shadowless, high-fidelity render focus.

**The "Top-Down Accessory Card"**
- Layout: [SVG/Image (Top-down)] [Title (Small Bold)] [Function (Muted)].
- Style: `aspect-square bg-slate-50 border border-slate-100 rounded-sm p-4`.

**The "Technical Spec Row"**
- Layout: 3-column flex: [Label (Mono)] [Dot Leader] [Value (Bold)].
- Style: `border-b border-zinc-200 py-4`.
