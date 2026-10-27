import { PointMaterial, Points } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import {
  Color,
  Group,
  IcosahedronGeometry,
  MathUtils,
  PointsMaterial,
  ShaderMaterial,
  Vector3,
} from 'three'

import type { SceneVariant } from './sceneVariants'
import { neuralCoreFragmentShader, neuralCoreVertexShader } from './shaders/neuralCoreShader'

interface NeuralCoreProps {
  variant: SceneVariant
  reducedMotion: boolean
}

const NARROW_VIEWPORT_WIDTH = 7
const TRANSITION_SPEED = 2.2

export function NeuralCore({ variant, reducedMotion }: NeuralCoreProps) {
  const groupRef = useRef<Group>(null)
  const coreRef = useRef<Group>(null)
  const materialRef = useRef<ShaderMaterial>(null)
  const nodeMaterialRef = useRef<PointsMaterial>(null)

  // Initial values only; subsequent variant changes are animated in useFrame.
  const [uniforms] = useState(() => ({
    uTime: { value: 0 },
    uDistortion: { value: variant.distortion },
    uFrequency: { value: variant.frequency },
    uColorA: { value: new Color(variant.colorA) },
    uColorB: { value: new Color(variant.colorB) },
  }))

  // Vertices of a subdivided icosahedron act as the "neurons" around the core.
  const nodePositions = useMemo(() => {
    const geometry = new IcosahedronGeometry(1.55, 3)
    const positions = geometry.getAttribute('position').array as Float32Array
    geometry.dispose()
    return positions
  }, [])

  const targets = useMemo(
    () => ({ position: new Vector3(), colorA: new Color(), colorB: new Color() }),
    [],
  )

  useFrame((state, delta) => {
    const group = groupRef.current
    const material = materialRef.current
    if (!group || !material || !coreRef.current) return

    const t = Math.min(delta * TRANSITION_SPEED, 1)
    const isNarrow = state.viewport.width < NARROW_VIEWPORT_WIDTH
    const [x, y, z] = variant.position
    targets.position.set(isNarrow ? 0 : x, isNarrow ? y + 0.9 : y, isNarrow ? z - 1.2 : z)
    targets.colorA.set(variant.colorA)
    targets.colorB.set(variant.colorB)

    // Ease towards the active page's variant.
    group.position.lerp(targets.position, t)
    group.scale.setScalar(MathUtils.lerp(group.scale.x, variant.scale, t))
    material.uniforms.uDistortion.value = MathUtils.lerp(
      material.uniforms.uDistortion.value,
      variant.distortion,
      t,
    )
    material.uniforms.uFrequency.value = MathUtils.lerp(
      material.uniforms.uFrequency.value,
      variant.frequency,
      t,
    )
    material.uniforms.uColorA.value.lerp(targets.colorA, t)
    material.uniforms.uColorB.value.lerp(targets.colorB, t)
    nodeMaterialRef.current?.color.lerp(targets.colorA, t)

    const speed = reducedMotion ? 0.15 : 1
    material.uniforms.uTime.value += delta * speed

    // Pointer parallax and a gentle scroll-linked turn.
    const scrollTurn = window.scrollY * 0.0012
    group.rotation.y = MathUtils.lerp(group.rotation.y, state.pointer.x * 0.35 + scrollTurn, 0.05)
    group.rotation.x = MathUtils.lerp(group.rotation.x, -state.pointer.y * 0.25, 0.05)
    coreRef.current.rotation.y += delta * 0.08 * speed
    coreRef.current.rotation.z += delta * 0.03 * speed
  })

  return (
    <group ref={groupRef} position={variant.position} scale={variant.scale}>
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[1.2, 96]} />
          <shaderMaterial
            ref={materialRef}
            uniforms={uniforms}
            vertexShader={neuralCoreVertexShader}
            fragmentShader={neuralCoreFragmentShader}
          />
        </mesh>

        <Points positions={nodePositions} stride={3}>
          <PointMaterial
            ref={nodeMaterialRef}
            transparent
            color={variant.colorA}
            size={0.035}
            sizeAttenuation
            depthWrite={false}
            opacity={0.85}
          />
        </Points>

        <mesh>
          <icosahedronGeometry args={[1.55, 2]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
        </mesh>
      </group>

      <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[2.2, 0.004, 8, 220]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, -0.5, 0.4]}>
        <torusGeometry args={[2.55, 0.003, 8, 220]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </mesh>
    </group>
  )
}
