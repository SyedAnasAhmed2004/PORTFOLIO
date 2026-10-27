import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { profile } from '@/data/profile'

export function AboutSection() {
  return (
    <section id="about" className="container-page py-24 sm:py-32">
      <SectionHeading
        index="01"
        eyebrow="About"
        title={
          <>
            Research-minded, <span className="font-display italic">production</span>-driven.
          </>
        }
      />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <p className="text-xl leading-relaxed text-fg/85 sm:text-2xl">{profile.summary}</p>
          <p className="mt-6 font-mono text-sm text-muted">
            {profile.location} — {profile.availability}
          </p>
        </Reveal>

        <dl className="grid grid-cols-3 gap-4 self-end lg:grid-cols-1">
          {profile.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.1} className="border-t border-line pt-4">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-5xl sm:text-6xl">{stat.value}</dd>
              <dd className="mt-1 text-sm text-muted">{stat.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
