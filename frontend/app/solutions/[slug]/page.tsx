import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle, Cpu } from "lucide-react";
import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/api/services";
import { services as fallbackServices } from "@/data/services";
import { getServiceIcon } from "@/lib/icons";
import { Reveal } from "@/components/ui/Reveal";

interface Props { params: { slug: string }; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const s = await getServiceBySlug(params.slug);
    return {
      title: s.seo_title || `${s.title} | SUDHIXAI`,
      description: s.seo_description || s.short_description,
      alternates: { canonical: `https://sudhixai.com/solutions/${params.slug}` },
    };
  } catch {
    return { title: "Solution | SUDHIXAI" };
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const fallback = fallbackServices.find((s) => s.slug === params.slug);

  let service = null;
  try {
    service = await getServiceBySlug(params.slug);
  } catch {
    // API might return 404 or be offline
  }

  if (!service && !fallback) {
    notFound();
  }

  const title = service?.title || fallback?.title || params.slug;
  const description = service?.description || service?.short_description || fallback?.description || "";
  const Icon = getServiceIcon(params.slug);

  return (
    <main className="min-h-screen px-grid-margin-mobile pb-space-4xl pt-space-3xl md:px-grid-margin-desktop md:pt-space-4xl">
      <div className="mx-auto max-w-content flex flex-col gap-space-2xl">
        <Link
          href="/solutions"
          className="inline-flex items-center gap-space-xs font-mono text-mono-caption uppercase text-on-surface-variant hover:text-on-surface"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all solutions</span>
        </Link>

        <Reveal className="flex flex-col gap-space-lg rounded-2xl border border-surface-container-high bg-surface-container-low p-space-lg md:p-space-2xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container-high text-tertiary">
            <Icon className="h-8 w-8" />
          </div>

          <div className="flex flex-col gap-space-sm">
            <div className="inline-flex w-fit items-center gap-space-xs rounded-full bg-surface-container-high px-space-sm py-space-2xs">
              <span className="h-2 w-2 rounded-full bg-tertiary" />
              <span className="font-mono text-mono-caption uppercase tracking-wider text-tertiary">
                ENTERPRISE CAPABILITY
              </span>
            </div>
            <h1 className="font-sans text-headline-lg-mobile font-semibold tracking-tight text-on-surface md:text-headline-lg">
              {title}
            </h1>
            <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
              {description}
            </p>
          </div>

          <div className="grid gap-space-md sm:grid-cols-2 pt-space-sm">
            <div className="flex flex-col gap-space-xs rounded-xl bg-surface-container-lowest p-space-base">
              <div className="flex items-center gap-space-xs font-mono text-mono-label text-tertiary">
                <Cpu className="h-4 w-4" />
                <span>SPECIFICATION &amp; METHODOLOGY</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Full-lifecycle architectural engagement from initial domain mapping to continuous automated monitoring and low-latency production execution.
              </p>
            </div>

            <div className="flex flex-col gap-space-xs rounded-xl bg-surface-container-lowest p-space-base">
              <div className="flex items-center gap-space-xs font-mono text-mono-label text-primary">
                <CheckCircle className="h-4 w-4" />
                <span>INTEGRATION READINESS</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Compatible with cloud-native distributed topologies, micro-frontends, containerized workloads, and SOC2 compliant auditing frameworks.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-space-sm pt-space-md">
            <Link
              href="/contact"
              className="flex h-12 items-center justify-center gap-space-xs rounded-xl bg-primary-container px-space-lg font-body-base font-medium text-on-primary-container shadow-md"
            >
              <span>Initiate {title} Project</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
