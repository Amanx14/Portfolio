export const profile = {
  firstName: "Aman",
  lastName: "Kumar",
  title: "Software Engineer",
  tagline: "Full-Stack · AI Products",
  email: "amank14th@gmail.com",
  github: "https://github.com/Amanx14",
  linkedin: "https://linkedin.com/in/im-avi07",
  resume: "https://drive.google.com/file/d/1bYyjwBiGU5CUtmg8jI76yNorFLNQwubB/view?usp=sharing",
  photo: "/profile.png",
  about:
    "Hi, I am Aman; a software engineer building enterprise web and AI products with React, Node.js and FastAPI. I have shipped 8 production apps for clients like Aditya Birla, Lakmé and D.S. Group.",
};

export const stats = [
  { value: 8, suffix: "", label: "Production apps shipped" },
  { value: 30, suffix: "%", label: "Lift in user engagement" },
  { value: 25, suffix: "%", label: "Faster API response time" },
  { value: 1.5, suffix: " Cr", prefix: "₹", label: "Enterprise project secured", decimals: 1 },
];

export const clients = ["Aditya Birla", "Lakmé", "D.S. Group", "NSI", "TCNS Clothing", "VaidyaScribe", "HOY"];

export type Project = {
  name: string;
  kind: "notes" | "tryon" | "dashboard";
  summary: string;
  tech: string[];
  points: string[];
  /** Live product URL, shown as a link on the project name */
  link?: string;
};

export const projects: Project[] = [
  {
    name: "VaidyaScribe",
    kind: "notes",
    summary:
      "AI clinical notes tool that turns doctor–patient conversations into AIIMS-compliant EMR notes using Sarvam AI speech-to-text and Gemini.",
    tech: ["React", "Vite", "FastAPI", "Sarvam AI", "Gemini", "PostgreSQL"],
    points: [
      "Voice + text workflow combining **Sarvam AI** speech-to-text with **Gemini** to generate **AIIMS-compliant EMR notes**.",
      "Implemented **speaker separation** and **ICD-10 tagging** so output feeds directly into the React interface.",
      "Deployed **FastAPI** on **Google Cloud** and React on **Vercel** for live production clinical demos.",
    ],
  },
  {
    name: "HOY",
    link: "https://hoylook.com/",
    kind: "tryon",
    summary:
      "AI virtual try-on platform with a pluggable multi-engine pipeline across fal.ai, OpenAI and Gemini, at 60% lower cost per image.",
    tech: ["Node.js", "Express", "MongoDB", "React", "fal.ai", "OpenAI", "Gemini", "Docker", "Kubernetes"],
    points: [
      "Cut cost **60%** (₹20 → ₹8 per image) and processing time **40%** (5 → 3 min) by optimizing the AI pipeline.",
      "Engineered a **pluggable multi-engine** architecture enabling model swaps without backend rewrites.",
      "Enforced security using **JWT**, **WhatsApp OTP** and **RBAC**, deployed via **Docker** and **Kubernetes**.",
    ],
  },
  {
    name: "TCNS ERP & Analytics",
    kind: "dashboard",
    summary:
      "Enterprise ERP and analytics dashboard for Aditya Birla processing ₹9.57 Cr in revenue and 40,000+ customer orders.",
    tech: ["React.js", "Node.js", "REST APIs", "Redux"],
    points: [
      "Designed an enterprise **ERP and analytics dashboard** processing **₹9.57 Cr** in revenue and **40,000+** orders.",
      "Visualized customer tiers and operational metrics across **200,000+ records** with interactive React charts.",
      "Reduced redundant API calls using **lazy loading**, response caching, chunked Excel exports and **memoization**.",
    ],
  },
];

export const experience = {
  role: "Software Engineer",
  company: "ENS Enterprises Pvt. Ltd.",
  period: "Dec 2023 – Present",
  context: "Enterprise Web & AI Products — Aditya Birla, Lakmé, D.S. Group, NSI",
  bullets: [
    "Architected modular full-stack **React**, **Node.js** and **Python (FastAPI)** codebases, delivering **8 production apps** for enterprise clients.",
    "Built performance-optimized **React** and **Next.js** interfaces, increasing user engagement by **30%**.",
    "Optimized backend **RESTful CRUD APIs** for reliability and scalability, improving response time by **25%**.",
    "Configured **CI/CD pipelines**, **Docker** workflows and **payment gateway** integrations, replacing manual releases with automated deployments.",
    "Integrated speech and **LLM APIs** (Sarvam, Gemini, Claude, OpenAI) into client applications, automating manual workflows.",
    "Cut manual processing errors by **30%** by automating and validating **data-migration workflows** for D.S. Group.",
    "Built web portals and admin dashboards using **React**, **Redux** and **REST APIs** for real-time analytics.",
    "Led technical delivery of AI workflow solutions using **Veo 3.1** and LLM APIs, securing a **₹1.5 Cr** enterprise project.",
    "Mentored junior developers on **React** patterns and interviewed SDE candidates to grow the team.",
  ],
};

export const skills = [
  { group: "Languages", items: ["Python", "JavaScript (ES6+)", "TypeScript", "SQL", "Java", "HTML", "CSS"] },
  { group: "Frontend & Testing", items: ["React.js", "Redux", "Next.js", "Zustand", "Vite", "Jest", "Styled Components"] },
  {
    group: "Backend & APIs",
    items: ["FastAPI", "Node.js", "Express.js", "REST APIs", "WebSockets", "PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase"],
  },
  { group: "DevOps & Cloud", items: ["CI/CD", "Docker", "Kubernetes", "Google Cloud", "Vercel", "Git", "GitHub"] },
  { group: "AI & Voice", items: ["Sarvam AI", "Gemini", "Claude", "OpenAI", "fal.ai", "Veo 3.1"] },
];

export const education = {
  school: "Dr. APJ Abdul Kalam Technical University",
  degree: "B.Tech in Computer Science Engineering",
  period: "2020 – 2023",
  place: "Lucknow, UP",
  score: "CGPA 7.59 / 10",
};
