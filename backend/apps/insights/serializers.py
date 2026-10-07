from rest_framework import serializers

from .models import Insight, InsightAuthor, InsightCategory, InsightTag


class InsightCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = InsightCategory
        fields = ["slug", "name"]


class InsightTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = InsightTag
        fields = ["slug", "name"]


class InsightAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = InsightAuthor
        fields = ["slug", "name", "title", "bio", "avatar"]


class InsightListSerializer(serializers.ModelSerializer):
    category = InsightCategorySerializer(read_only=True)
    author = InsightAuthorSerializer(read_only=True)

    class Meta:
        model = Insight
        fields = [
            "slug", "title", "subtitle", "excerpt", "cover_image",
            "author", "category", "featured", "published_at", "reading_time_minutes",
        ]


class InsightDetailSerializer(serializers.ModelSerializer):
    category = InsightCategorySerializer(read_only=True)
    author = InsightAuthorSerializer(read_only=True)
    tags = InsightTagSerializer(many=True, read_only=True)
    related_insights = serializers.SerializerMethodField()

    class Meta:
        model = Insight
        fields = [
            "slug", "title", "subtitle", "excerpt", "content", "cover_image",
            "author", "category", "tags", "featured", "published_at", "reading_time_minutes",
            "canonical_url", "seo_title", "seo_description", "related_insights",
        ]

    def get_related_insights(self, obj):
        from .models import Insight as InsightModel

        qs = InsightModel.objects.filter(
            status=InsightModel.Status.PUBLISHED, category=obj.category
        ).exclude(pk=obj.pk).select_related("category", "author")[:3]
        return InsightListSerializer(qs, many=True, context=self.context).data
