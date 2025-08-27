import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radar, Bar, Line } from 'react-chartjs-2';

interface ProjectAssessment {
  complexity: number;
  dataMaturity: number;
  teamReadiness: number;
  budgetRange: number;
  timeline: number;
  riskTolerance: number;
}

interface EstimationResults {
  projectSize: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  estimatedCost: number;
  timelineWeeks: number;
  teamSize: number;
  successProbability: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  recommendations: string[];
}

const ConsultingOpportunityEstimator: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('healthcare');
  const [projectType, setProjectType] = useState('ai-implementation');
  const [assessment, setAssessment] = useState<ProjectAssessment>({
    complexity: 50,
    dataMaturity: 50,
    teamReadiness: 50,
    budgetRange: 50,
    timeline: 50,
    riskTolerance: 50
  });
  const [results, setResults] = useState<EstimationResults | null>(null);

  // Industry-specific multipliers and characteristics
  const industryFactors = {
    healthcare: { 
      riskMultiplier: 1.4, 
      complianceOverhead: 1.3, 
      avgBudget: 750000,
      adoptionRate: 0.78,
      regulatoryComplexity: 'High'
    },
    fintech: { 
      riskMultiplier: 1.6, 
      complianceOverhead: 1.5, 
      avgBudget: 950000,
      adoptionRate: 0.85,
      regulatoryComplexity: 'Very High'
    },
    retail: { 
      riskMultiplier: 1.1, 
      complianceOverhead: 1.1, 
      avgBudget: 450000,
      adoptionRate: 0.72,
      regulatoryComplexity: 'Medium'
    },
    manufacturing: { 
      riskMultiplier: 1.2, 
      complianceOverhead: 1.2, 
      avgBudget: 680000,
      adoptionRate: 0.68,
      regulatoryComplexity: 'Medium'
    },
    technology: { 
      riskMultiplier: 0.9, 
      complianceOverhead: 1.0, 
      avgBudget: 850000,
      adoptionRate: 0.92,
      regulatoryComplexity: 'Low'
    }
  };

  // Project type characteristics
  const projectTypeFactors = {
    'ai-implementation': { baseWeeks: 16, baseCost: 250000, complexity: 1.2 },
    'ml-platform': { baseWeeks: 24, baseCost: 450000, complexity: 1.5 },
    'computer-vision': { baseWeeks: 20, baseCost: 320000, complexity: 1.4 },
    'nlp-system': { baseWeeks: 18, baseCost: 380000, complexity: 1.3 },
    'data-pipeline': { baseWeeks: 14, baseCost: 180000, complexity: 1.0 },
    'full-digital-transformation': { baseWeeks: 36, baseCost: 1200000, complexity: 2.0 }
  };

  // Calculate estimation results
  useEffect(() => {
    const industryFactor = industryFactors[selectedIndustry as keyof typeof industryFactors];
    const projectFactor = projectTypeFactors[projectType as keyof typeof projectTypeFactors];
    
    // Calculate complexity score (0-100)
    const complexityScore = (
      assessment.complexity * 0.3 +
      (100 - assessment.dataMaturity) * 0.25 +
      (100 - assessment.teamReadiness) * 0.25 +
      (100 - assessment.riskTolerance) * 0.2
    );

    // Determine project size
    let projectSize: EstimationResults['projectSize'];
    if (assessment.budgetRange < 25) projectSize = 'Small';
    else if (assessment.budgetRange < 50) projectSize = 'Medium';
    else if (assessment.budgetRange < 75) projectSize = 'Large';
    else projectSize = 'Enterprise';

    // Calculate costs and timeline
    const baseCost = projectFactor.baseCost * (assessment.budgetRange / 50);
    const estimatedCost = baseCost * industryFactor.riskMultiplier * projectFactor.complexity;
    
    const baseWeeks = projectFactor.baseWeeks * (complexityScore / 50);
    const timelineWeeks = Math.round(baseWeeks * industryFactor.complianceOverhead);

    // Calculate team size
    const teamSize = Math.max(3, Math.round((estimatedCost / 100000) * 0.6));

    // Calculate success probability
    const successProbability = Math.max(60, Math.min(95, 
      95 - (complexityScore * 0.3) + (assessment.teamReadiness * 0.2) + (assessment.dataMaturity * 0.15)
    ));

    // Determine risk level
    let riskLevel: EstimationResults['riskLevel'];
    if (complexityScore < 40) riskLevel = 'Low';
    else if (complexityScore < 70) riskLevel = 'Medium';
    else riskLevel = 'High';

    // Generate recommendations
    const recommendations: string[] = [];
    if (assessment.dataMaturity < 40) {
      recommendations.push('Implement comprehensive data governance and quality assessment');
    }
    if (assessment.teamReadiness < 50) {
      recommendations.push('Invest in team training and change management programs');
    }
    if (complexityScore > 70) {
      recommendations.push('Consider phased implementation approach to reduce risk');
    }
    if (assessment.riskTolerance < 30) {
      recommendations.push('Develop robust testing and validation frameworks');
    }
    if (industryFactor.regulatoryComplexity === 'High' || industryFactor.regulatoryComplexity === 'Very High') {
      recommendations.push('Engage compliance and legal teams early in the process');
    }

    setResults({
      projectSize,
      estimatedCost: Math.round(estimatedCost),
      timelineWeeks,
      teamSize,
      successProbability: Math.round(successProbability),
      riskLevel,
      recommendations
    });
  }, [selectedIndustry, projectType, assessment]);

  // Assessment radar chart data
  const assessmentData = {
    labels: [
      'Technical Complexity',
      'Data Maturity',
      'Team Readiness',
      'Budget Availability',
      'Timeline Flexibility',
      'Risk Tolerance'
    ],
    datasets: [
      {
        label: 'Current Assessment',
        data: [
          assessment.complexity,
          assessment.dataMaturity,
          assessment.teamReadiness,
          assessment.budgetRange,
          assessment.timeline,
          assessment.riskTolerance
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)'
      },
      {
        label: 'Industry Benchmark',
        data: [65, 58, 62, 70, 55, 48],
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
        borderDash: [5, 5],
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#fff'
      }
    ]
  };

  // Cost breakdown visualization
  const costBreakdownData = results ? {
    labels: ['Development', 'Integration', 'Testing & QA', 'Training', 'Compliance', 'Contingency'],
    datasets: [{
      label: 'Cost Distribution',
      data: [
        Math.round(results.estimatedCost * 0.45),
        Math.round(results.estimatedCost * 0.20),
        Math.round(results.estimatedCost * 0.15),
        Math.round(results.estimatedCost * 0.10),
        Math.round(results.estimatedCost * 0.05),
        Math.round(results.estimatedCost * 0.05)
      ],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(156, 163, 175, 0.8)'
      ],
      borderColor: 'rgb(255, 255, 255)',
      borderWidth: 2
    }]
  } : null;

  // Timeline breakdown
  const timelineData = results ? {
    labels: ['Planning', 'Development', 'Integration', 'Testing', 'Deployment', 'Optimization'],
    datasets: [{
      label: 'Timeline (Weeks)',
      data: [
        Math.round(results.timelineWeeks * 0.15),
        Math.round(results.timelineWeeks * 0.40),
        Math.round(results.timelineWeeks * 0.20),
        Math.round(results.timelineWeeks * 0.15),
        Math.round(results.timelineWeeks * 0.05),
        Math.round(results.timelineWeeks * 0.05)
      ],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 2
    }]
  } : null;

  const handleAssessmentChange = (field: keyof ProjectAssessment, value: number) => {
    setAssessment(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Project Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Assessment & Configuration</h3>
        
        {/* Industry and Project Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry Sector</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="healthcare">Healthcare</option>
              <option value="fintech">Financial Services</option>
              <option value="retail">Retail & E-commerce</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="technology">Technology</option>
            </select>
            <p className="text-xs text-gray-600 mt-1">
              Industry: {industryFactors[selectedIndustry as keyof typeof industryFactors].regulatoryComplexity} regulatory complexity
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="ai-implementation">AI Implementation</option>
              <option value="ml-platform">ML Platform Development</option>
              <option value="computer-vision">Computer Vision System</option>
              <option value="nlp-system">NLP/Language Processing</option>
              <option value="data-pipeline">Data Pipeline & Analytics</option>
              <option value="full-digital-transformation">Full Digital Transformation</option>
            </select>
            <p className="text-xs text-gray-600 mt-1">
              Base timeline: {projectTypeFactors[projectType as keyof typeof projectTypeFactors].baseWeeks} weeks
            </p>
          </div>
        </div>

        {/* Assessment Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(assessment).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => handleAssessmentChange(key as keyof ProjectAssessment, Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span className="font-medium">{value}</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Assessment Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Assessment Profile</h3>
        <div className="h-80">
          <Radar 
            data={assessmentData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const
                }
              },
              scales: {
                r: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    stepSize: 20
                  }
                }
              }
            }}
          />
        </div>
      </motion.div>

      {/* Estimation Results */}
      {results && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Project Size',
                value: results.projectSize,
                subtitle: `${results.teamSize} person team`,
                icon: '📊',
                color: 'blue'
              },
              {
                title: 'Estimated Cost',
                value: `$${(results.estimatedCost / 1000).toFixed(0)}K`,
                subtitle: 'Total investment',
                icon: '💰',
                color: 'green'
              },
              {
                title: 'Timeline',
                value: `${results.timelineWeeks} weeks`,
                subtitle: `${Math.round(results.timelineWeeks / 4)} months`,
                icon: '⏱️',
                color: 'yellow'
              },
              {
                title: 'Success Probability',
                value: `${results.successProbability}%`,
                subtitle: results.riskLevel + ' risk',
                icon: '🎯',
                color: results.successProbability > 80 ? 'green' : results.successProbability > 65 ? 'yellow' : 'red'
              }
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{metric.icon}</span>
                  <span className={`w-3 h-3 rounded-full ${
                    metric.color === 'green' ? 'bg-green-500' :
                    metric.color === 'yellow' ? 'bg-yellow-500' :
                    metric.color === 'red' ? 'bg-red-500' : 'bg-blue-500'
                  }`}></span>
                </div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">{metric.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-xs text-gray-600">{metric.subtitle}</p>
              </motion.div>
            ))}
          </div>

          {/* Cost and Timeline Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
              <div className="h-64">
                {costBreakdownData && <Bar data={costBreakdownData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context: any) {
                          return `$${context.parsed.y.toLocaleString()}`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value: any) {
                          return '$' + (value / 1000).toFixed(0) + 'K';
                        }
                      }
                    }
                  }
                }} />}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline Breakdown</h3>
              <div className="h-64">
                {timelineData && <Bar data={timelineData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Weeks'
                      }
                    }
                  }
                }} />}
              </div>
            </motion.div>
          </div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Project Recommendations</h4>
                <div className="space-y-3">
                  {results.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <p className="text-sm text-gray-700">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Success Factors</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industry Experience:</span>
                    <span className="font-medium text-green-600">✓ Extensive</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Technical Capability:</span>
                    <span className="font-medium text-green-600">✓ Expert Level</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Risk Mitigation:</span>
                    <span className="font-medium text-green-600">✓ Proven Methods</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Track Record:</span>
                    <span className="font-medium text-green-600">✓ 98.5% Success</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white rounded border">
                  <p className="text-xs text-gray-600">
                    Based on {selectedIndustry} industry analysis and {results.projectSize.toLowerCase()} project benchmarks
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default ConsultingOpportunityEstimator;