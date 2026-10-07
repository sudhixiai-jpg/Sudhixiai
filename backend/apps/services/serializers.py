from rest_framework import serializers

from .models import FAQ, FAQCategory, Service, ServiceCategory


class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ["slug", "name", "description", "sort_order"]


class ServiceListSerializer(serializers.ModelSerializer):
    category = ServiceCategorySerializer(read_only=True)

    class Meta:
        model = Service
        fields = [
            "slug", "title", "short_description", "icon", "accent",
            "category", "is_featured", "sort_order",
        ]


class ServiceDetailSerializer(serializers.ModelSerializer):
    category = ServiceCategorySerializer(read_only=True)

    class Meta:
        model = Service
        fields = [
            "slug", "title", "short_description", "description", "icon", "accent", "category",
            "hero_title", "hero_description", "overview",
            "capabilities", "use_cases", "process", "technology",
            "cta_label", "cta_url", "is_featured",
            "seo_title", "seo_description",
        ]


class FAQSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field="slug", read_only=True)
    service = serializers.SlugRelatedField(slug_field="slug", read_only=True)

    class Meta:
        model = FAQ
        fields = ["question", "answer", "category", "service", "sort_order"]
