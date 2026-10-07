import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { services as fallbackServices } from "@/data/services";
import { getServices } from "@/lib/api/services";
import { getServiceIcon } from "@/lib/icons";
import { accentText, accentGroupHoverText } from "@/lib/accent";

export async function CoreServices() {
  let displayServices = fallbackServices;
  try {
    const remote = await getServices();
    if (remote && remote.length > 0) {
      displayServices = remote.map((s) => ({
        slug: s.slug,
        title: s.title,
        description: s.short_description || "Enterprise architecture & digital solutions from SUDHIXAI.",
        icon: getServiceIcon(s.slug),
        accent: s.accent || "primary",
      }));
    }
  } catch {
    // Fall back cleanly to bundled data
  }

  return (
    <section className="relative flex flex-col gap-space-xl px-grid-margin-mobile py-space-3xl md:px-grid-margin-desktop">
      <div className="mx-auto w-full max-w-content">
        <SectionHeader
          kicker="Core Architecture & Services"
          title="One technology partner. From idea to growth."
          description="Systemic digital solutions crafted with mechanical precision and enterprise velocity."
        />

        <div className="mt-space-xl grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-4">
          {displayServices.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.04} scale>
              <Link
                href={`/solutions/${service.slug}`}
                className="glass-panel-interactive group flex h-full flex-col justify-between rounded-2xl p-space-base shadow-sm"
              >
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-surface-container-high transition-transform duration-300 group-hover:scale-110">
                      <service.icon className={`h-6 w-6 ${accentText[service.accent]}`} aria-hidden />
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04] text-on-surface-variant transition-all duration-200 group-hover:bg-tertiary/10 group-hover:text-tertiary">
                      <ArrowRight
                        className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 ${accentGroupHoverText[service.accent]}`}
                        aria-hidden
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-space-2xs pt-space-xs">
                    <h3 className="font-sans text-headline-sm font-semibold text-white transition-colors group-hover:text-primary">
                      {service.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-space-sm flex items-center justify-between border-t border-white/[0.06] pt-space-xs text-[11px] font-mono uppercase text-on-surface-variant">
                  <span className="text-tertiary/80">EXPLORE CAPABILITY</span>
                  <span>DOMAIN #{String(i + 1).padStart(2, "0")}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
