import DOMPurify from 'dompurify'

export function sanitizePlainText(value, maxLength = 400) {
  if (value === null || value === undefined) {
    return ''
  }

  // Force cast to string to prevent object injection or toString override attacks
  const stringValue = String(value)

  // Aggressively strip potential HTML tags manually before DOMPurify
  const noTags = stringValue.replace(/<[^>]*>?/gm, '')

  const normalized = noTags.replace(/\s+/g, ' ').trim().slice(0, maxLength)
  
  // Final pass with DOMPurify as defense-in-depth
  return DOMPurify.sanitize(normalized, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  })
}
