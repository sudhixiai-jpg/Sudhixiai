import {
  BrainCircuit,
  CodeXml,
  Workflow,
  Repeat2,
  Megaphone,
  SearchCheck,
  ShoppingCart,
  BarChart3,
} from "lucide-react";
import type { ServiceItem } from "@/types";

export const services: ServiceItem[] = [
  {
    slug: "ai",
    title: "AI Solutions",
    description:
      "Autonomous agents, generative intelligence, and deterministic neural decision engines.",
    icon: BrainCircuit,
    accent: "tertiary",
  },
  {
    slug: "software",
    title: "Software Engineering",
    description:
      "High-throughput distributed backends, ultra-responsive web applications, and native mobile clients.",
    icon: CodeXml,
    accent: "primary",
  },
  {
    slug: "automation",
    title: "Automation",
    description:
      "Enterprise orchestration, multi-system event-driven pipelines, and zero-touch human handoffs.",
    icon: Workflow,
    accent: "tertiary",
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    description:
      "Legacy system modernization, cloud-native migration, and agile organizational re-architecture.",
    icon: Repeat2,
    accent: "secondary",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Data-backed acquisition funnels, multi-channel attribution engines, and compounding customer loops.",
    icon: Megaphone,
    accent: "primary",
  },
  {
    slug: "seo",
    title: "Algorithmic SEO",
    description:
      "Technical structural auditing, algorithmic search optimization, and automated programmatic indexing.",
    icon: SearchCheck,
    accent: "tertiary",
  },
  {
    slug: "web-ecommerce",
    title: "Web & E-Commerce",
    description:
      "Sub-second headless storefronts, frictionless checkout funnels, and enterprise sales infrastructure.",
    icon: ShoppingCart,
    accent: "secondary",
  },
  {
    slug: "data-analytics",
    title: "Data & Analytics",
    description:
      "Unified data lakehouses, real-time observability telemetry, and forward predictive modeling.",
    icon: BarChart3,
    accent: "primary",
  },
];
