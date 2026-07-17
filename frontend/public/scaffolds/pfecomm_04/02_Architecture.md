# 02 — Architecture
## Indian D2C Youth Fashion Brand · pfecomm_platform_04

---

## TypeScript Schema — `src/types/index.ts`

```typescript
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'

export type Category =
  | 'tshirts'
  | 'hoodies'
  | 'sweatshirts'
  | 'crop-tops'
  | 'joggers'
  | 'shorts'
  | 'dresses'
  | 'accessories'

export type PrintStyle =
  | 'hyperprint'
  | 'minimal'
  | 'acid-wash'
  | 'typography'
  | 'solid'
  | 'graphic'
  | 'licensed'

export const PRINT_LABELS: Record<PrintStyle, string> = {
  hyperprint: 'Hyperprint',
  minimal: 'Minimal',
  'acid-wash': 'Acid Wash',
  typography: 'Typography',
  solid: 'Solid',
  graphic: 'Graphic Print',
  licensed: 'Licensed',
}

export interface ColorOption {
  name: string        // "Galaxy Black", "Off White", "French Blue"
  swatch: string      // hex value for the dot — inline style only
  inStock: boolean
  sku: string
  images: string[]    // Different photography per color — 3 images per colorway
}

export interface SizeOption {
  size: Size
  inStock: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  category: Category
  printStyle: PrintStyle
  collection?: string        // Licensed IP label — "Star Wars", "Marvel", "Friends"
  printDescription?: string  // Describes the graphic — "The Dark Side Force Quote Print"
  mrp: number                // Maximum Retail Price
  price: number              // Selling price (≤ mrp)
  colors: ColorOption[]
  sizes: SizeOption[]
  comboEligible: boolean     // true for tshirts and crop-tops only
  coinsEarned: number        // Bewakoof Coins earned — display only, typical 30–60
  tags: string[]
}

export interface CartItem {
  productId: string
  name: string
  price: number
  mrp: number
  color: string
  colorSwatch: string
  size: Size
  quantity: number
  image: string
  comboEligible: boolean
}

export interface WishlistItem {
  productId: string
  name: string
  price: number
  mrp: number
  image: string
}
```

---

## Utility Functions — `src/lib/utils.ts`

```typescript
export const COMBO_QTY = 3
export const COMBO_PRICE = 1199
export const FREE_SHIPPING_THRESHOLD = 499

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function getDiscountPercent(mrp: number, price: number): number {
  if (price >= mrp) return 0
  return Math.round(((mrp - price) / mrp) * 100)
}

/**
 * Compute total combo savings in the cart.
 * Each group of COMBO_QTY eligible items is priced at COMBO_PRICE.
 * Items beyond the last full group are priced normally.
 */
export function getComboSavings(items: CartItem[]): number {
  const eligibleItems = items.filter((i) => i.comboEligible)
  const totalQty = eligibleItems.reduce((sum, i) => sum + i.quantity, 0)
  const comboGroups = Math.floor(totalQty / COMBO_QTY)
  if (comboGroups === 0) return 0

  const normalTotal = eligibleItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const comboTotal =
    comboGroups * COMBO_PRICE +
    eligibleItems
      .slice(comboGroups * COMBO_QTY)
      .reduce((sum, i) => sum + i.price, 0)

  return Math.max(0, normalTotal - comboTotal)
}

/**
 * Returns how many eligible items are in cart and how many more
 * are needed to unlock the next combo group.
 */
export function getComboProgress(items: CartItem[]): {
  count: number
  neededForNext: number
} {
  const eligibleItems = items.filter((i) => i.comboEligible)
  const count = eligibleItems.reduce((sum, i) => sum + i.quantity, 0)
  const remainder = count % COMBO_QTY
  const neededForNext = remainder === 0 ? COMBO_QTY : COMBO_QTY - remainder
  return { count, neededForNext }
}
```

---

## Zustand Cart Store — `src/store/cart.ts`

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types'
import { FREE_SHIPPING_THRESHOLD, getComboSavings } from '@/lib/utils'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (productId: string, color: string, size: string) => void
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  subtotal: () => number
  itemCount: () => number
  comboSavings: () => number
  shippingFee: () => number
}

const key = (productId: string, color: string, size: string) =>
  `${productId}::${color}::${size}`

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) =>
        set((state) => {
          const k = key(item.productId, item.color, item.size)
          const existing = state.items.find(
            (i) => key(i.productId, i.color, i.size) === k
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                key(i.productId, i.color, i.size) === k
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),

      removeItem: (productId, color, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => key(i.productId, i.color, i.size) !== key(productId, color, size)
          ),
        })),

      updateQuantity: (productId, color, size, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  (i) => key(i.productId, i.color, i.size) !== key(productId, color, size)
                )
              : state.items.map((i) =>
                  key(i.productId, i.color, i.size) === key(productId, color, size)
                    ? { ...i, quantity }
                    : i
                ),
        })),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      subtotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
      itemCount: () => get().items.reduce((s, i) => s + i.quantity, 0),
      comboSavings: () => getComboSavings(get().items),
      shippingFee: () =>
        get().subtotal() >= FREE_SHIPPING_THRESHOLD ? 0 : 49,
    }),
    { name: 'bewakoof-cart' }
  )
)
```

---

## ProductCard — `src/components/product/ProductCard.tsx`

```typescript
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Product } from '@/types'
import { getDiscountPercent, formatINR, PRINT_LABELS } from '@/lib/utils'
import styles from './ProductCard.module.css'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const firstColor = product.colors[0]
  const [activeColor, setActiveColor] = useState(firstColor)
  const discountPct = getDiscountPercent(product.mrp, product.price)
  const isDiscounted = discountPct > 0
  const showPrintBadge = product.printStyle !== 'solid'
  const badgeLabel =
    product.printStyle === 'licensed' && product.collection
      ? product.collection
      : PRINT_LABELS[product.printStyle]

  return (
    <div className={styles.card}>
      <Link href={`/products/${product.slug}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          {/* Print badge — only when printStyle !== 'solid' */}
          {showPrintBadge && (
            <span className={styles.printBadge}>{badgeLabel}</span>
          )}
          {/* Discount badge — only when price < mrp */}
          {isDiscounted && (
            <span className={styles.discountBadge}>{discountPct}% off</span>
          )}
          <Image
            src={activeColor.images[0]}
            alt={`${product.name} in ${activeColor.name}`}
            fill
            className={styles.image}
          />
        </div>
      </Link>

      <div className={styles.info}>
        <p className={styles.productName}>{product.name}</p>

        <div className={styles.priceRow}>
          <span className={styles.price}>{formatINR(product.price)}</span>
          {isDiscounted && (
            <>
              <span className={styles.mrp}>{formatINR(product.mrp)}</span>
              <span className={styles.discountPct}>{discountPct}% off</span>
            </>
          )}
        </div>

        {/* Coins earned */}
        <p className={styles.coins}>+ {product.coinsEarned} Coins</p>

        {/* Color dots */}
        <div className={styles.colorDots}>
          {product.colors.map((c) => (
            <button
              key={c.name}
              className={`${styles.dot} ${activeColor.name === c.name ? styles.dotActive : ''}`}
              style={{ background: c.swatch }}
              aria-label={`Select ${c.name}`}
              onClick={() => setActiveColor(c)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

## ComboProgress — `src/components/product/ComboProgress.tsx`

```typescript
'use client'
import { useCartStore } from '@/store/cart'
import { getComboProgress, COMBO_QTY, COMBO_PRICE, formatINR } from '@/lib/utils'
import styles from './ComboProgress.module.css'

export default function ComboProgress() {
  const items = useCartStore((s) => s.items)
  const { count, neededForNext } = getComboProgress(items)

  if (count === 0) {
    return (
      <div className={styles.combo}>
        <p className={styles.comboHeadline}>
          Buy {COMBO_QTY} tees for {formatINR(COMBO_PRICE)}
        </p>
        <p className={styles.comboSub}>Add {COMBO_QTY} eligible items to activate</p>
      </div>
    )
  }

  const isActive = count >= COMBO_QTY
  const progressPct = Math.min((count % COMBO_QTY || COMBO_QTY) / COMBO_QTY * 100, 100)

  return (
    <div className={styles.combo}>
      {isActive ? (
        <p className={styles.comboActive}>
          Combo active! {count} tees @ {formatINR(COMBO_PRICE)}
        </p>
      ) : (
        <p className={styles.comboHeadline}>
          Add {neededForNext} more tee{neededForNext > 1 ? 's' : ''} for combo deal
        </p>
      )}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
      </div>
    </div>
  )
}
```

---

## Mock Product Data — `src/lib/products.ts`

```typescript
import { Product, PRINT_LABELS } from '@/types'

export const products: Product[] = [
  {
    id: 'bwk-001',
    slug: 'galaxy-force-tee',
    name: 'Galaxy Force Quote Tee',
    category: 'tshirts',
    printStyle: 'licensed',
    collection: 'Star Wars',
    printDescription: 'The Dark Side Force Quote Print',
    mrp: 799,
    price: 549,
    colors: [
      { name: 'Galaxy Black', swatch: '#1a1a1a', inStock: true, sku: 'bwk-001-blk', images: ['/imgs/p1-black-1.jpg', '/imgs/p1-black-2.jpg', '/imgs/p1-black-3.jpg'] },
      { name: 'Off White', swatch: '#f5f0e8', inStock: true, sku: 'bwk-001-wht', images: ['/imgs/p1-white-1.jpg', '/imgs/p1-white-2.jpg', '/imgs/p1-white-3.jpg'] },
    ],
    sizes: [
      { size: 'XS', inStock: false },
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: false },
    ],
    comboEligible: true,
    coinsEarned: 55,
    tags: ['star-wars', 'licensed', 'black'],
  },
  {
    id: 'bwk-002',
    slug: 'minimal-slogan-tee',
    name: 'Minimal Slogan Tee',
    category: 'tshirts',
    printStyle: 'typography',
    mrp: 599,
    price: 399,
    colors: [
      { name: 'White', swatch: '#ffffff', inStock: true, sku: 'bwk-002-wht', images: ['/imgs/p2-white-1.jpg', '/imgs/p2-white-2.jpg', '/imgs/p2-white-3.jpg'] },
      { name: 'French Blue', swatch: '#4a6fa5', inStock: true, sku: 'bwk-002-blu', images: ['/imgs/p2-blue-1.jpg', '/imgs/p2-blue-2.jpg', '/imgs/p2-blue-3.jpg'] },
    ],
    sizes: [
      { size: 'S', inStock: true },
      { size: 'M', inStock: true },
      { size: 'L', inStock: true },
      { size: 'XL', inStock: true },
      { size: 'XXL', inStock: true },
    ],
    comboEligible: true,
    coinsEarned: 40,
    tags: ['minimal', 'slogan', 'blue'],
  },
  // ... 10 more products
]

export function getAllProducts(): Product[] {
  return products
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getFeaturedProducts(count = 8): Product[] {
  return products.slice(0, count)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getProductsByPrintStyle(printStyle: string): Product[] {
  return products.filter((p) => p.printStyle === printStyle)
}
```

---

## App Layout — `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import PromoBanner from '@/components/layout/PromoBanner'
import TopNav from '@/components/layout/TopNav'
import CartDrawer from '@/components/cart/CartDrawer'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bewakoof — Wear Your Vibe',
  description: 'Graphic tees, hoodies, and more — made for the bold.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <PromoBanner />
        <TopNav />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

---

## Key Architectural Rules

1. **Combo utils in `lib/utils.ts` only** — not in the store. The store calls `getComboSavings(get().items)` for display.
2. **Per-color images** — `ColorOption.images[]` changes per color. When `activeColor` changes on card or PDP, the image changes instantly (no transition).
3. **`printStyle !== 'solid'`** is the only gate for the print badge — don't use a truthy check on the label string.
4. **`coinsEarned` is read-only** — no coins store, no balance state, no "apply" action.
5. **Cart key**: `productId::color::size` — same composite key pattern as pfecomm_03.
6. **`comboEligible`** is on the `CartItem` (copied from Product at add-time) — allows `getComboSavings` to filter without needing product lookup.
