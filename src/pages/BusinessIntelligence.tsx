import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PortfolioAnalyticsDashboard from '../components/business-intelligence/PortfolioAnalyticsDashboard';
import ProjectROICalculator from '../components/business-intelligence/ProjectROICalculator';
import BusinessImpactVisualizations from '../components/business-intelligence/BusinessImpactVisualizations';
import TechnicalPerformanceBenchmarks from '../components/business-intelligence/TechnicalPerformanceBenchmarks';
import MarketAnalysisDashboard from '../components/business-intelligence/MarketAnalysisDashboard';
import ConsultingOpportunityEstimator from '../components/business-intelligence/ConsultingOpportunityEstimator';
import { LoadingSpinner } from '../components/ui';

const BusinessIntelligence: React.FC = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'analytics', label: 'Portfolio Analytics', icon: '📊' },
    { id: 'roi', label: 'ROI Calculator', icon: '💰' },
    { id: 'impact', label: 'Business Impact', icon: '🎯' },
    { id: 'performance', label: 'Tech Benchmarks', icon: '⚡' },
    { id: 'market', label: 'Market Analysis', icon: '📈' },
    { id: 'consulting', label: 'Consulting Estimator', icon: '🔧' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <PortfolioAnalyticsDashboard />;
      case 'roi':
        return <ProjectROICalculator />;
      case 'impact':
        return <BusinessImpactVisualizations />;
      case 'performance':
        return <TechnicalPerformanceBenchmarks />;
      case 'market':
        return <MarketAnalysisDashboard />;
      case 'consulting':
        return <ConsultingOpportunityEstimator />;
      default:
        return <PortfolioAnalyticsDashboard />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Loading Business Intelligence Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Business Intelligence Dashboard
                </h1>
                <p className="mt-2 text-gray-600">
                  Real-time analytics, ROI calculations, and strategic insights
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Export Report
                </button>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {renderTabContent()}
      </motion.div>

      {/* Executive Summary Floating Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 max-w-sm border"
      >
        <h3 className="font-semibold text-gray-900 mb-2">Executive Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Total ROI Generated:</span>
            <span className="font-semibold text-green-600">$2.5M+</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Portfolio Engagement:</span>
            <span className="font-semibold text-blue-600">+45%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Market Position:</span>
            <span className="font-semibold text-purple-600">Top 5%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessIntelligence;