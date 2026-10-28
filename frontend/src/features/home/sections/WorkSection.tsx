import { Reveal } from '@/components/ui/Reveal'
import { profile } from '@/data/profile'

import { ProjectVisual } from '../components/ProjectVisual'

export function WorkSection() {
  return (
    <section id="work" className="py-28">
      <div className="page-container">
        <Reveal>
          <h2 className="text-5xl font-light sm:text-6xl">My work</h2>
        </Reveal>
      </div>

      <div className="mt-14 grid border-y border-line md:grid-cols-3">
        {profile.projects.map((project, index) => {
          const article = (
            <article className="flex h-full flex-col p-8 lg:p-12">
              <div className="flex items-start justify-between gap-6">
                <span className="text-5xl font-medium">{String(index + 1).padStart(2, '0')}</span>
                <div className="text-right">
                  <h3 className="text-xl leading-snug font-medium">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted">{project.category}</p>
                </div>
              </div>
              <div className="mt-10">
                <ProjectVisual kind={project.visual} />
              </div>
              <p className="mt-8 text-sm leading-relaxed text-fg/75">{project.summary}</p>
              <h4 className="mt-8 text-lg font-medium">Tools and features</h4>
              <p className="mt-2 text-sm text-muted">{project.tools.join(', ')}</p>
            </article>
          )

          return (
            <Reveal
              key={project.title}
              delay={index * 0.1}
              className="border-line not-last:border-b md:not-last:border-r md:not-last:border-b-0"
            >
              {project.href ? (
                <a href={project.href} target="_blank" rel="noreferrer" className="block h-full">
                  {article}
                </a>
              ) : (
                article
              )}
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
