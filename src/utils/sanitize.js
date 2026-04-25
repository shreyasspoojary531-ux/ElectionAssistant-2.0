import DOMPurify from 'dompurify'

export function sanitizePlainText(value, maxLength = 400) {
  if (typeof value !== 'string') {
    return ''
  }

  const normalized = value.replace(/\s+/g, ' ').trim().slice(0, maxLength)
  return DOMPurify.sanitize(normalized, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  })
}
