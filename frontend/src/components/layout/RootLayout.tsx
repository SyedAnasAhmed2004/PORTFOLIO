import { AnimatePresence } from 'motion/react'
import { lazy, Suspense } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import { getSceneVariant } from '@/components/three/sceneVariants'
import { CursorDot } from '@/components/ui/CursorDot'
import { useRobotAttention } from '@/hooks/useRobotAttention'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

import { Footer } from './Footer'
import { PageTransition } from './PageTransition'
import { SiteHeader } from './SiteHeader'
import { SocialRail } from './SocialRail'

// Three.js is heavy; load it after the page shell has rendered.
const SceneCanvas = lazy(() => import('@/components/three/SceneCanvas'))

export function RootLayout() {
  const { pathname } = useLocation()
  const outlet = useOutlet()
  useSmoothScroll(pathname)
  useRobotAttention()

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[110] rounded-md bg-fg px-4 py-2 text-void focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <div className="ambient-glow" aria-hidden="true" />
      <Suspense fallback={null}>
        <SceneCanvas variant={getSceneVariant(pathname)} />
      </Suspense>
      <CursorDot />
      <SiteHeader />
      <SocialRail />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <AnimatePresence mode="wait">
          <PageTransition key={pathname}>{outlet}</PageTransition>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  )
}
