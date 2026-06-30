export const meta = {
  name: 'templatize-library-full',
  description: 'Full run: tokenize descriptive layer (full-appearance) for all 419 image prompts; locks untouched',
  phases: [{ title: 'Tokenize', detail: 'one agent per prompt' }],
}

const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const DIR = A.inputsDir
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
    'You insert [TOKEN] placeholders into an AI image-prompt DESCRIPTION so a user can fully personalize it. You NEVER rewrite, summarize, or reorder the prose — you ONLY replace swappable phrases with an UPPER_SNAKE [TOKEN]. You work on the DESCRIPTION ONLY (there is no lock layer here).',
    '',
    'Steps:',
    '1. Read the JSON file at: ' + DIR + '/' + slug + '.json',
    '2. It has "descByPlatform" (map of platform -> descriptive text) and "whitelist" (allowed token names).',
    '',
    'CAPTURE BREADTH (important):',
    '- [SUBJECT] must capture the ENTIRE person/character appearance as ONE token: age, gender, hair (and its hex), eyes, skin tone, facial features — everything describing who they look like. Stop BEFORE clothing, pose, expression, or the next structural element (Composition/Camera/Lighting/Setting). e.g. "Subject: approximately 30-year-old woman with auburn hair #8B3A0E, hazel eyes #C89B5C, warm skin #F5CBA7" -> "Subject: [SUBJECT]".',
    '- [OUTFIT] must capture the WHOLE clothing description as ONE token (garment, fabric, colour + hex, details). e.g. "wearing a relaxed cream knit sweater #F5E6D3" -> "wearing a [OUTFIT]".',
    '- [PRODUCT] = the whole product noun phrase; [SETTING] = the whole environment phrase; [BRAND]/[COLOR]/[TAGLINE]/[TEXT]/[THEME] = their phrase.',
    '',
    'RULES:',
    '- Allowed tokens = the whitelist names written as [NAME]; add a clearly-named custom [TOKEN] only if essential. For people/portraits/fashion ALWAYS produce [SUBJECT] (full appearance) and [OUTFIT] (full clothing) when a person + clothing are present.',
    '- Only bracket genuinely swappable content (subject appearance, outfit, product, brand, accent colour, headline text). NEVER bracket camera specs, the hex codes in the Palette line, lighting, composition, or style descriptors. Leave the Palette/References/Exclude lines as-is.',
    '- Use the SAME tokens consistently across EVERY platform variant — every variant must contain exactly the same set of tokens.',
    '- Use at most 4 distinct tokens. Output each platform text verbatim except for the inserted [TOKEN]s (same words, order, punctuation).',
    '- For each token report its "default": the exact full original phrase you replaced in the DESCRIPTIVE (from the first platform variant).',
    '- If nothing is genuinely swappable, return the descriptions unchanged with an empty variables array.',
    '',
    'Return ONLY {slug:"' + slug + '", platforms:{<platform>:<tokenized description>}, variables:[{name, default}]}. platforms MUST include every platform key from descByPlatform.',
  ].join('\n')
}

phase('Tokenize')
const results = await parallel(
  SLUGS.map((slug) => () =>
    agent(buildPrompt(slug), { label: 'tok:' + slug, phase: 'Tokenize', schema: SCHEMA, agentType: 'general-purpose' })
  )
)
const ok = results.filter(Boolean)
log('tokenized ' + ok.length + '/' + SLUGS.length + ' prompts')
return ok
