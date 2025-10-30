import React from 'react'
import { motion } from 'framer-motion'

interface GeometricLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal' | 'modern' | 'mathematical'
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

  if (variant === 'modern') {
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
            <linearGradient id="modernLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            
            <filter id="modernGlow">
              <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Clean background circle */}
          <motion.circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="url(#modernLogoGradient)"
            strokeWidth="1.5"
            opacity="0.15"
            variants={animated ? pathVariants : {}}
            initial={animated ? "hidden" : "visible"}
            animate="visible"
          />
          
          {/* Modern P - clean, sans-serif style */}
          <motion.path
            d="M12 12 L12 28 M12 12 L20 12 Q24 12 24 16 Q24 18 20 18 L12 18"
            stroke="url(#modernLogoGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#modernGlow)"
            variants={animated ? pathVariants : {}}
            initial={animated ? "hidden" : "visible"}
            animate="visible"
          />
          
          {/* Modern X - simplified, elegant */}
          <motion.path
            d="M26 20 L30 24 M30 20 L26 24"
            stroke="url(#modernLogoGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#modernGlow)"
            variants={animated ? pathVariants : {}}
            initial={animated ? "hidden" : "visible"}
            animate="visible"
          />
          
          {/* Subtle accent elements - professional not mathematical */}
          <motion.circle
            cx="32"
            cy="14"
            r="1.5"
            fill="none"
            stroke="url(#modernLogoGradient)"
            strokeWidth="1"
            opacity="0.6"
            initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ delay: 1.5, duration: 0.4 }}
          />
          
          <motion.rect
            x="8"
            y="26"
            width="2"
            height="2"
            rx="1"
            fill="none"
            stroke="url(#modernLogoGradient)"
            strokeWidth="0.8"
            opacity="0.4"
            initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.4 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ delay: 1.8, duration: 0.4 }}
          />
        </svg>
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
          <linearGradient id="defaultLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          
          <filter id="defaultLogoGlow">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Circular border - blue gradient outline */}
        <motion.circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="url(#defaultLogoGradient)"
          strokeWidth="2"
          opacity="0.8"
          variants={animated ? pathVariants : {}}
          initial={animated ? "hidden" : "visible"}
          animate="visible"
        />
        
        {/* Large P letter - main element */}
        <motion.path
          d="M12 10 L12 30 M12 10 L22 10 Q26 10 26 15 Q26 18 22 18 L12 18"
          stroke="url(#defaultLogoGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#defaultLogoGlow)"
          variants={animated ? pathVariants : {}}
          initial={animated ? "hidden" : "visible"}
          animate="visible"
        />
        
        {/* Small geometric accent elements */}
        {/* Orange circle */}
        <motion.circle
          cx="30"
          cy="12"
          r="2"
          fill="#f97316"
          opacity="0.8"
          initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ delay: 1.5, duration: 0.4 }}
        />
        
        {/* Green rectangle/triangle */}
        <motion.polygon
          points="9,30 11,28 13,30"
          fill="#10b981"
          opacity="0.8"
          initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ delay: 1.8, duration: 0.4 }}
        />
        
        {/* Additional small accent - orange rectangle */}
        <motion.rect
          x="28"
          y="28"
          width="3"
          height="2"
          rx="0.5"
          fill="#f97316"
          opacity="0.6"
          initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ delay: 2.0, duration: 0.4 }}
        />
      </svg>
    </motion.div>
  )
}

export default GeometricLogo