import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getInsightBySlug } from "@/lib/api/insights";
import { insights as fallbackInsights } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

interface Props { params: { slug: string }; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const a = await getInsightBySlug(params.slug);
    return {
      title: a.seo_title || `${a.title} | SUDHIXAI Insights`,
      description: a.seo_description || a.excerpt || a.subtitle,
      alternates: { canonical: `https://sudhixai.com/insights/${params.slug}` },
      openGraph: {
        title: a.title,
        description: a.excerpt || a.subtitle || "",
        type: "article",
        publishedTime: a.published_at || undefined,
        images: a.cover_image ? [{ url: a.cover_image }] : [],
      },
    };
  } catch {
    return { title: "Insight | SUDHIXAI" };
  }
}

export default async function InsightDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const fallback = fallbackInsights.find((item) => item.slug === params.slug);

  let article = null;
  try {
    article = await getInsightBySlug(params.slug);
  } catch {
    // Fallback if API fails or offline
  }

  if (!article && !fallback) {
    notFound();
  }

  const title = article?.title || fallback?.title || params.slug;
  const category = article?.category?.name || fallback?.category || "EDITORIAL";
  const readTime = article?.reading_time_minutes ? `${article.reading_time_minutes} MIN READ` : fallback?.readTime || "5 MIN READ";
  const excerpt = article?.excerpt || fallback?.excerpt || "";
  const content = article?.content || excerpt || "";
  const authorName = article?.author?.name || "SUDHIXAI Engineering";
  const authorTitle = article?.author?.title || "Systems & AI Research";

  return (
    <main className="min-h-screen px-grid-margin-mobile pb-space-4xl pt-space-3xl md:px-grid-margin-desktop md:pt-space-4xl">
      <article className="mx-auto max-w-3xl flex flex-col gap-space-2xl">
        <Link
          href="/insights"
          className="inline-flex items-center gap-space-xs font-mono text-mono-caption uppercase text-on-surface-variant hover:text-on-surface"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all publications</span>
        </Link>

        <Reveal className="flex flex-col gap-space-lg">
          <div className="flex items-center gap-space-xs font-mono text-mono-caption text-tertiary">
            <span>{category}</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readTime}
            </span>
          </div>

          <h1 className="font-sans text-display-hero-mobile font-semibold tracking-tight text-on-surface md:text-headline-lg">
            {title}
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {excerpt}
          </p>

          <div className="flex items-center justify-between border-y border-surface-container-high py-space-sm font-mono text-mono-caption text-on-surface-variant">
            <div className="flex items-center gap-space-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high text-on-surface">
                <User className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-on-surface font-semibold">{authorName}</span>
                <span>{authorTitle}</span>
              </div>
            </div>
            <span>PRODUCTION DISPATCH</span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-space-md text-on-surface leading-relaxed font-body-base text-body-base">
          <div className="h-48 w-full rounded-2xl bg-[radial-gradient(circle_at_20%_20%,#4cd7f6_0%,transparent_45%),radial-gradient(circle_at_80%_70%,#4d8eff_0%,transparent_45%),linear-gradient(135deg,#0d1c2d,#051424)] shadow-md" />

          <div className="prose prose-invert max-w-none pt-space-sm">
            <p className="whitespace-pre-line text-on-surface-variant">
              {content}
            </p>
          </div>

          <div className="mt-space-xl flex flex-col gap-space-md rounded-2xl border border-surface-container-high bg-surface-container-low p-space-lg">
            <h3 className="font-sans text-headline-sm font-semibold text-on-surface">
              Explore Enterprise Implementation
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Need technical advisory or an architectural spike for your systems? Speak with the engineering team behind this dispatch.
            </p>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-space-xs rounded-xl bg-primary-container px-space-md py-space-xs font-body-base font-medium text-on-primary-container"
            >
              <span>Discuss With Systems Architects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </article>
    </main>
  );
}
