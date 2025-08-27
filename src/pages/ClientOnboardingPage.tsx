import React from 'react'
import { motion } from 'framer-motion'
import { ClientOnboarding } from '../components/services'

const ClientOnboardingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16">
      <div className="container-width section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
            Client <span className="text-gradient">Onboarding</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Start your transformation journey with a comprehensive discovery process. 
            Help us understand your unique challenges and goals to deliver maximum value.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ClientOnboarding />
        </motion.div>
      </div>
    </div>
  )
}

export default ClientOnboardingPage