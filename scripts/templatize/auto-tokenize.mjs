#!/usr/bin/env node
/**
 * Auto-tokenize remaining slugs by reading each input file,
 * identifying swappable phrases per category, and inserting [TOKEN] placeholders.
 * Uses heuristic patterns derived from the 305 already-completed results.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const INPUTS = path.join(ROOT, "scripts/templatize/inputs");
const remaining = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/templatize/remaining-slugs.json"), "utf8"));

// ── Category-specific extraction rules ──
// Each rule: { token, finder(chatgptText) => phrase | null }
// finder returns the EXACT phrase to replace across all platforms

function extractSubject(text) {
  // Match "Subject: <phrase>" up to the next structural keyword
  let m = text.match(/Subject(?:\s*\+\s*Action)?:\s*(.+?)(?:\.\s*(?:Composition|Camera|Lighting|Setting|Wardrobe|Medium|Material|Palette|Typography|Color|References|Exclude|Capture|Light|Refs)\b)/s);
  if (m) {
    let subj = m[1].trim();
    // For people categories, extract just the person description
    // Look for pattern like "a <person description>, wearing" or "a <person description>; "
    const personMatch = subj.match(/^(.+?)(?:,?\s*wearing\b|;\s*Subsurface|;\s*stark|\.\s*Composition)/s);
    if (personMatch) subj = personMatch[1].trim();
    // Remove trailing punctuation
    subj = subj.replace(/[,;.]$/, "").trim();
    if (subj.length > 20) return subj;
  }
  return null;
}

function extractAfterKeyword(text, keyword) {
  const re = new RegExp(keyword + "\\s*[:.]\\s*(.+?)(?:\\.|\\s*(?:Composition|Camera|Lighting|Medium|Material|Palette|Typography|Color|References|Exclude|Capture|Light|Refs)\\b)", "s");
  const m = text.match(re);
  if (m) {
    let val = m[1].trim().replace(/[,;.]$/, "").trim();
    if (val.length > 10) return val;
  }
  return null;
}

function extractQuotedText(text, label) {
  // Match 'TEXT' or "TEXT" after a label
  const re = new RegExp("'" + "([^']{3,})" + "'", "g");
  const matches = [...text.matchAll(re)];
  if (matches.length > 0) return matches[0][1];
  return null;
}

function extractHeadline(text) {
  // Find headline text in quotes, usually the first prominent quoted string
  const m = text.match(/'([A-Z][A-Z\s&·\-–—%0-9]{2,40})'/);
  if (m) return m[1];
  return null;
}

function extractBrand(text) {
  // Brand is often in the title or first quoted string
  const m = text.match(/for\s+([A-Z][A-Za-z\s&'·]+?)(?:\s+(?:Paris|London|New York|campaign|collection|flagship|over-ear|TABLE|AW|SS|FW)\b)/);
  if (m) return m[1].trim();
  // Try quoted brand
  const m2 = text.match(/'([A-Z][A-Z\s&·]{2,20})'/);
  if (m2) return m2[1];
  return null;
}

function extractProduct(text) {
  const m = text.match(/(?:Subject(?:\s*\+\s*Action)?:\s*)(?:a\s+|an\s+)?(.+?)(?:\s+with\b|\s+featuring\b|,\s*'|\.\s*Composition)/s);
  if (m) {
    let prod = m[1].trim().replace(/[,;.]$/, "").trim();
    if (prod.length > 10 && prod.length < 200) return prod;
  }
  return null;
}

function extractTagline(text) {
  return extractHeadline(text);
}

function extractOutfit(text) {
  // Match "wearing <outfit>" or "Wardrobe: <outfit>"
  let m = text.match(/(?:wearing\s+(?:a\s+|an\s+)?)(.+?)(?:,\s*(?:calm|confident|direct|subtle|standing|seated|natural|poised|against|with\s+a\s+(?:calm|confident|warm)))/s);
  if (m) {
    let outfit = m[1].trim().replace(/[,;.]$/, "").trim();
    if (outfit.length > 10) return outfit;
  }
  m = text.match(/Wardrobe:\s*(.+?)(?:\.\s*(?:Setting|Composition|Camera))/s);
  if (m) {
    let outfit = m[1].trim().replace(/[,;.]$/, "").trim();
    if (outfit.length > 10) return outfit;
  }
  return null;
}

function extractSetting(text) {
  return extractAfterKeyword(text, "Setting");
}

function extractColor(text) {
  // Extract accent color mentions
  const m = text.match(/accent\s+(?:colour|color)\s+([#A-Fa-f0-9]{7})/);
  if (m) return m[1];
  return null;
}

function extractTheme(text) {
  // For VRL/trending - extract the main theme/concept
  const m = text.match(/(?:Scene|Theme|Concept)[:\s]+(.+?)(?:\.\s*(?:Composition|Camera|Lighting|Subject))/s);
  if (m) {
    let theme = m[1].trim().replace(/[,;.]$/, "").trim();
    if (theme.length > 10 && theme.length < 300) return theme;
  }
  return null;
}

function extractText(text) {
  // Extract text/headline overlays
  const m = text.match(/'([A-Z][A-Z\s&·\-–—%0-9!?]{2,50})'\s*(?:\d+pt|headline|text|overlay|title|caption|typography)/i);
  if (m) return m[1];
  return extractHeadline(text);
}

// ── Per-category token extraction ──
const CATEGORY_EXTRACTORS = {
  "MKT-FLY": (text, input) => {
    const tokens = [];
    const tagline = extractTagline(text);
    if (tagline) tokens.push({ name: "TAGLINE", default: tagline });
    // For flyers, product is in the title
    const prodM = text.match(/(?:Flyer|Advertisement)\s+for\s+(?:a\s+)?(.+?)(?:\.\s*Subject)/s);
    if (prodM) {
      let prod = prodM[1].trim().replace(/[,;.]$/, "");
      if (prod.length > 5) tokens.push({ name: "PRODUCT", default: prod });
    }
    return tokens;
  },
  "MKT-POS": (text, input) => {
    const tokens = [];
    const tagline = extractTagline(text);
    if (tagline) tokens.push({ name: "TAGLINE", default: tagline });
    const brand = extractBrand(text);
    if (brand) tokens.push({ name: "BRAND", default: brand });
    return tokens;
  },
  "PEO-AVT": (text, input) => {
    const tokens = [];
    // Try "Subject: ... wearing" first, then fallback to inline person description
    let subjM = text.match(/Subject:\s*(.+?)(?:,\s*wearing\b)/s);
    if (!subjM) {
      // Inline: "portrait of a <person> wearing"
      subjM = text.match(/(?:portrait of|depicting|featuring)\s+(?:a\s+)?(.+?)(?:,?\s*wearing\b)/s);
    }
    if (subjM) tokens.push({ name: "SUBJECT", default: subjM[1].trim().replace(/[,;.]$/, "") });
    // Outfit: "wearing <outfit>, <next-section-keyword>"
    let outfitM = text.match(/wearing\s+(?:a\s+|an\s+)?(.+?)(?:,\s*(?:shoulders|calm|confident|direct|warm|natural|poised|standing|seated|gentle|friendly|head)\b)/s);
    if (!outfitM) outfitM = text.match(/wearing\s+(?:a\s+|an\s+)?(.+?)(?:,\s*\w+\s+(?:expression|gaze|framing|crop))/s);
    if (outfitM) tokens.push({ name: "OUTFIT", default: outfitM[1].trim().replace(/[,;.]$/, "") });
    return tokens;
  },
  "PEO-CUL": (text, input) => {
    const tokens = [];
    const subjM = text.match(/Subject:\s*(.+?)(?:;\s*Subsurface)/s);
    if (subjM) tokens.push({ name: "SUBJECT", default: subjM[1].trim() });
    const outfit = text.match(/Wardrobe:\s*(.+?)(?:\.\s*Setting)/s);
    if (outfit) tokens.push({ name: "OUTFIT", default: outfit[1].trim() });
    const setting = extractSetting(text);
    if (setting) tokens.push({ name: "SETTING", default: setting });
    return tokens;
  },
  "PEO-PRO": (text, input) => {
    const tokens = [];
    const subjM = text.match(/Subject[s]?:\s*(.+?)(?:\.\s*Setting)/s);
    if (subjM) tokens.push({ name: "SUBJECT", default: subjM[1].trim() });
    const setting = extractSetting(text);
    if (setting) tokens.push({ name: "SETTING", default: setting });
    const outfit = extractOutfit(text);
    if (outfit) tokens.push({ name: "OUTFIT", default: outfit });
    return tokens;
  },
  "PRD-LIF": (text, input) => {
    const tokens = [];
    const brand = extractBrand(text);
    if (brand) tokens.push({ name: "BRAND", default: brand });
    // Product is usually after "Subject:" in product categories
    const prodM = text.match(/Subject:\s*(?:partial\s+)?(?:tablescape\s+with\s+)?(.+?)(?:,\s*'|,\s*wrought|\.\s*Composition)/s);
    if (prodM) {
      let p = prodM[1].trim().replace(/[,;.]$/, "");
      if (p.length > 10) tokens.push({ name: "PRODUCT", default: p });
    }
    return tokens;
  },
  "PRD-PHT": (text, input) => {
    const tokens = [];
    let brand = extractBrand(text);
    if (!brand) {
      // Try: "for BRAND product-type"
      const m = text.match(/for\s+([A-Z][A-Z0-9\s&·-]{2,20}?)\s+(?:headphones|speakers|watch|bottle|sneakers|shoes|perfume|camera|laptop|phone|tablet|chair|lamp|bag|sunglasses|earbuds|product|Fountain|gold-aluminum|over-ear)/);
      if (m) brand = m[1].trim();
    }
    if (!brand) {
      // Try: "'BRAND' Npt" (brand in quotes with type size)
      const m = text.match(/'([A-Z][A-Z0-9\s]{2,20}?)'\s*\d+pt/);
      if (m) brand = m[1].trim();
    }
    if (brand) tokens.push({ name: "BRAND", default: brand });
    const setting = extractSetting(text);
    if (setting) tokens.push({ name: "SETTING", default: setting });
    return tokens;
  },
  "SOC-INS": (text, input) => {
    const tokens = [];
    const subjM = text.match(/Subject:\s*(?:single\s+)?(.+?)(?:,\s*\d|,\s*hairline|\.\s*Composition)/s);
    if (subjM) tokens.push({ name: "SUBJECT", default: subjM[1].trim() });
    const brand = extractBrand(text);
    if (brand) tokens.push({ name: "BRAND", default: brand });
    return tokens;
  },
  "VRL": (text, input) => {
    const tokens = [];
    // VRL prompts are diverse - try multiple patterns to extract subject
    const subjPatterns = [
      /Subject:\s*(.+?)(?:\.\s*(?:Composition|Setting|Camera|Lighting))/s,
      // "featuring <person> standing/sitting/wearing/holding/in a..."
      /(?:featuring|depicting)\s+(?:a\s+|an\s+)?(.+?)(?:\s+(?:standing|sitting|posing|walking|looking|holding|leaning|gazing|facing|in\s+an?\s+(?:oversized|elaborate|dramatic))\b)/s,
      // "portrait of <person> with/wearing/rendered..."
      /(?:portrait (?:of|image)|illustration of|photo of|image of|render of|portrait painting of|portrait photograph of)\s+(?:a\s+|an\s+)?(.+?)(?:\s+(?:with\s+(?:a\s+)?(?:natural|soft|warm|cool|dramatic|gentle|relaxed|confident|exact|strict)|wearing|rendered|in\s+a\s+(?:powerful|casual|elegant|modern|traditional|confident)))/s,
      // "a young woman/man <description>. <next sentence>"
      /(?:Create\s+.+?\.\s+)(?:The\s+)?(?:main\s+)?(?:subject\s+is\s+)?(?:a\s+|an\s+)?((?:young|elderly|middle-aged|teenage)?\s*(?:woman|man|girl|boy|couple|person|child|lady|gentleman|figure|character|model|Indian woman|Indian man|South Indian).+?)(?:\.\s+(?:The|She|He|They|Composition|Warm|Soft|A\s+glowing|Behind|Around|In\s+the|Her|His|Style|Large|Four|Multi|Preserve|Maintain|Apply|Use\s+))/s,
      // "of <named person> with..."
      /(?:illustration of|sketch.style illustration of|photo of|portrait of)\s+(.+?)(?:\s+(?:with\s+(?:an?\s+)?(?:exact|strict)|in\s+a\s+(?:powerful|casual|elegant)|,\s*in\s+a|,\s*rendered)\b)/s,
      // "featuring <person> in <outfit>"
      /(?:featuring|of)\s+(?:a\s+|an\s+|the\s+)?(.+?)(?:\s+in\s+(?:an?\s+)?(?:oversized|elaborate|dramatic|elegant|traditional|luxurious|rich|deep)\b)/s,
      // Broader: person after first sentence ending, capturing until next sentence break with keyword
      /(?:Create\s+.+?\.\s*)(.+?)(?:\.\s+(?:The|Composition|Background|Warm|Soft|Behind|Camera|Lighting|Setting|Style|Include|Bright|High|Apply|Use|Around|Design|Inspired))/s,
    ];
    for (const pat of subjPatterns) {
      const m = text.match(pat);
      if (m && m[1].length > 15 && m[1].length < 400) {
        let subj = m[1].trim().replace(/[,;.]$/, "");
        // Don't capture overly generic scene descriptions
        if (subj.match(/^(?:a\s+)?(?:chaotic|ultra-detailed|visually\s+rich)\b/i) && subj.length > 200) continue;
        // Don't capture if it's mostly about style not subject
        if (subj.match(/^(?:strong contrast|crisp brushstrokes|abstract)/i)) continue;
        tokens.push({ name: "SUBJECT", default: subj });
        break;
      }
    }
    // Theme
    const theme = extractTheme(text);
    if (theme) tokens.push({ name: "THEME", default: theme });
    return tokens;
  },
};

// ── Structural end-boundary patterns ──
const STRUCT_END = /(?:\.\s*(?:Composition|Rule|Camera|Lighting|Setting|Wardrobe|Medium|Material|Palette|Typography|Color|Refs|Exclude|Capture|DaVinci|Phase|Hasselblad|Canon|Sony|Nikon|Light|References)\b|;\s|,\s*(?:calm|confident|wearing|against|standing|seated|shoulders|warm\s+closed|looking|direct|poised|gentle|natural\s+(?:expression|smile))\b|::\s)/;

// Extract distinctive anchor words from a phrase (skip filler, keep nouns/adjectives/hex)
function getAnchors(phrase) {
  const fillers = new Set(["a","an","the","of","in","on","at","to","and","or","with","for","her","his","its","their","by","from","as","is","are","was","were","be","been","that","this","which","who","whom","whose","than","into"]);
  return phrase
    .split(/[\s,;:]+/)
    .map(w => w.replace(/^['"""]+|['"""]+$/g, ""))
    .filter(w => w.length > 2 && !fillers.has(w.toLowerCase()))
    .filter(w => /[A-Za-z#]/.test(w)); // keep words and hex codes
}

// Find the region in text that best matches the default phrase using anchor words
function fuzzyFindRegion(text, defaultPhrase, tokenName) {
  const anchors = getAnchors(defaultPhrase);
  if (anchors.length < 2) return null;

  // Use first 3 distinctive anchors to find the start position
  const startAnchors = anchors.slice(0, 3);
  let bestStart = -1;

  // Try finding anchor sequences
  for (let tryCount = 0; tryCount < startAnchors.length; tryCount++) {
    const anchor = startAnchors[tryCount];
    let searchFrom = 0;
    while (true) {
      const idx = text.indexOf(anchor, searchFrom);
      if (idx === -1) break;
      const region = text.substring(idx, idx + Math.min(defaultPhrase.length * 2, 500));
      const found = startAnchors.filter(a => region.includes(a));
      if (found.length >= Math.min(2, startAnchors.length)) {
        bestStart = idx;
        break;
      }
      searchFrom = idx + 1;
    }
    if (bestStart >= 0) break;
  }

  if (bestStart === -1) return null;

  // Find the end using the last anchor word from the default phrase
  // But DON'T go beyond the expected length (use default phrase length * 1.5 as max)
  const maxLen = Math.floor(defaultPhrase.length * 1.5);
  const searchRegion = text.substring(bestStart, bestStart + maxLen);

  // Find the last anchor that appears within the bounded region
  const lastAnchors = anchors.slice(-3);
  let bestEnd = bestStart + Math.min(20, searchRegion.length);
  for (const anchor of lastAnchors) {
    const idx = searchRegion.indexOf(anchor);
    if (idx >= 0) {
      bestEnd = Math.max(bestEnd, bestStart + idx + anchor.length);
    }
  }

  // Extend only to the very next word boundary or structural break (not far away)
  const afterEnd = text.substring(bestEnd, bestEnd + 50);
  const boundaryMatch = afterEnd.match(/^(\s*\S*?)(?:\s+(?:shoulders|warm|looking|direct|calm|confident|poised|gentle|natural|head|chest|composition|rule|camera|setting|standing|seated|against)\b|[.;]|\s*::\s)/i);
  if (boundaryMatch) {
    bestEnd += boundaryMatch[1].length;
  }

  // Trim trailing whitespace/punctuation
  let matched = text.substring(bestStart, bestEnd).replace(/[\s,;.]+$/, "");

  // Validate: at least 40% of anchors should be in the matched region
  const overlap = anchors.filter(a => matched.includes(a));
  if (overlap.length < anchors.length * 0.4) return null;

  // Sanity: matched region shouldn't be more than 2x the default phrase length
  if (matched.length > defaultPhrase.length * 2.5) return null;

  return { start: bestStart, end: bestStart + matched.length, matched };
}

// Sliding window: find the text region with highest anchor overlap
function slidingWindowMatch(text, defaultPhrase, anchors) {
  // Pick 3–5 most distinctive anchors (longer words, hex codes)
  const scored = anchors
    .map(a => ({ word: a, score: a.length + (a.startsWith("#") ? 10 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(a => a.word);

  // Find positions of each distinctive anchor in text
  const positions = [];
  for (const anchor of scored) {
    let idx = text.indexOf(anchor);
    while (idx >= 0) {
      positions.push({ anchor, idx });
      idx = text.indexOf(anchor, idx + 1);
    }
  }
  if (positions.length < 2) return null;

  // Try windows anchored at each position
  const targetLen = defaultPhrase.length;
  const minLen = Math.floor(targetLen * 0.3);
  const maxLen = Math.floor(targetLen * 2.0);
  let bestWindow = null, bestScore = 0;

  for (const pos of positions) {
    // Try window starting a bit before this anchor
    const wStart = Math.max(0, pos.idx - 20);
    for (const endPos of positions) {
      if (endPos.idx <= pos.idx) continue;
      const wEnd = endPos.idx + endPos.anchor.length;
      const wLen = wEnd - wStart;
      if (wLen < minLen || wLen > maxLen) continue;
      const window = text.substring(wStart, wEnd);
      const matchCount = scored.filter(a => window.includes(a)).length;
      // Score: anchor matches weighted, penalize length deviation
      const lenRatio = Math.min(wLen, targetLen) / Math.max(wLen, targetLen);
      const score = matchCount * 2 + lenRatio;
      if (matchCount >= 2 && score > bestScore) {
        bestScore = score;
        bestWindow = { start: wStart, end: wEnd };
      }
    }
  }

  if (!bestWindow || bestScore < 3) return null;

  // Snap start/end to word boundaries
  let { start, end } = bestWindow;
  while (start > 0 && text[start - 1] !== " " && text[start - 1] !== "," && text[start - 1] !== ".") start--;
  // Trim trailing punctuation/spaces
  while (end < text.length && text[end] !== " " && text[end] !== "," && text[end] !== "." && text[end] !== ";") end++;
  let matched = text.substring(start, end).replace(/^[\s,;.]+|[\s,;.]+$/g, "");

  return { start, end: start + matched.length, matched };
}

// ── Replace default phrase with [TOKEN] in all platform variants ──
function replaceInAllPlatforms(descByPlatform, defaultPhrase, tokenName) {
  const result = {};
  for (const [plat, text] of Object.entries(descByPlatform)) {
    // Strategy 1: Exact match
    if (text.includes(defaultPhrase)) {
      result[plat] = text.split(defaultPhrase).join(`[${tokenName}]`);
      continue;
    }

    // Strategy 2: Prefix match (first 25 chars) + boundary
    const shortPhrase = defaultPhrase.substring(0, Math.min(25, defaultPhrase.length));
    const prefixIdx = text.indexOf(shortPhrase);
    if (prefixIdx !== -1) {
      const afterIdx = prefixIdx + shortPhrase.length;
      const rest = text.substring(afterIdx);
      const endMatch = rest.match(/^(.*?)(?:\.\s*(?:Composition|Rule|Camera|Lighting|Setting|Wardrobe|Medium|Material|Palette|Typography|Color|Refs|Exclude|Capture|DaVinci|Phase|Hasselblad|Canon|Sony|Nikon|Light|References)\b|;\s|::\s|,\s*(?:calm|confident|wearing|against|standing|seated|shoulders|warm\s+closed|looking|direct|poised|gentle|natural\s+(?:expression|smile))\b)/s);
      if (endMatch) {
        const fullMatch = shortPhrase + endMatch[1];
        result[plat] = text.split(fullMatch).join(`[${tokenName}]`);
        continue;
      }
    }

    // Strategy 3: Fuzzy anchor-based matching
    const fuzzy = fuzzyFindRegion(text, defaultPhrase, tokenName);
    if (fuzzy) {
      result[plat] = text.substring(0, fuzzy.start) + `[${tokenName}]` + text.substring(fuzzy.start + fuzzy.matched.length);
      continue;
    }

    // Strategy 4: Sliding window — find the window that shares the most anchor words
    const anchors = getAnchors(defaultPhrase);
    if (anchors.length >= 3) {
      const winResult = slidingWindowMatch(text, defaultPhrase, anchors);
      if (winResult) {
        result[plat] = text.substring(0, winResult.start) + `[${tokenName}]` + text.substring(winResult.end);
        continue;
      }
    }

    // Fallback: keep original
    result[plat] = text;
  }
  return result;
}

// ── Per-platform re-extraction for missing tokens ──
function perPlatformExtract(platText, tokenName, defaultValue, catPrefix, input) {
  // Strategy A: anchor-based (works for structured categories)
  const anchorResult = anchorBasedExtract(platText, tokenName, defaultValue);
  if (anchorResult) return anchorResult;

  // Strategy B: category-aware structural extraction (for VRL and others)
  return structuralExtract(platText, tokenName, defaultValue, catPrefix);
}

function anchorBasedExtract(platText, tokenName, defaultValue) {
  const anchors = getAnchors(defaultValue);
  if (anchors.length < 2) return null;

  const distinctive = anchors
    .filter(a => a.length > 4 || a.startsWith("#"))
    .sort((a, b) => b.length - a.length)
    .slice(0, 4);

  if (distinctive.length < 1) return null;

  let regionStart = -1;
  for (const d of distinctive) {
    const idx = platText.indexOf(d);
    if (idx >= 0) { regionStart = idx; break; }
  }
  if (regionStart === -1) return null;

  let start = regionStart;
  const before = platText.substring(Math.max(0, start - 80), start);
  const breakPoints = [
    before.lastIndexOf(". "), before.lastIndexOf(", "),
    before.lastIndexOf(":: "), before.lastIndexOf("; "),
  ].filter(i => i >= 0);
  if (breakPoints.length > 0) {
    const lastBreak = Math.max(...breakPoints);
    start = Math.max(0, start - 80) + lastBreak;
    while (start < regionStart && /[\s.,;:]/.test(platText[start])) start++;
  }

  let end = regionStart + distinctive[0].length;
  for (const d of distinctive) {
    const idx = platText.indexOf(d, regionStart);
    if (idx >= 0) end = Math.max(end, idx + d.length);
  }

  const after = platText.substring(end, end + 100);
  const endBound = after.match(/^(.+?)(?:\.\s|,\s*(?:Composition|Rule|Camera|Head|Centered|Eye|AR\s|body|hero|head|shoulders|full)\b|;\s|::\s|\s+(?:Composition|Rule|Camera|Lighting|head|shoulders|Eye-Level|Centered|hero|AR\s|body)\b)/i);
  if (endBound) end += endBound[1].length;

  let matched = platText.substring(start, end).replace(/[\s,;.]+$/, "").replace(/^[\s,;.]+/, "");

  const found = distinctive.filter(d => matched.includes(d));
  if (found.length < 1) return null;
  if (matched.length < defaultValue.length * 0.15 || matched.length > defaultValue.length * 3.5) return null;
  if (matched.length > platText.length * 0.6) return null;

  return platText.substring(0, start) + `[${tokenName}]` + platText.substring(end);
}

// Category-aware structural extraction
// For condensed platforms that completely rephrase text, find the equivalent
// content region by understanding the prompt's structure
function structuralExtract(platText, tokenName, defaultValue, catPrefix) {
  if (tokenName === "SUBJECT") {
    // VRL/PEO subjects: find person descriptions in condensed text
    // Condensed platforms often start with the title then have the description
    const patterns = [
      // "Subject: <text>. " or "Subject: <text>, "
      /Subject[s]?:\s*(.+?)(?:\.\s|\s*,\s*(?:wearing|standing|sitting|in\s+a|against|Composition|Rule|Camera|Eye|head|shoulders))/is,
      // Person descriptor after title/style intro: "<title>. <person description>."
      /(?:^[^.]+\.\s*)([A-Z]?[a-z].*?(?:woman|man|girl|boy|couple|person|model|figure|character|warrior|dancer|musician|piper|founder|CEO).+?)(?:\.\s|;\s|,\s*(?:Composition|Rule|Camera|Eye|head|shoulders|4K|AR\s))/is,
      // After :: for midjourney
      /::\s*(.+?(?:woman|man|girl|boy|couple|person|model).+?)(?:\s*::|\.\s)/is,
      // Inline: find the first substantial person description
      /(?:featuring|depicting|portrait of|illustration of|photo of|image of)\s+(?:a\s+|an\s+)?(.+?)(?:\.\s|;\s|,\s*(?:soft|warm|Composition|Rule|4K))/is,
      // Generic: person noun with surrounding description up to next break
      /((?:\w+\s+){0,5}(?:woman|man|girl|boy|couple|person|model|figure|character)\s+.+?)(?:\.\s|;\s|::\s|,\s*(?:Composition|Rule|Camera|soft|warm|4K|AR\s))/is,
    ];
    for (const pat of patterns) {
      const m = platText.match(pat);
      if (m && m[1].length > 15 && m[1].length < defaultValue.length * 3) {
        let subj = m[1].trim().replace(/[\s,;.]+$/, "");
        // Don't capture if it's most of the text
        if (subj.length > platText.length * 0.5) continue;
        const start = platText.indexOf(m[1]);
        if (start >= 0) {
          return platText.substring(0, start) + `[${tokenName}]` + platText.substring(start + m[1].length);
        }
      }
    }
  }

  if (tokenName === "OUTFIT") {
    // Find clothing descriptions
    const patterns = [
      /Wardrobe:\s*(.+?)(?:\.\s*(?:Setting|Composition))/is,
      /(?:wearing|dressed in)\s+(?:a\s+|an\s+)?(.+?)(?:,\s*(?:calm|confident|standing|seated|shoulders|warm|poised|gentle|natural|head|looking|direct)\b|\.\s)/is,
      // Condensed: after subject, clothing terms before next section
      /((?:silk|cotton|linen|velvet|satin|wool|leather|denim|knit|kimono|saree|sari|suit|dress|gown|jacket|blazer|coat|shirt|blouse|cardigan|sweater|hoodie|trousers|pants|skirt|shuka|traje|kilt|turban|pagri|safa).+?)(?:\.\s|;\s|,\s*(?:Composition|Rule|Camera|head|shoulders|Eye|4K|AR\s))/is,
    ];
    for (const pat of patterns) {
      const m = platText.match(pat);
      if (m && m[1].length > 10 && m[1].length < defaultValue.length * 3) {
        let outfit = m[1].trim().replace(/[\s,;.]+$/, "");
        if (outfit.length > platText.length * 0.5) continue;
        const start = platText.indexOf(m[1]);
        if (start >= 0) {
          return platText.substring(0, start) + `[${tokenName}]` + platText.substring(start + m[1].length);
        }
      }
    }
  }

  if (tokenName === "SETTING") {
    const patterns = [
      /Setting:\s*(.+?)(?:\.\s*(?:Composition|Camera))/is,
      // Condensed: location/environment keywords
      /((?:courtyard|garden|temple|path|street|studio|room|loft|office|café|beach|forest|mountain|rooftop|balcony|corridor|archway|fortress|palace|market).+?)(?:\.\s|;\s|,\s*(?:Composition|Rule|Camera|Eye|head|4K|AR\s))/is,
    ];
    for (const pat of patterns) {
      const m = platText.match(pat);
      if (m && m[1].length > 10 && m[1].length < defaultValue.length * 3) {
        let setting = m[1].trim().replace(/[\s,;.]+$/, "");
        if (setting.length > platText.length * 0.4) continue;
        const start = platText.indexOf(m[1]);
        if (start >= 0) {
          return platText.substring(0, start) + `[${tokenName}]` + platText.substring(start + m[1].length);
        }
      }
    }
  }

  return null;
}

// ── Main processing ──
const results = [];
let success = 0, noTokens = 0, errors = 0;

for (const slug of remaining) {
  try {
    const input = JSON.parse(fs.readFileSync(path.join(INPUTS, slug + ".json"), "utf8"));
    const chatgpt = input.descByPlatform.chatgpt || "";

    // Determine category
    const catPrefix = slug.match(/^[A-Z]+-[A-Z]+/)?.[0] || "";
    const extractor = CATEGORY_EXTRACTORS[catPrefix] || CATEGORY_EXTRACTORS["VRL"];

    // Extract tokens from chatgpt variant
    const variables = extractor(chatgpt, input);

    if (variables.length === 0) {
      // No tokens found - keep original
      results.push({ slug, platforms: input.descByPlatform, variables: [] });
      noTokens++;
      continue;
    }

    // Apply replacements
    let platforms = { ...input.descByPlatform };
    for (const v of variables) {
      const newPlatforms = replaceInAllPlatforms(platforms, v.default, v.name);
      platforms = newPlatforms;
    }

    // Post-process: for platforms still missing tokens, try per-platform re-extraction
    const allPlats = Object.keys(platforms);
    for (const v of variables) {
      const token = `[${v.name}]`;
      const missingPlats = allPlats.filter(p => platforms[p].indexOf(token) === -1);
      if (missingPlats.length === 0) continue;

      for (const plat of missingPlats) {
        const platText = platforms[plat];
        const replaced = perPlatformExtract(platText, v.name, v.default, catPrefix, input);
        if (replaced) platforms[plat] = replaced;
      }
    }

    // Verify tokens are present in chatgpt output
    const chatgptResult = platforms.chatgpt || "";
    const validVars = variables.filter(v => chatgptResult.includes(`[${v.name}]`));

    results.push({ slug, platforms, variables: validVars });
    if (validVars.length > 0) success++;
    else noTokens++;
  } catch (e) {
    console.error(`Error processing ${slug}: ${e.message}`);
    errors++;
  }
}

// Write results
const outFile = path.join(ROOT, "scripts/templatize/auto-tokenize-results.json");
fs.writeFileSync(outFile, JSON.stringify(results, null, 2));

console.log(`\nProcessed: ${remaining.length}`);
console.log(`With tokens: ${success}`);
console.log(`No tokens found: ${noTokens}`);
console.log(`Errors: ${errors}`);
console.log(`Results saved to: ${outFile}`);

// Show summary per slug
for (const r of results) {
  const toks = r.variables.map(v => v.name);
  console.log(`  ${r.slug}: ${toks.length > 0 ? toks.join(", ") : "(none)"}`);
}
