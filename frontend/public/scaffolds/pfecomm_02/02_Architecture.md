# 02 — Architecture
## Indian Heritage Fashion Storefront · pfecomm_platform_02

---

## 1. TypeScript Schema

```typescript
// src/types/index.ts

export type CraftTechnique =
  | 'hand-block-print'
  | 'handloom'
  | 'natural-dye'
  | 'embroidery'
  | 'ajrakh'
  | 'ikat'
  | 'chikankari'
  | 'none'

export type Fabric =
  | 'cotton'
  | 'silk'
  | 'linen'
  | 'khadi'
  | 'chanderi'
  | 'georgette'
  | 'wool'

export type Category =
  | 'kurtas'
  | 'sarees'
  | 'kurta-sets'
  | 'dupattas'
  | 'salwar-suits'
  | 'tops'
  | 'bottoms'
  | 'home'

export interface SizeVariant {
  size: string       // "XS" | "S" | "M" | "L" | "XL" | "XXL"
  inStock: boolean
  sku: string
}

export interface ColorVariant {
  name: string       // Natural dye vocabulary: "Indigo", "Madder Red", "Turmeric", "Natural", "Mud Brown"
  swatch: string     // hex value — ONLY used as inline style on swatch element, never in CSS
  images: string[]   // 3–4 image URLs specific to this colorway
  inStock: boolean
  sizes: SizeVariant[]
}

export interface Product {
  id: string
  slug: string
  name: string
  category: Category
  craftTechnique: CraftTechnique
  fabric: Fabric
  origin?: string              // "Bagru, Rajasthan" | "Kutch, Gujarat" | "Lucknow, UP" | "Pochampally, Telangana"
  description: string          // Names technique + material + fit. 2–3 sentences.
  price: number                // INR integer — no decimals
  salePrice?: number           // present only if currently on sale
  colors: ColorVariant[]
  isNew: boolean
  isSale: boolean
  featured: boolean
}

export interface CartItem {
  productId: string
  name: string
  craftTechnique: CraftTechnique
  price: number                // effective price (salePrice if on sale)
  originalPrice?: number       // only present if item is on sale
  color: string                // natural dye color name
  colorSwatch: string          // hex
  size: string
  quantity: number
  image: string                // first image of selected colorway
}

// Craft technique display labels — used in badges, filters, and cart line items
export const CRAFT_LABELS: Record<CraftTechnique, string> = {
  'hand-block-print': 'Hand-Block Print',
  'handloom':         'Handloom',
  'natural-dye':      'Natural Dye',
  'embroidery':       'Hand Embroidery',
  'ajrakh':           'Ajrakh Print',
  'ikat':             'Ikat Weave',
  'chikankari':       'Chikankari',
  'none':             '',
}
```

---

## 2. File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root: fonts, PromoBanner + MegaNav + CartDrawer always mounted
│   ├── globals.css             # CSS tokens + base reset
│   ├── page.tsx                # Homepage
│   ├── products/
│   │   ├── page.tsx            # PLP
│   │   └── [slug]/
│   │       └── page.tsx        # PDP
├── components/
│   ├── layout/
│   │   ├── PromoBanner.tsx     # Dismissible maroon top bar
│   │   ├── MegaNav.tsx         # Sticky nav + mobile hamburger
│   │   └── Footer.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx      # Framer Motion slide-in
│   │   └── CartItem.tsx        # Single line item with craft badge
│   └── product/
│       ├── ProductCard.tsx     # Swatch hover + instant image swap + craft badge
│       ├── ProductGrid.tsx     # Responsive grid
│       ├── FilterPanel.tsx     # Desktop sidebar + mobile bottom sheet
│       ├── ColorSelector.tsx   # PDP color swatches with natural dye names
│       ├── SizeSelector.tsx    # PDP size buttons with OOS states
│       └── ImageGallery.tsx    # PDP large image + thumbnails
├── store/
│   └── cart.ts                 # Zustand cart store
├── lib/
│   └── products.ts             # 12 mock products
└── types/
    └── index.ts
```

---

## 3. Zustand Cart Store

```typescript
// src/store/cart.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types'

const FREE_SHIPPING_THRESHOLD = 999  // INR

function itemKey(productId: string, color: string, size: string) {
  return `${productId}::${color}::${size}`
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (productId: string, color: string, size: string) => void
  updateQuantity: (productId: string, color: string, size: string, qty: number) => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  readonly subtotal: number
  readonly itemCount: number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => set((state) => {
        const key = itemKey(item.productId, item.color, item.size)
        const existing = state.items.find(
          (i) => itemKey(i.productId, i.color, i.size) === key
        )
        if (existing) {
          return {
            items: state.items.map((i) =>
              itemKey(i.productId, i.color, i.size) === key
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }
        }
        return { items: [...state.items, { ...item, quantity: 1 }] }
      }),

      removeItem: (productId, color, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i.productId, i.color, i.size) !== itemKey(productId, color, size)
          ),
        })),

      updateQuantity: (productId, color, size, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter(
                  (i) => itemKey(i.productId, i.color, i.size) !== itemKey(productId, color, size)
                )
              : state.items.map((i) =>
                  itemKey(i.productId, i.color, i.size) === itemKey(productId, color, size)
                    ? { ...i, quantity: qty }
                    : i
                ),
        })),

      openCart:   () => set({ isOpen: true }),
      closeCart:  () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      get subtotal() {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)
      },
      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },
    }),
    { name: 'pfecomm-craft-cart' }
  )
)

export { FREE_SHIPPING_THRESHOLD }
```

---

## 4. ProductCard — Craft Badge + Swatch Hover

Two key behaviors: craft badge above product name (if applicable), instant swatch image swap.

```tsx
// src/components/product/ProductCard.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { CRAFT_LABELS } from '@/types'
import { formatINR } from '@/lib/utils'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }: { product: Product }) {
  const [activeColorIdx, setActiveColorIdx] = useState(0)
  const activeColor = product.colors[activeColorIdx]

  return (
    <article className={styles.card}>
      <Link href={`/products/${product.slug}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          {/* NO transition on this image — instant swap via state */}
          <Image
            src={activeColor.images[0]}
            alt={`${product.name} in ${activeColor.name}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className={styles.image}
          />
          {product.isNew && (
            <span className={styles.newBadge} aria-label="New arrival">New</span>
          )}
        </div>
      </Link>

      <div className={styles.info}>
        {/* Craft technique badge — only if not 'none' */}
        {product.craftTechnique !== 'none' && (
          <span className={styles.craftBadge}>
            {CRAFT_LABELS[product.craftTechnique]}
          </span>
        )}

        <Link href={`/products/${product.slug}`} className={styles.nameLink}>
          <h2 className={styles.name}>{product.name}</h2>
        </Link>

        <p className={styles.fabricLabel}>
          {product.fabric.charAt(0).toUpperCase() + product.fabric.slice(1)}
        </p>

        <div className={styles.priceRow}>
          {product.isSale && product.salePrice ? (
            <>
              <span className={styles.salePrice}>{formatINR(product.salePrice)}</span>
              <span className={styles.originalPrice}>{formatINR(product.price)}</span>
            </>
          ) : (
            <span className={styles.price}>{formatINR(product.price)}</span>
          )}
        </div>

        {/* Color swatches */}
        <div
          className={styles.swatches}
          role="group"
          aria-label={`Color options for ${product.name}`}
        >
          {product.colors.map((color, idx) => (
            <button
              key={color.name}
              className={`${styles.swatch} ${idx === activeColorIdx ? styles.swatchActive : ''}`}
              style={{ background: color.swatch }}   // Only place hex appears
              aria-label={color.name}
              aria-pressed={idx === activeColorIdx}
              onMouseEnter={() => setActiveColorIdx(idx)}
            />
          ))}
        </div>
      </div>
    </article>
  )
}
```

**Critical:** No `transition` property on `styles.image`. The swap is instant because `src` changes synchronously with state.

---

## 5. INR Price Formatter

```typescript
// src/lib/utils.ts
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}
// ₹2499 → "₹2,499"
// ₹12000 → "₹12,000"
// ₹999 → "₹999"
```

---

## 6. PDP Color + Gallery Sync

```tsx
// src/app/products/[slug]/page.tsx (partial)
'use client'

import { useState } from 'react'
import type { ColorVariant } from '@/types'

export default function ProductPage({ product }) {
  const [selectedColor, setSelectedColor]   = useState<ColorVariant>(product.colors[0])
  const [selectedSize, setSelectedSize]     = useState<string | null>(null)
  const [galleryIndex, setGalleryIndex]     = useState(0)

  const handleColorChange = (color: ColorVariant) => {
    setSelectedColor(color)
    setGalleryIndex(0)        // Reset to first image of new colorway
    setSelectedSize(null)     // Reset size — availability may differ per color
  }

  const canAddToCart = selectedSize !== null &&
    selectedColor.sizes.find(s => s.size === selectedSize)?.inStock === true

  const handleAddToCart = () => {
    if (!canAddToCart || !selectedSize) return
    addItem({
      productId: product.id,
      name: product.name,
      craftTechnique: product.craftTechnique,
      price: product.salePrice ?? product.price,
      originalPrice: product.isSale ? product.price : undefined,
      color: selectedColor.name,
      colorSwatch: selectedColor.swatch,
      size: selectedSize,
      quantity: 1,
      image: selectedColor.images[0],
    })
    openCart()
  }
}
```

---

## 7. PromoBanner with Dismiss

```tsx
// src/components/layout/PromoBanner.tsx
'use client'

import { useState, useEffect } from 'react'
import styles from './PromoBanner.module.css'

const STORAGE_KEY = 'craft-promo-dismissed'

export default function PromoBanner({ message }: { message: string }) {
  const [dismissed, setDismissed] = useState(true) // start hidden — avoids flash

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(STORAGE_KEY) === 'true'
    if (!wasDismissed) setDismissed(false)
  }, [])

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true')
    setDismissed(true)
  }

  return (
    <div
      className={styles.banner}
      style={{ maxHeight: dismissed ? '0' : '40px', overflow: 'hidden' }}
      aria-hidden={dismissed}
    >
      <div className={styles.inner}>
        <p className={styles.message}>{message}</p>
        <button onClick={dismiss} className={styles.close} aria-label="Dismiss banner">✕</button>
      </div>
    </div>
  )
}
```

```css
/* PromoBanner.module.css */
.banner { transition: max-height 200ms ease-out; }
.inner { display: flex; align-items: center; justify-content: center; height: 40px; padding: 0 16px; background: var(--color-maroon); position: relative; }
.message { color: #fff; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; }
.close { position: absolute; right: 16px; background: none; border: none; color: #fff; cursor: pointer; font-size: 14px; padding: 4px 8px; }
```

---

## 8. CartDrawer with Framer Motion

```tsx
// src/components/cart/CartDrawer.tsx
'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCartStore, FREE_SHIPPING_THRESHOLD } from '@/store/cart'
import { formatINR } from '@/lib/utils'
import CartItem from './CartItem'
import styles from './CartDrawer.module.css'

export default function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, itemCount } = useCartStore()
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={closeCart}
            aria-hidden="true"
          />
          <motion.aside
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <header className={styles.header}>
              <h2 className={styles.title}>Your cart ({itemCount})</h2>
              <button onClick={closeCart} className={styles.closeBtn} aria-label="Close cart">✕</button>
            </header>

            {items.length === 0 ? (
              <div className={styles.empty}><p>Your cart is empty.</p></div>
            ) : (
              <>
                <ul className={styles.itemList}>
                  {items.map((item) => (
                    <CartItem key={`${item.productId}::${item.color}::${item.size}`} item={item} />
                  ))}
                </ul>
                <div className={styles.footer}>
                  {remaining > 0 && (
                    <p className={styles.shippingNote}>
                      Add {formatINR(Math.ceil(remaining))} more for free shipping
                    </p>
                  )}
                  <div className={styles.subtotalRow}>
                    <span>Subtotal</span>
                    <span>{formatINR(subtotal)}</span>
                  </div>
                  <a href="/checkout" className={styles.checkoutBtn}>
                    Proceed to Checkout
                  </a>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

## 9. Mock Product Data — Structure

```typescript
// src/lib/products.ts

import type { Product } from '@/types'

export const products: Product[] = [
  {
    id: 'indigo-block-kurta-001',
    slug: 'indigo-hand-block-print-cotton-kurta',
    name: 'Indigo Hand-Block Print Cotton Kurta',
    category: 'kurtas',
    craftTechnique: 'hand-block-print',
    fabric: 'cotton',
    origin: 'Bagru, Rajasthan',
    description: 'Hand-block printed on handloom cotton in Bagru, Rajasthan using indigo natural dye. Straight-cut silhouette with side slits. Chest pocket with signature block motif.',
    price: 2799,
    colors: [
      {
        name: 'Indigo',
        swatch: '#2C4A6E',
        images: ['/products/indigo-kurta-indigo-1.jpg', '/products/indigo-kurta-indigo-2.jpg', '/products/indigo-kurta-indigo-3.jpg'],
        inStock: true,
        sizes: [
          { size: 'XS', inStock: true,  sku: 'IBK-IND-XS' },
          { size: 'S',  inStock: true,  sku: 'IBK-IND-S'  },
          { size: 'M',  inStock: true,  sku: 'IBK-IND-M'  },
          { size: 'L',  inStock: false, sku: 'IBK-IND-L'  },
          { size: 'XL', inStock: true,  sku: 'IBK-IND-XL' },
        ],
      },
      {
        name: 'Natural',
        swatch: '#EDE0CB',
        images: ['/products/indigo-kurta-natural-1.jpg', '/products/indigo-kurta-natural-2.jpg'],
        inStock: true,
        sizes: [
          { size: 'XS', inStock: true,  sku: 'IBK-NAT-XS' },
          { size: 'S',  inStock: true,  sku: 'IBK-NAT-S'  },
          { size: 'M',  inStock: false, sku: 'IBK-NAT-M'  },
          { size: 'L',  inStock: true,  sku: 'IBK-NAT-L'  },
          { size: 'XL', inStock: true,  sku: 'IBK-NAT-XL' },
        ],
      },
    ],
    isNew: true,
    isSale: false,
    featured: true,
  },
  // ... 11 more products — see below for full seed list guidance
]

// 12 seed products must cover:
// - At least 4 categories: kurtas, dupattas, kurta-sets, tops
// - At least 4 craft techniques: hand-block-print, handloom, embroidery, ajrakh
// - At least 3 fabrics: cotton, linen, silk
// - At least 3 origins: Bagru (Rajasthan), Kutch (Gujarat), Lucknow (UP), Pochampally (Telangana)
// - At least 2 isSale: true products with salePrice
// - At least 4 isNew: true products
// - Natural dye color names: "Indigo", "Madder Red", "Turmeric", "Natural", "Mud Brown", "Sage", "Pomegranate"

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getProductsByCraft(craftTechnique: string): Product[] {
  return products.filter((p) => p.craftTechnique === craftTechnique)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew)
}
```

---

## 10. PLP Filter State

```typescript
// src/app/products/page.tsx
'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { products } from '@/lib/products'

const searchParams       = useSearchParams()
const activeCategories   = searchParams.getAll('category')
const activeCrafts       = searchParams.getAll('craft')
const activeFabrics      = searchParams.getAll('fabric')
const activeSizes        = searchParams.getAll('size')
const saleOnly           = searchParams.get('sale') === 'true'

const filtered = products.filter((p) => {
  if (activeCategories.length && !activeCategories.includes(p.category))         return false
  if (activeCrafts.length     && !activeCrafts.includes(p.craftTechnique))       return false
  if (activeFabrics.length    && !activeFabrics.includes(p.fabric))              return false
  if (saleOnly                && !p.isSale)                                      return false
  // Size filter: check if any colorway has an in-stock size matching active sizes
  if (activeSizes.length) {
    const hasSize = p.colors.some((c) =>
      c.sizes.some((s) => s.inStock && activeSizes.includes(s.size))
    )
    if (!hasSize) return false
  }
  return true
})

function toggleFilter(key: string, value: string) {
  const params = new URLSearchParams(searchParams.toString())
  const values = params.getAll(key)
  params.delete(key)
  if (values.includes(value)) {
    values.filter(v => v !== value).forEach(v => params.append(key, v))
  } else {
    [...values, value].forEach(v => params.append(key, v))
  }
  router.push(`${pathname}?${params.toString()}`, { scroll: false })
}
```

---

## 11. Font Setup in layout.tsx

```tsx
// src/app/layout.tsx
import { Cormorant_Garamond, Inter } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <PromoBanner message="Free shipping on orders over ₹999 · Handcrafted in India" />
        <MegaNav />
        {children}
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
```

**Important:** `--font-display` is Cormorant Garamond (headings only). `--font-body` is Inter (all UI). Do not use `--font-display` for product card names, navigation, buttons, or body text.

---

## 12. Build Configuration

### next.config.ts
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}

export default nextConfig
```

### Dependencies
```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "zustand": "^4.5.0",
    "framer-motion": "^11.0.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "lucide-react": "^0.400.0"
  }
}
```
