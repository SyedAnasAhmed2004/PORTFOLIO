import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { NAV_ITEMS, ROUTES } from '@/constants/routes'
import { profile } from '@/data/profile'
import { cn } from '@/lib/cn'

function getInitials(name: string) {
  const parts = name.split(' ')
  return `${parts[0][0]}${parts[parts.length - 1][0]}`
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-void/90 via-void/50 to-transparent">
      <div className="grid grid-cols-[auto_1fr_auto] items-center px-6 py-6 sm:px-12">
        <Link
          to={ROUTES.home}
          onClick={closeMenu}
          className="text-sm font-bold tracking-wider"
          aria-label={`${profile.name}, home`}
        >
          {getInitials(profile.name)}
        </Link>

        <a
          href={`mailto:${profile.email}`}
          className="hidden justify-self-center text-sm font-medium transition-colors hover:text-signal md:block"
        >
          {profile.email}
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-10 lg:gap-14">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === ROUTES.home}
                  className={({ isActive }) =>
                    cn(
                      'relative text-sm font-semibold tracking-wide uppercase transition-colors',
                      isActive ? 'text-fg' : 'text-fg/55 hover:text-fg',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-0 -bottom-1.5 h-px bg-fg"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="col-start-3 text-sm font-semibold tracking-wide uppercase md:hidden"
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[72px] bottom-0 flex flex-col justify-between bg-void/95 px-6 pt-10 pb-12 backdrop-blur-lg md:hidden"
          >
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === ROUTES.home}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      cn('text-5xl font-light uppercase', isActive ? 'text-fg' : 'text-fg/45')
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <a href={`mailto:${profile.email}`} className="text-sm text-muted">
              {profile.email}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
