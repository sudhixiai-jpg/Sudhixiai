from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Technology, TechnologyCategory
from .serializers import TechnologyCategorySerializer, TechnologySerializer


class TechnologyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Technology.objects.filter(is_active=True).select_related("category")
    serializer_class = TechnologySerializer
    permission_classes = [AllowAny]
    pagination_class = None
    lookup_field = "slug"
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["category__slug"]


class TechnologyCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TechnologyCategory.objects.filter(is_active=True)
    serializer_class = TechnologyCategorySerializer
    permission_classes = [AllowAny]
    pagination_class = None
    lookup_field = "slug"
