export interface EmailOptions {
  to: string
  replyTo: string
  subject: string
  body: string
}

export function buildMailtoUrl(options: EmailOptions): string {
  const { to, subject, body } = options
  const encodedSubject = encodeURIComponent(subject)
  const encodedBody = encodeURIComponent(body)
  return `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`
}
