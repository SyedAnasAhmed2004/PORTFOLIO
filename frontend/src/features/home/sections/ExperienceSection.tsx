import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { profile } from '@/data/profile'

export function ExperienceSection() {
  return (
    <section id="experience" className="container-page py-24 sm:py-32">
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title={
          <>
            Where I&apos;ve been <span className="font-display italic">building</span>.
          </>
        }
      />

      <ol className="border-t border-line">
        {profile.experience.map((item, index) => (
          <Reveal
            key={`${item.company}-${item.period}`}
            as="li"
            delay={index * 0.08}
            className="group grid gap-4 border-b border-line py-10 transition-colors hover:bg-white/[0.015] md:grid-cols-[200px_1fr] md:gap-10"
          >
              <p className="font-mono text-sm text-muted">{item.period}</p>
              <div>
                <h3 className="text-2xl font-light sm:text-3xl">
                  {item.role}{' '}
                  <span className="font-display text-muted italic transition-colors group-hover:text-accent">
                    @ {item.company}
                  </span>
                </h3>
                <p className="mt-3 text-fg/75">{item.summary}</p>
                <ul className="mt-5 space-y-2">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm text-muted">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
