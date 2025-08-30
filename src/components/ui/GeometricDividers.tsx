import React from 'react'
import { motion } from 'framer-motion'

interface GeometricDividersProps {
  className?: string
  variant?: 'angular' | 'wave' | 'polygon' | 'fractal' | 'mathematical' | 'tessellation'
  height?: 'sm' | 'md' | 'lg'
  color?: 'accent' | 'emerald' | 'violet' | 'gradient'
  animated?: boolean
  inverted?: boolean
}

const GeometricDividers: React.FC<GeometricDividersProps> = ({
  className = "",
  variant = 'angular',
  height = 'md',
  color = 'accent',
  animated = true,
  inverted = false
}) => {
  const heightConfig = {
    sm: 60,
    md: 100,
    lg: 140
  }

  const dividerHeight = heightConfig[height]

  const getColorClasses = () => {
    switch (color) {
      case 'emerald':
        return 'fill-emerald-400/20 stroke-emerald-400/40'
      case 'violet':
        return 'fill-violet-400/20 stroke-violet-400/40'
      case 'gradient':
        return '' // Will use gradient fill
      default:
        return 'fill-accent-400/20 stroke-accent-400/40'
    }
  }

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" }
    }
  }

  const AngularDivider = () => (
    <svg 
      width="100%" 
      height={dividerHeight} 
      viewBox={`0 0 1200 ${dividerHeight}`} 
      className={`${inverted ? 'rotate-180' : ''}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="angularGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      <motion.path
        d={`M 0 ${dividerHeight} L 300 20 L 600 60 L 900 10 L 1200 40 L 1200 ${dividerHeight} Z`}
        fill={color === 'gradient' ? 'url(#angularGradient)' : undefined}
        className={color !== 'gradient' ? getColorClasses() : ''}
        variants={animated ? pathVariants : {}}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
      />
      
      <motion.path
        d="M 0 0 L 300 20 L 600 60 L 900 10 L 1200 40"
        fill="none"
        strokeWidth="1"
        className={color !== 'gradient' ? getColorClasses() : 'stroke-accent-400/60'}
        variants={animated ? pathVariants : {}}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
      />
    </svg>
  )

  const WaveDivider = () => (
    <svg 
      width="100%" 
      height={dividerHeight} 
      viewBox={`0 0 1200 ${dividerHeight}`} 
      className={`${inverted ? 'rotate-180' : ''}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      <motion.path
        d={`M 0 ${dividerHeight} Q 300 20 600 40 T 1200 30 L 1200 ${dividerHeight} Z`}
        fill={color === 'gradient' ? 'url(#waveGradient)' : undefined}
        className={color !== 'gradient' ? getColorClasses() : ''}
        variants={animated ? pathVariants : {}}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
      />
    </svg>
  )

  const PolygonDivider = () => (
    <svg 
      width="100%" 
      height={dividerHeight} 
      viewBox={`0 0 1200 ${dividerHeight}`} 
      className={`${inverted ? 'rotate-180' : ''}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="polygonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      <motion.path
        d={`M 0 ${dividerHeight} L 200 30 L 400 50 L 600 15 L 800 45 L 1000 25 L 1200 35 L 1200 ${dividerHeight} Z`}
        fill={color === 'gradient' ? 'url(#polygonGradient)' : undefined}
        className={color !== 'gradient' ? getColorClasses() : ''}
        variants={animated ? pathVariants : {}}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
      />
      
      {/* Geometric accent shapes */}
      <motion.polygon
        points="400,50 420,30 440,50"
        fill={color === 'gradient' ? 'url(#polygonGradient)' : undefined}
        className={color !== 'gradient' ? getColorClasses() : ''}
        initial={animated ? { scale: 0 } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
      
      <motion.polygon
        points="800,45 815,25 830,45"
        fill={color === 'gradient' ? 'url(#polygonGradient)' : undefined}
        className={color !== 'gradient' ? getColorClasses() : ''}
        initial={animated ? { scale: 0 } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      />
    </svg>
  )

  const FractalDivider = () => {
    const generateKochCurve = (depth: number) => {
      const kochSegment = (x1: number, y1: number, x2: number, y2: number, level: number): string => {
        if (level === 0) {
          return `L ${x2} ${y2}`
        }
        
        const dx = (x2 - x1) / 3
        const dy = (y2 - y1) / 3
        
        const x3 = x1 + dx
        const y3 = y1 + dy
        const x4 = x2 - dx
        const y4 = y2 - dy
        
        // Peak point
        const x5 = (x3 + x4) / 2 - (y4 - y3) * Math.sqrt(3) / 2
        const y5 = (y3 + y4) / 2 + (x4 - x3) * Math.sqrt(3) / 2
        
        return (
          kochSegment(x1, y1, x3, y3, level - 1) +
          kochSegment(x3, y3, x5, y5, level - 1) +
          kochSegment(x5, y5, x4, y4, level - 1) +
          kochSegment(x4, y4, x2, y2, level - 1)
        )
      }
      
      return `M 0 60 ${kochSegment(0, 60, 1200, 60, depth)}`
    }
    
    return (
      <svg 
        width="100%" 
        height={dividerHeight} 
        viewBox={`0 0 1200 ${dividerHeight}`} 
        className={`${inverted ? 'rotate-180' : ''}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="fractalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        <motion.path
          d={`${generateKochCurve(2)} L 1200 ${dividerHeight} L 0 ${dividerHeight} Z`}
          fill={color === 'gradient' ? 'url(#fractalGradient)' : undefined}
          className={color !== 'gradient' ? getColorClasses() : ''}
          variants={animated ? pathVariants : {}}
          initial={animated ? "hidden" : "visible"}
          animate="visible"
        />
      </svg>
    )
  }

  const MathematicalDivider = () => (
    <svg 
      width="100%" 
      height={dividerHeight} 
      viewBox={`0 0 1200 ${dividerHeight}`} 
      className={`${inverted ? 'rotate-180' : ''}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="mathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
          <stop offset="33%" stopColor="#10b981" stopOpacity="0.2" />
          <stop offset="66%" stopColor="#8b5cf6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Sine wave pattern */}
      <motion.path
        d={`M 0 ${dividerHeight} ${Array.from({ length: 121 }, (_, i) => {
          const x = i * 10
          const y = 50 + 30 * Math.sin(x * 0.02)
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')} L 1200 ${dividerHeight} Z`}
        fill={color === 'gradient' ? 'url(#mathGradient)' : undefined}
        className={color !== 'gradient' ? getColorClasses() : ''}
        variants={animated ? pathVariants : {}}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
      />
      
      {/* Mathematical symbols */}
      <motion.text
        x="100"
        y="30"
        fontSize="16"
        fill="currentColor"
        className="text-accent-400/60 font-mathematical"
        initial={animated ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        ∫
      </motion.text>
      
      <motion.text
        x="600"
        y="25"
        fontSize="14"
        fill="currentColor"
        className="text-emerald-400/60 font-mathematical"
        initial={animated ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        ∑
      </motion.text>
      
      <motion.text
        x="1000"
        y="35"
        fontSize="15"
        fill="currentColor"
        className="text-violet-400/60 font-mathematical"
        initial={animated ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 1 }}
      >
        π
      </motion.text>
    </svg>
  )

  const TessellationDivider = () => (
    <svg 
      width="100%" 
      height={dividerHeight} 
      viewBox={`0 0 1200 ${dividerHeight}`} 
      className={`${inverted ? 'rotate-180' : ''}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="tessellationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
        </linearGradient>
        <pattern id="tessellation" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <polygon points="30,0 60,30 30,60 0,30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3"/>
        </pattern>
      </defs>
      
      <motion.path
        d={`M 0 ${dividerHeight} L 0 40 Q 200 20 400 35 T 800 30 Q 1000 25 1200 40 L 1200 ${dividerHeight} Z`}
        fill={color === 'gradient' ? 'url(#tessellationGradient)' : undefined}
        className={color !== 'gradient' ? getColorClasses() : ''}
        variants={animated ? pathVariants : {}}
        initial={animated ? "hidden" : "visible"}
        animate="visible"
      />
      
      <motion.rect
        x="0"
        y="0"
        width="1200"
        height="80"
        fill="url(#tessellation)"
        className="text-accent-400"
        initial={animated ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </svg>
  )

  const renderDivider = () => {
    switch (variant) {
      case 'wave':
        return <WaveDivider />
      case 'polygon':
        return <PolygonDivider />
      case 'fractal':
        return <FractalDivider />
      case 'mathematical':
        return <MathematicalDivider />
      case 'tessellation':
        return <TessellationDivider />
      default:
        return <AngularDivider />
    }
  }

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height: dividerHeight }}>
      {renderDivider()}
      
      {/* Optional overlay pattern for additional depth */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
        }}
      />
    </div>
  )
}

export default GeometricDividers