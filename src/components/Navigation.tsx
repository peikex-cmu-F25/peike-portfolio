import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import GeometricLogo from './ui/GeometricLogo'

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navigation = [
    { name: 'Work', href: '/projects', symbol: '◆' },
    { name: 'About', href: '/about', symbol: '●' },
    { name: 'Contact', href: '/contact', symbol: '▲' },
  ]

  const location = useLocation()
  const isActivePath = (path: string) => location.pathname === path

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const menuItemVariants = {
    closed: {
      y: -20,
      opacity: 0
    },
    open: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-primary-100' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container-width section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Geometric Logo */}
          <div className="flex items-center">
            <Link to="/" className="group flex items-center space-x-3">
              <GeometricLogo 
                size="md" 
                variant="default" 
                className="group-hover:scale-110 transition-transform duration-200" 
              />
              <span className="font-display text-xl font-semibold text-primary-800 group-hover:text-violet-600 transition-colors duration-200">
                Peike Xu
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation - Minimal */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                >
                  <Link
                    to={item.href}
                    className={`group relative font-heading text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg ${
                      isActivePath(item.href)
                        ? 'text-violet-700 bg-violet-50'
                        : 'text-primary-600 hover:text-violet-600 hover:bg-violet-50/50'
                    }`}
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <span className="font-display text-xs opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                        {item.symbol}
                      </span>
                      <span>{item.name}</span>
                    </span>
                    
                    {/* Modern hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-violet-100/0 via-violet-100/20 to-violet-100/0 rounded-lg opacity-0 group-hover:opacity-100"
                      initial={false}
                      whileHover={{
                        opacity: 1,
                        scale: 1.05,
                        background: "linear-gradient(45deg, rgba(124, 58, 237, 0.1), rgba(249, 115, 22, 0.1))"
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Professional accent line */}
                    {isActivePath(item.href) && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-6 h-0.5 bg-gradient-to-r from-violet-400 to-coral-400 rounded-full"
                        layoutId="activeNavItem"
                        initial={false}
                        animate={{ x: '-50%' }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile menu button - Simple */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-primary-600 hover:text-primary-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
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

      {/* Mobile menu - Clean */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="bg-white/95 backdrop-blur-md border-b border-primary-100">
              <div className="px-4 py-4 space-y-1">
                {navigation.map((item) => (
                  <motion.div key={item.name} variants={menuItemVariants}>
                    <Link
                      to={item.href}
                      className={`group flex items-center space-x-3 px-4 py-3 font-heading text-sm font-medium transition-all duration-200 rounded-lg mx-2 ${
                        isActivePath(item.href)
                          ? 'text-violet-700 bg-violet-50 border-l-2 border-violet-400'
                          : 'text-primary-600 hover:text-violet-600 hover:bg-violet-50/50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="font-display text-sm opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                        {item.symbol}
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navigation