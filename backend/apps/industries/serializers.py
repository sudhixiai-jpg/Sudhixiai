from rest_framework import serializers

from .models import Industry


class IndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = [
            "slug", "name", "description", "icon", "hero_description",
            "capabilities", "use_cases", "sort_order",
            "seo_title", "seo_description",
        ]
