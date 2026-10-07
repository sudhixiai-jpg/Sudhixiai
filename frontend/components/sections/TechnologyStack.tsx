import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { technologies as fallbackTechnologies } from "@/data/content";
import { getTechnologies } from "@/lib/api/technology";

const chipColors = [
  "border-tertiary/25 text-tertiary hover:border-tertiary/50 hover:bg-tertiary/10",
  "border-primary/25 text-primary-container hover:border-primary/50 hover:bg-primary/10",
  "border-secondary/25 text-secondary hover:border-secondary/50 hover:bg-secondary/10",
];

export async function TechnologyStack() {
  let displayTechnologies = fallbackTechnologies;
  try {
    const remote = await getTechnologies();
    if (remote && remote.length > 0) {
      displayTechnologies = remote.map((t) => t.name);
    }
  } catch {
    // Fall back to static data
  }

  return (
    <section className="flex flex-col gap-space-xl bg-surface-container-lowest px-grid-margin-mobile py-space-3xl md:px-grid-margin-desktop">
      <div className="mx-auto w-full max-w-content">
        <SectionHeader
          kicker="Foundations"
          title="Built on modern technology."
          description="We rely on rigorously vetted, battle-tested modern infrastructure."
        />
        <Reveal direction="up" className="mt-space-xl">
          <div className="glass-panel rounded-2xl p-space-base">
            <div className="flex flex-wrap gap-space-xs">
              {displayTechnologies.map((tech, i) => (
                <span
                  key={tech}
                  className={`cursor-default rounded-xl border px-space-sm py-space-xs font-mono text-mono-label transition-all duration-200 ${chipColors[i % chipColors.length]}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
