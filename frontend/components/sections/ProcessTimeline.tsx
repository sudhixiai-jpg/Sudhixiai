import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { processPhases } from "@/data/content";
import { accentBg, accentText } from "@/lib/accent";

const accentGlowDot: Record<string, string> = {
  tertiary: "shadow-[0_0_8px_#4cd7f6]",
  primary: "shadow-[0_0_8px_#4d8eff]",
  secondary: "shadow-[0_0_8px_#c0c1ff]",
  muted: "",
};

export function ProcessTimeline() {
  return (
    <section className="flex flex-col gap-space-xl px-grid-margin-mobile py-space-3xl md:px-grid-margin-desktop">
      <div className="mx-auto w-full max-w-content">
        <SectionHeader
          kicker="Proven Methodology"
          title="From idea to impact."
          description="A disciplined, zero-waste delivery engine engineered for velocity and enterprise scale."
        />

        <div className="relative mt-space-xl flex flex-col gap-space-lg pl-space-md md:grid md:grid-cols-5 md:gap-space-base md:pl-0">
          {/* Connecting line */}
          <div className="absolute bottom-3 left-2.5 top-3 w-px bg-gradient-to-b from-tertiary/40 via-primary/40 to-secondary/40 md:left-0 md:right-0 md:top-[22px] md:h-px md:w-full md:bg-gradient-to-r" />

          {processPhases.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.05} direction="up">
              <div className="group relative flex items-start gap-space-base md:flex-col md:items-center md:text-center">
                {/* Timeline dot */}
                <div className="absolute -left-space-md mt-1 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-surface-container-high shadow-md md:static md:mt-0 md:mb-space-sm">
                  <div
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 group-hover:scale-125 ${accentBg[item.accent]} ${accentGlowDot[item.accent] ?? ""}`}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-space-2xs md:mt-0">
                  <span className={`font-mono text-mono-caption ${accentText[item.accent]}`}>
                    {item.phase}
                  </span>
                  <span className="font-sans text-headline-sm text-on-surface">{item.title}</span>
                  <p className="mt-space-2xs font-body-sm text-body-sm text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
