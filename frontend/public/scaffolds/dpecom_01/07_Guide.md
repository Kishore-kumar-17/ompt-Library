# 07 — Guide
## Engineering Standards · dpecom_platform_01

### 1. Neo-Brutalist Checklist (The "Raw" Bar)
- **Borders:** Is every section separated by a `border-black`? (No white-on-white allowed).
- **Shadows:** Are shadows hard and offset? (No `blur-` or `shadow-xl`).
- **Corners:** Is every `rounded-` class removed? (Strictly `rounded-none`).
- **Typography:** Are headlines `font-black` or `font-extrabold`?

### 2. Coding Conventions
- **Components:** Use Functional Components with Server/Client boundary awareness.
- **Naming:** CamelCase for files, kebab-case for CSS classes.
- **Types:** Every Supabase response must be typed. No `any`.
- **Styling:** Tailwind-first. Use custom `neo-` utilities for repeated shadow patterns.

### 3. File Structure
```
src/
  app/          # Routes (Next.js App Router)
  components/   # UI Library
    shared/     # Nav, Footer, Neo-Box
    creator/    # Dashboard, Product Forms
    buyer/      # Checkout Overlay, Product Cards
  lib/          # Supabase, Stripe, Utils
  store/        # Zustand State
```

### 4. Definition of Done
- Passes strict TypeScript check.
- Component passes the "Neo-Brutalist Checklist".
- Mobile responsive (1-column stack).
- Keyboard accessible (Visible focus rings in Yellow).
