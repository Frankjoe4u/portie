// Single source of truth for site-wide content.
// Edit text here instead of hunting through components.
import { techIcons } from "@/data/techIcons";

export const site = {
  name: "Frank Joe",
  role: "Full-Stack Software Engineer",
  url: "https://fjoe.vercel.app",
  email: "frankjoe4u@gmail.com",
  location: "Nigeria",
  cv: "/Agbo_Franklin_Emeka_CV.pdf",
  cvFileName: "Frank_Joe_CV.pdf",
  tagline: "Building software that solves real problems.",
  title: "Frank Joe \u2014 Full-Stack Software Engineer",
  description:
    "Frank Joe is a Full-Stack Software Engineer building production-ready web applications, SaaS platforms and business systems.",
  keywords: [
    "Frank Joe",
    "Full-Stack Software Engineer",
    "Next.js developer",
    "TypeScript",
    "Node.js",
    "SaaS development",
    "business management systems",
    "Paystack integration",
    "software engineer Nigeria",
  ],
} as const;

export const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Frankjoe4u",
    path: techIcons.github.path,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/frankjoe4u",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z",
  },
  {
    label: "X",
    href: "https://x.com/FJ_AirMayCar",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
] as const;

export const navLinks = [
  { label: "Home", href: "/#home", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Blog", href: "/#blog", id: "blog" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;

export const buildCategories = [
  "SaaS Platforms",
  "Business Management Systems",
  "Payment Systems",
  "Admin Dashboards",
  "AI Applications",
  "APIs & Backend Systems",
] as const;

export const aboutAreas = [
  "Frontend",
  "Backend",
  "Databases",
  "Authentication",
  "APIs",
  "Payments",
  "Deployment",
  "Cloud infrastructure",
  "Automation",
] as const;

export const journey = [
  {
    year: "2021",
    text: "Started learning web development.",
  },
  {
    year: "2025",
    text: "Restarted the software engineering journey and joined NEXTCOLLEGE.",
  },
  {
    year: "2026",
    text: "Focused on building production-ready applications and real business systems.",
  },
] as const;

export const experience = [
  {
    role: "Full-Stack Software Engineer",
    org: "Independent / Freelance",
    period: "2025 \u2014 Present",
    meta: "Nigeria \u00b7 Remote",
    summary:
      "Designing, building and deploying web applications and business systems directly for clients.",
    points: [
      "Designed and developed full-stack applications",
      "Built business management systems",
      "Implemented authentication and role-based access",
      "Integrated payment gateways",
      "Designed database architectures",
      "Built administrative dashboards",
      "Developed REST APIs",
      "Implemented real-time workflows",
      "Deployed applications to production",
      "Worked directly with business requirements",
    ],
  },
] as const;

export const services = [
  {
    title: "SaaS Platforms",
    text: "Multi-user applications with authentication, subscriptions, dashboards and role-based access.",
    color: "#3b73ff",
    icon: "layers",
  },
  {
    title: "Business Management Systems",
    text: "Hotel, hospital, school, inventory, CRM and internal business platforms.",
    color: "#6366f1",
    icon: "briefcase",
  },
  {
    title: "Payment Systems",
    text: "Paystack/Flutterwave integrations, payment verification, webhooks and transaction workflows.",
    color: "#14b8a6",
    icon: "card",
  },
  {
    title: "Admin & Analytics Dashboards",
    text: "Operational dashboards with permissions, real-time information and reporting.",
    color: "#0ea5e9",
    icon: "chart",
  },
  {
    title: "AI-Powered Applications",
    text: "AI assistants, intelligent search, automation and AI-driven workflows.",
    color: "#d946ef",
    icon: "spark",
  },
  {
    title: "APIs & Backend Systems",
    text: "Secure APIs, database architecture, authentication and backend services.",
    color: "#f59e0b",
    icon: "server",
  },
] as const;

export type SkillItem = { name: string; icon?: keyof typeof techIcons | "aws" };

export const skillGroups: { title: string; items: SkillItem[] }[] = [
  {
    title: "Frontend",
    items: [
      { name: "Next.js", icon: "nextjs" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "REST APIs" },
      { name: "Authentication" },
      { name: "Webhooks" },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Supabase" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Mongoose" },
    ],
  },
  {
    title: "Infrastructure & tools",
    items: [
      { name: "AWS", icon: "aws" },
      { name: "Vercel", icon: "vercel" },
      { name: "Docker", icon: "docker" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
    ],
  },
];

export const practices = [
  {
    title: "Authentication & authorization",
    text: "Every protected route and API checks who is calling and what they may do.",
  },
  {
    title: "Role-based access control",
    text: "Receptionists, managers and executives each see only what their role needs.",
  },
  {
    title: "Input validation",
    text: "Data is validated on the server before it reaches the database.",
  },
  {
    title: "Webhook verification",
    text: "Payments are confirmed server-side from verified provider events, not from the browser.",
  },
  {
    title: "Environment secrets",
    text: "Keys and credentials live in environment variables, never in the repository.",
  },
  {
    title: "Error handling",
    text: "Failures show clear states to users and are handled predictably on the server.",
  },
  {
    title: "Responsive by default",
    text: "Interfaces are designed for phones first, then scaled up.",
  },
  {
    title: "Production deployment",
    text: "Systems are shipped to real hosting, not left on localhost.",
  },
] as const;

export type BuildStatus = "active" | "progress" | "exploring";

// Keep this to projects that are genuinely active right now.
export const currentlyBuilding: {
  name: string;
  text: string;
  status: BuildStatus;
}[] = [
  {
    name: "SmartCollege",
    text: "School management platform with role-based portals.",
    status: "active",
  },
  {
    name: "PharmaLab",
    text: "Multi-branch pharmacy inventory and lab management system.",
    status: "progress",
  },
];

export const statusMeta: Record<BuildStatus, { label: string; dot: string }> = {
  active: { label: "Active", dot: "bg-emerald-500" },
  progress: { label: "In progress", dot: "bg-amber-400" },
  exploring: { label: "Exploring", dot: "bg-sky-400" },
};

export const projectTypes = [
  "SaaS platform",
  "Business management system",
  "Payment integration",
  "Dashboard",
  "API / backend",
  "AI application",
  "Something else",
] as const;

export const budgetRanges = [
  "Not sure yet",
  "Under $500",
  "$500 - $1,500",
  "$1,500 - $5,000",
  "$5,000+",
] as const;
