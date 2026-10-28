import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import {
  AdditiveBlending,
  Color,
  Group,
  LatheGeometry,
  type Material,
  MathUtils,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  SphereGeometry,
  Vector2,
  Vector3,
} from 'three'

import { getRobotMode } from '@/lib/robotState'

import { SCENE_COLORS } from './sceneColors'
import {
  DESKTOP_MIN_WIDTH_PX,
  getStops,
  placementAt,
  type Placement,
  type SceneVariant,
} from './sceneVariants'
import { createDotGridTexture, createRadialGlowTexture } from './textures'

type Vec3 = [number, number, number]

const FRONT = Math.PI / 2
const HEAD_SCALE: Vec3 = [0.36, 0.45, 0.4]
const ORIGIN = new Vector3()

/** Horizontal squeeze of the unit head at height `y`: a tapered jaw. */
function taper(y: number) {
  return y < 0 ? 1 - 0.3 * Math.pow(-y, 1.5) : 1 - 0.05 * y * y
}

/** Point on the tapered unit head. `phi = FRONT` faces the camera; `theta` is measured from the top. */
function headPoint(radius: number, phi: number, theta: number): Vec3 {
  const y = radius * Math.cos(theta)
  return [
    -radius * Math.cos(phi) * Math.sin(theta) * taper(y),
    y,
    radius * Math.sin(phi) * Math.sin(theta) * taper(y),
  ]
}

/** Rotation that lays a +Z-facing part flat on the head at `point`. */
function facing([x, y, z]: Vec3): [number, number, number, 'YXZ'] {
  const length = Math.hypot(x, y, z)
  return [-Math.asin(y / length), Math.atan2(x, z), 0, 'YXZ']
}

function createHeadGeometry() {
  const geometry = new SphereGeometry(1, 64, 48)
  const position = geometry.getAttribute('position')
  for (let i = 0; i < position.count; i++) {
    const squeeze = taper(position.getY(i))
    position.setX(i, position.getX(i) * squeeze)
    position.setZ(i, position.getZ(i) * squeeze)
  }
  geometry.computeVertexNormals()
  return geometry
}

/** Torso silhouette (radius, height) from waist to collar, spun into a shell. */
function createTorsoGeometry() {
  const profile = [
    [0.32, 0],
    [0.38, 0.1],
    [0.45, 0.4],
    [0.56, 0.8],
    [0.66, 1.08],
    [0.68, 1.2],
    [0.58, 1.35],
    [0.32, 1.45],
    [0.1, 1.48],
    [0.001, 1.49],
  ].map(([radius, height]) => new Vector2(radius, height))
  return new LatheGeometry(profile, 48)
}

function createMaterials() {
  return {
    // Mirror-black chrome for the head and hands
    chrome: new MeshPhysicalMaterial({
      color: '#0c0c10',
      metalness: 1,
      roughness: 0.12,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    }),
    // Satin black shell for the body panels
    body: new MeshPhysicalMaterial({
      color: '#0f0f13',
      metalness: 0.35,
      roughness: 0.46,
      clearcoat: 0.6,
      clearcoatRoughness: 0.35,
    }),
    joint: new MeshPhysicalMaterial({ color: '#17171c', metalness: 0.9, roughness: 0.28 }),
    eye: new MeshBasicMaterial({
      map: createDotGridTexture(),
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    }),
    floorGlow: new MeshBasicMaterial({
      map: createRadialGlowTexture(),
      transparent: true,
      opacity: 0.55,
      blending: AdditiveBlending,
      depthWrite: false,
    }),
  }
}

// Materials and objects are mutated in place every frame (the normal three.js pattern).
function setScaleY(object: Group, value: number) {
  object.scale.y = value
}

const EYE_POSITIONS = [-0.36, 0.36].map((offset) => headPoint(1.006, FRONT + offset, 1.5))
const FINGER_OFFSETS = [-0.075, -0.025, 0.025, 0.075]

interface RobotProps {
  variant: SceneVariant
  reducedMotion: boolean
}

/** Procedurally built humanoid robot that follows the pointer and the page's scroll position. */
export function Robot({ variant, reducedMotion }: RobotProps) {
  const rootRef = useRef<Group>(null)
  const bodyRef = useRef<Group>(null)
  const torsoRef = useRef<Group>(null)
  const headRef = useRef<Group>(null)
  const eyesRef = useRef<Group>(null)
  const leftArmRef = useRef<Group>(null)
  const rightArmRef = useRef<Group>(null)

  const materials = useMemo(() => createMaterials(), [])
  const headGeometry = useMemo(() => createHeadGeometry(), [])
  const torsoGeometry = useMemo(() => createTorsoGeometry(), [])
  useEffect(
    () => () => {
      Object.values(materials).forEach((material: Material & { map?: { dispose(): void } | null }) => {
        material.map?.dispose()
        material.dispose()
      })
      headGeometry.dispose()
      torsoGeometry.dispose()
    },
    [materials, headGeometry, torsoGeometry],
  )

  const scratch = useMemo(
    () => ({
      placement: { anchor: [0, 0], scale: 1, turn: 0 } as Placement,
      target: new Vector3(),
      headWorld: new Vector3(),
      color: new Color(),
      eyeColor: new Color('#000000'),
    }),
    [],
  )
  const anim = useRef({ lastPointer: new Vector2(), lastMoveAt: 0, blinkAt: -10, nextBlinkAt: 3 })

  useFrame((state, delta) => {
    const root = rootRef.current
    const body = bodyRef.current
    const torso = torsoRef.current
    const head = headRef.current
    const eyes = eyesRef.current
    if (!root || !body || !torso || !head || !eyes) return

    const t = state.clock.elapsedTime
    const a = anim.current
    const ease = Math.min(delta * 3, 1)
    const turn = Math.min(delta * (reducedMotion ? 2 : 5), 1)
    const mode = getRobotMode()

    // Placement follows the page's scroll choreography.
    const stops = getStops(variant, state.size.width >= DESKTOP_MIN_WIDTH_PX)
    if (!stops) return
    const placement = placementAt(stops, window.scrollY / window.innerHeight, scratch.placement)
    const viewport = state.viewport.getCurrentViewport(state.camera, ORIGIN)
    scratch.target.set(
      (placement.anchor[0] * viewport.width) / 2,
      (placement.anchor[1] * viewport.height) / 2,
      0,
    )
    root.position.lerp(scratch.target, ease)
    root.scale.setScalar(MathUtils.lerp(root.scale.x, placement.scale, ease))

    // Gaze: the head tracks the pointer; it looks around on its own when the pointer is still.
    const { pointer } = state
    if (!a.lastPointer.equals(pointer)) {
      a.lastPointer.copy(pointer)
      a.lastMoveAt = t
    }
    const isIdle = !reducedMotion && t - a.lastMoveAt > 4
    head.getWorldPosition(scratch.headWorld).project(state.camera)
    const yaw = isIdle
      ? Math.sin(t * 0.35) * 0.35
      : MathUtils.clamp((pointer.x - scratch.headWorld.x) * 1.1, -0.75, 0.75)
    const pitch = isIdle
      ? Math.sin(t * 0.25) * 0.06
      : MathUtils.clamp((scratch.headWorld.y - pointer.y) * 0.7, -0.35, 0.3)

    body.rotation.y = MathUtils.lerp(body.rotation.y, placement.turn + yaw * 0.2, ease)
    head.rotation.y = MathUtils.lerp(head.rotation.y, yaw - placement.turn * 0.6, turn)
    head.rotation.x = MathUtils.lerp(head.rotation.x, pitch, turn)
    head.rotation.z = MathUtils.lerp(head.rotation.z, mode === 'attention' ? 0.08 : 0, turn)

    // Idle life: breathing and a slight arm sway.
    const motionScale = reducedMotion ? 0 : 1
    setScaleY(torso, 1 + Math.sin(t * 1.4) * 0.006 * motionScale)
    if (leftArmRef.current) leftArmRef.current.rotation.x = Math.sin(t * 0.9) * 0.05 * motionScale
    if (rightArmRef.current) rightArmRef.current.rotation.x = Math.sin(t * 0.9 + 1.2) * 0.05 * motionScale

    // Eyes: blink, brighten on attention, pulse amber while thinking.
    if (t > a.nextBlinkAt) {
      a.blinkAt = t
      a.nextBlinkAt = t + 2.5 + Math.random() * 4
    }
    const blinkProgress = (t - a.blinkAt) / 0.16
    setScaleY(eyes, blinkProgress < 1 ? 1 - Math.sin(blinkProgress * Math.PI) * 0.9 : 1)

    const isThinking = mode === 'thinking'
    const brightness = isThinking ? 1.4 + Math.sin(t * 6) * 0.6 : mode === 'attention' ? 2.2 : 1.6
    scratch.color.set(isThinking ? SCENE_COLORS.amber : variant.eyeColor).multiplyScalar(brightness)
    scratch.eyeColor.lerp(scratch.color, turn)
    materials.eye.color.copy(scratch.eyeColor)
  })

  return (
    // Starts below the frame and rises into place on first load.
    <group ref={rootRef} position={[0, -4, 0]}>
      <mesh material={materials.floorGlow} position={[0, -2.1, -0.8]}>
        <planeGeometry args={[4.6, 2.6]} />
      </mesh>

      <group ref={bodyRef}>
        <group ref={torsoRef}>
          <mesh geometry={torsoGeometry} material={materials.body} scale={[1, 1, 0.6]} />
        </group>
        <mesh material={materials.chrome} position-y={1.47}>
          <cylinderGeometry args={[0.18, 0.22, 0.06, 32]} />
        </mesh>
        <mesh material={materials.joint} position-y={1.53}>
          <cylinderGeometry args={[0.1, 0.12, 0.16, 24]} />
        </mesh>

        <group ref={headRef} position-y={1.58}>
          <group position-y={0.42} scale={HEAD_SCALE}>
            <mesh geometry={headGeometry} material={materials.chrome} />
            <group ref={eyesRef}>
              {EYE_POSITIONS.map((position) => (
                <mesh
                  key={position[0]}
                  material={materials.eye}
                  position={position}
                  rotation={facing(position)}
                >
                  <planeGeometry args={[0.46, 0.2]} />
                </mesh>
              ))}
            </group>
          </group>
        </group>

        {/* Arms: out from the shoulders, forearms raised forward with open hands */}
        {[-1, 1].map((side) => (
          <group
            key={side}
            ref={side < 0 ? rightArmRef : leftArmRef}
            position={[side * 0.78, 1.2, 0]}
            rotation={[0, 0, side * 0.38]}
          >
            <mesh material={materials.joint}>
              <sphereGeometry args={[0.2, 32, 24]} />
            </mesh>
            <mesh material={materials.body} position-y={-0.32}>
              <capsuleGeometry args={[0.17, 0.4, 8, 20]} />
            </mesh>
            <group position-y={-0.66} rotation={[-1.5, 0, side * 0.55]}>
              <mesh material={materials.joint}>
                <sphereGeometry args={[0.13, 24, 16]} />
              </mesh>
              <mesh material={materials.body} position-y={-0.3}>
                <capsuleGeometry args={[0.14, 0.34, 8, 20]} />
              </mesh>
              <mesh material={materials.joint} position-y={-0.58}>
                <sphereGeometry args={[0.08, 16, 12]} />
              </mesh>
              <group position-y={-0.74} rotation={[0.4, side * 0.6, 0]}>
                <RoundedBox
                  args={[0.2, 0.22, 0.08]}
                  radius={0.035}
                  smoothness={3}
                  material={materials.chrome}
                />
                {FINGER_OFFSETS.map((offset) => (
                  <mesh
                    key={offset}
                    material={materials.chrome}
                    position={[offset, -0.17, 0.015]}
                    rotation-x={0.45}
                  >
                    <capsuleGeometry args={[0.022, 0.1, 4, 8]} />
                  </mesh>
                ))}
                <mesh
                  material={materials.chrome}
                  position={[side * -0.12, -0.02, 0.03]}
                  rotation-z={side * 0.7}
                >
                  <capsuleGeometry args={[0.026, 0.1, 4, 8]} />
                </mesh>
              </group>
            </group>
          </group>
        ))}

        <mesh material={materials.joint} position-y={-0.06}>
          <cylinderGeometry args={[0.3, 0.34, 0.16, 32]} />
        </mesh>
        <RoundedBox
          args={[0.66, 0.32, 0.42]}
          radius={0.12}
          smoothness={4}
          position-y={-0.3}
          material={materials.body}
        />

        {/* Legs: run off the bottom of the frame */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.24, -0.45, 0]}>
            <mesh material={materials.joint}>
              <sphereGeometry args={[0.16, 24, 16]} />
            </mesh>
            <mesh material={materials.body} position-y={-0.48}>
              <capsuleGeometry args={[0.19, 0.55, 8, 20]} />
            </mesh>
            <mesh material={materials.joint} position-y={-0.98} rotation-z={Math.PI / 2}>
              <cylinderGeometry args={[0.15, 0.15, 0.3, 24]} />
            </mesh>
            <mesh material={materials.body} position-y={-1.75}>
              <capsuleGeometry args={[0.18, 1.2, 8, 20]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}
