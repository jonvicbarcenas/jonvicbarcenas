import {
  Bot,
  Braces,
  Code2,
  Coffee,
  Component,
  Database,
  Globe2,
  Palette,
  Rocket,
  Server,
  ServerCog,
  Smartphone,
  Terminal,
} from "lucide-react";
import type { StackItem, StackSection } from "./stack.types";

export const STACK_SECTIONS: StackSection[] = [
  {
    title: "Languages",
    icon: Code2,
    items: [
      { name: "TypeScript", level: "Primary", tone: "expert", description: "Typed React interfaces, Vite apps, Node services, validation, and reusable UI systems.", icon: Braces, search: "javascript react vite node frontend" },
      { name: "Java", level: "Proficient", tone: "proficient", description: "Spring Boot services, authentication systems, and object-oriented game development.", icon: Coffee, search: "spring boot oop libgdx backend" },
      { name: "Kotlin", level: "Proficient", tone: "proficient", description: "Android activities, fragments, adapters, notifications, security, and mobile state.", icon: Smartphone, search: "android retrofit gradle mobile" },
      { name: "Python", level: "Growing", tone: "advanced", description: "Django applications, backend fundamentals, scripting, and automation practice.", icon: Terminal, search: "django scripting automation" },
    ],
  },
  {
    title: "Interfaces",
    icon: Component,
    items: [
      { name: "React + Vite", level: "Core", tone: "expert", description: "Dashboards, form systems, validation flows, reports, and deployable applications.", icon: Component, search: "react vite tailwind mui bootstrap" },
      { name: "HTML/CSS/JS", level: "Daily", tone: "proficient", description: "Responsive interfaces, semantic markup, accessibility, and practical browser behavior.", icon: Globe2, search: "responsive web accessibility" },
      { name: "UI Systems", level: "Tooling", tone: "advanced", description: "Tailwind CSS, Bootstrap, MUI, Figma, tokens, and structured design iteration.", icon: Palette, search: "figma design system tailwind" },
    ],
  },
  {
    title: "Systems & workflow",
    icon: ServerCog,
    items: [
      { name: "APIs", level: "Backend", tone: "proficient", description: "Spring Boot, Django, REST, WebSocket/STOMP, Node concepts, and validation.", icon: Server, search: "api websocket rest django spring" },
      { name: "Databases", level: "Data", tone: "proficient", description: "PostgreSQL, SQLite, MySQL, MongoDB, relational modeling, and NoSQL exposure.", icon: Database, search: "sql nosql database modeling" },
      { name: "Delivery", level: "Workflow", tone: "expert", description: "GitHub, Vercel, Docker fundamentals, Vitest, manual QA, and systematic debugging.", icon: Rocket, search: "git docker vercel tests qa deployment" },
      { name: "AI-assisted work", level: "AI tools", tone: "advanced", description: "ChatGPT, Codex, and Gemini APIs for planning, debugging, review, and learning.", icon: Bot, search: "llm gemini chatgpt codex planning" },
    ],
  },
];

export function stackSearchText(item: StackItem) {
  return `${item.name} ${item.level} ${item.description} ${item.search}`.toLowerCase();
}
