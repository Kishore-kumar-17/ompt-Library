export const meta = {
  name: 'templatize-pilot-v3',
  description: 'Pilot v3: full-appearance [SUBJECT]/[OUTFIT] capture + identity-lock tokenization',
  phases: [{ title: 'Tokenize', detail: 'one agent per prompt' }],
}

const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const INPUTS = A.inputsPath
const SLUGS = A.slugs

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['slug', 'platforms', 'variables'],
  properties: {
    slug: { type: 'string' },
    platforms: { type: 'object', additionalProperties: { type: 'string' } },
    variables: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false, required: ['name'],
        properties: { name: { type: 'string' }, default: { type: 'string' } },
      },
    },
  },
}

function buildPrompt(slug) {
  return [
    'You insert [TOKEN] placeholders into AI image prompts so a user can fully personalize the subject/product while the engineering stays fixed. You NEVER rewrite, summarize, or reorder prose — you ONLY replace swappable phrases with an UPPER_SNAKE [TOKEN].',
    '',
    'Each prompt has 3 sections: a DESCRIPTIVE paragraph, then a "LOCK LAYER" block of "LOCK NN - LABEL: value" lines, then a "NEGATIVE LOCKS" block.',
    '',
    'Steps:',
    '1. Read the JSON file at: ' + INPUTS + ' (an array of objects).',
    '2. Find the object whose "slug" === "' + slug + '".',
    '3. Use its "fullByPlatform" (map of platform -> FULL prompt text) and "whitelist" (allowed token names).',
    '',
    'CAPTURE BREADTH (important):',
    '- [SUBJECT] must capture the ENTIRE person/character appearance as ONE token: age, gender, hair (and its hex), eyes, skin tone, facial features — everything describing who they look like. Bracket the whole run, stopping BEFORE clothing, pose, expression, or the next structural element (Composition/Camera/Lighting/Setting). Example: "Subject: [approximately 30-year-old woman with auburn hair #8B3A0E, hazel eyes #C89B5C, warm skin #F5CBA7]" -> "Subject: [SUBJECT]".',
    '- [OUTFIT] must capture the WHOLE clothing description as ONE token (garment, fabric, colour + hex, details). Example: "wearing a [relaxed cream knit sweater #F5E6D3]" -> "wearing a [OUTFIT]".',
    '- [PRODUCT] captures the whole product noun phrase; [SETTING] the whole environment phrase.',
    '',
    'RULES:',
    '- Allowed tokens = the whitelist names as [NAME]. For people/portraits/fashion ALWAYS produce [SUBJECT] (full appearance) and [OUTFIT] (full clothing) when a person + clothing are present.',
    '- DESCRIPTIVE: bracket ONLY swappable content (subject appearance, outfit, product, brand, accent colour, headline text). NEVER bracket camera specs, hex codes that belong to the Palette line, lighting, composition, or style descriptors.',
    '- LOCK LAYER: for lock lines whose LABEL is SUBJECT, CHARACTER, HERO SUBJECT, MAIN SUBJECT, PRODUCT, MODEL, GARMENT, WARDROBE, or OUTFIT, replace the ENTIRE value after the colon with the matching token, e.g. "LOCK 01 - SUBJECT: [SUBJECT]", "LOCK 07 - WARDROBE: [OUTFIT]". Use the SAME token as the descriptive (WARDROBE/GARMENT -> [OUTFIT]; CHARACTER/HERO SUBJECT/MAIN SUBJECT/MODEL -> [SUBJECT]; PRODUCT -> [PRODUCT]).',
    '- Leave EVERY other lock line EXACTLY as-is: COMPOSITION, LIGHTING, PALETTE, STYLE DNA, CAMERA, MATERIAL, ORIENTATION, SCALE, POSITION, EXPRESSION, POSE, GAZE, BACKGROUND, CROP, CAMPAIGN/BRAND/ART STYLE, EMOTION, etc.',
    '- NEVER put a token anywhere in the NEGATIVE LOCKS section — leave that whole block byte-for-byte unchanged.',
    '- Keep the SAME LOCK numbering/order. Use the SAME tokens consistently across EVERY platform variant (every variant must contain exactly the same set of tokens).',
    '- At most 4 distinct tokens. Output each platform text verbatim except for the inserted [TOKEN]s.',
    '- For each token report "default": the exact full original phrase you replaced in the DESCRIPTIVE (from the first platform variant).',
    '',
    'Return ONLY {slug, platforms:{<platform>:<full tokenized text>}, variables:[{name, default}]}. platforms MUST include every platform key from fullByPlatform.',
  ].join('\n')
}

phase('Tokenize')
const results = await parallel(
  SLUGS.map((slug) => () =>
    agent(buildPrompt(slug), { label: 'tok3:' + slug, phase: 'Tokenize', schema: SCHEMA, agentType: 'general-purpose' })
  )
)
const ok = results.filter(Boolean)
log('tokenized ' + ok.length + '/' + SLUGS.length)
return ok
