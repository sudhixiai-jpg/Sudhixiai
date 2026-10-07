from django.db import transaction
from rest_framework import permissions, viewsets

from .models import Organization, OrganizationMember
from .permissions import organizations_for_user
from .serializers import OrganizationCreateSerializer, OrganizationSerializer


class OrganizationViewSet(viewsets.ModelViewSet):
    """
    A user only ever sees organizations they belong to. Creation happens in a
    transaction so the owning membership row is never missing.
    """

    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get", "post", "head", "options"]

    def get_queryset(self):
        return organizations_for_user(self.request.user)

    def get_serializer_class(self):
        return OrganizationCreateSerializer if self.action == "create" else OrganizationSerializer

    def perform_create(self, serializer):
        with transaction.atomic():
            organization = serializer.save(owner=self.request.user)
            OrganizationMember.objects.create(
                organization=organization,
                user=self.request.user,
                role=OrganizationMember.Role.OWNER,
                status=OrganizationMember.Status.ACTIVE,
            )
