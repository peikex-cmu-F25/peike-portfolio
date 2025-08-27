import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

interface MLPipelineStage {
  id: string;
  name: string;
  type: 'input' | 'processing' | 'algorithm' | 'output' | 'feedback';
  x: number;
  y: number;
  description: string;
  metrics?: {
    label: string;
    value: string;
    color: string;
  }[];
  technologies: string[];
  complexity: 'low' | 'medium' | 'high';
}

interface DataFlow {
  source: string;
  target: string;
  label: string;
  type: 'data' | 'prediction' | 'feedback' | 'validation';
  volume: number; // Affects line thickness
}

const PatientMatchingArchitecture: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedStage, setSelectedStage] = useState<MLPipelineStage | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 700 });
  const [showComplexity, setShowComplexity] = useState(true);
  const [simulationActive, setSimulationActive] = useState(false);

  const pipelineStages: MLPipelineStage[] = [
    {
      id: 'patient-data',
      name: 'Patient Database',
      type: 'input',
      x: 100,
      y: 150,
      description: '3,000+ patient profiles with medical history, preferences, and care requirements',
      metrics: [
        { label: 'Records', value: '3K+', color: '#3B82F6' },
        { label: 'Attributes', value: '50+', color: '#8B5CF6' },
        { label: 'Update Freq', value: 'Real-time', color: '#10B981' }
      ],
      technologies: ['PostgreSQL', 'Data Encryption', 'HIPAA Compliance'],
      complexity: 'medium'
    },
    {
      id: 'caregiver-profiles',
      name: 'Caregiver Profiles',
      type: 'input',
      x: 100,
      y: 350,
      description: 'Healthcare professional profiles with specializations, availability, and performance metrics',
      metrics: [
        { label: 'Caregivers', value: '500+', color: '#3B82F6' },
        { label: 'Specializations', value: '20+', color: '#F59E0B' },
        { label: 'Availability', value: '24/7', color: '#10B981' }
      ],
      technologies: ['React Dashboard', 'Real-time Updates', 'Skill Taxonomy'],
      complexity: 'medium'
    },
    {
      id: 'data-preprocessing',
      name: 'Data Preprocessing',
      type: 'processing',
      x: 300,
      y: 250,
      description: 'Feature engineering, normalization, and missing data imputation for ML-ready datasets',
      metrics: [
        { label: 'Feature Eng', value: '95% Complete', color: '#10B981' },
        { label: 'Clean Rate', value: '99.2%', color: '#10B981' },
        { label: 'Latency', value: '<100ms', color: '#06B6D4' }
      ],
      technologies: ['Pandas', 'NumPy', 'Feature Store', 'Data Validation'],
      complexity: 'high'
    },
    {
      id: 'svd-algorithm',
      name: 'SVD Matrix Factorization',
      type: 'algorithm',
      x: 500,
      y: 200,
      description: 'Collaborative filtering using Singular Value Decomposition for intelligent patient-caregiver matching',
      metrics: [
        { label: 'Accuracy', value: '75%', color: '#10B981' },
        { label: 'Matrix Rank', value: '128', color: '#8B5CF6' },
        { label: 'Training Time', value: '2.5min', color: '#F59E0B' }
      ],
      technologies: ['Scikit-learn', 'NumPy', 'Sparse Matrices', 'GPU Acceleration'],
      complexity: 'high'
    },
    {
      id: 'similarity-engine',
      name: 'Similarity Engine',
      type: 'algorithm',
      x: 500,
      y: 350,
      description: 'Cosine similarity and preference-based scoring for refined matching recommendations',
      metrics: [
        { label: 'Similarity Score', value: '0.89', color: '#10B981' },
        { label: 'Preference Weight', value: '0.75', color: '#3B82F6' },
        { label: 'Compute Time', value: '<50ms', color: '#06B6D4' }
      ],
      technologies: ['Cosine Similarity', 'Weighted Scoring', 'Preference Learning'],
      complexity: 'medium'
    },
    {
      id: 'recommendation-api',
      name: 'Recommendation API',
      type: 'output',
      x: 700,
      y: 200,
      description: 'RESTful API serving personalized patient-caregiver matches with confidence scores',
      metrics: [
        { label: 'Response Time', value: '<200ms', color: '#10B981' },
        { label: 'Throughput', value: '1K req/s', color: '#3B82F6' },
        { label: 'Availability', value: '99.9%', color: '#10B981' }
      ],
      technologies: ['Node.js', 'Express', 'Redis Cache', 'Load Balancer'],
      complexity: 'medium'
    },
    {
      id: 'matching-dashboard',
      name: 'Matching Dashboard',
      type: 'output',
      x: 700,
      y: 350,
      description: 'Interactive dashboard for healthcare coordinators to review and approve matches',
      metrics: [
        { label: 'User Satisfaction', value: '4.8/5', color: '#10B981' },
        { label: 'Decision Time', value: '60% Faster', color: '#06B6D4' },
        { label: 'Success Rate', value: '92%', color: '#10B981' }
      ],
      technologies: ['React', 'Chart.js', 'Real-time Updates', 'Mobile Responsive'],
      complexity: 'medium'
    },
    {
      id: 'feedback-loop',
      name: 'Feedback Loop',
      type: 'feedback',
      x: 400,
      y: 500,
      description: 'Continuous learning system collecting match outcomes to improve algorithm performance',
      metrics: [
        { label: 'Feedback Rate', value: '85%', color: '#10B981' },
        { label: 'Model Updates', value: 'Weekly', color: '#F59E0B' },
        { label: 'Performance Gain', value: '+12%/month', color: '#06B6D4' }
      ],
      technologies: ['Online Learning', 'A/B Testing', 'Model Versioning', 'MLflow'],
      complexity: 'high'
    },
    {
      id: 'analytics-engine',
      name: 'Analytics Engine',
      type: 'processing',
      x: 900,
      y: 275,
      description: 'Advanced analytics for system performance monitoring and outcome prediction',
      metrics: [
        { label: 'Prediction Acc', value: '87%', color: '#10B981' },
        { label: 'Alerts', value: 'Real-time', color: '#EF4444' },
        { label: 'Reports', value: 'Daily', color: '#3B82F6' }
      ],
      technologies: ['Apache Spark', 'Time Series', 'Predictive Models', 'Alerting'],
      complexity: 'high'
    }
  ];

  const dataFlows: DataFlow[] = [
    { source: 'patient-data', target: 'data-preprocessing', label: 'Patient Features', type: 'data', volume: 3 },
    { source: 'caregiver-profiles', target: 'data-preprocessing', label: 'Caregiver Features', type: 'data', volume: 3 },
    { source: 'data-preprocessing', target: 'svd-algorithm', label: 'Clean Dataset', type: 'data', volume: 4 },
    { source: 'data-preprocessing', target: 'similarity-engine', label: 'Feature Vectors', type: 'data', volume: 3 },
    { source: 'svd-algorithm', target: 'recommendation-api', label: 'Match Predictions', type: 'prediction', volume: 4 },
    { source: 'similarity-engine', target: 'recommendation-api', label: 'Similarity Scores', type: 'prediction', volume: 3 },
    { source: 'recommendation-api', target: 'matching-dashboard', label: 'Ranked Matches', type: 'prediction', volume: 3 },
    { source: 'matching-dashboard', target: 'feedback-loop', label: 'Match Outcomes', type: 'feedback', volume: 2 },
    { source: 'feedback-loop', target: 'svd-algorithm', label: 'Model Updates', type: 'feedback', volume: 2 },
    { source: 'recommendation-api', target: 'analytics-engine', label: 'Usage Metrics', type: 'data', volume: 2 },
    { source: 'matching-dashboard', target: 'analytics-engine', label: 'Success Metrics', type: 'data', volume: 2 },
    { source: 'analytics-engine', target: 'feedback-loop', label: 'Performance Insights', type: 'validation', volume: 1 }
  ];

  const stageTypeColors = {
    input: '#3B82F6',
    processing: '#8B5CF6',
    algorithm: '#EF4444',
    output: '#10B981',
    feedback: '#F59E0B'
  };

  const flowTypeColors = {
    data: '#6B7280',
    prediction: '#3B82F6',
    feedback: '#F59E0B',
    validation: '#10B981'
  };

  const complexityColors = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444'
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.max(800, rect.width - 32),
          height: 700
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg.append('g');
    
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Add background pattern
    const defs = svg.append('defs');
    const pattern = defs.append('pattern')
      .attr('id', 'pipeline-grid')
      .attr('width', 50)
      .attr('height', 50)
      .attr('patternUnits', 'userSpaceOnUse');

    pattern.append('circle')
      .attr('cx', 25)
      .attr('cy', 25)
      .attr('r', 1)
      .attr('fill', '#374151')
      .attr('opacity', 0.4);

    g.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', 'url(#pipeline-grid)');

    // Create arrow markers for different flow types
    Object.entries(flowTypeColors).forEach(([type, color]) => {
      defs.append('marker')
        .attr('id', `arrow-${type}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 8)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', color);
    });

    // Draw data flows with varying thickness
    const flows = g.selectAll('.flow')
      .data(dataFlows)
      .join('g')
      .attr('class', 'flow');

    flows.each(function(d) {
      const sourceStage = pipelineStages.find(s => s.id === d.source)!;
      const targetStage = pipelineStages.find(s => s.id === d.target)!;

      // Calculate control points for curved paths
      const midX = (sourceStage.x + targetStage.x) / 2;
      const midY = (sourceStage.y + targetStage.y) / 2;
      const curve = Math.abs(sourceStage.x - targetStage.x) * 0.3;

      const path = d3.path();
      path.moveTo(sourceStage.x, sourceStage.y);
      path.quadraticCurveTo(midX, midY - curve, targetStage.x, targetStage.y);

      const flowLine = d3.select(this)
        .append('path')
        .attr('d', path.toString())
        .attr('fill', 'none')
        .attr('stroke', flowTypeColors[d.type])
        .attr('stroke-width', d.volume)
        .attr('marker-end', `url(#arrow-${d.type})`)
        .attr('opacity', 0.7);

      // Add animation for simulation
      if (simulationActive) {
        const totalLength = flowLine.node()!.getTotalLength();
        flowLine
          .attr('stroke-dasharray', `${totalLength * 0.1} ${totalLength * 0.9}`)
          .attr('stroke-dashoffset', totalLength)
          .transition()
          .duration(2000)
          .ease(d3.easeLinear)
          .attr('stroke-dashoffset', 0)
          .on('end', function() {
            d3.select(this).attr('stroke-dasharray', 'none');
          });
      }

      // Add flow label
      d3.select(this)
        .append('text')
        .attr('x', midX)
        .attr('y', midY - curve - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('fill', '#D1D5DB')
        .attr('opacity', 0.8)
        .text(d.label);
    });

    // Draw pipeline stages
    const stageGroups = g.selectAll('.stage')
      .data(pipelineStages)
      .join('g')
      .attr('class', 'stage')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        setSelectedStage(selectedStage?.id === d.id ? null : d);
      })
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .select('.stage-circle')
          .transition()
          .duration(200)
          .attr('r', 45)
          .attr('stroke-width', 3);
      })
      .on('mouseleave', function() {
        d3.select(this)
          .select('.stage-circle')
          .transition()
          .duration(200)
          .attr('r', 40)
          .attr('stroke-width', 2);
      });

    // Stage circles with complexity indicators
    stageGroups.append('circle')
      .attr('class', 'stage-circle')
      .attr('r', 40)
      .attr('fill', d => stageTypeColors[d.type])
      .attr('stroke', d => showComplexity ? complexityColors[d.complexity] : '#E5E7EB')
      .attr('stroke-width', d => showComplexity ? 4 : 2)
      .attr('opacity', 0.8);

    // Stage names
    stageGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', -5)
      .attr('font-size', '11px')
      .attr('font-weight', 'bold')
      .attr('fill', 'white')
      .each(function(d) {
        const words = d.name.split(' ');
        const lines = [];
        let currentLine = '';
        
        words.forEach(word => {
          if (currentLine.length + word.length < 12) {
            currentLine += (currentLine ? ' ' : '') + word;
          } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
          }
        });
        if (currentLine) lines.push(currentLine);
        
        lines.forEach((line, i) => {
          d3.select(this).append('tspan')
            .attr('x', 0)
            .attr('dy', i === 0 ? 0 : 12)
            .text(line);
        });
      });

    // Performance metrics for selected stages
    stageGroups
      .filter(d => Boolean(d.metrics && showComplexity))
      .append('g')
      .attr('class', 'metrics-mini')
      .each(function(d) {
        if (!d.metrics || d.metrics.length === 0) return;
        
        const key_metric = d.metrics[0];
        const badge = d3.select(this);
        
        badge.append('rect')
          .attr('x', -25)
          .attr('y', 50)
          .attr('width', 50)
          .attr('height', 16)
          .attr('fill', key_metric.color)
          .attr('rx', 8)
          .attr('opacity', 0.9);

        badge.append('text')
          .attr('x', 0)
          .attr('y', 62)
          .attr('text-anchor', 'middle')
          .attr('font-size', '9px')
          .attr('font-weight', 'bold')
          .attr('fill', 'white')
          .text(key_metric.value);
      });

    // Add ML Pipeline stages legend
    const legend = svg.append('g')
      .attr('class', 'ml-legend')
      .attr('transform', 'translate(20, 20)');

    const legendItems = [
      { label: 'Input Layer', color: stageTypeColors.input },
      { label: 'Processing', color: stageTypeColors.processing },
      { label: 'ML Algorithm', color: stageTypeColors.algorithm },
      { label: 'Output Layer', color: stageTypeColors.output },
      { label: 'Feedback Loop', color: stageTypeColors.feedback }
    ];

    legend.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('fill', '#E5E7EB')
      .text('ML Pipeline Components');

    legendItems.forEach((item, index) => {
      const itemGroup = legend.append('g')
        .attr('transform', `translate(0, ${20 + index * 18})`);

      itemGroup.append('circle')
        .attr('cx', 8)
        .attr('cy', 0)
        .attr('r', 6)
        .attr('fill', item.color);

      itemGroup.append('text')
        .attr('x', 20)
        .attr('y', 4)
        .attr('font-size', '11px')
        .attr('fill', '#D1D5DB')
        .text(item.label);
    });

    // Add complexity legend if shown
    if (showComplexity) {
      const complexityLegend = legend.append('g')
        .attr('transform', 'translate(0, 130)');

      complexityLegend.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', '#E5E7EB')
        .text('Complexity');

      Object.entries(complexityColors).forEach(([level, color], index) => {
        const item = complexityLegend.append('g')
          .attr('transform', `translate(0, ${15 + index * 15})`);

        item.append('circle')
          .attr('cx', 6)
          .attr('cy', 0)
          .attr('r', 4)
          .attr('fill', 'none')
          .attr('stroke', color)
          .attr('stroke-width', 2);

        item.append('text')
          .attr('x', 16)
          .attr('y', 3)
          .attr('font-size', '10px')
          .attr('fill', '#D1D5DB')
          .text(level.charAt(0).toUpperCase() + level.slice(1));
      });
    }

  }, [dimensions, showComplexity, simulationActive, selectedStage]);

  return (
    <div className="w-full" ref={containerRef}>
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-300">Show Complexity:</label>
          <button
            onClick={() => setShowComplexity(!showComplexity)}
            className={`px-3 py-1 rounded ${
              showComplexity ? 'bg-cyan-500 text-white' : 'bg-slate-600 text-slate-300'
            }`}
          >
            {showComplexity ? 'ON' : 'OFF'}
          </button>
        </div>
        
        <button
          onClick={() => setSimulationActive(!simulationActive)}
          className={`px-4 py-2 rounded font-medium ${
            simulationActive ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {simulationActive ? 'Stop Simulation' : 'Run Data Flow Simulation'}
        </button>

        <div className="flex items-center gap-4 text-sm text-slate-300">
          <span>Accuracy: <span className="text-green-400 font-semibold">75%</span></span>
          <span>Patients: <span className="text-blue-400 font-semibold">3,000+</span></span>
          <span>Response: <span className="text-cyan-400 font-semibold">&lt;200ms</span></span>
        </div>
      </div>

      {/* Main SVG */}
      <div className="relative bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full"
        />
      </div>

      {/* Stage Details Panel */}
      {selectedStage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 bg-slate-800/80 rounded-lg border border-slate-600"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">{selectedStage.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className={`px-2 py-1 rounded text-sm text-white`} 
                     style={{ backgroundColor: stageTypeColors[selectedStage.type] }}>
                  {selectedStage.type.toUpperCase()}
                </div>
                <div className={`px-2 py-1 rounded text-xs text-white border-2`}
                     style={{ 
                       borderColor: complexityColors[selectedStage.complexity],
                       backgroundColor: 'transparent'
                     }}>
                  {selectedStage.complexity.toUpperCase()} COMPLEXITY
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedStage(null)}
              className="text-slate-400 hover:text-white text-xl"
            >
              ×
            </button>
          </div>
          
          <p className="text-slate-300 mb-4">{selectedStage.description}</p>
          
          {selectedStage.metrics && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-slate-300 mb-2">Key Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedStage.metrics.map((metric, index) => (
                  <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: metric.color }}
                      ></div>
                      <span className="text-sm text-slate-300">{metric.label}</span>
                    </div>
                    <div className="text-lg font-bold text-white">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-2">Implementation Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {selectedStage.technologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Algorithm Highlights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-lg border border-red-500/20">
          <h4 className="font-semibold text-red-400 mb-2">SVD Algorithm</h4>
          <p className="text-sm text-slate-300">75% matching accuracy using collaborative filtering with matrix factorization</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
          <h4 className="font-semibold text-green-400 mb-2">Real-time Processing</h4>
          <p className="text-sm text-slate-300">Sub-200ms response times for 3,000+ patient matching requests</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
          <h4 className="font-semibold text-blue-400 mb-2">Continuous Learning</h4>
          <p className="text-sm text-slate-300">85% feedback integration rate improving accuracy by 12% monthly</p>
        </div>
      </div>
    </div>
  );
};

export default PatientMatchingArchitecture;