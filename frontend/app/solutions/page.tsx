import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { services as fallbackServices } from "@/data/services";
import { getServices } from "@/lib/api/services";
import { getServiceIcon } from "@/lib/icons";
import { accentText, accentGroupHoverText } from "@/lib/accent";

export const metadata: Metadata = {
  title: "AI & Software Solutions | SUDHIXAI",
  description:
    "Explore SUDHIXAI's full suite of technology solutions: AI development, custom software, automation, digital transformation, digital marketing, SEO, and web development.",
  keywords: [
    "AI solutions Patna",
    "software solutions Bihar",
    "custom software development company Patna",
    "digital transformation services India",
    "automation services Bihar",
    "web development Patna",
    "digital marketing Patna Bihar",
  ],
  alternates: { canonical: "https://sudhixai.com/solutions" },
};


export default async function SolutionsPage() {
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
    // Graceful fallback
  }

  return (
    <main className="min-h-screen px-grid-margin-mobile pb-space-4xl pt-space-3xl md:px-grid-margin-desktop md:pt-space-4xl">
      <div className="mx-auto max-w-content flex flex-col gap-space-2xl">
        <SectionHeader
          kicker="Engineering Portfolio"
          title="End-to-End Enterprise Solutions"
          description="Modular, high-throughput systems designed for mission-critical reliability, operational autonomy, and continuous scale."
        />

        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-3">
          {displayServices.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.04}>
              <Link
                href={`/solutions/${service.slug}`}
                className="group flex h-full flex-col justify-between gap-space-md rounded-2xl border border-surface-container-high bg-surface-container-low p-space-lg shadow-sm transition-all hover:bg-surface-container hover:shadow-md"
              >
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-high">
                      <service.icon className={`h-6 w-6 ${accentText[service.accent]}`} aria-hidden />
                    </div>
                    <span className="font-mono text-mono-caption uppercase text-on-surface-variant">
                      DOMAIN #{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-sans text-headline-sm font-semibold text-on-surface">
                    {service.title}
                  </h3>
                  <p className="font-body-base text-body-base text-on-surface-variant">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-surface-container-high/60 pt-space-sm font-body-sm text-on-surface">
                  <span className="font-medium">Explore Architecture</span>
                  <ArrowRight
                    className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${accentGroupHoverText[service.accent]}`}
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
