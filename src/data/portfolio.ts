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

// Personal Information
export const personalInfo = {
  name: "Peike Xu",
  title: "AI/ML Engineer & Full Stack Developer",
  tagline: "Transforming complex business challenges into intelligent, scalable solutions that drive measurable impact",
  location: "Sunnyvale, CA",
  email: "peikexu.work@gmail.com",
  phone: "(858) 305-0275",
  linkedin: "https://linkedin.com/in/peikexu",
  github: "https://github.com/peikexu",
  bio: "Results-driven AI/ML Engineer and Full Stack Developer with a proven track record of delivering enterprise-grade solutions that solve real-world problems. Currently pursuing Master's in Software Engineering at Carnegie Mellon University. Specialized in building intelligent systems that reduce operational costs by 60%, improve user engagement by 25+%, and process enterprise data with 92% accuracy. From patient matching platforms serving 3,000+ users to enterprise RAG systems handling 100+ documents, I create technology that drives business value.",
  heroHeadline: "Building Tomorrow's Intelligent Systems Today",
  heroSubheadline: "AI/ML Engineer crafting scalable solutions that transform business operations and deliver measurable impact",
  ctaText: "Let's Build Something Amazing",
  resumeUrl: "/PeikeXu_resume.pdf",
  
  // About Section Content
  aboutSections: {
    story: "My journey in technology began with a simple question: How can we make complex systems work better for people? This curiosity led me from the mathematical foundations at UC San Diego to the cutting-edge AI labs, and now to Carnegie Mellon University's renowned Software Engineering program. Along the way, I've discovered that the most impactful technology solutions are those that seamlessly bridge the gap between sophisticated algorithms and real-world business needs.",
    
    philosophy: "I believe in building technology that doesn't just work—it transforms. Whether it's reducing manual processes by 60%, improving system performance by 40%, or enabling new capabilities that weren't possible before, every line of code I write serves a greater purpose. My approach combines deep technical expertise with strategic business thinking, ensuring that innovative solutions also drive measurable value.",
    
    approach: "My development philosophy centers on three principles: intelligent automation that amplifies human capabilities, scalable architectures that grow with business needs, and user-centric design that makes powerful technology accessible to everyone. From enterprise RAG systems to patient matching platforms, I create solutions that solve real problems while maintaining the highest standards of performance and reliability.",
    
    currentFocus: "Currently pursuing my Master's in Software Engineering at Carnegie Mellon University, I'm diving deep into advanced system design patterns and enterprise-scale AI implementation. I'm particularly excited about the intersection of machine learning and software engineering—building AI systems that are not only intelligent but also maintainable, scalable, and production-ready.",
    
    values: [
      "Innovation with Purpose: Building technology that creates meaningful impact",
      "Excellence in Execution: Delivering solutions that exceed expectations",
      "Continuous Learning: Staying at the forefront of technological advancement",
      "Collaborative Growth: Mentoring others while continuously improving myself"
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

// Navigation configuration
export const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "AI Demos", href: "/ai-demos" },
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