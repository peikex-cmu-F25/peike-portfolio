import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface InteractiveSkillTagProps {
  skill: string
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  category?: string
  projects?: string[]
  experience?: string
  demos?: {
    title: string
    description: string
    link?: string
  }[]
  variant?: 'default' | 'outlined' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onClick?: () => void
}

const InteractiveSkillTag: React.FC<InteractiveSkillTagProps> = ({
  skill,
  proficiency = 'Intermediate',
  category,
  projects = [],
  experience,
  demos = [],
  variant = 'default',
  size = 'md',
  interactive = true,
  onClick
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  // Get proficiency color and percentage
  const getProficiencyData = () => {
    const data = {
      'Expert': { color: 'emerald', percentage: 95, label: 'Expert Level' },
      'Advanced': { color: 'blue', percentage: 80, label: 'Advanced' },
      'Intermediate': { color: 'yellow', percentage: 65, label: 'Intermediate' },
      'Beginner': { color: 'gray', percentage: 40, label: 'Learning' }
    }
    return data[proficiency]
  }

  const profData = getProficiencyData()

  const getVariantClasses = () => {
    const baseClasses = 'relative rounded-full font-medium transition-all duration-200 cursor-pointer'
    
    const colorClasses = {
      default: `bg-${profData.color}-100 text-${profData.color}-700 hover:bg-${profData.color}-200`,
      outlined: `border border-${profData.color}-300 text-${profData.color}-700 hover:bg-${profData.color}-50`,
      filled: `bg-${profData.color}-600 text-white hover:bg-${profData.color}-700`
    }

    return `${baseClasses} ${colorClasses[variant]} ${sizeClasses[size]}`
  }

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (!interactive) return
    
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    })
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    if (interactive) {
      setShowTooltip(false)
    }
  }

  return (
    <>
      <motion.div
        className={getVariantClasses()}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={interactive ? { 
          scale: 1.05,
          y: -2
        } : undefined}
        whileTap={interactive ? { scale: 0.95 } : undefined}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Proficiency indicator bar */}
        {proficiency && (
          <div className={`absolute bottom-0 left-0 h-0.5 bg-${profData.color}-500 rounded-full transition-all duration-300`}
               style={{ width: `${profData.percentage}%` }} />
        )}
        
        <span className="relative z-10">{skill}</span>
        
        {/* Proficiency badge */}
        {size !== 'sm' && (
          <span className={`ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-${profData.color}-500 text-white opacity-75`}>
            {proficiency === 'Expert' ? '★★★' : 
             proficiency === 'Advanced' ? '★★☆' : 
             proficiency === 'Intermediate' ? '★☆☆' : '☆☆☆'}
          </span>
        )}
      </motion.div>

      {/* Enhanced Tooltip */}
      <AnimatePresence>
        {showTooltip && interactive && (
          <motion.div
            className="fixed z-50 pointer-events-none"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              transform: 'translate(-50%, -100%)'
            }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white shadow-xl rounded-lg border border-secondary-200 p-4 max-w-xs">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-secondary-800">{skill}</h4>
                <div className={`px-2 py-1 rounded-full text-xs font-medium bg-${profData.color}-100 text-${profData.color}-700`}>
                  {profData.label}
                </div>
              </div>

              {/* Proficiency bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-secondary-600 mb-1">
                  <span>Proficiency</span>
                  <span>{profData.percentage}%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <motion.div
                    className={`bg-${profData.color}-500 h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${profData.percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Category */}
              {category && (
                <div className="mb-3">
                  <span className="text-xs font-medium text-secondary-500">Category: </span>
                  <span className="text-xs text-secondary-700">{category}</span>
                </div>
              )}

              {/* Experience */}
              {experience && (
                <div className="mb-3">
                  <span className="text-xs font-medium text-secondary-500">Experience: </span>
                  <span className="text-xs text-secondary-700">{experience}</span>
                </div>
              )}

              {/* Projects */}
              {projects.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs font-medium text-secondary-500 mb-1">Used in:</div>
                  <div className="flex flex-wrap gap-1">
                    {projects.slice(0, 3).map(project => (
                      <span key={project} className="text-xs bg-secondary-100 text-secondary-600 px-2 py-0.5 rounded">
                        {project}
                      </span>
                    ))}
                    {projects.length > 3 && (
                      <span className="text-xs text-secondary-500">+{projects.length - 3} more</span>
                    )}
                  </div>
                </div>
              )}

              {/* Demos */}
              {demos.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-secondary-500 mb-2">Demonstrations:</div>
                  <div className="space-y-2">
                    {demos.slice(0, 2).map((demo, index) => (
                      <div key={index} className="text-xs">
                        <div className="font-medium text-secondary-700">{demo.title}</div>
                        <div className="text-secondary-500 text-xs leading-relaxed">{demo.description}</div>
                        {demo.link && (
                          <a href={demo.link} className="text-primary-600 hover:text-primary-700 text-xs">
                            View Demo →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default InteractiveSkillTag