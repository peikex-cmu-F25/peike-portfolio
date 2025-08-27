import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Play, Pause, RotateCcw, BookOpen, Code, Lightbulb, Target, CheckCircle } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CodePlayground from './CodePlayground';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  explanation: string;
  code: string;
  language: 'javascript' | 'python';
  expectedOutput?: string;
  hints: string[];
  visualization?: string;
  conceptsIntroduced: string[];
  timeEstimate: number; // minutes
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'algorithms' | 'data-structures' | 'machine-learning' | 'optimization';
  estimatedTime: number;
  learningObjectives: string[];
  prerequisites: string[];
  steps: TutorialStep[];
  finalProject?: {
    title: string;
    description: string;
    startingCode: string;
    solution: string;
  };
}

const InteractiveTutorials: React.FC = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [userCode, setUserCode] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [tutorialProgress, setTutorialProgress] = useState<{ [key: string]: number }>({});

  // Tutorial content
  const tutorials: Tutorial[] = [
    {
      id: 'sorting-algorithms',
      title: 'Sorting Algorithms Mastery',
      description: 'Learn and implement fundamental sorting algorithms with step-by-step guidance and performance analysis',
      difficulty: 'Beginner',
      category: 'algorithms',
      estimatedTime: 45,
      learningObjectives: [
        'Understand different sorting algorithm approaches',
        'Analyze time and space complexity',
        'Implement bubble sort, selection sort, and merge sort',
        'Compare algorithm performance on different datasets'
      ],
      prerequisites: ['Basic programming knowledge', 'Understanding of arrays'],
      steps: [
        {
          id: 'bubble-sort-intro',
          title: 'Introduction to Bubble Sort',
          description: 'Learn the simplest sorting algorithm that compares adjacent elements',
          explanation: `
Bubble Sort is one of the simplest sorting algorithms to understand. It works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they're in the wrong order. The pass through the list is repeated until the list is sorted.

**How it works:**
1. Compare adjacent elements
2. Swap if they're in wrong order  
3. Repeat until no swaps needed

**Time Complexity:** O(n²)
**Space Complexity:** O(1)
          `,
          code: `function bubbleSort(arr) {
  const n = arr.length;
  
  // Outer loop for number of passes
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    // Inner loop for comparisons in each pass
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap if in wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swapping occurred, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}

// Test the algorithm
const testArray = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', testArray);
console.log('Sorted:', bubbleSort([...testArray]));`,
          language: 'javascript',
          expectedOutput: `Original: [64, 34, 25, 12, 22, 11, 90]
Sorted: [11, 12, 22, 25, 34, 64, 90]`,
          hints: [
            'The outer loop controls how many passes we make',
            'The inner loop does the actual comparisons and swaps',
            'We can optimize by stopping early if no swaps occur',
            'Each pass bubbles the largest unsorted element to its correct position'
          ],
          conceptsIntroduced: ['Nested loops', 'Swapping elements', 'Early termination optimization'],
          timeEstimate: 8
        },
        {
          id: 'selection-sort',
          title: 'Selection Sort Implementation',
          description: 'Build a more efficient sorting algorithm that finds the minimum element',
          explanation: `
Selection Sort improves upon bubble sort by reducing the number of swaps. It works by finding the smallest element in the unsorted portion and moving it to the beginning.

**Algorithm Steps:**
1. Find the minimum element in the unsorted array
2. Swap it with the first element
3. Move the boundary of unsorted subarray

**Key Insight:** Only one swap per iteration, unlike bubble sort's many swaps.
          `,
          code: `function selectionSort(arr) {
  const n = arr.length;
  
  // Move boundary of unsorted subarray
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in remaining unsorted array
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}

// Compare with bubble sort performance
const testData = [64, 34, 25, 12, 22, 11, 90];

console.log('Testing Selection Sort:');
console.log('Original:', testData);
console.log('Sorted:', selectionSort([...testData]));`,
          language: 'javascript',
          hints: [
            'Keep track of the minimum element index, not the value',
            'Only swap once per iteration',
            'The sorted portion grows from left to right',
            'Compare this with bubble sort - fewer swaps but same comparisons'
          ],
          conceptsIntroduced: ['Index tracking', 'Single swap per iteration', 'Sorted/unsorted boundaries'],
          timeEstimate: 10
        },
        {
          id: 'merge-sort',
          title: 'Divide and Conquer with Merge Sort',
          description: 'Implement an efficient O(n log n) sorting algorithm using recursion',
          explanation: `
Merge Sort is a divide-and-conquer algorithm that breaks down the array into smaller subarrays, sorts them, and then merges them back together.

**Key Concepts:**
- **Divide:** Split array into halves recursively
- **Conquer:** Sort the subarrays
- **Combine:** Merge sorted subarrays

**Time Complexity:** O(n log n) - much better than O(n²)!
**Space Complexity:** O(n) - requires extra space for merging
          `,
          code: `function mergeSort(arr) {
  // Base case: arrays with 0 or 1 element are sorted
  if (arr.length <= 1) {
    return arr;
  }
  
  // Divide: split array into halves
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  // Conquer: recursively sort both halves
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  
  // Combine: merge the sorted halves
  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // Compare elements and merge in sorted order
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // Add remaining elements
  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

// Test with larger dataset to see performance difference
const largeArray = Array.from({length: 20}, () => Math.floor(Math.random() * 100));
console.log('Original:', largeArray);
console.log('Sorted:', mergeSort(largeArray));`,
          language: 'javascript',
          hints: [
            'Base case is crucial - when to stop recursing?',
            'The merge function does the real work of combining sorted arrays',
            'Think about how the recursion builds up the solution',
            'This algorithm trades space for time efficiency'
          ],
          conceptsIntroduced: ['Recursion', 'Divide and conquer', 'Merging sorted arrays', 'Base cases'],
          timeEstimate: 15
        },
        {
          id: 'performance-comparison',
          title: 'Algorithm Performance Analysis',
          description: 'Compare the performance of different sorting algorithms with benchmarking',
          explanation: `
Now let's put it all together and see how these algorithms perform with different input sizes and types of data.

**Performance Characteristics:**
- **Bubble Sort:** Simple but slow O(n²)
- **Selection Sort:** Fewer swaps but still O(n²)  
- **Merge Sort:** Consistently O(n log n) but uses more memory

**When to use each:**
- Bubble/Selection: Small datasets, educational purposes
- Merge: Large datasets, guaranteed performance
          `,
          code: `// Performance testing framework
function measurePerformance(sortFunction, data, name) {
  const start = performance.now();
  const sorted = sortFunction([...data]);
  const end = performance.now();
  
  return {
    name,
    time: end - start,
    sorted: sorted
  };
}

// Generate test data
function generateTestData(size, type = 'random') {
  switch(type) {
    case 'sorted':
      return Array.from({length: size}, (_, i) => i);
    case 'reverse':
      return Array.from({length: size}, (_, i) => size - i);
    case 'random':
    default:
      return Array.from({length: size}, () => Math.floor(Math.random() * size));
  }
}

// Run performance comparison
const testSizes = [100, 500, 1000];
const algorithms = [
  { func: bubbleSort, name: 'Bubble Sort' },
  { func: selectionSort, name: 'Selection Sort' },
  { func: mergeSort, name: 'Merge Sort' }
];

console.log('Performance Comparison Results:');
console.log('=====================================');

testSizes.forEach(size => {
  console.log(\`\\nTesting with \${size} elements:\`);
  const testData = generateTestData(size);
  
  algorithms.forEach(({func, name}) => {
    const result = measurePerformance(func, testData, name);
    console.log(\`\${name}: \${result.time.toFixed(2)}ms\`);
  });
});`,
          language: 'javascript',
          hints: [
            'Use performance.now() for accurate timing measurements',
            'Always copy the array before sorting to ensure fair comparison',
            'Try different data types - sorted, reverse sorted, random',
            'Notice how merge sort performance is more consistent'
          ],
          conceptsIntroduced: ['Performance measurement', 'Benchmarking', 'Algorithm analysis', 'Big O in practice'],
          timeEstimate: 12
        }
      ],
      finalProject: {
        title: 'Build Your Own Hybrid Sort',
        description: 'Create a smart sorting algorithm that chooses the best method based on input characteristics',
        startingCode: `// Create a hybrid sorting algorithm that chooses the best method
function smartSort(arr) {
  // Your implementation here
  // Consider: array size, how sorted it already is, etc.
  
  return arr;
}

// Test your implementation
const testCases = [
  [5, 2, 8, 1, 9],           // Small array
  Array.from({length: 1000}, () => Math.random()), // Large random
  [1, 2, 3, 4, 6, 5],        // Nearly sorted
];

testCases.forEach((test, i) => {
  console.log(\`Test \${i + 1}:\`, smartSort([...test]).slice(0, 10));
});`,
        solution: `function smartSort(arr) {
  // Use insertion sort for small arrays (< 10 elements)
  if (arr.length < 10) {
    return insertionSort(arr);
  }
  
  // Check if array is nearly sorted
  let inversions = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) inversions++;
  }
  
  // If nearly sorted (< 10% inversions), use insertion sort
  if (inversions / arr.length < 0.1) {
    return insertionSort(arr);
  }
  
  // Otherwise use merge sort for guaranteed O(n log n)
  return mergeSort(arr);
}

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`
      }
    },
    {
      id: 'binary-search-tree',
      title: 'Binary Search Trees from Scratch',
      description: 'Build and manipulate binary search trees with insertion, deletion, and traversal operations',
      difficulty: 'Intermediate',
      category: 'data-structures',
      estimatedTime: 60,
      learningObjectives: [
        'Understand tree data structure concepts',
        'Implement BST insertion and search operations',
        'Master tree traversal algorithms (inorder, preorder, postorder)',
        'Handle BST deletion with different cases'
      ],
      prerequisites: ['Recursion understanding', 'Basic data structures'],
      steps: [
        {
          id: 'bst-node-structure',
          title: 'Building the Tree Node',
          description: 'Create the fundamental building block of our binary search tree',
          explanation: `
A Binary Search Tree (BST) is a hierarchical data structure where each node has at most two children. The key property is that for any node:
- All values in the left subtree are smaller
- All values in the right subtree are larger

This property makes searching very efficient - O(log n) in balanced trees!
          `,
          code: `// Define the TreeNode class
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// BST class to manage our tree
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  // Helper method to check if tree is empty
  isEmpty() {
    return this.root === null;
  }
  
  // Get the size of the tree (we'll implement this step by step)
  size() {
    return this.getSizeRecursive(this.root);
  }
  
  getSizeRecursive(node) {
    if (!node) return 0;
    return 1 + this.getSizeRecursive(node.left) + this.getSizeRecursive(node.right);
  }
}

// Test the basic structure
const bst = new BinarySearchTree();
console.log('Empty tree size:', bst.size());
console.log('Is empty:', bst.isEmpty());

// Create a simple node
const node = new TreeNode(10);
console.log('Node value:', node.value);
console.log('Node left:', node.left);
console.log('Node right:', node.right);`,
          language: 'javascript',
          hints: [
            'Each node stores a value and references to left and right children',
            'null represents an empty subtree',
            'The BST class will manage the root and provide tree operations',
            'Recursive functions are perfect for tree operations'
          ],
          conceptsIntroduced: ['Tree nodes', 'Class structure', 'Null references', 'Recursive size calculation'],
          timeEstimate: 8
        },
        {
          id: 'bst-insertion',
          title: 'Inserting Values into the BST',
          description: 'Implement the insertion operation that maintains BST properties',
          explanation: `
Insertion in a BST follows a simple recursive pattern:
1. If tree is empty, create root node
2. If value < current node, go left
3. If value > current node, go right
4. If value equals current node, handle duplicates (ignore or update)

The recursive nature makes this elegant to implement!
          `,
          code: `class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  // Public insert method
  insert(value) {
    this.root = this.insertRecursive(this.root, value);
  }
  
  // Recursive insertion helper
  insertRecursive(node, value) {
    // Base case: empty spot found, create new node
    if (!node) {
      return new TreeNode(value);
    }
    
    // Recursive cases: go left or right based on value
    if (value < node.value) {
      node.left = this.insertRecursive(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertRecursive(node.right, value);
    }
    // If value equals node.value, we ignore duplicates
    
    return node;
  }
  
  // Helper method to visualize the tree structure
  inOrderTraversal() {
    const result = [];
    this.inOrderHelper(this.root, result);
    return result;
  }
  
  inOrderHelper(node, result) {
    if (node) {
      this.inOrderHelper(node.left, result);
      result.push(node.value);
      this.inOrderHelper(node.right, result);
    }
  }
}

// Test insertion
const bst = new BinarySearchTree();
const values = [50, 30, 70, 20, 40, 60, 80];

console.log('Inserting values:', values);
values.forEach(val => bst.insert(val));

console.log('In-order traversal (should be sorted):', bst.inOrderTraversal());`,
          language: 'javascript',
          hints: [
            'The base case is when we find an empty spot (null node)',
            'Always return the node to maintain tree structure',
            'Comparison determines which subtree to explore',
            'In-order traversal of a BST gives sorted order!'
          ],
          conceptsIntroduced: ['Recursive insertion', 'Base cases', 'Tree traversal', 'BST property maintenance'],
          timeEstimate: 12
        }
      ]
    },
    {
      id: 'neural-network-basics',
      title: 'Neural Networks from Scratch',
      description: 'Build and train a simple neural network using only basic JavaScript and mathematical operations',
      difficulty: 'Advanced',
      category: 'machine-learning',
      estimatedTime: 90,
      learningObjectives: [
        'Understand neural network architecture',
        'Implement forward and backward propagation',
        'Learn gradient descent optimization',
        'Train a network on real data'
      ],
      prerequisites: ['Linear algebra basics', 'Calculus understanding', 'JavaScript proficiency'],
      steps: [
        {
          id: 'neural-network-foundation',
          title: 'Neural Network Mathematics',
          description: 'Understand the mathematical foundation of neural networks',
          explanation: `
Neural networks are inspired by biological neurons. Each artificial neuron:
1. Receives inputs (x₁, x₂, ... xₙ)
2. Applies weights (w₁, w₂, ... wₙ)
3. Adds bias (b)
4. Applies activation function

**Mathematical Formula:**
output = activation(∑(xᵢ × wᵢ) + b)

The activation function introduces non-linearity, allowing networks to learn complex patterns.
          `,
          code: `// Basic mathematical operations for neural networks
class NeuralMath {
  // Sigmoid activation function
  static sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }
  
  // Derivative of sigmoid (needed for backpropagation)
  static sigmoidDerivative(x) {
    return x * (1 - x);
  }
  
  // Matrix multiplication
  static multiply(a, b) {
    const result = [];
    for (let i = 0; i < a.length; i++) {
      result[i] = [];
      for (let j = 0; j < b[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < b.length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }
  
  // Element-wise operations
  static subtract(a, b) {
    return a.map((row, i) => row.map((val, j) => val - b[i][j]));
  }
  
  static add(a, b) {
    return a.map((row, i) => row.map((val, j) => val + b[i][j]));
  }
}

// Test the mathematical functions
console.log('Sigmoid of 0:', NeuralMath.sigmoid(0)); // Should be 0.5
console.log('Sigmoid of 2:', NeuralMath.sigmoid(2)); // Should be ~0.88
console.log('Sigmoid of -2:', NeuralMath.sigmoid(-2)); // Should be ~0.12

// Test matrix multiplication
const matrix1 = [[1, 2], [3, 4]];
const matrix2 = [[2], [1]];
console.log('Matrix multiplication result:', NeuralMath.multiply(matrix1, matrix2));`,
          language: 'javascript',
          hints: [
            'Sigmoid function outputs values between 0 and 1',
            'Matrix multiplication is key to neural network computation',
            'Derivatives are essential for learning (backpropagation)',
            'Start with simple 2D arrays to represent matrices'
          ],
          conceptsIntroduced: ['Activation functions', 'Matrix operations', 'Sigmoid function', 'Mathematical foundations'],
          timeEstimate: 15
        }
      ]
    }
  ];

  const handleTutorialSelect = useCallback((tutorial: Tutorial) => {
    setSelectedTutorial(tutorial);
    setCurrentStep(0);
    setUserCode(tutorial.steps[0]?.code || '');
    setShowHints(false);
    setCompletedSteps(new Set());
  }, []);

  const handleNextStep = useCallback(() => {
    if (!selectedTutorial || currentStep >= selectedTutorial.steps.length - 1) return;
    
    // Mark current step as completed
    const newCompleted = new Set(completedSteps);
    newCompleted.add(selectedTutorial.steps[currentStep].id);
    setCompletedSteps(newCompleted);
    
    // Move to next step
    setCurrentStep(prev => prev + 1);
    setUserCode(selectedTutorial.steps[currentStep + 1]?.code || '');
    setShowHints(false);
  }, [selectedTutorial, currentStep, completedSteps]);

  const handlePreviousStep = useCallback(() => {
    if (currentStep <= 0) return;
    setCurrentStep(prev => prev - 1);
    setUserCode(selectedTutorial?.steps[currentStep - 1]?.code || '');
    setShowHints(false);
  }, [currentStep, selectedTutorial]);

  const handleCodeChange = useCallback((code: string) => {
    setUserCode(code);
  }, []);

  const handleExecutionComplete = useCallback((result: any) => {
    setIsRunning(false);
    
    // Check if user completed the step successfully
    if (selectedTutorial && result.result !== undefined) {
      const currentStepData = selectedTutorial.steps[currentStep];
      if (currentStepData.expectedOutput) {
        // Simple check - in real implementation, you'd want more sophisticated validation
        const newCompleted = new Set(completedSteps);
        newCompleted.add(currentStepData.id);
        setCompletedSteps(newCompleted);
      }
    }
  }, [selectedTutorial, currentStep, completedSteps]);

  const resetTutorial = useCallback(() => {
    if (!selectedTutorial) return;
    setCurrentStep(0);
    setUserCode(selectedTutorial.steps[0]?.code || '');
    setCompletedSteps(new Set());
    setShowHints(false);
  }, [selectedTutorial]);

  const progressPercentage = selectedTutorial ? 
    (completedSteps.size / selectedTutorial.steps.length) * 100 : 0;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <BookOpen className="text-emerald-600" />
          Interactive Algorithm Tutorials
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Learn algorithms through hands-on coding with step-by-step guidance and real-time feedback
        </p>
        
        {selectedTutorial && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {selectedTutorial.title}
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Progress: {completedSteps.size}/{selectedTutorial.steps.length} steps
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex">
        {/* Tutorial Selection Sidebar */}
        {!selectedTutorial && (
          <div className="w-full p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tutorial) => (
                <motion.div
                  key={tutorial.id}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => handleTutorialSelect(tutorial)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tutorial.category === 'algorithms' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                      tutorial.category === 'data-structures' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                      tutorial.category === 'machine-learning' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                    }`}>
                      {tutorial.category.replace('-', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {tutorial.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {tutorial.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {tutorial.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Target size={16} className="mr-2" />
                      {tutorial.steps.length} interactive steps
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle size={16} className="mr-2" />
                      ~{tutorial.estimatedTime} minutes
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Learning Objectives:</div>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {tutorial.learningObjectives.slice(0, 2).map((objective, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 mt-2 flex-shrink-0" />
                          {objective}
                        </li>
                      ))}
                      {tutorial.learningObjectives.length > 2 && (
                        <li className="text-emerald-600 dark:text-emerald-400">
                          +{tutorial.learningObjectives.length - 2} more...
                        </li>
                      )}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Tutorial Content */}
        {selectedTutorial && (
          <div className="flex-1 flex">
            {/* Step Content */}
            <div className="w-1/2 p-6 overflow-auto bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Step {currentStep + 1}: {selectedTutorial.steps[currentStep]?.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedTutorial.steps[currentStep]?.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTutorial(null)}
                  className="px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
                >
                  ← Back to Tutorials
                </button>
              </div>

              {/* Step Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                
                <div className="flex items-center gap-2">
                  {selectedTutorial.steps.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                        idx === currentStep
                          ? 'bg-emerald-500 text-white'
                          : completedSteps.has(selectedTutorial.steps[idx].id)
                          ? 'bg-emerald-200 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200'
                          : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                      }`}
                    >
                      {idx + 1}
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={handleNextStep}
                  disabled={currentStep >= selectedTutorial.steps.length - 1}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Step Content */}
              <div className="space-y-6">
                {/* Explanation */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Lightbulb size={20} className="text-yellow-500" />
                    Explanation
                  </h4>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                      {selectedTutorial.steps[currentStep]?.explanation}
                    </div>
                  </div>
                </div>

                {/* Concepts Introduced */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Key Concepts
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTutorial.steps[currentStep]?.conceptsIntroduced.map((concept, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hints */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      Hints
                    </h4>
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      {showHints ? 'Hide' : 'Show'} Hints
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {showHints && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        {selectedTutorial.steps[currentStep]?.hints.map((hint, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                            <div className="w-5 h-5 bg-yellow-400 text-yellow-900 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                              {hint}
                            </p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Expected Output */}
                {selectedTutorial.steps[currentStep]?.expectedOutput && (
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      Expected Output
                    </h4>
                    <SyntaxHighlighter
                      language="javascript"
                      style={tomorrow}
                      className="rounded-md text-sm"
                    >
                      {selectedTutorial.steps[currentStep].expectedOutput}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            </div>

            {/* Code Playground */}
            <div className="w-1/2 border-l border-gray-200 dark:border-gray-700">
              <div className="h-full">
                <CodePlayground
                  initialCode={userCode}
                  language={selectedTutorial.steps[currentStep]?.language || 'javascript'}
                  onCodeChange={handleCodeChange}
                  onExecutionComplete={handleExecutionComplete}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveTutorials;