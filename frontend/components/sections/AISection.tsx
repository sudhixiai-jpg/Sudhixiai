"use client";
import { LogIn, Brain, Gavel, FormInput, ArrowDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { aiCapabilities } from "@/data/ai-capabilities";
import { accentText } from "@/lib/accent";
import { motion } from "framer-motion";

const pipeline = [
  {
    icon: LogIn,
    label: "01 Input Streams",
    detail: "APIs, Webhooks, Docs & Real-Time Events",
    accent: "tertiary" as const,
  },
  {
    icon: Brain,
    label: "02 Reasoning & Embedding Layer",
    detail: "Vector Indices, Context Grounding & Semantic Routing",
    accent: "primary" as const,
  },
  {
    icon: Gavel,
    label: "03 Deterministic Policy Engine",
    detail: "Guardrails, Schema Validation & Compliance Audits",
    accent: "secondary" as const,
  },
  {
    icon: FormInput,
    label: "04 Multi-Agent Autonomous Outputs",
    detail: "ERP Sync, Customer Actions & Auto-Reconciliation",
    accent: "tertiary" as const,
  },
];

const accentBorderMap: Record<string, string> = {
  tertiary: "border-tertiary/30 group-hover:border-tertiary/60",
  primary: "border-primary/30 group-hover:border-primary/60",
  secondary: "border-secondary/30 group-hover:border-secondary/60",
};

const accentGlowMap: Record<string, string> = {
  tertiary: "group-hover:shadow-glow-cyan",
  primary: "group-hover:shadow-glow-blue",
  secondary: "group-hover:shadow-[0_0_20px_rgba(192,193,255,0.2)]",
};

export function AISection() {
  return (
    <section className="flex flex-col gap-space-xl px-grid-margin-mobile py-space-3xl md:px-grid-margin-desktop">
      <div className="mx-auto w-full max-w-content">
        <SectionHeader
          kicker="Cognitive Infrastructure"
          title="AI built for real-world business."
          description="Moving past parlor tricks: verifiable, deterministic agents grounded in business facts."
        />

        <div className="mt-space-xl grid gap-space-lg lg:grid-cols-2">
          {/* Pipeline Card */}
          <Reveal direction="left" className="glass-panel flex flex-col gap-space-md rounded-2xl p-space-base">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-space-sm">
              <span className="font-mono text-mono-label uppercase text-on-surface">
                Inference &amp; Reasoning Pipeline
              </span>
              <span className="rounded bg-tertiary/10 px-2 py-0.5 font-mono text-mono-caption text-tertiary border border-tertiary/20">
                V4-RAG/ONLINE
              </span>
            </div>
            <div className="flex flex-col gap-space-xs">
              {pipeline.map((step, i) => (
                <div key={step.label}>
                  <motion.div
                    className={`group flex items-center gap-space-sm rounded-xl border bg-surface-container-high/50 p-space-sm transition-all duration-300 cursor-default ${accentBorderMap[step.accent]} ${accentGlowMap[step.accent]}`}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-surface-container ${accentGlowMap[step.accent]} transition-all duration-300`}>
                      <step.icon className={`h-4 w-4 ${accentText[step.accent]}`} aria-hidden />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-mono-label text-on-surface">{step.label}</span>
                      <span className="font-mono text-mono-caption text-on-surface-variant">
                        {step.detail}
                      </span>
                    </div>
                  </motion.div>
                  {i < pipeline.length - 1 && (
                    <div className="flex justify-center py-1.5">
                      <ArrowDown className="h-4 w-4 text-outline animate-bounce" style={{ animationDuration: "2s" }} aria-hidden />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2">
            {aiCapabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={i * 0.05} direction={i % 2 === 0 ? "right" : "up"}>
                <div className="glass-panel-interactive group flex h-full flex-col gap-space-xs rounded-2xl p-space-base">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-surface-container-high transition-all duration-300 group-hover:scale-110">
                    <cap.icon className={`h-5 w-5 ${accentText[cap.accent]}`} aria-hidden />
                  </div>
                  <span className="font-sans text-headline-sm text-on-surface">{cap.title}</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{cap.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
