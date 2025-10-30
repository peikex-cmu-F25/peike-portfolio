import React from 'react';
import { motion } from 'framer-motion';
import { workExperience } from '../data/portfolio';

const Projects: React.FC = () => {
  return (
    <div className="min-h-screen section-padding py-20">
      <div className="container-width">
        
        {/* Work Experience Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">Experience</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-world experience building production systems and leading development initiatives 
              that drive business impact and technical innovation.
            </p>
          </motion.div>

          <div className="space-y-8">
            {workExperience.map((work, index) => (
              <motion.div 
                key={work.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                      {work.role}
                    </h3>
                    <p className="text-xl text-primary-600 font-semibold mb-1">{work.company}</p>
                    <p className="text-gray-500">{work.location}</p>
                  </div>
                  <div className="mt-4 lg:mt-0 lg:text-right">
                    <span className="inline-block px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-semibold">
                      {work.duration}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">{work.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4 text-lg">Key Achievements:</h4>
                  <ul className="space-y-3">
                    {work.achievements.map((achievement, aIndex) => (
                      <li key={aIndex} className="flex items-start">
                        <span className="text-primary-600 mr-3 mt-1.5 text-lg">•</span>
                        <span className="text-gray-700 leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-lg">Technologies & Tools:</h4>
                  <div className="flex flex-wrap gap-3">
                    {work.technologies.map((tech, tIndex) => (
                      <span 
                        key={tIndex}
                        className="px-3 py-2 bg-gradient-to-r from-primary-50 to-blue-50 text-primary-700 rounded-lg text-sm font-medium border border-primary-100 hover:border-primary-200 hover:shadow-sm transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Projects;