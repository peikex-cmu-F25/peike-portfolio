import type { SkillCategory } from "./types"

// Keep in sync with the resume's Technical Skills section.
export const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "Java", "C++", "TypeScript", "JavaScript", "SQL (PostgreSQL)", "PHP", "Bash", "F#"],
    proficiency: "Advanced",
    description: "Python and TypeScript day to day; Java, C++, and SQL for coursework and internships"
  },
  {
    category: "ML / AI",
    skills: ["PyTorch", "scikit-learn", "RAG pipelines", "Vector search", "Transformers", "Diffusion models", "pandas", "NumPy", "SciPy"],
    proficiency: "Advanced",
    description: "Retrieval systems for LLM applications and generative models for research"
  },
  {
    category: "Backend & Data",
    skills: ["FastAPI", "Node.js / Express.js", "Flask", "Spring Boot", "React", "REST APIs", "WebSockets", "Kafka", "MongoDB", "OpenSearch", "Redis"],
    proficiency: "Advanced",
    description: "APIs, real-time services, and streaming pipelines"
  },
  {
    category: "Cloud & Infra",
    skills: ["AWS (Lambda, API Gateway, S3)", "GCP (Dataproc, GCS, GKE)", "Docker", "Kubernetes", "Terraform", "Jenkins", "CI/CD"],
    proficiency: "Intermediate",
    description: "Serverless services on AWS and infrastructure-as-code on GCP"
  }
];
