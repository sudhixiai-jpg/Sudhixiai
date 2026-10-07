import type { LucideIcon } from "lucide-react";

export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: "primary" | "tertiary" | "secondary";
}

export interface AICapability {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: "primary" | "tertiary" | "secondary";
}

export interface AutomationStep {
  index: string;
  title: string;
  tag: string;
  description: string;
  accent: "primary" | "tertiary" | "secondary";
}

export interface GrowthPhase {
  code: string;
  title: string;
  description: string;
  emphasis?: boolean;
}

export interface ProcessPhase {
  phase: string;
  label: string;
  title: string;
  description: string;
  accent: "primary" | "tertiary" | "secondary";
}

export interface IndustryItem {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: "primary" | "tertiary" | "secondary";
}

export interface ProductItem {
  name: string;
  status: "Beta Available" | "In Private Preview" | "Coming Soon" | string;
  buildTag: string;
  description: string;
  category: string;
  accent: "primary" | "tertiary" | "secondary" | "muted";
}

export interface InsightItem {
  slug: string;
  category: string;
  readTime: string;
  title: string;
  excerpt?: string;
  featured?: boolean;
  accent?: "primary" | "tertiary";
}
