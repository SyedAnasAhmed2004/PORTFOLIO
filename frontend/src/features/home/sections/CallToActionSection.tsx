import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { ROUTES } from '@/constants/routes'

export function CallToActionSection() {
  return (
    <section className="page-container pt-28">
      <Reveal className="flex flex-col items-center text-center">
        <p className="max-w-xl text-2xl font-light text-fg/90 sm:text-3xl">
          Curious about something specific? Ask my AI, or reach out directly.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink to={ROUTES.chat} variant="secondary">
            Chat with my AI
          </ButtonLink>
          <ButtonLink to={ROUTES.contact} robotAttention>
            Hire me
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  )
}
