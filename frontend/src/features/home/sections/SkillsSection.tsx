import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TiltCard } from '@/components/ui/TiltCard'
import { profile } from '@/data/profile'

export function SkillsSection() {
  return (
    <section id="skills" className="container-page py-24 sm:py-32">
      <SectionHeading
        index="02"
        eyebrow="Toolkit"
        title={
          <>
            The stack behind the <span className="font-display italic">intelligence</span>.
          </>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {profile.skills.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.08}>
            <TiltCard className="p-7 sm:p-8">
              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="text-xl font-medium">{group.category}</h3>
                <span className="font-mono text-xs text-muted">0{index + 1}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-sm text-fg/80"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
