import { motion } from 'motion/react'

import { ButtonLink } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'
import { profile } from '@/data/profile'
import { cn } from '@/lib/cn'

const EASE = [0.16, 1, 0.3, 1] as const

export function HeroSection() {
  const words = profile.headline.split(' ')

  return (
    <section className="container-page relative flex min-h-dvh flex-col justify-end pt-32 pb-16 sm:justify-center sm:pb-24">
      <motion.p
        className="eyebrow mb-8 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        {profile.name} · {profile.role}
      </motion.p>

      <h1 className="max-w-4xl text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[0.95] font-light tracking-[-0.035em]">
        {words.map((word, index) => {
          const isHighlighted = profile.headlineHighlights.includes(word)
          return (
            <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className={cn(
                  'inline-block',
                  isHighlighted && 'font-display text-gradient pr-[0.06em] italic',
                )}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.3 + index * 0.06, ease: EASE }}
              >
                {word}
              </motion.span>
              {index < words.length - 1 && ' '}
            </span>
          )
        })}
      </h1>

      <motion.div
        className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: EASE }}
      >
        <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
          {profile.summary.split('.')[0]}.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to={ROUTES.chat}>Ask my AI →</ButtonLink>
          <ButtonLink to={ROUTES.contact} variant="ghost">
            Get in touch
          </ButtonLink>
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <span className="eyebrow text-[10px]">Scroll</span>
        <span className="h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="block h-1/2 w-full bg-accent"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}
