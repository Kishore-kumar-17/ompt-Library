# 07 — Engineering Guide
## Health Food D2C Platform · ecomm_platform_02

---

### 1. Golden Rules

1. **IngredientPanel is never inside an accordion.** If you put it in one, remove it immediately. Always visible, always open. This is a brand constraint, not a UX opinion.
2. **All buttons are pill-shaped.** `rounded-full` everywhere. No exceptions.
3. **Prices are in paise.** Store paise in DB. Display with `formatPrice()`. Never do float arithmetic on money values.
4. **Phone is the primary identifier in India.** Shipping addresses must include a phone number. COD delivery requires call confirmation — phone number is mandatory.
5. **Cart key = productId + flavour + packSize.** Same product in different flavour = separate line item. Same product in different pack size = separate line item.
6. **Never trust client-submitted prices.** Recalculate from DB before creating Razorpay order.
7. **COD is a first-class payment option.** Never treat it as a fallback or deprioritise its UX.

---

### 2. Folder Structure

```
src/
├── app/                  # Routes (Next.js App Router)
├── components/
│   ├── layout/           # AnnouncementBar, Navbar, Footer
│   ├── cart/             # CartDrawer, CartItem, DeliveryProgress
│   ├── product/          # Cards, Gallery, Selectors, IngredientPanel
│   ├── checkout/         # AddressForm, OrderSummary, RazorpayButton, CODButton
│   ├── account/          # Sidebar, OrderList
│   ├── admin/            # Forms, managers, tables
│   └── ui/               # Button, Input, Badge, Toast
├── store/cart.ts
├── lib/
│   ├── supabase/         # client.ts, server.ts, admin.ts
│   ├── razorpay.ts
│   ├── resend.ts
│   ├── utils.ts          # formatPrice, cn, slugify
│   └── motion.ts
├── emails/               # React Email templates
├── types/index.ts
└── middleware.ts
```

---

### 3. TypeScript Conventions

```typescript
// All price fields in paise — type alias for clarity
type Paise = number

interface PackSize {
  id: string
  label: string
  priceInPaise: Paise    // never 'price: number' — be explicit
  sku: string
  stockCount: number
}

// Discriminated union for payment method
type PaymentMethod = 'razorpay' | 'cod' | 'stripe'

// Order status
type OrderStatus =
  | 'pending'
  | 'cod_pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'return_requested'
  | 'returned'

// Cart key
function cartKey(productId: string, flavour: string, packSize: string): string {
  return `${productId}:${flavour}:${packSize}`
}
```

---

### 4. Money Conventions

```typescript
// lib/utils.ts
export function formatPrice(paise: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(paise / 100)
}
// formatPrice(15000) → "₹150"
// formatPrice(84000) → "₹840"

// GST calculation
function calculateGST(subtotalPaise: number, gstRate: number): number {
  // GST is inclusive in displayed price — extract it
  // If price is ₹150 including 18% GST:
  // GST amount = 150 * 18 / 118 = ₹22.88
  return Math.round((subtotalPaise * gstRate) / (100 + gstRate))
}

// Shipping
const FREE_DELIVERY_THRESHOLD = parseInt(process.env.NEXT_PUBLIC_FREE_DELIVERY_THRESHOLD || '49900')
const shippingPaise = subtotalPaise >= FREE_DELIVERY_THRESHOLD ? 0 : 5900  // ₹59

// NEVER:
const price = packSize.priceInPaise / 100  // float arithmetic
const total = items.reduce((s, i) => s + i.price * i.qty / 100, 0)  // float chain

// ALWAYS:
const totalPaise = items.reduce((s, i) => s + i.priceInPaise * i.quantity, 0)
const displayTotal = formatPrice(totalPaise)
```

---

### 5. React + Next.js Conventions

```typescript
// Server Component = default (no 'use client')
// Fetch data directly in server components
async function ProductPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()  // server client from @/lib/supabase/server
  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      product_flavours (id, name, color_hex, position),
      pack_sizes (id, label, quantity_count, price_in_paise, sku),
      product_images (id, url, flavour_id, position, is_primary, alt),
      nutrition_facts (serving_size, entries)
    `)
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single()
  if (!product) notFound()
  return <ProductDetail product={product} />
}

// Client Component — only when needed
'use client'
function FlavourSelector({ flavours, selected, onChange }: FlavourSelectorProps) {
  // interaction, state, events — valid client component
}

// Never fetch initial page data in useEffect on client
// Pass data as props from Server Component to Client Component
```

---

### 6. Styling Conventions

```typescript
// Always CSS variables for brand colors — never Tailwind color utilities
// Bad:
className="bg-purple-600 text-gray-700"
// Good:
className="bg-[var(--cta)] text-[var(--text-secondary)]"

// Buttons — always rounded-full
// Bad:
className="rounded-lg bg-[var(--cta)] ..."
// Good:
className="rounded-full bg-[var(--cta)] h-12 px-7 text-sm font-semibold text-white"

// Product images — always square, never rounded
// Bad:
className="aspect-square rounded-xl object-cover"
// Good:
className="aspect-square object-cover"  // no rounding on image

// Section backgrounds alternate correctly:
// white → var(--bg-lavender) → var(--bg-warm) → white → var(--bg-warm)
// Never two warm sections adjacent, never two lavender sections adjacent

// Font display class
className="font-display text-4xl font-bold"  // applies Space Grotesk
// Body — no special class needed (DM Sans is default on body)
```

---

### 7. Razorpay Conventions

```typescript
// lib/razorpay.ts
import Razorpay from 'razorpay'
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// Create order — server only
const order = await razorpay.orders.create({
  amount: totalPaise,    // in paise
  currency: 'INR',
  receipt: `order_${Date.now()}`,
})

// Client: open Razorpay checkout
const rzp = new window.Razorpay({
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  order_id: razorpayOrderId,
  amount: totalPaise,
  currency: 'INR',
  name: 'Brand Name',
  description: 'Order',
  handler: function (response) {
    // Redirect to success page — do NOT create order here
    // Webhook handles order creation
    router.push(`/checkout/success?razorpay_order_id=${razorpayOrderId}`)
  },
  prefill: { contact: customerPhone, email: customerEmail },
  theme: { color: '#5048D5' },  // brand purple
})
rzp.open()

// Webhook signature verification
const expectedSignature = crypto
  .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
  .update(rawBody)
  .digest('hex')
if (signature !== expectedSignature) return 400

// NEVER:
console.log('Razorpay key_secret:', process.env.RAZORPAY_KEY_SECRET)
console.log('Payment response:', JSON.stringify(response))  // may contain sensitive data
```

---

### 8. Supabase Conventions

```typescript
// Three clients — never mix
// Browser (client components, mutations):
import { createClient } from '@/lib/supabase/client'

// Server (server components, server actions):
import { createClient } from '@/lib/supabase/server'

// Admin (webhook handlers only — bypasses RLS):
import { createAdminClient } from '@/lib/supabase/admin'

// Always specify columns — never select('*') in queries that return many rows
const { data: products } = await supabase
  .from('products')
  .select('id, name, slug, badge, product_flavours(name, color_hex), pack_sizes(price_in_paise)')
  .eq('is_published', true)

// Flavour sort — use position field, not alphabetical
.order('position', { referencedTable: 'product_flavours', ascending: true })

// Inventory check — always check before adding to cart or processing order
const { data: stock } = await supabase
  .from('inventory')
  .select('stock_count')
  .eq('flavour_id', flavourId)
  .eq('pack_size_id', packSizeId)
  .single()
if (!stock || stock.stock_count === 0) {
  return { error: 'Out of stock' }
}
```

---

### 9. Cart Store Conventions

```typescript
// store/cart.ts
// Cart item key: productId:flavour:packSize
// Zustand with persist middleware

// Adding item:
addItem({
  productId: product.id,
  name: product.name,
  flavour: selectedFlavour,
  packSize: selectedPackSize.label,
  priceInPaise: selectedPackSize.price_in_paise,
  quantity: 1,
  image: primaryImageForFlavour.url,
})

// Uniqueness: same product + SAME flavour + SAME pack size = increment qty
// Same product + DIFFERENT flavour = separate line item
// Same product + DIFFERENT pack size = separate line item

// Subtotal derived:
get subtotalInPaise() {
  return get().items.reduce((sum, item) => sum + item.priceInPaise * item.quantity, 0)
}

// Free delivery check:
get isEligibleForFreeDelivery() {
  return get().subtotalInPaise >= parseInt(process.env.NEXT_PUBLIC_FREE_DELIVERY_THRESHOLD || '49900')
}
```

---

### 10. Indian Market Specifics

```typescript
// Phone number validation (Indian)
function isValidIndianPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s|-/g, ''))
}

// Pincode validation
function isValidPincode(pincode: string): boolean {
  return /^\d{6}$/.test(pincode)
}

// Address format (display):
// Full Name
// Line 1, Line 2 (if present)
// City, State - Pincode

// SMS via MSG91 (India)
// Templates must be pre-approved by TRAI (telecom regulator)
// OTP template: "Your OTP is {#var#}. Valid for 5 minutes. - BrandName"
// Order confirmation: pre-approved template required

// GST display at checkout:
// "Subtotal: ₹850"
// "GST (18%): ₹130"  ← extracted from price, not added on top
// "Shipping: Free"
// "Total: ₹850"
// Note: GST is inclusive in displayed prices — do not add it on top

// COD note: always mention "Our team may call to confirm your order"
```

---

### 11. Common Mistakes and Fixes

| Mistake | Correct approach |
|---------|-----------------|
| `IngredientPanel` inside Radix Accordion | Standalone component, always rendered |
| `rounded-lg` on CTA buttons | Always `rounded-full` |
| `bg-purple-600` for brand color | `bg-[var(--cta)]` |
| Star ratings in testimonials | Quotes only — no `<StarRating />` component |
| Gym imagery or "gains" language | Everyday food messaging, no fitness clichés |
| Price as decimal (`150.00`) | Always paise, display with `formatPrice()` |
| Adding GST on top of displayed price | GST is inclusive — extract it, don't add |
| Skipping COD option | COD is mandatory — ~40% of orders |
| Missing phone in address form | Phone is required for Indian delivery |
| `text-gray-600` Tailwind class | `text-[var(--text-secondary)]` |
| Product images with border-radius | `aspect-square object-cover` — no radius |
| Flavour swatches as unlabelled circles | Always include `title={flavour.name}` and `aria-label` |
| Hiding low stock behind "notify me" | Show "Low stock" badge when count < 10 |
| Float arithmetic on paise | Integer arithmetic only |
| Trusting Razorpay amount from client | Recalculate from DB in create-order route |
| Logging Razorpay key_secret | Never — remove immediately if added |

---

### 12. Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Components | PascalCase | `IngredientPanel.tsx` |
| Utilities | camelCase | `formatPrice()`, `cartKey()` |
| Constants | SCREAMING_SNAKE | `FREE_DELIVERY_THRESHOLD` |
| Price fields | explicit paise suffix | `priceInPaise`, `subtotalPaise` |
| DB tables | snake_case | `product_flavours`, `pack_sizes` |
| CSS variables | kebab-case | `--cta`, `--bg-warm` |
| Tailwind font class | `font-display` (Space Grotesk) | `className="font-display text-4xl"` |
| SMS/email templates | `OrderConfirmation`, `ShipmentNotification` |

---

### 13. When to Stop and Ask

Stop before:
- Hiding the ingredient list in any collapsible UI pattern
- Changing `rounded-full` to any other radius on buttons
- Changing payment gateway or adding a new one
- Modifying Razorpay webhook signature check
- Storing any payment response data (other than `razorpay_payment_id`) in the database
- Adding a feature from the NG (non-goals) list in `01_PRD.md`
- Changing the GST calculation logic
- Any action on production Razorpay or Supabase keys
