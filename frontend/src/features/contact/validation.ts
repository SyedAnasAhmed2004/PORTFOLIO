import type { ContactPayload } from '@/types/contact'

export type ContactFormErrors = Partial<Record<keyof ContactPayload, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Mirrors the constraints in backend/app/schemas/contact.py. */
export function validateContactForm(values: ContactPayload): ContactFormErrors {
  const errors: ContactFormErrors = {}
  const name = values.name.trim()
  const message = values.message.trim()

  if (name.length < 2) errors.name = 'Please enter your name.'
  else if (name.length > 100) errors.name = 'Name must be under 100 characters.'

  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email.'

  if (values.subject.length > 150) errors.subject = 'Subject must be under 150 characters.'

  if (message.length < 10) errors.message = 'Message should be at least 10 characters.'
  else if (message.length > 5000) errors.message = 'Message must be under 5000 characters.'

  return errors
}
