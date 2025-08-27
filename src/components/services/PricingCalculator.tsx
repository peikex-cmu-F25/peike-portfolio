import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ProjectRequirements {
  serviceType: string
  projectComplexity: 'simple' | 'medium' | 'complex' | 'enterprise'
  teamSize: number
  duration: number // in weeks
  hasUrgency: boolean
  includesTraining: boolean
  requiresOnsite: boolean
  industryType: 'startup' | 'enterprise' | 'government' | 'nonprofit'
}

interface PricingEstimate {
  basePrice: number
  complexityMultiplier: number
  urgencyMultiplier: number
  trainingCost: number
  onsiteCost: number
  totalEstimate: number
  roi: {
    conservative: number
    expected: number
    optimistic: number
  }
  timeline: string
  paymentTerms: string[]
}

const PricingCalculator: React.FC = () => {
  const [requirements, setRequirements] = useState<ProjectRequirements>({
    serviceType: '',
    projectComplexity: 'medium',
    teamSize: 5,
    duration: 8,
    hasUrgency: false,
    includesTraining: false,
    requiresOnsite: false,
    industryType: 'enterprise'
  })

  const [estimate, setEstimate] = useState<PricingEstimate | null>(null)
  const [showResults, setShowResults] = useState(false)

  const serviceTypes = [
    { id: 'ai-strategy', name: 'AI/ML Strategy Consulting', baseRate: 5000 },
    { id: 'architecture', name: 'System Architecture & Design', baseRate: 6000 },
    { id: 'due-diligence', name: 'Technical Due Diligence', baseRate: 4000 },
    { id: 'advisory', name: 'Board Advisory Services', baseRate: 7500 },
    { id: 'speaking', name: 'Keynote Speaking', baseRate: 15000 },
    { id: 'training', name: 'Training Programs', baseRate: 3000 }
  ]

  const complexityMultipliers = {
    simple: 0.7,
    medium: 1.0,
    complex: 1.5,
    enterprise: 2.2
  }

  const industryMultipliers = {
    startup: 0.8,
    enterprise: 1.0,
    government: 1.3,
    nonprofit: 0.6
  }

  const calculateEstimate = (): PricingEstimate => {
    const selectedService = serviceTypes.find(s => s.id === requirements.serviceType)
    if (!selectedService) {
      return {
        basePrice: 0,
        complexityMultiplier: 1,
        urgencyMultiplier: 1,
        trainingCost: 0,
        onsiteCost: 0,
        totalEstimate: 0,
        roi: { conservative: 0, expected: 0, optimistic: 0 },
        timeline: '0 weeks',
        paymentTerms: []
      }
    }

    const basePrice = selectedService.baseRate * requirements.duration
    const complexityMultiplier = complexityMultipliers[requirements.projectComplexity]
    const industryMultiplier = industryMultipliers[requirements.industryType]
    const urgencyMultiplier = requirements.hasUrgency ? 1.3 : 1.0
    
    const trainingCost = requirements.includesTraining ? requirements.teamSize * 2000 : 0
    const onsiteCost = requirements.requiresOnsite ? Math.ceil(requirements.duration / 4) * 5000 : 0
    
    const adjustedBase = basePrice * complexityMultiplier * industryMultiplier * urgencyMultiplier
    const totalEstimate = adjustedBase + trainingCost + onsiteCost

    // ROI calculations based on service type and project size
    const roiMultiplier = {
      'ai-strategy': 4.5,
      'architecture': 3.2,
      'due-diligence': 2.8,
      'advisory': 5.5,
      'speaking': 1.8,
      'training': 2.5
    }[requirements.serviceType] || 3.0

    const baseROI = totalEstimate * roiMultiplier
    
    return {
      basePrice,
      complexityMultiplier,
      urgencyMultiplier,
      trainingCost,
      onsiteCost,
      totalEstimate,
      roi: {
        conservative: baseROI * 0.7,
        expected: baseROI,
        optimistic: baseROI * 1.4
      },
      timeline: `${requirements.duration} weeks`,
      paymentTerms: [
        '30% upon contract signing',
        '40% at project milestone',
        '30% upon completion'
      ]
    }
  }

  useEffect(() => {
    if (requirements.serviceType) {
      const newEstimate = calculateEstimate()
      setEstimate(newEstimate)
    }
  }, [requirements])

  const handleCalculate = () => {
    if (requirements.serviceType) {
      setShowResults(true)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-secondary-200/50 overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-8">
        <h2 className="text-3xl font-bold text-white mb-4">Project Pricing Calculator</h2>
        <p className="text-primary-100 text-lg">
          Get an instant estimate for your consulting project with transparent, value-based pricing
        </p>
      </div>

      <div className="p-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-semibold text-secondary-900 mb-4">
                Service Type
              </label>
              <div className="grid gap-3">
                {serviceTypes.map((service) => (
                  <label
                    key={service.id}
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      requirements.serviceType === service.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-secondary-200 hover:border-primary-300 hover:bg-primary-25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceType"
                      value={service.id}
                      checked={requirements.serviceType === service.id}
                      onChange={(e) => setRequirements(prev => ({ ...prev, serviceType: e.target.value }))}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-secondary-900">{service.name}</div>
                      <div className="text-sm text-secondary-600">
                        Starting from {formatCurrency(service.baseRate)}/week
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      requirements.serviceType === service.id
                        ? 'border-primary-500'
                        : 'border-secondary-300'
                    }`}>
                      {requirements.serviceType === service.id && (
                        <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-secondary-900 mb-3">
                  Project Complexity
                </label>
                <select
                  value={requirements.projectComplexity}
                  onChange={(e) => setRequirements(prev => ({ 
                    ...prev, 
                    projectComplexity: e.target.value as ProjectRequirements['projectComplexity']
                  }))}
                  className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="simple">Simple (-30%)</option>
                  <option value="medium">Medium (Standard)</option>
                  <option value="complex">Complex (+50%)</option>
                  <option value="enterprise">Enterprise (+120%)</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold text-secondary-900 mb-3">
                  Industry Type
                </label>
                <select
                  value={requirements.industryType}
                  onChange={(e) => setRequirements(prev => ({ 
                    ...prev, 
                    industryType: e.target.value as ProjectRequirements['industryType']
                  }))}
                  className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="startup">Startup (-20%)</option>
                  <option value="enterprise">Enterprise (Standard)</option>
                  <option value="government">Government (+30%)</option>
                  <option value="nonprofit">Non-Profit (-40%)</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-secondary-900 mb-3">
                  Team Size: {requirements.teamSize} people
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={requirements.teamSize}
                  onChange={(e) => setRequirements(prev => ({ ...prev, teamSize: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-secondary-900 mb-3">
                  Duration: {requirements.duration} weeks
                </label>
                <input
                  type="range"
                  min="2"
                  max="52"
                  value={requirements.duration}
                  onChange={(e) => setRequirements(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 rounded-xl border border-secondary-200 hover:bg-secondary-25 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requirements.hasUrgency}
                  onChange={(e) => setRequirements(prev => ({ ...prev, hasUrgency: e.target.checked }))}
                  className="w-5 h-5 text-primary-600 bg-white border-secondary-300 rounded focus:ring-primary-500"
                />
                <div>
                  <div className="font-semibold text-secondary-900">Urgent Timeline (+30%)</div>
                  <div className="text-sm text-secondary-600">Requires expedited delivery</div>
                </div>
              </label>

              <label className="flex items-center gap-4 p-4 rounded-xl border border-secondary-200 hover:bg-secondary-25 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requirements.includesTraining}
                  onChange={(e) => setRequirements(prev => ({ ...prev, includesTraining: e.target.checked }))}
                  className="w-5 h-5 text-primary-600 bg-white border-secondary-300 rounded focus:ring-primary-500"
                />
                <div>
                  <div className="font-semibold text-secondary-900">Team Training (+$2,000/person)</div>
                  <div className="text-sm text-secondary-600">Comprehensive training program</div>
                </div>
              </label>

              <label className="flex items-center gap-4 p-4 rounded-xl border border-secondary-200 hover:bg-secondary-25 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requirements.requiresOnsite}
                  onChange={(e) => setRequirements(prev => ({ ...prev, requiresOnsite: e.target.checked }))}
                  className="w-5 h-5 text-primary-600 bg-white border-secondary-300 rounded focus:ring-primary-500"
                />
                <div>
                  <div className="font-semibold text-secondary-900">On-site Presence (+$5,000/week)</div>
                  <div className="text-sm text-secondary-600">Quarterly on-site visits</div>
                </div>
              </label>
            </div>

            <button
              onClick={handleCalculate}
              disabled={!requirements.serviceType}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                requirements.serviceType
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 shadow-lg hover:shadow-xl'
                  : 'bg-secondary-200 text-secondary-500 cursor-not-allowed'
              }`}
            >
              Calculate Project Estimate
            </button>
          </div>

          {/* Results Panel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            {estimate && showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-2xl p-8 border border-secondary-200/50"
              >
                <h3 className="text-2xl font-bold text-secondary-900 mb-6">Project Estimate</h3>
                
                <div className="space-y-6">
                  {/* Total Investment */}
                  <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50">
                    <div className="text-4xl font-bold text-primary-600 mb-2">
                      {formatCurrency(estimate.totalEstimate)}
                    </div>
                    <div className="text-secondary-600">Total Investment</div>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-secondary-200">
                      <span className="text-secondary-600">Base Price</span>
                      <span className="font-semibold">{formatCurrency(estimate.basePrice)}</span>
                    </div>
                    {estimate.trainingCost > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-secondary-200">
                        <span className="text-secondary-600">Training</span>
                        <span className="font-semibold">{formatCurrency(estimate.trainingCost)}</span>
                      </div>
                    )}
                    {estimate.onsiteCost > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-secondary-200">
                        <span className="text-secondary-600">On-site</span>
                        <span className="font-semibold">{formatCurrency(estimate.onsiteCost)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2 border-b border-secondary-200">
                      <span className="text-secondary-600">Timeline</span>
                      <span className="font-semibold">{estimate.timeline}</span>
                    </div>
                  </div>

                  {/* ROI Projections */}
                  <div className="bg-white/60 rounded-xl p-6">
                    <h4 className="font-bold text-secondary-900 mb-4">Expected ROI</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {Math.round(estimate.roi.conservative / estimate.totalEstimate * 100)}%
                        </div>
                        <div className="text-xs text-secondary-600">Conservative</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {Math.round(estimate.roi.expected / estimate.totalEstimate * 100)}%
                        </div>
                        <div className="text-xs text-secondary-600">Expected</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {Math.round(estimate.roi.optimistic / estimate.totalEstimate * 100)}%
                        </div>
                        <div className="text-xs text-secondary-600">Optimistic</div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Terms */}
                  <div>
                    <h4 className="font-bold text-secondary-900 mb-3">Payment Terms</h4>
                    <div className="space-y-2">
                      {estimate.paymentTerms.map((term, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 text-sm font-bold">{index + 1}</span>
                          </div>
                          <span className="text-secondary-700">{term}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 space-y-3">
                    <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200">
                      Request Detailed Proposal
                    </button>
                    <button className="w-full bg-white text-primary-600 py-3 rounded-xl font-semibold border-2 border-primary-600 hover:bg-primary-50 transform hover:scale-105 transition-all duration-200">
                      Schedule Discovery Call
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {!showResults && (
              <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-2xl p-8 border border-secondary-200/50 text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3">
                  Get Your Custom Estimate
                </h3>
                <p className="text-secondary-600">
                  Complete the form to receive a detailed pricing estimate tailored to your specific requirements.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingCalculator