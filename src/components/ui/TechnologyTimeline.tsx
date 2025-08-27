import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExperienceData } from '../../data/portfolio'
import SkillTag from './SkillTag'

interface TechnologyTimelineProps {
  experiences: ExperienceData[]
  interactive?: boolean
}

interface TimelineEvent {
  id: string
  company: string
  role: string
  duration: string
  technologies: string[]
  achievements: string[]
  year: number
  index: number
}

const TechnologyTimeline: React.FC<TechnologyTimelineProps> = ({
  experiences,
  interactive = true
}) => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  // Process experiences into timeline events
  const timelineEvents: TimelineEvent[] = experiences.map((exp, index) => {
    // Extract year from duration string (assuming format like "Jun 2024 – Sep 2024")
    const yearMatch = exp.duration.match(/\d{4}/)
    const year = yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear()
    
    return {
      id: exp.id,
      company: exp.company,
      role: exp.role,
      duration: exp.duration,
      technologies: exp.technologies,
      achievements: exp.achievements,
      year,
      index
    }
  }).sort((a, b) => a.year - b.year)

  // Get all unique technologies for color mapping
  const allTechnologies = Array.from(
    new Set(timelineEvents.flatMap(event => event.technologies))
  )

  // Color mapping for technology categories
  const getTechColor = (tech: string): string => {
    const colors = [
      'primary', 'secondary', 'success', 'warning', 'error'
    ]
    const index = allTechnologies.indexOf(tech) % colors.length
    return colors[index]
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const eventVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const techVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-primary-400 to-primary-500"></div>
      
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {timelineEvents.map((event) => (
          <motion.div
            key={event.id}
            variants={eventVariants}
            className="relative pl-16"
          >
            {/* Timeline node */}
            <motion.div
              className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white shadow-lg ${
                selectedEvent === event.id 
                  ? 'bg-primary-600' 
                  : 'bg-primary-500'
              } transition-colors duration-200`}
              whileHover={interactive ? { scale: 1.2 } : undefined}
              onClick={() => interactive && setSelectedEvent(
                selectedEvent === event.id ? null : event.id
              )}
              style={{ top: '1rem' }}
            />

            {/* Event card */}
            <motion.div
              className={`bg-white rounded-xl shadow-md border border-secondary-200 p-6 cursor-pointer transition-all duration-200 ${
                selectedEvent === event.id 
                  ? 'shadow-xl border-primary-300 bg-primary-50' 
                  : 'hover:shadow-lg hover:border-secondary-300'
              }`}
              onClick={() => interactive && setSelectedEvent(
                selectedEvent === event.id ? null : event.id
              )}
              whileHover={interactive ? { y: -2 } : undefined}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-800">
                    {event.role}
                  </h3>
                  <p className="text-primary-600 font-medium">
                    {event.company}
                  </p>
                  <p className="text-sm text-secondary-500 mt-1">
                    {event.duration}
                  </p>
                </div>
                <div className="text-2xl font-bold text-primary-500 opacity-60">
                  {event.year}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-secondary-700 mb-2">
                  Technologies Used:
                </h4>
                <motion.div 
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {event.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech}
                      variants={techVariants}
                      custom={techIndex}
                    >
                      <SkillTag
                        skill={tech}
                        size="sm"
                        color={getTechColor(tech) as any}
                        variant={hoveredTech === tech ? 'filled' : 'default'}
                        interactive={interactive}
                        onClick={() => setHoveredTech(
                          hoveredTech === tech ? null : tech
                        )}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Expanded content */}
              <AnimatePresence>
                {selectedEvent === event.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-secondary-200 pt-4 mt-4"
                  >
                    <h4 className="text-sm font-medium text-secondary-700 mb-3">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {event.achievements.map((achievement, achIndex) => (
                        <motion.li
                          key={achIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: achIndex * 0.1 }}
                          className="text-sm text-secondary-600 flex items-start"
                        >
                          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Technology filter/legend */}
      <motion.div 
        className="mt-8 p-4 bg-secondary-50 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <h4 className="text-sm font-medium text-secondary-700 mb-3">
          Technology Evolution:
        </h4>
        <div className="flex flex-wrap gap-2">
          {allTechnologies.slice(0, 12).map((tech, index) => {
            const appearances = timelineEvents.filter(event => 
              event.technologies.includes(tech)
            ).length
            
            return (
              <motion.div
                key={tech}
                className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div 
                  className={`w-2 h-2 rounded-full bg-${getTechColor(tech)}-500`}
                />
                <span className="text-xs font-medium text-secondary-700">
                  {tech}
                </span>
                <span className="text-xs text-secondary-500">
                  {appearances}x
                </span>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Interactive instructions */}
      {interactive && (
        <motion.div 
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-sm text-secondary-500">
            Click on timeline events to explore achievements • Click technologies to highlight
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default TechnologyTimeline