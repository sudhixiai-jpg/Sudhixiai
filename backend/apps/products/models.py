from django.db import models

from apps.common.models import SEOFieldsModel, SortableActiveModel, UUIDTimeStampedModel
from apps.file_storage.storages import public_storage


class Product(UUIDTimeStampedModel, SortableActiveModel, SEOFieldsModel):
    class Status(models.TextChoices):
        COMING_SOON = "COMING_SOON", "Coming Soon"
        PRIVATE_PREVIEW = "PRIVATE_PREVIEW", "Private Preview"
        BETA = "BETA", "Beta"
        AVAILABLE = "AVAILABLE", "Available"
        ARCHIVED = "ARCHIVED", "Archived"

    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=160, unique=True)
    description = models.TextField(blank=True)
    short_description = models.CharField(max_length=300, blank=True)
    category = models.CharField(max_length=150, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.COMING_SOON)

    # Set by admin only when genuinely true -- never inferred or fabricated.
    build_tag = models.CharField(max_length=64, blank=True)

    hero_content = models.TextField(blank=True)
    image = models.ImageField(upload_to="products/", storage=public_storage, null=True, blank=True)
    website_url = models.URLField(blank=True)
    documentation_url = models.URLField(blank=True)
    cta_label = models.CharField(max_length=100, blank=True, default="Learn more")

    is_public = models.BooleanField(
        default=False,
        help_text="Must be explicitly enabled by an admin before the product appears publicly.",
    )
    is_featured = models.BooleanField(default=False)

    class Meta(SortableActiveModel.Meta):
        pass

    def __str__(self):
        return self.name


class ProductFeature(UUIDTimeStampedModel, SortableActiveModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="features")
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=64, blank=True)

    class Meta(SortableActiveModel.Meta):
        pass

    def __str__(self):
        return f"{self.product.name} - {self.title}"
