from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions, viewsets
from rest_framework.permissions import AllowAny

from apps.common.pagination import StandardResultsPagination
from apps.common.permissions import IsStaffUser
from apps.common.responses import success
from apps.common.throttling import ContactSubmissionThrottle
from apps.notifications.services import EmailService

from .models import ContactSubmission
from .serializers import ContactSubmissionAdminSerializer, ContactSubmissionCreateSerializer


def _client_ip(request):
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


class ContactSubmissionCreateView(generics.CreateAPIView):
    """Public POST endpoint. Never publicly readable -- see ContactSubmissionAdminViewSet."""

    serializer_class = ContactSubmissionCreateSerializer
    permission_classes = [AllowAny]
    throttle_classes = [ContactSubmissionThrottle]
    throttle_scope = "contact"

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        submission = serializer.save(
            ip_address=_client_ip(request),
            user_agent=request.META.get("HTTP_USER_AGENT", "")[:300],
        )
        EmailService.send_contact_notification(submission)
        return success(message="Your message has been received.", status=201)


class ContactSubmissionAdminViewSet(viewsets.ReadOnlyModelViewSet):
    """Staff-only. Submissions are never exposed through any public endpoint."""

    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionAdminSerializer
    permission_classes = [IsStaffUser]
    pagination_class = StandardResultsPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status", "service"]
