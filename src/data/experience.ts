import type { ExperienceData, EducationData } from "./types"

export const workExperience: ExperienceData[] = [
  {
    id: "cmu-research-assistant",
    company: "Carnegie Mellon University",
    role: "Graduate Research Assistant",
    location: "Mountain View, CA",
    duration: "Sep 2025 – Current",
    description: "Developing cutting-edge GenAI pipeline to model neurodegenerative disease progression through advanced machine learning and computational biology",
    achievements: [
      "Advanced AI Research: Developing a GenAI pipeline to model neurodegenerative disease progression by pretraining cell foundation encoders (scVI/Transformer) on Human Cell Atlas datasets, contributing to breakthrough research in computational biology and medical AI",
      "Innovative Model Architecture: Building a promptable diffusion model conditioned on clinical metadata to simulate disease trajectories, combining state-of-the-art generative models with domain-specific medical knowledge for predictive healthcare applications",
      "Large-Scale Data Processing: Working with Human Cell Atlas datasets containing millions of cellular samples, implementing efficient data preprocessing and feature extraction pipelines for foundation model training",
      "Clinical Impact Research: Collaborating with medical researchers to translate computational findings into clinically relevant insights for neurodegenerative disease understanding and potential therapeutic interventions"
    ],
    technologies: ["Python", "PyTorch", "scVI", "Transformers", "Diffusion Models", "Human Cell Atlas", "Clinical Data", "Computational Biology"]
  },
  {
    id: "cmu-teaching-assistant",
    company: "Carnegie Mellon University",
    role: "Teaching Assistant - 18-461/661",
    location: "Mountain View, CA",
    duration: "Aug 2025 – Current",
    description: "Supporting machine learning education across multiple international campuses, developing curriculum materials and mentoring students in advanced ML concepts",
    achievements: [
      "Global Teaching Impact: Led weekly recitation sections and office hours for Introduction to ML for Engineers, supporting students across Pittsburgh, Silicon Valley, and Rwanda campuses in supervised/unsupervised learning and neural networks",
      "Curriculum Development: Created comprehensive homework problem sets covering regression, classification, and SVMs to reinforce core ML concepts, ensuring practical understanding of theoretical foundations",
      "Student Mentorship: Provided personalized guidance to students from diverse academic backgrounds, helping them master complex machine learning algorithms and their real-world applications",
      "Cross-Campus Coordination: Collaborated with faculty across three international locations to maintain consistent teaching standards and adapt content for different cultural and technical contexts"
    ],
    technologies: ["Machine Learning", "Python", "scikit-learn", "Supervised Learning", "Unsupervised Learning", "Neural Networks", "SVM", "Regression"]
  },
  {
    id: "ucsd-math-tutor",
    company: "University of California San Diego",
    role: "Math Tutor",
    location: "La Jolla, CA",
    duration: "Sep 2024 – Jun 2025",
    description: "Provided personalized academic support to students in calculus courses, developing effective teaching strategies for complex mathematical concepts",
    achievements: [
      "Large-Scale Academic Support: Tutored 100+ students in Calculus courses through daily tutor hours, providing personalized academic support and helping students achieve significant grade improvements",
      "Adaptive Teaching Methods: Developed individualized tutoring approaches based on students' learning styles and mathematical backgrounds, resulting in improved comprehension and confidence",
      "Mathematical Clarity: Simplified complex calculus concepts through visual aids, step-by-step problem solving, and real-world applications, making advanced mathematics accessible to diverse learners",
      "Student Success Tracking: Monitored student progress throughout the semester, adjusting tutoring strategies to ensure continuous improvement and academic success"
    ],
    technologies: ["Calculus", "Mathematical Modeling", "Problem Solving", "Educational Technology", "Academic Support"]
  },
  {
    id: "ucsd-cse-tutor",
    company: "University of California San Diego",
    role: "CSE Tutor - CSE 150B",
    location: "La Jolla, CA",
    duration: "Mar 2025 – Jun 2025",
    description: "Supported students in advanced artificial intelligence coursework, providing guidance on search algorithms, reasoning systems, and AI implementation",
    achievements: [
      "Advanced AI Instruction: Supported students in Introduction to AI: Search and Reasoning, holding office hours to assist with complex assignments including A* search algorithms, game AI, and constraint satisfaction problems",
      "Practical AI Applications: Guided students through implementing sophisticated AI systems including 2048 AI, Blackjack RL agent, Gomoku with Monte Carlo Tree Search, and Sudoku constraint solver",
      "Algorithm Explanation: Broke down complex AI algorithms into understandable components, helping students grasp both theoretical foundations and practical implementation details",
      "Project Mentorship: Provided hands-on support for AI programming assignments, debugging complex algorithms and helping students optimize their implementations for better performance"
    ],
    technologies: ["Artificial Intelligence", "A* Search", "Reinforcement Learning", "Monte Carlo Tree Search", "Constraint Satisfaction", "Python", "Game AI", "Search Algorithms"]
  },
  {
    id: "ieee-editor",
    company: "IEEE Editorial Team",
    role: "Contributing Editor",
    location: "Pittsburgh, PA",
    duration: "Sep 2024 – Present",
    description: "Contributing editor responsible for editing and summarizing technical content, leveraging AI/ML software engineering expertise to ensure articles are both clear and impactful for the journal's audience",
    achievements: [
      "Editorial Excellence: Review and edit technical manuscripts focusing on AI/ML and software engineering topics, ensuring clarity and accessibility for diverse technical audiences",
      "Content Curation: Collaborate with editorial team to identify and develop high-impact content that advances the field of artificial intelligence and software engineering",
      "Technical Expertise: Apply deep knowledge of machine learning systems and software architecture to provide expert editorial guidance on cutting-edge research and industry applications",
      "Quality Assurance: Maintain IEEE publication standards while enhancing readability and technical accuracy of complex AI/ML content for professional and academic readership"
    ],
    technologies: ["Editorial Tools", "Technical Writing", "AI/ML Content", "IEEE Standards", "Manuscript Review"]
  },
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
