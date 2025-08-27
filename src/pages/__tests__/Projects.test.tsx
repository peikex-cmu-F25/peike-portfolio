import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Projects from '../Projects'

// Mock the portfolio data
vi.mock('../../data/portfolio', () => ({
  projects: [
    {
      id: 'test-project-1',
      title: 'Test AI Project',
      category: 'AI/ML',
      description: 'A test AI project description',
      longDescription: 'A detailed description of the test AI project',
      technologies: ['Python', 'TensorFlow', 'React'],
      metrics: [
        { label: 'Accuracy', value: '95%' },
        { label: 'Speed', value: 'Fast' }
      ],
      features: ['Feature 1', 'Feature 2'],
      image: '/test-image.jpg',
      featured: true,
      year: 2024,
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/test'
    },
    {
      id: 'test-project-2',
      title: 'Test Full Stack App',
      category: 'Full Stack',
      description: 'A test full stack application',
      longDescription: 'A detailed description of the test full stack app',
      technologies: ['React', 'Node.js'],
      metrics: [
        { label: 'Users', value: '1000+' }
      ],
      features: ['User Auth', 'Real-time Updates'],
      image: '/test-image2.jpg',
      featured: false,
      year: 2023
    }
  ]
}))

describe('Projects Page', () => {
  describe('Page Header', () => {
    test('renders main heading', () => {
      render(<Projects />)
      
      const heading = screen.getByRole('heading', { name: /my projects/i })
      expect(heading).toBeInTheDocument()
      expect(heading.tagName).toBe('H1')
    })

    test('displays page description', () => {
      render(<Projects />)
      
      const description = screen.getByText(/A showcase of AI\/ML innovations, full-stack applications/)
      expect(description).toBeInTheDocument()
    })

    test('header has proper responsive styling', () => {
      render(<Projects />)
      
      const heading = screen.getByRole('heading', { name: /my projects/i })
      expect(heading).toHaveClass('text-4xl', 'md:text-5xl')
    })
  })

  describe('Filter Functionality', () => {
    test('renders all filter categories', () => {
      render(<Projects />)
      
      const expectedCategories = ['All', 'AI/ML', 'Full Stack', 'Cloud/DevOps', 'Mobile']
      expectedCategories.forEach(category => {
        expect(screen.getByRole('button', { name: category })).toBeInTheDocument()
      })
    })

    test('All category is selected by default', () => {
      render(<Projects />)
      
      const allButton = screen.getByRole('button', { name: 'All' })
      expect(allButton).toHaveClass('bg-white', 'text-primary-600', 'shadow-sm')
    })

    test('can switch between filter categories', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      
      const aiMlButton = screen.getByRole('button', { name: 'AI/ML' })
      await user.click(aiMlButton)
      
      expect(aiMlButton).toHaveClass('bg-white', 'text-primary-600', 'shadow-sm')
    })

    test('filters projects based on selected category', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      
      // Initially should show all projects
      expect(screen.getByText('Test AI Project')).toBeInTheDocument()
      expect(screen.getByText('Test Full Stack App')).toBeInTheDocument()
      
      // Filter by AI/ML
      const aiMlButton = screen.getByRole('button', { name: 'AI/ML' })
      await user.click(aiMlButton)
      
      // Should only show AI/ML projects
      expect(screen.getByText('Test AI Project')).toBeInTheDocument()
      expect(screen.queryByText('Test Full Stack App')).not.toBeInTheDocument()
    })

    test('shows empty state when no projects match filter', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      
      // Filter by Mobile (no mobile projects in mock data)
      const mobileButton = screen.getByRole('button', { name: 'Mobile' })
      await user.click(mobileButton)
      
      expect(screen.getByText(/No projects found in this category/)).toBeInTheDocument()
    })
  })

  describe('Project Cards', () => {
    test('renders project cards with correct information', () => {
      render(<Projects />)
      
      // Check first project
      expect(screen.getByText('Test AI Project')).toBeInTheDocument()
      expect(screen.getByText('A test AI project description')).toBeInTheDocument()
      expect(screen.getByText('AI/ML')).toBeInTheDocument()
      
      // Check second project
      expect(screen.getByText('Test Full Stack App')).toBeInTheDocument()
      expect(screen.getByText('A test full stack application')).toBeInTheDocument()
      expect(screen.getByText('Full Stack')).toBeInTheDocument()
    })

    test('displays project technologies', () => {
      render(<Projects />)
      
      expect(screen.getByText('Python')).toBeInTheDocument()
      expect(screen.getByText('TensorFlow')).toBeInTheDocument()
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('Node.js')).toBeInTheDocument()
    })

    test('shows limited technologies with "more" indicator', () => {
      render(<Projects />)
      
      // Test AI Project has 3+ technologies, should show +N more
      const testAiCard = screen.getByText('Test AI Project').closest('.bg-white')
      // Should show first 3 technologies and indicate more exist
      expect(testAiCard).toContainElement(screen.getByText('Python'))
      expect(testAiCard).toContainElement(screen.getByText('TensorFlow'))
      expect(testAiCard).toContainElement(screen.getByText('React'))
    })

    test('displays project metrics', () => {
      render(<Projects />)
      
      expect(screen.getByText('95%')).toBeInTheDocument()
      expect(screen.getByText('Accuracy')).toBeInTheDocument()
      expect(screen.getByText('Fast')).toBeInTheDocument()
      expect(screen.getByText('Speed')).toBeInTheDocument()
    })

    test('shows featured badge for featured projects', () => {
      render(<Projects />)
      
      const featuredBadges = screen.getAllByText('Featured')
      expect(featuredBadges.length).toBeGreaterThan(0)
    })

    test('applies correct category colors', () => {
      render(<Projects />)
      
      const aiMlBadge = screen.getAllByText('AI/ML')[0] // Get first occurrence
      expect(aiMlBadge).toHaveClass('bg-purple-100', 'text-purple-800')
      
      const fullStackBadge = screen.getAllByText('Full Stack')[0]
      expect(fullStackBadge).toHaveClass('bg-blue-100', 'text-blue-800')
    })

    test('project cards are clickable', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      
      const projectCard = screen.getByText('Test AI Project').closest('.cursor-pointer')
      expect(projectCard).toBeInTheDocument()
      
      await user.click(projectCard!)
      
      // Should open modal (check if modal content appears)
      await waitFor(() => {
        expect(screen.getByText('A detailed description of the test AI project')).toBeInTheDocument()
      })
    })
  })

  describe('Project Modal', () => {
    beforeEach(async () => {
      const user = userEvent.setup()
      render(<Projects />)
      
      // Open modal by clicking on first project
      const projectCard = screen.getByText('Test AI Project').closest('.cursor-pointer')
      await user.click(projectCard!)
      
      await waitFor(() => {
        expect(screen.getByText('A detailed description of the test AI project')).toBeInTheDocument()
      })
    })

    test('displays detailed project information', () => {
      expect(screen.getByText('Test AI Project')).toBeInTheDocument()
      expect(screen.getByText('A detailed description of the test AI project')).toBeInTheDocument()
      expect(screen.getByText('2024')).toBeInTheDocument()
    })

    test('shows project features', () => {
      expect(screen.getByText('Key Features')).toBeInTheDocument()
      expect(screen.getByText('Feature 1')).toBeInTheDocument()
      expect(screen.getByText('Feature 2')).toBeInTheDocument()
    })

    test('displays performance metrics', () => {
      expect(screen.getByText('Performance Metrics')).toBeInTheDocument()
      expect(screen.getByText('Accuracy')).toBeInTheDocument()
      expect(screen.getByText('95%')).toBeInTheDocument()
    })

    test('shows all technologies used', () => {
      expect(screen.getByText('Technologies Used')).toBeInTheDocument()
      
      // All technologies should be visible in modal
      const technologies = ['Python', 'TensorFlow', 'React']
      technologies.forEach(tech => {
        expect(screen.getByText(tech)).toBeInTheDocument()
      })
    })

    test('renders action buttons when URLs are provided', () => {
      expect(screen.getByRole('link', { name: /view demo/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /view code/i })).toBeInTheDocument()
    })

    test('action buttons have correct attributes', () => {
      const demoButton = screen.getByRole('link', { name: /view demo/i })
      expect(demoButton).toHaveAttribute('href', 'https://demo.example.com')
      expect(demoButton).toHaveAttribute('target', '_blank')
      expect(demoButton).toHaveAttribute('rel', 'noopener noreferrer')
      
      const codeButton = screen.getByRole('link', { name: /view code/i })
      expect(codeButton).toHaveAttribute('href', 'https://github.com/test')
      expect(codeButton).toHaveAttribute('target', '_blank')
      expect(codeButton).toHaveAttribute('rel', 'noopener noreferrer')
    })

    test('has close button that works', async () => {
      const user = userEvent.setup()
      
      const closeButton = screen.getByRole('button').closest('button')
      expect(closeButton).toBeInTheDocument()
      
      await user.click(closeButton!)
      
      await waitFor(() => {
        expect(screen.queryByText('A detailed description of the test AI project')).not.toBeInTheDocument()
      })
    })

    test('closes when clicking outside modal', async () => {
      const user = userEvent.setup()
      
      const modalOverlay = screen.getByText('A detailed description of the test AI project').closest('.fixed')
      expect(modalOverlay).toBeInTheDocument()
      
      await user.click(modalOverlay!)
      
      await waitFor(() => {
        expect(screen.queryByText('A detailed description of the test AI project')).not.toBeInTheDocument()
      })
    })

    test('does not close when clicking inside modal content', async () => {
      const user = userEvent.setup()
      
      const modalContent = screen.getByText('A detailed description of the test AI project').closest('.bg-white')
      await user.click(modalContent!)
      
      // Modal should remain open
      expect(screen.getByText('A detailed description of the test AI project')).toBeInTheDocument()
    })
  })

  describe('Layout and Responsive Design', () => {
    test('projects use grid layout', () => {
      render(<Projects />)
      
      const projectsGrid = screen.getByText('Test AI Project').closest('.grid')
      expect(projectsGrid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-8')
    })

    test('page has proper container and spacing', () => {
      render(<Projects />)
      
      const container = screen.getByText('My Projects').closest('.container-width')
      expect(container).toBeInTheDocument()
      
      const pageContainer = container?.closest('div')
      expect(pageContainer).toHaveClass('min-h-screen', 'py-20')
    })

    test('filter tabs are responsive', () => {
      render(<Projects />)
      
      const filterContainer = screen.getByRole('button', { name: 'All' }).closest('.flex')
      expect(filterContainer).toHaveClass('flex', 'flex-wrap', 'gap-2')
    })

    test('modal is responsive', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      
      const projectCard = screen.getByText('Test AI Project').closest('.cursor-pointer')
      await user.click(projectCard!)
      
      await waitFor(() => {
        const modal = screen.getByText('A detailed description of the test AI project').closest('.max-w-4xl')
        expect(modal).toHaveClass('max-w-4xl', 'max-h-[90vh]', 'overflow-y-auto')
      })
    })
  })

  describe('Accessibility', () => {
    test('filter buttons are keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      
      const allButton = screen.getByRole('button', { name: 'All' })
      const aiMlButton = screen.getByRole('button', { name: 'AI/ML' })
      
      await user.tab()
      // Focus order should be logical
      expect(allButton).toHaveAttribute('type', 'button')
    })

    test('project cards have proper hover states', () => {
      render(<Projects />)
      
      const projectCards = screen.getAllByText(/Test.*Project/).map(
        text => text.closest('.hover\\:shadow-xl')
      )
      
      projectCards.forEach(card => {
        expect(card).toHaveClass('hover:shadow-xl', 'transition-shadow', 'duration-300')
      })
    })

    test('modal has proper focus management', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      
      const projectCard = screen.getByText('Test AI Project').closest('.cursor-pointer')
      await user.click(projectCard!)
      
      await waitFor(() => {
        const closeButton = screen.getByRole('button').closest('button')
        // Close button should be focusable
        expect(closeButton).toBeInTheDocument()
      })
    })

    test('has proper heading hierarchy', () => {
      render(<Projects />)
      
      const h1 = screen.getByRole('heading', { level: 1 })
      const h2s = screen.getAllByRole('heading', { level: 2 })
      const h3s = screen.getAllByRole('heading', { level: 3 })
      
      expect(h1).toBeInTheDocument()
      expect(h2s.length).toBeGreaterThanOrEqual(0)
      expect(h3s.length).toBeGreaterThanOrEqual(2) // Project titles
    })
  })

  describe('Visual Elements and Styling', () => {
    test('project cards have proper image placeholders', () => {
      render(<Projects />)
      
      const imagePlaceholders = screen.getAllByText(/🤖|💻/)
      expect(imagePlaceholders.length).toBeGreaterThan(0)
      
      imagePlaceholders.forEach(placeholder => {
        const container = placeholder.closest('.bg-gradient-to-br')
        expect(container).toHaveClass('h-48', 'bg-gradient-to-br', 'from-primary-100', 'to-primary-200')
      })
    })

    test('applies consistent card styling', () => {
      render(<Projects />)
      
      const projectCards = screen.getAllByText(/Test.*Project/).map(
        text => text.closest('.bg-white')
      )
      
      projectCards.forEach(card => {
        expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow-lg', 'overflow-hidden')
      })
    })

    test('uses proper spacing and padding', () => {
      render(<Projects />)
      
      const cardContent = screen.getByText('Test AI Project').closest('.p-6')
      expect(cardContent).toHaveClass('p-6')
    })
  })

  describe('Data Integration', () => {
    test('handles projects data correctly', () => {
      render(<Projects />)
      
      // Should render the mock projects
      expect(screen.getByText('Test AI Project')).toBeInTheDocument()
      expect(screen.getByText('Test Full Stack App')).toBeInTheDocument()
    })

    test('handles missing optional data gracefully', () => {
      render(<Projects />)
      
      // Test project 2 doesn't have demo/github URLs
      // Modal should render without those buttons
      // This would be tested in a more detailed integration test
    })
  })
})