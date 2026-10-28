import type { ReactNode } from 'react'

import { HudCorners } from '@/components/hud/HudCorners'
import { cn } from '@/lib/cn'

interface PanelProps {
  children: ReactNode
  className?: string
}

/** Frosted panel with corner brackets, used for the chat and contact form. */
export function Panel({ children, className }: PanelProps) {
  return (
    <div className={cn('glass relative rounded-lg', className)}>
      <HudCorners />
      {children}
    </div>
  )
}
