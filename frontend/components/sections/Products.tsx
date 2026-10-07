import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { products as fallbackProducts } from "@/data/content";
import { getProducts } from "@/lib/api/products";
import { accentText } from "@/lib/accent";

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

const statusBadgeMap: Record<string, string> = {
  tertiary: "border-tertiary/30 bg-tertiary/10 text-tertiary",
  primary: "border-primary/30 bg-primary/10 text-primary-container",
  secondary: "border-secondary/30 bg-secondary/10 text-secondary",
  muted: "border-white/10 bg-white/5 text-on-surface-variant",
};

const cardGradientMap: Record<number, string> = {
  0: "from-tertiary/10 via-transparent",
  1: "from-primary/10 via-transparent",
  2: "from-secondary/10 via-transparent",
};

export async function Products() {
  let displayProducts = fallbackProducts;
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
    // Fall back to static data
  }

  return (
    <section className="flex flex-col gap-space-xl bg-surface-container-lowest px-grid-margin-mobile py-space-3xl md:px-grid-margin-desktop">
      <div className="mx-auto w-full max-w-content">
        <SectionHeader
          kicker="Innovation Lab"
          title="Products we're building."
          description="Proprietary platforms born from recurring enterprise engineering demands."
        />
        <div className="mt-space-xl grid grid-cols-1 gap-space-md lg:grid-cols-3">
          {displayProducts.map((product, i) => (
            <Reveal
              key={product.name}
              delay={i * 0.06}
              direction="up"
              scale
            >
              <div
                className={`glass-panel-interactive group relative flex h-full flex-col gap-space-sm overflow-hidden rounded-2xl p-space-base`}
              >
                {/* Gradient top strip */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${cardGradientMap[i % 3] ?? cardGradientMap[0]} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  style={{
                    background: i % 3 === 0
                      ? "linear-gradient(90deg, #4cd7f6 0%, transparent 100%)"
                      : i % 3 === 1
                      ? "linear-gradient(90deg, #4d8eff 0%, transparent 100%)"
                      : "linear-gradient(90deg, #c0c1ff 0%, transparent 100%)",
                  }}
                />

                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-lg border px-space-xs py-space-2xs font-mono text-mono-caption uppercase ${statusBadgeMap[product.accent] ?? statusBadgeMap.muted}`}
                  >
                    {product.status}
                  </span>
                  <span className="font-mono text-[11px] text-on-surface-variant">
                    {product.buildTag}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col gap-space-2xs">
                  <h3 className="font-sans text-headline-sm text-on-surface">{product.name}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between border-t border-white/[0.06] pt-space-xs">
                  <span className={`font-mono text-mono-caption uppercase ${accentText[product.accent]}`}>
                    {product.category}
                  </span>
                  <Link
                    href="/products"
                    className="group/arrow inline-flex items-center gap-1 rounded-lg border border-white/[0.08] px-2 py-1 transition-all duration-200 hover:border-white/20 hover:bg-white/5"
                    aria-label={`Learn more about ${product.name}`}
                  >
                    <span className="font-mono text-mono-caption text-on-surface-variant">Details</span>
                    <ArrowRight
                      className={`h-3 w-3 ${accentText[product.accent]} transition-transform group-hover/arrow:translate-x-0.5`}
                      aria-hidden
                    />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
