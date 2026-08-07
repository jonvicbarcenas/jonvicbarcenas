import type { LucideIcon } from "lucide-react";

export type WindowId =
  | "about"
  | "projects"
  | "stack"
  | "contact"
  | "terminal"
  | "experience";

export type DesktopWindow = {
  id: WindowId;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  className: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
};

export type AppMeta = Pick<
  DesktopWindow,
  "id" | "title" | "subtitle" | "icon" | "className"
>;

export type AppSearchResult = Pick<AppMeta, "id" | "icon" | "className"> & {
  label: string;
  detail: string;
};
