// ─── Shared Keyword-Matching Utilities ─────────────────────────────────────────
// Every domain parser (image/website/video/text/code) scores a category by
// counting keyword hits against free-text input. Plain `.includes()` false-
// positives on substrings inside unrelated words — "surface" contains "face",
// "Germany" contains "man", "workshop" contains "shop" — which silently
// misclassifies the subject. Match on word boundaries instead, and share one
// implementation so a fix here applies to every domain at once.

export function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function containsKeyword(lower: string, keyword: string): boolean {
  return new RegExp(`\\b${escapeRegExp(keyword)}\\b`).test(lower)
}

export function findFirstMatch(text: string, keywords: string[]): string | null {
  const lower = text.toLowerCase()
  for (const kw of keywords) {
    if (containsKeyword(lower, kw)) return kw
  }
  return null
}

// Scores each category by word-boundary keyword hits and returns the top
// scorer. Falls back to `neutralFallback` on a zero-score or a tie, rather
// than silently favoring whichever category happens to be listed first in
// `categoryKeywords`.
export function detectCategoryByScore<T extends string>(
  text: string,
  categoryKeywords: Record<T, string[]>,
  neutralFallback: T
): T {
  const lower = text.toLowerCase()
  const scores = Object.fromEntries(
    (Object.keys(categoryKeywords) as T[]).map((cat) => [cat, 0])
  ) as Record<T, number>

  for (const [cat, keywords] of Object.entries(categoryKeywords) as [T, string[]][]) {
    for (const kw of keywords) {
      if (containsKeyword(lower, kw)) scores[cat]++
    }
  }

  const sorted = (Object.entries(scores) as [T, number][]).sort((a, b) => b[1] - a[1])
  const [topCategory, topScore] = sorted[0]
  const isTie = sorted.filter(([, score]) => score === topScore).length > 1
  return topScore > 0 && !isTie ? topCategory : neutralFallback
}
