import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar, Doughnut, Bubble } from 'react-chartjs-2';

const MarketAnalysisDashboard: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [timeHorizon, setTimeHorizon] = useState('5-year');
  const [focusArea, setFocusArea] = useState('all-sectors');

  // AI/ML market growth trends
  const marketGrowthData = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028'],
    datasets: [
      {
        label: 'AI Market Size ($B)',
        data: [93.5, 136.6, 191.8, 281.3, 383.3, 503.1, 641.3, 811.8, 1028.7],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'ML Platform Market ($B)',
        data: [8.2, 12.1, 18.3, 26.8, 35.4, 48.1, 64.7, 86.2, 113.4],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Computer Vision ($B)',
        data: [10.9, 14.7, 19.8, 26.2, 33.6, 42.3, 52.8, 65.4, 80.7],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Technology adoption rates by industry
  const adoptionRatesData = {
    labels: ['Healthcare', 'Financial Services', 'Retail/E-commerce', 'Manufacturing', 'Technology', 'Automotive', 'Energy', 'Media'],
    datasets: [
      {
        label: 'Current Adoption (%)',
        data: [78, 85, 72, 68, 92, 65, 58, 73],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2
      },
      {
        label: 'Projected 2025 (%)',
        data: [89, 94, 87, 82, 97, 79, 74, 86],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2
      }
    ]
  };

  // Investment patterns in AI/ML
  const investmentData = {
    labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024'],
    datasets: [
      {
        label: 'VC Funding ($B)',
        data: [14.2, 18.7, 22.1, 28.5, 31.8, 24.6, 29.3],
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 2
      },
      {
        label: 'Corporate Investment ($B)',
        data: [8.9, 12.3, 15.7, 19.2, 22.4, 18.8, 21.6],
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
        borderColor: 'rgb(236, 72, 153)',
        borderWidth: 2
      }
    ]
  };

  // Competitive landscape bubble chart data
  const competitiveLandscapeData = {
    datasets: [
      {
        label: 'Major Consulting Firms',
        data: [
          { x: 85, y: 92, r: 25 }, // x: market reach, y: technical capability, r: revenue scale
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgb(59, 130, 246)'
      },
      {
        label: 'Specialized AI Consultants',
        data: [
          { x: 45, y: 88, r: 15 },
          { x: 52, y: 85, r: 12 },
          { x: 38, y: 90, r: 8 }
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgb(16, 185, 129)'
      },
      {
        label: 'Peike Position',
        data: [
          { x: 72, y: 96, r: 18 }
        ],
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
        borderColor: 'rgb(245, 158, 11)',
        borderWidth: 3
      },
      {
        label: 'Tech Giants (Consulting Arms)',
        data: [
          { x: 95, y: 89, r: 35 },
          { x: 92, y: 91, r: 32 }
        ],
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgb(239, 68, 68)'
      }
    ]
  };

  // Market opportunities by segment
  const opportunityData = {
    labels: ['Enterprise AI', 'Healthcare AI', 'FinTech ML', 'Retail Intelligence', 'Industrial IoT', 'Autonomous Systems'],
    datasets: [{
      data: [28, 22, 18, 16, 10, 6],
      backgroundColor: [
        '#3B82F6',
        '#10B981',
        '#F59E0B',
        '#EF4444',
        '#8B5CF6',
        '#EC4899'
      ],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  // Key market insights and trends
  const marketInsights = [
    {
      category: 'Market Size',
      insight: 'Global AI market to reach $1.03T by 2028',
      impact: 'High',
      trend: 'Growing',
      confidence: 95
    },
    {
      category: 'Adoption Rate',
      insight: '73% of enterprises plan AI implementation in 2024',
      impact: 'High',
      trend: 'Accelerating',
      confidence: 88
    },
    {
      category: 'Investment',
      insight: '$29.3B in Q3 2024 VC funding for AI startups',
      impact: 'Medium',
      trend: 'Volatile',
      confidence: 82
    },
    {
      category: 'Talent Gap',
      insight: '4.2M AI/ML jobs unfilled globally',
      impact: 'High',
      trend: 'Widening',
      confidence: 91
    },
    {
      category: 'Regulatory',
      insight: 'EU AI Act and similar regulations emerging',
      impact: 'Medium',
      trend: 'Increasing',
      confidence: 87
    },
    {
      category: 'Technology',
      insight: 'Generative AI driving 40% of new implementations',
      impact: 'High',
      trend: 'Explosive',
      confidence: 93
    }
  ];

  // Regional market analysis
  const regionalData = {
    'global': {
      marketSize: 1028.7,
      growthRate: 25.2,
      keyDrivers: ['Digital transformation', 'Generative AI adoption', 'Automation demands']
    },
    'north-america': {
      marketSize: 387.8,
      growthRate: 23.8,
      keyDrivers: ['Tech innovation', 'Enterprise adoption', 'Venture capital']
    },
    'europe': {
      marketSize: 198.4,
      growthRate: 26.1,
      keyDrivers: ['Digital sovereignty', 'Manufacturing 4.0', 'Green tech']
    },
    'asia-pacific': {
      marketSize: 342.1,
      growthRate: 28.7,
      keyDrivers: ['Manufacturing', 'Smart cities', 'Mobile-first AI']
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const bubbleOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: Market Reach ${context.parsed.x}%, Tech Capability ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Market Reach (%)'
        },
        min: 0,
        max: 100
      },
      y: {
        title: {
          display: true,
          text: 'Technical Capability (%)'
        },
        min: 0,
        max: 100
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Global AI Market',
            value: '$1.03T',
            subtitle: 'by 2028',
            change: '+25.2% CAGR',
            icon: '🌍'
          },
          {
            title: 'Market Opportunity',
            value: '$387B',
            subtitle: 'Addressable market',
            change: 'Enterprise focus',
            icon: '🎯'
          },
          {
            title: 'Investment Flow',
            value: '$29.3B',
            subtitle: 'Q3 2024 funding',
            change: '+18% QoQ',
            icon: '💰'
          },
          {
            title: 'Talent Demand',
            value: '4.2M',
            subtitle: 'Unfilled positions',
            change: 'Growing gap',
            icon: '👥'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border p-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">{metric.icon}</span>
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                {metric.change}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{metric.title}</h3>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-sm text-gray-600">{metric.subtitle}</p>
            </div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full" />
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Market Analysis Dashboard</h3>
          <div className="flex items-center space-x-4">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="global">Global</option>
              <option value="north-america">North America</option>
              <option value="europe">Europe</option>
              <option value="asia-pacific">Asia Pacific</option>
            </select>
            <select
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="5-year">5-Year Forecast</option>
              <option value="3-year">3-Year Forecast</option>
              <option value="1-year">1-Year Forecast</option>
            </select>
            <select
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all-sectors">All Sectors</option>
              <option value="enterprise">Enterprise AI</option>
              <option value="healthcare">Healthcare</option>
              <option value="fintech">FinTech</option>
            </select>
          </div>
        </div>

        {/* Regional Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{selectedRegion.replace('-', ' ').toUpperCase()} Market</h4>
            <p className="text-2xl font-bold text-blue-600">
              ${regionalData[selectedRegion as keyof typeof regionalData].marketSize}B
            </p>
            <p className="text-sm text-gray-600">Projected 2028 value</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Growth Rate</h4>
            <p className="text-2xl font-bold text-green-600">
              {regionalData[selectedRegion as keyof typeof regionalData].growthRate}%
            </p>
            <p className="text-sm text-gray-600">CAGR 2023-2028</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Key Drivers</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              {regionalData[selectedRegion as keyof typeof regionalData].keyDrivers.map((driver, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                  {driver}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Market Growth Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI/ML Market Growth Trends</h3>
        <div className="h-80">
          <Line data={marketGrowthData} options={chartOptions} />
        </div>
      </motion.div>

      {/* Technology Adoption & Investment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm border p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Technology Adoption by Industry</h3>
          <div className="h-64">
            <Bar data={adoptionRatesData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm border p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Patterns</h3>
          <div className="h-64">
            <Bar data={investmentData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      {/* Market Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm border p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Opportunities by Segment</h3>
          <div className="h-64">
            <Doughnut 
              data={opportunityData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom' as const
                  }
                }
              }} 
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm border p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Competitive Landscape</h3>
          <div className="h-64">
            <Bubble data={competitiveLandscapeData} options={bubbleOptions} />
          </div>
        </motion.div>
      </div>

      {/* Market Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Market Insights & Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{insight.category}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  insight.trend === 'Growing' || insight.trend === 'Accelerating' || insight.trend === 'Explosive' ? 'bg-green-100 text-green-800' :
                  insight.trend === 'Volatile' || insight.trend === 'Increasing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {insight.trend}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{insight.insight}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  insight.impact === 'High' ? 'bg-red-100 text-red-800' :
                  insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {insight.impact} Impact
                </span>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-500">Confidence:</span>
                  <div className="w-12 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${insight.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{insight.confidence}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Strategic Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm p-6 text-white"
      >
        <h3 className="text-lg font-semibold mb-4">Strategic Market Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h4 className="font-semibold mb-2">🎯 Target Sectors</h4>
            <p className="text-sm opacity-90">Focus on healthcare and fintech - highest growth potential with 28%+ CAGR</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h4 className="font-semibold mb-2">🚀 Service Expansion</h4>
            <p className="text-sm opacity-90">Generative AI consulting represents 40% of new market opportunities</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h4 className="font-semibold mb-2">🌍 Geographic Focus</h4>
            <p className="text-sm opacity-90">Asia-Pacific shows strongest growth at 28.7% CAGR through 2028</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MarketAnalysisDashboard;