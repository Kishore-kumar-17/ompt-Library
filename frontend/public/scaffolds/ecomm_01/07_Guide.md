# 07 — Engineering Guide
## E-commerce Platform · ecomm_platform_01

---

### 1. Golden Rules

1. **Design tokens first.** Never hardcode a color, spacing, or radius value in a component. Use CSS variables.
2. **Server components for data, client components for interaction.** PDP fetches data server-side. Add to Cart button is a Client Component. Never mix.
3. **Price is always in cents.** Store cents in database. Display with `formatPrice()`. Never do float arithmetic on money.
4. **Never trust the client for price or stock.** Recalculate on the server before creating a PaymentIntent. Validate stock before processing order.
5. **Stripe webhooks are the source of truth for order creation.** Not the checkout page redirect. A user could close the browser before the redirect.

---

### 2. Project Folder Structure

```
src/
├── app/                    # All routes (Next.js App Router)
├── components/
│   ├── layout/             # Navbar, Footer, Providers
│   ├── cart/               # CartDrawer, CartItem, ShippingProgress
│   ├── product/            # ProductCard, ProductGrid, PDP components
│   ├── checkout/           # CheckoutForm, AddressForm, OrderSummary
│   ├── account/            # AccountSidebar, OrderList, AddressList
│   ├── admin/              # AdminSidebar, ProductForm, OrderTable
│   └── ui/                 # Primitive: Button, Input, Badge, Modal, Toast
├── store/
│   └── cart.ts             # Zustand cart store only
├── lib/
│   ├── supabase/           # client.ts, server.ts, admin.ts
│   ├── stripe.ts           # Stripe server instance
│   ├── resend.ts           # Resend client
│   ├── motion.ts           # Framer Motion reusable variants
│   └── utils.ts            # formatPrice, cn, slugify
├── emails/                 # React Email templates
├── types/
│   └── index.ts            # All shared TypeScript interfaces
└── middleware.ts           # Auth middleware
```

---

### 3. TypeScript Conventions

```typescript
// Always use interfaces for object shapes
interface Product {
  id: string
  name: string
  price: number  // always cents
}

// Never use 'any' — if you need an escape hatch, use 'unknown' and narrow it
// Bad:
const data: any = await fetchSomething()
// Good:
const data: unknown = await fetchSomething()
if (typeof data === 'object' && data !== null && 'id' in data) { ... }

// Use discriminated unions for state
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

// Server actions: always return typed results
interface ActionResult<T> {
  data?: T
  error?: string
}

// Prefer const assertions for static data
const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const
type OrderStatus = typeof ORDER_STATUSES[number]
```

---

### 4. React Conventions

```typescript
// Server Component (default — no 'use client')
// Fetch data directly, no hooks
async function ProductPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()  // server client
  const { data: product } = await supabase
    .from('products')
    .select('*, product_variants(*), product_images(*)')
    .eq('slug', params.slug)
    .single()
  if (!product) notFound()
  return <ProductDetail product={product} />
}

// Client Component — only when needed (state, events, browser APIs)
'use client'
function AddToCartButton({ product, variant }: Props) {
  const { addItem, toggleCart } = useCartStore()
  // ...
}

// Never fetch data in a Client Component's useEffect for initial render
// If a Client Component needs data, pass it as props from Server Component

// Component naming: PascalCase always
// File naming: PascalCase for components, camelCase for utilities

// Props interface always above component
interface ProductCardProps {
  product: Product
  priority?: boolean  // for next/image priority
}
export function ProductCard({ product, priority = false }: ProductCardProps) { ... }
```

---

### 5. Styling Conventions

```typescript
// Always use CSS variables for brand colors
// Bad:
className="bg-[#0F7037] text-[#1C1C1A]"
// Good:
className="bg-[var(--accent)] text-[var(--text-primary)]"

// Use cn() for conditional classes
import { cn } from '@/lib/utils'
className={cn(
  'base-classes',
  isSelected && 'selected-classes',
  isDisabled && 'disabled-classes'
)}

// Button pattern — always:
// Primary:
'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-[4px] h-11 px-6 text-sm font-semibold transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed'

// Ghost:
'border border-[var(--border-focus)] text-[var(--text-primary)] hover:border-[var(--text-secondary)] rounded-[4px] h-11 px-6 text-sm font-medium transition-colors duration-150'

// Product image wrapper — NEVER add border-radius
'aspect-[3/4] overflow-hidden'  // correct
'aspect-[3/4] overflow-hidden rounded-lg'  // WRONG

// Section padding
'py-24 md:py-12'  // desktop 96px / mobile 48px
```

---

### 6. Money and Price Conventions

```typescript
// utils.ts
export function formatPrice(cents: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100)
}
// Usage: formatPrice(11000) → "$110.00"

// NEVER do this:
const price = product.price / 100  // float arithmetic loses precision
const total = items.reduce((sum, item) => sum + item.price * item.quantity / 100, 0)

// DO this:
const totalCents = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
const displayTotal = formatPrice(totalCents)

// Free shipping threshold from env (also in cents):
const FREE_SHIPPING_THRESHOLD = parseInt(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD || '10000')
const shippingCost = subtotalCents >= FREE_SHIPPING_THRESHOLD ? 0 : 899  // $8.99

// Server-side price validation in PaymentIntent route:
// Re-fetch variant prices from Supabase — never use prices from the request body
const variantIds = cartItems.map(item => item.variantId)
const { data: variants } = await supabase
  .from('product_variants')
  .select('id, price, products(base_price)')
  .in('id', variantIds)
// Calculate total from database prices, not client-submitted prices
```

---

### 7. Supabase Conventions

```typescript
// Always handle errors explicitly
const { data, error } = await supabase.from('products').select('*')
if (error) throw new Error(`Failed to fetch products: ${error.message}`)

// Use select() to specify exactly what columns you need — never select('*') in production
const { data: product } = await supabase
  .from('products')
  .select(`
    id, name, slug, base_price, material, material_detail, care_instructions, badge,
    product_variants (id, size, color_name, color_hex, sku, stock_count, price),
    product_images (id, url, position, color_name, is_primary, alt)
  `)
  .eq('slug', slug)
  .eq('is_published', true)
  .single()

// Ordering images and variants — always explicit
.order('position', { ascending: true })  // images
.order('size', { ascending: true })     // variants (alphabetical size sort — not ideal, see tip below)

// Size sort tip: sizes are not alphabetically sortable ("10" < "7" alphabetically)
// Store a sort_order integer on variants, or sort in application code:
const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12', '13']
variants.sort((a, b) => SIZE_ORDER.indexOf(a.size) - SIZE_ORDER.indexOf(b.size))

// Server component pattern:
import { createClient } from '@/lib/supabase/server'
const supabase = createClient()  // uses cookies for session

// Client component pattern — only for mutations (add to wishlist, etc.):
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()
```

---

### 8. Stripe Conventions

```typescript
// Server: single Stripe instance
// lib/stripe.ts
import Stripe from 'stripe'
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})

// Creating PaymentIntent — server action or API route only
const paymentIntent = await stripe.paymentIntents.create({
  amount: totalCents,  // in cents
  currency: 'usd',
  metadata: {
    // Store cart snapshot as JSON string — max 500 chars per value
    cartItems: JSON.stringify(cartSnapshot),
    guestEmail: guestEmail || '',
  },
  automatic_payment_methods: { enabled: true },  // enables Apple Pay, Google Pay
})

// Webhook: always verify signature
const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)

// NEVER log these:
console.log(paymentIntent.client_secret)  // security risk
console.log(paymentIntent.amount)         // avoid logging financial data
console.log(customer.payment_method)      // PCI violation risk

// Idempotency in webhook:
const existing = await supabase.from('orders')
  .select('id').eq('stripe_payment_intent_id', pi.id).maybeSingle()
if (existing.data) {
  return new Response('OK', { status: 200 })  // already processed
}
```

---

### 9. Cart Store Conventions

```typescript
// Reading cart — always use hook, never import store directly in Server Components
// In Client Components:
const { items, addItem, toggleCart, subtotal, itemCount } = useCartStore()

// Adding to cart — always provide all required fields
addItem({
  productId: variant.product_id,
  name: product.name,
  price: variant.price ?? product.base_price,  // variant override or product base
  size: selectedSize,
  color: selectedColor,
  quantity: 1,
  image: primaryImage.url,
})

// Cart item uniqueness key: productId + size + color
// Two items with same product but different size = two separate line items ✓
// Two items with same product + size + color = increment quantity ✓

// Minimum quantity is 1 — never allow 0 in the stepper
// Use the remove button (×) to delete a line item entirely
```

---

### 10. Animation Conventions

```typescript
// lib/motion.ts — all variants here, imported where needed
export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

export const cartDrawer = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { x: '100%', transition: { duration: 0.25, ease: 'easeIn' } }
}

export const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
}

// Always gate with useReducedMotion
'use client'
import { useReducedMotion } from 'framer-motion'
function AnimatedSection({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={prefersReduced ? { duration: 0 } : undefined}
    >
      {children}
    </motion.div>
  )
}
```

---

### 11. Image Conventions

```typescript
// Always use next/image — never <img>
import Image from 'next/image'

// Product card — fixed aspect ratio container
<div className="aspect-[3/4] overflow-hidden relative">
  <Image
    src={product.primaryImage}
    alt={`${product.name} in ${selectedColor}`}  // descriptive alt
    fill
    className="object-cover"
    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
  />
</div>

// Hero image — always priority
<Image
  src={heroImage}
  alt="Campaign lifestyle image showing [specific description]"
  fill
  priority  // LCP image — always priority
  className="object-cover"
/>

// Thumbnail — explicit dimensions
<Image
  src={image.url}
  alt={image.alt || product.name}
  width={72}
  height={96}
  className="object-cover"
/>

// Never skip alt text — axe-core will catch it
// Alt text must be descriptive, not "image" or "product-1"
// If image is purely decorative: alt=""
```

---

### 12. Error Handling Conventions

```typescript
// Server actions — always return typed result
async function addAddress(formData: FormData): Promise<ActionResult<Address>> {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return { error: 'Not authenticated' }

  const { data, error } = await supabase
    .from('addresses')
    .insert({ user_id: session.user.id, ...parsedData })
    .select().single()

  if (error) return { error: 'Failed to save address. Please try again.' }
  return { data }
}

// Client — handle action results
const result = await addAddress(formData)
if (result.error) {
  toast.error(result.error)
  return
}
toast.success('Address saved')

// API routes — always return structured errors
return Response.json({ error: 'Webhook signature verification failed' }, { status: 400 })

// Never throw raw Supabase or Stripe errors to the client
// Log the full error server-side, return a generic message to client
console.error('Supabase error:', error)  // server log
return { error: 'Something went wrong. Please try again.' }  // client message
```

---

### 13. Admin Conventions

```typescript
// Always verify admin role in server components and API routes
// The middleware checks it for the route, but verify again inside for defense in depth
async function AdminProductsPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', session.user.id).single()
  if (profile?.role !== 'admin') redirect('/')

  // ...admin content
}

// ISR revalidation after any admin data change:
import { revalidatePath } from 'next/cache'
revalidatePath('/products/[slug]', 'page')
revalidatePath('/collections/[category]', 'page')
revalidatePath('/', 'page')

// Image upload to Supabase Storage:
const filePath = `products/${productId}/${colorName.replace(/\s+/g, '-').toLowerCase()}/${position}.webp`
const { error } = await supabase.storage
  .from('product-images')
  .upload(filePath, file, { upsert: true, contentType: 'image/webp' })
const { data: { publicUrl } } = supabase.storage
  .from('product-images')
  .getPublicUrl(filePath)
```

---

### 14. Common Mistakes and How to Avoid Them

| Mistake | Correct approach |
|---------|-----------------|
| Using `bg-white` | Use `bg-[var(--bg-primary)]` |
| `rounded-lg` or `rounded-full` on buttons | Always `rounded-[4px]` |
| Border-radius on product image wrappers | `aspect-[3/4] overflow-hidden` — no radius |
| `text-gray-600` Tailwind class | Use `text-[var(--text-secondary)]` |
| Infinite scroll on PLP | Load more button only |
| Hiding out-of-stock sizes | Show disabled with `opacity-40 line-through` |
| Trusting client cart total for Stripe | Re-fetch prices from DB in PaymentIntent route |
| Creating order on checkout redirect | Create order in Stripe webhook only |
| Logging `client_secret` or card data | Never log these — remove immediately if added |
| `useEffect` for initial data fetch in RSC | Fetch in Server Component directly |
| `any` type | Use `unknown` + type narrowing |
| Showing exact stock count ("12 remaining") | Only show "Low stock" when count < 5 |
| Urgency copy ("Only 3 left! Sale ends in...") | Remove — contradicts brand voice |
| Float arithmetic on prices (`price / 100 * quantity`) | Integer arithmetic in cents |
| Carousel with auto-advance | Static display or tab-switch only |
| Chat widget visible on mobile | Hide below 768px — covers Add to Cart |

---

### 15. Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Components | PascalCase | `ProductCard.tsx`, `CartDrawer.tsx` |
| Utility functions | camelCase | `formatPrice()`, `slugify()` |
| Constants | SCREAMING_SNAKE | `FREE_SHIPPING_THRESHOLD` |
| Database tables | snake_case | `product_variants`, `order_items` |
| CSS variables | kebab-case | `--bg-primary`, `--accent-hover` |
| Supabase buckets | kebab-case | `product-images` |
| Route params | kebab-case | `/collections/mens-shoes` |
| Environment variables | SCREAMING_SNAKE | `STRIPE_WEBHOOK_SECRET` |
| TypeScript interfaces | PascalCase | `Product`, `CartItem`, `OrderStatus` |
| Zustand stores | camelCase hook | `useCartStore` |

---

### 16. Performance Checklist

Before shipping any page, verify:

- [ ] All images use `next/image` with explicit `width`/`height` or `fill`
- [ ] Hero image has `priority` prop
- [ ] `sizes` prop on `fill` images describes actual rendered size
- [ ] No `useEffect` fetching data that could be fetched in a Server Component
- [ ] `generateStaticParams` on PDP for all published slugs
- [ ] DM Sans loaded via `next/font/google` — not a `<link>` tag
- [ ] No unnecessary Client Components — check `'use client'` is justified
- [ ] Bundle size: check for large client-side imports (moment.js, lodash)

---

### 17. When to Stop and Ask

Do not proceed autonomously if:

- The database schema needs to change after data exists — ask first
- A Stripe webhook handler needs modification — confirm before changing
- Adding a new third-party library — is it in the approved stack in `02_Architecture.md`?
- An RLS policy change is needed — changing policies can expose data
- A non-goal from `01_PRD.md` is being requested — confirm it's intentional scope change
- Any action on production Stripe keys — confirm explicitly
- A feature would require storing payment card data anywhere — this is always wrong, stop immediately
