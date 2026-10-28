import { BRAND_ICON_PATHS } from '@/constants/brandIcons'

/** Brand logo for a technology, or a lettered tile when no logo is available. */
export function TechIcon({ name }: { name: string }) {
  const path = BRAND_ICON_PATHS[name]
  if (!path) {
    return (
      <span aria-hidden="true" className="grid size-7 place-items-center text-sm font-semibold">
        {name.slice(0, 2)}
      </span>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}
