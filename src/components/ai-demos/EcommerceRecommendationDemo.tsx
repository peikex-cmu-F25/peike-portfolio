/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  features: string[];
  similarityScore?: number;
  reasons?: string[];
}

interface UserPreferences {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  preferences: {
    brand: string[];
    features: string[];
  };
}

interface EcommerceRecommendationDemoProps {
  onClose?: () => void;
}

const EcommerceRecommendationDemo: React.FC<EcommerceRecommendationDemoProps> = ({ onClose }) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    categories: [],
    priceRange: [0, 1000],
    minRating: 0,
    preferences: { brand: [], features: [] }
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [algorithmStep, setAlgorithmStep] = useState('');

  // Sample product catalog
  const productCatalog: Product[] = [
    {
      id: '1',
      name: 'MacBook Air M2',
      category: 'Laptops',
      price: 1199,
      rating: 4.8,
      reviews: 2547,
      image: '💻',
      description: 'Lightweight laptop with M2 chip, perfect for productivity and creative work',
      features: ['M2 Chip', '8GB RAM', '256GB SSD', 'Retina Display', 'All-day battery']
    },
    {
      id: '2', 
      name: 'iPhone 15 Pro',
      category: 'Smartphones',
      price: 999,
      rating: 4.7,
      reviews: 1832,
      image: '📱',
      description: 'Latest iPhone with titanium design and advanced camera system',
      features: ['A17 Pro', '128GB Storage', 'Triple Camera', '5G', 'Titanium']
    },
    {
      id: '3',
      name: 'Sony WH-1000XM5',
      category: 'Audio',
      price: 399,
      rating: 4.6,
      reviews: 3421,
      image: '🎧',
      description: 'Premium noise-canceling wireless headphones',
      features: ['Active Noise Canceling', '30hr Battery', 'Bluetooth 5.2', 'Touch Controls']
    },
    {
      id: '4',
      name: 'iPad Pro 12.9"',
      category: 'Tablets',
      price: 1099,
      rating: 4.8,
      reviews: 1756,
      image: '📱',
      description: 'Professional tablet with M2 chip and Liquid Retina display',
      features: ['M2 Chip', '12.9" Display', 'Apple Pencil Support', '128GB Storage']
    },
    {
      id: '5',
      name: 'Samsung Galaxy Watch 5',
      category: 'Wearables',
      price: 279,
      rating: 4.4,
      reviews: 892,
      image: '⌚',
      description: 'Advanced smartwatch with health monitoring',
      features: ['Health Tracking', 'GPS', 'Water Resistant', '44mm']
    },
    {
      id: '6',
      name: 'Dell XPS 13',
      category: 'Laptops',
      price: 899,
      rating: 4.5,
      reviews: 1234,
      image: '💻',
      description: 'Compact ultrabook with premium build quality',
      features: ['Intel i7', '16GB RAM', '512GB SSD', '13.4" Display']
    },
    {
      id: '7',
      name: 'AirPods Pro 2',
      category: 'Audio',
      price: 249,
      rating: 4.9,
      reviews: 4523,
      image: '🎧',
      description: 'Wireless earbuds with adaptive transparency',
      features: ['Active Noise Canceling', 'Spatial Audio', 'MagSafe Case', 'H2 Chip']
    },
    {
      id: '8',
      name: 'Surface Pro 9',
      category: 'Tablets',
      price: 999,
      rating: 4.3,
      reviews: 987,
      image: '📱',
      description: '2-in-1 laptop tablet with versatile design',
      features: ['Intel i5', '8GB RAM', 'Type Cover', 'Surface Pen Support']
    }
  ];

  const categories = ['All', 'Laptops', 'Smartphones', 'Audio', 'Tablets', 'Wearables'];
  const priceRanges = [
    { label: 'Under $300', range: [0, 300] as [number, number] },
    { label: '$300 - $600', range: [300, 600] as [number, number] },
    { label: '$600 - $1000', range: [600, 1000] as [number, number] },
    { label: 'Over $1000', range: [1000, 2000] as [number, number] }
  ];

  // Collaborative filtering algorithm simulation
  const calculateRecommendations = async () => {
    setIsCalculating(true);
    setActiveStep(0);

    const steps = [
      'Analyzing user behavior patterns...',
      'Building user-item interaction matrix...',
      'Computing item-to-item similarities...',
      'Applying collaborative filtering...',
      'Ranking recommendations by relevance...',
      'Applying business rules and filters...'
    ];

    // Simulate step-by-step processing
    for (let i = 0; i < steps.length; i++) {
      setAlgorithmStep(steps[i]);
      setActiveStep(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Calculate recommendations based on selected products
    const recommendedProducts = productCatalog
      .filter(product => !selectedProducts.find(p => p.id === product.id))
      .map(product => {
        let score = 0;
        let reasons: string[] = [];

        // Category similarity
        selectedProducts.forEach(selectedProduct => {
          if (selectedProduct.category === product.category) {
            score += 0.4;
            reasons.push(`Same category as ${selectedProduct.name}`);
          }
        });

        // Price range similarity
        if (selectedProducts.length > 0) {
          const avgSelectedPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0) / selectedProducts.length;
          const priceDiff = Math.abs(product.price - avgSelectedPrice);
          const priceScore = Math.max(0, 1 - (priceDiff / 1000));
          score += priceScore * 0.3;
          
          if (priceScore > 0.7) {
            reasons.push('Similar price range');
          }
        }

        // Rating boost
        if (product.rating >= 4.5) {
          score += 0.2;
          reasons.push('Highly rated product');
        }

        // Feature overlap (simplified)
        selectedProducts.forEach(selectedProduct => {
          const featureOverlap = selectedProduct.features.filter(feature =>
            product.features.some(pf => pf.toLowerCase().includes(feature.toLowerCase()) || 
                                  feature.toLowerCase().includes(pf.toLowerCase()))
          );
          if (featureOverlap.length > 0) {
            score += featureOverlap.length * 0.1;
            reasons.push(`Similar features: ${featureOverlap.join(', ')}`);
          }
        });

        // Add some randomness for demo variety
        score += Math.random() * 0.1;

        return {
          ...product,
          similarityScore: Math.min(1, score),
          reasons: reasons.slice(0, 3)
        };
      })
      .filter(product => product.similarityScore! > 0.1)
      .sort((a, b) => b.similarityScore! - a.similarityScore!)
      .slice(0, 6);

    setRecommendations(recommendedProducts);
    setIsCalculating(false);
    setActiveStep(steps.length);
  };

  const addToSelection = (product: Product) => {
    if (!selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
      setRecommendations([]);
    }
  };

  const removeFromSelection = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
    setRecommendations([]);
  };

  const ProductCard: React.FC<{ 
    product: Product; 
    isSelected?: boolean;
    isRecommendation?: boolean;
    onClick?: () => void;
  }> = ({ product, isSelected = false, isRecommendation = false, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white border-2 rounded-lg p-4 cursor-pointer transition-all ${
        isSelected
          ? 'border-primary-500 bg-primary-50'
          : isRecommendation
          ? 'border-green-300 bg-green-50'
          : 'border-gray-200 hover:border-primary-300'
      }`}
      onClick={onClick}
    >
      <div className="text-center mb-3">
        <div className="text-4xl mb-2">{product.image}</div>
        <h4 className="font-semibold text-gray-900 text-sm">{product.name}</h4>
        <p className="text-xs text-gray-600">{product.category}</p>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex justify-between items-center">
          <span className="font-bold text-primary-600">${product.price}</span>
          {product.similarityScore && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {Math.round(product.similarityScore * 100)}% match
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{product.rating}</span>
          </div>
          <span className="text-gray-500">({product.reviews} reviews)</span>
        </div>
      </div>

      {product.reasons && product.reasons.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-gray-600 font-medium mb-1">Why recommended:</p>
          <div className="space-y-1">
            {product.reasons.map((reason, idx) => (
              <p key={idx} className="text-xs text-green-700 bg-green-100 rounded px-2 py-1">
                • {reason}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-1">
        {product.features.slice(0, 2).map((feature, idx) => (
          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {feature}
          </span>
        ))}
        {product.features.length > 2 && (
          <span className="text-xs text-gray-500">+{product.features.length - 2}</span>
        )}
      </div>
    </motion.div>
  );

  const ExplanationOverlay: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute inset-0 bg-white bg-opacity-95 p-6 rounded-lg flex flex-col justify-center overflow-y-auto z-10"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4">How E-commerce Recommendations Work</h3>
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
          <div>
            <strong>User Behavior Analysis:</strong> System tracks user interactions, purchases, and preferences to build comprehensive user profiles
          </div>
        </div>
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
          <div>
            <strong>Collaborative Filtering:</strong> Algorithms find similar users and products based on interaction patterns and feature similarities
          </div>
        </div>
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
          <div>
            <strong>Content-Based Filtering:</strong> Product features, categories, and attributes are analyzed to find items with similar characteristics
          </div>
        </div>
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
          <div>
            <strong>Hybrid Approach:</strong> Multiple algorithms are combined and weighted to provide the most accurate and diverse recommendations
          </div>
        </div>
        <div className="flex items-start">
          <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">5</span>
          <div>
            <strong>Real-time Optimization:</strong> Machine learning models continuously improve based on user feedback and conversion rates
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

  return (
    <div className="max-w-6xl mx-auto p-6 h-full">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          E-commerce Recommendation Engine Demo
        </h2>
        <p className="text-gray-600 mb-4">
          Experience intelligent product recommendations powered by collaborative filtering
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Product Selection */}
        <div className="lg:col-span-2 space-y-6 relative">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              1. Browse & Select Products You Like
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {productCatalog.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={selectedProducts.some(p => p.id === product.id)}
                  onClick={() => {
                    if (selectedProducts.some(p => p.id === product.id)) {
                      removeFromSelection(product.id);
                    } else {
                      addToSelection(product);
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Recommendations Section */}
          {(selectedProducts.length > 0 || recommendations.length > 0) && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  2. AI-Generated Recommendations
                </h3>
                {selectedProducts.length > 0 && recommendations.length === 0 && !isCalculating && (
                  <button
                    onClick={calculateRecommendations}
                    className="btn-primary"
                  >
                    Get Recommendations
                  </button>
                )}
              </div>

              {isCalculating && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-6 h-6 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-medium text-yellow-800">Processing Recommendations...</span>
                  </div>
                  <p className="text-sm text-yellow-700 mb-3">{algorithmStep}</p>
                  <div className="w-full bg-yellow-200 rounded-full h-2">
                    <div
                      className="bg-yellow-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(activeStep / 6) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {recommendations.length > 0 && !isCalculating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-green-800 mb-1">✨ Recommendations Ready!</h4>
                    <p className="text-sm text-green-700">
                      Found {recommendations.length} products you might like based on your selections.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {recommendations.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <ProductCard
                          product={product}
                          isRecommendation={true}
                          onClick={() => addToSelection(product)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          <AnimatePresence>
            {showExplanation && <ExplanationOverlay />}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Products */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              🛒 Selected Products ({selectedProducts.length})
            </h3>
            {selectedProducts.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {selectedProducts.map(product => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-primary-50 border border-primary-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{product.image}</span>
                      <div>
                        <p className="font-medium text-sm text-primary-900">{product.name}</p>
                        <p className="text-xs text-primary-700">${product.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromSelection(product.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <div className="pt-2 border-t border-primary-200">
                  <p className="text-sm text-primary-700">
                    Total: ${selectedProducts.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Select products to see personalized recommendations</p>
            )}
          </div>

          {/* Algorithm Insights */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              📊 Algorithm Insights
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Products Analyzed:</span>
                <span className="font-bold text-blue-900">{productCatalog.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">User Selections:</span>
                <span className="font-bold text-blue-900">{selectedProducts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Recommendations:</span>
                <span className="font-bold text-blue-900">{recommendations.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Match Accuracy:</span>
                <span className="font-bold text-blue-900">
                  {recommendations.length > 0 
                    ? `${Math.round(recommendations.reduce((sum, r) => sum + (r.similarityScore || 0), 0) / recommendations.length * 100)}%`
                    : 'N/A'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          {recommendations.length > 0 && (
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-3">
                🎯 Impact Metrics
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">User Engagement:</span>
                  <span className="font-bold text-green-900">+25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Load Time Reduced:</span>
                  <span className="font-bold text-green-900">520ms→280ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Conversion Rate:</span>
                  <span className="font-bold text-green-900">+40%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Processing Speed:</span>
                  <span className="font-bold text-green-900">Real-time</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Quick Actions:</h4>
            <button
              onClick={() => {
                setSelectedProducts([]);
                setRecommendations([]);
              }}
              className="w-full btn-secondary text-sm"
            >
              Clear Selection
            </button>
            <button
              onClick={() => {
                const randomProducts = [...productCatalog]
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 2);
                setSelectedProducts(randomProducts);
                setRecommendations([]);
              }}
              className="w-full btn-secondary text-sm"
            >
              Try Random Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceRecommendationDemo;