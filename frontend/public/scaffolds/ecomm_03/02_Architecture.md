# 02 — Architecture
## Functional Beverage D2C Platform · ecomm_platform_03

---

### 1. Architecture Decision

Monolith on Next.js + Supabase + Stripe. No microservices in V1. At this scale, a single deployment unit is simpler to ship, easier to debug, and safer for checkout-critical changes.

---

### 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Remix | RSC + integrated routing/API |
| Language | TypeScript strict | JS | Commerce safety and model correctness |
| Styling | Tailwind + CSS vars | CSS-in-JS | token discipline and speed |
| Database/Auth | Supabase | Custom auth stack | bundled DB/auth/storage/RLS |
| Payments | Stripe | Multiple gateways in same flow | reduce checkout complexity |
| State | Zustand | Redux | lightweight cart and UI state |

---

### 3. Folder Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── collections/all/page.tsx
│   ├── products/[slug]/page.tsx
│   ├── checkout/page.tsx
│   ├── checkout/success/page.tsx
│   ├── account/subscriptions/page.tsx
│   ├── api/cart/quote/route.ts
│   ├── api/checkout/session/route.ts
│   └── api/webhooks/stripe/route.ts
├── components/
│   ├── layout/
│   ├── product/
│   ├── cart/
│   └── checkout/
├── store/cart.ts
├── lib/
│   ├── supabase/
│   ├── stripe.ts
│   └── utils.ts
└── types/index.ts
```

---

### 4. Database Schema (High Level)

- `products`
- `flavors`
- `pack_sizes`
- `sku_variants` (`flavor_id × pack_size_id`)
- `nutrition_profiles` (includes `ingredients_text`)
- `orders`
- `order_items`
- `subscriptions`

Money fields are integer cents only.

---

### 5. Stripe Integration

Flow:
1. Client sends cart payload
2. Server validates SKU + price via DB quote
3. Server creates checkout session
4. Stripe webhook confirms success/update/cancel
5. Server updates orders/subscriptions idempotently

Never trust client totals.

---

### 6. Security and RLS

- RLS on customer-owned rows
- Admin role for management routes
- Webhook signature verification required
- Service role only in server webhook context

---

### 7. Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD_CENTS=5000
NEXT_PUBLIC_SITE_URL=
```

---

### 8. Architecture Decision Records

- ADR-001: Supabase chosen for DB + Auth + RLS speed
- ADR-002: Server quote endpoint is pricing authority
- ADR-003: Checkout/session and webhook are mandatory idempotent path
- ADR-004: Single payment provider in V1 path for reliability
