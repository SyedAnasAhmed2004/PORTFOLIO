import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { profile } from '@/data/profile'

export function EducationSection() {
  return (
    <section id="education" className="container-page py-24 sm:py-32">
      <SectionHeading
        index="05"
        eyebrow="Education"
        title={
          <>
            Foundations in <span className="font-display italic">artificial intelligence</span>.
          </>
        }
      />

      <ol className="grid gap-5 md:grid-cols-3">
        {profile.education.map((item, index) => (
          <Reveal
            key={item.institution}
            as="li"
            delay={index * 0.08}
            className="glass flex flex-col rounded-3xl p-7"
          >
            <p className="font-mono text-xs text-muted">{item.period}</p>
            <h3 className="mt-6 text-xl font-medium">{item.institution}</h3>
            <p className="mt-2 text-sm text-accent">{item.credential}</p>
            <ul className="mt-5 space-y-2">
              {item.details.map((detail) => (
                <li key={detail} className="flex gap-3 text-sm text-muted">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                  {detail}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
