import { Button } from '@/components/ui/Button'
import { InputField, TextAreaField } from '@/components/ui/FormField'
import { cn } from '@/lib/cn'

import { useContactForm } from '../hooks/useContactForm'

export function ContactForm() {
  const { values, errors, status, feedback, handleChange, handleSubmit } = useContactForm()
  const isSubmitting = status === 'submitting'

  return (
    <form onSubmit={handleSubmit} noValidate className="glass flex flex-col gap-5 rounded-3xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          id="name"
          name="name"
          label="Name"
          autoComplete="name"
          placeholder="Ada Lovelace"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
        <InputField
          id="email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          placeholder="ada@example.com"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
      </div>
      <InputField
        id="subject"
        name="subject"
        label="Subject"
        placeholder="Project, role, collaboration…"
        value={values.subject}
        onChange={handleChange}
        error={errors.subject}
      />
      <TextAreaField
        id="message"
        name="message"
        label="Message"
        rows={6}
        placeholder="Tell me a bit about what you have in mind."
        value={values.message}
        onChange={handleChange}
        error={errors.message}
      />

      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <input
        type="text"
        name="website"
        value={values.website}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] size-px opacity-0"
      />

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          role="status"
          className={cn('text-sm', status === 'error' ? 'text-danger' : 'text-accent')}
        >
          {(status === 'success' || status === 'error') && feedback}
        </p>
        <Button type="submit" disabled={isSubmitting} className="sm:min-w-40">
          {isSubmitting ? 'Sending…' : 'Send message →'}
        </Button>
      </div>
    </form>
  )
}
