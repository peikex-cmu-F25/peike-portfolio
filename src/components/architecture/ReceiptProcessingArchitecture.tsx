import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

interface ProcessingStage {
  id: string;
  name: string;
  type: 'input' | 'vision' | 'ai' | 'processing' | 'output';
  x: number;
  y: number;
  description: string;
  accuracy?: number;
  processingTime?: string;
  technologies: string[];
  agents?: string[];
}

interface ProcessingFlow {
  source: string;
  target: string;
  label: string;
  dataType: 'image' | 'text' | 'structured' | 'recipes' | 'nutrition';
  confidence: number; // 0-1 for visual representation
}

const ReceiptProcessingArchitecture: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedStage, setSelectedStage] = useState<ProcessingStage | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [showAccuracy, setShowAccuracy] = useState(true);
  const [simulationStep, setSimulationStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const processingStages: ProcessingStage[] = [
    {
      id: 'receipt-upload',
      name: 'Receipt Upload',
      type: 'input',
      x: 100,
      y: 400,
      description: 'Multi-format receipt upload with validation and preprocessing for various supermarket layouts',
      accuracy: 98,
      processingTime: 'Instant',
      technologies: ['React Dropzone', 'File Validation', 'Image Preprocessing'],
      agents: []
    },
    {
      id: 'ocr-engine',
      name: 'OCR Engine',
      type: 'vision',
      x: 300,
      y: 300,
      description: 'Advanced optical character recognition optimized for receipt formats with noise reduction',
      accuracy: 89,
      processingTime: '2-3s',
      technologies: ['Tesseract', 'OpenCV', 'Image Enhancement', 'Text Detection'],
      agents: ['Text Extraction Agent']
    },
    {
      id: 'layout-analyzer',
      name: 'Layout Analyzer',
      type: 'vision',
      x: 300,
      y: 500,
      description: 'Computer vision model for understanding receipt structure and extracting item boundaries',
      accuracy: 85,
      processingTime: '1-2s',
      technologies: ['Computer Vision', 'Layout Detection', 'Bounding Box', 'Pattern Recognition'],
      agents: ['Structure Analysis Agent']
    },
    {
      id: 'text-processor',
      name: 'Text Processing Agent',
      type: 'ai',
      x: 500,
      y: 200,
      description: 'NLP agent for cleaning, normalizing and structuring extracted text data',
      accuracy: 92,
      processingTime: '500ms',
      technologies: ['Claude API', 'NLP', 'Text Normalization', 'Entity Recognition'],
      agents: ['Text Cleaning Agent', 'Data Validation Agent']
    },
    {
      id: 'item-extraction',
      name: 'Item Extraction Agent',
      type: 'ai',
      x: 500,
      y: 400,
      description: 'Intelligent parsing of grocery items with quantity, price, and category classification',
      accuracy: 82,
      processingTime: '1-2s',
      technologies: ['Claude API', 'Pattern Matching', 'Price Extraction', 'Category Classification'],
      agents: ['Item Parser Agent', 'Price Extraction Agent', 'Category Classifier Agent']
    },
    {
      id: 'ingredient-mapper',
      name: 'Ingredient Mapping Agent',
      type: 'ai',
      x: 700,
      y: 300,
      description: 'Multi-agent system mapping grocery items to cooking ingredients with nutritional data',
      accuracy: 88,
      processingTime: '2-3s',
      technologies: ['Claude API', 'Food Database', 'Nutritional Analysis', 'Ingredient Taxonomy'],
      agents: ['Food Mapper Agent', 'Nutrition Agent', 'Ingredient Standardizer']
    },
    {
      id: 'recipe-generator',
      name: 'Recipe Generation Agent',
      type: 'ai',
      x: 900,
      y: 200,
      description: 'Creative AI agent generating personalized recipes based on available ingredients',
      accuracy: 85,
      processingTime: '3-5s',
      technologies: ['Claude API', 'Recipe Database', 'Dietary Preferences', 'Cooking Instructions'],
      agents: ['Recipe Creator Agent', 'Dietary Filter Agent', 'Instruction Generator']
    },
    {
      id: 'meal-planner',
      name: 'Meal Planning Agent',
      type: 'ai',
      x: 900,
      y: 400,
      description: 'Strategic planning agent optimizing meal schedules and minimizing food waste',
      accuracy: 91,
      processingTime: '2-4s',
      technologies: ['Claude API', 'Optimization Algorithms', 'Preference Learning', 'Calendar Integration'],
      agents: ['Schedule Optimizer', 'Waste Minimizer Agent', 'Preference Agent']
    },
    {
      id: 'nutrition-analyzer',
      name: 'Nutrition Analysis',
      type: 'processing',
      x: 700,
      y: 500,
      description: 'Comprehensive nutritional analysis with health recommendations and dietary tracking',
      accuracy: 94,
      processingTime: '1s',
      technologies: ['Nutritional Database', 'Health Algorithms', 'Dietary Guidelines', 'Goal Tracking'],
      agents: ['Nutrition Calculator', 'Health Advisor Agent']
    },
    {
      id: 'shopping-optimizer',
      name: 'Shopping Optimizer',
      type: 'processing',
      x: 500,
      y: 600,
      description: 'Reverse meal planning generating optimized shopping lists based on meal selections',
      accuracy: 87,
      processingTime: '1-2s',
      technologies: ['Optimization Engine', 'Price Comparison', 'Store Layouts', 'Budget Planning'],
      agents: ['List Generator Agent', 'Price Optimizer']
    },
    {
      id: 'dashboard',
      name: 'Interactive Dashboard',
      type: 'output',
      x: 1050,
      y: 350,
      description: 'Comprehensive dashboard displaying recipes, meal plans, nutrition insights, and shopping lists',
      accuracy: 96,
      processingTime: 'Real-time',
      technologies: ['React', 'Chart.js', 'Real-time Updates', 'Mobile Responsive'],
      agents: []
    }
  ];

  const processingFlows: ProcessingFlow[] = [
    { source: 'receipt-upload', target: 'ocr-engine', label: 'Raw Receipt Image', dataType: 'image', confidence: 0.98 },
    { source: 'receipt-upload', target: 'layout-analyzer', label: 'Receipt Layout', dataType: 'image', confidence: 0.95 },
    { source: 'ocr-engine', target: 'text-processor', label: 'Raw Text Data', dataType: 'text', confidence: 0.89 },
    { source: 'layout-analyzer', target: 'item-extraction', label: 'Item Boundaries', dataType: 'structured', confidence: 0.85 },
    { source: 'text-processor', target: 'item-extraction', label: 'Clean Text', dataType: 'text', confidence: 0.92 },
    { source: 'item-extraction', target: 'ingredient-mapper', label: 'Grocery Items', dataType: 'structured', confidence: 0.82 },
    { source: 'ingredient-mapper', target: 'recipe-generator', label: 'Ingredients List', dataType: 'structured', confidence: 0.88 },
    { source: 'ingredient-mapper', target: 'nutrition-analyzer', label: 'Nutritional Data', dataType: 'structured', confidence: 0.88 },
    { source: 'recipe-generator', target: 'meal-planner', label: 'Recipe Options', dataType: 'recipes', confidence: 0.85 },
    { source: 'meal-planner', target: 'shopping-optimizer', label: 'Meal Schedule', dataType: 'structured', confidence: 0.91 },
    { source: 'nutrition-analyzer', target: 'dashboard', label: 'Health Insights', dataType: 'nutrition', confidence: 0.94 },
    { source: 'recipe-generator', target: 'dashboard', label: 'Generated Recipes', dataType: 'recipes', confidence: 0.85 },
    { source: 'meal-planner', target: 'dashboard', label: 'Meal Plans', dataType: 'structured', confidence: 0.91 },
    { source: 'shopping-optimizer', target: 'dashboard', label: 'Shopping Lists', dataType: 'structured', confidence: 0.87 }
  ];

  const stageTypeColors = {
    input: '#3B82F6',
    vision: '#8B5CF6',
    ai: '#EF4444',
    processing: '#F59E0B',
    output: '#10B981'
  };

  const dataTypeColors = {
    image: '#EC4899',
    text: '#3B82F6',
    structured: '#10B981',
    recipes: '#F59E0B',
    nutrition: '#8B5CF6'
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.max(1000, rect.width - 32),
          height: 800
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        setSimulationStep((prev) => (prev + 1) % processingFlows.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg.append('g');
    
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 1.5])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Add animated background
    const defs = svg.append('defs');
    
    // Gradient for processing flow
    const gradient = defs.append('linearGradient')
      .attr('id', 'flow-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3B82F6')
      .attr('stop-opacity', 0.8);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#10B981')
      .attr('stop-opacity', 0.8);

    // Create processing pipeline background
    const pipeline = g.append('rect')
      .attr('x', 50)
      .attr('y', 100)
      .attr('width', 1100)
      .attr('height', 600)
      .attr('fill', 'none')
      .attr('stroke', '#374151')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '10,5')
      .attr('rx', 20)
      .attr('opacity', 0.3);

    // Add pipeline stage labels
    const stageLabels = ['Input', 'Computer Vision', 'Multi-Agent AI', 'Analytics', 'Output'];
    const stagePositions = [150, 300, 600, 800, 1050];
    
    stagePositions.forEach((x, i) => {
      g.append('text')
        .attr('x', x)
        .attr('y', 130)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', '#9CA3AF')
        .text(stageLabels[i]);
    });

    // Create arrow markers for different data types
    Object.entries(dataTypeColors).forEach(([type, color]) => {
      defs.append('marker')
        .attr('id', `arrow-${type}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 8)
        .attr('refY', 0)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', color);
    });

    // Draw processing flows with confidence-based styling
    const flows = g.selectAll('.flow')
      .data(processingFlows)
      .join('g')
      .attr('class', 'flow');

    flows.each(function(d, i) {
      const sourceStage = processingStages.find(s => s.id === d.source)!;
      const targetStage = processingStages.find(s => s.id === d.target)!;

      const midX = (sourceStage.x + targetStage.x) / 2;
      const midY = (sourceStage.y + targetStage.y) / 2;
      
      // Create curved path
      const path = d3.path();
      const controlY = midY - Math.abs(sourceStage.x - targetStage.x) * 0.2;
      path.moveTo(sourceStage.x, sourceStage.y);
      path.quadraticCurveTo(midX, controlY, targetStage.x, targetStage.y);

      const flowLine = d3.select(this)
        .append('path')
        .attr('d', path.toString())
        .attr('fill', 'none')
        .attr('stroke', dataTypeColors[d.dataType])
        .attr('stroke-width', 2 + d.confidence * 2)
        .attr('marker-end', `url(#arrow-${d.dataType})`)
        .attr('opacity', isSimulating && i === simulationStep ? 1 : 0.4);

      // Add confidence indicator
      d3.select(this)
        .append('circle')
        .attr('cx', midX)
        .attr('cy', controlY)
        .attr('r', 4 + d.confidence * 6)
        .attr('fill', dataTypeColors[d.dataType])
        .attr('opacity', 0.6);

      // Flow label with confidence
      const labelGroup = d3.select(this).append('g');
      
      labelGroup.append('rect')
        .attr('x', midX - 30)
        .attr('y', controlY - 20)
        .attr('width', 60)
        .attr('height', 14)
        .attr('fill', '#1F2937')
        .attr('stroke', dataTypeColors[d.dataType])
        .attr('rx', 7)
        .attr('opacity', 0.9);

      labelGroup.append('text')
        .attr('x', midX)
        .attr('y', controlY - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', '9px')
        .attr('fill', '#E5E7EB')
        .text(`${Math.round(d.confidence * 100)}%`);
    });

    // Draw processing stages
    const stageGroups = g.selectAll('.stage')
      .data(processingStages)
      .join('g')
      .attr('class', 'stage')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        setSelectedStage(selectedStage?.id === d.id ? null : d);
      })
      .on('mouseenter', function(event, d) {
        // Highlight connected flows
        flows.selectAll('path')
          .attr('opacity', (flowData: any) => 
            flowData.source === d.id || flowData.target === d.id ? 1 : 0.2
          );
        
        d3.select(this)
          .select('.stage-circle')
          .transition()
          .duration(200)
          .attr('r', 45)
          .attr('stroke-width', 4);
      })
      .on('mouseleave', function() {
        flows.selectAll('path')
          .attr('opacity', (d: any, i: number) => isSimulating && i === simulationStep ? 1 : 0.4);
        
        d3.select(this)
          .select('.stage-circle')
          .transition()
          .duration(200)
          .attr('r', 35)
          .attr('stroke-width', 2);
      });

    // Stage circles with accuracy-based styling
    stageGroups.append('circle')
      .attr('class', 'stage-circle')
      .attr('r', 35)
      .attr('fill', d => stageTypeColors[d.type])
      .attr('stroke', d => showAccuracy ? d3.interpolateRdYlGn((d.accuracy || 0) / 100) : '#E5E7EB')
      .attr('stroke-width', d => showAccuracy ? 4 : 2)
      .attr('opacity', 0.8);

    // Agent count indicator for AI stages
    stageGroups
      .filter(d => Boolean(d.agents && d.agents.length > 0))
      .append('circle')
      .attr('cx', 25)
      .attr('cy', -25)
      .attr('r', 10)
      .attr('fill', '#EF4444')
      .attr('stroke', '#FEE2E2')
      .attr('stroke-width', 2);

    stageGroups
      .filter(d => Boolean(d.agents && d.agents.length > 0))
      .append('text')
      .attr('x', 25)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', 'white')
      .text(d => d.agents!.length);

    // Stage names with word wrapping
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
          if ((currentLine + ' ' + word).length < 14) {
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

    // Accuracy badges
    if (showAccuracy) {
      stageGroups
        .filter(d => Boolean(d.accuracy))
        .append('g')
        .each(function(d) {
          const badge = d3.select(this);
          
          badge.append('rect')
            .attr('x', -15)
            .attr('y', 45)
            .attr('width', 30)
            .attr('height', 14)
            .attr('fill', d3.interpolateRdYlGn((d.accuracy || 0) / 100))
            .attr('rx', 7)
            .attr('opacity', 0.9);

          badge.append('text')
            .attr('x', 0)
            .attr('y', 55)
            .attr('text-anchor', 'middle')
            .attr('font-size', '9px')
            .attr('font-weight', 'bold')
            .attr('fill', 'white')
            .text(`${d.accuracy}%`);
        });
    }

    // Add comprehensive legend
    const legend = svg.append('g')
      .attr('class', 'comprehensive-legend')
      .attr('transform', 'translate(20, 20)');

    // Stage types legend
    legend.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('fill', '#E5E7EB')
      .text('Processing Stages');

    Object.entries(stageTypeColors).forEach(([type, color], index) => {
      const item = legend.append('g')
        .attr('transform', `translate(0, ${20 + index * 18})`);

      item.append('circle')
        .attr('cx', 8)
        .attr('cy', 0)
        .attr('r', 6)
        .attr('fill', color);

      item.append('text')
        .attr('x', 20)
        .attr('y', 4)
        .attr('font-size', '11px')
        .attr('fill', '#D1D5DB')
        .text(type.charAt(0).toUpperCase() + type.slice(1));
    });

    // Data types legend
    const dataLegend = legend.append('g')
      .attr('transform', 'translate(0, 120)');

    dataLegend.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('fill', '#E5E7EB')
      .text('Data Types');

    Object.entries(dataTypeColors).forEach(([type, color], index) => {
      const item = dataLegend.append('g')
        .attr('transform', `translate(0, ${20 + index * 18})`);

      item.append('line')
        .attr('x1', 2)
        .attr('y1', 0)
        .attr('x2', 14)
        .attr('y2', 0)
        .attr('stroke', color)
        .attr('stroke-width', 3)
        .attr('marker-end', `url(#arrow-${type})`);

      item.append('text')
        .attr('x', 20)
        .attr('y', 4)
        .attr('font-size', '11px')
        .attr('fill', '#D1D5DB')
        .text(type.charAt(0).toUpperCase() + type.slice(1));
    });

  }, [dimensions, showAccuracy, simulationStep, isSimulating, selectedStage]);

  return (
    <div className="w-full" ref={containerRef}>
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-300">Show Accuracy:</label>
          <button
            onClick={() => setShowAccuracy(!showAccuracy)}
            className={`px-3 py-1 rounded ${
              showAccuracy ? 'bg-green-500 text-white' : 'bg-slate-600 text-slate-300'
            }`}
          >
            {showAccuracy ? 'ON' : 'OFF'}
          </button>
        </div>
        
        <button
          onClick={() => {
            setIsSimulating(!isSimulating);
            if (!isSimulating) setSimulationStep(0);
          }}
          className={`px-4 py-2 rounded font-medium ${
            isSimulating ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isSimulating ? 'Stop Processing' : 'Start Processing Simulation'}
        </button>

        <div className="flex items-center gap-4 text-sm text-slate-300">
          <span>Overall Accuracy: <span className="text-green-400 font-semibold">82%</span></span>
          <span>Processing Time: <span className="text-blue-400 font-semibold">~10s</span></span>
          <span>AI Agents: <span className="text-red-400 font-semibold">15+</span></span>
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
              <div className="flex items-center gap-3 mt-2">
                <div className={`px-2 py-1 rounded text-sm text-white`} 
                     style={{ backgroundColor: stageTypeColors[selectedStage.type] }}>
                  {selectedStage.type.toUpperCase()}
                </div>
                {selectedStage.accuracy && (
                  <div className="px-2 py-1 rounded text-sm text-white bg-green-600">
                    {selectedStage.accuracy}% Accuracy
                  </div>
                )}
                {selectedStage.processingTime && (
                  <div className="px-2 py-1 rounded text-sm text-white bg-blue-600">
                    {selectedStage.processingTime}
                  </div>
                )}
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
          
          {selectedStage.agents && selectedStage.agents.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-slate-300 mb-2">AI Agents ({selectedStage.agents.length})</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedStage.agents.map((agent, index) => (
                  <div key={index} className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <span className="text-sm text-red-300">{agent}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-2">Technologies</h4>
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

      {/* Processing Highlights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
          <h4 className="font-semibold text-purple-400 mb-2">Computer Vision</h4>
          <p className="text-sm text-slate-300">82% receipt accuracy across diverse supermarket formats</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-lg border border-red-500/20">
          <h4 className="font-semibold text-red-400 mb-2">Multi-Agent AI</h4>
          <p className="text-sm text-slate-300">15+ specialized agents for intelligent food processing</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
          <h4 className="font-semibold text-green-400 mb-2">Waste Reduction</h4>
          <p className="text-sm text-slate-300">30% food waste reduction through smart meal planning</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
          <h4 className="font-semibold text-blue-400 mb-2">Time Savings</h4>
          <p className="text-sm text-slate-300">5+ hours weekly meal planning time saved per family</p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptProcessingArchitecture;