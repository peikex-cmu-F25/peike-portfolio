import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';

interface ROIScenario {
  name: string;
  initialInvestment: number;
  monthlyOpex: number;
  monthlySavings: number;
  implementationMonths: number;
  riskFactor: number;
}

interface ROICalculationResult {
  breakEvenMonth: number;
  totalROI: number;
  netPresentValue: number;
  paybackPeriod: number;
  monthlyCashFlow: number[];
  cumulativeROI: number[];
}

const ProjectROICalculator: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState('conservative');
  const [customInputs, setCustomInputs] = useState({
    projectType: 'ai-automation',
    teamSize: 10,
    initialInvestment: 250000,
    monthlyOpex: 15000,
    monthlySavings: 45000,
    implementationMonths: 6,
    riskFactor: 0.15
  });

  const [roiResults, setROIResults] = useState<ROICalculationResult | null>(null);

  const predefinedScenarios: Record<string, ROIScenario> = {
    conservative: {
      name: 'Conservative AI Implementation',
      initialInvestment: 300000,
      monthlyOpex: 20000,
      monthlySavings: 35000,
      implementationMonths: 8,
      riskFactor: 0.2
    },
    moderate: {
      name: 'Moderate ML Platform',
      initialInvestment: 500000,
      monthlyOpex: 25000,
      monthlySavings: 75000,
      implementationMonths: 6,
      riskFactor: 0.15
    },
    aggressive: {
      name: 'Aggressive Digital Transformation',
      initialInvestment: 1000000,
      monthlyOpex: 40000,
      monthlySavings: 150000,
      implementationMonths: 12,
      riskFactor: 0.25
    }
  };

  const industryBenchmarks = {
    'ai-automation': { avgROI: 340, avgPayback: 14 },
    'ml-platform': { avgROI: 280, avgPayback: 18 },
    'data-pipeline': { avgROI: 220, avgPayback: 22 },
    'computer-vision': { avgROI: 420, avgPayback: 12 },
    'nlp-system': { avgROI: 380, avgPayback: 16 }
  };

  const calculateROI = (scenario: ROIScenario): ROICalculationResult => {
    const months = 36; // 3-year projection
    const discountRate = 0.08 / 12; // Monthly discount rate
    const monthlyCashFlow: number[] = [];
    const cumulativeROI: number[] = [];
    
    let cumulativeValue = -scenario.initialInvestment;
    let breakEvenMonth = -1;
    
    for (let month = 1; month <= months; month++) {
      let monthlyFlow;
      
      if (month <= scenario.implementationMonths) {
        // Implementation phase - costs only
        monthlyFlow = -scenario.monthlyOpex;
      } else {
        // Operations phase - savings minus ongoing costs
        monthlyFlow = scenario.monthlySavings - scenario.monthlyOpex;
        // Apply risk factor
        monthlyFlow *= (1 - scenario.riskFactor * Math.random() * 0.5);
      }
      
      monthlyCashFlow.push(monthlyFlow);
      cumulativeValue += monthlyFlow;
      cumulativeROI.push(cumulativeValue);
      
      if (breakEvenMonth === -1 && cumulativeValue > 0) {
        breakEvenMonth = month;
      }
    }
    
    const totalInvestment = scenario.initialInvestment + (scenario.monthlyOpex * scenario.implementationMonths);
    const totalSavings = monthlyCashFlow.slice(scenario.implementationMonths).reduce((sum, flow) => sum + Math.max(flow, 0), 0);
    const totalROI = ((totalSavings - totalInvestment) / totalInvestment) * 100;
    
    // Calculate NPV
    const npv = monthlyCashFlow.reduce((sum, flow, index) => {
      return sum + flow / Math.pow(1 + discountRate, index + 1);
    }, -scenario.initialInvestment);
    
    return {
      breakEvenMonth,
      totalROI,
      netPresentValue: npv,
      paybackPeriod: breakEvenMonth,
      monthlyCashFlow,
      cumulativeROI
    };
  };

  useEffect(() => {
    const scenario = selectedScenario === 'custom' 
      ? customInputs 
      : predefinedScenarios[selectedScenario];
    
    const results = calculateROI(scenario);
    setROIResults(results);
  }, [selectedScenario, customInputs]);

  const chartData = roiResults ? {
    labels: Array.from({ length: 36 }, (_, i) => `Month ${i + 1}`),
    datasets: [
      {
        label: 'Monthly Cash Flow',
        data: roiResults.monthlyCashFlow,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        type: 'line' as const,
        yAxisID: 'y'
      },
      {
        label: 'Cumulative ROI',
        data: roiResults.cumulativeROI,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        type: 'line' as const,
        yAxisID: 'y1'
      }
    ]
  } : null;

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
            return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Timeline (Months)'
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Cash Flow ($)'
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Cumulative Value ($)'
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        },
        grid: {
          drawOnChartArea: false,
        },
      }
    }
  };

  const riskAssessment = [
    { factor: 'Technical Complexity', risk: 'Medium', impact: 'High', mitigation: 'Phased implementation with POC' },
    { factor: 'Data Quality', risk: 'Low', impact: 'Medium', mitigation: 'Data validation and cleaning processes' },
    { factor: 'User Adoption', risk: 'Medium', impact: 'High', mitigation: 'Change management and training' },
    { factor: 'Integration Challenges', risk: 'High', impact: 'Medium', mitigation: 'API-first architecture' },
    { factor: 'Scalability Requirements', risk: 'Low', impact: 'Medium', mitigation: 'Cloud-native design' }
  ];

  return (
    <div className="space-y-6">
      {/* Scenario Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project ROI Calculator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Object.entries(predefinedScenarios).map(([key, scenario]) => (
            <button
              key={key}
              onClick={() => setSelectedScenario(key)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedScenario === key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h4 className="font-medium text-gray-900">{scenario.name}</h4>
              <p className="text-sm text-gray-500 mt-1">
                ${scenario.initialInvestment.toLocaleString()} investment
              </p>
              <p className="text-sm text-blue-600 mt-2">
                {scenario.implementationMonths} month timeline
              </p>
            </button>
          ))}
          <button
            onClick={() => setSelectedScenario('custom')}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selectedScenario === 'custom'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h4 className="font-medium text-gray-900">Custom Scenario</h4>
            <p className="text-sm text-gray-500 mt-1">Configure your parameters</p>
            <p className="text-sm text-purple-600 mt-2">Fully customizable</p>
          </button>
        </div>

        {/* Custom Input Form */}
        {selectedScenario === 'custom' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
              <select
                value={customInputs.projectType}
                onChange={(e) => setCustomInputs(prev => ({ ...prev, projectType: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="ai-automation">AI Automation</option>
                <option value="ml-platform">ML Platform</option>
                <option value="data-pipeline">Data Pipeline</option>
                <option value="computer-vision">Computer Vision</option>
                <option value="nlp-system">NLP System</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Initial Investment ($)</label>
              <input
                type="number"
                value={customInputs.initialInvestment}
                onChange={(e) => setCustomInputs(prev => ({ ...prev, initialInvestment: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly OpEx ($)</label>
              <input
                type="number"
                value={customInputs.monthlyOpex}
                onChange={(e) => setCustomInputs(prev => ({ ...prev, monthlyOpex: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Savings ($)</label>
              <input
                type="number"
                value={customInputs.monthlySavings}
                onChange={(e) => setCustomInputs(prev => ({ ...prev, monthlySavings: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Implementation (Months)</label>
              <input
                type="number"
                value={customInputs.implementationMonths}
                onChange={(e) => setCustomInputs(prev => ({ ...prev, implementationMonths: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Risk Factor (%)</label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={customInputs.riskFactor}
                onChange={(e) => setCustomInputs(prev => ({ ...prev, riskFactor: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ROI Results */}
      {roiResults && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Total ROI',
                value: `${roiResults.totalROI.toFixed(1)}%`,
                benchmark: `Industry Avg: ${industryBenchmarks[customInputs.projectType as keyof typeof industryBenchmarks].avgROI}%`,
                icon: '💰',
                color: roiResults.totalROI > 200 ? 'green' : roiResults.totalROI > 100 ? 'yellow' : 'red'
              },
              {
                title: 'Break-Even',
                value: `${roiResults.breakEvenMonth} months`,
                benchmark: `Industry Avg: ${industryBenchmarks[customInputs.projectType as keyof typeof industryBenchmarks].avgPayback} months`,
                icon: '⚡',
                color: roiResults.breakEvenMonth < 18 ? 'green' : roiResults.breakEvenMonth < 24 ? 'yellow' : 'red'
              },
              {
                title: 'Net Present Value',
                value: `$${roiResults.netPresentValue.toLocaleString()}`,
                benchmark: 'Risk-adjusted value',
                icon: '📈',
                color: roiResults.netPresentValue > 0 ? 'green' : 'red'
              },
              {
                title: 'Payback Period',
                value: `${roiResults.paybackPeriod} months`,
                benchmark: 'Time to profitability',
                icon: '⏱️',
                color: roiResults.paybackPeriod < 24 ? 'green' : 'yellow'
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
                    metric.color === 'green' ? 'bg-green-500' :
                    metric.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></span>
                </div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">{metric.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-xs text-gray-600">{metric.benchmark}</p>
              </motion.div>
            ))}
          </div>

          {/* ROI Projection Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI Projection (36 Months)</h3>
            <div className="h-96">
              {chartData && <Line data={chartData} options={chartOptions} />}
            </div>
          </motion.div>

          {/* Risk Assessment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment & Mitigation</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-4">Risk Factor</th>
                    <th className="text-left py-2 px-4">Risk Level</th>
                    <th className="text-left py-2 px-4">Business Impact</th>
                    <th className="text-left py-2 px-4">Mitigation Strategy</th>
                  </tr>
                </thead>
                <tbody>
                  {riskAssessment.map((risk, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">{risk.factor}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          risk.risk === 'Low' ? 'bg-green-100 text-green-800' :
                          risk.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {risk.risk}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          risk.impact === 'Low' ? 'bg-green-100 text-green-800' :
                          risk.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {risk.impact}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{risk.mitigation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default ProjectROICalculator;