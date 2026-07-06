import type { ExtractedPromptFields, PromptRecord } from "./types.js";

const EXPRESSION_PATTERNS: Array<[RegExp, string]> = [
  [/\b(confident|confidence)\b/i, "Confident"],
  [/\b(focused|focus)\b/i, "Focused"],
  [/\b(serene|calm)\b/i, "Calm"],
  [/\b(smile|smiling|soft smile|half-smile)\b/i, "Soft smile"],
  [/\b(intense|dramatic)\b/i, "Intense"],
  [/\b(warm)\b/i, "Warm"],
  [/\b(thoughtful)\b/i, "Thoughtful"],
  [/\b(joyful|joy)\b/i, "Joyful"],
  [/\b(excited|energetic|energy)\b/i, "Energetic"],
  [/\b(aspirational)\b/i, "Aspirational"],
  [/\b(amazed|astonished|awe)\b/i, "Amazed"],
  [/\b(happy|cheerful|upbeat)\b/i, "Upbeat"],
];

// ─── Shared action extraction (marketing / trending / social) ──────────────────

const ACTION_PATTERNS: Array<[RegExp, string]> = [
  [/\bmid-?jump(?:ing)?\b/i, "Mid-jump"],
  [/\bjumping\b/i, "Jumping"],
  [/\brunning\b/i, "Running"],
  [/\bdancing\b/i, "Dancing"],
  [/\bcelebrating\b/i, "Celebrating"],
  [/\bsplashing\b/i, "Splashing"],
  [/\bpouring\b/i, "Pouring"],
  [/\blaughing\b/i, "Laughing"],
  [/\blooking up\b/i, "Looking up"],
  [/\bpointing\b/i, "Pointing"],
  [/\bwalking\b/i, "Walking"],
];

function extractAction(source: string): string | undefined {
  const labeled = extractAfterLabel(source, "Action");
  if (labeled) return labeled;
  const holding = source.match(/\bholding ([^,\.]+)/i)?.[1];
  if (holding) return `Holding ${compactWhitespace(holding)}`;
  return firstMatch(source, ACTION_PATTERNS);
}

const GAZE_PATTERNS: Array<[RegExp, string]> = [
  [/\bstare straight at camera\b/i, "Direct eye contact"],
  [/\b(?:looking |gazing )?direct-to-camera\b/i, "Direct eye contact"],
  [/\beye contact\b/i, "Direct eye contact"],
  [/\bdirect forward gaze\b/i, "Direct forward gaze"],
  [/\bforward gaze\b/i, "Direct forward gaze"],
  [/\bdirect gaze\b/i, "Direct gaze"],
  [/\bgaze (?:past|toward) (?:the )?camera\b/i, "Gaze toward camera"],
  [/\blooking (?:at|into) (?:the )?camera\b/i, "Direct eye contact"],
  [/\blooking at camera\b/i, "Direct eye contact"],
  [/\bgaze (?:angled )?slightly camera-right\b/i, "Slightly camera-right gaze"],
  [/\bgaze (?:angled )?slightly camera-left\b/i, "Slightly camera-left gaze"],
  [/\bsideways\b/i, "Sideways gaze"],
  [/\bdownward\b/i, "Downward gaze"],
  [/\boff-camera\b/i, "Off-camera gaze"],
  [/\bdirect eye contact\b/i, "Direct eye contact"],
];

const COMPOSITION_PATTERNS: Array<[RegExp, string]> = [
  [/\bextreme close-up\b/i, "Extreme close-up portrait"],
  [/\bhead(?:-| and )shoulders\b/i, "Head-and-shoulders portrait"],
  [/\bshoulders-up\b/i, "Head-and-shoulders portrait"],
  [/\bbust(?:-| )(?:shot|crop)\b/i, "Bust-crop portrait"],
  [/\bclose-up\b/i, "Close-up portrait"],
  [/\bchest-up\b/i, "Chest-up portrait"],
  [/\bwaist-up\b/i, "Waist-up portrait"],
  [/\bmid-shot\b/i, "Mid-shot portrait"],
  [/\bmedium shot\b/i, "Mid-shot portrait"],
  [/\bfull-body\b/i, "Full-body portrait"],
  [/\benvironmental editorial portrait\b/i, "Environmental editorial portrait"],
];

const LIGHTING_PATTERNS: Array<[RegExp, string]> = [
  [/\b(?:three|3)-point\b/i, "Three-point lighting"],
  [/\bwindow light\b/i, "Window light"],
  [/\bsoft window key\b/i, "Soft window key"],
  [/\bnorth window key\b/i, "North window key"],
  [/\bgolden[- ]hour\b/i, "Golden hour light"],
  [/\bhard key\b/i, "Hard key portrait light"],
  [/\bsoft(?:box)? key\b/i, "Soft key light"],
  [/\b(?:window|warm|front) key\b/i, "Key light"],
  [/\bsoftbox\b/i, "Softbox light"],
  [/\bring light\b/i, "Ring light"],
  [/\bmixed natural\b/i, "Mixed natural light"],
  [/\bambient\b/i, "Ambient light"],
  [/\bbeauty dish\b/i, "Beauty-dish light"],
  [/\bside-?light\b/i, "Side light"],
  [/\bkey light\b/i, "Key light"],
  [/\brim(?: light(?:ing)?)?\b/i, "Rim lighting"],
  [/\bback-?lit\b/i, "Backlit"],
  [/\bsoft natural\b/i, "Soft natural light"],
  [/\bnatural light\b/i, "Natural light"],
  [/\bstudio light(?:ing)?\b/i, "Studio lighting"],
  [/\bmoody\b/i, "Moody portrait light"],
  [/\brain\b/i, "Rain-lit atmospheric light"],
];

const STYLE_PATTERNS: Array<[RegExp, string]> = [
  [/\beditorial\b/i, "Editorial portrait"],
  [/\bmagazine profile\b/i, "Magazine profile portrait"],
  [/\bworkplace\b/i, "Workplace portrait"],
  [/\bcinematic\b/i, "Cinematic portrait"],
  [/\bwatercolor\b/i, "Watercolor portrait"],
  [/\bpunk beauty\b/i, "Punk beauty editorial"],
  [/\bstartup\b/i, "Startup editorial portrait"],
  [/\bvogue\b/i, "Vogue-style editorial portrait"],
];

function compactWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function firstMatch(source: string, patterns: Array<[RegExp, string]>): string | undefined {
  for (const [pattern, value] of patterns) {
    if (pattern.test(source)) return value;
  }
  return undefined;
}

function extractAfterLabel(source: string, label: string): string | undefined {
  const pattern = new RegExp(`${label}:\\s*([^\\.\\n]+)`, "i");
  const match = source.match(pattern);
  return match?.[1] ? compactWhitespace(match[1]) : undefined;
}

function extractWardrobe(source: string): string | undefined {
  return extractAfterLabel(source, "Wardrobe")
    ?? extractAfterLabel(source, "wardrobe layered")
    ?? source.match(/\bwearing ([^\.]+?)(?:, against\b|, with\b|, under\b|, in\b|, inside\b|\.|$)/i)?.[1]?.trim()
    ?? source.match(/\b(?:dressed in|clad in|draped in) ([^\.,;]{3,60})/i)?.[1]?.trim()
    ?? source.match(/\bwears ([^\.]+)/i)?.[1]?.trim();
}

function extractBackground(source: string): string | undefined {
  const labeled = extractAfterLabel(source, "Setting") ?? extractAfterLabel(source, "Background");
  if (labeled) return labeled;
  if (/brick wall/i.test(source)) return "Brick wall backdrop";
  if (/kitchen/i.test(source)) return "Kitchen environment";
  if (/workstation/i.test(source)) return "Workstation environment";
  // descriptor immediately before "background"/"backdrop"
  const before = source.match(/\b([a-z][\w-]*(?: [\w-]+){0,2}) (?:background|backdrop)\b/i)?.[1];
  if (before) return `${compactWhitespace(before)} background`;
  // "backdrop of foliage", "background of neon signage"
  const after = source.match(/\b(?:background|backdrop) of ([a-z][\w-]*(?: [\w-]+){0,2})/i)?.[1];
  if (after) return `${compactWhitespace(after)} backdrop`;
  if (/\bseamless\b/i.test(source)) return "Seamless backdrop";
  if (/\bgradient\b/i.test(source)) return "Gradient background";
  if (/\bstudio\b/i.test(source)) return "Studio background";
  // any explicit mention of a background still counts as a defined backdrop lock
  if (/\b(?:background|backdrop)\b/i.test(source)) return "Defined background";
  return undefined;
}

function extractSubject(source: string, fallbackTitle: string): string {
  const labeledSubject = extractAfterLabel(source, "Subject");
  if (labeledSubject) {
    return labeledSubject.split(",")[0]?.trim() || fallbackTitle;
  }

  const normalizedTitle = fallbackTitle
    .replace(/\bportrait\b/i, "")
    .replace(/\bprofessional\b/i, "")
    .replace(/\beditorial\b/i, "")
    .trim();

  return normalizedTitle || fallbackTitle;
}

function extractPose(source: string): string | undefined {
  if (/\bhands casually in pockets\b/i.test(source)) return "Relaxed half-turn with hands in pockets";
  if (/\bhands resting on stainless counter\b/i.test(source)) return "Standing portrait with hands resting on counter";
  if (/\bdual-monitor workstation\b/i.test(source)) return "Seated workstation portrait";
  if (/\bstanding\b/i.test(source) && /\bportrait\b/i.test(source)) return "Standing portrait";
  if (/\bhalf-turn\b/i.test(source)) return "Relaxed half-turn portrait";
  if (/\b(?:shoulders-up|head[- ]and[- ]shoulders|bust[- ]crop)\b/i.test(source)) return "Upright head-and-shoulders pose";
  if (/\bthree-quarter\b/i.test(source)) return "Three-quarter pose";
  if (/\bseated\b/i.test(source)) return "Seated pose";
  if (/\bstanding\b/i.test(source)) return "Standing pose";
  if (/\bhead tilt\b/i.test(source)) return "Slight head-tilt pose";
  return undefined;
}

function extractHandPosition(source: string): string | undefined {
  if (/\bhands casually in pockets\b/i.test(source)) return "Hands in pockets";
  if (/\bhands resting on stainless counter\b/i.test(source)) return "Hands resting on counter";
  if (/\bhands on keyboard\b/i.test(source)) return "Hands on keyboard";
  if (/\bholding\b/i.test(source)) {
    const holding = source.match(/\bholding ([^,\.]+)/i)?.[1];
    if (holding) return `Holding ${compactWhitespace(holding)}`;
  }
  return undefined;
}

function extractCrop(source: string): string | undefined {
  if (/\b4:5\b/i.test(source)) return "4:5 portrait crop";
  if (/\b16:9\b/i.test(source)) return "16:9 crop";
  return undefined;
}

function extractCameraAngle(source: string): string | undefined {
  if (/\beye-level\b/i.test(source)) return "Eye-level";
  return undefined;
}

function buildParseSource(prompt: PromptRecord, platformText?: string | null): string {
  return compactWhitespace([
    prompt.title,
    prompt.description ?? "",
    platformText ?? "",
  ].join(". "));
}

// Authored variants lead with a style/format descriptor before "depicting" / "for
// the …" / "Subject:" — e.g. "Pixar-style 3D character render depicting…",
// "Overhead Advertising Composite for the…". That descriptor is a strong, clean
// style/campaign lock value across categories.
function extractLeadingDescriptor(source: string): string | undefined {
  // Anchor on a sentence boundary because the variant's leading clause sits
  // after the title + base prompt in the combined parse source.
  const lead =
    source.match(
      /(?:^|[.;]\s)([A-Za-z][^.;:]{5,68}?)\s+(?:depicting|designed|titled|for (?:the |an? )?)/i,
    )?.[1] ??
    source.match(
      /(?:^|[.;]\s)([A-Za-z][^.;:]{5,68}?)\s*[.]\s*(?:Subject|Composition|Layout|Capture|Render)\b/i,
    )?.[1];
  if (lead) {
    const cleaned = compactWhitespace(lead);
    if (cleaned.length >= 4 && cleaned.length <= 70) return cleaned;
  }
  return undefined;
}

function extractComposition(source: string): string | undefined {
  const labeled = extractAfterLabel(source, "Composition");
  if (labeled) {
    if (/\bvertical\b/i.test(labeled) && /\bcentered\b/i.test(labeled)) {
      return "Centered vertical portrait";
    }
    return labeled;
  }

  return firstMatch(source, COMPOSITION_PATTERNS)
    ?? (/\bcentered hero vertical\b/i.test(source) ? "Centered vertical portrait" : undefined)
    ?? (/\bhero vertical\b/i.test(source) ? "Vertical portrait composition" : undefined);
}

export function parsePeoplePortraitPrompt(
  prompt: PromptRecord,
  platformText?: string | null,
): ExtractedPromptFields {
  const source = buildParseSource(prompt, platformText);

  return {
    subject: extractSubject(source, prompt.title),
    expression: firstMatch(source, EXPRESSION_PATTERNS),
    gaze: firstMatch(source, GAZE_PATTERNS),
    pose: extractPose(source),
    handPosition: extractHandPosition(source),
    wardrobe: extractWardrobe(source),
    background: extractBackground(source),
    composition: extractComposition(source),
    crop: extractCrop(source),
    cameraAngle: extractCameraAngle(source),
    lighting: firstMatch(source, LIGHTING_PATTERNS),
    styleDna: firstMatch(source, STYLE_PATTERNS) ?? extractLeadingDescriptor(source),
    material: /skin physics|skin:/i.test(source) ? "Realistic skin and material behavior" : undefined,
    surface: /visible pores|micro-textures|paper grain|fabric/i.test(source)
      ? "Surface realism retained"
      : undefined,
    palette: extractAfterLabel(source, "Palette"),
  };
}

// ─── Product & Ecommerce ──────────────────────────────────────────────────────

const ORIENTATION_PATTERNS: Array<[RegExp, string]> = [
  [/\blabel (?:to|facing) camera\b/i, "Front-facing, label to camera"],
  [/\bfront-facing\b/i, "Front-facing"],
  [/\bthree-quarter\b/i, "Three-quarter view"],
  [/\b(?:top-down|flat ?lay|overhead)\b/i, "Top-down flat lay"],
  [/\bupright\b/i, "Upright"],
  [/\bangled\b/i, "Angled view"],
];

const SCALE_PATTERNS: Array<[RegExp, string]> = [
  [/\bmacro\b/i, "Macro hero scale"],
  [/\bhero scale\b/i, "Hero scale"],
  [/\bfills?(?: the| most of the)? frame\b/i, "Fills the frame"],
  [/\boccup(?:ies|ying) \d+%/i, "Sized to frame proportion"],
  [/\blife-size\b/i, "Life-size"],
  [/\bminiature\b/i, "Miniature scale"],
];

const POSITION_PATTERNS: Array<[RegExp, string]> = [
  [/\brule of thirds\b/i, "Rule-of-thirds placement"],
  [/\blower third\b/i, "Lower third"],
  [/\bupper third\b/i, "Upper third"],
  [/\boff-center\b/i, "Off-center"],
  [/\bcentered\b/i, "Centered"],
];

const VISIBILITY_PATTERNS: Array<[RegExp, string]> = [
  [/\blabel (?:visible|readable|unobstructed)\b/i, "Label unobstructed"],
  [/\blogo readable\b/i, "Logo readable"],
  [/\bfull product visible\b/i, "Full product visible"],
  [/\bcap visible\b/i, "Cap visible"],
  [/\bunobstructed\b/i, "Product unobstructed"],
];

const PRODUCT_COMPOSITION_PATTERNS: Array<[RegExp, string]> = [
  [/\bpackshot\b/i, "Studio packshot"],
  [/\bhero shot\b/i, "Hero shot"],
  [/\bflat ?lay\b/i, "Flat lay"],
  [/\bknolling\b/i, "Knolling layout"],
  [/\bsplit-?screen\b/i, "Split-screen composition"],
  [/\b50\/50 split\b/i, "Split composition"],
  [/\brule of thirds\b/i, "Rule-of-thirds composition"],
  [/\boverhead\b/i, "Overhead composition"],
  [/\btop-down\b/i, "Top-down composition"],
  [/\bhero vertical\b/i, "Hero vertical composition"],
  [/\bbust[- ]crop\b/i, "Bust-crop composition"],
  [/\bclose-up\b/i, "Close-up"],
  [/\bcentered\b/i, "Centered composition"],
];

const PRODUCT_LIGHTING_PATTERNS: Array<[RegExp, string]> = [
  [/\bsoftbox\b/i, "Soft studio softbox"],
  [/\brim light\b/i, "Rim-lit"],
  [/\bhigh-key\b/i, "High-key studio light"],
  [/\blow-key\b/i, "Low-key studio light"],
  [/\b(?:studio )?strobe\b/i, "Studio strobe"],
  [/\bsoft window\b/i, "Soft window light"],
];

const MATERIAL_PATTERNS: Array<[RegExp, string]> = [
  [/\bfrosted glass\b/i, "Frosted glass"],
  [/\bbrushed metal\b/i, "Brushed metal"],
  [/\bmatte\b/i, "Matte finish"],
  [/\bglossy\b/i, "Glossy finish"],
  [/\bceramic\b/i, "Ceramic"],
  [/\bglass\b/i, "Glass"],
  [/\bmetal\b/i, "Metal"],
  [/\bleather\b/i, "Leather"],
  [/\bplastic\b/i, "Plastic"],
];

const BRAND_STYLE_PATTERNS: Array<[RegExp, string]> = [
  [/\bapple-?style\b/i, "Apple-style minimal"],
  [/\bluxury\b/i, "Luxury commercial"],
  [/\bpremium\b/i, "Premium commercial"],
  [/\bminimal\b/i, "Minimal commercial"],
  [/\bplayful\b/i, "Playful commercial"],
  [/\bcommercial\b/i, "Commercial product style"],
  [/\beditorial\b/i, "Editorial commercial"],
];

function extractProductBackground(source: string): string | undefined {
  return extractAfterLabel(source, "Setting")
    ?? extractAfterLabel(source, "Background")
    ?? (/seamless/i.test(source) ? "Seamless studio backdrop" : undefined)
    ?? (/\bmarble\b/i.test(source) ? "Marble surface" : undefined)
    ?? (/\bstone\b/i.test(source) ? "Stone surface" : undefined)
    ?? (/\bgradient\b/i.test(source) ? "Gradient backdrop" : undefined)
    ?? (/\bconcrete\b/i.test(source) ? "Concrete surface" : undefined)
    ?? (/\bwood(?:en)?\b/i.test(source) ? "Wood surface" : undefined)
    ?? (() => {
      const m = source.match(/\b([a-z][\w-]*(?: [\w-]+){0,2}) (?:background|backdrop)\b/i)?.[1];
      return m ? `${compactWhitespace(m)} background` : undefined;
    })();
}

function extractProduct(source: string, fallbackTitle: string): string {
  const labeled = extractAfterLabel(source, "Product") ?? extractAfterLabel(source, "Subject");
  if (labeled) return labeled.split(",")[0]?.trim() || fallbackTitle;

  const normalizedTitle = fallbackTitle
    .replace(/\bhero shot\b/i, "")
    .replace(/\bpackshot\b/i, "")
    .replace(/\beditorial\b/i, "")
    .replace(/\bproduct\b/i, "")
    .replace(/\bshot\b/i, "")
    .trim();

  return normalizedTitle || fallbackTitle;
}

export function parseProductEcommercePrompt(
  prompt: PromptRecord,
  platformText?: string | null,
): ExtractedPromptFields {
  const source = buildParseSource(prompt, platformText);

  return {
    product: extractProduct(source, prompt.title),
    productOrientation: firstMatch(source, ORIENTATION_PATTERNS),
    scale: firstMatch(source, SCALE_PATTERNS),
    productPosition: firstMatch(source, POSITION_PATTERNS),
    productVisibility: firstMatch(source, VISIBILITY_PATTERNS),
    composition: firstMatch(source, PRODUCT_COMPOSITION_PATTERNS),
    background: extractProductBackground(source),
    lighting: extractGenericLighting(source),
    material: firstMatch(source, MATERIAL_PATTERNS),
    brandStyle: firstMatch(source, BRAND_STYLE_PATTERNS) ?? extractLeadingDescriptor(source),
    surface: /\b(?:reflective|reflection|glossy reflection)\b/i.test(source)
      ? "Reflective surface retained"
      : undefined,
    palette: extractAfterLabel(source, "Palette"),
    props: extractAfterLabel(source, "Props"),
    cameraAngle: extractCameraAngle(source),
    crop: extractCrop(source),
  };
}

// ─── Fashion & Apparel ────────────────────────────────────────────────────────

const MODEL_PATTERNS: Array<[RegExp, string]> = [
  [/\bandrogynous model\b/i, "Androgynous model"],
  [/\bstreet-cast model\b/i, "Street-cast model"],
  [/\bfemale model\b/i, "Female model"],
  [/\bmale model\b/i, "Male model"],
  [/\bmodel\b/i, "Model"],
];

const GARMENT_VISIBILITY_PATTERNS: Array<[RegExp, string]> = [
  [/\bhead-to-toe\b/i, "Head-to-toe visible"],
  [/\bfull-length\b/i, "Full-length garment visible"],
  [/\bfull (?:outfit|garment) visible\b/i, "Full outfit visible"],
  [/\bcropped at (?:the )?waist\b/i, "Cropped at waist"],
  [/\bwaist-up\b/i, "Waist-up outfit visible"],
];

const FIT_PATTERNS: Array<[RegExp, string]> = [
  [/\bbias-cut\b/i, "Flowing bias-cut fit"],
  [/\btailored\b/i, "Tailored fit"],
  [/\bslim[- ]fit\b/i, "Slim fit"],
  [/\boversized\b/i, "Oversized"],
  [/\bfitted\b/i, "Fitted"],
  [/\bflowing\b/i, "Flowing fit"],
  [/\bdraped\b/i, "Draped"],
  [/\bstructured\b/i, "Structured fit"],
  [/\brelaxed\b/i, "Relaxed fit"],
];

const GARMENT_COLOR_PATTERNS: Array<[RegExp, string]> = [
  [/\bemerald\b/i, "Emerald"],
  [/\bcrimson\b/i, "Crimson"],
  [/\bscarlet\b/i, "Scarlet"],
  [/\bburgundy\b/i, "Burgundy"],
  [/\bnavy\b/i, "Navy"],
  [/\bivory\b/i, "Ivory"],
  [/\bcharcoal\b/i, "Charcoal"],
  [/\bmustard\b/i, "Mustard"],
  [/\bolive\b/i, "Olive"],
  [/\bteal\b/i, "Teal"],
  [/\bindigo\b/i, "Indigo"],
  [/\bterracotta\b/i, "Terracotta"],
  [/\bblush\b/i, "Blush"],
  [/\bblack\b/i, "Black"],
  [/\bwhite\b/i, "White"],
  [/\bbeige\b/i, "Beige"],
];

const FABRIC_PATTERNS: Array<[RegExp, string]> = [
  [/\bplatinum\b/i, "Platinum"],
  [/\bdiamond\b/i, "Diamond"],
  [/\bgold\b/i, "Gold"],
  [/\bpearl\b/i, "Pearl"],
  [/\bstainless steel\b/i, "Stainless steel"],
  [/\bsteel\b/i, "Steel"],
  [/\bsilk\b/i, "Silk"],
  [/\bdenim\b/i, "Denim"],
  [/\blinen\b/i, "Linen"],
  [/\bwool\b/i, "Wool"],
  [/\bchiffon\b/i, "Chiffon"],
  [/\bvelvet\b/i, "Velvet"],
  [/\bleather\b/i, "Leather"],
  [/\bsatin\b/i, "Satin"],
  [/\btweed\b/i, "Tweed"],
  [/\bcashmere\b/i, "Cashmere"],
  [/\bsuede\b/i, "Suede"],
  [/\bcotton\b/i, "Cotton"],
  [/\bknit\b/i, "Knit"],
];

const FASHION_STYLE_PATTERNS: Array<[RegExp, string]> = [
  [/\bhaute couture\b/i, "Haute couture"],
  [/\bvogue\b/i, "Vogue editorial"],
  [/\brunway\b/i, "Runway"],
  [/\bstreetwear\b/i, "Streetwear"],
  [/\blookbook\b/i, "Lookbook"],
  [/\bcampaign\b/i, "Campaign editorial"],
  [/\beditorial\b/i, "Editorial"],
];

const FASHION_COMPOSITION_PATTERNS: Array<[RegExp, string]> = [
  [/\bfull-body\b/i, "Full-body"],
  [/\bthree-quarter\b/i, "Three-quarter"],
  [/\bwaist-up\b/i, "Waist-up"],
  [/\brunway\b/i, "Runway shot"],
  [/\bcentered\b/i, "Centered"],
];

const FASHION_LIGHTING_PATTERNS: Array<[RegExp, string]> = [
  [/\bsoft daylight\b/i, "Soft daylight"],
  [/\bhard editorial\b/i, "Hard editorial light"],
  [/\brunway light\b/i, "Runway light"],
  [/\bgolden hour\b/i, "Golden hour light"],
  [/\bsoftbox\b/i, "Studio softbox"],
  [/\bsoft window\b/i, "Soft window light"],
];

const FASHION_POSE_PATTERNS: Array<[RegExp, string]> = [
  [/\bthree-quarter turn\b/i, "Three-quarter turn"],
  [/\bwalking\b/i, "Walking pose"],
  [/\bleaning\b/i, "Leaning pose"],
  [/\bhand on hip\b/i, "Hand-on-hip pose"],
  [/\bstanding\b/i, "Standing pose"],
];

function extractFashionHand(source: string): string | undefined {
  if (/\bhands? on hips?\b/i.test(source)) return "Hand on hip";
  if (/\bhands in pockets\b/i.test(source)) return "Hands in pockets";
  if (/\badjusting (?:collar|sleeve|hem|jacket)\b/i.test(source)) return "Adjusting garment";
  if (/\barms crossed\b/i.test(source)) return "Arms crossed";
  return extractHandPosition(source);
}

function extractFashionBackground(source: string): string | undefined {
  return extractAfterLabel(source, "Setting")
    ?? extractAfterLabel(source, "Background")
    ?? (/\brunway\b/i.test(source) ? "Runway" : undefined)
    ?? (/\bstreet\b/i.test(source) ? "Street setting" : undefined)
    ?? (/\brooftop\b/i.test(source) ? "Rooftop setting" : undefined)
    ?? (/\bstudio\b/i.test(source) ? "Studio backdrop" : undefined);
}

function extractGarment(source: string, fallbackTitle: string): string {
  const labeled = extractAfterLabel(source, "Garment");
  if (labeled) return labeled.split(",")[0]?.trim() || fallbackTitle;

  const worn = source.match(/\bwearing (?:an? )?([^\.,]+)/i)?.[1];
  if (worn) return compactWhitespace(worn);

  return fallbackTitle;
}

export function parseFashionApparelPrompt(
  prompt: PromptRecord,
  platformText?: string | null,
): ExtractedPromptFields {
  const source = buildParseSource(prompt, platformText);

  return {
    subject:
      extractAfterLabel(source, "Model")
      ?? firstMatch(source, MODEL_PATTERNS)
      ?? "Model",
    garment: extractGarment(source, prompt.title),
    garmentVisibility: firstMatch(source, GARMENT_VISIBILITY_PATTERNS),
    garmentColor: extractAfterLabel(source, "Color") ?? firstMatch(source, GARMENT_COLOR_PATTERNS),
    garmentFit: firstMatch(source, FIT_PATTERNS),
    pose: firstMatch(source, FASHION_POSE_PATTERNS),
    handPosition: extractFashionHand(source),
    composition: firstMatch(source, FASHION_COMPOSITION_PATTERNS),
    lighting: firstMatch(source, FASHION_LIGHTING_PATTERNS) ?? extractGenericLighting(source),
    material: firstMatch(source, FABRIC_PATTERNS),
    styleDna: firstMatch(source, FASHION_STYLE_PATTERNS) ?? extractLeadingDescriptor(source),
    background: extractFashionBackground(source),
    expression: firstMatch(source, EXPRESSION_PATTERNS),
    gaze: firstMatch(source, GAZE_PATTERNS),
    palette: extractAfterLabel(source, "Palette"),
    crop: extractCrop(source),
  };
}

// ─── Shared lighting + brand colors (marketing / art / trending / social) ──────

function extractGenericLighting(source: string): string | undefined {
  return firstMatch(source, PRODUCT_LIGHTING_PATTERNS) ?? firstMatch(source, LIGHTING_PATTERNS);
}

function extractBrandColors(source: string): string | undefined {
  return extractAfterLabel(source, "Brand colors") ?? extractAfterLabel(source, "Brand color");
}

// ─── Marketing & Ads ──────────────────────────────────────────────────────────

const MARKETING_COMPOSITION_PATTERNS: Array<[RegExp, string]> = [
  [/\bcentered hero\b/i, "Centered hero"],
  [/\bnegative space\b/i, "Hero with negative space"],
  [/\brule of thirds\b/i, "Rule-of-thirds layout"],
  [/\bsplit (?:layout|screen)\b/i, "Split layout"],
  [/\bcentered\b/i, "Centered"],
];

const CAMPAIGN_STYLE_PATTERNS: Array<[RegExp, string]> = [
  [/\badvertising composite\b/i, "Advertising composite"],
  [/\badvertising\b/i, "Advertising style"],
  [/\bbold campaign\b/i, "Bold campaign editorial"],
  [/\bluxury campaign\b/i, "Luxury campaign"],
  [/\blifestyle campaign\b/i, "Lifestyle campaign"],
  [/\bminimal ad\b/i, "Minimal ad"],
  [/\benergetic ad\b/i, "Energetic ad"],
  [/\bcampaign\b/i, "Campaign editorial"],
  [/\bcommercial\b/i, "Commercial style"],
];

function extractCtaSpace(source: string): string | undefined {
  if (/\bnegative space (?:for|to)\b/i.test(source)) return "Reserved negative space for copy";
  if (/\b(?:copy|headline|text) space\b/i.test(source)) return "Reserved copy space";
  if (/\bspace for (?:copy|text|headline)\b/i.test(source)) return "Reserved space for copy";
  const clear = source.match(/\bclear (?:left|right|upper|lower) (?:third|half)[^,\.]*/i)?.[0];
  if (clear) return compactWhitespace(clear);
  if (/\bcta space\b/i.test(source)) return "Reserved CTA space";
  return undefined;
}

export function parseMarketingAdsPrompt(
  prompt: PromptRecord,
  platformText?: string | null,
): ExtractedPromptFields {
  const source = buildParseSource(prompt, platformText);

  return {
    subject:
      extractAfterLabel(source, "Hero")
      ?? extractAfterLabel(source, "Subject")
      ?? extractSubject(source, prompt.title),
    product: extractAfterLabel(source, "Product") ?? extractAfterLabel(source, "Subject"),
    action: extractAction(source),
    expression: firstMatch(source, EXPRESSION_PATTERNS),
    composition: firstMatch(source, MARKETING_COMPOSITION_PATTERNS),
    ctaSpace: extractCtaSpace(source),
    brandColors: extractBrandColors(source),
    lighting: extractGenericLighting(source),
    styleDna: firstMatch(source, CAMPAIGN_STYLE_PATTERNS) ?? extractLeadingDescriptor(source),
    background: extractBackground(source),
    palette: extractAfterLabel(source, "Palette"),
    crop: extractCrop(source),
  };
}

// ─── Art & Illustration ───────────────────────────────────────────────────────

const ART_STYLE_PATTERNS: Array<[RegExp, string]> = [
  [/\bwatercolor\b/i, "Watercolor illustration"],
  [/\boil painting\b/i, "Oil painting"],
  [/\bcel-?shaded\b/i, "Cel-shaded"],
  [/\banime\b/i, "Anime"],
  [/\bcomic\b/i, "Comic book"],
  [/\bvector\b/i, "Vector illustration"],
  [/\bpixel art\b/i, "Pixel art"],
  [/\bline art\b/i, "Line art"],
  [/\bstorybook\b/i, "Storybook illustration"],
  [/\bart nouveau\b/i, "Art nouveau"],
  [/\bukiyo-e\b/i, "Ukiyo-e"],
  [/\blow ?poly\b/i, "Low poly"],
  [/\bsurreal\b/i, "Surreal illustration"],
  [/\bgouache\b/i, "Gouache illustration"],
];

const RENDERING_PATTERNS: Array<[RegExp, string]> = [
  [/\bwatercolor wash\b/i, "Watercolor wash"],
  [/\bink linework\b/i, "Ink linework"],
  [/\bcel shading\b/i, "Cel shading"],
  [/\bflat shading\b/i, "Flat shading"],
  [/\bdigital painting\b/i, "Digital painting"],
  [/\bcrosshatch\b/i, "Crosshatch"],
  [/\bhalftone\b/i, "Halftone"],
  [/\bsoft shading\b/i, "Soft shading"],
];

const ART_POSE_PATTERNS: Array<[RegExp, string]> = [
  [/\bcurled\b/i, "Curled pose"],
  [/\bperched\b/i, "Perched pose"],
  [/\bflying\b/i, "Flying pose"],
  [/\bcrouched\b/i, "Crouched pose"],
  [/\balert\b/i, "Alert pose"],
  [/\bstanding\b/i, "Standing pose"],
  [/\bseated\b/i, "Seated pose"],
];

const ART_PALETTE_PATTERNS: Array<[RegExp, string]> = [
  [/\bautumn\b/i, "Autumn palette"],
  [/\bpastel\b/i, "Pastel palette"],
  [/\bvibrant\b/i, "Vibrant palette"],
  [/\bmuted\b/i, "Muted palette"],
  [/\bmonochrome\b/i, "Monochrome palette"],
  [/\bwarm\b/i, "Warm palette"],
  [/\bcool\b/i, "Cool palette"],
];

const ART_COMPOSITION_PATTERNS: Array<[RegExp, string]> = [
  [/\bbilateral symmetry\b/i, "Bilateral symmetry"],
  [/\bsymmetr(?:y|ical)\b/i, "Symmetrical composition"],
  [/\brule[- ]of[- ]thirds\b/i, "Rule-of-thirds composition"],
  [/\bvignette\b/i, "Character vignette"],
  [/\bfull-scene\b/i, "Full scene"],
  [/\bwide shot\b/i, "Wide shot"],
  [/\bclose-up\b/i, "Close-up"],
  [/\bcentered\b/i, "Centered"],
];

// Art style usually leads the variant ("Traditional Madhubani folk painting
// depicting…", "Edo-period ukiyo-e woodblock print depicting…").
function extractArtStyle(source: string): string | undefined {
  return extractLeadingDescriptor(source) ?? firstMatch(source, ART_STYLE_PATTERNS);
}

function extractArtBackground(source: string): string | undefined {
  return extractAfterLabel(source, "Setting")
    ?? extractAfterLabel(source, "Background")
    ?? (/\bforest\b/i.test(source) ? "Forest" : undefined)
    ?? (/\bcity\b/i.test(source) ? "City" : undefined)
    ?? (/\bsky\b/i.test(source) ? "Sky" : undefined)
    ?? (/\b(?:ocean|sea)\b/i.test(source) ? "Ocean" : undefined)
    ?? (/\bmountains?\b/i.test(source) ? "Mountains" : undefined)
    ?? (/\b(?:void|plain background)\b/i.test(source) ? "Plain background" : undefined);
}

export function parseArtIllustrationPrompt(
  prompt: PromptRecord,
  platformText?: string | null,
): ExtractedPromptFields {
  const source = buildParseSource(prompt, platformText);

  return {
    styleDna: extractAfterLabel(source, "Style") ?? extractArtStyle(source),
    subject:
      extractAfterLabel(source, "Character")
      ?? extractAfterLabel(source, "Subject")
      ?? extractSubject(source, prompt.title),
    pose: firstMatch(source, ART_POSE_PATTERNS) ?? extractPose(source),
    expression: firstMatch(source, EXPRESSION_PATTERNS),
    palette:
      extractAfterLabel(source, "Palette")
      ?? firstMatch(source, ART_PALETTE_PATTERNS)
      ?? (/#[0-9a-f]{6}/i.test(source) ? "Defined hex palette" : undefined),
    lighting: extractGenericLighting(source) ?? (/\bglow\b/i.test(source) ? "Soft glow" : undefined),
    renderingStyle: firstMatch(source, RENDERING_PATTERNS),
    background: extractArtBackground(source),
    composition: firstMatch(source, ART_COMPOSITION_PATTERNS),
    gaze: firstMatch(source, GAZE_PATTERNS),
    crop: extractCrop(source),
  };
}

// ─── Trending & Viral ─────────────────────────────────────────────────────────

const VIRAL_STYLE_PATTERNS: Array<[RegExp, string]> = [
  [/\bsurreal viral\b/i, "Surreal viral trend"],
  [/\bcinematic viral\b/i, "Cinematic viral"],
  [/\bmeme\b/i, "Meme aesthetic"],
  [/\by2k\b/i, "Y2K trend"],
  [/\bretro\b/i, "Retro trend"],
  [/\bsurreal\b/i, "Surreal trend"],
  [/\bviral\b/i, "Viral trend"],
  [/\btrend(?:ing|y)?\b/i, "Trend aesthetic"],
];

const COLOR_IMPACT_PATTERNS: Array<[RegExp, string]> = [
  [/\bhyper-?saturated\b/i, "Hyper-saturated color"],
  [/\bsaturated\b/i, "Saturated color"],
  [/\bneon\b/i, "Neon color pop"],
  [/\bhigh-contrast\b/i, "High-contrast color"],
  [/\bpastel\b/i, "Pastel pop"],
  [/\bvibrant\b/i, "Vibrant color"],
];

const TRENDING_COMPOSITION_PATTERNS: Array<[RegExp, string]> = [
  [/\blow-angle hero\b/i, "Low-angle hero"],
  [/\bvertical\b/i, "Vertical framing"],
  [/\bclose-up\b/i, "Close-up"],
  [/\bcentered\b/i, "Centered"],
];

function extractVisualHook(source: string): string | undefined {
  return extractAfterLabel(source, "Hook")
    ?? (/\b(?:giant|oversized)\b/i.test(source) ? "Oversized-object hook" : undefined)
    ?? (/\bfloating\b/i.test(source) ? "Floating-object hook" : undefined)
    ?? (/\b(?:surreal|impossible)\b/i.test(source) ? "Surreal-scene hook" : undefined)
    ?? (/\bminiature\b/i.test(source) ? "Miniature-world hook" : undefined)
    ?? (/\bglowing\b/i.test(source) ? "Glowing-element hook" : undefined);
}

export function parseTrendingViralPrompt(
  prompt: PromptRecord,
  platformText?: string | null,
): ExtractedPromptFields {
  const source = buildParseSource(prompt, platformText);

  return {
    subject: extractAfterLabel(source, "Subject") ?? extractSubject(source, prompt.title),
    visualHook: extractVisualHook(source),
    expression: firstMatch(source, EXPRESSION_PATTERNS),
    action: extractAction(source),
    composition: firstMatch(source, TRENDING_COMPOSITION_PATTERNS),
    lighting:
      extractGenericLighting(source)
      ?? (/\b(?:bright|midday|pop)\b/i.test(source) ? "Bright high-impact light" : undefined),
    palette: firstMatch(source, COLOR_IMPACT_PATTERNS) ?? extractAfterLabel(source, "Palette"),
    styleDna: firstMatch(source, VIRAL_STYLE_PATTERNS),
    background: extractBackground(source),
    crop: extractCrop(source),
  };
}

// ─── Social Media ─────────────────────────────────────────────────────────────

const SOCIAL_STYLE_PATTERNS: Array<[RegExp, string]> = [
  [/\bcozy lifestyle\b/i, "Cozy lifestyle creator"],
  [/\blifestyle creator\b/i, "Lifestyle creator"],
  [/\bcarousel\b/i, "Carousel cover layout"],
  [/\b(?:facebook|fb) (?:cover|banner)\b/i, "Facebook cover layout"],
  [/\binstagram\b/i, "Instagram post layout"],
  [/\b(?:facebook|tiktok|linkedin)\b/i, "Social platform post"],
  [/\b(?:cover|banner) (?:hero|strip|photograph)?\b/i, "Social cover layout"],
  [/\bcreator\b/i, "Creator aesthetic"],
  [/\breel\b/i, "Reel aesthetic"],
  [/\bvlog\b/i, "Vlog aesthetic"],
  [/\bminimal\b/i, "Minimal creator"],
  [/\baesthetic\b/i, "Aesthetic feed"],
];

const SOCIAL_COMPOSITION_PATTERNS: Array<[RegExp, string]> = [
  [/\bcentered vertical\b/i, "Centered vertical"],
  [/\bheadroom for text\b/i, "Vertical with text headroom"],
  [/\brule[- ]of[- ]thirds\b/i, "Rule-of-thirds composition"],
  [/\bvertical\b/i, "Vertical framing"],
  [/\bwide[- ]strip|horizontal strip\b/i, "Wide horizontal strip"],
  [/\bcentered\b/i, "Centered"],
];

const PLATFORM_CROP_PATTERNS: Array<[RegExp, string]> = [
  [/\b9:16\b/i, "9:16 vertical"],
  [/\b4:5\b/i, "4:5 portrait"],
  [/\b1:1\b/i, "1:1 square"],
  [/\b16:9\b/i, "16:9 landscape"],
];

export function parseSocialMediaPrompt(
  prompt: PromptRecord,
  platformText?: string | null,
): ExtractedPromptFields {
  const source = buildParseSource(prompt, platformText);

  return {
    subject: extractAfterLabel(source, "Subject") ?? extractSubject(source, prompt.title),
    action: extractAction(source),
    expression: firstMatch(source, EXPRESSION_PATTERNS),
    composition: firstMatch(source, SOCIAL_COMPOSITION_PATTERNS),
    crop: firstMatch(source, PLATFORM_CROP_PATTERNS),
    lighting: extractGenericLighting(source),
    brandColors: extractBrandColors(source),
    styleDna: firstMatch(source, SOCIAL_STYLE_PATTERNS),
    background: extractBackground(source),
    palette: extractAfterLabel(source, "Palette"),
  };
}
