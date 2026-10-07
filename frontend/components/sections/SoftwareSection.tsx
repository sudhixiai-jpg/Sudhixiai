import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const capabilityGrid = [
  { label: "Web Apps", detail: "Sub-second reactivity", color: "text-tertiary" },
  { label: "Mobile Apps", detail: "Native iOS & Android", color: "text-primary-container" },
  { label: "SaaS Products", detail: "Multi-tenant engines", color: "text-secondary" },
  { label: "APIs & Cloud", detail: "High-throughput gRPC", color: "text-tertiary" },
];

export function SoftwareSection() {
  return (
    <section className="flex flex-col gap-space-xl bg-surface-container-lowest px-grid-margin-mobile py-space-3xl md:px-grid-margin-desktop">
      <div className="mx-auto w-full max-w-content">
        <SectionHeader
          kicker="Mission-Critical Engineering"
          title="Software engineered around your business."
          description="Resilient digital systems built for scale, security, and low operational friction."
        />

        <Reveal direction="up" className="mt-space-xl lg:max-w-3xl">
          <div className="glass-panel flex flex-col gap-space-md rounded-2xl p-space-base overflow-hidden">
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />
                <span className="ml-space-xs font-mono text-mono-code text-on-surface-variant">
                  orchestrator.ts
                </span>
              </div>
              <span className="rounded border border-tertiary/20 bg-tertiary/10 px-2 py-0.5 font-mono text-mono-caption text-tertiary">
                NODE // COMPILED
              </span>
            </div>

            {/* Code Block */}
            <div className="overflow-x-auto rounded-xl bg-surface/80 border border-white/[0.05] p-space-sm font-mono text-[12px] leading-relaxed shadow-inner">
              <p>
                <span className="text-secondary">import</span>{" "}
                {"{ MicroService, MeshRouter }"}{" "}
                <span className="text-secondary">from</span>{" "}
                <span className="text-tertiary">&apos;@sudhix/core&apos;</span>;
              </p>
              <p className="mt-space-2xs">
                <span className="text-primary-container">export const</span> pipeline ={" "}
                <span className="text-secondary">new</span>{" "}
                <span className="text-on-surface">MeshRouter</span>({"{"}
              </p>
              <p className="pl-space-sm text-on-surface">
                telemetry: <span className="text-tertiary">&apos;active&apos;</span>,
              </p>
              <p className="pl-space-sm text-on-surface">
                maxLatency: <span className="text-tertiary">20</span>,{" "}
                <span className="text-outline-variant">{"// ms"}</span>
              </p>
              <p className="pl-space-sm text-on-surface">
                redundancy: <span className="text-tertiary">&apos;multi-region&apos;</span>
              </p>
              <p>{"}"});</p>
              <p className="mt-space-2xs text-tertiary">
                {"// 100% test coverage / deterministic execution"}
              </p>
            </div>

            {/* Capability Chips */}
            <div className="grid grid-cols-2 gap-space-xs pt-space-xs md:grid-cols-4">
              {capabilityGrid.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col rounded-xl border border-white/[0.07] bg-surface-container-high/60 p-space-sm transition-all duration-200 hover:border-white/[0.14] hover:bg-surface-container-high"
                >
                  <span className={`font-mono text-mono-label uppercase ${item.color}`}>
                    {item.label}
                  </span>
                  <span className="mt-space-2xs font-body-sm text-body-sm text-on-surface">
                    {item.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
