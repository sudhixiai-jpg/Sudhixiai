from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from apps.common.pagination import StandardResultsPagination

from .models import Industry
from .serializers import IndustrySerializer


class IndustryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Industry.objects.filter(is_active=True)
    serializer_class = IndustrySerializer
    permission_classes = [AllowAny]
    pagination_class = StandardResultsPagination
    lookup_field = "slug"
