import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { ROUTES } from '@/constants/routes'

export function CallToActionSection() {
  return (
    <section className="container-page py-32 text-center sm:py-40">
      <Reveal>
        <p className="eyebrow mb-6">Curious?</p>
        <h2 className="mx-auto max-w-3xl text-5xl leading-[1] font-light tracking-tight sm:text-7xl">
          Don&apos;t read about me — <span className="font-display text-gradient italic">ask</span>.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-muted">
          My AI assistant is trained on my work, projects and experience.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <ButtonLink to={ROUTES.chat}>Start a conversation</ButtonLink>
          <ButtonLink to={ROUTES.contact} variant="ghost">
            Contact
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  )
}
