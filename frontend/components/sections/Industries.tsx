import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { industries as fallbackIndustries } from "@/data/content";
import { getIndustries } from "@/lib/api/industries";
import { getIndustryIcon } from "@/lib/icons";
import { accentText } from "@/lib/accent";

const ACCENTS = ["tertiary", "primary", "secondary"] as const;

const accentBorderHover: Record<string, string> = {
  tertiary: "hover:border-tertiary/40 hover:shadow-glow-cyan",
  primary: "hover:border-primary/40 hover:shadow-glow-blue",
  secondary: "hover:border-secondary/40 hover:shadow-[0_0_16px_rgba(192,193,255,0.18)]",
};

export async function Industries() {
  let displayIndustries = fallbackIndustries;
  try {
    const remote = await getIndustries();
    if (remote && remote.length > 0) {
      displayIndustries = remote.map((ind, i) => ({
        title: ind.name,
        description: ind.description || `${ind.name} domain engineering solutions.`,
        icon: getIndustryIcon(ind.slug),
        accent: ACCENTS[i % ACCENTS.length] ?? "primary",
      }));
    }
  } catch {
    // Fall back to static data
  }

  return (
    <section className="flex flex-col gap-space-xl px-grid-margin-mobile py-space-3xl md:px-grid-margin-desktop">
      <div className="mx-auto w-full max-w-content">
        <SectionHeader
          kicker="Sector Solutions"
          title="Technology for ambitious businesses."
          description="Custom domain adaptations that honor industry regulatory and competitive dynamics."
        />
        <div className="mt-space-xl grid grid-cols-2 gap-space-sm sm:grid-cols-3 lg:grid-cols-5">
          {displayIndustries.map((industry, i) => (
            <Reveal
              key={industry.title}
              delay={i * 0.04}
              direction="up"
            >
              <div
                className={`glass-panel-interactive group flex h-full flex-col gap-space-xs rounded-2xl border border-white/[0.07] p-space-base transition-all duration-300 ${accentBorderHover[industry.accent] ?? ""}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-surface-container-high transition-all duration-300 group-hover:scale-110">
                  <industry.icon className={`h-5 w-5 ${accentText[industry.accent]}`} aria-hidden />
                </div>
                <span className="font-sans text-headline-sm text-on-surface">{industry.title}</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {industry.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
