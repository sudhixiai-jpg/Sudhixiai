"""
Development-safe seed data.

Populates service categories, services, technology, industries and FAQ
records using the SAME neutral copy already reviewed for the frontend's
structure (slugs, categories) -- never fabricated customers, metrics,
testimonials, or compliance claims. Products and Insights are intentionally
left empty by default; use --with-sample-content to add clearly-labeled
DEV SAMPLE records for local UI testing only.
"""

from django.core.management.base import BaseCommand
from django.db import transaction

from apps.industries.models import Industry
from apps.services.models import Service, ServiceCategory
from apps.technology.models import Technology, TechnologyCategory

SERVICE_CATEGORIES = [
    "AI Solutions", "Software Engineering", "Automation", "Digital Transformation",
    "Digital Marketing", "SEO", "Web & E-commerce", "Data & Analytics",
]

SERVICES = [
    ("ai", "AI Solutions", "AI Solutions"),
    ("software", "Software Engineering", "Software Engineering"),
    ("automation", "Automation", "Automation"),
    ("digital-transformation", "Digital Transformation", "Digital Transformation"),
    ("digital-marketing", "Digital Marketing", "Digital Marketing"),
    ("seo", "SEO", "SEO"),
    ("web-ecommerce", "Web & E-Commerce", "Web & E-commerce"),
    ("data-analytics", "Data & Analytics", "Data & Analytics"),
]

INDUSTRIES = [
    "SaaS", "E-commerce", "Healthcare", "Finance", "Education",
    "Real Estate", "Manufacturing", "Legal & Professional Services", "Startups", "Enterprise",
]

TECHNOLOGIES = [
    "Python", "Django", "Next.js", "TypeScript", "PostgreSQL", "Redis",
    "AWS", "Google Cloud", "Kubernetes", "GraphQL",
]


class Command(BaseCommand):
    help = "Seed development-safe reference content (no fake business claims)."

    def add_arguments(self, parser):
        parser.add_argument("--with-sample-content", action="store_true")

    @transaction.atomic
    def handle(self, *args, **options):
        categories = {}
        for name in SERVICE_CATEGORIES:
            slug = name.lower().replace(" & ", "-").replace(" ", "-")
            cat, _ = ServiceCategory.objects.get_or_create(slug=slug, defaults={"name": name})
            categories[name] = cat

        for slug, title, category_name in SERVICES:
            Service.objects.get_or_create(
                slug=slug,
                defaults={
                    "title": title,
                    "short_description": f"{title} services from SUDHIXAI.",
                    "category": categories.get(category_name),
                },
            )

        for name in INDUSTRIES:
            slug = name.lower().replace(" & ", "-").replace(" ", "-")
            Industry.objects.get_or_create(slug=slug, defaults={"name": name})

        tech_category, _ = TechnologyCategory.objects.get_or_create(slug="core-stack", defaults={"name": "Core Stack"})
        for name in TECHNOLOGIES:
            slug = name.lower().replace(" ", "-")
            Technology.objects.get_or_create(slug=slug, defaults={"name": name, "category": tech_category})

        self.stdout.write(self.style.SUCCESS("Seeded service categories, services, industries and technology."))

        if options["with_sample_content"]:
            self.stdout.write(self.style.WARNING(
                "--with-sample-content is a no-op today: products and insights "
                "are left empty until real, admin-approved content exists."
            ))
