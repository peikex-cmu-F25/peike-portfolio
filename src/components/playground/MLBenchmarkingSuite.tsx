import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, BarChart, Bar, Legend, Area, AreaChart } from 'recharts';
import { Brain, Cpu, Zap, Target, TrendingUp, Download, Play, Pause, RotateCcw } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import { LoadingSpinner } from '../ui';

interface MLModel {
  id: string;
  name: string;
  description: string;
  type: 'regression' | 'classification' | 'clustering' | 'neural-network';
  architecture?: string;
  parameters: Record<string, any>;
  createModel: () => tf.LayersModel | Promise<tf.LayersModel>;
  preprocessData?: (data: any) => any;
}

interface BenchmarkMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainTime: number;
  inferenceTime: number;
  modelSize: number;
  memoryUsage: number;
  convergenceEpochs: number;
}

interface BenchmarkResult {
  modelId: string;
  metrics: BenchmarkMetrics;
  trainingHistory: { epoch: number; loss: number; accuracy: number; valLoss?: number; valAccuracy?: number }[];
  predictions?: number[];
  confusionMatrix?: number[][];
  timestamp: number;
}

const MLBenchmarkingSuite: React.FC = () => {
  const [selectedModels, setSelectedModels] = useState<MLModel[]>([]);
  const [isRunning, setBenchmarkRunning] = useState(false);
  const [results, setResults] = useState<BenchmarkResult[]>([]);
  const [datasetSize, setDatasetSize] = useState(1000);
  const [splitRatio, setSplitRatio] = useState(0.8);
  const [epochs, setEpochs] = useState(10);
  const [activeTab, setActiveTab] = useState<'overview' | 'training' | 'performance' | 'comparison'>('overview');
  const [realTimeMetrics, setRealTimeMetrics] = useState<any[]>([]);
  const [currentTrainingModel, setCurrentTrainingModel] = useState<string>('');

  // ML Model Templates
  const modelTemplates: MLModel[] = [
    {
      id: 'linear-regression',
      name: 'Linear Regression',
      description: 'Simple linear model for regression tasks with fast training and interpretable results',
      type: 'regression',
      architecture: 'Dense(1, linear)',
      parameters: { learningRate: 0.01, optimizer: 'sgd' },
      createModel: () => {
        const model = tf.sequential({
          layers: [
            tf.layers.dense({ inputShape: [1], units: 1 })
          ]
        });
        
        model.compile({
          optimizer: tf.train.sgd(0.01),
          loss: 'meanSquaredError',
          metrics: ['mse']
        });
        
        return model;
      }
    },
    {
      id: 'neural-network',
      name: 'Neural Network (2-layer)',
      description: 'Multi-layer perceptron with hidden layer for non-linear pattern recognition',
      type: 'neural-network',
      architecture: 'Dense(64, ReLU) → Dense(32, ReLU) → Dense(1)',
      parameters: { learningRate: 0.001, optimizer: 'adam', hiddenUnits: [64, 32] },
      createModel: () => {
        const model = tf.sequential({
          layers: [
            tf.layers.dense({ inputShape: [1], units: 64, activation: 'relu' }),
            tf.layers.dense({ units: 32, activation: 'relu' }),
            tf.layers.dense({ units: 1 })
          ]
        });
        
        model.compile({
          optimizer: tf.train.adam(0.001),
          loss: 'meanSquaredError',
          metrics: ['mse']
        });
        
        return model;
      }
    },
    {
      id: 'deep-neural-network',
      name: 'Deep Neural Network (4-layer)',
      description: 'Deep architecture for complex pattern recognition with dropout regularization',
      type: 'neural-network',
      architecture: 'Dense(128, ReLU) → Dropout(0.2) → Dense(64, ReLU) → Dense(32, ReLU) → Dense(16, ReLU) → Dense(1)',
      parameters: { learningRate: 0.001, optimizer: 'adam', dropout: 0.2, hiddenUnits: [128, 64, 32, 16] },
      createModel: () => {
        const model = tf.sequential({
          layers: [
            tf.layers.dense({ inputShape: [1], units: 128, activation: 'relu' }),
            tf.layers.dropout({ rate: 0.2 }),
            tf.layers.dense({ units: 64, activation: 'relu' }),
            tf.layers.dense({ units: 32, activation: 'relu' }),
            tf.layers.dense({ units: 16, activation: 'relu' }),
            tf.layers.dense({ units: 1 })
          ]
        });
        
        model.compile({
          optimizer: tf.train.adam(0.001),
          loss: 'meanSquaredError',
          metrics: ['mse']
        });
        
        return model;
      }
    },
    {
      id: 'classification-network',
      name: 'Classification Network',
      description: 'Binary classification model with sigmoid activation for decision boundaries',
      type: 'classification',
      architecture: 'Dense(64, ReLU) → Dense(32, ReLU) → Dense(1, Sigmoid)',
      parameters: { learningRate: 0.001, optimizer: 'adam', activation: 'sigmoid' },
      createModel: () => {
        const model = tf.sequential({
          layers: [
            tf.layers.dense({ inputShape: [2], units: 64, activation: 'relu' }),
            tf.layers.dense({ units: 32, activation: 'relu' }),
            tf.layers.dense({ units: 1, activation: 'sigmoid' })
          ]
        });
        
        model.compile({
          optimizer: tf.train.adam(0.001),
          loss: 'binaryCrossentropy',
          metrics: ['accuracy']
        });
        
        return model;
      }
    }
  ];

  // Generate synthetic datasets
  const generateRegressionData = useCallback((size: number) => {
    const x = tf.linspace(-1, 1, size);
    const y = x.square().add(x.mul(0.5)).add(tf.randomNormal([size], 0, 0.1));
    return { x, y };
  }, []);

  const generateClassificationData = useCallback((size: number) => {
    const x1 = tf.randomNormal([size, 1], 0, 1);
    const x2 = tf.randomNormal([size, 1], 0, 1);
    const x = tf.concat([x1, x2], 1);
    
    // Create circular decision boundary
    const distanceFromOrigin = x.square().sum(1);
    const y = distanceFromOrigin.less(1).cast('float32');
    
    return { x, y };
  }, []);

  const runBenchmark = useCallback(async () => {
    if (selectedModels.length === 0 || isRunning) return;
    
    setBenchmarkRunning(true);
    setResults([]);
    setRealTimeMetrics([]);
    
    const newResults: BenchmarkResult[] = [];
    
    for (const modelTemplate of selectedModels) {
      try {
        setCurrentTrainingModel(modelTemplate.name);
        
        // Generate appropriate dataset
        const isClassification = modelTemplate.type === 'classification';
        const data = isClassification 
          ? generateClassificationData(datasetSize)
          : generateRegressionData(datasetSize);
        
        const trainSize = Math.floor(datasetSize * splitRatio);
        const xTrain = data.x.slice([0, 0], [trainSize, -1]);
        const yTrain = data.y.slice([0], [trainSize]);
        const xTest = data.x.slice([trainSize, 0], [-1, -1]);
        const yTest = data.y.slice([trainSize], [-1]);
        
        // Create and train model
        const startTime = performance.now();
        const model = modelTemplate.createModel();
        
        // Training with callbacks for real-time updates
        const trainingHistory: { epoch: number; loss: number; accuracy: number; valLoss?: number; valAccuracy?: number }[] = [];
        
        const history = await model.fit(xTrain, yTrain, {
          epochs,
          validationSplit: 0.2,
          verbose: 0,
          callbacks: {
            onEpochEnd: (epoch, logs) => {
              const entry = {
                epoch: epoch + 1,
                loss: logs?.loss || 0,
                accuracy: logs?.accuracy || logs?.mse || 0,
                valLoss: logs?.val_loss,
                valAccuracy: logs?.val_accuracy || logs?.val_mse
              };
              trainingHistory.push(entry);
              
              // Update real-time metrics
              setRealTimeMetrics(prev => [...prev, {
                model: modelTemplate.name,
                epoch: epoch + 1,
                loss: logs?.loss || 0,
                accuracy: (logs?.accuracy || (1 / (logs?.mse || 1))) * 100
              }]);
            }
          }
        });
        
        const trainTime = performance.now() - startTime;
        
        // Calculate inference time
        const inferenceStart = performance.now();
        const predictions = model.predict(xTest) as tf.Tensor;
        await predictions.data(); // Wait for GPU computation
        const inferenceTime = performance.now() - inferenceStart;
        
        // Calculate metrics
        const predictionValues = await predictions.data();
        const trueValues = await yTest.data();
        
        let accuracy = 0;
        let precision = 0;
        let recall = 0;
        let f1Score = 0;
        
        if (isClassification) {
          // Binary classification metrics
          const predictedClasses = Array.from(predictionValues).map(p => p > 0.5 ? 1 : 0);
          const trueClasses = Array.from(trueValues);
          
          let tp = 0, fp = 0, tn = 0, fn = 0;
          
          for (let i = 0; i < predictedClasses.length; i++) {
            if (predictedClasses[i] === 1 && trueClasses[i] === 1) tp++;
            else if (predictedClasses[i] === 1 && trueClasses[i] === 0) fp++;
            else if (predictedClasses[i] === 0 && trueClasses[i] === 0) tn++;
            else fn++;
          }
          
          accuracy = (tp + tn) / (tp + tn + fp + fn);
          precision = tp / (tp + fp) || 0;
          recall = tp / (tp + fn) || 0;
          f1Score = 2 * (precision * recall) / (precision + recall) || 0;
        } else {
          // Regression metrics (R²)
          const mean = Array.from(trueValues).reduce((a, b) => a + b, 0) / trueValues.length;
          const totalSumSquares = Array.from(trueValues).reduce((sum, val) => sum + Math.pow(val - mean, 2), 0);
          const residualSumSquares = Array.from(predictionValues).reduce((sum, pred, i) => sum + Math.pow(trueValues[i] - pred, 2), 0);
          accuracy = 1 - (residualSumSquares / totalSumSquares);
          precision = accuracy;
          recall = accuracy;
          f1Score = accuracy;
        }
        
        // Get model size
        const modelSize = model.countParams();
        
        const benchmarkResult: BenchmarkResult = {
          modelId: modelTemplate.id,
          metrics: {
            accuracy: accuracy * 100,
            precision: precision * 100,
            recall: recall * 100,
            f1Score: f1Score * 100,
            trainTime,
            inferenceTime,
            modelSize,
            memoryUsage: performance.memory ? performance.memory.usedJSHeapSize / 1024 / 1024 : 0,
            convergenceEpochs: trainingHistory.length
          },
          trainingHistory,
          predictions: Array.from(predictionValues),
          timestamp: Date.now()
        };
        
        newResults.push(benchmarkResult);
        
        // Cleanup
        model.dispose();
        xTrain.dispose();
        yTrain.dispose();
        xTest.dispose();
        yTest.dispose();
        predictions.dispose();
        data.x.dispose();
        data.y.dispose();
        
      } catch (error) {
        console.error(`Error benchmarking ${modelTemplate.name}:`, error);
        newResults.push({
          modelId: modelTemplate.id,
          metrics: {
            accuracy: 0,
            precision: 0,
            recall: 0,
            f1Score: 0,
            trainTime: 0,
            inferenceTime: 0,
            modelSize: 0,
            memoryUsage: 0,
            convergenceEpochs: 0
          },
          trainingHistory: [],
          timestamp: Date.now()
        });
      }
    }
    
    setResults(newResults);
    setCurrentTrainingModel('');
    setBenchmarkRunning(false);
  }, [selectedModels, datasetSize, splitRatio, epochs, isRunning, generateRegressionData, generateClassificationData]);

  const toggleModel = useCallback((model: MLModel) => {
    setSelectedModels(prev => {
      const exists = prev.some(m => m.id === model.id);
      if (exists) {
        return prev.filter(m => m.id !== model.id);
      } else {
        return [...prev, model];
      }
    });
  }, []);

  const resetBenchmark = useCallback(() => {
    setResults([]);
    setRealTimeMetrics([]);
    setCurrentTrainingModel('');
  }, []);

  const exportResults = useCallback(() => {
    const exportData = {
      models: selectedModels.map(m => ({ id: m.id, name: m.name, type: m.type })),
      results,
      settings: { datasetSize, splitRatio, epochs },
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ml-benchmark-results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [selectedModels, results, datasetSize, splitRatio, epochs]);

  const comparisonData = useMemo(() => {
    return results.map(result => {
      const model = modelTemplates.find(m => m.id === result.modelId);
      return {
        name: model?.name || result.modelId,
        accuracy: result.metrics.accuracy,
        trainTime: result.metrics.trainTime,
        inferenceTime: result.metrics.inferenceTime,
        modelSize: result.metrics.modelSize,
        f1Score: result.metrics.f1Score
      };
    });
  }, [results]);

  const trainingProgressData = useMemo(() => {
    if (results.length === 0) return [];
    
    const allEpochs = Math.max(...results.map(r => r.trainingHistory.length));
    const data: any[] = [];
    
    for (let epoch = 1; epoch <= allEpochs; epoch++) {
      const epochData: any = { epoch };
      
      results.forEach((result, index) => {
        const model = modelTemplates.find(m => m.id === result.modelId);
        const historyEntry = result.trainingHistory.find(h => h.epoch === epoch);
        if (historyEntry) {
          epochData[`${model?.name}_loss`] = historyEntry.loss;
          epochData[`${model?.name}_accuracy`] = historyEntry.accuracy;
        }
      });
      
      data.push(epochData);
    }
    
    return data;
  }, [results]);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Brain className="text-purple-600" />
          ML Model Benchmarking Suite
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Compare machine learning model performance with real-time training metrics and comprehensive analysis
        </p>
      </div>

      {/* Controls */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Dataset Size
              </label>
              <select
                value={datasetSize}
                onChange={(e) => setDatasetSize(Number(e.target.value))}
                className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
              >
                <option value={500}>500 samples</option>
                <option value={1000}>1,000 samples</option>
                <option value={2500}>2,500 samples</option>
                <option value={5000}>5,000 samples</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Train/Test Split
              </label>
              <select
                value={splitRatio}
                onChange={(e) => setSplitRatio(Number(e.target.value))}
                className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
              >
                <option value={0.7}>70/30</option>
                <option value={0.8}>80/20</option>
                <option value={0.9}>90/10</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Epochs
              </label>
              <input
                type="range"
                min="5"
                max="50"
                value={epochs}
                onChange={(e) => setEpochs(Number(e.target.value))}
                className="w-24"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{epochs}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={resetBenchmark}
              disabled={isRunning}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition-all disabled:opacity-50"
            >
              <RotateCcw size={16} />
              Reset
            </button>
            
            <button
              onClick={runBenchmark}
              disabled={selectedModels.length === 0 || isRunning}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedModels.length === 0 || isRunning
                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-purple-500 hover:bg-purple-600 text-white shadow-md hover:shadow-lg'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause size={16} />
                  Training...
                </>
              ) : (
                <>
                  <Play size={16} />
                  Benchmark ({selectedModels.length})
                </>
              )}
            </button>
            
            {results.length > 0 && (
              <button
                onClick={exportResults}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all"
              >
                <Download size={16} />
                Export
              </button>
            )}
          </div>
        </div>
        
        {/* Model Selection */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Models to Compare:</h3>
          <div className="flex flex-wrap gap-2">
            {modelTemplates.map((model) => (
              <button
                key={model.id}
                onClick={() => toggleModel(model)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                  selectedModels.some(m => m.id === model.id)
                    ? 'bg-purple-500 text-white shadow-md border-purple-500'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-gray-600'
                }`}
              >
                <div className="font-medium">{model.name}</div>
                <div className="text-xs opacity-75">{model.architecture}</div>
              </button>
            ))}
          </div>
        </div>
        
        {currentTrainingModel && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Cpu className="animate-pulse" size={16} />
              <span className="font-medium">Training: {currentTrainingModel}</span>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex-1 p-6 overflow-auto">
        {selectedModels.length === 0 && (
          <div className="text-center py-12">
            <Brain size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Select ML Models to Benchmark
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose models from the options above to compare their performance on synthetic datasets
            </p>
          </div>
        )}
        
        {selectedModels.length > 0 && results.length === 0 && !isRunning && (
          <div className="text-center py-12">
            <Play size={48} className="mx-auto text-purple-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Ready to Benchmark
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {selectedModels.length} models selected. Click "Benchmark" to start training and evaluation.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedModels.map((model) => (
                <span key={model.id} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                  {model.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {isRunning && (
          <div className="text-center py-12">
            <LoadingSpinner />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 mt-4">
              Training Models...
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Training {selectedModels.length} models for {epochs} epochs on {datasetSize.toLocaleString()} samples
            </p>
            {currentTrainingModel && (
              <div className="text-purple-600 dark:text-purple-400 font-medium">
                Currently training: {currentTrainingModel}
              </div>
            )}
            
            {realTimeMetrics.length > 0 && (
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Real-time Training Progress</h4>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={realTimeMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="epoch" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="loss" stroke="#ef4444" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
              {(['overview', 'training', 'performance', 'comparison'] as const).map((tab) => (
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
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {results.map((result) => {
                    const model = modelTemplates.find(m => m.id === result.modelId);
                    return (
                      <div key={result.modelId} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {model?.name}
                          </h3>
                          <div className={`w-3 h-3 rounded-full ${
                            result.metrics.accuracy > 80 ? 'bg-green-500' :
                            result.metrics.accuracy > 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400 text-sm">Accuracy:</span>
                            <span className="font-mono text-sm font-medium">{result.metrics.accuracy.toFixed(1)}%</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400 text-sm">Train Time:</span>
                            <span className="font-mono text-sm">{result.metrics.trainTime.toFixed(0)}ms</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400 text-sm">Model Size:</span>
                            <span className="font-mono text-sm">{result.metrics.modelSize.toLocaleString()} params</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400 text-sm">F1 Score:</span>
                            <span className="font-mono text-sm font-medium">{result.metrics.f1Score.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {activeTab === 'training' && (
                <motion.div
                  key="training"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <TrendingUp size={20} />
                      Training Loss Comparison
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trainingProgressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="epoch" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          {results.map((result, index) => {
                            const model = modelTemplates.find(m => m.id === result.modelId);
                            const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
                            return (
                              <Line
                                key={result.modelId}
                                type="monotone"
                                dataKey={`${model?.name}_loss`}
                                stroke={colors[index % colors.length]}
                                strokeWidth={2}
                                dot={false}
                              />
                            );
                          })}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Target size={20} />
                      Training Accuracy Progress
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trainingProgressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="epoch" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          {results.map((result, index) => {
                            const model = modelTemplates.find(m => m.id === result.modelId);
                            const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
                            return (
                              <Area
                                key={result.modelId}
                                type="monotone"
                                dataKey={`${model?.name}_accuracy`}
                                stackId="1"
                                stroke={colors[index % colors.length]}
                                fill={colors[index % colors.length]}
                                fillOpacity={0.3}
                              />
                            );
                          })}
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'performance' && (
                <motion.div
                  key="performance"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Training Time Comparison
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={comparisonData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="trainTime" fill="#3B82F6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Model Size vs Accuracy
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="modelSize" name="Model Size" />
                            <YAxis dataKey="accuracy" name="Accuracy" />
                            <Tooltip />
                            <Scatter data={comparisonData} fill="#10B981" />
                          </ScatterChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'comparison' && (
                <motion.div
                  key="comparison"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Comprehensive Model Comparison
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-3 px-4">Model</th>
                            <th className="text-right py-3 px-4">Accuracy</th>
                            <th className="text-right py-3 px-4">F1 Score</th>
                            <th className="text-right py-3 px-4">Train Time</th>
                            <th className="text-right py-3 px-4">Inference Time</th>
                            <th className="text-right py-3 px-4">Model Size</th>
                            <th className="text-right py-3 px-4">Memory Usage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((result) => {
                            const model = modelTemplates.find(m => m.id === result.modelId);
                            return (
                              <tr key={result.modelId} className="border-b border-gray-100 dark:border-gray-800">
                                <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{model?.name}</td>
                                <td className="py-3 px-4 text-right font-mono">{result.metrics.accuracy.toFixed(1)}%</td>
                                <td className="py-3 px-4 text-right font-mono">{result.metrics.f1Score.toFixed(1)}%</td>
                                <td className="py-3 px-4 text-right font-mono">{result.metrics.trainTime.toFixed(0)}ms</td>
                                <td className="py-3 px-4 text-right font-mono">{result.metrics.inferenceTime.toFixed(2)}ms</td>
                                <td className="py-3 px-4 text-right font-mono">{result.metrics.modelSize.toLocaleString()}</td>
                                <td className="py-3 px-4 text-right font-mono">{result.metrics.memoryUsage.toFixed(1)}MB</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
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

export default MLBenchmarkingSuite;