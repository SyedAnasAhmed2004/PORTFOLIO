import { BRAND_ICON_PATHS } from '@/constants/brandIcons'

import type { SocialLink } from '@/types/profile'

interface IconProps {
  className?: string
}

function BrandIcon({ path, className }: IconProps & { path: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}

// LinkedIn is not distributed in simple-icons, so its mark is drawn here.
const LINKEDIN_PATH =
  'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z'

const SOCIAL_PATHS: Record<SocialLink['label'], string> = {
  GitHub: BRAND_ICON_PATHS.GitHub,
  LinkedIn: LINKEDIN_PATH,
  Email: BRAND_ICON_PATHS.Gmail,
}

export function SocialIcon({ label, className }: IconProps & { label: SocialLink['label'] }) {
  return <BrandIcon path={SOCIAL_PATHS[label]} className={className} />
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function DocumentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M7 3h7l4 4v14H7zM10 11h5M10 15h5" />
    </svg>
  )
}
