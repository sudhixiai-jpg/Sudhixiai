import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Terminal } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { getSiteConfiguration } from "@/lib/api/company";

export const metadata: Metadata = {
  title: "About SUDHIXAI — Next-Generation Tech Company",
  description:
    "Learn about SUDHIXAI, an engineering firm delivering enterprise-grade AI and software solutions. Our mission is to accelerate business growth through intelligent technology.",
  keywords: [
    "about SUDHIXAI",
    "AI company Patna Bihar",
    "technology company Bihar India",
    "software development team Patna",
    "IT company Patna",
  ],
  alternates: { canonical: "https://sudhixai.com/about" },
};


export default async function AboutPage() {
  let legalName: string = siteConfig.legalName;
  let description: string = siteConfig.description;

  try {
    const remote = await getSiteConfiguration();
    if (remote) {
      if (remote.legal_name) legalName = remote.legal_name;
      if (remote.description) description = remote.description;
    }
  } catch {
    // Fall back to default
  }

  return (
    <main className="min-h-screen px-grid-margin-mobile pb-space-4xl pt-space-3xl md:px-grid-margin-desktop md:pt-space-4xl">
      <div className="mx-auto max-w-content flex flex-col gap-space-2xl">
        <SectionHeader
          kicker="Company Profile"
          title="Engineered for Mission-Critical Impact"
          description={description}
        />

        <div className="grid gap-space-lg md:grid-cols-2">
          <Reveal className="flex flex-col gap-space-md rounded-2xl border border-surface-container-high bg-surface-container-low p-space-lg md:p-space-xl">
            <div className="flex items-center gap-space-xs font-mono text-mono-label text-tertiary">
              <Terminal className="h-4 w-4" />
              <span>WHO WE ARE</span>
            </div>
            <h2 className="font-sans text-headline-sm font-semibold text-on-surface">
              {legalName}
            </h2>
            <p className="font-body-base text-body-base text-on-surface-variant leading-relaxed">
              We are a specialized engineering firm focused on mission-critical platforms, autonomous agent systems, distributed backend architectures, and high-performance digital engines.
            </p>
            <p className="font-body-base text-body-base text-on-surface-variant leading-relaxed">
              We reject vanity metrics and superficial demos. Every solution we deliver is backed by production telemetry, verifiable unit and integration testing, and defensive engineering practices.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="flex flex-col gap-space-md rounded-2xl border border-surface-container-high bg-surface-container-low p-space-lg md:p-space-xl">
            <div className="flex items-center gap-space-xs font-mono text-mono-label text-primary">
              <Shield className="h-4 w-4" />
              <span>CORE ARCHITECTURAL PRINCIPLES</span>
            </div>
            <ul className="flex flex-col gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
              <li className="flex items-start gap-space-xs">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                <span><strong>Deterministic Grounding:</strong> AI solutions anchored in explicit domain logic with strict containment.</span>
              </li>
              <li className="flex items-start gap-space-xs">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                <span><strong>Multi-Tenant Isolation:</strong> Enforced access boundaries at the schema and permission levels.</span>
              </li>
              <li className="flex items-start gap-space-xs">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                <span><strong>Continuous Observability:</strong> Append-only audit logs, sub-second telemetry, and automated health checks.</span>
              </li>
              <li className="flex items-start gap-space-xs">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                <span><strong>Zero Fabricated Claims:</strong> Transparent reporting, measurable performance, and battle-tested code.</span>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="flex flex-col items-center justify-between gap-space-md rounded-2xl border border-surface-container-high bg-surface-container-low p-space-lg md:flex-row md:p-space-xl">
          <div className="flex flex-col gap-space-2xs">
            <h3 className="font-sans text-headline-sm font-semibold text-on-surface">
              Partner with SUDHIXAI
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Discuss your engineering roadmap and system goals with our technical leads.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-space-xs rounded-xl bg-primary-container px-space-lg py-space-sm font-body-base font-medium text-on-primary-container shadow-md"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
