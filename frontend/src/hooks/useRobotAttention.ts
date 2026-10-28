import { useEffect } from 'react'

import { setRobotAttention } from '@/lib/robotState'

/** Lets the android react when the pointer is over an element marked `data-robot-attention`. */
export function useRobotAttention() {
  useEffect(() => {
    function handlePointerOver(event: PointerEvent) {
      const target = event.target instanceof Element ? event.target : null
      setRobotAttention(Boolean(target?.closest('[data-robot-attention]')))
    }

    document.addEventListener('pointerover', handlePointerOver)
    return () => document.removeEventListener('pointerover', handlePointerOver)
  }, [])
}
