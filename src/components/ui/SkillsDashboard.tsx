import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillsData, workExperience, projects } from '../../data/portfolio'
import SkillsRadarChart from './SkillsRadarChart'
import TechnologyTimeline from './TechnologyTimeline'
import ProjectImpactMetrics from './ProjectImpactMetrics'
import InteractiveSkillTag from './InteractiveSkillTag'

interface SkillsDashboardProps {
  view?: 'overview' | 'radar' | 'timeline' | 'metrics' | 'tags'
  interactive?: boolean
}

const SkillsDashboard: React.FC<SkillsDashboardProps> = ({
  view = 'overview',
  interactive = true
}) => {
  const [currentView, setCurrentView] = useState(view)
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string | null>(null)

  // Navigation items
  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: '🏠', description: 'Complete skills visualization' },
    { id: 'radar', label: 'Skills Radar', icon: '🎯', description: 'Proficiency levels across categories' },
    { id: 'timeline', label: 'Experience Timeline', icon: '📅', description: 'Technology progression over time' },
    { id: 'metrics', label: 'Impact Metrics', icon: '📊', description: 'Quantified achievements and results' },
    { id: 'tags', label: 'Interactive Skills', icon: '🏷️', description: 'Detailed skill demonstrations' }
  ]

  // Enhanced skill data with experience mapping
  const getEnhancedSkillData = () => {
    return skillsData.map(category => ({
      ...category,
      skills: category.skills.map(skill => {
        // Find projects and experiences using this skill
        const relatedProjects = projects
          .filter(project => project.technologies.includes(skill))
          .map(project => project.title)
        
        const relatedExperiences = workExperience
          .filter(exp => exp.technologies.includes(skill))
          .map(exp => `${exp.company} (${exp.role})`)

        // Generate demo data based on skill type
        const demos = generateSkillDemos(skill)

        return {
          name: skill,
          proficiency: category.proficiency,
          category: category.category,
          projects: relatedProjects,
          experiences: relatedExperiences,
          demos
        }
      })
    }))
  }

  // Generate contextual demos for skills
  const generateSkillDemos = (skill: string) => {
    const demoMap: {[key: string]: any[]} = {
      'Python': [
        { title: 'Machine Learning Pipeline', description: 'End-to-end ML model with data preprocessing and evaluation' },
        { title: 'Data Analysis Dashboard', description: 'Interactive visualization using Pandas and Plotly' }
      ],
      'React': [
        { title: 'Component Library', description: 'Reusable UI components with TypeScript and Storybook' },
        { title: 'State Management', description: 'Complex state handling with Redux and Context API' }
      ],
      'TensorFlow': [
        { title: 'Computer Vision Model', description: 'Image classification with convolutional neural networks' },
        { title: 'NLP Processing', description: 'Text analysis using transformer architectures' }
      ],
      'AWS': [
        { title: 'Serverless Architecture', description: 'Lambda functions with API Gateway and DynamoDB' },
        { title: 'MLOps Pipeline', description: 'Automated model training and deployment' }
      ]
    }

    return demoMap[skill] || [
      { title: `${skill} Implementation`, description: `Professional implementation using ${skill}` }
    ]
  }

  const enhancedSkillData = getEnhancedSkillData()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  // Render view content
  const renderViewContent = () => {
    switch (currentView) {
      case 'radar':
        return (
          <motion.div
            key="radar"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center"
          >
            <SkillsRadarChart skills={skillsData} size={400} interactive={interactive} />
          </motion.div>
        )

      case 'timeline':
        return (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <TechnologyTimeline experiences={workExperience} interactive={interactive} />
          </motion.div>
        )

      case 'metrics':
        return (
          <motion.div
            key="metrics"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
          >
            <ProjectImpactMetrics 
              experiences={workExperience} 
              projects={projects} 
              interactive={interactive} 
            />
          </motion.div>
        )

      case 'tags':
        return (
          <motion.div
            key="tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {enhancedSkillData.map(category => (
              <div key={category.category}>
                <motion.h3 
                  className="text-lg font-semibold text-secondary-800 mb-4 cursor-pointer hover:text-primary-600 transition-colors duration-200"
                  onClick={() => setSelectedSkillCategory(
                    selectedSkillCategory === category.category ? null : category.category
                  )}
                  whileHover={{ scale: 1.02 }}
                >
                  {category.category} ({category.skills.length})
                  <span className="ml-2 text-sm text-secondary-500">
                    {selectedSkillCategory === category.category ? '▼' : '▶'}
                  </span>
                </motion.h3>
                
                <AnimatePresence>
                  {(selectedSkillCategory === category.category || selectedSkillCategory === null) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-wrap gap-3"
                    >
                      {category.skills.map(skill => (
                        <InteractiveSkillTag
                          key={skill.name}
                          skill={skill.name}
                          proficiency={skill.proficiency}
                          category={skill.category}
                          projects={skill.projects}
                          experience={skill.experiences.join(', ')}
                          demos={skill.demos}
                          interactive={interactive}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )

      case 'overview':
      default:
        return (
          <motion.div
            key="overview"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {/* Skills Summary */}
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-2xl font-bold text-secondary-800 mb-4">
                Technical Skills Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {skillsData.map(category => (
                  <div key={category.category} className="text-center p-4 bg-white rounded-lg shadow-sm border border-secondary-200">
                    <div className="text-2xl font-bold text-primary-600">
                      {category.skills.length}
                    </div>
                    <div className="text-sm text-secondary-600">
                      {category.category.replace(' & ', '\n& ')}
                    </div>
                    <div className="text-xs text-secondary-500 mt-1">
                      {category.proficiency}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Radar Chart */}
            <motion.div variants={itemVariants} className="text-center">
              <h3 className="text-xl font-semibold text-secondary-800 mb-6">
                Proficiency Radar
              </h3>
              <SkillsRadarChart skills={skillsData} size={350} interactive={interactive} />
            </motion.div>

            {/* Quick metrics */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-secondary-800 mb-6 text-center">
                Key Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <div className="text-3xl font-bold text-green-600">95%</div>
                  <div className="text-sm text-green-700 font-medium">Code Coverage</div>
                  <div className="text-xs text-green-600 mt-1">Testing & Quality</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600">3000+</div>
                  <div className="text-sm text-blue-700 font-medium">Users Impacted</div>
                  <div className="text-xs text-blue-600 mt-1">Scale & Reach</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <div className="text-3xl font-bold text-purple-600">60%</div>
                  <div className="text-sm text-purple-700 font-medium">Performance Boost</div>
                  <div className="text-xs text-purple-600 mt-1">Optimization</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Navigation */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {navigationItems.map(item => (
          <motion.button
            key={item.id}
            className={`group px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentView === item.id
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-secondary-600 hover:bg-secondary-50 border border-secondary-200'
            }`}
            onClick={() => setCurrentView(item.id as any)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-2">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <div className="text-xs opacity-75 mt-1 group-hover:opacity-100 transition-opacity duration-200">
              {item.description}
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {renderViewContent()}
      </AnimatePresence>

      {/* Footer info */}
      <motion.div 
        className="mt-12 text-center text-sm text-secondary-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <p>Interactive skills visualization • Built with React, TypeScript, and Framer Motion</p>
      </motion.div>
    </div>
  )
}

export default SkillsDashboard