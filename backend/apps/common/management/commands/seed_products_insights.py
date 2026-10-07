from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone

from apps.company.models import SiteConfiguration
from apps.insights.models import Insight, InsightAuthor, InsightCategory
from apps.products.models import Product


class Command(BaseCommand):
    help = "Seed development sample public products, insights, and site configuration."

    @transaction.atomic
    def handle(self, *args, **options):
        # 1. Site Configuration
        config = SiteConfiguration.load()
        config.brand_name = "SUDHIXAI"
        config.legal_name = "SUDHIXAI TECHNOLOGY PRIVATE LIMITED"
        config.tagline = "Technology that builds, automates and grows your business."
        config.description = (
            "From AI systems and custom software to automation, marketing, SEO and digital "
            "transformation, SUDHIXAI delivers end-to-end technology solutions for modern businesses."
        )
        config.website_url = "https://sudhixai.com"
        config.save()
        self.stdout.write(self.style.SUCCESS("Updated SiteConfiguration."))

        # 2. Products
        products_data = [
            {
                "name": "SudhixFlow",
                "slug": "sudhixflow",
                "status": Product.Status.BETA,
                "build_tag": "BUILD_REV #8902",
                "description": "Enterprise workflow orchestrator linking disparate internal backends with sub-millisecond execution guarantees and visual state tracking.",
                "short_description": "Enterprise workflow orchestrator linking disparate internal backends.",
                "category": "ORCHESTRATION ENGINE",
                "is_public": True,
                "is_featured": True,
                "sort_order": 1,
            },
            {
                "name": "SudhixCognition",
                "slug": "sudhixcognition",
                "status": Product.Status.PRIVATE_PREVIEW,
                "build_tag": "ACCESS_ONLY",
                "description": "Business knowledge grounding engine empowering autonomous agents to query secure enterprise corpora with deterministic precision.",
                "short_description": "Business knowledge grounding engine empowering autonomous agents.",
                "category": "NEURAL KNOWLEDGE FABRIC",
                "is_public": True,
                "is_featured": True,
                "sort_order": 2,
            },
            {
                "name": "SudhixPulse",
                "slug": "sudhixpulse",
                "status": Product.Status.COMING_SOON,
                "build_tag": "Q3-2025",
                "description": "Continuous real-time organic growth and programmatic SEO telemetry platform identifying index drift and ranking vulnerabilities immediately.",
                "short_description": "Continuous real-time organic growth and programmatic SEO telemetry platform.",
                "category": "TELEMETRY & AUDITING",
                "is_public": True,
                "is_featured": False,
                "sort_order": 3,
            },
        ]

        for pdata in products_data:
            Product.objects.update_or_create(
                slug=pdata["slug"],
                defaults=pdata,
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(products_data)} products."))

        # 3. Insights
        author, _ = InsightAuthor.objects.get_or_create(
            slug="sudhixai-engineering",
            defaults={"name": "SUDHIXAI Engineering", "title": "Core Engineering Team", "bio": "Senior platform & AI architects at SUDHIXAI."},
        )

        cat_ai, _ = InsightCategory.objects.get_or_create(slug="ai-systems", defaults={"name": "AI SYSTEMS"})
        cat_sys, _ = InsightCategory.objects.get_or_create(slug="system-architecture", defaults={"name": "SYSTEM ARCHITECTURE"})
        cat_growth, _ = InsightCategory.objects.get_or_create(slug="growth-engineering", defaults={"name": "GROWTH ENGINEERING"})

        insights_data = [
            {
                "slug": "architecting-resilient-multi-agent-ai-systems",
                "title": "Architecting Resilient Multi-Agent AI Systems for Production",
                "subtitle": "Building deterministic workflows with non-deterministic foundation models.",
                "excerpt": "A deep technical walkthrough covering determinism, consensus fallbacks, and memory containment in mission-critical deployments.",
                "content": "Building multi-agent AI systems in production demands strict isolation, state persistence, and observability...",
                "category": cat_ai,
                "author": author,
                "featured": True,
                "reading_time_minutes": 8,
                "status": Insight.Status.PUBLISHED,
                "published_at": timezone.now(),
            },
            {
                "slug": "modern-monolith-vs-microservices-2025",
                "title": "The Modern Monolith vs Microservices in 2025",
                "subtitle": "Why high-growth tech teams are rethinking distributed complexity.",
                "excerpt": "Tech Ops: An empirical comparison between modular monoliths and distributed microservices architectures.",
                "content": "Microservices promise team independence but introduce network latency, eventual consistency challenges, and operational overhead...",
                "category": cat_sys,
                "author": author,
                "featured": False,
                "reading_time_minutes": 5,
                "status": Insight.Status.PUBLISHED,
                "published_at": timezone.now(),
            },
            {
                "slug": "programmatic-seo-at-global-scale",
                "title": "Programmatic SEO at Global Scale: 1M+ Pages",
                "subtitle": "Engineering high-performance programmatic content with sub-100ms TTFB.",
                "excerpt": "Search Ops: Engineering indexing pipeline reliability, semantic schema graphs, and edge caching at scale.",
                "content": "Scaling programmatic SEO beyond thousands of pages requires database query indexing, edge CDN rendering, and intelligent sitemap chunking...",
                "category": cat_growth,
                "author": author,
                "featured": False,
                "reading_time_minutes": 6,
                "status": Insight.Status.PUBLISHED,
                "published_at": timezone.now(),
            },
        ]

        for idata in insights_data:
            Insight.objects.update_or_create(
                slug=idata["slug"],
                defaults=idata,
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(insights_data)} insights."))
