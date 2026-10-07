from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.permissions import AllowAny

from apps.common.pagination import StandardResultsPagination

from .models import FAQ, Service, ServiceCategory
from .serializers import FAQSerializer, ServiceCategorySerializer, ServiceDetailSerializer, ServiceListSerializer


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """Public read-only API for services. Only active services are exposed."""

    queryset = Service.objects.filter(is_active=True).select_related("category")
    permission_classes = [AllowAny]
    pagination_class = StandardResultsPagination
    lookup_field = "slug"
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["category__slug", "is_featured"]
    search_fields = ["title", "short_description", "description"]
    ordering_fields = ["sort_order", "title", "created_at"]
    ordering = ["sort_order"]

    def get_serializer_class(self):
        return ServiceDetailSerializer if self.action == "retrieve" else ServiceListSerializer


class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.filter(is_active=True)
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]
    pagination_class = None
    lookup_field = "slug"


class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQ.objects.filter(is_active=True).select_related("category", "service")
    serializer_class = FAQSerializer
    permission_classes = [AllowAny]
    pagination_class = StandardResultsPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["category__slug", "service__slug"]
