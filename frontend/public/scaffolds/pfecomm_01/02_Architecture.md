# 02 — Architecture
## Premium Fashion Retail Storefront · pfecomm_platform_01

---

## 1. TypeScript Schema

```typescript
// src/types/index.ts

export type Brand = 'Aritzia' | 'TNA' | 'Wilfred' | 'Sunday Best' | 'Auxiliary'

export type Category =
  | 'tops'
  | 'bottoms'
  | 'dresses'
  | 'outerwear'
  | 'knitwear'
  | 'shoes'
  | 'accessories'

export interface SizeVariant {
  size: string       // "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL"
  inStock: boolean
  sku: string
}

export interface ColorVariant {
  name: string       // "Bone", "Black", "Ecru", "Dust Grey"
  swatch: string     // hex value — ONLY used as inline style, never in CSS
  images: string[]   // 3–4 image URLs specific to this colorway
  inStock: boolean   // false if ALL sizes of this color are OOS
  sizes: SizeVariant[]
}

export interface Product {
  id: string
  slug: string
  name: string
  brand: Brand
  category: Category
  subcategory?: string
  description: string          // 2–3 sentences, material + fit
  price: number
  salePrice?: number           // present only if currently on sale
  colors: ColorVariant[]       // minimum 2 colors per product
  isNew: boolean
  isSale: boolean
  featured: boolean
}

export interface CartItem {
  productId: string
  name: string
  brand: Brand
  price: number                // effective price (salePrice if on sale)
  originalPrice?: number       // only present if item is on sale
  color: string                // colorway name
  colorSwatch: string          // hex — for cart item image border/preview
  size: string
  quantity: number
  image: string                // first image of the selected colorway
}
```

---

## 2. File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root: Inter font, PromoBanner + MegaNav + CartDrawer always mounted
│   ├── globals.css             # CSS tokens + base reset
│   ├── page.tsx                # Homepage
│   ├── products/
│   │   ├── page.tsx            # PLP
│   │   └── [slug]/
│   │       └── page.tsx        # PDP
├── components/
│   ├── layout/
│   │   ├── PromoBanner.tsx     # Dismissible black top bar
│   │   ├── MegaNav.tsx         # Sticky nav + mobile hamburger
│   │   └── Footer.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx      # Framer Motion slide-in
│   │   └── CartItem.tsx        # Single line item
│   └── product/
│       ├── ProductCard.tsx     # Swatch hover + image swap
│       ├── ProductGrid.tsx     # Responsive grid + filter integration
│       ├── FilterPanel.tsx     # Desktop sidebar + mobile bottom sheet
│       ├── ColorSelector.tsx   # PDP color swatches
│       ├── SizeSelector.tsx    # PDP size buttons
│       └── ImageGallery.tsx    # PDP main image + thumbnails
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
                  (i) =>
                    itemKey(i.productId, i.color, i.size) !== itemKey(productId, color, size)
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
    { name: 'pfecomm-cart' }
  )
)
```

---

## 4. ProductCard — Swatch Hover Interaction

This is the most important interaction on the site. The image changes to reflect the colorway the user is hovering — instantly.

```tsx
// src/components/product/ProductCard.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
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
        {/* Sub-brand badge — only for non-Aritzia products */}
        {product.brand !== 'Aritzia' && (
          <span className={styles.brandBadge}>{product.brand}</span>
        )}

        <Link href={`/products/${product.slug}`} className={styles.nameLink}>
          <h2 className={styles.name}>{product.name}</h2>
        </Link>

        <div className={styles.priceRow}>
          {product.isSale && product.salePrice ? (
            <>
              <span className={styles.salePrice}>${product.salePrice}</span>
              <span className={styles.originalPrice}>${product.price}</span>
            </>
          ) : (
            <span className={styles.price}>${product.price}</span>
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
              style={{ background: color.swatch }}   // Only place hex is used
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

**Critical:** There is no `transition` property on `styles.image`. The swap is instant because the `src` prop changes synchronously with the state update.

---

## 5. PDP Color + Gallery Sync

```tsx
// src/app/products/[slug]/page.tsx (partial)
'use client'

import { useState } from 'react'
import type { ColorVariant } from '@/types'

export default function ProductPage({ product }) {
  const [selectedColor, setSelectedColor]   = useState<ColorVariant>(product.colors[0])
  const [selectedSize, setSelectedSize]     = useState<string | null>(null)
  const [galleryIndex, setGalleryIndex]     = useState(0)

  // When color changes: reset gallery to first image of new colorway
  const handleColorChange = (color: ColorVariant) => {
    setSelectedColor(color)
    setGalleryIndex(0)
    setSelectedSize(null)  // Reset size selection — OOS configuration may differ
  }

  const canAddToCart = selectedSize !== null &&
    selectedColor.sizes.find(s => s.size === selectedSize)?.inStock === true

  // ...
}
```

---

## 6. PromoBanner with Dismiss

```tsx
// src/components/layout/PromoBanner.tsx
'use client'

import { useState, useEffect } from 'react'
import styles from './PromoBanner.module.css'

const STORAGE_KEY = 'promo-banner-dismissed'

export default function PromoBanner({ message }: { message: string }) {
  const [dismissed, setDismissed] = useState(true) // start hidden to avoid flash

  useEffect(() => {
    // Check sessionStorage after mount (avoids SSR mismatch)
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
        <button onClick={dismiss} className={styles.close} aria-label="Dismiss banner">
          ✕
        </button>
      </div>
    </div>
  )
}
```

---

## 7. CartDrawer with Framer Motion

```tsx
// src/components/cart/CartDrawer.tsx
'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCartStore } from '@/store/cart'
import CartItem from './CartItem'
import styles from './CartDrawer.module.css'

const FREE_SHIPPING_THRESHOLD = 200

export default function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, itemCount } = useCartStore()
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal

  // Trap focus and lock scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
          >
            <header className={styles.header}>
              <h2 className={styles.title}>Your bag ({itemCount})</h2>
              <button onClick={closeCart} className={styles.closeBtn} aria-label="Close bag">✕</button>
            </header>

            {items.length === 0 ? (
              <div className={styles.empty}>
                <p>Your bag is empty.</p>
              </div>
            ) : (
              <>
                <ul className={styles.itemList}>
                  {items.map((item) => (
                    <CartItem
                      key={`${item.productId}::${item.color}::${item.size}`}
                      item={item}
                    />
                  ))}
                </ul>

                <div className={styles.footer}>
                  {remaining > 0 && (
                    <p className={styles.shippingNote}>
                      Spend ${Math.ceil(remaining)} more for free shipping
                    </p>
                  )}
                  <div className={styles.subtotalRow}>
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
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

## 8. Mock Product Data

```typescript
// src/lib/products.ts (structure — fill in realistic data)
import type { Product } from '@/types'

export const products: Product[] = [
  {
    id: 'effortless-pant-001',
    slug: 'effortless-pant',
    name: 'Effortless Pant',
    brand: 'Aritzia',
    category: 'bottoms',
    description: 'Wide-leg trousers in a fluid, lightweight crepe. Sits at the natural waist. Fully lined.',
    price: 155,
    colors: [
      {
        name: 'Black',
        swatch: '#1a1a1a',
        images: ['/products/effortless-pant-black-1.jpg', '/products/effortless-pant-black-2.jpg', '/products/effortless-pant-black-3.jpg'],
        inStock: true,
        sizes: [
          { size: 'XXS', inStock: true,  sku: 'EP-BLK-XXS' },
          { size: 'XS',  inStock: true,  sku: 'EP-BLK-XS'  },
          { size: 'S',   inStock: true,  sku: 'EP-BLK-S'   },
          { size: 'M',   inStock: false, sku: 'EP-BLK-M'   },
          { size: 'L',   inStock: true,  sku: 'EP-BLK-L'   },
        ],
      },
      {
        name: 'Bone',
        swatch: '#e8e0d0',
        images: ['/products/effortless-pant-bone-1.jpg', '/products/effortless-pant-bone-2.jpg'],
        inStock: true,
        sizes: [
          { size: 'XXS', inStock: true,  sku: 'EP-BNE-XXS' },
          { size: 'XS',  inStock: true,  sku: 'EP-BNE-XS'  },
          { size: 'S',   inStock: false, sku: 'EP-BNE-S'   },
          { size: 'M',   inStock: true,  sku: 'EP-BNE-M'   },
          { size: 'L',   inStock: true,  sku: 'EP-BNE-L'   },
        ],
      },
    ],
    isNew: true,
    isSale: false,
    featured: true,
  },
  // ... 11 more products covering all 5 sub-brands and 4+ categories
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((p) => p.brand === brand)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}
```

---

## 9. PLP Filter State

Filter state lives in URL search params. This enables shareable URLs and browser back-button support.

```typescript
// src/app/products/page.tsx
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

// Read filter state from URL
const searchParams   = useSearchParams()
const activeBrands   = searchParams.getAll('brand')
const activeCategories = searchParams.getAll('category')
const activeSizes    = searchParams.getAll('size')
const saleOnly       = searchParams.get('sale') === 'true'

// Apply filters to products array
const filtered = products.filter((p) => {
  if (activeBrands.length   && !activeBrands.includes(p.brand))      return false
  if (activeCategories.length && !activeCategories.includes(p.category)) return false
  if (saleOnly               && !p.isSale)                           return false
  return true
})

// Update URL on filter change
const router   = useRouter()
const pathname = usePathname()

function toggleFilter(key: string, value: string) {
  const params = new URLSearchParams(searchParams.toString())
  const values = params.getAll(key)
  if (values.includes(value)) {
    params.delete(key)
    values.filter(v => v !== value).forEach(v => params.append(key, v))
  } else {
    params.append(key, value)
  }
  router.push(`${pathname}?${params.toString()}`)
}
```

---

## 10. Build Configuration

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
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0"
  }
}
```
