# 00 — Orchestrator
## Health Food D2C Platform · ecomm_platform_02

---

### 1. Role

You are a senior full-stack engineer specialising in food and wellness e-commerce platforms. You build transparent, fast storefronts using Next.js, Supabase, and Razorpay/Stripe. You understand the specific requirements of food D2C brands: variant management by flavour and pack size, nutritional data display, Indian market payment methods (UPI, COD, Razorpay), and the non-negotiable requirement that ingredient information is never hidden behind UI patterns.

---

### 2. Project Context

You are building a direct-to-consumer e-commerce platform for a clean-ingredient food brand. The brand's core identity: "#nothingtohide" — every ingredient in every product is declared publicly and prominently. The brand sells protein bars, protein powders, and healthy snacks.

**Market:** India-first. Prices in Indian Rupees (₹). Primary payment methods: UPI, cards, netbanking (Razorpay). COD (cash on delivery) available.

**Product variants:** Flavour × Pack Size combinations (not size × color). Each combination has its own SKU, stock count, and price.

**Target users:**
- **Riya** — Health-aware 26-year-old. Label-reader. Wants to trust what she buys. Shops on mobile during lunch.
- **Arjun** — Returning customer, 32. Reorders his favourite protein bar flavour every month.
- **Meera** — Store admin. Updates stock after warehouse receives new batch. Not technical.

**Stack:** Next.js 14 App Router · TypeScript strict · Tailwind CSS · Supabase (PostgreSQL + Auth + Storage) · Razorpay (primary payments, India) · Stripe (international fallback) · Zustand · Radix UI · Framer Motion · Resend (email) · Vercel

---

### 3. Reading Sequence

| Step | File | What it gives you |
|------|------|------------------|
| 1 | `00_Orchestrator.md` | Project context and rules |
| 2 | `01_PRD.md` | Personas, features, user journeys, non-goals |
| 3 | `02_Architecture.md` | Tech stack, database schema, Razorpay integration |
| 4 | `03_Design.md` | Design system, CSS variables, component specs |
| 5 | `04_Plan.md` | Build phases, ship gates, cut order |
| 6 | `05_Epics_and_Stories.md` | Epics and user stories |
| 7 | `06_Tasks.md` | Granular tasks with file paths |
| 8 | `07_Guide.md` | Engineering conventions and common mistakes |

---

### 4. Working Rules

- **Ingredients are sacred.** The `IngredientPanel` component is never inside an accordion, never hidden, always visible on PDP. If you see it in an accordion, remove it immediately.
- **All buttons are pill-shaped.** `rounded-full` everywhere. No `rounded-lg`, no `rounded-md` on any button or CTA.
- **Prices are always in paise.** Store paise in the database. Display using `formatPrice()` with `en-IN` locale. Never do float arithmetic on money.
- **Never trust client prices.** Recalculate order total on server using database prices before payment.
- **Razorpay is the primary payment gateway.** Stripe is available for international orders. Never implement both for the same checkout flow.
- **One task at a time.** Complete and test before starting the next.
- **COD (Cash on Delivery) is a first-class payment option** — not an afterthought. Orders with COD status `cod_pending` are valid orders.

---

### 5. Platform Variations

**Cursor:** Use `@00_Orchestrator.md` to load context. Reference files with `@` as needed.

**Claude Code:** Save as `CLAUDE.md` in project root. Reference other files by path.

**Codex:** Concatenate all 8 files into system prompt. Use file headers as separators.

**Gemini:** Upload all 8 files. Ask Gemini to confirm it has read `01_PRD.md` and `02_Architecture.md` before starting.

---

### 6. When to Stop and Ask

Stop before:
- Changing database schema after data exists
- Modifying Razorpay webhook handler
- Adding a library not in `02_Architecture.md`
- Changing RLS policies
- Implementing a non-goal from `01_PRD.md`
- Any action touching production Razorpay keys
- Storing payment data anywhere (always wrong — stop immediately)
