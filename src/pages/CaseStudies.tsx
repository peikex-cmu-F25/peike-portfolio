import { useState } from 'react';
import { motion } from 'framer-motion';
import { caseStudies, CaseStudyData } from '../data/portfolio';

interface CaseStudyCardProps {
  caseStudy: CaseStudyData;
  onClick: () => void;
}

const CaseStudyCard = ({ caseStudy, onClick }: CaseStudyCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer group"
    onClick={onClick}
  >
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
          {caseStudy.category}
        </span>
        {caseStudy.confidential && (
          <span className="text-xs text-gray-500 font-medium">Confidential Client</span>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {caseStudy.title}
      </h3>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {caseStudy.challenge}
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <span className="text-sm font-medium text-gray-500">Industry</span>
          <p className="text-sm text-gray-900">{caseStudy.industry}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Duration</span>
          <p className="text-sm text-gray-900">{caseStudy.duration}</p>
        </div>
      </div>
      
      <div className="bg-green-50 rounded-lg p-4 mb-4">
        <div className="text-center">
          <span className="text-2xl font-bold text-green-600">
            {caseStudy.roiAnalysis.roiPercentage} ROI
          </span>
          <p className="text-sm text-green-700">
            {caseStudy.roiAnalysis.paybackPeriod} payback period
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {caseStudy.technologies.slice(0, 4).map((tech, index) => (
          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {tech}
          </span>
        ))}
        {caseStudy.technologies.length > 4 && (
          <span className="text-xs text-gray-500">+{caseStudy.technologies.length - 4} more</span>
        )}
      </div>
    </div>
  </motion.div>
);

interface CaseStudyModalProps {
  caseStudy: CaseStudyData;
  isOpen: boolean;
  onClose: () => void;
}

const CaseStudyModal = ({ caseStudy, isOpen, onClose }: CaseStudyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{caseStudy.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-light"
            >
              ×
            </button>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-8">
            {/* Header Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {caseStudy.category}
                  </span>
                  <span className="text-sm text-gray-500">{caseStudy.industry}</span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Challenge</h3>
                  <p className="text-gray-700">{caseStudy.challenge}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Solution</h3>
                  <p className="text-gray-700">{caseStudy.solution}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Client</span>
                    <p className="text-sm text-gray-900">{caseStudy.client}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Duration</span>
                    <p className="text-sm text-gray-900">{caseStudy.duration}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Team Size</span>
                    <p className="text-sm text-gray-900">{caseStudy.teamSize}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Analysis */}
            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Impact & ROI</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <span className="text-2xl font-bold text-green-600 block">
                    {caseStudy.roiAnalysis.roiPercentage}
                  </span>
                  <span className="text-sm text-green-700">ROI</span>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-green-600 block">
                    {caseStudy.roiAnalysis.paybackPeriod}
                  </span>
                  <span className="text-sm text-green-700">Payback Period</span>
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold text-green-600 block">
                    {caseStudy.roiAnalysis.investment}
                  </span>
                  <span className="text-sm text-green-700">Investment</span>
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold text-green-600 block">
                    {caseStudy.roiAnalysis.annualSavings}
                  </span>
                  <span className="text-sm text-green-700">Annual Savings</span>
                </div>
              </div>
            </div>

            {/* Implementation Timeline */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementation Timeline</h3>
              <div className="space-y-4">
                {caseStudy.implementation.map((phase, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{phase.phase}</h4>
                      <span className="text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <ul className="space-y-1">
                      {phase.keyActions.map((action, actionIndex) => (
                        <li key={actionIndex} className="text-sm text-gray-700 flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Metrics</h3>
                <div className="space-y-4">
                  {caseStudy.businessMetrics.map((metric, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{metric.label}</span>
                        <span className="text-sm font-semibold text-green-600">{metric.improvement}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Before: {metric.before}</span>
                        <span>→</span>
                        <span>After: {metric.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Metrics</h3>
                <div className="space-y-4">
                  {caseStudy.technicalMetrics.map((metric, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{metric.label}</span>
                        <span className="text-sm font-semibold text-blue-600">{metric.value}</span>
                      </div>
                      <p className="text-sm text-gray-600">{metric.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologies.map((tech, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Lessons Learned & Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lessons Learned</h3>
                <ul className="space-y-2">
                  {caseStudy.lessonsLearned.map((lesson, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="text-yellow-500 mr-2">💡</span>
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                <ul className="space-y-2">
                  {caseStudy.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="text-green-500 mr-2">🎯</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Testimonial */}
            {caseStudy.testimonial && (
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Testimonial</h3>
                <blockquote className="text-gray-700 italic mb-4">
                  "{caseStudy.testimonial.quote}"
                </blockquote>
                <div className="text-sm">
                  <span className="font-semibold text-gray-900">{caseStudy.testimonial.author}</span>
                  <span className="text-gray-600"> - {caseStudy.testimonial.role}</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CaseStudies = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyData | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredCaseStudies = caseStudies.filter(cs => 
    filter === 'all' || cs.category === filter
  );

  const categories = ['all', ...Array.from(new Set(caseStudies.map(cs => cs.category)))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Enterprise Case Studies
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Real-world consultative projects demonstrating strategic business impact, 
              technical leadership, and measurable ROI across diverse industries
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {category === 'all' ? 'All Cases' : category}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCaseStudies.map((caseStudy) => (
            <CaseStudyCard
              key={caseStudy.id}
              caseStudy={caseStudy}
              onClick={() => setSelectedCaseStudy(caseStudy)}
            />
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Consultative Impact Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <span className="text-3xl font-bold text-blue-600 block">3+</span>
              <span className="text-gray-600">Enterprise Transformations</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-green-600 block">$2.5M+</span>
              <span className="text-gray-600">Annual Savings Generated</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-purple-600 block">300%+</span>
              <span className="text-gray-600">Average ROI</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-orange-600 block">4.0</span>
              <span className="text-gray-600">Months Avg Payback</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedCaseStudy && (
        <CaseStudyModal
          caseStudy={selectedCaseStudy}
          isOpen={!!selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}
    </div>
  );
};

export default CaseStudies;