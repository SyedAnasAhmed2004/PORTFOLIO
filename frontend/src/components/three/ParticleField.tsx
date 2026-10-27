import { PointMaterial, Points } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Points as ThreePoints } from 'three'

interface ParticleFieldProps {
  count?: number
  reducedMotion: boolean
}

function createShellPositions(count: number, innerRadius: number, outerRadius: number) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const radius = innerRadius + Math.random() * (outerRadius - innerRadius)
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)
  }
  return positions
}

export function ParticleField({ count = 2400, reducedMotion }: ParticleFieldProps) {
  const pointsRef = useRef<ThreePoints>(null)
  const positions = useMemo(() => createShellPositions(count, 3.5, 11), [count])

  useFrame((_, delta) => {
    if (!pointsRef.current || reducedMotion) return
    pointsRef.current.rotation.y += delta * 0.012
    pointsRef.current.rotation.x += delta * 0.004
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c9d2ff"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  )
}
