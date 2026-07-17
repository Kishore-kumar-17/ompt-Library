# 02 — Architecture
## Indian Craft Marketplace · mulecom_platform_03

---

### 1. Architecture Decision

Monolith on Next.js + Supabase with explicit checkout branch logic for prepaid and COD. V1 prioritizes correctness in policy-driven outcomes over infrastructure complexity.

---

### 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Pages Router | route/API colocation |
| Language | TypeScript strict | JavaScript | safer state transitions |
| Styling | Tailwind + CSS vars | CSS-in-JS | consistency and speed |
| Data/Auth | Supabase | custom auth stack | bundled DB/auth/RLS |
| Search | facet abstraction | static-only filters | scalable discovery |
| Payments | Stripe + COD orchestration | single-mode-only checkout | regional commerce fit |
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

All money fields in integer minor units.

---

### 5. Payment, COD, and Refund Flow

1. client cart -> `quote`
2. quote validates variants, stock, pricing, shipping constraints
3. branch:
   - prepaid -> payment session/intents
   - COD -> order reservation with COD flags
4. webhook finalizes prepaid orders
5. return resolution maps to source refund or store-credit policy behavior

---

### 6. Security and RLS

- buyer access limited to own orders/returns/tickets
- seller/admin role checks for ops routes
- webhook signature verification and idempotency required
- support and return transitions enforced server-side

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
- ADR-002: quote endpoint is pricing source of truth
- ADR-003: payment mode branching encoded server-side
- ADR-004: return/support events are auditable timeline records
