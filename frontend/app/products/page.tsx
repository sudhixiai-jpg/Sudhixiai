import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { products as fallbackProducts } from "@/data/content";
import { getProducts } from "@/lib/api/products";
import { accentText } from "@/lib/accent";
export const metadata: Metadata = {
  title: "AI Software Products | SUDHIXAI",
  description:
    "Explore SUDHIXAI's AI products, including our RAG chatbot that answers from your own documents.",
  keywords: [
    "AI software products India",
    "RAG chatbot",
    "AI chatbot for business",
    "AI products Patna Bihar",
  ],
  alternates: { canonical: "https://sudhixai.site/products" },
};
export const revalidate = 60;

const statusLabelMap: Record<string, string> = {
  BETA: "Beta Available",
  PRIVATE_PREVIEW: "In Private Preview",
  COMING_SOON: "Coming Soon",
  AVAILABLE: "Available",
  ARCHIVED: "Archived",
};

const statusAccentMap: Record<string, "primary" | "secondary" | "tertiary" | "muted"> = {
  BETA: "primary",
  PRIVATE_PREVIEW: "secondary",
  COMING_SOON: "muted",
  AVAILABLE: "tertiary",
  ARCHIVED: "muted",
};

export default async function ProductsPage() {
  let displayProducts: typeof fallbackProducts = [];
  try {
    const remote = await getProducts();
    if (remote && remote.length > 0) {
      displayProducts = remote.map((prod) => ({
        name: prod.name,
        status: statusLabelMap[prod.status] || prod.status,
        buildTag: prod.build_tag || "LATEST",
        description: prod.short_description || "High-performance enterprise technology platform from SUDHIXAI.",
        category: prod.category || "ENGINEERING PLATFORM",
        accent: statusAccentMap[prod.status] || "primary",
      }));
    }
  } catch {
    // API unreachable: show the empty state below
  }

  return (
    <main className="min-h-screen px-grid-margin-mobile pb-space-4xl pt-space-3xl md:px-grid-margin-desktop md:pt-space-4xl">
      <div className="mx-auto max-w-content flex flex-col gap-space-2xl">
        <SectionHeader
          kicker="SUDHIXAI LABS"
          title="Proprietary Technology Platforms"
          description="Engineered in-house to solve mission-critical challenges in workflow orchestration, neural knowledge retrieval, and real-time organic telemetry."
        />
          {displayProducts.length === 0 && (
            <p className="text-on-surface-variant">Products are being updated. Please check back soon.</p>
          )}
        <div className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
          {displayProducts.map((product, i) => (
            <Reveal
              key={product.name}
              delay={i * 0.05}
              className="flex flex-col justify-between gap-space-md rounded-2xl border border-surface-container-high bg-surface-container-low p-space-lg shadow-md"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className={`rounded-md bg-surface-container-high px-space-xs py-space-2xs font-mono text-mono-caption uppercase ${accentText[product.accent]}`}>
                    {product.status}
                  </span>
                  <span className="font-mono text-[11px] text-on-surface-variant">
                    {product.buildTag}
                  </span>
                </div>

                <div className="flex flex-col gap-space-2xs">
                  <h3 className="font-sans text-headline-sm font-semibold text-on-surface">
                    {product.name}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-surface-container-high/60 pt-space-sm">
                <span className={`font-mono text-mono-caption uppercase ${accentText[product.accent]}`}>
                  {product.category}
                </span>
                <Link
                  href="/contact"
                  className="flex items-center gap-1 font-body-sm text-on-surface hover:text-tertiary transition-colors"
                >
                  <span>Request Access</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
