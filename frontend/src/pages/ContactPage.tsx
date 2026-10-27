import { Reveal } from '@/components/ui/Reveal'
import { profile } from '@/data/profile'
import { ContactForm } from '@/features/contact/components/ContactForm'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function ContactPage() {
  usePageTitle('Contact')

  return (
    <section className="container-page grid min-h-dvh items-center gap-12 pt-32 pb-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
      <Reveal>
        <p className="eyebrow mb-6">
          <span className="text-accent">04</span> — Contact
        </p>
        <h1 className="text-5xl leading-[0.95] font-light tracking-tight sm:text-7xl">
          Let&apos;s build something <span className="font-display text-gradient italic">smart</span>.
        </h1>
        <p className="mt-6 max-w-md leading-relaxed text-muted">
          Have a project, role or idea in mind? Send a message and I&apos;ll reply within a couple
          of days.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-10 inline-block font-display text-2xl italic underline decoration-line underline-offset-8 transition-colors hover:decoration-accent sm:text-3xl"
        >
          {profile.email}
        </a>

        <ul className="mt-10 flex flex-wrap gap-3">
          {profile.socials
            .filter((social) => social.href.startsWith('http'))
            .map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass inline-block rounded-full px-5 py-2 text-sm transition-colors hover:border-white/25"
                >
                  {social.label} ↗
                </a>
              </li>
            ))}
        </ul>
      </Reveal>

      <Reveal delay={0.15}>
        <ContactForm />
      </Reveal>
    </section>
  )
}
