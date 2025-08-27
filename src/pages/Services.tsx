import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  pricing: {
    type: 'hourly' | 'project' | 'retainer';
    rate?: string;
    range?: string;
    details: string;
  };
  duration: string;
  outcomes: string[];
}

const services: Service[] = [
  {
    id: 'ai-strategy',
    title: 'AI/ML Strategy Consulting',
    description: 'Strategic guidance for organizations looking to implement or scale AI/ML initiatives with proven ROI frameworks.',
    features: [
      'AI readiness assessment and roadmap development',
      'Technology stack evaluation and recommendations',
      'ROI analysis and business case development',
      'Risk assessment and mitigation strategies',
      'Implementation timeline and resource planning'
    ],
    pricing: {
      type: 'project',
      range: '$15K - $50K',
      details: 'Pricing based on organization size and project complexity'
    },
    duration: '4-8 weeks',
    outcomes: [
      'Clear AI implementation roadmap',
      'Technology recommendations with cost-benefit analysis',
      'Risk mitigation strategies',
      'Executive presentation materials'
    ]
  },
  {
    id: 'system-architecture',
    title: 'System Architecture & Design',
    description: 'End-to-end system design for scalable AI/ML applications with enterprise-grade reliability and performance.',
    features: [
      'Scalable system architecture design',
      'Performance optimization and bottleneck analysis',
      'Cloud infrastructure planning (AWS, Azure, GCP)',
      'Data pipeline and workflow orchestration',
      'Security and compliance framework development'
    ],
    pricing: {
      type: 'hourly',
      rate: '$200/hour',
      details: 'Flexible engagement model with minimum 20-hour commitment'
    },
    duration: '2-12 weeks',
    outcomes: [
      'Comprehensive system architecture documentation',
      'Performance benchmarks and optimization recommendations',
      'Implementation guidelines and best practices',
      'Code review and technical mentoring'
    ]
  },
  {
    id: 'technical-diligence',
    title: 'Technical Due Diligence',
    description: 'Comprehensive technical assessment for M&A, funding rounds, and strategic partnerships in AI/ML companies.',
    features: [
      'Technology stack evaluation and risk analysis',
      'Code quality and architecture review',
      'Scalability and performance assessment',
      'IP and competitive advantage analysis',
      'Team capability and knowledge transfer evaluation'
    ],
    pricing: {
      type: 'project',
      range: '$10K - $25K',
      details: 'Fixed-price engagement based on company size and complexity'
    },
    duration: '2-4 weeks',
    outcomes: [
      'Comprehensive technical assessment report',
      'Risk analysis with mitigation recommendations',
      'Valuation support with technical insights',
      'Integration planning and recommendations'
    ]
  },
  {
    id: 'board-advisory',
    title: 'Board Advisory Services',
    description: 'Strategic technology advisory for boards and executive teams navigating AI transformation and digital innovation.',
    features: [
      'Technology strategy and market positioning',
      'Product development oversight and guidance',
      'Technical risk assessment and governance',
      'Talent acquisition and team building strategy',
      'Competitive analysis and market insights'
    ],
    pricing: {
      type: 'retainer',
      rate: '$5K - $15K/month',
      details: 'Monthly retainer with quarterly strategy sessions'
    },
    duration: 'Ongoing',
    outcomes: [
      'Strategic technology roadmap alignment',
      'Risk mitigation and governance framework',
      'Enhanced technical decision-making capability',
      'Market positioning and competitive advantage'
    ]
  },
  {
    id: 'speaking-training',
    title: 'Speaking & Training Programs',
    description: 'Technical presentations, workshops, and training programs for conferences, companies, and educational institutions.',
    features: [
      'Keynote presentations on AI/ML trends and applications',
      'Technical workshops and hands-on training',
      'Executive briefings on AI strategy and implementation',
      'University guest lectures and seminars',
      'Custom content development for specific audiences'
    ],
    pricing: {
      type: 'project',
      range: '$2K - $15K',
      details: 'Pricing varies by event type, duration, and travel requirements'
    },
    duration: '1 day - 1 week',
    outcomes: [
      'Enhanced team technical capabilities',
      'Practical AI/ML implementation knowledge',
      'Strategic insights and best practices',
      'Ongoing support and consultation'
    ]
  }
];

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-white">
      {/* Hero Section */}
      <section className="section-padding py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Services
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Strategic AI/ML consulting, system architecture, and technical leadership services 
              for organizations building the future of intelligent applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/peike-portfolio/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Schedule Consultation
              </a>
              <a
                href="/peike-portfolio/case-studies"
                className="inline-flex items-center px-8 py-4 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Case Studies
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding py-20">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Comprehensive AI/ML Services
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              From strategic consulting to hands-on implementation, I help organizations 
              navigate their AI transformation journey with proven methodologies and measurable results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 group cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-secondary-500 uppercase tracking-wide">
                      {service.pricing.type === 'hourly' ? 'Hourly Rate' : 
                       service.pricing.type === 'project' ? 'Project Range' : 'Monthly Retainer'}
                    </span>
                    <span className="text-sm text-secondary-500">
                      {service.duration}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-primary-600">
                    {service.pricing.rate || service.pricing.range}
                  </div>
                  <div className="text-sm text-secondary-500 mt-1">
                    {service.pricing.details}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-secondary-700 mb-3 uppercase tracking-wide">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-secondary-600">{feature}</span>
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-sm text-primary-600 font-medium">
                        +{service.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                <button className="w-full bg-secondary-100 text-secondary-700 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors group-hover:bg-primary-500 group-hover:text-white">
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="section-padding py-20 bg-gradient-to-r from-secondary-900 to-secondary-800 text-white">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Why Choose Our Services?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
                <p className="text-secondary-300">
                  $2.5M+ in documented cost savings and efficiency improvements across client engagements
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Rapid Implementation</h3>
                <p className="text-secondary-300">
                  Accelerated project delivery with agile methodologies and best practices from top-tier companies
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Industry Expertise</h3>
                <p className="text-secondary-300">
                  Deep knowledge across healthcare, fintech, and e-commerce with cutting-edge AI/ML implementations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding py-16">
        <div className="container-width">
          <div className="bg-primary-50 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Ready to Transform Your AI Strategy?
            </h2>
            <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can accelerate your AI initiatives and drive measurable business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/peike-portfolio/contact"
                className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Schedule Free Consultation
              </a>
              <a
                href="mailto:hello@peikexu.com"
                className="inline-flex items-center px-8 py-4 border border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Direct Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-secondary-900 mb-2">
                    {selectedService.title}
                  </h2>
                  <p className="text-lg text-secondary-600">
                    {selectedService.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-secondary-500 hover:text-secondary-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-4">Features & Deliverables</h3>
                  <ul className="space-y-3">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-secondary-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-4">Expected Outcomes</h3>
                  <ul className="space-y-3">
                    {selectedService.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-secondary-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-secondary-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-secondary-500 uppercase tracking-wide font-semibold">
                      Investment & Timeline
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                      {selectedService.pricing.rate || selectedService.pricing.range}
                    </div>
                    <div className="text-sm text-secondary-600">
                      {selectedService.pricing.details} • {selectedService.duration}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="px-6 py-3 border border-secondary-300 text-secondary-700 rounded-lg font-medium hover:bg-secondary-50 transition-colors"
                    >
                      Close
                    </button>
                    <a
                      href="/peike-portfolio/contact"
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Services;