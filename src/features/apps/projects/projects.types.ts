import type { LucideIcon } from "lucide-react";

export type Project = {
  title: string;
  status: string;
  statusTone: "production" | "active" | "stable" | "archive";
  meta: string;
  description: string;
  tags: string[];
  href: string;
  linkLabel: string;
  icon: LucideIcon;
  search: string;
  liveHref?: string;
  image?: string;
};
