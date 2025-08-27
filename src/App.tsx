import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { ErrorBoundary, LoadingSpinner } from './components/ui'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const TechnicalLeadership = lazy(() => import('./pages/TechnicalLeadership'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contact = lazy(() => import('./pages/Contact'))
const AIDemos = lazy(() => import('./pages/AIDemos'))
const ArchitectureHub = lazy(() => import('./pages/ArchitectureHub'))
const Services = lazy(() => import('./pages/Services'))
const BusinessIntelligence = lazy(() => import('./pages/BusinessIntelligence'))

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/leadership" element={<TechnicalLeadership />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/blog/category/:category" element={<Blog />} />
            <Route path="/blog/tag/:tag" element={<Blog />} />
            <Route path="/ai-demos" element={<AIDemos />} />
            <Route path="/architecture" element={<ArchitectureHub />} />
            <Route path="/services" element={<Services />} />
            <Route path="/business-intelligence" element={<BusinessIntelligence />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  )
}

export default App