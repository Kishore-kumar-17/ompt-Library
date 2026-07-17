# 02 — Architecture
## Indian Hospital Network · bw_clinic_01

---

## TypeScript Schema — `src/types/index.ts`

```typescript
export type City =
  | 'chennai' | 'hyderabad' | 'bangalore' | 'delhi' | 'mumbai' | 'pune' | 'kolkata'

export type Specialty =
  | 'cardiology' | 'oncology' | 'neurology' | 'orthopedics'
  | 'gastroenterology' | 'nephrology' | 'pulmonology' | 'dermatology'
  | 'pediatrics' | 'gynecology' | 'ophthalmology' | 'ent'

export interface Doctor {
  id: string
  name: string            // "Dr. Ramesh Kumar"
  title: string           // "Senior Consultant — Cardiology"
  qualifications: string  // "MBBS, MD, DM (Cardiology)"
  specialty: Specialty
  experience: number      // 25 — rendered as "25+ Years Experience"
  hospital: string        // "Apollo Hospitals, Chennai"
  city: City
  rating: number          // 4.8
  reviewCount: number     // 2341 — rendered as "(2,341 reviews)"
  consultFee: number      // 800 — rendered as "₹800 Consult Fee"
  videoConsult: boolean   // true → "Video Consult" CTA shown
  photo: string           // "/imgs/doctors/ramesh-kumar.jpg"
}

export interface SpecialtyCard {
  id: Specialty
  label: string           // "Cardiology"
  icon: string            // Lucide icon name: "Heart", "Brain", "Bone", etc.
  doctorCount: number     // 142
}

export interface HealthPackage {
  id: string
  name: string            // "Comprehensive Health Checkup"
  originalPrice: number   // 3500
  discountedPrice: number // 2499
  testCount: number       // 68 — rendered as "68 Tests Included"
  popular: boolean
  features: string[]      // max 4
}

export interface Stat {
  value: string           // "5,000+"
  label: string           // "Specialist Doctors"
  icon: string            // Lucide icon name
}

export interface Testimonial {
  id: string
  name: string
  treatment: string       // "Cardiac Bypass Surgery, Chennai"
  rating: 5
  quote: string
}

export interface AccreditationBadge {
  id: string
  name: string            // "NABH" | "JCI"
  fullName: string        // "National Accreditation Board for Hospitals"
  icon: string            // image path
}
```

---

## Mock Data — `src/lib/data.ts`

```typescript
import {
  Doctor, SpecialtyCard, HealthPackage, Stat, Testimonial, AccreditationBadge
} from '@/types'

export const doctors: Doctor[] = [
  {
    id: 'dr-ramesh-kumar',
    name: 'Dr. Ramesh Kumar',
    title: 'Senior Consultant — Cardiology',
    qualifications: 'MBBS, MD, DM (Cardiology)',
    specialty: 'cardiology',
    experience: 25,
    hospital: 'Apollo Hospitals, Chennai',
    city: 'chennai',
    rating: 4.8,
    reviewCount: 2341,
    consultFee: 800,
    videoConsult: true,
    photo: '/imgs/doctors/dr-ramesh-kumar.jpg',
  },
  {
    id: 'dr-priya-nair',
    name: 'Dr. Priya Nair',
    title: 'Director — Oncology',
    qualifications: 'MBBS, MD, DM (Medical Oncology)',
    specialty: 'oncology',
    experience: 20,
    hospital: 'Apollo Hospitals, Bangalore',
    city: 'bangalore',
    rating: 4.9,
    reviewCount: 1876,
    consultFee: 1000,
    videoConsult: true,
    photo: '/imgs/doctors/dr-priya-nair.jpg',
  },
  {
    id: 'dr-arjun-mehta',
    name: 'Dr. Arjun Mehta',
    title: 'Consultant — Neurology',
    qualifications: 'MBBS, MD (Neurology), DM',
    specialty: 'neurology',
    experience: 18,
    hospital: 'Indraprastha Apollo, Delhi',
    city: 'delhi',
    rating: 4.7,
    reviewCount: 1124,
    consultFee: 900,
    videoConsult: false,
    photo: '/imgs/doctors/dr-arjun-mehta.jpg',
  },
  {
    id: 'dr-sunita-rao',
    name: 'Dr. Sunita Rao',
    title: 'Sr. Consultant — Orthopedics',
    qualifications: 'MBBS, MS (Ortho), FRCS',
    specialty: 'orthopedics',
    experience: 22,
    hospital: 'Apollo Hospitals, Hyderabad',
    city: 'hyderabad',
    rating: 4.8,
    reviewCount: 1980,
    consultFee: 750,
    videoConsult: true,
    photo: '/imgs/doctors/dr-sunita-rao.jpg',
  },
  {
    id: 'dr-karthik-iyer',
    name: 'Dr. Karthik Iyer',
    title: 'Consultant — Gastroenterology',
    qualifications: 'MBBS, MD, DM (Gastro)',
    specialty: 'gastroenterology',
    experience: 15,
    hospital: 'Apollo Hospitals, Chennai',
    city: 'chennai',
    rating: 4.6,
    reviewCount: 892,
    consultFee: 700,
    videoConsult: true,
    photo: '/imgs/doctors/dr-karthik-iyer.jpg',
  },
  {
    id: 'dr-meena-pillai',
    name: 'Dr. Meena Pillai',
    title: 'Director — Gynecology & Obstetrics',
    qualifications: 'MBBS, MD (OBG), FRCOG',
    specialty: 'gynecology',
    experience: 28,
    hospital: 'Apollo Hospitals, Mumbai',
    city: 'mumbai',
    rating: 4.9,
    reviewCount: 3120,
    consultFee: 850,
    videoConsult: true,
    photo: '/imgs/doctors/dr-meena-pillai.jpg',
  },
  {
    id: 'dr-rajan-sharma',
    name: 'Dr. Rajan Sharma',
    title: 'Consultant — Pulmonology',
    qualifications: 'MBBS, MD (Pulmonology)',
    specialty: 'pulmonology',
    experience: 14,
    hospital: 'Apollo Hospitals, Pune',
    city: 'pune',
    rating: 4.7,
    reviewCount: 645,
    consultFee: 650,
    videoConsult: false,
    photo: '/imgs/doctors/dr-rajan-sharma.jpg',
  },
  {
    id: 'dr-ananya-das',
    name: 'Dr. Ananya Das',
    title: 'Senior Consultant — Pediatrics',
    qualifications: 'MBBS, MD (Paediatrics), DCH',
    specialty: 'pediatrics',
    experience: 17,
    hospital: 'Apollo Gleneagles, Kolkata',
    city: 'kolkata',
    rating: 4.8,
    reviewCount: 2240,
    consultFee: 600,
    videoConsult: true,
    photo: '/imgs/doctors/dr-ananya-das.jpg',
  },
]

export const specialtyCards: SpecialtyCard[] = [
  { id: 'cardiology', label: 'Cardiology', icon: 'Heart', doctorCount: 142 },
  { id: 'oncology', label: 'Oncology', icon: 'Microscope', doctorCount: 98 },
  { id: 'neurology', label: 'Neurology', icon: 'Brain', doctorCount: 87 },
  { id: 'orthopedics', label: 'Orthopedics', icon: 'Bone', doctorCount: 124 },
  { id: 'gastroenterology', label: 'Gastroenterology', icon: 'Activity', doctorCount: 76 },
  { id: 'nephrology', label: 'Nephrology', icon: 'Droplets', doctorCount: 54 },
  { id: 'pulmonology', label: 'Pulmonology', icon: 'Wind', doctorCount: 61 },
  { id: 'dermatology', label: 'Dermatology', icon: 'Scan', doctorCount: 89 },
  { id: 'pediatrics', label: 'Pediatrics', icon: 'Baby', doctorCount: 115 },
  { id: 'gynecology', label: 'Gynecology', icon: 'Circle', doctorCount: 93 },
  { id: 'ophthalmology', label: 'Ophthalmology', icon: 'Eye', doctorCount: 72 },
  { id: 'ent', label: 'ENT', icon: 'Ear', doctorCount: 58 },
]

export const healthPackages: HealthPackage[] = [
  {
    id: 'essential',
    name: 'Essential Health Checkup',
    originalPrice: 1999,
    discountedPrice: 1299,
    testCount: 38,
    popular: false,
    features: [
      'Complete Blood Count (CBC)',
      'Blood Sugar (Fasting + PP)',
      'Lipid Profile',
      'Kidney & Liver Function Tests',
    ],
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive Health Checkup',
    originalPrice: 3500,
    discountedPrice: 2499,
    testCount: 68,
    popular: true,
    features: [
      'All Essential tests included',
      'Thyroid profile (T3, T4, TSH)',
      'Cardiac risk markers',
      'Chest X-ray + ECG',
    ],
  },
  {
    id: 'fullbody',
    name: 'Full Body Executive Checkup',
    originalPrice: 6500,
    discountedPrice: 4999,
    testCount: 112,
    popular: false,
    features: [
      'All Comprehensive tests included',
      'Cancer markers (CEA, CA-125, PSA)',
      'Whole body ultrasound',
      'Physician consultation included',
    ],
  },
]

export const stats: Stat[] = [
  { value: '5,000+', label: 'Specialist Doctors', icon: 'UserCheck' },
  { value: '72', label: 'Medical Specialties', icon: 'Stethoscope' },
  { value: '40+', label: 'Hospitals Across India', icon: 'Building2' },
  { value: '30M+', label: 'Patients Treated', icon: 'Heart' },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Rajesh Varma',
    treatment: 'Cardiac Bypass Surgery, Chennai',
    rating: 5,
    quote:
      'Dr. Ramesh Kumar and his team gave me a second chance at life. From diagnosis to post-surgery care, every step was handled with precision and warmth. I\'m back to cycling after 8 months.',
  },
  {
    id: 't2',
    name: 'Deepa Krishnamurthy',
    treatment: 'Cancer Treatment, Bangalore',
    rating: 5,
    quote:
      'Dr. Priya Nair\'s expertise and the oncology team\'s dedication saw me through 6 months of chemotherapy. The support staff made an incredibly difficult time as comfortable as possible.',
  },
  {
    id: 't3',
    name: 'Anand Seshadri',
    treatment: 'Hip Replacement, Hyderabad',
    rating: 5,
    quote:
      'At 67, I was told I\'d need a cane for life. Dr. Sunita Rao\'s minimally invasive hip replacement changed that. I walked unassisted at 6 weeks and played tennis at 4 months.',
  },
]

export const accreditations: AccreditationBadge[] = [
  {
    id: 'nabh',
    name: 'NABH',
    fullName: 'National Accreditation Board for Hospitals',
    icon: '/imgs/certs/nabh.svg',
  },
  {
    id: 'jci',
    name: 'JCI',
    fullName: 'Joint Commission International',
    icon: '/imgs/certs/jci.svg',
  },
]
```

---

## BookingWidget — `src/components/home/BookingWidget.tsx`

```typescript
'use client'
import { useState } from 'react'
import type { City, Specialty } from '@/types'
import styles from './BookingWidget.module.css'

const CITIES: { value: City; label: string }[] = [
  { value: 'chennai', label: 'Chennai' },
  { value: 'hyderabad', label: 'Hyderabad' },
  { value: 'bangalore', label: 'Bangalore' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'pune', label: 'Pune' },
  { value: 'kolkata', label: 'Kolkata' },
]

const SPECIALTIES: { value: Specialty; label: string }[] = [
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'oncology', label: 'Oncology' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'orthopedics', label: 'Orthopedics' },
  { value: 'gastroenterology', label: 'Gastroenterology' },
  { value: 'nephrology', label: 'Nephrology' },
  { value: 'pulmonology', label: 'Pulmonology' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'gynecology', label: 'Gynecology' },
  { value: 'ophthalmology', label: 'Ophthalmology' },
  { value: 'ent', label: 'ENT' },
]

export default function BookingWidget() {
  const [city, setCity] = useState<City | ''>('')
  const [specialty, setSpecialty] = useState<Specialty | ''>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Scroll to DoctorDirectory and apply filters via URL params
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (specialty) params.set('specialty', specialty)
    const section = document.getElementById('doctor-directory')
    if (section) section.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <form className={styles.widget} onSubmit={handleSubmit} role="search" aria-label="Find doctors">
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="city-select" className={styles.label}>Select City</label>
          <select
            id="city-select"
            className={styles.select}
            value={city}
            onChange={(e) => setCity(e.target.value as City)}
          >
            <option value="">All Cities</option>
            {CITIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="specialty-select" className={styles.label}>Select Specialty</label>
          <select
            id="specialty-select"
            className={styles.select}
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value as Specialty)}
          >
            <option value="">All Specialties</option>
            {SPECIALTIES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.submit}>
          Find Doctors
        </button>
      </div>
    </form>
  )
}
```

---

## DoctorDirectory — `src/components/home/DoctorDirectory.tsx`

```typescript
'use client'
import { useState, useMemo } from 'react'
import { doctors } from '@/lib/data'
import type { City, Specialty } from '@/types'
import DoctorCard from './DoctorCard'
import styles from './DoctorDirectory.module.css'

export default function DoctorDirectory() {
  const [city, setCity] = useState<City | 'all'>('all')
  const [specialty, setSpecialty] = useState<Specialty | 'all'>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() =>
    doctors.filter((d) =>
      (city === 'all' || d.city === city) &&
      (specialty === 'all' || d.specialty === specialty) &&
      d.name.toLowerCase().includes(query.toLowerCase())
    ),
    [city, specialty, query]
  )

  return (
    <section id="doctor-directory" className={styles.section} aria-label="Doctor directory">
      {/* Filter bar */}
      <div className={styles.filterBar} role="group" aria-label="Filter doctors">
        <select
          className={styles.filter}
          value={city}
          onChange={(e) => setCity(e.target.value as City | 'all')}
          aria-label="Filter by city"
        >
          <option value="all">All Cities</option>
          {/* CITIES options */}
        </select>

        <select
          className={styles.filter}
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value as Specialty | 'all')}
          aria-label="Filter by specialty"
        >
          <option value="all">All Specialties</option>
          {/* SPECIALTIES options */}
        </select>

        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search doctor name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search by doctor name"
        />
      </div>

      {/* Live region for filter result count */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {filtered.length} doctor{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Doctor card grid */}
      <div className={styles.grid}>
        {filtered.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className={styles.empty}>
          No doctors found matching your filters. Try adjusting your search.
        </p>
      )}
    </section>
  )
}
```

---

## DoctorCard — `src/components/home/DoctorCard.tsx`

```typescript
// Server component — no 'use client'
import { Star, Video } from 'lucide-react'
import type { Doctor } from '@/types'
import Button from '@/components/ui/Button'
import styles from './DoctorCard.module.css'

interface Props {
  doctor: Doctor
}

export default function DoctorCard({ doctor }: Props) {
  return (
    <article className={styles.card} aria-label={`Dr. ${doctor.name}, ${doctor.title}`}>
      {/* Circular photo */}
      <div className={styles.photoWrapper}>
        <img
          src={doctor.photo}
          alt={`Photo of ${doctor.name}`}
          className={styles.photo}
          width={96}
          height={96}
        />
      </div>

      {/* Info */}
      <div className={styles.info}>
        <h3 className={styles.name}>{doctor.name}</h3>
        <p className={styles.title}>{doctor.title}</p>
        <p className={styles.qualifications}>{doctor.qualifications}</p>
        <p className={styles.experience}>{doctor.experience}+ Years Experience</p>

        {/* Rating */}
        <div className={styles.rating} aria-label={`Rated ${doctor.rating} out of 5, ${doctor.reviewCount.toLocaleString('en-IN')} reviews`}>
          <Star size={14} className={styles.starIcon} aria-hidden="true" />
          <span className={styles.ratingValue}>{doctor.rating}</span>
          <span className={styles.ratingCount}>
            ({doctor.reviewCount.toLocaleString('en-IN')} reviews)
          </span>
        </div>

        <p className={styles.hospital}>{doctor.hospital}</p>
        <p className={styles.fee}>₹{doctor.consultFee.toLocaleString('en-IN')} Consult Fee</p>
      </div>

      {/* CTAs — always at least "Book Appointment" */}
      <div className={styles.actions}>
        <Button variant="primary" fullWidth href={`#book-${doctor.id}`}>
          Book Appointment
        </Button>
        {doctor.videoConsult && (
          <Button variant="secondary" fullWidth href={`#video-${doctor.id}`}>
            <Video size={16} aria-hidden="true" />
            Video Consult
          </Button>
        )}
      </div>
    </article>
  )
}
```

---

## Key Architectural Rules

1. **`BookingWidget` and `DoctorDirectory` are `'use client'`** — they manage dropdown state; all other components are server-rendered
2. **`DoctorCard` is a server component** — static display, no interactivity
3. **`border-radius: 8px` on all buttons** — hardcoded in `Button.module.css`, not configurable
4. **Doctor photo `border-radius: 50%`** — circular crop; `object-fit: cover` required to prevent squishing
5. **Gold never as text on white** — gold is `--color-gold` and used only for: `Star` icon fill, badge backgrounds, footer link hover
6. **Star icon is Lucide `Star` component** — not emoji, not unicode; `fill: currentColor` in CSS
7. **`useMemo` on doctor filter** — prevents re-computation on every render; all 3 criteria applied simultaneously
8. **ARIA live region** — `aria-live="polite"` announces result count change to screen readers
9. **`videoConsult: false` → no Video CTA rendered** — not hidden with CSS; conditionally not rendered
10. **Both NABH + JCI badges required** — render both from `accreditations` array; remove neither
11. **Emergency link: always red `#DC2626`** — inline style or a non-token CSS class to avoid token pollution; this is a one-off safety color
12. **HealthPackage uses `<del>` for original price** — same pattern as bw_legal_04; semantic accessibility
