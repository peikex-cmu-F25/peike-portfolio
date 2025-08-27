/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';

interface ProcessedReceipt {
  id: string;
  items: ReceiptItem[];
  total: number;
  store: string;
  date: string;
  processingTime: number;
  accuracy: number;
}

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
  category: string;
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  confidence: number;
}

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  servings: number;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  matchPercentage: number;
}

interface ReceiptProcessingDemoProps {
  onClose?: () => void;
}

const ReceiptProcessingDemo: React.FC<ReceiptProcessingDemoProps> = ({ onClose }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedReceipt, setProcessedReceipt] = useState<ProcessedReceipt | null>(null);
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'receipt' | 'recipes'>('upload');

  // Sample receipt data for demo
  const sampleReceiptItems: ReceiptItem[] = [
    { name: "Organic Chicken Breast", quantity: 2, price: 12.99, category: "Meat", confidence: 0.95, nutritionalInfo: { calories: 231, protein: 43.5, carbs: 0, fat: 5 } },
    { name: "Fresh Spinach", quantity: 1, price: 2.49, category: "Vegetables", confidence: 0.92, nutritionalInfo: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 } },
    { name: "Roma Tomatoes", quantity: 3, price: 1.99, category: "Vegetables", confidence: 0.89, nutritionalInfo: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 } },
    { name: "Olive Oil", quantity: 1, price: 8.99, category: "Condiments", confidence: 0.98, nutritionalInfo: { calories: 884, protein: 0, carbs: 0, fat: 100 } },
    { name: "Parmesan Cheese", quantity: 1, price: 6.49, category: "Dairy", confidence: 0.91, nutritionalInfo: { calories: 431, protein: 38.5, carbs: 4.1, fat: 28.6 } },
    { name: "Garlic", quantity: 1, price: 0.89, category: "Vegetables", confidence: 0.87, nutritionalInfo: { calories: 149, protein: 6.4, carbs: 33, fat: 0.5 } }
  ];

  const sampleRecipes: Recipe[] = [
    {
      id: '1',
      name: 'Grilled Chicken Spinach Salad',
      ingredients: ['Chicken Breast', 'Fresh Spinach', 'Roma Tomatoes', 'Olive Oil', 'Parmesan Cheese', 'Garlic'],
      servings: 2,
      cookTime: '25 min',
      difficulty: 'Easy',
      matchPercentage: 100
    },
    {
      id: '2',
      name: 'Chicken Parmesan with Tomato',
      ingredients: ['Chicken Breast', 'Parmesan Cheese', 'Roma Tomatoes', 'Olive Oil', 'Garlic'],
      servings: 2,
      cookTime: '35 min',
      difficulty: 'Medium',
      matchPercentage: 83
    },
    {
      id: '3',
      name: 'Mediterranean Chicken Bowl',
      ingredients: ['Chicken Breast', 'Spinach', 'Tomatoes', 'Olive Oil'],
      servings: 1,
      cookTime: '20 min',
      difficulty: 'Easy',
      matchPercentage: 67
    }
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setActiveTab('receipt');
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: false
  });

  const simulateOCRProcessing = async () => {
    if (!uploadedImage) return;

    setIsProcessing(true);
    const steps = [
      'Preprocessing image...',
      'Detecting text regions...',
      'Running OCR recognition...',
      'Extracting item information...',
      'Categorizing products...',
      'Calculating nutritional data...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    const processedData: ProcessedReceipt = {
      id: Date.now().toString(),
      items: sampleReceiptItems,
      total: sampleReceiptItems.reduce((sum, item) => sum + item.price, 0),
      store: "Whole Foods Market",
      date: new Date().toLocaleDateString(),
      processingTime: 4.2,
      accuracy: 0.89
    };

    setProcessedReceipt(processedData);
    setIsProcessing(false);
    setProcessingStep('');
  };

  const generateRecipes = async () => {
    if (!processedReceipt) return;

    setIsProcessing(true);
    setProcessingStep('Analyzing ingredients and generating recipes...');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setGeneratedRecipes(sampleRecipes);
    setActiveTab('recipes');
    setIsProcessing(false);
    setProcessingStep('');
  };

  const useSampleReceipt = () => {
    setUploadedImage('/images/sample-receipt.jpg');
    setActiveTab('receipt');
  };

  const ExplanationOverlay: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute inset-0 bg-white bg-opacity-95 p-6 rounded-lg flex flex-col justify-center overflow-y-auto z-10"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4">How AI Receipt Processing Works</h3>
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
          <div>
            <strong>Image Preprocessing:</strong> Computer vision algorithms enhance image quality, correct distortion, and optimize for OCR processing
          </div>
        </div>
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
          <div>
            <strong>Text Detection:</strong> Deep learning models identify text regions and extract line-level information from receipt layouts
          </div>
        </div>
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
          <div>
            <strong>Product Classification:</strong> NLP models categorize items, identify quantities, and enrich data with nutritional information
          </div>
        </div>
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
          <div>
            <strong>Recipe Generation:</strong> Multi-agent system analyzes ingredients and generates personalized meal suggestions with optimization for nutrition and preferences
          </div>
        </div>
      </div>
      <button 
        onClick={() => setShowExplanation(false)}
        className="mt-4 btn-primary self-start"
      >
        Got it!
      </button>
    </motion.div>
  );

  const TabButton: React.FC<{ tab: string; label: string; isActive: boolean; onClick: () => void }> = ({ 
    tab, label, isActive, onClick 
  }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        isActive 
          ? 'bg-primary-600 text-white shadow-sm' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 h-full">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          AI Receipt & Recipe Processing Demo
        </h2>
        <p className="text-gray-600 mb-4">
          Experience computer vision-powered receipt analysis and intelligent meal planning
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setShowExplanation(true)}
            className="btn-secondary text-sm"
          >
            How it Works
          </button>
          {onClose && (
            <button onClick={onClose} className="btn-secondary text-sm">
              Close Demo
            </button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <div className="flex gap-2 bg-gray-50 p-1 rounded-lg">
          <TabButton tab="upload" label="📤 Upload" isActive={activeTab === 'upload'} onClick={() => setActiveTab('upload')} />
          <TabButton tab="receipt" label="🧾 Process" isActive={activeTab === 'receipt'} onClick={() => setActiveTab('receipt')} />
          <TabButton tab="recipes" label="👨‍🍳 Recipes" isActive={activeTab === 'recipes'} onClick={() => setActiveTab('recipes')} />
        </div>
      </div>

      <div className="relative">
        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8">
              <div {...getRootProps()} className="cursor-pointer">
                <input {...getInputProps()} />
                <div className="text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <p className="text-xl font-semibold text-gray-700 mb-2">
                    {isDragActive ? 'Drop your receipt here!' : 'Upload Receipt Image'}
                  </p>
                  <p className="text-gray-500">
                    Drag & drop a receipt image or click to select
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Supports PNG, JPG, JPEG formats
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">Or try our sample receipt</p>
              <button onClick={useSampleReceipt} className="btn-primary">
                Use Sample Receipt
              </button>
            </div>
          </motion.div>
        )}

        {/* Receipt Processing Tab */}
        {activeTab === 'receipt' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid lg:grid-cols-2 gap-6"
          >
            {/* Image Preview */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Receipt Image</h3>
              {uploadedImage ? (
                <div className="relative">
                  <img 
                    src={uploadedImage} 
                    alt="Receipt" 
                    className="w-full max-h-96 object-contain bg-gray-100 rounded-lg"
                  />
                  {!processedReceipt && !isProcessing && (
                    <button
                      onClick={simulateOCRProcessing}
                      className="mt-4 btn-primary w-full"
                    >
                      Process Receipt
                    </button>
                  )}
                </div>
              ) : (
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">No image uploaded</p>
                </div>
              )}
            </div>

            {/* Processing Results */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Extracted Data</h3>
              
              {isProcessing && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-5 h-5 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-yellow-800 font-medium">Processing Receipt...</span>
                  </div>
                  <p className="text-sm text-yellow-700">{processingStep}</p>
                </div>
              )}

              {processedReceipt && !isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Receipt Summary */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Processing Complete</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-green-600">Store:</span>
                        <span className="ml-2 font-medium">{processedReceipt.store}</span>
                      </div>
                      <div>
                        <span className="text-green-600">Total:</span>
                        <span className="ml-2 font-medium">${processedReceipt.total.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-green-600">Accuracy:</span>
                        <span className="ml-2 font-medium">{Math.round(processedReceipt.accuracy * 100)}%</span>
                      </div>
                      <div>
                        <span className="text-green-600">Process Time:</span>
                        <span className="ml-2 font-medium">{processedReceipt.processingTime}s</span>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-80 overflow-y-auto">
                    <h4 className="font-semibold text-gray-900 mb-3">Detected Items ({processedReceipt.items.length})</h4>
                    <div className="space-y-2">
                      {processedReceipt.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div>
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-gray-600">
                              {item.category} • {Math.round(item.confidence * 100)}% confidence
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-sm">${item.price.toFixed(2)}</div>
                            <div className="text-xs text-gray-600">Qty: {item.quantity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={generateRecipes}
                    className="btn-primary w-full"
                  >
                    Generate Recipe Recommendations
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Recipes Tab */}
        {activeTab === 'recipes' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {isProcessing && (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">{processingStep}</p>
              </div>
            )}

            {generatedRecipes.length > 0 && !isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Recommended Recipes</h3>
                  <p className="text-gray-600">Based on your purchased ingredients</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generatedRecipes.map((recipe, index) => (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-900 text-lg">{recipe.name}</h4>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {recipe.matchPercentage}% match
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Servings:</span>
                          <span className="font-medium">{recipe.servings}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Cook Time:</span>
                          <span className="font-medium">{recipe.cookTime}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Difficulty:</span>
                          <span className={`font-medium ${
                            recipe.difficulty === 'Easy' ? 'text-green-600' :
                            recipe.difficulty === 'Medium' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {recipe.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h5 className="font-medium text-gray-900 mb-2">Ingredients Used:</h5>
                        <div className="flex flex-wrap gap-1">
                          {recipe.ingredients.map((ingredient, idx) => (
                            <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="btn-primary w-full text-sm">
                        View Full Recipe
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Impact Metrics */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-4">📊 Smart Meal Planning Impact</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">30%</div>
                      <div className="text-sm text-blue-700">Food Waste Reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">82%</div>
                      <div className="text-sm text-blue-700">Receipt Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">5+</div>
                      <div className="text-sm text-blue-700">Hours/Week Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">Real-time</div>
                      <div className="text-sm text-blue-700">Processing Speed</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {generatedRecipes.length === 0 && !isProcessing && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🍳</div>
                <p className="text-gray-500 text-lg">Process a receipt first to see recipe recommendations</p>
              </div>
            )}
          </motion.div>
        )}

        <AnimatePresence>
          {showExplanation && <ExplanationOverlay />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReceiptProcessingDemo;