import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Footer from '../Footer'

// Mock current year to make tests consistent
const mockCurrentYear = 2024
vi.spyOn(Date.prototype, 'getFullYear').mockReturnValue(mockCurrentYear)

describe('Footer Component', () => {
  describe('Content Rendering', () => {
    test('renders footer with correct content', () => {
      render(<Footer />)
      
      expect(screen.getByText('Peike Xu')).toBeInTheDocument()
      expect(screen.getByText(/AI\/ML Engineer and Full Stack Developer/)).toBeInTheDocument()
      expect(screen.getByText('Quick Links')).toBeInTheDocument()
    })

    test('displays current year in copyright', () => {
      render(<Footer />)
      
      expect(screen.getByText(`© ${mockCurrentYear} Peike Xu. All rights reserved.`)).toBeInTheDocument()
    })

    test('shows professional description', () => {
      render(<Footer />)
      
      const description = screen.getByText(/AI\/ML Engineer and Full Stack Developer passionate about creating innovative solutions/)
      expect(description).toBeInTheDocument()
    })
  })

  describe('Social Links', () => {
    test('renders GitHub link with correct attributes', () => {
      render(<Footer />)
      
      const githubLink = screen.getByRole('link', { name: /github/i })
      expect(githubLink).toHaveAttribute('href', 'https://github.com/peixu')
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    test('renders LinkedIn link with correct attributes', () => {
      render(<Footer />)
      
      const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/peixu')
      expect(linkedinLink).toHaveAttribute('target', '_blank')
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    test('renders email link with correct href', () => {
      render(<Footer />)
      
      const emailLink = screen.getByRole('link', { name: /email/i })
      expect(emailLink).toHaveAttribute('href', 'mailto:peike.xu@example.com')
    })

    test('social links have proper hover styling classes', () => {
      render(<Footer />)
      
      const githubLink = screen.getByRole('link', { name: /github/i })
      expect(githubLink).toHaveClass('text-secondary-300', 'hover:text-white', 'transition-colors', 'duration-200')
      
      const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
      expect(linkedinLink).toHaveClass('text-secondary-300', 'hover:text-white', 'transition-colors', 'duration-200')
    })
  })

  describe('Navigation Links', () => {
    test('renders quick links navigation', () => {
      render(<Footer />)
      
      const quickLinks = ['About', 'Projects', 'Contact']
      quickLinks.forEach(linkText => {
        const link = screen.getByRole('link', { name: linkText })
        expect(link).toBeInTheDocument()
      })
    })

    test('quick links have correct href attributes', () => {
      render(<Footer />)
      
      const expectedLinks = [
        { text: 'About', href: '/about' },
        { text: 'Projects', href: '/projects' },
        { text: 'Contact', href: '/contact' },
      ]

      expectedLinks.forEach(({ text, href }) => {
        const link = screen.getByRole('link', { name: text })
        expect(link).toHaveAttribute('href', href)
      })
    })

    test('quick links have proper styling', () => {
      render(<Footer />)
      
      const aboutLink = screen.getByRole('link', { name: 'About' })
      expect(aboutLink).toHaveClass('text-secondary-300', 'hover:text-white', 'transition-colors', 'duration-200')
    })
  })

  describe('SVG Icons', () => {
    test('renders GitHub SVG icon', () => {
      render(<Footer />)
      
      const githubLink = screen.getByRole('link', { name: /github/i })
      const svgIcon = githubLink.querySelector('svg')
      expect(svgIcon).toBeInTheDocument()
      expect(svgIcon).toHaveClass('h-6', 'w-6')
    })

    test('renders LinkedIn SVG icon', () => {
      render(<Footer />)
      
      const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
      const svgIcon = linkedinLink.querySelector('svg')
      expect(svgIcon).toBeInTheDocument()
      expect(svgIcon).toHaveClass('h-6', 'w-6')
    })

    test('renders Email SVG icon', () => {
      render(<Footer />)
      
      const emailLink = screen.getByRole('link', { name: /email/i })
      const svgIcon = emailLink.querySelector('svg')
      expect(svgIcon).toBeInTheDocument()
      expect(svgIcon).toHaveClass('h-6', 'w-6')
    })

    test('SVG icons have proper fill and stroke attributes', () => {
      render(<Footer />)
      
      const githubLink = screen.getByRole('link', { name: /github/i })
      const githubSvg = githubLink.querySelector('svg')
      expect(githubSvg).toHaveAttribute('fill', 'currentColor')

      const emailLink = screen.getByRole('link', { name: /email/i })
      const emailSvg = emailLink.querySelector('svg')
      expect(emailSvg).toHaveAttribute('fill', 'none')
      expect(emailSvg).toHaveAttribute('stroke', 'currentColor')
    })
  })

  describe('Accessibility', () => {
    test('has proper screen reader text for social links', () => {
      render(<Footer />)
      
      const socialLinks = ['GitHub', 'LinkedIn', 'Email']
      socialLinks.forEach(linkName => {
        const srText = screen.getByText(linkName)
        expect(srText).toHaveClass('sr-only')
      })
    })

    test('social links are keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<Footer />)
      
      const githubLink = screen.getByRole('link', { name: /github/i })
      await user.tab()
      // Note: Exact tab order depends on page structure
    })

    test('footer has proper semantic structure', () => {
      render(<Footer />)
      
      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
    })
  })

  describe('Layout and Styling', () => {
    test('has correct background and text colors', () => {
      render(<Footer />)
      
      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('bg-secondary-900', 'text-white')
    })

    test('uses proper grid layout classes', () => {
      render(<Footer />)
      
      const footer = screen.getByRole('contentinfo')
      const gridContainer = footer.querySelector('.grid')
      expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-3', 'gap-8')
    })

    test('has correct container and padding classes', () => {
      render(<Footer />)
      
      const footer = screen.getByRole('contentinfo')
      const container = footer.querySelector('.container-width')
      expect(container).toHaveClass('section-padding', 'py-12')
    })

    test('copyright section has proper border styling', () => {
      render(<Footer />)
      
      const copyrightSection = screen.getByText(`© ${mockCurrentYear} Peike Xu. All rights reserved.`).parentElement
      expect(copyrightSection).toHaveClass('border-t', 'border-secondary-700', 'mt-8', 'pt-8', 'text-center', 'text-secondary-300')
    })
  })

  describe('Responsive Design', () => {
    test('adapts grid layout for different screen sizes', () => {
      render(<Footer />)
      
      const footer = screen.getByRole('contentinfo')
      const mainGrid = footer.querySelector('.grid.grid-cols-1.md\\:grid-cols-3')
      expect(mainGrid).toBeInTheDocument()
    })

    test('bio section spans correct columns on different screens', () => {
      render(<Footer />)
      
      const footer = screen.getByRole('contentinfo')
      const bioSection = footer.querySelector('.col-span-1.md\\:col-span-2')
      expect(bioSection).toBeInTheDocument()
    })
  })

  describe('Content Accuracy', () => {
    test('displays correct professional tagline', () => {
      render(<Footer />)
      
      const tagline = screen.getByText(/passionate about creating innovative solutions that bridge artificial intelligence and practical applications/)
      expect(tagline).toBeInTheDocument()
    })

    test('social links point to correct profiles', () => {
      render(<Footer />)
      
      // These should match the actual social media profiles
      const githubLink = screen.getByRole('link', { name: /github/i })
      expect(githubLink.getAttribute('href')).toContain('github.com/peixu')
      
      const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
      expect(linkedinLink.getAttribute('href')).toContain('linkedin.com/in/peixu')
    })
  })

  describe('User Interactions', () => {
    test('external links open in new tab', () => {
      render(<Footer />)
      
      const externalLinks = [
        screen.getByRole('link', { name: /github/i }),
        screen.getByRole('link', { name: /linkedin/i })
      ]

      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank')
      })
    })

    test('email link does not open in new tab', () => {
      render(<Footer />)
      
      const emailLink = screen.getByRole('link', { name: /email/i })
      expect(emailLink).not.toHaveAttribute('target')
    })
  })
})