import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { Reveal } from '@/components/ui/Reveal'
import { profile } from '@/data/profile'

/** Career and education timeline with a light that travels down the line as you scroll. */
export function TimelineSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [trackHeight, setTrackHeight] = useState(0)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start center', 'end center'] })
  // Transform-only animation: the dot moves in pixels, the fill scales.
  const dotY = useTransform(scrollYProgress, (progress) => progress * trackHeight)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const observer = new ResizeObserver(([entry]) => setTrackHeight(entry.contentRect.height))
    observer.observe(track)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="py-28">
      <Reveal>
        <h2 className="text-center text-5xl leading-tight font-light sm:text-6xl">
          My career &amp;
          <br />
          education
        </h2>
      </Reveal>

      <div ref={trackRef} className="page-container relative mt-20">
        <div aria-hidden="true" className="absolute inset-y-0 left-6 w-px bg-line sm:left-10 md:left-1/2">
          <motion.div
            className="h-full w-full origin-top bg-gradient-to-b from-fg/10 via-fg/80 to-fg"
            style={{ scaleY: scrollYProgress }}
          />
          <motion.div
            className="absolute -top-2.5 -left-2.5 size-5 rounded-full bg-fg shadow-[0_0_40px_12px_rgba(220,224,255,0.35)]"
            style={{ y: dotY }}
          />
        </div>

        <ol className="space-y-20">
          {profile.timeline.map((entry) => (
            <li key={`${entry.year}-${entry.title}`} className="grid gap-6 pl-10 md:grid-cols-2 md:gap-24 md:pl-0">
              <Reveal className="grid gap-3 md:grid-cols-[1fr_auto] md:gap-8">
                <div>
                  <h3 className="text-2xl leading-tight font-medium sm:text-3xl">{entry.title}</h3>
                  <p className="mt-3 text-fg/75">{entry.organization}</p>
                </div>
                <p className="order-first text-4xl font-medium text-fg/90 md:order-none md:text-5xl">
                  {entry.year}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-sm leading-relaxed text-fg/80 sm:text-[15px]">{entry.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
