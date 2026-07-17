# 02 — Architecture
## Artisan Empowerment Marketplace · mulecom_platform_04

---

### 1. Architecture Decision

Monolith on Next.js + Supabase with explicit checkout branching for prepaid and COD. V1 optimizes correctness and traceability for delivery, returns, and support states.

---

### 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Pages Router | route/API colocation |
| Language | TypeScript strict | JavaScript | safer state transitions |
| Styling | Tailwind + CSS vars | CSS-in-JS | consistency and speed |
| Data/Auth | Supabase | custom auth stack | bundled DB/auth/RLS |
| Search | facet-capable abstraction | static-only filters | scalable discovery |
| Payments | Stripe + COD orchestration | single-mode checkout | regional flexibility |
| State | Zustand | heavyweight stores | focused UI/cart state |

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

All monetary values stored in integer minor units.

---

### 5. Payment, COD, and Refund Flow

1. client cart -> quote endpoint
2. quote validates stock/price/shipping constraints
3. branch:
   - prepaid -> payment intent/session
   - COD -> order reservation with COD state
4. webhook finalizes prepaid order states
5. return resolution chooses source refund/store credit by policy

---

### 6. Security and RLS

- buyer access restricted to own orders/returns/tickets
- seller/admin access checks on operations routes
- webhook signature + idempotency required
- return/support transitions enforced server-side

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

- ADR-001: monolith for V1 operational reliability
- ADR-002: quote endpoint as pricing source of truth
- ADR-003: payment branch logic server-side only
- ADR-004: return/support transitions stored as auditable events
