import type { ReactNode } from 'react'

import { Reveal } from './Reveal'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: ReactNode
}

export function SectionHeading({ index, eyebrow, title }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 flex flex-col gap-4 sm:mb-16">
      <p className="eyebrow">
        <span className="text-accent">{index}</span> — {eyebrow}
      </p>
      <h2 className="max-w-3xl text-4xl leading-[1.05] font-light tracking-tight sm:text-5xl">
        {title}
      </h2>
    </Reveal>
  )
}
