import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
  publishDate: string;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 'scalable-rag-systems',
    title: 'Building Scalable RAG Systems: From Prototype to Production',
    excerpt: 'Deep dive into the architecture decisions and optimizations that took our Enterprise RAG system from 40% cost reduction to production-ready scalability.',
    content: '',
    tags: ['RAG', 'NLP', 'Architecture', 'AWS'],
    readTime: '12 min read',
    publishDate: '2024-01-15',
    featured: true
  },
  {
    id: 'svd-patient-matching',
    title: 'SVD in Production: Lessons from Patient Matching at Scale',
    excerpt: 'How collaborative filtering and matrix decomposition achieved 75% recommendation accuracy while maintaining 60% efficiency improvements in healthcare systems.',
    content: '',
    tags: ['Machine Learning', 'SVD', 'Healthcare', 'Optimization'],
    readTime: '10 min read',
    publishDate: '2024-01-10',
    featured: true
  },
  {
    id: 'computer-vision-pipeline',
    title: 'Computer Vision in the Wild: Receipt Processing Pipeline Design',
    excerpt: 'Building production-ready computer vision systems that achieve 82% processing accuracy while reducing food waste by 30% through intelligent receipt analysis.',
    content: '',
    tags: ['Computer Vision', 'OCR', 'Pipeline', 'Production'],
    readTime: '8 min read',
    publishDate: '2024-01-05',
    featured: false
  },
  {
    id: 'ecommerce-recommendations',
    title: 'E-commerce Recommendation Systems: Beyond the Algorithm',
    excerpt: 'System design considerations for recommendation engines that deliver 25% engagement increases and 40% conversion improvements in real-world applications.',
    content: '',
    tags: ['Recommendations', 'E-commerce', 'System Design', 'Scalability'],
    readTime: '9 min read',
    publishDate: '2023-12-28',
    featured: false
  }
];

const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

const Blog: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => post.tags.includes(tag));
      const matchesSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTags && matchesSearch;
    });
  }, [selectedTags, searchQuery]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-white">
      {/* Hero Section */}
      <section className="section-padding py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Technical Blog
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Deep dives into AI/ML systems, architecture decisions, and production lessons learned from building scalable intelligent applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section-padding py-12">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200"
              />
            </div>

            {/* Tag Filter */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">Filter by Topics</h3>
              <div className="flex flex-wrap gap-3">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedTags.includes(tag)
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="section-padding pb-12">
          <div className="container-width">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full">
                        Featured
                      </span>
                      <span className="text-secondary-500 text-sm">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-900 mb-4 group-hover:text-primary-600 transition-colors">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-secondary-600 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-secondary-100 text-secondary-600 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary-500 text-sm">
                        {new Date(post.publishDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-primary-600 font-medium hover:text-primary-700 transition-colors flex items-center gap-2"
                      >
                        Read More
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Articles */}
      {regularPosts.length > 0 && (
        <section className="section-padding pb-20">
          <div className="container-width">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              All Articles
            </h2>
            <div className="max-w-4xl mx-auto space-y-8">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center gap-4 mb-2 md:mb-0">
                      <span className="text-secondary-500 text-sm">
                        {new Date(post.publishDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="text-secondary-300">•</span>
                      <span className="text-secondary-500 text-sm">
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-secondary-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {filteredPosts.length === 0 && (
        <section className="section-padding py-20">
          <div className="container-width text-center">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 text-secondary-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-secondary-700 mb-2">No articles found</h3>
              <p className="text-secondary-500">Try adjusting your search or filter criteria.</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Blog;