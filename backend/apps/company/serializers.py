from rest_framework import serializers

from .models import SiteConfiguration


class SiteConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfiguration
        fields = [
            "brand_name", "legal_name", "tagline", "description", "website_url",
            "contact_email", "contact_phone", "address",
            "linkedin_url", "twitter_url", "github_url",
            "logo", "favicon",
            "seo_default_title", "seo_default_description", "seo_default_og_image",
        ]
