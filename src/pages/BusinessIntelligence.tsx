import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Metric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

interface ROIScenario {
  name: string;
  investment: number;
  annualSavings: number;
  roi: number;
  paybackMonths: number;
  description: string;
}

const portfolioMetrics: Metric[] = [
  {
    id: 'total-impact',
    label: 'Total Business Impact',
    value: '$2.5M+',
    change: '+18% YoY',
    trend: 'up',
    description: 'Combined cost savings and efficiency improvements across all client engagements'
  },
  {
    id: 'avg-roi',
    label: 'Average Project ROI',
    value: '340%',
    change: '+25%',
    trend: 'up',
    description: 'Average return on investment achieved across enterprise AI/ML implementations'
  },
  {
    id: 'implementation-time',
    label: 'Avg Implementation Time',
    value: '12 weeks',
    change: '-30%',
    trend: 'down',
    description: 'Reduced project delivery timeline through optimized methodologies'
  },
  {
    id: 'client-satisfaction',
    label: 'Client Satisfaction',
    value: '98%',
    change: '+5%',
    trend: 'up',
    description: 'Net Promoter Score across all client engagements and consulting projects'
  },
  {
    id: 'system-uptime',
    label: 'System Uptime',
    value: '99.97%',
    change: '+0.1%',
    trend: 'up',
    description: 'Average uptime across all deployed AI/ML systems and applications'
  },
  {
    id: 'cost-reduction',
    label: 'Cost Reduction',
    value: '45%',
    change: '+12%',
    trend: 'up',
    description: 'Average operational cost reduction achieved through AI automation'
  }
];

const roiScenarios: ROIScenario[] = [
  {
    name: 'Small Enterprise AI Initiative',
    investment: 75000,
    annualSavings: 180000,
    roi: 240,
    paybackMonths: 5,
    description: 'Basic AI implementation for process automation and efficiency gains'
  },
  {
    name: 'Mid-Market ML Platform',
    investment: 250000,
    annualSavings: 850000,
    roi: 340,
    paybackMonths: 4,
    description: 'Comprehensive ML platform with advanced analytics and predictions'
  },
  {
    name: 'Enterprise AI Transformation',
    investment: 500000,
    annualSavings: 2100000,
    roi: 420,
    paybackMonths: 3,
    description: 'Full-scale AI transformation with multiple systems and workflows'
  }
];

const BusinessIntelligence: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);
  const [selectedROI, setSelectedROI] = useState<ROIScenario>(roiScenarios[1]);

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
              Business Intelligence Dashboard
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Real-time insights into project performance, ROI calculations, and business impact metrics 
              that demonstrate measurable value creation across AI/ML implementations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics Dashboard */}
      <section className="section-padding py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Performance Metrics
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Track real-time performance indicators and business impact metrics across all client engagements
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioMetrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer group"
                onClick={() => setSelectedMetric(metric)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-secondary-500 uppercase tracking-wide mb-2">
                      {metric.label}
                    </h3>
                    <div className="text-3xl font-bold text-secondary-900 mb-1">
                      {metric.value}
                    </div>
                  </div>
                  <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    metric.trend === 'up' ? 'bg-green-100 text-green-700' :
                    metric.trend === 'down' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {metric.trend === 'up' && (
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {metric.trend === 'down' && (
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 15.586l3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {metric.change}
                  </div>
                </div>
                <p className="text-sm text-secondary-600 group-hover:text-secondary-700 transition-colors">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="section-padding py-16 bg-gradient-to-r from-secondary-900 to-secondary-800 text-white">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              ROI Calculator & Scenarios
            </h2>
            <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
              Interactive ROI calculations based on real project data and industry benchmarks
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {roiScenarios.map((scenario) => (
                <motion.div
                  key={scenario.name}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedROI.name === scenario.name
                      ? 'border-primary-400 bg-primary-900/20'
                      : 'border-secondary-600 bg-secondary-800/50 hover:border-secondary-500'
                  }`}
                  onClick={() => setSelectedROI(scenario)}
                >
                  <h3 className="text-lg font-semibold mb-2">{scenario.name}</h3>
                  <p className="text-sm text-secondary-300 mb-4">{scenario.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Investment:</span>
                      <span className="font-semibold">${scenario.investment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Annual Savings:</span>
                      <span className="font-semibold text-green-400">${scenario.annualSavings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-secondary-600">
                      <span>ROI:</span>
                      <span className="text-primary-400">{scenario.roi}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">
                {selectedROI.name} - Detailed Analysis
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Investment Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-white/20">
                      <span>Initial Investment:</span>
                      <span className="font-semibold">${selectedROI.investment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/20">
                      <span>Annual Savings:</span>
                      <span className="font-semibold text-green-400">${selectedROI.annualSavings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/20">
                      <span>Payback Period:</span>
                      <span className="font-semibold">{selectedROI.paybackMonths} months</span>
                    </div>
                    <div className="flex justify-between py-2 text-lg font-bold">
                      <span>Total ROI:</span>
                      <span className="text-primary-400">{selectedROI.roi}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">5-Year Projection</h4>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((year) => {
                      const cumulativeSavings = selectedROI.annualSavings * year;
                      const netValue = cumulativeSavings - selectedROI.investment;
                      return (
                        <div key={year} className="flex justify-between py-2 border-b border-white/20">
                          <span>Year {year}:</span>
                          <span className="font-semibold text-green-400">
                            ${netValue.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Impact Visualization */}
      <section className="section-padding py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Business Impact Overview
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Comprehensive view of value creation across different business dimensions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-secondary-900 mb-6">Cost Optimization Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-lg font-semibold text-green-800">Operational Cost Reduction</div>
                    <div className="text-sm text-green-600">Average across all engagements</div>
                  </div>
                  <div className="text-3xl font-bold text-green-600">45%</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <div className="text-lg font-semibold text-blue-800">Process Automation</div>
                    <div className="text-sm text-blue-600">Manual tasks eliminated</div>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">78%</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <div className="text-lg font-semibold text-purple-800">Time to Market</div>
                    <div className="text-sm text-purple-600">Product development acceleration</div>
                  </div>
                  <div className="text-3xl font-bold text-purple-600">-65%</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-secondary-900 mb-6">Revenue Enhancement</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                  <div>
                    <div className="text-lg font-semibold text-emerald-800">Revenue Growth</div>
                    <div className="text-sm text-emerald-600">Through AI-driven insights</div>
                  </div>
                  <div className="text-3xl font-bold text-emerald-600">32%</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div>
                    <div className="text-lg font-semibold text-orange-800">Customer Satisfaction</div>
                    <div className="text-sm text-orange-600">NPS improvement</div>
                  </div>
                  <div className="text-3xl font-bold text-orange-600">+28</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
                  <div>
                    <div className="text-lg font-semibold text-pink-800">Market Share</div>
                    <div className="text-sm text-pink-600">Competitive advantage gained</div>
                  </div>
                  <div className="text-3xl font-bold text-pink-600">+15%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding py-16 bg-primary-50">
        <div className="container-width">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">
              Ready to Achieve Similar Results?
            </h2>
            <p className="text-xl text-secondary-600 mb-8">
              Let's discuss how we can create measurable business impact for your organization 
              with strategic AI/ML implementations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/peike-portfolio/contact"
                className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Schedule Strategy Session
              </a>
              <a
                href="/peike-portfolio/services"
                className="inline-flex items-center px-8 py-4 border border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Metric Detail Modal */}
      {selectedMetric && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 mb-2">
                    {selectedMetric.label}
                  </h2>
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {selectedMetric.value}
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    selectedMetric.trend === 'up' ? 'bg-green-100 text-green-700' :
                    selectedMetric.trend === 'down' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedMetric.change} from previous period
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMetric(null)}
                  className="text-secondary-500 hover:text-secondary-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-secondary-600 mb-6">
                {selectedMetric.description}
              </p>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedMetric(null)}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BusinessIntelligence;