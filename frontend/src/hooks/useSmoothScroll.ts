import Lenis from 'lenis'
import { useEffect, useRef } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** Enables Lenis smooth scrolling and resets scroll position when `resetKey` changes. */
export function useSmoothScroll(resetKey: string) {
  const lenisRef = useRef<Lenis | null>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 })
    lenisRef.current = lenis
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [resetKey])
}
