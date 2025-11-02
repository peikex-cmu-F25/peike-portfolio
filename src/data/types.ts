export interface ProjectData {
  id: string
  title: string
  category: 'AI/ML' | 'Full Stack' | 'Cloud/DevOps' | 'Mobile' | 'Game Development'
  description: string
  longDescription: string
  technologies: string[]
  metrics: {
    label: string
    value: string
  }[]
  features: string[]
  image: string
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  year: number
}

export interface CaseStudyData {
  id: string
  title: string
  client: string
  industry: string
  category: 'AI Transformation' | 'System Optimization' | 'Digital Innovation' | 'Process Automation'
  challenge: string
  solution: string
  implementation: {
    phase: string
    duration: string
    keyActions: string[]
  }[]
  businessMetrics: {
    label: string
    before: string
    after: string
    improvement: string
  }[]
  technicalMetrics: {
    label: string
    value: string
    impact: string
  }[]
  technologies: string[]
  teamSize: string
  duration: string
  roiAnalysis: {
    investment: string
    annualSavings: string
    roiPercentage: string
    paybackPeriod: string
  }
  lessonsLearned: string[]
  recommendations: string[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  image: string
  featured: boolean
  confidential: boolean
}

export interface TechnicalLeadershipData {
  id: string
  type: 'speaking' | 'publication' | 'open_source' | 'mentorship' | 'community' | 'awards'
  title: string
  organization: string
  date: string
  description: string
  impact: {
    metric: string
    value: string
  }[]
  technologies?: string[]
  links: {
    type: 'github' | 'slides' | 'video' | 'article' | 'website' | 'certificate'
    url: string
    label: string
  }[]
  featured: boolean
  imageUrl?: string
}

export interface OpenSourceContribution {
  id: string
  projectName: string
  description: string
  role: 'Maintainer' | 'Core Contributor' | 'Regular Contributor'
  technologies: string[]
  contributions: {
    type: 'Feature' | 'Bug Fix' | 'Documentation' | 'Performance' | 'Security'
    description: string
    impact: string
  }[]
  metrics: {
    stars: number
    forks: number
    contributors: number
    downloads?: string
  }
  githubUrl: string
  featured: boolean
}

export interface ExperienceData {
  id: string
  company: string
  role: string
  location: string
  duration: string
  description: string
  achievements: string[]
  technologies: string[]
}

export interface EducationData {
  id: string
  institution: string
  degree: string
  location: string
  duration: string
  gpa?: string
  highlights: string[]
}

export interface SkillCategory {
  category: string
  skills: string[]
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  description?: string
}

export interface BlogArticle {
  id: string
  title: string
  subtitle: string
  category: 'AI/ML' | 'System Design' | 'Full Stack' | 'Performance'
  description: string
  author: string
  publishDate: string
  readTime: string
  tags: string[]
  image: string
  featured: boolean
  slug: string
  excerpt: string
  content?: string
}
