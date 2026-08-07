import type { LucideIcon } from "lucide-react";

export type StackItem = {
  name: string;
  level: string;
  tone: "expert" | "proficient" | "advanced";
  description: string;
  icon: LucideIcon;
  search: string;
};

export type StackSection = {
  title: string;
  icon: LucideIcon;
  items: StackItem[];
};
