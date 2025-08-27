import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

interface ArchitectureNode {
  id: string;
  name: string;
  type: 'client' | 'api' | 'service' | 'database' | 'ai' | 'security';
  x: number;
  y: number;
  description: string;
  metrics?: {
    label: string;
    value: string;
    color: string;
  }[];
  technologies: string[];
}

interface ArchitectureFlow {
  source: string;
  target: string;
  label: string;
  type: 'data' | 'query' | 'response' | 'sync';
  animated: boolean;
}

const EnterpriseRAGArchitecture: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 600 });
  const [showMetrics, setShowMetrics] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  const nodes: ArchitectureNode[] = [
    {
      id: 'client',
      name: 'Enterprise Client',
      type: 'client',
      x: 100,
      y: 300,
      description: 'Secure enterprise interface for document queries and knowledge access',
      metrics: [
        { label: 'Response Time', value: '<200ms', color: '#10B981' },
        { label: 'Users', value: '500+', color: '#3B82F6' }
      ],
      technologies: ['React', 'TypeScript', 'JWT Auth']
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      type: 'api',
      x: 300,
      y: 300,
      description: 'AWS API Gateway with authentication, rate limiting, and request routing',
      metrics: [
        { label: 'Requests/sec', value: '1,000+', color: '#F59E0B' },
        { label: 'Uptime', value: '99.9%', color: '#10B981' }
      ],
      technologies: ['AWS API Gateway', 'Lambda Authorizer', 'CloudWatch']
    },
    {
      id: 'rag-service',
      name: 'RAG Processing Service',
      type: 'ai',
      x: 500,
      y: 200,
      description: 'Core RAG engine handling query processing, document retrieval, and response generation',
      metrics: [
        { label: 'Accuracy', value: '92%', color: '#10B981' },
        { label: 'Throughput', value: '100 queries/min', color: '#3B82F6' }
      ],
      technologies: ['Python', 'LangChain', 'Transformers', 'FastAPI']
    },
    {
      id: 'vector-db',
      name: 'Vector Database',
      type: 'database',
      x: 700,
      y: 150,
      description: 'OpenSearch cluster storing document embeddings with semantic search capabilities',
      metrics: [
        { label: 'Documents', value: '100K+', color: '#8B5CF6' },
        { label: 'Search Time', value: '<50ms', color: '#10B981' }
      ],
      technologies: ['OpenSearch', 'Vector Indexing', 'Elasticsearch']
    },
    {
      id: 'doc-processor',
      name: 'Document Processor',
      type: 'service',
      x: 500,
      y: 400,
      description: 'Intelligent document chunking and embedding generation service',
      metrics: [
        { label: 'Processing Speed', value: '50 docs/min', color: '#F59E0B' },
        { label: 'Chunk Accuracy', value: '95%', color: '#10B981' }
      ],
      technologies: ['Python', 'spaCy', 'PDF Parser', 'OCR']
    },
    {
      id: 'embedding-service',
      name: 'Embedding Service',
      type: 'ai',
      x: 700,
      y: 350,
      description: 'Transformer-based embedding generation with semantic understanding',
      metrics: [
        { label: 'Model Size', value: '768D', color: '#3B82F6' },
        { label: 'Similarity Precision', value: '89%', color: '#10B981' }
      ],
      technologies: ['Sentence-BERT', 'HuggingFace', 'CUDA']
    },
    {
      id: 'document-store',
      name: 'Document Store',
      type: 'database',
      x: 300,
      y: 500,
      description: 'Secure document storage with versioning and access control',
      metrics: [
        { label: 'Storage', value: '10TB+', color: '#8B5CF6' },
        { label: 'Retrieval Speed', value: '<100ms', color: '#10B981' }
      ],
      technologies: ['AWS S3', 'Encryption', 'Lifecycle Policies']
    },
    {
      id: 'security',
      name: 'Security Layer',
      type: 'security',
      x: 150,
      y: 150,
      description: 'Enterprise-grade security with encryption, audit logs, and compliance',
      metrics: [
        { label: 'Encryption', value: 'AES-256', color: '#EF4444' },
        { label: 'Compliance', value: 'SOC2', color: '#10B981' }
      ],
      technologies: ['AWS IAM', 'KMS', 'CloudTrail', 'WAF']
    }
  ];

  const flows: ArchitectureFlow[] = [
    { source: 'client', target: 'api-gateway', label: 'Query Request', type: 'query', animated: true },
    { source: 'api-gateway', target: 'rag-service', label: 'Authenticated Query', type: 'query', animated: true },
    { source: 'rag-service', target: 'vector-db', label: 'Semantic Search', type: 'query', animated: true },
    { source: 'vector-db', target: 'rag-service', label: 'Relevant Chunks', type: 'response', animated: true },
    { source: 'rag-service', target: 'api-gateway', label: 'Generated Response', type: 'response', animated: true },
    { source: 'api-gateway', target: 'client', label: 'Final Answer', type: 'response', animated: true },
    { source: 'doc-processor', target: 'embedding-service', label: 'Document Chunks', type: 'data', animated: false },
    { source: 'embedding-service', target: 'vector-db', label: 'Embeddings', type: 'data', animated: false },
    { source: 'document-store', target: 'doc-processor', label: 'Raw Documents', type: 'data', animated: false },
    { source: 'security', target: 'api-gateway', label: 'Auth & Policies', type: 'sync', animated: false },
  ];

  const nodeTypeColors = {
    client: '#3B82F6',
    api: '#F59E0B',
    service: '#8B5CF6',
    database: '#10B981',
    ai: '#EF4444',
    security: '#EC4899'
  };

  const flowTypeColors = {
    data: '#6B7280',
    query: '#3B82F6',
    response: '#10B981',
    sync: '#F59E0B'
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.max(800, rect.width - 32),
          height: 600
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

    // Create main group with zoom behavior
    const g = svg.append('g');
    
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Add background grid
    const defs = svg.append('defs');
    const pattern = defs.append('pattern')
      .attr('id', 'grid')
      .attr('width', 40)
      .attr('height', 40)
      .attr('patternUnits', 'userSpaceOnUse');

    pattern.append('path')
      .attr('d', 'M 40 0 L 0 0 0 40')
      .attr('fill', 'none')
      .attr('stroke', '#374151')
      .attr('stroke-width', 0.5)
      .attr('opacity', 0.3);

    g.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', 'url(#grid)');

    // Create arrow markers
    const arrowMarker = defs.append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 8)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto');

    arrowMarker.append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#6B7280');

    // Draw connections
    const connections = g.selectAll('.connection')
      .data(flows)
      .join('g')
      .attr('class', 'connection');

    connections.each(function(d) {
      const sourceNode = nodes.find(n => n.id === d.source)!;
      const targetNode = nodes.find(n => n.id === d.target)!;

      const line = d3.select(this)
        .append('line')
        .attr('x1', sourceNode.x)
        .attr('y1', sourceNode.y)
        .attr('x2', targetNode.x)
        .attr('y2', targetNode.y)
        .attr('stroke', flowTypeColors[d.type])
        .attr('stroke-width', d.animated ? 3 : 2)
        .attr('marker-end', 'url(#arrowhead)')
        .attr('opacity', 0.7);

      // Add animation for active flows
      if (d.animated) {
        line.attr('stroke-dasharray', '5,5')
          .attr('stroke-dashoffset', 0)
          .append('animate')
          .attr('attributeName', 'stroke-dashoffset')
          .attr('values', '0;-10')
          .attr('dur', `${2 / animationSpeed}s`)
          .attr('repeatCount', 'indefinite');
      }

      // Add flow labels
      const midX = (sourceNode.x + targetNode.x) / 2;
      const midY = (sourceNode.y + targetNode.y) / 2;

      d3.select(this)
        .append('rect')
        .attr('x', midX - 40)
        .attr('y', midY - 10)
        .attr('width', 80)
        .attr('height', 20)
        .attr('fill', '#1F2937')
        .attr('stroke', flowTypeColors[d.type])
        .attr('stroke-width', 1)
        .attr('rx', 10)
        .attr('opacity', 0.9);

      d3.select(this)
        .append('text')
        .attr('x', midX)
        .attr('y', midY + 4)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('fill', '#E5E7EB')
        .text(d.label);
    });

    // Draw nodes
    const nodeGroups = g.selectAll('.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        setSelectedNode(selectedNode?.id === d.id ? null : d);
      })
      .on('mouseenter', function() {
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', 35)
          .attr('stroke-width', 3);
      })
      .on('mouseleave', function() {
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', 30)
          .attr('stroke-width', 2);
      });

    // Node circles
    nodeGroups.append('circle')
      .attr('r', 30)
      .attr('fill', d => nodeTypeColors[d.type])
      .attr('stroke', '#E5E7EB')
      .attr('stroke-width', 2)
      .attr('opacity', 0.8);

    // Node labels
    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', 5)
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', 'white')
      .text(d => d.name.split(' ')[0]);

    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', 18)
      .attr('font-size', '10px')
      .attr('fill', 'white')
      .text(d => d.name.split(' ').slice(1).join(' '));

    // Performance metrics overlay
    if (showMetrics) {
      nodeGroups
        .filter(d => Boolean(d.metrics && d.metrics.length > 0))
        .append('g')
        .attr('class', 'metrics')
        .each(function(d) {
          if (!d.metrics) return;
          
          const metricsGroup = d3.select(this);
          
          d.metrics.forEach((metric, i) => {
            const rect = metricsGroup.append('rect')
              .attr('x', -25)
              .attr('y', 40 + i * 20)
              .attr('width', 50)
              .attr('height', 16)
              .attr('fill', metric.color)
              .attr('rx', 8)
              .attr('opacity', 0.9);

            metricsGroup.append('text')
              .attr('x', 0)
              .attr('y', 52 + i * 20)
              .attr('text-anchor', 'middle')
              .attr('font-size', '9px')
              .attr('font-weight', 'bold')
              .attr('fill', 'white')
              .text(metric.value);
          });
        });
    }

    // Add legends
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(20, 20)`);

    const legendData = [
      { type: 'Node Types', items: Object.entries(nodeTypeColors).map(([key, color]) => ({ label: key, color })) },
      { type: 'Flow Types', items: Object.entries(flowTypeColors).map(([key, color]) => ({ label: key, color })) }
    ];

    legendData.forEach((section, sectionIndex) => {
      const sectionGroup = legend.append('g')
        .attr('transform', `translate(0, ${sectionIndex * 120})`);

      sectionGroup.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('fill', '#E5E7EB')
        .text(section.type);

      section.items.forEach((item, index) => {
        const itemGroup = sectionGroup.append('g')
          .attr('transform', `translate(0, ${20 + index * 20})`);

        itemGroup.append('circle')
          .attr('cx', 8)
          .attr('cy', 0)
          .attr('r', 6)
          .attr('fill', item.color);

        itemGroup.append('text')
          .attr('x', 20)
          .attr('y', 4)
          .attr('font-size', '12px')
          .attr('fill', '#D1D5DB')
          .text(item.label);
      });
    });

  }, [dimensions, showMetrics, animationSpeed, selectedNode]);

  return (
    <div className="w-full" ref={containerRef}>
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-300">Show Metrics:</label>
          <button
            onClick={() => setShowMetrics(!showMetrics)}
            className={`px-3 py-1 rounded ${
              showMetrics ? 'bg-cyan-500 text-white' : 'bg-slate-600 text-slate-300'
            }`}
          >
            {showMetrics ? 'ON' : 'OFF'}
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-300">Animation Speed:</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
            className="w-20"
          />
          <span className="text-sm text-slate-300">{animationSpeed}x</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-300">
            Processing: <span className="text-green-400">100+ docs</span> |
            Accuracy: <span className="text-green-400">92%</span> |
            Response: <span className="text-green-400">&lt;200ms</span>
          </span>
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

      {/* Node Details Panel */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 bg-slate-800/80 rounded-lg border border-slate-600"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">{selectedNode.name}</h3>
              <div className={`inline-block px-2 py-1 rounded text-sm text-white mt-2`} 
                   style={{ backgroundColor: nodeTypeColors[selectedNode.type] }}>
                {selectedNode.type.toUpperCase()}
              </div>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-slate-400 hover:text-white text-xl"
            >
              ×
            </button>
          </div>
          
          <p className="text-slate-300 mb-4">{selectedNode.description}</p>
          
          {selectedNode.metrics && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-slate-300 mb-2">Performance Metrics</h4>
              <div className="flex flex-wrap gap-3">
                {selectedNode.metrics.map((metric, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: metric.color }}
                    ></div>
                    <span className="text-sm text-slate-300">{metric.label}: </span>
                    <span className="text-sm font-semibold text-white">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {selectedNode.technologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Architecture Highlights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
          <h4 className="font-semibold text-green-400 mb-2">High Performance</h4>
          <p className="text-sm text-slate-300">Sub-200ms query responses with 92% contextual accuracy</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
          <h4 className="font-semibold text-blue-400 mb-2">Enterprise Security</h4>
          <p className="text-sm text-slate-300">SOC2 compliant with end-to-end encryption and audit trails</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
          <h4 className="font-semibold text-purple-400 mb-2">Auto-Scaling</h4>
          <p className="text-sm text-slate-300">Serverless architecture handling 100K+ documents seamlessly</p>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseRAGArchitecture;