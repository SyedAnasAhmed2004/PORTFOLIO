import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/cn'

const CONTROL_CLASSES =
  'w-full rounded-md border bg-white/[0.03] px-4 py-3 text-[15px] transition-colors placeholder:text-muted/60 focus:border-fg/50 focus:outline-none'

interface FieldShellProps {
  id: string
  label: string
  error?: string
  children: ReactNode
}

function FieldShell({ id, label, error, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-muted">
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
        className={cn(CONTROL_CLASSES, error ? 'border-danger/70' : 'border-line', className)}
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
        className={cn(CONTROL_CLASSES, 'resize-none', error ? 'border-danger/70' : 'border-line', className)}
        {...props}
      />
    </FieldShell>
  )
}
