import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/cn'

const CONTROL_CLASSES =
  'w-full rounded-xl border bg-ink-950/50 px-4 py-3.5 text-[15px] transition-colors placeholder:text-muted/60 focus:border-white/30 focus:outline-none'

interface FieldShellProps {
  id: string
  label: string
  error?: string
  children: ReactNode
}

function FieldShell({ id, label, error, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="eyebrow">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

type InputFieldProps = ComponentProps<'input'> & { id: string; label: string; error?: string }

export function InputField({ id, label, error, className, ...props }: InputFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(CONTROL_CLASSES, error ? 'border-danger/60' : 'border-line', className)}
        {...props}
      />
    </FieldShell>
  )
}

type TextAreaFieldProps = ComponentProps<'textarea'> & { id: string; label: string; error?: string }

export function TextAreaField({ id, label, error, className, ...props }: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(CONTROL_CLASSES, 'resize-none', error ? 'border-danger/60' : 'border-line', className)}
        {...props}
      />
    </FieldShell>
  )
}
