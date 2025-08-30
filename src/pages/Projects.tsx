/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, ProjectData } from '../data/portfolio';
import EnterpriseRAGDemo from '../components/ai-demos/EnterpriseRAGDemo';
import PatientMatchingDemo from '../components/ai-demos/PatientMatchingDemo';
import ReceiptProcessingDemo from '../components/ai-demos/ReceiptProcessingDemo';
import EcommerceRecommendationDemo from '../components/ai-demos/EcommerceRecommendationDemo';
import { EnhancedProjectCard, MathematicalTooltip } from '../components/ui';
import MathematicalBackground from '../components/ui/MathematicalBackground';

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

  // Determine layout for each project to create visual variety
  const getProjectLayout = (index: number): 'horizontal' | 'vertical' | 'featured' => {
    const project = filteredProjects[index];
    if (project?.featured) return 'featured';
    if (index % 4 === 1) return 'horizontal';
    if (index % 4 === 3) return 'vertical';
    return 'vertical'; // default
  };

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
    <div className="min-h-screen py-20 relative">
      {/* Mathematical background */}
      <MathematicalBackground variant="neural" intensity="ultra-subtle" animated={true} />
      
      <div className="container-width relative z-10">
        {/* Header with geometric styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My <span className="bg-gradient-to-r from-accent-500 to-emerald-500 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of AI/ML innovations, full-stack applications, and scalable solutions 
            that demonstrate my expertise in building impactful technology products.
          </p>
        </motion.div>

        {/* Enhanced Filter Tabs with geometric styling */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-gray-100">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-accent-500 to-emerald-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MathematicalTooltip 
                  symbol="∈" 
                  meaning="Element of" 
                  connection={`Projects in ${category} category`}
                >
                  {category}
                </MathematicalTooltip>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Projects Grid with varied layouts */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <EnhancedProjectCard
                key={project.id}
                project={project}
                layout={getProjectLayout(index)}
                onClick={() => setSelectedProject(project)}
                onDemoClick={(e) => {
                  e.stopPropagation();
                  setActiveDemo(project.id);
                }}
                hasDemo={!!demoComponents[project.id]}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4 opacity-30">🔍</div>
            <p className="text-gray-500 text-lg">
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