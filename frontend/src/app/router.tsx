import type { ComponentType } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '@/components/layout/RootLayout'
import { ROUTES } from '@/constants/routes'

type PageModule = { default: ComponentType }

// Route-level code splitting: each page chunk loads before the router navigates to it.
const lazyPage = (load: () => Promise<PageModule>) => async () => ({
  Component: (await load()).default,
})

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: ROUTES.home, lazy: lazyPage(() => import('@/pages/HomePage')) },
      { path: ROUTES.chat, lazy: lazyPage(() => import('@/pages/ChatPage')) },
      { path: ROUTES.agent, lazy: lazyPage(() => import('@/pages/AgentPage')) },
      { path: ROUTES.contact, lazy: lazyPage(() => import('@/pages/ContactPage')) },
      { path: '*', lazy: lazyPage(() => import('@/pages/NotFoundPage')) },
    ],
  },
])
