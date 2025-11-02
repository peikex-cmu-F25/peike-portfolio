import type { BlogArticle } from './types'

export const blogArticles: BlogArticle[] = [
  {
    id: "scalable-rag-systems",
    title: "Building Scalable RAG Systems: From Prototype to Production",
    subtitle: "Architectural decisions and performance optimizations for enterprise-grade retrieval-augmented generation",
    category: "AI/ML",
    description: "A comprehensive guide to designing and implementing production-ready RAG systems that scale to enterprise requirements",
    author: "Peike Xu",
    publishDate: "2024-08-15",
    readTime: "12 min",
    tags: ["RAG", "AWS", "Vector Search", "OpenSearch", "Enterprise AI", "System Architecture"],
    image: "/images/blog/rag-systems.jpg",
    featured: true,
    slug: "building-scalable-rag-systems",
    excerpt: "Learn how to architect RAG systems that handle 100+ documents with 92% accuracy and sub-200ms response times. From semantic chunking strategies to vector indexing optimizations, discover the architectural patterns that make enterprise RAG systems production-ready."
  },
  {
    id: "svd-patient-matching",
    title: "SVD in Production: Lessons from Patient Matching at Scale",
    subtitle: "Implementing collaborative filtering for healthcare applications with real-world performance insights",
    category: "AI/ML",
    description: "Deep dive into implementing SVD-based collaborative filtering for patient matching systems serving 3000+ users",
    author: "Peike Xu",
    publishDate: "2024-07-20",
    readTime: "10 min",
    tags: ["SVD", "Collaborative Filtering", "Healthcare", "Machine Learning", "React", "Performance"],
    image: "/images/blog/svd-healthcare.jpg",
    featured: true,
    slug: "svd-patient-matching-production",
    excerpt: "Discover how SVD collaborative filtering achieved 75% recommendation accuracy in healthcare patient matching, reducing manual allocation by 60%. Explore mathematical foundations, implementation challenges, and performance optimization strategies."
  },
  {
    id: "computer-vision-receipt-processing",
    title: "Computer Vision in the Wild: Receipt Processing Pipeline Design",
    subtitle: "Building robust OCR systems that handle real-world receipt variations with high accuracy",
    category: "AI/ML",
    description: "End-to-end machine learning pipeline for processing diverse receipt formats with computer vision and OCR",
    author: "Peike Xu",
    publishDate: "2024-06-10",
    readTime: "15 min",
    tags: ["Computer Vision", "OCR", "Multi-Agent Systems", "ML Pipeline", "Food Tech", "Claude API"],
    image: "/images/blog/receipt-processing.jpg",
    featured: true,
    slug: "computer-vision-receipt-processing",
    excerpt: "Build production-ready receipt processing systems achieving 82% accuracy across diverse supermarket formats. Learn about training robust computer vision models, handling edge cases, and designing multi-agent architectures for complex document processing."
  },
  {
    id: "ecommerce-recommendation-systems",
    title: "E-commerce Recommendation Systems: Beyond the Algorithm",
    subtitle: "System design, scalability, and business impact measurement for recommendation engines",
    category: "System Design",
    description: "Comprehensive guide to building scalable e-commerce recommendation systems that drive business value",
    author: "Peike Xu",
    publishDate: "2024-05-25",
    readTime: "14 min",
    tags: ["Recommendation Systems", "E-commerce", "System Design", "Redis", "Spring Boot", "A/B Testing"],
    image: "/images/blog/ecommerce-recommendations.jpg",
    featured: false,
    slug: "ecommerce-recommendation-systems",
    excerpt: "Go beyond basic collaborative filtering to build recommendation systems that improve user engagement by 25%. Explore caching strategies, real-time processing, A/B testing frameworks, and measuring business impact in production e-commerce environments."
  }
]
