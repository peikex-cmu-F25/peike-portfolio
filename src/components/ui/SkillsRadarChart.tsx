import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SkillCategory } from '../../data/portfolio'

interface SkillsRadarChartProps {
  skills: SkillCategory[]
  size?: number
  interactive?: boolean
}

interface RadarPoint {
  x: number
  y: number
  category: string
  proficiency: string
  value: number
}

const SkillsRadarChart: React.FC<SkillsRadarChartProps> = ({
  skills,
  size = 300,
  interactive = true
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [animationProgress, setAnimationProgress] = useState(0)

  const center = size / 2
  const radius = size * 0.35
  const levels = [20, 40, 60, 80, 100] // Percentage levels for grid

  // Convert proficiency to numerical value
  const proficiencyToValue = (proficiency: string): number => {
    switch (proficiency) {
      case 'Expert': return 95
      case 'Advanced': return 80
      case 'Intermediate': return 60
      case 'Beginner': return 35
      default: return 50
    }
  }

  // Calculate radar points
  const radarPoints: RadarPoint[] = skills.map((skill, index) => {
    const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2
    const value = proficiencyToValue(skill.proficiency)
    const pointRadius = (radius * value) / 100
    
    return {
      x: center + pointRadius * Math.cos(angle),
      y: center + pointRadius * Math.sin(angle),
      category: skill.category,
      proficiency: skill.proficiency,
      value
    }
  })

  // Generate path for the radar area
  const generateRadarPath = (progress: number = 1) => {
    return radarPoints.map((point, index) => {
      const adjustedRadius = ((point.x - center) * progress) + center
      const adjustedY = ((point.y - center) * progress) + center
      return `${index === 0 ? 'M' : 'L'} ${adjustedRadius} ${adjustedY}`
    }).join(' ') + ' Z'
  }

  // Generate grid lines
  const generateGridLines = () => {
    const lines: JSX.Element[] = []
    
    // Circular grid lines
    levels.forEach((level, index) => {
      const levelRadius = (radius * level) / 100
      lines.push(
        <circle
          key={`circle-${index}`}
          cx={center}
          cy={center}
          r={levelRadius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-secondary-300 opacity-30"
        />
      )
    })

    // Radial grid lines
    skills.forEach((_, index) => {
      const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2
      const x = center + radius * Math.cos(angle)
      const y = center + radius * Math.sin(angle)
      
      lines.push(
        <line
          key={`line-${index}`}
          x1={center}
          y1={center}
          x2={x}
          y2={y}
          stroke="currentColor"
          strokeWidth="1"
          className="text-secondary-300 opacity-30"
        />
      )
    })

    return lines
  }

  // Generate category labels
  const generateLabels = () => {
    return skills.map((skill, index) => {
      const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2
      const labelRadius = radius + 20
      const x = center + labelRadius * Math.cos(angle)
      const y = center + labelRadius * Math.sin(angle)
      
      const isHovered = hoveredCategory === skill.category
      
      return (
        <g key={skill.category}>
          <motion.text
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className={`text-sm font-medium transition-colors duration-200 ${
              isHovered ? 'text-primary-600' : 'text-secondary-700'
            }`}
            animate={{
              scale: isHovered ? 1.1 : 1,
              fontWeight: isHovered ? 600 : 500
            }}
            transition={{ duration: 0.2 }}
          >
            {skill.category}
          </motion.text>
          <motion.text
            x={x}
            y={y + 16}
            textAnchor="middle"
            dominantBaseline="middle"
            className={`text-xs transition-colors duration-200 ${
              isHovered ? 'text-primary-500' : 'text-secondary-500'
            }`}
          >
            {skill.proficiency}
          </motion.text>
        </g>
      )
    })
  }

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.svg
        width={size}
        height={size}
        className="overflow-visible"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Grid lines */}
        <g className="opacity-60">
          {generateGridLines()}
        </g>

        {/* Radar area */}
        <motion.path
          d={generateRadarPath(animationProgress)}
          fill="url(#radarGradient)"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary-500"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Data points */}
        {radarPoints.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={interactive ? 6 : 4}
            fill="currentColor"
            className={`${
              hoveredCategory === point.category 
                ? 'text-primary-600' 
                : 'text-primary-500'
            } transition-colors duration-200 cursor-pointer`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
            whileHover={interactive ? { scale: 1.3 } : undefined}
            onHoverStart={() => interactive && setHoveredCategory(point.category)}
            onHoverEnd={() => interactive && setHoveredCategory(null)}
          />
        ))}

        {/* Labels */}
        {generateLabels()}

        {/* Gradient definition */}
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" className="text-primary-400" />
            <stop offset="70%" stopColor="currentColor" stopOpacity="0.1" className="text-primary-500" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" className="text-primary-600" />
          </radialGradient>
        </defs>
      </motion.svg>

      {/* Legend */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        {['Expert', 'Advanced', 'Intermediate', 'Beginner'].map((level) => (
          <div key={level} className="flex items-center space-x-2">
            <div 
              className={`w-3 h-3 rounded-full ${
                level === 'Expert' ? 'bg-primary-600' :
                level === 'Advanced' ? 'bg-primary-500' :
                level === 'Intermediate' ? 'bg-primary-400' :
                'bg-primary-300'
              }`} 
            />
            <span className="text-sm text-secondary-600">{level}</span>
          </div>
        ))}
      </motion.div>

      {/* Hover tooltip */}
      {hoveredCategory && (
        <motion.div
          className="absolute bg-white shadow-lg rounded-lg p-3 border border-secondary-200 pointer-events-none z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-sm font-semibold text-secondary-800">
            {hoveredCategory}
          </div>
          <div className="text-xs text-secondary-600">
            {skills.find(s => s.category === hoveredCategory)?.proficiency} Level
          </div>
          <div className="text-xs text-secondary-500 mt-1">
            {skills.find(s => s.category === hoveredCategory)?.skills.length} Technologies
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default SkillsRadarChart