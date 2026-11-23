// Portfolio data structure for Peike Xu
// Keep content in sync with the resume. Only include numbers that were actually measured.

import type { ProjectData } from './types'

export { workExperience, education } from './experience'
export { skillsData } from './skills'
// Personal Information
export const personalInfo = {
  name: "Peike Xu",
  title: "Software Engineer · Backend & AI Applications",
  tagline: "I build backend and AI systems — RAG services, streaming pipelines, and the cloud infrastructure underneath them.",
  location: "Sunnyvale, CA",
  email: "peikexu.work@gmail.com",
  phone: "(858) 305-0275",
  linkedin: "https://www.linkedin.com/in/p3xu/",
  github: "https://github.com/Peika44",
  bio: "I'm an M.S. Software Engineering student at Carnegie Mellon (graduating December 2026) with a B.S. in Computer Science and Mathematics from UC San Diego. I like turning messy, real-world problems into systems that hold up: I co-founded a student startup where I built the RAG retrieval backend for a business chatbot, built a patient-resource recommender and an LLM-assisted course-authoring pipeline at a digital health startup, and now do research on generative models of Alzheimer's disease progression. I care about measuring before optimizing — profiling where latency actually goes, checking changes against an evaluation set, and letting the numbers decide.",
  heroHeadline: "Backend & AI Systems Engineer",
  heroSubheadline: "M.S. Software Engineering at Carnegie Mellon, graduating December 2026",
  ctaText: "Get in Touch",
  resumeUrl: "/PeikeXu_resume.pdf",
  profileImage: "/pk.jpeg"
};

// Projects Data
export const projects: ProjectData[] = [
  {
    id: "smart-sentinel",
    title: "Smart Sentinel: Real-Time Stock Analytics Platform",
    category: "Full Stack",
    description: "Event-driven stock analytics platform combining LLM analysis with real-time market updates over Kafka and WebSockets.",
    longDescription: "Market events fan out through Kafka to three independent consumer groups. Separate offsets decouple high-latency LLM processing from real-time in-memory evaluations, so slow model calls never hold up live updates pushed to the React front end over WebSockets.",
    technologies: ["FastAPI", "Kafka", "React", "WebSockets", "Python"],
    metrics: [
      { label: "Median in-system latency", value: "15 ms" },
      { label: "Consumer groups", value: "3" }
    ],
    features: [
      "Three Kafka consumer groups with separate offsets, isolating LLM analysis from real-time evaluation",
      "Per-stage latency instrumentation: 15 ms median from Kafka publish to WebSocket send",
      "Load testing traced the throughput ceiling to serial consumer processing rather than the assumed HTTP client bottleneck — a fix path worth roughly 3× capacity"
    ],
    image: "/images/projects/smart-sentinel.jpg",
    featured: true,
    year: 2026
  },
  {
    id: "iac-data-platform",
    title: "Infrastructure-as-Code Data Platform",
    category: "Cloud/DevOps",
    description: "A Hadoop data platform and CI pipeline on GCP, provisioned entirely with Terraform.",
    longDescription: "Terraform provisions the full stack — a Dataproc Hadoop cluster, Jenkins and SonarQube on GKE, and the GitHub webhook itself — so the repo-to-pipeline wiring is version-controlled rather than clicked into a UI. A Python MapReduce job runs only when SonarQube reports no blocker issues.",
    technologies: ["Terraform", "GCP Dataproc", "GKE", "Jenkins", "SonarQube", "Python", "Hadoop"],
    metrics: [
      { label: "Repository files processed", value: "800" }
    ],
    features: [
      "Entire environment, including the GitHub webhook, defined in Terraform",
      "MapReduce aggregation over an 800-file repository, gated on SonarQube quality checks",
      "Source filenames resolved per mapper so files split across HDFS block boundaries are summed correctly"
    ],
    image: "/images/projects/iac-platform.jpg",
    featured: true,
    year: 2026
  },
  {
    id: "smart-receipt-platform",
    title: "Smart Receipt & Recipe Platform",
    category: "AI/ML",
    description: "Reads grocery receipts and suggests recipes from what you bought.",
    longDescription: "A multi-agent system that extracts items from grocery receipts in different store formats with computer vision models, then feeds them to a recipe suggestion engine to help users discover meals that use what they already have.",
    technologies: ["Python", "Computer Vision", "Multi-Agent Systems"],
    metrics: [],
    features: [
      "Computer vision models trained on receipts from multiple store formats",
      "Recipe suggestion engine based on purchased ingredients"
    ],
    image: "/images/projects/smart-receipt.jpg",
    featured: false,
    year: 2025
  },
  {
    id: "emergency-response-chat",
    title: "Emergency Response Chat Application",
    category: "Full Stack",
    description: "Real-time crisis communication app with chat rooms and notifications.",
    longDescription: "A real-time communication platform for emergencies, built with Node.js, MongoDB, and Socket.io, featuring dynamic chat rooms, real-time notifications, an MVC architecture, and JWT authentication.",
    technologies: ["Node.js", "MongoDB", "Socket.io", "JWT"],
    metrics: [],
    features: [
      "Dynamic chat rooms and real-time notifications over Socket.io",
      "MVC architecture with JWT authentication"
    ],
    image: "/images/projects/emergency-response.jpg",
    featured: false,
    year: 2025
  },
  {
    id: "snake-game",
    title: "Snake Game",
    category: "Game Development",
    description: "A browser remake of Snake with keyboard and swipe controls.",
    longDescription: "A recreation of Snake built with TypeScript and React, with grid-based movement, collision detection, Framer Motion animations, and swipe controls for mobile.",
    technologies: ["TypeScript", "React", "Framer Motion"],
    metrics: [],
    features: [
      "Grid-based movement and collision detection",
      "Swipe gesture controls on mobile"
    ],
    image: "/images/projects/snake-game.jpg",
    featured: false,
    year: 2024
  },
  {
    id: "asteroid-avoider",
    title: "Asteroid Avoider",
    category: "Game Development",
    description: "An HTML5 canvas game with particle effects and increasing difficulty.",
    longDescription: "A browser game built with TypeScript and HTML5 Canvas, featuring physics-based movement, collision detection, particle effects, and dynamic difficulty scaling.",
    technologies: ["TypeScript", "HTML5 Canvas"],
    metrics: [],
    features: [
      "Collision detection and particle effects",
      "Difficulty that scales as you play"
    ],
    image: "/images/projects/asteroid-avoider.jpg",
    featured: false,
    year: 2024
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
    headline: "Let's Talk",
    subheadline: "I'm looking for full-time software engineering roles in backend, infrastructure, and AI applications.",
    primaryButton: "Contact Me",
    secondaryButton: "View My Resume"
  },

  contact: {
    headline: "Get in Touch",
    intro: "I'm looking for new-grad software engineering roles — backend, distributed systems, cloud infrastructure, or AI application engineering (RAG / LLM services). I'd love to hear about your team.",
    availability: "Graduating from Carnegie Mellon in December 2026 and available for full-time roles starting early 2027.",
    responseTime: "I usually reply within a day or two.",
    expertise_areas: [
      "Backend services & APIs",
      "RAG and LLM applications",
      "Streaming data pipelines",
      "Cloud infrastructure & CI/CD"
    ]
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

export type {
  ProjectData,
  ExperienceData,
  EducationData,
  SkillCategory
} from './types'
