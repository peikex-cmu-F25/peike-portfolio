import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExperienceData, ProjectData } from '../../data/portfolio'

interface ProjectImpactMetricsProps {
  experiences?: ExperienceData[]
  projects?: ProjectData[]
  interactive?: boolean
}

interface MetricData {
  id: string
  label: string
  value: string | number
  category: 'Performance' | 'Scale' | 'Efficiency' | 'Quality' | 'Impact'
  source: string
  description: string
  icon: string
}

const ProjectImpactMetrics: React.FC<ProjectImpactMetricsProps> = ({
  experiences = [],
  projects = [],
  interactive = true
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [animatedValues, setAnimatedValues] = useState<{[key: string]: number}>({})

  // Extract metrics from achievements and project data
  const extractMetrics = (): MetricData[] => {
    const metrics: MetricData[] = []
    let metricId = 0

    // Process work experience achievements
    experiences.forEach(exp => {
      exp.achievements.forEach(achievement => {
        // Extract numerical metrics from achievement text
        const patterns = [
          { regex: /(\d+(?:,\d+)*)\+?\s*(?:concurrent\s+)?(?:users?|sessions?|patient)/gi, category: 'Scale' as const, icon: '👥' },
          { regex: /(\d+(?:\.\d+)?)\%\s*(?:accuracy|improvement|faster|reduction|coverage|uptime)/gi, category: 'Performance' as const, icon: '📈' },
          { regex: /(\d+(?:,\d+)*)\+?\s*(?:database|scenarios?|documents?|students?)/gi, category: 'Scale' as const, icon: '📊' },
          { regex: /(\d+(?:\.\d+)?)\s*(?:days?|hours?|weeks?|seconds?|ms)\s*(?:to|from)/gi, category: 'Efficiency' as const, icon: '⚡' },
          { regex: /(\d+(?:\.\d+)?)\s*(?:days?|hours?|weeks?)\s*(?:reducing|decreased)/gi, category: 'Efficiency' as const, icon: '⏰' },
          { regex: /sub-second|real-time|<\d+ms/gi, category: 'Performance' as const, icon: '🚀', value: 'Real-time' }
        ]

        patterns.forEach(pattern => {
          const matches = achievement.match(pattern.regex)
          if (matches) {
            matches.forEach(match => {
              const numericMatch = match.match(/(\d+(?:[,.\d]+)?)/)
              const value = pattern.value || (numericMatch ? numericMatch[1] : match)
              
              metrics.push({
                id: `metric-${metricId++}`,
                label: achievement.substring(0, 50) + '...',
                value,
                category: pattern.category,
                source: exp.company,
                description: achievement,
                icon: pattern.icon
              })
            })
          }
        })
      })
    })

    // Process project metrics
    projects.forEach(project => {
      project.metrics.forEach(metric => {
        metrics.push({
          id: `project-metric-${metricId++}`,
          label: metric.label,
          value: metric.value,
          category: 'Impact',
          source: project.title,
          description: project.description,
          icon: '🎯'
        })
      })
    })

    return metrics
  }

  const metrics = extractMetrics()
  const categories = Array.from(new Set(metrics.map(m => m.category)))

  // Animation for numeric values
  useEffect(() => {
    const timer = setTimeout(() => {
      const newAnimatedValues: {[key: string]: number} = {}
      metrics.forEach(metric => {
        if (typeof metric.value === 'string') {
          const numMatch = metric.value.match(/(\d+(?:[,.]?\d+)?)/)
          if (numMatch) {
            const num = parseFloat(numMatch[1].replace(/,/g, ''))
            newAnimatedValues[metric.id] = num
          }
        }
      })
      setAnimatedValues(newAnimatedValues)
    }, 200)

    return () => clearTimeout(timer)
  }, [metrics])

  // Animate number counting
  const AnimatedNumber: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
      const duration = 1500
      const steps = 60
      const increment = value / steps
      let step = 0

      const timer = setInterval(() => {
        step++
        setCurrent(Math.min(increment * step, value))
        
        if (step >= steps) {
          clearInterval(timer)
          setCurrent(value)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }, [value])

    return <span>{Math.floor(current).toLocaleString()}{suffix}</span>
  }

  // Category colors
  const getCategoryColor = (category: string) => {
    const colors = {
      'Performance': 'from-green-400 to-emerald-500',
      'Scale': 'from-blue-400 to-cyan-500',
      'Efficiency': 'from-yellow-400 to-orange-500',
      'Quality': 'from-purple-400 to-pink-500',
      'Impact': 'from-red-400 to-rose-500'
    }
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500'
  }

  const filteredMetrics = selectedCategory 
    ? metrics.filter(m => m.category === selectedCategory)
    : metrics

  return (
    <div className="space-y-6">
      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <motion.button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            !selectedCategory 
              ? 'bg-primary-600 text-white shadow-md' 
              : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
          }`}
          onClick={() => setSelectedCategory(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All Metrics ({metrics.length})
        </motion.button>
        
        {categories.map(category => (
          <motion.button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
            }`}
            onClick={() => setSelectedCategory(
              selectedCategory === category ? null : category
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category} ({metrics.filter(m => m.category === category).length})
          </motion.button>
        ))}
      </div>

      {/* Metrics grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
        {filteredMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            className="relative overflow-hidden bg-white rounded-xl shadow-md border border-secondary-200 p-6 hover:shadow-lg transition-all duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={interactive ? { y: -2 } : undefined}
            layout
          >
            {/* Category gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(metric.category)} opacity-5`} />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{metric.icon}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getCategoryColor(metric.category)} text-white`}>
                  {metric.category}
                </span>
              </div>

              {/* Value */}
              <div className="mb-3">
                <div className="text-2xl font-bold text-secondary-800">
                  {typeof metric.value === 'string' ? (
                    animatedValues[metric.id] ? (
                      <AnimatedNumber 
                        value={animatedValues[metric.id]} 
                        suffix={metric.value.replace(/[\d,.]/g, '')}
                      />
                    ) : (
                      metric.value
                    )
                  ) : (
                    metric.value
                  )}
                </div>
              </div>

              {/* Label and source */}
              <div className="space-y-2">
                <p className="text-sm text-secondary-600 line-clamp-2">
                  {metric.label}
                </p>
                <div className="flex items-center justify-between text-xs text-secondary-500">
                  <span className="font-medium">{metric.source}</span>
                </div>
              </div>

              {/* Hover description */}
              {interactive && (
                <motion.div
                  className="absolute inset-0 bg-white bg-opacity-95 p-4 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-xl"
                  initial={false}
                >
                  <p className="text-sm text-secondary-700 text-center leading-relaxed">
                    {metric.description}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary stats */}
      <motion.div 
        className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-cyan-50 rounded-xl border border-primary-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="text-lg font-semibold text-secondary-800 mb-4 text-center">
          Impact Summary
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map(category => {
            const categoryMetrics = metrics.filter(m => m.category === category)
            return (
              <div key={category} className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {categoryMetrics.length}
                </div>
                <div className="text-sm text-secondary-600">
                  {category} Metrics
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {interactive && (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <p className="text-sm text-secondary-500">
            Click categories to filter • Hover over metrics for detailed descriptions
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default ProjectImpactMetrics