// Mirrors backend/app/schemas/contact.py

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
  /** Honeypot — must stay empty for real users. */
  website: string
}

export interface ContactResponse {
  success: boolean
  message: string
}
