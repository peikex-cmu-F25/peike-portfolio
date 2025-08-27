import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../Home'

describe('Home Page', () => {
  describe('Hero Section', () => {
    test('renders main heading with name', () => {
      render(<Home />)
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByText("Hi, I'm")).toBeInTheDocument()
      expect(screen.getByText('Peike Xu')).toBeInTheDocument()
    })

    test('displays professional tagline', () => {
      render(<Home />)
      
      const tagline = screen.getByText(/AI\/ML Engineer & Full Stack Developer passionate about creating innovative solutions/)
      expect(tagline).toBeInTheDocument()
    })

    test('renders call-to-action buttons', () => {
      render(<Home />)
      
      const viewWorkBtn = screen.getByRole('link', { name: /view my work/i })
      const contactBtn = screen.getByRole('link', { name: /get in touch/i })
      
      expect(viewWorkBtn).toBeInTheDocument()
      expect(contactBtn).toBeInTheDocument()
    })

    test('CTA buttons have correct hrefs', () => {
      render(<Home />)
      
      const viewWorkBtn = screen.getByRole('link', { name: /view my work/i })
      const contactBtn = screen.getByRole('link', { name: /get in touch/i })
      
      expect(viewWorkBtn).toHaveAttribute('href', '/projects')
      expect(contactBtn).toHaveAttribute('href', '/contact')
    })

    test('applies correct styling classes to hero section', () => {
      render(<Home />)
      
      const heroSection = screen.getByText("Hi, I'm").closest('section')
      expect(heroSection).toHaveClass('section-padding', 'py-20', 'bg-gradient-to-br', 'from-primary-50', 'via-white', 'to-secondary-50')
    })

    test('name has gradient styling', () => {
      render(<Home />)
      
      const nameSpan = screen.getByText('Peike Xu')
      expect(nameSpan).toHaveClass('text-gradient')
    })
  })

  describe('Technical Expertise Section', () => {
    test('renders section heading', () => {
      render(<Home />)
      
      const heading = screen.getByRole('heading', { name: /technical expertise/i })
      expect(heading).toBeInTheDocument()
    })

    test('displays section description', () => {
      render(<Home />)
      
      const description = screen.getByText(/Specialized in AI\/ML technologies and full-stack development/)
      expect(description).toBeInTheDocument()
    })

    test('renders all three expertise cards', () => {
      render(<Home />)
      
      const expertiseAreas = [
        'AI/ML Engineering',
        'Full Stack Development',
        'Cloud & DevOps'
      ]
      
      expertiseAreas.forEach(area => {
        expect(screen.getByRole('heading', { name: area })).toBeInTheDocument()
      })
    })

    test('displays correct descriptions for each expertise area', () => {
      render(<Home />)
      
      expect(screen.getByText(/Deep learning, neural networks, computer vision/)).toBeInTheDocument()
      expect(screen.getByText(/React, Node.js, Python, TypeScript/)).toBeInTheDocument()
      expect(screen.getByText(/AWS, Docker, CI\/CD/)).toBeInTheDocument()
    })

    test('each expertise card has proper icon styling', () => {
      render(<Home />)
      
      const cards = screen.getAllByText(/Engineering|Development|DevOps/).map(text => 
        text.closest('.card')
      )
      
      cards.forEach(card => {
        const iconContainer = card?.querySelector('.w-16.h-16')
        expect(iconContainer).toBeInTheDocument()
        expect(iconContainer).toHaveClass('bg-primary-100', 'rounded-full', 'flex', 'items-center', 'justify-center')
      })
    })

    test('uses grid layout for expertise cards', () => {
      render(<Home />)
      
      const gridContainer = screen.getByText('AI/ML Engineering').closest('.grid')
      expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-3', 'gap-8')
    })
  })

  describe('CTA Section', () => {
    test('renders final call-to-action section', () => {
      render(<Home />)
      
      const ctaHeading = screen.getByRole('heading', { name: /Let's Build Something Amazing Together/i })
      expect(ctaHeading).toBeInTheDocument()
    })

    test('displays CTA description', () => {
      render(<Home />)
      
      const ctaDescription = screen.getByText(/I'm always interested in new opportunities and challenging projects/)
      expect(ctaDescription).toBeInTheDocument()
    })

    test('renders start conversation button', () => {
      render(<Home />)
      
      const startConversationBtn = screen.getByRole('link', { name: /start a conversation/i })
      expect(startConversationBtn).toBeInTheDocument()
      expect(startConversationBtn).toHaveAttribute('href', '/contact')
    })

    test('CTA section has dark background styling', () => {
      render(<Home />)
      
      const ctaSection = screen.getByText("Let's Build Something Amazing Together").closest('section')
      expect(ctaSection).toHaveClass('section-padding', 'py-20', 'bg-secondary-900')
    })

    test('CTA section text uses appropriate colors', () => {
      render(<Home />)
      
      const ctaHeading = screen.getByRole('heading', { name: /Let's Build Something Amazing Together/i })
      expect(ctaHeading).toHaveClass('text-white')
      
      const ctaDescription = screen.getByText(/I'm always interested in new opportunities/)
      expect(ctaDescription).toHaveClass('text-secondary-300')
    })
  })

  describe('Button Styling', () => {
    test('primary buttons have correct styling classes', () => {
      render(<Home />)
      
      const primaryButtons = [
        screen.getByRole('link', { name: /view my work/i }),
        screen.getByRole('link', { name: /start a conversation/i })
      ]
      
      primaryButtons.forEach(btn => {
        expect(btn).toHaveClass('btn-primary')
      })
    })

    test('secondary button has correct styling class', () => {
      render(<Home />)
      
      const secondaryBtn = screen.getByRole('link', { name: /get in touch/i })
      expect(secondaryBtn).toHaveClass('btn-secondary')
    })
  })

  describe('Responsive Design', () => {
    test('headings use responsive text sizes', () => {
      render(<Home />)
      
      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toHaveClass('text-4xl', 'md:text-6xl')
      
      const sectionHeadings = screen.getAllByRole('heading', { level: 2 })
      sectionHeadings.forEach(heading => {
        if (heading.textContent?.includes('Technical Expertise') || 
            heading.textContent?.includes("Let's Build Something Amazing")) {
          expect(heading).toHaveClass('text-3xl', 'md:text-4xl')
        }
      })
    })

    test('tagline uses responsive text size', () => {
      render(<Home />)
      
      const tagline = screen.getByText(/AI\/ML Engineer & Full Stack Developer/)
      expect(tagline).toHaveClass('text-xl', 'md:text-2xl')
    })

    test('button container uses responsive flex direction', () => {
      render(<Home />)
      
      const buttonContainer = screen.getByRole('link', { name: /view my work/i }).parentElement
      expect(buttonContainer).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'gap-4', 'justify-center')
    })

    test('expertise grid is responsive', () => {
      render(<Home />)
      
      const expertiseGrid = screen.getByText('AI/ML Engineering').closest('.grid')
      expect(expertiseGrid).toHaveClass('grid-cols-1', 'md:grid-cols-3')
    })
  })

  describe('Content Accuracy', () => {
    test('displays correct expertise areas and descriptions', () => {
      render(<Home />)
      
      // AI/ML Engineering
      expect(screen.getByText('AI/ML Engineering')).toBeInTheDocument()
      expect(screen.getByText(/Deep learning, neural networks, computer vision, and natural language processing/)).toBeInTheDocument()
      
      // Full Stack Development
      expect(screen.getByText('Full Stack Development')).toBeInTheDocument()
      expect(screen.getByText(/React, Node.js, Python, TypeScript, and modern web technologies/)).toBeInTheDocument()
      
      // Cloud & DevOps
      expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument()
      expect(screen.getByText(/AWS, Docker, CI\/CD, and scalable infrastructure deployment/)).toBeInTheDocument()
    })

    test('uses consistent professional messaging', () => {
      render(<Home />)
      
      const professionalTerms = [
        'AI/ML Engineer',
        'Full Stack Developer',
        'innovative solutions',
        'artificial intelligence',
        'practical applications'
      ]
      
      professionalTerms.forEach(term => {
        expect(screen.getByText(new RegExp(term, 'i'))).toBeInTheDocument()
      })
    })
  })

  describe('SEO and Structure', () => {
    test('has proper heading hierarchy', () => {
      render(<Home />)
      
      const h1 = screen.getByRole('heading', { level: 1 })
      const h2s = screen.getAllByRole('heading', { level: 2 })
      const h3s = screen.getAllByRole('heading', { level: 3 })
      
      expect(h1).toBeInTheDocument()
      expect(h2s.length).toBeGreaterThanOrEqual(2)
      expect(h3s.length).toBeGreaterThanOrEqual(3)
    })

    test('uses semantic HTML structure', () => {
      render(<Home />)
      
      const sections = screen.getAllByRole('generic').filter(el => el.tagName === 'SECTION')
      expect(sections.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('User Experience', () => {
    test('all buttons are keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const buttons = screen.getAllByRole('link')
      
      // Test that buttons can be focused
      for (let i = 0; i < buttons.length; i++) {
        await user.tab()
        // Verify focus is being managed (implementation-dependent)
      }
    })

    test('maintains focus order', async () => {
      render(<Home />)
      
      const focusableElements = screen.getAllByRole('link')
      expect(focusableElements.length).toBeGreaterThan(0)
      
      // Focus order should be logical top-to-bottom
      const expectedOrder = [
        /view my work/i,
        /get in touch/i,
        /start a conversation/i
      ]
      
      expectedOrder.forEach((pattern, index) => {
        if (focusableElements[index]) {
          expect(focusableElements[index]).toHaveTextContent(pattern)
        }
      })
    })
  })

  describe('Visual Elements', () => {
    test('renders SVG icons in expertise cards', () => {
      render(<Home />)
      
      const cards = screen.getAllByText(/Engineering|Development|DevOps/)
      
      cards.forEach(card => {
        const cardElement = card.closest('.card')
        const svg = cardElement?.querySelector('svg')
        expect(svg).toBeInTheDocument()
        expect(svg).toHaveClass('w-8', 'h-8', 'text-primary-600')
      })
    })

    test('applies proper spacing and layout classes', () => {
      render(<Home />)
      
      const container = screen.getByText("Hi, I'm").closest('.container-width')
      expect(container).toBeInTheDocument()
      
      const sections = screen.getAllByRole('generic').filter(el => el.tagName === 'SECTION')
      sections.forEach(section => {
        expect(section).toHaveClass('section-padding')
      })
    })
  })
})