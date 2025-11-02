import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { ErrorBoundary, LoadingSpinner } from './components/ui'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))
const Gallery = lazy(() => import('./pages/Gallery'))
const SnakeGame = lazy(() => import('./components/games/SnakeGame'))
const AIDemos = lazy(() => import('./pages/AIDemos'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const TechnicalLeadership = lazy(() => import('./pages/TechnicalLeadership'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogArticle = lazy(() => import('./pages/BlogArticle'))
const ArchitectureHub = lazy(() => import('./pages/ArchitectureHub'))
const AIGames = lazy(() => import('./pages/AIGames'))

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
            <Route path="/ai-demos" element={<AIDemos />} />
            <Route path="/technical-leadership" element={<TechnicalLeadership />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/games" element={<AIGames />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/architecture" element={<ArchitectureHub />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/games/snake" element={<SnakeGame />} />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  )
}

export default App
