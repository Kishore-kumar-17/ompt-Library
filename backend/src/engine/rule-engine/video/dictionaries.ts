// ─── Motion Formula v1.0 — Dictionaries ────────────────────────────────────────
// Term → rich cinematographic description. No API calls — pure lookup.

export const CAMERA_MOVE: Record<string, string> = {
  "dolly in":       "slow dolly-in on a smooth track, steady constant speed, tightening from establishing to medium framing over the full clip",
  "dolly out":      "slow dolly-out on a smooth track, steady constant speed, opening from medium to wide framing to reveal environment",
  "truck left":     "camera trucks laterally left at a constant walking pace, subject held in consistent frame position, parallax reveal of background",
  "truck right":    "camera trucks laterally right at a constant walking pace, subject held in consistent frame position, parallax reveal of background",
  "pan":            "static tripod position, smooth horizontal pan following the subject's movement, consistent angular velocity, no jitter",
  "tilt up":        "static tripod position, smooth tilt upward revealing scale and vertical context, slow constant angular speed",
  "tilt down":      "static tripod position, smooth tilt downward from wide establishing to grounded detail, slow constant angular speed",
  "crane up":       "crane/jib rising vertically while camera holds subject in frame, elevation reveal of full environment, smooth constant lift",
  "crane down":     "crane/jib descending from an elevated establishing view down to eye-level with the subject, smooth constant descent",
  "arc":            "camera arcs in a continuous curved path around the subject at a fixed radius, subject remains centered throughout the arc",
  "orbit":          "full 360-degree orbit around the subject at a fixed radius and height, constant angular speed, subject stays centered",
  "static":         "locked-off static camera, zero movement, all motion comes from the subject and environment within the frame",
  "handheld":       "handheld camera with natural micro-movement and subtle breathing motion, following the subject organically without stabilization",
  "steadicam":      "steadicam follow, smooth floating stabilized movement tracking the subject at a consistent following distance",
  "push in":        "gradual push-in toward the subject's face or focal point, accelerating slightly as it approaches, ending on a tight frame",
  "pull out":       "gradual pull-out from a tight frame revealing the wider scene, decelerating as it reaches the final wide composition",
  "whip pan":       "fast whip pan transition, motion-blurred mid-movement, snapping to the new subject or framing at the end",
}

export const LIGHTING_ATMOSPHERE: Record<string, string> = {
  "golden hour":    "warm golden-hour sunlight, low 15-20 degree sun angle, long soft shadows, warm amber-orange cast across the whole scene",
  "blue hour":      "cool blue-hour ambient twilight, even directionless skylight, muted low-contrast tones, soft shadowless illumination",
  "overcast":       "flat overcast daylight, soft even diffusion from full cloud cover, low contrast, no hard shadows anywhere in frame",
  "harsh midday":   "harsh direct midday sun, high overhead angle, hard-edged short shadows, strong contrast between lit and shaded surfaces",
  "neon night":     "urban neon night ambiance, mixed magenta/cyan/amber practical light sources, wet-reflective surfaces, deep shadow pockets",
  "practical interior": "warm practical interior lighting from visible lamps and fixtures, soft pools of light with natural falloff into shadow",
  "moonlight":      "cool low-intensity moonlight, blue-toned ambient fill, deep shadows, minimal practical light sources",
  "storm light":    "dramatic storm-lit sky, diffused grey overcast with occasional lightning highlight, desaturated cool tones, moody atmosphere",
  "firelight":      "warm flickering firelight as the primary source, orange-red cast with soft movement in the shadows, close-range falloff",
  "studio soft":    "even soft studio-style illumination, neutral color temperature, minimal shadow, controlled and consistent across the clip",
}

export const SUBJECT: Record<string, string> = {
  "man":              "an adult man, average athletic build, naturalistic upright posture, moves with a steady deliberate gait and confident weight transfer between steps",
  "woman":            "an adult woman, naturalistic upright posture, moves with a steady deliberate gait and confident weight transfer between steps",
  "child":            "a young child, light quick-footed movement, unselfconscious natural body language, shorter stride length and higher energy motion than an adult",
  "elderly person":   "an elderly person, careful measured gait, deliberate weight-supported movement, natural age-appropriate posture and reduced pace",
  "crowd":            "a crowd of people, natural asynchronous individual movement within the group, believable density and flow between bodies, no repeating or cloned figures",
  "athlete":          "a professional athlete mid-performance, explosive controlled movement, visible muscular effort, correct sport-specific biomechanics and follow-through",
  "dog":              "a dog, natural quadrupedal gait, tail and ear movement responsive to the environment, believable weight shift through the shoulders and hips",
  "cat":              "a cat, fluid low-slung quadrupedal movement, natural feline caution punctuated by sudden bursts of speed, tail used as a counterbalance",
  "bird":             "a bird, natural wingbeat rhythm in flight or subtle perch-balance micro-movements when still, believable aerodynamic banking through turns",
  "horse":            "a horse, natural equine gait — walk, trot, canter or gallop — with correctly sequenced leg movement and responsive mane/tail motion",
  "car":              "a car, consistent suspension travel and body roll through corners, wheels rotating at a speed matched to the vehicle's actual ground speed",
  "motorcycle":       "a motorcycle with rider, natural lean angle through turns, consistent wheel rotation speed, rider body-English matching the bike's motion",
  "drone":            "a small consumer drone, stable hover with subtle prop-wash micro-vibration, smooth directional thrust transitions with no sudden snaps",
  "robot":            "a robot or android figure, mechanically precise joint articulation, consistent servo-driven motion speed, no organic overshoot or human-like hesitation",
  "object":           "an inanimate object, no self-generated motion — all movement in frame comes from the camera path or an external rotation/reveal mechanism",
}

export const ACTION: Record<string, string> = {
  "walking":        "walking at a natural human pace, steady rhythmic gait, weight shifting naturally between steps",
  "running":        "running at a dynamic athletic pace, visible effort and momentum, natural arm-leg counter-movement",
  "turning to camera": "turning smoothly to face the camera, natural head-then-body rotation, settling into a steady final pose",
  "reaching":       "reaching toward an object with a natural arm extension, fingers opening just before contact, smooth deceleration on contact",
  "sitting down":   "lowering into a seated position with natural knee bend and weight transfer, settling smoothly without abrupt stops",
  "standing up":    "rising from seated to standing with natural weight shift, smooth continuous motion without hesitation",
  "driving":        "driving at a steady controlled speed, subtle vehicle body roll, road and environment passing at consistent relative speed",
  "flying":         "smooth continuous flight path, consistent altitude and speed, natural banking on any directional change",
  "falling":        "natural accelerating fall under gravity, believable tumble physics, no floating or unnatural deceleration",
  "rotating":       "smooth constant-speed rotation on a fixed axis, no wobble, consistent surface detail visible through the turn",
  "growing":        "gradual continuous growth or bloom, natural organic expansion, no sudden jumps in scale or form",
  "floating":       "gentle floating drift, subtle vertical bob, weightless and slow with no gravity-driven acceleration",
}

export const ENVIRONMENT: Record<string, string> = {
  "urban street":   "city street environment, passing pedestrians and traffic at natural speed, contemporary architecture, ambient city sound implied",
  "forest":         "dense forest environment, dappled light through canopy, natural ambient rustle of leaves, earthy grounded palette",
  "ocean":          "open ocean environment, natural wave rhythm, horizon line steady, reflective water surface responding to light",
  "desert":         "arid desert landscape, heat-shimmer at the horizon, sparse vegetation, vast negative space and open sky",
  "interior office": "modern interior office space, practical ceiling and desk lighting, glass partitions, controlled indoor ambience",
  "mountain":       "mountain landscape, layered atmospheric haze on distant peaks, natural wind-driven motion in foreground foliage",
  "space":          "zero-gravity space environment, stars and celestial bodies as static backdrop, weightless drifting motion",
  "underwater":     "underwater environment, light rays filtering from the surface, natural buoyant drift, particulate suspended in water",
}

export const COLOR_GRADE: Record<string, string> = {
  "teal orange":    "teal-and-orange cinematic grade, cool shadows pushed toward teal, warm skin tones and highlights pushed toward orange",
  "kodak print":    "warm film-emulation grade reminiscent of Kodak print stock, gentle highlight rolloff, rich but natural saturation",
  "bleach bypass":  "bleach-bypass grade, desaturated with retained silver contrast, gritty high-contrast look",
  "cool blue":      "cool blue-toned grade, lifted shadows with a blue cast, desaturated warm tones",
  "warm sepia":     "warm sepia-leaning grade, reduced blue channel, nostalgic amber-brown overall cast",
  "high contrast noir": "high-contrast black-and-white or near-monochrome grade, deep crushed blacks, punchy specular highlights",
  "pastel dreamlike": "soft pastel grade, lifted blacks, low contrast, gentle desaturated color palette with a dreamlike quality",
  "natural neutral": "natural neutral grade, accurate color reproduction, balanced contrast, minimal stylization",
}

// ─── Numeric camera specs ─────────────────────────────────────────────────────
// Adds real numeric precision (focal length, degrees of movement, travel
// distance) to the qualitative CAMERA_MOVE descriptions above, mirroring the
// image engine's lens/aperture/ISO precision in its CAMERA dictionary.

export interface CameraMoveNumeric {
  focalLength: string
  degrees?: number
  travel?: string
}

export const CAMERA_MOVE_NUMERICS: Record<string, CameraMoveNumeric> = {
  "dolly in":    { focalLength: "35mm-equivalent tightening to 50mm-equivalent field of view", travel: "1.5-2m dolly travel" },
  "dolly out":   { focalLength: "50mm-equivalent opening to 24mm-equivalent field of view", travel: "1.5-2m dolly travel" },
  "truck left":  { focalLength: "35mm-equivalent", travel: "2-3m lateral travel" },
  "truck right": { focalLength: "35mm-equivalent", travel: "2-3m lateral travel" },
  "pan":         { focalLength: "35mm-equivalent", degrees: 45 },
  "tilt up":     { focalLength: "24mm-equivalent", degrees: 30 },
  "tilt down":   { focalLength: "24mm-equivalent", degrees: 30 },
  "crane up":    { focalLength: "24mm-equivalent", travel: "2-4m vertical rise" },
  "crane down":  { focalLength: "24mm-equivalent", travel: "2-4m vertical descent" },
  "arc":         { focalLength: "50mm-equivalent", degrees: 90 },
  "orbit":       { focalLength: "50mm-equivalent", degrees: 360 },
  "static":      { focalLength: "35mm-equivalent" },
  "handheld":    { focalLength: "28mm-equivalent" },
  "steadicam":   { focalLength: "35mm-equivalent" },
  "push in":     { focalLength: "50mm-equivalent tightening to 85mm-equivalent field of view", travel: "1-1.5m push" },
  "pull out":    { focalLength: "85mm-equivalent opening to 50mm-equivalent field of view", travel: "1-1.5m pull" },
  "whip pan":    { focalLength: "35mm-equivalent", degrees: 120 },
}

// Typical native output frame rate per platform — used to give the CAMERA
// lock real per-platform numeric grounding instead of a generic "smooth".
export const PLATFORM_FPS: Record<string, number> = {
  kling:  30,
  sora:   24,
  runway: 24,
  pika:   24,
  luma:   24,
  veo:    24,
}

// ─── Category defaults ────────────────────────────────────────────────────────

export const CATEGORY_DEFAULTS: Record<string, {
  motionSpeed: string; motionDirection: string; duration: string;
  cameraMove: string; lighting: string;
}> = {
  narrative: { motionSpeed: "natural human pace", motionDirection: "left to right",  duration: "5-10s", cameraMove: "steadicam", lighting: "practical interior" },
  product:   { motionSpeed: "slow and deliberate",  motionDirection: "clockwise",     duration: "4-6s",  cameraMove: "orbit",     lighting: "studio soft" },
  nature:    { motionSpeed: "slow ambient drift",   motionDirection: "steady",        duration: "6-12s", cameraMove: "pan",       lighting: "golden hour" },
  action:    { motionSpeed: "fast dynamic",         motionDirection: "forward",       duration: "3-6s",  cameraMove: "handheld",  lighting: "harsh midday" },
  abstract:  { motionSpeed: "fluid continuous",     motionDirection: "expanding",     duration: "4-8s",  cameraMove: "static",    lighting: "studio soft" },
}

// ─── Output-format defaults per category ──────────────────────────────────────
// Fixed per-category values for the sections that don't need real per-idea
// detection (unlike CAMERA_MOVE/LIGHTING/SUBJECT above, which are keyword-
// matched against the user's text) — Style, Quality Tag, Audio, and Aspect
// Ratio. Duration reuses CATEGORY_DEFAULTS[cat].duration above.

export const CATEGORY_OUTPUT_DEFAULTS: Record<string, {
  aspectRatio: string; qualityTag: string; audio: string; style: string;
}> = {
  narrative: { aspectRatio: "16:9", qualityTag: "ultra-realistic, HDR, 4K",              audio: "ambient environmental sound with a subtle emotional score", style: "cinematic narrative" },
  product:   { aspectRatio: "1:1",  qualityTag: "ultra-realistic, studio-grade 4K",       audio: "clean ambient hum, no dialogue",                            style: "commercial product" },
  nature:    { aspectRatio: "16:9", qualityTag: "ultra-realistic, HDR, 4K",               audio: "natural ambient sound — wind, water, wildlife",             style: "documentary nature" },
  action:    { aspectRatio: "16:9", qualityTag: "ultra-realistic, high frame rate, 4K",   audio: "dynamic sound effects with a driving score",                style: "high-energy action" },
  abstract:  { aspectRatio: "1:1",  qualityTag: "ultra-realistic, render-quality, 4K",    audio: "ambient synth atmosphere",                                  style: "abstract motion graphics" },
}

// ─── Negative locks (anti-artifact) per category ─────────────────────────────
// Video diffusion models fail differently than image models: morphing across
// frames, identity drift, unnatural physics, and frame-rate stutter — none of
// which apply to a single still frame.

export const NEGATIVE_LOCKS: Record<string, string[]> = {
  narrative: [
    "No facial identity drift or morphing between frames",
    "No sudden unexplained changes in wardrobe or hairstyle mid-clip",
    "No unnatural motion speed changes or teleporting limbs",
    "No extra or merged limbs during movement",
    "No frame-rate stutter or motion judder",
  ],
  product: [
    "No warping or morphing of product geometry during rotation",
    "No inconsistent surface reflections between frames",
    "No product label or logo distortion",
    "No camera drift off the fixed orbit radius",
  ],
  nature: [
    "No unnatural time-of-day lighting shifts within the clip",
    "No repeating or looping background elements",
    "No physically impossible weather transitions",
    "No flickering foliage or water texture",
  ],
  action: [
    "No unnatural physics or floating during fast motion",
    "No motion blur inconsistent with the stated speed",
    "No limb merging during rapid movement",
    "No environment warping during camera motion",
  ],
  abstract: [
    "No abrupt discontinuities in the motion path",
    "No flickering or strobing artifacts",
    "No loss of form consistency across the transformation",
  ],
}
