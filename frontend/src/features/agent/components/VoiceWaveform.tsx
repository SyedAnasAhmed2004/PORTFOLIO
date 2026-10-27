import { motion } from 'motion/react'

const BAR_COUNT = 32

/** Decorative idle waveform hinting at the upcoming voice interface. */
export function VoiceWaveform() {
  return (
    <div className="flex h-16 items-center justify-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: BAR_COUNT }, (_, index) => {
        const distanceFromCenter = Math.abs(index - BAR_COUNT / 2) / (BAR_COUNT / 2)
        const peak = 0.25 + (1 - distanceFromCenter) * 0.75
        return (
          <motion.span
            key={index}
            className="w-[3px] rounded-full bg-gradient-to-t from-accent-2 to-accent"
            style={{ height: '100%', originY: 0.5 }}
            animate={{ scaleY: [0.12, peak, 0.2, peak * 0.6, 0.12] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: index * 0.045,
              ease: 'easeInOut',
            }}
          />
        )
      })}
    </div>
  )
}
