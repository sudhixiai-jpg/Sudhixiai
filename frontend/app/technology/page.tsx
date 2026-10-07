import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { technologies as fallbackTechnologies } from "@/data/content";
import { getTechnologies } from "@/lib/api/technology";
import { Cpu, Server, ShieldCheck, Zap } from "lucide-react";

export default async function TechnologyPage() {
  let displayTechnologies = fallbackTechnologies;
  try {
    const remote = await getTechnologies();
    if (remote && remote.length > 0) {
      displayTechnologies = remote.map((t) => t.name);
    }
  } catch {
    // Graceful fallback
  }

  return (
    <main className="min-h-screen px-grid-margin-mobile pb-space-4xl pt-space-3xl md:px-grid-margin-desktop md:pt-space-4xl">
      <div className="mx-auto max-w-content flex flex-col gap-space-2xl">
        <SectionHeader
          kicker="Core Infrastructure"
          title="Engineered on Battle-Tested Foundations"
          description="We leverage modern, type-safe, distributed architectures that scale seamlessly without operational fragility."
        />

        <div className="grid gap-space-md sm:grid-cols-3">
          <Reveal className="flex flex-col gap-space-sm rounded-2xl border border-surface-container-high bg-surface-container-low p-space-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary/10 text-tertiary">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-sans text-headline-sm font-semibold text-on-surface">Sub-Second Latency</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Edge caching, optimized query serialization, and asynchronous event streams guarantee ultra-fast response times.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="flex flex-col gap-space-sm rounded-2xl border border-surface-container-high bg-surface-container-low p-space-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Server className="h-5 w-5" />
            </div>
            <h3 className="font-sans text-headline-sm font-semibold text-on-surface">Elastic Scalability</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Containerized microservices and stateless application workers backed by distributed persistent storage.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-space-sm rounded-2xl border border-surface-container-high bg-surface-container-low p-space-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-sans text-headline-sm font-semibold text-on-surface">Enterprise Security</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Strict isolation boundaries, HttpOnly session authentication, append-only audit logging, and automated threat filtering.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="flex flex-col gap-space-md rounded-2xl border border-surface-container-high bg-surface-container-low p-space-lg md:p-space-xl">
          <div className="flex items-center gap-space-xs font-mono text-mono-label text-tertiary">
            <Cpu className="h-4 w-4" />
            <span>PRIMARY STACK &amp; FRAMEWORKS</span>
          </div>

          <div className="flex flex-wrap gap-space-xs pt-space-xs">
            {displayTechnologies.map((tech) => (
              <span
                key={tech}
                className="rounded-xl border border-surface-container-high bg-surface-container-lowest px-space-md py-space-sm font-mono text-mono-label text-on-surface shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
