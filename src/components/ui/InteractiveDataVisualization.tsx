import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface DataVisualizationProps {
  className?: string
  variant?: 'experience' | 'projects' | 'skills'
  animated?: boolean
}

interface StatConfig {
  value: number
  maxValue: number
  symbol: string
  label: string
  unit: string
  color: string
  geometric: 'hexagon' | 'octagon' | 'circle' | 'diamond'
}

const InteractiveDataVisualization: React.FC<DataVisualizationProps> = ({
  className = "",
  variant = 'experience',
  animated = true
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValue, setAnimatedValue] = useState(0)

  const statsConfig: Record<string, StatConfig[]> = {
    experience: [
      {
        value: 3.5,
        maxValue: 5,
        symbol: '∫',
        label: 'Years Experience',
        unit: 'yrs',
        color: 'accent',
        geometric: 'hexagon'
      },
      {
        value: 94,
        maxValue: 100,
        symbol: '∑',
        label: 'Model Accuracy',
        unit: '%',
        color: 'emerald',
        geometric: 'octagon'
      }
    ],
    projects: [
      {
        value: 12,
        maxValue: 15,
        symbol: '∏',
        label: 'Projects Built',
        unit: '',
        color: 'violet',
        geometric: 'diamond'
      },
      {
        value: 25,
        maxValue: 30,
        symbol: '∆',
        label: 'Technical Stack',
        unit: '',
        color: 'accent',
        geometric: 'hexagon'
      }
    ],
    skills: [
      {
        value: 95,
        maxValue: 100,
        symbol: 'λ',
        label: 'AI/ML Expertise',
        unit: '%',
        color: 'emerald',
        geometric: 'circle'
      },
      {
        value: 89,
        maxValue: 100,
        symbol: 'Ω',
        label: 'Full-Stack',
        unit: '%',
        color: 'violet',
        geometric: 'octagon'
      }
    ]
  }

  const currentStats = statsConfig[variant] || statsConfig.experience

  useEffect(() => {
    setIsVisible(true)
    
    if (animated) {
      const timer = setTimeout(() => {
        const animateValue = (start: number, end: number, duration: number) => {
          const startTime = performance.now()
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3)
            const current = start + (end - start) * easeOut
            
            setAnimatedValue(current)
            
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          
          requestAnimationFrame(animate)
        }
        
        animateValue(0, 1, 2000)
      }, 500)
      
      return () => clearTimeout(timer)
    } else {
      setAnimatedValue(1)
    }
  }, [animated, variant])

  const getGeometricPath = (type: string, size: number = 24) => {
    const half = size / 2
    const cos30 = Math.cos(Math.PI / 6) * half
    const sin30 = Math.sin(Math.PI / 6) * half
    const cos45 = Math.cos(Math.PI / 4) * half
    
    switch (type) {
      case 'hexagon':
        return `M ${half} 0 L ${half + cos30} ${sin30} L ${half + cos30} ${half + sin30} L ${half} ${size} L ${half - cos30} ${half + sin30} L ${half - cos30} ${sin30} Z`
      case 'octagon':
        return `M ${half + cos45} 0 L ${size} ${half - cos45} L ${size} ${half + cos45} L ${half + cos45} ${size} L ${half - cos45} ${size} L 0 ${half + cos45} L 0 ${half - cos45} L ${half - cos45} 0 Z`
      case 'diamond':
        return `M ${half} 0 L ${size} ${half} L ${half} ${size} L 0 ${half} Z`
      default: // circle
        return `M ${size} ${half} A ${half} ${half} 0 1 1 0 ${half} A ${half} ${half} 0 1 1 ${size} ${half} Z`
    }
  }

  const SparklineChart: React.FC<{ values: number[], color: string }> = ({ values, color }) => {
    const width = 60
    const height = 20
    const max = Math.max(...values)
    const min = Math.min(...values)
    const range = max - min || 1
    
    const points = values.map((value, index) => ({
      x: (index / (values.length - 1)) * width,
      y: height - ((value - min) / range) * height
    }))
    
    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ')
    
    return (
      <svg width={width} height={height} className="inline-block ml-2">
        <motion.path
          d={pathData}
          stroke={`var(--color-${color}-400)`}
          strokeWidth="1.5"
          fill="none"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: animatedValue }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id={`sparkline-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={`var(--color-${color}-300)`} stopOpacity="0.8" />
            <stop offset="100%" stopColor={`var(--color-${color}-500)`} stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  const GeometricProgressIndicator: React.FC<{ stat: StatConfig, index: number }> = ({ stat, index }) => {
    const progress = (animatedValue * stat.value) / stat.maxValue
    const circumference = 2 * Math.PI * 35 // radius of 35
    const strokeDashoffset = circumference * (1 - progress)
    
    // Sample data for sparkline
    const sparklineData = Array.from({ length: 8 }, (_, i) => 
      stat.value * (0.7 + Math.sin(i * 0.5) * 0.3)
    )

    return (
      <motion.div
        className={`relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] 
                   backdrop-blur-sm border border-white/[0.1] hover:border-${stat.color}-200/30
                   transition-all duration-300 hover:scale-105 hover:shadow-lg`}
        initial={animated ? { opacity: 0, scale: 0.8, y: 20 } : { opacity: 1, scale: 1, y: 0 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: 1, y: 0 }}
        transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
        whileHover={{ 
          boxShadow: `0 10px 40px rgba(var(--color-${stat.color}-500), 0.15)`,
          scale: 1.05
        }}
      >
        {/* Geometric shape with progress */}
        <div className="relative flex items-center justify-center mb-4">
          <svg width="80" height="80" className="transform -rotate-90">
            {/* Background */}
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke={`rgba(var(--color-${stat.color}-300), 0.2)`}
              strokeWidth="3"
              fill="none"
            />
            
            {/* Progress circle */}
            <motion.circle
              cx="40"
              cy="40"
              r="35"
              stroke={`var(--color-${stat.color}-400)`}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2, delay: index * 0.3, ease: "easeOut" }}
              style={{
                filter: `drop-shadow(0 0 8px var(--color-${stat.color}-400))`
              }}
            />
            
            {/* Geometric pattern overlay */}
            <path
              d={getGeometricPath(stat.geometric, 20)}
              transform="translate(30, 30)"
              fill={`var(--color-${stat.color}-400)`}
              fillOpacity="0.3"
              className="animate-mathematical-pulse"
            />
          </svg>
          
          {/* Mathematical symbol */}
          <div className={`absolute inset-0 flex items-center justify-center font-mathematical text-2xl 
                         text-${stat.color}-600 font-bold`}>
            {stat.symbol}
          </div>
        </div>
        
        {/* Value display */}
        <div className="text-center mb-3">
          <motion.div 
            className="font-mono text-3xl font-bold text-primary-800 mb-1"
            initial={animated ? { scale: 0 } : { scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.4 + 0.5, duration: 0.5, type: "spring" }}
          >
            {(animatedValue * stat.value).toFixed(variant === 'projects' ? 0 : 1)}{stat.unit}
          </motion.div>
          
          <motion.div 
            className="font-body text-sm text-primary-600"
            initial={animated ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.4 + 0.8, duration: 0.5 }}
          >
            {stat.label}
          </motion.div>
        </div>
        
        {/* Sparkline chart */}
        <div className="flex items-center justify-center">
          <SparklineChart values={sparklineData} color={stat.color} />
        </div>
        
        {/* Subtle geometric accent */}
        <div className={`absolute top-3 right-3 w-3 h-3 bg-${stat.color}-400 rounded-full 
                        opacity-30 animate-pulse-soft`} />
      </motion.div>
    )
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-6 ${className}`}>
      {currentStats.map((stat, index) => (
        <GeometricProgressIndicator 
          key={`${variant}-${index}`} 
          stat={stat} 
          index={index} 
        />
      ))}
    </div>
  )
}

export default InteractiveDataVisualization