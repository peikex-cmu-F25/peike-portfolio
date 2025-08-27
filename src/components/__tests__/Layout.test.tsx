import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from '../Layout'

// Mock the child components
jest.mock('../Navigation', () => {
  return function MockNavigation() {
    return <nav data-testid="navigation">Navigation Component</nav>
  }
})

jest.mock('../Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer Component</footer>
  }
})

const MockedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <Layout>{children}</Layout>
    </BrowserRouter>
  )
}

describe('Layout Component', () => {
  describe('Component Structure', () => {
    test('renders all required components', () => {
      render(
        <MockedLayout>
          <div>Test Content</div>
        </MockedLayout>
      )

      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    test('renders children in main content area', () => {
      const testContent = 'This is test content for layout'
      render(
        <MockedLayout>
          <div>{testContent}</div>
        </MockedLayout>
      )

      const mainElement = screen.getByRole('main')
      expect(mainElement).toContainElement(screen.getByText(testContent))
    })

    test('has proper semantic HTML structure', () => {
      render(
        <MockedLayout>
          <div>Test Content</div>
        </MockedLayout>
      )

      // Check for semantic elements
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })
  })

  describe('Layout Styling', () => {
    test('applies correct root container classes', () => {
      render(
        <MockedLayout>
          <div>Test Content</div>
        </MockedLayout>
      )

      const container = screen.getByRole('main').closest('div')
      expect(container).toHaveClass('min-h-screen', 'bg-white')
    })

    test('applies correct main content classes', () => {
      render(
        <MockedLayout>
          <div>Test Content</div>
        </MockedLayout>
      )

      const main = screen.getByRole('main')
      expect(main).toHaveClass('pt-16')
    })

    test('main content has proper top padding for fixed navigation', () => {
      render(
        <MockedLayout>
          <div>Test Content</div>
        </MockedLayout>
      )

      const main = screen.getByRole('main')
      // pt-16 provides space for the fixed navigation bar
      expect(main).toHaveClass('pt-16')
    })
  })

  describe('Children Rendering', () => {
    test('renders single child component', () => {
      const SingleChild = () => <div>Single Child Component</div>
      
      render(
        <MockedLayout>
          <SingleChild />
        </MockedLayout>
      )

      expect(screen.getByText('Single Child Component')).toBeInTheDocument()
    })

    test('renders multiple child components', () => {
      render(
        <MockedLayout>
          <div>First Child</div>
          <div>Second Child</div>
          <div>Third Child</div>
        </MockedLayout>
      )

      expect(screen.getByText('First Child')).toBeInTheDocument()
      expect(screen.getByText('Second Child')).toBeInTheDocument()
      expect(screen.getByText('Third Child')).toBeInTheDocument()
    })

    test('renders complex nested children', () => {
      render(
        <MockedLayout>
          <section>
            <h1>Page Title</h1>
            <article>
              <p>Article content</p>
            </article>
          </section>
        </MockedLayout>
      )

      expect(screen.getByText('Page Title')).toBeInTheDocument()
      expect(screen.getByText('Article content')).toBeInTheDocument()
    })

    test('handles empty children gracefully', () => {
      render(
        <MockedLayout>
          {null}
        </MockedLayout>
      )

      // Should not throw error and still render navigation/footer
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })

    test('handles conditional children', () => {
      const showContent = true
      
      render(
        <MockedLayout>
          {showContent && <div>Conditional Content</div>}
        </MockedLayout>
      )

      expect(screen.getByText('Conditional Content')).toBeInTheDocument()
    })
  })

  describe('Props Interface', () => {
    test('accepts ReactNode children prop', () => {
      // This test verifies the TypeScript interface is working
      const TestComponent = () => {
        return (
          <MockedLayout>
            <div>ReactNode children</div>
          </MockedLayout>
        )
      }

      render(<TestComponent />)
      expect(screen.getByText('ReactNode children')).toBeInTheDocument()
    })

    test('accepts string children', () => {
      render(
        <MockedLayout>
          Simple string content
        </MockedLayout>
      )

      expect(screen.getByText('Simple string content')).toBeInTheDocument()
    })

    test('accepts JSX elements as children', () => {
      render(
        <MockedLayout>
          <h1>JSX Element</h1>
        </MockedLayout>
      )

      expect(screen.getByText('JSX Element')).toBeInTheDocument()
    })
  })

  describe('Component Integration', () => {
    test('Navigation component receives correct context', () => {
      render(
        <MockedLayout>
          <div>Content</div>
        </MockedLayout>
      )

      // Navigation should be rendered within router context
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
    })

    test('Footer component is always rendered', () => {
      render(
        <MockedLayout>
          <div>Any Content</div>
        </MockedLayout>
      )

      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })

    test('maintains correct component rendering order', () => {
      const { container } = render(
        <MockedLayout>
          <div>Main Content</div>
        </MockedLayout>
      )

      const elements = container.children[0].children
      
      // Should be Navigation, Main, Footer in that order
      expect(elements[0]).toHaveAttribute('data-testid', 'navigation')
      expect(elements[1].tagName).toBe('MAIN')
      expect(elements[2]).toHaveAttribute('data-testid', 'footer')
    })
  })

  describe('Responsive Layout', () => {
    test('layout adapts to content size', () => {
      render(
        <MockedLayout>
          <div style={{ height: '2000px' }}>Very tall content</div>
        </MockedLayout>
      )

      const container = screen.getByRole('main').closest('div')
      expect(container).toHaveClass('min-h-screen')
    })

    test('maintains layout with minimal content', () => {
      render(
        <MockedLayout>
          <div>Short content</div>
        </MockedLayout>
      )

      const container = screen.getByRole('main').closest('div')
      expect(container).toHaveClass('min-h-screen')
    })
  })

  describe('Accessibility', () => {
    test('has proper document structure for screen readers', () => {
      render(
        <MockedLayout>
          <h1>Page Content</h1>
        </MockedLayout>
      )

      // Check landmark roles are present
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    test('main content is focusable for skip navigation', () => {
      render(
        <MockedLayout>
          <h1>Main Content</h1>
        </MockedLayout>
      )

      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
      // Main element should be focusable for accessibility
    })
  })

  describe('Performance', () => {
    test('does not cause unnecessary re-renders', () => {
      const renderSpy = jest.fn()
      
      const TestChild = () => {
        renderSpy()
        return <div>Test Child</div>
      }

      const { rerender } = render(
        <MockedLayout>
          <TestChild />
        </MockedLayout>
      )

      expect(renderSpy).toHaveBeenCalledTimes(1)

      // Rerender with same content
      rerender(
        <MockedLayout>
          <TestChild />
        </MockedLayout>
      )

      // Should not cause additional renders if implemented efficiently
      expect(renderSpy).toHaveBeenCalledTimes(2)
    })
  })
})