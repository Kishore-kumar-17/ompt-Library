# 07 — Guide
## Engineering Standards · dpecom_platform_02

### 1. SaaS Polish Checklist
- **Shadows:** Does the element use a multi-layered soft shadow? (No hard edges).
- **Rounding:** Are all corners `rounded-xl` or `rounded-2xl`?
- **Spacing:** Is there enough whitespace between sections (min 64px)?
- **Feedback:** Does every button have a subtle `translate-y-[-1px]` hover state?

### 2. Coding Conventions
- **UI:** Strictly use Shadcn/UI primitives to maintain a professional standard.
- **Charts:** Use `recharts` for all financial data to ensure accessibility and responsiveness.
- **Safety:** All financial calculations (MRR, Taxes) must be handled in cents (integers) to avoid floating-point errors.
- **Icons:** Use Lucide icons with a `stroke-width` of 1.5 or 2 for a clean look.

### 3. File Structure
```
src/
  app/          # Routes (Next.js App Router)
  components/   # UI Library
    dashboard/  # Stats, Charts, Sidebar
    marketing/  # Hero, Feature Grids
    checkout/   # Multi-step Modal, Invoice UI
    ui/         # Shadcn Primitives
  lib/          # Financial Utils, Supabase, Stripe
  hooks/        # useMRRData, useLicenseStatus
```

### 4. Definition of Done
- Passes Lighthouse "Accessibility" and "Best Practices" with 100/100.
- All financial charts are responsive and show tooltips.
- Checkout modal closes on backdrop click and Esc key.
- Payout logic is verified via Stripe Test Mode.
