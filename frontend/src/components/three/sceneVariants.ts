import { ROUTES } from '@/constants/routes'

import { SCENE_COLORS } from './sceneColors'

// This module is imported by the page shell, so it must not import three.js
// (that would pull the whole 3D library into the initial bundle).

export const DESKTOP_MIN_WIDTH_PX = 1024

const lerp = (from: number, to: number, t: number) => from + (to - from) * t
const smoothstep = (x: number, min: number, max: number) => {
  const t = Math.min(Math.max((x - min) / (max - min), 0), 1)
  return t * t * (3 - 2 * t)
}

export interface Placement {
  /** Robot position in normalized screen space: [-1, 1] on both axes, origin at the centre. */
  anchor: [number, number]
  scale: number
  /** Body yaw in radians; positive turns the robot towards the right of the screen. */
  turn: number
}

/** Placement reached when the page has scrolled `at` viewport heights. */
export interface ScrollStop extends Placement {
  at: number
  /** The robot is fully out of view here, so rendering can pause past this stop. */
  offscreen?: boolean
}

export interface SceneVariant {
  desktop: ScrollStop[]
  /** `null` hides the robot (and stops rendering) on small screens. */
  mobile: ScrollStop[] | null
  eyeColor: string
}

const still = (placement: Placement): ScrollStop[] => [{ at: 0, ...placement }]

const SCENE_VARIANTS: Record<string, SceneVariant> = {
  // Home: centre stage in the hero, steps aside for "About" and "What I do", then exits.
  [ROUTES.home]: {
    desktop: [
      { at: 0, anchor: [0, -0.06], scale: 1, turn: 0 },
      { at: 1, anchor: [-0.5, -0.04], scale: 1, turn: 0.4 },
      { at: 2, anchor: [-0.3, -0.02], scale: 0.95, turn: 0.2 },
      { at: 2.85, anchor: [-0.3, -1.75], scale: 0.95, turn: 0.2, offscreen: true },
    ],
    mobile: [
      { at: 0, anchor: [0, -0.12], scale: 0.62, turn: 0 },
      { at: 0.9, anchor: [0, -1.8], scale: 0.62, turn: 0, offscreen: true },
    ],
    eyeColor: SCENE_COLORS.eye,
  },
  [ROUTES.chat]: {
    desktop: still({ anchor: [-0.56, -0.08], scale: 0.9, turn: 0.45 }),
    mobile: null,
    eyeColor: SCENE_COLORS.eye,
  },
  [ROUTES.agent]: {
    desktop: still({ anchor: [0.5, -0.06], scale: 1, turn: -0.35 }),
    mobile: null,
    eyeColor: SCENE_COLORS.signal,
  },
  [ROUTES.contact]: {
    desktop: still({ anchor: [-0.56, -0.08], scale: 0.9, turn: 0.45 }),
    mobile: null,
    eyeColor: SCENE_COLORS.eye,
  },
}

const NOT_FOUND_VARIANT: SceneVariant = {
  desktop: still({ anchor: [0.5, -0.06], scale: 0.95, turn: -0.3 }),
  mobile: null,
  eyeColor: SCENE_COLORS.danger,
}

export function getSceneVariant(pathname: string): SceneVariant {
  return SCENE_VARIANTS[pathname] ?? NOT_FOUND_VARIANT
}

export function getStops(variant: SceneVariant, isDesktop: boolean) {
  return isDesktop ? variant.desktop : variant.mobile
}

/** True when the robot is out of view at this scroll position, so the canvas can stop rendering. */
export function isRobotHidden(stops: ScrollStop[] | null, scrollVh: number) {
  if (!stops) return true
  const last = stops[stops.length - 1]
  return Boolean(last.offscreen) && scrollVh >= last.at
}

/** Interpolates the placement between scroll stops, writing into `out` to avoid allocations. */
export function placementAt(stops: ScrollStop[], scrollVh: number, out: Placement) {
  let from = stops[0]
  let to = stops[stops.length - 1]
  for (let i = 0; i < stops.length; i++) {
    if (stops[i].at <= scrollVh) from = stops[i]
    if (stops[i].at >= scrollVh) {
      to = stops[i]
      break
    }
  }
  const t = to.at > from.at ? smoothstep(scrollVh, from.at, to.at) : 1
  out.anchor[0] = lerp(from.anchor[0], to.anchor[0], t)
  out.anchor[1] = lerp(from.anchor[1], to.anchor[1], t)
  out.scale = lerp(from.scale, to.scale, t)
  out.turn = lerp(from.turn, to.turn, t)
  return out
}
