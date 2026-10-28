import { useState, type ChangeEvent, type FormEvent } from 'react'

import { contactApi } from '@/services/api/contactApi'
import { ApiError } from '@/services/api/httpClient'
import type { ContactPayload } from '@/types/contact'

import { validateContactForm, type ContactFormErrors } from '../validation'

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

const INITIAL_VALUES: ContactPayload = { name: '', email: '', subject: '', message: '', website: '' }

export function useContactForm() {
  const [values, setValues] = useState<ContactPayload>(INITIAL_VALUES)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [feedback, setFeedback] = useState('')

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name as keyof ContactPayload]) {
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const validationErrors = validateContactForm(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus('submitting')
    try {
      await contactApi.submit(values)
      setStatus('success')
      setFeedback(`Message sent. I'll reply to ${values.email.trim()} soon.`)
      setValues(INITIAL_VALUES)
    } catch (err) {
      setStatus('error')
      setFeedback(err instanceof ApiError ? err.message : 'Something went wrong.')
    }
  }

  return { values, errors, status, feedback, handleChange, handleSubmit }
}
