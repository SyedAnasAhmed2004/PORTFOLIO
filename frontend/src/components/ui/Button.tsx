import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary'

interface SharedProps {
  variant?: ButtonVariant
  /** Make the robot react while the pointer is over this button. */
  robotAttention?: boolean
}

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-md px-7 py-3.5 text-sm font-medium transition-all duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-b from-white to-[#c4c7dc] text-void shadow-[0_0_30px_rgba(196,199,255,0.25)] hover:shadow-[0_0_40px_rgba(196,199,255,0.45)]',
  secondary: 'border border-line-strong bg-white/[0.04] text-fg hover:border-fg/60 hover:bg-white/[0.08]',
}

type ButtonProps = ComponentProps<'button'> & SharedProps

export function Button({ variant = 'primary', robotAttention, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], className)}
      data-robot-attention={robotAttention || undefined}
      {...props}
    />
  )
}

type ButtonLinkProps = ComponentProps<typeof Link> & SharedProps

export function ButtonLink({ variant = 'primary', robotAttention, className, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], className)}
      data-robot-attention={robotAttention || undefined}
      {...props}
    />
  )
}
