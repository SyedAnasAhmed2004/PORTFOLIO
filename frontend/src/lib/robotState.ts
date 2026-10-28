/**
 * Shared, non-React state the 3D android reads every frame.
 * UI code flips these flags; the scene reacts without re-rendering React.
 */
export type RobotMode = 'idle' | 'attention' | 'thinking'

const flags = { attention: false, thinking: false }

export function getRobotMode(): RobotMode {
  if (flags.thinking) return 'thinking'
  if (flags.attention) return 'attention'
  return 'idle'
}

/** The pointer is over an element marked with `data-robot-attention`. */
export function setRobotAttention(value: boolean) {
  flags.attention = value
}

/** The assistant is waiting for a reply. */
export function setRobotThinking(value: boolean) {
  flags.thinking = value
}
