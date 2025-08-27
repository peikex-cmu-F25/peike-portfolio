import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const PortfolioAnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    activeUsers: 0,
    pageViews: 0,
    engagementRate: 0,
    conversionRate: 0
  });

  // Simulate real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        activeUsers: Math.max(0, prev.activeUsers + (Math.random() - 0.5) * 5),
        pageViews: prev.pageViews + Math.floor(Math.random() * 3),
        engagementRate: Math.max(0, Math.min(100, prev.engagementRate + (Math.random() - 0.5) * 2)),
        conversionRate: Math.max(0, Math.min(100, prev.conversionRate + (Math.random() - 0.5) * 0.5))
      }));
    }, 3000);

    // Initial values
    setRealTimeMetrics({
      activeUsers: 45,
      pageViews: 1247,
      engagementRate: 73.2,
      conversionRate: 4.8
    });

    return () => clearInterval(interval);
  }, []);

  // Engagement metrics over time
  const engagementData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Page Views',
        data: [2100, 2450, 2800, 3200],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Unique Visitors',
        data: [890, 1020, 1150, 1280],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Contact Inquiries',
        data: [12, 18, 25, 32],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
      }
    ]
  };

  // Geographic distribution
  const geographicData = {
    labels: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Others'],
    datasets: [
      {
        data: [45, 28, 18, 6, 3],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  // Technology interest heatmap data
  const technologyInterest = [
    { tech: 'AI/ML', interest: 95, growth: '+23%' },
    { tech: 'Cloud Architecture', interest: 88, growth: '+18%' },
    { tech: 'Data Engineering', interest: 82, growth: '+15%' },
    { tech: 'Computer Vision', interest: 79, growth: '+28%' },
    { tech: 'NLP', interest: 76, growth: '+22%' },
    { tech: 'DevOps', interest: 71, growth: '+12%' }
  ];

  // Conversion funnel data
  const funnelData = {
    labels: ['Visitors', 'Project Views', 'Case Studies', 'Contact Form', 'Consultation'],
    datasets: [
      {
        label: 'Conversion Funnel',
        data: [1000, 650, 280, 95, 48],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)'
        ],
        borderWidth: 2
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
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Active Users',
            value: Math.round(realTimeMetrics.activeUsers),
            change: '+12%',
            icon: '👥',
            color: 'blue'
          },
          {
            title: 'Page Views',
            value: realTimeMetrics.pageViews.toLocaleString(),
            change: '+28%',
            icon: '📊',
            color: 'green'
          },
          {
            title: 'Engagement Rate',
            value: `${realTimeMetrics.engagementRate.toFixed(1)}%`,
            change: '+5.2%',
            icon: '💡',
            color: 'yellow'
          },
          {
            title: 'Conversion Rate',
            value: `${realTimeMetrics.conversionRate.toFixed(1)}%`,
            change: '+1.8%',
            icon: '🎯',
            color: 'purple'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{metric.icon}</span>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                metric.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                metric.color === 'green' ? 'bg-green-100 text-green-800' :
                metric.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {metric.change}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Engagement Trends</h3>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          <div className="h-64">
            <Line data={engagementData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Geographic Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm border p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
          <div className="h-64">
            <Doughnut data={geographicData} options={doughnutOptions} />
          </div>
        </motion.div>
      </div>

      {/* Technology Interest Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Technology Interest Heatmap</h3>
        <div className="space-y-4">
          {technologyInterest.map((item, index) => (
            <div key={item.tech} className="flex items-center space-x-4">
              <div className="w-32 text-sm font-medium text-gray-700">{item.tech}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.interest}%` }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xs font-medium">{item.interest}%</span>
                </motion.div>
              </div>
              <div className="w-16 text-sm font-medium text-green-600">{item.growth}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Conversion Funnel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel Analysis</h3>
        <div className="h-64">
          <Bar data={funnelData} options={chartOptions} />
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {funnelData.labels.map((label, index) => (
            <div key={label} className="text-sm">
              <div className="font-medium text-gray-900">{funnelData.datasets[0].data[index]}</div>
              <div className="text-gray-500">{label}</div>
              {index > 0 && (
                <div className="text-xs text-blue-600">
                  {((funnelData.datasets[0].data[index] / funnelData.datasets[0].data[index - 1]) * 100).toFixed(1)}%
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioAnalyticsDashboard;