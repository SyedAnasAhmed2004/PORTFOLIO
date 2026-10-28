import { motion } from 'motion/react'

import { profile } from '@/data/profile'

const EASE = [0.16, 1, 0.3, 1] as const

export function HeroSection() {
  const nameParts = profile.name.split(' ')
  const lastName = nameParts.pop()

  return (
    <section className="mx-auto flex min-h-dvh max-w-[1500px] flex-col justify-between px-6 pt-28 pb-16 sm:px-12 lg:flex-row lg:items-center lg:px-28 lg:py-0">
      <motion.div
        className="lg:-mt-28"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
      >
        <p className="text-2xl font-light tracking-wide text-fg/90 sm:text-3xl">Hello! I&apos;m</p>
        <h1 className="mt-2 text-5xl leading-[1.02] font-normal tracking-tight uppercase sm:text-6xl xl:text-7xl">
          {nameParts.join(' ')}
          <br />
          {lastName}
        </h1>
      </motion.div>

      <motion.div
        className="lg:mt-28"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
      >
        <p className="text-2xl font-light text-fg/90 sm:text-3xl">An</p>
        <p className="mt-1 text-3xl leading-tight font-semibold tracking-wide text-fg/90 uppercase sm:text-4xl">
          {profile.roles[0]}
          <br />
          {profile.roles[1]}
        </p>
      </motion.div>
    </section>
  )
}
