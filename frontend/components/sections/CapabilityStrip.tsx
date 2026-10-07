"use client";

import { motion } from "framer-motion";

const capabilities = [
  { label: "AI SOLUTIONS", dot: "bg-primary shadow-[0_0_8px_#adc6ff]" },
  { label: "SOFTWARE ENGINEERING", dot: "bg-tertiary shadow-[0_0_8px_#4cd7f6]" },
  { label: "ENTERPRISE AUTOMATION", dot: "bg-secondary shadow-[0_0_8px_#c0c1ff]" },
  { label: "DIGITAL TRANSFORMATION", dot: "bg-primary shadow-[0_0_8px_#adc6ff]" },
  { label: "PERFORMANCE MARKETING", dot: "bg-tertiary shadow-[0_0_8px_#4cd7f6]" },
  { label: "PROGRAMMATIC SEO", dot: "bg-secondary shadow-[0_0_8px_#c0c1ff]" },
  { label: "DATA & ANALYTICS", dot: "bg-primary shadow-[0_0_8px_#adc6ff]" },
  { label: "CLOUD INFRASTRUCTURE", dot: "bg-tertiary shadow-[0_0_8px_#4cd7f6]" },
];

export function CapabilityStrip() {
  const repeated = [...capabilities, ...capabilities, ...capabilities];

  return (
    <section className="relative w-full overflow-hidden border-y border-white/[0.06] bg-surface-container-lowest/90 py-space-sm backdrop-blur-md">
      {/* Side gradient fade masks */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-surface-container-lowest to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-surface-container-lowest to-transparent" />

      <motion.div
        className="flex w-max items-center gap-space-md"
        animate={{
          x: ["0%", "-33.333%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 28,
        }}
      >
        {repeated.map((cap, i) => (
          <div key={`${cap.label}-${i}`} className="flex items-center gap-space-md">
            <div className="inline-flex items-center gap-space-xs rounded-xl border border-white/[0.08] bg-surface-container/70 px-space-base py-space-xs font-mono text-mono-label uppercase text-on-surface shadow-sm transition-colors hover:border-tertiary/40 hover:bg-surface-container-high">
              <span className={`h-2 w-2 rounded-full ${cap.dot}`} />
              <span className="tracking-wider">{cap.label}</span>
            </div>
            <span className="font-mono text-mono-caption text-white/20 select-none">/</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
