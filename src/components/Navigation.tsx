import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import GeometricLogo from './ui/GeometricLogo'
import { ThemeToggle } from './ui'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { trackNavigation } from '../utils/analytics'

interface NavItem {
  name: string
  href: string
  description?: string
  icon?: string
}

interface NavGroup {
  id: string
  label: string
  symbol: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: 'work',
    label: 'Work',
    symbol: '◆',
    items: [
      { name: 'Projects', href: '/projects', description: 'Selected product and engineering wins' },
      { name: 'Architecture Hub', href: '/architecture', description: 'System diagrams, flows, and decision records' }
    ]
  },
  {
    id: 'play',
    label: 'Playground',
    symbol: '✦',
    items: [
      { name: 'AI Games', href: '/games', description: 'Interact with coursework-trained agents' },
      { name: 'Snake', href: '/games/snake', description: 'A classic break with smooth controls' }
    ]
  },
  {
    id: 'about',
    label: 'About',
    symbol: '●',
    items: [
      { name: 'About Me', href: '/about', description: 'Origin story, philosophy, and values' },
      { name: 'Gallery', href: '/gallery', description: 'Photography and personal projects' },
      { name: 'Contact', href: '/contact', description: 'Consulting, speaking, and collaboration' }
    ]
  }
]

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.25,
      when: 'beforeChildren',
      staggerChildren: 0.05
    }
  }
}

const dropdownVariants = {
  initial: { opacity: 0, y: 8, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.18, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    y: 6,
    scale: 0.98,
    transition: { duration: 0.12, ease: 'easeIn' }
  }
}

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDesktopGroup, setOpenDesktopGroup] = useState<string | null>(null)
  const [expandedMobileGroups, setExpandedMobileGroups] = useState<string[]>([])
  const [scrolled, setScrolled] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  const handleNavigation = (href: string, callback?: () => void) => () => {
    trackNavigation(href)
    callback?.()
  }
  const location = useLocation()
  const closeTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close menus when navigating
    setIsMenuOpen(false)
    setOpenDesktopGroup(null)
  }, [location.pathname])

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current)
      }
    }
  }, [])

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  const groupStates = useMemo(() => {
    return NAV_GROUPS.map(group => ({
      group,
      isActive: group.items.some(item => isActivePath(item.href))
    }))
  }, [location.pathname])

  const toggleMobileGroup = (groupId: string) => {
    setExpandedMobileGroups(prev => 
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    )
  }

  const handleDesktopOpen = (groupId: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
    }
    setOpenDesktopGroup(groupId)
  }

  const scheduleDesktopClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
    }
    closeTimer.current = setTimeout(() => setOpenDesktopGroup(null), 120)
  }

  const handleDesktopButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, groupId: string) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      setOpenDesktopGroup(null)
      ;(event.currentTarget as HTMLButtonElement).blur()
    }
    if ((event.key === 'Enter' || event.key === ' ') && openDesktopGroup !== groupId) {
      event.preventDefault()
      handleDesktopOpen(groupId)
    }
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg border-b border-primary-100 dark:bg-neutral-900/90 dark:border-neutral-800'
          : 'bg-transparent dark:bg-transparent'
      }`}
      initial={prefersReducedMotion ? false : { y: -96 }}
      animate={{ y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container-width section-padding">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={handleNavigation('/')} className="group flex items-center space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md">
              <GeometricLogo 
                size="md"
                variant="default"
                className="transition-transform duration-200 group-hover:scale-110"
              />
              <span className="font-display text-xl font-semibold text-primary-800 group-hover:text-violet-600 transition-colors duration-200">
                Peike Xu
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {groupStates.map(({ group, isActive }) => (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => handleDesktopOpen(group.id)}
                onMouseLeave={scheduleDesktopClose}
              >
                <button
                  type="button"
                  className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-heading text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                    isActive
                      ? 'text-violet-700 bg-violet-50 shadow-sm dark:bg-violet-500/10 dark:text-violet-200'
                      : 'text-primary-600 hover:text-violet-600 hover:bg-violet-50/60 dark:text-gray-200 dark:hover:bg-neutral-800'
                  }`}
                  aria-haspopup="true"
                  aria-expanded={openDesktopGroup === group.id}
                  onFocus={() => handleDesktopOpen(group.id)}
                  onClick={() =>
                    setOpenDesktopGroup(current =>
                      current === group.id ? null : group.id
                    )
                  }
                  onKeyDown={event => handleDesktopButtonKeyDown(event, group.id)}
                >
                  <span className="text-xs opacity-60" aria-hidden="true">
                    {group.symbol}
                  </span>
                  <span>{group.label}</span>
                  <motion.span
                    className="text-xs"
                    animate={{ rotate: openDesktopGroup === group.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                  >
                    ▾
                  </motion.span>
                </button>

                <AnimatePresence initial={!prefersReducedMotion}>
                  {openDesktopGroup === group.id && (
                    <motion.ul
                      key={group.id}
                      className="absolute left-0 mt-2 min-w-[16rem] rounded-xl border border-primary-100 bg-white/95 shadow-xl backdrop-blur-xl p-3 space-y-1 dark:bg-neutral-900/95 dark:border-neutral-700"
                      {...(prefersReducedMotion
                        ? {
                            initial: { opacity: 0 },
                            animate: { opacity: 1 },
                            exit: { opacity: 0 },
                            transition: { duration: 0.1 }
                          }
                        : {
                            variants: dropdownVariants,
                            initial: 'initial',
                            animate: 'animate',
                            exit: 'exit'
                          })}
                      onMouseEnter={() => handleDesktopOpen(group.id)}
                      onMouseLeave={scheduleDesktopClose}
                    >
                      {group.items.map(item => (
                        <li key={item.href}>
                          <Link
                            to={item.href}
                            className={`flex flex-col rounded-lg px-3 py-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                              isActivePath(item.href)
                                ? 'bg-primary-50 text-primary-700 shadow-sm dark:bg-neutral-800 dark:text-primary-200'
                                : 'text-secondary-700 hover:bg-primary-50 hover:text-primary-700 dark:text-gray-300 dark:hover:bg-neutral-800 dark:hover:text-primary-200'
                            }`}
                            aria-current={isActivePath(item.href) ? 'page' : undefined}
                            onClick={handleNavigation(item.href)}
                          >
                            <span className="font-medium">{item.name}</span>
                            {item.description && (
                              <span className="text-xs text-secondary-500 mt-1 dark:text-gray-400">
                                {item.description}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <ThemeToggle className="ml-1" />
          </div>

  {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              className="p-2 text-primary-600 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              <motion.div
                animate={isMenuOpen ? 'open' : 'closed'}
                className="w-6 h-6 flex flex-col justify-center items-center"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 2 }
                  }}
                  className="w-5 h-0.5 bg-current block transform origin-center transition-all duration-300"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  className="w-5 h-0.5 bg-current block my-1 transform origin-center transition-all duration-300"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -2 }
                  }}
                  className="w-5 h-0.5 bg-current block transform origin-center transition-all duration-300"
                />
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence initial={!prefersReducedMotion}>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            className="md:hidden overflow-hidden border-t border-primary-100 bg-white/95 backdrop-blur-xl"
            variants={prefersReducedMotion ? undefined : mobileMenuVariants}
            initial={prefersReducedMotion ? { opacity: 1, height: 'auto' } : 'closed'}
            animate={prefersReducedMotion ? { opacity: 1, height: 'auto' } : 'open'}
            exit={prefersReducedMotion ? { opacity: 0, height: 0 } : 'closed'}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
          >
            <div className="section-padding py-4 space-y-4">
              {NAV_GROUPS.map(group => {
                const isExpanded = expandedMobileGroups.includes(group.id)

                return (
                  <div key={group.id} className="rounded-xl border border-primary-50 bg-white/90 shadow-sm dark:bg-neutral-900/90 dark:border-neutral-700">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-t-xl dark:text-gray-200"
                      onClick={() => toggleMobileGroup(group.id)}
                      aria-expanded={isExpanded}
                    >
                      <span className="flex items-center space-x-3">
                        <span className="text-xs opacity-60">{group.symbol}</span>
                        <span>{group.label}</span>
                      </span>
                      <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        aria-hidden="true"
                      >
                        ▾
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.ul
                          className="space-y-1 px-2 pb-3 pt-1"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {group.items.map(item => (
                            <li key={item.href}>
                              <Link
                                to={item.href}
                                className={`block rounded-lg px-4 py-2 text-sm transition-colors duration-150 ${
                                  isActivePath(item.href)
                                    ? 'bg-primary-50 text-primary-700 dark:bg-neutral-800 dark:text-primary-200'
                                    : 'text-secondary-700 hover:bg-primary-50 hover:text-primary-700 dark:text-gray-300 dark:hover:bg-neutral-800 dark:hover:text-primary-200'
                                }`}
                                aria-current={isActivePath(item.href) ? 'page' : undefined}
                                onClick={handleNavigation(item.href, () => setIsMenuOpen(false))}
                              >
                                <span className="font-medium">{item.name}</span>
                                {item.description && (
                                  <span className="block text-xs text-secondary-500 mt-1 dark:text-gray-400">
                                    {item.description}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
              <div className="px-2 pt-2">
                <ThemeToggle variant="pill" className="w-full justify-center" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navigation
