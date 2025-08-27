import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bar, Line, Radar, Doughnut } from 'react-chartjs-2';

const BusinessImpactVisualizations: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('cost-savings');
  const [timeframe, setTimeframe] = useState('all-time');

  // Cost savings data across projects
  const costSavingsData = {
    labels: ['E-commerce ML', 'Healthcare AI', 'Financial RAG', 'Computer Vision', 'NLP Platform', 'Data Pipeline'],
    datasets: [
      {
        label: 'Cost Savings ($K)',
        data: [850, 620, 480, 390, 275, 385],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
          'rgb(236, 72, 153)'
        ],
        borderWidth: 2
      }
    ]
  };

  // Performance improvements over time
  const performanceData = {
    labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024'],
    datasets: [
      {
        label: 'Processing Speed Improvement (%)',
        data: [15, 28, 42, 58, 73, 89, 112],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Accuracy Improvement (%)',
        data: [8, 16, 25, 31, 38, 44, 52],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Cost Reduction (%)',
        data: [12, 21, 35, 48, 62, 75, 88],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Scale and efficiency metrics
  const scaleEfficiencyData = {
    labels: [
      'Data Throughput',
      'System Reliability',
      'User Scalability',
      'Cost Efficiency',
      'Response Time',
      'Resource Utilization'
    ],
    datasets: [
      {
        label: 'Before Implementation',
        data: [65, 70, 55, 60, 45, 50],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2
      },
      {
        label: 'After Implementation',
        data: [95, 98, 92, 90, 88, 94],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2
      }
    ]
  };

  // Industry impact comparison
  const industryComparisonData = {
    labels: ['Healthcare', 'E-commerce', 'Finance', 'Manufacturing', 'Technology'],
    datasets: [
      {
        label: 'Industry Average ROI (%)',
        data: [180, 220, 240, 160, 280],
        backgroundColor: 'rgba(156, 163, 175, 0.6)',
        borderColor: 'rgb(156, 163, 175)',
        borderWidth: 2
      },
      {
        label: 'Peike Projects ROI (%)',
        data: [340, 420, 380, 290, 450],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2
      }
    ]
  };

  // Client success story timeline
  const clientSuccessData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Active Projects',
        data: [2, 3, 4, 5, 6, 8, 9, 11, 12, 14, 15, 16],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Completed Implementations',
        data: [0, 1, 1, 2, 3, 4, 6, 7, 9, 11, 13, 15],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      },
      {
        label: 'Client Retention Rate (%)',
        data: [100, 100, 100, 95, 96, 97, 98, 99, 100, 100, 100, 100],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            if (context.datasetIndex === 0 && selectedMetric === 'cost-savings') {
              return `${context.dataset.label}: $${context.parsed.y}K`;
            }
            return `${context.dataset.label}: ${context.parsed.y}${
              context.dataset.label.includes('%') || context.parsed.y > 100 ? '%' : ''
            }`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            if (selectedMetric === 'cost-savings') {
              return '$' + value + 'K';
            }
            return value + (value > 100 ? '%' : '');
          }
        }
      }
    }
  };

  const dualAxisOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Number of Projects'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Retention Rate (%)'
        },
        grid: {
          drawOnChartArea: false,
        },
      }
    }
  };

  // Impact metrics summary
  const impactMetrics = [
    {
      title: 'Total Cost Savings',
      value: '$2.5M+',
      change: '+127% YoY',
      icon: '💰',
      description: 'Cumulative savings across all implementations'
    },
    {
      title: 'Performance Gains',
      value: '156%',
      change: '+23% this quarter',
      icon: '⚡',
      description: 'Average performance improvement'
    },
    {
      title: 'Client Success Rate',
      value: '98.5%',
      change: 'Maintained high',
      icon: '🎯',
      description: 'Project success and client satisfaction'
    },
    {
      title: 'Market Impact',
      value: 'Top 5%',
      change: 'Industry leader',
      icon: '🏆',
      description: 'Position in AI/ML consulting space'
    }
  ];

  // Key achievements and milestones
  const achievements = [
    {
      project: 'E-commerce Recommendation System',
      impact: '$850K annual savings',
      metrics: '40% increase in conversion rate, 60% improvement in user engagement',
      client: 'Fortune 500 Retailer',
      timeline: 'Q2 2024'
    },
    {
      project: 'Healthcare Patient Matching AI',
      impact: '$620K operational efficiency',
      metrics: '85% reduction in processing time, 99.2% accuracy rate',
      client: 'Major Healthcare Network',
      timeline: 'Q1 2024'
    },
    {
      project: 'Financial RAG System',
      impact: '$480K compliance cost reduction',
      metrics: '70% faster document processing, 95% accuracy in compliance',
      client: 'Investment Bank',
      timeline: 'Q4 2023'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Impact Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border p-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">{metric.icon}</span>
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {metric.change}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{metric.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</p>
            <p className="text-xs text-gray-600">{metric.description}</p>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -mr-10 -mt-10" />
          </motion.div>
        ))}
      </div>

      {/* Visualization Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Business Impact Analytics</h3>
          <div className="flex items-center space-x-4">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="cost-savings">Cost Savings</option>
              <option value="performance">Performance Trends</option>
              <option value="scale-efficiency">Scale & Efficiency</option>
              <option value="industry-comparison">Industry Comparison</option>
            </select>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all-time">All Time</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="last-12-months">Last 12 Months</option>
            </select>
          </div>
        </div>

        <div className="h-96">
          {selectedMetric === 'cost-savings' && (
            <Bar data={costSavingsData} options={chartOptions} />
          )}
          {selectedMetric === 'performance' && (
            <Line data={performanceData} options={chartOptions} />
          )}
          {selectedMetric === 'scale-efficiency' && (
            <Radar data={scaleEfficiencyData} options={{ ...chartOptions, scales: {} }} />
          )}
          {selectedMetric === 'industry-comparison' && (
            <Bar data={industryComparisonData} options={chartOptions} />
          )}
        </div>
      </motion.div>

      {/* Client Success Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Success Timeline (2024)</h3>
        <div className="h-80">
          <Line data={clientSuccessData} options={dualAxisOptions} />
        </div>
      </motion.div>

      {/* Key Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Project Achievements</h3>
        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-l-4 border-blue-500 pl-6 py-4 bg-gradient-to-r from-blue-50 to-transparent"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg font-semibold text-gray-900">{achievement.project}</h4>
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  {achievement.timeline}
                </span>
              </div>
              <p className="text-2xl font-bold text-green-600 mb-2">{achievement.impact}</p>
              <p className="text-gray-700 mb-2">{achievement.metrics}</p>
              <p className="text-sm text-gray-600">Client: {achievement.client}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Impact Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm border p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Distribution by Sector</h3>
          <div className="h-64">
            <Doughnut
              data={{
                labels: ['Healthcare', 'E-commerce', 'Finance', 'Manufacturing', 'Technology'],
                datasets: [{
                  data: [25, 35, 20, 10, 10],
                  backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                  ],
                  borderWidth: 2,
                  borderColor: '#fff'
                }]
              }}
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI Benchmarking</h3>
          <div className="space-y-4">
            {[
              { category: 'AI Automation Projects', roi: 340, benchmark: 280 },
              { category: 'ML Platform Development', roi: 420, benchmark: 220 },
              { category: 'Computer Vision Systems', roi: 290, benchmark: 180 },
              { category: 'NLP Applications', roi: 380, benchmark: 240 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{item.category}</span>
                  <span className="text-gray-600">{item.roi}% vs {item.benchmark}% industry</span>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                    <div
                      className="bg-blue-500 h-full rounded-full"
                      style={{ width: `${(item.roi / 500) * 100}%` }}
                    />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                    <div
                      className="bg-gray-400 h-full rounded-full"
                      style={{ width: `${(item.benchmark / 500) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Peike Projects</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span>Industry Average</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessImpactVisualizations;