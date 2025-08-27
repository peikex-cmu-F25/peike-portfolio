import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar, Radar, Scatter } from 'react-chartjs-2';

interface BenchmarkData {
  algorithm: string;
  accuracy: number;
  speed: number;
  resourceUsage: number;
  scalability: number;
  reliability: number;
}

const TechnicalPerformanceBenchmarks: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('ml-algorithms');
  const [comparisonMode, setComparisonMode] = useState('industry');
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    avgResponseTime: 0,
    throughput: 0,
    cpuUtilization: 0,
    memoryUsage: 0
  });

  // Simulate real-time performance metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        avgResponseTime: Math.max(10, prev.avgResponseTime + (Math.random() - 0.5) * 5),
        throughput: Math.max(0, prev.throughput + (Math.random() - 0.5) * 100),
        cpuUtilization: Math.max(0, Math.min(100, prev.cpuUtilization + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(0, Math.min(100, prev.memoryUsage + (Math.random() - 0.5) * 8))
      }));
    }, 2000);

    // Initial values
    setRealTimeMetrics({
      avgResponseTime: 45,
      throughput: 2850,
      cpuUtilization: 67,
      memoryUsage: 58
    });

    return () => clearInterval(interval);
  }, []);

  // Algorithm performance comparison data
  const algorithmBenchmarks: BenchmarkData[] = [
    { algorithm: 'Custom Transformer', accuracy: 94.8, speed: 87, resourceUsage: 72, scalability: 89, reliability: 96 },
    { algorithm: 'Optimized CNN', accuracy: 92.3, speed: 95, resourceUsage: 68, scalability: 92, reliability: 94 },
    { algorithm: 'Hybrid RAG System', accuracy: 96.2, speed: 78, resourceUsage: 83, scalability: 85, reliability: 98 },
    { algorithm: 'Multi-Modal AI', accuracy: 89.7, speed: 82, resourceUsage: 77, scalability: 88, reliability: 91 },
    { algorithm: 'Ensemble Model', accuracy: 97.1, speed: 71, resourceUsage: 89, scalability: 79, reliability: 99 }
  ];

  // Performance trends over time
  const performanceTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Model Accuracy (%)',
        data: [88.5, 89.2, 90.8, 91.5, 92.3, 93.1, 93.8, 94.2, 94.8, 95.1, 95.6, 96.0],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Response Time (ms)',
        data: [120, 115, 110, 105, 98, 92, 88, 85, 82, 78, 75, 72],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y1'
      },
      {
        label: 'Throughput (req/sec)',
        data: [1200, 1350, 1480, 1620, 1750, 1890, 2010, 2150, 2280, 2420, 2550, 2680],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y2'
      }
    ]
  };

  // System scalability benchmarks
  const scalabilityData = {
    labels: ['10 Users', '100 Users', '1K Users', '10K Users', '100K Users', '1M Users'],
    datasets: [
      {
        label: 'Response Time (ms)',
        data: [45, 52, 68, 95, 145, 280],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      },
      {
        label: 'Success Rate (%)',
        data: [99.9, 99.8, 99.7, 99.5, 99.2, 98.8],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };

  // Resource optimization results
  const resourceOptimizationData = {
    labels: ['CPU Usage', 'Memory Usage', 'Network I/O', 'Disk I/O', 'GPU Utilization', 'Cache Hit Rate'],
    datasets: [
      {
        label: 'Before Optimization',
        data: [85, 78, 82, 75, 68, 60],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2
      },
      {
        label: 'After Optimization',
        data: [45, 52, 38, 42, 88, 92],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2
      }
    ]
  };

  // Algorithm comparison scatter plot
  const algorithmComparisonData = {
    datasets: algorithmBenchmarks.map((algo, index) => ({
      label: algo.algorithm,
      data: [{ x: algo.speed, y: algo.accuracy }],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)'
      ][index],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)',
        'rgb(139, 92, 246)'
      ][index],
      pointRadius: 8,
      pointHoverRadius: 10
    }))
  };

  // Performance benchmarking table data
  const benchmarkResults = [
    {
      metric: 'Image Classification',
      ourSystem: '94.8%',
      industry: '91.2%',
      improvement: '+3.6%',
      status: 'excellent'
    },
    {
      metric: 'Natural Language Processing',
      ourSystem: '96.2%',
      industry: '92.8%',
      improvement: '+3.4%',
      status: 'excellent'
    },
    {
      metric: 'Recommendation Accuracy',
      ourSystem: '89.7%',
      industry: '85.3%',
      improvement: '+4.4%',
      status: 'good'
    },
    {
      metric: 'Response Time (ms)',
      ourSystem: '72ms',
      industry: '145ms',
      improvement: '-50.3%',
      status: 'excellent'
    },
    {
      metric: 'Throughput (req/sec)',
      ourSystem: '2,680',
      industry: '1,820',
      improvement: '+47.3%',
      status: 'excellent'
    },
    {
      metric: 'Resource Efficiency',
      ourSystem: '88%',
      industry: '67%',
      improvement: '+21%',
      status: 'good'
    }
  ];

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

  const multiAxisOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Accuracy (%)'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Response Time (ms)'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: 'linear' as const,
        display: false,
        position: 'right' as const,
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Avg Response Time',
            value: `${Math.round(realTimeMetrics.avgResponseTime)}ms`,
            target: '< 100ms',
            status: realTimeMetrics.avgResponseTime < 100 ? 'good' : 'warning',
            icon: '⚡'
          },
          {
            title: 'Throughput',
            value: `${Math.round(realTimeMetrics.throughput).toLocaleString()}`,
            target: '> 2,000 req/s',
            status: realTimeMetrics.throughput > 2000 ? 'good' : 'warning',
            icon: '🚀'
          },
          {
            title: 'CPU Utilization',
            value: `${Math.round(realTimeMetrics.cpuUtilization)}%`,
            target: '< 80%',
            status: realTimeMetrics.cpuUtilization < 80 ? 'good' : 'warning',
            icon: '💻'
          },
          {
            title: 'Memory Usage',
            value: `${Math.round(realTimeMetrics.memoryUsage)}%`,
            target: '< 70%',
            status: realTimeMetrics.memoryUsage < 70 ? 'good' : 'warning',
            icon: '🧠'
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
              <span className={`w-3 h-3 rounded-full ${
                metric.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'
              } animate-pulse`}></span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
            <p className="text-xs text-gray-600">Target: {metric.target}</p>
          </motion.div>
        ))}
      </div>

      {/* Category Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Technical Performance Benchmarks</h3>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="ml-algorithms">ML Algorithms</option>
              <option value="system-performance">System Performance</option>
              <option value="scalability">Scalability Tests</option>
              <option value="resource-optimization">Resource Optimization</option>
            </select>
            <select
              value={comparisonMode}
              onChange={(e) => setComparisonMode(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="industry">vs Industry</option>
              <option value="baseline">vs Baseline</option>
              <option value="competitors">vs Competitors</option>
            </select>
          </div>
        </div>

        <div className="h-96">
          {selectedCategory === 'ml-algorithms' && (
            <Line data={performanceTrendsData} options={multiAxisOptions} />
          )}
          {selectedCategory === 'system-performance' && (
            <Scatter 
              data={algorithmComparisonData} 
              options={{
                ...chartOptions,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Speed Score'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Accuracy (%)'
                    }
                  }
                }
              }} 
            />
          )}
          {selectedCategory === 'scalability' && (
            <Line data={scalabilityData} options={multiAxisOptions} />
          )}
          {selectedCategory === 'resource-optimization' && (
            <Radar data={resourceOptimizationData} options={{ ...chartOptions, scales: {} }} />
          )}
        </div>
      </motion.div>

      {/* Algorithm Comparison Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Algorithm Performance Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Algorithm</th>
                <th className="text-center py-3 px-4">Accuracy</th>
                <th className="text-center py-3 px-4">Speed</th>
                <th className="text-center py-3 px-4">Resource Usage</th>
                <th className="text-center py-3 px-4">Scalability</th>
                <th className="text-center py-3 px-4">Reliability</th>
                <th className="text-center py-3 px-4">Overall Score</th>
              </tr>
            </thead>
            <tbody>
              {algorithmBenchmarks.map((algo, index) => {
                const overallScore = (algo.accuracy + algo.speed + (100 - algo.resourceUsage) + algo.scalability + algo.reliability) / 5;
                return (
                  <motion.tr
                    key={algo.algorithm}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium">{algo.algorithm}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        algo.accuracy > 95 ? 'bg-green-100 text-green-800' :
                        algo.accuracy > 90 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {algo.accuracy}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mx-auto">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${algo.speed}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{algo.speed}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mx-auto">
                        <div 
                          className={`h-2 rounded-full ${
                            algo.resourceUsage < 70 ? 'bg-green-500' :
                            algo.resourceUsage < 85 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${algo.resourceUsage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{algo.resourceUsage}%</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mx-auto">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${algo.scalability}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{algo.scalability}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mx-auto">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${algo.reliability}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{algo.reliability}%</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-lg font-bold text-gray-900">
                        {overallScore.toFixed(1)}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Benchmark Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance vs Industry Benchmarks</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {benchmarkResults.map((result, index) => (
              <motion.div
                key={result.metric}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{result.metric}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-600">Our System: <span className="font-semibold text-blue-600">{result.ourSystem}</span></span>
                    <span className="text-sm text-gray-600">Industry: <span className="font-semibold">{result.industry}</span></span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${
                    result.status === 'excellent' ? 'text-green-600' :
                    result.status === 'good' ? 'text-blue-600' : 'text-yellow-600'
                  }`}>
                    {result.improvement}
                  </span>
                  <div className={`w-16 h-2 rounded-full mt-1 ${
                    result.status === 'excellent' ? 'bg-green-500' :
                    result.status === 'good' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Performance Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Average Improvement:</span>
                <span className="font-bold text-green-600">+28.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Metrics Exceeding Industry:</span>
                <span className="font-bold text-blue-600">6/6 (100%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Performance Rating:</span>
                <span className="font-bold text-purple-600">Excellent</span>
              </div>
              <div className="mt-4 p-3 bg-white rounded-lg border">
                <p className="text-sm text-gray-700">
                  Our systems consistently outperform industry benchmarks across all key metrics, 
                  demonstrating superior technical implementation and optimization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TechnicalPerformanceBenchmarks;