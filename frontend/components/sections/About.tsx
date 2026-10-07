import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

const stats = [
  { value: "100%", label: "Engineering Rigor", color: "text-tertiary" },
  { value: "0.0", label: "Unnecessary Fluff", color: "text-primary-container" },
  { value: "∞", label: "Business Impact", color: "text-secondary" },
  { value: "24h", label: "First Response SLA", color: "text-tertiary" },
];

export function About() {
  return (
    <section className="flex flex-col gap-space-xl px-grid-margin-mobile py-space-3xl md:px-grid-margin-desktop">
      <div className="mx-auto w-full max-w-content">
        <SectionHeader kicker="About Us" title="Engineering technology for what comes next." />

        <Reveal direction="up" className="mt-space-xl">
          <div className="glass-panel rounded-2xl p-space-lg md:max-w-4xl overflow-hidden">
            {/* Top accent line */}
            <div className="mb-space-md h-px w-full bg-gradient-to-r from-tertiary/60 via-primary/40 to-transparent" />

            <div className="flex flex-col gap-space-md md:flex-row md:gap-space-xl">
              {/* Identity block */}
              <div className="flex flex-col gap-space-sm md:max-w-xs">
                <div className="flex items-center gap-space-xs">
                  <div className="h-2.5 w-2.5 rounded-full bg-tertiary shadow-[0_0_8px_#4cd7f6] animate-pulse-slow" />
                  <span className="font-mono text-mono-caption uppercase tracking-wider text-on-surface">
                    {siteConfig.legalName}
                  </span>
                </div>
                <p className="font-body-base leading-relaxed text-body-base text-on-surface-variant">
                  We are a disciplined engineering firm. We replace buzzwords and unverified promises
                  with rock-solid computational rigor, deterministic architecture, and verified
                  business outcomes.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-space-sm pt-space-xs md:pt-0 md:flex-1">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col rounded-xl border border-white/[0.07] bg-surface-container-high/40 p-space-sm transition-all duration-200 hover:border-white/[0.14]"
                  >
                    <span className={`font-sans text-headline-lg font-bold ${stat.color}`}>
                      {stat.value}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
