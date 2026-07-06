// ─── Context Expander Dictionaries ────────────────────────────────────────────
// All term → rich description mappings. No API calls — pure lookup.

export const LIGHTING: Record<string, string> = {
  "window light":   "natural window key light, 4×5ft north-facing aperture, 5600K daylight, camera-left 30° incidence, soft diffused key with gentle roll-off shadow, 4:1 key-to-fill ratio",
  "golden hour":    "late afternoon golden hour sunlight, 3100-3400K, low 15° horizon angle, warm amber cast, long directional shadows, gentle rim separation on subject edges",
  "studio":         "professional studio strobe, 5600K, 45° above camera-right, 90cm octabox key light, silver reflector fill camera-left, clean defined shadows at 5:1 ratio",
  "ring light":     "ring flash on-axis, 5600K, circular catchlight in both eyes, flat even shadowless illumination, beauty-dish effect, slight fill falloff at ear level",
  "morning light":  "early morning directional sunlight, 5200-5500K, low 20° angle, soft golden warmth, long gentle shadows, slight atmospheric haze",
  "blue hour":      "civil twilight blue hour, 8000-10000K, ambient skylight only, soft even directionless fill, muted shadows, subtle cyan-blue cast",
  "overcast":       "overcast diffused daylight, 6500K, full cloud-cover softbox, omnidirectional even fill, soft shadow feather, low contrast 2:1 ratio",
  "candlelight":    "warm candlelight, 1800-2200K, close source 30cm from subject, strong warm amber cast, deep shadow falloff, high contrast 8:1, flickering quality",
  "neon":           "urban neon ambient, mixed 3200K-5600K, magenta/cyan/amber sources, directional colour spill, dramatic shadow mix, cyberpunk split-tone",
  "rembrandt":      "Rembrandt portrait lighting, 5200K, 45° above camera-left, triangle catchlight on shadow-side cheek, dramatic 6:1 key-to-fill, deep shadow on non-key side",
  "flat":           "flat even documentation lighting, 5500K, museum copy-stand illumination, 90° overhead elevation, zero shadow falloff, archival neutral presentation",
  "backlight":      "strong backlight at 180° behind subject, 5600K, rim halo separation on hair and shoulders, silhouette body fill by reflector at 1:8 ratio",
  "dramatic":       "dramatic single-source hard key, 5600K, 70° above camera-right, no fill, deep shadow side, high contrast 8:1, chiaroscuro effect",
  "soft":           "large format softbox key, 5200K, 90cm×120cm diffusion, camera-right 30°, 3:1 key-to-fill ratio, gentle gradual shadow feather",
}

export const CAMERA: Record<string, string> = {
  "portrait":       "Sony A7R V full-frame sensor, Canon EF 85mm f/1.4L lens, f/2.0 aperture, 1/160s, ISO 100, tripod-mounted, 5° above eye level, background subject separation 3m",
  "close-up":       "Sony A7R V, 100mm macro lens, f/2.8, shallow depth of field, extreme subject detail, blurred background, eye-level perspective",
  "environmental":  "Sony A7R V, 35mm f/1.8 lens, f/5.6, subject in environmental context, medium depth of field, chest-up framing with surroundings visible",
  "wide":           "Sony A7R V, 24mm wide angle, f/8, deep field sharpness, full environment context, low perspective 3° below eye level",
  "editorial":      "Canon EOS R5, 85mm f/1.2L, f/2.0, editorial portrait distance 1.5m, subject fills 60% of frame, magazine-format vertical",
  "product":        "Canon EOS R5, 100mm macro, f/11, fully sharp product detail, studio copy-stand perpendicular, subject fills 75% of frame",
  "fashion":        "Hasselblad H6D-100c medium format, 110mm f/2.2, f/4, editorial fashion distance 2m, full-length or 3/4 length framing",
  "chest-up":       "Sony A7R V, 85mm, f/1.8, chest-and-above framing, subject at 1.2m distance, eyes at upper-third of frame",
  "head-and-shoulders": "Sony A7R V, 85mm, f/1.4, tight head-and-shoulders crop, eyes sharp, shallow background separation, 1m subject distance",
  "full-length":    "Sony A7R V, 35mm, f/5.6, full head-to-toe framing, subject at 3m distance, environment partially visible",
}

export const SUBJECT_PEOPLE: Record<string, string> = {
  "software engineer": "male software engineer, early 30s, lean build, short dark hair, minimal grooming, focused intelligent expression, casual-professional attire",
  "tech founder":      "tech founder, 35-45 years old, confident composed posture, business casual — open-collar shirt, dark trousers, no tie, minimal accessories",
  "fashion model":     "professional editorial fashion model, 20s, lean physique, high cheekbones, neutral poised expression, designer wardrobe",
  "executive":         "corporate executive, 40s, authoritative posture, tailored business suit, power-dress attire, calm commanding expression",
  "artist":            "contemporary visual artist, 20s-30s, creative expressive style, paint-stained attire or eclectic wardrobe, authentic natural expression",
  "doctor":            "medical professional, 30s-40s, white coat over scrubs or business attire, stethoscope, composed authoritative expression",
  "musician":          "musician, 20s-30s, expressive posture, eclectic stage-ready attire, instrument accessory or music environment context",
  "athlete":           "professional athlete, lean muscular build, athletic performance wear, dynamic confident posture, focused competitive expression",
  "chef":              "executive chef, white chef's coat, toque or no hat, confident kitchen environment, hands-on working pose or authoritative crossed-arms",
  "entrepreneur":      "young entrepreneur, late 20s-mid 30s, sharp business casual, modern office or co-working environment, ambitious determined expression",
  "bedouin":           "traditional Bedouin man, 40s-60s, deep-set weathered features, flowing white or cream thobe, keffiyeh with agal, desert or tent setting",
  "andean":            "Andean indigenous woman, traditional woven pollera skirt and aguayo shawl, embroidered blouse, bowler hat, Altiplano or market setting",
}

export const SETTING: Record<string, string> = {
  "modern office":    "clean modern open-plan office, floor-to-ceiling glass windows with city view, polished concrete floor, Scandinavian furniture, natural daylight",
  "home office":      "warm home office, oak bookshelves filled with technical books, dual-monitor setup, mid-century desk, warm tungsten table lamp accent",
  "urban street":     "city street environment, rain-slicked pavement, warm shopfront bokeh in background, contemporary urban architecture, evening blue hour",
  "studio":           "professional photography studio, seamless grey-white backdrop, controlled lighting environment, clean minimal aesthetic",
  "workspace":        "creative workspace, exposed brick wall, large industrial windows with natural light, desk with laptop and coffee, warm ambient lighting",
  "nature":           "natural outdoor environment, soft dappled forest light, green foliage background, earthy tones, late afternoon golden atmosphere",
  "luxury interior":  "high-end luxury interior, marble surfaces, brass fixtures, floor-to-ceiling drapes, warm candlelight accent, aspirational lifestyle aesthetic",
  "rooftop":          "urban rooftop environment, city skyline in background, sunset atmosphere, architectural concrete and steel, contemporary composition",
  "library":          "academic library, floor-to-ceiling bookshelves, leather reading chair, warm incandescent reading light, scholarly atmosphere",
  "cafe":             "artisan coffee shop, exposed brick, reclaimed wood tables, steam rising from espresso machine, warm ambient tungsten, creative community feel",
  "desert":           "arid desert environment, golden sand dunes, clear blue sky, harsh midday sun or warm sunset, minimal sparse landscape, vast negative space",
  "market":           "traditional open-air market, colourful textile stalls, local artisan goods, warm equatorial light, authentic cultural environment",
}

export const WARDROBE: Record<string, string> = {
  "business suit":      "charcoal grey fine-wool single-breasted two-button suit, white poplin dress shirt, silk repp tie in navy/burgundy, black Oxford shoes, subtle pocket square",
  "business casual":    "navy slim-fit chinos, white or light-blue Oxford shirt — two buttons open, no tie, brown leather belt, leather loafers or clean white sneakers",
  "casual":             "slim-fit dark denim jeans, solid crew-neck t-shirt or casual button-down, clean white trainers, minimal accessories",
  "smart casual":       "dark slim chinos, fitted merino polo or open-collar linen shirt, clean leather sneakers or loafers, minimal watch",
  "hoodie":             "premium heavyweight cotton hoodie, slim-fit dark jeans or joggers, minimal colour palette — charcoal or navy, clean white sneakers",
  "creative":           "eclectic mix-and-match separates, statement jacket or accessory, layered textures, fashion-forward contemporary pieces",
  "formal":             "full black tie or morning suit, structured tailoring, high-shine Oxford shoes, white dress shirt and bow tie or cravat",
  "streetwear":         "oversized graphic hoodie, relaxed cargo pants, high-top trainers, cap, accessories — chain or watch",
  "traditional":        "culturally authentic traditional dress — hand-embroidered garments, natural fabric, traditional accessories and headwear",
  "athletic":           "performance athletic wear — moisture-wicking compression base layer, training shorts or leggings, performance trainers",
}

export const HAND_POSITION: Record<string, string> = {
  // Explicit lock strings — these are inserted verbatim into the HAND lock
  "at sides":           "both hands relaxed naturally at sides, fingers slightly curled, arms hanging loosely — no pockets, no crossed arms",
  "pant pocket right":  "right hand in RIGHT TROUSER SIDE POCKET ONLY (the slanted pocket on the right hip of the trousers/pants, NOT the jacket pocket), thumb hooked over pocket seam, four fingers inside — left hand hanging naturally at left side",
  "pant pocket both":   "both hands in TROUSER SIDE POCKETS (both hip pockets of the trousers/pants, NOT jacket pockets), thumbs hooked over pocket seams — this is a trouser-pocket pose, NOT jacket-pocket",
  "jacket pocket":      "right hand in RIGHT JACKET SIDE POCKET (hip-level pocket of the blazer/coat, NOT trouser pocket), relaxed natural grip — left hand at side",
  "arms crossed":       "arms loosely folded across chest, forearms parallel, fingers lightly gripping opposite arm — confident relaxed crossed-arm stance",
  "hands clasped":      "hands clasped together in front at waist level, fingers interlaced, natural relaxed grip",
  "one in pocket":      "right hand in right trouser/pant side pocket — NOT jacket pocket — left hand relaxed at side",
  "on keyboard":        "hands naturally positioned on keyboard or desk surface, typing or resting pose, relaxed working position",
  "holding object":     "one hand naturally holding relevant prop or object at mid-frame level, other hand relaxed at side",
  "prayer":             "hands pressed together in prayer/namaste position at chest level, fingers pointing upward, thumbs touching sternum",
}

export const STYLE_PHOTO: Record<string, string> = {
  "editorial":      "editorial portrait, magazine-quality, narrative-driven composition, intentional styling, professional colour grade",
  "documentary":    "documentary photography style, candid authentic moment, journalistic framing, natural light, minimal post-processing",
  "fashion":        "high fashion editorial, commercial fashion photography, aspirational lifestyle, precise styling, luxury aesthetic",
  "commercial":     "commercial photography, brand-ready output, clean professional execution, neutral versatile background",
  "cinematic":      "cinematic still photography, film-quality colour grade, dramatic contrast, anamorphic-lens aesthetic, widescreen composition",
  "fine art":       "fine art portrait photography, gallery-quality output, intentional artistic statement, studied composition",
  "lifestyle":      "lifestyle photography, natural authentic feel, relatable real-world environment, warm approachable mood",
  "product":        "commercial product photography, studio-precise lighting, clean background, every detail rendered sharp",
}

export const PALETTE: Record<string, string> = {
  "neutral":    "warm neutral palette — charcoal #3D3D3D 30%, warm white #F5F0EB 25%, stone grey #8A8A8A 20%, muted brown #7B6152 15%, off-white #FAF7F2 10%",
  "cool":       "cool contemporary palette — navy #1B2A4A 30%, cool grey #6B7A8D 25%, silver #C0C4CC 20%, off-white #F0F2F5 15%, charcoal #2C3E50 10%",
  "warm":       "warm editorial palette — deep burgundy #5C1A1A 25%, amber #C97C2A 20%, ivory #F5E6D3 25%, warm brown #7B5230 20%, cream #FAF4EA 10%",
  "monochrome": "sophisticated monochrome — pure black #0A0A0A 30%, charcoal #3D3D3D 25%, mid-grey #8A8A8A 20%, silver-grey #C4C4C4 15%, near-white #F5F5F5 10%",
  "dark":       "dark atmospheric palette — near-black #121212 35%, dark charcoal #2A2A2A 25%, deep grey #4A4A4A 20%, muted slate #7A7A8A 15%, accent #E8E8E8 5%",
  "vibrant":    "vibrant commercial palette — deep navy #0A1628 30%, electric blue #0066CC 20%, warm white #FFFFFF 25%, accent gold #D4AF37 15%, charcoal #3D3D3D 10%",
}

// ─── Default lock values per category ────────────────────────────────────────

export const LOCK_DEFAULTS: Record<string, {
  facingAngle: number; headAngle: number; symmetry: number;
  primaryX: number; primaryY: number;
  border: number; negativeSpace: number;
  colorTemp: number; lightAltitude: number; lightAzimuth: number;
  shadowFeather: number; contrast: string; specular: number;
  ar: string;
}> = {
  people: {
    facingAngle: 20, headAngle: 12, symmetry: 10,
    primaryX: 0.50, primaryY: 0.45,
    border: 5, negativeSpace: 22,
    colorTemp: 5600, lightAltitude: 45, lightAzimuth: 35,
    shadowFeather: 55, contrast: "4.5:1", specular: 60,
    ar: "2:3",
  },
  fashion: {
    facingAngle: 15, headAngle: 8, symmetry: 8,
    primaryX: 0.50, primaryY: 0.50,
    border: 4, negativeSpace: 25,
    colorTemp: 5600, lightAltitude: 50, lightAzimuth: 30,
    shadowFeather: 45, contrast: "5:1", specular: 55,
    ar: "2:3",
  },
  product: {
    facingAngle: 25, headAngle: 0, symmetry: 5,
    primaryX: 0.50, primaryY: 0.50,
    border: 8, negativeSpace: 30,
    colorTemp: 5500, lightAltitude: 55, lightAzimuth: 40,
    shadowFeather: 40, contrast: "3.5:1", specular: 40,
    ar: "1:1",
  },
  art: {
    facingAngle: 30, headAngle: 15, symmetry: 12,
    primaryX: 0.48, primaryY: 0.52,
    border: 6, negativeSpace: 20,
    colorTemp: 5200, lightAltitude: 60, lightAzimuth: 45,
    shadowFeather: 50, contrast: "4:1", specular: 65,
    ar: "4:5",
  },
  social: {
    facingAngle: 18, headAngle: 10, symmetry: 8,
    primaryX: 0.50, primaryY: 0.45,
    border: 4, negativeSpace: 20,
    colorTemp: 5800, lightAltitude: 40, lightAzimuth: 35,
    shadowFeather: 60, contrast: "3:1", specular: 70,
    ar: "1:1",
  },
}

// ─── Negative lock defaults per category ─────────────────────────────────────

export const NEGATIVE_LOCKS: Record<string, string[]> = {
  people: [
    "No plastic or waxy skin texture",
    "No distorted or extra fingers — EXACTLY five fingers per hand",
    "No AI artifacts or digital manipulation tells",
    "No cropped or cut-off extremities at frame edges",
    "No floating or disconnected limbs",
    "No overexposed background blow-out",
    "No mismatched pocket types — if hands are in trouser pockets stay in trouser pockets",
    "No lens flare or chromatic aberration",
    "No unnatural body proportions",
    "No duplicate facial features",
  ],
  fashion: [
    "No distorted garment seams or impossible fabric drape",
    "No floating or extra fingers",
    "No logo-covered or branded garments unless specified",
    "No wardrobe malfunctions or unintended styling errors",
    "No AI artifacts or unrealistic texture rendering",
    "No skin blemishes or retouching artifacts",
  ],
  product: [
    "No warped geometry or impossible product angles",
    "No floating or levitating product",
    "No text unless specified — no labels, no logos unless client-required",
    "No unrealistic reflections or phantom light sources",
    "No dust particles or surface contamination",
    "No background distractions",
  ],
  art: [
    "No photorealistic rendering if artistic medium",
    "No anachronistic modern elements unless intentional",
    "No low-quality digital artifacts",
    "No muddy palette or oversaturated colours",
  ],
  social: [
    "No text overlay unless specified",
    "No cluttered composition",
    "No dull or flat lighting",
    "No AI-tell artifacts",
  ],
}
