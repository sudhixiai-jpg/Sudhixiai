import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock, User } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { insights as fallbackInsights } from "@/data/content";
import { getInsights } from "@/lib/api/insights";

export const metadata: Metadata = {
  title: "Tech Insights & Articles | SUDHIXAI — AI Company Patna, Bihar",
  description:
    "Read expert articles, guides, and case studies from SUDHIXAI's engineering team on AI, software development, automation, digital transformation, and technology trends relevant to businesses in Bihar and India.",
  keywords: [
    "AI insights Patna",
    "technology blog Bihar",
    "software development articles India",
    "AI automation guides",
    "digital transformation Bihar",
    "tech articles Patna",
  ],
  alternates: { canonical: "https://sudhixai.site/insights" },
};


export default async function InsightsPage() {
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
    // Graceful fallback
  }

  return (
    <main className="min-h-screen px-grid-margin-mobile pb-space-4xl pt-space-3xl md:px-grid-margin-desktop md:pt-space-4xl">
      <div className="mx-auto max-w-content flex flex-col gap-space-2xl">
        <SectionHeader
          kicker="Engineering Publications"
          title="Insights &amp; Architectural Research"
          description="In-depth dispatches, systems post-mortems, and engineering frameworks from the SUDHIXAI technical team."
        />

        <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-3">
          {displayInsights.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.05}>
              <Link
                href={`/insights/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-low shadow-sm transition-all hover:bg-surface-container hover:shadow-md"
              >
                <div className="h-40 w-full bg-[radial-gradient(circle_at_20%_20%,#4cd7f6_0%,transparent_45%),radial-gradient(circle_at_80%_70%,#4d8eff_0%,transparent_45%),linear-gradient(135deg,#0d1c2d,#051424)]" />
                <div className="flex flex-1 flex-col justify-between p-space-lg">
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center gap-space-xs font-mono text-mono-caption text-tertiary">
                      <span>{article.category}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-sans text-headline-sm font-semibold text-on-surface group-hover:text-tertiary transition-colors">
                      {article.title}
                    </h3>

                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-surface-container-high/60 pt-space-sm font-body-sm text-on-surface">
                    <span className="font-medium">Read Publication</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
