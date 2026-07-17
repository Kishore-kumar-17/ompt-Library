# 05 — Epics & Stories
## Work Breakdown · dpecom_platform_02
### Squeezed SaaS Storefront · Merchant of Record + Stripe Connect

---

## Epic 1: Merchant of Record Engine

### Story 1.1 — Automatic Tax Calculation
**As a** SaaS founder,
**I want** the platform to automatically calculate VAT/GST for every buyer based on their location,
**so that** I never deal with global tax compliance manually.

**Acceptance criteria:**
- [ ] `POST /api/checkout` detects buyer country from IP (MaxMind or Cloudflare `CF-IPCountry` header)
- [ ] Tax rate looked up from `tax_rates` table keyed by ISO country code; stored as integer basis points (e.g., `2000` = 20%)
- [ ] TypeScript: `TaxRate = { country: string; rate_bps: number; label: string }` — `rate_bps = 0` for non-taxable regions
- [ ] `calculateTax(amountCents: number, rateBps: number): number` — returns `Math.round(amountCents * rateBps / 10000)`
- [ ] Checkout UI shows tax line: "VAT (20%) — $X.XX" above the total; updates when buyer changes billing country manually
- [ ] Tax amount passed to Stripe PaymentIntent as `metadata.tax_cents`; stored on `orders.tax_cents` after webhook confirms

### Story 1.2 — PDF Tax Invoice Generation
**As a** business buyer,
**I want** to receive a professional, tax-compliant PDF invoice immediately after purchase,
**so that** I can submit it to my accounting department without manual requests.

**Acceptance criteria:**
- [ ] Invoice generated server-side post-webhook; PDF created via `@react-pdf/renderer` or `puppeteer`
- [ ] Invoice includes: invoice number (sequential), issue date, buyer name/address, seller name/VAT number, line items, tax breakdown, total
- [ ] Invoice stored in Supabase Storage at `invoices/{orderId}.pdf`; attached to the fulfillment email via Resend
- [ ] `/api/invoices/[orderId]` returns a 60-minute signed download URL; only the purchasing user can access
- [ ] TypeScript: `Invoice = { invoiceNumber: string; issuedAt: Date; buyerDetails: BuyerDetails; lineItems: LineItem[]; taxCents: number; totalCents: number }`
- [ ] Invoice PDF renders correctly in both Chrome PDF viewer and Acrobat Reader (tested with a reference fixture)

### Story 1.3 — Stripe Connect Payout Logic
**As a** creator,
**I want** the platform to automatically route my earnings after taxes and fees,
**so that** I receive accurate payouts without manual calculation.

**Acceptance criteria:**
- [ ] MoR flow: buyer pays gross amount → platform Stripe account collects → tax retained → platform fee deducted → remainder transferred via Stripe Connect `destination` charge
- [ ] `calculatePayout(grossCents: number, taxCents: number, feePercent: number): number` — e.g., `calculatePayout(10000, 2000, 5)` → `7600`
- [ ] `feePercent` sourced from `platform_settings.fee_percent`; never hardcoded
- [ ] TypeScript: `PayoutBreakdown = { gross: number; tax: number; platformFee: number; net: number }`
- [ ] Creator dashboard "Earnings" card shows: Gross, Tax Retained, Platform Fee, Net Payout — four distinct line items
- [ ] Stripe Connect account linked: `profiles.stripe_account_id`; payout fails gracefully with "Stripe account not connected" if null

---

## Epic 2: Revenue Insights Dashboard

### Story 2.1 — MRR Chart (Recharts)
**As a** SaaS founder,
**I want** to see my MRR with a 30-day trend line,
**so that** I can track growth at a glance.

**Acceptance criteria:**
- [ ] MRR chart uses Recharts `<LineChart>` with `<Line type="monotone">` and `<Tooltip>`
- [ ] Data sourced from `daily_metrics` table: `SELECT date, mrr FROM daily_metrics WHERE creator_id = $1 ORDER BY date DESC LIMIT 30`
- [ ] Y-axis formatted as currency: `(value) => '$' + (value / 100).toFixed(0)`; no raw cent values shown
- [ ] Chart wrapper: `width="100%"`, `height={200}`; uses `<ResponsiveContainer>` — no fixed pixel width
- [ ] "MRR" KPI card above chart: current month MRR, delta vs prior month as `+X%` or `-X%` with green/red colour
- [ ] TypeScript: `MetricPoint = { date: string; mrr: number; netRevenue: number; churnCount: number }`

### Story 2.2 — Churn and Failed Payment Alerts
**As a** founder,
**I want** to see my churn rate and be alerted to failed payments,
**so that** I can act on at-risk subscribers before they leave.

**Acceptance criteria:**
- [ ] Churn rate: `churnCount / activeSubscriberCount * 100`; rendered as percentage with one decimal place
- [ ] Failed payments sourced from Stripe webhook `invoice.payment_failed`; stored in `payment_events` table with `type = 'failed'`
- [ ] Alert banner appears when `failedCount > 0`: "X payment(s) failed this month — Review" linking to `/dashboard/payments`
- [ ] Alert banner: `background: #FEF9C3; border: 1px solid #CA8A04; color: #78350F` — amber warning, not red (not fatal)
- [ ] `/dashboard/payments` lists failed subscriptions with buyer email, amount, and "Retry" CTA
- [ ] TypeScript: `PaymentEvent = { id: string; subscriptionId: string; type: 'succeeded' | 'failed'; amountCents: number; createdAt: Date }`

### Story 2.3 — Financial Report Export
**As a** founder,
**I want** to export my financial data as CSV,
**so that** I can share it with my accountant.

**Acceptance criteria:**
- [ ] Export button on `/dashboard/analytics`; calls `GET /api/export/financial?from=YYYY-MM-DD&to=YYYY-MM-DD`
- [ ] Server streams CSV response with header `Content-Disposition: attachment; filename="report-{from}-{to}.csv"`
- [ ] CSV columns: `date, gross_revenue, tax_collected, platform_fees, net_revenue, new_subscribers, churned_subscribers`
- [ ] Date range selector: "Last 30 days" / "Last 90 days" / "Custom"; custom range uses two `<input type="date">` fields
- [ ] Export limited to 366 days maximum per request; longer range returns 400 `{ error: 'RANGE_TOO_LARGE' }`
- [ ] Empty range (no data) returns a valid CSV with headers only — not a 404

---

## Epic 3: Software Selling Tools

### Story 3.1 — License Key Generation
**As a** developer-seller,
**I want** a unique license key automatically generated for each purchase,
**so that** my software can validate buyers without manual issuance.

**Acceptance criteria:**
- [ ] Webhook `checkout.session.completed` triggers `/api/webhooks/stripe`; calls `generateLicenseKey(orderId)` for software products
- [ ] `generateLicenseKey`: `crypto.randomUUID()` formatted as `XXXX-XXXX-XXXX-XXXX` (four 4-char uppercase hex groups)
- [ ] Key stored in `license_keys` table: `{ id, order_id, product_id, key, status: 'active' | 'revoked', activations_used, activations_max }`
- [ ] Validation endpoint `POST /api/licenses/validate` accepts `{ key, productId }`; returns `{ valid: boolean; activationsRemaining: number }`
- [ ] Key displayed on confirmation page and included in fulfillment email; one-click copy button with `navigator.clipboard.writeText(key)`
- [ ] TypeScript: `LicenseKey = { key: string; status: 'active' | 'revoked'; activationsUsed: number; activationsMax: number }`

### Story 3.2 — Customer Portal
**As a** buyer,
**I want** a self-service portal to manage my license keys and billing,
**so that** I don't need to contact support for routine changes.

**Acceptance criteria:**
- [ ] Portal accessible at `/portal`; requires auth; lists all purchases for authenticated email
- [ ] Each software purchase shows: product name, license key (masked `XXXX-****-****-XXXX`), reveal button, activation count
- [ ] "Reveal" button calls `GET /api/licenses/[orderId]`; rate-limited to 10 reveals/hour per user
- [ ] Subscription management: "Cancel Subscription" calls Stripe `subscriptions.cancel({ prorate: false })` — confirmed with modal
- [ ] Billing history: last 12 invoices with status badge (`Paid` / `Refunded`) and PDF download link
- [ ] Shadcn `<Table>` component used for purchase history; `<Dialog>` for cancel confirmation — no custom modal

### Story 3.3 — Tiered Pricing (Seat-Based)
**As a** developer-seller,
**I want** to offer tiered pricing (e.g., 5 seats vs 50 seats),
**so that** teams can purchase the right quantity for their size.

**Acceptance criteria:**
- [ ] `plans` table: `{ id, product_id, name, interval, price, seat_count }` — `seat_count` nullable; null = unlimited
- [ ] Checkout renders plan picker when `product.plans.length > 1`; shows name, price/month, seat count, feature diff
- [ ] Selected plan's `stripe_price_id` passed to `stripe.checkout.sessions.create()`; no custom amount override
- [ ] Tier cards: 12px border-radius, subtle box-shadow; "Most Popular" badge on recommended tier
- [ ] TypeScript: `Plan = { id: string; name: string; priceCents: number; interval: 'month' | 'year'; seatCount: number | null }`
- [ ] `seatCount: null` renders as "Unlimited seats" — never renders as "null seats"

---

## Epic 4: Conversion Optimisation

### Story 4.1 — Native Checkout Modal (Shadcn)
**As a** buyer,
**I want** a polished, mobile-responsive checkout modal,
**so that** the purchase process feels professional and trustworthy.

**Acceptance criteria:**
- [ ] Checkout uses Shadcn `<Dialog>` with `modal={true}`; not a custom overlay component
- [ ] Mobile: modal is full-screen at `≤768px` (`max-w-screen sm:max-w-lg`); desktop: centred, `max-w-lg`
- [ ] Modal header: "Secure Checkout" label + padlock SVG icon + "Merchant of Record" badge
- [ ] All inputs: `border-radius: 12px`; `box-shadow: 0 1px 3px rgba(0,0,0,0.1)`; focus ring `ring-2 ring-primary`
- [ ] "Pay" button disabled while Stripe is processing; shows `<Loader2 className="animate-spin" />` icon during load
- [ ] `grep -r "border-radius: 0" src/components/CheckoutModal` → zero results (SaaS modal uses rounded corners)

### Story 4.2 — Local Payment Methods
**As a** buyer,
**I want** to pay via UPI, iDEAL, or other local methods,
**so that** I can use the payment method that's most familiar to me.

**Acceptance criteria:**
- [ ] Stripe Payment Element used (not individual element per method); local methods auto-shown by Stripe based on buyer country
- [ ] `payment_method_types` not hardcoded; `automatic_payment_methods: { enabled: true }` set on PaymentIntent
- [ ] UPI option appears for Indian buyer IPs (verified by `CF-IPCountry: IN` header in test environment)
- [ ] Each payment method rendered by Stripe's own UI — no custom logos or method buttons in application code
- [ ] Successful payment for each method creates identical `orders` row; no method-specific branching in webhook handler
- [ ] TypeScript: `CheckoutPayload = { productId: string; planId: string; amount: number; buyerCountry: string }`

### Story 4.3 — Abandonment Recovery
**As a** creator,
**I want** to capture buyer email before payment so I can recover abandoned checkouts,
**so that** I recover sales from buyers who leave mid-checkout.

**Acceptance criteria:**
- [ ] Email input is the first field in the checkout modal; blur event calls `POST /api/checkout/intent` to save email + product to `checkout_intents` table
- [ ] `checkout_intents`: `{ id, email, product_id, created_at, converted_at }`; `converted_at` set by webhook on success
- [ ] Abandonment cron (runs hourly): selects `checkout_intents WHERE converted_at IS NULL AND created_at < now() - interval '1 hour'`
- [ ] Recovery email sent via Resend: subject "You left something behind", includes product name and direct checkout link
- [ ] Recovery email only sent once per intent; `recovery_sent_at` column prevents duplicate sends
- [ ] TypeScript: `CheckoutIntent = { id: string; email: string; productId: string; createdAt: Date; convertedAt: Date | null; recoverySentAt: Date | null }`
