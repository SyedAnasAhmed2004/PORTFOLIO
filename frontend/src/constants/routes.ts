export const ROUTES = {
  home: '/',
  chat: '/chat',
  agent: '/agent',
  contact: '/contact',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]

export const NAV_ITEMS: ReadonlyArray<{ label: string; path: RoutePath }> = [
  { label: 'Home', path: ROUTES.home },
  { label: 'Chat', path: ROUTES.chat },
  { label: 'Agent', path: ROUTES.agent },
  { label: 'Contact', path: ROUTES.contact },
]
