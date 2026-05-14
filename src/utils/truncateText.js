/**
 * Truncates a string to maxLength and appends "..." when the string is longer.
 * For responsive one-line cuts, prefer CSS: `min-w-0 overflow-hidden text-ellipsis whitespace-nowrap`
 * on a block-level element inside a bounded-width parent.
 */
export function truncateText(value, maxLength) {
  if (value == null || value === '') return ''
  const s = String(value)
  if (maxLength <= 3) return '...'
  if (s.length <= maxLength) return s
  const sliceLen = maxLength - 3
  return `${s.slice(0, sliceLen).trimEnd()}...`
}
