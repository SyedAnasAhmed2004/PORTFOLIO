import { Reveal } from '@/components/ui/Reveal'
import { profile } from '@/data/profile'

import { TechIcon } from '../components/TechIcon'

/** Static wireframe globe behind the tiles (SVG, no animation cost). */
function GlobeLines() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute bottom-[-20%] left-1/2 w-[min(900px,140vw)] -translate-x-1/2 opacity-30"
      aria-hidden="true"
    >
      <g fill="none" stroke="#c9c0ff" strokeWidth="0.6">
        <circle cx="200" cy="200" r="190" />
        {[40, 90, 140, 175].map((rx) => (
          <ellipse key={`m${rx}`} cx="200" cy="200" rx={rx} ry="190" />
        ))}
        {[60, 120, 165].map((ry) => (
          <ellipse key={`p${ry}`} cx="200" cy="200" rx="190" ry={ry} />
        ))}
        <line x1="10" y1="200" x2="390" y2="200" />
      </g>
    </svg>
  )
}

export function TechStackSection() {
  return (
    <section id="stack" className="relative overflow-hidden py-32">
      {/* Decorative layer fades out towards both edges so the section has no hard boundary */}
      <div
        aria-hidden="true"
        className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_70%,transparent)]"
      >
        <div className="absolute inset-x-0 bottom-0 h-[85%] bg-[radial-gradient(ellipse_at_50%_80%,rgba(140,90,255,0.35),transparent_65%)]" />
        <GlobeLines />
      </div>

      <Reveal className="relative">
        <h2 className="text-center text-5xl font-light uppercase sm:text-7xl">Tech stack</h2>
      </Reveal>

      <ul className="relative mx-auto mt-16 flex max-w-5xl flex-wrap justify-center gap-3 px-6">
        {profile.techStack.map((name) => (
          <li
            key={name}
            className="glass flex size-[88px] flex-col items-center justify-center gap-2 rounded-xl text-center text-[11px] leading-tight text-fg/80 transition-colors hover:border-fg/40 hover:text-fg"
          >
            <TechIcon name={name} />
            {name}
          </li>
        ))}
      </ul>
    </section>
  )
}
