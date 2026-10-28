import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return <li className="border border-line px-2.5 py-1 text-sm text-fg/80">{children}</li>
}
