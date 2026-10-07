from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.permissions import AllowAny

from apps.common.pagination import StandardResultsPagination

from .models import Insight, InsightCategory
from .serializers import InsightCategorySerializer, InsightDetailSerializer, InsightListSerializer


class InsightViewSet(viewsets.ReadOnlyModelViewSet):
    """Public read-only API. Only PUBLISHED insights are ever exposed here."""

    queryset = Insight.objects.filter(status=Insight.Status.PUBLISHED).select_related(
        "author", "category"
    ).prefetch_related("tags")
    permission_classes = [AllowAny]
    pagination_class = StandardResultsPagination
    lookup_field = "slug"
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = {
        "category__slug": ["exact"],
        "tags__slug": ["exact"],
        "featured": ["exact"],
    }
    search_fields = ["title", "excerpt", "content"]
    ordering_fields = ["published_at", "title"]
    ordering = ["-published_at"]

    def get_serializer_class(self):
        return InsightDetailSerializer if self.action == "retrieve" else InsightListSerializer


class InsightCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = InsightCategory.objects.all()
    serializer_class = InsightCategorySerializer
    permission_classes = [AllowAny]
    pagination_class = None
    lookup_field = "slug"
