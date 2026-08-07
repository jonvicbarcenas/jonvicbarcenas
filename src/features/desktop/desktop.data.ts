import {
  BriefcaseBusiness,
  CircleUserRound,
  Files,
  Grid3X3,
  MessageSquareText,
  Terminal,
} from "lucide-react";
import type { AppMeta, DesktopWindow } from "./desktop.types";

export const WINDOW_SEED: DesktopWindow[] = [
  { id: "about", title: "About", subtitle: "Jon Vic", icon: CircleUserRound, className: "app-about", isOpen: true, isMinimized: false, isMaximized: false, x: 92, y: 48, width: 900, height: 620, zIndex: 12 },
  { id: "projects", title: "Projects", subtitle: "7 items", icon: Files, className: "app-files", isOpen: false, isMinimized: false, isMaximized: false, x: 138, y: 72, width: 940, height: 650, zIndex: 8 },
  { id: "stack", title: "Applications", subtitle: "Development", icon: Grid3X3, className: "app-stack", isOpen: false, isMinimized: false, isMaximized: false, x: 184, y: 94, width: 900, height: 620, zIndex: 7 },
  { id: "contact", title: "Messages", subtitle: "New message", icon: MessageSquareText, className: "app-contact", isOpen: false, isMinimized: false, isMaximized: false, x: 222, y: 112, width: 860, height: 610, zIndex: 6 },
  { id: "terminal", title: "Terminal", subtitle: "jonvic@portfolio:~", icon: Terminal, className: "app-terminal", isOpen: false, isMinimized: false, isMaximized: false, x: 286, y: 138, width: 780, height: 500, zIndex: 5 },
  { id: "experience", title: "Experience", subtitle: "Timeline", icon: BriefcaseBusiness, className: "app-experience", isOpen: false, isMinimized: false, isMaximized: false, x: 252, y: 84, width: 780, height: 590, zIndex: 4 },
];

export const APP_META: AppMeta[] = WINDOW_SEED.map(
  ({ id, title, subtitle, icon, className }) => ({
    id,
    title,
    subtitle,
    icon,
    className,
  }),
);
