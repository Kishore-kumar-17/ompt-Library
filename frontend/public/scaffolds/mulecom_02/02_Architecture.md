# 02 — Architecture
## Curated Artisan Marketplace · mulecom_platform_02

---

### 1. Architecture Decision

Monolith on Next.js + Supabase with Stripe + COD branching. V1 prioritizes correctness for delivery, returns, and support over distributed complexity.

---

### 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Pages Router | route/API colocation |
| Language | TypeScript strict | JavaScript | safer transactional logic |
| Styling | Tailwind + CSS vars | CSS-in-JS | consistency and speed |
| Data/Auth | Supabase | custom auth | bundled DB/auth/RLS |
| Search | facet-capable abstraction | static client filtering | scalable discovery |
| Payments | Stripe + COD orchestration | single-mode-only checkout | regional commerce flexibility |
| State | Zustand | heavy global stores | focused UI state |

---

### 3. Folder Structure

```text
src/
├── app/
│   ├── search/page.tsx
│   ├── listing/[slug]/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── account/orders/page.tsx
│   ├── account/returns/page.tsx
│   ├── support/page.tsx
│   ├── seller/dashboard/page.tsx
│   ├── api/quote/route.ts
│   ├── api/returns/*
│   ├── api/support/*
│   └── api/webhooks/stripe/route.ts
├── components/
│   ├── marketplace/*
│   ├── listing/*
│   ├── checkout/*
│   ├── support/*
│   └── seller/*
├── store/cart.ts
├── lib/*
└── types/index.ts
```

---

### 4. Database Schema (High Level)

- users
- listings
- listing_variants
- listing_images
- orders
- order_items
- payments
- returns
- exchanges
- support_tickets
- support_events
- payout_ledger

---

### 5. Payment, COD, and Refund Flow

1. client cart -> `quote` endpoint
2. quote validates variants, delivery constraints, totals
3. checkout branch:
   - prepaid -> payment intent/session
   - COD -> order reservation with COD status
4. webhook (prepaid) -> payment success -> order finalization
5. return resolution -> refund to source or store credit based on policy and payment mode

---

### 6. Security and RLS

- buyers access only own orders/returns/tickets
- seller/admin role checks on ops routes
- webhook verification and idempotency mandatory
- support state transitions controlled server-side

---

### 7. Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_DEFAULT_CURRENCY=INR
```

---

### 8. Architecture Decision Records

- ADR-001: Monolith for V1 operational clarity
- ADR-002: Quote endpoint as sole pricing source
- ADR-003: COD/prepaid branching encoded in backend policy engine
- ADR-004: Return/support workflows event-sourced for traceability
