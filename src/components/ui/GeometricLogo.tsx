import React from 'react'
import { motion } from 'framer-motion'

interface GeometricLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal' | 'mathematical'
  animated?: boolean
}

const GeometricLogo: React.FC<GeometricLogoProps> = ({
  className = "",
  size = 'md',
  variant = 'default',
  animated = true
}) => {
  const sizeConfig = {
    sm: { width: 32, height: 32, fontSize: 'text-sm' },
    md: { width: 40, height: 40, fontSize: 'text-base' },
    lg: { width: 48, height: 48, fontSize: 'text-lg' }
  }

  const { width, height, fontSize } = sizeConfig[size]

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, rotate: -180 },
    visible: { 
      opacity: 1, 
      rotate: 0,
      transition: { duration: 1, ease: "easeOut" }
    }
  }

  if (variant === 'minimal') {
    return (
      <motion.div
        className={`relative inline-flex items-center justify-center ${className}`}
        style={{ width, height }}
        variants={animated ? containerVariants : {}}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className={`font-display font-bold ${fontSize} text-primary-800 tracking-tight`}>
          PX
        </div>
      </motion.div>
    )
  }

  if (variant === 'mathematical') {
    return (
      <motion.div
        className={`relative inline-flex items-center justify-center ${className}`}
        style={{ width, height }}
        variants={animated ? containerVariants : {}}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width={width} height={height} viewBox="0 0 40 40">
          <defs>
            <linearGradient id="mathLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          
          {/* Mathematical symbol background */}
          <motion.circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="url(#mathLogoGradient)"
            strokeWidth="2"
            strokeDasharray="4,2"
            variants={animated ? pathVariants : {}}
            initial={animated ? "hidden" : "visible"}
            animate="visible"
            style={{ transformOrigin: 'center' }}
          />
          
          {/* P and X integrated design */}
          <motion.path
            d="M12 10 L12 30 M12 10 L22 10 Q26 10 26 16 Q26 20 22 20 L12 20"
            stroke="url(#mathLogoGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            variants={animated ? pathVariants : {}}
            initial={animated ? "hidden" : "visible"}
            animate="visible"
          />
          
          <motion.path
            d="M28 24 L34 30 M34 24 L28 30"
            stroke="url(#mathLogoGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            variants={animated ? pathVariants : {}}
            initial={animated ? "hidden" : "visible"}
            animate="visible"
          />
          
          {/* Mathematical accent dots */}
          <motion.circle cx="8" cy="15" r="1" fill="url(#mathLogoGradient)" 
                        initial={animated ? { scale: 0 } : { scale: 1 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.3 }} />
          <motion.circle cx="36" cy="18" r="1" fill="url(#mathLogoGradient)"
                        initial={animated ? { scale: 0 } : { scale: 1 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.7, duration: 0.3 }} />
        </svg>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width, height }}
      variants={animated ? containerVariants : {}}
      initial={animated ? "hidden" : "visible"}
      animate="visible"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg width={width} height={height} viewBox="0 0 40 40">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          
          <filter id="logoGlow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Geometric background shapes */}
        <motion.polygon
          points="20,5 32,15 32,25 20,35 8,25 8,15"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="1"
          opacity="0.3"
          variants={animated ? pathVariants : {}}
          initial={animated ? "hidden" : "visible"}
          animate="visible"
        />
        
        {/* Inner geometric pattern */}
        <motion.circle
          cx="20"
          cy="20"
          r="12"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="0.5"
          opacity="0.5"
          strokeDasharray="2,1"
          variants={animated ? pathVariants : {}}
          initial={animated ? "hidden" : "visible"}
          animate="visible"
        />
        
        {/* P letter with geometric styling */}
        <motion.path
          d="M14 12 L14 28 M14 12 L20 12 Q23 12 23 16 Q23 18 20 18 L14 18"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#logoGlow)"
          variants={animated ? pathVariants : {}}
          initial={animated ? "hidden" : "visible"}
          animate="visible"
        />
        
        {/* X letter with geometric styling */}
        <motion.path
          d="M24 20 L28 24 M28 20 L24 24"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#logoGlow)"
          variants={animated ? pathVariants : {}}
          initial={animated ? "hidden" : "visible"}
          animate="visible"
        />
        
        {/* Decorative mathematical elements */}
        <motion.circle
          cx="26"
          cy="14"
          r="1"
          fill="url(#logoGradient)"
          initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ delay: 1.8, duration: 0.4 }}
        />
        
        <motion.circle
          cx="12"
          cy="26"
          r="0.8"
          fill="url(#logoGradient)"
          initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ delay: 2, duration: 0.4 }}
        />
      </svg>
    </motion.div>
  )
}

export default GeometricLogo