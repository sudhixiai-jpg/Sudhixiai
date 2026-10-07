"use client";
import Link from "next/link";
import { Rocket, Zap, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="flex flex-col px-grid-margin-mobile pb-space-4xl md:px-grid-margin-desktop">
      <div className="mx-auto w-full max-w-content">
        <Reveal direction="up" scale>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-surface-container via-surface-container-high to-surface-container-low p-space-lg text-center shadow-xl md:p-space-2xl">
            {/* Background glow orbs */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-tertiary/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

            {/* Top gradient border */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tertiary/60 to-transparent" />

            <div className="relative z-10 flex flex-col items-center gap-space-base">
              {/* Icon badge */}
              <motion.div
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-tertiary/30 bg-tertiary/10 shadow-glow-cyan"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Rocket className="h-7 w-7 text-tertiary" aria-hidden />
              </motion.div>

              {/* Heading */}
              <div className="flex flex-col gap-space-xs">
                <h2 className="bg-gradient-to-b from-white via-on-surface to-primary/80 bg-clip-text font-sans text-headline-lg-mobile font-semibold text-transparent md:text-headline-lg">
                  Have a problem worth solving?
                </h2>
                <p className="mx-auto max-w-xs font-body-base text-body-base text-on-surface-variant md:max-w-md">
                  Let&apos;s turn your idea, challenge or opportunity into technology that works.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex w-full flex-col gap-space-sm pt-space-xs sm:w-auto sm:flex-row">
                <Link
                  href="/contact"
                  className="shimmer-btn relative flex h-12 items-center justify-center gap-space-xs overflow-hidden rounded-xl bg-gradient-to-r from-tertiary to-primary-container px-space-lg font-body-base text-body-base font-semibold text-surface shadow-glow-cyan transition-all duration-300 hover:shadow-glow-lg hover:scale-[1.02]"
                >
                  <span>Start a Project</span>
                  <Zap className="h-[18px] w-[18px]" aria-hidden />
                </Link>
                <Link
                  href="/contact"
                  className="flex h-12 items-center justify-center gap-space-xs rounded-xl border border-white/[0.12] bg-surface-container-low px-space-lg font-body-base text-body-base font-medium text-on-surface shadow-sm transition-all duration-200 hover:border-white/[0.22] hover:bg-surface-container"
                >
                  <span>Talk to SUDHIXAI</span>
                  <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
                </Link>
              </div>

              {/* Fine print */}
              <span className="pt-space-2xs font-mono text-mono-caption text-on-surface-variant">
                AVERAGE INITIAL ARCHITECTURE DISPATCH: &lt; 24 HOURS
              </span>
            </div>

            {/* Bottom gradient border */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
