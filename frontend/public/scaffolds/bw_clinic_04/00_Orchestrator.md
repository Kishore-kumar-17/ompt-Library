# 00 — Orchestrator
## Modern Indian Diagnostic Marketplace · bw_clinic_04

---

## What This Build Is

**VitalCheck** — a Cult.fit Care-pattern Indian diagnostic marketplace. This build is the most different from prior clinic builds: no doctor directory, no specialty filters, no consultation modes. The primary product is a **health package** — a curated set of diagnostic tests sold at a discounted price with home sample collection. The visual identity is dark-first (near-black bg), glassmorphism cards, bold pink accent, and Inter typography. Pricing is the centrepiece: strike-through originals and discounted prices in pink.

---

## Comparison Table — All Clinic Builds

| Dimension | bw_clinic_01 (Apollo) | bw_clinic_02 (Practo) | bw_clinic_03 (Cleveland) | bw_clinic_04 (Cult.fit) |
|-----------|----------------------|----------------------|--------------------------|-------------------------|
| **Category** | Hospital network | Booking marketplace | Academic medical centre | Diagnostic marketplace |
| **Primary entity** | `Doctor` | `Doctor` | `Provider` | `HealthPackage` |
| **Primary bg** | White | White | White | Dark `#15171C` |
| **Accent color** | Gold `#FDB931` | Cyan `#14BEF0` | Blue `#0468CD` | Pink `#FF316D` |
| **Button text** | White on teal ✓ | Navy on cyan ✓ | White on blue ✓ | Dark on pink ✓ (white fails!) |
| **Font** | Nunito Sans | Lato | Roboto | Inter |
| **Button radius** | 8px | 4px | 4px | 8px |
| **Card radius** | 12px | 4px | 6px | 16px (PackageCard) / 12px (trust/testimonials) |
| **Shadow** | All cards | OmniSearch only | ProviderCard only | PackageCard hover glow only |
| **Glassmorphism** | No | No | No | Yes — PackageCard |
| **Doctor search** | City + specialty selects | OmniSearch (2 text inputs) | Condition-indexed (1 input) | No doctor search |
| **Primary filter** | City + Specialty | Text query | Condition + location + appt type | ServiceCategory tabs |
| **Filter dimensions** | 2 | 3 (text + city + keyword) | 3 (name + location + apptType) | 1 (category only) |
| **Pricing** | `consultFee` | `consultFee` | Not shown | Strike-through MRP + discount |
| **Strike-through pricing** | No | No | No | Yes — `<del>` tag |
| **Home collection** | No | No | No | Yes — `homeCollection: boolean` |
| **Trust signals** | NABH + JCI | VerifiedBadge per doctor | US News #1 OutcomesStrip | WHO-certified, NABL-accredited |
| **Emergency link** | Yes (red, 1066) | No | No | No |
| **TopBar** | No | No | Yes (utility nav) | No |
| **Outcomes section** | No | No | Yes (OutcomesStrip) | No |
| **Dark sections** | None | None | OutcomesStrip bg only | ALL sections except 2 |
| **rgba in CSS** | Not needed | OmniSearch shadow | ProviderCard shadow | PackageCard glassmorphism |

---

## The Three Defining Constraints

### Constraint 1: Dark-first — invert the mental model

Every prior clinic build defaults to white backgrounds. VitalCheck defaults to dark (`#15171C`). This inverts the colour usage rules:

| Rule in light builds | Rule in dark builds |
|---------------------|---------------------|
| `color: var(--color-text)` for body | `color: var(--color-white)` for body |
| `background: white` default | `background: var(--color-bg)` default |
| Cards have border on white | Cards use glassmorphism on dark |
| Light surface for alternating sections | Light sections are the exceptions |

The light bg (`--color-light-bg: #F2F4F8`) is used for ONLY two sections: `HowItWorks` and `Testimonials`. Everything else — nav, hero, package grid, trust signals, footer — is dark.

**Text colour rule in dark sections:** `var(--color-white)` for headings/body, `var(--color-muted)` for secondary/metadata. Never use `var(--color-text)` (it's not defined). Never use a dark text token in dark sections.

**Text colour rule in light sections:** `var(--color-dark-text)` for all text (which is `#15171C`, same value as `--color-bg` — intentional reuse).

### Constraint 2: Dark text on pink CTAs — the reverse of what you expect

```
#FF316D (pink) background with white text:
L(pink) ≈ 0.246

Contrast: (1 + 0.05) / (0.246 + 0.05) = 1.05 / 0.296 = 3.55:1
— FAILS WCAG AA for normal text (< 18.67px bold or < 24px regular)
— Passes only for large text (≥ 18.67px bold) — CTA button text is typically NOT this large

#15171C (near-black) on #FF316D (pink):
L(dark) ≈ 0.006

Contrast: (0.246 + 0.05) / (0.006 + 0.05) = 0.296 / 0.056 = 5.27:1 ✓ AA
```

Every pink button must use `color: var(--color-dark-text)`. This is the same pattern as Practo's navy-on-cyan — a bright accent that fails with white text.

**Acceptable uses of pink:**
- As text on dark bg (5.27:1 ✓) — prices, eyebrow labels, accent headings
- As background with dark text (5.27:1 ✓) — all CTAs
- As border colour on dark bg — decorative, not text

**Never use pink as:**
- Background with white text (3.55:1 ✗ for normal text)
- Text on white or light-bg backgrounds (1.8:1 ✗)

### Constraint 3: Package-first data model — no doctors

This build sells diagnostic test packages. The core data entity is:

```typescript
interface HealthPackage {
  id: string; name: string; category: ServiceCategory
  originalPrice: number; discountedPrice: number; discountPercent: number
  testsIncluded: number; turnaroundHours: number
  popular: boolean; homeCollection: boolean; keyTests: string[]
}
```

There is NO `Doctor` / `Provider` type. There is NO `specialty` / `consultMode` / `appointmentTypes` / `videoConsult` field. If you find yourself writing any of those — stop. This is a diagnostic marketplace, not a doctor booking platform.

The filter is a single dimension: `ServiceCategory | 'all'` via `CategoryTabs`. The component renders a horizontal pill tab row; selecting a tab filters the `PackageGrid`. This is NOT:
- A `useMemo` with three simultaneous criteria (Cleveland pattern)
- A dropdown select (Apollo pattern)
- A text search input (Practo/Cleveland pattern)

It is a single-state tab filter: `setActive(category)`.

---

## Stop-and-Ask List

| If you're about to... | Stop because... |
|-----------------------|-----------------|
| Create a `Doctor` or `Provider` interface | Constraint 3 — this build has `HealthPackage` only |
| Add a specialty `<select>` | Constraint 3 — no specialty filter in this build |
| Add a text search input | Constraint 3 — single-dimension category tab only |
| Use `consultMode` or `videoConsult` | Wrong build — Practo or Apollo pattern |
| Set button `.primary { color: var(--color-white) }` | Constraint 2 — white on pink fails WCAG |
| Set `color: var(--color-text)` anywhere | Constraint 1 — `--color-text` is not a defined token in this build |
| Write white background for nav or hero | Constraint 1 — this is a dark-first build |
| Use `rgba()` in any file other than PackageCard.module.css | Glassmorphism exception is PackageCard only |
| Use `<span style="text-decoration: line-through">` | Use `<del>` tag — it has semantic meaning for SR users |
| Display prices without `toLocaleString('en-IN')` | Indian number format required (₹1,999 not ₹1999) |
| Add NABH/JCI/US News badges | Different trust framework — use WHO-certified, NABL-accredited |
| Add emergency link in nav | Not applicable — diagnostic marketplace |
| Use Lato, Roboto, or Nunito Sans | This build uses Inter (400+600+700) |
| Add OutcomesStrip section | Cleveland Clinic pattern — not in this build |
| Add TopBar | Cleveland Clinic pattern — not in this build |

---

## File Manifest

```
bw_clinic_04.md                         ← 8 platform prompt versions
bw_clinic_platform_04_scaffold/
  00_Orchestrator.md                    ← this file
  01_PRD.md                             ← personas, functional requirements
  02_Architecture.md                    ← types, mock data, component map
  03_Design.md                          ← CSS tokens, glassmorphism spec, anti-patterns
  04_Plan.md                            ← 4-day build plan with gate checks
  05_Epics_and_Stories.md               ← 8 epics, 38 stories
  06_Tasks.md                           ← TASK-001–018 with code snippets
  07_Guide.md                           ← constraint deep-dives, contrast math, 60-item checklist
```
