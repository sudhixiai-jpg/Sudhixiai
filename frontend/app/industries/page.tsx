import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { industries as fallbackIndustries } from "@/data/content";
import { getIndustries } from "@/lib/api/industries";
import { getIndustryIcon } from "@/lib/icons";
import { accentText } from "@/lib/accent";

const ACCENTS = ["tertiary", "primary", "secondary"] as const;

export default async function IndustriesPage() {
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
    <main className="min-h-screen px-grid-margin-mobile pb-space-4xl pt-space-3xl md:px-grid-margin-desktop md:pt-space-4xl">
      <div className="mx-auto max-w-content flex flex-col gap-space-2xl">
        <SectionHeader
          kicker="Domain Engineering"
          title="Industry-Specific Solutions"
          description="Customized platform adaptations engineered around the regulatory, compliance, and velocity dynamics of modern sectors."
        />

        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-3">
          {displayIndustries.map((industry, i) => (
            <Reveal
              key={industry.title}
              delay={i * 0.04}
              className="flex flex-col gap-space-sm rounded-2xl border border-surface-container-high bg-surface-container-low p-space-lg shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-high">
                <industry.icon className={`h-6 w-6 ${accentText[industry.accent]}`} aria-hidden />
              </div>
              <div className="flex flex-col gap-space-2xs">
                <h3 className="font-sans text-headline-sm font-semibold text-on-surface">
                  {industry.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {industry.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
