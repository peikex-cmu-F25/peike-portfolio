import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

interface MicroserviceNode {
  id: string;
  name: string;
  type: 'gateway' | 'service' | 'database' | 'cache' | 'external' | 'frontend';
  x: number;
  y: number;
  description: string;
  scalability: 'low' | 'medium' | 'high';
  availability: number; // percentage
  technologies: string[];
  instances: number;
  load?: number; // 0-100 percentage
}

interface ServiceConnection {
  source: string;
  target: string;
  type: 'api' | 'data' | 'cache' | 'event' | 'auth';
  protocol: string;
  latency: string;
  throughput: string;
}

const EcommerceArchitecture: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<MicroserviceNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [showMetrics, setShowMetrics] = useState(true);
  const [loadSimulation, setLoadSimulation] = useState(false);
  const [simulationTime, setSimulationTime] = useState(0);

  const microservices: MicroserviceNode[] = [
    {
      id: 'frontend',
      name: 'React Frontend',
      type: 'frontend',
      x: 100,
      y: 200,
      description: 'Responsive React application with optimized user experience and PWA capabilities',
      scalability: 'high',
      availability: 99.9,
      technologies: ['React', 'Redux', 'PWA', 'Service Worker'],
      instances: 3,
      load: 65
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      type: 'gateway',
      x: 350,
      y: 200,
      description: 'Central API gateway handling authentication, rate limiting, and request routing',
      scalability: 'high',
      availability: 99.99,
      technologies: ['Spring Cloud Gateway', 'JWT', 'Rate Limiting', 'Circuit Breaker'],
      instances: 5,
      load: 42
    },
    {
      id: 'user-service',
      name: 'User Service',
      type: 'service',
      x: 550,
      y: 100,
      description: 'User management, authentication, profiles, and preference handling',
      scalability: 'medium',
      availability: 99.9,
      technologies: ['Spring Boot', 'JPA', 'OAuth2', 'BCrypt'],
      instances: 3,
      load: 35
    },
    {
      id: 'product-service',
      name: 'Product Catalog',
      type: 'service',
      x: 750,
      y: 150,
      description: 'Product information, categories, search, and inventory management',
      scalability: 'high',
      availability: 99.95,
      technologies: ['Spring Boot', 'Elasticsearch', 'JPA', 'Search API'],
      instances: 8,
      load: 78
    },
    {
      id: 'order-service',
      name: 'Order Service',
      type: 'service',
      x: 550,
      y: 300,
      description: 'Order processing, state management, and transaction coordination',
      scalability: 'high',
      availability: 99.99,
      technologies: ['Spring Boot', 'Saga Pattern', 'Event Sourcing', 'Kafka'],
      instances: 6,
      load: 58
    },
    {
      id: 'payment-service',
      name: 'Payment Service',
      type: 'service',
      x: 750,
      y: 350,
      description: 'Secure payment processing with multiple provider integrations',
      scalability: 'medium',
      availability: 99.99,
      technologies: ['Spring Boot', 'Stripe API', 'PayPal', 'PCI Compliance'],
      instances: 4,
      load: 23
    },
    {
      id: 'inventory-service',
      name: 'Inventory Service',
      type: 'service',
      x: 950,
      y: 200,
      description: 'Real-time inventory tracking and stock management across warehouses',
      scalability: 'medium',
      availability: 99.95,
      technologies: ['Spring Boot', 'Real-time Updates', 'Stock Algorithms'],
      instances: 4,
      load: 41
    },
    {
      id: 'notification-service',
      name: 'Notification Service',
      type: 'service',
      x: 350,
      y: 400,
      description: 'Multi-channel notifications including email, SMS, and push notifications',
      scalability: 'medium',
      availability: 99.9,
      technologies: ['Spring Boot', 'SendGrid', 'Firebase', 'RabbitMQ'],
      instances: 3,
      load: 29
    },
    {
      id: 'redis-cache',
      name: 'Redis Cache',
      type: 'cache',
      x: 550,
      y: 500,
      description: 'High-performance caching layer reducing database load and improving response times',
      scalability: 'high',
      availability: 99.99,
      technologies: ['Redis Cluster', 'Cache Aside', 'Session Store'],
      instances: 6,
      load: 52
    },
    {
      id: 'user-db',
      name: 'User Database',
      type: 'database',
      x: 750,
      y: 50,
      description: 'PostgreSQL database for user data with read replicas for scalability',
      scalability: 'medium',
      availability: 99.99,
      technologies: ['PostgreSQL', 'Read Replicas', 'Connection Pool'],
      instances: 3,
      load: 28
    },
    {
      id: 'product-db',
      name: 'Product Database',
      type: 'database',
      x: 950,
      y: 100,
      description: 'MongoDB for flexible product catalog with full-text search capabilities',
      scalability: 'high',
      availability: 99.95,
      technologies: ['MongoDB', 'Sharding', 'Text Indexes', 'GridFS'],
      instances: 8,
      load: 62
    },
    {
      id: 'order-db',
      name: 'Order Database',
      type: 'database',
      x: 750,
      y: 450,
      description: 'ACID-compliant PostgreSQL for critical order and transaction data',
      scalability: 'medium',
      availability: 99.999,
      technologies: ['PostgreSQL', 'ACID', 'Partitioning', 'Backup'],
      instances: 4,
      load: 45
    },
    {
      id: 'load-balancer',
      name: 'Load Balancer',
      type: 'gateway',
      x: 200,
      y: 100,
      description: 'HAProxy load balancer with health checks and automatic failover',
      scalability: 'high',
      availability: 99.99,
      technologies: ['HAProxy', 'Health Checks', 'Sticky Sessions', 'SSL'],
      instances: 2,
      load: 38
    },
    {
      id: 'cdn',
      name: 'CDN',
      type: 'external',
      x: 100,
      y: 350,
      description: 'CloudFlare CDN for static assets and global content delivery',
      scalability: 'high',
      availability: 99.99,
      technologies: ['CloudFlare', 'Edge Caching', 'DDoS Protection'],
      instances: 1,
      load: 15
    },
    {
      id: 'monitoring',
      name: 'Monitoring',
      type: 'external',
      x: 100,
      y: 500,
      description: 'Comprehensive monitoring with Prometheus, Grafana, and alerting',
      scalability: 'medium',
      availability: 99.9,
      technologies: ['Prometheus', 'Grafana', 'Alertmanager', 'Jaeger'],
      instances: 2,
      load: 18
    }
  ];

  const connections: ServiceConnection[] = [
    { source: 'frontend', target: 'load-balancer', type: 'api', protocol: 'HTTPS', latency: '<50ms', throughput: '10K req/s' },
    { source: 'load-balancer', target: 'api-gateway', type: 'api', protocol: 'HTTP', latency: '<20ms', throughput: '8K req/s' },
    { source: 'api-gateway', target: 'user-service', type: 'api', protocol: 'HTTP', latency: '<100ms', throughput: '2K req/s' },
    { source: 'api-gateway', target: 'product-service', type: 'api', protocol: 'HTTP', latency: '<150ms', throughput: '5K req/s' },
    { source: 'api-gateway', target: 'order-service', type: 'api', protocol: 'HTTP', latency: '<200ms', throughput: '1.5K req/s' },
    { source: 'user-service', target: 'user-db', type: 'data', protocol: 'SQL', latency: '<10ms', throughput: '500 ops/s' },
    { source: 'product-service', target: 'product-db', type: 'data', protocol: 'MongoDB', latency: '<15ms', throughput: '3K ops/s' },
    { source: 'order-service', target: 'order-db', type: 'data', protocol: 'SQL', latency: '<20ms', throughput: '800 ops/s' },
    { source: 'order-service', target: 'payment-service', type: 'api', protocol: 'HTTP', latency: '<300ms', throughput: '200 req/s' },
    { source: 'order-service', target: 'inventory-service', type: 'api', protocol: 'HTTP', latency: '<100ms', throughput: '400 req/s' },
    { source: 'order-service', target: 'notification-service', type: 'event', protocol: 'Kafka', latency: '<500ms', throughput: '1K msg/s' },
    { source: 'product-service', target: 'inventory-service', type: 'api', protocol: 'HTTP', latency: '<80ms', throughput: '2K req/s' },
    { source: 'user-service', target: 'redis-cache', type: 'cache', protocol: 'Redis', latency: '<5ms', throughput: '5K ops/s' },
    { source: 'product-service', target: 'redis-cache', type: 'cache', protocol: 'Redis', latency: '<5ms', throughput: '10K ops/s' },
    { source: 'frontend', target: 'cdn', type: 'api', protocol: 'HTTPS', latency: '<30ms', throughput: '50K req/s' },
    { source: 'api-gateway', target: 'monitoring', type: 'data', protocol: 'Metrics', latency: '<100ms', throughput: '1K metrics/s' }
  ];

  const nodeTypeColors = {
    frontend: '#06B6D4',
    gateway: '#3B82F6',
    service: '#10B981',
    database: '#8B5CF6',
    cache: '#F59E0B',
    external: '#EC4899'
  };

  const connectionTypeColors = {
    api: '#3B82F6',
    data: '#10B981',
    cache: '#F59E0B',
    event: '#EF4444',
    auth: '#8B5CF6'
  };

  const scalabilityColors = {
    low: '#F87171',
    medium: '#FBBF24',
    high: '#34D399'
  };

  // Simulate load changes over time
  useEffect(() => {
    if (!loadSimulation) return;

    const interval = setInterval(() => {
      setSimulationTime(prev => prev + 1);
      // Update load values with realistic fluctuations
      microservices.forEach(node => {
        const baseLoad = node.load || 0;
        const variation = (Math.sin(simulationTime * 0.1 + node.instances) * 15) + 
                         (Math.random() * 10 - 5);
        node.load = Math.max(5, Math.min(95, baseLoad + variation));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loadSimulation, simulationTime]);

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
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg.append('g');
    
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Add grid background
    const defs = svg.append('defs');
    const pattern = defs.append('pattern')
      .attr('id', 'microservices-grid')
      .attr('width', 60)
      .attr('height', 60)
      .attr('patternUnits', 'userSpaceOnUse');

    pattern.append('path')
      .attr('d', 'M 60 0 L 0 0 0 60')
      .attr('fill', 'none')
      .attr('stroke', '#374151')
      .attr('stroke-width', 0.5)
      .attr('opacity', 0.3);

    g.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', 'url(#microservices-grid)');

    // Add architecture layers
    const layers = [
      { name: 'Presentation Layer', y: 120, height: 120, color: '#06B6D4' },
      { name: 'Gateway Layer', y: 240, height: 80, color: '#3B82F6' },
      { name: 'Service Layer', y: 320, height: 160, color: '#10B981' },
      { name: 'Data Layer', y: 480, height: 100, color: '#8B5CF6' }
    ];

    layers.forEach(layer => {
      g.append('rect')
        .attr('x', 50)
        .attr('y', layer.y - 60)
        .attr('width', dimensions.width - 100)
        .attr('height', layer.height)
        .attr('fill', layer.color)
        .attr('opacity', 0.05)
        .attr('stroke', layer.color)
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '5,5')
        .attr('rx', 10);

      g.append('text')
        .attr('x', 70)
        .attr('y', layer.y - 40)
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', layer.color)
        .text(layer.name);
    });

    // Create arrow markers
    Object.entries(connectionTypeColors).forEach(([type, color]) => {
      defs.append('marker')
        .attr('id', `microservice-arrow-${type}`)
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

    // Draw connections
    const connectionGroups = g.selectAll('.connection')
      .data(connections)
      .join('g')
      .attr('class', 'connection');

    connectionGroups.each(function(d) {
      const sourceNode = microservices.find(n => n.id === d.source)!;
      const targetNode = microservices.find(n => n.id === d.target)!;

      const line = d3.select(this)
        .append('line')
        .attr('x1', sourceNode.x)
        .attr('y1', sourceNode.y)
        .attr('x2', targetNode.x)
        .attr('y2', targetNode.y)
        .attr('stroke', connectionTypeColors[d.type])
        .attr('stroke-width', 2)
        .attr('marker-end', `url(#microservice-arrow-${d.type})`)
        .attr('opacity', 0.6);

      // Add connection labels
      const midX = (sourceNode.x + targetNode.x) / 2;
      const midY = (sourceNode.y + targetNode.y) / 2;

      const labelGroup = d3.select(this).append('g');
      
      labelGroup.append('rect')
        .attr('x', midX - 25)
        .attr('y', midY - 10)
        .attr('width', 50)
        .attr('height', 20)
        .attr('fill', '#1F2937')
        .attr('stroke', connectionTypeColors[d.type])
        .attr('rx', 10)
        .attr('opacity', 0.9);

      labelGroup.append('text')
        .attr('x', midX)
        .attr('y', midY - 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', '8px')
        .attr('fill', '#E5E7EB')
        .text(d.protocol);

      labelGroup.append('text')
        .attr('x', midX)
        .attr('y', midY + 8)
        .attr('text-anchor', 'middle')
        .attr('font-size', '8px')
        .attr('fill', '#9CA3AF')
        .text(d.latency);
    });

    // Draw microservice nodes
    const nodeGroups = g.selectAll('.node')
      .data(microservices)
      .join('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        setSelectedNode(selectedNode?.id === d.id ? null : d);
      })
      .on('mouseenter', function(event, d) {
        // Highlight connected services
        connectionGroups.selectAll('line')
          .attr('opacity', (connData: any) => 
            connData.source === d.id || connData.target === d.id ? 1 : 0.2
          );

        d3.select(this)
          .select('.node-circle')
          .transition()
          .duration(200)
          .attr('r', 45)
          .attr('stroke-width', 4);
      })
      .on('mouseleave', function() {
        connectionGroups.selectAll('line').attr('opacity', 0.6);
        
        d3.select(this)
          .select('.node-circle')
          .transition()
          .duration(200)
          .attr('r', 40)
          .attr('stroke-width', 2);
      });

    // Node circles with scalability indicators
    nodeGroups.append('circle')
      .attr('class', 'node-circle')
      .attr('r', 40)
      .attr('fill', d => nodeTypeColors[d.type])
      .attr('stroke', d => scalabilityColors[d.scalability])
      .attr('stroke-width', 2)
      .attr('opacity', 0.8);

    // Instance count indicators
    nodeGroups.append('circle')
      .attr('cx', 25)
      .attr('cy', -25)
      .attr('r', 8)
      .attr('fill', '#1F2937')
      .attr('stroke', '#4B5563')
      .attr('stroke-width', 1);

    nodeGroups.append('text')
      .attr('x', 25)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', '#E5E7EB')
      .text(d => d.instances);

    // Load indicators (animated bars)
    if (showMetrics && loadSimulation) {
      nodeGroups.append('rect')
        .attr('x', -30)
        .attr('y', 50)
        .attr('width', 60)
        .attr('height', 8)
        .attr('fill', '#374151')
        .attr('rx', 4);

      nodeGroups.append('rect')
        .attr('x', -30)
        .attr('y', 50)
        .attr('width', d => (d.load || 0) * 0.6)
        .attr('height', 8)
        .attr('fill', d => {
          const load = d.load || 0;
          if (load > 80) return '#EF4444';
          if (load > 60) return '#F59E0B';
          return '#10B981';
        })
        .attr('rx', 4)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear);

      nodeGroups.append('text')
        .attr('x', 0)
        .attr('y', 70)
        .attr('text-anchor', 'middle')
        .attr('font-size', '9px')
        .attr('fill', '#9CA3AF')
        .text(d => `${Math.round(d.load || 0)}%`);
    }

    // Node names
    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', -5)
      .attr('font-size', '11px')
      .attr('font-weight', 'bold')
      .attr('fill', 'white')
      .each(function(d) {
        const words = d.name.split(' ');
        if (words.length === 1) {
          d3.select(this).text(d.name);
        } else {
          words.forEach((word, i) => {
            d3.select(this).append('tspan')
              .attr('x', 0)
              .attr('dy', i === 0 ? 0 : 12)
              .text(word);
          });
        }
      });

    // Availability badges
    if (showMetrics) {
      nodeGroups.append('rect')
        .attr('x', -20)
        .attr('y', -45)
        .attr('width', 40)
        .attr('height', 12)
        .attr('fill', d => d.availability >= 99.99 ? '#10B981' : d.availability >= 99.9 ? '#F59E0B' : '#EF4444')
        .attr('rx', 6)
        .attr('opacity', 0.9);

      nodeGroups.append('text')
        .attr('x', 0)
        .attr('y', -37)
        .attr('text-anchor', 'middle')
        .attr('font-size', '8px')
        .attr('font-weight', 'bold')
        .attr('fill', 'white')
        .text(d => `${d.availability}%`);
    }

    // Add comprehensive legend
    const legend = svg.append('g')
      .attr('class', 'ecommerce-legend')
      .attr('transform', 'translate(20, 20)');

    // Service types
    legend.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('fill', '#E5E7EB')
      .text('Service Types');

    Object.entries(nodeTypeColors).forEach(([type, color], index) => {
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

    // Scalability legend
    const scalabilityLegend = legend.append('g')
      .attr('transform', 'translate(0, 150)');

    scalabilityLegend.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', '#E5E7EB')
      .text('Scalability');

    Object.entries(scalabilityColors).forEach(([level, color], index) => {
      const item = scalabilityLegend.append('g')
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

  }, [dimensions, showMetrics, loadSimulation, simulationTime, selectedNode]);

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
        
        <button
          onClick={() => setLoadSimulation(!loadSimulation)}
          className={`px-4 py-2 rounded font-medium ${
            loadSimulation ? 'bg-red-500 text-white' : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {loadSimulation ? 'Stop Load Simulation' : 'Start Load Simulation'}
        </button>

        <div className="flex items-center gap-4 text-sm text-slate-300">
          <span>Concurrent Users: <span className="text-green-400 font-semibold">10K+</span></span>
          <span>Services: <span className="text-blue-400 font-semibold">{microservices.filter(n => n.type === 'service').length}</span></span>
          <span>Avg Response: <span className="text-cyan-400 font-semibold">520ms</span></span>
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
              <div className="flex items-center gap-3 mt-2">
                <div className={`px-2 py-1 rounded text-sm text-white`} 
                     style={{ backgroundColor: nodeTypeColors[selectedNode.type] }}>
                  {selectedNode.type.toUpperCase()}
                </div>
                <div className={`px-2 py-1 rounded text-xs text-white`}
                     style={{ backgroundColor: scalabilityColors[selectedNode.scalability] }}>
                  {selectedNode.scalability.toUpperCase()} SCALABILITY
                </div>
                <div className="px-2 py-1 bg-blue-600 rounded text-xs text-white">
                  {selectedNode.instances} INSTANCES
                </div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Availability</div>
              <div className="text-xl font-bold text-green-400">{selectedNode.availability}%</div>
            </div>
            <div className="p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Instances</div>
              <div className="text-xl font-bold text-blue-400">{selectedNode.instances}</div>
            </div>
            {selectedNode.load && (
              <div className="p-3 bg-slate-700/50 rounded-lg">
                <div className="text-sm text-slate-400 mb-1">Current Load</div>
                <div className="text-xl font-bold text-orange-400">{Math.round(selectedNode.load)}%</div>
              </div>
            )}
          </div>
          
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
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
          <h4 className="font-semibold text-green-400 mb-2">High Availability</h4>
          <p className="text-sm text-slate-300">99.99% uptime with automated failover and health checks</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
          <h4 className="font-semibold text-blue-400 mb-2">Auto-Scaling</h4>
          <p className="text-sm text-slate-300">Dynamic scaling supporting 10,000+ concurrent users</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-lg border border-orange-500/20">
          <h4 className="font-semibold text-orange-400 mb-2">Redis Caching</h4>
          <p className="text-sm text-slate-300">520ms average response time with intelligent caching</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
          <h4 className="font-semibold text-purple-400 mb-2">Microservices</h4>
          <p className="text-sm text-slate-300">Modular architecture with independent service deployment</p>
        </div>
      </div>
    </div>
  );
};

export default EcommerceArchitecture;