import {
  BrainCircuit,
  CodeXml,
  Workflow,
  Repeat2,
  Megaphone,
  SearchCheck,
  ShoppingCart,
  BarChart3,
  CloudCog,
  ShoppingBag,
  HeartPulse,
  CreditCard,
  GraduationCap,
  Building2,
  Factory,
  Scale,
  Rocket,
  Landmark,
  Layers,
  type LucideIcon,
} from "lucide-react";

export const serviceIconMap: Record<string, LucideIcon> = {
  ai: BrainCircuit,
  software: CodeXml,
  automation: Workflow,
  "digital-transformation": Repeat2,
  "digital-marketing": Megaphone,
  seo: SearchCheck,
  "web-ecommerce": ShoppingCart,
  "data-analytics": BarChart3,
};

export const industryIconMap: Record<string, LucideIcon> = {
  saas: CloudCog,
  "e-commerce": ShoppingBag,
  healthcare: HeartPulse,
  finance: CreditCard,
  education: GraduationCap,
  "real-estate": Building2,
  manufacturing: Factory,
  "legal-professional-services": Scale,
  startups: Rocket,
  enterprise: Landmark,
};

export function getServiceIcon(slug: string): LucideIcon {
  return serviceIconMap[slug] || Layers;
}

export function getIndustryIcon(slug: string): LucideIcon {
  return industryIconMap[slug] || Layers;
}
