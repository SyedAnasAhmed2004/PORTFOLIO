import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { useState } from 'react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

import { NeuralCore } from './NeuralCore'
import { ParticleField } from './ParticleField'
import type { SceneVariant } from './sceneVariants'

interface SceneCanvasProps {
  variant: SceneVariant
}

/** Fixed, full-viewport WebGL background shared by every page. */
export default function SceneCanvas({ variant }: SceneCanvasProps) {
  const reducedMotion = usePrefersReducedMotion()
  const [highQuality, setHighQuality] = useState(true)

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, highQuality ? 1.75 : 1]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        eventSource={document.body}
        eventPrefix="client"
      >
        <color attach="background" args={['#05060b']} />
        <fog attach="fog" args={['#05060b', 6, 16]} />

        <PerformanceMonitor onDecline={() => setHighQuality(false)} />
        <AdaptiveDpr pixelated />

        <NeuralCore variant={variant} reducedMotion={reducedMotion} />
        <ParticleField reducedMotion={reducedMotion} />

        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.15} luminanceSmoothing={0.3} />
          <Vignette offset={0.25} darkness={0.85} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
