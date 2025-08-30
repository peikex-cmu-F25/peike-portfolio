import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { personalInfo } from '../../data/portfolio'

// TypeScript interfaces for component props
interface HeroSectionProps {
  className?: string
}

interface QuickStat {
  value: string
  label: string
}

// Animation variants for better performance and reusability
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2
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

const avatarVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
}

const statsVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 1.0,
      staggerChildren: 0.1
    }
  }
}

// Quick stats data
const quickStats: QuickStat[] = [
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Projects Completed" },
  { value: "600+", label: "Students Mentored" }
]

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
    <section className={`section-padding py-32 bg-gradient-to-tr from-neutral-100 via-primary-50/30 to-accent-50/40 relative overflow-hidden min-h-screen flex items-center ${className}`}>
      {/* Abstract background shapes - less generic */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-primary-400 to-accent-400 transform rotate-45 animate-float"></div>
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gradient-to-l from-secondary-400 to-primary-400 transform -rotate-12 animate-float animation-delay-2000"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-accent-300/50 rounded-none transform rotate-12 animate-float animation-delay-4000"></div>
      </div>
      
      <div className="container-width relative">
        <motion.div 
          className="grid lg:grid-cols-12 gap-12 items-center"
          {...animationProps}
        >
          {/* Left Column - Main Content (Asymmetrical) */}
          <div className="lg:col-span-7 relative">
            {/* Small introductory text */}
            <motion.p 
              variants={itemVariants}
              className="text-sm font-mono text-primary-600 mb-4 tracking-wider uppercase font-medium"
            >
              // Currently crafting AI solutions
            </motion.p>
            
            {/* Main Heading - Staggered layout */}
            <div className="relative mb-8">
              <motion.h1 
                variants={itemVariants}
                className="font-display text-6xl md:text-8xl font-bold text-neutral-900 leading-none"
              >
                <span className="block">Hey,</span>
                <span className="block text-gradient ml-8 md:ml-16 relative">
                  I'm {personalInfo.name.split(' ')[0]}
                  <span className="absolute -top-2 -right-8 text-handwritten text-2xl text-accent-500 rotate-12">
                    ✨
                  </span>
                </span>
              </motion.h1>
              
              {/* Decorative line */}
              <motion.div
                variants={itemVariants}
                className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mt-4 ml-8"
              />
            </div>
            
            {/* Professional Title - Offset */}
            <motion.div 
              variants={itemVariants}
              className="mb-8 ml-4"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-neutral-700 mb-2">
                {personalInfo.title}
              </h2>
              <p className="font-body text-lg text-neutral-600 leading-relaxed max-w-lg">
                {personalInfo.tagline}
              </p>
            </motion.div>
            
            {/* Call-to-Action Buttons - Asymmetrical */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 mb-12"
            >
              <Link 
                to="/projects" 
                className="btn-primary group relative overflow-hidden"
                aria-label="View my portfolio projects"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Explore My Work
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              
              <Link 
                to="/contact" 
                className="btn-secondary group"
                aria-label="Get in touch with me"
              >
                <span className="flex items-center justify-center">
                  Let's Connect
                  <svg className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </span>
              </Link>
            </motion.div>

            {/* Quick Stats - Horizontal, offset */}
            <motion.div
              variants={statsVariants}
              className="flex gap-12 text-left"
              role="region"
              aria-label="Professional statistics"
            >
              {quickStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="group cursor-default"
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                >
                  <div className="font-display text-4xl font-bold text-primary-600 mb-1 group-hover:text-primary-700 transition-colors duration-200">
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs text-neutral-500 group-hover:text-neutral-600 transition-colors duration-200 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Visual Element */}
          <motion.div 
            variants={avatarVariants}
            className="lg:col-span-5 relative"
          >
            {/* Large Initial/Avatar - More creative */}
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-primary-500 via-accent-500 to-secondary-500 transform rotate-3 flex items-center justify-center text-neutral-50 shadow-2xl hover:shadow-3xl transition-all duration-500 group hover:rotate-6">
                <span className="font-display text-8xl font-bold group-hover:scale-110 transition-transform duration-300">
                  {personalInfo.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 border-4 border-accent-400 transform rotate-45"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-secondary-400 rounded-full"></div>
              
              {/* Handwritten note */}
              <div className="absolute -bottom-12 -right-8 font-handwritten text-xl text-primary-600 rotate-6">
                That's me! 👋
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - moved to side */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-12 right-12 transform rotate-90"
        aria-hidden="true"
      >
        <div className="font-mono text-xs text-neutral-400 tracking-widest">SCROLL</div>
      </motion.div>
    </section>
  )
}

export default React.memo(HeroSection)