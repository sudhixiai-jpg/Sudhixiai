from rest_framework import serializers

from .models import Product, ProductFeature


class ProductFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductFeature
        fields = ["title", "description", "icon", "sort_order"]


class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "slug", "name", "short_description", "category", "status",
            "build_tag", "image", "is_featured", "sort_order",
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    features = ProductFeatureSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "slug", "name", "description", "short_description", "category", "status",
            "build_tag", "hero_content", "features", "image", "website_url",
            "documentation_url", "cta_label", "is_featured",
            "seo_title", "seo_description",
        ]
