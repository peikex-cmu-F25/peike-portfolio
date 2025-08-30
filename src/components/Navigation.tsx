import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navigation = [
    { name: 'Home', href: '/', emoji: '🏠' },
    { name: 'About', href: '/about', emoji: '👤' },
    { name: 'Projects', href: '/projects', emoji: '⚡' },
    { name: 'Case Studies', href: '/case-studies', emoji: '📊' },
    { name: 'Leadership', href: '/leadership', emoji: '🎯' },
    { name: 'AI Demos', href: '/ai-demos', emoji: '🤖' },
    { name: 'Architecture', href: '/architecture', emoji: '🏗️' },
    { name: 'Blog', href: '/blog', emoji: '✍️' },
    { name: 'Contact', href: '/contact', emoji: '💬' },
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
          ? 'bg-neutral-50/95 backdrop-blur-lg border-b-2 border-primary-500/20 shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container-width section-padding">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand - More creative */}
          <div className="flex items-center">
            <Link to="/" className="group flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 transform rotate-45 group-hover:rotate-90 transition-transform duration-300 flex items-center justify-center">
                <span className="font-display text-lg font-bold text-neutral-50 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                  P
                </span>
              </div>
              <span className="font-display text-2xl font-bold text-gradient group-hover:scale-105 transition-transform duration-200">
                Peike Xu
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation - Creative hover effects */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-2">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                >
                  <Link
                    to={item.href}
                    className={`group relative px-4 py-3 font-heading text-sm font-medium transition-all duration-300 ${
                      isActivePath(item.href)
                        ? 'text-primary-600'
                        : 'text-neutral-600 hover:text-primary-600'
                    }`}
                  >
                    {/* Background animation */}
                    <span className={`absolute inset-0 rounded-none bg-gradient-to-r from-primary-500 to-accent-500 transform transition-all duration-300 ${
                      isActivePath(item.href) 
                        ? 'scale-100 opacity-10' 
                        : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-5'
                    }`} />
                    
                    {/* Emoji icon */}
                    <span className="relative inline-block mr-2 transform group-hover:scale-125 transition-transform duration-200">
                      {item.emoji}
                    </span>
                    
                    {/* Text */}
                    <span className="relative">{item.name}</span>
                    
                    {/* Bottom border */}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 ${
                      isActivePath(item.href) 
                        ? 'w-full' 
                        : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile menu button - Creative design */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 text-neutral-50 flex items-center justify-center transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-500/30"
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

      {/* Mobile menu - Enhanced animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden overflow-hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="bg-neutral-50/95 backdrop-blur-lg border-t-2 border-primary-500/20 shadow-lg">
              <div className="px-4 py-6 space-y-2">
                {navigation.map((item) => (
                  <motion.div key={item.name} variants={menuItemVariants}>
                    <Link
                      to={item.href}
                      className={`group flex items-center px-4 py-3 font-heading text-base font-medium rounded-none border-l-4 transition-all duration-300 ${
                        isActivePath(item.href)
                          ? 'text-primary-600 bg-primary-50 border-primary-500'
                          : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50/50 border-transparent hover:border-primary-400'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-3 text-xl group-hover:scale-125 transition-transform duration-200">
                        {item.emoji}
                      </span>
                      {item.name}
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