"use client";
import { ArrowDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { automationSteps } from "@/data/automation";
import { accentText } from "@/lib/accent";
import { motion } from "framer-motion";

const accentBgMap: Record<string, string> = {
  tertiary: "bg-tertiary/10 border-tertiary/30 text-tertiary",
  primary: "bg-primary/10 border-primary/30 text-primary-container",
  secondary: "bg-secondary/10 border-secondary/30 text-secondary",
  muted: "bg-white/5 border-white/10 text-on-surface-variant",
};

export function AutomationSection() {
  return (
    <section className="flex flex-col gap-space-xl px-grid-margin-mobile py-space-3xl md:px-grid-margin-desktop">
      <div className="mx-auto w-full max-w-content">
        <SectionHeader
          kicker="Autonomous Operations"
          title="Automate the work. Accelerate the business."
          description="Connecting disassociated software silos into unified real-time reaction engines."
        />

        <div className="mt-space-xl flex flex-col gap-space-xs md:grid md:grid-cols-5 md:gap-space-sm">
          {automationSteps.map((step, i) => (
            <div key={step.index}>
              <Reveal delay={i * 0.06} direction="up">
                <motion.div
                  className="glass-panel-interactive group flex h-full items-start gap-space-base rounded-2xl p-space-base md:flex-col md:gap-space-sm"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border font-mono text-mono-code font-bold transition-all duration-300 group-hover:scale-110 ${accentBgMap[step.accent] ?? accentBgMap.muted}`}
                  >
                    {step.index}
                  </div>
                  <div className="flex flex-col gap-space-2xs">
                    <span className="font-sans text-headline-sm text-on-surface">{step.title}</span>
                    <span className={`font-mono text-mono-caption ${accentText[step.accent]}`}>
                      {step.tag}
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
              {i < automationSteps.length - 1 && (
                <div className="flex justify-center py-space-2xs text-outline md:hidden">
                  <ArrowDown className="h-5 w-5" aria-hidden />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
