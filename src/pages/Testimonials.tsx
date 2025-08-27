import React from 'react'
import { motion } from 'framer-motion'
import { TestimonialSystem } from '../components/services'

const Testimonials: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16">
      <div className="container-width section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-secondary-900 mb-6">
            Client <span className="text-gradient">Success Stories</span>
          </h1>
          <p className="text-xl lg:text-2xl text-secondary-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Discover how our strategic consulting, advisory services, and thought leadership 
            have delivered transformational results for Fortune 500 companies and high-growth startups.
          </p>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-8">
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">$50M+</div>
              <div className="text-secondary-600 font-medium">In Client Value Created</div>
            </motion.div>
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-secondary-600 font-medium">Client Satisfaction Rate</div>
            </motion.div>
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">450%</div>
              <div className="text-secondary-600 font-medium">Average ROI Delivered</div>
            </motion.div>
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">150+</div>
              <div className="text-secondary-600 font-medium">Successful Projects</div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <TestimonialSystem />
        </motion.div>

        {/* Social Proof Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Every testimonial started with a conversation. Let's discuss how we can create 
              similar results for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-50 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Schedule Strategy Session
              </button>
              <button className="bg-primary-800/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/20 hover:bg-primary-800/50 transform hover:scale-105 transition-all duration-200">
                View Case Studies
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Testimonials