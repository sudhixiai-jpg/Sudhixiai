from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.permissions import AllowAny

from apps.common.pagination import StandardResultsPagination

from .models import Product
from .serializers import ProductDetailSerializer, ProductListSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public read-only API. Only products explicitly marked is_active AND
    is_public are ever returned -- conceptual/internal products stay hidden
    until an admin flips them on, regardless of status.
    """

    queryset = Product.objects.filter(is_active=True, is_public=True).prefetch_related("features")
    permission_classes = [AllowAny]
    pagination_class = StandardResultsPagination
    lookup_field = "slug"
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["status", "category", "is_featured"]
    search_fields = ["name", "short_description", "description"]
    ordering_fields = ["sort_order", "name", "created_at"]
    ordering = ["sort_order"]

    def get_serializer_class(self):
        return ProductDetailSerializer if self.action == "retrieve" else ProductListSerializer
