import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArchitectureDiagram {
  id: string;
  title: string;
  description: string;
  category: 'ml-pipeline' | 'distributed-systems' | 'cloud-architecture' | 'data-flow';
  complexity: 'beginner' | 'intermediate' | 'advanced';
  components: DiagramComponent[];
}

interface DiagramComponent {
  id: string;
  name: string;
  type: 'service' | 'database' | 'api' | 'ml-model' | 'queue' | 'cache';
  position: { x: number; y: number };
  description: string;
  connections: string[];
}

const architectureDiagrams: ArchitectureDiagram[] = [
  {
    id: 'enterprise-rag',
    title: 'Enterprise RAG System Architecture',
    description: 'Scalable document retrieval system with AWS infrastructure, achieving 40% cost reduction and <200ms response times.',
    category: 'distributed-systems',
    complexity: 'advanced',
    components: [
      {
        id: 'api-gateway',
        name: 'API Gateway',
        type: 'api',
        position: { x: 50, y: 20 },
        description: 'Entry point for client requests with rate limiting and authentication',
        connections: ['query-service']
      },
      {
        id: 'query-service',
        name: 'Query Service',
        type: 'service',
        position: { x: 50, y: 40 },
        description: 'Processes incoming queries and orchestrates retrieval pipeline',
        connections: ['embedding-service', 'vector-db']
      },
      {
        id: 'embedding-service',
        name: 'Embedding Service',
        type: 'ml-model',
        position: { x: 20, y: 60 },
        description: 'Converts text queries into vector embeddings using BERT',
        connections: ['vector-db']
      },
      {
        id: 'vector-db',
        name: 'Vector Database',
        type: 'database',
        position: { x: 50, y: 80 },
        description: 'Stores and searches document embeddings using cosine similarity',
        connections: ['document-store']
      },
      {
        id: 'document-store',
        name: 'Document Store',
        type: 'database',
        position: { x: 80, y: 60 },
        description: 'S3-based storage for original documents and metadata',
        connections: []
      }
    ]
  },
  {
    id: 'patient-matching',
    title: 'Patient Matching ML Pipeline',
    description: 'Collaborative filtering system using SVD for healthcare matching with 75% accuracy and 60% efficiency improvement.',
    category: 'ml-pipeline',
    complexity: 'advanced',
    components: [
      {
        id: 'data-ingestion',
        name: 'Data Ingestion',
        type: 'service',
        position: { x: 20, y: 20 },
        description: 'Collects patient data from multiple healthcare systems',
        connections: ['preprocessing']
      },
      {
        id: 'preprocessing',
        name: 'Data Preprocessing',
        type: 'service',
        position: { x: 50, y: 20 },
        description: 'Cleans and normalizes patient records for ML processing',
        connections: ['feature-extraction']
      },
      {
        id: 'feature-extraction',
        name: 'Feature Extraction',
        type: 'service',
        position: { x: 80, y: 20 },
        description: 'Extracts relevant patient attributes and medical history',
        connections: ['svd-model']
      },
      {
        id: 'svd-model',
        name: 'SVD Model',
        type: 'ml-model',
        position: { x: 50, y: 50 },
        description: 'Matrix decomposition for collaborative filtering',
        connections: ['similarity-calc']
      },
      {
        id: 'similarity-calc',
        name: 'Similarity Calculator',
        type: 'service',
        position: { x: 50, y: 70 },
        description: 'Computes patient similarity scores using cosine similarity',
        connections: ['ranking-service']
      },
      {
        id: 'ranking-service',
        name: 'Ranking Service',
        type: 'service',
        position: { x: 50, y: 90 },
        description: 'Ranks and filters matches based on clinical relevance',
        connections: []
      }
    ]
  },
  {
    id: 'receipt-processing',
    title: 'Computer Vision Receipt Processing',
    description: 'End-to-end pipeline achieving 82% processing accuracy with 30% food waste reduction through intelligent analysis.',
    category: 'ml-pipeline',
    complexity: 'intermediate',
    components: [
      {
        id: 'image-upload',
        name: 'Image Upload',
        type: 'api',
        position: { x: 50, y: 10 },
        description: 'Handles receipt image uploads with validation',
        connections: ['preprocessing']
      },
      {
        id: 'preprocessing',
        name: 'Image Preprocessing',
        type: 'service',
        position: { x: 50, y: 25 },
        description: 'Enhances image quality, rotation correction, noise reduction',
        connections: ['ocr-service']
      },
      {
        id: 'ocr-service',
        name: 'OCR Service',
        type: 'ml-model',
        position: { x: 50, y: 40 },
        description: 'Extracts text from receipt images using Tesseract OCR',
        connections: ['nlp-parser']
      },
      {
        id: 'nlp-parser',
        name: 'NLP Parser',
        type: 'ml-model',
        position: { x: 50, y: 55 },
        description: 'Parses extracted text to identify items, prices, categories',
        connections: ['categorization']
      },
      {
        id: 'categorization',
        name: 'Item Categorization',
        type: 'ml-model',
        position: { x: 30, y: 70 },
        description: 'Classifies food items into ingredient categories',
        connections: ['recipe-generator']
      },
      {
        id: 'recipe-generator',
        name: 'Recipe Generator',
        type: 'service',
        position: { x: 70, y: 70 },
        description: 'Suggests recipes based on purchased ingredients',
        connections: []
      }
    ]
  }
];

const categories = [
  { id: 'all', label: 'All Categories', color: 'bg-secondary-500' },
  { id: 'ml-pipeline', label: 'ML Pipelines', color: 'bg-primary-500' },
  { id: 'distributed-systems', label: 'Distributed Systems', color: 'bg-green-500' },
  { id: 'cloud-architecture', label: 'Cloud Architecture', color: 'bg-blue-500' },
  { id: 'data-flow', label: 'Data Flow', color: 'bg-purple-500' }
];

const complexityColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
};

const componentTypeColors = {
  service: 'bg-blue-500',
  database: 'bg-green-500',
  api: 'bg-purple-500',
  'ml-model': 'bg-red-500',
  queue: 'bg-yellow-500',
  cache: 'bg-orange-500'
};

const ArchitectureHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDiagram, setSelectedDiagram] = useState<ArchitectureDiagram | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const filteredDiagrams = selectedCategory === 'all' 
    ? architectureDiagrams 
    : architectureDiagrams.filter(diagram => diagram.category === selectedCategory);

  const DiagramVisualization: React.FC<{ diagram: ArchitectureDiagram }> = ({ diagram }) => (
    <div className="relative w-full h-96 bg-gradient-to-br from-secondary-50 to-white rounded-xl border border-secondary-200 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Connections */}
        {diagram.components.map(component =>
          component.connections.map(connectionId => {
            const targetComponent = diagram.components.find(c => c.id === connectionId);
            if (!targetComponent) return null;
            
            return (
              <line
                key={`${component.id}-${connectionId}`}
                x1={component.position.x}
                y1={component.position.y}
                x2={targetComponent.position.x}
                y2={targetComponent.position.y}
                stroke="#94A3B8"
                strokeWidth="0.5"
                strokeDasharray="2,2"
                className="opacity-60"
              />
            );
          })
        )}
        
        {/* Components */}
        {diagram.components.map(component => (
          <g key={component.id}>
            <circle
              cx={component.position.x}
              cy={component.position.y}
              r="4"
              className={`${componentTypeColors[component.type]} cursor-pointer transition-all duration-200`}
              fill="currentColor"
              onMouseEnter={() => setHoveredComponent(component.id)}
              onMouseLeave={() => setHoveredComponent(null)}
              style={{
                transform: hoveredComponent === component.id ? 'scale(1.2)' : 'scale(1)',
                transformOrigin: `${component.position.x}% ${component.position.y}%`
              }}
            />
            <text
              x={component.position.x}
              y={component.position.y - 6}
              textAnchor="middle"
              className="text-xs font-medium fill-secondary-700"
              style={{ fontSize: '3px' }}
            >
              {component.name}
            </text>
          </g>
        ))}
      </svg>
      
      {/* Component Tooltip */}
      <AnimatePresence>
        {hoveredComponent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg border border-secondary-200 max-w-xs z-10"
          >
            {(() => {
              const component = diagram.components.find(c => c.id === hoveredComponent);
              return component ? (
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">{component.name}</h4>
                  <p className="text-sm text-secondary-600">{component.description}</p>
                  <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${componentTypeColors[component.type]} text-white`}>
                    {component.type}
                  </span>
                </div>
              ) : null;
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

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
              Architecture Hub
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Interactive system diagrams and architectural decisions for scalable AI/ML applications and distributed systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section-padding py-12">
        <div className="container-width">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-lg`
                    : 'bg-white text-secondary-700 hover:bg-secondary-100 shadow'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagrams Grid */}
      <section className="section-padding pb-20">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {filteredDiagrams.map((diagram, index) => (
              <motion.div
                key={diagram.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                        {diagram.title}
                      </h3>
                      <p className="text-secondary-600 leading-relaxed mb-4">
                        {diagram.description}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${complexityColors[diagram.complexity]}`}>
                      {diagram.complexity}
                    </span>
                  </div>
                  
                  <DiagramVisualization diagram={diagram} />
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {Array.from(new Set(diagram.components.map(c => c.type))).map(type => (
                        <span
                          key={type}
                          className={`px-3 py-1 text-xs font-medium rounded-full ${componentTypeColors[type]} text-white`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedDiagram(diagram)}
                      className="text-primary-600 font-medium hover:text-primary-700 transition-colors flex items-center gap-2"
                    >
                      View Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Diagram Modal */}
      <AnimatePresence>
        {selectedDiagram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedDiagram(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-3xl font-bold text-secondary-900">
                    {selectedDiagram.title}
                  </h2>
                  <button
                    onClick={() => setSelectedDiagram(null)}
                    className="text-secondary-500 hover:text-secondary-700 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <DiagramVisualization diagram={selectedDiagram} />
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-4">Components</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedDiagram.components.map(component => (
                      <div key={component.id} className="bg-secondary-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`w-3 h-3 rounded-full ${componentTypeColors[component.type]}`}></span>
                          <h4 className="font-semibold text-secondary-900">{component.name}</h4>
                        </div>
                        <p className="text-sm text-secondary-600">{component.description}</p>
                        <span className="inline-block mt-2 px-2 py-1 text-xs bg-secondary-200 text-secondary-700 rounded">
                          {component.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArchitectureHub;