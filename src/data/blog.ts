import { BlogPost, BlogCategory, BlogTag, BlogMetadata } from '../types/blog'

export const blogCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Machine Learning',
    slug: 'machine-learning',
    description: 'Deep dives into ML algorithms, frameworks, and applications',
    color: 'bg-blue-500',
    icon: '🤖'
  },
  {
    id: '2',
    name: 'Data Science',
    slug: 'data-science',
    description: 'Data analysis, visualization, and statistical insights',
    color: 'bg-green-500',
    icon: '📊'
  },
  {
    id: '3',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Frontend, backend, and full-stack development insights',
    color: 'bg-purple-500',
    icon: '💻'
  },
  {
    id: '4',
    name: 'AI Research',
    slug: 'ai-research',
    description: 'Latest research papers, methodologies, and breakthroughs',
    color: 'bg-red-500',
    icon: '🧠'
  },
  {
    id: '5',
    name: 'Career & Industry',
    slug: 'career-industry',
    description: 'Professional growth, industry trends, and career advice',
    color: 'bg-yellow-500',
    icon: '🚀'
  }
]

export const blogTags: BlogTag[] = [
  { id: '1', name: 'React', slug: 'react', count: 8 },
  { id: '2', name: 'TypeScript', slug: 'typescript', count: 12 },
  { id: '3', name: 'Python', slug: 'python', count: 15 },
  { id: '4', name: 'TensorFlow', slug: 'tensorflow', count: 6 },
  { id: '5', name: 'PyTorch', slug: 'pytorch', count: 8 },
  { id: '6', name: 'Neural Networks', slug: 'neural-networks', count: 10 },
  { id: '7', name: 'Deep Learning', slug: 'deep-learning', count: 9 },
  { id: '8', name: 'NLP', slug: 'nlp', count: 7 },
  { id: '9', name: 'Computer Vision', slug: 'computer-vision', count: 5 },
  { id: '10', name: 'API Design', slug: 'api-design', count: 4 },
  { id: '11', name: 'Performance', slug: 'performance', count: 6 },
  { id: '12', name: 'DevOps', slug: 'devops', count: 3 },
  { id: '13', name: 'Cloud Computing', slug: 'cloud-computing', count: 4 },
  { id: '14', name: 'Data Visualization', slug: 'data-visualization', count: 7 }
]

// Sample blog posts - In production, these would come from a CMS or markdown files
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'building-scalable-ml-pipelines',
    title: 'Building Scalable Machine Learning Pipelines for Production',
    description: 'Learn how to architect robust ML pipelines that can handle enterprise-scale data processing and model deployment.',
    content: `# Building Scalable Machine Learning Pipelines for Production

Machine learning in production requires careful consideration of scalability, reliability, and maintainability. In this comprehensive guide, we'll explore best practices for building ML pipelines that can handle enterprise workloads.

## Key Components of ML Pipelines

### 1. Data Ingestion and Processing
- Batch vs. streaming data processing
- Data validation and quality checks
- Feature engineering at scale

### 2. Model Training and Validation
- Automated hyperparameter tuning
- Cross-validation strategies
- Model versioning and experiment tracking

### 3. Deployment and Monitoring
- A/B testing frameworks
- Model performance monitoring
- Automated retraining workflows

## Best Practices

1. **Design for Failure**: Implement robust error handling and recovery mechanisms
2. **Monitor Everything**: Set up comprehensive logging and alerting
3. **Automate Testing**: Include unit tests, integration tests, and model quality tests
4. **Version Control**: Track data, code, and model versions consistently

## Implementation Example

\`\`\`python
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

def create_ml_pipeline():
    """Create a scikit-learn pipeline for production use."""
    return Pipeline([
        ('scaler', StandardScaler()),
        ('classifier', RandomForestClassifier(
            n_estimators=100,
            random_state=42
        ))
    ])

# Usage
pipeline = create_ml_pipeline()
pipeline.fit(X_train, y_train)
predictions = pipeline.predict(X_test)
\`\`\`

This approach ensures reproducibility and makes deployment much simpler.`,
    author: {
      name: 'Peike Xu',
      bio: 'ML Engineer & Full Stack Developer passionate about building scalable AI systems',
      avatar: '/images/peike-avatar.jpg'
    },
    publishedAt: '2024-01-15',
    readingTime: '8 min read',
    tags: ['machine-learning', 'python', 'devops', 'scalability'],
    category: 'machine-learning',
    featured: true,
    image: {
      url: '/images/blog/ml-pipeline-architecture.jpg',
      alt: 'ML Pipeline Architecture Diagram',
      caption: 'High-level overview of a production ML pipeline'
    },
    seo: {
      title: 'Building Scalable ML Pipelines - Production Best Practices',
      description: 'Comprehensive guide to architecting machine learning pipelines for enterprise production environments.',
      keywords: ['machine learning', 'MLOps', 'data pipelines', 'production ML', 'scalability']
    },
    tableOfContents: [
      { id: 'key-components', title: 'Key Components of ML Pipelines', level: 2 },
      { id: 'best-practices', title: 'Best Practices', level: 2 },
      { id: 'implementation-example', title: 'Implementation Example', level: 2 }
    ]
  },
  {
    id: '2',
    slug: 'react-performance-optimization-techniques',
    title: 'Advanced React Performance Optimization Techniques',
    description: 'Deep dive into React performance optimization strategies including memoization, code splitting, and bundle analysis.',
    content: `# Advanced React Performance Optimization Techniques

Performance is crucial for user experience in React applications. This guide covers advanced techniques to optimize your React apps for maximum performance.

## Memoization Strategies

### React.memo for Component Optimization
\`\`\`jsx
import React from 'react';

const ExpensiveComponent = React.memo(({ data, onAction }) => {
  // Expensive rendering logic
  return (
    <div>
      {data.map(item => (
        <div key={item.id} onClick={() => onAction(item)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});
\`\`\`

### useMemo and useCallback Hooks
\`\`\`jsx
import React, { useMemo, useCallback } from 'react';

function OptimizedComponent({ items, filter }) {
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === filter);
  }, [items, filter]);

  const handleItemClick = useCallback((id) => {
    // Handle click logic
    console.log('Clicked item:', id);
  }, []);

  return (
    <div>
      {filteredItems.map(item => (
        <div key={item.id} onClick={() => handleItemClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
\`\`\`

## Code Splitting and Lazy Loading

### Route-Based Code Splitting
\`\`\`jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

## Bundle Analysis and Optimization

Use webpack-bundle-analyzer to identify optimization opportunities:

\`\`\`bash
npm install --save-dev webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
\`\`\`

## Performance Monitoring

Implement performance monitoring to track real user metrics:

\`\`\`jsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
\`\`\`

These techniques can significantly improve your React application's performance and user experience.`,
    author: {
      name: 'Peike Xu',
      bio: 'ML Engineer & Full Stack Developer passionate about building scalable AI systems'
    },
    publishedAt: '2024-01-10',
    readingTime: '12 min read',
    tags: ['react', 'typescript', 'performance', 'web-development'],
    category: 'web-development',
    featured: true,
    image: {
      url: '/images/blog/react-performance.jpg',
      alt: 'React Performance Optimization',
      caption: 'Optimizing React applications for better performance'
    },
    seo: {
      title: 'React Performance Optimization - Advanced Techniques Guide',
      description: 'Learn advanced React performance optimization techniques including memoization, code splitting, and monitoring.',
      keywords: ['React', 'performance', 'optimization', 'memoization', 'code splitting']
    }
  },
  {
    id: '3',
    slug: 'nlp-transformer-architecture-explained',
    title: 'Understanding Transformer Architecture in NLP: From Attention to GPT',
    description: 'Comprehensive explanation of transformer architecture and its revolutionary impact on natural language processing.',
    content: `# Understanding Transformer Architecture in NLP: From Attention to GPT

The transformer architecture has revolutionized natural language processing. This post explores the key concepts that make transformers so powerful.

## The Attention Mechanism

The core innovation of transformers is the self-attention mechanism:

### Scaled Dot-Product Attention

The attention mechanism can be described as mapping a query and a set of key-value pairs to an output:

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

Where:
- Q = Queries matrix
- K = Keys matrix  
- V = Values matrix
- $d_k$ = Dimension of the key vectors

## Multi-Head Attention

Instead of using a single attention function, transformers use multiple "heads":

$$\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, ..., \\text{head}_h)W^O$$

Where each head is:
$$\\text{head}_i = \\text{Attention}(QW_i^Q, KW_i^K, VW_i^V)$$

## Implementation Example

\`\`\`python
import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        assert d_model % num_heads == 0
        
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
        
    def scaled_dot_product_attention(self, Q, K, V, mask=None):
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
        
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
            
        attention_weights = F.softmax(scores, dim=-1)
        output = torch.matmul(attention_weights, V)
        
        return output, attention_weights
    
    def forward(self, query, key, value, mask=None):
        batch_size = query.size(0)
        
        # Linear transformations and split into heads
        Q = self.W_q(query).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_k(key).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_v(value).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        
        # Apply attention
        attn_output, attn_weights = self.scaled_dot_product_attention(Q, K, V, mask)
        
        # Concatenate heads and put through final linear layer
        attn_output = attn_output.transpose(1, 2).contiguous().view(
            batch_size, -1, self.d_model
        )
        
        output = self.W_o(attn_output)
        
        return output, attn_weights
\`\`\`

## Why Transformers Work So Well

1. **Parallelization**: Unlike RNNs, transformers can process all positions simultaneously
2. **Long-range Dependencies**: Self-attention directly connects all positions
3. **Scalability**: Architecture scales well with increased data and compute

## Applications and Evolution

- **BERT**: Bidirectional encoder representations
- **GPT**: Generative pre-trained transformer
- **T5**: Text-to-text transfer transformer
- **Vision Transformers**: Applying transformers to computer vision

The transformer architecture continues to drive breakthroughs in AI, from language models to computer vision applications.`,
    author: {
      name: 'Peike Xu',
      bio: 'ML Engineer & Full Stack Developer passionate about building scalable AI systems'
    },
    publishedAt: '2024-01-08',
    readingTime: '15 min read',
    tags: ['nlp', 'deep-learning', 'transformers', 'pytorch', 'ai-research'],
    category: 'ai-research',
    featured: false,
    image: {
      url: '/images/blog/transformer-architecture.jpg',
      alt: 'Transformer Architecture Visualization',
      caption: 'Visual representation of transformer architecture components'
    },
    seo: {
      title: 'Transformer Architecture in NLP - Complete Guide',
      description: 'Deep dive into transformer architecture, attention mechanisms, and their impact on modern NLP applications.',
      keywords: ['transformer', 'NLP', 'attention mechanism', 'BERT', 'GPT', 'deep learning']
    }
  }
]

export const getBlogMetadata = (): BlogMetadata => {
  return {
    totalPosts: blogPosts.length,
    categories: blogCategories,
    tags: blogTags,
    featuredPosts: blogPosts.filter(post => post.featured),
    recentPosts: [...blogPosts].sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    ).slice(0, 5)
  }
}

export const getBlogPost = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug)
}

export const getRelatedPosts = (currentPost: BlogPost, limit = 3) => {
  return blogPosts
    .filter(post => 
      post.id !== currentPost.id && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
    .map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      description: post.description,
      publishedAt: post.publishedAt,
      readingTime: post.readingTime,
      image: post.image
    }))
}

export const filterPosts = (posts: BlogPost[], filters: any) => {
  let filtered = [...posts]

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filtered = filtered.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  }

  if (filters.category) {
    filtered = filtered.filter(post => post.category === filters.category)
  }

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(post =>
      filters.tags.some((tag: string) => post.tags.includes(tag))
    )
  }

  // Sort posts
  const sortBy = filters.sortBy || 'publishedAt'
  const sortOrder = filters.sortOrder || 'desc'

  filtered.sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title)
        break
      case 'readingTime':
        const aTime = parseInt(a.readingTime)
        const bTime = parseInt(b.readingTime)
        comparison = aTime - bTime
        break
      case 'publishedAt':
      default:
        comparison = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        break
    }

    return sortOrder === 'asc' ? comparison : -comparison
  })

  return filtered
}