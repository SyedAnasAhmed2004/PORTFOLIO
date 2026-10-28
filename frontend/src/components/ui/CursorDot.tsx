import { useEffect, useRef, useState } from 'react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const INTERACTIVE = 'a, button, input, textarea, select, label'
const HOVER_SCALE = 1.8

/**
 * Glowing dot that trails the mouse. It only animates while the pointer moves
 * (no idle animation loop) and is skipped entirely on touch devices.
 */
export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const [isEnabled] = useState(() => window.matchMedia('(pointer: fine)').matches)

  useEffect(() => {
    const dot = dotRef.current
    if (!isEnabled || !dot) return

    const current = { x: -100, y: -100, scale: 1 }
    const target = { x: -100, y: -100, scale: 1 }
    let frame = 0

    function tick() {
      const follow = reducedMotion ? 1 : 0.22
      current.x += (target.x - current.x) * follow
      current.y += (target.y - current.y) * follow
      current.scale += (target.scale - current.scale) * 0.2
      dot!.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) scale(${current.scale})`

      const isSettled =
        Math.abs(target.x - current.x) < 0.1 &&
        Math.abs(target.y - current.y) < 0.1 &&
        Math.abs(target.scale - current.scale) < 0.01
      frame = isSettled ? 0 : requestAnimationFrame(tick)
    }

    function handlePointerMove(event: PointerEvent) {
      target.x = event.clientX
      target.y = event.clientY
      const element = event.target instanceof Element ? event.target : null
      target.scale = element?.closest(INTERACTIVE) ? HOVER_SCALE : 1
      if (!frame) frame = requestAnimationFrame(tick)
    }

    function handlePointerLeave() {
      target.x = -100
      target.y = -100
      if (!frame) frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', handlePointerLeave)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave)
      cancelAnimationFrame(frame)
    }
  }, [isEnabled, reducedMotion])

  if (!isEnabled) return null
  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] size-9 rounded-full bg-white mix-blend-difference"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    />
  )
}
