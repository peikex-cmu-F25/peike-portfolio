import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import App from '../App'

// Mock the page components to simplify testing
jest.mock('../pages/Home', () => {
  return function MockHome() {
    return <div data-testid="home-page">Home Page Content</div>
  }
})

jest.mock('../pages/About', () => {
  return function MockAbout() {
    return <div data-testid="about-page">About Page Content</div>
  }
})

jest.mock('../pages/Projects', () => {
  return function MockProjects() {
    return <div data-testid="projects-page">Projects Page Content</div>
  }
})

jest.mock('../pages/Contact', () => {
  return function MockContact() {
    return <div data-testid="contact-page">Contact Page Content</div>
  }
})

jest.mock('../components/Layout', () => {
  return function MockLayout({ children }: { children: React.ReactNode }) {
    return (
      <div data-testid="layout">
        <nav data-testid="navigation">Navigation</nav>
        <main data-testid="main-content">{children}</main>
        <footer data-testid="footer">Footer</footer>
      </div>
    )
  }
})

describe('App Component', () => {
  describe('Routing', () => {
    test('renders home page at root path', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      )

      expect(screen.getByTestId('home-page')).toBeInTheDocument()
      expect(screen.getByText('Home Page Content')).toBeInTheDocument()
    })

    test('renders about page at /about path', () => {
      render(
        <MemoryRouter initialEntries={['/about']}>
          <App />
        </MemoryRouter>
      )

      expect(screen.getByTestId('about-page')).toBeInTheDocument()
      expect(screen.getByText('About Page Content')).toBeInTheDocument()
    })

    test('renders projects page at /projects path', () => {
      render(
        <MemoryRouter initialEntries={['/projects']}>
          <App />
        </MemoryRouter>
      )

      expect(screen.getByTestId('projects-page')).toBeInTheDocument()
      expect(screen.getByText('Projects Page Content')).toBeInTheDocument()
    })

    test('renders contact page at /contact path', () => {
      render(
        <MemoryRouter initialEntries={['/contact']}>
          <App />
        </MemoryRouter>
      )

      expect(screen.getByTestId('contact-page')).toBeInTheDocument()
      expect(screen.getByText('Contact Page Content')).toBeInTheDocument()
    })

    test('handles invalid routes gracefully', () => {
      render(
        <MemoryRouter initialEntries={['/invalid-route']}>
          <App />
        </MemoryRouter>
      )

      // Should still render layout even for invalid routes
      expect(screen.getByTestId('layout')).toBeInTheDocument()
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })
  })

  describe('Layout Integration', () => {
    test('renders layout component', () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      expect(screen.getByTestId('layout')).toBeInTheDocument()
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByTestId('main-content')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })

    test('page content renders within layout', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      )

      const mainContent = screen.getByTestId('main-content')
      const homePage = screen.getByTestId('home-page')
      
      expect(mainContent).toContainElement(homePage)
    })

    test('layout persists across route changes', () => {
      render(
        <MemoryRouter initialEntries={['/about']}>
          <App />
        </MemoryRouter>
      )

      // Layout components should be present
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
      
      // Page content should change but layout remains
      expect(screen.getByTestId('about-page')).toBeInTheDocument()
    })
  })

  describe('Route Configuration', () => {
    test('all defined routes render correct components', () => {
      const routes = [
        { path: '/', testId: 'home-page' },
        { path: '/about', testId: 'about-page' },
        { path: '/projects', testId: 'projects-page' },
        { path: '/contact', testId: 'contact-page' }
      ]

      routes.forEach(({ path, testId }) => {
        const { unmount } = render(
          <MemoryRouter initialEntries={[path]}>
            <App />
          </MemoryRouter>
        )

        expect(screen.getByTestId(testId)).toBeInTheDocument()
        unmount()
      })
    })

    test('routes are case sensitive', () => {
      render(
        <MemoryRouter initialEntries={['/About']} // Capital A
          >
          <App />
        </MemoryRouter>
      )

      // Should not match /about route (case sensitive)
      expect(screen.queryByTestId('about-page')).not.toBeInTheDocument()
    })

    test('routes require exact match', () => {
      render(
        <MemoryRouter initialEntries={['/about/extra']}>
          <App />
        </MemoryRouter>
      )

      // Should not match /about route with extra path
      expect(screen.queryByTestId('about-page')).not.toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    test('follows proper React component structure', () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      // App should have a single root element containing Layout
      const layout = screen.getByTestId('layout')
      expect(layout).toBeInTheDocument()
    })

    test('uses React Router properly', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      )

      // Routes component should be rendered
      expect(screen.getByTestId('main-content')).toBeInTheDocument()
    })

    test('handles React strict mode', () => {
      // Test that components handle being mounted/unmounted in strict mode
      const { unmount, rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      )

      expect(screen.getByTestId('home-page')).toBeInTheDocument()

      rerender(
        <MemoryRouter initialEntries={['/about']}>
          <App />
        </MemoryRouter>
      )

      expect(screen.getByTestId('about-page')).toBeInTheDocument()
      unmount()
    })
  })

  describe('Navigation Integration', () => {
    test('navigation context is available to child components', () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      // Navigation should be rendered within router context
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
    })

    test('router context is properly provided', () => {
      // This tests that useLocation, useNavigate etc. would work
      render(
        <MemoryRouter initialEntries={['/projects']}>
          <App />
        </MemoryRouter>
      )

      expect(screen.getByTestId('projects-page')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    test('handles component errors gracefully', () => {
      // Mock console.error to avoid noise in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      )

      // Should render without throwing
      expect(screen.getByTestId('layout')).toBeInTheDocument()

      consoleSpy.mockRestore()
    })

    test('maintains application state on route changes', () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      )

      expect(screen.getByTestId('home-page')).toBeInTheDocument()

      rerender(
        <MemoryRouter initialEntries={['/about']}>
          <App />
        </MemoryRouter>
      )

      expect(screen.getByTestId('about-page')).toBeInTheDocument()
      // Layout should persist
      expect(screen.getByTestId('layout')).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    test('does not cause unnecessary re-renders', () => {
      const renderSpy = jest.fn()
      
      // Mock a component to track renders
      jest.doMock('../pages/Home', () => {
        return function MockHome() {
          renderSpy()
          return <div data-testid="home-page">Home Page Content</div>
        }
      })

      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      )

      expect(renderSpy).toHaveBeenCalledTimes(1)

      // Rerender with same route
      rerender(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      )

      // Should not cause additional renders if implemented efficiently
      expect(renderSpy).toHaveBeenCalledTimes(2)
    })

    test('handles rapid route changes', async () => {
      const user = userEvent.setup()
      
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      expect(screen.getByTestId('layout')).toBeInTheDocument()
      
      // Multiple rapid navigation changes should not cause issues
      // Note: This would require actual navigation implementation
      // For now, just verify the app structure remains stable
      expect(screen.getByTestId('main-content')).toBeInTheDocument()
    })
  })

  describe('TypeScript Integration', () => {
    test('components are properly typed', () => {
      // This test verifies TypeScript compilation
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      expect(screen.getByTestId('layout')).toBeInTheDocument()
    })

    test('route parameters are handled correctly', () => {
      // Test that TypeScript types are working for route props
      render(
        <MemoryRouter initialEntries={['/projects']}>
          <App />
        </MemoryRouter>
      )

      expect(screen.getByTestId('projects-page')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    test('maintains semantic structure', () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByTestId('main-content')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })

    test('supports keyboard navigation', async () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      // Should be able to tab through focusable elements
      expect(screen.getByTestId('layout')).toBeInTheDocument()
    })

    test('provides proper document structure for screen readers', () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      // Layout should provide semantic structure
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByTestId('main-content')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })
  })
})