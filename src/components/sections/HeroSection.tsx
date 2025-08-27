import React from 'react'
import { motion } from 'framer-motion'
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
    <section className={`section-padding py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden ${className}`}>
      {/* Background Pattern - Glassmorphism Elements */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
      </div>
      
      <div className="container-width relative">
        <motion.div 
          className="text-center"
          {...animationProps}
        >
          {/* Avatar/Logo */}
          <motion.div
            variants={avatarVariants}
            className="mb-8"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 group">
              <span className="group-hover:scale-110 transition-transform duration-300">
                {personalInfo.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-secondary-900 mb-6 leading-tight"
          >
            Hi, I'm{" "}
            <span className="text-gradient inline-block hover:scale-105 transition-transform duration-300">
              {personalInfo.name}
            </span>
          </motion.h1>
          
          {/* Professional Title */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-secondary-600 mb-4 max-w-4xl mx-auto font-medium"
          >
            {personalInfo.title}
          </motion.p>
          
          {/* Tagline */}
          <motion.p 
            variants={itemVariants}
            className="text-lg text-secondary-500 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {personalInfo.tagline}
          </motion.p>
          
          {/* Call-to-Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.a 
              href="/projects" 
              className="btn-primary group relative overflow-hidden"
              whileHover={{ 
                scale: prefersReducedMotion ? 1 : 1.05, 
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" 
              }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
              aria-label="View my portfolio projects"
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                View My Work
              </span>
            </motion.a>
            
            <motion.a 
              href="/contact" 
              className="btn-secondary group"
              whileHover={{ 
                scale: prefersReducedMotion ? 1 : 1.05, 
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" 
              }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
              aria-label="Get in touch with me"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Get In Touch
              </span>
            </motion.a>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={statsVariants}
            className="flex flex-wrap justify-center gap-8 max-w-2xl mx-auto"
            role="region"
            aria-label="Professional statistics"
          >
            {quickStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center group cursor-default"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              >
                <div className="text-3xl font-bold text-primary-600 mb-1 group-hover:text-primary-700 transition-colors duration-200">
                  {stat.value}
                </div>
                <div className="text-sm text-secondary-500 group-hover:text-secondary-600 transition-colors duration-200">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-secondary-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-secondary-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default React.memo(HeroSection)