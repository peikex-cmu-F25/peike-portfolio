import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Play, Zap, Clock, Memory, TrendingUp, RefreshCw, Download, Share2 } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import { LoadingSpinner } from '../ui';

interface AlgorithmConfig {
  id: string;
  name: string;
  description: string;
  code: string;
  language: 'javascript' | 'python';
  category: 'sorting' | 'search' | 'ml' | 'optimization' | 'graph';
  complexity: {
    time: string;
    space: string;
  };
  bestCase: string;
  worstCase: string;
  averageCase: string;
}

interface BenchmarkResult {
  algorithmId: string;
  executionTime: number;
  memoryUsage: number;
  accuracy?: number;
  throughput?: number;
  scalability: number;
  timestamp: number;
}

interface ComparisonMetrics {
  performance: number;
  efficiency: number;
  scalability: number;
  accuracy: number;
  usability: number;
}

const AlgorithmComparison: React.FC = () => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<AlgorithmConfig[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<BenchmarkResult[]>([]);
  const [inputSize, setInputSize] = useState(1000);
  const [iterations, setIterations] = useState(10);
  const [activeTab, setActiveTab] = useState<'performance' | 'visualization' | 'analysis'>('performance');
  const [comparisonData, setComparisonData] = useState<any[]>([]);

  // Algorithm templates
  const algorithmTemplates: AlgorithmConfig[] = [
    {
      id: 'quicksort',
      name: 'Quick Sort',
      description: 'Divide-and-conquer sorting algorithm with average O(n log n) complexity',
      code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Benchmark execution
const data = Array.from({length: ${inputSize}}, () => Math.floor(Math.random() * 1000));
const startTime = performance.now();
const sorted = quickSort([...data]);
const endTime = performance.now();
return { executionTime: endTime - startTime, result: sorted };`,
      language: 'javascript',
      category: 'sorting',
      complexity: { time: 'O(n log n)', space: 'O(log n)' },
      bestCase: 'O(n log n)',
      worstCase: 'O(n²)',
      averageCase: 'O(n log n)'
    },
    {
      id: 'mergesort',
      name: 'Merge Sort',
      description: 'Stable divide-and-conquer sorting with guaranteed O(n log n) complexity',
      code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let result = [], l = 0, r = 0;
  
  while (l < left.length && r < right.length) {
    if (left[l] <= right[r]) {
      result.push(left[l++]);
    } else {
      result.push(right[r++]);
    }
  }
  
  return [...result, ...left.slice(l), ...right.slice(r)];
}

// Benchmark execution
const data = Array.from({length: ${inputSize}}, () => Math.floor(Math.random() * 1000));
const startTime = performance.now();
const sorted = mergeSort([...data]);
const endTime = performance.now();
return { executionTime: endTime - startTime, result: sorted };`,
      language: 'javascript',
      category: 'sorting',
      complexity: { time: 'O(n log n)', space: 'O(n)' },
      bestCase: 'O(n log n)',
      worstCase: 'O(n log n)',
      averageCase: 'O(n log n)'
    },
    {
      id: 'bubblesort',
      name: 'Bubble Sort',
      description: 'Simple but inefficient sorting algorithm with O(n²) complexity',
      code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}

// Benchmark execution
const data = Array.from({length: ${inputSize}}, () => Math.floor(Math.random() * 1000));
const startTime = performance.now();
const sorted = bubbleSort([...data]);
const endTime = performance.now();
return { executionTime: endTime - startTime, result: sorted };`,
      language: 'javascript',
      category: 'sorting',
      complexity: { time: 'O(n²)', space: 'O(1)' },
      bestCase: 'O(n)',
      worstCase: 'O(n²)',
      averageCase: 'O(n²)'
    },
    {
      id: 'binarysearch',
      name: 'Binary Search',
      description: 'Efficient search algorithm for sorted arrays with O(log n) complexity',
      code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// Benchmark execution
const data = Array.from({length: ${inputSize}}, (_, i) => i);
const target = Math.floor(Math.random() * ${inputSize});
const startTime = performance.now();
let results = [];
for (let i = 0; i < ${iterations}; i++) {
  results.push(binarySearch(data, Math.floor(Math.random() * ${inputSize})));
}
const endTime = performance.now();
return { executionTime: endTime - startTime, result: results };`,
      language: 'javascript',
      category: 'search',
      complexity: { time: 'O(log n)', space: 'O(1)' },
      bestCase: 'O(1)',
      worstCase: 'O(log n)',
      averageCase: 'O(log n)'
    },
    {
      id: 'linearsearch',
      name: 'Linear Search',
      description: 'Simple search algorithm that checks every element with O(n) complexity',
      code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// Benchmark execution
const data = Array.from({length: ${inputSize}}, () => Math.floor(Math.random() * 1000));
const target = Math.floor(Math.random() * 1000);
const startTime = performance.now();
let results = [];
for (let i = 0; i < ${iterations}; i++) {
  results.push(linearSearch(data, Math.floor(Math.random() * 1000)));
}
const endTime = performance.now();
return { executionTime: endTime - startTime, result: results };`,
      language: 'javascript',
      category: 'search',
      complexity: { time: 'O(n)', space: 'O(1)' },
      bestCase: 'O(1)',
      worstCase: 'O(n)',
      averageCase: 'O(n/2)'
    },
    {
      id: 'knn',
      name: 'K-Nearest Neighbors',
      description: 'Simple ML classifier based on distance to nearest neighbors',
      code: `function knnClassify(trainData, testPoint, k = 3) {
  const distances = trainData.map(point => ({
    ...point,
    distance: Math.sqrt(
      Math.pow(point.x - testPoint.x, 2) + 
      Math.pow(point.y - testPoint.y, 2)
    )
  }));
  
  const nearest = distances
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k);
  
  const classVotes = {};
  nearest.forEach(point => {
    classVotes[point.class] = (classVotes[point.class] || 0) + 1;
  });
  
  return Object.keys(classVotes).reduce((a, b) => 
    classVotes[a] > classVotes[b] ? a : b
  );
}

// Generate test data
const trainData = Array.from({length: ${Math.floor(inputSize/10)}}, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  class: Math.random() > 0.5 ? 'A' : 'B'
}));

const testData = Array.from({length: ${Math.floor(inputSize/20)}}, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100
}));

const startTime = performance.now();
const predictions = testData.map(point => knnClassify(trainData, point));
const endTime = performance.now();
return { executionTime: endTime - startTime, result: predictions };`,
      language: 'javascript',
      category: 'ml',
      complexity: { time: 'O(nd)', space: 'O(n)' },
      bestCase: 'O(nd)',
      worstCase: 'O(nd)',
      averageCase: 'O(nd)'
    }
  ];

  const runComparison = useCallback(async () => {
    if (selectedAlgorithms.length < 2 || isRunning) return;
    
    setIsRunning(true);
    setResults([]);
    
    const newResults: BenchmarkResult[] = [];
    
    for (const algorithm of selectedAlgorithms) {
      try {
        const startTime = performance.now();
        
        // Execute algorithm code
        const func = new Function(algorithm.code);
        const result = func();
        
        const endTime = performance.now();
        
        // Calculate metrics
        const executionTime = result.executionTime || (endTime - startTime);
        const memoryUsage = performance.memory ? 
          performance.memory.usedJSHeapSize - performance.memory.usedJSHeapSize : 0;
        
        newResults.push({
          algorithmId: algorithm.id,
          executionTime,
          memoryUsage,
          scalability: calculateScalability(executionTime, inputSize, algorithm.complexity.time),
          timestamp: Date.now()
        });
        
        // Small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Error executing ${algorithm.name}:`, error);
        newResults.push({
          algorithmId: algorithm.id,
          executionTime: Infinity,
          memoryUsage: 0,
          scalability: 0,
          timestamp: Date.now()
        });
      }
    }
    
    setResults(newResults);
    generateComparisonData(newResults);
    setIsRunning(false);
  }, [selectedAlgorithms, inputSize, iterations, isRunning]);

  const calculateScalability = (executionTime: number, size: number, complexity: string): number => {
    // Simple scalability metric based on theoretical complexity
    const complexityFactors: { [key: string]: number } = {
      'O(1)': 1,
      'O(log n)': Math.log2(size),
      'O(n)': size,
      'O(n log n)': size * Math.log2(size),
      'O(n²)': size * size,
      'O(2^n)': Math.pow(2, Math.min(size, 20)) // Cap exponential
    };
    
    const theoreticalTime = complexityFactors[complexity] || size;
    return Math.max(0, 100 - (executionTime / theoreticalTime) * 100);
  };

  const generateComparisonData = useCallback((benchmarkResults: BenchmarkResult[]) => {
    const data = benchmarkResults.map(result => {
      const algorithm = algorithmTemplates.find(a => a.id === result.algorithmId);
      return {
        name: algorithm?.name || result.algorithmId,
        executionTime: result.executionTime,
        memoryUsage: result.memoryUsage / 1024 / 1024, // MB
        scalability: result.scalability,
        complexity: algorithm?.complexity.time || 'Unknown'
      };
    });
    
    setComparisonData(data);
  }, []);

  const comparisonMetrics = useMemo(() => {
    if (results.length === 0) return [];
    
    const maxTime = Math.max(...results.map(r => r.executionTime));
    const maxMemory = Math.max(...results.map(r => r.memoryUsage));
    
    return results.map(result => {
      const algorithm = algorithmTemplates.find(a => a.id === result.algorithmId);
      return {
        algorithm: algorithm?.name || result.algorithmId,
        performance: Math.max(0, 100 - (result.executionTime / maxTime) * 100),
        efficiency: Math.max(0, 100 - (result.memoryUsage / maxMemory) * 100),
        scalability: result.scalability,
        accuracy: 90 + Math.random() * 10, // Simulated
        usability: algorithm?.complexity.time === 'O(1)' ? 100 : 
                  algorithm?.complexity.time === 'O(log n)' ? 90 :
                  algorithm?.complexity.time === 'O(n)' ? 80 :
                  algorithm?.complexity.time === 'O(n log n)' ? 70 :
                  algorithm?.complexity.time === 'O(n²)' ? 50 : 30
      };
    });
  }, [results]);

  const toggleAlgorithm = useCallback((algorithm: AlgorithmConfig) => {
    setSelectedAlgorithms(prev => {
      const exists = prev.some(a => a.id === algorithm.id);
      if (exists) {
        return prev.filter(a => a.id !== algorithm.id);
      } else {
        return [...prev, algorithm];
      }
    });
  }, []);

  const downloadResults = useCallback(() => {
    const data = {
      comparison: comparisonData,
      metrics: comparisonMetrics,
      settings: { inputSize, iterations },
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'algorithm-comparison-results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [comparisonData, comparisonMetrics, inputSize, iterations]);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Algorithm Performance Comparison
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Compare algorithm performance side-by-side with real-time metrics and visualizations
        </p>
      </div>

      {/* Controls */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Input Size
              </label>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={inputSize}
                onChange={(e) => setInputSize(Number(e.target.value))}
                className="w-32"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{inputSize.toLocaleString()}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Iterations
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={iterations}
                onChange={(e) => setIterations(Number(e.target.value))}
                className="w-24"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{iterations}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={runComparison}
              disabled={selectedAlgorithms.length < 2 || isRunning}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedAlgorithms.length < 2 || isRunning
                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
              }`}
            >
              {isRunning ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play size={16} />
                  Compare ({selectedAlgorithms.length})
                </>
              )}
            </button>
            
            {results.length > 0 && (
              <button
                onClick={downloadResults}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all"
              >
                <Download size={16} />
                Export
              </button>
            )}
          </div>
        </div>
        
        {/* Algorithm Selection */}
        <div className="flex flex-wrap gap-2">
          {algorithmTemplates.map((algorithm) => (
            <button
              key={algorithm.id}
              onClick={() => toggleAlgorithm(algorithm)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedAlgorithms.some(a => a.id === algorithm.id)
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-gray-600'
              }`}
            >
              {algorithm.name}
              <span className="ml-1 text-xs opacity-75">
                {algorithm.complexity.time}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 p-6 overflow-auto">
        {selectedAlgorithms.length === 0 && (
          <div className="text-center py-12">
            <Zap size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Select Algorithms to Compare
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose 2 or more algorithms from the options above to start comparing their performance
            </p>
          </div>
        )}
        
        {selectedAlgorithms.length > 0 && results.length === 0 && !isRunning && (
          <div className="text-center py-12">
            <Play size={48} className="mx-auto text-blue-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Ready to Compare
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {selectedAlgorithms.length} algorithms selected. Click "Compare" to run the benchmarks.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedAlgorithms.map((alg) => (
                <span key={alg.id} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                  {alg.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {isRunning && (
          <div className="text-center py-12">
            <LoadingSpinner />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 mt-4">
              Running Benchmarks...
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Testing {selectedAlgorithms.length} algorithms with {inputSize.toLocaleString()} data points
            </p>
          </div>
        )}

        {/* Results Visualization */}
        {results.length > 0 && (
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
              {(['performance', 'visualization', 'analysis'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'performance' && (
                <motion.div
                  key="performance"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Performance Chart */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Clock size={20} />
                      Execution Time Comparison
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="executionTime" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Memory Usage Chart */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Memory size={20} />
                      Memory Usage Comparison
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="memoryUsage" fill="#10B981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'visualization' && (
                <motion.div
                  key="visualization"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Radar Chart */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Multi-dimensional Performance Analysis
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={comparisonMetrics}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="algorithm" />
                          <PolarRadiusAxis angle={0} domain={[0, 100]} />
                          <Radar name="Performance" dataKey="performance" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                          <Radar name="Efficiency" dataKey="efficiency" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                          <Radar name="Scalability" dataKey="scalability" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Scalability Chart */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <TrendingUp size={20} />
                      Scalability Analysis
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="scalability" fill="#8B5CF6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'analysis' && (
                <motion.div
                  key="analysis"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Algorithm Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedAlgorithms.map((algorithm) => {
                      const result = results.find(r => r.algorithmId === algorithm.id);
                      const metrics = comparisonMetrics.find(m => m.algorithm === algorithm.name);
                      
                      return (
                        <div key={algorithm.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {algorithm.name}
                            </h3>
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs font-medium">
                              {algorithm.complexity.time}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            {algorithm.description}
                          </p>
                          
                          {result && (
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Execution Time:</span>
                                <span className="font-mono text-sm">{result.executionTime.toFixed(2)}ms</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Memory Usage:</span>
                                <span className="font-mono text-sm">{(result.memoryUsage / 1024 / 1024).toFixed(2)}MB</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Scalability Score:</span>
                                <span className="font-mono text-sm">{result.scalability.toFixed(1)}/100</span>
                              </div>
                              
                              {metrics && (
                                <div className="mt-4 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Overall Performance</span>
                                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                      <div 
                                        className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                                        style={{ width: `${metrics.performance}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgorithmComparison;