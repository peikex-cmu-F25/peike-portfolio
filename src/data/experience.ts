import type { ExperienceData, EducationData } from "./types"

// Keep this file in sync with the resume (public/PeikeXu_resume.pdf).
// Only include numbers that were actually measured.

export const workExperience: ExperienceData[] = [
  {
    id: "cmu-research-assistant",
    company: "Carnegie Mellon University",
    role: "Graduate Research Assistant, Prof. Catherine Fang",
    location: "Mountain View, CA",
    duration: "Jun 2026 – Present",
    description: "Generative modeling of Alzheimer's disease progression from single-cell data.",
    achievements: [
      "Built a generative pipeline modeling Alzheimer's disease progression from human brain scRNA-seq (240K cells, 84 donors), encoding cells with a pretrained single-cell foundation model and evaluating on donor-level splits to prevent leakage.",
      "Designed a stage-conditioned transformer diffusion model with a multi-head self-attention denoiser to generate cell states across disease stages and simulate progression trajectories.",
      "Served as primary presenter of a GenAI IDE project to academic and industry leaders at IEEE Rising Stars."
    ],
    technologies: ["Python", "PyTorch", "Transformers", "Diffusion Models", "scRNA-seq"]
  },
  {
    id: "istream-ai",
    company: "iStream AI (student startup)",
    role: "Co-Founder & Software Engineer",
    location: "San Diego, CA",
    duration: "Jun 2025 – Sep 2025",
    description: "Five-person startup founded with UC San Diego classmates, building a RAG-based online chatbot for businesses. I owned the backend and the retrieval system.",
    achievements: [
      "Architected a serverless RAG microservice on AWS (API Gateway, Lambda, OpenSearch) for semantic search over a 50K-chunk index, sustaining p95 latency under 900 ms on warm invocations at 50 concurrent requests.",
      "Implemented semantic chunking, hybrid retrieval (HNSW vector and BM25 keyword) with server-side Reciprocal Rank Fusion, and OpenSearch vector indexing, raising top-5 precision from 0.62 to 0.79 on a 200-query evaluation set.",
      "Orchestrated query embedding, hybrid retrieval, and response streaming within a single Lambda invocation, reusing the OpenSearch client and HTTP session across invocations to eliminate per-request TCP/TLS handshake overhead."
    ],
    technologies: ["Python", "AWS Lambda", "API Gateway", "OpenSearch", "RAG", "HNSW", "BM25"]
  },
  {
    id: "cmu-teaching-assistant",
    company: "Carnegie Mellon University",
    role: "Teaching Assistant – Machine Learning, Refactoring",
    location: "Mountain View, CA",
    duration: "Aug 2025 – Present",
    description: "Teaching assistant for Introduction to Machine Learning for Engineers (18-461/661) and a refactoring course.",
    achievements: [
      "Led weekly recitation sections and office hours for Introduction to ML for Engineers, covering supervised and unsupervised learning and neural networks.",
      "Wrote homework problems on regression, classification, and SVMs."
    ],
    technologies: ["Machine Learning", "Python", "scikit-learn"]
  },
  {
    id: "ieee-editor",
    company: "IEEE Editorial Team",
    role: "Contributing Editor",
    location: "Pittsburgh, PA",
    duration: "Sep 2024 – Present",
    description: "Edit and summarize technical content on AI/ML and software engineering.",
    achievements: [
      "Edit and summarize technical articles on AI/ML and software engineering topics for clarity and accuracy."
    ],
    technologies: ["Technical Writing", "AI/ML"]
  },
  {
    id: "welfie",
    company: "Welfie",
    role: "Full Stack Engineering Intern",
    location: "San Diego, CA",
    duration: "Jun 2024 – Sep 2024",
    description: "San Diego digital health startup. Built a patient-resource recommender and an LLM-assisted course-authoring pipeline.",
    achievements: [
      "Built a patient-resource recommender over a sparse 2K×3K interaction matrix, combining a hand-implemented truncated SVD for collaborative signal with profile-to-tag content matching to handle cold-start patients and newly added resources.",
      "Shipped the recommender behind a React clinician portal as decision support, surfacing ranked matches on the patient page while leaving the send decision to the physician.",
      "Integrated the GPT API into a PHP/GCP course-authoring pipeline as a human-in-the-loop step — modules are drafted automatically, then edited or approved by an author before anything publishes; prompt-engineered drafts reached an 80% instructor approval rate across 50+ topics."
    ],
    technologies: ["React", "Node.js", "PHP", "GCP", "SVD", "GPT API"]
  },
  {
    id: "ucsd-cse-tutor",
    company: "University of California San Diego",
    role: "Tutor – CSE 150B (AI Algorithms)",
    location: "La Jolla, CA",
    duration: "Mar 2025 – Jun 2025",
    description: "Tutor for Introduction to AI: Search and Reasoning.",
    achievements: [
      "Held office hours for assignments covering A* search, game AI (2048, Gomoku with Monte Carlo Tree Search), a Blackjack RL agent, and a Sudoku constraint solver."
    ],
    technologies: ["Python", "Search Algorithms", "MCTS", "Reinforcement Learning"]
  },
  {
    id: "ucsd-math-tutor",
    company: "University of California San Diego",
    role: "Math Tutor – Calculus",
    location: "La Jolla, CA",
    duration: "Sep 2024 – Jun 2025",
    description: "Calculus tutoring through daily tutor hours.",
    achievements: [
      "Tutored students in calculus courses through daily tutor hours."
    ],
    technologies: ["Calculus"]
  },
  {
    id: "tct-mobile",
    company: "TCT Mobile",
    role: "Software Test Engineer Intern (Part-Time)",
    location: "Bellevue, WA",
    duration: "Jun 2024 – Aug 2024",
    description: "Android test automation and log analysis.",
    achievements: [
      "Built Android test automation using ADB and Python, parsing system logs to surface performance issues.",
      "Built a data-processing pipeline for pressure-test results that flags anomalies for engineers to review."
    ],
    technologies: ["Python", "ADB", "Android"]
  },
  {
    id: "eth-tech",
    company: "Eth Tech",
    role: "Software Engineer Intern",
    location: "Newark, CA",
    duration: "Oct 2023 – Jan 2024",
    description: "Backend development for an e-commerce platform.",
    achievements: [
      "Developed microservices for an e-commerce platform with Java Spring Boot.",
      "Built product search and filtering with a Redis caching layer."
    ],
    technologies: ["Java", "Spring Boot", "Redis", "Microservices"]
  }
];

export const education: EducationData[] = [
  {
    id: "cmu",
    institution: "Carnegie Mellon University",
    degree: "M.S. in Software Engineering",
    location: "Mountain View, CA",
    duration: "Aug 2025 – Dec 2026",
    highlights: [
      "Coursework: Cloud Infrastructure, Distributed Systems, Database Systems, Software Architecture",
      "Teaching Assistant: Machine Learning, Refactoring"
    ]
  },
  {
    id: "ucsd",
    institution: "University of California San Diego",
    degree: "B.S. Computer Science, Double Major in Mathematics",
    location: "La Jolla, CA",
    duration: "Sep 2021 – Jun 2025",
    gpa: "3.73/4.0",
    highlights: [
      "Coursework: Data Structures & Algorithms, Operating Systems, Computer Networks, AI Algorithms",
      "Tutor: AI Algorithms (CSE 150B), Calculus"
    ]
  }
];
