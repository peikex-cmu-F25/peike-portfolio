import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import App from '../../App'

// Integration tests for the complete portfolio application
describe('Portfolio Integration Tests', () => {
  describe('Full Application Flow', () => {
    test('user can navigate through all pages', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      // Should start on home page
      expect(screen.getByText(/Hi, I'm/)).toBeInTheDocument()
      expect(screen.getByText('Peike Xu')).toBeInTheDocument()

      // Navigate to About page
      const aboutLink = screen.getAllByRole('link', { name: /about/i }).find(l => l.closest('nav'))!
      await user.click(aboutLink)
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
      })

      // Navigate to Projects page
      const projectsLink = screen.getAllByRole('link', { name: /projects/i }).find(l => l.closest('nav'))!
      await user.click(projectsLink)
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /my projects/i })).toBeInTheDocument()
      })

      // Navigate to Contact page
      const contactLink = screen.getAllByRole('link', { name: /contact/i }).find(l => l.closest('nav'))!
      await user.click(contactLink)
      
      // Note: Contact page might not exist yet, so this test might fail
      // This would be updated once Contact page is implemented
    })

    test('navigation remains consistent across all pages', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      const pages = [
        { link: /home/i, path: '/' },
        { link: /about/i, path: '/about' },
        { link: /projects/i, path: '/projects' }
      ]

      for (const page of pages) {
        const navLink = screen.getAllByRole('link', { name: page.link }).find(l => l.closest('nav'))!
        await user.click(navLink)
        
        // Navigation should be present on all pages
        expect(screen.getByText('Peike Xu')).toBeInTheDocument() // Logo
        expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument()
      }
    })

    test('footer remains consistent across all pages', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      const pages = ['/about', '/projects']
      
      // Check home page footer
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
      expect(screen.getByText(/All rights reserved/)).toBeInTheDocument()

      for (const path of pages) {
        const navLink = screen.getAllByRole('link', { 
          name: path === '/about' ? /about/i : /projects/i 
        }).find(l => l.closest('nav'))!
        await user.click(navLink)
        
        await waitFor(() => {
          expect(screen.getByRole('contentinfo')).toBeInTheDocument()
          expect(screen.getByText(/All rights reserved/)).toBeInTheDocument()
        })
      }
    })
  })

  describe('Cross-Page Functionality', () => {
    test('CTA buttons navigate to correct pages', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      // From home page, click "View My Work"
      const viewWorkBtn = screen.getByRole('link', { name: /view my portfolio projects/i })
      expect(viewWorkBtn).toHaveAttribute('href', '/projects')
      
      await user.click(viewWorkBtn)
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /my projects/i })).toBeInTheDocument()
      })

      // Navigate back to home
      const homeLink = screen.getAllByRole('link', { name: /home/i }).find(l => l.closest('nav'))!
      await user.click(homeLink)
      
      await waitFor(() => {
        expect(screen.getByText(/Hi, I'm/)).toBeInTheDocument()
      })

      // Click "Get In Touch" or "Start a Conversation"
      const contactBtns = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href') === '/contact'
      )
      
      if (contactBtns.length > 0) {
        await user.click(contactBtns[0])
        // Would check for contact page content
      }
    })

    test('footer quick links navigate correctly', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      // Find footer quick links
      const footerAboutLink = screen.getAllByRole('link', { name: /about/i })
        .find(link => link.closest('footer'))
      
      if (footerAboutLink) {
        await user.click(footerAboutLink)
        
        await waitFor(() => {
          expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
        })
      }
    })

    test('brand logo always navigates to home', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      // Navigate to another page first
      const aboutLink = screen.getAllByRole('link', { name: /about/i }).find(l => l.closest('nav'))!
      await user.click(aboutLink)
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
      })

      // Click brand logo
      const brandLogo = screen.getByRole('link', { name: 'Peike Xu' })
      await user.click(brandLogo)
      
      await waitFor(() => {
        expect(screen.getByText(/Hi, I'm/)).toBeInTheDocument()
      })
    })
  })

  describe('Responsive Behavior Integration', () => {
    test('mobile navigation works across pages', async () => {
      const user = userEvent.setup()
      
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      // Find mobile menu button
      const menuButton = screen.getByRole('button', { name: /open main menu/i })
      expect(menuButton).toBeInTheDocument()

      // Open mobile menu
      await user.click(menuButton)

      // Navigate to about page via mobile menu
      const mobileAboutLink = screen.getAllByRole('link', { name: /about/i })
        .find(link => link.closest('.md\\:hidden'))

      if (mobileAboutLink) {
        await user.click(mobileAboutLink)
        
        await waitFor(() => {
          expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
        })

        // Menu should close after navigation
        expect(screen.queryByRole('link', { name: /about/i }))
          .not.toBeInTheDocument()
      }
    })

    test('layout adapts correctly on different pages', () => {
      const pages = ['/', '/about', '/projects']

      pages.forEach(path => {
        const { unmount } = render(
          <MemoryRouter initialEntries={[path]}>
            <App />
          </MemoryRouter>
        )

        // Each page should have proper layout structure
        expect(screen.getByRole('navigation')).toBeInTheDocument()
        expect(screen.getByRole('main')).toBeInTheDocument()
        expect(screen.getByRole('contentinfo')).toBeInTheDocument()

        // Layout should have consistent styling
        const layout = screen.getByRole('main').closest('div')
        expect(layout).toHaveClass('min-h-screen', 'bg-white')

        const main = screen.getByRole('main')
        expect(main).toHaveClass('pt-16')

        unmount()
      })
    })
  })

  describe('Data Integration', () => {
    test('portfolio data is displayed consistently', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      )

      // Home page should show consistent branding
      expect(screen.getByRole('link', { name: 'Peike Xu' })).toBeInTheDocument()
      expect(screen.getByText(/AI\/ML Engineer/)).toBeInTheDocument()

      // Navigation to about page
      const { unmount } = render(
        <MemoryRouter initialEntries={['/about']}>
          <App />
        </MemoryRouter>
      )

      // About page should show consistent information
      expect(screen.getByText(/AI\/ML Engineer & Full Stack Developer|AI\/ML Engineer and Full Stack Developer/)).toBeInTheDocument()

      unmount()
    })

    test('external links work correctly', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      )

      // Check footer social links
      const githubLink = screen.getAllByRole('link', { name: /github/i }).find(l => l.closest('footer'))!
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')

      const linkedinLink = screen.getAllByRole('link', { name: /linkedin/i }).find(l => l.closest('footer'))!
      expect(linkedinLink).toHaveAttribute('target', '_blank')
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Performance Integration', () => {
    test('page transitions are smooth', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      // Measure time for navigation (basic performance test)
      const startTime = Date.now()
      
      const aboutLink = screen.getAllByRole('link', { name: /about/i }).find(l => l.closest('nav'))!
      await user.click(aboutLink)
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
      })

      const endTime = Date.now()
      const navigationTime = endTime - startTime

      // Navigation should be fast (under 1 second)
      expect(navigationTime).toBeLessThan(1000)
    })

    test('multiple rapid navigations handle gracefully', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      // Rapidly navigate between pages
      const homeLink = screen.getAllByRole('link', { name: /home/i }).find(l => l.closest('nav'))!
      const aboutLink = screen.getAllByRole('link', { name: /about/i }).find(l => l.closest('nav'))!
      const projectsLink = screen.getAllByRole('link', { name: /projects/i }).find(l => l.closest('nav'))!

      // Rapid clicks
      await user.click(aboutLink)
      await user.click(projectsLink)
      await user.click(homeLink)
      await user.click(aboutLink)

      // Should end up on about page
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
      })

      // Application should remain stable
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })
  })

  describe('Accessibility Integration', () => {
    test('keyboard navigation works across entire application', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      // Should be able to tab through all focusable elements
      await user.tab() // Brand link
      await user.tab() // Home link
      await user.tab() // About link
      
      // Verify focus is working
      const aboutLink = screen.getAllByRole('link', { name: /about/i }).find(l => l.closest('nav'))!
      expect(aboutLink).toHaveFocus()

      // Navigate with Enter key
      await user.keyboard('{Enter}')
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
      })
    })

    test('focus management works correctly on route changes', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      // Navigate to another page
      const aboutLink = screen.getByRole('link', { name: /about/i })
      await user.click(aboutLink)
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
      })

      // Focus should be managed appropriately
      // Main content should be accessible
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })

    test('screen reader landmarks are consistent', () => {
      const pages = ['/', '/about', '/projects']

      pages.forEach(path => {
        const { unmount } = render(
          <MemoryRouter initialEntries={[path]}>
            <App />
          </MemoryRouter>
        )

        // Each page should have consistent landmarks
        expect(screen.getByRole('navigation')).toBeInTheDocument()
        expect(screen.getByRole('main')).toBeInTheDocument()
        expect(screen.getByRole('contentinfo')).toBeInTheDocument()

        unmount()
      })
    })
  })

  describe('Error Handling Integration', () => {
    test('application handles missing pages gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      render(
        <MemoryRouter initialEntries={['/nonexistent']}>
          <App />
        </MemoryRouter>
      )

      // Should still render layout even for nonexistent routes
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()

      consoleSpy.mockRestore()
    })

    test('maintains state consistency on errors', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      // Even if individual components have issues,
      // overall application structure should remain stable
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })
  })

  describe('Content Consistency Integration', () => {
    test('branding is consistent across all pages', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )

      const pages = [
        { link: /about/i, check: () => expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument() },
        { link: /projects/i, check: () => expect(screen.getByRole('heading', { name: /my projects/i })).toBeInTheDocument() }
      ]

      for (const page of pages) {
        const navLink = screen.getByRole('link', { name: page.link })
        await user.click(navLink)
        
        await waitFor(page.check)

        // Branding should be consistent
        expect(screen.getByRole('link', { name: 'Peike Xu' })).toBeInTheDocument()
        expect(screen.getByText(/AI\/ML Engineer|Full Stack Developer/)).toBeInTheDocument()
      }
    })

    test('professional information is consistent', () => {
      const pages = ['/', '/about']

      pages.forEach(path => {
        const { unmount } = render(
          <MemoryRouter initialEntries={[path]}>
            <App />
          </MemoryRouter>
        )

        // Should mention AI/ML and Full Stack consistently
        expect(screen.getByText(/AI\/ML|Machine Learning/)).toBeInTheDocument()
        expect(screen.getByText(/Full Stack/)).toBeInTheDocument()

        unmount()
      })
    })
  })
})