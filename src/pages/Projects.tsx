/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, ProjectData } from '../data/portfolio';
import EnterpriseRAGDemo from '../components/ai-demos/EnterpriseRAGDemo';
import PatientMatchingDemo from '../components/ai-demos/PatientMatchingDemo';
import ReceiptProcessingDemo from '../components/ai-demos/ReceiptProcessingDemo';
import EcommerceRecommendationDemo from '../components/ai-demos/EcommerceRecommendationDemo';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  // Map project IDs to their demo components - with proper typing
  const demoComponents: { [key: string]: React.ComponentType<any> } = {
    'enterprise-rag': EnterpriseRAGDemo,
    'smart-receipt-platform': ReceiptProcessingDemo,
    // Note: Patient matching demo would be connected to the Welfie project
    // E-commerce demo would be connected to the Eth Tech project
  };

  const categories = ['All', 'AI/ML', 'Full Stack', 'Cloud/DevOps', 'Mobile'];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const ProjectCard: React.FC<{ project: ProjectData }> = ({ project }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => setSelectedProject(project)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
        <div className="text-6xl opacity-20">
          {project.category === 'AI/ML' ? '🤖' : 
           project.category === 'Full Stack' ? '💻' :
           project.category === 'Cloud/DevOps' ? '☁️' : '📱'}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.category === 'AI/ML' ? 'bg-purple-100 text-purple-800' :
            project.category === 'Full Stack' ? 'bg-blue-100 text-blue-800' :
            project.category === 'Cloud/DevOps' ? 'bg-green-100 text-green-800' :
            'bg-orange-100 text-orange-800'
          }`}>
            {project.category}
          </span>
          {project.featured && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
              Featured
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-secondary-900 mb-2">
          {project.title}
        </h3>
        
        <p className="text-secondary-600 mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          {project.metrics.slice(0, 3).map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold text-primary-600">{metric.value}</div>
              <div className="text-xs text-secondary-500">{metric.label}</div>
            </div>
          ))}
        </div>
        
        {/* Demo Button */}
        {demoComponents[project.id] && (
          <div className="mt-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveDemo(project.id);
              }}
              className="w-full btn-primary text-sm py-2"
            >
              🚀 Try Interactive Demo
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );

  const ProjectModal: React.FC<{ project: ProjectData; onClose: () => void }> = ({ project, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
          >
            <span className="text-xl">&times;</span>
          </button>
          
          <div className="h-64 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <div className="text-8xl opacity-30">
              {project.category === 'AI/ML' ? '🤖' : 
               project.category === 'Full Stack' ? '💻' :
               project.category === 'Cloud/DevOps' ? '☁️' : '📱'}
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.category === 'AI/ML' ? 'bg-purple-100 text-purple-800' :
              project.category === 'Full Stack' ? 'bg-blue-100 text-blue-800' :
              project.category === 'Cloud/DevOps' ? 'bg-green-100 text-green-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {project.category}
            </span>
            <span className="text-secondary-500">{project.year}</span>
          </div>
          
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            {project.title}
          </h2>
          
          <p className="text-lg text-secondary-600 mb-6">
            {project.longDescription}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span className="text-secondary-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                {project.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-secondary-700">{metric.label}</span>
                    <span className="text-xl font-bold text-primary-600">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            {demoComponents[project.id] && (
              <button
                onClick={() => {
                  onClose();
                  setActiveDemo(project.id);
                }}
                className="btn-primary"
              >
                🚀 Try Interactive Demo
              </button>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-20">
      <div className="container-width">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            My <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            A showcase of AI/ML innovations, full-stack applications, and scalable solutions 
            that demonstrate my expertise in building impactful technology products.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-secondary-600 hover:text-secondary-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-secondary-500 text-lg">
              No projects found in this category. Please select a different filter.
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      {/* AI Demo Modal */}
      <AnimatePresence>
        {activeDemo && demoComponents[activeDemo] && (() => {
          const DemoComponent = demoComponents[activeDemo];
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setActiveDemo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg w-full max-w-7xl max-h-[95vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-full overflow-y-auto">
                  <DemoComponent onClose={() => setActiveDemo(null)} />
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};

export default Projects;