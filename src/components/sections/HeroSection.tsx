import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { personalInfo } from '../../data/portfolio'
import MathematicalBackground from '../ui/MathematicalBackground'
import InteractiveDataVisualization from '../ui/InteractiveDataVisualization'
import GeometricDividers from '../ui/GeometricDividers'

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

const geometricVariants = {
  hidden: { scale: 0, rotate: -180, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut",
      type: "spring",
      stiffness: 200,
      damping: 20
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
      <section className={`section-padding py-32 relative min-h-screen flex items-center overflow-hidden ${className}`}>
        {/* Enhanced mathematical background with neural network pattern */}
        <MathematicalBackground variant="neural" intensity="ultra-subtle" animated={!prefersReducedMotion} />
        
        {/* Mathematical secondary pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
          <MathematicalBackground variant="parametric" intensity="barely-visible" animated={!prefersReducedMotion} />
        </div>
        
        {/* Enhanced text readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.01] pointer-events-none" />
        
        {/* Asymmetrical layout container */}
        <div className="container-width relative z-20">
          <div className="grid grid-cols-12 gap-8 items-center min-h-[80vh]">
            
            {/* Left column - Main content (asymmetrical) */}
            <div className="col-span-12 lg:col-span-7 xl:col-span-6">
              <motion.div {...animationProps}>
                
                {/* Mathematical greeting with geometric accent */}
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center mb-6"
                >
                  <div className="font-mono text-sm text-accent-600 tracking-wider mr-4">
                    λ Hello, I'm
                  </div>
                  <div className="w-12 h-px bg-gradient-to-r from-accent-400 to-transparent" />
                </motion.div>
                
                {/* Animated name reveal with geometric styling */}
                <motion.h1 
                  variants={nameVariants}
                  className="relative"
                >
                  <span className="font-display text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary-900 via-accent-700 to-emerald-600 bg-clip-text text-transparent leading-tight mb-8 block">
                    {personalInfo.name}
                  </span>
                  
                  {/* Geometric accent behind name */}
                  <motion.div
                    variants={geometricVariants}
                    className="absolute -top-4 -left-4 w-16 h-16 border border-accent-200 opacity-30"
                    style={{ 
                      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                      background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(139, 92, 246, 0.1))'
                    }}
                  />
                </motion.h1>
                
                {/* Mathematical tagline with enhanced typography */}
                <motion.p 
                  variants={itemVariants}
                  className="font-body text-xl md:text-2xl text-primary-700 leading-relaxed mb-8 max-w-2xl"
                >
                  I build{' '}
                  <span className="font-mono text-accent-600 px-2 py-1 bg-accent-50 rounded border-l-2 border-accent-400">
                    AI systems
                  </span>
                  {' '}that solve real problems
                </motion.p>
                
                {/* Enhanced description with mathematical elements */}
                <motion.p 
                  variants={itemVariants}
                  className="font-body text-primary-600 leading-relaxed mb-12 max-w-xl"
                >
                  Currently studying{' '}
                  <span className="font-mono text-sm bg-emerald-50 text-emerald-700 px-1 rounded">
                    Software Engineering
                  </span>
                  {' '}at Carnegie Mellon while crafting intelligent solutions that make a difference.
                </motion.p>
                
                {/* Enhanced buttons with geometric styling */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4 mb-16"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/projects" 
                      className="group relative px-8 py-4 bg-gradient-to-r from-accent-500 to-emerald-500 text-white font-heading font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        <span className="font-mathematical text-sm">∏</span>
                        <span>View My Work</span>
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-violet-500 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      />
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/contact" 
                      className="group relative px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-accent-200 text-accent-700 font-heading font-medium rounded-xl shadow-md hover:shadow-lg hover:border-accent-400 transition-all duration-300"
                    >
                      <span className="flex items-center space-x-2">
                        <span className="font-mathematical text-sm">∑</span>
                        <span>Get In Touch</span>
                      </span>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right column - Interactive visualizations (asymmetrical) */}
            <div className="col-span-12 lg:col-span-5 xl:col-span-6 lg:pl-8">
              <motion.div
                variants={itemVariants}
                className="space-y-8"
              >
                {/* Mathematical data visualizations */}
                <div className="relative">
                  <InteractiveDataVisualization variant="experience" animated={!prefersReducedMotion} />
                </div>
                
                <div className="relative lg:ml-8">
                  <InteractiveDataVisualization variant="projects" animated={!prefersReducedMotion} />
                </div>
                
                {/* Geometric accent elements */}
                <motion.div
                  variants={geometricVariants}
                  className="hidden lg:block absolute top-1/2 right-8 w-20 h-20 border border-violet-300 opacity-20 animate-geometric-rotate"
                  style={{ 
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                    animationDuration: '8s'
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Mathematical formula overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ delay: 3, duration: 2 }}
          className="absolute bottom-8 right-8 font-mathematical text-6xl text-accent-400 pointer-events-none select-none"
        >
          ∫∑∏
        </motion.div>
      </section>
      
      {/* Geometric divider */}
      <GeometricDividers 
        variant="mathematical" 
        height="md" 
        color="gradient" 
        animated={!prefersReducedMotion}
      />
    </>
  )
}

export default React.memo(HeroSection)