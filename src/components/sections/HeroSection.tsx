import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { personalInfo } from '../../data/portfolio'
import professionalPhoto from '../../assets/images/peike-professional-photo.png'

// TypeScript interfaces for component props
interface HeroSectionProps {
  className?: string
}

// Animation variants for better performance and reusability
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

const nameVariants = {
  hidden: { 
    opacity: 0,
    x: -50,
    rotate: -5
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = "" }) => {
  // Handle reduced motion preferences
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const animationProps = prefersReducedMotion ? {} : {
    initial: "hidden",
    animate: "visible",
    variants: containerVariants
  }

  return (
    <>
      <section className={`section-padding py-16 relative min-h-[85vh] flex items-center overflow-hidden ${className}`}>
        {/* Clean minimal background */}
        <div className="absolute inset-0 bg-white" />
        
        {/* Subtle gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-primary-50/30 pointer-events-none" />
        
        {/* Main content container */}
        <div className="container-width relative z-20">
          <div className="grid grid-cols-12 gap-8 items-center min-h-[70vh]">
            
            {/* Left column - Main content */}
            <div className="col-span-12 lg:col-span-8 xl:col-span-7">
              <motion.div {...animationProps}>
                
                {/* Simple greeting */}
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center mb-4"
                >
                  <div className="font-mono text-sm text-primary-600 tracking-wider mr-4">
                    Hello, I'm
                  </div>
                  <div className="w-12 h-px bg-gradient-to-r from-primary-400 to-transparent" />
                </motion.div>
                
                {/* Animated name */}
                <motion.h1 
                  variants={nameVariants}
                  className="relative mb-4"
                >
                  <span className="font-display text-5xl md:text-7xl font-bold text-gray-900 leading-tight block">
                    {personalInfo.name}
                  </span>
                </motion.h1>
                
                {/* Clean tagline */}
                <motion.p 
                  variants={itemVariants}
                  className="leading-relaxed mb-4 max-w-2xl"
                >
                  <span className="font-light text-xl md:text-2xl text-gray-700">I build</span>{' '}
                  <span className="font-medium text-xl md:text-2xl text-primary-700 px-3 py-1 bg-primary-50 rounded-lg border-l-3 border-primary-400">
                    AI systems
                  </span>
                  <span className="font-light text-xl md:text-2xl text-gray-700">{' '}that solve real problems</span>
                </motion.p>
                
                {/* Description */}
                <motion.p 
                  variants={itemVariants}
                  className="font-body text-gray-600 leading-relaxed mb-8 max-w-xl"
                >
                  Currently studying{' '}
                  <span className="font-medium text-accent-600 px-2 py-1 bg-gray-100 rounded">
                    Software Engineering
                  </span>
                  {' '}at Carnegie Mellon while crafting intelligent solutions that make a difference.
                </motion.p>
                
                {/* Clean buttons */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4 mb-8"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/projects" 
                      className="btn-primary"
                    >
                      <span>View My Work</span>
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/contact" 
                      className="btn-secondary"
                    >
                      <span>Get In Touch</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right column - Professional photo */}
            <div className="col-span-12 lg:col-span-4 xl:col-span-5 lg:pl-8 order-first lg:order-last mb-8 lg:mb-0">
              <motion.div
                variants={itemVariants}
                className="relative"
              >
                {/* Professional photo with fancy styling */}
                <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
                  <div className="relative">
                    {/* Animated background layers */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-100 via-blue-50 to-primary-200 transform rotate-3 animate-pulse-subtle"></div>
                    <div className="absolute inset-1 rounded-2xl bg-gradient-to-tr from-white/95 to-primary-50/80 backdrop-blur-sm transform -rotate-2"></div>
                    
                    {/* Glowing border effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-blue-500 to-primary-600 rounded-3xl blur-sm opacity-30 animate-pulse"></div>
                    
                    {/* Main photo container */}
                    <div className="relative z-10 p-4 sm:p-5">
                      <div className="relative group">
                        <img
                          src={professionalPhoto}
                          alt="Peike Xu - Software Engineering student at Carnegie Mellon University"
                          className="w-full aspect-[4/5] object-cover rounded-2xl shadow-2xl border-4 border-white/90 backdrop-blur-sm group-hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] group-hover:rotate-1"
                          loading="eager"
                        />
                        
                        {/* Elegant overlay on hover */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Stylish Carnegie Mellon badge */}
                        <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white px-3 py-2 rounded-full text-xs font-semibold shadow-xl backdrop-blur-sm border-2 border-white/30 group-hover:scale-110 transition-transform duration-300">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span>Carnegie Mellon</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating decorative elements */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-primary-400 to-blue-500 rounded-full opacity-70 animate-float shadow-lg"></div>
                  <div className="absolute -bottom-6 -right-6 w-6 h-6 bg-gradient-to-br from-blue-500 to-primary-600 rounded-full opacity-60 animate-float animation-delay-2000 shadow-md"></div>
                  <div className="absolute top-1/4 -left-2 w-4 h-4 bg-gradient-to-br from-primary-300 to-blue-400 rounded-full opacity-50 animate-pulse-subtle animation-delay-4000"></div>
                  
                  {/* Elegant geometric accent */}
                  <div className="absolute top-8 -right-8 w-12 h-12 border-2 border-primary-300/40 rounded-full animate-geometric-rotate opacity-30"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default React.memo(HeroSection)