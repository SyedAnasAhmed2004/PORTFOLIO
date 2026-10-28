import { CanvasTexture, SRGBColorSpace } from 'three'

function createCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('2D canvas is not supported')
  return { canvas, context }
}

/** A 6×3 grid of dots: the robot's LED eye pattern. */
export function createDotGridTexture() {
  const { canvas, context } = createCanvas(96, 48)
  context.fillStyle = '#ffffff'
  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 6; column++) {
      context.beginPath()
      context.arc(8 + column * 16, 8 + row * 16, 4.2, 0, Math.PI * 2)
      context.fill()
    }
  }
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}

/** Soft radial falloff used for the floor spotlight glow. */
export function createRadialGlowTexture() {
  const { canvas, context } = createCanvas(128, 128)
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.35, 'rgba(224, 228, 255, 0.45)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, 128, 128)
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}
