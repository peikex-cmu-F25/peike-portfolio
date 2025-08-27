import { render, screen } from '@testing-library/react'
import About from '../About'

describe('About Page', () => {
  describe('Page Header', () => {
    test('renders main heading', () => {
      render(<About />)
      
      const heading = screen.getByRole('heading', { name: /about me/i })
      expect(heading).toBeInTheDocument()
      expect(heading.tagName).toBe('H1')
    })

    test('displays subtitle', () => {
      render(<About />)
      
      const subtitle = screen.getByText(/Transforming complex business challenges/i)
      expect(subtitle).toBeInTheDocument()
    })

    test('header section has proper styling', () => {
      render(<About />)
      
      const headerSection = screen.getByText('About Me').closest('.text-center')
      expect(headerSection).toHaveClass('text-center', 'mb-16')
    })
  })

  describe('My Journey Section', () => {
    test('renders journey section heading', () => {
      render(<About />)
      
      const journeyHeading = screen.getByRole('heading', { name: /my journey/i })
      expect(journeyHeading).toBeInTheDocument()
      expect(journeyHeading.tagName).toBe('H2')
    })

    test('displays journey content paragraphs', () => {
      render(<About />)
      
      expect(screen.getByText(/proven track record of delivering enterprise-grade solutions/i)).toBeInTheDocument()
      expect(screen.getByText(/Located in\s+Sunnyvale, CA/i)).toBeInTheDocument()
    })

    test('includes placeholder for professional photo', () => {
      render(<About />)
      
      expect(screen.getByText('PX')).toBeInTheDocument()
      expect(screen.getByText('Professional Photo Coming Soon')).toBeInTheDocument()
    })

    test('journey section uses grid layout', () => {
      render(<About />)
      
      const journeySection = screen.getByText('My Journey').closest('.grid')
      expect(journeySection).toHaveClass('grid-cols-1', 'lg:grid-cols-2', 'gap-12')
    })
  })

  describe('Technical Skills Section', () => {
    test('renders technical skills heading', () => {
      render(<About />)
      
      const skillsHeading = screen.getByRole('heading', { name: /technical skills/i })
      expect(skillsHeading).toBeInTheDocument()
      expect(skillsHeading.tagName).toBe('H2')
    })

    test('displays key skill categories', () => {
      render(<About />)
      
      const expected = [
        'Programming Languages',
        'Machine Learning & AI',
        'Frameworks & Tools'
      ]
      expected.forEach(name => {
        expect(screen.getByText(name)).toBeInTheDocument()
      })
    })

    test('displays skills for Machine Learning & AI', () => {
      render(<About />)
      
      const skills = ['TensorFlow', 'PyTorch', 'Transformers', 'SVD']
      skills.forEach(s => expect(screen.getByText(new RegExp(s))).toBeInTheDocument())
    })

    test('displays skills for Frameworks & Tools', () => {
      render(<About />)
      
      const skills = ['React', 'Node.js', 'Docker']
      skills.forEach(s => expect(screen.getByText(new RegExp(s))).toBeInTheDocument())
    })

    test('displays skills for Cloud & Databases', () => {
      render(<About />)
      
      const skills = ['AWS', 'OpenSearch', 'PostgreSQL', 'MongoDB']
      skills.forEach(s => expect(screen.getByText(new RegExp(s))).toBeInTheDocument())
    })

    test('skills section uses card layout', () => {
      render(<About />)
      
      const skillsCards = screen.getAllByText(/Technologies|Development|Infrastructure/).map(
        text => text.closest('.card')
      )
      
      skillsCards.forEach(card => {
        expect(card).toBeInTheDocument()
        expect(card).toHaveClass('card')
      })
    })
  })

  describe('Education & Experience Section', () => {
    test('renders education & experience heading', () => {
      render(<About />)
      
      const backgroundHeading = screen.getByRole('heading', { name: /education &\s*experience/i })
      expect(backgroundHeading).toBeInTheDocument()
      expect(backgroundHeading.tagName).toBe('H2')
    })

    test('displays education card', () => {
      render(<About />)
      
      const educationHeading = screen.getByRole('heading', { name: /education/i })
      expect(educationHeading).toBeInTheDocument()
      
      expect(screen.getByText(/Master of Science in Software Engineering/i)).toBeInTheDocument()
      expect(screen.getByText(/Carnegie Mellon University/i)).toBeInTheDocument()
      expect(screen.getByText(/University of California San Diego/i)).toBeInTheDocument()
    })
  })

  describe('Layout and Structure', () => {
    test('page has proper container and padding', () => {
      render(<About />)
      
      const mainContainer = screen.getByText('About Me').closest('.container-width')
      expect(mainContainer).toBeInTheDocument()
      
      const pageContainer = mainContainer?.closest('div')
      expect(pageContainer).toHaveClass('min-h-screen', 'section-padding', 'py-20')
    })

    test('sections have proper spacing', () => {
      render(<About />)
      
      const journeySection = screen.getByText('My Journey').closest('.grid')
      expect(journeySection?.parentElement).toHaveClass('mb-20')
      
      const skillsSection = screen.getByText('Technical Skills').closest('section')
      expect(skillsSection).toHaveClass('mb-20')
    })
  })

  describe('Responsive Design', () => {
    test('main heading uses responsive text sizes', () => {
      render(<About />)
      
      const mainHeading = screen.getByRole('heading', { name: /about me/i })
      expect(mainHeading).toHaveClass('text-4xl', 'md:text-5xl')
    })

    test('section headings use responsive text sizes', () => {
      render(<About />)
      
      const sectionHeadings = screen.getAllByRole('heading', { level: 2 })
      sectionHeadings.forEach(heading => {
        expect(heading).toHaveClass('text-3xl')
      })
    })

    test('skills grid adapts to screen size', () => {
      render(<About />)
      
      const skillsGrid = screen.getByText('Programming Languages').closest('.grid')
      expect(skillsGrid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
    })

    test('journey section adapts to screen size', () => {
      render(<About />)
      
      const journeyGrid = screen.getByText('My Journey').closest('.grid')
      expect(journeyGrid).toHaveClass('grid-cols-1', 'lg:grid-cols-2')
    })
  })

  describe('Visual Elements', () => {
    test('renders professional photo placeholder with correct styling', () => {
      render(<About />)
      
      const photoPlaceholder = screen.getByText('PX').closest('.w-32.h-32')
      expect(photoPlaceholder).toHaveClass('w-32', 'h-32', 'bg-primary-200', 'rounded-full')
      
      const photoContainer = photoPlaceholder?.closest('.bg-gradient-to-br')
      expect(photoContainer).toHaveClass('bg-gradient-to-br', 'from-primary-100', 'to-secondary-100', 'rounded-2xl')
    })

    test('skill lists show bullet markers', () => {
      render(<About />)
      
      const bullets = screen.getAllByText('•')
      expect(bullets.length).toBeGreaterThan(0)
      bullets.forEach(b => expect(b).toHaveClass('text-primary-600'))
    })

    test('cards have consistent styling', () => {
      render(<About />)
      
      const cards = screen.getAllByText(/Programming Languages|Machine Learning & AI|Frameworks & Tools|Cloud & Databases|Core Competencies|Education|Work Experience/).map(
        text => text.closest('.card')
      )
      
      cards.forEach(card => {
        expect(card).toHaveClass('card')
      })
    })
  })

  describe('Content Accuracy', () => {
    test('displays accurate professional description', () => {
      render(<About />)
      
      expect(screen.getByText(/Transforming complex business challenges/i)).toBeInTheDocument()
      expect(screen.getByText(/solve real-world problems/i)).toBeInTheDocument()
    })

    // Current career goals copy no longer present on page

    test('includes relevant technical skills', () => {
      render(<About />)
      
      const keyTechnologies = [
        'TensorFlow',
        'PyTorch',
        'React',
        'TypeScript',
        'Python',
        'Node.js',
        'AWS',
        'Docker'
      ]
      
      keyTechnologies.forEach(tech => {
        expect(screen.getByText(new RegExp(tech))).toBeInTheDocument()
      })
    })
  })

  describe('SEO and Accessibility', () => {
    test('has proper heading hierarchy', () => {
      render(<About />)
      
      const h1 = screen.getByRole('heading', { level: 1 })
      const h2s = screen.getAllByRole('heading', { level: 2 })
      const h3s = screen.getAllByRole('heading', { level: 3 })
      const h4s = screen.getAllByRole('heading', { level: 4 })
      
      expect(h1).toBeInTheDocument()
      expect(h2s.length).toBeGreaterThanOrEqual(3)
      expect(h3s.length).toBeGreaterThanOrEqual(3)
      expect(h4s.length).toBeGreaterThanOrEqual(1)
    })

    test('uses semantic HTML structure', () => {
      render(<About />)
      
      const sections = screen.getAllByRole('generic').filter(el => el.tagName === 'SECTION')
      expect(sections.length).toBeGreaterThanOrEqual(2)
    })

    test('text has proper contrast and readability', () => {
      render(<About />)
      
      const bioParagraph = screen.getByText(/proven track record of delivering enterprise-grade solutions/i)
      const container = bioParagraph.closest('.text-secondary-700')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Content Organization', () => {
    test('organizes skills by logical categories', () => {
      render(<About />)
      
      // Machine Learning & AI section should contain AI-related skills
      const aiMlSection = screen.getByText('Machine Learning & AI').closest('.card')
      expect(aiMlSection).toContainElement(screen.getByText('TensorFlow'))
      expect(aiMlSection).toContainElement(screen.getByText('PyTorch'))
      
      // Frameworks & Tools section should contain relevant skills
      const frameworksSection = screen.getByText('Frameworks & Tools').closest('.card')
      expect(frameworksSection).toContainElement(screen.getByText('React'))
      expect(frameworksSection).toContainElement(screen.getByText('Docker'))
    })

    test('maintains logical flow of information', () => {
      render(<About />)
      
      const allText = document.body.textContent || ''
      
      // Header should come before journey
      const aboutIndex = allText.indexOf('About Me')
      const journeyIndex = allText.indexOf('My Journey')
      expect(aboutIndex).toBeLessThan(journeyIndex)
      
      // Journey should come before skills
      const skillsIndex = allText.indexOf('Technical Skills')
      expect(journeyIndex).toBeLessThan(skillsIndex)
      
      // Skills should come before background
      const backgroundIndex = allText.indexOf('Background')
      expect(skillsIndex).toBeLessThan(backgroundIndex)
    })
  })
})