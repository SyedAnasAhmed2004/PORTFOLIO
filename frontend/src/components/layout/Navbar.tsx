import { motion } from 'motion/react'
import { Link, NavLink } from 'react-router-dom'

import { NAV_ITEMS, ROUTES } from '@/constants/routes'
import { profile } from '@/data/profile'
import { cn } from '@/lib/cn'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
}

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-page flex items-center justify-between py-5">
        <Link
          to={ROUTES.home}
          className="glass grid size-10 place-items-center rounded-full font-mono text-xs font-medium tracking-wider"
          aria-label={`${profile.name} — home`}
        >
          {getInitials(profile.name)}
        </Link>

        <nav aria-label="Primary" className="glass rounded-full p-1">
          <ul className="flex items-center">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === ROUTES.home}
                  className={({ isActive }) =>
                    cn(
                      'relative block rounded-full px-3.5 py-2 text-sm transition-colors sm:px-5',
                      isActive ? 'text-ink-950' : 'text-muted hover:text-fg',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-0 rounded-full bg-fg"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <span className="hidden size-10 sm:block" aria-hidden="true" />
      </div>
    </header>
  )
}
