export type Profile = {
  name: string;
  title: string;
  location?: string;
  summary: string;
  contacts: {
    github?: string;
    linkedin?: string;
    email?: string;
    website?: string;
  };
};

export type Skill = {
  id: string;
  name: string;
  type: string;
  category: "AI/ML" | "Cloud & DevOps" | "Frontend" | "Languages";
  proficiency: number; // A value from 0 to 100
  projects: { id: string; name: string }[];
  note: string;
  jianContext: string;
};

export type Project = {
  id: string;
  name: string;
  period: string;
  brief: string;
  tech: string[];
  highlights: { label: string; value: string }[];
  objective: string;
  cognitiveGain: string;
  githubUrl: string;
  imageUrl: string; // Add a path to an example image for the visualization
};

export type Experience = {
  type: "education" | "experience";
  org: string;
  role: string;
  period: string;
  details: string[];
};

export const profile: Profile = {
  name: "Hin Jian Heng",
  title: "AI Engineer",
  summary:
    "First Class Honours Computer Science graduate with experience in building and deploying end-to-end AI systems. Enhanced model efficiency to enable real-time medical AI applications. Skilled in PyTorch, GCP, and DevOps. Commencing Master's in AI at the University of Malaya (Oct 2025).",
  contacts: {
    github: "JianHengHin0831",
    linkedin: "jian-heng-hin",
    email: "jianhenghin0831@gmail.com",
    website: "",
  },
};

export const skills: Skill[] = [
  // --- AI/ML Core ---
  {
    id: "python",
    name: "Python",
    type: "Programming Language",
    category: "Languages",
    proficiency: 95,
    projects: [
      { id: "staff-tracking", name: "Staff Identification & Tracking" },
      { id: "medical-xai", name: "Interpretable ML for Medical Analysis" },
    ],
    note: "The primary language for my work in AI, data science, and backend development. Extensive experience with its scientific computing and ML ecosystem.",
    jianContext:
      "Python serves as the foundational language for nearly all AI/ML pipelines, including the computer vision system for staff tracking and the model distillation in the medical analysis project. Its extensive libraries are critical for rapid prototyping and production deployment.",
  },
  {
    id: "pytorch",
    name: "PyTorch",
    type: "Deep Learning Library",
    category: "AI/ML",
    proficiency: 90,
    projects: [
      { id: "medical-xai", name: "Interpretable ML for Medical Analysis" },
      { id: "generative", name: "Generative AI & CV Projects" },
    ],
    note: "My primary tool for building and training neural networks. Extensive experience in custom model architecture and performance optimization.",
    jianContext:
      "PyTorch was instrumental in the 'Interpretable ML' project for its dynamic computation graph, which facilitated complex model distillation. It also powered the training of DCGANs and Diffusion models in the generative AI explorations.",
  },
  {
    id: "transformers",
    name: "Hugging Face Transformers",
    type: "NLP & Vision Library",
    category: "AI/ML",
    proficiency: 85,
    projects: [
      { id: "semantic-rag", name: "AI-Powered Semantic Search" },
      { id: "generative", name: "Generative AI & CV Projects" },
    ],
    note: "Essential for both fine-tuning language models for NLP tasks and leveraging pre-trained models for efficient, in-browser inference.",
    jianContext:
      "The Transformers.js library was a cornerstone of the 'Semantic Search Engine', enabling zero-cost, client-side model execution. The Python variant was used for fine-tuning text classification models.",
  },
  {
    id: "langchain",
    name: "LangChain.js",
    type: "LLM Orchestration",
    category: "AI/ML",
    proficiency: 80,
    projects: [{ id: "semantic-rag", name: "AI-Powered Semantic Search" }],
    note: "Utilized for structuring the Retrieval-Augmented Generation (RAG) pipeline, managing prompts, and chaining components for the search engine.",
    jianContext:
      "LangChain.js provided the essential framework for the RAG pipeline in the 'Semantic Search Engine', orchestrating the interaction between the vector database (Supabase) and the LLM.",
  },

  // --- Cloud & DevOps Core ---
  {
    id: "gcp",
    name: "Google Cloud Platform",
    type: "Cloud Provider",
    category: "Cloud & DevOps",
    proficiency: 80,
    projects: [{ id: "messaging-platform", name: "Secure Messaging Platform" }],
    note: "Experience in architecting scalable and reliable systems, including compute, storage, and networking services.",
    jianContext:
      "GCP was the bedrock for the 'Secure Messaging Platform', demonstrating the ability to design production-grade cloud infrastructure with a focus on scalability and high availability.",
  },
  {
    id: "docker",
    name: "Docker",
    type: "Containerization",
    category: "Cloud & DevOps",
    proficiency: 85,
    projects: [
      { id: "canvas-x", name: "CanvasX: AI Travel Planner" },
      { id: "messaging-platform", name: "Secure Messaging Platform" },
    ],
    note: "Fundamental tool for creating reproducible environments, containerizing applications, and deploying microservices.",
    jianContext:
      "Docker was used to containerize the FastAPI AI service in the 'CanvasX' project, ensuring portability and scalability. It was also central to the deployment strategy of the messaging platform.",
  },
  {
    id: "supabase",
    name: "Supabase + pg_vector",
    type: "Backend as a Service",
    category: "Cloud & DevOps",
    proficiency: 80,
    projects: [
      { id: "semantic-rag", name: "AI-Powered Semantic Search" },
      { id: "canvas-x", name: "CanvasX: AI Travel Planner" },
    ],
    note: "Leveraged for rapid backend development, real-time data synchronization, authentication, and as a vector database for RAG.",
    jianContext:
      "Supabase dramatically accelerated development for 'CanvasX' and the 'Semantic Search Engine', providing a robust PostgreSQL backend, real-time capabilities via WebSockets, and powerful vector search functionality with pg_vector.",
  },

  // --- Frontend Core ---
  {
    id: "typescript",
    name: "TypeScript",
    type: "Programming Language",
    category: "Languages",
    proficiency: 85,
    projects: [
      { id: "canvas-x", name: "CanvasX: AI Travel Planner" },
      { id: "semantic-rag", name: "AI-Powered Semantic Search" },
    ],
    note: "My standard for building robust, type-safe, and maintainable frontend applications.",
    jianContext:
      "TypeScript was non-negotiable for building the complex, stateful frontends of 'CanvasX' and the 'Semantic Search Engine', significantly reducing runtime errors and improving developer experience.",
  },
  {
    id: "nuxt",
    name: "Nuxt.js",
    type: "Frontend Framework",
    category: "Frontend",
    proficiency: 90,
    projects: [
      { id: "canvas-x", name: "CanvasX: AI Travel Planner" },
      { id: "semantic-rag", name: "AI-Powered Semantic Search" },
    ],
    note: "My preferred framework for creating high-performance, server-rendered Vue.js applications with a fantastic developer experience.",
    jianContext:
      "Nuxt.js provided the powerful SSR capabilities and robust ecosystem necessary to build the highly interactive UIs for both the 'CanvasX' travel planner and the 'Semantic Search Engine'.",
  },
];

export const projects: Project[] = [
  {
    id: "canvas-x",
    name: "CanvasX: AI-Powered Travel Planner",
    period: "2025",
    tech: [
      "Nuxt.js",
      "Supabase",
      "FastAPI",
      "OpenAI GPT-4o",
      "Vercel",
      "Docker",
    ],
    brief:
      "A real-time, collaborative travel planning canvas that transforms group travel planning from a logistical nightmare into a creative, AI-assisted journey.",
    highlights: [
      { label: "Architecture", value: "3-Tier Microservice" },
      { label: "Core Feature", value: "Real-time Collaboration" },
    ],
    objective:
      "To solve the logistical chaos, impersonal tools, and decision-fatigue of group travel planning by creating a dynamic, intelligent, and collaborative visual platform.",
    cognitiveGain:
      "Architected and delivered a complex, three-tier application featuring a Nuxt.js frontend, Supabase backend, and a containerized FastAPI AI microservice, demonstrating full-stack product development capabilities.",
    githubUrl: "https://github.com/JianHengHin0831/Dynamic-Itinerary-Canvas",
    imageUrl: "/images/visualization-canvasx.png",
  },
  {
    id: "staff-tracking",
    name: "Staff Identification & Tracking Solution",
    period: "2025",
    tech: ["Python", "YOLOv8", "SAHI", "Computer Vision", "ResNet50"],
    brief:
      "A modular, multi-stage pipeline for identifying and tracking staff in top-down video streams, addressing real-world challenges like occlusion and scale variation.",
    highlights: [
      { label: "Key Principle", value: "Zero-Data-Leakage" },
      { label: "Core Method", value: "Multi-Stage Pipeline" },
    ],
    objective:
      "To develop a robust computer vision system that can accurately track individuals in challenging, top-down video feeds while strictly adhering to a zero-data-leakage policy via synthetic data.",
    cognitiveGain:
      "Mastered the design of robust, multi-stage computer vision pipelines. Pioneered a synthetic data generation workflow to fine-tune models, overcoming data privacy and leakage constraints.",
    githubUrl:
      "https://github.com/JianHengHin0831/staff_identification_problem",
    imageUrl: "/images/visualization-staff-tracking.png",
  },
  {
    id: "medical-xai",
    name: "Interpretable ML for Medical Analysis",
    period: "2024–2025",
    tech: ["Python", "PyTorch", "TabNet", "Scikit-learn"],
    brief:
      "Designed a distilled surrogate model to provide real-time, interpretable predictions for a TabNet model in a medical CAD setting.",
    highlights: [
      { label: "Latency", value: "10s → 50ms" },
      { label: "Accuracy", value: "94% → 97%" },
    ],
    objective:
      "To bridge the gap between a complex, high-performance TabNet model and the clinical need for real-time, explainable diagnostic aids, without sacrificing predictive accuracy.",
    cognitiveGain:
      "Mastered model distillation as a powerful technique for productionizing complex models. Gained critical insights into the trade-offs between model complexity, speed, and interpretability.",
    githubUrl: "https://github.com/JianHengHin0831/cad-analysis-web",
    imageUrl: "/images/visualization-medical-xai.png",
  },
  {
    id: "messaging-platform",
    name: "Secure Cloud-Based Group Messaging Platform",
    period: "2024",
    tech: ["GCP", "Docker", "DevOps", "CI/CD"],
    brief:
      "Architected and deployed a scalable, real-time messaging application on GCP with automated monitoring and autoscaling.",
    highlights: [
      { label: "Platform", value: "GCP" },
      { label: "Scaling", value: "Auto" },
    ],
    objective:
      "To design and implement a robust, production-grade backend on Google Cloud Platform, focusing on core DevOps principles like scalability, high availability, and automated CI/CD pipelines.",
    cognitiveGain:
      "Acquired hands-on expertise in architecting for scale on GCP. This project built a strong, practical foundation in cloud infrastructure and automation, skills directly transferable to MLOps.",
    githubUrl: "https://github.com/JianHengHin0831/cloud-chat-app",
    imageUrl: "/images/visualization-gcp-architecture.png",
  },
  {
    id: "semantic-rag",
    name: "AI-Powered Semantic Search Engine",
    period: "2024",
    tech: ["Nuxt.js", "Hugging Face", "LangChain.js", "Supabase", "Vercel"],
    brief:
      "Full-stack knowledge base with a RAG pipeline, running open-source models locally via Transformers.js and pg_vector on Supabase.",
    highlights: [
      { label: "API Cost", value: "$0" },
      { label: "Core Tech", value: "RAG" },
    ],
    objective:
      "To create a high-performance semantic search system without expensive third-party API costs by developing a full-stack RAG pipeline that runs models directly in the browser.",
    cognitiveGain:
      "Gained deep, end-to-end expertise in the modern RAG stack, from vector database integration to optimizing on-device model inference, proving the viability of cost-effective edge AI.",
    githubUrl: "https://github.com/JianHengHin0831/semantic-note-search",
    imageUrl: "/images/visualization-rag-pipeline.png",
  },
  {
    id: "generative",
    name: "Generative AI & Computer Vision Projects",
    period: "2023–2024",
    tech: ["Python", "PyTorch", "Hugging Face", "DCGAN", "Diffusion Models"],
    brief:
      "Trained DCGANs and explored diffusion; fine-tuned a Transformer for text classification to competitive accuracy.",
    highlights: [
      { label: "Models", value: "GAN & Diffusion" },
      { label: "NLP Task", value: "Fine-Tuning" },
    ],
    objective:
      "To explore and implement foundational generative models for computer vision (DCGANs, Diffusion) and apply transfer learning techniques for a core NLP task.",
    cognitiveGain:
      "Developed a strong practical breadth across different generative architectures and mastered the workflow for fine-tuning large language models for specific downstream tasks.",
    githubUrl: "https://github.com/JianHengHin0831/deep-learning-projects",
    imageUrl: "/images/visualization-generative.png",
  },
  {
    id: "library-system",
    name: "Full-Stack Library Management System",
    period: "2023",
    tech: ["JavaScript", "Node.js", "Express", "HTML/CSS"],
    brief:
      "Led full-stack app incl. auth; built a simple NLP chatbot using cosine similarity for query matching.",
    highlights: [
      { label: "Scope", value: "Full-Stack" },
      { label: "Feature", value: "NLP Chatbot" },
    ],
    objective:
      "To deliver a complete, end-to-end web application with user authentication from scratch, and to integrate a baseline NLP feature for intelligent query handling.",
    cognitiveGain:
      "Solidified fundamental full-stack development skills, from backend routing and database management to frontend user interfaces. Implemented a practical NLP concept from theory to feature.",
    githubUrl: "https://github.com/JianHengHin0831/library-management-system",
    imageUrl: "/images/visualization-library-system.png",
  },
];

export const experiences: Experience[] = [
  {
    type: "education",
    org: "University of Malaya (#60 QS 2025)",
    role: "Master of Artificial Intelligence",
    period: "Expected start: Oct 2025",
    details: ["Ranked #60 QS 2025", "Focus: Advanced ML/DL and AI systems"],
  },
  {
    type: "education",
    org: "University of Southampton, Malaysia Campus (#80 QS 2025)",
    role: "BSc Computer Science — First Class Honours (72.92%)",
    period: "Oct 2022 — Jun 2025",
    details: [
      "Relevant Coursework: Machine Learning, NLP, Cloud & Website Security",
    ],
  },
  {
    type: "experience",
    org: "Feedme POS — Software Engineer Intern",
    role: "Nuxt.js Website Builder",
    period: "Jun 2024 — Oct 2024",
    details: [
      "Built dynamic component-based website builder in Nuxt.js for non-technical staff",
      "Deployed to power Feedme.ai, improving content update efficiency and reducing developer workload",
    ],
  },
];

export function radarFromSkills() {
  const groups: Record<string, number[]> = {
    "Machine Learning": [],
    "Cloud & DevOps": [],
    "System Architecture": [],
    "Frontend Dev": [],
    "LLM Ops": [],
  };
  for (const s of skills) {
    if (s.category === "AI/ML" && groups["Machine Learning"])
      groups["Machine Learning"].push(s.proficiency);
    if (s.category === "Cloud & DevOps" && groups["Cloud & DevOps"])
      groups["Cloud & DevOps"].push(s.proficiency);
    if (s.category === "Cloud & DevOps" && groups["System Architecture"])
      groups["System Architecture"].push(s.proficiency);
    if (s.category === "Frontend" && groups["Frontend Dev"])
      groups["Frontend Dev"].push(s.proficiency);
    if (s.category === "Languages" && groups["LLM Ops"])
      groups["LLM Ops"].push(s.proficiency);
  }
  return Object.entries(groups).map(([label, arr]) => ({
    label,
    value: arr.length
      ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length)
      : 60,
  }));
}
