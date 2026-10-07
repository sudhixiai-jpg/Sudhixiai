import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { insights as fallbackInsights } from "@/data/content";
import { getInsights } from "@/lib/api/insights";

export async function Insights() {
  let displayInsights = fallbackInsights;
  try {
    const remote = await getInsights();
    if (remote && remote.length > 0) {
      displayInsights = remote.map((item, idx) => ({
        slug: item.slug,
        category: item.category?.name || "EDITORIAL",
        readTime: item.reading_time_minutes ? `${item.reading_time_minutes} MIN READ` : "5 MIN READ",
        title: item.title,
        excerpt: item.excerpt || item.subtitle || "Technical analysis and engineering dispatch.",
        featured: item.featured ?? (idx === 0),
        accent: idx % 2 === 0 ? "tertiary" : "primary",
      }));
    }
  } catch {
    // Fall back to static data
  }

  const featured = displayInsights.find((item) => item.featured) || displayInsights[0];
  const rest = displayInsights.filter((item) => item.slug !== featured?.slug);

  return (
    <section className="flex flex-col gap-space-xl px-grid-margin-mobile py-space-3xl md:px-grid-margin-desktop">
      <div className="mx-auto w-full max-w-content">
        <SectionHeader
          kicker="Engineering Dispatch"
          title="Ideas, engineering and intelligence."
          description="Technical write-ups from our senior engineering team."
        />

        <div className="mt-space-xl grid gap-space-md lg:grid-cols-3">
          {/* Featured Article */}
          {featured && (
            <Reveal direction="left" className="lg:col-span-2">
              <Link
                href={`/insights/${featured.slug}`}
                className="glass-panel-interactive group flex h-full flex-col overflow-hidden rounded-2xl"
              >
                {/* Abstract gradient cover */}
                <div className="relative h-52 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#4cd7f6_0%,transparent_50%),radial-gradient(circle_at_80%_70%,#4d8eff_0%,transparent_50%),linear-gradient(135deg,#0d1c2d,#051424)]" />
                  {/* Animated grid lines on cover */}
                  <div className="absolute inset-0 opacity-20 bg-cyber-grid" />
                  {/* Category badge overlay */}
                  <div className="absolute bottom-space-sm left-space-sm">
                    <span className="rounded-lg border border-tertiary/30 bg-surface/60 px-2 py-1 font-mono text-mono-caption text-tertiary backdrop-blur-sm">
                      {featured.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-space-xs p-space-base">
                  <div className="flex items-center gap-space-xs font-mono text-mono-caption text-on-surface-variant">
                    <span>{featured.readTime}</span>
                    <span className="text-tertiary">•</span>
                    <span>FEATURED</span>
                  </div>
                  <h3 className="font-sans text-headline-sm font-semibold text-on-surface transition-colors group-hover:text-tertiary">
                    {featured.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-1 pt-space-xs font-mono text-mono-caption text-tertiary">
                    <span>Read article</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden />
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Sidebar Articles */}
          <div className="flex flex-col gap-space-sm">
            {rest.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.06} direction="right">
                <Link
                  href={`/insights/${article.slug}`}
                  className="glass-panel-interactive group flex items-center justify-between gap-space-sm rounded-2xl p-space-base"
                >
                  <div className="flex flex-col gap-space-2xs">
                    <span
                      className={`font-mono text-mono-caption ${
                        article.accent === "tertiary" ? "text-tertiary" : "text-primary-container"
                      }`}
                    >
                      {article.category}
                    </span>
                    <h4 className="font-body-base font-semibold text-body-base text-on-surface transition-colors group-hover:text-on-surface">
                      {article.title}
                    </h4>
                    <span className="font-mono text-mono-caption text-on-surface-variant">
                      {article.readTime}
                    </span>
                  </div>
                  <ChevronRight
                    className="h-5 w-5 shrink-0 text-on-surface-variant transition-all duration-200 group-hover:translate-x-1 group-hover:text-tertiary"
                    aria-hidden
                  />
                </Link>
              </Reveal>
            ))}

            {/* All insights link */}
            <Reveal delay={rest.length * 0.06 + 0.1} direction="right">
              <Link
                href="/insights"
                className="group flex items-center justify-center gap-2 rounded-2xl border border-white/[0.08] py-space-sm font-mono text-mono-label text-on-surface-variant transition-all duration-200 hover:border-tertiary/30 hover:bg-tertiary/5 hover:text-tertiary"
              >
                <span>View all articles</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
