import React from 'react'
import { motion } from 'framer-motion'
import { SkillsDashboard } from '../ui'

interface SkillsSectionProps {
  view?: 'overview' | 'radar' | 'timeline' | 'metrics' | 'tags'
  className?: string
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  view = 'overview',
  className = ''
}) => {
  return (
    <motion.section
      className={`py-20 bg-gradient-to-br from-secondary-50 to-primary-50 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-secondary-800 mb-4">
            Technical Skills & Expertise
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Interactive visualizations showcasing my technical proficiency, 
            project experience, and quantified achievements across AI/ML, 
            full-stack development, and cloud technologies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <SkillsDashboard view={view} interactive={true} />
        </motion.div>
      </div>
    </motion.section>
  )
}

export default SkillsSection