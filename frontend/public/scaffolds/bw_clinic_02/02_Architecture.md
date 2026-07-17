# 02 — Architecture
## Doctor Discovery + Booking Platform · bw_clinic_02

---

## TypeScript Schema — `src/types/index.ts`

```typescript
export type ConsultMode = 'clinic' | 'video' | 'both'

export interface Doctor {
  id: string
  name: string
  specialty: string           // "Dentist"
  qualifications: string      // "BDS, MDS (Orthodontics)"
  experience: number          // 12 → rendered as "12+ Years Experience"
  locality: string            // "Koramangala"
  city: string                // "Bangalore"
  rating: number              // 4.8
  reviewCount: number         // 1234 → "(1,234 reviews)"
  consultFee: number          // 500 → "₹500 Consultation Fee"
  availableToday: boolean
  consultMode: ConsultMode
  photo: string               // "/imgs/doctors/dr-xxx.jpg"
  verified: boolean           // true → VerifiedBadge shown
}

export interface SymptomCard {
  id: string
  label: string               // "Period doubts"
  emoji: string               // "🩺"
}

export interface SpecialtyChip {
  id: string
  label: string               // "Dentist"
  icon: string                // Lucide icon name
  doctorCount: number         // 1240 → "1,240 Doctors"
}

export interface DiscoveryCard {
  id: string
  title: string               // "Consult Doctors Online"
  description: string
  bgColor: string             // CSS class name, NOT a hex value
  href: string
}

export interface Testimonial {
  id: string
  quote: string
  patientName: string
  context: string             // "Consulted a Cardiologist in Delhi"
}
```

---

## Mock Data — `src/lib/data.ts`

```typescript
import { Doctor, SymptomCard, SpecialtyChip, DiscoveryCard, Testimonial } from '@/types'

export const doctors: Doctor[] = [
  {
    id: 'dr-kavita-sharma',
    name: 'Dr. Kavita Sharma',
    specialty: 'Dentist',
    qualifications: 'BDS, MDS (Orthodontics)',
    experience: 12,
    locality: 'Koramangala',
    city: 'Bangalore',
    rating: 4.9,
    reviewCount: 1842,
    consultFee: 500,
    availableToday: true,
    consultMode: 'both',
    photo: '/imgs/doctors/dr-kavita-sharma.jpg',
    verified: true,
  },
  {
    id: 'dr-rahul-mehta',
    name: 'Dr. Rahul Mehta',
    specialty: 'Cardiologist',
    qualifications: 'MBBS, MD (Cardiology), DM',
    experience: 18,
    locality: 'Bandra',
    city: 'Mumbai',
    rating: 4.8,
    reviewCount: 2310,
    consultFee: 1200,
    availableToday: false,
    consultMode: 'clinic',
    photo: '/imgs/doctors/dr-rahul-mehta.jpg',
    verified: true,
  },
  {
    id: 'dr-sneha-patel',
    name: 'Dr. Sneha Patel',
    specialty: 'Gynaecologist',
    qualifications: 'MBBS, MD (Obstetrics & Gynaecology)',
    experience: 14,
    locality: 'Malviya Nagar',
    city: 'Delhi',
    rating: 4.7,
    reviewCount: 987,
    consultFee: 700,
    availableToday: true,
    consultMode: 'video',
    photo: '/imgs/doctors/dr-sneha-patel.jpg',
    verified: true,
  },
  {
    id: 'dr-arun-krishnan',
    name: 'Dr. Arun Krishnan',
    specialty: 'Dermatologist',
    qualifications: 'MBBS, MD (Dermatology)',
    experience: 9,
    locality: 'Nungambakkam',
    city: 'Chennai',
    rating: 4.6,
    reviewCount: 654,
    consultFee: 600,
    availableToday: true,
    consultMode: 'both',
    photo: '/imgs/doctors/dr-arun-krishnan.jpg',
    verified: false,
  },
  {
    id: 'dr-priya-joshi',
    name: 'Dr. Priya Joshi',
    specialty: 'Paediatrician',
    qualifications: 'MBBS, DCH, MD (Paediatrics)',
    experience: 16,
    locality: 'Banjara Hills',
    city: 'Hyderabad',
    rating: 4.9,
    reviewCount: 3121,
    consultFee: 550,
    availableToday: true,
    consultMode: 'both',
    photo: '/imgs/doctors/dr-priya-joshi.jpg',
    verified: true,
  },
  {
    id: 'dr-vivek-nair',
    name: 'Dr. Vivek Nair',
    specialty: 'Orthopaedic Surgeon',
    qualifications: 'MBBS, MS (Orthopaedics)',
    experience: 20,
    locality: 'Salt Lake',
    city: 'Kolkata',
    rating: 4.7,
    reviewCount: 1456,
    consultFee: 900,
    availableToday: false,
    consultMode: 'clinic',
    photo: '/imgs/doctors/dr-vivek-nair.jpg',
    verified: true,
  },
  {
    id: 'dr-amrita-das',
    name: 'Dr. Amrita Das',
    specialty: 'Psychiatrist',
    qualifications: 'MBBS, MD (Psychiatry)',
    experience: 11,
    locality: 'Kothrud',
    city: 'Pune',
    rating: 4.8,
    reviewCount: 892,
    consultFee: 800,
    availableToday: true,
    consultMode: 'video',
    photo: '/imgs/doctors/dr-amrita-das.jpg',
    verified: true,
  },
  {
    id: 'dr-sanjay-gupta',
    name: 'Dr. Sanjay Gupta',
    specialty: 'Ophthalmologist',
    qualifications: 'MBBS, MS (Ophthalmology)',
    experience: 22,
    locality: 'Punjabi Bagh',
    city: 'Delhi',
    rating: 4.8,
    reviewCount: 1678,
    consultFee: 750,
    availableToday: false,
    consultMode: 'clinic',
    photo: '/imgs/doctors/dr-sanjay-gupta.jpg',
    verified: true,
  },
]

export const symptomCards: SymptomCard[] = [
  { id: 's1', label: 'Period doubts', emoji: '🩺' },
  { id: 's2', label: 'Child not eating', emoji: '🍼' },
  { id: 's3', label: 'Anxiety & stress', emoji: '🧠' },
  { id: 's4', label: 'Skin rash', emoji: '🔬' },
  { id: 's5', label: 'Dental pain', emoji: '🦷' },
  { id: 's6', label: 'Eye infection', emoji: '👁️' },
  { id: 's7', label: 'Cold & flu', emoji: '🤧' },
  { id: 's8', label: 'Back pain', emoji: '💊' },
]

export const specialtyChips: SpecialtyChip[] = [
  { id: 'dentist', label: 'Dentist', icon: 'Smile', doctorCount: 12400 },
  { id: 'gynaecologist', label: 'Gynaecologist', icon: 'Heart', doctorCount: 8700 },
  { id: 'dermatologist', label: 'Dermatologist', icon: 'Scan', doctorCount: 9200 },
  { id: 'cardiologist', label: 'Cardiologist', icon: 'Activity', doctorCount: 5400 },
  { id: 'orthopaedic', label: 'Orthopaedic', icon: 'Bone', doctorCount: 7100 },
  { id: 'paediatrician', label: 'Paediatrician', icon: 'Baby', doctorCount: 11000 },
  { id: 'ent', label: 'ENT', icon: 'Ear', doctorCount: 6800 },
  { id: 'ophthalmologist', label: 'Ophthalmologist', icon: 'Eye', doctorCount: 5900 },
  { id: 'psychiatrist', label: 'Psychiatrist', icon: 'Brain', doctorCount: 4200 },
  { id: 'neurologist', label: 'Neurologist', icon: 'Zap', doctorCount: 3800 },
]

export const discoveryCards: DiscoveryCard[] = [
  {
    id: 'consult-online',
    title: 'Consult Doctors Online',
    description: 'Connect with top doctors from the comfort of your home',
    bgColor: 'bg-blue',
    href: '#doctor-grid',
  },
  {
    id: 'find-doctors',
    title: 'Find Doctors Near You',
    description: 'Book in-clinic appointments with verified specialists',
    bgColor: 'bg-purple',
    href: '#doctor-grid',
  },
  {
    id: 'lab-tests',
    title: 'Book Lab Tests',
    description: 'Home sample collection from certified labs',
    bgColor: 'bg-green',
    href: '#',
  },
  {
    id: 'surgeries',
    title: 'Surgeries',
    description: 'High-quality, affordable planned surgeries near you',
    bgColor: 'bg-orange',
    href: '#',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'Found a great cardiologist in minutes. Booked a video consult the same evening and got my reports reviewed without leaving home. Saved me two days of running around.',
    patientName: 'Rohit Malhotra',
    context: 'Online Cardiology Consult, Delhi',
  },
  {
    id: 't2',
    quote: "My daughter has been seeing Dr. Priya Joshi for three years. Finding her on Practo was the best decision. The reviews were accurate and the booking was seamless.",
    patientName: 'Sudha Krishnamurthy',
    context: 'Paediatrics Clinic Visit, Hyderabad',
  },
  {
    id: 't3',
    quote: 'Consulted a dermatologist for a skin rash via video. Got a proper diagnosis and prescription in 15 minutes. The verified badge gave me confidence to trust the doctor.',
    patientName: 'Aryan Shah',
    context: 'Online Dermatology Consult, Chennai',
  },
]
```

---

## OmniSearch — `src/components/home/OmniSearch.tsx`

```typescript
'use client'
import { useState } from 'react'
import { MapPin, Search } from 'lucide-react'
import styles from './OmniSearch.module.css'

export default function OmniSearch() {
  const [locality, setLocality] = useState('')
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    document.getElementById('doctor-grid')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <form
      className={styles.widget}
      onSubmit={handleSubmit}
      role="search"
      aria-label="Find doctors by location and specialty"
    >
      <div className={styles.fields}>
        {/* Locality field */}
        <div className={styles.field}>
          <label htmlFor="locality" className="sr-only">Enter locality</label>
          <div className={styles.inputWrapper}>
            <MapPin size={16} className={styles.inputIcon} aria-hidden="true" />
            <input
              id="locality"
              type="text"
              className={styles.input}
              placeholder="Enter locality, e.g. Koramangala"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Keyword field */}
        <div className={styles.field}>
          <label htmlFor="keyword" className="sr-only">Search doctors or symptoms</label>
          <div className={styles.inputWrapper}>
            <Search size={16} className={styles.inputIcon} aria-hidden="true" />
            <input
              id="keyword"
              type="text"
              className={styles.input}
              placeholder="Search doctors, clinics, symptoms..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className={styles.submit}>
          Search
        </button>
      </div>
    </form>
  )
}
```

---

## DoctorCard — `src/components/home/DoctorCard.tsx`

```typescript
// Server component — no 'use client'
import { Star, ShieldCheck } from 'lucide-react'
import type { Doctor } from '@/types'
import Button from '@/components/ui/Button'
import styles from './DoctorCard.module.css'

interface Props { doctor: Doctor }

export default function DoctorCard({ doctor }: Props) {
  // Derive CTA flags from consultMode
  const showClinic = doctor.consultMode === 'clinic' || doctor.consultMode === 'both'
  const showVideo  = doctor.consultMode === 'video'  || doctor.consultMode === 'both'

  return (
    <article className={styles.card} aria-label={`${doctor.name}, ${doctor.specialty}`}>

      {/* Photo row */}
      <div className={styles.photoRow}>
        <img
          src={doctor.photo}
          alt={`Photo of ${doctor.name}`}
          className={styles.photo}
          width={80}
          height={80}
        />
        <div className={styles.nameBlock}>
          <div className={styles.nameRow}>
            <h3 className={styles.name}>{doctor.name}</h3>
            {doctor.verified && (
              <span className={styles.verifiedBadge} aria-label="Verified by Practo">
                <ShieldCheck size={14} aria-hidden="true" />
              </span>
            )}
          </div>
          <p className={styles.specialty}>{doctor.specialty}</p>
          <p className={styles.qualifications}>{doctor.qualifications}</p>
        </div>
      </div>

      {/* Details */}
      <div className={styles.details}>
        <p className={styles.experience}>{doctor.experience}+ Years Experience</p>
        <p className={styles.location}>{doctor.locality} · {doctor.city}</p>

        {/* Rating */}
        <div className={styles.rating} aria-label={`${doctor.rating} out of 5, ${doctor.reviewCount.toLocaleString('en-IN')} reviews`}>
          <Star size={13} className={styles.starIcon} aria-hidden="true" />
          <span className={styles.ratingValue}>{doctor.rating}</span>
          <span className={styles.ratingCount}>({doctor.reviewCount.toLocaleString('en-IN')} reviews)</span>
        </div>

        {/* Availability badge — conditionally rendered, not CSS hidden */}
        {doctor.availableToday && (
          <span className={styles.availabilityBadge} role="status" aria-label="Available today">
            <span className={styles.availabilityDot} aria-hidden="true" />
            Available Today
          </span>
        )}

        <p className={styles.fee}>₹{doctor.consultFee.toLocaleString('en-IN')} Consultation Fee</p>
      </div>

      {/* CTAs — driven entirely by consultMode */}
      <div className={styles.actions}>
        {showClinic && (
          <Button variant="primary" fullWidth href={`#book-clinic-${doctor.id}`}>
            Book Clinic Visit
          </Button>
        )}
        {showVideo && (
          <Button variant={showClinic ? 'outline' : 'primary'} fullWidth href={`#consult-online-${doctor.id}`}>
            Consult Online
          </Button>
        )}
      </div>
    </article>
  )
}
```

---

## DoctorGrid — `src/components/home/DoctorGrid.tsx`

```typescript
'use client'
import { useState, useMemo } from 'react'
import { doctors } from '@/lib/data'
import DoctorCard from './DoctorCard'
import styles from './DoctorGrid.module.css'

const SPECIALTIES = [
  'Dentist', 'Gynaecologist', 'Dermatologist', 'Cardiologist',
  'Orthopaedic Surgeon', 'Paediatrician', 'Psychiatrist', 'Ophthalmologist',
]

export default function DoctorGrid() {
  const [city, setCity] = useState('')
  const [specialty, setSpecialty] = useState('')

  const filtered = useMemo(() =>
    doctors.filter((d) =>
      d.city.toLowerCase().includes(city.toLowerCase()) &&
      (specialty === '' || d.specialty === specialty)
    ),
    [city, specialty]
  )

  return (
    <section id="doctor-grid" className={styles.section} aria-label="Doctor directory">
      <div className={styles.container}>
        <h2 className={styles.heading}>Top Doctors Near You</h2>

        {/* Filter bar */}
        <div className={styles.filterBar} role="group" aria-label="Filter doctors">
          <div className={styles.filterField}>
            <label htmlFor="city-filter" className={styles.filterLabel}>City</label>
            <input
              id="city-filter"
              type="text"
              className={styles.filterInput}
              placeholder="Enter city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-label="Filter by city"
            />
          </div>
          <div className={styles.filterField}>
            <label htmlFor="specialty-filter" className={styles.filterLabel}>Specialty</label>
            <select
              id="specialty-filter"
              className={styles.filterSelect}
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              aria-label="Filter by specialty"
            >
              <option value="">All Specialties</option>
              {SPECIALTIES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Live region */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Showing {filtered.length} doctor{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        <div className={styles.grid}>
          {filtered.map((d) => <DoctorCard key={d.id} doctor={d} />)}
        </div>

        {filtered.length === 0 && (
          <p className={styles.empty}>No doctors found. Try adjusting your filters.</p>
        )}
      </div>
    </section>
  )
}
```

---

## SpecialtyCarousel — `src/components/home/SpecialtyCarousel.tsx`

```typescript
'use client'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { specialtyChips } from '@/lib/data'
import styles from './SpecialtyCarousel.module.css'

// Dynamic icon import map
import { Smile, Heart, Scan, Activity, Bone, Baby, Ear, Eye, Brain, Zap } from 'lucide-react'
const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Smile, Heart, Scan, Activity, Bone, Baby, Ear, Eye, Brain, Zap
}

export default function SpecialtyCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return
    trackRef.current.scrollBy({ left: dir === 'right' ? 240 : -240, behavior: 'smooth' })
  }

  return (
    <section className={styles.section} aria-label="Browse by specialty">
      <div className={styles.container}>
        <h2 className={styles.heading}>Browse by Specialty</h2>

        <div className={styles.carouselWrapper}>
          <button
            className={styles.arrow}
            onClick={() => scroll('left')}
            aria-label="Scroll specialties left"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={trackRef}
            className={styles.track}
            role="list"
            aria-label="Medical specialties"
          >
            {specialtyChips.map((chip) => {
              const Icon = iconMap[chip.icon]
              return (
                <button
                  key={chip.id}
                  className={styles.chip}
                  role="listitem"
                  aria-label={`${chip.label}, ${chip.doctorCount.toLocaleString('en-IN')} doctors`}
                >
                  {Icon && <Icon size={24} aria-hidden="true" />}
                  <span className={styles.chipLabel}>{chip.label}</span>
                  <span className={styles.chipCount}>
                    {chip.doctorCount.toLocaleString('en-IN')} Doctors
                  </span>
                </button>
              )
            })}
          </div>

          <button
            className={styles.arrow}
            onClick={() => scroll('right')}
            aria-label="Scroll specialties right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
```

---

## Key Architectural Rules

1. **`OmniSearch`, `DoctorGrid`, `SpecialtyCarousel` are `'use client'`** — all other components are server-rendered
2. **`DoctorCard` is a server component** — `consultMode` CTA logic via `const showClinic = ...` (plain JS, not hooks)
3. **`border-radius: 4px` on all buttons** — `Button.module.css` hardcodes this, no prop
4. **`border-radius: 20px` on `AvailabilityBadge`** — only this element uses 20px
5. **`border-radius: 4px` on doctor photos** — `object-fit: cover`, NOT `50%`
6. **Cyan buttons: `color: var(--color-navy)`** — never `var(--color-white)`; enforced in `Button.module.css` `.primary` rule
7. **`availableToday: false` → badge not rendered** — conditional JSX, not `display: none`
8. **`consultMode` CTA logic** — `showClinic` and `showVideo` booleans derived once at top of DoctorCard; no switch statement needed
9. **`box-shadow` only on OmniSearch widget** — `OmniSearch.module.css` is the only module file with shadow; all card modules use border only
10. **`useMemo` on both DoctorGrid filters** — applied in a single `.filter()` call, not chained
11. **Lato weight 700 only for headings** — no 600, no 800; enforce in layout.tsx font config
12. **No NABH/JCI** — `accreditations` array does not exist in this project; `VerifiedBadge` is per-doctor only
