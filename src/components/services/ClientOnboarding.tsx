import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OnboardingData {
  // Contact Information
  contactInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    company: string
    title: string
    linkedIn: string
  }
  
  // Project Details
  projectDetails: {
    serviceType: string
    projectTitle: string
    description: string
    objectives: string[]
    timeline: string
    budget: string
    urgency: 'low' | 'medium' | 'high' | 'critical'
  }
  
  // Business Context
  businessContext: {
    industryType: string
    companySize: string
    currentChallenges: string[]
    existingTechnology: string[]
    previousExperience: string
    decisionMakers: string[]
  }
  
  // Success Metrics
  successMetrics: {
    primaryKPIs: string[]
    expectedROI: string
    successDefinition: string
    riskTolerance: 'low' | 'medium' | 'high'
    complianceRequirements: string[]
  }
}

const ClientOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<OnboardingData>({
    contactInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      title: '',
      linkedIn: ''
    },
    projectDetails: {
      serviceType: '',
      projectTitle: '',
      description: '',
      objectives: [],
      timeline: '',
      budget: '',
      urgency: 'medium'
    },
    businessContext: {
      industryType: '',
      companySize: '',
      currentChallenges: [],
      existingTechnology: [],
      previousExperience: '',
      decisionMakers: []
    },
    successMetrics: {
      primaryKPIs: [],
      expectedROI: '',
      successDefinition: '',
      riskTolerance: 'medium',
      complianceRequirements: []
    }
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const steps = [
    { id: 1, title: 'Contact Information', description: 'Tell us about yourself and your organization' },
    { id: 2, title: 'Project Details', description: 'Describe your project requirements and goals' },
    { id: 3, title: 'Business Context', description: 'Help us understand your business environment' },
    { id: 4, title: 'Success Metrics', description: 'Define what success looks like for your project' },
    { id: 5, title: 'Review & Submit', description: 'Review your information and submit your request' }
  ]

  const serviceTypes = [
    'AI/ML Strategy Consulting',
    'System Architecture & Design',
    'Technical Due Diligence',
    'Board Advisory Services',
    'Keynote Speaking',
    'Training Programs'
  ]

  const industryTypes = [
    'Technology/Software',
    'Financial Services',
    'Healthcare',
    'Manufacturing',
    'Retail/E-commerce',
    'Government/Public Sector',
    'Education',
    'Energy/Utilities',
    'Other'
  ]

  const companySizes = [
    'Startup (1-50 employees)',
    'Small Business (51-200 employees)',
    'Mid-market (201-1000 employees)',
    'Enterprise (1000+ employees)',
    'Fortune 500',
    'Government Agency'
  ]

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsCompleted(true)
  }

  const updateFormData = (section: keyof OnboardingData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }))
  }

  const addArrayItem = (section: keyof OnboardingData, field: string, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: [...(prev[section] as any)[field], value.trim()]
        }
      }))
    }
  }

  const removeArrayItem = (section: keyof OnboardingData, field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: (prev[section] as any)[field].filter((_: any, i: number) => i !== index)
      }
    }))
  }

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl border border-secondary-200/50 overflow-hidden max-w-2xl mx-auto"
      >
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-green-100 text-lg">
            Your onboarding request has been submitted successfully.
          </p>
        </div>
        
        <div className="p-8">
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-green-800 mb-3">What happens next?</h3>
              <div className="space-y-3 text-green-700">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-800 text-sm font-bold">1</span>
                  </div>
                  <span>Our team will review your submission within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-800 text-sm font-bold">2</span>
                  </div>
                  <span>We'll schedule a discovery call to discuss your project in detail</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-800 text-sm font-bold">3</span>
                  </div>
                  <span>You'll receive a detailed proposal with timeline and pricing</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-secondary-600 mb-4">
                Expect to hear from us at <span className="font-semibold">{formData.contactInfo.email}</span>
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-secondary-900 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.firstName}
                  onChange={(e) => updateFormData('contactInfo', { firstName: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary-900 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.lastName}
                  onChange={(e) => updateFormData('contactInfo', { lastName: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Smith"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-secondary-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.contactInfo.email}
                  onChange={(e) => updateFormData('contactInfo', { email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary-900 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.contactInfo.phone}
                  onChange={(e) => updateFormData('contactInfo', { phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-secondary-900 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.company}
                  onChange={(e) => updateFormData('contactInfo', { company: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Acme Corporation"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary-900 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.title}
                  onChange={(e) => updateFormData('contactInfo', { title: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="CTO, VP Engineering, etc."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary-900 mb-2">
                LinkedIn Profile (Optional)
              </label>
              <input
                type="url"
                value={formData.contactInfo.linkedIn}
                onChange={(e) => updateFormData('contactInfo', { linkedIn: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/your-profile"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-secondary-900 mb-2">
                Service Type *
              </label>
              <select
                value={formData.projectDetails.serviceType}
                onChange={(e) => updateFormData('projectDetails', { serviceType: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select a service type</option>
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary-900 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.projectDetails.projectTitle}
                onChange={(e) => updateFormData('projectDetails', { projectTitle: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="AI Strategy for Customer Experience Platform"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary-900 mb-2">
                Project Description *
              </label>
              <textarea
                value={formData.projectDetails.description}
                onChange={(e) => updateFormData('projectDetails', { description: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent h-32 resize-none"
                placeholder="Describe your project goals, current challenges, and what you're hoping to achieve..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-secondary-900 mb-2">
                  Timeline *
                </label>
                <select
                  value={formData.projectDetails.timeline}
                  onChange={(e) => updateFormData('projectDetails', { timeline: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (within 2 weeks)</option>
                  <option value="short">Short-term (1-3 months)</option>
                  <option value="medium">Medium-term (3-6 months)</option>
                  <option value="long">Long-term (6+ months)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary-900 mb-2">
                  Budget Range
                </label>
                <select
                  value={formData.projectDetails.budget}
                  onChange={(e) => updateFormData('projectDetails', { budget: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select budget range</option>
                  <option value="under-25k">Under $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-250k">$100,000 - $250,000</option>
                  <option value="250k-plus">$250,000+</option>
                  <option value="flexible">Flexible based on value</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary-900 mb-2">
                Project Urgency
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: 'low', label: 'Low - No rush', color: 'bg-green-100 text-green-800' },
                  { value: 'medium', label: 'Medium - Standard timeline', color: 'bg-yellow-100 text-yellow-800' },
                  { value: 'high', label: 'High - Fast track needed', color: 'bg-orange-100 text-orange-800' },
                  { value: 'critical', label: 'Critical - Urgent priority', color: 'bg-red-100 text-red-800' }
                ].map((urgency) => (
                  <label
                    key={urgency.value}
                    className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-all ${
                      formData.projectDetails.urgency === urgency.value
                        ? urgency.color
                        : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={urgency.value}
                      checked={formData.projectDetails.urgency === urgency.value}
                      onChange={(e) => updateFormData('projectDetails', { urgency: e.target.value })}
                      className="sr-only"
                    />
                    {urgency.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-secondary-900 mb-2">
                  Industry *
                </label>
                <select
                  value={formData.businessContext.industryType}
                  onChange={(e) => updateFormData('businessContext', { industryType: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select industry</option>
                  {industryTypes.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary-900 mb-2">
                  Company Size *
                </label>
                <select
                  value={formData.businessContext.companySize}
                  onChange={(e) => updateFormData('businessContext', { companySize: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select company size</option>
                  {companySizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary-900 mb-2">
                Previous Experience with Similar Projects
              </label>
              <textarea
                value={formData.businessContext.previousExperience}
                onChange={(e) => updateFormData('businessContext', { previousExperience: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent h-24 resize-none"
                placeholder="Describe any previous consulting engagements or similar projects..."
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-secondary-900 mb-2">
                Expected ROI
              </label>
              <select
                value={formData.successMetrics.expectedROI}
                onChange={(e) => updateFormData('successMetrics', { expectedROI: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select expected ROI</option>
                <option value="100-200">100% - 200%</option>
                <option value="200-300">200% - 300%</option>
                <option value="300-500">300% - 500%</option>
                <option value="500-plus">500%+</option>
                <option value="strategic">Strategic value (not quantifiable)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary-900 mb-2">
                Define Success for This Project *
              </label>
              <textarea
                value={formData.successMetrics.successDefinition}
                onChange={(e) => updateFormData('successMetrics', { successDefinition: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent h-32 resize-none"
                placeholder="What specific outcomes would make this project a success? Be as detailed as possible..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary-900 mb-2">
                Risk Tolerance
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: 'low', label: 'Conservative - Proven approaches only' },
                  { value: 'medium', label: 'Balanced - Some innovation acceptable' },
                  { value: 'high', label: 'Aggressive - Cutting-edge solutions welcome' }
                ].map((risk) => (
                  <label
                    key={risk.value}
                    className={`px-4 py-3 rounded-xl cursor-pointer text-sm font-medium transition-all border-2 ${
                      formData.successMetrics.riskTolerance === risk.value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-secondary-200 bg-white text-secondary-600 hover:border-primary-300 hover:bg-primary-25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="riskTolerance"
                      value={risk.value}
                      checked={formData.successMetrics.riskTolerance === risk.value}
                      onChange={(e) => updateFormData('successMetrics', { riskTolerance: e.target.value })}
                      className="sr-only"
                    />
                    <div className="font-semibold mb-1">
                      {risk.value.charAt(0).toUpperCase() + risk.value.slice(1)} Risk
                    </div>
                    <div className="text-xs">{risk.label}</div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">Review Your Information</h3>
              <p className="text-secondary-600">
                Please review the information below before submitting your request.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="bg-secondary-50 rounded-xl p-6">
                <h4 className="font-bold text-secondary-900 mb-4">Contact Information</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-secondary-600">Name:</span> {formData.contactInfo.firstName} {formData.contactInfo.lastName}</div>
                  <div><span className="text-secondary-600">Email:</span> {formData.contactInfo.email}</div>
                  <div><span className="text-secondary-600">Company:</span> {formData.contactInfo.company}</div>
                  <div><span className="text-secondary-600">Title:</span> {formData.contactInfo.title}</div>
                </div>
              </div>

              <div className="bg-primary-50 rounded-xl p-6">
                <h4 className="font-bold text-secondary-900 mb-4">Project Details</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="text-secondary-600">Service:</span> {formData.projectDetails.serviceType}</div>
                  <div><span className="text-secondary-600">Title:</span> {formData.projectDetails.projectTitle}</div>
                  <div><span className="text-secondary-600">Timeline:</span> {formData.projectDetails.timeline}</div>
                  <div><span className="text-secondary-600">Budget:</span> {formData.projectDetails.budget}</div>
                  <div><span className="text-secondary-600">Urgency:</span> {formData.projectDetails.urgency}</div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="font-bold text-secondary-900 mb-4">Business Context</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-secondary-600">Industry:</span> {formData.businessContext.industryType}</div>
                  <div><span className="text-secondary-600">Company Size:</span> {formData.businessContext.companySize}</div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center ${step.id < steps.length ? 'flex-1' : ''}`}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                currentStep === step.id
                  ? 'border-primary-500 bg-primary-500 text-white'
                  : currentStep > step.id
                  ? 'border-green-500 bg-green-500 text-white'
                  : 'border-secondary-300 bg-white text-secondary-400'
              }`}>
                {currentStep > step.id ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-bold">{step.id}</span>
                )}
              </div>
              {step.id < steps.length && (
                <div className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                  currentStep > step.id ? 'bg-green-500' : 'bg-secondary-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            {steps[currentStep - 1]?.title}
          </h2>
          <p className="text-secondary-600">
            {steps[currentStep - 1]?.description}
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-2xl shadow-xl border border-secondary-200/50 overflow-hidden">
        <div className="p-8 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="bg-secondary-50 px-8 lg:px-12 py-6 flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              currentStep === 1
                ? 'bg-secondary-200 text-secondary-400 cursor-not-allowed'
                : 'bg-white text-secondary-600 hover:bg-secondary-100 border border-secondary-200'
            }`}
          >
            Previous
          </button>

          <div className="text-sm text-secondary-500">
            Step {currentStep} of {steps.length}
          </div>

          {currentStep === steps.length ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                isSubmitting
                  ? 'bg-primary-400 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </div>
              ) : (
                'Submit Request'
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClientOnboarding