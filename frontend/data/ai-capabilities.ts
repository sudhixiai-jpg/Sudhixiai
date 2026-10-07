import { Bot, Sparkles, RefreshCw, MessageCircle, FileSearch, Cpu } from "lucide-react";
import type { AICapability } from "@/types";

export const aiCapabilities: AICapability[] = [
  {
    title: "AI Agents",
    description:
      "Autonomous goal-seeking systems executing complex multi-step business objectives.",
    icon: Bot,
    accent: "tertiary",
  },
  {
    title: "Generative AI",
    description:
      "Proprietary domain-tuned language models producing production-grade domain content.",
    icon: Sparkles,
    accent: "primary",
  },
  {
    title: "AI Automation",
    description:
      "Inject intelligence directly into repetitive enterprise loops without human friction.",
    icon: RefreshCw,
    accent: "secondary",
  },
  {
    title: "AI Assistants",
    description:
      "Context-aware internal copilots trained exclusively on private corporate knowledge.",
    icon: MessageCircle,
    accent: "tertiary",
  },
  {
    title: "Document Intelligence",
    description:
      "Extract, classify, and reconcile high-density unstructured contracts and statements.",
    icon: FileSearch,
    accent: "primary",
  },
  {
    title: "Custom AI Applications",
    description:
      "Bespoke algorithmic engines designed to power proprietary corporate moats.",
    icon: Cpu,
    accent: "secondary",
  },
];

export const inferencePipeline = [
  {
    step: "01",
    title: "Input Streams",
    detail: "APIs, Webhooks, Docs & Real-Time Events",
    icon: "login",
    accent: "tertiary",
  },
  {
    step: "02",
    title: "Reasoning & Embedding Layer",
    detail: "Vector Indices, Context Grounding & Semantic Routing",
    icon: "psychology",
    accent: "primary",
  },
  {
    step: "03",
    title: "Deterministic Policy Engine",
    detail: "Guardrails, Schema Validation & Compliance Audits",
    icon: "gavel",
    accent: "secondary",
  },
  {
    step: "04",
    title: "Multi-Agent Autonomous Outputs",
    detail: "ERP Sync, Customer Actions & Auto-Reconciliation",
    icon: "dynamic_form",
    accent: "tertiary",
  },
] as const;
