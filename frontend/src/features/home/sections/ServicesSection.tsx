import { useState } from 'react'

import { HudCorners } from '@/components/hud/HudCorners'
import { ChevronDownIcon } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import { profile } from '@/data/profile'
import { cn } from '@/lib/cn'
import type { Service } from '@/types/profile'

function ServiceCard({ service }: { service: Service }) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = `service-${service.title.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <article className="relative border border-dashed border-fg/30 p-8 sm:p-10">
      <HudCorners />
      <h3 className="text-3xl font-bold tracking-wide uppercase">{service.title}</h3>
      <p className="mt-2 text-sm text-muted">{service.tagline}</p>

      {/* Collapsed: three lines; expanded: full text plus tools. Animated via grid rows (no layout thrash). */}
      <div
        id={panelId}
        className={cn(
          'grid transition-[grid-template-rows] duration-500 ease-out-expo',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-[4.5rem] overflow-hidden">
          <p className="mt-5 text-sm leading-relaxed text-fg/85">{service.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {service.tools.map((tool) => (
              <li key={tool} className="rounded border border-line px-2.5 py-1 text-xs text-fg/75">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${service.title}`}
        className="absolute right-6 bottom-6 grid size-8 place-items-center border border-fg/60 transition-colors hover:bg-fg hover:text-void"
      >
        <ChevronDownIcon className={cn('size-4 transition-transform', isOpen && 'rotate-180')} />
      </button>
    </article>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="flex min-h-dvh items-center py-24">
      <div className="page-container grid items-center gap-14 lg:grid-cols-2">
        <h2 className="text-6xl leading-[0.9] font-bold text-fg/30 uppercase sm:text-7xl xl:text-8xl">
          What
          <br />I do
        </h2>
        <Reveal className="space-y-[-1px]">
          {profile.services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
