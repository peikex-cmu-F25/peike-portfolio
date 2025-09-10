import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { personalInfo } from '../../data/portfolio'
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react'

// TypeScript interfaces for component props
interface HeroSectionProps {
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0, 1]
    }
  }
}

const titleVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.25, 0, 1]
    }
  }
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = "" }) => {
  return (
    <section className={`relative min-h-screen flex items-center overflow-hidden ${className}`}>
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/20" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
        >
          
          <div className="lg:col-span-7">
            <motion.div variants={itemVariants} className="space-y-8">
              
              {/* Greeting */}
              <motion.div variants={itemVariants} className="flex items-center space-x-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                <span className="text-blue-600 font-medium tracking-wide">Hello, I'm</span>
              </motion.div>
              
              {/* Name */}
              <motion.h1 variants={titleVariants} className="space-y-2">
                <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-none">
                  Peike Xu
                </div>
                <div className="text-2xl md:text-3xl text-slate-600 font-light">
                  AI Engineer & Full-Stack Developer
                </div>
              </motion.h1>
              
              {/* Description */}
              <motion.p variants={itemVariants} className="text-xl text-slate-600 max-w-2xl leading-relaxed">
                I build intelligent systems that solve real-world problems. Currently studying 
                <span className="text-blue-600 font-semibold"> Software Engineering at Carnegie Mellon</span>, 
                crafting AI solutions that make a difference.
              </motion.p>
              
              {/* Call-to-action buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/projects"
                    className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span>View My Work</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-slate-700 font-semibold rounded-2xl shadow-md hover:shadow-lg hover:border-slate-300 transition-all duration-300"
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    <span>Get In Touch</span>
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Social links */}
              <motion.div variants={itemVariants} className="flex items-center space-x-6 pt-8">
                <span className="text-sm text-slate-500 font-medium">Connect with me:</span>
                <div className="flex space-x-4">
                  <a
                    href={personalInfo.github}
                    className="p-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    className="p-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column - Visual elements */}
          <div className="lg:col-span-5">
            <motion.div variants={itemVariants} className="relative">
              
              {/* Modern card-style visual */}
              <div className="relative">
                
                {/* Main feature card */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-800">Skills Overview</h3>
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    </div>
                    
                    {/* Skill bars */}
                    <div className="space-y-4">
                      {[
                        { skill: 'AI/ML', level: 95, color: 'bg-blue-500' },
                        { skill: 'Full-Stack', level: 90, color: 'bg-purple-500' },
                        { skill: 'Data Science', level: 85, color: 'bg-green-500' },
                        { skill: 'Cloud/DevOps', level: 80, color: 'bg-orange-500' }
                      ].map((item, index) => (
                        <motion.div
                          key={item.skill}
                          variants={itemVariants}
                          transition={{ delay: index * 0.1 }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-slate-700">{item.skill}</span>
                            <span className="text-slate-500">{item.level}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <motion.div
                              className={`h-2 ${item.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${item.level}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating elements */}
                <motion.div
                  variants={itemVariants}
                  className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-20 blur-xl"
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  variants={itemVariants}
                  className="absolute -bottom-8 -left-6 w-32 h-32 bg-gradient-to-r from-green-300 to-blue-300 rounded-full opacity-10 blur-2xl"
                  animate={{
                    x: [0, 20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </div>
          
        </motion.div>
      </div>
    </section>
  )
}

export default React.memo(HeroSection)