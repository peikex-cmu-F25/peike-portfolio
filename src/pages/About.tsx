/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
import { personalInfo, education, workExperience, skillsData } from '../data/portfolio'

const About: React.FC = () => {
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen section-padding py-20">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            About <span className="text-gradient">Me</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            {personalInfo.tagline}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">
              My Journey
            </h2>
            <div className="space-y-4 text-lg text-secondary-700">
              <p>
                {personalInfo.bio}
              </p>
              <p>
                Located in {personalInfo.location}, I'm always excited to work on challenging projects 
                that push the boundaries of what's possible with AI and modern web technologies.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <a 
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-secondary-900 text-white rounded-lg hover:bg-secondary-800 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a 
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a 
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-primary-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary-600">PX</span>
                </div>
                <p className="text-secondary-600">Professional Photo Coming Soon</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Skills */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-secondary-900 mb-8 text-center"
          >
            Technical <span className="text-gradient">Skills</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsData.map((skillCategory, index) => (
              <motion.div 
                key={skillCategory.category}
                variants={itemVariants}
                className="card group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200">
                    {skillCategory.category}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    skillCategory.proficiency === 'Expert' ? 'bg-green-100 text-green-800' :
                    skillCategory.proficiency === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                    skillCategory.proficiency === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {skillCategory.proficiency}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education & Experience */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-secondary-900 mb-8 text-center"
          >
            Education & <span className="text-gradient">Experience</span>
          </motion.h2>
          
          <div className="space-y-12">
            {/* Education */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-secondary-900 mb-6">Education</h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={edu.id} className="card">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-semibold text-secondary-900">{edu.degree}</h4>
                        <p className="text-primary-600 font-medium">{edu.institution}</p>
                        <p className="text-secondary-500 text-sm">{edu.location}</p>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                          {edu.duration}
                        </span>
                        {edu.gpa && (
                          <p className="text-sm text-secondary-600 mt-1">GPA: {edu.gpa}</p>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {edu.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start">
                          <span className="text-primary-600 mr-2 mt-1">•</span>
                          <span className="text-secondary-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Work Experience */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-secondary-900 mb-6">Work Experience</h3>
              <div className="space-y-6">
                {workExperience.map((work, index) => (
                  <div key={work.id} className="card">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-secondary-900">{work.role}</h4>
                        <p className="text-primary-600 font-medium">{work.company}</p>
                        <p className="text-secondary-500 text-sm">{work.location}</p>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm font-medium">
                          {work.duration}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-secondary-600 mb-4">{work.description}</p>
                    
                    <div className="mb-4">
                      <h5 className="font-medium text-secondary-900 mb-2">Key Achievements:</h5>
                      <ul className="space-y-2">
                        {work.achievements.map((achievement, aIndex) => (
                          <li key={aIndex} className="flex items-start">
                            <span className="text-primary-600 mr-2 mt-1">•</span>
                            <span className="text-secondary-700 text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-secondary-900 mb-2">Technologies:</h5>
                      <div className="flex flex-wrap gap-2">
                        {work.technologies.map((tech, tIndex) => (
                          <span 
                            key={tIndex}
                            className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default About