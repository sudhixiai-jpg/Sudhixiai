import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { growthPhases } from "@/data/automation";

const phaseGradientMap: Record<number, string> = {
  0: "from-tertiary/20 to-tertiary/5 border-tertiary/30 text-tertiary",
  1: "from-primary/20 to-primary/5 border-primary/30 text-primary-container",
  2: "from-secondary/20 to-secondary/5 border-secondary/30 text-secondary",
};

export function DigitalGrowth() {
  return (
    <section className="flex flex-col gap-space-xl bg-surface-container-lowest px-grid-margin-mobile py-space-3xl md:px-grid-margin-desktop">
      <div className="mx-auto w-full max-w-content">
        <SectionHeader
          kicker="Lifecycle Advantage"
          title="Technology doesn't stop at launch."
          description="We engineer continuous flywheel growth loops to scale revenue and organic authority."
        />

        <Reveal direction="up" className="mt-space-xl">
          <div className="glass-panel rounded-2xl p-space-base md:p-space-lg overflow-hidden">
            {/* Connector Line (desktop) */}
            <div className="hidden md:block relative mb-space-lg">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-tertiary/40 via-primary/40 to-secondary/40" />
            </div>

            <div className="flex flex-col gap-space-md md:flex-row md:gap-space-lg">
              {growthPhases.map((phase, i) => (
                <div key={phase.code} className="flex flex-1 flex-col gap-space-md">
                  <div className="flex items-start gap-space-sm">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br font-mono text-mono-code font-bold transition-all duration-300 hover:scale-110 ${phaseGradientMap[i % 3] ?? phaseGradientMap[0]}`}
                    >
                      {phase.code}
                    </div>
                    <div className="flex flex-col gap-space-2xs">
                      <span className="font-sans text-headline-sm text-on-surface">{phase.title}</span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                  {i < growthPhases.length - 1 && (
                    <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent md:hidden" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
