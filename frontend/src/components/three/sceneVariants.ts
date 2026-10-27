import { ROUTES } from '@/constants/routes'

export interface SceneVariant {
  /** Core position on wide screens; narrow screens center it horizontally. */
  position: [number, number, number]
  scale: number
  distortion: number
  frequency: number
  colorA: string
  colorB: string
}

const SCENE_VARIANTS: Record<string, SceneVariant> = {
  [ROUTES.home]: {
    position: [1.9, 0.1, 0],
    scale: 1.15,
    distortion: 0.32,
    frequency: 1.1,
    colorA: '#6ef2c4',
    colorB: '#8b7bff',
  },
  [ROUTES.chat]: {
    position: [0, 0.2, -2.5],
    scale: 0.95,
    distortion: 0.22,
    frequency: 1.4,
    colorA: '#5cc8ff',
    colorB: '#6a5bff',
  },
  [ROUTES.agent]: {
    position: [0, 0.35, -0.6],
    scale: 1.05,
    distortion: 0.5,
    frequency: 0.9,
    colorA: '#c08bff',
    colorB: '#ff6fae',
  },
  [ROUTES.contact]: {
    position: [-2, -0.1, -0.5],
    scale: 0.9,
    distortion: 0.2,
    frequency: 1.2,
    colorA: '#ffc777',
    colorB: '#6ef2c4',
  },
}

export function getSceneVariant(pathname: string): SceneVariant {
  return SCENE_VARIANTS[pathname] ?? SCENE_VARIANTS[ROUTES.chat]
}
