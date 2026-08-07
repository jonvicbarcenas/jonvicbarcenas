import type { WindowId } from "@/features/desktop/desktop.types";

export type TerminalResult = {
  output?: string;
  openWindow?: WindowId;
  clear?: boolean;
};

const APP_ALIASES: Record<string, WindowId> = {
  about: "about",
  projects: "projects",
  skills: "stack",
  stack: "stack",
  contact: "contact",
  experience: "experience",
  terminal: "terminal",
};

export function runTerminalCommand(value: string): TerminalResult {
  const input = value.trim();
  if (!input) return {};

  const [command, ...args] = input.split(/\s+/);
  const name = command.toLowerCase();

  if (name === "clear") return { clear: true };
  if (name === "help") return { output: "Commands: help, ls, cat about.md, neofetch, open <app>, whoami, clear" };
  if (name === "ls") return { output: "about.md  projects/  skills/  experience.log  contact.desktop" };
  if (name === "whoami") return { output: "Jon Vic Barcenas — BSIT student and junior full-stack developer in Cebu, Philippines." };
  if (name === "cat" && args[0] === "about.md") return { output: "Building practical web, mobile, systems, and AI-assisted tools with React, TypeScript, Java, Kotlin, and Python." };
  if (name === "neofetch") {
    const resolution = typeof window === "undefined" ? "desktop" : `${window.innerWidth}x${window.innerHeight}`;
    return { output: `jonvic@portfolio\nOS: Jonvic Linux (Next.js)\nKernel: React 19\nShell: portfolio-sh\nDE: GNOME-inspired Web Desktop\nResolution: ${resolution}\nPackages: 7 projects` };
  }
  if (name === "open") {
    const target = APP_ALIASES[(args[0] || "").toLowerCase()];
    return target
      ? { output: `Opening ${target}…`, openWindow: target }
      : { output: "Usage: open <about|projects|skills|contact|experience>" };
  }

  return { output: `bash: ${command}: command not found` };
}
