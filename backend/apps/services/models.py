from django.db import models

from apps.common.models import SEOFieldsModel, SortableActiveModel, UUIDTimeStampedModel

# Existing frontend slugs (data/services.ts) that must remain stable.
FRONTEND_SERVICE_SLUGS = [
    "ai",
    "software",
    "automation",
    "digital-transformation",
    "digital-marketing",
    "seo",
    "web-ecommerce",
    "data-analytics",
]


class ServiceCategory(UUIDTimeStampedModel, SortableActiveModel):
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=160, unique=True)
    description = models.TextField(blank=True)

    class Meta(SortableActiveModel.Meta):
        verbose_name_plural = "Service categories"

    def __str__(self):
        return self.name


class Service(UUIDTimeStampedModel, SortableActiveModel, SEOFieldsModel):
    ACCENT_CHOICES = [("primary", "Primary"), ("secondary", "Secondary"), ("tertiary", "Tertiary")]

    slug = models.SlugField(max_length=160, unique=True)
    title = models.CharField(max_length=200)
    short_description = models.TextField()
    description = models.TextField(blank=True)
    icon = models.CharField(
        max_length=64, blank=True, help_text="Lucide icon name, matches the frontend's icon set."
    )
    accent = models.CharField(max_length=16, choices=ACCENT_CHOICES, default="primary")
    category = models.ForeignKey(
        ServiceCategory, on_delete=models.PROTECT, related_name="services", null=True, blank=True
    )

    hero_title = models.CharField(max_length=255, blank=True)
    hero_description = models.TextField(blank=True)
    overview = models.TextField(blank=True)

    capabilities = models.JSONField(
        default=list, blank=True,
        help_text="Flexible list of {title, description} capability blocks for this service.",
    )
    use_cases = models.JSONField(default=list, blank=True)
    process = models.JSONField(default=list, blank=True)
    technology = models.JSONField(
        default=list, blank=True, help_text="Technology slugs referenced on the service page."
    )

    cta_label = models.CharField(max_length=100, blank=True, default="Get in touch")
    cta_url = models.CharField(max_length=255, blank=True, default="/contact")

    is_featured = models.BooleanField(default=False)

    class Meta(SortableActiveModel.Meta):
        pass

    def __str__(self):
        return self.title


class FAQCategory(UUIDTimeStampedModel, SortableActiveModel):
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=160, unique=True)

    class Meta(SortableActiveModel.Meta):
        verbose_name_plural = "FAQ categories"

    def __str__(self):
        return self.name


class FAQ(UUIDTimeStampedModel, SortableActiveModel):
    question = models.CharField(max_length=300)
    answer = models.TextField()
    category = models.ForeignKey(
        FAQCategory, on_delete=models.SET_NULL, related_name="faqs", null=True, blank=True
    )
    service = models.ForeignKey(
        Service, on_delete=models.SET_NULL, related_name="faqs", null=True, blank=True
    )

    class Meta(SortableActiveModel.Meta):
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"

    def __str__(self):
        return self.question
