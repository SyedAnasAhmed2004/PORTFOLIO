import { cn } from '@/lib/cn'

const CORNER_CLASSES = 'pointer-events-none absolute size-3 border-fg'

/** Four L-shaped corner brackets, positioned over the parent's border. */
export function HudCorners({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={className}>
      <span className={cn(CORNER_CLASSES, '-top-px -left-px border-t-2 border-l-2')} />
      <span className={cn(CORNER_CLASSES, '-top-px -right-px border-t-2 border-r-2')} />
      <span className={cn(CORNER_CLASSES, '-bottom-px -left-px border-b-2 border-l-2')} />
      <span className={cn(CORNER_CLASSES, '-right-px -bottom-px border-r-2 border-b-2')} />
    </span>
  )
}
