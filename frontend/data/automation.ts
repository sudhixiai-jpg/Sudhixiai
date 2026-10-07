import type { AutomationStep, GrowthPhase } from "@/types";

export const automationSteps: AutomationStep[] = [
  {
    index: "01",
    title: "Trigger",
    tag: "INGEST WEBHOOK / SYSTEM EVENT",
    description:
      "Real-time listening nodes intercept payload triggers across CRMs, ERPs, and database events.",
    accent: "tertiary",
  },
  {
    index: "02",
    title: "AI Processing",
    tag: "MULTI-MODAL CONTEXT ENGINE",
    description:
      "Cognitive context normalization, entity classification, and deep payload parsing.",
    accent: "primary",
  },
  {
    index: "03",
    title: "Decision",
    tag: "RULE & NEURAL POLICY EVALUATION",
    description:
      "Branching pathways vetted against immutable compliance policies and business thresholds.",
    accent: "secondary",
  },
  {
    index: "04",
    title: "Automation",
    tag: "SYNCHRONOUS API EXECUTION",
    description:
      "Instant transactional mutations delivered into target downstream endpoints with retries.",
    accent: "tertiary",
  },
  {
    index: "05",
    title: "Outcome",
    tag: "INSTANT IMPACT & ZERO FRICTION",
    description:
      "Eliminated human overhead, zero latency bottlenecks, and logged compliance trails.",
    accent: "primary",
  },
];

export const growthPhases: GrowthPhase[] = [
  {
    code: "P1",
    title: "Build",
    description:
      "Scalable, resilient architecture constructed for deterministic reliability and speed.",
  },
  {
    code: "P2",
    title: "Reach",
    description:
      "Targeted market penetration, algorithmic search optimization, and automated syndication.",
  },
  {
    code: "P3",
    title: "Optimize",
    description:
      "Telemetry observation, sub-second conversion tuning, and systematic friction mitigation.",
  },
  {
    code: "P4",
    title: "Grow",
    description:
      "Compounding automation pipelines and programmatic scaling across international territories.",
    emphasis: true,
  },
];
