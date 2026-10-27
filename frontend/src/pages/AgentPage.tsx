import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { TiltCard } from '@/components/ui/TiltCard'
import { ROUTES } from '@/constants/routes'
import { VoiceWaveform } from '@/features/agent/components/VoiceWaveform'
import { AGENT_CAPABILITIES } from '@/features/agent/constants'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function AgentPage() {
  usePageTitle('Conversational Agent')

  return (
    <section className="container-page flex min-h-dvh flex-col justify-center pt-32 pb-16 text-center">
      <Reveal>
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
          <span className="size-1.5 animate-pulse rounded-full bg-accent" />
          In development
        </span>
        <h1 className="mx-auto mt-8 max-w-4xl text-5xl leading-[0.95] font-light tracking-tight sm:text-7xl">
          A <span className="font-display text-gradient italic">conversational</span> agent that
          talks back.
        </h1>
        <p className="mx-auto mt-6 max-w-lg leading-relaxed text-muted">
          I&apos;m building a voice-first AI agent you can talk to about my work. It will live
          here soon.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="my-14">
        <VoiceWaveform />
      </Reveal>

      <div className="grid gap-5 text-left md:grid-cols-3">
        {AGENT_CAPABILITIES.map((capability, index) => (
          <Reveal key={capability.title} delay={0.2 + index * 0.08}>
            <TiltCard className="p-7">
              <span className="font-mono text-xs text-muted">0{index + 1}</span>
              <h2 className="mt-8 text-xl font-medium">{capability.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{capability.description}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.4} className="mt-14">
        <ButtonLink to={ROUTES.chat} variant="ghost">
          Try the text assistant meanwhile →
        </ButtonLink>
      </Reveal>
    </section>
  )
}
