import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TiltCard } from '@/components/ui/TiltCard'
import { profile } from '@/data/profile'

export function ProjectsSection() {
  return (
    <section id="projects" className="container-page py-24 sm:py-32">
      <SectionHeading
        index="04"
        eyebrow="Selected work"
        title={
          <>
            Systems that <span className="font-display italic">think</span> — and ship.
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-3">
        {profile.projects.map((project, index) => {
          const content = (
            <TiltCard className="flex min-h-[320px] flex-col p-7">
              <span className="font-display text-6xl text-white/15">0{index + 1}</span>
              <h3 className="mt-auto pt-16 text-2xl font-medium">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="font-mono text-[11px] tracking-wider text-accent uppercase">
                    #{tag}
                  </li>
                ))}
              </ul>
            </TiltCard>
          )

          return (
            <Reveal key={project.title} delay={index * 0.1}>
              {project.href ? (
                <a href={project.href} target="_blank" rel="noreferrer" className="block h-full">
                  {content}
                </a>
              ) : (
                content
              )}
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
