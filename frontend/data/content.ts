import {
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
} from "lucide-react";
import type { ProcessPhase, IndustryItem, ProductItem, InsightItem } from "@/types";

export const processPhases: ProcessPhase[] = [
  {
    phase: "PHASE 01 // SCOPING",
    label: "01",
    title: "Discover",
    description:
      "Deep stakeholder alignment, domain modeling, technical debt auditing, and strict feasibility analysis.",
    accent: "tertiary",
  },
  {
    phase: "PHASE 02 // BLUEPRINT",
    label: "02",
    title: "Strategy",
    description:
      "Architectural schematics, milestone scoping, security posture validation, and tech stack specification.",
    accent: "primary",
  },
  {
    phase: "PHASE 03 // DESIGN",
    label: "03",
    title: "Design",
    description:
      "High-density design systems, mission-critical UX workflows, and interactive prototype stress testing.",
    accent: "secondary",
  },
  {
    phase: "PHASE 04 // EXECUTION",
    label: "04",
    title: "Build",
    description:
      "Rapid iterative sprints, test-driven backend implementations, and automated CI/CD staging verification.",
    accent: "tertiary",
  },
  {
    phase: "PHASE 05 // SCALE",
    label: "05",
    title: "Grow",
    description:
      "Continuous observability, telemetry optimization, self-healing growth loops, and algorithmic evolution.",
    accent: "primary",
  },
];

export const technologies: string[] = [
  "PyTorch",
  "LangChain",
  "Python",
  "Django",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "AWS",
  "Google Cloud",
  "Kubernetes",
  "GraphQL",
  "REST APIs",
  "Temporal",
  "Snowflake",
  "ClickHouse",
  "Redis",
];

export const industries: IndustryItem[] = [
  { title: "SaaS", description: "Multi-tenant scalability", icon: CloudCog, accent: "tertiary" },
  { title: "E-commerce", description: "Headless retail engines", icon: ShoppingBag, accent: "primary" },
  { title: "Healthcare", description: "HIPAA compliant records", icon: HeartPulse, accent: "secondary" },
  { title: "Finance", description: "Real-time ledger audit", icon: CreditCard, accent: "tertiary" },
  { title: "Education", description: "Adaptive learning LMS", icon: GraduationCap, accent: "primary" },
  { title: "Real Estate", description: "Dynamic asset valuation", icon: Building2, accent: "secondary" },
  { title: "Manufacturing", description: "Telemetry & predictive QA", icon: Factory, accent: "tertiary" },
  { title: "Legal & Pro", description: "Cognitive doc extraction", icon: Scale, accent: "primary" },
  { title: "Startups", description: "High-velocity MVP ops", icon: Rocket, accent: "secondary" },
  { title: "Enterprise", description: "Global infrastructure", icon: Landmark, accent: "tertiary" },
];

export const products: ProductItem[] = [
  {
    name: "SudhixFlow",
    status: "Beta Available",
    buildTag: "BUILD_REV #8902",
    description:
      "Enterprise workflow orchestrator linking disparate internal backends with sub-millisecond execution guarantees and visual state tracking.",
    category: "ORCHESTRATION ENGINE",
    accent: "primary",
  },
  {
    name: "SudhixCognition",
    status: "In Private Preview",
    buildTag: "ACCESS_ONLY",
    description:
      "Business knowledge grounding engine empowering autonomous agents to query secure enterprise corpora with deterministic precision.",
    category: "NEURAL KNOWLEDGE FABRIC",
    accent: "secondary",
  },
  {
    name: "SudhixPulse",
    status: "Coming Soon",
    buildTag: "Q3-2025",
    description:
      "Continuous real-time organic growth and programmatic SEO telemetry platform identifying index drift and ranking vulnerabilities immediately.",
    category: "TELEMETRY & AUDITING",
    accent: "muted",
  },
];

// Placeholder editorial content reproducing the approved design's copy.
// Per project rule (never fabricate), these should be replaced by real
// Insight records served from the Django backend once /insights ships.
export const insights: InsightItem[] = [
  {
    slug: "architecting-resilient-multi-agent-ai-systems",
    category: "AI SYSTEMS",
    readTime: "8 MIN READ",
    title: "Architecting Resilient Multi-Agent AI Systems for Production",
    excerpt:
      "A deep technical walkthrough covering determinism, consensus fallbacks, and memory containment in mission-critical deployments.",
    featured: true,
  },
  {
    slug: "modern-monolith-vs-microservices-2025",
    category: "SYSTEM ARCHITECTURE",
    readTime: "5 min read",
    title: "The Modern Monolith vs Microservices in 2025",
    excerpt: "Tech Ops",
    accent: "primary",
  },
  {
    slug: "programmatic-seo-at-global-scale",
    category: "GROWTH ENGINEERING",
    readTime: "6 min read",
    title: "Programmatic SEO at Global Scale: 1M+ Pages",
    excerpt: "Search Ops",
    accent: "tertiary",
  },
];
