import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from '../components/ui';

// Lazy load AI demo components for better performance
const EnterpriseRAGDemo = lazy(() => import('../components/ai-demos/EnterpriseRAGDemo'));
const PatientMatchingDemo = lazy(() => import('../components/ai-demos/PatientMatchingDemo'));
const ReceiptProcessingDemo = lazy(() => import('../components/ai-demos/ReceiptProcessingDemo'));
const EcommerceRecommendationDemo = lazy(() => import('../components/ai-demos/EcommerceRecommendationDemo'));

interface DemoInfo {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  technologies: string[];
  businessValue: string;
  technicalHighlights: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  icon: string;
  component: React.ComponentType<{ onClose: () => void }>;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
}

const AIDemos: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<DemoInfo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const demos: DemoInfo[] = [
    {
      id: 'enterprise-rag',
      title: 'Enterprise RAG System',
      description: 'Intelligent document retrieval with contextual AI responses for enterprise knowledge management',
      longDescription: 'Experience a production-ready Retrieval-Augmented Generation system that transforms how enterprises access their internal knowledge. This demo showcases advanced semantic search, vector indexing, and contextual response generation using transformer models. Built with enterprise security standards and horizontal scalability in mind.',
      category: 'Natural Language Processing',
      technologies: ['AWS OpenSearch', 'Transformers', 'Vector Indexing', 'Semantic Search', 'API Gateway'],
      businessValue: 'Reduces knowledge access time by 60%, improves decision-making speed, and eliminates information silos across enterprise teams.',
      technicalHighlights: [
        'Real-time semantic text chunking and vector indexing',
        'Sub-200ms query response times with 92% accuracy',
        'Enterprise-grade security and scalability',
        'Transparent source attribution and relevance scoring'
      ],
      metrics: [
        { label: 'Query Response Time', value: '<200ms' },
        { label: 'Retrieval Accuracy', value: '92%' },
        { label: 'Documents Processed', value: '100+' },
        { label: 'Cost Reduction', value: '40%' }
      ],
      icon: '🔍',
      component: EnterpriseRAGDemo,
      difficulty: 'Advanced',
      estimatedTime: '5-10 min'
    },
    {
      id: 'patient-matching',
      title: 'Patient Matching with SVD',
      description: 'Collaborative filtering system for healthcare resource optimization using singular value decomposition',
      longDescription: 'Discover how advanced machine learning optimizes healthcare resource allocation through intelligent patient matching. This demo uses SVD-based collaborative filtering to identify similar patients and optimize care delivery, reducing manual resource allocation by 60% while improving patient outcomes.',
      category: 'Machine Learning',
      technologies: ['SVD Algorithm', 'Collaborative Filtering', 'Matrix Decomposition', 'Cosine Similarity', 'Healthcare Analytics'],
      businessValue: 'Improves resource allocation efficiency by 60%, enhances patient care coordination, and reduces operational costs in healthcare settings.',
      technicalHighlights: [
        'SVD matrix decomposition for latent factor discovery',
        '75% recommendation accuracy with real-time processing',
        'Interactive visualization of similarity calculations',
        'Scalable to thousands of patient records'
      ],
      metrics: [
        { label: 'Recommendation Accuracy', value: '75%' },
        { label: 'Resource Efficiency', value: '+60%' },
        { label: 'Processing Speed', value: 'Real-time' },
        { label: 'Patient Database', value: '3,000+' }
      ],
      icon: '👥',
      component: PatientMatchingDemo,
      difficulty: 'Intermediate',
      estimatedTime: '5-8 min'
    },
    {
      id: 'receipt-processing',
      title: 'AI Receipt & Recipe Platform',
      description: 'Computer vision-powered receipt analysis with intelligent meal planning and nutrition optimization',
      longDescription: 'Experience the future of household management through AI-powered receipt processing. This multi-agent system combines computer vision, OCR, and recipe generation to transform grocery receipts into personalized meal plans, reducing food waste by 30% and saving hours of weekly planning time.',
      category: 'Computer Vision',
      technologies: ['Computer Vision', 'OCR Processing', 'Multi-Agent Systems', 'Recipe Generation', 'Nutritional Analysis'],
      businessValue: 'Saves 5+ hours per week in meal planning, reduces food waste by 30%, and enables data-driven nutrition optimization for families.',
      technicalHighlights: [
        'Real-time OCR with 82% accuracy across receipt formats',
        'Intelligent ingredient categorization and nutritional analysis',
        'Multi-agent workflow orchestration for meal planning',
        'Reverse meal planning with optimized shopping lists'
      ],
      metrics: [
        { label: 'Receipt Accuracy', value: '82%' },
        { label: 'Food Waste Reduction', value: '30%' },
        { label: 'Time Saved', value: '5+ hrs/week' },
        { label: 'Processing Speed', value: 'Real-time' }
      ],
      icon: '📋',
      component: ReceiptProcessingDemo,
      difficulty: 'Advanced',
      estimatedTime: '7-12 min'
    },
    {
      id: 'ecommerce-recommendations',
      title: 'E-commerce Recommendation Engine',
      description: 'Intelligent product recommendations using collaborative filtering and content-based algorithms',
      longDescription: 'Explore how modern e-commerce platforms drive user engagement and conversion through intelligent recommendations. This demo showcases hybrid recommendation algorithms that combine collaborative filtering with content-based approaches to deliver personalized product suggestions that increase engagement by 25%.',
      category: 'Recommendation Systems',
      technologies: ['Collaborative Filtering', 'Content-Based Filtering', 'Hybrid Algorithms', 'Real-time Processing', 'User Profiling'],
      businessValue: 'Increases user engagement by 25%, improves conversion rates by 40%, and reduces page load times from 800ms to 280ms.',
      technicalHighlights: [
        'Real-time collaborative filtering with item-to-item similarities',
        'Hybrid approach combining multiple recommendation strategies',
        'Interactive user preference learning and adaptation',
        'Scalable architecture for millions of products and users'
      ],
      metrics: [
        { label: 'User Engagement', value: '+25%' },
        { label: 'Conversion Rate', value: '+40%' },
        { label: 'Page Load Time', value: '280ms' },
        { label: 'Processing', value: 'Real-time' }
      ],
      icon: '🛍️',
      component: EcommerceRecommendationDemo,
      difficulty: 'Intermediate',
      estimatedTime: '6-10 min'
    }
  ];

  const categories = ['All', 'Natural Language Processing', 'Machine Learning', 'Computer Vision', 'Recommendation Systems'];
  
  const filteredDemos = selectedCategory === 'All' 
    ? demos 
    : demos.filter(demo => demo.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const DemoCard: React.FC<{ demo: DemoInfo }> = ({ demo }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => setActiveDemo(demo)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-32 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
        <div className="text-5xl opacity-80">{demo.icon}</div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            demo.category === 'Natural Language Processing' ? 'bg-blue-100 text-blue-800' :
            demo.category === 'Machine Learning' ? 'bg-purple-100 text-purple-800' :
            demo.category === 'Computer Vision' ? 'bg-green-100 text-green-800' :
            'bg-orange-100 text-orange-800'
          }`}>
            {demo.category}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            demo.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
            demo.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {demo.difficulty}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-secondary-900 mb-2">
          {demo.title}
        </h3>
        
        <p className="text-secondary-600 mb-4 line-clamp-2">
          {demo.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {demo.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {tech}
            </span>
          ))}
          {demo.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              +{demo.technologies.length - 3} more
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          {demo.metrics.slice(0, 2).map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold text-primary-600">{metric.value}</div>
              <div className="text-xs text-secondary-500">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>⏱️ {demo.estimatedTime}</span>
          <span className="text-primary-600 font-medium">Try Demo →</span>
        </div>
      </div>
    </motion.div>
  );

  const DemoModal: React.FC<{ demo: DemoInfo; onClose: () => void }> = ({ demo, onClose }) => {
    const DemoComponent = demo.component;
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg w-full max-w-7xl max-h-[95vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full overflow-y-auto">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner />
              </div>
            }>
              <DemoComponent onClose={onClose} />
            </Suspense>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container-width">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            AI/ML <span className="text-gradient">Interactive Demos</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-4xl mx-auto mb-8">
            Explore production-ready AI systems through interactive demonstrations. 
            Experience the algorithms, visualize the processes, and understand the business impact 
            of cutting-edge machine learning solutions.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">🚀 What Makes These Demos Special</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span>Production-ready algorithms with real performance metrics</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span>Interactive visualizations of AI decision-making processes</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span>Educational explanations accessible to all technical levels</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span>Real business value and measurable impact demonstrations</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-secondary-600 hover:text-secondary-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Demos Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {filteredDemos.map((demo) => (
              <DemoCard key={demo.id} demo={demo} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredDemos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-secondary-500 text-lg">
              No demos found in this category. Please select a different filter.
            </p>
          </motion.div>
        )}

        {/* Technical Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Technical Architecture</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                  <div>
                    <strong>Client-Side Processing:</strong> TensorFlow.js enables real-time ML inference directly in the browser for optimal performance
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                  <div>
                    <strong>Interactive Visualizations:</strong> React and Framer Motion create engaging, educational demonstrations of AI processes
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                  <div>
                    <strong>Production-Ready Algorithms:</strong> Each demo implements algorithms used in real enterprise applications
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Learning Outcomes</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Understanding of modern AI/ML algorithm implementations</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Insight into real-world business applications and ROI</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Hands-on experience with interactive AI systems</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Knowledge of performance optimization and scaling considerations</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Demo Modal */}
      <AnimatePresence>
        {activeDemo && (
          <DemoModal 
            demo={activeDemo} 
            onClose={() => setActiveDemo(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIDemos;