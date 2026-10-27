import { AnimatePresence } from 'motion/react'
import { lazy, Suspense } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import { getSceneVariant } from '@/components/three/sceneVariants'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { PageTransition } from './PageTransition'

// Three.js is heavy; load it after the page shell has rendered.
const SceneCanvas = lazy(() => import('@/components/three/SceneCanvas'))

export function RootLayout() {
  const { pathname } = useLocation()
  const outlet = useOutlet()
  useSmoothScroll(pathname)

  return (
    <>
      <Suspense fallback={null}>
        <SceneCanvas variant={getSceneVariant(pathname)} />
      </Suspense>
      <div className="noise-overlay" aria-hidden="true" />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <Navbar />
        <AnimatePresence mode="wait">
          <PageTransition key={pathname}>{outlet}</PageTransition>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  )
}
