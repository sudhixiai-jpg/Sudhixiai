from django.core.exceptions import ValidationError
from django.db import models

from apps.common.models import UUIDTimeStampedModel
from apps.file_storage.storages import public_storage


class SiteConfiguration(UUIDTimeStampedModel):
    """
    Singleton company/site configuration.

    Real contact details (email/phone/address/social) were not supplied by
    SUDHIXAI at build time. Fields are nullable/blank by design -- the API
    and frontend must render a "Contact details coming soon" state rather
    than an invented value. Never seed fake data into this model.
    """

    brand_name = models.CharField(max_length=100, default="SUDHIXAI")
    legal_name = models.CharField(max_length=255, default="SUDHIXAI TECHNOLOGY PRIVATE LIMITED")
    tagline = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    website_url = models.URLField(blank=True)

    contact_email = models.EmailField(null=True, blank=True)
    contact_phone = models.CharField(max_length=32, null=True, blank=True)
    address = models.TextField(null=True, blank=True)

    linkedin_url = models.URLField(null=True, blank=True)
    twitter_url = models.URLField(null=True, blank=True)
    github_url = models.URLField(null=True, blank=True)

    logo = models.ImageField(upload_to="company/", storage=public_storage, null=True, blank=True)
    favicon = models.ImageField(upload_to="company/", storage=public_storage, null=True, blank=True)

    seo_default_title = models.CharField(max_length=255, blank=True)
    seo_default_description = models.CharField(max_length=500, blank=True)
    seo_default_og_image = models.ImageField(upload_to="company/seo/", storage=public_storage, null=True, blank=True)

    class Meta:
        verbose_name = "Site Configuration"
        verbose_name_plural = "Site Configuration"

    def clean(self):
        if not self.pk and SiteConfiguration.objects.exists():
            raise ValidationError("Site configuration already exists; edit the existing record instead.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.brand_name

    @classmethod
    def load(cls):
        """Return the single configuration row, creating a blank one on first access."""
        obj = cls.objects.first()
        if obj is None:
            obj = cls.objects.create()
        return obj
