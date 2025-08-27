import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Activity, Cpu, Memory, Zap, HardDrive, Wifi, AlertTriangle, TrendingUp, TrendingDown, Pause, Play, RotateCcw } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';

interface SystemMetrics {
  timestamp: number;
  cpuUsage: number;
  memoryUsage: number;
  heapUsed: number;
  heapTotal: number;
  loadTime: number;
  fps: number;
  networkRequests: number;
  cacheHitRate: number;
  jsHeapSize: number;
  domNodes: number;
  eventListeners: number;
}

interface PerformanceAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  metric: string;
  value: number;
  threshold: number;
  message: string;
  timestamp: number;
}

interface BenchmarkTest {
  id: string;
  name: string;
  description: string;
  category: 'cpu' | 'memory' | 'network' | 'rendering';
  testFunction: () => Promise<number>;
  threshold: { good: number; fair: number };
  unit: string;
}

const PerformanceMonitoring: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics[]>([]);
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1m' | '5m' | '15m' | '1h'>('5m');
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'benchmarks' | 'alerts'>('overview');
  const [benchmarkResults, setBenchmarkResults] = useState<{ [key: string]: number }>({});
  const [isRunningBenchmarks, setIsRunningBenchmarks] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  const metricsRef = useRef<SystemMetrics[]>([]);
  const alertsRef = useRef<PerformanceAlert[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const fpsRef = useRef<{ frames: number; lastTime: number }>({ frames: 0, lastTime: Date.now() });

  // Performance benchmarks
  const benchmarkTests: BenchmarkTest[] = [
    {
      id: 'cpu-intensive',
      name: 'CPU Intensive Calculation',
      description: 'Tests JavaScript execution performance with mathematical operations',
      category: 'cpu',
      testFunction: async () => {
        const start = performance.now();
        let result = 0;
        
        // CPU intensive calculation
        for (let i = 0; i < 1000000; i++) {
          result += Math.sqrt(i) * Math.sin(i) * Math.cos(i);
        }
        
        const end = performance.now();
        return end - start;
      },
      threshold: { good: 100, fair: 300 },
      unit: 'ms'
    },
    {
      id: 'memory-allocation',
      name: 'Memory Allocation Test',
      description: 'Tests memory allocation and garbage collection performance',
      category: 'memory',
      testFunction: async () => {
        const start = performance.now();
        const arrays: number[][] = [];
        
        // Allocate large amounts of memory
        for (let i = 0; i < 1000; i++) {
          arrays.push(new Array(1000).fill(Math.random()));
        }
        
        const end = performance.now();
        
        // Force cleanup
        arrays.length = 0;
        return end - start;
      },
      threshold: { good: 50, fair: 200 },
      unit: 'ms'
    },
    {
      id: 'dom-manipulation',
      name: 'DOM Manipulation Speed',
      description: 'Tests DOM creation and manipulation performance',
      category: 'rendering',
      testFunction: async () => {
        const start = performance.now();
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        document.body.appendChild(container);
        
        // Create and manipulate DOM elements
        for (let i = 0; i < 1000; i++) {
          const element = document.createElement('div');
          element.textContent = `Element ${i}`;
          element.style.color = `hsl(${i % 360}, 50%, 50%)`;
          container.appendChild(element);
        }
        
        const end = performance.now();
        
        // Cleanup
        document.body.removeChild(container);
        return end - start;
      },
      threshold: { good: 30, fair: 100 },
      unit: 'ms'
    },
    {
      id: 'tensor-operations',
      name: 'TensorFlow.js Operations',
      description: 'Tests machine learning computation performance',
      category: 'cpu',
      testFunction: async () => {
        const start = performance.now();
        
        // Create tensors and perform operations
        const a = tf.randomNormal([1000, 1000]);
        const b = tf.randomNormal([1000, 1000]);
        const c = tf.matMul(a, b);
        const result = tf.sum(c);
        
        await result.data(); // Wait for computation
        
        const end = performance.now();
        
        // Cleanup tensors
        a.dispose();
        b.dispose();
        c.dispose();
        result.dispose();
        
        return end - start;
      },
      threshold: { good: 500, fair: 2000 },
      unit: 'ms'
    }
  ];

  // Collect system metrics
  const collectMetrics = useCallback((): SystemMetrics => {
    const now = Date.now();
    
    // Simulate CPU usage (in real app, you'd use actual system APIs)
    const cpuUsage = Math.random() * 100;
    
    // Memory metrics
    const memory = (performance as any).memory || {
      usedJSHeapSize: 0,
      totalJSHeapSize: 0,
      jsHeapSizeLimit: 0
    };
    
    const memoryUsage = memory.totalJSHeapSize > 0 ? 
      (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100 : 0;
    
    // FPS calculation
    const currentTime = now;
    const deltaTime = currentTime - fpsRef.current.lastTime;
    if (deltaTime >= 1000) {
      const fps = (fpsRef.current.frames * 1000) / deltaTime;
      fpsRef.current.frames = 0;
      fpsRef.current.lastTime = currentTime;
    }
    fpsRef.current.frames++;
    
    // DOM metrics
    const domNodes = document.querySelectorAll('*').length;
    const eventListeners = (window as any).getEventListeners ? 
      Object.keys((window as any).getEventListeners(document)).length : 0;
    
    return {
      timestamp: now,
      cpuUsage,
      memoryUsage,
      heapUsed: memory.usedJSHeapSize / 1024 / 1024,
      heapTotal: memory.totalJSHeapSize / 1024 / 1024,
      loadTime: performance.timing ? 
        performance.timing.loadEventEnd - performance.timing.navigationStart : 0,
      fps: fpsRef.current.frames,
      networkRequests: (performance as any).getEntriesByType ? 
        (performance as any).getEntriesByType('resource').length : 0,
      cacheHitRate: Math.random() * 100, // Simulated
      jsHeapSize: memory.usedJSHeapSize / 1024 / 1024,
      domNodes,
      eventListeners
    };
  }, []);

  // Check for performance alerts
  const checkAlerts = useCallback((metric: SystemMetrics) => {
    const newAlerts: PerformanceAlert[] = [];
    
    if (metric.cpuUsage > 80) {
      newAlerts.push({
        id: `cpu-${metric.timestamp}`,
        type: 'warning',
        metric: 'CPU Usage',
        value: metric.cpuUsage,
        threshold: 80,
        message: 'High CPU usage detected',
        timestamp: metric.timestamp
      });
    }
    
    if (metric.memoryUsage > 90) {
      newAlerts.push({
        id: `memory-${metric.timestamp}`,
        type: 'error',
        metric: 'Memory Usage',
        value: metric.memoryUsage,
        threshold: 90,
        message: 'Critical memory usage',
        timestamp: metric.timestamp
      });
    }
    
    if (metric.fps < 30) {
      newAlerts.push({
        id: `fps-${metric.timestamp}`,
        type: 'warning',
        metric: 'Frame Rate',
        value: metric.fps,
        threshold: 30,
        message: 'Low frame rate affecting user experience',
        timestamp: metric.timestamp
      });
    }
    
    if (newAlerts.length > 0) {
      setAlerts(prev => {
        const updated = [...prev, ...newAlerts];
        alertsRef.current = updated;
        return updated.slice(-50); // Keep only last 50 alerts
      });
    }
  }, []);

  // Start/stop monitoring
  useEffect(() => {
    if (isMonitoring) {
      intervalRef.current = setInterval(() => {
        const metric = collectMetrics();
        
        setMetrics(prev => {
          const updated = [...prev, metric];
          metricsRef.current = updated;
          
          // Keep only data for selected time range
          const cutoff = Date.now() - (
            selectedTimeRange === '1m' ? 60 * 1000 :
            selectedTimeRange === '5m' ? 5 * 60 * 1000 :
            selectedTimeRange === '15m' ? 15 * 60 * 1000 :
            60 * 60 * 1000
          );
          
          return updated.filter(m => m.timestamp >= cutoff).slice(-1000);
        });
        
        checkAlerts(metric);
      }, 1000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMonitoring, selectedTimeRange, collectMetrics, checkAlerts]);

  // Run benchmarks
  const runBenchmarks = useCallback(async () => {
    setIsRunningBenchmarks(true);
    setBenchmarkResults({});
    
    for (const test of benchmarkTests) {
      try {
        const result = await test.testFunction();
        setBenchmarkResults(prev => ({
          ...prev,
          [test.id]: result
        }));
        
        // Small delay between tests
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Benchmark ${test.name} failed:`, error);
        setBenchmarkResults(prev => ({
          ...prev,
          [test.id]: -1
        }));
      }
    }
    
    setIsRunningBenchmarks(false);
  }, [benchmarkTests]);

  // Clear all data
  const clearData = useCallback(() => {
    setMetrics([]);
    setAlerts([]);
    setBenchmarkResults({});
    metricsRef.current = [];
    alertsRef.current = [];
  }, []);

  // Computed metrics
  const latestMetrics = useMemo(() => {
    return metrics.length > 0 ? metrics[metrics.length - 1] : null;
  }, [metrics]);

  const averageMetrics = useMemo(() => {
    if (metrics.length === 0) return null;
    
    const sum = metrics.reduce((acc, metric) => ({
      cpuUsage: acc.cpuUsage + metric.cpuUsage,
      memoryUsage: acc.memoryUsage + metric.memoryUsage,
      fps: acc.fps + metric.fps,
      jsHeapSize: acc.jsHeapSize + metric.jsHeapSize
    }), { cpuUsage: 0, memoryUsage: 0, fps: 0, jsHeapSize: 0 });
    
    const count = metrics.length;
    return {
      cpuUsage: sum.cpuUsage / count,
      memoryUsage: sum.memoryUsage / count,
      fps: sum.fps / count,
      jsHeapSize: sum.jsHeapSize / count
    };
  }, [metrics]);

  const performanceScore = useMemo(() => {
    if (!latestMetrics) return 0;
    
    const cpuScore = Math.max(0, 100 - latestMetrics.cpuUsage);
    const memoryScore = Math.max(0, 100 - latestMetrics.memoryUsage);
    const fpsScore = Math.min(100, (latestMetrics.fps / 60) * 100);
    
    return (cpuScore + memoryScore + fpsScore) / 3;
  }, [latestMetrics]);

  const formatMetricValue = useCallback((value: number, unit: string) => {
    if (unit === 'ms') return `${value.toFixed(1)}ms`;
    if (unit === 'MB') return `${value.toFixed(1)}MB`;
    if (unit === '%') return `${value.toFixed(1)}%`;
    return value.toFixed(1);
  }, []);

  const getPerformanceColor = useCallback((value: number, good: number, fair: number) => {
    if (value <= good) return 'text-green-600 bg-green-100';
    if (value <= fair) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  }, []);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
              <Activity className="text-indigo-600" />
              Real-Time Performance Monitoring
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor system performance, run benchmarks, and track optimization metrics
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Performance Score */}
            {latestMetrics && (
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  performanceScore >= 80 ? 'text-green-600' :
                  performanceScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {performanceScore.toFixed(0)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Performance Score</div>
              </div>
            )}
            
            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {isMonitoring ? 'Monitoring' : 'Stopped'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Time Range Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Range:</span>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value as any)}
                className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
              >
                <option value="1m">1 minute</option>
                <option value="5m">5 minutes</option>
                <option value="15m">15 minutes</option>
                <option value="1h">1 hour</option>
              </select>
            </div>
            
            {/* Auto Refresh Toggle */}
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded"
              />
              Auto Refresh
            </label>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Control Buttons */}
            <button
              onClick={() => setIsMonitoring(!isMonitoring)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                isMonitoring 
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isMonitoring ? <Pause size={16} /> : <Play size={16} />}
              {isMonitoring ? 'Stop' : 'Start'}
            </button>
            
            <button
              onClick={clearData}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium transition-all"
            >
              <RotateCcw size={16} />
              Clear
            </button>
            
            <button
              onClick={runBenchmarks}
              disabled={isRunningBenchmarks}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap size={16} />
              {isRunningBenchmarks ? 'Running...' : 'Run Benchmarks'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {(['overview', 'detailed', 'benchmarks', 'alerts'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-900'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'alerts' && alerts.length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {alerts.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {latestMetrics && [
                  {
                    title: 'CPU Usage',
                    value: latestMetrics.cpuUsage,
                    unit: '%',
                    icon: Cpu,
                    color: latestMetrics.cpuUsage > 80 ? 'text-red-500' : latestMetrics.cpuUsage > 60 ? 'text-yellow-500' : 'text-green-500'
                  },
                  {
                    title: 'Memory Usage',
                    value: latestMetrics.memoryUsage,
                    unit: '%',
                    icon: Memory,
                    color: latestMetrics.memoryUsage > 80 ? 'text-red-500' : latestMetrics.memoryUsage > 60 ? 'text-yellow-500' : 'text-green-500'
                  },
                  {
                    title: 'Frame Rate',
                    value: latestMetrics.fps,
                    unit: 'fps',
                    icon: Activity,
                    color: latestMetrics.fps < 30 ? 'text-red-500' : latestMetrics.fps < 50 ? 'text-yellow-500' : 'text-green-500'
                  },
                  {
                    title: 'Heap Size',
                    value: latestMetrics.jsHeapSize,
                    unit: 'MB',
                    icon: HardDrive,
                    color: latestMetrics.jsHeapSize > 100 ? 'text-red-500' : latestMetrics.jsHeapSize > 50 ? 'text-yellow-500' : 'text-green-500'
                  }
                ].map((metric, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</p>
                        <p className={`text-2xl font-bold ${metric.color}`}>
                          {formatMetricValue(metric.value, metric.unit)}
                        </p>
                        {averageMetrics && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Avg: {formatMetricValue(
                              metric.title === 'CPU Usage' ? averageMetrics.cpuUsage :
                              metric.title === 'Memory Usage' ? averageMetrics.memoryUsage :
                              metric.title === 'Frame Rate' ? averageMetrics.fps :
                              averageMetrics.jsHeapSize,
                              metric.unit
                            )}
                          </p>
                        )}
                      </div>
                      <metric.icon className={`${metric.color} opacity-75`} size={32} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Real-time Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* CPU & Memory Usage */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">System Resources</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={metrics}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
                        <XAxis 
                          dataKey="timestamp" 
                          tickFormatter={(value) => new Date(value).toLocaleTimeString()} 
                          stroke="#6B7280"
                        />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          labelFormatter={(value) => new Date(value).toLocaleTimeString()}
                          formatter={(value: number, name: string) => [
                            `${value.toFixed(1)}${name.includes('Usage') ? '%' : ''}`, 
                            name
                          ]}
                        />
                        <Line type="monotone" dataKey="cpuUsage" stroke="#EF4444" strokeWidth={2} name="CPU Usage" dot={false} />
                        <Line type="monotone" dataKey="memoryUsage" stroke="#3B82F6" strokeWidth={2} name="Memory Usage" dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={metrics}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
                        <XAxis 
                          dataKey="timestamp" 
                          tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                          stroke="#6B7280" 
                        />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          labelFormatter={(value) => new Date(value).toLocaleTimeString()}
                          formatter={(value: number, name: string) => [
                            `${value.toFixed(1)}${name.includes('FPS') ? ' fps' : ' MB'}`, 
                            name
                          ]}
                        />
                        <Area type="monotone" dataKey="fps" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="FPS" />
                        <Area type="monotone" dataKey="jsHeapSize" stackId="2" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} name="Heap Size" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'benchmarks' && (
            <motion.div
              key="benchmarks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Benchmark Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benchmarkTests.map((test) => {
                  const result = benchmarkResults[test.id];
                  const hasResult = result !== undefined && result >= 0;
                  const isGood = hasResult && result <= test.threshold.good;
                  const isFair = hasResult && result <= test.threshold.fair;
                  
                  return (
                    <div key={test.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {test.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          test.category === 'cpu' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                          test.category === 'memory' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                          test.category === 'network' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                        }`}>
                          {test.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                        {test.description}
                      </p>
                      
                      <div className="space-y-3">
                        {hasResult ? (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Result:</span>
                              <span className={`font-mono font-bold ${
                                isGood ? 'text-green-600' : isFair ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {formatMetricValue(result, test.unit)}
                              </span>
                            </div>
                            
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  isGood ? 'bg-green-500' : isFair ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ 
                                  width: `${Math.min(100, Math.max(10, (test.threshold.fair / Math.max(result, test.threshold.fair)) * 100))}%` 
                                }}
                              />
                            </div>
                            
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                              <span>Good: &lt;{test.threshold.good}{test.unit}</span>
                              <span>Fair: &lt;{test.threshold.fair}{test.unit}</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                            {isRunningBenchmarks ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500" />
                                Running...
                              </div>
                            ) : (
                              'No results yet'
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Benchmark Comparison Chart */}
              {Object.keys(benchmarkResults).length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Benchmark Results Comparison</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={benchmarkTests.map(test => ({
                        name: test.name.replace(' ', '\n'),
                        result: benchmarkResults[test.id] || 0,
                        good: test.threshold.good,
                        fair: test.threshold.fair
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="result" fill="#3B82F6" />
                        <Bar dataKey="good" fill="#10B981" fillOpacity={0.3} />
                        <Bar dataKey="fair" fill="#F59E0B" fillOpacity={0.3} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'alerts' && (
            <motion.div
              key="alerts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {alerts.length === 0 ? (
                <div className="text-center py-12">
                  <AlertTriangle size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No Performance Alerts
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    All systems running smoothly. Alerts will appear here when performance thresholds are exceeded.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {alerts.slice().reverse().map((alert) => (
                    <div
                      key={alert.id}
                      className={`rounded-lg p-4 border ${
                        alert.type === 'error' ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' :
                        alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' :
                        'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className={`flex-shrink-0 mt-0.5 ${
                          alert.type === 'error' ? 'text-red-500' :
                          alert.type === 'warning' ? 'text-yellow-500' :
                          'text-blue-500'
                        }`} size={20} />
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`font-medium ${
                              alert.type === 'error' ? 'text-red-800 dark:text-red-200' :
                              alert.type === 'warning' ? 'text-yellow-800 dark:text-yellow-200' :
                              'text-blue-800 dark:text-blue-200'
                            }`}>
                              {alert.message}
                            </h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(alert.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          
                          <p className={`text-sm ${
                            alert.type === 'error' ? 'text-red-700 dark:text-red-300' :
                            alert.type === 'warning' ? 'text-yellow-700 dark:text-yellow-300' :
                            'text-blue-700 dark:text-blue-300'
                          }`}>
                            {alert.metric}: {alert.value.toFixed(1)} (threshold: {alert.threshold})
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PerformanceMonitoring;