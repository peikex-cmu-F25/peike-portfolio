import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import GeometricLogo from './ui/GeometricLogo'
import { ThemeToggle } from './ui'
import { trackNavigation } from '../utils/analytics'

const LINKS = [
  { name: 'Experience', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Games', href: '/games' },
  { name: 'Photos', href: '/gallery' },
  { name: 'Contact', href: '/contact' }
]

const linkBase = 'rounded-md px-3 py-2 text-[15px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
const linkIdle = 'text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white'
const linkActive = 'text-slate-900 font-medium dark:text-white'

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between">
          <Link
            to="/"
            onClick={() => trackNavigation('/')}
            className="flex items-center gap-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <GeometricLogo size="md" variant="default" />
            <span className="font-semibold text-slate-900 dark:text-white">Peike Xu</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {LINKS.map(link => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => trackNavigation(link.href)}
                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
              >
                {link.name}
              </NavLink>
            ))}
            <ThemeToggle className="ml-2" />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen(open => !open)}
              className="rounded-md px-3 py-2 text-[15px] text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-gray-300"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-navigation" className="md:hidden border-t border-slate-200 dark:border-neutral-800">
          <ul className="section-padding py-2">
            {LINKS.map(link => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  onClick={() => trackNavigation(link.href)}
                  className={({ isActive }) => `block py-3 text-base ${isActive ? linkActive : linkIdle}`}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navigation
