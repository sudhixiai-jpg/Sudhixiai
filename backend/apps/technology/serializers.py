from rest_framework import serializers

from .models import Technology, TechnologyCategory


class TechnologyCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnologyCategory
        fields = ["slug", "name", "sort_order"]


class TechnologySerializer(serializers.ModelSerializer):
    category = TechnologyCategorySerializer(read_only=True)

    class Meta:
        model = Technology
        fields = ["slug", "name", "description", "icon", "category", "website_url", "sort_order"]
