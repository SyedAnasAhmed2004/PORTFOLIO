import { useEffect } from 'react'

import { profile } from '@/data/profile'

const BASE_TITLE = `${profile.name} — ${profile.role}`

export function usePageTitle(pageTitle?: string) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} · ${BASE_TITLE}` : BASE_TITLE
  }, [pageTitle])
}
