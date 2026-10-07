import uuid

from django.db import models


class UUIDTimeStampedModel(models.Model):
    """Base model for domain entities: UUID primary key + created/updated timestamps."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SortableActiveModel(models.Model):
    """Mixin for content models that are admin-toggled active and orderable."""

    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        abstract = True
        ordering = ["sort_order", "-created_at"]


class SEOFieldsModel(models.Model):
    """Optional SEO metadata shared by public content models."""

    seo_title = models.CharField(max_length=255, blank=True)
    seo_description = models.CharField(max_length=500, blank=True)

    class Meta:
        abstract = True
