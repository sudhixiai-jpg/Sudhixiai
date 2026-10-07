import Link from "next/link";
import { ArrowRight, TerminalSquare, MemoryStick, Activity, Cpu } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-grid-margin-mobile pb-space-2xl pt-space-xl md:px-grid-margin-desktop md:pb-space-4xl md:pt-space-4xl">
      <div className="mx-auto grid max-w-content gap-space-2xl md:grid-cols-2 md:items-center md:gap-space-3xl">
        <Reveal direction="up" className="flex flex-col gap-space-lg">
          <div className="inline-flex w-fit items-center gap-space-xs rounded-full border border-tertiary/30 bg-tertiary/10 px-space-sm py-space-2xs shadow-[0_0_16px_rgba(76,215,246,0.2)] backdrop-blur-md">
            <span className="h-2 w-2 animate-ping rounded-full bg-tertiary" />
            <span className="font-mono text-mono-caption uppercase tracking-wider text-tertiary font-semibold">
              Next-gen enterprise platforms &amp; systems
            </span>
          </div>

          <div className="flex flex-col gap-space-sm">
            <h1 className="font-sans text-display-hero-mobile font-bold tracking-tight md:text-display-hero bg-gradient-to-b from-white via-on-surface to-primary/80 bg-clip-text text-transparent">
              {siteConfig.tagline}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant md:max-w-lg leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          <div className="flex flex-col gap-space-sm pt-space-xs sm:flex-row">
            <Link
              href="/contact"
              className="shimmer-btn flex h-12 items-center justify-center gap-space-xs rounded-xl bg-gradient-to-r from-primary-container via-blue-600 to-tertiary px-space-lg font-body-base font-semibold text-white shadow-[0_0_24px_rgba(77,142,255,0.4)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(76,215,246,0.6)]"
            >
              <span>Start a Project</span>
              <ArrowRight className="h-[18px] w-[18px]" aria-hidden />
            </Link>
            <Link
              href="/solutions"
              className="flex h-12 items-center justify-center gap-space-xs rounded-xl border border-white/[0.12] bg-surface-container-low/80 backdrop-blur-md px-space-lg font-body-base font-medium text-on-surface shadow-sm transition-all duration-200 hover:bg-surface-container hover:border-tertiary/40 hover:text-white hover:scale-[1.02]"
            >
              <span>Explore Solutions</span>
              <TerminalSquare className="h-[18px] w-[18px]" aria-hidden />
            </Link>
          </div>
        </Reveal>

        <Reveal direction="left" delay={0.15}>
          <ArchitectureCard />
        </Reveal>
      </div>
    </section>
  );
}

function ArchitectureCard() {
  return (
    <div className="glass-panel relative mt-space-xs w-full overflow-hidden rounded-2xl p-space-base shadow-2xl border border-white/[0.12] hover:border-tertiary/30 transition-colors">
      <div className="flex items-center justify-between pb-space-sm border-b border-white/[0.06]">
        <div className="flex items-center gap-space-xs">
          <span className="h-2 w-2 animate-pulse rounded-full bg-tertiary shadow-[0_0_8px_#4cd7f6]" />
          <span className="font-mono text-mono-caption tracking-wider text-white font-medium">
            TOPOLOGY: PRODUCTION MESH
          </span>
        </div>
        <div className="hidden items-center gap-space-md font-mono text-mono-caption text-on-surface-variant sm:flex">
          <span className="flex items-center gap-1">
            <Activity className="h-3 w-3 text-tertiary" />
            LATENCY: <strong className="text-tertiary">12ms</strong>
          </span>
          <span className="flex items-center gap-1">
            <Cpu className="h-3 w-3 text-primary" />
            UPTIME: <strong className="text-white">99.99%</strong>
          </span>
        </div>
      </div>

      <div className="relative w-full py-space-sm">
        <svg className="h-auto w-full" viewBox="0 0 340 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Static grid bus lines */}
          <path d="M55 40 L170 40 L285 40" stroke="#1c2b3c" strokeDasharray="4 4" strokeWidth="2" />
          <path d="M55 120 L170 120 L285 120" stroke="#1c2b3c" strokeDasharray="4 4" strokeWidth="2" />
          <path d="M55 40 L55 120" stroke="#1c2b3c" strokeWidth="2" />
          <path d="M170 40 L170 120" opacity="0.4" stroke="#4cd7f6" strokeWidth="2" />
          <path d="M285 40 L285 120" stroke="#1c2b3c" strokeWidth="2" />

          {/* Animated pulsing data stream paths */}
          <path d="M55 40 L170 40" stroke="#4cd7f6" strokeWidth="2" className="animate-data-stream" opacity="0.8" />
          <path d="M170 40 L285 120" stroke="#4d8eff" strokeWidth="2" className="animate-data-stream" opacity="0.7" />
          <path d="M55 120 L170 40" stroke="#c0c1ff" strokeWidth="1.5" className="animate-data-stream" opacity="0.6" />
          <path d="M170 120 L285 120" stroke="#4cd7f6" strokeWidth="2" className="animate-data-stream" opacity="0.8" />

          {/* Glowing pulse rings */}
          <circle className="animate-ping" cx="170" cy="40" fill="#4cd7f6" r="4" opacity="0.75" />
          <circle className="animate-ping" cx="285" cy="120" fill="#4d8eff" r="4" opacity="0.75" />

          {/* Mesh Nodes */}
          <rect fill="#0d1c2d" height="36" rx="8" stroke="#1c2b3c" strokeWidth="1.5" width="90" x="10" y="22" />
          <text fill="#d4e4fa" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600" textAnchor="middle" x="55" y="44">
            AI ENGINE
          </text>

          <rect fill="#1c2b3c" height="36" rx="8" stroke="#4cd7f6" strokeWidth="1.5" width="90" x="125" y="22" className="shadow-[0_0_12px_rgba(76,215,246,0.3)]" />
          <text fill="#acedff" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600" textAnchor="middle" x="170" y="44">
            CORE MESH
          </text>

          <rect fill="#0d1c2d" height="36" rx="8" stroke="#1c2b3c" strokeWidth="1.5" width="90" x="240" y="22" />
          <text fill="#d4e4fa" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600" textAnchor="middle" x="285" y="44">
            AUTOMATION
          </text>

          <rect fill="#0d1c2d" height="36" rx="8" stroke="#1c2b3c" strokeWidth="1.5" width="90" x="10" y="102" />
          <text fill="#d4e4fa" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600" textAnchor="middle" x="55" y="124">
            DATA FABRIC
          </text>

          <rect fill="#0d1c2d" height="36" rx="8" stroke="#1c2b3c" strokeWidth="1.5" width="90" x="125" y="102" />
          <text fill="#d4e4fa" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600" textAnchor="middle" x="170" y="124">
            CLOUD INFRA
          </text>

          <rect fill="#1c2b3c" height="36" rx="8" stroke="#4d8eff" strokeWidth="1.5" width="90" x="240" y="102" />
          <text fill="#acedff" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600" textAnchor="middle" x="285" y="124">
            GROWTH OPS
          </text>
        </svg>
      </div>

      <div className="mt-space-2xs flex items-center justify-between rounded-xl border border-white/[0.06] bg-surface-container-highest/60 p-space-sm backdrop-blur-md">
        <div className="flex items-center gap-space-xs">
          <MemoryStick className="h-4 w-4 text-tertiary" aria-hidden />
          <span className="font-mono text-mono-code text-on-surface">
            mesh://cluster-primary.sudhix.internal
          </span>
        </div>
        <span className="font-mono text-mono-caption text-tertiary font-semibold">ONLINE // STABLE</span>
      </div>
    </div>
  );
}
