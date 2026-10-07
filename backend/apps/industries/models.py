from django.db import models

from apps.common.models import SEOFieldsModel, SortableActiveModel, UUIDTimeStampedModel


class Industry(UUIDTimeStampedModel, SortableActiveModel, SEOFieldsModel):
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=160, unique=True)
    description = models.CharField(
        max_length=300, blank=True, help_text="Short summary shown in grids/cards."
    )
    icon = models.CharField(max_length=64, blank=True)
    hero_description = models.TextField(blank=True)

    capabilities = models.JSONField(default=list, blank=True)
    use_cases = models.JSONField(default=list, blank=True)

    class Meta(SortableActiveModel.Meta):
        verbose_name_plural = "Industries"

    def __str__(self):
        return self.name
