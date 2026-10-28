import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

import { Robot } from './Robot'
import { SCENE_COLORS } from './sceneColors'
import { DESKTOP_MIN_WIDTH_PX, getStops, isRobotHidden, type SceneVariant } from './sceneVariants'

/** Studio lighting: soft key, cool and violet rims, and a floor bounce. No shadows or post-processing. */
function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[2, 5, 6]} intensity={1.3} />
      <directionalLight position={[-6, 3, -4]} intensity={3} color="#dfe3ff" />
      <directionalLight position={[6, 2, -4]} intensity={2.5} color={SCENE_COLORS.signal} />
      <pointLight position={[0, -3.2, 2.5]} intensity={30} distance={8} />
      {/* Reflections for the chrome, rendered once */}
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={3} position={[0, 5, 2]} scale={[6, 1, 1]} />
        <Lightformer intensity={2} position={[-4, 1, 3]} rotation-y={Math.PI / 3} scale={[1, 6, 1]} />
        <Lightformer intensity={2} position={[4, 1, 3]} rotation-y={-Math.PI / 3} scale={[1, 6, 1]} />
        <Lightformer intensity={1.5} color={SCENE_COLORS.signal} position={[0, 0, -5]} scale={[8, 4, 1]} />
      </Environment>
    </>
  )
}

/** Whether the robot is currently on screen; rendering stops completely while it is not. */
function useRobotVisible(variant: SceneVariant) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    function update() {
      const stops = getStops(variant, window.innerWidth >= DESKTOP_MIN_WIDTH_PX)
      setIsVisible(!isRobotHidden(stops, window.scrollY / window.innerHeight))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [variant])

  return isVisible
}

/** Fixed, full-viewport WebGL layer shared by every page. */
export default function SceneCanvas({ variant }: { variant: SceneVariant }) {
  const reducedMotion = usePrefersReducedMotion()
  const isVisible = useRobotVisible(variant)
  const [maxDpr, setMaxDpr] = useState(1.5)

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 z-0 transition-opacity duration-500',
        isVisible ? 'opacity-100' : 'opacity-0',
      )}
    >
      <Canvas
        frameloop={isVisible ? 'always' : 'never'}
        dpr={[1, maxDpr]}
        camera={{ position: [0, 0, 9], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        eventSource={document.body}
        eventPrefix="client"
      >
        <PerformanceMonitor onDecline={() => setMaxDpr(1)} />
        <StudioLighting />
        <Robot variant={variant} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
