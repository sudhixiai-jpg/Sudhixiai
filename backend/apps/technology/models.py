from django.db import models

from apps.common.models import SortableActiveModel, UUIDTimeStampedModel


class TechnologyCategory(UUIDTimeStampedModel, SortableActiveModel):
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=160, unique=True)

    class Meta(SortableActiveModel.Meta):
        verbose_name_plural = "Technology categories"

    def __str__(self):
        return self.name


class Technology(UUIDTimeStampedModel, SortableActiveModel):
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=160, unique=True)
    description = models.CharField(max_length=300, blank=True)
    icon = models.CharField(max_length=64, blank=True)
    category = models.ForeignKey(
        TechnologyCategory, on_delete=models.SET_NULL, related_name="technologies", null=True, blank=True
    )
    website_url = models.URLField(blank=True)

    class Meta(SortableActiveModel.Meta):
        verbose_name_plural = "Technologies"

    def __str__(self):
        return self.name
