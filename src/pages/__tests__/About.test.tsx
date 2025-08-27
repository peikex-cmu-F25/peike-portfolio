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
      
      const subtitle = screen.getByText(/Passionate about leveraging AI and full-stack development/)
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
      
      const journeyTexts = [
        /I'm an AI\/ML Engineer and Full Stack Developer with a passion for creating intelligent applications/,
        /With experience in both machine learning research and full-stack development/,
        /I'm currently seeking opportunities at top-tier tech companies/
      ]
      
      journeyTexts.forEach(text => {
        expect(screen.getByText(text)).toBeInTheDocument()
      })
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

    test('displays all skill categories', () => {
      render(<About />)
      
      const skillCategories = [
        'AI/ML Technologies',
        'Frontend Development',
        'Backend & Infrastructure'
      ]
      
      skillCategories.forEach(category => {
        expect(screen.getByRole('heading', { name: category })).toBeInTheDocument()
      })
    })

    test('displays correct skills for AI/ML Technologies', () => {
      render(<About />)
      
      const aiMlSkills = [
        'TensorFlow, PyTorch',
        'Computer Vision',
        'Natural Language Processing',
        'Deep Learning',
        'MLOps & Model Deployment'
      ]
      
      aiMlSkills.forEach(skill => {
        expect(screen.getByText(skill)).toBeInTheDocument()
      })
    })

    test('displays correct skills for Frontend Development', () => {
      render(<About />)
      
      const frontendSkills = [
        'React, TypeScript',
        'Next.js, Vite',
        'Tailwind CSS',
        'Modern JavaScript (ES6+)',
        'Responsive Design'
      ]
      
      frontendSkills.forEach(skill => {
        expect(screen.getByText(skill)).toBeInTheDocument()
      })
    })

    test('displays correct skills for Backend & Infrastructure', () => {
      render(<About />)
      
      const backendSkills = [
        'Python, Node.js',
        'FastAPI, Express.js',
        'PostgreSQL, MongoDB',
        'AWS, Docker',
        'CI/CD Pipelines'
      ]
      
      backendSkills.forEach(skill => {
        expect(screen.getByText(skill)).toBeInTheDocument()
      })
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

  describe('Background Section', () => {
    test('renders background section heading', () => {
      render(<About />)
      
      const backgroundHeading = screen.getByRole('heading', { name: /background/i })
      expect(backgroundHeading).toBeInTheDocument()
      expect(backgroundHeading.tagName).toBe('H2')
    })

    test('displays education card', () => {
      render(<About />)
      
      const educationHeading = screen.getByRole('heading', { name: /education/i })
      expect(educationHeading).toBeInTheDocument()
      
      expect(screen.getByText('Computer Science')).toBeInTheDocument()
      expect(screen.getByText('University • Year')).toBeInTheDocument()
      expect(screen.getByText(/Focus on Machine Learning and Software Engineering/)).toBeInTheDocument()
    })

    test('displays certifications card', () => {
      render(<About />)
      
      const certificationsHeading = screen.getByRole('heading', { name: /certifications/i })
      expect(certificationsHeading).toBeInTheDocument()
      
      const certifications = [
        'AWS Certified Solutions Architect',
        'TensorFlow Developer Certificate',
        'Deep Learning Specialization'
      ]
      
      certifications.forEach(cert => {
        expect(screen.getByText(cert)).toBeInTheDocument()
      })
    })

    test('background section uses grid layout', () => {
      render(<About />)
      
      const backgroundGrid = screen.getByText('Education').closest('.grid')
      expect(backgroundGrid).toHaveClass('grid-cols-1', 'lg:grid-cols-2', 'gap-8')
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
      
      const skillsGrid = screen.getByText('AI/ML Technologies').closest('.grid')
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

    test('skill lists use proper bullet styling', () => {
      render(<About />)
      
      const skillItems = screen.getAllByText(/^• /)
      expect(skillItems.length).toBeGreaterThan(0)
      
      // Each skill item should start with a bullet
      skillItems.forEach(item => {
        expect(item.textContent).toMatch(/^• /)
      })
    })

    test('cards have consistent styling', () => {
      render(<About />)
      
      const cards = screen.getAllByText(/Technologies|Development|Infrastructure|Education|Certifications/).map(
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
      
      expect(screen.getByText(/bridge the gap between cutting-edge AI research and practical, deployable applications/)).toBeInTheDocument()
      expect(screen.getByText(/solve real-world problems/)).toBeInTheDocument()
    })

    test('shows current career goals', () => {
      render(<About />)
      
      expect(screen.getByText(/currently seeking opportunities at top-tier tech companies/)).toBeInTheDocument()
      expect(screen.getByText(/contribute to innovative AI projects/)).toBeInTheDocument()
    })

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
      expect(sections.length).toBeGreaterThanOrEqual(3)
    })

    test('text has proper contrast and readability', () => {
      render(<About />)
      
      const paragraphs = screen.getAllByText(/I'm an AI|With experience|I'm currently/)
      paragraphs.forEach(paragraph => {
        expect(paragraph).toHaveClass('text-secondary-700')
      })
    })
  })

  describe('Content Organization', () => {
    test('organizes skills by logical categories', () => {
      render(<About />)
      
      // AI/ML section should contain AI-related skills
      const aiMlSection = screen.getByText('AI/ML Technologies').closest('.card')
      expect(aiMlSection).toContainElement(screen.getByText('TensorFlow, PyTorch'))
      expect(aiMlSection).toContainElement(screen.getByText('Computer Vision'))
      
      // Frontend section should contain frontend skills
      const frontendSection = screen.getByText('Frontend Development').closest('.card')
      expect(frontendSection).toContainElement(screen.getByText('React, TypeScript'))
      expect(frontendSection).toContainElement(screen.getByText('Tailwind CSS'))
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