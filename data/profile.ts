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
  label: string;
  category: "ML" | "Cloud" | "Architecture" | "Frontend" | "LLM";
  proficiency: number;
  activations: string[];
};

export type Project = {
  id: string;
  name: string;
  period?: string;
  tech: string[];
  brief: string;
  businessImpact: string;
  simple: string;
  highlights?: { label: string; value: string }[];
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
  {
    id: "python",
    label: "Python",
    category: "ML",
    proficiency: 90,
    activations: ["medical-xai", "semantic-rag", "text-classification"],
  },
  {
    id: "pytorch",
    label: "PyTorch",
    category: "ML",
    proficiency: 85,
    activations: ["medical-xai", "generative"],
  },
  {
    id: "tensorflow",
    label: "TensorFlow",
    category: "ML",
    proficiency: 72,
    activations: ["cv-experiments"],
  },
  {
    id: "langchain",
    label: "LangChain.js",
    category: "LLM",
    proficiency: 78,
    activations: ["semantic-rag"],
  },
  {
    id: "transformers",
    label: "Transformers (.js & Python)",
    category: "LLM",
    proficiency: 80,
    activations: ["semantic-rag", "text-classification"],
  },
  {
    id: "gcp",
    label: "Google Cloud Platform",
    category: "Cloud",
    proficiency: 78,
    activations: ["messaging-platform", "infra"],
  },
  {
    id: "docker",
    label: "Docker",
    category: "Cloud",
    proficiency: 82,
    activations: ["infra", "serving"],
  },
  {
    id: "vercel",
    label: "Vercel",
    category: "Cloud",
    proficiency: 76,
    activations: ["semantic-rag"],
  },
  {
    id: "supabase",
    label: "Supabase + pg_vector",
    category: "Cloud",
    proficiency: 75,
    activations: ["semantic-rag"],
  },
  {
    id: "architecture",
    label: "System Architecture",
    category: "Architecture",
    proficiency: 82,
    activations: ["infra", "rag"],
  },
  {
    id: "typescript",
    label: "TypeScript / Nuxt",
    category: "Frontend",
    proficiency: 78,
    activations: ["dashboard-ui", "semantic-rag"],
  },
];

export const projects: Project[] = [
  {
    id: "medical-xai",
    name: "Interpretable ML for Medical Analysis",
    period: "2024–2025",
    tech: ["Python", "PyTorch", "TabNet"],
    brief:
      "Designed a distilled surrogate model to provide real-time, interpretable predictions for a TabNet model in a medical CAD setting.",
    businessImpact:
      "Boosted inference speed from 10s to 50ms and improved predictive accuracy from 94% to 97%.",
    simple: "Made a medical AI both fast and explainable.",
    highlights: [
      { label: "Latency", value: "10s → 50ms" },
      { label: "Accuracy", value: "94% → 97%" },
    ],
  },
  {
    id: "messaging-platform",
    name: "Secure Cloud-Based Group Messaging Platform",
    period: "2024",
    tech: ["GCP", "Docker", "DevOps"],
    brief:
      "Architected and deployed a scalable, real-time messaging application on GCP with automated monitoring and autoscaling.",
    businessImpact:
      "Built strong cloud/CI foundation transferable to MLOps pipelines.",
    simple: "Cloud-native chat system with scale and reliability.",
    highlights: [{ label: "Scaling", value: "Auto" }],
  },
  {
    id: "semantic-rag",
    name: "AI-Powered Semantic Search Engine",
    period: "2024",
    tech: [
      "Nuxt.js",
      "Hugging Face",
      "LangChain.js",
      "Supabase",
      "Transformers.js",
      "Vercel",
    ],
    brief:
      "Full-stack knowledge base with a RAG pipeline, running open-source models locally via Transformers.js and pg_vector on Supabase.",
    businessImpact:
      "Achieved zero API cost with strong retrieval performance on Vercel.",
    simple: "Search that understands meaning, not just keywords.",
    highlights: [{ label: "API Cost", value: "$0" }],
  },
  {
    id: "generative",
    name: "Generative AI & Computer Vision Projects",
    period: "2023–2024",
    tech: ["Python", "PyTorch", "Hugging Face"],
    brief:
      "Trained DCGANs and explored diffusion; fine-tuned a Transformer for text classification to competitive accuracy.",
    businessImpact:
      "Developed breadth across generative modeling and NLP fine-tuning.",
    simple: "Teaching models to generate images and understand text.",
    highlights: [],
  },
  {
    id: "library-system",
    name: "Full-Stack Library Management System",
    period: "2023",
    tech: ["JavaScript", "Node.js"],
    brief:
      "Led full-stack app incl. auth; built a simple NLP chatbot using cosine similarity for query matching.",
    businessImpact:
      "Delivered end-to-end web app capabilities and baseline NLP pipeline.",
    simple: "A complete library app with a basic AI helper.",
    highlights: [],
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
    if (s.category === "ML" && groups["Machine Learning"])
      groups["Machine Learning"].push(s.proficiency);
    if (s.category === "Cloud" && groups["Cloud & DevOps"])
      groups["Cloud & DevOps"].push(s.proficiency);
    if (s.category === "Architecture" && groups["System Architecture"])
      groups["System Architecture"].push(s.proficiency);
    if (s.category === "Frontend" && groups["Frontend Dev"])
      groups["Frontend Dev"].push(s.proficiency);
    if (s.category === "LLM" && groups["LLM Ops"])
      groups["LLM Ops"].push(s.proficiency);
  }
  return Object.entries(groups).map(([label, arr]) => ({
    label,
    value: arr.length
      ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length)
      : 60,
  }));
}
