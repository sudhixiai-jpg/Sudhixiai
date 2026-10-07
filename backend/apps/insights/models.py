from django.db import models
from django.utils import timezone

from apps.common.models import SEOFieldsModel, UUIDTimeStampedModel
from apps.file_storage.storages import public_storage


class InsightCategory(UUIDTimeStampedModel):
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=160, unique=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "name"]
        verbose_name_plural = "Insight categories"

    def __str__(self):
        return self.name


class InsightTag(UUIDTimeStampedModel):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True)

    def __str__(self):
        return self.name


class InsightAuthor(UUIDTimeStampedModel):
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=160, unique=True)
    title = models.CharField(max_length=150, blank=True)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to="insights/authors/", storage=public_storage, null=True, blank=True)

    def __str__(self):
        return self.name


class Insight(UUIDTimeStampedModel, SEOFieldsModel):
    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        REVIEW = "REVIEW", "Review"
        PUBLISHED = "PUBLISHED", "Published"
        ARCHIVED = "ARCHIVED", "Archived"

    slug = models.SlugField(max_length=220, unique=True)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    excerpt = models.TextField(blank=True)
    content = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to="insights/covers/", storage=public_storage, null=True, blank=True)

    author = models.ForeignKey(
        InsightAuthor, on_delete=models.SET_NULL, related_name="insights", null=True, blank=True
    )
    category = models.ForeignKey(
        InsightCategory, on_delete=models.SET_NULL, related_name="insights", null=True, blank=True
    )
    tags = models.ManyToManyField(InsightTag, related_name="insights", blank=True)

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)
    featured = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    reading_time_minutes = models.PositiveIntegerField(null=True, blank=True)

    canonical_url = models.URLField(blank=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.status == self.Status.PUBLISHED and self.published_at is None:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)


class InsightManager:
    """Selector helpers kept out of views per the project's layering convention."""

    @staticmethod
    def published():
        return Insight.objects.filter(status=Insight.Status.PUBLISHED).select_related("author", "category")
