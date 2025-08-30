import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../../data/portfolio'

interface ProjectNode {
  id: string
  title: string
  category: string
  description: string
  technologies: string[]
  position: { x: number; y: number }
  size: 'large' | 'medium' | 'small'
  featured: boolean
  angle: number
}

const CreativeProjectShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  // Transform projects into visual nodes with organic positioning
  const projectNodes: ProjectNode[] = projects.slice(0, 6).map((project, index) => ({
    id: project.id,
    title: project.title,
    category: project.category,
    description: project.description,
    technologies: project.technologies.slice(0, 3),
    featured: project.featured,
    position: {
      // Organic, asymmetric positioning instead of grid
      x: [20, 65, 15, 75, 30, 55][index] || 20,
      y: [15, 25, 55, 40, 85, 70][index] || 15,
    },
    size: project.featured ? 'large' : index % 2 === 0 ? 'medium' : 'small',
    angle: [-3, 2, -1, 4, -2, 1][index] || 0,
  }))

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'w-80 h-48'
      case 'medium':
        return 'w-64 h-40'
      case 'small':
        return 'w-52 h-32'
      default:
        return 'w-64 h-40'
    }
  }

  const getConnectionLines = () => {
    const lines = []
    for (let i = 0; i < projectNodes.length - 1; i++) {
      for (let j = i + 1; j < projectNodes.length; j++) {
        const node1 = projectNodes[i]
        const node2 = projectNodes[j]
        
        // Only connect nearby nodes to create organic web
        const distance = Math.sqrt(
          Math.pow(node1.position.x - node2.position.x, 2) + 
          Math.pow(node1.position.y - node2.position.y, 2)
        )
        
        if (distance < 35) { // Threshold for connections
          lines.push({
            id: `${node1.id}-${node2.id}`,
            x1: node1.position.x,
            y1: node1.position.y,
            x2: node2.position.x,
            y2: node2.position.y,
            opacity: hoveredProject === node1.id || hoveredProject === node2.id ? 0.3 : 0.1
          })
        }
      }
    }
    return lines
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-neutral-50 via-primary-50/20 to-accent-50/30">
      {/* Title */}
      <div className="absolute top-12 left-12 z-20">
        <motion.h2 
          className="font-display text-5xl font-bold text-neutral-900 mb-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Featured Work
        </motion.h2>
        <motion.p 
          className="font-body text-lg text-neutral-600 max-w-md"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          An organic constellation of projects, each solving real problems with creative approaches
        </motion.p>
      </div>

      {/* Connection Lines SVG */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.2"/>
          </linearGradient>
        </defs>
        
        {getConnectionLines().map((line) => (
          <motion.line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="url(#connectionGradient)"
            strokeWidth="0.1"
            opacity={line.opacity}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: Math.random() * 0.5 }}
          />
        ))}
      </svg>

      {/* Project Nodes */}
      <div className="relative w-full h-full">
        {projectNodes.map((node, index) => (
          <motion.div
            key={node.id}
            className={`absolute cursor-pointer group ${getSizeClasses(node.size)}`}
            style={{
              left: `${node.position.x}%`,
              top: `${node.position.y}%`,
              transform: `rotate(${node.angle}deg)`,
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: node.angle - 45 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: node.angle,
            }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.05, 
              rotate: node.angle + 2,
              zIndex: 50
            }}
            onHoverStart={() => setHoveredProject(node.id)}
            onHoverEnd={() => setHoveredProject(null)}
            onClick={() => setSelectedProject(node.id)}
          >
            {/* Project Card */}
            <div className="relative w-full h-full">
              {/* Background Shape */}
              <div className={`absolute inset-0 ${
                node.featured 
                  ? 'bg-creative-gradient shape-morph' 
                  : 'bg-gradient-to-br from-neutral-100 to-neutral-200 hover:from-primary-100 hover:to-accent-100'
              } transition-all duration-500 shadow-lg group-hover:shadow-2xl`} />
              
              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <div>
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 font-mono text-xs font-medium text-primary-600 bg-primary-100 rounded-none mb-3 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    {node.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-heading text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                    {node.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="font-body text-sm text-neutral-600 leading-relaxed line-clamp-3 group-hover:text-neutral-700 transition-colors duration-300">
                    {node.description}
                  </p>
                </div>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {node.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="px-2 py-1 font-mono text-xs text-neutral-500 bg-neutral-200/50 rounded-none transform transition-all duration-300 group-hover:bg-accent-200/50 group-hover:text-accent-700"
                      style={{
                        transform: `rotate(${(techIndex % 2 === 0 ? 1 : -1) * 1}deg)`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              {node.featured && (
                <>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-400 transform rotate-45 animate-pulse-soft" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 border-2 border-secondary-400 rounded-full" />
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-12 right-12 z-30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <Link
          to="/projects"
          className="group flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-500 text-neutral-50 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 hover-lift"
        >
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-400 rounded-full animate-float-delay" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-accent-400 transform rotate-45 animate-float animation-delay-4000" />
        <div className="absolute top-3/4 left-3/4 w-16 h-16 border-4 border-secondary-400 transform rotate-12 animate-bounce-subtle" />
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-neutral-50 max-w-2xl w-full rounded-none p-8 relative overflow-hidden"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
              >
                ×
              </button>
              
              <div className="font-handwritten text-sm text-primary-600 mb-2">
                Project Deep Dive ✨
              </div>
              <h3 className="font-display text-3xl font-bold text-neutral-900 mb-4">
                {projects.find(p => p.id === selectedProject)?.title}
              </h3>
              <p className="font-body text-neutral-600 leading-relaxed mb-6">
                {projects.find(p => p.id === selectedProject)?.longDescription}
              </p>
              
              <Link
                to={`/projects/${selectedProject}`}
                className="btn-primary inline-flex"
              >
                Explore This Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default CreativeProjectShowcase