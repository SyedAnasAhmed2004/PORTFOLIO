import { profile } from '@/data/profile'
import { ContactForm } from '@/features/contact/components/ContactForm'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function ContactPage() {
  usePageTitle('Contact')

  // On desktop the robot occupies the left half; content sits on the right.
  return (
    <section className="min-h-dvh px-6 pt-28 pb-16 sm:px-12 lg:ml-[46%] lg:pr-28">
      <h1 className="text-5xl font-light uppercase sm:text-6xl">Get in touch</h1>
      <p className="mt-4 max-w-lg leading-relaxed text-muted">
        Hiring for an AI role or have a project in mind? Send a message and I&apos;ll reply by
        email, or write to{' '}
        <a
          href={`mailto:${profile.email}`}
          className="text-fg underline decoration-fg/30 underline-offset-4 hover:decoration-fg"
        >
          {profile.email}
        </a>
        .
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </section>
  )
}
