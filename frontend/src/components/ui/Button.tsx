import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'ghost'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-fg text-ink-950 hover:bg-accent',
  ghost: 'glass text-fg hover:border-white/25',
}

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-out-expo active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return <button className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], className)} {...props} />
}

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: ButtonVariant
}

export function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return <Link className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], className)} {...props} />
}
