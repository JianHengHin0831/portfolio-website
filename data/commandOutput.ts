const skillsData = {
  languages: ["Python", "SQL", "Java", "JavaScript/TypeScript"],
  ai_ml: ["PyTorch", "TensorFlow", "LangChain.js", "Hugging Face Transformers"],
  cloud_devops: ["GCP", "Docker", "Vercel", "Supabase"],
  frontend: ["Nuxt.Js"],
};

const contactData = {
  email: "jianhenghin0831@gmail.com",
  linkedin: "linkedin.com/in/jian-heng-hin",
  github: "github.com/JianHengHin0831",
};

const helpOutput = [
  "JIAN - Cognitive AI Interface | Command List",
  "",
  "Usage: command [options]",
  "",
  "Core Commands:",
  "  help         - Show this help message",
  "  about        - Display information about JIAN and this portfolio",
  "  projects     - List key projects. Use '--gui' for visual view",
  "  skills       - List technical skills. Use '--gui' for visual view",
  "  contact      - Show contact information. Use '--gui' for visual view",
  "  timeline     - Development Timeline. Use '--gui' for visual view",
  "  dashboard    - About me. Use '--gui' for visual view",
  "  clear        - Clear the terminal history",
].join("\n");

const timelineOutput = [
  "> exec command: log --history --filter=development",
  " ",
  "Fetching development timeline for unit HJH-0831...",
  "--- [ CHRONOLOGICAL LOG ] ---",
  " ",
  "[TIMESTAMP: OCT 2025 -- PREDICTED]",
  "  EVENT: Advanced training protocol initiated.",
  "  MODULE: Master of Artificial Intelligence.",
  "  INSTITUTION: University of Malaya (#60 QS 2025).",
  "  FOCUS_AREAS: [Advanced ML Algorithms], [Reinforcement Learning], [AI Ethics].",
  " ",
  "---",
  " ",
  "[TIMESTAMP: JUN 2024 - OCT 2024]",
  "  EVENT: Field deployment and practical application (Internship).",
  "  ROLE: Software Engineer Intern.",
  "  ORGANIZATION: Feedme POS.",
  "  ACHIEVEMENT: Developed a component-based website builder using Nuxt.js, significantly improving content update efficiency. Deployed to live corporate site (Feedme.ai).",
  " ",
  "---",
  " ",
  "[TIMESTAMP: OCT 2022 - JUN 2025]",
  "  EVENT: Core programming and foundational model training.",
  "  MODULE: Bachelor of Science in Computer Science.",
  "  INSTITUTION: University of Southampton, Malaysia Campus (#80 QS 2025).",
  "  MILESTONE: Graduated with First Class Honours (72.92%).",
  "  ACQUIRED_SKILLS: [Machine Learning], [Natural Language Processing], [Cloud & Website Security].",
  " ",
  "--- [ LOG END ] ---",
].join("\n");

const dashboardOutput = [
  "// HJH-Cognitive-Engine v1.0",
  "// Identity Matrix Loaded...",
  " ",
  "ID:          HJH-0831",
  "DESIGNATION: AI Engineer",
  "STATUS:      Active | Master's in AI (Oct 2025)",
  " ",
  "PRIMARY_DIRECTIVE:",
  "  > To engineer and deploy efficient, end-to-end AI systems with a focus on real-time applications and model interpretability.",
  " ",
  "CORE_ATTRIBUTES:",
  "  - First Class Honours, Computer Science (BSc)",
  "  - Proficient in PyTorch, GCP, and MLOps practices",
  "  - Experienced in building production-level AI solutions from concept to deployment",
  " ",
  "// Awaiting command...",
].join("\n");

const aboutOutput = [
  "JIAN is the Cognitive AI Interface for Hin Jian Heng's portfolio.",
  "It is designed to analyze, narrate, and provide interactive access to his professional background.",
  "Built with Nuxt, Vue, and TypeScript, integrated with Large Language Models.",
].join("\n");

const projectOutput = [
  "Accessing Simulation Archives... Found 7 projects:",
  "",
  "  [1] Interpretable ML for Medical Analysis",
  "      Tech: Python, PyTorch, TabNet",
  "",
  "  [2] Secure Cloud-Based Group Messaging Platform",
  "      Tech: GCP, DevOps",
  "",
  "  [3] AI-Powered Semantic Search Engine",
  "      Tech: Nuxt.js, Hugging Face, LangChain.js, Supabase",
  "",
  "  [4] CanvasX: AI-Powered Travel Planner",
  "      Tech:Nuxt.js,Supabase, FastAPI,OpenAI GPT-4o,Vercel,Docker",
  "",
  "  [5] Staff Identification & Tracking Solution",
  "      Tech: Python, YOLOv8, SAHI, Computer Vision, ResNet50",
  "",
  "  [6] Generative AI & Computer Vision Projects",
  "      Tech: Python, PyTorch, Hugging Face, DCGAN, Diffusion Models",
  "",
  "  [7] Full-Stack Library Management System",
  "      Tech: JavaScript, Node.js, Express, HTML/CSS",
  "",
  "Hint: For a detailed visual analysis, type 'projects --gui'",
].join("\n");

const skillsOutput = [
  "Scanning Skill Matrix...",
  "",
  "[LANGUAGES]",
  `  - ${skillsData.languages.join("\n  - ")}`,
  "",
  "[AI / ML]",
  `  - ${skillsData.ai_ml.join("\n  - ")}`,
  "",
  "[CLOUD & DEVOPS]",
  `  - ${skillsData.cloud_devops.join("\n  - ")}`,
  "",
  "[Frontend]",
  `  - ${skillsData.frontend.join("\n  - ")}`,
  "",
  "Hint: For an interactive visual breakdown, type 'skills --gui'",
].join("\n");

const contactOutput = [
  "Accessing Communication Channels...",
  "",
  `  Email:    ${contactData.email}`,
  `  LinkedIn: https://${contactData.linkedin}`,
  `  GitHub:   https://${contactData.github}`,
  "",
  "Hint: To use the contact form, navigate to the contact section via the visual interface.",
].join("\n");

export function getTimeStamp() {
  const now = new Date();
  return `[${now.toLocaleTimeString()}] `;
}

export const outputGenerator = (baseCommand: string) => {
  switch (baseCommand) {
    case "help":
      return helpOutput;
    case "about":
      return aboutOutput;
    case "projects":
      return projectOutput;
    case "contact":
      return contactOutput;
    case "timeline":
      return timelineOutput;
    case "dashboard":
      return dashboardOutput;
    case "skills":
      return skillsOutput;
    default:
      return `Command not found: '${baseCommand}'. Type 'help' for a list of available commands.`;
  }
};

export const allowGUIVersion = [
  "projects",
  "skills",
  "timeline",
  "dashboard",
  "contact",
];
