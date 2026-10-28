import { ButtonLink } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'
import { PLANNED_CAPABILITIES } from '@/features/agent/constants'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function AgentPage() {
  usePageTitle('Voice agent')

  // On desktop the robot stands on the right; content sits on the left.
  return (
    <section className="flex min-h-dvh flex-col justify-center px-6 pt-28 pb-16 sm:px-12 lg:w-[55%] lg:pl-28">
      <p className="flex items-center gap-3 text-sm text-amber">
        <span className="size-2 animate-pulse rounded-full bg-amber" />
        In development
      </p>
      <h1 className="mt-5 max-w-xl text-5xl leading-[1.05] font-light uppercase sm:text-6xl">
        A voice agent you can talk to
      </h1>
      <p className="mt-6 max-w-lg leading-relaxed text-muted">
        I&apos;m building a voice-first agent that answers questions about my work. It builds on
        the speech-to-speech chatbot I developed at EOcean.
      </p>

      <h2 className="label mt-14">What it will do</h2>
      <ul className="mt-4 max-w-xl border-t border-line">
        {PLANNED_CAPABILITIES.map((capability) => (
          <li key={capability.title} className="border-b border-line py-5">
            <h3 className="text-lg font-medium">{capability.title}</h3>
            <p className="mt-1 text-muted">{capability.description}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <ButtonLink to={ROUTES.chat} variant="secondary">
          Use the text chat for now
        </ButtonLink>
      </div>
    </section>
  )
}
