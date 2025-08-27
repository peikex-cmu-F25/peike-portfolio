import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PricingCalculator } from '../components/services'

interface Service {
  id: string
  title: string
  description: string
  outcomes: string[]
  pricing: {
    type: 'hourly' | 'project' | 'retainer'
    rate?: string
    range?: string
    min?: string
  }
  duration: string
  deliverables: string[]
  icon: React.ReactNode
}

const Services: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'consulting' | 'advisory' | 'speaking'>('all')

  const services: Service[] = [
    {
      id: 'ai-ml-strategy',
      title: 'AI/ML Strategy Consulting',
      description: 'Enterprise-level strategic planning for AI implementation, from roadmap development to technology selection and ROI optimization.',
      outcomes: [
        'Comprehensive AI strategy with 12-24 month roadmap',
        'Technology stack recommendations with cost analysis',
        'Risk assessment and mitigation strategies',
        'Expected ROI of 300-500% within 18 months'
      ],
      pricing: {
        type: 'project',
        range: '$25,000 - $75,000',
        min: '$25,000'
      },
      duration: '4-8 weeks',
      deliverables: [
        'AI Strategy Document (40+ pages)',
        'Implementation Roadmap with Milestones',
        'Technology Vendor Evaluation Matrix',
        'Executive Presentation & Workshop'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 'system-architecture',
      title: 'System Architecture & Design',
      description: 'End-to-end system architecture design for scalable, high-performance applications with cloud-native and microservices expertise.',
      outcomes: [
        'Scalable architecture supporting 10x growth',
        'Reduced infrastructure costs by 30-50%',
        'Improved system reliability (99.9% uptime)',
        'Enhanced security and compliance posture'
      ],
      pricing: {
        type: 'project',
        range: '$35,000 - $100,000',
        min: '$35,000'
      },
      duration: '6-12 weeks',
      deliverables: [
        'System Architecture Blueprints',
        'Technical Specifications Document',
        'Security & Compliance Framework',
        'DevOps & Deployment Strategy'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: 'technical-due-diligence',
      title: 'Technical Due Diligence',
      description: 'Comprehensive technical assessment for M&A, investment decisions, and technology risk evaluation with detailed analysis.',
      outcomes: [
        'Complete technical risk assessment',
        'Code quality and security audit results',
        'Technology debt quantification',
        'Investment decision recommendations'
      ],
      pricing: {
        type: 'project',
        range: '$15,000 - $50,000',
        min: '$15,000'
      },
      duration: '2-6 weeks',
      deliverables: [
        'Technical Due Diligence Report',
        'Code Quality Assessment',
        'Security Vulnerability Analysis',
        'Technology Valuation Summary'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'board-advisory',
      title: 'Board Advisory Services',
      description: 'Strategic technology guidance for boards and executive teams, including digital transformation and innovation strategy.',
      outcomes: [
        'Technology strategy aligned with business goals',
        'Digital transformation roadmap',
        'Innovation pipeline development',
        'Technical risk governance framework'
      ],
      pricing: {
        type: 'retainer',
        rate: '$15,000 - $25,000/month',
        min: '$15,000'
      },
      duration: '6-12 months',
      deliverables: [
        'Monthly Board Reports',
        'Quarterly Strategy Reviews',
        'Technology Investment Recommendations',
        'Executive Team Workshops'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'keynote-speaking',
      title: 'Keynote Speaking',
      description: 'Industry-leading presentations on AI, cloud architecture, and digital transformation for conferences and corporate events.',
      outcomes: [
        'Engaging presentations for 100-5000+ audiences',
        'Industry thought leadership positioning',
        'Interactive workshops and Q&A sessions',
        'Custom content tailored to your audience'
      ],
      pricing: {
        type: 'project',
        range: '$15,000 - $50,000',
        min: '$15,000'
      },
      duration: '1-3 days',
      deliverables: [
        'Custom Presentation Development',
        'Speaking Engagement Performance',
        'Interactive Workshop Sessions',
        'Follow-up Resources & Materials'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      id: 'training-programs',
      title: 'Training Programs',
      description: 'Comprehensive technical training programs for teams on AI/ML, cloud architecture, and modern development practices.',
      outcomes: [
        'Team skill advancement in key technologies',
        'Reduced time-to-market for new features',
        'Improved code quality and best practices',
        'Enhanced team productivity and collaboration'
      ],
      pricing: {
        type: 'project',
        range: '$10,000 - $30,000',
        min: '$10,000'
      },
      duration: '1-4 weeks',
      deliverables: [
        'Custom Curriculum Development',
        'Interactive Training Sessions',
        'Hands-on Labs & Exercises',
        'Certification & Assessment Framework'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ]

  const categories = [
    { id: 'all' as const, name: 'All Services' },
    { id: 'consulting' as const, name: 'Consulting' },
    { id: 'advisory' as const, name: 'Advisory' },
    { id: 'speaking' as const, name: 'Speaking & Training' }
  ]

  const filteredServices = services.filter(service => {
    if (selectedCategory === 'all') return true
    if (selectedCategory === 'consulting') return ['ai-ml-strategy', 'system-architecture', 'technical-due-diligence'].includes(service.id)
    if (selectedCategory === 'advisory') return service.id === 'board-advisory'
    if (selectedCategory === 'speaking') return ['keynote-speaking', 'training-programs'].includes(service.id)
    return true
  })

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10" />
        <motion.div 
          className="relative container-width section-padding"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold text-secondary-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Enterprise <span className="text-gradient">Consulting</span> Services
            </motion.h1>
            <motion.p 
              className="text-xl lg:text-2xl text-secondary-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Strategic technology leadership for Fortune 500 companies and high-growth startups. 
              Delivering measurable results through AI strategy, system architecture, and executive advisory.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-primary-200">
                <span className="text-primary-600 font-semibold">$25M+</span>
                <span className="text-secondary-600 ml-2">In Client Value Created</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-primary-200">
                <span className="text-primary-600 font-semibold">50+</span>
                <span className="text-secondary-600 ml-2">Enterprise Projects</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-primary-200">
                <span className="text-primary-600 font-semibold">99.9%</span>
                <span className="text-secondary-600 ml-2">Client Success Rate</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Service Categories Filter */}
      <section className="py-8 border-b border-secondary-200">
        <div className="container-width section-padding">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'bg-white text-secondary-600 hover:bg-primary-50 hover:text-primary-600 border border-secondary-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <motion.div 
          className="container-width section-padding"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid gap-8 lg:gap-12">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-secondary-200/50 overflow-hidden shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="p-8 lg:p-12">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Service Overview */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl lg:text-3xl font-bold text-secondary-900 mb-3">
                            {service.title}
                          </h3>
                          <p className="text-lg text-secondary-600 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      {/* Business Outcomes */}
                      <div className="mb-8">
                        <h4 className="text-xl font-bold text-secondary-900 mb-4">Business Outcomes</h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {service.outcomes.map((outcome, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-secondary-700 font-medium">{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Deliverables */}
                      <div>
                        <h4 className="text-xl font-bold text-secondary-900 mb-4">Key Deliverables</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.deliverables.map((deliverable, idx) => (
                            <span 
                              key={idx}
                              className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium border border-primary-200"
                            >
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Details */}
                    <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-xl p-6 border border-secondary-200/50">
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-secondary-900 mb-2">
                          {service.pricing.range || service.pricing.rate}
                        </div>
                        <div className="text-secondary-600 text-sm uppercase tracking-wider font-medium">
                          {service.pricing.type === 'hourly' && 'Per Hour'}
                          {service.pricing.type === 'project' && 'Per Project'}
                          {service.pricing.type === 'retainer' && 'Monthly Retainer'}
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center py-2 border-b border-secondary-200">
                          <span className="text-secondary-600">Duration</span>
                          <span className="text-secondary-900 font-semibold">{service.duration}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-secondary-200">
                          <span className="text-secondary-600">Minimum</span>
                          <span className="text-secondary-900 font-semibold">{service.pricing.min}</span>
                        </div>
                      </div>

                      <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                        Get Started
                      </button>
                      
                      <div className="text-center mt-4">
                        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                          Schedule Discovery Call
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ROI Guarantee Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container-width section-padding">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">ROI Guarantee Framework</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Every consulting engagement includes measurable success metrics and ROI targets. 
              If we don't deliver the promised value, we'll work additional hours at no cost until we do.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">300%+</div>
                <div className="text-primary-100">Average ROI</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">18</div>
                <div className="text-primary-100">Months to Full ROI</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-primary-100">Success Guarantee</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Calculator Section */}
      <section className="py-16 bg-gradient-to-br from-secondary-50 via-white to-primary-50">
        <div className="container-width section-padding">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-6">
              Project Pricing Calculator
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Get instant, transparent pricing estimates based on your specific requirements. 
              No hidden fees, no surprises - just clear, value-based pricing.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <PricingCalculator />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container-width section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
              Schedule a complimentary strategy session to discuss your challenges and explore how our services can drive measurable results for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                Schedule Strategy Session
              </button>
              <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-primary-600 hover:bg-primary-50 transform hover:scale-105 transition-all duration-200">
                Download Service Brochure
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services