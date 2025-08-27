import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { personalInfo, skillsData, caseStudies, technicalLeadership } from '../data/portfolio'
import { HeroSection } from '../components/sections'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <HeroSection />

      {/* Skills Preview */}
      <section className="section-padding py-20">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Technical <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              Specialized in AI/ML technologies and full-stack development with a focus on 
              creating scalable, intelligent applications that deliver measurable impact
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillsData.slice(0, 4).map((skillCategory, index) => {
              const icons = {
                'Programming Languages': (
                  <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/>
                  </svg>
                ),
                'Machine Learning & AI': (
                  <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                    <circle cx="12" cy="12" r="3"/>
                    <circle cx="6" cy="6" r="1.5"/>
                    <circle cx="18" cy="6" r="1.5"/>
                    <circle cx="6" cy="18" r="1.5"/>
                    <circle cx="18" cy="18" r="1.5"/>
                  </svg>
                ),
                'Frameworks & Tools': (
                  <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
                  </svg>
                ),
                'Cloud & Databases': (
                  <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  </svg>
                )
              };
              
              return (
                <motion.div
                  key={skillCategory.category}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="card text-center group"
                >
                  <div className="w-16 h-16 bg-primary-100 group-hover:bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                    {icons[skillCategory.category as keyof typeof icons]}
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {skillCategory.category}
                  </h3>
                  <div className="flex justify-center mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      skillCategory.proficiency === 'Expert' ? 'bg-green-100 text-green-800' :
                      skillCategory.proficiency === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {skillCategory.proficiency}
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1">
                    {skillCategory.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {skillCategory.skills.length > 3 && (
                      <span className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs">
                        +{skillCategory.skills.length - 3}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <motion.a 
              href="/about" 
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Skills & Experience
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Enterprise Case Studies Preview */}
      <section className="section-padding py-20 bg-white">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Enterprise <span className="text-gradient">Impact</span>
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              Real-world consultative projects demonstrating strategic business transformation, 
              technical leadership, and measurable ROI across diverse industries
            </p>
          </motion.div>

          {/* Impact Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          >
            <div className="text-center">
              <span className="text-3xl font-bold text-blue-600 block">3+</span>
              <span className="text-gray-600 text-sm">Enterprise Transformations</span>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-green-600 block">$2.5M+</span>
              <span className="text-gray-600 text-sm">Annual Savings Generated</span>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-purple-600 block">300%+</span>
              <span className="text-gray-600 text-sm">Average ROI</span>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-orange-600 block">4.0</span>
              <span className="text-gray-600 text-sm">Months Avg Payback</span>
            </div>
          </motion.div>

          {/* Featured Case Studies */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {caseStudies.filter(cs => cs.featured).slice(0, 2).map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {caseStudy.category}
                  </span>
                  <span className="text-xs text-gray-500">{caseStudy.industry}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {caseStudy.title}
                </h3>
                
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {caseStudy.challenge}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <span className="text-lg font-bold text-green-600 block">
                      {caseStudy.roiAnalysis.roiPercentage}
                    </span>
                    <span className="text-xs text-green-700">ROI</span>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <span className="text-lg font-bold text-blue-600 block">
                      {caseStudy.roiAnalysis.paybackPeriod}
                    </span>
                    <span className="text-xs text-blue-700">Payback</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {caseStudy.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                  <span className="text-xs text-gray-500">+{caseStudy.technologies.length - 3} more</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <Link
              to="/case-studies"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              View All Enterprise Case Studies
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Technical Leadership Preview */}
      <section className="section-padding py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Technical <span className="text-gradient">Leadership</span>
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              Thought leadership through speaking engagements, open source contributions, 
              and mentorship that advances the AI/ML community
            </p>
          </motion.div>

          {/* Leadership Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="text-center bg-white rounded-lg p-6 shadow-md">
              <span className="text-2xl font-bold text-purple-600 block">7+</span>
              <span className="text-gray-600 text-sm">Speaking Engagements</span>
            </div>
            <div className="text-center bg-white rounded-lg p-6 shadow-md">
              <span className="text-2xl font-bold text-blue-600 block">2.4K+</span>
              <span className="text-gray-600 text-sm">GitHub Stars</span>
            </div>
            <div className="text-center bg-white rounded-lg p-6 shadow-md">
              <span className="text-2xl font-bold text-green-600 block">25+</span>
              <span className="text-gray-600 text-sm">Students Mentored</span>
            </div>
            <div className="text-center bg-white rounded-lg p-6 shadow-md">
              <span className="text-2xl font-bold text-orange-600 block">500+</span>
              <span className="text-gray-600 text-sm">Practitioners Reached</span>
            </div>
          </motion.div>

          {/* Featured Leadership Activities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {technicalLeadership.filter(item => item.featured).slice(0, 2).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg mr-4 ${
                    item.type === 'speaking' ? 'bg-purple-100 text-purple-600' :
                    item.type === 'publication' ? 'bg-blue-100 text-blue-600' :
                    item.type === 'open_source' ? 'bg-green-100 text-green-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {item.type === 'speaking' && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                      </svg>
                    )}
                    {item.type === 'publication' && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 capitalize block">
                      {item.type.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-sm font-medium text-blue-600 mb-3">
                  {item.organization}
                </p>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.description}
                </p>
                
                <div className="grid grid-cols-1 gap-2">
                  {item.impact.slice(0, 2).map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
                      <span className="text-xs text-gray-600">{metric.metric}</span>
                      <span className="text-xs font-semibold text-gray-900">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <Link
              to="/leadership"
              className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              View Technical Leadership Portfolio
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding py-20 bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
        </div>
        
        <div className="container-width text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Build Something <span className="bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">Amazing</span> Together
            </h2>
            <p className="text-xl text-secondary-300 mb-8 max-w-3xl mx-auto">
              I'm currently seeking new opportunities at innovative companies where I can contribute to 
              cutting-edge AI/ML projects and help shape the future of technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.a 
                href="/contact" 
                className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Start a Conversation
              </motion.a>
              
              <motion.a 
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-secondary-400 hover:border-white text-secondary-300 hover:text-white rounded-lg font-medium transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </motion.a>
            </div>
            
            {/* Contact Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center items-center space-x-6"
            >
              <a 
                href={personalInfo.email.startsWith('mailto:') ? personalInfo.email : `mailto:${personalInfo.email}`}
                className="text-secondary-400 hover:text-white transition-colors duration-200"
              >
                <span className="sr-only">Email</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a 
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors duration-200"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors duration-200"
              >
                <span className="sr-only">GitHub</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home