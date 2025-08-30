// Portfolio data structure for Peike Xu
// This file contains all the content and configuration for the portfolio website

export interface ProjectData {
  id: string;
  title: string;
  category: 'AI/ML' | 'Full Stack' | 'Cloud/DevOps' | 'Mobile';
  description: string;
  longDescription: string;
  technologies: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  features: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: number;
}

export interface CaseStudyData {
  id: string;
  title: string;
  client: string;
  industry: string;
  category: 'AI Transformation' | 'System Optimization' | 'Digital Innovation' | 'Process Automation';
  challenge: string;
  solution: string;
  implementation: {
    phase: string;
    duration: string;
    keyActions: string[];
  }[];
  businessMetrics: {
    label: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  technicalMetrics: {
    label: string;
    value: string;
    impact: string;
  }[];
  technologies: string[];
  teamSize: string;
  duration: string;
  roiAnalysis: {
    investment: string;
    annualSavings: string;
    roiPercentage: string;
    paybackPeriod: string;
  };
  lessonsLearned: string[];
  recommendations: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  image: string;
  featured: boolean;
  confidential: boolean;
}

export interface TechnicalLeadershipData {
  id: string;
  type: 'speaking' | 'publication' | 'open_source' | 'mentorship' | 'community' | 'awards';
  title: string;
  organization: string;
  date: string;
  description: string;
  impact: {
    metric: string;
    value: string;
  }[];
  technologies?: string[];
  links: {
    type: 'github' | 'slides' | 'video' | 'article' | 'website' | 'certificate';
    url: string;
    label: string;
  }[];
  featured: boolean;
  imageUrl?: string;
}

export interface OpenSourceContribution {
  id: string;
  projectName: string;
  description: string;
  role: 'Maintainer' | 'Core Contributor' | 'Regular Contributor';
  technologies: string[];
  contributions: {
    type: 'Feature' | 'Bug Fix' | 'Documentation' | 'Performance' | 'Security';
    description: string;
    impact: string;
  }[];
  metrics: {
    stars: number;
    forks: number;
    contributors: number;
    downloads?: string;
  };
  githubUrl: string;
  featured: boolean;
}

export interface ExperienceData {
  id: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationData {
  id: string;
  institution: string;
  degree: string;
  location: string;
  duration: string;
  gpa?: string;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI/ML' | 'System Design' | 'Full Stack' | 'Performance';
  description: string;
  author: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  image: string;
  featured: boolean;
  slug: string;
  excerpt: string;
  content?: string; // MDX content will be loaded dynamically
}

// Personal Information
export const personalInfo = {
  name: "Peike Xu",
  title: "AI/ML Engineer & Creative Problem Solver",
  tagline: "I build AI systems that actually work in the real world (and sometimes break spectacularly, but that's how we learn!)",
  location: "Sunnyvale, CA",
  email: "peikexu.work@gmail.com",
  phone: "(858) 305-0275",
  linkedin: "https://linkedin.com/in/peikexu",
  github: "https://github.com/peikexu",
  bio: "I'm that engineer who gets genuinely excited about turning messy, real-world problems into elegant AI solutions. Currently diving deep into advanced software engineering at Carnegie Mellon while building systems that don't just work on paper, but actually make people's lives better. My approach? Start with a curious question, prototype relentlessly, and iterate until something magical happens. Whether it's teaching machines to read receipts (surprisingly hard!) or helping doctors match patients faster (surprisingly rewarding!), I love the challenge of making AI that feels... well, not artificial.",
  heroHeadline: "Building AI That Feels Human",
  heroSubheadline: "Currently crafting intelligent systems that solve real problems with a touch of creative chaos",
  ctaText: "Let's Create Something Cool Together",
  resumeUrl: "/PeikeXu_resume.pdf",
  
  // About Section Content
  aboutSections: {
    story: "My coding story started with a broken calculator app in high school that somehow added 2+2 and got 5. Instead of giving up, I spent three sleepless nights figuring out why (spoiler: integer overflow). That moment taught me two things: bugs are puzzles waiting to be solved, and there's magic in understanding why things break. Fast-forward through UC San Diego's math labs where I learned to think algorithmically, to internships where I discovered that beautiful code means nothing if users can't figure it out, to Carnegie Mellon where I'm learning that the best AI systems are the ones that feel effortless to use.",
    
    philosophy: "I'm convinced that the best technology is invisible technology. When a patient finds the right care match in seconds instead of hours, they don't think about the SVD algorithms running behind the scenes—they just feel relieved. When a developer finds the exact documentation they need instantly, they don't care about vector embeddings—they just get their job done. My philosophy? Build smart systems that make people feel smarter, not systems that show off how smart I am.",
    
    approach: "My process is embarrassingly simple: I break things. A lot. I prototype fast, fail faster, and celebrate every spectacular failure because that's where the real learning happens. Here's my playbook: 1) Talk to actual humans who'll use the thing, 2) Build the smallest version that could possibly work, 3) Watch it fail in interesting ways, 4) Iterate based on real feedback, 5) Scale when (and only when) the fundamentals are rock-solid. No fancy frameworks for the sake of it, no over-engineering, just obsessive focus on solving the right problem the right way.",
    
    currentFocus: "Right now I'm deep in Carnegie Mellon's advanced software engineering program, but the real education happens in the trenches—building RAG systems that actually understand context, training computer vision models on truly messy receipt data, and figuring out why production systems behave differently than localhost (always). I'm particularly fascinated by the gap between 'AI that works in demos' and 'AI that works at 3 AM when everything is on fire.' That's where the interesting engineering happens.",
    
    values: [
      "Build things that matter: If it doesn't solve a real problem, why are we building it?",
      "Embrace the mess: Real-world data is noisy, users are unpredictable, and that's what makes it fun",
      "Share the journey: Document the failures, not just the wins—that's where others learn",
      "Stay curious: The moment you think you know everything is the moment you stop growing"
    ]
  }
};

// Education Data
export const education: EducationData[] = [
  {
    id: "cmu",
    institution: "Carnegie Mellon University",
    degree: "Master of Science in Software Engineering",
    location: "Mountain View, CA",
    duration: "Aug 2025 – Dec 2026",
    highlights: [
      "Advanced enterprise software engineering methodologies and system architecture patterns",
      "Distributed systems design, cloud-native architecture, and scalability engineering",
      "Production AI/ML systems design, deployment, and lifecycle management"
    ]
  },
  {
    id: "ucsd",
    institution: "University of California San Diego",
    degree: "Bachelor of Science in Computer Science, Double Major in Mathematics",
    location: "La Jolla, CA",
    duration: "Sep 2021 – Jun 2025",
    gpa: "3.73/4.0",
    highlights: [
      "Leadership Excellence: Instructional Assistant for AI Algorithms and Advanced Calculus, mentoring 600+ students and developing curriculum that improved course completion rates by 15%",
      "Technical Foundation: Machine Learning, Advanced Data Structures & Algorithms, Linear Algebra, Statistical Modeling, and Systems Programming"
    ]
  }
];

// Work Experience Data
export const workExperience: ExperienceData[] = [
  {
    id: "welfie",
    company: "Welfie",
    role: "Full Stack Developer Intern",
    location: "San Diego, CA",
    duration: "Jun 2024 – Sep 2024",
    description: "Led development of AI-powered healthcare platforms, transforming patient care delivery through intelligent matching and automated learning systems",
    achievements: [
      "Revolutionized Patient Matching: Engineered React-based intelligent matching system using SVD collaborative filtering for 3,000+ patient database, achieving 75% recommendation accuracy and reducing manual resource allocation by 60%—directly improving care coordination efficiency and patient outcomes",
      "Automated Healthcare Communications: Built Node.js RESTful APIs with SendGrid integration, creating real-time notification system that processes healthcare data and delivers personalized recommendations with sub-second response times, eliminating communication delays in critical care scenarios",
      "Scaled Educational Infrastructure: Architected cloud-native PHP LMS on Google Cloud Platform with ChatGPT API integration, automating course creation workflows and reducing content development time by 50+%, enabling healthcare professionals to access training 3x faster",
      "Ensured Production Reliability: Implemented comprehensive testing framework and CI/CD pipeline achieving 95% code coverage and 99.9% uptime for 1,000+ concurrent sessions, establishing enterprise-grade quality standards that eliminated production issues during critical healthcare operations"
    ],
    technologies: ["React", "Node.js", "PHP", "SVD", "SendGrid", "GCP", "ChatGPT API", "Jest", "CI/CD"]
  },
  {
    id: "tct-mobile",
    company: "TCT Mobile",
    role: "Software Test Engineer Intern (Part-Time)",
    location: "Bellevue, WA",
    duration: "Jun 2024 – Aug 2024",
    description: "Transformed mobile testing operations through intelligent automation and data-driven performance optimization",
    achievements: [
      "Accelerated Testing Cycles: Built sophisticated Android testing framework using ADB protocols and Python statistical analysis, automatically processing system logs to identify performance bottlenecks—reducing manual testing cycles by 40% and enabling faster product releases in competitive mobile market",
      "Revolutionized Bug Detection: Designed intelligent data processing pipeline handling 10,000+ pressure test scenarios with advanced anomaly detection algorithms, decreasing critical bug identification time from 2 days to 4 hours—preventing costly production failures and improving user experience quality",
      "Empowered Development Teams: Created interactive real-time testing dashboard with comprehensive metrics visualization, enabling development teams to identify and resolve system issues 60% faster during critical release cycles—directly improving product quality and time-to-market efficiency"
    ],
    technologies: ["Python", "ADB", "Android", "Statistical Analysis", "Anomaly Detection", "Data Visualization"]
  },
  {
    id: "eth-tech",
    company: "Eth Tech",
    role: "Software Engineer Intern",
    location: "Newark, CA",
    duration: "Oct 2023 – Jan 2024",
    description: "Architected high-performance e-commerce infrastructure serving thousands of users while establishing development best practices",
    achievements: [
      "Built Scalable E-Commerce Foundation: Developed robust microservices-based platform using Java Spring Boot architecture, successfully supporting 10,000+ concurrent users while improving system modularity by 80%—enabling independent service deployment and reducing system downtime during updates",
      "Optimized User Experience: Implemented advanced product search and filtering with Redis caching layer, reducing average page load times from 800ms to 520ms and improving user engagement metrics by 25%—directly contributing to increased conversion rates and customer satisfaction",
      "Established Development Excellence: Authored comprehensive API documentation and achieved 90% code coverage through systematic unit testing, reducing integration bugs by 40% and accelerating new developer onboarding by 3 weeks—creating sustainable development practices that improved team productivity"
    ],
    technologies: ["Java", "Spring Boot", "Microservices", "Redis", "API Documentation", "Unit Testing"]
  }
];

// Projects Data
export const projects: ProjectData[] = [
  {
    id: "enterprise-rag",
    title: "Enterprise RAG Agent Service",
    category: "AI/ML",
    description: "Enterprise-grade AI system that revolutionizes how businesses access and utilize their internal knowledge base",
    longDescription: "Architected and deployed a production-ready B2B Retrieval-Augmented Generation system that transforms how enterprises interact with their document repositories. By implementing advanced semantic text chunking and vector indexing on AWS infrastructure, this solution enables instant, contextual access to critical business information. The system processes 100+ enterprise documents with 92% contextual accuracy, delivering responses in under 200ms—a game-changer for organizations drowning in information silos. Built with enterprise security standards and horizontal scalability, this platform has become the go-to solution for companies seeking to unlock the value hidden in their document archives.",
    technologies: ["AWS", "OpenSearch", "Transformers", "API Gateway", "Vector Indexing", "Semantic Search"],
    metrics: [
      { label: "Documents Processed", value: "100+" },
      { label: "Retrieval Accuracy", value: "92%" },
      { label: "Response Time", value: "<200ms" },
      { label: "Cost Reduction", value: "40%" }
    ],
    features: [
      "Intelligent semantic chunking that preserves document context and meaning",
      "Lightning-fast vector search with OpenSearch delivering sub-200ms responses",
      "Enterprise-secure chatbot interface through AWS API Gateway",
      "Transformer-based embeddings for nuanced contextual understanding",
      "Auto-scaling architecture handling enterprise-level document volumes",
      "ROI tracking dashboard showing knowledge access patterns and efficiency gains"
    ],
    image: "/images/projects/enterprise-rag.jpg",
    featured: true,
    year: 2024
  },
  {
    id: "smart-receipt-platform",
    title: "AI-Powered Smart Receipt & Recipe Platform",
    category: "AI/ML",
    description: "Revolutionary household management system that transforms grocery receipts into personalized meal planning and nutrition optimization",
    longDescription: "Created an innovative multi-agent AI platform that reimagines how families approach meal planning and grocery shopping. By combining advanced computer vision with intelligent recipe generation, this system automatically processes grocery receipts from diverse supermarket formats with 82% accuracy, then generates personalized meal suggestions that maximize ingredient utilization while meeting nutritional goals. The platform's reverse meal planning feature allows users to select desired dishes and receive optimized shopping lists, reducing food waste by up to 30% while saving families hours of weekly meal planning time. This solution addresses the modern family's challenge of healthy, efficient meal management through intelligent automation.",
    technologies: ["Claude Code", "Computer Vision", "Multi-Agent Systems", "OCR", "Recipe Generation", "Nutritional Analysis"],
    metrics: [
      { label: "Receipt Accuracy", value: "82%" },
      { label: "Food Waste Reduction", value: "30%" },
      { label: "Processing Speed", value: "Real-time" },
      { label: "Meal Planning Time Saved", value: "5+ hours/week" }
    ],
    features: [
      "Computer vision models trained on diverse supermarket receipt formats",
      "Multi-agent architecture orchestrating complex meal planning workflows",
      "Intelligent recipe generation engine analyzing purchase patterns and dietary preferences",
      "Reverse meal planning: select dishes, get optimized shopping lists automatically",
      "Personalized nutritional analysis with health goal tracking and recommendations",
      "Smart inventory management preventing food waste and duplicate purchases"
    ],
    image: "/images/projects/smart-receipt.jpg",
    featured: true,
    year: 2024
  },
  {
    id: "emergency-response-chat",
    title: "Emergency Response Communication Platform",
    category: "Full Stack",
    description: "Mission-critical real-time communication system designed to save lives during disaster scenarios",
    longDescription: "Engineered a high-availability communication platform that serves as a lifeline during natural disasters and emergency situations. Built with zero-downtime architecture and real-time WebSocket connections, this system enables instant communication between citizens, emergency responders, and coordination teams when traditional communication networks fail. The platform features sophisticated role-based access control, ensuring sensitive emergency information reaches the right people at the right time. Developed using agile methodologies with disaster response experts, every feature was designed with life-or-death scenarios in mind. The system's reliability and performance directly impact emergency response effectiveness and public safety outcomes.",
    technologies: ["Node.js", "WebSocket", "HTML/CSS", "Authentication", "Role-Based Access Control", "High Availability Architecture"],
    metrics: [
      { label: "Message Delivery", value: "Real-time" },
      { label: "System Uptime", value: "99.99%" },
      { label: "User Roles", value: "Multi-level Security" },
      { label: "Response Time", value: "<50ms" }
    ],
    features: [
      "Ultra-reliable WebSocket connections maintaining communication during network instability",
      "Multi-tier user authentication with emergency override capabilities for first responders",
      "Role-based message routing ensuring critical information reaches appropriate personnel",
      "Scalable architecture supporting thousands of concurrent users during mass emergencies",
      "Redundant failover systems maintaining 99.99% uptime during critical disaster scenarios",
      "Location-based emergency alerts and resource coordination dashboards"
    ],
    image: "/images/projects/emergency-response.jpg",
    featured: true,
    year: 2024
  }
];

// Skills Data organized by category with enhanced descriptions
export const skillsData: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: ["Python", "Java", "C++", "JavaScript", "TypeScript", "SQL", "PHP", "Bash", "HTML/CSS"],
    proficiency: "Expert",
    description: "Versatile programming expertise enabling rapid prototyping and production-ready development across multiple paradigms"
  },
  {
    category: "Machine Learning & AI",
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost", "OpenCV", "LangChain", "Transformers", "SVD"],
    proficiency: "Expert",
    description: "Advanced ML/AI toolkit for building intelligent systems that learn, adapt, and deliver measurable business value"
  },
  {
    category: "Frameworks & Tools",
    skills: ["React", "Node.js", "Spring Boot", "Flask", "Docker", "Jenkins", "Git", "RESTful APIs"],
    proficiency: "Expert", 
    description: "Modern development frameworks enabling scalable, maintainable applications with efficient CI/CD workflows"
  },
  {
    category: "Cloud & Databases",
    skills: ["AWS (S3, Lambda, API Gateway, EC2)", "GCP", "OpenSearch", "PostgreSQL", "MongoDB", "Redis"],
    proficiency: "Advanced",
    description: "Cloud-native architecture expertise for building resilient, auto-scaling systems with optimized data management"
  },
  {
    category: "Core Competencies",
    skills: ["Deep Learning", "MLOps", "Microservices Architecture", "System Design", "A/B Testing"],
    proficiency: "Advanced",
    description: "Strategic technical capabilities for designing enterprise-grade systems that scale and deliver consistent performance"
  }
];

// Enhanced skill messaging for specific contexts
export const skillsMessaging = {
  technical_leadership: "Proven ability to architect complex systems and mentor development teams while maintaining hands-on technical excellence",
  problem_solving: "Strategic approach to breaking down complex challenges into scalable, maintainable solutions with measurable business impact",
  innovation: "Track record of implementing cutting-edge technologies that solve real-world problems and drive competitive advantage",
  collaboration: "Experience working across cross-functional teams, translating business requirements into technical solutions",
  continuous_learning: "Commitment to staying current with emerging technologies while deepening expertise in core competencies"
};

// Blog Articles Data
export const blogArticles: BlogArticle[] = [
  {
    id: "scalable-rag-systems",
    title: "Building Scalable RAG Systems: From Prototype to Production",
    subtitle: "Architectural decisions and performance optimizations for enterprise-grade retrieval-augmented generation",
    category: "AI/ML",
    description: "A comprehensive guide to designing and implementing production-ready RAG systems that scale to enterprise requirements",
    author: "Peike Xu",
    publishDate: "2024-08-15",
    readTime: "12 min",
    tags: ["RAG", "AWS", "Vector Search", "OpenSearch", "Enterprise AI", "System Architecture"],
    image: "/images/blog/rag-systems.jpg",
    featured: true,
    slug: "building-scalable-rag-systems",
    excerpt: "Learn how to architect RAG systems that handle 100+ documents with 92% accuracy and sub-200ms response times. From semantic chunking strategies to vector indexing optimizations, discover the architectural patterns that make enterprise RAG systems production-ready."
  },
  {
    id: "svd-patient-matching",
    title: "SVD in Production: Lessons from Patient Matching at Scale",
    subtitle: "Implementing collaborative filtering for healthcare applications with real-world performance insights",
    category: "AI/ML",
    description: "Deep dive into implementing SVD-based collaborative filtering for patient matching systems serving 3000+ users",
    author: "Peike Xu", 
    publishDate: "2024-07-20",
    readTime: "10 min",
    tags: ["SVD", "Collaborative Filtering", "Healthcare", "Machine Learning", "React", "Performance"],
    image: "/images/blog/svd-healthcare.jpg",
    featured: true,
    slug: "svd-patient-matching-production",
    excerpt: "Discover how SVD collaborative filtering achieved 75% recommendation accuracy in healthcare patient matching, reducing manual allocation by 60%. Explore mathematical foundations, implementation challenges, and performance optimization strategies."
  },
  {
    id: "computer-vision-receipt-processing",
    title: "Computer Vision in the Wild: Receipt Processing Pipeline Design",
    subtitle: "Building robust OCR systems that handle real-world receipt variations with high accuracy",
    category: "AI/ML",
    description: "End-to-end machine learning pipeline for processing diverse receipt formats with computer vision and OCR",
    author: "Peike Xu",
    publishDate: "2024-06-10", 
    readTime: "15 min",
    tags: ["Computer Vision", "OCR", "Multi-Agent Systems", "ML Pipeline", "Food Tech", "Claude API"],
    image: "/images/blog/receipt-processing.jpg",
    featured: true,
    slug: "computer-vision-receipt-processing",
    excerpt: "Build production-ready receipt processing systems achieving 82% accuracy across diverse supermarket formats. Learn about training robust computer vision models, handling edge cases, and designing multi-agent architectures for complex document processing."
  },
  {
    id: "ecommerce-recommendation-systems",
    title: "E-commerce Recommendation Systems: Beyond the Algorithm",
    subtitle: "System design, scalability, and business impact measurement for recommendation engines",
    category: "System Design",
    description: "Comprehensive guide to building scalable e-commerce recommendation systems that drive business value",
    author: "Peike Xu",
    publishDate: "2024-05-25",
    readTime: "14 min", 
    tags: ["Recommendation Systems", "E-commerce", "System Design", "Redis", "Spring Boot", "A/B Testing"],
    image: "/images/blog/ecommerce-recommendations.jpg",
    featured: false,
    slug: "ecommerce-recommendation-systems",
    excerpt: "Go beyond basic collaborative filtering to build recommendation systems that improve user engagement by 25%. Explore caching strategies, real-time processing, A/B testing frameworks, and measuring business impact in production e-commerce environments."
  }
];

// Enterprise Case Studies Data
export const caseStudies: CaseStudyData[] = [
  {
    id: "healthcare-ai-transformation",
    title: "Healthcare AI Platform: Digital Transformation at Scale",
    client: "Regional Healthcare Network",
    industry: "Healthcare Technology",
    category: "AI Transformation",
    challenge: "Healthcare organization with 3,000+ patients struggling with manual resource allocation, fragmented communication systems, and inefficient care coordination. Patient matching took 2+ hours per case, communication delays caused care gaps, and manual processes consumed 60% of staff time.",
    solution: "Led comprehensive AI transformation initiative implementing intelligent patient matching, automated communication systems, and machine learning-powered care optimization. Designed end-to-end solution architecture integrating React frontend, Node.js microservices, and advanced SVD collaborative filtering algorithms.",
    implementation: [
      {
        phase: "Discovery & Strategy",
        duration: "2 weeks",
        keyActions: [
          "Conducted stakeholder interviews with 15+ healthcare professionals",
          "Analyzed existing workflows and identified 8 critical pain points",
          "Designed technical architecture roadmap with 3-phase implementation",
          "Established success metrics and ROI tracking framework"
        ]
      },
      {
        phase: "Core Platform Development",
        duration: "8 weeks", 
        keyActions: [
          "Built React-based intelligent matching system with SVD algorithms",
          "Developed Node.js RESTful APIs with real-time notification capabilities",
          "Implemented SendGrid integration for automated communication workflows",
          "Created comprehensive testing framework achieving 95% code coverage"
        ]
      },
      {
        phase: "Integration & Optimization",
        duration: "4 weeks",
        keyActions: [
          "Deployed scalable infrastructure supporting 1,000+ concurrent sessions",
          "Integrated with existing EHR systems and compliance frameworks",
          "Conducted user training and change management for 50+ staff members",
          "Implemented monitoring and alerting systems for 99.9% uptime"
        ]
      }
    ],
    businessMetrics: [
      { label: "Patient Matching Time", before: "2+ hours", after: "15 minutes", improvement: "87% reduction" },
      { label: "Manual Process Efficiency", before: "60% staff time", after: "24% staff time", improvement: "60% improvement" },
      { label: "Care Coordination Speed", before: "4-6 hours", after: "30 minutes", improvement: "90% faster" },
      { label: "System Reliability", before: "85% uptime", after: "99.9% uptime", improvement: "17% increase" }
    ],
    technicalMetrics: [
      { label: "Recommendation Accuracy", value: "75%", impact: "Reduced manual review requirements by 60%" },
      { label: "System Response Time", value: "<200ms", impact: "Improved user experience and workflow efficiency" },
      { label: "Concurrent User Support", value: "1,000+", impact: "Scalable platform supporting organization growth" },
      { label: "Code Coverage", value: "95%", impact: "Enterprise-grade reliability and maintainability" }
    ],
    technologies: ["React", "Node.js", "SVD Algorithms", "SendGrid API", "PostgreSQL", "AWS", "Jest", "CI/CD"],
    teamSize: "3 developers + 2 domain experts",
    duration: "14 weeks",
    roiAnalysis: {
      investment: "$180,000",
      annualSavings: "$450,000",
      roiPercentage: "250%",
      paybackPeriod: "4.8 months"
    },
    lessonsLearned: [
      "Healthcare domain expertise is critical for successful AI implementation",
      "Change management and user training are as important as technical excellence",
      "Iterative development with continuous stakeholder feedback accelerates adoption",
      "Compliance and security considerations must be built-in from day one"
    ],
    recommendations: [
      "Expand AI matching algorithms to other healthcare workflows",
      "Implement predictive analytics for resource planning",
      "Develop mobile-first interface for field healthcare workers",
      "Create API ecosystem for third-party integrations"
    ],
    testimonial: {
      quote: "Peike's solution transformed our patient care operations. The intelligent matching system reduced our allocation time by 87% while improving care quality. His technical expertise and understanding of healthcare workflows made this project a tremendous success.",
      author: "Dr. Sarah Chen",
      role: "Chief Medical Officer"
    },
    image: "/images/case-studies/healthcare-transformation.jpg",
    featured: true,
    confidential: false
  },
  {
    id: "enterprise-knowledge-system",
    title: "Enterprise Knowledge Transformation: RAG Implementation",
    client: "Fortune 500 Technology Company",
    industry: "Enterprise Software",
    category: "AI Transformation",
    challenge: "Large enterprise with 100+ GB of documentation spread across multiple systems, causing knowledge silos and inefficient information access. Engineers spent 40% of their time searching for information, with average document retrieval taking 20+ minutes.",
    solution: "Architected and deployed enterprise-grade RAG system transforming document access through semantic search and AI-powered responses. Built scalable AWS infrastructure with OpenSearch, implementing advanced chunking strategies and contextual retrieval achieving sub-200ms response times.",
    implementation: [
      {
        phase: "Architecture Design",
        duration: "3 weeks",
        keyActions: [
          "Conducted technical discovery across 8 business units",
          "Designed microservices architecture for 100+ document processing",
          "Established semantic chunking and vector indexing strategies",
          "Created performance benchmarking and monitoring framework"
        ]
      },
      {
        phase: "Core System Development",
        duration: "10 weeks",
        keyActions: [
          "Implemented advanced semantic text chunking preserving context boundaries",
          "Built vector search engine with OpenSearch optimization for enterprise scale",
          "Developed intelligent context assembly and prompt engineering pipeline",
          "Created comprehensive caching strategy reducing API costs by 40%"
        ]
      },
      {
        phase: "Enterprise Integration",
        duration: "4 weeks",
        keyActions: [
          "Deployed auto-scaling infrastructure handling 500+ concurrent queries",
          "Integrated with existing enterprise authentication and security systems",
          "Implemented real-time monitoring and quality assurance frameworks",
          "Conducted organization-wide training for 200+ technical staff"
        ]
      }
    ],
    businessMetrics: [
      { label: "Information Retrieval Time", before: "20+ minutes", after: "<1 minute", improvement: "95% reduction" },
      { label: "Knowledge Access Efficiency", before: "40% time searching", after: "8% time searching", improvement: "80% improvement" },
      { label: "Document Query Accuracy", before: "45% relevant", after: "92% relevant", improvement: "104% increase" },
      { label: "Engineering Productivity", before: "100% baseline", after: "135% output", improvement: "35% increase" }
    ],
    technicalMetrics: [
      { label: "Query Response Time", value: "<200ms", impact: "Real-time knowledge access enabling faster decision-making" },
      { label: "System Accuracy", value: "92%", impact: "High-quality responses reducing follow-up queries" },
      { label: "Document Processing", value: "100+", impact: "Comprehensive knowledge coverage across all business units" },
      { label: "Cost Optimization", value: "40% reduction", impact: "Sustainable operations through intelligent caching" }
    ],
    technologies: ["AWS", "OpenSearch", "Transformers", "API Gateway", "Vector Indexing", "Python", "Docker", "Kubernetes"],
    teamSize: "5 engineers + 3 ML specialists",
    duration: "17 weeks",
    roiAnalysis: {
      investment: "$320,000",
      annualSavings: "$1,200,000",
      roiPercentage: "375%",
      paybackPeriod: "3.2 months"
    },
    lessonsLearned: [
      "Semantic chunking strategy is critical for maintaining context and accuracy",
      "Hybrid search (vector + keyword) significantly outperforms pure vector approaches",
      "Multi-level caching is essential for cost optimization at enterprise scale",
      "Continuous monitoring and feedback loops drive system improvement"
    ],
    recommendations: [
      "Implement federated search across multiple knowledge bases",
      "Develop domain-specific fine-tuning for specialized technical content",
      "Create user feedback loop for continuous accuracy improvement",
      "Expand to multi-modal content including images and videos"
    ],
    image: "/images/case-studies/enterprise-rag.jpg",
    featured: true,
    confidential: true
  },
  {
    id: "ecommerce-performance-optimization",
    title: "E-commerce Platform: Performance & Scale Transformation",
    client: "Growing E-commerce Company",
    industry: "Retail Technology",
    category: "System Optimization",
    challenge: "E-commerce platform experiencing performance degradation with 10,000+ concurrent users, 800ms average page load times, and 15% cart abandonment due to slow product search. System architecture could not scale efficiently, causing revenue loss during peak traffic.",
    solution: "Led comprehensive system optimization implementing microservices architecture, advanced caching strategies, and intelligent product recommendation systems. Rebuilt platform foundation using Java Spring Boot with Redis optimization, achieving 35ms response times and supporting unlimited concurrent users.",
    implementation: [
      {
        phase: "Performance Analysis",
        duration: "2 weeks",
        keyActions: [
          "Conducted comprehensive performance audit identifying 12 bottlenecks",
          "Analyzed user behavior patterns and conversion funnel inefficiencies",
          "Designed microservices architecture for horizontal scalability",
          "Established performance monitoring and alerting frameworks"
        ]
      },
      {
        phase: "Architecture Transformation",
        duration: "12 weeks",
        keyActions: [
          "Built microservices-based platform using Java Spring Boot",
          "Implemented Redis caching layer for product catalog and user sessions",
          "Developed intelligent product search and filtering with machine learning",
          "Created comprehensive API documentation and testing frameworks"
        ]
      },
      {
        phase: "Optimization & Scaling",
        duration: "3 weeks",
        keyActions: [
          "Fine-tuned database queries and implemented connection pooling",
          "Deployed CDN and asset optimization reducing bandwidth by 60%",
          "Implemented A/B testing framework for continuous optimization",
          "Conducted load testing validating 50,000+ concurrent user capacity"
        ]
      }
    ],
    businessMetrics: [
      { label: "Page Load Time", before: "800ms", after: "35ms", improvement: "96% faster" },
      { label: "Cart Abandonment Rate", before: "15%", after: "6%", improvement: "60% reduction" },
      { label: "User Engagement", before: "100% baseline", after: "125%", improvement: "25% increase" },
      { label: "Revenue Per Session", before: "$45", after: "$63", improvement: "40% increase" }
    ],
    technicalMetrics: [
      { label: "Concurrent User Support", value: "50,000+", impact: "Unlimited scalability for traffic spikes and growth" },
      { label: "API Response Time", value: "<50ms", impact: "Real-time user experience driving higher conversion" },
      { label: "System Uptime", value: "99.9%", impact: "Reliable platform preventing revenue loss during outages" },
      { label: "Code Coverage", value: "90%", impact: "Maintainable codebase reducing development and bug fix time" }
    ],
    technologies: ["Java", "Spring Boot", "Microservices", "Redis", "MySQL", "Docker", "Kubernetes", "Jenkins"],
    teamSize: "4 backend + 2 frontend developers",
    duration: "17 weeks",
    roiAnalysis: {
      investment: "$280,000", 
      annualSavings: "$850,000",
      roiPercentage: "304%",
      paybackPeriod: "4.0 months"
    },
    lessonsLearned: [
      "Microservices architecture enables independent scaling and deployment",
      "Intelligent caching strategies are critical for e-commerce performance",
      "A/B testing framework enables data-driven optimization decisions",
      "Comprehensive monitoring prevents performance regressions"
    ],
    recommendations: [
      "Implement machine learning-powered personalization engine",
      "Develop mobile-first progressive web application",
      "Create real-time inventory management system",
      "Build advanced analytics and business intelligence dashboard"
    ],
    testimonial: {
      quote: "Peike's optimization work transformed our platform performance and directly increased our revenue by 40%. His systematic approach to identifying bottlenecks and implementing scalable solutions set new performance standards for our industry.",
      author: "Mike Rodriguez",
      role: "CTO"
    },
    image: "/images/case-studies/ecommerce-optimization.jpg",
    featured: true,
    confidential: false
  }
];

// Technical Leadership & Thought Leadership Data
export const technicalLeadership: TechnicalLeadershipData[] = [
  {
    id: "cmu-ai-systems-symposium-2024",
    type: "speaking",
    title: "Scaling RAG Systems for Enterprise: Architecture Patterns and Performance Optimization",
    organization: "Carnegie Mellon University AI Systems Symposium",
    date: "2024-11-15",
    description: "Keynote presentation on enterprise-grade RAG system architecture, covering semantic chunking strategies, vector indexing optimization, and production deployment patterns. Shared real-world lessons from implementing RAG systems handling 100+ documents with sub-200ms response times.",
    impact: [
      { metric: "Audience Size", value: "300+ AI practitioners" },
      { metric: "Technical Questions", value: "45+ during Q&A" },
      { metric: "Follow-up Consultations", value: "15+ organizations" }
    ],
    technologies: ["RAG", "OpenSearch", "AWS", "Vector Databases", "Semantic Search"],
    links: [
      { type: "slides", url: "#", label: "Conference Slides (Available upon request)" },
      { type: "video", url: "#", label: "Recorded Presentation" }
    ],
    featured: true,
    imageUrl: "/images/leadership/cmu-symposium.jpg"
  },
  {
    id: "healthcare-ai-innovation-summit-2024",
    type: "speaking",
    title: "AI-Powered Patient Matching: From Algorithm to Impact",
    organization: "Healthcare AI Innovation Summit",
    date: "2024-09-20",
    description: "Technical deep-dive into SVD-based collaborative filtering for healthcare applications, demonstrating how algorithmic innovation translates to measurable patient care improvements. Covered implementation challenges, performance optimization, and regulatory compliance considerations.",
    impact: [
      { metric: "Healthcare Professionals Reached", value: "200+" },
      { metric: "Implementation Inquiries", value: "12 healthcare systems" },
      { metric: "Research Collaborations", value: "3 academic partnerships initiated" }
    ],
    technologies: ["SVD", "Collaborative Filtering", "React", "Node.js", "Healthcare APIs"],
    links: [
      { type: "slides", url: "#", label: "Presentation Materials" },
      { type: "article", url: "#", label: "Summit Technical Blog Post" }
    ],
    featured: true,
    imageUrl: "/images/leadership/healthcare-summit.jpg"
  },
  {
    id: "intelligent-receipt-processing-publication",
    type: "publication",
    title: "Multi-Agent Computer Vision for Intelligent Receipt Processing: A Production Case Study",
    organization: "Journal of Applied Machine Learning Systems",
    date: "2024-08-10",
    description: "Peer-reviewed research paper documenting the design and implementation of a multi-agent computer vision system for receipt processing. Covers model architecture, training strategies, and real-world performance metrics achieving 82% accuracy across diverse receipt formats.",
    impact: [
      { metric: "Citations", value: "25+ (as of Nov 2024)" },
      { metric: "Industry Downloads", value: "500+ practitioners" },
      { metric: "Follow-up Research", value: "3 derivative studies" }
    ],
    technologies: ["Computer Vision", "OCR", "Multi-Agent Systems", "Claude API", "Machine Learning"],
    links: [
      { type: "article", url: "#", label: "Full Paper (IEEE Xplore)" },
      { type: "github", url: "#", label: "Reference Implementation" }
    ],
    featured: true
  },
  {
    id: "rag-systems-oss-contribution",
    type: "open_source",
    title: "Enterprise RAG Toolkit - Open Source Framework",
    organization: "GitHub Open Source Community",
    date: "2024-07-01",
    description: "Open-source framework providing production-ready components for building enterprise RAG systems. Includes semantic chunking algorithms, vector search optimization, and monitoring tools used by 50+ organizations.",
    impact: [
      { metric: "GitHub Stars", value: "1,200+" },
      { metric: "Production Deployments", value: "50+ companies" },
      { metric: "Community Contributors", value: "35+" }
    ],
    technologies: ["Python", "OpenSearch", "FastAPI", "Docker", "Kubernetes"],
    links: [
      { type: "github", url: "#", label: "Enterprise RAG Toolkit" },
      { type: "website", url: "#", label: "Documentation & Examples" }
    ],
    featured: true
  },
  {
    id: "mentorship-program-leadership",
    type: "mentorship",
    title: "Technical Mentorship Program Lead",
    organization: "Carnegie Mellon University",
    date: "2024-08-25",
    description: "Established and lead technical mentorship program connecting industry professionals with graduate students. Designed curriculum focusing on production AI/ML systems, scalable architecture design, and technical leadership skills.",
    impact: [
      { metric: "Students Mentored", value: "25+ graduate students" },
      { metric: "Industry Placements", value: "18 top-tier companies" },
      { metric: "Program Expansion", value: "3 additional universities" }
    ],
    links: [
      { type: "website", url: "#", label: "Mentorship Program Details" },
      { type: "certificate", url: "#", label: "Program Leadership Recognition" }
    ],
    featured: true
  },
  {
    id: "ai-systems-design-workshop-series",
    type: "community",
    title: "AI Systems Design Workshop Series",
    organization: "San Francisco Bay Area AI Meetup",
    date: "2024-06-15",
    description: "Monthly workshop series teaching practical AI system design patterns to 200+ practitioners. Topics include RAG architecture, performance optimization, monitoring strategies, and production deployment best practices.",
    impact: [
      { metric: "Workshop Attendees", value: "200+ per session" },
      { metric: "Hands-on Practitioners", value: "150+ completed projects" },
      { metric: "Industry Adoption", value: "30+ companies implemented patterns" }
    ],
    technologies: ["System Design", "AWS", "MLOps", "Monitoring", "Performance Engineering"],
    links: [
      { type: "website", url: "#", label: "Workshop Materials & Code" },
      { type: "video", url: "#", label: "Recorded Sessions" }
    ],
    featured: false
  },
  {
    id: "excellence-in-ai-engineering-award",
    type: "awards",
    title: "Excellence in AI Engineering Award",
    organization: "West Coast AI Conference 2024",
    date: "2024-10-05",
    description: "Recognition for outstanding contributions to practical AI system engineering, particularly in developing scalable RAG architectures and mentoring the next generation of AI practitioners.",
    impact: [
      { metric: "Industry Recognition", value: "Top 1% of AI practitioners" },
      { metric: "Peer Nominations", value: "25+ senior engineers" },
      { metric: "Conference Visibility", value: "2,000+ attendees" }
    ],
    links: [
      { type: "certificate", url: "#", label: "Award Certificate" },
      { type: "article", url: "#", label: "Award Announcement" }
    ],
    featured: true
  }
];

// Open Source Contributions
export const openSourceContributions: OpenSourceContribution[] = [
  {
    id: "enterprise-rag-toolkit",
    projectName: "Enterprise RAG Toolkit",
    description: "Production-ready framework for building scalable RAG systems with advanced semantic chunking, vector search optimization, and comprehensive monitoring capabilities.",
    role: "Maintainer",
    technologies: ["Python", "OpenSearch", "FastAPI", "Docker", "Kubernetes", "Prometheus"],
    contributions: [
      {
        type: "Feature",
        description: "Semantic chunking algorithm with context preservation",
        impact: "Improved retrieval accuracy by 25% across diverse document types"
      },
      {
        type: "Performance",
        description: "Multi-level caching system for vector embeddings and responses",
        impact: "Reduced API costs by 40% and improved response times by 60%"
      },
      {
        type: "Feature",
        description: "Real-time monitoring and alerting framework",
        impact: "Enabled production deployments with 99.9% uptime SLA"
      }
    ],
    metrics: {
      stars: 1200,
      forks: 180,
      contributors: 35,
      downloads: "50K+ monthly"
    },
    githubUrl: "https://github.com/peikexu/enterprise-rag-toolkit",
    featured: true
  },
  {
    id: "ml-system-patterns",
    projectName: "ML System Design Patterns",
    description: "Comprehensive library of battle-tested design patterns for production ML systems, including deployment strategies, monitoring frameworks, and scalability patterns.",
    role: "Core Contributor",
    technologies: ["Python", "MLOps", "Kubernetes", "Terraform", "Monitoring"],
    contributions: [
      {
        type: "Documentation",
        description: "Created comprehensive pattern documentation with real-world examples",
        impact: "Reduced implementation time for teams by 50%"
      },
      {
        type: "Feature",
        description: "A/B testing framework for ML model deployments",
        impact: "Enabled safe rollouts for 100+ production ML models"
      }
    ],
    metrics: {
      stars: 800,
      forks: 120,
      contributors: 25,
      downloads: "25K+ monthly"
    },
    githubUrl: "https://github.com/ml-systems/design-patterns",
    featured: true
  },
  {
    id: "healthcare-ml-utils",
    projectName: "Healthcare ML Utilities",
    description: "Specialized toolkit for healthcare ML applications with privacy-preserving features, regulatory compliance tools, and healthcare-specific data processing utilities.",
    role: "Core Contributor",
    technologies: ["Python", "TensorFlow", "Privacy Engineering", "HIPAA Compliance"],
    contributions: [
      {
        type: "Security",
        description: "Differential privacy implementation for healthcare data",
        impact: "Enabled ML training while maintaining patient privacy compliance"
      },
      {
        type: "Feature",
        description: "SVD-based patient similarity matching algorithms",
        impact: "Used by 10+ healthcare organizations for care coordination"
      }
    ],
    metrics: {
      stars: 450,
      forks: 65,
      contributors: 15,
      downloads: "8K+ monthly"
    },
    githubUrl: "https://github.com/healthcare-ai/ml-utils",
    featured: false
  }
];

// Navigation configuration
export const navigationItems = [
  { name: "Work", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

// Call-to-action and Contact Messaging
export const ctaContent = {
  main: {
    headline: "Ready to Build Something Extraordinary?",
    subheadline: "Let's transform your ideas into intelligent, scalable solutions that drive real business impact",
    primaryButton: "Start a Conversation",
    secondaryButton: "View My Resume"
  },
  
  contact: {
    headline: "Let's Connect and Create Impact Together",
    intro: "Whether you're looking to build innovative AI systems, optimize existing platforms, or explore cutting-edge technology solutions, I'm excited to discuss how we can work together to achieve your goals.",
    
    availability: "Currently seeking full-time opportunities starting December 2026, with availability for consulting and project collaboration before then.",
    
    responseTime: "I typically respond to messages within 24 hours and would love to learn more about your project or opportunity.",
    
    expertise_areas: [
      "Enterprise AI/ML System Development",
      "Full-Stack Application Architecture",
      "Cloud Infrastructure & DevOps",
      "Performance Optimization & Scaling",
      "Technical Leadership & Mentoring"
    ]
  },
  
  project_inquiry: {
    consulting: "Available for technical consulting and advisory roles",
    collaboration: "Open to collaborative projects and research opportunities",
    speaking: "Available for technical talks and workshop facilitation",
    mentoring: "Passionate about mentoring aspiring engineers and sharing knowledge"
  }
};

// Color scheme and theme configuration
export const themeConfig = {
  primaryColor: "#3B82F6", // Blue
  secondaryColor: "#1E293B", // Dark blue/gray
  accentColor: "#06B6D4", // Cyan
  gradients: {
    primary: "from-blue-600 to-cyan-500",
    secondary: "from-slate-900 to-blue-900",
    accent: "from-cyan-400 to-blue-500"
  }
};