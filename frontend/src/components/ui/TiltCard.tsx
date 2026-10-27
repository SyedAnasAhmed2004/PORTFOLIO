import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface TiltCardProps {
  children: ReactNode
  className?: string
}

const MAX_TILT_DEG = 7
const SPRING = { stiffness: 220, damping: 20 }

/** Glass card that tilts in 3D towards the pointer and follows it with a soft spotlight. */
export function TiltCard({ children, className }: TiltCardProps) {
  const rotateX = useSpring(0, SPRING)
  const rotateY = useSpring(0, SPRING)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgb(110 242 196 / 0.12), transparent 60%)`

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    rotateY.set((x - 0.5) * MAX_TILT_DEG * 2)
    rotateX.set((0.5 - y) * MAX_TILT_DEG * 2)
    glowX.set(x * 100)
    glowY.set(y * 100)
  }

  function handlePointerLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div className="[perspective:1000px]">
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={cn('glass relative h-full overflow-hidden rounded-3xl', className)}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: spotlight }}
        />
        <div className="relative">{children}</div>
      </motion.div>
    </div>
  )
}
