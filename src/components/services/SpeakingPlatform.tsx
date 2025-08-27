import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SpeakingTopic {
  id: string
  title: string
  description: string
  duration: string[]
  audience: string[]
  keyTakeaways: string[]
  format: ('keynote' | 'workshop' | 'panel' | 'masterclass')[]
  category: 'ai' | 'architecture' | 'leadership' | 'innovation'
  complexity: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  pricing: {
    keynote: string
    workshop: string
    virtual: string
  }
  featured: boolean
}

interface MediaResource {
  id: string
  type: 'video' | 'slides' | 'photo' | 'testimonial' | 'bio'
  title: string
  description: string
  url: string
  thumbnail?: string
}

const SpeakingPlatform: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | SpeakingTopic['category']>('all')
  const [selectedTopic, setSelectedTopic] = useState<SpeakingTopic | null>(null)
  const [showMediaKit, setShowMediaKit] = useState(false)
  const [availabilityForm, setAvailabilityForm] = useState({
    eventName: '',
    organization: '',
    eventDate: '',
    location: '',
    audienceSize: '',
    format: '',
    topic: '',
    budget: '',
    contactName: '',
    contactEmail: '',
    message: ''
  })

  const speakingTopics: SpeakingTopic[] = [
    {
      id: 'future-enterprise-ai',
      title: 'The Future of Enterprise AI: Strategy, Implementation, and ROI',
      description: 'A comprehensive exploration of how enterprises can successfully adopt AI technologies, from strategic planning to measurable business outcomes. Learn proven frameworks for AI implementation that drive 300%+ ROI.',
      duration: ['45 minutes', '60 minutes', '90 minutes'],
      audience: ['C-Suite Executives', 'Technology Leaders', 'Business Strategists', 'Innovation Teams'],
      keyTakeaways: [
        'AI Strategy Framework for Enterprise Success',
        'ROI Measurement and Value Creation Models',
        'Common Implementation Pitfalls and How to Avoid Them',
        'Building AI-Ready Organizations and Culture',
        'Future Trends and Competitive Advantages'
      ],
      format: ['keynote', 'workshop', 'masterclass'],
      category: 'ai',
      complexity: 'intermediate',
      pricing: {
        keynote: '$35,000 - $50,000',
        workshop: '$15,000 - $25,000',
        virtual: '$10,000 - $20,000'
      },
      featured: true
    },
    {
      id: 'cloud-native-architecture',
      title: 'Building Resilient Cloud-Native Architectures at Scale',
      description: 'Master the principles of designing and implementing cloud-native systems that can scale to millions of users while maintaining reliability, security, and cost-effectiveness.',
      duration: ['60 minutes', '3 hours', '2 days'],
      audience: ['Software Architects', 'Engineering Leaders', 'DevOps Teams', 'Technical Directors'],
      keyTakeaways: [
        'Cloud-Native Design Patterns and Best Practices',
        'Microservices Architecture and Service Mesh',
        'Observability and Monitoring Strategies',
        'Security in Distributed Systems',
        'Cost Optimization and Performance Tuning'
      ],
      format: ['keynote', 'workshop', 'masterclass'],
      category: 'architecture',
      complexity: 'advanced',
      pricing: {
        keynote: '$25,000 - $35,000',
        workshop: '$20,000 - $30,000',
        virtual: '$12,000 - $18,000'
      },
      featured: true
    },
    {
      id: 'technical-leadership',
      title: 'Leading Through Technology: The Modern CTO\'s Playbook',
      description: 'Essential strategies for technology leaders navigating digital transformation, team building, and strategic decision-making in today\'s rapidly evolving landscape.',
      duration: ['45 minutes', '90 minutes', '2 hours'],
      audience: ['CTOs', 'VPs of Engineering', 'Technical Directors', 'Engineering Managers'],
      keyTakeaways: [
        'Strategic Technology Decision Making',
        'Building High-Performance Engineering Teams',
        'Managing Technical Debt and Innovation Balance',
        'Communication Strategies for Technical Leaders',
        'Scaling Organizations Through Growth Phases'
      ],
      format: ['keynote', 'panel', 'masterclass'],
      category: 'leadership',
      complexity: 'intermediate',
      pricing: {
        keynote: '$30,000 - $40,000',
        workshop: '$18,000 - $28,000',
        virtual: '$15,000 - $22,000'
      },
      featured: true
    },
    {
      id: 'innovation-culture',
      title: 'Building Innovation Culture in Traditional Organizations',
      description: 'Transform legacy organizations into innovation powerhouses through proven cultural, structural, and technological strategies that drive sustainable growth.',
      duration: ['60 minutes', '2 hours', '1 day'],
      audience: ['Board Members', 'C-Suite', 'Innovation Leaders', 'Change Management'],
      keyTakeaways: [
        'Cultural Transformation Strategies',
        'Innovation Metrics and Measurement',
        'Technology as an Innovation Enabler',
        'Overcoming Organizational Inertia',
        'Creating Sustainable Innovation Pipelines'
      ],
      format: ['keynote', 'workshop', 'panel'],
      category: 'innovation',
      complexity: 'beginner',
      pricing: {
        keynote: '$40,000 - $55,000',
        workshop: '$25,000 - $35,000',
        virtual: '$18,000 - $25,000'
      },
      featured: false
    }
  ]

  const mediaResources: MediaResource[] = [
    {
      id: 'speaker-reel',
      type: 'video',
      title: 'Speaker Reel - Highlights',
      description: '3-minute compilation of speaking highlights from major conferences',
      url: '/media/speaker-reel.mp4',
      thumbnail: '/media/speaker-reel-thumb.jpg'
    },
    {
      id: 'ai-summit-keynote',
      type: 'video',
      title: 'AI Summit 2024 Keynote',
      description: 'Full keynote presentation on Enterprise AI Strategy (45 minutes)',
      url: '/media/ai-summit-keynote.mp4',
      thumbnail: '/media/ai-keynote-thumb.jpg'
    },
    {
      id: 'professional-headshot',
      type: 'photo',
      title: 'Professional Headshot',
      description: 'High-resolution professional photo for marketing materials',
      url: '/media/headshot-professional.jpg'
    },
    {
      id: 'speaker-bio',
      type: 'bio',
      title: 'Speaker Biography',
      description: 'Complete speaker biography with accomplishments and expertise',
      url: '/media/peike-xu-speaker-bio.pdf'
    },
    {
      id: 'topic-slides-ai',
      type: 'slides',
      title: 'AI Strategy Sample Slides',
      description: 'Sample presentation slides for AI Strategy topic',
      url: '/media/ai-strategy-sample-slides.pdf'
    }
  ]

  const categories = [
    { id: 'all' as const, name: 'All Topics', icon: '🎯' },
    { id: 'ai' as const, name: 'AI & Machine Learning', icon: '🤖' },
    { id: 'architecture' as const, name: 'System Architecture', icon: '🏗️' },
    { id: 'leadership' as const, name: 'Technical Leadership', icon: '👥' },
    { id: 'innovation' as const, name: 'Innovation & Strategy', icon: '💡' }
  ]

  const filteredTopics = speakingTopics.filter(topic => 
    selectedCategory === 'all' || topic.category === selectedCategory
  )

  const handleAvailabilitySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Speaking inquiry submitted:', availabilityForm)
    alert('Thank you for your inquiry! We\'ll respond within 24 hours.')
    setAvailabilityForm({
      eventName: '',
      organization: '',
      eventDate: '',
      location: '',
      audienceSize: '',
      format: '',
      topic: '',
      budget: '',
      contactName: '',
      contactEmail: '',
      message: ''
    })
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Keynote Speaking & <span className="text-gradient">Workshops</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-secondary-600 max-w-3xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Inspire your audience with cutting-edge insights on AI strategy, system architecture, 
            and technology leadership from someone who's built systems serving millions of users.
          </motion.p>
        </div>

        <motion.div 
          className="grid md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-primary-200">
            <div className="text-3xl font-bold text-primary-600 mb-2">150+</div>
            <div className="text-secondary-600">Speaking Engagements</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-primary-200">
            <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
            <div className="text-secondary-600">Professionals Reached</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-primary-200">
            <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
            <div className="text-secondary-600">Satisfaction Rate</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-primary-200">
            <div className="text-3xl font-bold text-primary-600 mb-2">4.9/5</div>
            <div className="text-secondary-600">Average Rating</div>
          </div>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="mb-12">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 font-medium flex items-center gap-3 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'bg-white text-secondary-600 hover:bg-primary-50 hover:text-primary-600 border border-secondary-200'
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="mb-16">
        <motion.div 
          className="grid gap-8"
          layout
        >
          <AnimatePresence>
            {filteredTopics.map((topic) => (
              <motion.div
                key={topic.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-secondary-200/50 hover:shadow-2xl transition-all duration-500"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-secondary-900 mb-3">
                          {topic.title}
                        </h3>
                        <p className="text-lg text-secondary-600 leading-relaxed mb-4">
                          {topic.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {topic.format.map((format) => (
                            <span
                              key={format}
                              className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium capitalize"
                            >
                              {format}
                            </span>
                          ))}
                          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                            topic.complexity === 'beginner' ? 'bg-green-50 text-green-700' :
                            topic.complexity === 'intermediate' ? 'bg-yellow-50 text-yellow-700' :
                            topic.complexity === 'advanced' ? 'bg-orange-50 text-orange-700' :
                            'bg-red-50 text-red-700'
                          }`}>
                            {topic.complexity}
                          </span>
                        </div>
                      </div>
                      {topic.featured && (
                        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                          Featured
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold text-secondary-900 mb-3">Key Takeaways</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {topic.keyTakeaways.map((takeaway, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-secondary-700 text-sm">{takeaway}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-secondary-900 mb-2">Target Audience</h5>
                        <div className="flex flex-wrap gap-2">
                          {topic.audience.map((aud) => (
                            <span key={aud} className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs">
                              {aud}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-secondary-900 mb-2">Duration Options</h5>
                        <div className="flex flex-wrap gap-2">
                          {topic.duration.map((dur) => (
                            <span key={dur} className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs">
                              {dur}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-xl p-6">
                    <h4 className="font-bold text-secondary-900 mb-4">Investment</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-secondary-600">Keynote</span>
                        <span className="font-bold text-secondary-900">{topic.pricing.keynote}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-secondary-600">Workshop</span>
                        <span className="font-bold text-secondary-900">{topic.pricing.workshop}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-secondary-600">Virtual</span>
                        <span className="font-bold text-secondary-900">{topic.pricing.virtual}</span>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <button
                        onClick={() => setSelectedTopic(topic)}
                        className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all"
                      >
                        Check Availability
                      </button>
                      <button
                        onClick={() => setShowMediaKit(true)}
                        className="w-full bg-white text-primary-600 py-3 rounded-xl font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-all"
                      >
                        Download Media Kit
                      </button>
                    </div>

                    <div className="mt-4 text-center">
                      <div className="text-xs text-secondary-500 mb-2">Includes:</div>
                      <div className="text-xs text-secondary-600">
                        • Travel & accommodation<br/>
                        • A/V technical requirements<br/>
                        • Presentation materials<br/>
                        • Q&A session
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Availability Form Modal */}
      <AnimatePresence>
        {selectedTopic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTopic(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-secondary-900">Check Availability</h3>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center hover:bg-secondary-200 transition-colors"
                >
                  <svg className="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="bg-primary-50 rounded-xl p-4 mb-6">
                <div className="font-semibold text-primary-800 mb-2">{selectedTopic.title}</div>
                <div className="text-sm text-primary-600">
                  Selected Topic • {selectedTopic.duration.join(', ')} duration options
                </div>
              </div>

              <form onSubmit={handleAvailabilitySubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-secondary-900 mb-2">
                      Event Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={availabilityForm.eventName}
                      onChange={(e) => setAvailabilityForm(prev => ({ ...prev, eventName: e.target.value }))}
                      className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Tech Innovation Summit 2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-secondary-900 mb-2">
                      Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={availabilityForm.organization}
                      onChange={(e) => setAvailabilityForm(prev => ({ ...prev, organization: e.target.value }))}
                      className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your Organization Name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-secondary-900 mb-2">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={availabilityForm.eventDate}
                      onChange={(e) => setAvailabilityForm(prev => ({ ...prev, eventDate: e.target.value }))}
                      className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-secondary-900 mb-2">
                      Location/Format *
                    </label>
                    <select
                      required
                      value={availabilityForm.location}
                      onChange={(e) => setAvailabilityForm(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select format</option>
                      <option value="in-person">In-Person Event</option>
                      <option value="virtual">Virtual Event</option>
                      <option value="hybrid">Hybrid Event</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-secondary-900 mb-2">
                      Expected Audience Size
                    </label>
                    <select
                      value={availabilityForm.audienceSize}
                      onChange={(e) => setAvailabilityForm(prev => ({ ...prev, audienceSize: e.target.value }))}
                      className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select audience size</option>
                      <option value="under-100">Under 100</option>
                      <option value="100-500">100 - 500</option>
                      <option value="500-1000">500 - 1,000</option>
                      <option value="1000-5000">1,000 - 5,000</option>
                      <option value="over-5000">Over 5,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-secondary-900 mb-2">
                      Budget Range
                    </label>
                    <select
                      value={availabilityForm.budget}
                      onChange={(e) => setAvailabilityForm(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-15k">Under $15,000</option>
                      <option value="15k-25k">$15,000 - $25,000</option>
                      <option value="25k-40k">$25,000 - $40,000</option>
                      <option value="40k-plus">$40,000+</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-secondary-900 mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={availabilityForm.contactName}
                      onChange={(e) => setAvailabilityForm(prev => ({ ...prev, contactName: e.target.value }))}
                      className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-secondary-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={availabilityForm.contactEmail}
                      onChange={(e) => setAvailabilityForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                      className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary-900 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    value={availabilityForm.message}
                    onChange={(e) => setAvailabilityForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent h-24 resize-none"
                    placeholder="Tell us more about your event, audience, and any specific requirements..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all"
                  >
                    Submit Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTopic(null)}
                    className="px-8 py-4 bg-white text-secondary-600 rounded-xl font-semibold border-2 border-secondary-200 hover:bg-secondary-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media Kit Modal */}
      <AnimatePresence>
        {showMediaKit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMediaKit(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-secondary-900">Speaker Media Kit</h3>
                <button
                  onClick={() => setShowMediaKit(false)}
                  className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center hover:bg-secondary-200 transition-colors"
                >
                  <svg className="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {mediaResources.map((resource) => (
                  <div key={resource.id} className="bg-secondary-50 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-semibold text-secondary-900 mb-2">{resource.title}</div>
                        <div className="text-sm text-secondary-600 mb-3">{resource.description}</div>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          resource.type === 'video' ? 'bg-red-100 text-red-700' :
                          resource.type === 'photo' ? 'bg-blue-100 text-blue-700' :
                          resource.type === 'slides' ? 'bg-green-100 text-green-700' :
                          resource.type === 'bio' ? 'bg-purple-100 text-purple-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {resource.type.toUpperCase()}
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        resource.type === 'video' ? 'bg-red-100' :
                        resource.type === 'photo' ? 'bg-blue-100' :
                        resource.type === 'slides' ? 'bg-green-100' :
                        resource.type === 'bio' ? 'bg-purple-100' :
                        'bg-orange-100'
                      }`}>
                        {resource.type === 'video' && (
                          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        )}
                        {resource.type === 'photo' && (
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                        {resource.type === 'slides' && (
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        )}
                        {resource.type === 'bio' && (
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <button className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                      Download
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    // Download all resources
                    alert('Full media kit download initiated!')
                  }}
                  className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all"
                >
                  Download Complete Media Kit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SpeakingPlatform