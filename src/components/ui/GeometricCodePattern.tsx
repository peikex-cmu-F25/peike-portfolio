import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GeometricCodePatternProps {
  className?: string
  animated?: boolean
}

const GeometricCodePattern: React.FC<GeometricCodePatternProps> = ({ 
  className = "",
  animated = true
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const codeLines = [
    "const solve = (data) => {",
    "  const patterns = data.map(",
    "    x => transform(x)",
    "  );",
    "  return optimize(patterns);",
    "};"
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.5
      }
    }
  }

  const lineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const geometricVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 2
      }
    }
  }

  return (
    <div 
      className={`relative cursor-help ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Geometric grid background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-accent-400" />
        </svg>
      </div>

      {/* Code pattern */}
      <motion.div
        variants={animated ? containerVariants : {}}
        initial={animated ? "hidden" : false}
        animate={animated ? "visible" : false}
        className="relative z-10 font-mono text-xs leading-relaxed text-accent-400/60"
      >
        {codeLines.map((line, index) => (
          <motion.div
            key={index}
            variants={animated ? lineVariants : {}}
            className="mb-1"
            style={{ paddingLeft: `${(line.match(/^\s*/)?.[0]?.length || 0) * 8}px` }}
          >
            {line.trim()}
          </motion.div>
        ))}
      </motion.div>

      {/* Geometric accent shapes */}
      <motion.div
        variants={animated ? geometricVariants : {}}
        initial={animated ? "hidden" : false}
        animate={animated ? "visible" : false}
        className="absolute -top-2 -left-2 w-6 h-6 border border-accent-300/30 rotate-45"
      />
      
      <motion.div
        variants={animated ? geometricVariants : {}}
        initial={animated ? "hidden" : false}
        animate={animated ? "visible" : false}
        className="absolute -bottom-2 -right-2 w-4 h-4 bg-accent-200/20 rounded-full"
        transition={{ delay: animated ? 2.2 : 0 }}
      />
      
      <motion.div
        variants={animated ? geometricVariants : {}}
        initial={animated ? "hidden" : false}
        animate={animated ? "visible" : false}
        className="absolute top-1/2 -right-1 w-1 h-8 bg-gradient-to-b from-accent-300/40 to-transparent"
        transition={{ delay: animated ? 2.4 : 0 }}
      />

      {/* Context tooltip on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-20 bg-white/95 backdrop-blur-sm border border-accent-200 rounded-lg px-3 py-2 shadow-lg whitespace-nowrap"
          >
            <div className="text-xs text-gray-700 font-medium">
              A glimpse into my problem-solving process
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Transform → Optimize → Solve
            </div>
            
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/95" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GeometricCodePattern