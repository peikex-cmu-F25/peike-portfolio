import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Testimonial {
  id: string
  clientName: string
  clientTitle: string
  clientCompany: string
  clientImage?: string
  projectType: string
  testimonialText: string
  rating: number
  outcomes: {
    metric: string
    improvement: string
    value: string
  }[]
  projectValue: string
  timeline: string
  tags: string[]
  videoUrl?: string
  caseStudyUrl?: string
  linkedInProfile?: string
  featured: boolean
  category: 'consulting' | 'advisory' | 'speaking' | 'training'
}

const TestimonialSystem: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | Testimonial['category']>('all')
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)

  // Mock testimonial data - in a real app, this would come from an API
  const testimonials: Testimonial[] = [
    {
      id: '1',
      clientName: 'Sarah Chen',
      clientTitle: 'Chief Technology Officer',
      clientCompany: 'FinTech Solutions Inc.',
      projectType: 'AI/ML Strategy Consulting',
      testimonialText: "Peike's strategic guidance transformed our approach to AI implementation. His deep understanding of both the technical complexities and business implications helped us avoid costly mistakes and accelerate our time to market by 8 months. The ROI framework he developed became our gold standard for evaluating all technology investments.",
      rating: 5,
      outcomes: [
        { metric: 'Time to Market', improvement: '8 months faster', value: '$2.4M saved' },
        { metric: 'Development Efficiency', improvement: '300% increase', value: '$1.8M annual savings' },
        { metric: 'Technical Debt Reduction', improvement: '75% reduction', value: '$500K maintenance savings' }
      ],
      projectValue: '$450,000',
      timeline: '6 months',
      tags: ['AI Strategy', 'Machine Learning', 'ROI Optimization', 'FinTech'],
      featured: true,
      category: 'consulting',
      linkedInProfile: 'https://linkedin.com/in/sarah-chen-cto'
    },
    {
      id: '2',
      clientName: 'Michael Rodriguez',
      clientTitle: 'Founder & CEO',
      clientCompany: 'Healthcare Dynamics',
      projectType: 'System Architecture Design',
      testimonialText: "Working with Peike on our healthcare platform architecture was a game-changer. His expertise in scalable systems and deep understanding of healthcare compliance requirements resulted in an architecture that handles 10x our original user load while maintaining HIPAA compliance. The system has been running flawlessly for 18 months.",
      rating: 5,
      outcomes: [
        { metric: 'System Scalability', improvement: '1000% capacity increase', value: '$3.2M revenue enabled' },
        { metric: 'Uptime Improvement', improvement: '99.9% availability', value: '$800K downtime prevention' },
        { metric: 'Compliance Score', improvement: '100% HIPAA compliance', value: 'Risk mitigation' }
      ],
      projectValue: '$850,000',
      timeline: '10 months',
      tags: ['System Architecture', 'Healthcare', 'HIPAA', 'Scalability'],
      featured: true,
      category: 'consulting',
      videoUrl: 'https://example.com/testimonial-video-2'
    },
    {
      id: '3',
      clientName: 'Jennifer Walsh',
      clientTitle: 'Board Chair',
      clientCompany: 'GreenTech Ventures',
      projectType: 'Board Advisory Services',
      testimonialText: "Peike's board advisory services have been invaluable during our Series B fundraising and technology scaling decisions. His ability to translate complex technical concepts into strategic business language helped our board make informed decisions that resulted in a successful $50M raise and strategic partnerships with three Fortune 500 companies.",
      rating: 5,
      outcomes: [
        { metric: 'Fundraising Success', improvement: '$50M Series B', value: '$50M capital raised' },
        { metric: 'Strategic Partnerships', improvement: '3 Fortune 500 deals', value: '$15M potential revenue' },
        { metric: 'Technology Roadmap', improvement: '24-month strategy', value: 'Clear execution path' }
      ],
      projectValue: '$180,000',
      timeline: '12 months',
      tags: ['Board Advisory', 'Fundraising', 'Strategic Planning', 'GreenTech'],
      featured: true,
      category: 'advisory',
      caseStudyUrl: '/case-studies/greentech-advisory'
    },
    {
      id: '4',
      clientName: 'David Park',
      clientTitle: 'VP of Engineering',
      clientCompany: 'DataCorp Analytics',
      projectType: 'Technical Due Diligence',
      testimonialText: "Peike's technical due diligence saved our acquisition. His comprehensive analysis revealed critical security vulnerabilities and architectural issues that would have cost us $5M+ post-acquisition. The detailed report and remediation roadmap enabled us to renegotiate the deal terms and plan our integration strategy effectively.",
      rating: 5,
      outcomes: [
        { metric: 'Risk Mitigation', improvement: '$5M+ issues identified', value: '$5M+ savings' },
        { metric: 'Deal Restructure', improvement: '20% price reduction', value: '$8M negotiation win' },
        { metric: 'Integration Planning', improvement: '6-month roadmap', value: 'Smooth acquisition' }
      ],
      projectValue: '$125,000',
      timeline: '6 weeks',
      tags: ['Due Diligence', 'M&A', 'Security Audit', 'Risk Assessment'],
      featured: false,
      category: 'consulting'
    },
    {
      id: '5',
      clientName: 'Dr. Amanda Foster',
      clientTitle: 'Conference Director',
      clientCompany: 'AI Summit 2024',
      projectType: 'Keynote Speaking',
      testimonialText: "Peike's keynote on 'The Future of Enterprise AI' was the highest-rated session at our conference. His ability to make complex AI concepts accessible while providing actionable insights resonated with our diverse audience of 2,500 executives. Post-event surveys showed 95% found his presentation 'extremely valuable' with many requesting follow-up consultations.",
      rating: 5,
      outcomes: [
        { metric: 'Audience Engagement', improvement: '95% satisfaction rate', value: 'Highest-rated session' },
        { metric: 'Lead Generation', improvement: '150+ consultation requests', value: '$2M+ pipeline created' },
        { metric: 'Thought Leadership', improvement: '50K+ social mentions', value: 'Industry recognition' }
      ],
      projectValue: '$45,000',
      timeline: '3 days',
      tags: ['Keynote Speaking', 'AI Strategy', 'Enterprise', 'Thought Leadership'],
      featured: false,
      category: 'speaking',
      videoUrl: 'https://example.com/keynote-video'
    },
    {
      id: '6',
      clientName: 'Robert Kim',
      clientTitle: 'Head of Engineering',
      clientCompany: 'TechStart Solutions',
      projectType: 'Team Training Program',
      testimonialText: "The cloud architecture training program Peike designed for our team was exceptional. Our developers went from cloud novices to confidently deploying production-ready applications in just 4 weeks. The hands-on labs and real-world scenarios made complex concepts easy to understand. Our deployment efficiency improved by 400% within 3 months.",
      rating: 5,
      outcomes: [
        { metric: 'Team Competency', improvement: '100% cloud certification', value: '15-person team upskilled' },
        { metric: 'Deployment Speed', improvement: '400% efficiency gain', value: '$300K annual savings' },
        { metric: 'Code Quality', improvement: '80% reduction in bugs', value: 'Improved reliability' }
      ],
      projectValue: '$75,000',
      timeline: '4 weeks',
      tags: ['Training', 'Cloud Architecture', 'Team Development', 'DevOps'],
      featured: false,
      category: 'training'
    }
  ]

  const categories = [
    { id: 'all' as const, name: 'All Testimonials', count: testimonials.length },
    { id: 'consulting' as const, name: 'Consulting', count: testimonials.filter(t => t.category === 'consulting').length },
    { id: 'advisory' as const, name: 'Advisory', count: testimonials.filter(t => t.category === 'advisory').length },
    { id: 'speaking' as const, name: 'Speaking', count: testimonials.filter(t => t.category === 'speaking').length },
    { id: 'training' as const, name: 'Training', count: testimonials.filter(t => t.category === 'training').length }
  ]

  const filteredTestimonials = testimonials.filter(testimonial => 
    selectedCategory === 'all' || testimonial.category === selectedCategory
  )

  const featuredTestimonials = testimonials.filter(t => t.featured)

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-secondary-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div>
      {/* Featured Testimonials Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
            Client Success Stories
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Real results from real clients. See how our strategic consulting and advisory services 
            have transformed businesses and delivered measurable value.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {featuredTestimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl shadow-black/5 border border-secondary-200/50 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedTestimonial(testimonial)}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {testimonial.clientName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-secondary-900 text-lg">
                    {testimonial.clientName}
                  </div>
                  <div className="text-secondary-600 text-sm">
                    {testimonial.clientTitle}
                  </div>
                  <div className="text-primary-600 text-sm font-semibold">
                    {testimonial.clientCompany}
                  </div>
                </div>
              </div>

              {renderStars(testimonial.rating)}

              <blockquote className="text-secondary-700 leading-relaxed mt-4 mb-6 line-clamp-4">
                "{testimonial.testimonialText}"
              </blockquote>

              <div className="space-y-3">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-green-600 font-semibold mb-2">Key Results:</div>
                  <div className="space-y-1">
                    {testimonial.outcomes.slice(0, 2).map((outcome, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-green-700">{outcome.metric}:</span>
                        <span className="text-green-800 font-semibold">{outcome.improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-secondary-600">Project Value:</span>
                  <span className="text-secondary-900 font-bold">{testimonial.projectValue}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {testimonial.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Category Filter */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 font-medium flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'bg-white text-secondary-600 hover:bg-primary-50 hover:text-primary-600 border border-secondary-200'
              }`}
            >
              {category.name}
              <span className={`px-2 py-1 rounded-full text-xs ${
                selectedCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-secondary-100 text-secondary-600'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section>
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-secondary-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.clientName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-secondary-900">{testimonial.clientName}</div>
                    <div className="text-sm text-secondary-600">{testimonial.clientTitle}</div>
                    <div className="text-sm text-primary-600 font-medium">{testimonial.clientCompany}</div>
                    {renderStars(testimonial.rating)}
                  </div>
                  {testimonial.videoUrl && (
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="text-sm text-primary-600 font-semibold mb-3">
                  {testimonial.projectType}
                </div>

                <blockquote className="text-secondary-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  "{testimonial.testimonialText}"
                </blockquote>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  {testimonial.outcomes.slice(0, 2).map((outcome, idx) => (
                    <div key={idx} className="bg-secondary-50 rounded-lg p-3">
                      <div className="text-xs text-secondary-600 mb-1">{outcome.metric}</div>
                      <div className="text-sm font-semibold text-secondary-900">{outcome.improvement}</div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {testimonial.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Read More →
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Testimonial Detail Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {selectedTestimonial.clientName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-secondary-900 text-xl">
                      {selectedTestimonial.clientName}
                    </div>
                    <div className="text-secondary-600">
                      {selectedTestimonial.clientTitle}
                    </div>
                    <div className="text-primary-600 font-semibold">
                      {selectedTestimonial.clientCompany}
                    </div>
                    {renderStars(selectedTestimonial.rating)}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center hover:bg-secondary-200 transition-colors"
                >
                  <svg className="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="bg-primary-50 rounded-xl p-6 mb-6">
                <div className="text-sm text-primary-600 font-semibold mb-2">
                  {selectedTestimonial.projectType}
                </div>
                <blockquote className="text-secondary-700 leading-relaxed text-lg">
                  "{selectedTestimonial.testimonialText}"
                </blockquote>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h4 className="font-bold text-secondary-900 mb-4">Measurable Outcomes</h4>
                  <div className="space-y-4">
                    {selectedTestimonial.outcomes.map((outcome, idx) => (
                      <div key={idx} className="bg-green-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-semibold text-green-800">{outcome.metric}</div>
                          <div className="text-green-600 text-sm font-medium">{outcome.value}</div>
                        </div>
                        <div className="text-green-700 font-semibold">{outcome.improvement}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-secondary-900 mb-4">Project Details</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-secondary-200">
                      <span className="text-secondary-600">Investment</span>
                      <span className="font-semibold text-secondary-900">{selectedTestimonial.projectValue}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-secondary-200">
                      <span className="text-secondary-600">Timeline</span>
                      <span className="font-semibold text-secondary-900">{selectedTestimonial.timeline}</span>
                    </div>
                    <div>
                      <div className="text-secondary-600 mb-3">Project Tags</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedTestimonial.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center pt-6 border-t border-secondary-200">
                {selectedTestimonial.videoUrl && (
                  <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors">
                    Watch Video Testimonial
                  </button>
                )}
                {selectedTestimonial.caseStudyUrl && (
                  <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
                    Read Full Case Study
                  </button>
                )}
                {selectedTestimonial.linkedInProfile && (
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Connect on LinkedIn
                  </button>
                )}
                <button className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all">
                  Start Similar Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TestimonialSystem